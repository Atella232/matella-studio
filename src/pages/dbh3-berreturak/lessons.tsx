import type { LocalizedText, UnitStage, UnitTopic } from '../../features/unit-v2/types'
import {
    ErrorsFigure,
    IntervalsFigure,
    IrrationalFigure,
    PowersFigure,
    RadicalOpsFigure,
    RealLineFigure,
    RootsFigure,
    RoundingFigure,
    ScientificFigure,
    ScientificOpsFigure,
    SimplifyFigure
} from '../dbh4-aplikatuak-errealak/figures'
import { PowerRulesFigure } from '../dbh4-akademikoak-potentziak/figures'

/* ==========================================================================
   Berreturak eta erroak · 3. DBH — stages and lessons, following the order
   of Santillana 3.º ESO unit 2 (powers with integer exponents, scientific
   notation, roots and radicals, the real numbers, approximations and
   errors) and the powers and radicals of Anaya 3.º ESO unit 2. Exercises
   are original: the books only fix the scope and the order.
   ========================================================================== */

export type PowersStageId = 'powers' | 'scientific' | 'roots' | 'reals' | 'approx'

export const powersStages: UnitStage[] = [
    { id: 'powers', tone: 'blue', title: { eu: 'Berreturak', es: 'Potencias', ar: 'القوى' } },
    { id: 'scientific', tone: 'violet', title: { eu: 'Idazkera zientifikoa', es: 'Notación científica', ar: 'الترميز العلمي' } },
    { id: 'roots', tone: 'mustard', title: { eu: 'Erroak eta erradikalak', es: 'Raíces y radicales', ar: 'الجذور والجذريات' } },
    { id: 'reals', tone: 'coral', title: { eu: 'Zenbaki errealak', es: 'Números reales', ar: 'الأعداد الحقيقية' } },
    { id: 'approx', tone: 'green', title: { eu: 'Hurbilketak eta errorea', es: 'Aproximaciones y error', ar: 'التقريب والخطأ' } }
]

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar: ar.replace(/\{,\}/g, '.') })
/** The same formula in every language; the decimal comma becomes a point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, ar: value.replace(/\{,\}/g, '.') })

export const powersTopics: UnitTopic[] = [
    /* ---------- 1. Powers ---------- */
    {
        id: 'power-sign',
        stage: 'powers',
        title: say('Berretura eta zeinua', 'Potencia y signo', 'القوة والإشارة'),
        goal: say('Berreturak biderketa errepikatu gisa idaztea eta oinarri negatiboen zeinua zuzen ateratzea.', 'Escribir una potencia como producto repetido y acertar con el signo cuando la base es negativa.', 'كتابة القوة على شكل ضرب متكرر وتحديد الإشارة عندما يكون الأساس سالبًا.'),
        explanation: say(
            'Berretura biderketa errepikatu baten laburdura da: $a^{n}=a\\cdot a\\cdots a$, $n$ faktorerekin. $a$ oinarria da eta $n$ berretzailea. Oinarria negatiboa bada, berretzaile bikoitiak emaitza positiboa ematen du eta bakoitiak negatiboa: $(-3)^{4}=81$, baina $(-3)^{3}=-27$. Kontuz parentesiekin: $-3^{4}=-81$, berretzaileak oinarriari bakarrik eragiten dio, ez aurreko zeinuari.',
            'Una potencia es la abreviatura de un producto repetido: $a^{n}=a\\cdot a\\cdots a$, con $n$ factores. $a$ es la base y $n$ el exponente. Si la base es negativa, un exponente par da resultado positivo y uno impar, negativo: $(-3)^{4}=81$, pero $(-3)^{3}=-27$. Cuidado con los paréntesis: $-3^{4}=-81$, porque el exponente solo afecta a la base, no al signo de delante.',
            'القوة اختصار لضرب متكرر: $a^{n}=a\\cdot a\\cdots a$ بعدد $n$ من العوامل. $a$ هو الأساس و$n$ هو الأس. إذا كان الأساس سالبًا فالأس الزوجي يعطي نتيجة موجبة والفردي سالبة: $(-3)^{4}=81$ لكن $(-3)^{3}=-27$. انتبه إلى الأقواس: $-3^{4}=-81$ لأن الأس لا يؤثر إلا في الأساس لا في الإشارة التي قبله.'
        ),
        problem: same('$(-2)^{5}$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Idatzi biderketa gisa.', 'Escríbela como producto.', 'اكتبها ضربًا.'), math: same('$(-2)\\cdot(-2)\\cdot(-2)\\cdot(-2)\\cdot(-2)$') },
            { text: say('Zenbatu faktore negatiboak: 5, bakoitia.', 'Cuenta los factores negativos: 5, impar.', 'عدّ العوامل السالبة: 5، فردي.'), math: say('Zeinua: negatiboa', 'Signo: negativo', 'الإشارة: سالبة') },
            { text: say('Biderkatu balio absolutuak.', 'Multiplica los valores absolutos.', 'اضرب القيم المطلقة.'), math: same('$2^{5}=32\\quad\\to\\quad -32$') }
        ],
        example: same('$-5^{2}=-25$'),
        takeaway: say('Oinarri negatiboa: berretzaile bikoitia positibo, bakoitia negatibo. $-5^{2}\\neq(-5)^{2}$.', 'Base negativa: exponente par da positivo, impar da negativo. $-5^{2}\\neq(-5)^{2}$.', 'أساس سالب: الأس الزوجي موجب والفردي سالب. $-5^{2}\\neq(-5)^{2}$.'),
        figure: (language) => <PowersFigure language={language} />
    },
    {
        id: 'negative-zero',
        stage: 'powers',
        title: say('Berretzaile zero eta negatiboa', 'Exponente cero y negativo', 'الأس صفر والأس السالب'),
        goal: say('$a^{0}=1$ eta $a^{-n}=\\frac{1}{a^{n}}$ erabiltzea, oinarri zatikiekin ere.', 'Usar $a^{0}=1$ y $a^{-n}=\\frac{1}{a^{n}}$, también con bases fraccionarias.', 'استعمال $a^{0}=1$ و$a^{-n}=\\frac{1}{a^{n}}$ حتى مع الأسس الكسرية.'),
        explanation: say(
            'Berreturen eskailera jaitsiz gero, maila bakoitzean oinarriaz zatitzen da: $2^{3}=8$, $2^{2}=4$, $2^{1}=2$, $2^{0}=1$, $2^{-1}=\\frac{1}{2}$, $2^{-2}=\\frac{1}{4}$. Horregatik, 0 ez den edozein oinarrirekin $a^{0}=1$, eta berretzaile negatiboak alderantzizkoa adierazten du: $a^{-n}=\\frac{1}{a^{n}}$. Zatiki batekin, buelta eman eta berretzailea positibo bihurtzen da: $\\left(\\frac{2}{3}\\right)^{-2}=\\left(\\frac{3}{2}\\right)^{2}=\\frac{9}{4}$. Berretzaile negatiboak ez du emaitza negatiboa ematen: $2^{-3}=\\frac{1}{8}$ positiboa da.',
            'Si bajas por la escalera de potencias, en cada escalón se divide entre la base: $2^{3}=8$, $2^{2}=4$, $2^{1}=2$, $2^{0}=1$, $2^{-1}=\\frac{1}{2}$, $2^{-2}=\\frac{1}{4}$. Por eso, con cualquier base distinta de 0, $a^{0}=1$, y el exponente negativo indica el inverso: $a^{-n}=\\frac{1}{a^{n}}$. Con una fracción se da la vuelta y el exponente pasa a positivo: $\\left(\\frac{2}{3}\\right)^{-2}=\\left(\\frac{3}{2}\\right)^{2}=\\frac{9}{4}$. Un exponente negativo no da un resultado negativo: $2^{-3}=\\frac{1}{8}$ es positivo.',
            'إذا نزلنا على سُلّم القوى فإننا في كل درجة نقسم على الأساس: $2^{3}=8$ و$2^{2}=4$ و$2^{1}=2$ و$2^{0}=1$ و$2^{-1}=\\frac{1}{2}$ و$2^{-2}=\\frac{1}{4}$. لذلك $a^{0}=1$ لأي أساس غير الصفر، ويدل الأس السالب على المقلوب: $a^{-n}=\\frac{1}{a^{n}}$. ومع الكسر نقلبه ويصير الأس موجبًا: $\\left(\\frac{2}{3}\\right)^{-2}=\\left(\\frac{3}{2}\\right)^{2}=\\frac{9}{4}$. والأس السالب لا يعطي نتيجة سالبة: $2^{-3}=\\frac{1}{8}$ موجبة.'
        ),
        problem: same('$\\left(-\\frac{1}{2}\\right)^{-3}$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Buelta eman zatikiari eta berretzailea positibo.', 'Da la vuelta a la fracción y el exponente pasa a positivo.', 'اقلب الكسر واجعل الأس موجبًا.'), math: same('$(-2)^{3}$') },
            { text: say('Berretzaile bakoitia: zeinua negatiboa.', 'Exponente impar: signo negativo.', 'أس فردي: إشارة سالبة.'), math: same('$-2^{3}$') },
            { text: say('Kalkulatu.', 'Calcula.', 'احسب.'), math: same('$-8$') }
        ],
        example: same('$5^{-2}=\\frac{1}{25}$'),
        takeaway: say('Zero berretzailea: $5^{0}=1$. Berretzaile negatiboa: alderantzizkoa, ez emaitza negatiboa.', 'Exponente cero: $5^{0}=1$. Exponente negativo: el inverso, no un resultado negativo.', 'الأس صفر: $5^{0}=1$. الأس السالب: المقلوب لا نتيجة سالبة.'),
        figure: (language) => <PowersFigure language={language} />
    },
    {
        id: 'power-rules',
        stage: 'powers',
        title: say('Berreturen propietateak', 'Propiedades de las potencias', 'خصائص القوى'),
        goal: say('Propietateak erabiltzea berreturak berretura bakarrean laburtzeko.', 'Usar las propiedades para reducir varias potencias a una sola.', 'استعمال الخصائص لاختصار عدة قوى في قوة واحدة.'),
        explanation: say(
            'Oinarri bereko berreturak biderkatzean berretzaileak batu egiten dira, $a^{m}\\cdot a^{n}=a^{m+n}$; zatitzean kendu, $a^{m}:a^{n}=a^{m-n}$; eta berretura baten berretura kalkulatzean biderkatu, $(a^{m})^{n}=a^{m\\cdot n}$. Berretzaile bera badute, oinarriak biderkatu edo zatitu daitezke: $a^{n}\\cdot b^{n}=(a\\cdot b)^{n}$ eta $a^{n}:b^{n}=(a:b)^{n}$. Ez nahastu: $(a+b)^{2}$ ez da $a^{2}+b^{2}$.',
            'Al multiplicar potencias de la misma base se suman los exponentes, $a^{m}\\cdot a^{n}=a^{m+n}$; al dividir se restan, $a^{m}:a^{n}=a^{m-n}$; y al elevar una potencia a otro exponente se multiplican, $(a^{m})^{n}=a^{m\\cdot n}$. Si tienen el mismo exponente, se pueden multiplicar o dividir las bases: $a^{n}\\cdot b^{n}=(a\\cdot b)^{n}$ y $a^{n}:b^{n}=(a:b)^{n}$. No las mezcles: $(a+b)^{2}$ no es $a^{2}+b^{2}$.',
            'عند ضرب قوى لها الأساس نفسه نجمع الأسس $a^{m}\\cdot a^{n}=a^{m+n}$، وعند القسمة نطرحها $a^{m}:a^{n}=a^{m-n}$، وعند رفع قوة إلى أس آخر نضرب الأسس $(a^{m})^{n}=a^{m\\cdot n}$. وإذا كان لها الأس نفسه يمكن ضرب الأسس أو قسمتها: $a^{n}\\cdot b^{n}=(a\\cdot b)^{n}$ و$a^{n}:b^{n}=(a:b)^{n}$. لا تخلط بينها: $(a+b)^{2}$ ليست $a^{2}+b^{2}$.'
        ),
        problem: same('$\\frac{3^{5}\\cdot 3^{-2}}{3^{4}}$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Goian, oinarri bera: batu berretzaileak.', 'Arriba, misma base: suma los exponentes.', 'في البسط الأساس نفسه: اجمع الأسس.'), math: same('$\\frac{3^{5-2}}{3^{4}}=\\frac{3^{3}}{3^{4}}$') },
            { text: say('Zatitzean, kendu berretzaileak.', 'Al dividir, resta los exponentes.', 'عند القسمة اطرح الأسس.'), math: same('$3^{3-4}=3^{-1}$') },
            { text: say('Berretzaile negatiboa: alderantzizkoa.', 'Exponente negativo: el inverso.', 'الأس السالب: المقلوب.'), math: same('$\\frac{1}{3}$') }
        ],
        example: same('$(2^{3})^{2}=2^{6}$'),
        takeaway: say('Oinarri bera: biderkatzean batu, zatitzean kendu, berreturaren berreturan biderkatu.', 'Misma base: al multiplicar suma, al dividir resta, en la potencia de potencia multiplica.', 'الأساس نفسه: في الضرب اجمع، وفي القسمة اطرح، وفي قوة القوة اضرب.'),
        figure: (language) => <PowerRulesFigure language={language} />
    },

    /* ---------- 2. Scientific notation ---------- */
    {
        id: 'sci-write',
        stage: 'scientific',
        title: say('Zenbakiak idazkera zientifikoan', 'Escribir en notación científica', 'الكتابة بالترميز العلمي'),
        goal: say('Zenbaki oso handiak eta oso txikiak $a\\cdot 10^{n}$ forman idaztea, eta alderantziz.', 'Escribir números muy grandes y muy pequeños como $a\\cdot 10^{n}$, y al revés.', 'كتابة الأعداد الكبيرة جدًا والصغيرة جدًا على صورة $a\\cdot 10^{n}$ والعكس.'),
        explanation: say(
            'Idazkera zientifikoan zenbaki bat $a\\cdot 10^{n}$ gisa idazten da, $1\\le a<10$ eta $n$ osoa izanik. Zenbaki handietan komak ezkerrera egiten du jauzi eta $n$ positiboa da: $45\\,000=4{,}5\\cdot 10^{4}$. Zenbaki txikietan komak eskuinera egiten du jauzi eta $n$ negatiboa da: $0{,}0006=6\\cdot 10^{-4}$. Jauzi kopurua da berretzailearen balio absolutua. Ikusi: $a$ ez da $10$ edo handiagoa izan behar, ezta $1$ baino txikiagoa ere.',
            'En notación científica un número se escribe como $a\\cdot 10^{n}$, con $1\\le a<10$ y $n$ entero. En los números grandes la coma salta a la izquierda y $n$ es positivo: $45\\,000=4{,}5\\cdot 10^{4}$. En los pequeños la coma salta a la derecha y $n$ es negativo: $0{,}0006=6\\cdot 10^{-4}$. El número de saltos es el valor absoluto del exponente. Ojo: $a$ no puede ser 10 o más, ni menor que 1.',
            'في الترميز العلمي يُكتب العدد على صورة $a\\cdot 10^{n}$ حيث $1\\le a<10$ و$n$ عدد صحيح. في الأعداد الكبيرة تقفز الفاصلة إلى اليسار ويكون $n$ موجبًا: $45\\,000=4{,}5\\cdot 10^{4}$. وفي الأعداد الصغيرة تقفز الفاصلة إلى اليمين ويكون $n$ سالبًا: $0{,}0006=6\\cdot 10^{-4}$. عدد القفزات هو القيمة المطلقة للأس. انتبه: لا يجوز أن يكون $a$ أكبر من أو يساوي 10 ولا أصغر من 1.'
        ),
        problem: same('$0{,}000\\,072$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Eraman koma zifra esanguratsu bakarra gelditu arte.', 'Mueve la coma hasta dejar una sola cifra distinta de 0 delante.', 'حرّك الفاصلة حتى يبقى رقم واحد غير صفر قبلها.'), math: same('$7{,}2$') },
            { text: say('Zenbatu jauziak: 5, eskuinera.', 'Cuenta los saltos: 5, a la derecha.', 'عدّ القفزات: 5 نحو اليمين.'), math: same('$10^{-5}$') },
            { text: say('Idatzi.', 'Escribe el resultado.', 'اكتب النتيجة.'), math: same('$7{,}2\\cdot 10^{-5}$') }
        ],
        example: same('$3{,}2\\cdot 10^{6}=3\\,200\\,000$'),
        takeaway: say('Handia: berretzaile positiboa. Txikia: berretzaile negatiboa. Komaren aurretik zifra bakarra, 0 ez dena.', 'Grande: exponente positivo. Pequeño: exponente negativo. Delante de la coma, una sola cifra distinta de 0.', 'الكبير: أس موجب. الصغير: أس سالب. قبل الفاصلة رقم واحد غير صفر.'),
        figure: (language) => <ScientificFigure language={language} />
    },
    {
        id: 'sci-compare',
        stage: 'scientific',
        title: say('Magnitude-ordena eta konparaketa', 'Orden de magnitud y comparación', 'رتبة المقدار والمقارنة'),
        goal: say('Idazkera zientifikoko zenbakiak konparatzea eta ordenatzea, eta magnitude-ordena ezagutzea.', 'Comparar y ordenar números en notación científica y reconocer el orden de magnitud.', 'مقارنة وترتيب الأعداد المكتوبة بالترميز العلمي ومعرفة رتبة المقدار.'),
        explanation: say(
            'Idazkera zientifikoan, berretzaile handiena duen zenbakia da handiena: $2\\cdot 10^{6}>9\\cdot 10^{5}$. Berretzaileak berdinak badira, konparatu $a$ zenbakiak: $3{,}1\\cdot 10^{4}<3{,}8\\cdot 10^{4}$. Berretzaile negatiboekin, handiena hurbilen dagoena da zerotik: $5\\cdot 10^{-3}>5\\cdot 10^{-6}$. Berretzaileak ematen du magnitude-ordena: hidrogeno-atomo batek $10^{-10}$ m inguru neurtzen du, eta Lurra $10^{7}$ m inguru da; elkarren artean $17$ ordena daude.',
            'En notación científica, el número con mayor exponente es el mayor: $2\\cdot 10^{6}>9\\cdot 10^{5}$. Si los exponentes son iguales, se comparan los números $a$: $3{,}1\\cdot 10^{4}<3{,}8\\cdot 10^{4}$. Con exponentes negativos, el mayor es el más cercano a cero: $5\\cdot 10^{-3}>5\\cdot 10^{-6}$. El exponente da el orden de magnitud: un átomo de hidrógeno mide unos $10^{-10}$ m y la Tierra, unos $10^{7}$ m; los separan $17$ órdenes de magnitud.',
            'في الترميز العلمي العدد ذو الأس الأكبر هو الأكبر: $2\\cdot 10^{6}>9\\cdot 10^{5}$. وإذا تساوت الأسس قارنّا الأعداد $a$: $3{,}1\\cdot 10^{4}<3{,}8\\cdot 10^{4}$. ومع الأسس السالبة الأكبر هو الأقرب إلى الصفر: $5\\cdot 10^{-3}>5\\cdot 10^{-6}$. والأس يعطي رتبة المقدار: يبلغ طول ذرة الهيدروجين نحو $10^{-10}$ م والأرض نحو $10^{7}$ م، وبينهما $17$ رتبة مقدار.'
        ),
        problem: say('$8\\cdot 10^{-4}$ eta $2\\cdot 10^{-3}$', '$8\\cdot 10^{-4}$ y $2\\cdot 10^{-3}$', '$8\\cdot 10^{-4}$ و$2\\cdot 10^{-3}$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Konparatu berretzaileak: $-4$ eta $-3$.', 'Compara los exponentes: $-4$ y $-3$.', 'قارن الأسين: $-4$ و$-3$.'), math: same('$-3>-4$') },
            { text: say('Berretzaile handiena duena handiagoa da.', 'El que tiene mayor exponente es mayor.', 'صاحب الأس الأكبر هو الأكبر.'), math: same('$2\\cdot 10^{-3}>8\\cdot 10^{-4}$') },
            { text: say('Egiaztatu hamartarrekin.', 'Comprueba con decimales.', 'تحقق بالأعداد العشرية.'), math: same('$0{,}002>0{,}0008$') }
        ],
        example: same('$4\\cdot 10^{5}>9\\cdot 10^{4}$'),
        takeaway: say('Lehenik berretzaileak, gero zenbakiak. Berretzaileak magnitude-ordena ematen du.', 'Primero los exponentes, después los números. El exponente da el orden de magnitud.', 'أولًا الأسس ثم الأعداد. الأس يعطي رتبة المقدار.')
    },
    {
        id: 'sci-ops',
        stage: 'scientific',
        title: say('Eragiketak idazkera zientifikoan', 'Operaciones en notación científica', 'العمليات بالترميز العلمي'),
        goal: say('Idazkera zientifikoko zenbakiak biderkatzea, zatitzea, batzea eta kentzea.', 'Multiplicar, dividir, sumar y restar números en notación científica.', 'ضرب وقسمة وجمع وطرح الأعداد بالترميز العلمي.'),
        explanation: say(
            'Biderkatzeko, biderkatu zenbakiak eta batu berretzaileak; zatitzeko, zatitu zenbakiak eta kendu berretzaileak. Emaitzak $a\\ge 10$ edo $a<1$ ateratzen badu, egokitu: $(5\\cdot 10^{3})(4\\cdot 10^{2})=20\\cdot 10^{5}=2\\cdot 10^{6}$. Batzeko edo kentzeko berretzaile bera behar da: eraman bat bestearen berretzailera eta batu zenbakiak, $3{,}2\\cdot 10^{4}+8\\cdot 10^{3}=3{,}2\\cdot 10^{4}+0{,}8\\cdot 10^{4}=4\\cdot 10^{4}$.',
            'Para multiplicar se multiplican los números y se suman los exponentes; para dividir se dividen los números y se restan los exponentes. Si el resultado tiene $a\\ge 10$ o $a<1$, se ajusta: $(5\\cdot 10^{3})(4\\cdot 10^{2})=20\\cdot 10^{5}=2\\cdot 10^{6}$. Para sumar o restar hace falta el mismo exponente: se lleva uno al exponente del otro y se suman los números, $3{,}2\\cdot 10^{4}+8\\cdot 10^{3}=3{,}2\\cdot 10^{4}+0{,}8\\cdot 10^{4}=4\\cdot 10^{4}$.',
            'للضرب نضرب العددين ونجمع الأسين، وللقسمة نقسم العددين ونطرح الأسين. وإذا خرج $a\\ge 10$ أو $a<1$ ضبطناه: $(5\\cdot 10^{3})(4\\cdot 10^{2})=20\\cdot 10^{5}=2\\cdot 10^{6}$. وللجمع أو الطرح نحتاج إلى الأس نفسه: نحوّل أحدهما إلى أس الآخر ثم نجمع العددين، $3{,}2\\cdot 10^{4}+8\\cdot 10^{3}=3{,}2\\cdot 10^{4}+0{,}8\\cdot 10^{4}=4\\cdot 10^{4}$.'
        ),
        problem: same('$(6\\cdot 10^{5}):(3\\cdot 10^{-2})$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zatitu zenbakiak.', 'Divide los números.', 'اقسم العددين.'), math: same('$6:3=2$') },
            { text: say('Kendu berretzaileak.', 'Resta los exponentes.', 'اطرح الأسين.'), math: same('$5-(-2)=7$') },
            { text: say('Idatzi emaitza.', 'Escribe el resultado.', 'اكتب النتيجة.'), math: same('$2\\cdot 10^{7}$') }
        ],
        example: same('$(2\\cdot 10^{3})(3\\cdot 10^{4})=6\\cdot 10^{7}$'),
        takeaway: say('Biderkatzean berretzaileak batu, zatitzean kendu; batzeko, berretzaile bera.', 'Al multiplicar suma los exponentes, al dividir resta; para sumar, el mismo exponente.', 'في الضرب اجمع الأسس، وفي القسمة اطرحها؛ وللجمع الأس نفسه.'),
        figure: (language) => <ScientificOpsFigure language={language} />
    },

    /* ---------- 3. Roots and radicals ---------- */
    {
        id: 'roots',
        stage: 'roots',
        title: say('Erro karratuak eta kuboak', 'Raíces cuadradas y cúbicas', 'الجذور التربيعية والتكعيبية'),
        goal: say('Erro zehatzak eta ez-zehatzak bereiztea, eta berreturaren alderantzizko eragiketa gisa ulertzea.', 'Distinguir raíces exactas e inexactas y entender la raíz como operación inversa de la potencia.', 'التمييز بين الجذور الصحيحة وغير الصحيحة وفهم الجذر عملية عكسية للقوة.'),
        explanation: say(
            'Erroa berreturaren alderantzizko eragiketa da: $\\sqrt{25}=5$ delako $5^{2}=25$, eta $\\sqrt[3]{-8}=-2$ delako $(-2)^{3}=-8$. Erro karratuak ($\\sqrt{\\ \\ }$) positiboa hartzen du, baina zenbaki negatibo baten erro karratua ez da existitzen zenbaki errealen artean. Indize bakoitiko erroek errokizunaren zeinua dute. Karratu perfektua ez den zenbaki baten erroa ez da zehatza: $\\sqrt{7}=2{,}6457\\ldots$ hamartar infinitua eta ez-periodikoa da.',
            'La raíz es la operación inversa de la potencia: $\\sqrt{25}=5$ porque $5^{2}=25$, y $\\sqrt[3]{-8}=-2$ porque $(-2)^{3}=-8$. La raíz cuadrada ($\\sqrt{\\ \\ }$) toma el valor positivo, y la de un número negativo no existe entre los números reales. Las raíces de índice impar tienen el signo del radicando. Si el número no es un cuadrado perfecto, la raíz no es exacta: $\\sqrt{7}=2{,}6457\\ldots$ tiene infinitos decimales no periódicos.',
            'الجذر عملية عكسية للقوة: $\\sqrt{25}=5$ لأن $5^{2}=25$ و$\\sqrt[3]{-8}=-2$ لأن $(-2)^{3}=-8$. الجذر التربيعي ($\\sqrt{\\ \\ }$) يأخذ القيمة الموجبة، ولا يوجد جذر تربيعي لعدد سالب بين الأعداد الحقيقية. وجذور الدليل الفردي لها إشارة ما تحت الجذر. وإذا لم يكن العدد مربعًا كاملًا فالجذر غير صحيح: $\\sqrt{7}=2{,}6457\\ldots$ له أرقام عشرية لا نهائية غير دورية.'
        ),
        problem: same('$\\sqrt{196}$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zer zenbakik emango du 196 karratura jasota? Egin tanteoa: $14^{2}$.', '¿Qué número elevado al cuadrado da 196? Tantea: $14^{2}$.', 'أي عدد مربعه 196؟ جرّب: $14^{2}$.'), math: same('$14\\cdot 14=196$') },
            { text: say('Erro karratua positiboa da.', 'La raíz cuadrada es positiva.', 'الجذر التربيعي موجب.'), math: same('$\\sqrt{196}=14$') }
        ],
        example: same('$\\sqrt[3]{27}=3$'),
        takeaway: say('Erroa berreturaren alderantzizkoa da. Karratu perfektuak ez diren zenbakien erroak ez dira zehatzak.', 'La raíz es la inversa de la potencia. Si no es cuadrado perfecto, la raíz no es exacta.', 'الجذر هو عكس القوة. وإذا لم يكن مربعًا كاملًا فالجذر غير صحيح.'),
        figure: (language) => <RootsFigure language={language} />
    },
    {
        id: 'extract',
        stage: 'roots',
        title: say('Faktoreak erroitik ateratzea', 'Sacar factores de la raíz', 'إخراج العوامل من الجذر'),
        goal: say('Errokizuna faktore lehenetan deskonposatu eta karratu perfektuak erroitik ateratzea.', 'Descomponer el radicando en factores primos y sacar de la raíz los cuadrados perfectos.', 'تحليل ما تحت الجذر إلى عوامل أولية وإخراج المربعات الكاملة.'),
        explanation: say(
            'Errokizuna faktore lehenetan deskonposatzen da, eta bikoteak erroitik ateratzen dira: $\\sqrt{72}=\\sqrt{2^{3}\\cdot 3^{2}}=\\sqrt{2^{2}\\cdot 3^{2}\\cdot 2}=2\\cdot 3\\cdot\\sqrt{2}=6\\sqrt{2}$. Berretzaile bikoitia duen faktore bakoitzetik, erdia ateratzen da. Gelditzen dena ($\\sqrt{2}$) errokizun murriztu bat da, eta hori da adierazpen sinplifikatua. $\\sqrt{50}=5\\sqrt{2}$ eta $\\sqrt{18}=3\\sqrt{2}$ bezala, errokizun berdina duten erroak antzekoak dira.',
            'El radicando se descompone en factores primos y los pares salen de la raíz: $\\sqrt{72}=\\sqrt{2^{3}\\cdot 3^{2}}=\\sqrt{2^{2}\\cdot 3^{2}\\cdot 2}=2\\cdot 3\\cdot\\sqrt{2}=6\\sqrt{2}$. De cada factor con exponente par sale la mitad del exponente. Lo que queda ($\\sqrt{2}$) es un radicando reducido, y esa es la expresión simplificada. Como $\\sqrt{50}=5\\sqrt{2}$ y $\\sqrt{18}=3\\sqrt{2}$, las raíces con el mismo radicando reducido son semejantes.',
            'نحلّل ما تحت الجذر إلى عوامل أولية وتخرج الأزواج من الجذر: $\\sqrt{72}=\\sqrt{2^{3}\\cdot 3^{2}}=\\sqrt{2^{2}\\cdot 3^{2}\\cdot 2}=2\\cdot 3\\cdot\\sqrt{2}=6\\sqrt{2}$. من كل عامل أسه زوجي يخرج نصف الأس. وما يبقى ($\\sqrt{2}$) هو ما تحت الجذر المختزل، وهذه هي الصيغة المبسّطة. وبما أن $\\sqrt{50}=5\\sqrt{2}$ و$\\sqrt{18}=3\\sqrt{2}$ فالجذور التي لها ما تحت الجذر المختزل نفسه متشابهة.'
        ),
        problem: same('$\\sqrt{180}$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Faktorizatu.', 'Factoriza.', 'حلّل.'), math: same('$180=2^{2}\\cdot 3^{2}\\cdot 5$') },
            { text: say('Atera bikoteak.', 'Saca los pares.', 'أخرج الأزواج.'), math: same('$\\sqrt{2^{2}\\cdot 3^{2}\\cdot 5}=2\\cdot 3\\cdot\\sqrt{5}$') },
            { text: say('Sinplifikatu.', 'Simplifica.', 'بسّط.'), math: same('$6\\sqrt{5}$') }
        ],
        example: same('$\\sqrt{48}=4\\sqrt{3}$'),
        takeaway: say('Faktorizatu eta atera bikoteak. Errokizunak ezin du karratu perfekturik izan.', 'Factoriza y saca los pares. El radicando no puede quedar con un cuadrado perfecto.', 'حلّل وأخرج الأزواج. ولا يجوز أن يبقى مربع كامل تحت الجذر.'),
        figure: (language) => <SimplifyFigure language={language} />
    },
    {
        id: 'introduce',
        stage: 'roots',
        title: say('Faktoreak erroan sartzea', 'Meter factores en la raíz', 'إدخال العوامل في الجذر'),
        goal: say('Erroaren aurreko faktorea errokizunean sartzea, adierazpenak konparatzeko.', 'Introducir el factor de delante dentro del radicando para comparar expresiones.', 'إدخال العامل الذي أمام الجذر تحت الجذر لمقارنة العبارات.'),
        explanation: say(
            'Faktoreak ateratzearen alderantzizkoa ere egin daiteke: erroaren aurreko zenbakia karratura jaso eta errokizunarekin biderkatzen da, $3\\sqrt{5}=\\sqrt{3^{2}\\cdot 5}=\\sqrt{45}$. Hau erabilgarria da erroak konparatzeko: $2\\sqrt{7}$ eta $3\\sqrt{3}$ zein den handiagoa jakiteko, sartu faktoreak, $\\sqrt{28}$ eta $\\sqrt{27}$ lortuko dituzu, eta $\\sqrt{28}>\\sqrt{27}$.',
            'También se puede hacer lo contrario que al sacar factores: el número de delante se eleva al cuadrado y se multiplica por el radicando, $3\\sqrt{5}=\\sqrt{3^{2}\\cdot 5}=\\sqrt{45}$. Sirve para comparar raíces: para saber cuál es mayor, $2\\sqrt{7}$ o $3\\sqrt{3}$, se meten los factores y salen $\\sqrt{28}$ y $\\sqrt{27}$, y $\\sqrt{28}>\\sqrt{27}$.',
            'يمكن أيضًا عكس إخراج العوامل: نرفع العدد الذي أمام الجذر إلى التربيع ونضربه في ما تحت الجذر، $3\\sqrt{5}=\\sqrt{3^{2}\\cdot 5}=\\sqrt{45}$. وهذا مفيد لمقارنة الجذور: لمعرفة الأكبر بين $2\\sqrt{7}$ و$3\\sqrt{3}$ ندخل العاملين فنحصل على $\\sqrt{28}$ و$\\sqrt{27}$، و$\\sqrt{28}>\\sqrt{27}$.'
        ),
        problem: same('$4\\sqrt{3}$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Jaso aurreko faktorea karratura.', 'Eleva al cuadrado el factor de delante.', 'ارفع العامل الذي في الأمام إلى التربيع.'), math: same('$4^{2}=16$') },
            { text: say('Biderkatu errokizunarekin.', 'Multiplícalo por el radicando.', 'اضربه في ما تحت الجذر.'), math: same('$16\\cdot 3=48$') },
            { text: say('Sartu erroan.', 'Mételo en la raíz.', 'أدخله تحت الجذر.'), math: same('$4\\sqrt{3}=\\sqrt{48}$') }
        ],
        example: same('$5\\sqrt{2}=\\sqrt{50}$'),
        takeaway: say('Aurreko faktorea karratura jaso eta errokizunarekin biderkatu. Konparatzeko erabilgarria.', 'El factor de delante se eleva al cuadrado y se multiplica por el radicando. Útil para comparar.', 'يُرفع العامل الأمامي إلى التربيع ويُضرب في ما تحت الجذر. مفيد للمقارنة.')
    },
    {
        id: 'radical-ops',
        stage: 'roots',
        title: say('Batuketa eta biderketa erradikalekin', 'Sumar y multiplicar radicales', 'جمع وضرب الجذور'),
        goal: say('Erradikal antzekoak batzea eta kentzea, eta erroak biderkatzea eta zatitzea.', 'Sumar y restar radicales semejantes, y multiplicar y dividir raíces.', 'جمع وطرح الجذور المتشابهة وضرب الجذور وقسمتها.'),
        explanation: say(
            'Erradikalak antzekoak direnean bakarrik batu edo kendu daitezke, koefizienteak eragiten dira: $5\\sqrt{3}-2\\sqrt{3}+\\sqrt{3}=4\\sqrt{3}$. Antzekoak ez badira, lehenik faktoreak atera: $\\sqrt{8}+\\sqrt{18}=2\\sqrt{2}+3\\sqrt{2}=5\\sqrt{2}$. Erroak ez dira errokizunak batuz batzen: $\\sqrt{9}+\\sqrt{16}=7$, baina $\\sqrt{25}=5$. Biderkatzeko, errokizunak biderkatu: $\\sqrt{2}\\cdot\\sqrt{8}=\\sqrt{16}=4$; zatitzeko, errokizunak zatitu.',
            'Solo se pueden sumar o restar radicales semejantes, operando con los coeficientes: $5\\sqrt{3}-2\\sqrt{3}+\\sqrt{3}=4\\sqrt{3}$. Si no lo son, se sacan primero los factores: $\\sqrt{8}+\\sqrt{18}=2\\sqrt{2}+3\\sqrt{2}=5\\sqrt{2}$. Las raíces no se suman sumando los radicandos: $\\sqrt{9}+\\sqrt{16}=7$, pero $\\sqrt{25}=5$. Para multiplicar se multiplican los radicandos: $\\sqrt{2}\\cdot\\sqrt{8}=\\sqrt{16}=4$; para dividir, se dividen.',
            'لا يجوز جمع أو طرح الجذور إلا إذا كانت متشابهة، ونعمل على المعاملات: $5\\sqrt{3}-2\\sqrt{3}+\\sqrt{3}=4\\sqrt{3}$. وإذا لم تكن متشابهة نخرج العوامل أولًا: $\\sqrt{8}+\\sqrt{18}=2\\sqrt{2}+3\\sqrt{2}=5\\sqrt{2}$. ولا تُجمع الجذور بجمع ما تحتها: $\\sqrt{9}+\\sqrt{16}=7$ لكن $\\sqrt{25}=5$. وللضرب نضرب ما تحت الجذر: $\\sqrt{2}\\cdot\\sqrt{8}=\\sqrt{16}=4$، وللقسمة نقسمه.'
        ),
        problem: same('$\\sqrt{50}-\\sqrt{8}+\\sqrt{2}$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Atera faktoreak erro bakoitzetik.', 'Saca factores de cada raíz.', 'أخرج العوامل من كل جذر.'), math: same('$5\\sqrt{2}-2\\sqrt{2}+\\sqrt{2}$') },
            { text: say('Antzekoak dira: eragin koefizienteekin.', 'Son semejantes: opera los coeficientes.', 'متشابهة: اعمل على المعاملات.'), math: same('$(5-2+1)\\sqrt{2}$') },
            { text: say('Emaitza.', 'Resultado.', 'النتيجة.'), math: same('$4\\sqrt{2}$') }
        ],
        example: same('$\\sqrt{3}\\cdot\\sqrt{12}=\\sqrt{36}=6$'),
        takeaway: say('Antzekoak bakarrik batzen dira. Erroak ez dira errokizunak batuz batzen.', 'Solo se suman los semejantes. Las raíces no se suman sumando los radicandos.', 'لا تُجمع إلا المتشابهة. ولا تُجمع الجذور بجمع ما تحتها.'),
        figure: (language) => <RadicalOpsFigure language={language} />
    },

    /* ---------- 4. Real numbers ---------- */
    {
        id: 'irrational',
        stage: 'reals',
        title: say('Zenbaki arrazionalak eta irrazionalak', 'Números racionales e irracionales', 'الأعداد النسبية وغير النسبية'),
        goal: say('Zenbaki bat arrazionala edo irrazionala den erabakitzea.', 'Decidir si un número es racional o irracional.', 'تحديد ما إذا كان العدد نسبيًا أم غير نسبي.'),
        explanation: say(
            'Zenbaki arrazionalak zatiki gisa idatz daitezke, eta haien adierazpen hamartarra zehatza edo periodikoa da: $\\frac{3}{4}=0{,}75$, $\\frac{1}{3}=0{,}\\overline{3}$. Zenbaki irrazionalek zifra hamartar infinituak dituzte, periodorik gabe: $\\sqrt{2}=1{,}41421\\ldots$ eta $\\pi=3{,}14159\\ldots$ Karratu perfektuen erroak arrazionalak dira, $\\sqrt{49}=7$; gainerakoak irrazionalak, $\\sqrt{10}$. Kontuz: $3{,}14$ eta $\\frac{22}{7}$ arrazionalak dira; $\\pi$ ez. Arrazionalek eta irrazionalek zenbaki errealak osatzen dituzte.',
            'Los números racionales se pueden escribir como fracción y su expresión decimal es exacta o periódica: $\\frac{3}{4}=0{,}75$, $\\frac{1}{3}=0{,}\\overline{3}$. Los irracionales tienen infinitas cifras decimales sin periodo: $\\sqrt{2}=1{,}41421\\ldots$ y $\\pi=3{,}14159\\ldots$ Las raíces de cuadrados perfectos son racionales, $\\sqrt{49}=7$; las demás son irracionales, $\\sqrt{10}$. Ojo: $3{,}14$ y $\\frac{22}{7}$ son racionales; $\\pi$ no. Racionales e irracionales juntos forman los números reales.',
            'الأعداد النسبية يمكن كتابتها على شكل كسر، وتمثيلها العشري صحيح أو دوري: $\\frac{3}{4}=0{,}75$ و$\\frac{1}{3}=0{,}\\overline{3}$. وغير النسبية لها أرقام عشرية لا نهائية بلا دور: $\\sqrt{2}=1{,}41421\\ldots$ و$\\pi=3{,}14159\\ldots$ وجذور المربعات الكاملة نسبية $\\sqrt{49}=7$، وغيرها غير نسبي $\\sqrt{10}$. انتبه: $3{,}14$ و$\\frac{22}{7}$ نسبيان أما $\\pi$ فلا. والنسبية وغير النسبية معًا تكوّن الأعداد الحقيقية.'
        ),
        problem: same('$\\sqrt{81},\\ \\sqrt{15},\\ 0{,}\\overline{45}$'),
        stepsKind: 'steps',
        steps: [
            { text: say('$\\sqrt{81}=9$: arrazionala.', '$\\sqrt{81}=9$: racional.', '$\\sqrt{81}=9$: نسبي.'), math: same('$9=\\frac{9}{1}$') },
            { text: say('$15$ ez da karratu perfektua: irrazionala.', '$15$ no es cuadrado perfecto: irracional.', '$15$ ليس مربعًا كاملًا: غير نسبي.'), math: same('$\\sqrt{15}=3{,}87\\ldots$') },
            { text: say('Hamartar periodikoa: arrazionala.', 'Decimal periódico: racional.', 'عشري دوري: نسبي.'), math: same('$0{,}\\overline{45}=\\frac{5}{11}$') }
        ],
        example: same('$\\sqrt{2}\\notin\\mathbb{Q}$'),
        takeaway: say('Arrazionala: zatiki bat, hamartar zehatza edo periodikoa. Irrazionala: infinitua eta periodorik gabea.', 'Racional: una fracción, decimal exacto o periódico. Irracional: infinitas cifras sin periodo.', 'النسبي: كسر، عشري صحيح أو دوري. غير النسبي: أرقام لا نهائية بلا دور.'),
        figure: (language) => <IrrationalFigure language={language} />
    },
    {
        id: 'real-line',
        stage: 'reals',
        title: say('Zuzen erreala', 'La recta real', 'المستقيم الحقيقي'),
        goal: say('Zenbaki errealak zuzenean kokatzea, irrazionalak eraikuntza geometrikoz ere.', 'Situar números reales en la recta, también los irracionales con una construcción geométrica.', 'تمثيل الأعداد الحقيقية على المستقيم ومنها غير النسبية بإنشاء هندسي.'),
        explanation: say(
            'Zenbaki erreal bakoitzak puntu bat du zuzenean, eta zuzeneko puntu bakoitzak zenbaki erreal bat. Zenbaki irrazionalak zehaztasunez kokatzeko, Pitagorasen teorema erabil daiteke: aldeak $1$ diren karratu baten diagonala $\\sqrt{2}$ da; konpasarekin diagonal horren luzera zuzenera eramaten da. Gero, aldeak $1$ eta $\\sqrt{2}$ diren triangelu zuzenaren hipotenusa $\\sqrt{3}$ da, eta horrela jarrai daiteke. Bi zenbaki errealen artean beti dago beste bat: infinitu daude.',
            'Cada número real tiene un punto en la recta, y cada punto de la recta, un número real. Para situar con exactitud un irracional se puede usar el teorema de Pitágoras: la diagonal de un cuadrado de lado $1$ mide $\\sqrt{2}$; con el compás se lleva esa longitud a la recta. Después, la hipotenusa del triángulo rectángulo de catetos $1$ y $\\sqrt{2}$ mide $\\sqrt{3}$, y así se puede seguir. Entre dos números reales siempre hay otro: hay infinitos.',
            'لكل عدد حقيقي نقطة على المستقيم ولكل نقطة على المستقيم عدد حقيقي. ولتمثيل عدد غير نسبي بدقة يمكن استعمال نظرية فيثاغورس: قطر مربع طول ضلعه $1$ يساوي $\\sqrt{2}$، وبالفرجار ننقل هذا الطول إلى المستقيم. ثم وتر المثلث القائم الذي ضلعاه $1$ و$\\sqrt{2}$ يساوي $\\sqrt{3}$ وهكذا. وبين أي عددين حقيقيين يوجد دائمًا عدد آخر: فهي لا نهائية.'
        ),
        problem: same('$\\sqrt{5}$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Idatzi karratuen batura: $5=2^{2}+1^{2}$.', 'Escribe como suma de cuadrados: $5=2^{2}+1^{2}$.', 'اكتب كمجموع مربعين: $5=2^{2}+1^{2}$.'), math: same('$\\sqrt{5}=\\sqrt{2^{2}+1^{2}}$') },
            { text: say('Eraiki aldeak $2$ eta $1$ dituen triangelu zuzena.', 'Construye el triángulo rectángulo de catetos $2$ y $1$.', 'ارسم المثلث القائم الذي ضلعاه $2$ و$1$.'), math: say('Hipotenusa: $\\sqrt{5}$', 'Hipotenusa: $\\sqrt{5}$', 'الوتر: $\\sqrt{5}$') },
            { text: say('Eraman hipotenusa zuzenera konpasarekin.', 'Lleva la hipotenusa a la recta con el compás.', 'انقل الوتر إلى المستقيم بالفرجار.'), math: same('$\\sqrt{5}\\approx 2{,}24$') }
        ],
        example: same('$\\sqrt{2}\\approx 1{,}41$'),
        takeaway: say('Zenbaki erreal bakoitza zuzeneko puntu bat da. Irrazionalak Pitagorasekin eraikitzen dira.', 'Cada número real es un punto de la recta. Los irracionales se construyen con Pitágoras.', 'كل عدد حقيقي نقطة على المستقيم. وتُنشأ غير النسبية بفيثاغورس.'),
        figure: (language) => <RealLineFigure language={language} />
    },
    {
        id: 'intervals',
        stage: 'reals',
        title: say('Tarteak', 'Intervalos', 'الفترات'),
        goal: say('Tarteak idaztea eta irakurtzea: itxiak, irekiak eta erdi-irekiak.', 'Escribir y leer intervalos: cerrados, abiertos y semiabiertos.', 'كتابة وقراءة الفترات: مغلقة ومفتوحة ونصف مفتوحة.'),
        explanation: say(
            'Tarte bat bi zenbakiren artean dauden zenbaki errealen multzoa da. Muturrak sartzen badira, tarte itxia da, $[a,b]$, eta zuzenean puntu beteekin marrazten da. Sartzen ez badira, tarte irekia da, $(a,b)$, eta puntu hutsekin. Erdi-irekia ere izan daiteke: $[a,b)$ edo $(a,b]$. Desberdintza gisa: $[2,5)$ da $2\\le x<5$. Tartearen luzera $b-a$ da, baina tarte bakoitzean infinitu zenbaki daude, bi muturrak oso hurbil egonda ere.',
            'Un intervalo es el conjunto de números reales que hay entre dos números. Si se incluyen los extremos es cerrado, $[a,b]$, y se dibuja con puntos llenos; si no, es abierto, $(a,b)$, con puntos vacíos. También puede ser semiabierto: $[a,b)$ o $(a,b]$. Como desigualdad, $[2,5)$ es $2\\le x<5$. La longitud del intervalo es $b-a$, pero en cada intervalo hay infinitos números, por muy cerca que estén los extremos.',
            'الفترة مجموعة الأعداد الحقيقية الواقعة بين عددين. إذا دخل الطرفان فهي مغلقة $[a,b]$ وتُرسم بنقاط ممتلئة، وإلا فهي مفتوحة $(a,b)$ بنقاط فارغة. وقد تكون نصف مفتوحة: $[a,b)$ أو $(a,b]$. وكمتباينة، $[2,5)$ تعني $2\\le x<5$. وطول الفترة $b-a$، لكن في كل فترة أعداد لا نهائية مهما تقارب الطرفان.'
        ),
        problem: same('$[-1,\\,4)$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ezkerreko muturra sartzen da (kortxete itxia).', 'El extremo izquierdo entra (corchete cerrado).', 'الطرف الأيسر داخل (قوس مغلق).'), math: same('$-1\\le x$') },
            { text: say('Eskuineko muturra ez da sartzen (parentesi irekia).', 'El extremo derecho no entra (paréntesis abierto).', 'الطرف الأيمن غير داخل (قوس مفتوح).'), math: same('$x<4$') },
            { text: say('Luzera: $4-(-1)$.', 'Longitud: $4-(-1)$.', 'الطول: $4-(-1)$.'), math: same('$5$') }
        ],
        example: same('$(0,\\,3]=\\{x:\\,0<x\\le 3\\}$'),
        takeaway: say('Kortxetea: muturra sartzen da. Parentesia: ez da sartzen. Luzera: muturra ken hasiera.', 'Corchete: el extremo entra. Paréntesis: no entra. Longitud: final menos principio.', 'القوس المربع: الطرف داخل. القوس العادي: غير داخل. الطول: النهاية ناقص البداية.'),
        figure: (language) => <IntervalsFigure language={language} />
    },

    /* ---------- 5. Approximations and error ---------- */
    {
        id: 'rounding',
        stage: 'approx',
        title: say('Trunkatzea eta biribiltzea', 'Truncar y redondear', 'البتر والتقريب'),
        goal: say('Zenbaki bat trunkatzea eta biribiltzea hamarrenetara, ehunenetara eta milaenetara.', 'Truncar y redondear un número a las décimas, centésimas y milésimas.', 'بتر عدد وتقريبه إلى الأعشار والأجزاء من مئة والأجزاء من ألف.'),
        explanation: say(
            'Zenbaki infinituak eta zenbaki luzeak hurbildu egin behar dira. Trunkatzean, kendu nahi diren zifrak zuzenean moztu egiten dira: $2{,}6457$ ehunenetara trunkatuta $2{,}64$ da. Biribiltzean, kendutako lehen zifra $5$ edo handiagoa bada, azken zifra mantendutakoari $1$ gehitzen zaio: $2{,}6457$ ehunenetara biribilduta $2{,}65$. Kontuz: $1{,}999$ hamarrenetara biribilduta $2{,}0$ da, eta trunkatuta $1{,}9$.',
            'Los números infinitos y los muy largos hay que aproximarlos. Al truncar, se cortan sin más las cifras que sobran: $2{,}6457$ truncado a las centésimas es $2{,}64$. Al redondear, si la primera cifra suprimida es $5$ o mayor, se suma $1$ a la última cifra que se conserva: $2{,}6457$ redondeado a las centésimas es $2{,}65$. Ojo: $1{,}999$ redondeado a las décimas es $2{,}0$, y truncado, $1{,}9$.',
            'الأعداد اللانهائية والطويلة جدًا يجب تقريبها. عند البتر نقطع الأرقام الزائدة فقط: $2{,}6457$ مبتورًا إلى الأجزاء من مئة يساوي $2{,}64$. وعند التقريب إذا كان أول رقم محذوف $5$ أو أكبر نضيف $1$ إلى آخر رقم نحتفظ به: $2{,}6457$ مقرّبًا إلى الأجزاء من مئة يساوي $2{,}65$. انتبه: $1{,}999$ مقرّبًا إلى الأعشار يساوي $2{,}0$ ومبتورًا $1{,}9$.'
        ),
        problem: say('$\\sqrt{7}=2{,}6457\\ldots$ milaenetara', '$\\sqrt{7}=2{,}6457\\ldots$ a las milésimas', '$\\sqrt{7}=2{,}6457\\ldots$ إلى الأجزاء من ألف'),
        stepsKind: 'steps',
        steps: [
            { text: say('Mantendu hiru hamartar: $2{,}645$.', 'Conserva tres decimales: $2{,}645$.', 'احتفظ بثلاثة أرقام عشرية: $2{,}645$.'), math: say('Kendu den lehen zifra: 7', 'Primera cifra suprimida: 7', 'أول رقم محذوف: 7') },
            { text: say('Trunkatuz: moztu.', 'Truncando: se corta.', 'بالبتر: نقطع.'), math: same('$2{,}645$') },
            { text: say('Biribilduz: $7\\ge 5$, gehitu $1$.', 'Redondeando: $7\\ge 5$, suma $1$.', 'بالتقريب: $7\\ge 5$ أضف $1$.'), math: same('$2{,}646$') }
        ],
        example: same('$3{,}14159\\approx 3{,}142$'),
        takeaway: say('Trunkatu: moztu. Biribildu: kendutako lehen zifra $\\ge 5$ bada, gehitu $1$.', 'Truncar: cortar. Redondear: si la primera cifra suprimida es $\\ge 5$, suma $1$.', 'البتر: قطع. التقريب: إذا كان أول رقم محذوف $\\ge 5$ أضف $1$.'),
        figure: (language) => <RoundingFigure language={language} />
    },
    {
        id: 'errors',
        stage: 'approx',
        title: say('Errore absolutua eta erlatiboa', 'Error absoluto y relativo', 'الخطأ المطلق والنسبي'),
        goal: say('Hurbilketa batean egindako errorea neurtzea, absolutua eta erlatiboa.', 'Medir el error cometido en una aproximación, absoluto y relativo.', 'قياس الخطأ المرتكب في تقريب ما، المطلق والنسبي.'),
        explanation: say(
            'Zenbaki zehatza $V$ bada eta hurbilketa $A$, errore absolutua haien arteko distantzia da: $E_{a}=|V-A|$. Errore erlatiboa errore absolutua zenbaki zehatzaz zatitzea da, $E_{r}=\\frac{E_{a}}{V}$, eta ehuneko gisa ere adieraz daiteke. Errore erlatiboak erakusten du errorea zenbat den neurtzen ari garenaren aldean: $1$ m-ko errorea $10$ m-ko luzeran handia da, baina $10$ km-ko luzeran ia ez da nabaritzen.',
            'Si el valor exacto es $V$ y la aproximación $A$, el error absoluto es la distancia entre ambos: $E_{a}=|V-A|$. El error relativo es el error absoluto dividido entre el valor exacto, $E_{r}=\\frac{E_{a}}{V}$, y también se puede dar en porcentaje. El error relativo muestra cuánto pesa el error respecto de lo que se mide: un error de $1$ m en una longitud de $10$ m es grande, pero en $10$ km casi no se nota.',
            'إذا كانت القيمة الصحيحة $V$ والتقريب $A$ فالخطأ المطلق هو المسافة بينهما: $E_{a}=|V-A|$. والخطأ النسبي هو الخطأ المطلق مقسومًا على القيمة الصحيحة $E_{r}=\\frac{E_{a}}{V}$ ويمكن إعطاؤه كنسبة مئوية. يُظهر الخطأ النسبي وزن الخطأ بالنسبة إلى ما نقيسه: خطأ $1$ م في طول $10$ م كبير لكنه في $10$ كم لا يكاد يُلاحظ.'
        ),
        problem: say('Zehatza $40$ da, hurbilketa $39$', 'Valor exacto $40$, aproximación $39$', 'القيمة الصحيحة $40$ والتقريب $39$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Errore absolutua.', 'Error absoluto.', 'الخطأ المطلق.'), math: same('$E_{a}=|40-39|=1$') },
            { text: say('Zatitu zenbaki zehatzaz.', 'Divide entre el valor exacto.', 'اقسم على القيمة الصحيحة.'), math: same('$E_{r}=\\frac{1}{40}$') },
            { text: say('Hamartar edo ehuneko.', 'Decimal o porcentaje.', 'عشري أو نسبة مئوية.'), math: same('$0{,}025=2{,}5\\,\\%$') }
        ],
        example: same('$E_{r}=\\frac{0{,}5}{10}=0{,}05$'),
        takeaway: say('Absolutua: distantzia. Erlatiboa: absolutua zatitu zehatzaz. Erlatiboak neurriarekin konparatzen du.', 'Absoluto: la distancia. Relativo: el absoluto entre el exacto. El relativo compara con lo que se mide.', 'المطلق: المسافة. النسبي: المطلق على الصحيح. والنسبي يقارن بما نقيسه.'),
        figure: (language) => <ErrorsFigure language={language} />
    }
]

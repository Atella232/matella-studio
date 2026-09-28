import type { UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { BalanceFigure } from '../dbh1-aljebra-v2/figures'
import { DenominatorsFigure, DiscriminantFigure, EquationPartsFigure, ProblemStepsFigure, StepsFigure, ZeroProductFigure } from './figures'

/* ==========================================================================
   Ekuazioak · 2. DBH — stages and lessons
   Sequence follows the class textbook (Santillana 2.º ESO unit 6,
   "Ecuaciones de primer y segundo grado") with Anaya 2.º ESO unit 7:
   meaning and elements, equivalent equations, first-degree equations with
   brackets and denominators, special cases, problems and second-degree
   equations (incomplete ones and the general formula).
   ========================================================================== */

export type EquationsStageId = 'basics' | 'first-degree' | 'denominators' | 'problems' | 'quadratic'

export const equationsStages: UnitStage[] = [
    { id: 'basics', tone: 'blue', title: { eu: 'Ekuazioak eta ebazpenak', es: 'Ecuaciones y soluciones', ar: 'المعادلات والحلول' } },
    { id: 'first-degree', tone: 'violet', title: { eu: 'Lehen mailako ekuazioak', es: 'Ecuaciones de primer grado', ar: 'معادلات الدرجة الأولى' } },
    { id: 'denominators', tone: 'mustard', title: { eu: 'Izendatzaileak dituzten ekuazioak', es: 'Ecuaciones con denominadores', ar: 'معادلات بمقامات' } },
    { id: 'problems', tone: 'coral', title: { eu: 'Buruketak ekuazioekin', es: 'Problemas con ecuaciones', ar: 'مسائل بالمعادلات' } },
    { id: 'quadratic', tone: 'green', title: { eu: 'Bigarren mailako ekuazioak', es: 'Ecuaciones de segundo grado', ar: 'معادلات الدرجة الثانية' } }
]

export const equationsTopics: UnitTopic[] = [
    {
        id: 'meaning',
        stage: 'basics',
        title: { eu: 'Ekuazioak eta identitateak', es: 'Ecuaciones e identidades', ar: 'المعادلات والمتطابقات' },
        goal: {
            eu: 'Ekuazioa eta identitatea bereiztea eta balio bat ebazpena den egiaztatzea.',
            es: 'Distinguir ecuación e identidad y comprobar si un valor es solución.',
            ar: 'التمييز بين المعادلة والمتطابقة والتحقق مما إذا كانت قيمة ما حلًّا.'
        },
        explanation: {
            eu: 'Identitatea letren edozein baliotarako betetzen den berdintza da ($2(x+1)=2x+2$). Ekuazioa, berriz, balio batzuetarako bakarrik betetzen da. Balio horiek ekuazioaren ebazpenak dira. Balio bat ebazpena den jakiteko, ordeztu x eta begiratu bi atalek balio bera ematen duten.',
            es: 'Una identidad es una igualdad que se cumple para cualquier valor de las letras ($2(x+1)=2x+2$). Una ecuación, en cambio, solo se cumple para algunos valores: son sus soluciones. Para saber si un valor es solución, sustituye la x y mira si los dos miembros dan lo mismo.',
            ar: 'المتطابقة مساواة تتحقق لأي قيمة للحروف ($2(x+1)=2x+2$). أما المعادلة فلا تتحقق إلا لبعض القيم، وهي حلولها. ولمعرفة هل قيمة ما حل، عوّض x وانظر هل يعطي الطرفان الشيء نفسه.'
        },
        problem: { eu: 'x = 3 ebazpena al da $2x+5=3x+2$ ekuazioan?', es: '¿Es x = 3 solución de $2x+5=3x+2$?', ar: 'هل x = 3 حل للمعادلة $2x+5=3x+2$؟' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Lehen atala.', es: 'Primer miembro.', ar: 'الطرف الأول.' }, math: '$2\\cdot 3+5=11$' },
            { text: { eu: 'Bigarren atala.', es: 'Segundo miembro.', ar: 'الطرف الثاني.' }, math: '$3\\cdot 3+2=11$' },
            { text: { eu: 'Berdinak dira: x = 3 ebazpena da.', es: 'Son iguales: x = 3 es solución.', ar: 'متساويان: x = 3 حل.' } }
        ],
        example: '$x+x=2x\\qquad x+2=8$',
        takeaway: {
            eu: 'Identitatea: beti egia. Ekuazioa: ebazpenetan bakarrik.',
            es: 'Identidad: siempre cierta. Ecuación: solo en sus soluciones.',
            ar: 'المتطابقة: صحيحة دائمًا. المعادلة: عند حلولها فقط.'
        },
        figure: (language) => <BalanceFigure language={language} />
    },
    {
        id: 'elements',
        stage: 'basics',
        title: { eu: 'Elementuak eta ekuazio baliokideak', es: 'Elementos y ecuaciones equivalentes', ar: 'العناصر والمعادلات المتكافئة' },
        goal: {
            eu: 'Ekuazio baten atalak, gaiak, ezezaguna eta maila ezagutzea, eta ekuazio baliokideak lortzea.',
            es: 'Reconocer miembros, términos, incógnita y grado de una ecuación, y obtener ecuaciones equivalentes.',
            ar: 'معرفة أطراف المعادلة وحدودها ومجهولها ودرجتها، والحصول على معادلات متكافئة.'
        },
        explanation: {
            eu: 'Ekuazio batek bi atal ditu, = ikurraren alde banatan; atal bakoitzeko batugaiak gaiak dira; letra ezezaguna da; eta maila ezezagunaren berretzailerik handiena. Bi ekuazio baliokideak dira ebazpen bera badute. Ekuazio baliokide bat lortzen da bi ataletan zenbaki bera batuz edo kenduz, edo bi atalak zenbaki berberaz (ez 0) biderkatuz edo zatituz: horregatik pasa daitezke gaiak atal batetik bestera.',
            es: 'Una ecuación tiene dos miembros, a cada lado del signo =; los sumandos de cada miembro son los términos; la letra es la incógnita, y el grado, el mayor exponente de la incógnita. Dos ecuaciones son equivalentes si tienen la misma solución. Se obtiene una ecuación equivalente sumando o restando el mismo número en los dos miembros, o multiplicando o dividiendo los dos por el mismo número (no 0): por eso se pueden pasar términos de un miembro a otro.',
            ar: 'للمعادلة طرفان على جانبي =؛ وحدود كل طرف هي مجاميعه؛ والحرف هو المجهول؛ والدرجة أكبر أس للمجهول. وتكون معادلتان متكافئتين إذا كان لهما الحل نفسه. ونحصل على معادلة مكافئة بجمع العدد نفسه أو طرحه في الطرفين، أو بضرب الطرفين أو قسمتهما على العدد نفسه (غير 0): لذلك يمكن نقل الحدود من طرف إلى آخر.'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Batzen → kentzen', es: 'Sumando → restando', ar: 'جمع ← طرح' }, text: { eu: 'Bi ataletan 5 kendu.', es: 'Restar 5 en los dos miembros.', ar: 'اطرح 5 من الطرفين.' }, math: '$x+5=12\\ \\to\\ x=7$' },
            { title: { eu: 'Biderkatzen → zatitzen', es: 'Multiplicando → dividiendo', ar: 'ضرب ← قسمة' }, text: { eu: 'Bi atalak 3z zatitu.', es: 'Dividir los dos miembros entre 3.', ar: 'اقسم الطرفين على 3.' }, math: '$3x=21\\ \\to\\ x=7$' },
            { title: { eu: 'Baliokideak', es: 'Equivalentes', ar: 'متكافئة' }, text: { eu: 'Ebazpen bera: x = 7.', es: 'La misma solución: x = 7.', ar: 'الحل نفسه: x = 7.' }, math: '$x+5=12\\ \\sim\\ 3x=21$' }
        ],
        example: '$4x=20\\ \\sim\\ 4x-5=15$',
        takeaway: {
            eu: 'Bi ataletan gauza bera eginez, ekuazioak orekan jarraitzen du.',
            es: 'Haciendo lo mismo en los dos miembros, la ecuación sigue en equilibrio.',
            ar: 'إذا فعلنا الشيء نفسه في الطرفين تبقى المعادلة متوازنة.'
        },
        figure: (language) => <EquationPartsFigure language={language} />
    },
    {
        id: 'simple',
        stage: 'first-degree',
        title: { eu: 'x bi ataletan', es: 'La x en los dos miembros', ar: 'x في الطرفين' },
        goal: {
            eu: '$ax+b=cx+d$ motako ekuazioak ebaztea gaiak transposatuz.',
            es: 'Resolver ecuaciones del tipo $ax+b=cx+d$ transponiendo términos.',
            ar: 'حل معادلات من النوع $ax+b=cx+d$ بنقل الحدود.'
        },
        explanation: {
            eu: 'Bildu x duten gai guztiak atal batean eta zenbakiak bestean: atalez aldatzen den gaiak zeinua aldatzen du. Laburtu bi atalak, eta askatu x: x-ren koefizientea zatitzen pasatzen da, bere zeinuarekin.',
            es: 'Agrupa todos los términos con x en un miembro y los números en el otro: el término que cambia de miembro cambia de signo. Reduce los dos miembros y despeja x: el coeficiente de x pasa dividiendo, con su signo.',
            ar: 'اجمع كل حدود x في طرف والأعداد في الآخر: الحد الذي ينتقل من طرف إلى آخر تتغيّر إشارته. بسّط الطرفين واعزل x: ينتقل معامل x قاسمًا بإشارته.'
        },
        problem: { eu: 'Ebatzi $5x-4=2x+11$.', es: 'Resuelve $5x-4=2x+11$.', ar: 'حلّ $5x-4=2x+11$.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: '2x ezkerrera (kentzen) eta −4 eskuinera (batzen).', es: '2x a la izquierda (restando) y −4 a la derecha (sumando).', ar: '2x إلى اليسار (طرحًا) و−4 إلى اليمين (جمعًا).' }, math: '$5x-2x=11+4$' },
            { text: { eu: 'Laburtu.', es: 'Reduce.', ar: 'بسّط.' }, math: '$3x=15$' },
            { text: { eu: 'Askatu x.', es: 'Despeja x.', ar: 'اعزل x.' }, math: '$x=5$' }
        ],
        example: '$4x-7=3-x\\ \\to\\ x=2$',
        takeaway: {
            eu: 'Atalez aldatzean, zeinua aldatu. Koefizientea zatitzen pasatzen da.',
            es: 'Al cambiar de miembro, cambia el signo. El coeficiente pasa dividiendo.',
            ar: 'عند تغيير الطرف تتغيّر الإشارة. وينتقل المعامل قاسمًا.'
        }
    },
    {
        id: 'brackets',
        stage: 'first-degree',
        title: { eu: 'Parentesiak dituzten ekuazioak', es: 'Ecuaciones con paréntesis', ar: 'معادلات بأقواس' },
        goal: {
            eu: 'Parentesiak dituzten ekuazioak ebaztea, urratsen ordena jarraituz.',
            es: 'Resolver ecuaciones con paréntesis siguiendo el orden de los pasos.',
            ar: 'حل معادلات بأقواس باتباع ترتيب الخطوات.'
        },
        explanation: {
            eu: 'Lehenik kendu parentesiak banaketa-propietatearekin; kontuz minus zeinuarekin: parentesiaren aurrean minus bat badago, barruko gai guztiek zeinua aldatzen dute. Gero, bildu, laburtu, askatu x eta egiaztatu.',
            es: 'Primero quita los paréntesis con la propiedad distributiva; cuidado con el signo menos: si hay un menos delante del paréntesis, todos los términos de dentro cambian de signo. Después agrupa, reduce, despeja x y comprueba.',
            ar: 'احذف الأقواس أولًا بخاصية التوزيع؛ وانتبه لإشارة الناقص: إذا سبق القوسَ ناقصٌ تتغيّر إشارة كل الحدود داخله. ثم اجمع وبسّط واعزل x وتحقّق.'
        },
        problem: { eu: 'Ebatzi $3(x-2)-(x-4)=8$.', es: 'Resuelve $3(x-2)-(x-4)=8$.', ar: 'حلّ $3(x-2)-(x-4)=8$.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Kendu parentesiak: minusaren atzean zeinuak aldatzen dira.', es: 'Quita paréntesis: tras el menos cambian los signos.', ar: 'احذف الأقواس: بعد الناقص تتغيّر الإشارات.' }, math: '$3x-6-x+4=8$' },
            { text: { eu: 'Bildu eta laburtu.', es: 'Agrupa y reduce.', ar: 'اجمع وبسّط.' }, math: '$2x=10$' },
            { text: { eu: 'Askatu x eta egiaztatu.', es: 'Despeja x y comprueba.', ar: 'اعزل x وتحقّق.' }, math: '$x=5\\qquad 3\\cdot 3-1=8$' }
        ],
        example: '$2(x+3)=x+10\\ \\to\\ x=4$',
        takeaway: {
            eu: 'Parentesiak → bildu → laburtu → askatu → egiaztatu.',
            es: 'Paréntesis → agrupar → reducir → despejar → comprobar.',
            ar: 'الأقواس ← الجمع ← التبسيط ← العزل ← التحقق.'
        },
        figure: (language) => <StepsFigure language={language} />
    },
    {
        id: 'special',
        stage: 'first-degree',
        title: { eu: 'Ebazpenik gabe edo infinitu ebazpenekin', es: 'Sin solución o con infinitas soluciones', ar: 'بلا حل أو بعدد لا نهائي من الحلول' },
        goal: {
            eu: 'Ebazpenik ez duten ekuazioak eta identitateak ezagutzea.',
            es: 'Reconocer ecuaciones sin solución e identidades.',
            ar: 'التعرّف إلى المعادلات التي لا حل لها وإلى المتطابقات.'
        },
        explanation: {
            eu: 'Batzuetan, laburtzean x desagertu egiten da. $0x=5$ bezalako berdintza bat geratzen bada, ez dago ebazpenik: ezein zenbaki bider 0 ez da 5. $0x=0$ geratzen bada, edozein zenbaki da ebazpena: identitate bat da.',
            es: 'A veces, al reducir, la x desaparece. Si queda algo como $0x=5$, no hay solución: ningún número por 0 da 5. Si queda $0x=0$, cualquier número es solución: es una identidad.',
            ar: 'أحيانًا تختفي x عند التبسيط. فإذا بقي شيء مثل $0x=5$ فلا حل: لا عدد مضروبًا في 0 يعطي 5. وإذا بقي $0x=0$ فكل عدد حل: إنها متطابقة.'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Ebazpenik ez', es: 'Sin solución', ar: 'بلا حل' }, text: { eu: 'x desagertzen da eta berdintza faltsua geratzen da.', es: 'La x desaparece y queda una igualdad falsa.', ar: 'تختفي x وتبقى مساواة خاطئة.' }, math: '$2x+1=2x+4\\ \\to\\ 0x=3$' },
            { title: { eu: 'Infinitu ebazpen', es: 'Infinitas soluciones', ar: 'عدد لا نهائي من الحلول' }, text: { eu: 'x desagertzen da eta berdintza egiazkoa geratzen da.', es: 'La x desaparece y queda una igualdad cierta.', ar: 'تختفي x وتبقى مساواة صحيحة.' }, math: '$2(x+3)=2x+6\\ \\to\\ 0x=0$' }
        ],
        example: '$3x-(x+2)=2x-2\\ \\to\\ 0x=0$',
        takeaway: {
            eu: '0x = zenbaki bat (≠ 0): ebazpenik ez. 0x = 0: identitatea.',
            es: '0x = número (≠ 0): sin solución. 0x = 0: identidad.',
            ar: '0x = عدد (≠ 0): لا حل. 0x = 0: متطابقة.'
        }
    },
    {
        id: 'denominators',
        stage: 'denominators',
        title: { eu: 'Izendatzaile bat', es: 'Un denominador', ar: 'مقام واحد' },
        goal: {
            eu: 'Izendatzaile bakarra duten ekuazioak ebaztea.',
            es: 'Resolver ecuaciones con un solo denominador.',
            ar: 'حل معادلات بمقام واحد.'
        },
        explanation: {
            eu: 'Izendatzaile bat dagoenean, biderkatu bi atalak (gai guztiak!) izendatzaile horrez, eta zatikirik gabeko ekuazio baliokide bat lortzen da. Beste modu bat: lehenik askatu zatikia eta gero biderkatu.',
            es: 'Cuando hay un denominador, multiplica los dos miembros (¡todos los términos!) por ese denominador y se obtiene una ecuación equivalente sin fracciones. Otra forma: primero despeja la fracción y después multiplica.',
            ar: 'عندما يوجد مقام نضرب الطرفين (كل الحدود!) فيه فنحصل على معادلة مكافئة بلا كسور. وطريقة أخرى: اعزل الكسر أولًا ثم اضرب.'
        },
        problem: { eu: 'Ebatzi $\\frac{x}{3}+2=7$.', es: 'Resuelve $\\frac{x}{3}+2=7$.', ar: 'حلّ $\\frac{x}{3}+2=7$.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Biderkatu gai guztiak 3z.', es: 'Multiplica todos los términos por 3.', ar: 'اضرب كل الحدود في 3.' }, math: '$x+6=21$' },
            { text: { eu: 'Askatu x.', es: 'Despeja x.', ar: 'اعزل x.' }, math: '$x=15$' }
        ],
        example: '$\\frac{2x-1}{5}=3\\ \\to\\ 2x-1=15\\ \\to\\ x=8$',
        takeaway: {
            eu: 'Zenbaki soilak ere biderkatu behar dira: 2 → 6.',
            es: 'También hay que multiplicar los números sueltos: 2 → 6.',
            ar: 'يجب ضرب الأعداد المنفردة أيضًا: 2 ← 6.'
        }
    },
    {
        id: 'lcm',
        stage: 'denominators',
        title: { eu: 'Izendatzaile batzuk: MKT', es: 'Varios denominadores: m.c.m.', ar: 'عدة مقامات: م.م.أ' },
        goal: {
            eu: 'Izendatzaile desberdinak dituzten ekuazioak MKTa erabiliz ebaztea.',
            es: 'Resolver ecuaciones con denominadores distintos usando el m.c.m.',
            ar: 'حل معادلات بمقامات مختلفة باستعمال م.م.أ.'
        },
        explanation: {
            eu: 'Izendatzaile bat baino gehiago daudenean, kalkulatu haien MKTa eta biderkatu gai guztiak MKTaz. Zatiki bakoitzean, MKT zati izendatzailea eginda, zenbakitzailea zenbat aldiz biderkatu behar den ikusten da. Horrela, zatikirik gabeko ekuazio bat geratzen da.',
            es: 'Cuando hay varios denominadores, calcula su m.c.m. y multiplica todos los términos por él. En cada fracción, m.c.m. entre denominador dice por cuánto se multiplica el numerador. Así queda una ecuación sin fracciones.',
            ar: 'عندما توجد عدة مقامات نحسب م.م.أ لها ونضرب كل الحدود فيه. في كل كسر، م.م.أ على المقام يبيّن في كم نضرب البسط. فتبقى معادلة بلا كسور.'
        },
        problem: { eu: 'Ebatzi $\\frac{x}{2}+\\frac{x}{3}=5$.', es: 'Resuelve $\\frac{x}{2}+\\frac{x}{3}=5$.', ar: 'حلّ $\\frac{x}{2}+\\frac{x}{3}=5$.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'MKT(2, 3) = 6. Biderkatu gai guztiak 6z.', es: 'm.c.m.(2, 3) = 6. Multiplica todos los términos por 6.', ar: 'م.م.أ(2، 3) = 6. اضرب كل الحدود في 6.' }, math: '$3x+2x=30$' },
            { text: { eu: 'Laburtu eta askatu x.', es: 'Reduce y despeja x.', ar: 'بسّط واعزل x.' }, math: '$5x=30\\ \\to\\ x=6$' }
        ],
        example: '$\\frac{x}{4}-\\frac{x}{6}=1\\ \\to\\ 3x-2x=12$',
        takeaway: {
            eu: 'MKTaz biderkatu, eta zatikiak desagertzen dira.',
            es: 'Multiplica por el m.c.m. y las fracciones desaparecen.',
            ar: 'اضرب في م.م.أ فتختفي الكسور.'
        },
        figure: (language) => <DenominatorsFigure language={language} />
    },
    {
        id: 'mixed',
        stage: 'denominators',
        title: { eu: 'Izendatzaileak eta parentesiak', es: 'Denominadores y paréntesis', ar: 'المقامات والأقواس' },
        goal: {
            eu: 'Izendatzaileak eta parentesiak dituzten ekuazioak ebaztea, zatiki baten aurreko minusa kontuan hartuz.',
            es: 'Resolver ecuaciones con denominadores y paréntesis, teniendo en cuenta el menos delante de una fracción.',
            ar: 'حل معادلات بمقامات وأقواس مع مراعاة الناقص قبل الكسر.'
        },
        explanation: {
            eu: 'Zatiki baten zenbakitzailea gai bat baino gehiagokoa bada, parentesi artean dagoela pentsatu behar da. Horregatik, zatikiaren aurrean minus bat badago, MKTaz biderkatu ondoren zenbakitzaileko gai guztien zeinua aldatzen da.',
            es: 'Si el numerador de una fracción tiene varios términos, hay que pensar que está entre paréntesis. Por eso, si delante de la fracción hay un menos, después de multiplicar por el m.c.m. cambian de signo todos los términos del numerador.',
            ar: 'إذا كان بسط الكسر مكوّنًا من عدة حدود فيجب اعتباره بين قوسين. لذلك إذا سبق الكسرَ ناقصٌ تتغيّر بعد الضرب في م.م.أ إشارة كل حدود البسط.'
        },
        problem: { eu: 'Ebatzi $\\frac{x+1}{2}-\\frac{x-3}{4}=3$.', es: 'Resuelve $\\frac{x+1}{2}-\\frac{x-3}{4}=3$.', ar: 'حلّ $\\frac{x+1}{2}-\\frac{x-3}{4}=3$.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'MKT = 4: biderkatu gai bakoitza.', es: 'm.c.m. = 4: multiplica cada término.', ar: 'م.م.أ = 4: اضرب كل حد.' }, math: '$2(x+1)-(x-3)=12$' },
            { text: { eu: 'Kendu parentesiak.', es: 'Quita paréntesis.', ar: 'احذف الأقواس.' }, math: '$2x+2-x+3=12$' },
            { text: { eu: 'Laburtu eta askatu x.', es: 'Reduce y despeja x.', ar: 'بسّط واعزل x.' }, math: '$x=7$' }
        ],
        example: '$\\frac{7+1}{2}-\\frac{7-3}{4}=4-1=3$',
        takeaway: {
            eu: 'Zenbakitzaile luzea = parentesi artean.',
            es: 'Numerador largo = entre paréntesis.',
            ar: 'البسط الطويل = بين قوسين.'
        }
    },
    {
        id: 'problem-steps',
        stage: 'problems',
        title: { eu: 'Buruketa bat ebazteko urratsak', es: 'Pasos para resolver un problema', ar: 'خطوات حل مسألة' },
        goal: {
            eu: 'Enuntziatu bat ekuazio bihurtzea eta lau urratsak jarraitzea.',
            es: 'Convertir un enunciado en una ecuación y seguir los cuatro pasos.',
            ar: 'تحويل نص إلى معادلة واتباع الخطوات الأربع.'
        },
        explanation: {
            eu: 'Buruketa bat ekuazioz ebazteko: 1) ulertu eta erabaki zer izango den x; 2) idatzi enuntziatuaren datuak x-rekin eta planteatu ekuazioa; 3) ebatzi; 4) egiaztatu emaitza enuntziatuan (ez ekuazioan bakarrik) eta idatzi erantzuna esaldi batean.',
            es: 'Para resolver un problema con una ecuación: 1) comprende y decide qué será x; 2) escribe los datos del enunciado con x y plantea la ecuación; 3) resuélvela; 4) comprueba el resultado en el enunciado (no solo en la ecuación) y escribe la respuesta en una frase.',
            ar: 'لحل مسألة بمعادلة: 1) افهم وحدّد ما سيكون x؛ 2) اكتب معطيات النص بدلالة x وصُغ المعادلة؛ 3) حلّها؛ 4) تحقّق من النتيجة في النص (لا في المعادلة فقط) واكتب الجواب في جملة.'
        },
        problem: { eu: 'Zenbaki baten erdiari 13 batuz, bere bikoitzari 11 kenduta bezainbeste lortzen da. Zein da zenbakia?', es: 'Sumando 13 a la mitad de un número se obtiene lo mismo que restando 11 a su doble. ¿Qué número es?', ar: 'بإضافة 13 إلى نصف عدد نحصل على ما نحصل عليه بطرح 11 من ضعفه. ما العدد؟' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Zenbakia: x.', es: 'El número: x.', ar: 'العدد: x.' }, math: '$\\frac{x}{2}+13=2x-11$' },
            { text: { eu: 'Biderkatu 2z eta ebatzi.', es: 'Multiplica por 2 y resuelve.', ar: 'اضرب في 2 وحلّ.' }, math: '$x+26=4x-22\\ \\to\\ x=16$' },
            { text: { eu: 'Egiaztatu: 8 + 13 = 21 eta 32 − 11 = 21. Zenbakia 16 da.', es: 'Comprueba: 8 + 13 = 21 y 32 − 11 = 21. El número es 16.', ar: 'تحقّق: 8 + 13 = 21 و32 − 11 = 21. العدد 16.' } }
        ],
        example: '$3x-8=25\\ \\to\\ x=11$',
        takeaway: {
            eu: 'Ulertu → planteatu → ebatzi → egiaztatu.',
            es: 'Comprender → plantear → resolver → comprobar.',
            ar: 'الفهم ← الصياغة ← الحل ← التحقق.'
        },
        figure: (language) => <ProblemStepsFigure language={language} />
    },
    {
        id: 'problems-ages',
        stage: 'problems',
        title: { eu: 'Adinak eta dirua', es: 'Edades y dinero', ar: 'الأعمار والمال' },
        goal: {
            eu: 'Adinei eta prezioei buruzko buruketak ekuazioz ebaztea.',
            es: 'Resolver problemas de edades y precios con ecuaciones.',
            ar: 'حل مسائل الأعمار والأسعار بالمعادلات.'
        },
        explanation: {
            eu: 'Adin-buruketetan, taula bat lagungarria da: gaur, duela n urte eta hemendik n urtera. Pertsona guztiek urte kopuru bera gehitzen edo kentzen dute. Prezio-buruketetan, idatzi gauza bakoitzaren prezioa x-ren bidez eta batu kopurua bider prezioa.',
            es: 'En los problemas de edades ayuda una tabla: hoy, hace n años y dentro de n años. Todas las personas suman o restan los mismos años. En los de precios, escribe el precio de cada cosa en función de x y suma cantidad por precio.',
            ar: 'في مسائل الأعمار يساعد جدول: اليوم، وقبل n سنة، وبعد n سنة. وكل الأشخاص يزيدون أو ينقصون السنوات نفسها. وفي مسائل الأسعار اكتب سعر كل شيء بدلالة x واجمع الكمية في السعر.'
        },
        problem: { eu: 'Aitak semeak baino 30 urte gehiago ditu, eta 5 urte barru semearen adinaren hirukoitza izango du. Zenbat urte ditu semeak?', es: 'Un padre tiene 30 años más que su hijo y dentro de 5 años tendrá el triple de la edad del hijo. ¿Cuántos años tiene el hijo?', ar: 'الأب أكبر من ابنه بـ 30 سنة، وبعد 5 سنوات سيكون عمره ثلاثة أضعاف عمر الابن. كم عمر الابن؟' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Semea: x. Aita: x + 30. 5 urte barru: x + 5 eta x + 35.', es: 'Hijo: x. Padre: x + 30. Dentro de 5 años: x + 5 y x + 35.', ar: 'الابن: x. الأب: x + 30. بعد 5 سنوات: x + 5 وx + 35.' }, math: '$x+35=3(x+5)$' },
            { text: { eu: 'Ebatzi.', es: 'Resuelve.', ar: 'حلّ.' }, math: '$x+35=3x+15\\ \\to\\ x=10$' },
            { text: { eu: 'Semeak 10 urte ditu eta aitak 40. 5 urte barru: 15 eta 45 = 3 · 15 ✓.', es: 'El hijo tiene 10 años y el padre 40. Dentro de 5 años: 15 y 45 = 3 · 15 ✓.', ar: 'عمر الابن 10 سنوات والأب 40. بعد 5 سنوات: 15 و45 = 3 · 15 ✓.' } }
        ],
        example: '$3x+(x+0{,}5)=5{,}3\\ \\to\\ x=1{,}2$',
        takeaway: {
            eu: 'Urteak pasatzen dira pertsona guztientzat.',
            es: 'Los años pasan para todas las personas.',
            ar: 'السنوات تمر على الجميع.'
        }
    },
    {
        id: 'problems-geometry',
        stage: 'problems',
        title: { eu: 'Geometria eta osoaren zatiak', es: 'Geometría y partes de un total', ar: 'الهندسة وأجزاء الكل' },
        goal: {
            eu: 'Perimetro, zenbaki jarraitu eta osoaren zatiei buruzko buruketak ebaztea.',
            es: 'Resolver problemas de perímetros, números consecutivos y partes de un total.',
            ar: 'حل مسائل المحيطات والأعداد المتتالية وأجزاء الكل.'
        },
        explanation: {
            eu: 'Geometrian, marraztu irudia eta idatzi alde bakoitza x-ren bidez. Zenbaki jarraituak x, x + 1, x + 2 dira. Osoaren zatiak direnean (heren bat, laurden bat…), x osoa da, eta zatiak $\\frac{x}{3}$, $\\frac{x}{4}$…; zati guztiek osoa osatzen dute.',
            es: 'En geometría, dibuja la figura y escribe cada lado en función de x. Los números consecutivos son x, x + 1, x + 2. Cuando son partes de un total (un tercio, un cuarto…), x es el total y las partes, $\\frac{x}{3}$, $\\frac{x}{4}$…; todas las partes forman el total.',
            ar: 'في الهندسة ارسم الشكل واكتب كل ضلع بدلالة x. والأعداد المتتالية هي x وx + 1 وx + 2. وعندما تكون أجزاء من كل (ثلث، ربع…) يكون x هو الكل والأجزاء $\\frac{x}{3}$ و$\\frac{x}{4}$…؛ ومجموع الأجزاء هو الكل.'
        },
        problem: { eu: 'Laukizuzen bat zabalera baino 3 m luzeagoa da, eta perimetroa 30 m. Zenbat neurtzen du zabalerak?', es: 'Un rectángulo es 3 m más largo que ancho y su perímetro mide 30 m. ¿Cuánto mide el ancho?', ar: 'مستطيل طوله أكبر من عرضه بـ 3 م ومحيطه 30 م. كم عرضه؟' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Zabalera: x. Luzera: x + 3.', es: 'Ancho: x. Largo: x + 3.', ar: 'العرض: x. الطول: x + 3.' }, math: '$2x+2(x+3)=30$' },
            { text: { eu: 'Ebatzi.', es: 'Resuelve.', ar: 'حلّ.' }, math: '$4x+6=30\\ \\to\\ x=6$' },
            { text: { eu: 'Zabalera 6 m eta luzera 9 m: 12 + 18 = 30 ✓.', es: 'Ancho 6 m y largo 9 m: 12 + 18 = 30 ✓.', ar: 'العرض 6 م والطول 9 م: 12 + 18 = 30 ✓.' } }
        ],
        example: '$x+(x+1)+(x+2)=48\\ \\to\\ x=15$',
        takeaway: {
            eu: 'Marraztu eta idatzi dena x-ren bidez.',
            es: 'Dibuja y escríbelo todo en función de x.',
            ar: 'ارسم واكتب كل شيء بدلالة x.'
        }
    },
    {
        id: 'quadratic',
        stage: 'quadratic',
        title: { eu: 'Bigarren mailako ekuazioak', es: 'Ecuaciones de segundo grado', ar: 'معادلات الدرجة الثانية' },
        goal: {
            eu: 'Bigarren mailako ekuazioak ezagutzea eta haien a, b eta c koefizienteak identifikatzea.',
            es: 'Reconocer ecuaciones de segundo grado e identificar sus coeficientes a, b y c.',
            ar: 'التعرّف إلى معادلات الدرجة الثانية وتحديد معاملاتها a وb وc.'
        },
        explanation: {
            eu: 'Bigarren mailako ekuazioa $ax^{2}+bx+c=0$ forman idatz daitekeena da, $a\\neq 0$ izanik. Bi ebazpen izan ditzake, bat edo bat ere ez. Ebatzi aurretik, eraman gai guztiak atal batera, laburtu eta ordenatu, eta irakurri a, b eta c, zeinuekin.',
            es: 'Una ecuación de segundo grado es la que se puede escribir como $ax^{2}+bx+c=0$, con $a\\neq 0$. Puede tener dos soluciones, una o ninguna. Antes de resolverla, pasa todos los términos a un miembro, reduce y ordena, y lee a, b y c con sus signos.',
            ar: 'معادلة الدرجة الثانية هي التي يمكن كتابتها $ax^{2}+bx+c=0$ مع $a\\neq 0$. قد يكون لها حلان أو حل واحد أو لا حل. قبل حلها انقل كل الحدود إلى طرف وبسّط ورتّب، ثم اقرأ a وb وc بإشاراتها.'
        },
        problem: { eu: 'Idatzi forma orokorrean: $x^{2}-3=2x$.', es: 'Escribe en forma general: $x^{2}-3=2x$.', ar: 'اكتب بالصيغة العامة: $x^{2}-3=2x$.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Pasa 2x ezkerrera.', es: 'Pasa 2x a la izquierda.', ar: 'انقل 2x إلى اليسار.' }, math: '$x^{2}-2x-3=0$' },
            { text: { eu: 'Koefizienteak: a = 1, b = −2, c = −3.', es: 'Coeficientes: a = 1, b = −2, c = −3.', ar: 'المعاملات: a = 1، b = −2، c = −3.' } },
            { text: { eu: 'Egiaztatu x = 3: 9 − 3 = 6 = 2 · 3 ✓. Eta x = −1 ere bai.', es: 'Comprueba x = 3: 9 − 3 = 6 = 2 · 3 ✓. Y también x = −1.', ar: 'تحقّق من x = 3: 9 − 3 = 6 = 2 · 3 ✓. وx = −1 أيضًا.' } }
        ],
        example: '$x^{2}-5x+6=0\\ \\to\\ x=2,\\ x=3$',
        takeaway: {
            eu: 'Ordenatu beti: $ax^{2}+bx+c=0$.',
            es: 'Ordena siempre: $ax^{2}+bx+c=0$.',
            ar: 'رتّب دائمًا: $ax^{2}+bx+c=0$.'
        }
    },
    {
        id: 'incomplete',
        stage: 'quadratic',
        title: { eu: 'Ekuazio osatugabeak', es: 'Ecuaciones incompletas', ar: 'المعادلات الناقصة' },
        goal: {
            eu: '$ax^{2}+c=0$ eta $ax^{2}+bx=0$ motakoak formularik gabe ebaztea.',
            es: 'Resolver las del tipo $ax^{2}+c=0$ y $ax^{2}+bx=0$ sin fórmula.',
            ar: 'حل معادلات من النوع $ax^{2}+c=0$ و$ax^{2}+bx=0$ دون صيغة.'
        },
        explanation: {
            eu: 'b = 0 bada ($ax^{2}+c=0$), askatu $x^{2}$ eta atera erro karratua: bi ebazpen, aurkakoak ($\\pm$), zenbakia positiboa bada; negatiboa bada, ez dago ebazpenik. c = 0 bada ($ax^{2}+bx=0$), atera x faktore komun gisa: biderkadura bat 0 da faktoreetako bat 0 bada, eta beraz x = 0 eta beste bat.',
            es: 'Si b = 0 ($ax^{2}+c=0$), despeja $x^{2}$ y haz la raíz cuadrada: dos soluciones opuestas ($\\pm$) si el número es positivo; si es negativo, no hay solución. Si c = 0 ($ax^{2}+bx=0$), saca x factor común: un producto es 0 si uno de sus factores es 0, así que x = 0 y otra más.',
            ar: 'إذا كان b = 0 ($ax^{2}+c=0$) اعزل $x^{2}$ وخذ الجذر التربيعي: حلان متعاكسان ($\\pm$) إذا كان العدد موجبًا، ولا حل إذا كان سالبًا. وإذا كان c = 0 ($ax^{2}+bx=0$) أخرج x عاملًا مشتركًا: الجداء يساوي 0 إذا كان أحد عوامله 0، إذن x = 0 وحل آخر.'
        },
        problem: { eu: 'Ebatzi $2x^{2}-50=0$ eta $x^{2}-5x=0$.', es: 'Resuelve $2x^{2}-50=0$ y $x^{2}-5x=0$.', ar: 'حلّ $2x^{2}-50=0$ و$x^{2}-5x=0$.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Askatu $x^{2}$ eta atera erroa.', es: 'Despeja $x^{2}$ y haz la raíz.', ar: 'اعزل $x^{2}$ وخذ الجذر.' }, math: '$x^{2}=25\\ \\to\\ x=\\pm 5$' },
            { text: { eu: 'Atera x faktore komun gisa.', es: 'Saca x factor común.', ar: 'أخرج x عاملًا مشتركًا.' }, math: '$x(x-5)=0\\ \\to\\ x=0,\\ x=5$' }
        ],
        example: '$x^{2}+4=0\\ \\to\\ x^{2}=-4$',
        takeaway: {
            eu: 'Ez zatitu x-z: ebazpen bat galtzen da (x = 0).',
            es: 'No dividas entre x: se pierde una solución (x = 0).',
            ar: 'لا تقسم على x: يضيع حل (x = 0).'
        },
        figure: (language) => <ZeroProductFigure language={language} />
    },
    {
        id: 'formula',
        stage: 'quadratic',
        title: { eu: 'Formula orokorra eta diskriminatzailea', es: 'Fórmula general y discriminante', ar: 'الصيغة العامة والمميّز' },
        goal: {
            eu: 'Ekuazio osoak formula orokorrarekin ebaztea eta ebazpen kopurua aurreikustea.',
            es: 'Resolver ecuaciones completas con la fórmula general y prever cuántas soluciones tienen.',
            ar: 'حل المعادلات الكاملة بالصيغة العامة وتوقع عدد حلولها.'
        },
        explanation: {
            eu: '$ax^{2}+bx+c=0$ ekuazioaren ebazpenak $x=\\frac{-b\\pm\\sqrt{b^{2}-4ac}}{2a}$ formularekin kalkulatzen dira. Erroaren barrukoa, $\\Delta=b^{2}-4ac$, diskriminatzailea da: positiboa bada, bi ebazpen daude; 0 bada, bat (bikoitza); negatiboa bada, ez dago ebazpenik.',
            es: 'Las soluciones de $ax^{2}+bx+c=0$ se calculan con la fórmula $x=\\frac{-b\\pm\\sqrt{b^{2}-4ac}}{2a}$. Lo de dentro de la raíz, $\\Delta=b^{2}-4ac$, es el discriminante: si es positivo, hay dos soluciones; si es 0, una (doble); si es negativo, ninguna.',
            ar: 'تُحسب حلول $ax^{2}+bx+c=0$ بالصيغة $x=\\frac{-b\\pm\\sqrt{b^{2}-4ac}}{2a}$. وما تحت الجذر $\\Delta=b^{2}-4ac$ هو المميّز: إذا كان موجبًا فهناك حلان، وإذا كان 0 فحل واحد (مضاعف)، وإذا كان سالبًا فلا حل.'
        },
        problem: { eu: 'Ebatzi $x^{2}-5x+6=0$.', es: 'Resuelve $x^{2}-5x+6=0$.', ar: 'حلّ $x^{2}-5x+6=0$.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'a = 1, b = −5, c = 6. Diskriminatzailea:', es: 'a = 1, b = −5, c = 6. Discriminante:', ar: 'a = 1، b = −5، c = 6. المميّز:' }, math: '$(-5)^{2}-4\\cdot 1\\cdot 6=1$' },
            { text: { eu: 'Formula.', es: 'Fórmula.', ar: 'الصيغة.' }, math: '$x=\\frac{5\\pm 1}{2}$' },
            { text: { eu: 'Bi ebazpen.', es: 'Dos soluciones.', ar: 'حلان.' }, math: '$x_{1}=3,\\ x_{2}=2$' }
        ],
        example: '$x^{2}-6x+9=0\\ \\to\\ \\Delta=0,\\ x=3$',
        takeaway: {
            eu: 'Lehenik kalkulatu Δ: ebazpen kopurua esaten dizu.',
            es: 'Calcula primero Δ: te dice cuántas soluciones hay.',
            ar: 'احسب Δ أولًا: فهو يخبرك بعدد الحلول.'
        },
        figure: (language) => <DiscriminantFigure language={language} />
    }
]

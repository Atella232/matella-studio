import type { UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { NumberLine, SignRuleFigure, SituationsFigure } from './figures'

/* ==========================================================================
   Zenbaki osoak · 2. DBH — stages and lessons
   Sequence and vocabulary follow the class textbook (3. gaia "Zenbaki osoak"):
   Z and the number line, absolute value and opposite, comparison, sums and
   subtractions (shorthand and brackets), products, quotients and hierarchy.
   ========================================================================== */

export type IntegerStageId = 'integers' | 'absolute' | 'ordering' | 'addsub' | 'muldiv'

export const integerStages: UnitStage[] = [
    { id: 'integers', tone: 'blue', title: { eu: 'Zenbaki osoak', es: 'Los números enteros', ar: 'الأعداد الصحيحة' } },
    { id: 'absolute', tone: 'violet', title: { eu: 'Balio absolutua eta aurkakoa', es: 'Valor absoluto y opuesto', ar: 'القيمة المطلقة والعدد المعاكس' } },
    { id: 'ordering', tone: 'mustard', title: { eu: 'Alderaketa eta ordena', es: 'Comparación y orden', ar: 'المقارنة والترتيب' } },
    { id: 'addsub', tone: 'coral', title: { eu: 'Batuketak eta kenketak', es: 'Sumas y restas', ar: 'الجمع والطرح' } },
    { id: 'muldiv', tone: 'green', title: { eu: 'Biderketak, zatiketak eta hierarkia', es: 'Productos, cocientes y jerarquía', ar: 'الضرب والقسمة وأولوية العمليات' } }
]

export const integerTopics: UnitTopic[] = [
    {
        id: 'negatives',
        stage: 'integers',
        title: { eu: 'Zertarako dira zenbaki negatiboak?', es: '¿Para qué sirven los números negativos?', ar: 'لماذا نحتاج إلى الأعداد السالبة؟' },
        goal: {
            eu: 'Eguneroko egoerak zenbaki positibo eta negatiboekin adieraztea.',
            es: 'Expresar situaciones cotidianas con números positivos y negativos.',
            ar: 'التعبير عن مواقف يومية بأعداد موجبة وسالبة.'
        },
        explanation: {
            eu: 'Egoera batzuk ezin dira zenbaki arruntekin adierazi: zero azpiko tenperaturak, zorrak, sotoak edo itsas mailaren azpiko sakonerak. Horietarako zenbaki osoak erabiltzen ditugu: + zeinua, kopurua zero baino handiagoa denean, eta − zeinua, zero baino txikiagoa denean. Zor izan, jaitsi, gastatu edo azpian egon bezalako hitzek zenbaki negatiboak iragartzen dituzte.',
            es: 'Algunas situaciones no se pueden expresar con números naturales: temperaturas bajo cero, deudas, sótanos o profundidades bajo el nivel del mar. Para ellas usamos los números enteros: signo + cuando la cantidad es mayor que cero y signo − cuando es menor. Palabras como deber, bajar, gastar o estar por debajo anuncian números negativos.',
            ar: 'بعض المواقف لا يمكن التعبير عنها بالأعداد الطبيعية: درجات الحرارة تحت الصفر، والديون، والطوابق تحت الأرض، والأعماق تحت مستوى سطح البحر. لذلك نستعمل الأعداد الصحيحة: الإشارة + عندما تكون الكمية أكبر من الصفر، والإشارة − عندما تكون أصغر منه. كلمات مثل: يَدين، ينزل، يُنفق، أو تحت، تدل على أعداد سالبة.'
        },
        example: '$\\begin{gathered}-8\\,^{\\circ}\\mathrm{C}\\qquad -25\\ \\text{€}\\\\-100\\ \\mathrm{m}\\qquad +12\\ \\mathrm{m}\\end{gathered}$',
        takeaway: {
            eu: 'Zeinuak zentzua ematen dio kopuruari: zerotik gora (+) ala zerotik behera (−).',
            es: 'El signo da sentido a la cantidad: por encima de cero (+) o por debajo (−).',
            ar: 'تعطي الإشارة معنى للكمية: فوق الصفر (+) أو تحته (−).'
        },
        figure: (language) => <SituationsFigure language={language} />
    },
    {
        id: 'integer-set',
        stage: 'integers',
        title: { eu: 'ℤ multzoa eta zenbakizko zuzena', es: 'El conjunto ℤ y la recta numérica', ar: 'المجموعة ℤ وخط الأعداد' },
        goal: {
            eu: 'Zenbaki osoak sailkatzea eta zenbakizko zuzenean kokatzea.',
            es: 'Clasificar los números enteros y situarlos en la recta numérica.',
            ar: 'تصنيف الأعداد الصحيحة ووضعها على خط الأعداد.'
        },
        explanation: {
            eu: 'Zenbaki osoen multzoa ℤ da, eta hiru zati ditu: zenbaki oso positiboak (+1, +2, +3…), zeroa eta zenbaki oso negatiboak (−1, −2, −3…). Zenbakizko zuzenean zeroak zuzena bi zatitan banatzen du: positiboak eskuinean eta negatiboak ezkerrean, elkarrengandik distantzia berera. Zero ez da ez positiboa ez negatiboa, eta positiboak + zeinurik gabe ere idazten dira: +5 = 5.',
            es: 'El conjunto de los números enteros es ℤ y tiene tres partes: los enteros positivos (+1, +2, +3…), el cero y los enteros negativos (−1, −2, −3…). En la recta numérica el cero la divide en dos: los positivos a la derecha y los negativos a la izquierda, separados por la misma distancia. El cero no es ni positivo ni negativo, y los positivos también se escriben sin el signo +: +5 = 5.',
            ar: 'مجموعة الأعداد الصحيحة هي ℤ ولها ثلاثة أجزاء: الأعداد الصحيحة الموجبة (+1، +2، +3…)، والصفر، والأعداد الصحيحة السالبة (−1، −2، −3…). على خط الأعداد يقسم الصفر الخط إلى قسمين: الموجبة على اليمين والسالبة على اليسار، بمسافات متساوية. الصفر ليس موجبًا ولا سالبًا، ويمكن كتابة الموجبة دون الإشارة +: ‎+5 = 5.'
        },
        example: '$\\mathbb{Z}=\\{\\dots,-3,-2,-1,0,+1,+2,+3,\\dots\\}$',
        takeaway: {
            eu: 'Zeroa da zuzenaren erdigunea: ez da positiboa ez negatiboa.',
            es: 'El cero es el centro de la recta: no es positivo ni negativo.',
            ar: 'الصفر هو مركز الخط: ليس موجبًا ولا سالبًا.'
        },
        figure: (language) => <NumberLine min={-7} max={7} braces language={language} />
    },
    {
        id: 'absolute',
        stage: 'absolute',
        title: { eu: 'Balio absolutua', es: 'Valor absoluto', ar: 'القيمة المطلقة' },
        goal: {
            eu: 'Zenbaki oso baten balio absolutua distantzia gisa ulertzea eta kalkulatzea.',
            es: 'Entender el valor absoluto como una distancia y calcularlo.',
            ar: 'فهم القيمة المطلقة كمسافة وحسابها.'
        },
        explanation: {
            eu: 'Zenbaki oso baten balio absolutua zenbakizko zuzenean zerotik zenbakira dagoen distantzia da, batekotan neurtuta. Bi barren artean idazten da, eta zenbakia bera da zeinurik gabe: $\\lvert +b\\rvert =b$ eta $\\lvert -a\\rvert =a$. Distantzia bat denez, ez da inoiz negatiboa, eta zeroarena zero da: $\\lvert 0\\rvert =0$.',
            es: 'El valor absoluto de un número entero es la distancia que hay en la recta desde el cero hasta el número, medida en unidades. Se escribe entre dos barras y es el propio número sin signo: $\\lvert +b\\rvert =b$ y $\\lvert -a\\rvert =a$. Como es una distancia, nunca es negativo, y el del cero es cero: $\\lvert 0\\rvert =0$.',
            ar: 'القيمة المطلقة لعدد صحيح هي المسافة على خط الأعداد من الصفر إلى العدد، مقيسة بالوحدات. تُكتب بين خطين عموديين وهي العدد نفسه دون إشارة: $\\lvert +b\\rvert =b$ و$\\lvert -a\\rvert =a$. ولأنها مسافة فهي ليست سالبة أبدًا، وقيمة الصفر المطلقة صفر: $\\lvert 0\\rvert =0$.'
        },
        example: '$\\begin{gathered}\\lvert -5\\rvert =5\\\\\\lvert +4\\rvert =4\\\\\\lvert 0\\rvert =0\\end{gathered}$',
        takeaway: {
            eu: 'Balio absolutuak «zenbat urrun» esaten du, ez «zein aldetara».',
            es: 'El valor absoluto dice «a qué distancia», no «hacia qué lado».',
            ar: 'القيمة المطلقة تخبرنا «كم يبعد» العدد، لا «في أي جهة».'
        },
        figure: () => <NumberLine min={-6} max={6} points={[{ value: -5, tone: 'second' }, { value: 4 }]} spans={[{ from: 0, to: -5, tone: 'second', label: '|−5| = 5' }, { from: 0, to: 4, label: '|+4| = 4' }]} />
    },
    {
        id: 'opposite',
        stage: 'absolute',
        title: { eu: 'Zenbaki oso baten aurkakoa', es: 'El opuesto de un número entero', ar: 'معاكس عدد صحيح' },
        goal: {
            eu: 'Aurkakoa aurkitzea eta balio absolutuarekin lotzea.',
            es: 'Encontrar el opuesto y relacionarlo con el valor absoluto.',
            ar: 'إيجاد المعاكس وربطه بالقيمة المطلقة.'
        },
        explanation: {
            eu: 'Bi zenbaki oso aurkakoak dira zerotik distantzia berera daudenean, baina alde banatan. Aurkakoa kalkulatzeko, zeinua aldatzen da: $\\mathrm{Aur}(+a)=-a$ eta $\\mathrm{Aur}(-a)=+a$. Aurkakoek balio absolutu bera dute, eta zenbaki bati bere aurkakoa batzen badiogu, 0 lortzen dugu.',
            es: 'Dos números enteros son opuestos cuando están a la misma distancia del cero, pero a lados distintos. Para calcular el opuesto se cambia el signo: $\\mathrm{Op}(+a)=-a$ y $\\mathrm{Op}(-a)=+a$. Los opuestos tienen el mismo valor absoluto, y si a un número le sumamos su opuesto obtenemos 0.',
            ar: 'يكون عددان صحيحان متعاكسين عندما يقعان على المسافة نفسها من الصفر ولكن في جهتين مختلفتين. لإيجاد المعاكس نغيّر الإشارة: معاكس $+a$ هو $-a$، ومعاكس $-a$ هو $+a$. للعددين المتعاكسين القيمة المطلقة نفسها، وإذا جمعنا عددًا ومعاكسه نحصل على 0.'
        },
        example: '$\\begin{gathered}-(-5)=+5\\\\-(+2)=-2\\\\(+3)+(-3)=0\\end{gathered}$',
        takeaway: {
            eu: 'Aurkakoa = zeinua aldatu. Zenbaki bat gehi bere aurkakoa = 0.',
            es: 'Opuesto = cambiar el signo. Un número más su opuesto = 0.',
            ar: 'المعاكس = تغيير الإشارة. العدد زائد معاكسه = 0.'
        },
        figure: () => <NumberLine min={-6} max={6} points={[{ value: -5, tone: 'second', label: '−5' }, { value: 5, label: '+5' }]} spans={[{ from: 0, to: -5, tone: 'second', label: '5' }, { from: 0, to: 5, label: '5' }]} />
    },
    {
        id: 'compare',
        stage: 'ordering',
        title: { eu: 'Zenbaki osoak alderatzea', es: 'Comparar números enteros', ar: 'مقارنة الأعداد الصحيحة' },
        goal: {
            eu: 'Bi zenbaki oso < edo > ikurrekin alderatzea eta arrazoitzea.',
            es: 'Comparar dos enteros con < o > y justificarlo.',
            ar: 'مقارنة عددين صحيحين بالرمزين < أو > وتبرير ذلك.'
        },
        explanation: {
            eu: 'Zenbakizko zuzenean eskuinean dagoena da handiena. Horregatik: edozein positibo edozein negatibo baino handiagoa da; zeroa negatiboak baino handiagoa eta positiboak baino txikiagoa da; bi positiboren artean, balio absolutu handienekoa da handiena; eta bi negatiboren artean, balio absolutu txikienekoa.',
            es: 'En la recta numérica, el que está más a la derecha es el mayor. Por eso: cualquier positivo es mayor que cualquier negativo; el cero es mayor que los negativos y menor que los positivos; entre dos positivos, es mayor el de mayor valor absoluto; y entre dos negativos, el de menor valor absoluto.',
            ar: 'على خط الأعداد يكون العدد الواقع إلى اليمين هو الأكبر. لذلك: كل عدد موجب أكبر من أي عدد سالب؛ والصفر أكبر من السالبة وأصغر من الموجبة؛ وبين عددين موجبين يكون الأكبر صاحب القيمة المطلقة الأكبر؛ وبين عددين سالبين يكون الأكبر صاحب القيمة المطلقة الأصغر.'
        },
        example: '$\\begin{gathered}-4<-2\\\\-5<+3\\\\+3<+5\\end{gathered}$',
        takeaway: {
            eu: 'Negatiboetan, zerotik hurbilago dagoena da handiena: −2 > −4.',
            es: 'Entre negativos, el más cercano al cero es el mayor: −2 > −4.',
            ar: 'بين الأعداد السالبة يكون الأقرب إلى الصفر هو الأكبر: ‎−2 > −4.'
        },
        figure: () => <NumberLine min={-6} max={6} points={[{ value: -4, tone: 'second', label: '−4' }, { value: -2, label: '−2' }]} caption="−4 < −2" />
    },
    {
        id: 'order',
        stage: 'ordering',
        title: { eu: 'Zenbaki osoak ordenatzea', es: 'Ordenar números enteros', ar: 'ترتيب الأعداد الصحيحة' },
        goal: {
            eu: 'Zenbaki osoen zerrenda bat txikienetik handienera eta alderantziz ordenatzea.',
            es: 'Ordenar una lista de enteros de menor a mayor y al revés.',
            ar: 'ترتيب قائمة من الأعداد الصحيحة تصاعديًا وتنازليًا.'
        },
        explanation: {
            eu: 'Urratsak: 1) banatu positiboak eta negatiboak; 2) ordenatu positiboak zenbaki arruntak bezala; 3) ordenatu negatiboak, kontuan izanda balio absolutu txikienekoa dela handiena; 4) elkartu dena, zeroa erdian dela.',
            es: 'Pasos: 1) separa positivos y negativos; 2) ordena los positivos como números naturales; 3) ordena los negativos teniendo en cuenta que el de menor valor absoluto es el mayor; 4) júntalo todo con el cero en medio.',
            ar: 'الخطوات: 1) افصل الموجبة عن السالبة؛ 2) رتّب الموجبة كالأعداد الطبيعية؛ 3) رتّب السالبة مع مراعاة أن صاحب القيمة المطلقة الأصغر هو الأكبر؛ 4) اجمع الكل مع وضع الصفر في الوسط.'
        },
        example: '$-10<-8<-6<0<+3<+4<+9$',
        takeaway: {
            eu: 'Txikienetik handienera: lehenengo negatiboak. Handienetik txikienera: lehenengo positiboak.',
            es: 'De menor a mayor: primero los negativos. De mayor a menor: primero los positivos.',
            ar: 'تصاعديًا: السالبة أولًا. تنازليًا: الموجبة أولًا.'
        },
        figure: () => <NumberLine min={-10} max={10} points={[-10, -8, -6, 0, 3, 4, 9].map((value) => ({ value, tone: value < 0 ? 'second' as const : 'stage' as const }))} />
    },
    {
        id: 'add',
        stage: 'addsub',
        title: { eu: 'Bi zenbaki osoren batuketa', es: 'Suma de dos números enteros', ar: 'جمع عددين صحيحين' },
        goal: {
            eu: 'Zeinu bereko eta zeinu desberdineko zenbakiak batzea.',
            es: 'Sumar enteros del mismo signo y de distinto signo.',
            ar: 'جمع أعداد صحيحة لها الإشارة نفسها أو إشارات مختلفة.'
        },
        explanation: {
            eu: 'Zeinu bereko bi zenbaki batzeko, balio absolutuak batu eta zeinu bera jartzen da. Zeinu desberdineko bi zenbaki batzeko, balio absolutu handienari txikiena kendu, eta balio absolutu handiena duenaren zeinua jartzen da. Zuzenean, positibo bat batzea eskuinera mugitzea da, eta negatibo bat batzea, ezkerrera.',
            es: 'Para sumar dos enteros del mismo signo, se suman sus valores absolutos y se pone el mismo signo. Para sumar dos de distinto signo, al valor absoluto mayor se le resta el menor y se pone el signo del que tiene mayor valor absoluto. En la recta, sumar un positivo es moverse a la derecha, y sumar un negativo, a la izquierda.',
            ar: 'لجمع عددين صحيحين لهما الإشارة نفسها نجمع قيمتيهما المطلقتين ونضع الإشارة نفسها. ولجمع عددين مختلفي الإشارة نطرح القيمة المطلقة الصغرى من الكبرى ونضع إشارة العدد صاحب القيمة المطلقة الأكبر. على خط الأعداد، جمع عدد موجب انتقال إلى اليمين، وجمع عدد سالب انتقال إلى اليسار.'
        },
        example: '$\\begin{gathered}(-2)+(-4)=-6\\\\(-8)+(+2)=-6\\end{gathered}$',
        takeaway: {
            eu: 'Zeinu bera: batu eta zeinua mantendu. Zeinu desberdina: kendu eta handienaren zeinua jarri.',
            es: 'Mismo signo: suma y conserva el signo. Distinto signo: resta y pon el signo del mayor.',
            ar: 'الإشارة نفسها: اجمع واحتفظ بالإشارة. إشارتان مختلفتان: اطرح وضع إشارة الأكبر.'
        },
        figure: () => <NumberLine min={-9} max={3} jumps={[{ from: 0, to: -8, tone: 'second', label: '−8', row: 1 }, { from: -8, to: -6, label: '+2' }]} points={[{ value: -6 }]} caption="(−8) + (+2) = −6" />
    },
    {
        id: 'subtract',
        stage: 'addsub',
        title: { eu: 'Kenketa: aurkakoa batu', es: 'Resta: sumar el opuesto', ar: 'الطرح: جمع المعاكس' },
        goal: {
            eu: 'Zenbaki osoen kenketa batuketa bihurtzea.',
            es: 'Convertir una resta de enteros en una suma.',
            ar: 'تحويل طرح الأعداد الصحيحة إلى جمع.'
        },
        explanation: {
            eu: 'Bi zenbaki osoren arteko kenketa egiteko, lehenengoari bigarrenaren aurkakoa batzen zaio: $a-b=a+\\mathrm{Aur}(b)$. Horrela kenketa guztiak batuketa bihurtzen dira eta aurreko arauak erabil daitezke. Kontuz: negatibo bat kentzea gora egitea da.',
            es: 'Para restar dos números enteros, al primero se le suma el opuesto del segundo: $a-b=a+\\mathrm{Op}(b)$. Así, toda resta se convierte en una suma y se pueden usar las reglas anteriores. Cuidado: restar un negativo es subir.',
            ar: 'لطرح عددين صحيحين نجمع إلى الأول معاكس الثاني: $a-b=a+(-b)$. وهكذا يتحول كل طرح إلى جمع ونستعمل القواعد السابقة. انتبه: طرح عدد سالب يعني الصعود.'
        },
        example: '$\\begin{aligned}(+4)-(+7)&=(+4)+(-7)=-3\\\\(-5)-(-9)&=(-5)+(+9)=+4\\end{aligned}$',
        takeaway: {
            eu: 'Kentzea = aurkakoa batzea.',
            es: 'Restar = sumar el opuesto.',
            ar: 'الطرح = جمع المعاكس.'
        },
        figure: () => <NumberLine min={-4} max={6} jumps={[{ from: 0, to: 4, label: '+4', row: 1 }, { from: 4, to: -3, tone: 'second', label: '−7' }]} points={[{ value: -3, tone: 'second' }]} caption="(+4) − (+7) = (+4) + (−7) = −3" />
    },
    {
        id: 'shorthand',
        stage: 'addsub',
        title: { eu: 'Modu laburtua: parentesiak kentzea', es: 'Forma abreviada: quitar paréntesis', ar: 'الصيغة المختصرة: حذف الأقواس' },
        goal: {
            eu: 'Batuketa eta kenketa kateak parentesirik gabe idaztea eta kalkulatzea.',
            es: 'Escribir y calcular cadenas de sumas y restas sin paréntesis.',
            ar: 'كتابة سلاسل الجمع والطرح دون أقواس وحسابها.'
        },
        explanation: {
            eu: '1. araua: lehen batugaiari parentesiak kendu; positiboa bada, zeinurik gabe idazten da. 2. araua: aurretik + duen parentesia kentzean, zenbakiaren zeinua bere horretan geratzen da. 3. araua: aurretik − duen parentesia kentzean, aurkakoaren zeinua idazten da. Praktikan: $+(+a)=+a$, $+(-a)=-a$, $-(+a)=-a$ eta $-(-a)=+a$. Gero, batu positiboak alde batetik eta negatiboak bestetik, eta kendu.',
            es: 'Regla 1: al primer sumando se le quitan los paréntesis; si es positivo, se escribe sin signo. Regla 2: al quitar un paréntesis precedido de +, el número conserva su signo. Regla 3: al quitar un paréntesis precedido de −, se escribe el signo del opuesto. En la práctica: $+(+a)=+a$, $+(-a)=-a$, $-(+a)=-a$ y $-(-a)=+a$. Después suma por un lado los positivos y por otro los negativos, y resta.',
            ar: 'القاعدة 1: نحذف أقواس الحد الأول؛ وإذا كان موجبًا نكتبه دون إشارة. القاعدة 2: عند حذف قوس تسبقه + يحتفظ العدد بإشارته. القاعدة 3: عند حذف قوس تسبقه − نكتب إشارة المعاكس. عمليًا: $+(+a)=+a$، $+(-a)=-a$، $-(+a)=-a$، $-(-a)=+a$. ثم نجمع الموجبة معًا والسالبة معًا ونطرح.'
        },
        example: '$\\begin{aligned}&(-7)-(+5)+(+3)+(+9)-(-4)+(-2)\\\\&=-7-5+3+9+4-2\\\\&=16-14=2\\end{aligned}$',
        takeaway: {
            eu: 'Zeinu berdinak elkarren ondoan: +. Zeinu desberdinak: −.',
            es: 'Signos iguales juntos: +. Signos distintos: −.',
            ar: 'إشارتان متشابهتان متجاورتان: +. إشارتان مختلفتان: −.'
        }
    },
    {
        id: 'brackets',
        stage: 'addsub',
        title: { eu: 'Parentesidun batuketak eta kenketak', es: 'Sumas y restas con paréntesis', ar: 'الجمع والطرح مع الأقواس' },
        goal: {
            eu: 'Parentesiak dituzten batuketa eta kenketak ordena egokian egitea.',
            es: 'Resolver sumas y restas con paréntesis en el orden correcto.',
            ar: 'حل عمليات الجمع والطرح ذات الأقواس بالترتيب الصحيح.'
        },
        explanation: {
            eu: 'Adierazpenak parentesiak baditu, lehenik parentesi barruko eragiketak egiten dira eta emaitza parentesi artean uzten da. Ondoren parentesiak kendu (modu laburtua) eta ezkerretik eskuinera kalkulatzen da. Beste bide bat: parentesiak hasieratik kentzea; aurretik − badago, barruko zeinu guztiak aldatzen dira.',
            es: 'Si la expresión tiene paréntesis, primero se hacen las operaciones de dentro y el resultado se deja entre paréntesis. Después se quitan los paréntesis (forma abreviada) y se calcula de izquierda a derecha. Otro camino: quitar los paréntesis desde el principio; si van precedidos de −, cambian todos los signos de dentro.',
            ar: 'إذا احتوى التعبير على أقواس نجري أولًا العمليات داخلها ونترك النتيجة بين قوسين. ثم نحذف الأقواس (الصيغة المختصرة) ونحسب من اليسار إلى اليمين. طريقة أخرى: حذف الأقواس من البداية؛ وإذا سبقتها − تتغيّر كل الإشارات داخلها.'
        },
        example: '$\\begin{aligned}&5+(-7+2-1)-(8-4+3-2)-4\\\\&=5+(-6)-(5)-4\\\\&=5-6-5-4=-10\\end{aligned}$',
        takeaway: {
            eu: 'Parentesi baten aurrean − badago, barruko zeinu guztiak aldatzen dira.',
            es: 'Si delante de un paréntesis hay un −, cambian todos los signos de dentro.',
            ar: 'إذا سبقت القوسَ إشارة − تتغيّر كل الإشارات داخله.'
        }
    },
    {
        id: 'multiply-divide',
        stage: 'muldiv',
        title: { eu: 'Biderketa eta zatiketa: zeinuen araua', es: 'Producto y cociente: regla de los signos', ar: 'الضرب والقسمة: قاعدة الإشارات' },
        goal: {
            eu: 'Zenbaki osoak biderkatzea eta zatitzea zeinuen araua erabiliz.',
            es: 'Multiplicar y dividir enteros usando la regla de los signos.',
            ar: 'ضرب الأعداد الصحيحة وقسمتها باستعمال قاعدة الإشارات.'
        },
        explanation: {
            eu: 'Bi zenbaki osoren biderketa edo zatiketa egiteko, balio absolutuak biderkatu edo zatitzen dira, eta emaitzari + zeinua jartzen zaio bi zenbakiek zeinu bera badute, eta − zeinua zeinu desberdina badute. Faktore gehiago badaude, ezkerretik eskuinera egiten da; edo lehenik zeinua erabakitzen da: faktore negatiboen kopurua bikoitia bada, emaitza positiboa da.',
            es: 'Para multiplicar o dividir dos enteros, se multiplican o dividen sus valores absolutos y al resultado se le pone signo + si los dos tienen el mismo signo, y signo − si tienen signos distintos. Si hay más factores, se opera de izquierda a derecha; o se decide antes el signo: si el número de factores negativos es par, el resultado es positivo.',
            ar: 'لضرب عددين صحيحين أو قسمتهما نضرب قيمتيهما المطلقتين أو نقسمهما، ونضع للنتيجة الإشارة + إذا كانت للعددين الإشارة نفسها، والإشارة − إذا اختلفت إشارتاهما. وإذا كانت هناك عوامل أكثر نحسب من اليسار إلى اليمين، أو نحدد الإشارة أولًا: إذا كان عدد العوامل السالبة زوجيًا فالنتيجة موجبة.'
        },
        example: '$\\begin{gathered}(-3)\\cdot(+5)=-15\\\\(-12)\\mathbin{:}(-4)=+3\\\\(-12)\\cdot(-2)\\mathbin{:}(+3)\\mathbin{:}(-4)=-2\\end{gathered}$',
        takeaway: {
            eu: 'Zeinu bera → +. Zeinu desberdina → −.',
            es: 'Mismo signo → +. Distinto signo → −.',
            ar: 'الإشارة نفسها ← +. إشارتان مختلفتان ← −.'
        },
        figure: (language) => <SignRuleFigure language={language} />
    },
    {
        id: 'combined',
        stage: 'muldiv',
        title: { eu: 'Eragiketa konbinatuak eta kako zuzenak', es: 'Operaciones combinadas y corchetes', ar: 'العمليات المركبة والأقواس المعقوفة' },
        goal: {
            eu: 'Eragiketa konbinatuak hierarkia errespetatuz ebaztea.',
            es: 'Resolver operaciones combinadas respetando la jerarquía.',
            ar: 'حل العمليات المركبة مع احترام أولوية العمليات.'
        },
        explanation: {
            eu: 'Ordena hau errespetatu behar da: 1) parentesi eta kako zuzenen barruko eragiketak, barrutik kanpora; 2) biderketak eta zatiketak, agertzen diren ordenan, ezkerretik eskuinera; 3) batuketak eta kenketak, horiek ere ezkerretik eskuinera. Urrats bakoitzean zeinuak zaindu.',
            es: 'Hay que respetar este orden: 1) las operaciones dentro de paréntesis y corchetes, de dentro hacia fuera; 2) los productos y cocientes, en el orden en que aparecen, de izquierda a derecha; 3) las sumas y restas, también de izquierda a derecha. En cada paso, cuida los signos.',
            ar: 'يجب احترام هذا الترتيب: 1) العمليات داخل الأقواس والأقواس المعقوفة من الداخل إلى الخارج؛ 2) الضرب والقسمة حسب ترتيب ظهورهما من اليسار إلى اليمين؛ 3) الجمع والطرح من اليسار إلى اليمين أيضًا. انتبه للإشارات في كل خطوة.'
        },
        example: '$\\begin{aligned}&(-4)-[(-8)-(+2)]\\mathbin{:}(-5)\\\\&\\quad+(-6)\\mathbin{:}[(+1)-(-2)]\\\\&=(-4)-(-10)\\mathbin{:}(-5)+(-6)\\mathbin{:}(+3)\\\\&=(-4)-(+2)+(-2)=-8\\end{aligned}$',
        takeaway: {
            eu: 'Parentesiak → biderketak eta zatiketak → batuketak eta kenketak.',
            es: 'Paréntesis → productos y cocientes → sumas y restas.',
            ar: 'الأقواس ← الضرب والقسمة ← الجمع والطرح.'
        }
    }
]

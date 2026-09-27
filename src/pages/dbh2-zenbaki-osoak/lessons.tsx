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
        explanation: { eu: 'Zenbaki osoen multzoa ℤ da, eta hiru zati ditu. Zenbakizko zuzenean, zeroak zuzena bi zatitan banatzen du.', es: 'El conjunto de los números enteros es ℤ y tiene tres partes. En la recta numérica, el cero la divide en dos.', ar: 'مجموعة الأعداد الصحيحة هي ℤ ولها ثلاثة أجزاء. على خط الأعداد يقسم الصفر الخط إلى قسمين.' },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Zenbaki oso positiboak', es: 'Enteros positivos', ar: 'الأعداد الصحيحة الموجبة' }, text: { eu: 'Zeroaren eskuinean daude. + zeinurik gabe ere idazten dira: +5 = 5.', es: 'Están a la derecha del cero. También se escriben sin el signo +: +5 = 5.', ar: 'تقع على يمين الصفر، ويمكن كتابتها دون الإشارة +: ⁦+5⁩ = 5.' }, math: '$+1,\\ +2,\\ +3,\\ \\dots$' },
            { title: { eu: 'Zeroa', es: 'El cero', ar: 'الصفر' }, text: { eu: 'Ez da ez positiboa ez negatiboa: zuzenaren erdigunea da.', es: 'No es ni positivo ni negativo: es el centro de la recta.', ar: 'ليس موجبًا ولا سالبًا: إنه مركز الخط.' }, math: '$0$' },
            { title: { eu: 'Zenbaki oso negatiboak', es: 'Enteros negativos', ar: 'الأعداد الصحيحة السالبة' }, text: { eu: 'Zeroaren ezkerrean daude, positiboen distantzia berera.', es: 'Están a la izquierda del cero, a la misma distancia que los positivos.', ar: 'تقع على يسار الصفر، بالمسافات نفسها التي للموجبة.' }, math: '$-1,\\ -2,\\ -3,\\ \\dots$' }
        ],
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
        explanation: { eu: 'Zenbakizko zuzenean eskuinean dagoena da handiena. Hortik ateratzen dira lau arau hauek:', es: 'En la recta numérica, el que está más a la derecha es el mayor. De ahí salen estas cuatro reglas:', ar: 'على خط الأعداد يكون العدد الواقع إلى اليمين هو الأكبر. ومن ذلك تنتج هذه القواعد الأربع:' },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Positiboa eta negatiboa', es: 'Positivo y negativo', ar: 'موجب وسالب' }, text: { eu: 'Edozein positibo edozein negatibo baino handiagoa da.', es: 'Cualquier positivo es mayor que cualquier negativo.', ar: 'كل عدد موجب أكبر من أي عدد سالب.' }, math: '$-5<+3$' },
            { title: { eu: 'Zeroa', es: 'El cero', ar: 'الصفر' }, text: { eu: 'Zeroa negatibo guztiak baino handiagoa da, eta positibo guztiak baino txikiagoa.', es: 'El cero es mayor que todos los negativos y menor que todos los positivos.', ar: 'الصفر أكبر من كل الأعداد السالبة وأصغر من كل الموجبة.' }, math: '$-3<0<+2$' },
            { title: { eu: 'Bi positibo', es: 'Dos positivos', ar: 'عددان موجبان' }, text: { eu: 'Balio absolutu handienekoa da handiena.', es: 'Es mayor el de mayor valor absoluto.', ar: 'الأكبر هو صاحب القيمة المطلقة الأكبر.' }, math: '$+3<+5$' },
            { title: { eu: 'Bi negatibo', es: 'Dos negativos', ar: 'عددان سالبان' }, text: { eu: 'Balio absolutu txikienekoa da handiena: zerotik hurbilago dago.', es: 'Es mayor el de menor valor absoluto: está más cerca del cero.', ar: 'الأكبر هو صاحب القيمة المطلقة الأصغر: إنه أقرب إلى الصفر.' }, math: '$-4<-2$' }
        ],
        example: '$\\begin{gathered}-4<-2\\\\-5<+3\\\\+3<+5\\end{gathered}$',
        takeaway: {
            eu: 'Negatiboetan, zerotik hurbilago dagoena da handiena: −2 > −4.',
            es: 'Entre negativos, el más cercano al cero es el mayor: −2 > −4.',
            ar: 'بين الأعداد السالبة يكون الأقرب إلى الصفر هو الأكبر: ⁦−2⁩ > ⁦−4⁩.'
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
        explanation: { eu: 'Adibidez, ordenatu handienetik txikienera: −10, +4, +9, 0, −6, −8, +3. Jarraitu urrats hauek:', es: 'Por ejemplo, ordena de mayor a menor: −10, +4, +9, 0, −6, −8, +3. Sigue estos pasos:', ar: 'مثال: رتّب تنازليًا: ⁦−10⁩، ⁦+4⁩، ⁦+9⁩، 0، ⁦−6⁩، ⁦−8⁩، ⁦+3⁩. اتبع هذه الخطوات:' },
        steps: [
            { text: { eu: 'Banatu positiboak alde batean eta negatiboak bestean; zeroa erdian.', es: 'Separa los positivos a un lado y los negativos al otro; el cero, en medio.', ar: 'افصل الموجبة في جهة والسالبة في جهة أخرى، والصفر في الوسط.' }, math: '$+4,\\,+9,\\,+3\\quad\\mid\\quad 0\\quad\\mid\\quad -10,\\,-6,\\,-8$' },
            { text: { eu: 'Ordenatu positiboak zenbaki arruntak bezala.', es: 'Ordena los positivos como números naturales.', ar: 'رتّب الموجبة كالأعداد الطبيعية.' }, math: '$+9>+4>+3$' },
            { text: { eu: 'Ordenatu negatiboak: balio absolutu txikienekoa da handiena.', es: 'Ordena los negativos: el de menor valor absoluto es el mayor.', ar: 'رتّب السالبة: صاحب القيمة المطلقة الأصغر هو الأكبر.' }, math: '$-6>-8>-10$' },
            { text: { eu: 'Elkartu dena: positiboak, zeroa eta negatiboak.', es: 'Júntalo todo: positivos, cero y negativos.', ar: 'اجمع الكل: الموجبة ثم الصفر ثم السالبة.' }, math: '$+9>+4>+3>0>-6>-8>-10$' }
        ],
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
        explanation: { eu: 'Bi zenbaki osoren batuketan bi kasu daude, zeinuen arabera. Zuzenean, positibo bat batzea eskuinera mugitzea da, eta negatibo bat batzea, ezkerrera.', es: 'En la suma de dos enteros hay dos casos, según los signos. En la recta, sumar un positivo es moverse a la derecha, y sumar un negativo, a la izquierda.', ar: 'في جمع عددين صحيحين حالتان حسب الإشارات. على خط الأعداد، جمع عدد موجب انتقال إلى اليمين، وجمع عدد سالب انتقال إلى اليسار.' },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Zeinu bereko zenbakiak', es: 'Números del mismo signo', ar: 'عددان لهما الإشارة نفسها' }, text: { eu: 'Batu balio absolutuak eta jarri zenbakien zeinu bera.', es: 'Suma los valores absolutos y pon el mismo signo de los números.', ar: 'اجمع القيمتين المطلقتين وضع الإشارة نفسها.' }, math: '$(-2)+(-4)=-(2+4)=-6$' },
            { title: { eu: 'Zeinu desberdineko zenbakiak', es: 'Números de distinto signo', ar: 'عددان مختلفا الإشارة' }, text: { eu: 'Balio absolutu handienari txikiena kendu, eta jarri balio absolutu handiena duenaren zeinua.', es: 'Al valor absoluto mayor réstale el menor y pon el signo del que tiene mayor valor absoluto.', ar: 'اطرح القيمة المطلقة الصغرى من الكبرى وضع إشارة صاحب القيمة المطلقة الأكبر.' }, math: '$(-8)+(+2)=-(8-2)=-6$' }
        ],
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
        explanation: { eu: 'Batuketa eta kenketa kateak errazago egiteko, parentesiak kendu eta modu laburtuan idazten dira. Hiru arau hauek erabiltzen dira:', es: 'Para calcular cadenas de sumas y restas con más facilidad, se quitan los paréntesis y se escriben en forma abreviada. Se usan estas tres reglas:', ar: 'لحساب سلاسل الجمع والطرح بسهولة نحذف الأقواس ونكتبها بالصيغة المختصرة. نستعمل هذه القواعد الثلاث:' },
        steps: [
            { title: { eu: '1. araua · Lehen batugaia', es: 'Regla 1 · Primer sumando', ar: 'القاعدة 1 · الحد الأول' }, text: { eu: 'Lehen batugaiari parentesiak kentzen zaizkio. Positiboa bada, zeinurik gabe idazten da.', es: 'Al primer sumando se le quitan los paréntesis. Si es positivo, se escribe sin signo.', ar: 'نحذف أقواس الحد الأول، وإذا كان موجبًا نكتبه دون إشارة.' }, math: '$(+3)+(-7)=3+(-7)$' },
            { title: { eu: '2. araua · Aurretik +', es: 'Regla 2 · Precedido de +', ar: 'القاعدة 2 · تسبقه +' }, text: { eu: 'Aurretik + duen parentesia kentzean, zenbakiak bere zeinua mantentzen du.', es: 'Al quitar un paréntesis precedido de +, el número conserva su signo.', ar: 'عند حذف قوس تسبقه + يحتفظ العدد بإشارته.' }, math: '$(-4)+(-8)=-4-8$' },
            { title: { eu: '3. araua · Aurretik −', es: 'Regla 3 · Precedido de −', ar: 'القاعدة 3 · تسبقه −' }, text: { eu: 'Aurretik − duen parentesia kentzean, aurkakoaren zeinua idazten da.', es: 'Al quitar un paréntesis precedido de −, se escribe el signo del opuesto.', ar: 'عند حذف قوس تسبقه − نكتب إشارة المعاكس.' }, math: '$(+3)-(-4)=3+4$' },
            { title: { eu: 'Azkenik, kalkulatu', es: 'Por último, calcula', ar: 'أخيرًا، احسب' }, text: { eu: 'Batu positiboak alde batetik eta negatiboak bestetik, eta kendu lehen emaitzari bigarrena.', es: 'Suma los positivos por un lado y los negativos por otro, y resta el segundo resultado al primero.', ar: 'اجمع الموجبة معًا والسالبة معًا، ثم اطرح الناتج الثاني من الأول.' }, math: '$3+9+4-7-5-2=16-14=2$' }
        ],
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
        explanation: { eu: 'Adierazpenak parentesiak baditu, bi bide daude. Biek emaitza bera ematen dute.', es: 'Si la expresión tiene paréntesis, hay dos caminos. Los dos dan el mismo resultado.', ar: 'إذا احتوى التعبير على أقواس فهناك طريقان، ويعطيان النتيجة نفسها.' },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Lehenik barrukoa', es: 'Primero lo de dentro', ar: 'الداخل أولًا' }, text: { eu: 'Egin parentesi barruko eragiketak eta utzi emaitza parentesi artean. Gero kendu parentesiak eta kalkulatu.', es: 'Haz las operaciones de dentro y deja el resultado entre paréntesis. Después quita los paréntesis y calcula.', ar: 'أجرِ العمليات داخل الأقواس واترك النتيجة بين قوسين، ثم احذف الأقواس واحسب.' }, math: '$6-(-3+2)=6-(-1)=6+1=7$' },
            { title: { eu: 'Parentesiak kenduz', es: 'Quitando paréntesis', ar: 'بحذف الأقواس' }, text: { eu: 'Kendu parentesiak hasieratik. Aurretik − badago, barruko zeinu guztiak aldatzen dira.', es: 'Quita los paréntesis desde el principio. Si van precedidos de −, cambian todos los signos de dentro.', ar: 'احذف الأقواس من البداية. إذا سبقتها − تتغيّر كل الإشارات داخلها.' }, math: '$6-(-3+2)=6+3-2=7$' }
        ],
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
        explanation: { eu: 'Biderketan eta zatiketan arau bera erabiltzen da, bi urratsetan:', es: 'Para multiplicar y dividir se usa la misma regla, en dos pasos:', ar: 'في الضرب والقسمة نستعمل القاعدة نفسها، في خطوتين:' },
        steps: [
            { text: { eu: 'Biderkatu edo zatitu balio absolutuak.', es: 'Multiplica o divide los valores absolutos.', ar: 'اضرب القيمتين المطلقتين أو اقسمهما.' }, math: '$\\lvert -12\\rvert \\mathbin{:}\\lvert -4\\rvert =12\\mathbin{:}4=3$' },
            { text: { eu: 'Jarri zeinua: + bi zenbakiek zeinu bera badute; − zeinu desberdina badute.', es: 'Pon el signo: + si los dos tienen el mismo signo; − si tienen signos distintos.', ar: 'ضع الإشارة: + إذا كانت للعددين الإشارة نفسها، و− إذا اختلفت إشارتاهما.' }, math: '$(-12)\\mathbin{:}(-4)=+3\\qquad (-3)\\cdot(+5)=-15$' },
            { title: { eu: 'Hainbat faktore', es: 'Varios factores', ar: 'عدة عوامل' }, text: { eu: 'Faktore gehiago badaude, egin ezkerretik eskuinera, edo zenbatu negatiboak: kopurua bikoitia bada, emaitza positiboa da.', es: 'Si hay más factores, opera de izquierda a derecha, o cuenta los negativos: si hay un número par, el resultado es positivo.', ar: 'إذا كانت هناك عوامل أكثر، احسب من اليسار إلى اليمين، أو عُدّ العوامل السالبة: إذا كان عددها زوجيًا فالنتيجة موجبة.' }, math: '$(-2)\\cdot(-3)\\cdot(-1)=-6$' }
        ],
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
        explanation: { eu: 'Eragiketa konbinatuetan ordena hau errespetatu behar da. Urrats bakoitzean, zaindu zeinuak.', es: 'En las operaciones combinadas hay que respetar este orden. En cada paso, cuida los signos.', ar: 'في العمليات المركبة يجب احترام هذا الترتيب، مع الانتباه للإشارات في كل خطوة.' },
        steps: [
            { title: { eu: 'Parentesiak eta kakoak', es: 'Paréntesis y corchetes', ar: 'الأقواس' }, text: { eu: 'Parentesi eta kako zuzenen barruko eragiketak, barrutik kanpora.', es: 'Las operaciones dentro de paréntesis y corchetes, de dentro hacia fuera.', ar: 'العمليات داخل الأقواس والأقواس المعقوفة، من الداخل إلى الخارج.' }, math: '$[(-8)-(+2)]=-10$' },
            { title: { eu: 'Biderketak eta zatiketak', es: 'Productos y cocientes', ar: 'الضرب والقسمة' }, text: { eu: 'Agertzen diren ordenan, ezkerretik eskuinera.', es: 'En el orden en que aparecen, de izquierda a derecha.', ar: 'حسب ترتيب ظهورها، من اليسار إلى اليمين.' }, math: '$(-10)\\mathbin{:}(-5)=+2$' },
            { title: { eu: 'Batuketak eta kenketak', es: 'Sumas y restas', ar: 'الجمع والطرح' }, text: { eu: 'Azkenik, horiek ere ezkerretik eskuinera.', es: 'Por último, también de izquierda a derecha.', ar: 'أخيرًا، من اليسار إلى اليمين أيضًا.' }, math: '$(-4)-(+2)+(-2)=-8$' }
        ],
        example: '$\\begin{aligned}&(-4)-[(-8)-(+2)]\\mathbin{:}(-5)\\\\&\\quad+(-6)\\mathbin{:}[(+1)-(-2)]\\\\&=(-4)-(-10)\\mathbin{:}(-5)+(-6)\\mathbin{:}(+3)\\\\&=(-4)-(+2)+(-2)=-8\\end{aligned}$',
        takeaway: {
            eu: 'Parentesiak → biderketak eta zatiketak → batuketak eta kenketak.',
            es: 'Paréntesis → productos y cocientes → sumas y restas.',
            ar: 'الأقواس ← الضرب والقسمة ← الجمع والطرح.'
        }
    }
]

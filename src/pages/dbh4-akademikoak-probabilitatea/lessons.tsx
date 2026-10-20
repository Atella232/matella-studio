import type { LocalizedText, UnitStage, UnitTopic } from '../../features/unit-v2/types'
import {
    CoinsTreeFigure,
    CombinationsDeckFigure,
    ConditionalFigure,
    ContingencyTableFigure,
    DeckEventsFigure,
    FairGameFigure,
    FrequencyFigure,
    MaxDiceFigure,
    ProbabilityVennFigure,
    ReplacementFigure,
    TotalTreeFigure,
    TwoDiceFigure,
    TwoDrawTreeFigure,
    UrnDrawsFigure,
    VennNumbersFigure
} from './figures'

/* ==========================================================================
   Probabilitatea · 4. DBH akademikoak — stages and lessons, following
   Santillana Académicas unit 14 (random experiments, events and their
   operations, relative frequency, the rule of Laplace, properties,
   conditional probability, compound experiments and contingency tables)
   and Anaya Académicas unit 12 (balls numbered 1 to 10, the octahedral
   die, cards with and without replacement, urns that pass a ball on, the
   table of extracurricular activities, combinatorics with three dice and
   fair games).
   ========================================================================== */

export type ProbabilityAkStageId = 'events' | 'probability' | 'compound' | 'conditional' | 'counting'

export const probabilityAkStages: UnitStage[] = [
    { id: 'events', tone: 'blue', title: { eu: 'Gertaerak', es: 'Sucesos', ar: 'الأحداث' } },
    { id: 'probability', tone: 'violet', title: { eu: 'Probabilitatea', es: 'Probabilidad', ar: 'الاحتمال' } },
    { id: 'compound', tone: 'mustard', title: { eu: 'Esperientzia konposatuak', es: 'Experiencias compuestas', ar: 'التجارب المركّبة' } },
    { id: 'conditional', tone: 'coral', title: { eu: 'Baldintzatua', es: 'Condicionada', ar: 'الاحتمال المشروط' } },
    { id: 'counting', tone: 'green', title: { eu: 'Zenbatu eta erabaki', es: 'Contar y decidir', ar: 'العدّ والقرار' } }
]

const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => ({ eu: value, es: value, ar: value.replace(/\{,\}/g, '.') })

export const probabilityAkTopics: UnitTopic[] = [
    /* ---------- 1. Events ---------- */
    {
        id: 'experiments',
        stage: 'events',
        title: say('Esperimentu aleatorioak eta lagin-espazioa', 'Experimentos aleatorios y espacio muestral', 'التجارب العشوائية وفضاء العيّنة'),
        goal: say('Esperimentu aleatorioak eta deterministak bereiztea, eta lagin-espazioa idaztea.', 'Distinguir experimentos aleatorios y deterministas, y escribir el espacio muestral.', 'التمييز بين التجارب العشوائية والحتمية، وكتابة فضاء العيّنة.'),
        explanation: say(
            'Esperimentu bat aleatorioa da, baldintza berdinetan errepikatuta ere, emaitza ezin denean aurreikusi: dado bat botatzea, karta bat ateratzea, norbait zoriz aukeratzea. Determinista da emaitza aldez aurretik dakigunean: harri bat askatzea, hilabete bateko astelehenak zenbatzea. Esperimentu aleatorio baten emaitza posible guztien multzoa lagin-espazioa da, $E$, eta emaitza bakoitza oinarrizko gertaera bat. Gertaera bat $E$-ren edozein azpimultzo da: dado bat botatzean, «bikoitia ateratzea» $\\{2, 4, 6\\}$ da. Gertaera ziurra, $E$, beti gertatzen da, eta gertaera ezinezkoa, $\\varnothing$, inoiz ez. Urrats bat baino gehiagoko esperimentuetan, zuhaitz batek lagin-espazioa ordenatzen du, emaitzarik ahaztu edo errepikatu gabe. Txanponekin, C idazten dugu aurpegirako eta + gurutzerako.',
            'Un experimento es aleatorio cuando, aunque se repita en las mismas condiciones, no se puede predecir su resultado: lanzar un dado, sacar una carta, elegir a alguien al azar. Es determinista cuando el resultado se sabe de antemano: soltar una piedra, contar los lunes de un mes. El conjunto de todos los resultados posibles de un experimento aleatorio es el espacio muestral, $E$, y cada resultado es un suceso elemental. Un suceso es cualquier subconjunto de $E$: al lanzar un dado, «sacar par» es $\\{2, 4, 6\\}$. El suceso seguro, $E$, ocurre siempre, y el suceso imposible, $\\varnothing$, nunca. En experimentos de varios pasos, un árbol ordena el espacio muestral sin olvidar ni repetir resultados. Con monedas escribimos C para cara y + para cruz.',
            'تكون التجربة عشوائية إذا تعذّر التنبؤ بنتيجتها رغم تكرارها في الظروف نفسها: رمي نرد، سحب ورقة، اختيار شخص عشوائيًا. وتكون حتمية إذا عُرفت النتيجة مسبقًا: إفلات حجر، عدّ أيام الاثنين في شهر. مجموعة كل النتائج الممكنة لتجربة عشوائية هي فضاء العيّنة $E$، وكل نتيجة حدث بسيط. والحدث هو أي مجموعة جزئية من $E$: عند رمي نرد، «الحصول على عدد زوجي» هو $\\{2, 4, 6\\}$. الحدث الأكيد $E$ يقع دائمًا، والحدث المستحيل $\\varnothing$ لا يقع أبدًا. وفي التجارب ذات الخطوات المتعددة ترتّب الشجرة فضاء العيّنة دون نسيان نتيجة أو تكرارها. ونكتب في قطع النقود C للوجه و+ للظهر.'
        ),
        problem: say('Hiru txanpon botatzen ditugu. Idatzi lagin-espazioa. Zenbat oinarrizko gertaera ditu? Zeintzuk osatzen dute «gutxienez bi aurpegi» gertaera?', 'Lanzamos tres monedas. Escribe el espacio muestral. ¿Cuántos sucesos elementales tiene? ¿Cuáles forman el suceso «al menos dos caras»?', 'نرمي ثلاث قطع نقدية. اكتب فضاء العيّنة. كم حدثًا بسيطًا فيه؟ وما الأحداث البسيطة التي تكوّن الحدث «وجهان على الأقل»؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Txanpon bakoitza C edo +: hiru mailako zuhaitza.', 'Cada moneda, C o +: un árbol de tres niveles.', 'كل قطعة C أو +: شجرة من ثلاثة مستويات.'), math: same('$2\\cdot 2\\cdot 2=8$') },
            { text: say('Ibili adarrak ordenan: $\\text{CCC}$, $\\text{CC+}$, $\\text{C+C}$, $\\text{C++}$, $\\text{+CC}$, $\\text{+C+}$, $\\text{++C}$, $\\text{+++}$.', 'Recorre las ramas en orden: $\\text{CCC}$, $\\text{CC+}$, $\\text{C+C}$, $\\text{C++}$, $\\text{+CC}$, $\\text{+C+}$, $\\text{++C}$, $\\text{+++}$.', 'امشِ على الفروع بالترتيب: $\\text{CCC}$، $\\text{CC+}$، $\\text{C+C}$، $\\text{C++}$، $\\text{+CC}$، $\\text{+C+}$، $\\text{++C}$، $\\text{+++}$.') },
            { text: say('Gutxienez bi aurpegi: 8tik 4.', 'Al menos dos caras: 4 de los 8.', 'وجهان على الأقل: 4 من 8.'), math: same('$\\{\\text{CCC},\\text{CC+},\\text{C+C},\\text{+CC}\\}$') }
        ],
        example: same('$E=\\{1,2,3,4,5,6\\}$'),
        takeaway: say('Aleatorioa: ezin da aurreikusi. Lagin-espazioa: emaitza guztiak; gertaera: haien zati bat.', 'Aleatorio: no se puede predecir. Espacio muestral: todos los resultados; suceso: una parte de ellos.', 'عشوائية: لا يمكن التنبؤ بها. فضاء العيّنة: كل النتائج؛ والحدث: جزء منها.'),
        figure: (language) => <CoinsTreeFigure language={language} />
    },
    {
        id: 'operations',
        stage: 'events',
        title: say('Gertaeren arteko eragiketak', 'Operaciones con sucesos', 'العمليات على الأحداث'),
        goal: say('Gertaeren bildura, ebakidura eta aurkakoa kalkulatzea.', 'Calcular la unión, la intersección y el contrario de sucesos.', 'حساب اتحاد الأحداث وتقاطعها والحدث المعاكس.'),
        explanation: say(
            'Esperimentu bereko bi gertaerarekin, $A$ eta $B$, beste batzuk osatzen dira. Bildura, $A\\cup B$, $A$ edo $B$ (edo biak) gertatzen denean gertatzen da: bien emaitzak biltzen ditu. Ebakidura, $A\\cap B$, $A$ eta $B$ aldi berean gertatzen direnean gertatzen da: emaitza komunak bakarrik. $A$-ren aurkakoa, $\\overline{A}$ (edo $A\'$), $A$ gertatzen ez denean gertatzen da: $A$-n ez dauden $E$-ren emaitzak. Venn diagrama batek begi-bistan uzten du: laukizuzen bat $E$-rentzat eta obalo bat gertaera bakoitzarentzat. Beti betetzen da $A\\cup\\overline{A}=E$ eta $A\\cap\\overline{A}=\\varnothing$.',
            'Con dos sucesos $A$ y $B$ de un mismo experimento se forman otros. La unión, $A\\cup B$, ocurre cuando ocurre $A$ o $B$ (o los dos): reúne los resultados de ambos. La intersección, $A\\cap B$, ocurre cuando ocurren $A$ y $B$ a la vez: solo los resultados comunes. El contrario de $A$, $\\overline{A}$ (también se escribe $A\'$), ocurre cuando no ocurre $A$: los resultados de $E$ que no están en $A$. Un diagrama de Venn lo deja a la vista: un rectángulo para $E$ y un óvalo para cada suceso. Siempre se cumple $A\\cup\\overline{A}=E$ y $A\\cap\\overline{A}=\\varnothing$.',
            'من حدثين $A$ و$B$ للتجربة نفسها نكوّن أحداثًا أخرى. الاتحاد $A\\cup B$ يقع عندما يقع $A$ أو $B$ (أو كلاهما): يجمع نتائج الاثنين. والتقاطع $A\\cap B$ يقع عندما يقع $A$ و$B$ معًا: النتائج المشتركة فقط. والحدث المعاكس لـ$A$، أي $\\overline{A}$ (ويُكتب أيضًا $A\'$)، يقع عندما لا يقع $A$: نتائج $E$ التي ليست في $A$. ويُظهر ذلك مخطط فن: مستطيل لـ$E$ وشكل بيضوي لكل حدث. ودائمًا $A\\cup\\overline{A}=E$ و$A\\cap\\overline{A}=\\varnothing$.'
        ),
        problem: say('Poltsa batean 1etik 10era zenbakitutako 10 bola daude. Bat ateratzen dugu. $A$ = «zenbaki lehena» eta $B$ = «3ren multiploa». Deskribatu $A\\cup B$, $A\\cap B$ eta $\\overline{A}$.', 'Una bolsa tiene 10 bolas numeradas del 1 al 10. Sacamos una. $A$ = «número primo» y $B$ = «múltiplo de 3». Describe $A\\cup B$, $A\\cap B$ y $\\overline{A}$.', 'في كيس 10 كرات مرقّمة من 1 إلى 10. نسحب واحدة. $A$ = «عدد أولي» و$B$ = «مضاعف للعدد 3». صِف $A\\cup B$ و$A\\cap B$ و$\\overline{A}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Idatzi gertaera bakoitza.', 'Escribe cada suceso.', 'اكتب كل حدث.'), math: same('$A=\\{2,3,5,7\\}\\quad B=\\{3,6,9\\}$') },
            { text: say('Bildura: denak, 3a errepikatu gabe.', 'Unión: todos, sin repetir el 3.', 'الاتحاد: الكل دون تكرار 3.'), math: same('$A\\cup B=\\{2,3,5,6,7,9\\}$') },
            { text: say('Ebakidura: $A\\cap B=\\{3\\}$. Aurkakoa: lehenak ez direnak.', 'Intersección: $A\\cap B=\\{3\\}$. Contrario: los que no son primos.', 'التقاطع: $A\\cap B=\\{3\\}$. المعاكس: الأعداد غير الأولية.'), math: same('$\\overline{A}=\\{1,4,6,8,9,10\\}$') }
        ],
        example: same('$A\\cup\\overline{A}=E$'),
        takeaway: say('Bildura: «edo». Ebakidura: «eta». Aurkakoa: «ez».', 'Unión: «o». Intersección: «y». Contrario: «no».', 'الاتحاد: «أو». التقاطع: «و». المعاكس: «لا».'),
        figure: (language) => <VennNumbersFigure language={language} />
    },
    {
        id: 'compatible',
        stage: 'events',
        title: say('Gertaera bateragarriak eta bateraezinak', 'Sucesos compatibles e incompatibles', 'الأحداث المتوافقة والمتنافية'),
        goal: say('Gertaera bateragarriak, bateraezinak eta aurkakoak ezagutzea, eta De Morganen legeak erabiltzea.', 'Reconocer sucesos compatibles, incompatibles y contrarios, y usar las leyes de De Morgan.', 'التعرّف على الأحداث المتوافقة والمتنافية والمتعاكسة، واستعمال قانونَي دي مورغان.'),
        explanation: say(
            'Bi gertaera bateragarriak dira aldi berean gerta badaitezke, hau da, $A\\cap B\\neq\\varnothing$ bada; bateraezinak dira aldi berean ezin badira gertatu, $A\\cap B=\\varnothing$. 40 kartako sorta espainiar batean (urreak, kopak, ezpatak eta bastoiak; 1etik 7ra eta irudiak: sota, zaldia eta erregea, 10, 11 eta 12), «batekoa» eta «bastoiak» bateragarriak dira, bastoien batekoa badagoelako; «batekoa» eta «irudia» bateraezinak dira. Bi aurkako gertaera beti dira bateraezinak, baina bi bateraezin ez dira zertan aurkakoak izan: «batekoa» eta «irudia» ez dute sorta osoa betetzen. Bildura edo ebakidura bat ukatzeko, De Morganen legeak erabiltzen dira: «ez A eta ez B» $\\overline{A\\cup B}=\\overline{A}\\cap\\overline{B}$ da, eta «ez biak aldi berean» $\\overline{A\\cap B}=\\overline{A}\\cup\\overline{B}$.',
            'Dos sucesos son compatibles si pueden ocurrir a la vez, es decir, si $A\\cap B\\neq\\varnothing$; son incompatibles si no pueden ocurrir a la vez, $A\\cap B=\\varnothing$. En una baraja española de 40 cartas (oros, copas, espadas y bastos; del 1 al 7 y las figuras sota, caballo y rey, el 10, el 11 y el 12), «as» y «bastos» son compatibles, porque existe el as de bastos; «as» y «figura» son incompatibles. Dos sucesos contrarios son siempre incompatibles, pero dos incompatibles no tienen por qué ser contrarios: «as» y «figura» no cubren toda la baraja. Para negar una unión o una intersección se usan las leyes de De Morgan: «ni A ni B» es $\\overline{A\\cup B}=\\overline{A}\\cap\\overline{B}$, y «no los dos a la vez» es $\\overline{A\\cap B}=\\overline{A}\\cup\\overline{B}$.',
            'يكون الحدثان متوافقين إذا أمكن وقوعهما معًا، أي إذا كان $A\\cap B\\neq\\varnothing$، ومتنافيين إذا تعذّر وقوعهما معًا، $A\\cap B=\\varnothing$. في ورق اللعب الإسباني ذي 40 ورقة (الذهب والكؤوس والسيوف والعصي؛ من 1 إلى 7 والصور: الفتى والفارس والملك، أي 10 و11 و12)، «آس» و«عصي» متوافقان لوجود آس العصي، و«آس» و«صورة» متنافيان. الحدثان المتعاكسان متنافيان دائمًا، لكن المتنافيين ليسا بالضرورة متعاكسين: «آس» و«صورة» لا يغطيان كل الأوراق. ولنفي اتحاد أو تقاطع نستعمل قانونَي دي مورغان: «لا A ولا B» هو $\\overline{A\\cup B}=\\overline{A}\\cap\\overline{B}$، و«ليس الاثنان معًا» هو $\\overline{A\\cap B}=\\overline{A}\\cup\\overline{B}$.'
        ),
        problem: say('Sorta espainiar batetik karta bat ateratzen da. $A$ = «batekoa», $B$ = «bastoiak» eta $C$ = «irudia». Zein bikote dira bateragarriak? Zenbat kartak osatzen dute «ez batekoa ez irudia» gertaera?', 'Se saca una carta de una baraja española. $A$ = «as», $B$ = «bastos» y $C$ = «figura». ¿Qué pares son compatibles? ¿Cuántas cartas forman el suceso «ni as ni figura»?', 'تُسحب ورقة من ورق اللعب الإسباني. $A$ = «آس» و$B$ = «عصي» و$C$ = «صورة». أي الأزواج متوافقة؟ وكم ورقة تكوّن الحدث «لا آس ولا صورة»؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('$A$ eta $B$: bastoien batekoa bietan dago. $B$ eta $C$ ere bai: bastoien irudiak.', '$A$ y $B$: el as de bastos está en los dos. $B$ y $C$ también: las figuras de bastos.', '$A$ و$B$: آس العصي فيهما. وكذلك $B$ و$C$: صور العصي.'), math: same('$A\\cap B\\neq\\varnothing$') },
            { text: say('$A$ eta $C$: ez dago batekoa eta irudia den kartarik.', '$A$ y $C$: ninguna carta es as y figura.', '$A$ و$C$: لا توجد ورقة هي آس وصورة معًا.'), math: same('$A\\cap C=\\varnothing$') },
            { text: say('Ez batekoa ez irudia: kendu 4 batekoak eta 12 irudiak.', 'Ni as ni figura: quita 4 ases y 12 figuras.', 'لا آس ولا صورة: اطرح 4 آسات و12 صورة.'), math: same('$40-4-12=24$') }
        ],
        example: same('$\\overline{A\\cup B}=\\overline{A}\\cap\\overline{B}$'),
        takeaway: say('Bateragarriak: emaitzaren bat partekatzen dute. Bateraezinak: ebakidura hutsa. Aurkakoak: bateraezinak, eta biek $E$ betetzen dute.', 'Compatibles: comparten algún resultado. Incompatibles: intersección vacía. Contrarios: incompatibles y entre los dos llenan $E$.', 'متوافقان: يشتركان في نتيجة. متنافيان: التقاطع فارغ. متعاكسان: متنافيان ويملآن معًا $E$.'),
        figure: (language) => <DeckEventsFigure language={language} />
    },

    /* ---------- 2. Probability ---------- */
    {
        id: 'frequency',
        stage: 'probability',
        title: say('Maiztasun erlatiboa eta probabilitatea', 'Frecuencia relativa y probabilidad', 'التكرار النسبي والاحتمال'),
        goal: say('Probabilitateak maiztasun erlatiboarekin estimatzea eta zenbaki handien legea ulertzea.', 'Estimar probabilidades con la frecuencia relativa y entender la ley de los grandes números.', 'تقدير الاحتمالات بالتكرار النسبي وفهم قانون الأعداد الكبيرة.'),
        explanation: say(
            'Esperimentu bat $N$ aldiz errepikatzen bada eta $A$ gertaera $n$ aldiz gertatzen bada, $A$-ren maiztasun erlatiboa $\\frac{n}{N}$ da. Hasieran asko aldatzen da, baina esperimentua zenbat eta gehiagotan errepikatu, orduan eta egonkorrago geratzen da zenbaki baten inguruan: $A$-ren probabilitatea, $P(A)$. Zenbaki handien legea da. Horrela esleitzen zaizkie probabilitateak esperimentu irregularrei, txintxeta bati edo dado trukatu bati, adibidez, simetriak laguntzen ez duenean. Maiztasun erlatiboek probabilitateen gauza berak betetzen dituzte: 0 eta 1 artean daude, gertaera ziurrarena 1 da eta oinarrizko gertaera guztienak batuta 1. Probabilitatearekin aurreikusi egiten da: $P(A)=0{,}38$ bada, 250 errepikapenetan $0{,}38\\cdot 250=95$ aldiz inguru espero dugu $A$.',
            'Si un experimento se repite $N$ veces y el suceso $A$ ocurre $n$ veces, la frecuencia relativa de $A$ es $\\frac{n}{N}$. Al principio salta mucho, pero cuantas más veces se repite el experimento, más se estabiliza alrededor de un número: la probabilidad de $A$, $P(A)$. Es la ley de los grandes números. Así se asignan probabilidades a experimentos irregulares, como una chincheta o un dado trucado, en los que no hay simetría que ayude. Las frecuencias relativas cumplen lo mismo que las probabilidades: están entre 0 y 1, la del suceso seguro es 1 y las de todos los sucesos elementales suman 1. Con la probabilidad se predice: si $P(A)=0{,}38$, en 250 repeticiones esperamos unas $0{,}38\\cdot 250=95$ veces $A$.',
            'إذا كُرّرت تجربة $N$ مرة ووقع الحدث $A$ عدد $n$ من المرات، فالتكرار النسبي لـ$A$ هو $\\frac{n}{N}$. يتقلّب كثيرًا في البداية، لكن كلما زاد تكرار التجربة استقرّ حول عدد: احتمال $A$، أي $P(A)$. هذا قانون الأعداد الكبيرة. وبه نعطي الاحتمالات للتجارب غير المنتظمة، كالدبوس أو النرد المغشوش، حيث لا يساعد التماثل. وتحقّق التكرارات النسبية ما تحقّقه الاحتمالات: تقع بين 0 و1، وتكرار الحدث الأكيد 1، ومجموع تكرارات الأحداث البسيطة 1. وبالاحتمال نتنبأ: إذا كان $P(A)=0{,}38$ ننتظر في 250 تكرارًا نحو $0{,}38\\cdot 250=95$ مرة وقوع $A$.'
        ),
        problem: say('Txintxeta bat 1000 aldiz botatzen da, eta 380 aldiz erortzen da punta gora. Estimatu punta gora eta punta behera erortzeko probabilitateak. Zenbat aldiz espero duzu punta gora 250 jaurtiketatan?', 'Se lanza una chincheta 1000 veces y cae con la punta hacia arriba 380 veces. Estima la probabilidad de punta arriba y la de punta abajo. ¿Cuántas veces esperas punta arriba en 250 lanzamientos?', 'يُرمى دبوس 1000 مرة فيسقط ورأسه إلى الأعلى 380 مرة. قدّر احتمال سقوطه ورأسه إلى الأعلى وإلى الأسفل. كم مرة تنتظر الرأس إلى الأعلى في 250 رمية؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Punta goraren maiztasun erlatiboa.', 'Frecuencia relativa de punta arriba.', 'التكرار النسبي للرأس إلى الأعلى.'), math: same('$\\frac{380}{1000}=0{,}38$') },
            { text: say('Punta behera aurkakoa da.', 'Punta abajo es el contrario.', 'الرأس إلى الأسفل هو المعاكس.'), math: same('$1-0{,}38=0{,}62$') },
            { text: say('Aurreikuspena 250 jaurtiketarako.', 'Predicción para 250 lanzamientos.', 'التنبؤ لـ250 رمية.'), math: same('$0{,}38\\cdot 250=95$') }
        ],
        example: same('$\\frac{461}{1000}=0{,}461$'),
        takeaway: say('Errepikapen asko: maiztasun erlatiboa probabilitatera hurbiltzen da.', 'Muchas repeticiones: la frecuencia relativa se acerca a la probabilidad.', 'تكرارات كثيرة: يقترب التكرار النسبي من الاحتمال.'),
        figure: (language) => <FrequencyFigure language={language} />
    },
    {
        id: 'laplace',
        stage: 'probability',
        title: say('Laplaceren erregela', 'La regla de Laplace', 'قاعدة لابلاس'),
        goal: say('Esperimentu erregularretan probabilitateak kalkulatzea, aldeko kasuak eta kasu posibleak zenbatuta.', 'Calcular probabilidades en experimentos regulares contando casos favorables y posibles.', 'حساب الاحتمالات في التجارب المنتظمة بعدّ الحالات الملائمة والممكنة.'),
        explanation: say(
            'Esperimentu bat erregularra da oinarrizko gertaera guztiek probabilitate bera badute (ekiprobableak badira): dado ez-trukatu bat, ondo nahastutako sorta bateko karta bat, zoriz aukeratutako pertsona bat. Orduan Laplaceren erregela erabil daiteke: $P(A)=\\frac{\\text{aldeko kasuak}}{\\text{kasu posibleak}}$. Zaila ondo zenbatzea da. Bi dado botatzean, 2tik 12rako baturak ez dira ekiprobableak; ekiprobableak taulako 36 bikoteak dira (1. dadoa, 2. dadoa). 7 batura 6 laukitan agertzen da, eta 2 batura batean bakarrik. Esperimentua erregularra ez bada, bi aurpegitan 1 duen dado batean adibidez, Laplaceren erregela ezin da zuzenean erabili.',
            'Un experimento es regular si todos sus sucesos elementales tienen la misma probabilidad (son equiprobables): un dado no trucado, una carta de una baraja bien mezclada, una persona elegida al azar. Entonces vale la regla de Laplace: $P(A)=\\frac{\\text{casos favorables}}{\\text{casos posibles}}$. Lo difícil es contar bien. Al lanzar dos dados, las sumas del 2 al 12 no son equiprobables; los equiprobables son los 36 pares (dado 1, dado 2) de la tabla. La suma 7 aparece en 6 casillas y la suma 2 en una sola. Si el experimento no es regular, como un dado con dos caras marcadas con el 1, la regla de Laplace no sirve directamente.',
            'تكون التجربة منتظمة إذا كان لكل أحداثها البسيطة الاحتمال نفسه (متساوية الاحتمال): نرد غير مغشوش، ورقة من مجموعة مخلوطة جيدًا، شخص مختار عشوائيًا. عندئذ تصحّ قاعدة لابلاس: الاحتمال يساوي عدد الحالات الملائمة على عدد الحالات الممكنة. والصعب هو العدّ الصحيح. عند رمي نردين لا تكون المجاميع من 2 إلى 12 متساوية الاحتمال، بل الأزواج الـ36 (النرد الأول، النرد الثاني) في الجدول. يظهر المجموع 7 في 6 خانات والمجموع 2 في خانة واحدة. وإذا لم تكن التجربة منتظمة، كنرد كُتب 1 على وجهين منه، فلا تصلح قاعدة لابلاس مباشرة.'
        ),
        problem: say('Bi dado botatzen ditugu. Kalkulatu batura 7 izateko probabilitatea eta 11 izatekoa. Zergatik ez da $\\frac{1}{11}$?', 'Lanzamos dos dados. Calcula la probabilidad de que la suma sea 7 y la de que sea 11. ¿Por qué no es $\\frac{1}{11}$?', 'نرمي نردين. احسب احتمال أن يكون المجموع 7 واحتمال أن يكون 11. لماذا لا يساوي $\\frac{1}{11}$؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Kasu posibleak: taulako bikoteak.', 'Casos posibles: los pares de la tabla.', 'الحالات الممكنة: أزواج الجدول.'), math: same('$6\\cdot 6=36$') },
            { text: say('7 batura: 6 lauki.', 'Suma 7: 6 casillas.', 'المجموع 7: ست خانات.'), math: same('$\\frac{6}{36}=\\frac{1}{6}$') },
            { text: say('11 batura: 2 lauki bakarrik. 11 baturak ez dira ekiprobableak.', 'Suma 11: solo 2 casillas. Las 11 sumas no son equiprobables.', 'المجموع 11: خانتان فقط. المجاميع الـ11 ليست متساوية الاحتمال.'), math: same('$\\frac{2}{36}=\\frac{1}{18}$') }
        ],
        example: same('$\\frac{4}{8}=\\frac{1}{2}$'),
        takeaway: say('Laplace kasu ekiprobableekin bakarrik: aldekoak zati posibleak.', 'Laplace solo con casos equiprobables: favorables entre posibles.', 'لابلاس مع الحالات المتساوية الاحتمال فقط: الملائمة على الممكنة.'),
        figure: (language) => <TwoDiceFigure language={language} />
    },
    {
        id: 'properties',
        stage: 'probability',
        title: say('Probabilitatearen propietateak', 'Propiedades de la probabilidad', 'خصائص الاحتمال'),
        goal: say('Aurkako gertaera eta bilduraren probabilitatea erabiltzea, esperimentu irregularretan ere.', 'Usar el suceso contrario y la probabilidad de la unión, también en experimentos irregulares.', 'استعمال الحدث المعاكس واحتمال الاتحاد، حتى في التجارب غير المنتظمة.'),
        explanation: say(
            'Probabilitate orok betetzen du $0\\le P(A)\\le 1$, $P(E)=1$ eta $P(\\varnothing)=0$ izanik. Oinarrizko gertaeren probabilitateak batuta 1 dira, eta gertaera batena haren elementuenen batura da; horrela lantzen dira esperimentu irregularrak, dado trukatu bat adibidez. Aurkako gertaeratik: $P(\\overline{A})=1-P(A)$, oso erabilgarria $\\overline{A}$ zenbatzea errazagoa denean. $A$ eta $B$ bateraezinak badira, $P(A\\cup B)=P(A)+P(B)$. Bateragarriak badira, batzean ebakidura bi aldiz zenbatzen da eta behin kendu behar da: $P(A\\cup B)=P(A)+P(B)-P(A\\cap B)$. Probabilitatedun Venn diagrama batean, lau eremuak batuta 1 dira.',
            'Toda probabilidad cumple $0\\le P(A)\\le 1$, con $P(E)=1$ y $P(\\varnothing)=0$. Las probabilidades de los sucesos elementales suman 1, y la de un suceso es la suma de las de sus elementos; así se trabaja con experimentos irregulares, como un dado trucado. Del suceso contrario: $P(\\overline{A})=1-P(A)$, muy útil cuando $\\overline{A}$ es más fácil de contar. Si $A$ y $B$ son incompatibles, $P(A\\cup B)=P(A)+P(B)$. Si son compatibles, al sumar se cuenta dos veces la intersección y hay que restarla una vez: $P(A\\cup B)=P(A)+P(B)-P(A\\cap B)$. En un diagrama de Venn con probabilidades, las cuatro zonas suman 1.',
            'كل احتمال يحقّق $0\\le P(A)\\le 1$، مع $P(E)=1$ و$P(\\varnothing)=0$. ومجموع احتمالات الأحداث البسيطة 1، واحتمال حدث هو مجموع احتمالات عناصره؛ وبذلك نتعامل مع التجارب غير المنتظمة كالنرد المغشوش. ومن الحدث المعاكس: $P(\\overline{A})=1-P(A)$، وهو مفيد جدًا عندما يكون عدّ $\\overline{A}$ أسهل. إذا كان $A$ و$B$ متنافيين فإن $P(A\\cup B)=P(A)+P(B)$. وإذا كانا متوافقين فالجمع يعدّ التقاطع مرتين فيجب طرحه مرة: $P(A\\cup B)=P(A)+P(B)-P(A\\cap B)$. وفي مخطط فن بالاحتمالات مجموع المناطق الأربع 1.'
        ),
        problem: say('Gazte talde batean, $A$ = «futbolean jokatzen du» eta $B$ = «saskibaloian jokatzen du». Badakigu $P(A\\cup B)=0{,}7$, $P(A\\cap B)=0{,}12$ eta $P(\\overline{A})=0{,}74$ direla. Kalkulatu $P(B)$.', 'En un grupo de jóvenes, $A$ = «juega al fútbol» y $B$ = «juega al baloncesto». Se sabe que $P(A\\cup B)=0{,}7$, $P(A\\cap B)=0{,}12$ y $P(\\overline{A})=0{,}74$. Calcula $P(B)$.', 'في مجموعة من الشباب، $A$ = «يلعب كرة القدم» و$B$ = «يلعب كرة السلة». نعلم أن $P(A\\cup B)=0{,}7$ و$P(A\\cap B)=0{,}12$ و$P(\\overline{A})=0{,}74$. احسب $P(B)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Lehenik $P(A)$, aurkakoarekin.', 'Primero $P(A)$, con el contrario.', 'أولًا $P(A)$ بالمعاكس.'), math: same('$P(A)=1-0{,}74=0{,}26$') },
            { text: say('Idatzi bilduraren formula.', 'Escribe la fórmula de la unión.', 'اكتب صيغة الاتحاد.'), math: same('$0{,}7=0{,}26+P(B)-0{,}12$') },
            { text: say('Askatu.', 'Despeja.', 'اعزل المجهول.'), math: same('$P(B)=0{,}7-0{,}26+0{,}12=0{,}56$') }
        ],
        example: same('$\\frac{1-0{,}4}{5}=0{,}12$'),
        takeaway: say('Aurkakoa: 1 ken. Bildura: batu eta kendu ebakidura.', 'Contrario: 1 menos. Unión: suma y resta la intersección.', 'المعاكس: 1 ناقص. الاتحاد: اجمع واطرح التقاطع.'),
        figure: (language) => <ProbabilityVennFigure language={language} />
    },

    /* ---------- 3. Compound experiments ---------- */
    {
        id: 'independent',
        stage: 'compound',
        title: say('Esperientzia independenteak', 'Experiencias independientes', 'التجارب المستقلة'),
        goal: say('Esperientzia konposatu independenteen probabilitateak biderkatuz kalkulatzea.', 'Calcular probabilidades de experiencias compuestas independientes multiplicando.', 'حساب احتمالات التجارب المركّبة المستقلة بالضرب.'),
        explanation: say(
            'Esperientzia konposatu bat hainbat esperientzia soilez osatuta dago: txanpon bat eta dado bat botatzea, hiru karta bata bestearen atzetik ateratzea. Independenteak dira bakoitzaren emaitzak besteen probabilitateetan eragiten ez badu: hainbat dado, edo hurrengoa atera aurretik sortara itzultzen diren kartak (itzulita). Orduan aldi berean gertatzeko probabilitatea biderkadura da: $P(A\\cap B)=P(A)\\cdot P(B)$. Adibidez, aurpegia eta seia: $\\frac{1}{2}\\cdot\\frac{1}{6}=\\frac{1}{12}$. «Gutxienez bat» kalkulatzeko, ia beti hobe da aurkakoa, «bat ere ez»: 5 txanpon botatzean, gutxienez gurutze bat ateratzeko probabilitatea $1-\\left(\\frac{1}{2}\\right)^{5}=\\frac{31}{32}$ da.',
            'Una experiencia compuesta está formada por varias experiencias simples: lanzar una moneda y un dado, sacar tres cartas una tras otra. Son independientes si el resultado de cada una no influye en las probabilidades de las demás: varios dados, o cartas que se devuelven a la baraja antes de sacar la siguiente (con reemplazamiento). Entonces la probabilidad de que ocurran a la vez es el producto: $P(A\\cap B)=P(A)\\cdot P(B)$. Por ejemplo, cara y seis: $\\frac{1}{2}\\cdot\\frac{1}{6}=\\frac{1}{12}$. Para «al menos uno» casi siempre conviene el contrario, «ninguno»: al lanzar 5 monedas, la probabilidad de al menos una cruz es $1-\\left(\\frac{1}{2}\\right)^{5}=\\frac{31}{32}$.',
            'تتكوّن التجربة المركّبة من عدة تجارب بسيطة: رمي قطعة نقود ونرد، سحب ثلاث أوراق واحدة بعد أخرى. وتكون مستقلة إذا لم تؤثّر نتيجة كل منها في احتمالات الأخرى: عدة نرود، أو أوراق تُعاد إلى المجموعة قبل سحب التالية (مع الإرجاع). عندئذ يكون احتمال وقوعها معًا حاصل الضرب: $P(A\\cap B)=P(A)\\cdot P(B)$. مثلًا، وجه وستة: $\\frac{1}{2}\\cdot\\frac{1}{6}=\\frac{1}{12}$. ولحساب «واحد على الأقل» يُفضَّل غالبًا المعاكس «لا شيء»: عند رمي 5 قطع نقدية يكون احتمال ظهرٍ واحد على الأقل $1-\\left(\\frac{1}{2}\\right)^{5}=\\frac{31}{32}$.'
        ),
        problem: say('40 kartako sorta espainiar batetik 3 karta ateratzen dira, bakoitza itzuliz hurrengoa atera aurretik. Kalkulatu 1.ean batekoa eta 2.ean eta 3.ean irudia ateratzeko probabilitatea, eta batekorik ez ateratzekoa.', 'Se extraen 3 cartas de una baraja española de 40, devolviendo cada carta antes de sacar la siguiente. Calcula la probabilidad de as en la 1.ª y figura en la 2.ª y la 3.ª, y la de no sacar ningún as.', 'تُسحب 3 أوراق من ورق اللعب الإسباني (40 ورقة) مع إرجاع كل ورقة قبل سحب التالية. احسب احتمال آس في الأولى وصورة في الثانية والثالثة، واحتمال عدم سحب أي آس.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Karta bat: 40tik 4 batekoa eta 12 irudi.', 'Una carta: 4 ases y 12 figuras de 40.', 'ورقة واحدة: 4 آسات و12 صورة من 40.'), math: same('$\\frac{4}{40}=\\frac{1}{10}\\qquad\\frac{12}{40}=\\frac{3}{10}$') },
            { text: say('Itzulita: biderkatu.', 'Con devolución: multiplica.', 'مع الإرجاع: اضرب.'), math: same('$\\frac{1}{10}\\cdot\\frac{3}{10}\\cdot\\frac{3}{10}=\\frac{9}{1000}$') },
            { text: say('Batekorik ez: hiru aldiz «ez batekoa».', 'Ningún as: tres veces «no as».', 'لا آس: ثلاث مرات «ليس آسًا».'), math: same('$\\left(\\frac{9}{10}\\right)^{3}=\\frac{729}{1000}$') }
        ],
        example: same('$1-\\left(\\frac{1}{2}\\right)^{5}=\\frac{31}{32}$'),
        takeaway: say('Independenteak: biderkatu. «Gutxienez bat» = 1 − «bat ere ez».', 'Independientes: multiplica. «Al menos uno» = 1 − «ninguno».', 'مستقلة: اضرب. «واحد على الأقل» = 1 − «لا شيء».'),
        figure: (language) => <ReplacementFigure language={language} />
    },
    {
        id: 'dependent',
        stage: 'compound',
        title: say('Mendeko esperientziak', 'Experiencias dependientes', 'التجارب التابعة'),
        goal: say('Itzuli gabeko ateratzeen probabilitateak kalkulatzea, bigarrena lehenengoaren araberakoa denean.', 'Calcular probabilidades de extracciones sin devolución, en las que la segunda depende de la primera.', 'حساب احتمالات السحب دون إرجاع، حيث تتعلّق الثانية بالأولى.'),
        explanation: say(
            'Bola edo karta bat ateratzean itzultzen ez bada, hurrengo ateratzea bat gutxiagorekin egiten da, eta haren probabilitatea aurretik atera denaren araberakoa da: esperientziak mendekoak dira. $P(B/A)$ idazten da, «$A$ gertatu dela jakinda, $B$-ren probabilitatea», eta biak gertatzeko probabilitatea $P(A\\cap B)=P(A)\\cdot P(B/A)$ da. Hiru ateratzerekin berdin: faktore bakoitza geratzen denarekin kalkulatzen da. Adibidez, 40 kartako sorta batetik errege bat eta gero batekoa ateratzea: $\\frac{4}{40}\\cdot\\frac{4}{39}$. Itzuli beharrean emaitzaren arabera kutxa aldatzen bada (bikoitia: A kutxa; bakoitia: B kutxa), esperientziak mendekoak dira halaber.',
            'Si al sacar una bola o una carta no se devuelve, la siguiente extracción se hace con una menos y su probabilidad depende de lo que salió antes: las experiencias son dependientes. Se escribe $P(B/A)$, «probabilidad de $B$ supuesto que ha ocurrido $A$», y la probabilidad de que ocurran las dos es $P(A\\cap B)=P(A)\\cdot P(B/A)$. Con tres extracciones se sigue igual: cada factor se calcula con lo que queda. Por ejemplo, sacar un rey y después un as de una baraja de 40: $\\frac{4}{40}\\cdot\\frac{4}{39}$. Si en lugar de devolver se cambia de urna según el resultado (par: urna A; impar: urna B), las experiencias también son dependientes.',
            'إذا لم تُعَد الكرة أو الورقة بعد سحبها، فالسحبة التالية تتم بعدد أقل ويتعلّق احتمالها بما خرج قبلها: التجارب تابعة. نكتب $P(B/A)$ «احتمال $B$ علمًا أن $A$ وقع»، واحتمال وقوع الاثنين هو $P(A\\cap B)=P(A)\\cdot P(B/A)$. ومع ثلاث سحبات نتابع بالطريقة نفسها: يُحسب كل عامل بما بقي. مثلًا، سحب ملك ثم آس من مجموعة 40 ورقة: $\\frac{4}{40}\\cdot\\frac{4}{39}$. وإذا تغيّرت الجرّة حسب النتيجة بدل الإرجاع (زوجي: الجرّة A، فردي: الجرّة B) فالتجارب تابعة أيضًا.'
        ),
        problem: say('Kutxa batean 5 bola beltz eta 3 zuri daude. Hiru bola ateratzen ditugu, itzuli gabe. Zein da hirurak zuriak izateko probabilitatea? Eta beltzak?', 'Una urna contiene 5 bolas negras y 3 blancas. Extraemos tres bolas sin devolverlas. ¿Cuál es la probabilidad de que las tres sean blancas? ¿Y negras?', 'في جرّة 5 كرات سوداء و3 بيضاء. نسحب ثلاث كرات دون إرجاع. ما احتمال أن تكون الثلاث بيضاء؟ وسوداء؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zuriak: aldi bakoitzean zuri bat eta bola bat gutxiago.', 'Blancas: cada vez una blanca y una bola menos.', 'البيضاء: كل مرة بيضاء أقل وكرة أقل.'), math: same('$\\frac{3}{8}\\cdot\\frac{2}{7}\\cdot\\frac{1}{6}=\\frac{6}{336}$') },
            { text: say('Sinplifikatu.', 'Simplifica.', 'اختصر.'), math: same('$\\frac{6}{336}=\\frac{1}{56}$') },
            { text: say('Beltzak, berdin.', 'Negras, igual.', 'السوداء بالطريقة نفسها.'), math: same('$\\frac{5}{8}\\cdot\\frac{4}{7}\\cdot\\frac{3}{6}=\\frac{60}{336}=\\frac{5}{28}$') }
        ],
        example: same('$\\frac{4}{40}\\cdot\\frac{4}{39}=\\frac{2}{195}$'),
        takeaway: say('Itzuli gabe: izendatzailea jaitsi egiten da, eta faktore bakoitza aurrekoaren araberakoa da.', 'Sin devolver: el denominador baja y cada factor depende de lo anterior.', 'دون إرجاع: ينقص المقام ويتعلّق كل عامل بما قبله.'),
        figure: (language) => <UrnDrawsFigure language={language} />
    },
    {
        id: 'trees',
        stage: 'compound',
        title: say('Zuhaitz-diagramak', 'Diagramas de árbol', 'المخططات الشجرية'),
        goal: say('Esperientzia konposatu bat zuhaitz batean antolatzea eta gertaera baten bideak batzea.', 'Organizar una experiencia compuesta en un árbol y sumar los caminos de un suceso.', 'تنظيم تجربة مركّبة في شجرة وجمع مسارات حدث.'),
        explanation: say(
            'Zuhaitz-diagrama batean, adar bakoitzak bere probabilitatea darama, eta puntu beretik ateratzen diren adarrak batuta 1 dira. Bide oso baten probabilitatea bere adarren probabilitateen biderkadura da. Gertaera batera bide batetik baino gehiagotatik irits daiteke (adibidez, «kolore bakoitzeko bola bat»: gorria eta berdea, edo berdea eta gorria); haren probabilitatea bide horien probabilitateen batura da. Bide guztiak batuta 1 dira, eta hori egiaztapen gisa balio du. «Gutxienez bola gorri bat» bezalako galderetan, sarritan laburragoa da aurkakoa kalkulatzea eta 1etik kentzea.',
            'En un diagrama de árbol, cada rama lleva su probabilidad, y las ramas que salen de un mismo punto suman 1. La probabilidad de un camino completo es el producto de las probabilidades de sus ramas. A un suceso se puede llegar por varios caminos (por ejemplo, «una bola de cada color»: roja y verde, o verde y roja); su probabilidad es la suma de las de esos caminos. Todos los caminos juntos suman 1, lo que sirve de comprobación. En preguntas del tipo «al menos una roja», a menudo es más corto calcular el contrario y restarlo de 1.',
            'في المخطط الشجري يحمل كل فرع احتماله، ومجموع الفروع الخارجة من النقطة نفسها 1. واحتمال مسار كامل هو حاصل ضرب احتمالات فروعه. وقد نصل إلى حدث عبر عدة مسارات (مثلًا «كرة من كل لون»: حمراء ثم خضراء أو خضراء ثم حمراء)، فيكون احتماله مجموع احتمالات تلك المسارات. ومجموع كل المسارات 1، وهذا يفيد في التحقق. وفي أسئلة مثل «كرة حمراء واحدة على الأقل» يكون حساب المعاكس وطرحه من 1 أقصر غالبًا.'
        ),
        problem: say('Kutxa batean 3 bola gorri eta 2 berde daude. Bi ateratzen ditugu, itzuli gabe. Kalkulatu bi gorri ateratzeko probabilitatea eta kolore bakoitzeko bat ateratzekoa.', 'Una urna tiene 3 bolas rojas y 2 verdes. Sacamos dos sin devolver. Calcula la probabilidad de sacar dos rojas y la de sacar una de cada color.', 'في جرّة 3 كرات حمراء وكرتان خضراوان. نسحب كرتين دون إرجاع. احسب احتمال سحب حمراوين واحتمال سحب واحدة من كل لون.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Bi gorri: bide bakarra.', 'Dos rojas: un solo camino.', 'حمراوان: مسار واحد.'), math: same('$\\frac{3}{5}\\cdot\\frac{2}{4}=\\frac{6}{20}=\\frac{3}{10}$') },
            { text: say('Kolore bakoitzeko bat: bi bide.', 'Una de cada color: dos caminos.', 'واحدة من كل لون: مساران.'), math: same('$\\frac{3}{5}\\cdot\\frac{2}{4}+\\frac{2}{5}\\cdot\\frac{3}{4}=\\frac{12}{20}$') },
            { text: say('Sinplifikatu eta egiaztatu bi berdeekin.', 'Simplifica y comprueba con las dos verdes.', 'اختصر وتحقّق بالخضراوين.'), math: same('$\\frac{12}{20}=\\frac{3}{5}\\qquad\\frac{3}{10}+\\frac{3}{5}+\\frac{1}{10}=1$') }
        ],
        example: same('$1-\\frac{2}{5}\\cdot\\frac{1}{4}=\\frac{9}{10}$'),
        takeaway: say('Bide batean, biderkatu; bideen artean, batu. Zuhaitz osoa batuta 1.', 'Por un camino, multiplica; entre caminos, suma. Todo el árbol suma 1.', 'في المسار اضرب، وبين المسارات اجمع. ومجموع الشجرة كلها 1.'),
        figure: (language) => <TwoDrawTreeFigure language={language} />
    },

    /* ---------- 4. Conditional probability ---------- */
    {
        id: 'contingency',
        stage: 'conditional',
        title: say('Kontingentzia-taulak', 'Tablas de contingencia', 'جداول التوافق'),
        goal: say('Sarrera bikoitzeko taula bat osatzea eta haren probabilitate soilak eta ebakidurakoak irakurtzea.', 'Completar una tabla de doble entrada y leer en ella probabilidades simples y de intersección.', 'إكمال جدول ذي مدخلين وقراءة الاحتمالات البسيطة واحتمالات التقاطع فيه.'),
        explanation: say(
            'Kontingentzia-taula batek populazio bat bi ezaugarriren arabera sailkatzen du aldi berean: adibidez, maila (DBH edo Batxilergoa) eta jantokia erabiltzen duen ala ez. Gelaxka bakoitzak bi ezaugarriak dituzten pertsonak zenbatzen ditu, eta guztizkoen errenkadak eta zutabeak gelaxkak batzen dituzte. Osatzeko, batura horiek erabiltzen dira: guztizko bat eta gelaxka bat ezagutzen badituzu, beste gelaxka kendura da. Pertsona bat zoriz aukeratuta, Laplaceren erregelak ematen ditu probabilitateak: guztizko bat zati guztizko nagusia probabilitate soila da; gelaxka bat zati guztizko nagusia, bi ezaugarrien ebakiduraren probabilitatea. Batzuetan taula ehunekotan dator: orduan guztizko nagusia 100 da.',
            'Una tabla de contingencia clasifica una población según dos características a la vez: por ejemplo, el curso (ESO o Bachillerato) y si usa o no el comedor. Cada casilla cuenta las personas que tienen las dos características, y la fila y la columna de totales suman las casillas. Para completarla se usan esas sumas: si conoces un total y una casilla, la otra casilla es la diferencia. Eligiendo a una persona al azar, la regla de Laplace da las probabilidades: un total entre el total general es una probabilidad simple; una casilla entre el total general, la probabilidad de la intersección de las dos características. A veces la tabla viene en porcentajes: entonces el total general es 100.',
            'يصنّف جدول التوافق مجتمعًا حسب خاصيتين معًا: مثلًا المرحلة (الإعدادي أو البكالوريا) واستعمال المطعم أو عدمه. تعدّ كل خانة الأشخاص الذين لهم الخاصيتان، ويجمع سطر المجاميع وعمودها الخانات. ولإكماله نستعمل هذه المجاميع: إذا عرفت مجموعًا وخانة فالخانة الأخرى هي الفرق. وعند اختيار شخص عشوائيًا تعطي قاعدة لابلاس الاحتمالات: مجموع على المجموع العام احتمال بسيط، وخانة على المجموع العام احتمال تقاطع الخاصيتين. وأحيانًا يأتي الجدول بالنسب المئوية فيكون المجموع العام 100.'
        ),
        problem: say('Ikastetxe batean 1000 ikasle daude: 600 DBHkoak eta 400 Batxilergokoak. Jantokia DBHko 240k eta Batxilergoko 100ek erabiltzen dute. Osatu taula eta kalkulatu zoriz aukeratutako ikasle batek jantokia erabiltzeko probabilitatea, eta DBHkoa izan eta jantokia ez erabiltzekoa.', 'En un centro hay 1000 estudiantes: 600 de ESO y 400 de Bachillerato. Usan el comedor 240 de ESO y 100 de Bachillerato. Completa la tabla y calcula la probabilidad de que un estudiante elegido al azar use el comedor, y la de que sea de ESO y no lo use.', 'في مدرسة 1000 طالب: 600 في الإعدادي و400 في البكالوريا. يستعمل المطعم 240 من الإعدادي و100 من البكالوريا. أكمل الجدول واحسب احتمال أن يستعمل طالب مختار عشوائيًا المطعم، واحتمال أن يكون من الإعدادي ولا يستعمله.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Osatu: jantokiaren guztizkoa, $240+100=340$, eta jantokirik gabeko DBHkoak.', 'Completa: el total del comedor, $240+100=340$, y los de ESO sin comedor.', 'أكمل: مجموع المطعم $240+100=340$، وطلاب الإعدادي دون مطعم.'), math: same('$600-240=360$') },
            { text: say('Probabilitate soila.', 'Probabilidad simple.', 'احتمال بسيط.'), math: same('$\\frac{340}{1000}=0{,}34$') },
            { text: say('Ebakidura: gelaxka bat.', 'Intersección: una casilla.', 'التقاطع: خانة واحدة.'), math: same('$\\frac{360}{1000}=0{,}36$') }
        ],
        example: same('$\\frac{60}{100}=0{,}6$'),
        takeaway: say('Guztizkoa zati guztizko nagusia: soila. Gelaxka zati guztizko nagusia: ebakidura.', 'Total entre total general: simple. Casilla entre total general: intersección.', 'مجموع على المجموع العام: بسيط. خانة على المجموع العام: تقاطع.'),
        figure: (language) => <ContingencyTableFigure language={language} />
    },
    {
        id: 'conditional',
        stage: 'conditional',
        title: say('Probabilitate baldintzatua', 'Probabilidad condicionada', 'الاحتمال المشروط'),
        goal: say('$P(A/B)$ taula batean eta formularekin kalkulatzea, eta bi gertaera independenteak diren erabakitzea.', 'Calcular $P(A/B)$ en una tabla y con la fórmula, y decidir si dos sucesos son independientes.', 'حساب $P(A/B)$ في جدول وبالصيغة، وتقرير ما إذا كان حدثان مستقلين.'),
        explanation: say(
            '$B$-ren baldintzapean $A$-ren probabilitatea, $P(A/B)$, $B$ gertatu dela jakinda $A$-k duen probabilitatea da. $B$ jakiteak lagin-espazioa murrizten du: kasu posibleak $B$-renak bakarrik dira. Taula batean, $B$-ren errenkada edo zutabea bakarrik begiratzen da: $P(A/B)$ gelaxka komuna zati $B$-ren guztizkoa da. Oro har, $P(A/B)=\\frac{P(A\\cap B)}{P(B)}$, hau da, biderkaduraren erregela bera askatuta: $P(A\\cap B)=P(B)\\cdot P(A/B)$. Kontuz: $P(A/B)$ eta $P(B/A)$ desberdinak dira, kasu posibleak aldatzen direlako. Bi gertaera independenteak dira bata jakiteak bestearen probabilitatea aldatzen ez badu: $P(A/B)=P(A)$, edo gauza bera dena, $P(A\\cap B)=P(A)\\cdot P(B)$.',
            'La probabilidad de $A$ condicionada a $B$, $P(A/B)$, es la probabilidad de $A$ cuando ya se sabe que ha ocurrido $B$. Saber $B$ reduce el espacio muestral: los casos posibles son solo los de $B$. En una tabla se mira solo la fila o la columna de $B$: $P(A/B)$ es la casilla común entre el total de $B$. En general, $P(A/B)=\\frac{P(A\\cap B)}{P(B)}$, que es la misma regla del producto despejada: $P(A\\cap B)=P(B)\\cdot P(A/B)$. Ojo: $P(A/B)$ y $P(B/A)$ son distintas, porque cambian los casos posibles. Dos sucesos son independientes si saber uno no cambia la probabilidad del otro: $P(A/B)=P(A)$, o lo que es lo mismo, $P(A\\cap B)=P(A)\\cdot P(B)$.',
            'احتمال $A$ المشروط بـ$B$، أي $P(A/B)$، هو احتمال $A$ عندما نعلم أن $B$ قد وقع. ومعرفة $B$ تقلّص فضاء العيّنة: الحالات الممكنة هي حالات $B$ فقط. في الجدول ننظر فقط إلى سطر $B$ أو عموده: $P(A/B)$ هو الخانة المشتركة على مجموع $B$. وعمومًا $P(A/B)=\\frac{P(A\\cap B)}{P(B)}$، وهي قاعدة الضرب نفسها بعد عزل الحد: $P(A\\cap B)=P(B)\\cdot P(A/B)$. انتبه: $P(A/B)$ و$P(B/A)$ مختلفان لأن الحالات الممكنة تتغيّر. ويكون الحدثان مستقلين إذا لم تغيّر معرفة أحدهما احتمال الآخر: $P(A/B)=P(A)$، أي $P(A\\cap B)=P(A)\\cdot P(B)$.'
        ),
        problem: say('100 pertsonari egindako inkesta batean: 60 gizon (40 maskotarekin) eta 40 emakume (25 maskotarekin). $A$ = «maskota du» eta $M$ = «emakumea». Kalkulatu $P(A/M)$ eta $P(M/A)$. $A$ eta $M$ independenteak dira?', 'En una encuesta a 100 personas: 60 hombres (40 con mascota) y 40 mujeres (25 con mascota). Sean $A$ = «tiene mascota» y $M$ = «mujer». Calcula $P(A/M)$ y $P(M/A)$. ¿Son $A$ y $M$ independientes?', 'في استطلاع لـ100 شخص: 60 رجلًا (40 منهم مع حيوان أليف) و40 امرأة (25 منهن مع حيوان أليف). ليكن $A$ = «لديه حيوان أليف» و$M$ = «امرأة». احسب $P(A/M)$ و$P(M/A)$. هل $A$ و$M$ مستقلان؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Emakumea dela jakinda: 40 emakumeak bakarrik.', 'Sabiendo que es mujer: solo las 40 mujeres.', 'علمًا أنها امرأة: النساء الأربعون فقط.'), math: same('$P(A/M)=\\frac{25}{40}=0{,}625$') },
            { text: say('Maskota duela jakinda: maskota duten 65ak.', 'Sabiendo que tiene mascota: las 65 con mascota.', 'علمًا أن لديه حيوانًا أليفًا: الـ65 أصحاب الحيوانات.'), math: same('$P(M/A)=\\frac{25}{65}=\\frac{5}{13}$') },
            { text: say('Konparatu $P(A)$-rekin: ez dira independenteak.', 'Compara con $P(A)$: no son independientes.', 'قارن بـ$P(A)$: ليسا مستقلين.'), math: same('$P(A)=\\frac{65}{100}=0{,}65$') }
        ],
        example: same('$\\frac{P(A\\cap B)}{P(B)}=\\frac{0{,}12}{0{,}3}=0{,}4$'),
        takeaway: say('Baldintzatua: kasu posibleak baldintzarenak bakarrik dira.', 'Condicionada: los casos posibles son solo los de la condición.', 'المشروط: الحالات الممكنة هي حالات الشرط فقط.'),
        figure: (language) => <ConditionalFigure language={language} />
    },
    {
        id: 'total',
        stage: 'conditional',
        title: say('Probabilitate osoa', 'Probabilidad total', 'الاحتمال الكلي'),
        goal: say('Zuhaitz bateko bide batzuetatik iristen den azken emaitza baten probabilitatea kalkulatzea, eta atzerantz arrazoitzea.', 'Calcular la probabilidad de un resultado final al que se llega por varios caminos de un árbol, y razonar hacia atrás.', 'حساب احتمال نتيجة نهائية نصل إليها عبر عدة مسارات في شجرة، والاستدلال إلى الوراء.'),
        explanation: say(
            'Bi etapako esperientzia askotan, lehenengoak erabakitzen du bigarrena nolakoa den: dado batek kutxa aukeratzen du, gaurko eguraldiak biharkoaren probabilitatea aldatzen du, bola bat kutxa batetik bestera pasatzen da. Azken emaitza baten probabilitatea kalkulatzeko, zuhaitza marrazten da: lehen etapan, kasu bakoitzaren probabilitateak; bigarrenean, kasu horren baldintzapeko probabilitateak. Emaitzaren probabilitatea harengan amaitzen diren bide guztien batura da: probabilitate osoa. Gero atzerantz galdetzen bada (gorria atera da; zein kutxatatik zetorren?), baldintzatua erabiltzen da: kutxa horren bidea zati probabilitate osoa.',
            'En muchas experiencias de dos etapas, la primera decide cómo es la segunda: un dado elige la urna, el tiempo de hoy cambia la probabilidad del de mañana, una bola pasa de una urna a otra. Para calcular la probabilidad de un resultado final se dibuja el árbol: en la primera etapa, las probabilidades de cada caso; en la segunda, las probabilidades condicionadas a ese caso. La probabilidad del resultado es la suma de todos los caminos que terminan en él: es la probabilidad total. Si después se pregunta hacia atrás (ha salido roja; ¿de qué urna venía?), se usa la condicionada: el camino de esa urna entre la probabilidad total.',
            'في تجارب كثيرة ذات مرحلتين تحدّد الأولى شكل الثانية: نرد يختار الجرّة، وطقس اليوم يغيّر احتمال طقس الغد، وكرة تنتقل من جرّة إلى أخرى. ولحساب احتمال نتيجة نهائية نرسم الشجرة: في المرحلة الأولى احتمالات كل حالة، وفي الثانية الاحتمالات المشروطة بتلك الحالة. واحتمال النتيجة هو مجموع كل المسارات المنتهية بها: هذا هو الاحتمال الكلي. وإذا سُئلنا بعد ذلك إلى الوراء (خرجت كرة حمراء، فمن أي جرّة جاءت؟) نستعمل الاحتمال المشروط: مسار تلك الجرّة على الاحتمال الكلي.'
        ),
        problem: say('Dado bat botatzen dugu. 1 edo 2 ateratzen bada, I kutxatik bola bat ateratzen dugu (2 gorri eta 3 urdin); bestela, II kutxatik (4 gorri eta 1 urdin). Kalkulatu gorria ateratzeko probabilitatea. Gorria atera bada, zein da I kutxatik etortzeko probabilitatea?', 'Lanzamos un dado. Si sale 1 o 2, sacamos una bola de la urna I (2 rojas y 3 azules); si no, de la urna II (4 rojas y 1 azul). Calcula la probabilidad de sacar roja. Si ha salido roja, ¿cuál es la probabilidad de que viniera de la urna I?', 'نرمي نردًا. إذا ظهر 1 أو 2 نسحب كرة من الجرّة I (حمراوان و3 زرقاء)، وإلا فمن الجرّة II (4 حمراء وواحدة زرقاء). احسب احتمال سحب كرة حمراء. وإذا خرجت حمراء، فما احتمال أن تكون من الجرّة I؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Lehen etapa: kutxa.', 'Primera etapa: la urna.', 'المرحلة الأولى: الجرّة.'), math: same('$P(\\text{I})=\\frac{2}{6}\\qquad P(\\text{II})=\\frac{4}{6}$') },
            { text: say('Batu gorrian amaitzen diren bi bideak.', 'Suma los dos caminos que acaban en roja.', 'اجمع المسارين المنتهيين بالحمراء.'), math: same('$\\frac{2}{6}\\cdot\\frac{2}{5}+\\frac{4}{6}\\cdot\\frac{4}{5}=\\frac{20}{30}=\\frac{2}{3}$') },
            { text: say('Atzerantz: I kutxaren bidea zati guztizkoa.', 'Hacia atrás: el camino de la urna I entre el total.', 'إلى الوراء: مسار الجرّة I على الكلي.'), math: same('$\\frac{4}{30}:\\frac{20}{30}=\\frac{1}{5}$') }
        ],
        example: same('$\\frac{3}{4}\\cdot\\frac{1}{2}+\\frac{1}{4}\\cdot 0=\\frac{3}{8}$'),
        takeaway: say('Probabilitate osoa: batu emaitzara daramaten bide guztiak.', 'Probabilidad total: suma todos los caminos que llevan al resultado.', 'الاحتمال الكلي: اجمع كل المسارات المؤدية إلى النتيجة.'),
        figure: (language) => <TotalTreeFigure language={language} />
    },

    /* ---------- 5. Counting and deciding ---------- */
    {
        id: 'with-combinations',
        stage: 'counting',
        title: say('Konbinatoria eta Laplaceren erregela', 'Combinatoria y regla de Laplace', 'التوافيق وقاعدة لابلاس'),
        goal: say('Aldeko kasuak eta kasu posibleak aldakuntzekin eta konbinazioekin zenbatzea.', 'Contar casos favorables y posibles con variaciones y combinaciones.', 'عدّ الحالات الملائمة والممكنة بالتراتيب والتوافيق.'),
        explanation: say(
            'Kasuak idazteko gehiegi direnean, konbinatoriak zenbatzen ditu. Hainbat karta edo bola batera ateratzen badira, ordenak ez du axola: kasu posibleak konbinazioak dira, eta aldekoak ere bai. 40 kartako sorta batetik hiru urre ateratzeko: $P=\\frac{\\text{C}_{10,3}}{\\text{C}_{40,3}}$. Emaitza itzuli gabeko ateratze jarraituen bera da, $\\frac{10}{40}\\cdot\\frac{9}{39}\\cdot\\frac{8}{38}$: gauza bera zenbatzeko bi era dira. Ordenak axola badu (ilaran esertzea, zenbakiak osatzea), aldakuntzak edo permutazioak erabiltzen dira, goian zein behean. Garrantzitsuena aldekoak eta posibleak irizpide berarekin zenbatzea da. Loteria Primitiban, 49tik 6 zenbakirekin, sari nagusiaren probabilitatea $\\frac{1}{\\text{C}_{49,6}}=\\frac{1}{13\\,983\\,816}$ da.',
            'Cuando los casos son demasiados para escribirlos, la combinatoria los cuenta. Si se sacan varias cartas o bolas a la vez, el orden no importa: los casos posibles son combinaciones, y los favorables también. Para tres oros de una baraja de 40: $P=\\frac{\\text{C}_{10,3}}{\\text{C}_{40,3}}$. El resultado coincide con el de las extracciones sucesivas sin devolución, $\\frac{10}{40}\\cdot\\frac{9}{39}\\cdot\\frac{8}{38}$: son dos formas de contar lo mismo. Si el orden importa (sentarse en fila, formar números), se usan variaciones o permutaciones, tanto arriba como abajo. Lo importante es contar los favorables y los posibles con el mismo criterio. En la Lotería Primitiva, con 6 números de 49, la probabilidad del premio mayor es $\\frac{1}{\\text{C}_{49,6}}=\\frac{1}{13\\,983\\,816}$.',
            'عندما تكثر الحالات عن الكتابة يعدّها التحليل التوافقي. وإذا سُحبت عدة أوراق أو كرات معًا فالترتيب لا يهم: الحالات الممكنة توافيق، وكذلك الملائمة. ولسحب ثلاث أوراق ذهب من مجموعة 40: $P=\\frac{\\text{C}_{10,3}}{\\text{C}_{40,3}}$. وتطابق النتيجة نتيجة السحبات المتتالية دون إرجاع $\\frac{10}{40}\\cdot\\frac{9}{39}\\cdot\\frac{8}{38}$: طريقتان لعدّ الشيء نفسه. وإذا كان الترتيب مهمًا (الجلوس في صف، تكوين أعداد) نستعمل التراتيب أو التباديل في البسط والمقام. والمهم أن نعدّ الملائمة والممكنة بالمعيار نفسه. وفي اليانصيب البدائي، بـ6 أعداد من 49، احتمال الجائزة الكبرى $\\frac{1}{\\text{C}_{49,6}}=\\frac{1}{13\\,983\\,816}$.'
        ),
        problem: say('40 kartako sorta batetik 3 karta ateratzen dira batera. Kalkulatu bi eratara hirurak urreak izateko probabilitatea (10 urre daude).', 'Se sacan 3 cartas a la vez de una baraja de 40. Calcula de dos formas la probabilidad de que las tres sean oros (hay 10 oros).', 'تُسحب 3 أوراق معًا من مجموعة 40 ورقة. احسب بطريقتين احتمال أن تكون الثلاث من الذهب (هناك 10 أوراق ذهب).'),
        stepsKind: 'steps',
        steps: [
            { text: say('Kasu posibleak eta aldekoak.', 'Casos posibles y favorables.', 'الحالات الممكنة والملائمة.'), math: same('$\\text{C}_{40,3}=9\\,880\\qquad\\text{C}_{10,3}=120$') },
            { text: say('Laplace.', 'Laplace.', 'لابلاس.'), math: same('$\\frac{120}{9\\,880}=\\frac{3}{247}$') },
            { text: say('Biderkadurarekin, itzuli gabe.', 'Con el producto, sin devolver.', 'بالضرب دون إرجاع.'), math: same('$\\frac{10}{40}\\cdot\\frac{9}{39}\\cdot\\frac{8}{38}=\\frac{720}{59\\,280}=\\frac{3}{247}$') }
        ],
        example: same('$\\frac{1}{\\text{C}_{49,6}}=\\frac{1}{13\\,983\\,816}$'),
        takeaway: say('Aldekoak eta posibleak, berdin zenbatuta: konbinazioak ordenak axola ez badu.', 'Favorables y posibles, contados igual: combinaciones si el orden no importa.', 'الملائمة والممكنة تُعدّ بالطريقة نفسها: توافيق إذا لم يهم الترتيب.'),
        figure: (language) => <CombinationsDeckFigure language={language} />
    },
    {
        id: 'several-dice',
        stage: 'counting',
        title: say('Hainbat dado', 'Varios dados', 'عدة نرود'),
        goal: say('Hainbat daduren kasuak arretaz zenbatzea, ordenak kontuan hartuta.', 'Contar con cuidado los casos de varios dados, teniendo en cuenta los órdenes.', 'عدّ حالات عدة نرود بعناية مع مراعاة الترتيبات.'),
        explanation: say(
            'Hainbat dado botatzean, kasu ekiprobableak puntuazioen zerrenda ordenatuak dira: hiru dadorekin $6^{3}=216$ daude. Gertaera bat ordenarik gabe deskribatzen bada (handiena, erdikoa, batura), zenbat zerrenda dagozkion zenbatu behar da: hiru puntuazio desberdin $3!=6$ eratara ordena daitezke, bi berdin eta bat desberdin 3 eratara, eta hiru berdin era bakarrean. Beste teknika erabilgarri bat «mailak» dira: «handiena gehienez 4» gertaerak $4^{3}$ kasu ditu; beraz, «handiena justu 4» gertaerak $4^{3}-3^{3}$. Eta «denak desberdinak» zuzenean zenbatzen da aldakuntzekin: $6\\cdot 5\\cdot 4=120$.',
            'Al lanzar varios dados, los casos equiprobables son las listas ordenadas de puntuaciones: con tres dados hay $6^{3}=216$. Si un suceso se describe sin orden (el mayor, el mediano, la suma), hay que contar cuántas listas le corresponden: tres puntuaciones distintas se pueden ordenar de $3!=6$ formas, dos iguales y una distinta de 3 formas, y tres iguales de una sola. Otra técnica útil son los «escalones»: «el mayor es como mucho 4» tiene $4^{3}$ casos, así que «el mayor es exactamente 4» tiene $4^{3}-3^{3}$. Y «todas distintas» se cuenta directamente con variaciones: $6\\cdot 5\\cdot 4=120$.',
            'عند رمي عدة نرود تكون الحالات المتساوية الاحتمال هي القوائم المرتّبة للنتائج: مع ثلاثة نرود هناك $6^{3}=216$. وإذا وُصف حدث دون ترتيب (الأكبر، الأوسط، المجموع) وجب عدّ القوائم الموافقة له: ثلاث نتائج مختلفة تُرتّب بـ$3!=6$ طرق، واثنتان متساويتان وثالثة مختلفة بـ3 طرق، وثلاث متساوية بطريقة واحدة. وتقنية مفيدة أخرى هي «الدرجات»: «الأكبر على الأكثر 4» له $4^{3}$ حالة، إذن «الأكبر 4 تمامًا» له $4^{3}-3^{3}$. أما «كلها مختلفة» فتُعدّ مباشرة بالتراتيب: $6\\cdot 5\\cdot 4=120$.'
        ),
        problem: say('Hiru dado botatzen ditugu. Kalkulatu puntuazio handiena 4 izateko probabilitatea eta hiru puntuazioak desberdinak izatekoa.', 'Lanzamos tres dados. Calcula la probabilidad de que la mayor puntuación sea 4 y la de que las tres puntuaciones sean distintas.', 'نرمي ثلاثة نرود. احسب احتمال أن تكون أكبر نتيجة 4، واحتمال أن تكون النتائج الثلاث مختلفة.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Kasu posibleak.', 'Casos posibles.', 'الحالات الممكنة.'), math: same('$6^{3}=216$') },
            { text: say('Handiena 4: 4 artekoak ken 3 artekoak.', 'Mayor 4: hasta 4 menos hasta 3.', 'الأكبر 4: حتى 4 ناقص حتى 3.'), math: same('$\\frac{4^{3}-3^{3}}{216}=\\frac{37}{216}$') },
            { text: say('Denak desberdinak: aldakuntzak.', 'Todas distintas: variaciones.', 'كلها مختلفة: تراتيب.'), math: same('$\\frac{6\\cdot 5\\cdot 4}{216}=\\frac{120}{216}=\\frac{5}{9}$') }
        ],
        example: same('$\\frac{6}{216}=\\frac{1}{36}$'),
        takeaway: say('Hainbat dadorekin, zerrenda ordenatuak zenbatzen dira: 6 ordena desberdinak badira, 3 bi berdin badaude.', 'Con varios dados cuentan las listas ordenadas: 6 órdenes si son distintas, 3 si hay dos iguales.', 'مع عدة نرود تُعدّ القوائم المرتّبة: 6 ترتيبات إذا كانت مختلفة، و3 إذا تساوت اثنتان.'),
        figure: (language) => <MaxDiceFigure language={language} />
    },
    {
        id: 'fair-games',
        stage: 'counting',
        title: say('Itxaropena eta joko bidezkoak', 'Esperanza y juegos equitativos', 'الأمل الرياضي والألعاب العادلة'),
        goal: say('Joko baten irabazi itxaropena kalkulatzea eta bidezkoa den erabakitzea.', 'Calcular la ganancia esperada de un juego y decidir si es equitativo.', 'حساب الربح المتوقع للعبة وتقرير ما إذا كانت عادلة.'),
        explanation: say(
            'Zorizko joko batean, emaitza bakoitzak irabazi bat du (positiboa irabazten baduzu, negatiboa galtzen baduzu). Itxaropena, edo epe luzerako batez besteko irabazia, irabazi $g$ bakoitza bider bere probabilitatea $p$ batzea da: $g_1\\cdot p_1+g_2\\cdot p_2+\\dots$. Itxaropena 0 bada, jokoa bidezkoa (ekitatiboa) da: epe luzera, ez da irabazten ez galtzen. Negatiboa bada, jokoak antolatzailearen alde egiten du: hala gertatzen da loteria eta zozketetan, bildutakoaren zati bat ez baita sarietan banatzen. Joko bat bidezko egiteko, sari edo prezio bat doitzen da itxaropena 0 izan arte.',
            'En un juego de azar, cada resultado tiene una ganancia (positiva si ganas, negativa si pierdes). La esperanza, o ganancia media a la larga, es la suma de cada ganancia $g$ por su probabilidad $p$: $g_1\\cdot p_1+g_2\\cdot p_2+\\dots$. Si la esperanza es 0, el juego es equitativo: a la larga, ni se gana ni se pierde. Si es negativa, el juego favorece a quien lo organiza: así ocurre en las loterías y rifas, donde parte de lo recaudado no se reparte en premios. Para hacer equitativo un juego, se ajusta un premio o un precio hasta que la esperanza sea 0.',
            'في لعبة حظ لكل نتيجة ربح (موجب إذا ربحت وسالب إذا خسرت). والأمل الرياضي، أي متوسط الربح على المدى الطويل، هو مجموع كل ربح $g$ مضروبًا في احتماله $p$: $g_1\\cdot p_1+g_2\\cdot p_2+\\dots$. إذا كان الأمل 0 فاللعبة عادلة: على المدى الطويل لا ربح ولا خسارة. وإذا كان سالبًا فاللعبة لصالح من ينظّمها: هكذا في اليانصيب والسحوبات، حيث لا يُوزَّع جزء من المال المجموع جوائز. ولجعل لعبة عادلة نعدّل جائزة أو سعرًا حتى يصبح الأمل 0.'
        ),
        problem: say('Dado bat botatzen da: 1 edo 2 ateratzen bada 6 € irabazten dituzu, eta beste zenbaki bat ateratzen bada 3 € galtzen dituzu. Jokoa bidezkoa da? Eta 9 € irabaziko bazenitu?', 'Se lanza un dado: si sale 1 o 2 ganas 6 €, y si sale otro número pierdes 3 €. ¿Es equitativo el juego? ¿Y si ganaras 9 €?', 'يُرمى نرد: إذا ظهر 1 أو 2 تربح 6 €، وإذا ظهر عدد آخر تخسر 3 €. هل اللعبة عادلة؟ وماذا لو ربحت 9 €؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Probabilitateak: irabazi 2/6, galdu 4/6.', 'Probabilidades: ganar 2/6, perder 4/6.', 'الاحتمالات: الربح 2/6 والخسارة 4/6.'), math: same('$\\frac{2}{6}+\\frac{4}{6}=1$') },
            { text: say('Itxaropena: 0, bidezkoa.', 'Esperanza: 0, equitativo.', 'الأمل: 0، عادلة.'), math: same('$6\\cdot\\frac{2}{6}-3\\cdot\\frac{4}{6}=2-2=0$') },
            { text: say('9 €-rekin, jokalariaren alde.', 'Con 9 €, favorable al jugador.', 'مع 9 € لصالح اللاعب.'), math: same('$9\\cdot\\frac{2}{6}-3\\cdot\\frac{4}{6}=3-2=1$') }
        ],
        example: same('$800\\cdot\\frac{1}{1000}-1=-0{,}2$'),
        takeaway: say('Itxaropena = irabazia bider probabilitatea, batuta. Bidezkoa: itxaropena 0.', 'Esperanza = suma de ganancia por probabilidad. Equitativo: esperanza 0.', 'الأمل = مجموع الربح في الاحتمال. عادلة: الأمل 0.'),
        figure: (language) => <FairGameFigure language={language} />
    }
]

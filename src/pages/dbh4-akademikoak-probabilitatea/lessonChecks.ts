import type { LessonCheck, LessonMistake, LocalizedText } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Probabilitatea · 4. DBH akademikoak — the typical mistake and the «Check
   it» question of every lesson. Plain data (no JSX) so the tests can
   import it; lessons.tsx merges it into the topics.
   ========================================================================== */

export type ProbabilityAkTopicId = 'experiments' | 'operations' | 'compatible' | 'frequency' | 'laplace' | 'properties' | 'independent' | 'dependent' | 'trees' | 'contingency' | 'conditional' | 'total' | 'with-combinations' | 'several-dice' | 'fair-games'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const probabilityAkLessonChecks: Record<ProbabilityAkTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    experiments: {
        mistake: {
            wrong: say('Bi txanpon botatzean, emaitzak «bi aurpegi», «bi gurutze» eta «bana» dira: berdin probableko 3 gertaera.', 'Al lanzar dos monedas, los resultados son «dos caras», «dos cruces» y «una de cada»: 3 sucesos equiprobables.', 'عند رمي قطعتين نقديتين النتائج «وجهان» و«كتابتان» و«واحدة من كل»: 3 أحداث متساوية الاحتمال.', 'Tossing two coins, the outcomes are «two heads», «two tails» and «one of each»: 3 equally likely events.'),
            right: say('«Bana» bi emaitza dira, C+ eta +C: 4 daude, eta «bana» gertaerak $\\frac{2}{4}$ probabilitatea du.', '«Una de cada» son dos resultados, C+ y +C: hay 4, y «una de cada» tiene probabilidad $\\frac{2}{4}$.', '«واحدة من كل» نتيجتان C+ و+C: هناك 4، واحتمال «واحدة من كل» $\\frac{2}{4}$.', '«One of each» is two outcomes, C+ and +C: there are 4, and «one of each» has probability $\\frac{2}{4}$.')
        },
        check: {
            prompt: say('Zenbat gertaera elemental ditu bi dado botatzeko esperimentuak?', '¿Cuántos sucesos elementales tiene el experimento de lanzar dos dados?', 'كم حدثًا بسيطًا لتجربة رمي نردين؟', 'How many elementary events does throwing two dice have?'),
            options: [same('$36$'), same('$12$'), same('$11$')],
            correctIndex: 0,
            explanation: same('$6\\cdot 6=36$')
        }
    },
    operations: {
        mistake: {
            wrong: say('Dado batean, «4 baino gehiago ateratzea» gertaeraren aurkakoa «4 baino gutxiago ateratzea» da.', 'En un dado, el contrario de «sacar más de 4» es «sacar menos de 4».', 'في النرد معاكس «ظهور أكثر من 4» هو «ظهور أقل من 4».', 'On a dice, the complement of «getting more than 4» is «getting less than 4».'),
            right: say('4 falta da: aurkakoa «4 edo gutxiago ateratzea» da, $\\{1,2,3,4\\}$.', 'Falta el 4: el contrario es «sacar 4 o menos», $\\{1,2,3,4\\}$.', 'ينقص 4: المعاكس «ظهور 4 أو أقل»، $\\{1,2,3,4\\}$.', '4 is missing: the complement is «getting 4 or less», $\\{1,2,3,4\\}$.')
        },
        check: {
            prompt: say('Dado batean, $A=\\{1,2,3\\}$ eta $B=\\{2,4,6\\}$. Zein da $A\\cap B$?', 'En un dado, $A=\\{1,2,3\\}$ y $B=\\{2,4,6\\}$. ¿Cuál es $A\\cap B$?', 'في النرد $A=\\{1,2,3\\}$ و$B=\\{2,4,6\\}$. ما $A\\cap B$؟', 'On a dice, $A=\\{1,2,3\\}$ and $B=\\{2,4,6\\}$. What is $A\\cap B$?'),
            options: [same('$\\{1,2,3,4,6\\}$'), same('$\\{2\\}$'), same('$\\varnothing$')],
            correctIndex: 1,
            explanation: say('2 bakarrik dago bietan.', 'Solo el 2 está en los dos.', 'العدد 2 وحده في الاثنين.', 'Only 2 is in both.')
        }
    },
    compatible: {
        mistake: {
            wrong: say('Bi gertaera bateraezinak badira, aurkakoak dira.', 'Si dos sucesos son incompatibles, son contrarios.', 'إذا كان حدثان متنافيين فهما متعاكسان.', 'If two events are mutually exclusive, they are complements.'),
            right: say('Dado batean, «1 ateratzea» eta «2 ateratzea» bateraezinak dira, baina ez aurkakoak: 5 bat atera daiteke.', 'En un dado, «sacar 1» y «sacar 2» son incompatibles, pero no contrarios: puede salir un 5.', 'في النرد «ظهور 1» و«ظهور 2» متنافيان لكنهما ليسا متعاكسين: قد يظهر 5.', 'On a dice, «getting 1» and «getting 2» are mutually exclusive, but not complements: a 5 can come up.')
        },
        check: {
            prompt: say('Karta-sorta espainiar batetik karta bat ateratzen da. Zein gertaera-bikote da bateraezina?', 'Se saca una carta de una baraja española. ¿Qué par de sucesos es incompatible?', 'تُسحب ورقة من رزمة إسبانية. أي زوج من الأحداث متنافٍ؟', 'A card is drawn from a Spanish pack. Which pair of events is mutually exclusive?'),
            options: [say('«Urreak» eta «errege»', '«Oros» y «rey»', '«الذهب» و«الملك»', '«Coins» and «king»'), say('«Batekoa» eta «irudia»', '«As» y «figura»', '«الآس» و«صورة»', '«Ace» and «face card»'), say('«Kopak» eta «batekoa»', '«Copas» y «as»', '«الكؤوس» و«الآس»', '«Cups» and «ace»')],
            correctIndex: 1,
            explanation: say('Ez dago aldi berean batekoa eta irudia den kartarik: $A\\cap B=\\varnothing$.', 'Ninguna carta es as y figura a la vez: $A\\cap B=\\varnothing$.', 'لا ورقة هي آس وصورة معًا: $A\\cap B=\\varnothing$.', 'No card is both an ace and a face card: $A\\cap B=\\varnothing$.')
        }
    },
    frequency: {
        mistake: {
            wrong: say('Txanpon batek 5 aldiz jarraian aurpegia eman badu, hurrengoan probableagoa da gurutzea ateratzea.', 'Si una moneda ha salido cara 5 veces seguidas, es más probable que la próxima salga cruz.', 'إذا ظهر الوجه 5 مرات متتالية فالأرجح أن تظهر الكتابة في المرة التالية.', 'If a coin has come up heads 5 times in a row, tails is more likely next.'),
            right: say('Txanponak ez du memoriarik: $\\frac{1}{2}$ izaten jarraitzen du. Maiztasuna jaurtiketa askorekin egonkortzen da, ez konpentsatuz.', 'La moneda no tiene memoria: sigue siendo $\\frac{1}{2}$. La frecuencia se estabiliza con muchas tiradas, no compensando.', 'القطعة النقدية لا ذاكرة لها: يبقى الاحتمال $\\frac{1}{2}$. والتكرار يستقر مع رميات كثيرة لا بالتعويض.', 'The coin has no memory: it is still $\\frac{1}{2}$. The frequency settles with many tosses, not by making up.')
        },
        check: {
            prompt: say('Gertaera bat 45 aldiz gertatu da 300 errepikapenetan. Zein da haren maiztasun erlatiboa?', 'Un suceso ha ocurrido 45 veces en 300 repeticiones. ¿Cuál es su frecuencia relativa?', 'وقع حدث 45 مرة في 300 تكرار. ما تكراره النسبي؟', 'An event has happened 45 times in 300 repetitions. What is its relative frequency?'),
            options: [same('$45$'), same('$0{,}45$'), same('$0{,}15$')],
            correctIndex: 2,
            explanation: same('$\\frac{45}{300}=0{,}15$')
        }
    },
    laplace: {
        mistake: {
            wrong: say('3 bola gorri eta 5 urdin dituen poltsa batetik gorria ateratzeko probabilitatea $\\frac{3}{5}$ da.', 'La probabilidad de sacar roja de una bolsa con 3 bolas rojas y 5 azules es $\\frac{3}{5}$.', 'احتمال سحب كرة حمراء من كيس فيه 3 حمراء و5 زرقاء هو $\\frac{3}{5}$.', 'The probability of drawing red from a bag with 3 red and 5 blue balls is $\\frac{3}{5}$.'),
            right: say('Kasu posibleak bola guztiak dira, $3+5=8$: $\\frac{3}{8}$.', 'Los casos posibles son todas las bolas, $3+5=8$: $\\frac{3}{8}$.', 'الحالات الممكنة كل الكرات $3+5=8$: $\\frac{3}{8}$.', 'The possible cases are all the balls, $3+5=8$: $\\frac{3}{8}$.')
        },
        check: {
            prompt: say('Dado bat botatzean, zein da zenbaki lehen bat ateratzeko probabilitatea?', '¿Cuál es la probabilidad de sacar un número primo al lanzar un dado?', 'ما احتمال ظهور عدد أولي عند رمي نرد؟', 'What is the probability of getting a prime number when a dice is thrown?'),
            options: [same('$\\frac{1}{2}$'), same('$\\frac{2}{3}$'), same('$\\frac{1}{3}$')],
            correctIndex: 0,
            explanation: say('Lehenak: 2, 3 eta 5, seitik hiru.', 'Primos: 2, 3 y 5, tres de seis.', 'الأعداد الأولية: 2 و3 و5، ثلاثة من ستة.', 'Primes: 2, 3 and 5, three out of six.')
        }
    },
    properties: {
        mistake: {
            wrong: say('$P(A)=0{,}6$ eta $P(B)=0{,}5$ badira, orduan $P(A\\cup B)=1{,}1$.', 'Si $P(A)=0{,}6$ y $P(B)=0{,}5$, entonces $P(A\\cup B)=1{,}1$.', 'إذا كان $P(A)=0{,}6$ و$P(B)=0{,}5$ فإن $P(A\\cup B)=1{,}1$.', 'If $P(A)=0{,}6$ and $P(B)=0{,}5$, then $P(A\\cup B)=1{,}1$.'),
            right: say('Probabilitate batek ez du 1 gainditzen: bateragarriak dira, eta $P(A\\cap B)$ kendu behar da.', 'Una probabilidad no pasa de 1: son compatibles y hay que restar $P(A\\cap B)$.', 'الاحتمال لا يتجاوز 1: هما متوافقان ويجب طرح $P(A\\cap B)$.', 'A probability cannot go above 1: they are compatible and $P(A\\cap B)$ must be subtracted.')
        },
        check: {
            prompt: say('$P(\\overline{A})=0{,}35$ bada, zenbat da $P(A)$?', 'Si $P(\\overline{A})=0{,}35$, ¿cuánto vale $P(A)$?', 'إذا كان $P(\\overline{A})=0{,}35$ فما قيمة $P(A)$؟', 'If $P(\\overline{A})=0{,}35$, what is $P(A)$?'),
            options: [same('$0{,}35$'), same('$0{,}65$'), same('$1{,}35$')],
            correctIndex: 1,
            explanation: same('$1-0{,}35=0{,}65$')
        }
    },
    independent: {
        mistake: {
            wrong: say('Itzulita, 40 kartatik bi bateko ateratzeko probabilitatea $\\frac{4}{40}+\\frac{4}{40}$ da.', 'Con devolución, la probabilidad de sacar dos ases de 40 cartas es $\\frac{4}{40}+\\frac{4}{40}$.', 'مع الإرجاع، احتمال سحب آسين من 40 ورقة هو $\\frac{4}{40}+\\frac{4}{40}$.', 'With replacement, the probability of drawing two aces from 40 cards is $\\frac{4}{40}+\\frac{4}{40}$.'),
            right: say('Bi gauzak batera: biderkatu egiten da, $\\frac{4}{40}\\cdot\\frac{4}{40}=\\frac{1}{100}$.', 'Las dos cosas a la vez: se multiplica, $\\frac{4}{40}\\cdot\\frac{4}{40}=\\frac{1}{100}$.', 'الأمران معًا: نضرب، $\\frac{4}{40}\\cdot\\frac{4}{40}=\\frac{1}{100}$.', 'Both things at once: multiply, $\\frac{4}{40}\\cdot\\frac{4}{40}=\\frac{1}{100}$.')
        },
        check: {
            prompt: say('Txanpon bat eta dado bat botatzen dira. Zein da aurpegia eta 6 ateratzeko probabilitatea?', 'Se lanzan una moneda y un dado. ¿Cuál es la probabilidad de cara y 6?', 'تُرمى قطعة نقدية ونرد. ما احتمال الوجه و6؟', 'A coin and a dice are thrown. What is the probability of heads and 6?'),
            options: [same('$\\frac{1}{12}$'), same('$\\frac{2}{3}$'), same('$\\frac{1}{8}$')],
            correctIndex: 0,
            explanation: same('$\\frac{1}{2}\\cdot\\frac{1}{6}=\\frac{1}{12}$')
        }
    },
    dependent: {
        mistake: {
            wrong: say('Itzuli gabe, 2 zuri eta 3 beltz dituen kutxa batetik bi zuri ateratzeko probabilitatea $\\frac{2}{5}\\cdot\\frac{2}{5}$ da.', 'Sin devolución, la probabilidad de sacar dos blancas de una urna con 2 blancas y 3 negras es $\\frac{2}{5}\\cdot\\frac{2}{5}$.', 'دون إرجاع، احتمال سحب كرتين بيضاوين من جرّة فيها 2 بيضاء و3 سوداء هو $\\frac{2}{5}\\cdot\\frac{2}{5}$.', 'Without replacement, the probability of drawing two whites from an urn with 2 white and 3 black is $\\frac{2}{5}\\cdot\\frac{2}{5}$.'),
            right: say('Lehen zuriaren ondoren, zuri 1 eta 4 bola geratzen dira: $\\frac{2}{5}\\cdot\\frac{1}{4}=\\frac{1}{10}$.', 'Tras la primera blanca quedan 1 blanca y 4 bolas: $\\frac{2}{5}\\cdot\\frac{1}{4}=\\frac{1}{10}$.', 'بعد البيضاء الأولى تبقى بيضاء واحدة و4 كرات: $\\frac{2}{5}\\cdot\\frac{1}{4}=\\frac{1}{10}$.', 'After the first white, 1 white and 4 balls are left: $\\frac{2}{5}\\cdot\\frac{1}{4}=\\frac{1}{10}$.')
        },
        check: {
            prompt: say('Poltsa batek 4 bola gorri eta 2 berde ditu. Bi ateratzen dira, itzuli gabe. Zein da bi berde ateratzeko probabilitatea?', 'Una bolsa tiene 4 bolas rojas y 2 verdes. Se sacan dos sin devolución. ¿Cuál es la probabilidad de sacar dos verdes?', 'كيس فيه 4 كرات حمراء و2 خضراء. تُسحب كرتان دون إرجاع. ما احتمال سحب خضراوين؟', 'A bag has 4 red balls and 2 green. Two are drawn without replacement. What is the probability of two greens?'),
            options: [same('$\\frac{1}{9}$'), same('$\\frac{1}{15}$'), same('$\\frac{1}{3}$')],
            correctIndex: 1,
            explanation: same('$\\frac{2}{6}\\cdot\\frac{1}{5}=\\frac{1}{15}$')
        }
    },
    trees: {
        mistake: {
            wrong: say('Zuhaitz batean, bide baten probabilitatea bere adarren batura da.', 'En un árbol, la probabilidad de un camino es la suma de sus ramas.', 'في الشجرة احتمال المسار مجموع فروعه.', 'In a tree, the probability of a path is the sum of its branches.'),
            right: say('Bide bateko adarrak biderkatu egiten dira; gertaera berera daramaten bide desberdinak batu.', 'Las ramas de un camino se multiplican; se suman los caminos distintos que llevan al mismo suceso.', 'فروع المسار تُضرب، وتُجمع المسارات المختلفة المؤدية إلى الحدث نفسه.', 'The branches of a path are multiplied; the different paths leading to the same event are added.')
        },
        check: {
            prompt: say('Zuhaitz batean, puntu batetik bi adar ateratzen dira. Batek 0,3 probabilitatea badu, zenbat du besteak?', 'En un árbol, de un punto salen dos ramas. Si una tiene probabilidad 0,3, ¿cuánto vale la otra?', 'في شجرة يخرج فرعان من نقطة. إذا كان احتمال أحدهما 0.3 فما احتمال الآخر؟', 'In a tree, two branches leave a point. If one has probability 0.3, what is the other?'),
            options: [same('$0{,}3$'), same('$0{,}7$'), same('$1{,}3$')],
            correctIndex: 1,
            explanation: same('$1-0{,}3=0{,}7$')
        }
    },
    contingency: {
        mistake: {
            wrong: say('Lauki baten probabilitatea lortzeko, bere errenkadaren guztirakoaz zatitzen da.', 'Para la probabilidad de una casilla se divide entre el total de su fila.', 'لاحتمال خانة نقسم على مجموع صفها.', 'For the probability of a cell, divide by the total of its row.'),
            right: say('Hori baldintzapeko probabilitate bat da; laukiarena (ebakidura bat) guztira orokorraz zatitzen da.', 'Eso es una probabilidad condicionada; la de la casilla (una intersección) se divide entre el total general.', 'ذلك احتمال مشروط؛ أما احتمال الخانة (تقاطع) فنقسم فيه على المجموع الكلي.', 'That is a conditional probability; the cell\'s (an intersection) is divided by the grand total.')
        },
        check: {
            prompt: say('Taula batean, 150 pertsonatik 30 ezkertiak dira eta betaurrekoak dituzte. Zein da «ezkertia eta betaurrekoduna» gertaeraren probabilitatea?', 'En una tabla, 30 de 150 personas son zurdas y llevan gafas. ¿Cuál es la probabilidad de «zurda y con gafas»?', 'في جدول، 30 من 150 شخصًا عُسر ويلبسون نظارات. ما احتمال «أعسر ويلبس نظارات»؟', 'In a table, 30 of 150 people are left-handed and wear glasses. What is the probability of «left-handed and with glasses»?'),
            options: [same('$5$'), same('$0{,}3$'), same('$0{,}2$')],
            correctIndex: 2,
            explanation: same('$\\frac{30}{150}=0{,}2$')
        }
    },
    conditional: {
        mistake: {
            wrong: say('$P(A/B)$ eta $P(B/A)$ gauza bera dira.', '$P(A/B)$ y $P(B/A)$ son lo mismo.', '$P(A/B)$ و$P(B/A)$ الشيء نفسه.', '$P(A/B)$ and $P(B/A)$ are the same.'),
            right: say('Gauza desberdinez zatitzen da: $\\frac{P(A\\cap B)}{P(B)}$ eta $\\frac{P(A\\cap B)}{P(A)}$. $P(A)=P(B)$ denean bakarrik dira berdinak.', 'Se divide entre cosas distintas: $\\frac{P(A\\cap B)}{P(B)}$ y $\\frac{P(A\\cap B)}{P(A)}$. Solo coinciden si $P(A)=P(B)$.', 'نقسم على أشياء مختلفة: $\\frac{P(A\\cap B)}{P(B)}$ و$\\frac{P(A\\cap B)}{P(A)}$. ولا يتساويان إلا إذا كان $P(A)=P(B)$.', 'You divide by different things: $\\frac{P(A\\cap B)}{P(B)}$ and $\\frac{P(A\\cap B)}{P(A)}$. They only match if $P(A)=P(B)$.')
        },
        check: {
            prompt: say('50 ikasletik 20 xakean aritzen dira, eta haietatik 8 neskak dira. Xake-jokalari bat zoriz aukeratzen bada, zein da neska izateko probabilitatea?', 'De 50 alumnos, 20 juegan al ajedrez, y 8 de ellos son chicas. Si se elige al azar un jugador de ajedrez, ¿cuál es la probabilidad de que sea chica?', 'من 50 تلميذًا يلعب 20 الشطرنج، منهم 8 فتيات. إذا اختير لاعب شطرنج عشوائيًا فما احتمال أن يكون فتاة؟', 'Of 50 pupils, 20 play chess, and 8 of them are girls. If a chess player is chosen at random, what is the probability that it is a girl?'),
            options: [same('$0{,}4$'), same('$0{,}16$'), same('$0{,}8$')],
            correctIndex: 0,
            explanation: same('$\\frac{8}{20}=0{,}4$')
        }
    },
    total: {
        mistake: {
            wrong: say('Bi kutxatako bat zoriz aukeratzen bada, bola gorrien $\\frac{1}{2}$ eta $\\frac{1}{4}$ dituztela, gorria ateratzeko probabilitatea $\\frac{1}{2}+\\frac{1}{4}$ da.', 'Si se elige al azar una de dos urnas, con $\\frac{1}{2}$ y $\\frac{1}{4}$ de bolas rojas, la probabilidad de roja es $\\frac{1}{2}+\\frac{1}{4}$.', 'إذا اختيرت إحدى جرّتين عشوائيًا، نسبة الحمراء فيهما $\\frac{1}{2}$ و$\\frac{1}{4}$، فاحتمال الحمراء $\\frac{1}{2}+\\frac{1}{4}$.', 'If one of two urns is chosen at random, with $\\frac{1}{2}$ and $\\frac{1}{4}$ red balls, the probability of red is $\\frac{1}{2}+\\frac{1}{4}$.'),
            right: say('Bide bakoitza bere kutxaren probabilitateaz biderkatzen da: $\\frac{1}{2}\\cdot\\frac{1}{2}+\\frac{1}{2}\\cdot\\frac{1}{4}=\\frac{3}{8}$.', 'Cada camino se multiplica por la probabilidad de su urna: $\\frac{1}{2}\\cdot\\frac{1}{2}+\\frac{1}{2}\\cdot\\frac{1}{4}=\\frac{3}{8}$.', 'كل مسار يُضرب في احتمال جرّته: $\\frac{1}{2}\\cdot\\frac{1}{2}+\\frac{1}{2}\\cdot\\frac{1}{4}=\\frac{3}{8}$.', 'Each path is multiplied by the probability of its urn: $\\frac{1}{2}\\cdot\\frac{1}{2}+\\frac{1}{2}\\cdot\\frac{1}{4}=\\frac{3}{8}$.')
        },
        check: {
            prompt: say('Piezen % 40 A makinatik dator (% 1 akastunekin) eta % 60 B makinatik (% 2 akastunekin). Zein da akastuna izateko probabilitatea?', 'El 40 % de las piezas viene de A (con un 1 % defectuosas) y el 60 % de B (con un 2 %). ¿Cuál es la probabilidad de que una sea defectuosa?', '40 % من القطع من A (منها 1 % معيبة) و60 % من B (منها 2 %). ما احتمال أن تكون قطعة معيبة؟', '40% of the parts come from A (1% faulty) and 60% from B (2%). What is the probability that a part is faulty?'),
            options: [same('$0{,}016$'), same('$0{,}03$'), same('$0{,}015$')],
            correctIndex: 0,
            explanation: same('$0{,}4\\cdot 0{,}01+0{,}6\\cdot 0{,}02=0{,}016$')
        }
    },
    'with-combinations': {
        mistake: {
            wrong: say('40 kartatik 2 batera ateratzean, kasu posibleak $40\\cdot 39$ dira, eta aldekoak konbinazioekin zenbatzen dira.', 'Al sacar 2 cartas a la vez de 40, los casos posibles son $40\\cdot 39$ y los favorables se cuentan con combinaciones.', 'عند سحب ورقتين معًا من 40 تكون الحالات الممكنة $40\\cdot 39$ والملائمة تُعدّ بالتوافيق.', 'Drawing 2 cards at once from 40, the possible cases are $40\\cdot 39$ and the favourable ones are counted with combinations.'),
            right: say('Biak berdin zenbatu behar dira: biak ordenarekin ($\\text{V}$) edo biak ordenarik gabe ($\\text{C}$).', 'Hay que contar los dos igual: o los dos con orden ($\\text{V}$) o los dos sin orden ($\\text{C}$).', 'يجب عدّ الاثنين بالطريقة نفسها: كلاهما بترتيب ($\\text{V}$) أو كلاهما دون ترتيب ($\\text{C}$).', 'Count both the same way: both with order ($\\text{V}$) or both without ($\\text{C}$).')
        },
        check: {
            prompt: say('6 bonbillatik 2 fundituta daude. 2 hartzen dira zoriz. Zein da biak funditutakoak izateko probabilitatea?', 'De 6 bombillas, 2 están fundidas. Se cogen 2 al azar. ¿Cuál es la probabilidad de que sean las dos fundidas?', 'من 6 مصابيح 2 تالفان. يؤخذ اثنان عشوائيًا. ما احتمال أن يكونا التالفين؟', 'Of 6 bulbs, 2 are blown. 2 are taken at random. What is the probability that they are the two blown ones?'),
            options: [same('$\\frac{1}{15}$'), same('$\\frac{1}{3}$'), same('$\\frac{1}{9}$')],
            correctIndex: 0,
            explanation: same('$\\frac{1}{\\text{C}_{6,2}}=\\frac{1}{15}$')
        }
    },
    'several-dice': {
        mistake: {
            wrong: say('Hiru dadorekin, gutxienez sei bat ateratzeko probabilitatea $3\\cdot\\frac{1}{6}=\\frac{1}{2}$ da.', 'Con tres dados, la probabilidad de al menos un seis es $3\\cdot\\frac{1}{6}=\\frac{1}{2}$.', 'مع ثلاثة نرود احتمال ستة واحدة على الأقل $3\\cdot\\frac{1}{6}=\\frac{1}{2}$.', 'With three dice, the probability of at least one six is $3\\cdot\\frac{1}{6}=\\frac{1}{2}$.'),
            right: say('Horrela, sei bat baino gehiago dituzten kasuak behin baino gehiagotan zenbatzen dira: hobe aurkakoa, $1-\\left(\\frac{5}{6}\\right)^{3}=\\frac{91}{216}$.', 'Así se cuentan varias veces los casos con más de un seis: mejor el contrario, $1-\\left(\\frac{5}{6}\\right)^{3}=\\frac{91}{216}$.', 'هكذا تُعدّ الحالات التي فيها أكثر من ستة عدة مرات: الأفضل المعاكس $1-\\left(\\frac{5}{6}\\right)^{3}=\\frac{91}{216}$.', 'That counts the cases with more than one six several times: better the complement, $1-\\left(\\frac{5}{6}\\right)^{3}=\\frac{91}{216}$.')
        },
        check: {
            prompt: say('Zein da bi dadotan zenbaki bera ateratzeko probabilitatea?', '¿Cuál es la probabilidad de sacar el mismo número en dos dados?', 'ما احتمال ظهور العدد نفسه في نردين؟', 'What is the probability of getting the same number on two dice?'),
            options: [same('$\\frac{1}{36}$'), same('$\\frac{1}{12}$'), same('$\\frac{1}{6}$')],
            correctIndex: 2,
            explanation: same('$\\frac{6}{36}=\\frac{1}{6}$')
        }
    },
    'fair-games': {
        mistake: {
            wrong: say('$\\frac{1}{5}$ probabilitatearekin 10 € irabazten dituzu, eta bestela 5 € galtzen: jokalariaren alde dago, 10 zenbakia 5 baino handiagoa delako.', 'Ganas 10 € con probabilidad $\\frac{1}{5}$ y pierdes 5 € si no: es favorable, porque 10 es más que 5.', 'تربح 10 € باحتمال $\\frac{1}{5}$ وتخسر 5 € في غير ذلك: اللعبة لصالحك لأن 10 أكبر من 5.', 'You win €10 with probability $\\frac{1}{5}$ and lose €5 otherwise: it is favourable, because 10 is more than 5.'),
            right: say('Probabilitateek ere kontatzen dute: $10\\cdot\\frac{1}{5}-5\\cdot\\frac{4}{5}=2-4=-2$; kontra dago.', 'Cuentan también las probabilidades: $10\\cdot\\frac{1}{5}-5\\cdot\\frac{4}{5}=2-4=-2$; es desfavorable.', 'الاحتمالات مهمة أيضًا: $10\\cdot\\frac{1}{5}-5\\cdot\\frac{4}{5}=2-4=-2$؛ ليست لصالحك.', 'The probabilities count too: $10\\cdot\\frac{1}{5}-5\\cdot\\frac{4}{5}=2-4=-2$; it is unfavourable.')
        },
        check: {
            prompt: say('1 € ordaintzen duzu jokatzeko, eta 5 € irabazten dituzu dado batean 6 bat ateratzen bada. Zein da itxaropena?', 'Pagas 1 € por jugar y ganas 5 € si sale un 6 en un dado. ¿Cuál es la esperanza?', 'تدفع 1 € لتلعب وتربح 5 € إذا ظهر 6 في النرد. ما الأمل الرياضي؟', 'You pay €1 to play and win €5 if a 6 comes up on a dice. What is the expected value?'),
            options: [same('$-\\frac{1}{6}$'), same('$\\frac{5}{6}$'), same('$0$')],
            correctIndex: 0,
            explanation: same('$5\\cdot\\frac{1}{6}-1=-\\frac{1}{6}$')
        }
    }
}

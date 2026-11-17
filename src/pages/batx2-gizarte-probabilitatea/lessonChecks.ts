import type { LessonCheck, LessonMistake, LocalizedText } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Probabilitatea · Batxilergoa 2 · Gizarte Zientziak — the typical mistake
   and the «Check it» question of every lesson. Plain data (no JSX) so the
   tests can import it; lessons.tsx merges it into the topics. The
   questions use new numbers, never those of «Let's solve» or of the
   example, and one of their wrong answers is the lesson's typical mistake.
   ========================================================================== */

export type ProbabilityBatx2gTopicId =
    | 'variations' | 'permutations' | 'combinations' | 'counting-laplace'
    | 'events' | 'frequency' | 'union' | 'two-events'
    | 'tables' | 'conditional' | 'independence' | 'trees'
    | 'total' | 'bayes' | 'screening'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const probabilityBatx2gLessonChecks: Record<ProbabilityBatx2gTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    /* ---------- 1. Learning to count ---------- */
    variations: {
        mistake: {
            wrong: say('9 pertsonatik ordezkaria eta ordezkariordea aukeratzeko, $C_{9,2}=36$ modu.', 'Para elegir delegado y subdelegado entre 9 personas, $C_{9,2}=36$ formas.', 'لاختيار مندوب ونائب مندوب من بين 9 أشخاص هناك $C_{9,2}=36$ طريقة.', 'To choose a delegate and a deputy among 9 people, $C_{9,2}=36$ ways.'),
            right: say('Kargu desberdinak dira, ordenak axola du: $V_{9,2}=9\\cdot 8=72$.', 'Son cargos distintos, el orden importa: $V_{9,2}=9\\cdot 8=72$.', 'إنهما منصبان مختلفان، فالترتيب مهم: $V_{9,2}=9\\cdot 8=72$.', 'They are different posts, so the order matters: $V_{9,2}=9\\cdot 8=72$.')
        },
        check: {
            prompt: say('Lehiaketa batean 8 finalista daude, eta urrezko, zilarrezko eta brontzezko dominak banatzen dira. Zenbat modutan?', 'Un concurso tiene 8 finalistas y reparte oro, plata y bronce. ¿De cuántas formas?', 'لمسابقة 8 متأهلين للنهائي، وتوزَّع ميداليات ذهبية وفضية وبرونزية. بكم طريقة؟', 'A contest has 8 finalists and gives gold, silver and bronze. In how many ways?'),
            options: [same('$56$'), same('$336$'), same('$512$')],
            correctIndex: 1,
            explanation: same('$V_{8,3}=8\\cdot 7\\cdot 6=336$')
        }
    },
    permutations: {
        mistake: {
            wrong: say('7 liburu apal batean ordenatzeko, $7^7$ modu.', 'Para ordenar 7 libros en una estantería, $7^7$ formas.', 'لترتيب 7 كتب على رف هناك $7^7$ طريقة.', 'To arrange 7 books on a shelf, $7^7$ ways.'),
            right: say('Liburu bat ezin da bi aldiz jarri: $P_7=7!=5040$.', 'Un libro no se puede poner dos veces: $P_7=7!=5040$.', 'لا يمكن وضع كتاب مرتين: $P_7=7!=5040$.', 'A book cannot be placed twice: $P_7=7!=5040$.')
        },
        check: {
            prompt: say('Publizitate-etenaldi batean 6 iragarki daude. Zenbat ordenatan eman daitezke?', 'En una pausa publicitaria hay 6 anuncios. ¿En cuántos órdenes se pueden emitir?', 'في فاصل إعلاني 6 إعلانات. بكم ترتيبًا يمكن بثّها؟', 'An advertising break has 6 adverts. In how many orders can they be shown?'),
            options: [same('$720$'), same('$36$'), same('$21$')],
            correctIndex: 0,
            explanation: same('$P_6=6!=720$')
        }
    },
    combinations: {
        mistake: {
            wrong: say('12 ikasletatik 2 ordezkari (kargurik gabe) aukeratzeko, $V_{12,2}=132$ modu.', 'Para elegir 2 representantes (sin cargos) entre 12 alumnos, $V_{12,2}=132$ formas.', 'لاختيار ممثلَين (دون مناصب) من 12 طالبًا هناك $V_{12,2}=132$ طريقة.', 'To choose 2 representatives (with no posts) among 12 students, $V_{12,2}=132$ ways.'),
            right: say('Ordenak ez du axola: $C_{12,2}=\\frac{132}{2}=66$.', 'El orden no importa: $C_{12,2}=\\frac{132}{2}=66$.', 'الترتيب لا يهم: $C_{12,2}=\\frac{132}{2}=66$.', 'The order does not matter: $C_{12,2}=\\frac{132}{2}=66$.')
        },
        check: {
            prompt: say('8 pertsonarekin, zenbat 4 pertsonako talde desberdin osa daitezke?', '¿Cuántos equipos distintos de 4 personas se pueden formar con 8?', 'كم فريقًا مختلفًا من 4 أشخاص يمكن تكوينه من 8؟', 'How many different teams of 4 people can be made from 8?'),
            options: [same('$1680$'), same('$32$'), same('$70$')],
            correctIndex: 2,
            explanation: same('$C_{8,4}=\\frac{8\\cdot 7\\cdot 6\\cdot 5}{24}=70$')
        }
    },
    'counting-laplace': {
        mistake: {
            wrong: say('8 hautagaitatik (4 gazte) 2 zozketatzen dira. $P=\\frac{V_{4,2}}{C_{8,2}}=\\frac{12}{28}$, bi gazte izateko.', 'Se sortean 2 de 8 candidatos (4 jóvenes). $P=\\frac{V_{4,2}}{C_{8,2}}=\\frac{12}{28}$ de que sean dos jóvenes.', 'تُجرى قرعة لاثنين من 8 مرشحين (4 شباب). $P=\\frac{V_{4,2}}{C_{8,2}}=\\frac{12}{28}$ لأن يكونا شابين.', '2 of 8 candidates (4 young) are drawn. $P=\\frac{V_{4,2}}{C_{8,2}}=\\frac{12}{28}$ that both are young.'),
            right: say('Biak irizpide berarekin, ordenarik gabe: $\\frac{C_{4,2}}{C_{8,2}}=\\frac{6}{28}=\\frac{3}{14}$.', 'Los dos con el mismo criterio, sin orden: $\\frac{C_{4,2}}{C_{8,2}}=\\frac{6}{28}=\\frac{3}{14}$.', 'كلاهما بالمعيار نفسه دون ترتيب: $\\frac{C_{4,2}}{C_{8,2}}=\\frac{6}{28}=\\frac{3}{14}$.', 'Both counted the same way, without order: $\\frac{C_{4,2}}{C_{8,2}}=\\frac{6}{28}=\\frac{3}{14}$.')
        },
        check: {
            prompt: say('Zozketa batean 1 eta 10 arteko bi zenbaki ateratzen dira, errepikatu gabe. Zure txartelak bi zenbaki ditu. Zein da biak asmatzeko probabilitatea?', 'En un sorteo salen dos números distintos entre el 1 y el 10. Tu boleto tiene dos números. ¿Qué probabilidad hay de acertar los dos?', 'في قرعة يُسحب عددان مختلفان بين 1 و10. في بطاقتك عددان. ما احتمال إصابة الاثنين؟', 'In a draw two different numbers between 1 and 10 come out. Your ticket has two numbers. What is the probability of getting both right?'),
            options: [same('$\\frac{1}{45}$'), same('$\\frac{1}{90}$'), same('$\\frac{1}{5}$')],
            correctIndex: 0,
            explanation: say('Bikote posible bakar bat da aldekoa: $\\frac{1}{C_{10,2}}=\\frac{1}{45}$.', 'Solo una de las parejas posibles es favorable: $\\frac{1}{C_{10,2}}=\\frac{1}{45}$.', 'زوج واحد فقط من الأزواج الممكنة ملائم: $\\frac{1}{C_{10,2}}=\\frac{1}{45}$.', 'Only one of the possible pairs is favourable: $\\frac{1}{C_{10,2}}=\\frac{1}{45}$.')
        }
    },

    /* ---------- 2. Events and Laplace ---------- */
    events: {
        mistake: {
            wrong: same('$\\overline{A\\cup B}=\\overline{A}\\cup\\overline{B}$'),
            right: say('De Morgan: $\\overline{A\\cup B}=\\overline{A}\\cap\\overline{B}$, ez $A$ ez $B$.', 'De Morgan: $\\overline{A\\cup B}=\\overline{A}\\cap\\overline{B}$, ni $A$ ni $B$.', 'دي مورغان: $\\overline{A\\cup B}=\\overline{A}\\cap\\overline{B}$، لا $A$ ولا $B$.', 'De Morgan: $\\overline{A\\cup B}=\\overline{A}\\cap\\overline{B}$, neither $A$ nor $B$.')
        },
        check: {
            prompt: say('$A$ = «autoa du» eta $B$ = «motoa du». Zer da $\\overline{A}\\cap\\overline{B}$?', '$A$ = «tiene coche» y $B$ = «tiene moto». ¿Qué es $\\overline{A}\\cap\\overline{B}$?', '$A$ = «لديه سيارة» و$B$ = «لديه دراجة نارية». ما $\\overline{A}\\cap\\overline{B}$؟', '$A$ = ‘has a car’ and $B$ = ‘has a motorbike’. What is $\\overline{A}\\cap\\overline{B}$?'),
            options: [
                say('Bietako bat bakarrik du', 'Tiene solo uno de los dos', 'لديه واحد فقط منهما', 'Has only one of the two'),
                say('Ez autorik ez motorik', 'Ni coche ni moto', 'لا سيارة ولا دراجة نارية', 'Neither a car nor a motorbike'),
                say('Ez ditu biak', 'No tiene los dos', 'ليس لديه الاثنان', 'Does not have both')
            ],
            correctIndex: 1,
            explanation: say('Ez $A$ eta ez $B$: ez du autorik eta ez du motorik. «Ez ditu biak» $\\overline{A}\\cup\\overline{B}$ da.', 'No $A$ y no $B$: no tiene coche y no tiene moto. «No tiene los dos» es $\\overline{A}\\cup\\overline{B}$.', 'ليس $A$ وليس $B$: ليس لديه سيارة وليس لديه دراجة. و«ليس لديه الاثنان» هو $\\overline{A}\\cup\\overline{B}$.', 'Not $A$ and not $B$: no car and no motorbike. ‘Does not have both’ is $\\overline{A}\\cup\\overline{B}$.')
        }
    },
    frequency: {
        mistake: {
            wrong: say('Txanpon bat 50 aldiz bota eta 30 aurpegi atera dira: aurpegiaren probabilitatea 0,6 da, ziur.', 'Al lanzar una moneda 50 veces han salido 30 caras: la probabilidad de cara es 0,6, seguro.', 'رُميت قطعة نقود 50 مرة فظهر الوجه 30 مرة: احتمال الوجه 0.6 بالتأكيد.', 'A coin was tossed 50 times and came up heads 30 times: the probability of heads is 0.6, for sure.'),
            right: say('0,6 estimazio bat da. Errepikapen askorekin, maiztasuna probabilitatera hurbiltzen da (txanpon on batean, 0,5).', '0,6 es una estimación. Con muchas repeticiones la frecuencia se acerca a la probabilidad (en una moneda buena, 0,5).', '0.6 مجرد تقدير. ومع تكرارات كثيرة يقترب التكرار من الاحتمال (في قطعة نقود سليمة 0.5).', '0.6 is an estimate. With many repetitions the frequency gets close to the probability (for a fair coin, 0.5).')
        },
        check: {
            prompt: say('Aplikazio batek erregistratu du 300 erabiltzaileetatik 72 erosketa egin dutela. Zein da erosteko probabilitatearen estimazioa?', 'Una aplicación registra que 72 de 300 usuarios compran. ¿Cuál es la estimación de la probabilidad de comprar?', 'يسجّل تطبيق أن 72 من 300 مستخدم يشترون. ما تقدير احتمال الشراء؟', 'An app records that 72 of 300 users buy. What is the estimate of the probability of buying?'),
            options: [same('$0{,}72$'), same('$0{,}3$'), same('$0{,}24$')],
            correctIndex: 2,
            explanation: same('$\\frac{72}{300}=0{,}24$')
        }
    },
    union: {
        mistake: {
            wrong: same('$P(A\\cup B)=P(A)+P(B)=0{,}7+0{,}5=1{,}2$'),
            right: say('Bateragarriak badira, ebakidura kendu behar da; probabilitate bat ez da inoiz 1 baino handiagoa.', 'Si son compatibles hay que restar la intersección; una probabilidad nunca pasa de 1.', 'إذا كانا متوافقين يجب طرح التقاطع؛ ولا يتجاوز الاحتمال 1 أبدًا.', 'If they are compatible the intersection has to be taken away; a probability is never more than 1.')
        },
        check: {
            prompt: say('$P(A)=0{,}6$, $P(B)=0{,}35$ eta $P(A\\cap B)=0{,}2$. Zenbat da $P(A\\cup B)$?', '$P(A)=0{,}6$, $P(B)=0{,}35$ y $P(A\\cap B)=0{,}2$. ¿Cuánto vale $P(A\\cup B)$?', '$P(A)=0{,}6$ و$P(B)=0{,}35$ و$P(A\\cap B)=0{,}2$. كم يساوي $P(A\\cup B)$؟', '$P(A)=0{,}6$, $P(B)=0{,}35$ and $P(A\\cap B)=0{,}2$. What is $P(A\\cup B)$?'),
            options: [same('$0{,}95$'), same('$0{,}75$'), same('$0{,}55$')],
            correctIndex: 1,
            explanation: same('$0{,}6+0{,}35-0{,}2=0{,}75$')
        }
    },
    'two-events': {
        mistake: {
            wrong: say('Beti $P(A\\cap\\overline{B})=P(A)\\cdot P(\\overline{B})$.', 'Siempre $P(A\\cap\\overline{B})=P(A)\\cdot P(\\overline{B})$.', 'دائمًا $P(A\\cap\\overline{B})=P(A)\\cdot P(\\overline{B})$.', 'Always $P(A\\cap\\overline{B})=P(A)\\cdot P(\\overline{B})$.'),
            right: say('Independenteak badira bakarrik. Oro har, $P(A\\cap\\overline{B})=P(A)-P(A\\cap B)$.', 'Solo si son independientes. En general, $P(A\\cap\\overline{B})=P(A)-P(A\\cap B)$.', 'فقط إذا كانا مستقلين. وعمومًا $P(A\\cap\\overline{B})=P(A)-P(A\\cap B)$.', 'Only if they are independent. In general, $P(A\\cap\\overline{B})=P(A)-P(A\\cap B)$.')
        },
        check: {
            prompt: say('$P(A\\cup B)=0{,}9$ eta $P(A\\cap B)=0{,}4$. Zein da bietako bat bakarrik gertatzeko probabilitatea?', '$P(A\\cup B)=0{,}9$ y $P(A\\cap B)=0{,}4$. ¿Qué probabilidad hay de que ocurra solo uno de los dos?', '$P(A\\cup B)=0{,}9$ و$P(A\\cap B)=0{,}4$. ما احتمال وقوع واحد فقط منهما؟', '$P(A\\cup B)=0{,}9$ and $P(A\\cap B)=0{,}4$. What is the probability that only one of the two happens?'),
            options: [same('$0{,}9$'), same('$0{,}5$'), same('$0{,}1$')],
            correctIndex: 1,
            explanation: same('$0{,}9-0{,}4=0{,}5$')
        }
    },

    /* ---------- 3. Tables and conditional probability ---------- */
    tables: {
        mistake: {
            wrong: say('Errenkada bat eta zutabe bat batzeak bildura ematen du: $120+90=210$ pertsona.', 'Sumar una fila y una columna da la unión: $120+90=210$ personas.', 'جمع صف وعمود يعطي الاتحاد: $120+90=210$ شخصًا.', 'Adding a row and a column gives the union: $120+90=210$ people.'),
            right: say('Lauki komuna bi aldiz zenbatzen da: $120+90-70=140$.', 'La casilla común se cuenta dos veces: $120+90-70=140$.', 'الخانة المشتركة تُحسب مرتين: $120+90-70=140$.', 'The shared cell is counted twice: $120+90-70=140$.')
        },
        check: {
            prompt: say('400 bezeroko taula batean, 100 dira online erosleak eta 30 urtetik beherakoak. Zein da bezero bat online eroslea eta 30 urtetik beherakoa izateko probabilitatea?', 'En una tabla de 400 clientes, 100 compran online y tienen menos de 30 años. ¿Qué probabilidad hay de que un cliente compre online y tenga menos de 30 años?', 'في جدول من 400 زبون، يشتري 100 عبر الإنترنت وأعمارهم أقل من 30 سنة. ما احتمال أن يشتري زبون عبر الإنترنت ويكون عمره أقل من 30 سنة؟', 'In a table of 400 customers, 100 buy online and are under 30. What is the probability that a customer buys online and is under 30?'),
            options: [same('$0{,}25$'), same('$0{,}5$'), same('$100$')],
            correctIndex: 0,
            explanation: say('Ebakidura bat da, guztizkoaren gainean: $\\frac{100}{400}=0{,}25$.', 'Es una intersección, sobre el total: $\\frac{100}{400}=0{,}25$.', 'إنه تقاطع على الكل: $\\frac{100}{400}=0{,}25$.', 'It is an intersection, over the total: $\\frac{100}{400}=0{,}25$.')
        }
    },
    conditional: {
        mistake: {
            wrong: say('$P(A/B)=\\frac{P(A\\cap B)}{P(A)}$', '$P(A/B)=\\frac{P(A\\cap B)}{P(A)}$', '$P(A/B)=\\frac{P(A\\cap B)}{P(A)}$', '$P(A/B)=\\frac{P(A\\cap B)}{P(A)}$'),
            right: say('Baldintzaz zatitzen da, barrapean dagoenaz: $P(A/B)=\\frac{P(A\\cap B)}{P(B)}$.', 'Se divide entre la condición, lo que va detrás de la barra: $P(A/B)=\\frac{P(A\\cap B)}{P(B)}$.', 'نقسم على الشرط، أي ما بعد الخط: $P(A/B)=\\frac{P(A\\cap B)}{P(B)}$.', 'You divide by the condition, what comes after the bar: $P(A/B)=\\frac{P(A\\cap B)}{P(B)}$.')
        },
        check: {
            prompt: say('Betaurrekoak dituzten 40 ikasletatik 10 ezkerrak dira. Ikasle batek betaurrekoak dituela jakinda, zein da ezkerra izateko probabilitatea?', 'De 40 alumnos con gafas, 10 son zurdos. Sabiendo que un alumno lleva gafas, ¿qué probabilidad hay de que sea zurdo?', 'من 40 طالبًا يلبسون نظارات، 10 يستعملون اليد اليسرى. مع العلم أن طالبًا يلبس نظارة، ما احتمال أن يكون أعسر؟', 'Of 40 students with glasses, 10 are left-handed. Knowing that a student wears glasses, what is the probability that they are left-handed?'),
            options: [same('$0{,}4$'), same('$0{,}1$'), same('$0{,}25$')],
            correctIndex: 2,
            explanation: say('Betaurrekodunak dira osoko berria: $\\frac{10}{40}=0{,}25$.', 'Los que llevan gafas son el nuevo total: $\\frac{10}{40}=0{,}25$.', 'لابسو النظارات هم الكل الجديد: $\\frac{10}{40}=0{,}25$.', 'Those who wear glasses are the new total: $\\frac{10}{40}=0{,}25$.')
        }
    },
    independence: {
        mistake: {
            wrong: say('Independenteak bateraezinak dira: $P(A\\cap B)=0$.', 'Independientes es lo mismo que incompatibles: $P(A\\cap B)=0$.', 'المستقلان متنافيان: $P(A\\cap B)=0$.', 'Independent means mutually exclusive: $P(A\\cap B)=0$.'),
            right: say('Independenteetan $P(A\\cap B)=P(A)\\cdot P(B)$, ez 0. Bateraezinak, batak bestea kentzen du: oso mendekoak dira.', 'En los independientes $P(A\\cap B)=P(A)\\cdot P(B)$, no 0. Si son incompatibles, uno excluye al otro: son muy dependientes.', 'في المستقلين $P(A\\cap B)=P(A)\\cdot P(B)$ لا 0. وإذا كانا متنافيين فأحدهما يمنع الآخر: إنهما تابعان جدًّا.', 'For independent events $P(A\\cap B)=P(A)\\cdot P(B)$, not 0. If they are mutually exclusive, one rules out the other: they are very dependent.')
        },
        check: {
            prompt: say('$A$ eta $B$ independenteak dira, $P(A)=0{,}3$ eta $P(B)=0{,}7$ izanik. Zenbat da $P(A\\cap B)$?', '$A$ y $B$ son independientes, con $P(A)=0{,}3$ y $P(B)=0{,}7$. ¿Cuánto vale $P(A\\cap B)$?', '$A$ و$B$ مستقلان، مع $P(A)=0{,}3$ و$P(B)=0{,}7$. كم يساوي $P(A\\cap B)$؟', '$A$ and $B$ are independent, with $P(A)=0{,}3$ and $P(B)=0{,}7$. What is $P(A\\cap B)$?'),
            options: [same('$0$'), same('$0{,}21$'), same('$1$')],
            correctIndex: 1,
            explanation: same('$0{,}3\\cdot 0{,}7=0{,}21$')
        }
    },
    trees: {
        mistake: {
            wrong: say('6 emakume eta 4 gizonetik, bi emakume aukeratzeko: $\\frac{6}{10}\\cdot\\frac{6}{10}$.', 'De 6 mujeres y 4 hombres, para elegir dos mujeres: $\\frac{6}{10}\\cdot\\frac{6}{10}$.', 'من 6 نساء و4 رجال، لاختيار امرأتين: $\\frac{6}{10}\\cdot\\frac{6}{10}$.', 'From 6 women and 4 men, to choose two women: $\\frac{6}{10}\\cdot\\frac{6}{10}$.'),
            right: say('Pertsona bera ezin da bi aldiz aukeratu: $\\frac{6}{10}\\cdot\\frac{5}{9}=\\frac{1}{3}$.', 'No se puede elegir dos veces a la misma persona: $\\frac{6}{10}\\cdot\\frac{5}{9}=\\frac{1}{3}$.', 'لا يمكن اختيار الشخص نفسه مرتين: $\\frac{6}{10}\\cdot\\frac{5}{9}=\\frac{1}{3}$.', 'The same person cannot be chosen twice: $\\frac{6}{10}\\cdot\\frac{5}{9}=\\frac{1}{3}$.')
        },
        check: {
            prompt: say('5 hautagaitatik 2 alderdi berekoak dira. Bi aukeratzen dira zoriz. Zein da alderdi horretako bat ere ez izateko probabilitatea?', 'De 5 candidatos, 2 son del mismo partido. Se eligen dos al azar. ¿Qué probabilidad hay de que ninguno sea de ese partido?', 'من 5 مرشحين، 2 من الحزب نفسه. يُختار اثنان عشوائيًّا. ما احتمال ألّا يكون أي منهما من ذلك الحزب؟', 'Of 5 candidates, 2 are from the same party. Two are chosen at random. What is the probability that neither is from that party?'),
            options: [same('$\\frac{3}{10}$'), same('$\\frac{9}{25}$'), same('$\\frac{2}{5}$')],
            correctIndex: 0,
            explanation: same('$\\frac{3}{5}\\cdot\\frac{2}{4}=\\frac{6}{20}=\\frac{3}{10}$')
        }
    },

    /* ---------- 4. Total probability and Bayes ---------- */
    total: {
        mistake: {
            wrong: say('Bezeroen % 80 eta % 20, kexak % 10 eta % 40: $P(Q)=\\frac{0{,}1+0{,}4}{2}=0{,}25$.', 'Clientes al 80 % y al 20 %, quejas del 10 % y del 40 %: $P(Q)=\\frac{0{,}1+0{,}4}{2}=0{,}25$.', 'زبائن بنسبة 80 % و20 %، وشكاوى بنسبة 10 % و40 %: $P(Q)=\\frac{0{,}1+0{,}4}{2}=0{,}25$.', 'Customers 80% and 20%, complaints 10% and 40%: $P(Q)=\\frac{0{,}1+0{,}4}{2}=0{,}25$.'),
            right: say('Talde bakoitzak bere pisua du: $P(Q)=0{,}8\\cdot 0{,}1+0{,}2\\cdot 0{,}4=0{,}16$.', 'Cada grupo pesa lo suyo: $P(Q)=0{,}8\\cdot 0{,}1+0{,}2\\cdot 0{,}4=0{,}16$.', 'لكل مجموعة وزنها: $P(Q)=0{,}8\\cdot 0{,}1+0{,}2\\cdot 0{,}4=0{,}16$.', 'Each group counts with its own weight: $P(Q)=0{,}8\\cdot 0{,}1+0{,}2\\cdot 0{,}4=0{,}16$.')
        },
        check: {
            prompt: say('Langileen % 70 autobusez doa eta % 30 autoz. Autobusekoen % 5 eta autokoen % 20 berandu iristen dira. Zein da langile bat berandu iristeko probabilitatea?', 'El 70 % de los trabajadores va en autobús y el 30 % en coche. Llegan tarde el 5 % de los del autobús y el 20 % de los del coche. ¿Qué probabilidad hay de que un trabajador llegue tarde?', '70 % من العمال يذهبون بالحافلة و30 % بالسيارة. يتأخر 5 % من ركاب الحافلة و20 % من أصحاب السيارات. ما احتمال أن يتأخر عامل؟', '70% of the workers go by bus and 30% by car. 5% of the bus users and 20% of the car users arrive late. What is the probability that a worker arrives late?'),
            options: [same('$0{,}125$'), same('$0{,}25$'), same('$0{,}095$')],
            correctIndex: 2,
            explanation: same('$0{,}7\\cdot 0{,}05+0{,}3\\cdot 0{,}2=0{,}035+0{,}06=0{,}095$')
        }
    },
    bayes: {
        mistake: {
            wrong: say('Kafe-makina batek kafeen % 10 gaizki ateratzen ditu. Kafe bat txarra atera bada, makina horretakoa izateko probabilitatea 0,1 da.', 'Una cafetera falla en el 10 % de los cafés. Si un café ha salido mal, la probabilidad de que sea de esa cafetera es 0,1.', 'تتعطّل آلة قهوة في 10 % من الأكواب. إذا خرج كوب سيئًا فاحتمال أن يكون من تلك الآلة 0.1.', 'A coffee machine fails in 10% of coffees. If a coffee comes out wrong, the probability that it is from that machine is 0.1.'),
            right: say('Hori $P(D/B)$ da, ez $P(B/D)$. Bayesek bide hori probabilitate osoaz zatitzen du.', 'Eso es $P(D/B)$, no $P(B/D)$. Bayes divide ese camino entre la probabilidad total.', 'ذلك $P(D/B)$ لا $P(B/D)$. ويقسم بايز ذلك المسار على الاحتمال الكلي.', 'That is $P(D/B)$, not $P(B/D)$. Bayes divides that path by the total probability.')
        },
        check: {
            prompt: say('Hautesleen % 40 landa-eremukoa da eta % 60 hirikoa. Landakoen artean % 30, eta hirikoen artean % 50, «bai» bozkatzen dute. Boto bat «bai» bada, zein da landakoa izateko probabilitatea?', 'El 40 % de los votantes es de zona rural y el 60 % urbana. Votan «sí» el 30 % de los rurales y el 50 % de los urbanos. Si un voto es «sí», ¿qué probabilidad hay de que sea rural?', '40 % من الناخبين من الريف و60 % من المدينة. يصوّت بـ«نعم» 30 % من الريفيين و50 % من سكان المدن. إذا كان صوت «نعم»، فما احتمال أن يكون ريفيًّا؟', '40% of the voters are rural and 60% urban. 30% of the rural and 50% of the urban voters vote ‘yes’. If a vote is ‘yes’, what is the probability that it is rural?'),
            options: [same('$\\frac{2}{7}$'), same('$0{,}3$'), same('$0{,}4$')],
            correctIndex: 0,
            explanation: same('$\\frac{0{,}4\\cdot 0{,}3}{0{,}4\\cdot 0{,}3+0{,}6\\cdot 0{,}5}=\\frac{0{,}12}{0{,}42}=\\frac{2}{7}$')
        }
    },
    screening: {
        mistake: {
            wrong: say('Proba batean, gaixoen artean % 80 positibo ateratzen dira; beraz, positibo bat izanda, gaixo egoteko probabilitatea 0,8 da.', 'Una prueba da positivo en el 80 % de los enfermos; así que, con un positivo, la probabilidad de estar enfermo es 0,8.', 'يعطي فحص نتيجة إيجابية لدى 80 % من المرضى؛ إذن مع نتيجة إيجابية يكون احتمال المرض 0.8.', 'A test is positive in 80% of the ill; so with a positive, the probability of being ill is 0.8.'),
            right: say('0,8 hori $P(+/E)$ da. $P(E/+)$ kalkulatzeko, positibo faltsuak eta prebalentzia ere behar dira.', 'Ese 0,8 es $P(+/E)$. Para $P(E/+)$ hacen falta también los falsos positivos y la prevalencia.', '0.8 هذا هو $P(+/E)$. ولحساب $P(E/+)$ نحتاج أيضًا إلى الإيجابيات الكاذبة ونسبة الانتشار.', 'That 0.8 is $P(+/E)$. For $P(E/+)$ you also need the false positives and the prevalence.')
        },
        check: {
            prompt: say('Biztanleen % 1 gaixo dago. Proba beti positiboa da gaixoetan, eta osasuntsuen artean ere % 1 positibo ateratzen da. Positibo bat izanda, zein da gaixo egoteko probabilitatea?', 'Está enferma el 1 % de la población. La prueba siempre da positivo en los enfermos y también en el 1 % de los sanos. Con un positivo, ¿qué probabilidad hay de estar enfermo?', 'المريض 1 % من السكان. يعطي الفحص دائمًا نتيجة إيجابية لدى المرضى، وكذلك لدى 1 % من الأصحاء. مع نتيجة إيجابية، ما احتمال المرض؟', '1% of the population is ill. The test is always positive in the ill, and also in 1% of the healthy. With a positive, what is the probability of being ill?'),
            options: [same('$0{,}99$'), same('$\\frac{100}{199}$'), same('$0{,}01$')],
            correctIndex: 1,
            explanation: same('$\\frac{0{,}01}{0{,}01+0{,}99\\cdot 0{,}01}=\\frac{0{,}01}{0{,}0199}=\\frac{100}{199}$')
        }
    }
}

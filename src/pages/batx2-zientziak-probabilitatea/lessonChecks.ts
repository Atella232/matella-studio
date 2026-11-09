import type { LessonCheck, LessonMistake, LocalizedText } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Probabilitatea · Batxilergoa 2 · Zientziak — the typical mistake and the
   «Check it» question of every lesson. Plain data (no JSX) so the tests can
   import it; lessons.tsx merges it into the topics. The questions use new
   numbers, never those of «Let's solve» or of the example, and one of
   their wrong answers is the lesson's typical mistake.
   ========================================================================== */

export type ProbabilityBatx2TopicId =
    | 'review-events' | 'review-compound' | 'review-counting'
    | 'event-space' | 'event-algebra' | 'axioms' | 'from-data'
    | 'conditional' | 'product-rule' | 'independence' | 'percent-tables'
    | 'total-probability' | 'bayes' | 'diagnostic-tests' | 'two-stage'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const probabilityBatx2LessonChecks: Record<ProbabilityBatx2TopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    /* ---------- 1. Before you start: review of 4. DBH ---------- */
    'review-events': {
        mistake: {
            wrong: say('3 bola gorri ($R$) eta 5 urdin badaude, $P(R)=\\frac{3}{5}$.', 'Si hay 3 bolas rojas ($R$) y 5 azules, $P(R)=\\frac{3}{5}$.', 'إذا كانت هناك 3 كرات حمراء ($R$) و5 زرقاء، فإن $P(R)=\\frac{3}{5}$.', 'If there are 3 red balls ($R$) and 5 blue ones, $P(R)=\\frac{3}{5}$.'),
            right: say('Kasu posible guztiez zatitzen da, ez aurkakoez: $P(R)=\\frac{3}{8}$.', 'Se divide entre todos los casos posibles, no entre los contrarios: $P(R)=\\frac{3}{8}$.', 'نقسم على كل الحالات الممكنة لا على المعاكسة: $P(R)=\\frac{3}{8}$.', 'Divide by all the possible cases, not by the other ones: $P(R)=\\frac{3}{8}$.')
        },
        check: {
            prompt: say('Poltsa batean 20 bola daude, 1 eta 20 arteko zenbakiekin. Zein da 5 zenbakiaren multiplo bat ateratzeko probabilitatea?', 'En una bolsa hay 20 bolas numeradas del 1 al 20. ¿Cuál es la probabilidad de sacar un múltiplo de 5?', 'في كيس 20 كرة مرقّمة من 1 إلى 20. ما احتمال سحب مضاعف للعدد 5؟', 'A bag holds 20 balls numbered 1 to 20. What is the probability of drawing a multiple of 5?'),
            options: [same('$\\frac{1}{4}$'), same('$\\frac{1}{5}$'), same('$\\frac{4}{5}$')],
            correctIndex: 1,
            explanation: say('4 multiplo daude (5, 10, 15 eta 20), 20 kasutatik: $\\frac{4}{20}=\\frac{1}{5}$.', 'Hay 4 múltiplos (5, 10, 15 y 20) de 20 casos: $\\frac{4}{20}=\\frac{1}{5}$.', 'هناك 4 مضاعفات (5 و10 و15 و20) من 20 حالة: $\\frac{4}{20}=\\frac{1}{5}$.', 'There are 4 multiples (5, 10, 15 and 20) out of 20 cases: $\\frac{4}{20}=\\frac{1}{5}$.')
        }
    },
    'review-compound': {
        mistake: {
            wrong: say('5 zuri eta 3 beltz daude, eta bi ateratzen dira itzuli gabe: $\\frac{5}{8}\\cdot\\frac{5}{8}$ biak zuriak izateko.', 'Hay 5 blancas y 3 negras y se sacan dos sin devolver: $\\frac{5}{8}\\cdot\\frac{5}{8}$ para dos blancas.', 'هناك 5 بيضاء و3 سوداء وتُسحب كرتان دون إرجاع: $\\frac{5}{8}\\cdot\\frac{5}{8}$ لبيضاوين.', 'There are 5 white and 3 black and two are drawn without replacement: $\\frac{5}{8}\\cdot\\frac{5}{8}$ for two white.'),
            right: say('Zuri bat gutxiago geratzen da, 7 bolatik: $\\frac{5}{8}\\cdot\\frac{4}{7}=\\frac{20}{56}$.', 'Queda una blanca menos, de 7 bolas: $\\frac{5}{8}\\cdot\\frac{4}{7}=\\frac{20}{56}$.', 'تبقى بيضاء أقل من 7 كرات: $\\frac{5}{8}\\cdot\\frac{4}{7}=\\frac{20}{56}$.', 'There is one white fewer, out of 7 balls: $\\frac{5}{8}\\cdot\\frac{4}{7}=\\frac{20}{56}$.')
        },
        check: {
            prompt: say('Kutxa batean 3 bola gorri eta 2 urdin daude. Bi ateratzen dira itzuli gabe. Zein da biak urdinak izateko probabilitatea?', 'Una urna tiene 3 bolas rojas y 2 azules. Se sacan dos sin devolver. ¿Cuál es la probabilidad de que las dos sean azules?', 'في جرّة 3 كرات حمراء وكرتان زرقاوان. تُسحب كرتان دون إرجاع. ما احتمال أن تكونا زرقاوين؟', 'An urn has 3 red balls and 2 blue ones. Two are drawn without replacement. What is the probability that both are blue?'),
            options: [same('$\\frac{4}{25}$'), same('$\\frac{2}{5}$'), same('$\\frac{1}{10}$')],
            correctIndex: 2,
            explanation: same('$\\frac{2}{5}\\cdot\\frac{1}{4}=\\frac{2}{20}=\\frac{1}{10}$')
        }
    },
    'review-counting': {
        mistake: {
            wrong: say('7 pertsonatik 2 ordezkari aukeratzeko, $V_{7,2}=42$ kasu, nahiz eta ordenak axola ez izan.', 'Para elegir 2 delegados entre 7, $V_{7,2}=42$ casos, aunque el orden no importe.', 'لاختيار مندوبَين من 7 هناك $V_{7,2}=42$ حالة، مع أن الترتيب لا يهم.', 'To choose 2 delegates out of 7, $V_{7,2}=42$ cases, even though the order does not matter.'),
            right: say('Ordenak axola ez badu, konbinazioak dira: $C_{7,2}=21$.', 'Si el orden no importa, son combinaciones: $C_{7,2}=21$.', 'إذا لم يهم الترتيب فهي توافيق: $C_{7,2}=21$.', 'If the order does not matter, they are combinations: $C_{7,2}=21$.')
        },
        check: {
            prompt: say('10 txarteletatik 3 hartzen dira batera. Zenbat kasu posible daude?', 'Se cogen 3 tarjetas de 10 a la vez. ¿Cuántos casos posibles hay?', 'تؤخذ 3 بطاقات من 10 معًا. كم حالة ممكنة هناك؟', '3 cards out of 10 are taken at once. How many possible cases are there?'),
            options: [same('$120$'), same('$720$'), same('$30$')],
            correctIndex: 0,
            explanation: same('$C_{10,3}=\\frac{10\\cdot 9\\cdot 8}{3\\cdot 2\\cdot 1}=120$')
        }
    },

    /* ---------- 2. Algebra of events ---------- */
    'event-space': {
        mistake: {
            wrong: say('$A=\\{1,2,3\\}$ eta $B=\\{3,4,5\\}$ gertaerek sistema osoa osatzen dute $E=\\{1,2,3,4,5\\}$ espazioan, biek batera $E$ ematen dutelako.', '$A=\\{1,2,3\\}$ y $B=\\{3,4,5\\}$ forman un sistema completo de $E=\\{1,2,3,4,5\\}$, porque juntos dan $E$.', '$A=\\{1,2,3\\}$ و$B=\\{3,4,5\\}$ يكوّنان نظامًا تامًّا في $E=\\{1,2,3,4,5\\}$ لأنهما معًا يعطيان $E$.', '$A=\\{1,2,3\\}$ and $B=\\{3,4,5\\}$ form a partition of $E=\\{1,2,3,4,5\\}$, because together they give $E$.'),
            right: say('3 zenbakia partekatzen dute: ez dira bateraezinak. Sistema oso baten zatiek ez dute elkar zapaltzen.', 'Comparten el 3: no son incompatibles. Las piezas de un sistema completo no se pisan.', 'يشتركان في 3: ليسا متنافيين. وقطع النظام التام لا تتداخل.', 'They share 3: they are not mutually exclusive. The pieces of a partition do not overlap.')
        },
        check: {
            prompt: say('Esperimentu batek 6 emaitza ditu. Zenbat gertaera ditu?', 'Un experimento tiene 6 resultados. ¿Cuántos sucesos tiene?', 'لتجربة 6 نتائج. كم حدثًا لها؟', 'An experiment has 6 outcomes. How many events does it have?'),
            options: [same('$36$'), same('$64$'), same('$12$')],
            correctIndex: 1,
            explanation: say('Emaitza bakoitza barruan dago edo ez: $2^6=64$, $\\varnothing$ eta $E$ barne.', 'Cada resultado está o no: $2^6=64$, contando $\\varnothing$ y $E$.', 'كل نتيجة إما داخل الحدث وإما لا: $2^6=64$، ومنها $\\varnothing$ و$E$.', 'Each outcome is in or out: $2^6=64$, counting $\\varnothing$ and $E$.')
        }
    },
    'event-algebra': {
        mistake: {
            wrong: same('$\\overline{A\\cup B}=\\overline{A}\\cup\\overline{B}$'),
            right: say('Bildura ukatzean, ebakidura bihurtzen da: $\\overline{A\\cup B}=\\overline{A}\\cap\\overline{B}$, «ez $A$ ez $B$».', 'Al negar la unión, cambia a intersección: $\\overline{A\\cup B}=\\overline{A}\\cap\\overline{B}$, «ni $A$ ni $B$».', 'عند نفي الاتحاد يصير تقاطعًا: $\\overline{A\\cup B}=\\overline{A}\\cap\\overline{B}$، أي «لا $A$ ولا $B$».', 'When you negate the union, it becomes an intersection: $\\overline{A\\cup B}=\\overline{A}\\cap\\overline{B}$, ‘neither $A$ nor $B$’.')
        },
        check: {
            prompt: say('Zein da «$A$ gertatzen da, baina $B$ ez» gertaera?', '¿Qué suceso es «ocurre $A$ pero no $B$»?', 'ما الحدث «يقع $A$ ولا يقع $B$»؟', 'Which event is ‘$A$ happens but $B$ does not’?'),
            options: [same('$\\overline{A}\\cap B$'), same('$\\overline{A\\cap B}$'), same('$A\\cap\\overline{B}$')],
            correctIndex: 2,
            explanation: say('$A$ gertatzen da eta $B$ ez: $A-B=A\\cap\\overline{B}$.', 'Ocurre $A$ y no ocurre $B$: $A-B=A\\cap\\overline{B}$.', 'يقع $A$ ولا يقع $B$: $A-B=A\\cap\\overline{B}$.', '$A$ happens and $B$ does not: $A-B=A\\cap\\overline{B}$.')
        }
    },
    axioms: {
        mistake: {
            wrong: same('$P(A-B)=P(A)-P(B)$'),
            right: say('Zati komuna bakarrik kentzen da: $P(A-B)=P(A)-P(A\\cap B)$.', 'Se quita solo la parte común: $P(A-B)=P(A)-P(A\\cap B)$.', 'نطرح الجزء المشترك فقط: $P(A-B)=P(A)-P(A\\cap B)$.', 'Only the common part is taken away: $P(A-B)=P(A)-P(A\\cap B)$.')
        },
        check: {
            prompt: say('$P(A)=0{,}45$ eta $P(A\\cap B)=0{,}2$ badira, zenbat da $P(A-B)$?', 'Si $P(A)=0{,}45$ y $P(A\\cap B)=0{,}2$, ¿cuánto vale $P(A-B)$?', 'إذا كان $P(A)=0{,}45$ و$P(A\\cap B)=0{,}2$، فكم يساوي $P(A-B)$؟', 'If $P(A)=0{,}45$ and $P(A\\cap B)=0{,}2$, what is $P(A-B)$?'),
            options: [same('$0{,}25$'), same('$0{,}65$'), same('$0{,}09$')],
            correctIndex: 0,
            explanation: same('$P(A-B)=0{,}45-0{,}2=0{,}25$')
        }
    },
    'from-data': {
        mistake: {
            wrong: same('$P(\\overline{A}\\cap\\overline{B})=1-P(A\\cap B)$'),
            right: say('«Ez $A$ ez $B$» bilduraren aurkakoa da: $P(\\overline{A}\\cap\\overline{B})=1-P(A\\cup B)$.', '«Ni $A$ ni $B$» es el contrario de la unión: $P(\\overline{A}\\cap\\overline{B})=1-P(A\\cup B)$.', '«لا $A$ ولا $B$» هو معاكس الاتحاد: $P(\\overline{A}\\cap\\overline{B})=1-P(A\\cup B)$.', '‘Neither $A$ nor $B$’ is the complement of the union: $P(\\overline{A}\\cap\\overline{B})=1-P(A\\cup B)$.')
        },
        check: {
            prompt: say('$P(A\\cup B)=0{,}7$ bada, zenbat da $P(\\overline{A}\\cap\\overline{B})$?', 'Si $P(A\\cup B)=0{,}7$, ¿cuánto vale $P(\\overline{A}\\cap\\overline{B})$?', 'إذا كان $P(A\\cup B)=0{,}7$، فكم يساوي $P(\\overline{A}\\cap\\overline{B})$؟', 'If $P(A\\cup B)=0{,}7$, what is $P(\\overline{A}\\cap\\overline{B})$?'),
            options: [same('$0{,}7$'), same('$0{,}3$'), same('$1{,}7$')],
            correctIndex: 1,
            explanation: say('De Morgan: $\\overline{A}\\cap\\overline{B}$ gertaera $A\\cup B$ gertaeraren aurkakoa da, $1-0{,}7=0{,}3$.', 'De Morgan: $\\overline{A}\\cap\\overline{B}$ es el contrario de $A\\cup B$, $1-0{,}7=0{,}3$.', 'دي مورغان: $\\overline{A}\\cap\\overline{B}$ هو معاكس $A\\cup B$، أي $1-0{,}7=0{,}3$.', 'De Morgan: $\\overline{A}\\cap\\overline{B}$ is the complement of $A\\cup B$, $1-0{,}7=0{,}3$.')
        }
    },

    /* ---------- 3. Conditional probability and independence ---------- */
    conditional: {
        mistake: {
            wrong: say('$P(A/B)$ eta $P(A\\cap B)$ gauza bera dira: $A$ eta $B$ gertatzeko probabilitatea.', '$P(A/B)$ es lo mismo que $P(A\\cap B)$: la probabilidad de $A$ y $B$.', '$P(A/B)$ هو نفسه $P(A\\cap B)$: احتمال $A$ و$B$.', '$P(A/B)$ is the same as $P(A\\cap B)$: the probability of $A$ and $B$.'),
            right: say('Baldintzatuak zati komuna dakigunaz zatitzen du: $P(A/B)=\\frac{P(A\\cap B)}{P(B)}$.', 'La condicionada divide la parte común entre lo que se sabe: $P(A/B)=\\frac{P(A\\cap B)}{P(B)}$.', 'يقسم الاحتمال المشروط الجزء المشترك على ما نعرفه: $P(A/B)=\\frac{P(A\\cap B)}{P(B)}$.', 'The conditional probability divides the common part by what is known: $P(A/B)=\\frac{P(A\\cap B)}{P(B)}$.')
        },
        check: {
            prompt: say('$P(A\\cap B)=0{,}2$ eta $P(B)=0{,}5$ badira, zenbat da $P(A/B)$?', 'Si $P(A\\cap B)=0{,}2$ y $P(B)=0{,}5$, ¿cuánto vale $P(A/B)$?', 'إذا كان $P(A\\cap B)=0{,}2$ و$P(B)=0{,}5$، فكم يساوي $P(A/B)$؟', 'If $P(A\\cap B)=0{,}2$ and $P(B)=0{,}5$, what is $P(A/B)$?'),
            options: [same('$0{,}1$'), same('$0{,}2$'), same('$0{,}4$')],
            correctIndex: 2,
            explanation: same('$P(A/B)=\\frac{0{,}2}{0{,}5}=0{,}4$')
        }
    },
    'product-rule': {
        mistake: {
            wrong: say('Itzuli gabe, $P(A\\cap B)=P(A)\\cdot P(B)$, lehenak ezer aldatuko ez balu bezala.', 'Sin devolver, $P(A\\cap B)=P(A)\\cdot P(B)$, como si la primera no cambiara nada.', 'دون إرجاع، $P(A\\cap B)=P(A)\\cdot P(B)$، كأن الأولى لا تغيّر شيئًا.', 'Without replacement, $P(A\\cap B)=P(A)\\cdot P(B)$, as if the first draw changed nothing.'),
            right: say('Bigarrena lehenaren araberakoa da: $P(A\\cap B)=P(A)\\cdot P(B/A)$.', 'La segunda depende de la primera: $P(A\\cap B)=P(A)\\cdot P(B/A)$.', 'الثانية تتعلق بالأولى: $P(A\\cap B)=P(A)\\cdot P(B/A)$.', 'The second depends on the first: $P(A\\cap B)=P(A)\\cdot P(B/A)$.')
        },
        check: {
            prompt: say('Poltsa batean 6 gozoki marrubizko eta 4 limoizko daude. Bi hartzen dira itzuli gabe. Zein da biak limoizkoak izateko probabilitatea?', 'En una bolsa hay 6 caramelos de fresa y 4 de limón. Se cogen dos sin devolver. ¿Qué probabilidad hay de que los dos sean de limón?', 'في كيس 6 حلويات بالفراولة و4 بالليمون. تؤخذ اثنتان دون إرجاع. ما احتمال أن تكونا بالليمون؟', 'A bag holds 6 strawberry sweets and 4 lemon ones. Two are taken without replacement. What is the probability that both are lemon?'),
            options: [same('$\\frac{2}{15}$'), same('$\\frac{4}{25}$'), same('$\\frac{2}{5}$')],
            correctIndex: 0,
            explanation: same('$\\frac{4}{10}\\cdot\\frac{3}{9}=\\frac{12}{90}=\\frac{2}{15}$')
        }
    },
    independence: {
        mistake: {
            wrong: say('Bi gertaera independenteak badira, ezin dira batera gertatu: $P(A\\cap B)=0$.', 'Si dos sucesos son independientes, no pueden ocurrir a la vez: $P(A\\cap B)=0$.', 'إذا كان حدثان مستقلين فلا يمكن أن يقعا معًا: $P(A\\cap B)=0$.', 'If two events are independent, they cannot happen together: $P(A\\cap B)=0$.'),
            right: say('Hori bateraezinak izatea da. Independenteak izatea $P(A\\cap B)=P(A)\\cdot P(B)$ da.', 'Eso es ser incompatibles. Ser independientes es $P(A\\cap B)=P(A)\\cdot P(B)$.', 'هذا هو التنافي. أما الاستقلال فهو $P(A\\cap B)=P(A)\\cdot P(B)$.', 'That is being mutually exclusive. Being independent is $P(A\\cap B)=P(A)\\cdot P(B)$.')
        },
        check: {
            prompt: say('$A$ eta $B$ bateraezinak dira, $P(A)=0{,}3$ eta $P(B)=0{,}4$ izanik. Independenteak dira?', '$A$ y $B$ son incompatibles, con $P(A)=0{,}3$ y $P(B)=0{,}4$. ¿Son independientes?', '$A$ و$B$ متنافيان، مع $P(A)=0{,}3$ و$P(B)=0{,}4$. هل هما مستقلان؟', '$A$ and $B$ are mutually exclusive, with $P(A)=0{,}3$ and $P(B)=0{,}4$. Are they independent?'),
            options: [
                say('Bai: ez dute ezer komunean', 'Sí: no tienen nada en común', 'نعم: لا شيء مشترك بينهما', 'Yes: they have nothing in common'),
                say('Ez: $P(A\\cap B)=0$ eta $P(A)\\cdot P(B)=0{,}12$', 'No: $P(A\\cap B)=0$ y $P(A)\\cdot P(B)=0{,}12$', 'لا: $P(A\\cap B)=0$ و$P(A)\\cdot P(B)=0{,}12$', 'No: $P(A\\cap B)=0$ and $P(A)\\cdot P(B)=0{,}12$'),
                say('Bai, $0{,}3+0{,}4<1$ delako', 'Sí, porque $0{,}3+0{,}4<1$', 'نعم، لأن $0{,}3+0{,}4<1$', 'Yes, because $0{,}3+0{,}4<1$')
            ],
            correctIndex: 1,
            explanation: say('Bateraezinak izanda, $B$ jakiteak $A$ ezinezko bihurtzen du: oso mendekoak dira, $0\\neq 0{,}3\\cdot 0{,}4$.', 'Al ser incompatibles, saber $B$ hace imposible $A$: dependen mucho, $0\\neq 0{,}3\\cdot 0{,}4$.', 'لأنهما متنافيان، تجعل معرفة $B$ الحدث $A$ مستحيلًا: هما تابعان جدًّا، $0\\neq 0{,}3\\cdot 0{,}4$.', 'Being mutually exclusive, knowing $B$ makes $A$ impossible: they depend a lot, $0\\neq 0{,}3\\cdot 0{,}4$.')
        }
    },
    'percent-tables': {
        mistake: {
            wrong: say('Txartelaz ordaintzen dutenen ($A$) % 25 fruta erosten du ($B$): $P(A\\cap B)=0{,}25$.', 'El 25 % de los que pagan con tarjeta ($A$) compra fruta ($B$): $P(A\\cap B)=0{,}25$.', '25٪ من الذين يدفعون بالبطاقة ($A$) يشترون الفاكهة ($B$): $P(A\\cap B)=0{,}25$.', '25% of those who pay by card ($A$) buy fruit ($B$): $P(A\\cap B)=0{,}25$.'),
            right: say('% 25 hori txartelekoena da: $P(B/A)=0{,}25$. Ebakidura $P(A\\cap B)=P(A)\\cdot 0{,}25$ da.', 'Ese 25 % es de los de tarjeta: $P(B/A)=0{,}25$. La intersección es $P(A\\cap B)=P(A)\\cdot 0{,}25$.', 'تلك الـ 25٪ هي من أصحاب البطاقة: $P(B/A)=0{,}25$. والتقاطع $P(A\\cap B)=P(A)\\cdot 0{,}25$.', 'That 25% is of the card payers: $P(B/A)=0{,}25$. The intersection is $P(A\\cap B)=P(A)\\cdot 0{,}25$.')
        },
        check: {
            prompt: say('Klase batean, % 50 futbolean aritzen da ($A$), eta aritzen direnen % 40 neskak dira ($B$). Zer da % 40 hori?', 'En una clase, el 50 % juega al fútbol ($A$) y, de los que juegan, el 40 % son chicas ($B$). ¿Qué es ese 40 %?', 'في صف يلعب 50٪ كرة القدم ($A$)، ومن اللاعبين 40٪ فتيات ($B$). ما تلك الـ 40٪؟', 'In a class, 50% play football ($A$) and, of those who play, 40% are girls ($B$). What is that 40%?'),
            options: [same('$P(A\\cap B)$'), same('$P(B/A)$'), same('$P(A/B)$')],
            correctIndex: 1,
            explanation: say('Futbolean aritzen direnen ehunekoa da: $B$ gertaeraren probabilitatea, $A$ jakinda.', 'Es un porcentaje de los que juegan: la probabilidad de $B$ sabiendo $A$.', 'إنها نسبة من اللاعبين: احتمال $B$ مع العلم بـ $A$.', 'It is a percentage of those who play: the probability of $B$ given $A$.')
        }
    },

    /* ---------- 4. Total probability and Bayes ---------- */
    'total-probability': {
        mistake: {
            wrong: say('Bi makinak % 4 eta % 6 huts egiten badute, $P(D)=0{,}04+0{,}06$.', 'Si dos máquinas fallan el 4 % y el 6 %, $P(D)=0{,}04+0{,}06$.', 'إذا كانت آلتان تخطئان بنسبة 4٪ و6٪ فإن $P(D)=0{,}04+0{,}06$.', 'If two machines fail 4% and 6% of the time, $P(D)=0{,}04+0{,}06$.'),
            right: say('Makina bakoitzak bere ekoizpen-zatiaren pisua du: $P(D)=P(A_1)\\cdot 0{,}04+P(A_2)\\cdot 0{,}06$.', 'Cada máquina pesa según su parte de la producción: $P(D)=P(A_1)\\cdot 0{,}04+P(A_2)\\cdot 0{,}06$.', 'لكل آلة وزن بحسب حصتها من الإنتاج: $P(D)=P(A_1)\\cdot 0{,}04+P(A_2)\\cdot 0{,}06$.', 'Each machine weighs according to its share of production: $P(D)=P(A_1)\\cdot 0{,}04+P(A_2)\\cdot 0{,}06$.')
        },
        check: {
            prompt: say('Egunen % 70 eguzkitsuak dira. Eguzkiarekin, % 10 berandu iristen naiz, eta eguzkirik gabe, % 40. Zein da berandu iristeko probabilitatea?', 'El 70 % de los días hace sol. Con sol llego tarde el 10 % de las veces, y sin sol, el 40 %. ¿Qué probabilidad hay de que llegue tarde?', '70٪ من الأيام مشمسة. في الأيام المشمسة أتأخر 10٪ من المرات، ودون شمس 40٪. ما احتمال أن أتأخر؟', '70% of days are sunny. With sun I am late 10% of the time, and without sun, 40%. What is the probability that I am late?'),
            options: [same('$0{,}25$'), same('$0{,}5$'), same('$0{,}19$')],
            correctIndex: 2,
            explanation: same('$0{,}7\\cdot 0{,}1+0{,}3\\cdot 0{,}4=0{,}07+0{,}12=0{,}19$')
        }
    },
    bayes: {
        mistake: {
            wrong: say('$A_3$ makinak piezen % 5 akastun egiten badu, pieza akastun bat $A_3$ makinatik dator 0,05 probabilitatearekin.', 'Si $A_3$ hace defectuosas el 5 % de sus piezas, una pieza defectuosa viene de $A_3$ con probabilidad 0,05.', 'إذا كانت $A_3$ تصنع 5٪ من قطعها معيبة، فإن القطعة المعيبة تأتي من $A_3$ باحتمال 0.05.', 'If $A_3$ makes 5% of its parts faulty, a faulty part comes from $A_3$ with probability 0.05.'),
            right: say('0,05 hori $P(D/A_3)$ da. Galdetzen dena $P(A_3/D)$ da, alderantziz: Bayesekin kalkulatzen da.', 'Ese 0,05 es $P(D/A_3)$. Lo que se pregunta es $P(A_3/D)$, al revés: se calcula con Bayes.', 'تلك الـ 0.05 هي $P(D/A_3)$. والمطلوب $P(A_3/D)$ بالعكس: يُحسب ببايز.', 'That 0.05 is $P(D/A_3)$. What is asked is $P(A_3/D)$, the other way round: it is worked out with Bayes.')
        },
        check: {
            prompt: say('Lote bateko kutxen % 20 $A_1$ hornitzailearena da, eta horien % 10 hautsita dago; gainerakoen, % 5. Kutxa bat hautsita badago, zein da $A_1$ hornitzailearena izateko probabilitatea?', 'El 20 % de las cajas de un lote viene del proveedor $A_1$, y de ellas el 10 % está rota; del resto, el 5 %. Si una caja está rota, ¿qué probabilidad hay de que sea de $A_1$?', '20٪ من صناديق شحنة تأتي من المورّد $A_1$، و10٪ منها مكسورة؛ ومن الباقي 5٪. إذا كان صندوق مكسورًا، فما احتمال أن يكون من $A_1$؟', '20% of the boxes in a batch come from supplier $A_1$, and 10% of those are broken; of the rest, 5%. If a box is broken, what is the probability that it is from $A_1$?'),
            options: [same('$\\frac{1}{3}$'), same('$0{,}1$'), same('$0{,}02$')],
            correctIndex: 0,
            explanation: same('$\\frac{0{,}2\\cdot 0{,}1}{0{,}2\\cdot 0{,}1+0{,}8\\cdot 0{,}05}=\\frac{0{,}02}{0{,}06}=\\frac{1}{3}$')
        }
    },
    'diagnostic-tests': {
        mistake: {
            wrong: say('Proba batek gaixoen % 80 detektatzen du; positibo ateratzen bada, gaixo egoteko probabilitatea 0,8 da.', 'Una prueba detecta al 80 % de los enfermos; si da positivo, la probabilidad de estar enfermo es 0,8.', 'يكشف اختبار 80٪ من المرضى؛ فإذا كانت النتيجة إيجابية، فاحتمال المرض 0.8.', 'A test detects 80% of ill people; if it is positive, the probability of being ill is 0.8.'),
            right: say('0,8 hori $P(+/E)$ da. $P(E/+)$ galdetzen da, eta zenbat gaixo eta zenbat positibo faltsu dauden ere araberakoa da.', 'Ese 0,8 es $P(+/E)$. Se pregunta $P(E/+)$, que depende también de cuántos enfermos y cuántos falsos positivos hay.', 'تلك الـ 0.8 هي $P(+/E)$. والمطلوب $P(E/+)$، وهو يتعلق أيضًا بعدد المرضى وعدد الإيجابيات الكاذبة.', 'That 0.8 is $P(+/E)$. What is asked is $P(E/+)$, which also depends on how many ill people and how many false positives there are.')
        },
        check: {
            prompt: say('Proba batean, $P(+/E)=0{,}9$. Zer esan nahi du 0,9 horrek?', 'En una prueba, $P(+/E)=0{,}9$. ¿Qué quiere decir ese 0,9?', 'في اختبار ما $P(+/E)=0{,}9$. ماذا تعني تلك الـ 0.9؟', 'In a test, $P(+/E)=0{,}9$. What does that 0.9 mean?'),
            options: [
                say('100 positibotatik 90 gaixo daudela', 'Que de cada 100 positivos, 90 están enfermos', 'أن 90 من كل 100 إيجابي مرضى', 'That of every 100 positives, 90 are ill'),
                say('Biztanleen % 90 positibo ateratzen dela', 'Que el 90 % de la población da positivo', 'أن 90٪ من السكان نتيجتهم إيجابية', 'That 90% of the population tests positive'),
                say('100 gaixotatik 90 positibo ateratzen direla', 'Que de cada 100 enfermos, 90 dan positivo', 'أن 90 من كل 100 مريض نتيجتهم إيجابية', 'That of every 100 ill people, 90 test positive')
            ],
            correctIndex: 2,
            explanation: say('$P(+/E)$ gaixoen artean neurtzen da: sentikortasuna da. Positiboen artekoa $P(E/+)$ litzateke.', '$P(+/E)$ se mide entre los enfermos: es la sensibilidad. La de entre los positivos sería $P(E/+)$.', '$P(+/E)$ يُقاس بين المرضى: إنه الحساسية. أما بين الإيجابيين فهو $P(E/+)$.', '$P(+/E)$ is measured among the ill: it is the sensitivity. The one among the positives would be $P(E/+)$.')
        }
    },
    'two-stage': {
        mistake: {
            wrong: say('Bola bat pasatu ondoren, II kutxa lehen bezala dago.', 'Después de pasar una bola, la urna II sigue como antes.', 'بعد نقل كرة تبقى الجرّة II كما كانت.', 'After a ball is moved, urn II is the same as before.'),
            right: say('II kutxak bola bat gehiago du, eta haren kolorea gertatutakoaren araberakoa da: kasu bakoitzeko adar bat behar da.', 'La urna II tiene una bola más, y su color depende de lo que pasó: hace falta una rama para cada caso.', 'في الجرّة II كرة إضافية، ولونها يتعلق بما حدث: يلزم فرع لكل حالة.', 'Urn II has one more ball, and its colour depends on what happened: you need a branch for each case.')
        },
        check: {
            prompt: say('I kutxa: zuri 1 eta beltz 1; II kutxa: zuri 1 eta 2 beltz. Bola bat I kutxatik II kutxara pasatzen da, eta bat ateratzen da II kutxatik. Zein da zuria izateko probabilitatea?', 'Urna I: 1 blanca y 1 negra; urna II: 1 blanca y 2 negras. Se pasa una bola de I a II y se saca una de II. ¿Qué probabilidad hay de que sea blanca?', 'الجرّة I: بيضاء واحدة وسوداء واحدة؛ الجرّة II: بيضاء واحدة وسوداوان. تُنقل كرة من I إلى II وتُسحب كرة من II. ما احتمال أن تكون بيضاء؟', 'Urn I: 1 white and 1 black; urn II: 1 white and 2 black. A ball is moved from I to II and one is drawn from II. What is the probability that it is white?'),
            options: [same('$\\frac{1}{3}$'), same('$\\frac{3}{8}$'), same('$\\frac{1}{2}$')],
            correctIndex: 1,
            explanation: same('$\\frac{1}{2}\\cdot\\frac{2}{4}+\\frac{1}{2}\\cdot\\frac{1}{4}=\\frac{1}{4}+\\frac{1}{8}=\\frac{3}{8}$')
        }
    }
}

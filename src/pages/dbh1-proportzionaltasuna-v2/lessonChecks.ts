import type { LessonCheck, LessonMistake, LocalizedText } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Proportzionaltasuna · 1. DBH — the typical mistake and the «Check it»
   question of every lesson. Plain data (no JSX) so the tests can import it;
   lessons.tsx merges it into the topics. The questions use new numbers,
   never those of «Let's solve» or of the example, and one of their wrong
   answers is the lesson's typical mistake. Percentages and prices go in the
   words, as each language writes them (% 25, 25 %, 25%, 25٪; 60 €, €60).
   ========================================================================== */

export type ProportionTopicId = 'magnitude' | 'ratio' | 'proportion' | 'direct' | 'direct-unit' | 'rule-of-three' | 'inverse' | 'inverse-unit' | 'inverse-rule' | 'percent-meaning' | 'percent-of' | 'which-percent' | 'discount' | 'increase' | 'problems'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const proportionLessonChecks: Record<ProportionTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    /* ---------- 1. Ratios and proportions ---------- */
    magnitude: {
        mistake: {
            wrong: say('Poza magnitude bat da, asko edo gutxi izan daitekeelako.', 'La alegría es una magnitud, porque puede ser mucha o poca.', 'الفرح مقدار لأنه قد يكون كثيرًا أو قليلًا.', 'Happiness is a magnitude, because there can be a lot or a little of it.'),
            right: say('Magnitude bat zenbaki batekin eta unitate batekin neurtzen da; pozak ez du unitaterik.', 'Una magnitud se mide con un número y una unidad; la alegría no tiene unidad.', 'المقدار يُقاس بعدد ووحدة، والفرح ليست له وحدة.', 'A magnitude is measured with a number and a unit; happiness has no unit.')
        },
        check: {
            prompt: say('Zein da magnitude bat?', '¿Cuál es una magnitud?', 'أيّها مقدار؟', 'Which one is a magnitude?'),
            options: [say('Adiskidetasuna', 'La amistad', 'الصداقة', 'Friendship'), say('Tenperatura', 'La temperatura', 'درجة الحرارة', 'Temperature'), say('Kolore gogokoena', 'El color favorito', 'اللون المفضّل', 'Your favourite colour')],
            correctIndex: 1,
            explanation: say('Tenperatura zenbaki batekin eta unitate batekin neurtzen da: 20 °C.', 'La temperatura se mide con un número y una unidad: 20 °C.', 'درجة الحرارة تُقاس بعدد ووحدة: 20 °C.', 'Temperature is measured with a number and a unit: 20 °C.')
        }
    },
    ratio: {
        mistake: {
            wrong: say('4 nesken eta 12 mutilen arteko arrazoia $\\frac{12}{4}$ da.', 'La razón entre 4 chicas y 12 chicos es $\\frac{12}{4}$.', 'النسبة بين 4 بنات و12 ولدًا هي $\\frac{12}{4}$.', 'The ratio of 4 girls to 12 boys is $\\frac{12}{4}$.'),
            right: say('Aurrekaria lehen kantitatea da: $\\frac{4}{12}$, neskak zati mutilak.', 'El antecedente es la primera cantidad: $\\frac{4}{12}$, chicas entre chicos.', 'المقدَّم هو الكمية الأولى: $\\frac{4}{12}$، البنات على الأولاد.', 'The first amount goes on top: $\\frac{4}{12}$, girls to boys.')
        },
        check: {
            prompt: say('Zuku batean, 2 baso laranja daude 5 baso urerako. Zein da laranjaren eta uraren arteko arrazoia?', 'En un zumo hay 2 vasos de naranja por cada 5 de agua. ¿Cuál es la razón entre naranja y agua?', 'في عصير كوبان من البرتقال لكل 5 أكواب من الماء. ما النسبة بين البرتقال والماء؟', 'A drink has 2 glasses of orange for every 5 of water. What is the ratio of orange to water?'),
            options: [same('$\\frac{2}{5}$'), same('$\\frac{5}{2}$'), same('$\\frac{2}{7}$')],
            correctIndex: 0,
            explanation: say('Laranja goian, aurrekaria, eta ura behean: $\\frac{2}{5}=0{,}4$.', 'Naranja arriba, el antecedente, y agua abajo: $\\frac{2}{5}=0{,}4$.', 'البرتقال في الأعلى (المقدَّم) والماء في الأسفل: $\\frac{2}{5}=0{,}4$.', 'Orange on top and water underneath: $\\frac{2}{5}=0{,}4$.')
        }
    },
    proportion: {
        mistake: {
            wrong: say('$\\frac{3}{x}=\\frac{6}{8}$ proportzioan, $3\\cdot 6=x\\cdot 8$.', 'En $\\frac{3}{x}=\\frac{6}{8}$, $3\\cdot 6=x\\cdot 8$.', 'في $\\frac{3}{x}=\\frac{6}{8}$: $3\\cdot 6=x\\cdot 8$.', 'In $\\frac{3}{x}=\\frac{6}{8}$, $3\\cdot 6=x\\cdot 8$.'),
            right: say('Gurutzean biderkatzen da, muturrak muturrekin: $3\\cdot 8=x\\cdot 6$; beraz, $x=4$.', 'Se multiplica en cruz, extremos con extremos: $3\\cdot 8=x\\cdot 6$, así que $x=4$.', 'نضرب بالتقاطع، الطرفين معًا: $3\\cdot 8=x\\cdot 6$، إذن $x=4$.', 'Cross-multiply, extremes with extremes: $3\\cdot 8=x\\cdot 6$, so $x=4$.')
        },
        check: {
            prompt: say('Aurkitu $x$: $\\frac{x}{6}=\\frac{10}{12}$.', 'Halla $x$: $\\frac{x}{6}=\\frac{10}{12}$.', 'أوجد $x$: $\\frac{x}{6}=\\frac{10}{12}$.', 'Find $x$: $\\frac{x}{6}=\\frac{10}{12}$.'),
            options: [same('$x=5$'), same('$x=20$'), same('$x=7{,}2$')],
            correctIndex: 0,
            explanation: say('$x\\cdot 12=6\\cdot 10=60$; beraz, $x=60\\mathbin{:}12=5$.', '$x\\cdot 12=6\\cdot 10=60$, así que $x=60\\mathbin{:}12=5$.', '$x\\cdot 12=6\\cdot 10=60$، إذن $x=60\\mathbin{:}12=5$.', '$x\\cdot 12=6\\cdot 10=60$, so $x=60\\mathbin{:}12=5$.')
        }
    },

    /* ---------- 2. Direct proportion ---------- */
    direct: {
        mistake: {
            wrong: say('Adina eta altuera zuzenki proportzionalak dira: bata hazten denean, bestea ere hazten da.', 'La edad y la altura son directamente proporcionales: al crecer una, crece la otra.', 'العمر والطول متناسبان طرديًا: إذا زاد أحدهما زاد الآخر.', 'Age and height are directly proportional: when one grows, so does the other.'),
            right: say('Ez da nahikoa biak haztea: 20 urterekin ez duzu 10 urterekin baino bi aldiz gehiago neurtzen.', 'No basta con que crezcan las dos: a los 20 años no mides el doble que a los 10.', 'لا يكفي أن يزيد الاثنان: في العشرين من عمرك لا يكون طولك ضعف طولك في العاشرة.', 'It is not enough for both to grow: at 20 you are not twice as tall as at 10.')
        },
        check: {
            prompt: say('Zein taula da zuzenki proportzionalak diren magnitudeena?', '¿Qué tabla es de magnitudes directamente proporcionales?', 'أيّ جدول لمقدارين متناسبين طرديًا؟', 'Which table shows directly proportional quantities?'),
            options: [same('$1\\to 4,\\ 2\\to 8,\\ 3\\to 12$'), same('$1\\to 4,\\ 2\\to 6,\\ 3\\to 8$'), same('$1\\to 4,\\ 2\\to 2,\\ 4\\to 1$')],
            correctIndex: 0,
            explanation: say('Lehenengoan, bikoitza → bikoitza: arrazoia beti 4 da.', 'En la primera, doble → doble: la razón siempre es 4.', 'في الأول: الضعف ← الضعف، والنسبة دائمًا 4.', 'In the first one, double → double: the ratio is always 4.')
        }
    },
    'direct-unit': {
        mistake: {
            wrong: say('4 arkatzek 2 euro balio badute, arkatz batek $4\\mathbin{:}2=2$ euro balio du.', 'Si 4 lápices cuestan 2 €, un lápiz cuesta $4\\mathbin{:}2=2$ €.', 'إذا كان ثمن 4 أقلام 2 يورو، فثمن القلم $4\\mathbin{:}2=2$ يورو.', 'If 4 pencils cost €2, one pencil costs $4\\mathbin{:}2=2$.'),
            right: say('Prezioa arkatz kopuruarekin zatitzen da: $2\\mathbin{:}4=0{,}5$ euro bakoitza.', 'Se divide el precio entre los lápices: $2\\mathbin{:}4=0{,}5$ € cada uno.', 'نقسم الثمن على عدد الأقلام: $2\\mathbin{:}4=0{,}5$ يورو للقلم.', 'Divide the price by the number of pencils: $2\\mathbin{:}4=0{,}5$ each.')
        },
        check: {
            prompt: say('Berdinak diren 5 kutxak 40 kg pisatzen dute. Zenbat pisatzen dute 3 kutxak?', '5 cajas iguales pesan 40 kg. ¿Cuánto pesan 3 cajas?', '5 صناديق متماثلة تزن 40 كغ. كم تزن 3 صناديق؟', '5 identical boxes weigh 40 kg. How much do 3 boxes weigh?'),
            options: [same('$24$'), same('$8$'), same('$120$')],
            correctIndex: 0,
            explanation: say('Kutxa batek $40\\mathbin{:}5=8$ kg; hiruk, $8\\cdot 3=24$ kg.', 'Una caja, $40\\mathbin{:}5=8$ kg; tres, $8\\cdot 3=24$ kg.', 'صندوق واحد $40\\mathbin{:}5=8$ كغ؛ وثلاثة $8\\cdot 3=24$ كغ.', 'One box, $40\\mathbin{:}5=8$ kg; three, $8\\cdot 3=24$ kg.')
        }
    },
    'rule-of-three': {
        mistake: {
            wrong: say('2 kg-k 10 euro balio badute, 5 kg-rako $\\frac{2}{10}=\\frac{x}{5}$ idazten dut.', 'Si 2 kg cuestan 10 €, para 5 kg escribo $\\frac{2}{10}=\\frac{x}{5}$.', 'إذا كان ثمن 2 كغ هو 10 يورو، أكتب لـ5 كغ: $\\frac{2}{10}=\\frac{x}{5}$.', 'If 2 kg cost €10, for 5 kg I write $\\frac{2}{10}=\\frac{x}{5}$.'),
            right: say('Magnitude bakoitza bere zutabean: $\\frac{2}{10}=\\frac{5}{x}$, eta $x=25$ euro.', 'Cada magnitud en su columna: $\\frac{2}{10}=\\frac{5}{x}$, y $x=25$ €.', 'كل مقدار في عموده: $\\frac{2}{10}=\\frac{5}{x}$، و$x=25$ يورو.', 'Each quantity in its own column: $\\frac{2}{10}=\\frac{5}{x}$, and $x=25$ euros.')
        },
        check: {
            prompt: say('Txorrota batek 6 ontzi betetzen ditu 4 minututan. Zenbat ontzi beteko ditu 10 minututan?', 'Un grifo llena 6 cubos en 4 minutos. ¿Cuántos cubos llena en 10 minutos?', 'صنبور يملأ 6 دلاء في 4 دقائق. كم دلوًا يملأ في 10 دقائق؟', 'A tap fills 6 buckets in 4 minutes. How many buckets does it fill in 10 minutes?'),
            options: [same('$2{,}4$'), same('$15$'), same('$60$')],
            correctIndex: 1,
            explanation: say('Zuzena da: $\\frac{4}{6}=\\frac{10}{x}$; beraz, $x=6\\cdot 10\\mathbin{:}4=15$ ontzi.', 'Es directa: $\\frac{4}{6}=\\frac{10}{x}$, así que $x=6\\cdot 10\\mathbin{:}4=15$ cubos.', 'تناسب طردي: $\\frac{4}{6}=\\frac{10}{x}$، إذن $x=6\\cdot 10\\mathbin{:}4=15$ دلوًا.', 'It is direct: $\\frac{4}{6}=\\frac{10}{x}$, so $x=6\\cdot 10\\mathbin{:}4=15$ buckets.')
        }
    },

    /* ---------- 3. Inverse proportion ---------- */
    inverse: {
        mistake: {
            wrong: say('4 margolarik 6 ordu behar badituzte, 8 margolarik 12 ordu behar dituzte.', 'Si 4 pintores tardan 6 horas, 8 pintores tardan 12 horas.', 'إذا احتاج 4 دهّانين إلى 6 ساعات، فإن 8 دهّانين يحتاجون إلى 12 ساعة.', 'If 4 painters take 6 hours, 8 painters take 12 hours.'),
            right: say('Margolari gehiago, denbora gutxiago: alderantzizkoa da. 8 margolarik erdia behar dute, 3 ordu.', 'Más pintores, menos tiempo: es inversa. 8 pintores tardan la mitad, 3 horas.', 'دهّانون أكثر، وقت أقل: تناسب عكسي. 8 دهّانين يحتاجون إلى النصف، 3 ساعات.', 'More painters, less time: it is inverse. 8 painters take half as long, 3 hours.')
        },
        check: {
            prompt: say('Zein magnitude-bikote da alderantziz proportzionala?', '¿Qué pareja de magnitudes es inversamente proporcional?', 'أيّ زوج من المقادير متناسب عكسيًا؟', 'Which pair of quantities is inversely proportional?'),
            options: [say('Bidaia baten abiadura eta denbora', 'Velocidad y tiempo de un viaje', 'سرعة رحلة ومدتها', 'Speed and time of a journey'), say('Fruta kiloak eta prezioa', 'Kilos de fruta y precio', 'كيلوغرامات الفاكهة وثمنها', 'Kilos of fruit and price'), say('Adina eta altuera', 'Edad y altura', 'العمر والطول', 'Age and height')],
            correctIndex: 0,
            explanation: say('Abiadura bikoizten bada, denbora erdia da: produktua, bidea, ez da aldatzen.', 'Si se dobla la velocidad, el tiempo es la mitad: el producto, el camino, no cambia.', 'إذا تضاعفت السرعة صار الوقت النصف: والناتج، أي المسافة، لا يتغير.', 'If the speed doubles, the time halves: the product, the distance, does not change.')
        }
    },
    'inverse-unit': {
        mistake: {
            wrong: say('6 langilek 4 egun behar badituzte, langile batek $4\\mathbin{:}6$ egun behar ditu.', 'Si 6 obreros tardan 4 días, 1 obrero tarda $4\\mathbin{:}6$ días.', 'إذا احتاج 6 عمال إلى 4 أيام، فإن عاملًا واحدًا يحتاج إلى $4\\mathbin{:}6$ يوم.', 'If 6 workers take 4 days, 1 worker takes $4\\mathbin{:}6$ days.'),
            right: say('Bakar batek gehiago behar du, ez gutxiago: $4\\cdot 6=24$ egun.', 'Uno solo tarda más, no menos: $4\\cdot 6=24$ días.', 'العامل الواحد يحتاج وقتًا أطول لا أقصر: $4\\cdot 6=24$ يومًا.', 'One on their own takes longer, not less: $4\\cdot 6=24$ days.')
        },
        check: {
            prompt: say('5 makinak lan bat 12 ordutan egiten dute. Zenbat behar dute 3 makinak?', '5 máquinas hacen un trabajo en 12 horas. ¿Cuánto tardan 3 máquinas?', '5 آلات تنجز عملًا في 12 ساعة. كم تحتاج 3 آلات؟', '5 machines do a job in 12 hours. How long do 3 machines take?'),
            options: [same('$20$'), same('$7{,}2$'), same('$36$')],
            correctIndex: 0,
            explanation: say('Makina batek $12\\cdot 5=60$ ordu; hiruk, $60\\mathbin{:}3=20$ ordu.', 'Una máquina, $12\\cdot 5=60$ horas; tres, $60\\mathbin{:}3=20$ horas.', 'آلة واحدة $12\\cdot 5=60$ ساعة؛ وثلاث $60\\mathbin{:}3=20$ ساعة.', 'One machine, $12\\cdot 5=60$ hours; three, $60\\mathbin{:}3=20$ hours.')
        }
    },
    'inverse-rule': {
        mistake: {
            wrong: say('60 km/h-ko abiaduran 3 ordu behar ditut; 90 km/h-ra: $\\frac{60}{3}=\\frac{90}{x}$, 4,5 ordu.', 'A 60 km/h tardo 3 horas; a 90 km/h: $\\frac{60}{3}=\\frac{90}{x}$, 4,5 horas.', 'بسرعة 60 كم/س أحتاج 3 ساعات؛ وبسرعة 90 كم/س: $\\frac{60}{3}=\\frac{90}{x}$، أي 4.5 ساعات.', 'At 60 km/h I take 3 hours; at 90 km/h: $\\frac{60}{3}=\\frac{90}{x}$, 4.5 hours.'),
            right: say('Abiadura gehiago, denbora gutxiago: alderantzizkoa. $60\\cdot 3=90\\cdot x$, eta $x=2$ ordu.', 'Más velocidad, menos tiempo: inversa. $60\\cdot 3=90\\cdot x$, y $x=2$ horas.', 'سرعة أكبر، وقت أقل: تناسب عكسي. $60\\cdot 3=90\\cdot x$، و$x=2$ ساعة.', 'More speed, less time: inverse. $60\\cdot 3=90\\cdot x$, and $x=2$ hours.')
        },
        check: {
            prompt: say('8 langilek obra bat 15 egunean egiten dute. Zenbat egun beharko dituzte 12 langilek?', '8 operarios hacen una obra en 15 días. ¿Cuántos días tardarán 12 operarios?', '8 عمال ينجزون ورشة في 15 يومًا. كم يومًا يحتاج 12 عاملًا؟', '8 workers finish a job in 15 days. How many days will 12 workers take?'),
            options: [same('$22{,}5$'), same('$10$'), same('$11$')],
            correctIndex: 1,
            explanation: say('Alderantzizkoa: $8\\cdot 15=12\\cdot x$; beraz, $x=120\\mathbin{:}12=10$ egun.', 'Inversa: $8\\cdot 15=12\\cdot x$, así que $x=120\\mathbin{:}12=10$ días.', 'تناسب عكسي: $8\\cdot 15=12\\cdot x$، إذن $x=120\\mathbin{:}12=10$ أيام.', 'Inverse: $8\\cdot 15=12\\cdot x$, so $x=120\\mathbin{:}12=10$ days.')
        }
    },

    /* ---------- 4. Percentages ---------- */
    'percent-meaning': {
        mistake: {
            wrong: say('%\u00a07 $0{,}7$ da.', 'El 7\u00a0% es $0{,}7$.', '7٪ هي $0{,}7$.', '7% is $0{,}7$.'),
            right: say('100 bakoitzeko 7 zazpi ehunen dira: $0{,}07$.', '7 de cada 100 son siete centésimas: $0{,}07$.', '7 من كل 100 تساوي سبعة أجزاء من مئة: $0{,}07$.', '7 out of every 100 is seven hundredths: $0{,}07$.')
        },
        check: {
            prompt: say('Zein ehuneko da $\\frac{3}{4}$?', '¿Qué porcentaje es $\\frac{3}{4}$?', 'ما النسبة المئوية المساوية لـ$\\frac{3}{4}$؟', 'Which percentage is $\\frac{3}{4}$?'),
            options: [say('%\u00a075', '75\u00a0%', '75٪', '75%'), say('%\u00a034', '34\u00a0%', '34٪', '34%'), say('%\u00a00,75', '0,75\u00a0%', '0.75٪', '0.75%')],
            correctIndex: 0,
            explanation: say('$\\frac{3}{4}=\\frac{75}{100}$: 100 bakoitzeko 75.', '$\\frac{3}{4}=\\frac{75}{100}$: 75 de cada 100.', '$\\frac{3}{4}=\\frac{75}{100}$: 75 من كل 100.', '$\\frac{3}{4}=\\frac{75}{100}$: 75 out of every 100.')
        }
    },
    'percent-of': {
        mistake: {
            wrong: say('50 zenbakiaren %\u00a020: $50\\mathbin{:}20=2{,}5$.', 'El 20\u00a0% de 50 es $50\\mathbin{:}20=2{,}5$.', '20٪ من 50 هي $50\\mathbin{:}20=2{,}5$.', '20% of 50 is $50\\mathbin{:}20=2{,}5$.'),
            right: say('$50\\cdot 20\\mathbin{:}100=10$ da: %\u00a020 bostena da.', 'Es $50\\cdot 20\\mathbin{:}100=10$: el 20\u00a0% es la quinta parte.', 'إنها $50\\cdot 20\\mathbin{:}100=10$: فـ20٪ هي الخُمس.', 'It is $50\\cdot 20\\mathbin{:}100=10$: 20% is a fifth.')
        },
        check: {
            prompt: say('Zenbat da 84 zenbakiaren %\u00a025?', '¿Cuánto es el 25\u00a0% de 84?', 'كم تساوي 25٪ من 84؟', 'What is 25% of 84?'),
            options: [same('$21$'), same('$59$'), same('$3{,}36$')],
            correctIndex: 0,
            explanation: say('%\u00a025 laurdena da: $84\\mathbin{:}4=21$.', 'El 25\u00a0% es la cuarta parte: $84\\mathbin{:}4=21$.', '25٪ هي الربع: $84\\mathbin{:}4=21$.', '25% is a quarter: $84\\mathbin{:}4=21$.')
        }
    },
    'which-percent': {
        mistake: {
            wrong: say('12 ikasle klasearen %\u00a040 badira, klaseak $12\\cdot 40\\mathbin{:}100=4{,}8$ ikasle ditu.', 'Si 12 alumnos son el 40\u00a0% de la clase, la clase tiene $12\\cdot 40\\mathbin{:}100=4{,}8$ alumnos.', 'إذا كان 12 طالبًا هم 40٪ من الصف، ففي الصف $12\\cdot 40\\mathbin{:}100=4{,}8$ طالب.', 'If 12 pupils are 40% of the class, the class has $12\\cdot 40\\mathbin{:}100=4{,}8$ pupils.'),
            right: say('Osoa bilatzen da: $12\\mathbin{:}40\\cdot 100=30$ ikasle.', 'Se busca el total: $12\\mathbin{:}40\\cdot 100=30$ alumnos.', 'نبحث عن الكل: $12\\mathbin{:}40\\cdot 100=30$ طالبًا.', 'You are looking for the whole: $12\\mathbin{:}40\\cdot 100=30$ pupils.')
        },
        check: {
            prompt: say('Zenbaki baten %\u00a020 14 bada, zein da zenbakia?', 'Si el 20\u00a0% de un número es 14, ¿cuál es el número?', 'إذا كانت 20٪ من عدد تساوي 14، فما العدد؟', 'If 20% of a number is 14, what is the number?'),
            options: [same('$70$'), same('$2{,}8$'), same('$280$')],
            correctIndex: 0,
            explanation: say('%\u00a01: $14\\mathbin{:}20=0{,}7$; %\u00a0100: $0{,}7\\cdot 100=70$.', 'El 1\u00a0%: $14\\mathbin{:}20=0{,}7$; el 100\u00a0%: $0{,}7\\cdot 100=70$.', '1٪: $14\\mathbin{:}20=0{,}7$؛ و100٪: $0{,}7\\cdot 100=70$.', '1%: $14\\mathbin{:}20=0{,}7$; 100%: $0{,}7\\cdot 100=70$.')
        }
    },

    /* ---------- 5. Discounts, increases and problems ---------- */
    discount: {
        mistake: {
            wrong: say('%\u00a030 merkatutako 90 euroko jaka batek $90-30=60$ euro balio du.', 'Una chaqueta de 90 € rebajada un 30\u00a0% cuesta $90-30=60$ €.', 'سترة ثمنها 90 يورو مخفّضة 30٪ ثمنها $90-30=60$ يورو.', 'A €90 jacket with 30% off costs $90-30=60$ euros.'),
            right: say('Prezioaren %\u00a030 kentzen da, 27 euro: $90-27=63$ euro balio du.', 'Se quita el 30\u00a0% del precio, 27 €: cuesta $90-27=63$ €.', 'نطرح 30٪ من الثمن، أي 27 يورو: الثمن $90-27=63$ يورو.', 'You take off 30% of the price, €27: it costs $90-27=63$ euros.')
        },
        check: {
            prompt: say('25 euroko liburu bat %\u00a010 merkatuta dago. Zenbat balio du?', 'Un libro de 25 € tiene un 10\u00a0% de descuento. ¿Cuánto cuesta?', 'كتاب ثمنه 25 يورو عليه خصم 10٪. كم ثمنه؟', 'A €25 book has 10% off. How much does it cost?'),
            options: [same('$15$'), same('$2{,}5$'), same('$22{,}5$')],
            correctIndex: 2,
            explanation: say('%\u00a090 ordaintzen da: $25\\cdot 0{,}9=22{,}5$ euro.', 'Se paga el 90\u00a0%: $25\\cdot 0{,}9=22{,}5$ €.', 'ندفع 90٪: $25\\cdot 0{,}9=22{,}5$ يورو.', 'You pay 90%: $25\\cdot 0{,}9=22{,}5$ euros.')
        }
    },
    increase: {
        mistake: {
            wrong: say('40 euroko prezio bati BEZaren %\u00a010 gehituta, $40\\cdot 0{,}1=4$ euro balio du.', 'Un precio de 40 € con un 10\u00a0% de IVA cuesta $40\\cdot 0{,}1=4$ €.', 'سعر 40 يورو مع ضريبة 10٪ يصبح $40\\cdot 0{,}1=4$ يورو.', 'A €40 price plus 10% VAT costs $40\\cdot 0{,}1=4$ euros.'),
            right: say('Igoera batu behar da: $40+4=44$ euro, edo $40\\cdot 1{,}1=44$ euro.', 'Hay que sumar el aumento: $40+4=44$ €, o $40\\cdot 1{,}1=44$ €.', 'يجب جمع الزيادة: $40+4=44$ يورو، أو $40\\cdot 1{,}1=44$ يورو.', 'You have to add the increase: $40+4=44$ euros, or $40\\cdot 1{,}1=44$ euros.')
        },
        check: {
            prompt: say('50 euroko abonamendu bat %\u00a08 igo da. Zenbat balio du orain?', 'Un abono de 50 € sube un 8\u00a0%. ¿Cuánto cuesta ahora?', 'اشتراك ثمنه 50 يورو زاد 8٪. كم ثمنه الآن؟', 'A €50 pass goes up by 8%. How much does it cost now?'),
            options: [same('$4$'), same('$54$'), same('$58$')],
            correctIndex: 1,
            explanation: say('Igoera $50\\cdot 8\\mathbin{:}100=4$ euro da: $50+4=54$ euro.', 'La subida es $50\\cdot 8\\mathbin{:}100=4$ €: $50+4=54$ €.', 'الزيادة $50\\cdot 8\\mathbin{:}100=4$ يورو: $50+4=54$ يورو.', 'The rise is $50\\cdot 8\\mathbin{:}100=4$ euros: $50+4=54$ euros.')
        }
    },
    problems: {
        mistake: {
            wrong: say('10 urteko haur batek 140 cm neurtzen baditu, 20 urterekin 280 cm neurtuko ditu.', 'Si un niño de 10 años mide 140 cm, con 20 años medirá 280 cm.', 'إذا كان طول طفل في العاشرة 140 سم، فسيكون طوله في العشرين 280 سم.', 'If a 10-year-old is 140 cm tall, at 20 they will be 280 cm tall.'),
            right: say('Adina eta altuera ez dira proportzionalak: ezin da hiruko erregela erabili.', 'La edad y la altura no son proporcionales: no se puede usar la regla de tres.', 'العمر والطول غير متناسبين: لا يمكن استعمال قاعدة الثلاثة.', 'Age and height are not proportional: you cannot use the rule of three.')
        },
        check: {
            prompt: say('Auto bat 80 km/h-ra doa eta 3 ordu behar ditu. Zer buruketa mota da 120 km/h-ra joanez gero?', 'Un coche a 80 km/h tarda 3 horas. ¿Qué tipo de problema es si va a 120 km/h?', 'سيارة بسرعة 80 كم/س تحتاج 3 ساعات. ما نوع المسألة إذا سارت بسرعة 120 كم/س؟', 'A car at 80 km/h takes 3 hours. What kind of problem is it if it goes at 120 km/h?'),
            options: [say('Zuzena', 'Directa', 'تناسب طردي', 'Direct'), say('Alderantzizkoa', 'Inversa', 'تناسب عكسي', 'Inverse'), say('Ez proportzionala', 'No proporcional', 'غير متناسب', 'Not proportional')],
            correctIndex: 1,
            explanation: say('Abiadura gehiago, denbora gutxiago: alderantzizkoa. $80\\cdot 3\\mathbin{:}120=2$ ordu beharko ditu.', 'Más velocidad, menos tiempo: inversa. Tardará $80\\cdot 3\\mathbin{:}120=2$ horas.', 'سرعة أكبر، وقت أقل: تناسب عكسي. ستحتاج إلى $80\\cdot 3\\mathbin{:}120=2$ ساعة.', 'More speed, less time: inverse. It will take $80\\cdot 3\\mathbin{:}120=2$ hours.')
        }
    }
}

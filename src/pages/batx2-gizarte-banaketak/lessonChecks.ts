import type { LessonCheck, LessonMistake, LocalizedText } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Banaketak · Batxilergoa 2 · Gizarte Zientziak — the typical mistake and
   the «Check it» question of every lesson. Plain data (no JSX) so the
   tests can import it; lessons.tsx merges it into the topics. The
   questions use new numbers, never those of «Let's solve» or of the
   example, and one of their wrong answers is the lesson's typical mistake.
   ========================================================================== */

export type DistributionsBatx2gTopicId =
    | 'random-variable' | 'mean-variance' | 'expected-gain'
    | 'is-binomial' | 'binomial-formula' | 'binomial-mean'
    | 'normal-curve' | 'standard-table' | 'standardize' | 'compare-scores' | 'inverse-normal'
    | 'characteristic-interval' | 'binomial-to-normal' | 'continuity'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const distributionsBatx2gLessonChecks: Record<DistributionsBatx2gTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    /* ---------- 1. Discrete random variables ---------- */
    'random-variable': {
        mistake: {
            wrong: say('$0{,}45$, $0{,}5$ eta $0{,}15$ probabilitateek banaketa bat osatzen dute.', 'Las probabilidades $0{,}45$, $0{,}5$ y $0{,}15$ forman una distribución.', 'الاحتمالات $0{,}45$ و$0{,}5$ و$0{,}15$ تكوّن توزيعًا.', 'The probabilities $0{,}45$, $0{,}5$ and $0{,}15$ make a distribution.'),
            right: say('$1{,}1$ egiten dute batuta: ezin da; 1 egin behar dute.', 'Suman $1{,}1$: no puede ser; tienen que sumar 1.', 'مجموعها $1{,}1$: هذا غير ممكن؛ يجب أن يكون 1.', 'They add up to $1{,}1$: impossible; they must add up to 1.')
        },
        check: {
            prompt: say('$X$ aldagaiak 1, 2 eta 3 balioak hartzen ditu, $0{,}5$, $0{,}3$ eta $k$ probabilitateekin. Zenbat da $k$?', '$X$ vale 1, 2 o 3 con probabilidades $0{,}5$, $0{,}3$ y $k$. ¿Cuánto vale $k$?', 'يأخذ $X$ القيم 1 و2 و3 باحتمالات $0{,}5$ و$0{,}3$ و$k$. كم يساوي $k$؟', '$X$ takes 1, 2 or 3 with probabilities $0{,}5$, $0{,}3$ and $k$. What is $k$?'),
            options: [same('$0{,}2$'), same('$0{,}8$'), same('$0{,}25$')],
            correctIndex: 0,
            explanation: same('$k=1-0{,}5-0{,}3=0{,}2$')
        }
    },
    'mean-variance': {
        mistake: {
            wrong: say('$X$ = 0, 1, 2, $0{,}6$, $0{,}3$ eta $0{,}1$ probabilitateekin: $\\mu=\\frac{0+1+2}{3}=1$.', '$X$ = 0, 1, 2 con probabilidades $0{,}6$, $0{,}3$ y $0{,}1$: $\\mu=\\frac{0+1+2}{3}=1$.', '$X$ = 0 و1 و2 باحتمالات $0{,}6$ و$0{,}3$ و$0{,}1$: $\\mu=\\frac{0+1+2}{3}=1$.', '$X$ = 0, 1, 2 with probabilities $0{,}6$, $0{,}3$ and $0{,}1$: $\\mu=\\frac{0+1+2}{3}=1$.'),
            right: say('Balio bakoitzak bere probabilitatearen pisua du: $\\mu=0{,}3+0{,}2=0{,}5$.', 'Cada valor pesa su probabilidad: $\\mu=0{,}3+0{,}2=0{,}5$.', 'لكل قيمة وزن احتمالها: $\\mu=0{,}3+0{,}2=0{,}5$.', 'Each value weighs its probability: $\\mu=0{,}3+0{,}2=0{,}5$.')
        },
        check: {
            prompt: say('$X$ aldagaiak 0 edo 2 balio du, bakoitza $0{,}5$ probabilitatearekin. Zenbat da $\\sigma$?', '$X$ vale 0 o 2, cada uno con probabilidad $0{,}5$. ¿Cuánto vale $\\sigma$?', 'يأخذ $X$ القيمة 0 أو 2، كلًّا باحتمال $0{,}5$. كم يساوي $\\sigma$؟', '$X$ takes 0 or 2, each with probability $0{,}5$. What is $\\sigma$?'),
            options: [same('$2$'), same('$1$'), same('$0{,}5$')],
            correctIndex: 1,
            explanation: same('$\\mu=1\\qquad\\sigma^2=2-1^2=1\\qquad\\sigma=1$')
        }
    },
    'expected-gain': {
        mistake: {
            wrong: say('Joko batek 1 € balio du eta 5 € ordaintzen ditu $0{,}2$ probabilitatearekin: irabazia $5\\cdot 0{,}2=1$ €.', 'Un juego cuesta 1 € y paga 5 € con probabilidad $0{,}2$: la ganancia es $5\\cdot 0{,}2=1$ €.', 'تكلّف لعبة 1 € وتدفع 5 € باحتمال $0{,}2$: الربح $5\\cdot 0{,}2=1$ €.', 'A game costs €1 and pays €5 with probability $0{,}2$: the gain is $5\\cdot 0{,}2=1$ €.'),
            right: say('Ordaindutakoa kendu behar da: $1-1=0$, joko bidezkoa da.', 'Hay que restar lo que se paga: $1-1=0$, es un juego justo.', 'يجب طرح ما يُدفع: $1-1=0$، إنها لعبة عادلة.', 'What is paid must be taken away: $1-1=0$, it is a fair game.')
        },
        check: {
            prompt: say('Apustu batek 3 € balio du, eta 20 € irabazten dira $0{,}1$ probabilitatearekin. Zein da espero den irabazia?', 'Una apuesta cuesta 3 € y se ganan 20 € con probabilidad $0{,}1$. ¿Cuál es la ganancia esperada?', 'يكلّف رهان 3 € ويُربح 20 € باحتمال $0{,}1$. ما الربح المتوقع؟', 'A bet costs €3 and wins €20 with probability $0{,}1$. What is the expected gain?'),
            options: [same('$2$'), same('$17$'), same('$-1$')],
            correctIndex: 2,
            explanation: same('$20\\cdot 0{,}1-3=2-3=-1$')
        }
    },

    /* ---------- 2. The binomial distribution ---------- */
    'is-binomial': {
        mistake: {
            wrong: say('12 kartako sorta batetik 3 atera, itzuli gabe, eta irudiak zenbatzea: $B(3;\\,0{,}25)$.', 'Sacar 3 cartas sin devolver de un mazo de 12 y contar figuras: $B(3;\\,0{,}25)$.', 'سحب 3 أوراق دون إرجاع من رزمة من 12 وعدّ الصور: $B(3;\\,0{,}25)$.', 'Drawing 3 cards without replacement from a pack of 12 and counting face cards: $B(3;\\,0{,}25)$.'),
            right: say('Talde txiki batean itzuli gabe, $p$ aldatu egiten da: ez da binomiala.', 'Sin devolución en un grupo pequeño, $p$ cambia: no es binomial.', 'دون إرجاع في مجموعة صغيرة يتغير $p$: ليس ثنائيًّا.', 'Without replacement in a small group, $p$ changes: it is not binomial.')
        },
        check: {
            prompt: say('Zein da binomiala?', '¿Cuál es binomial?', 'أيها ثنائي؟', 'Which one is binomial?'),
            options: [
                say('Herrialde bateko 50 pertsonari egunkaria irakurtzen duten galdetzea', 'Preguntar a 50 personas de un país si leen la prensa', 'سؤال 50 شخصًا في بلد هل يقرؤون الصحف', 'Asking 50 people in a country whether they read the paper'),
                say('6 lagunetatik 2 aukeratu eta neskak zenbatzea', 'Elegir 2 de 6 amigos y contar las chicas', 'اختيار 2 من 6 أصدقاء وعدّ الفتيات', 'Choosing 2 of 6 friends and counting the girls'),
                say('Dado bat botatzea sei bat atera arte', 'Lanzar un dado hasta sacar un seis', 'رمي نرد حتى يظهر ستة', 'Rolling a die until a six comes up')
            ],
            correctIndex: 0,
            explanation: say('50 proba, bi erantzun eta $p$ bera: binomiala. Besteetan $p$ aldatzen da edo $n$ ez dago finkatuta.', '50 pruebas, dos respuestas y la misma $p$: binomial. En las otras $p$ cambia o $n$ no está fijado.', '50 تجربة وإجابتان و$p$ نفسه: ثنائي. وفي الأخريين يتغير $p$ أو لا يكون $n$ محددًا.', '50 trials, two answers and the same $p$: binomial. In the others $p$ changes or $n$ is not fixed.')
        }
    },
    'binomial-formula': {
        mistake: {
            wrong: say('$B(6;\\,0{,}5)$ banaketan, $P(X=2)=0{,}5^2\\cdot 0{,}5^4=0{,}015625$.', 'En $B(6;\\,0{,}5)$, $P(X=2)=0{,}5^2\\cdot 0{,}5^4=0{,}015625$.', 'في $B(6;\\,0{,}5)$، $P(X=2)=0{,}5^2\\cdot 0{,}5^4=0{,}015625$.', 'In $B(6;\\,0{,}5)$, $P(X=2)=0{,}5^2\\cdot 0{,}5^4=0{,}015625$.'),
            right: say('Ordenak falta dira: $\\binom{6}{2}\\cdot 0{,}015625=0{,}234375$.', 'Faltan los órdenes: $\\binom{6}{2}\\cdot 0{,}015625=0{,}234375$.', 'تنقص الترتيبات: $\\binom{6}{2}\\cdot 0{,}015625=0{,}234375$.', 'The orders are missing: $\\binom{6}{2}\\cdot 0{,}015625=0{,}234375$.')
        },
        check: {
            prompt: say('$X\\sim B(3;\\,0{,}2)$. Zenbat da $P(X=0)$?', '$X\\sim B(3;\\,0{,}2)$. ¿Cuánto vale $P(X=0)$?', '$X\\sim B(3;\\,0{,}2)$. كم يساوي $P(X=0)$؟', '$X\\sim B(3;\\,0{,}2)$. What is $P(X=0)$?'),
            options: [same('$0{,}008$'), same('$0{,}512$'), same('$0{,}488$')],
            correctIndex: 1,
            explanation: same('$P(X=0)=0{,}8^3=0{,}512$')
        }
    },
    'binomial-mean': {
        mistake: {
            wrong: say('$B(100;\\,0{,}5)$ banaketaren desbideratze tipikoa $npq=25$ da.', 'La desviación típica de $B(100;\\,0{,}5)$ es $npq=25$.', 'الانحراف المعياري لـ $B(100;\\,0{,}5)$ هو $npq=25$.', 'The standard deviation of $B(100;\\,0{,}5)$ is $npq=25$.'),
            right: say('$npq$ bariantza da; $\\sigma=\\sqrt{25}=5$.', '$npq$ es la varianza; $\\sigma=\\sqrt{25}=5$.', '$npq$ هو التباين؛ $\\sigma=\\sqrt{25}=5$.', '$npq$ is the variance; $\\sigma=\\sqrt{25}=5$.')
        },
        check: {
            prompt: say('$X\\sim B(50;\\,0{,}4)$. Zenbat da $\\mu$?', '$X\\sim B(50;\\,0{,}4)$. ¿Cuánto vale $\\mu$?', '$X\\sim B(50;\\,0{,}4)$. كم يساوي $\\mu$؟', '$X\\sim B(50;\\,0{,}4)$. What is $\\mu$?'),
            options: [same('$12$'), same('$30$'), same('$20$')],
            correctIndex: 2,
            explanation: same('$\\mu=50\\cdot 0{,}4=20$')
        }
    },

    /* ---------- 3. The normal distribution ---------- */
    'normal-curve': {
        mistake: {
            wrong: say('$N(70;\\,10)$ banaketan, % 95 dago 60 eta 80 artean.', 'En una $N(70;\\,10)$, el 95 % está entre 60 y 80.', 'في $N(70;\\,10)$ تقع 95 % بين 60 و80.', 'In an $N(70;\\,10)$, 95% lies between 60 and 80.'),
            right: say('60 eta 80 dira $\\mu\\pm\\sigma$: % 68 inguru. % 95 inguru 50 eta 90 artean dago.', '60 y 80 son $\\mu\\pm\\sigma$: cerca del 68 %. El 95 % está entre 50 y 90.', '60 و80 هما $\\mu\\pm\\sigma$: نحو 68 %. أما 95 % فبين 50 و90.', '60 and 80 are $\\mu\\pm\\sigma$: about 68%. 95% lies between 50 and 90.')
        },
        check: {
            prompt: say('$N(200;\\,25)$ banaketan, zein balio da $\\mu+2\\sigma$?', 'En una $N(200;\\,25)$, ¿qué valor es $\\mu+2\\sigma$?', 'في $N(200;\\,25)$، ما القيمة $\\mu+2\\sigma$؟', 'In an $N(200;\\,25)$, which value is $\\mu+2\\sigma$?'),
            options: [same('$225$'), same('$250$'), same('$400$')],
            correctIndex: 1,
            explanation: same('$200+2\\cdot 25=250$')
        }
    },
    'standard-table': {
        mistake: {
            wrong: same('$P(Z>0{,}5)=0{,}6915$'),
            right: say('Hori $P(Z\\le 0{,}5)$ da; $P(Z>0{,}5)=1-0{,}6915=0{,}3085$.', 'Eso es $P(Z\\le 0{,}5)$; $P(Z>0{,}5)=1-0{,}6915=0{,}3085$.', 'ذلك $P(Z\\le 0{,}5)$؛ و$P(Z>0{,}5)=1-0{,}6915=0{,}3085$.', 'That is $P(Z\\le 0{,}5)$; $P(Z>0{,}5)=1-0{,}6915=0{,}3085$.')
        },
        check: {
            prompt: say('Zenbat da $P(Z\\le -1)$?', '¿Cuánto vale $P(Z\\le -1)$?', 'كم يساوي $P(Z\\le -1)$؟', 'What is $P(Z\\le -1)$?'),
            options: [same('$0{,}8413$'), same('$0{,}1587$'), same('$-0{,}8413$')],
            correctIndex: 1,
            explanation: say('Simetriaz: $P(Z\\le -1)=1-0{,}8413=0{,}1587$.', 'Por simetría: $P(Z\\le -1)=1-0{,}8413=0{,}1587$.', 'بالتماثل: $P(Z\\le -1)=1-0{,}8413=0{,}1587$.', 'By symmetry: $P(Z\\le -1)=1-0{,}8413=0{,}1587$.')
        }
    },
    standardize: {
        mistake: {
            wrong: say('$N(50;\\,4)$ banaketan: ${z}=\\frac{58-50}{16}=0{,}5$.', 'En una $N(50;\\,4)$: ${z}=\\frac{58-50}{16}=0{,}5$.', 'في $N(50;\\,4)$: ${z}=\\frac{58-50}{16}=0{,}5$.', 'In an $N(50;\\,4)$: ${z}=\\frac{58-50}{16}=0{,}5$.'),
            right: say('$\\sigma$ zenbakiaz zatitzen da, ez bariantzaz: ${z}=\\frac{58-50}{4}=2$.', 'Se divide entre $\\sigma$, no entre la varianza: ${z}=\\frac{58-50}{4}=2$.', 'نقسم على $\\sigma$ لا على التباين: ${z}=\\frac{58-50}{4}=2$.', 'Divide by $\\sigma$, not by the variance: ${z}=\\frac{58-50}{4}=2$.')
        },
        check: {
            prompt: say('$N(30;\\,5)$ banaketan, zein da $x=22$ balioaren ${z}$?', 'En una $N(30;\\,5)$, ¿cuál es la ${z}$ de $x=22$?', 'في $N(30;\\,5)$، ما قيمة ${z}$ لـ $x=22$؟', 'In an $N(30;\\,5)$, what is the ${z}$ of $x=22$?'),
            options: [same('$1{,}6$'), same('$-8$'), same('$-1{,}6$')],
            correctIndex: 2,
            explanation: same('${z}=\\frac{22-30}{5}=-1{,}6$')
        }
    },
    'compare-scores': {
        mistake: {
            wrong: say('80 puntuko emaitza bat 7 nota baino hobea da, 80 handiagoa delako.', 'Un resultado de 80 puntos es mejor que un 7 porque 80 es mayor.', 'نتيجة 80 نقطة أفضل من 7 لأن 80 أكبر.', 'A result of 80 points is better than a 7 because 80 is bigger.'),
            right: say('Eskala desberdinak dira: haien ${z}$ konparatzen dira, ez notak.', 'Son escalas distintas: se comparan sus ${z}$, no las notas.', 'إنهما مقياسان مختلفان: نقارن قيم ${z}$ لا الدرجات.', 'They are different scales: compare their ${z}$, not the marks.')
        },
        check: {
            prompt: say('Mikelek 62 $N(50;\\,8)$ banaketan; Leirek 8 $N(6;\\,1{,}6)$ banaketan. Nork nabarmentzen du gehiago?', 'Mikel saca 62 en una $N(50;\\,8)$; Leire, 8 en una $N(6;\\,1{,}6)$. ¿Quién destaca más?', 'حصل ميكيل على 62 في $N(50;\\,8)$، وليري على 8 في $N(6;\\,1{,}6)$. من يتميز أكثر؟', 'Mikel scores 62 in an $N(50;\\,8)$; Leire, 8 in an $N(6;\\,1{,}6)$. Who stands out more?'),
            options: [say('Mikelek', 'Mikel', 'ميكيل', 'Mikel does'), say('Leirek', 'Leire', 'ليري', 'Leire does'), say('Berdin', 'Igual', 'متساويان', 'The same')],
            correctIndex: 0,
            explanation: same('${z}=\\frac{62-50}{8}=1{,}5\\qquad z=\\frac{8-6}{1{,}6}=1{,}25$')
        }
    },
    'inverse-normal': {
        mistake: {
            wrong: say('$N(60;\\,5)$ banaketaren % 20 onenaren muga: $P(Z\\le k)=0{,}2$.', 'El corte del 20 % mejor de una $N(60;\\,5)$: $P(Z\\le k)=0{,}2$.', 'حد أفضل 20 % في $N(60;\\,5)$: $P(Z\\le k)=0{,}2$.', 'The cut-off of the best 20% of an $N(60;\\,5)$: $P(Z\\le k)=0{,}2$.'),
            right: say('Mugaren azpian % 80 dago: $P(Z\\le k)=0{,}8$, $k=0{,}84$ eta $x=64{,}2$.', 'Por debajo del corte queda el 80 %: $P(Z\\le k)=0{,}8$, $k=0{,}84$ y $x=64{,}2$.', 'تحت الحد 80 %: $P(Z\\le k)=0{,}8$، و$k=0{,}84$ و$x=64{,}2$.', 'Below the cut lies 80%: $P(Z\\le k)=0{,}8$, $k=0{,}84$ and $x=64{,}2$.')
        },
        check: {
            prompt: say('$N(100;\\,10)$ banaketan, puntu gutxien dituzten % 20 zein balioren azpian daude?', 'En una $N(100;\\,10)$, ¿por debajo de qué valor está el 20 % con menos puntos?', 'في $N(100;\\,10)$، تحت أي قيمة تقع 20 % الأقل نقاطًا؟', 'In an $N(100;\\,10)$, below what value are the 20% with the fewest points?'),
            options: [same('$108{,}4$'), same('$91{,}6$'), same('$80$')],
            correctIndex: 1,
            explanation: same('$P(Z\\le k)=0{,}2\\ \\to\\ k=-0{,}84\\ \\to\\ x=100-8{,}4=91{,}6$')
        }
    },

    /* ---------- 4. Intervals and approximation ---------- */
    'characteristic-interval': {
        mistake: {
            wrong: say('$N(50;\\,4)$ banaketaren tartea, % 95 probabilitatearekin: $50\\pm 1{,}96=(48{,}04;\\ 51{,}96)$.', 'El intervalo del 95 % de una $N(50;\\,4)$: $50\\pm 1{,}96=(48{,}04;\\ 51{,}96)$.', 'فترة 95 % لـ $N(50;\\,4)$: $50\\pm 1{,}96=(48{,}04;\\ 51{,}96)$.', 'The 95% interval of an $N(50;\\,4)$: $50\\pm 1{,}96=(48{,}04;\\ 51{,}96)$.'),
            right: say('Erradioa $1{,}96\\cdot\\sigma=7{,}84$ da: $(42{,}16;\\ 57{,}84)$.', 'El radio es $1{,}96\\cdot\\sigma=7{,}84$: $(42{,}16;\\ 57{,}84)$.', 'نصف القطر $1{,}96\\cdot\\sigma=7{,}84$: $(42{,}16;\\ 57{,}84)$.', 'The radius is $1{,}96\\cdot\\sigma=7{,}84$: $(42{,}16;\\ 57{,}84)$.')
        },
        check: {
            prompt: say('Zein da $N(200;\\,10)$ banaketaren tarte karakteristikoa, % 99 probabilitatearekin?', '¿Cuál es el intervalo característico del 99 % de una $N(200;\\,10)$?', 'ما الفترة المميزة لـ 99 % في $N(200;\\,10)$؟', 'What is the 99% characteristic interval of an $N(200;\\,10)$?'),
            options: [same('$(174{,}25;\\ 225{,}75)$'), same('$(180{,}4;\\ 219{,}6)$'), same('$(197{,}425;\\ 202{,}575)$')],
            correctIndex: 0,
            explanation: same('$2{,}575\\cdot 10=25{,}75\\ \\to\\ (174{,}25;\\ 225{,}75)$')
        }
    },
    'binomial-to-normal': {
        mistake: {
            wrong: say('$B(20;\\,0{,}1)$ banaketa $N(2;\\,1{,}34)$ banaketarekin hurbiltzen da.', 'La $B(20;\\,0{,}1)$ se aproxima por la $N(2;\\,1{,}34)$.', 'يُقرَّب $B(20;\\,0{,}1)$ بـ $N(2;\\,1{,}34)$.', '$B(20;\\,0{,}1)$ is approximated by $N(2;\\,1{,}34)$.'),
            right: say('$np=2<5$: ezin da normalarekin hurbildu.', '$np=2<5$: no se puede aproximar por la normal.', '$np=2<5$: لا يمكن التقريب بالطبيعي.', '$np=2<5$: it cannot be approximated by the normal.')
        },
        check: {
            prompt: say('$X\\sim B(64;\\,0{,}5)$. Zein normalekin hurbiltzen da?', '$X\\sim B(64;\\,0{,}5)$. ¿Por qué normal se aproxima?', '$X\\sim B(64;\\,0{,}5)$. بأي توزيع طبيعي يُقرَّب؟', '$X\\sim B(64;\\,0{,}5)$. Which normal approximates it?'),
            options: [same('$N(32;\\,16)$'), same('$N(32;\\,4)$'), same('$N(64;\\,0{,}5)$')],
            correctIndex: 1,
            explanation: same('$\\mu=32\\qquad\\sigma=\\sqrt{64\\cdot 0{,}5\\cdot 0{,}5}=4$')
        }
    },
    continuity: {
        mistake: {
            wrong: same('$P(X\\le 45)\\approx P(Y\\le 44{,}5)$'),
            right: say('$\\le$ ikurrak 45 barra sartzen du: $P(Y\\le 45{,}5)$.', 'El $\\le$ incluye la barra del 45: $P(Y\\le 45{,}5)$.', 'تشمل $\\le$ عمود 45: $P(Y\\le 45{,}5)$.', 'The $\\le$ includes the bar of 45: $P(Y\\le 45{,}5)$.')
        },
        check: {
            prompt: say('$N(50;\\,5)$ banaketarekin hurbilduz, zenbat da $P(X=50)$ gutxi gorabehera?', 'Aproximando por la $N(50;\\,5)$, ¿cuánto vale aproximadamente $P(X=50)$?', 'بالتقريب بـ $N(50;\\,5)$، كم يساوي $P(X=50)$ تقريبًا؟', 'Approximating by $N(50;\\,5)$, what is $P(X=50)$ roughly?'),
            options: [same('$0{,}0796$'), same('$0$'), same('$0{,}5398$')],
            correctIndex: 0,
            explanation: same('$P(49{,}5\\le Y\\le 50{,}5)=P(-0{,}1\\le Z\\le 0{,}1)=2\\cdot 0{,}5398-1=0{,}0796$')
        }
    }
}

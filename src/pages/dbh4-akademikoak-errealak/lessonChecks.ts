import type { LessonCheck, LessonMistake, LocalizedText } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Zenbaki errealak eta ehunekoak · 4. DBH akademikoak — the typical mistake
   and the «Check it» question of every lesson. Plain data (no JSX) so the
   tests can import it; lessons.tsx merges it into the topics. The questions
   use new numbers, never those of «Let's solve» or of the example, and one
   of their wrong answers is the lesson's typical mistake. Arabic writes the
   decimal point ({,} becomes .).
   ========================================================================== */

export type RealsPercentTopicId = 'decimal-kinds' | 'generatrix' | 'order-density' | 'irrational' | 'number-sets' | 'represent' | 'successive' | 'intervals' | 'interval-ops' | 'rounding' | 'errors' | 'percent-basics' | 'percent-change' | 'chained' | 'percent-inverse' | 'simple-interest' | 'compound-interest' | 'interest-compare'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const realsPercentLessonChecks: Record<RealsPercentTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    'decimal-kinds': {
        mistake: {
            wrong: say('$\\frac{7}{14}$ periodikoa da, 14 zenbakiak 7 faktorea duelako.', '$\\frac{7}{14}$ es periódico, porque 14 tiene el factor 7.', '$\\frac{7}{14}$ دوري لأن في 14 العامل 7.', '$\\frac{7}{14}$ is recurring, because 14 has the factor 7.'),
            right: say('Lehenik sinplifikatu: $\\frac{7}{14}=\\frac{1}{2}$, eta 2 faktoreak zehatza ematen du: $0{,}5$.', 'Primero simplifica: $\\frac{7}{14}=\\frac{1}{2}$, y el 2 da un decimal exacto: $0{,}5$.', 'بسّط أولًا: $\\frac{7}{14}=\\frac{1}{2}$، والعامل 2 يعطي عددًا عشريًا منتهيًا: $0{,}5$.', 'Simplify first: $\\frac{7}{14}=\\frac{1}{2}$, and 2 gives a terminating decimal: $0{,}5$.')
        },
        check: {
            prompt: say('Zer hamartar mota ematen du $\\frac{9}{12}$ zatikiak?', '¿Qué tipo de decimal da $\\frac{9}{12}$?', 'ما نوع العدد العشري الذي يعطيه $\\frac{9}{12}$؟', 'What type of decimal does $\\frac{9}{12}$ give?'),
            options: [
                say('Zehatza', 'Exacto', 'منتهٍ', 'Terminating'),
                say('Periodiko mistoa', 'Periódico mixto', 'دوري مختلط', 'Mixed recurring'),
                say('Periodiko hutsa', 'Periódico puro', 'دوري بحت', 'Purely recurring')
            ],
            correctIndex: 0,
            explanation: say('$\\frac{9}{12}=\\frac{3}{4}$ eta $4=2^{2}$: zehatza da, $0{,}75$.', '$\\frac{9}{12}=\\frac{3}{4}$ y $4=2^{2}$: es exacto, $0{,}75$.', '$\\frac{9}{12}=\\frac{3}{4}$ و$4=2^{2}$: إنه منتهٍ، $0{,}75$.', '$\\frac{9}{12}=\\frac{3}{4}$ and $4=2^{2}$: it terminates, $0{,}75$.')
        }
    },
    generatrix: {
        mistake: {
            wrong: say('$0{,}4\\overline{1}$ zenbakiaren zatiki sortzailea $\\frac{41}{90}$ da.', 'La generatriz de $0{,}4\\overline{1}$ es $\\frac{41}{90}$.', 'الكسر المولّد للعدد $0{,}4\\overline{1}$ هو $\\frac{41}{90}$.', 'The generating fraction of $0{,}4\\overline{1}$ is $\\frac{41}{90}$.'),
            right: say('Zenbakitzaileari periodoaren aurrekoa kendu behar zaio: $\\frac{41-4}{90}=\\frac{37}{90}$.', 'Al numerador hay que restarle lo anterior al periodo: $\\frac{41-4}{90}=\\frac{37}{90}$.', 'يجب أن نطرح من البسط ما قبل الدور: $\\frac{41-4}{90}=\\frac{37}{90}$.', 'You must take the part before the recurring digits off the numerator: $\\frac{41-4}{90}=\\frac{37}{90}$.')
        },
        check: {
            prompt: say('Zein da $1{,}0\\overline{6}$ zenbakiaren zatiki sortzailea?', '¿Cuál es la fracción generatriz de $1{,}0\\overline{6}$?', 'ما الكسر المولّد للعدد $1{,}0\\overline{6}$؟', 'What is the generating fraction of $1{,}0\\overline{6}$?'),
            options: [same('$\\frac{106}{90}$'), same('$\\frac{16}{15}$'), same('$\\frac{96}{99}$')],
            correctIndex: 1,
            explanation: say('$106-10=96$, eta $\\frac{96}{90}=\\frac{16}{15}$.', '$106-10=96$, y $\\frac{96}{90}=\\frac{16}{15}$.', '$106-10=96$، و$\\frac{96}{90}=\\frac{16}{15}$.', '$106-10=96$, and $\\frac{96}{90}=\\frac{16}{15}$.')
        }
    },
    'order-density': {
        mistake: {
            wrong: say('$0{,}\\overline{2}<0{,}21$, zifra gutxiago dituelako.', '$0{,}\\overline{2}<0{,}21$, porque tiene menos cifras.', '$0{,}\\overline{2}<0{,}21$ لأن أرقامه أقل.', '$0{,}\\overline{2}<0{,}21$, because it has fewer digits.'),
            right: say('Idatzi zifra batzuk: $0{,}2222\\ldots>0{,}2100$.', 'Escribe varias cifras: $0{,}2222\\ldots>0{,}2100$.', 'اكتب عدة أرقام: $0{,}2222\\ldots>0{,}2100$.', 'Write out several digits: $0{,}2222\\ldots>0{,}2100$.')
        },
        check: {
            prompt: say('Zein da handiena?', '¿Cuál es el mayor?', 'أيّها الأكبر؟', 'Which is the greatest?'),
            options: [same('$0{,}66$'), same('$0{,}\\overline{6}$'), same('$0{,}6\\overline{5}$')],
            correctIndex: 1,
            explanation: say('$0{,}6666\\ldots$ handiagoa da $0{,}6600$ eta $0{,}6555\\ldots$ baino.', '$0{,}6666\\ldots$ es mayor que $0{,}6600$ y que $0{,}6555\\ldots$', '$0{,}6666\\ldots$ أكبر من $0{,}6600$ ومن $0{,}6555\\ldots$', '$0{,}6666\\ldots$ is greater than $0{,}6600$ and $0{,}6555\\ldots$')
        }
    },
    irrational: {
        mistake: {
            wrong: say('$\\sqrt{49}$ irrazionala da, erro bat delako.', '$\\sqrt{49}$ es irracional, porque es una raíz.', '$\\sqrt{49}$ غير نسبي لأنه جذر.', '$\\sqrt{49}$ is irrational, because it is a root.'),
            right: say('49 karratu perfektua da: $\\sqrt{49}=7$, arrazionala. Karratu perfektuak ez diren zenbaki osoen erroak dira irrazionalak.', '49 es un cuadrado perfecto: $\\sqrt{49}=7$, racional. Son irracionales las raíces de los enteros que no son cuadrados perfectos.', '49 مربع كامل: $\\sqrt{49}=7$ عدد نسبي. أما جذور الأعداد الصحيحة التي ليست مربعات كاملة فهي غير نسبية.', '49 is a perfect square: $\\sqrt{49}=7$, rational. It is the roots of integers that are not perfect squares that are irrational.')
        },
        check: {
            prompt: say('Zenbaki hauetatik, zein da irrazionala?', '¿Cuál de estos números es irracional?', 'أيّ هذه الأعداد غير نسبي؟', 'Which of these numbers is irrational?'),
            options: [same('$\\sqrt{0{,}25}$'), same('$\\sqrt{12}$'), same('$2{,}\\overline{3}$')],
            correctIndex: 1,
            explanation: say('12 ez da karratu perfektua, beraz $\\sqrt{12}$ irrazionala da; $\\sqrt{0{,}25}=0{,}5$ eta $2{,}\\overline{3}=\\frac{7}{3}$.', '12 no es un cuadrado perfecto, así que $\\sqrt{12}$ es irracional; $\\sqrt{0{,}25}=0{,}5$ y $2{,}\\overline{3}=\\frac{7}{3}$.', '12 ليس مربعًا كاملًا، لذا $\\sqrt{12}$ غير نسبي؛ و$\\sqrt{0{,}25}=0{,}5$ و$2{,}\\overline{3}=\\frac{7}{3}$.', '12 is not a perfect square, so $\\sqrt{12}$ is irrational; $\\sqrt{0{,}25}=0{,}5$ and $2{,}\\overline{3}=\\frac{7}{3}$.')
        }
    },
    'number-sets': {
        mistake: {
            wrong: say('$\\frac{12}{4}$ zenbaki arrazionala da, baina ez naturala.', '$\\frac{12}{4}$ es racional, pero no natural.', '$\\frac{12}{4}$ عدد نسبي لكنه ليس طبيعيًا.', '$\\frac{12}{4}$ is rational, but not natural.'),
            right: say('Lehenik sinplifikatu: $\\frac{12}{4}=3$, naturala (eta osoa eta arrazionala ere bai).', 'Simplifica primero: $\\frac{12}{4}=3$, que es natural (y también entero y racional).', 'بسّط أولًا: $\\frac{12}{4}=3$ عدد طبيعي (وصحيح ونسبي أيضًا).', 'Simplify first: $\\frac{12}{4}=3$, which is natural (and also an integer and rational).')
        },
        check: {
            prompt: say('Zein da $\\sqrt{\\frac{36}{4}}$ zenbakia duen multzorik txikiena?', '¿Cuál es el conjunto más pequeño que contiene $\\sqrt{\\frac{36}{4}}$?', 'ما أصغر مجموعة تحتوي $\\sqrt{\\frac{36}{4}}$؟', 'What is the smallest set that contains $\\sqrt{\\frac{36}{4}}$?'),
            options: [same('$\\mathbb{Q}$'), same('$\\mathbb{I}$'), same('$\\mathbb{N}$')],
            correctIndex: 2,
            explanation: say('$\\sqrt{\\frac{36}{4}}=\\sqrt{9}=3$, zenbaki naturala.', '$\\sqrt{\\frac{36}{4}}=\\sqrt{9}=3$, un número natural.', '$\\sqrt{\\frac{36}{4}}=\\sqrt{9}=3$ عدد طبيعي.', '$\\sqrt{\\frac{36}{4}}=\\sqrt{9}=3$, a natural number.')
        }
    },
    represent: {
        mistake: {
            wrong: say('$\\sqrt{13}$ kokatzeko, 13 batzen duten katetoak: 12 eta 1.', 'Para $\\sqrt{13}$, unos catetos que sumen 13: 12 y 1.', 'لوضع $\\sqrt{13}$ نأخذ ضلعين قائمين مجموعهما 13: 12 و1.', 'For $\\sqrt{13}$, take legs that add up to 13: 12 and 1.'),
            right: say('Karratuen baturak eman behar du 13: $13=3^{2}+2^{2}$, beraz katetoak 3 eta 2 dira.', 'Son los cuadrados los que suman 13: $13=3^{2}+2^{2}$, así que los catetos son 3 y 2.', 'المربعان هما اللذان مجموعهما 13: $13=3^{2}+2^{2}$، فالضلعان القائمان 3 و2.', 'It is the squares that add up to 13: $13=3^{2}+2^{2}$, so the legs are 3 and 2.')
        },
        check: {
            prompt: say('Zein katetok ematen dute $\\sqrt{20}$ neurriko hipotenusa?', '¿Qué catetos dan una hipotenusa de $\\sqrt{20}$?', 'أيّ ضلعين قائمين يعطيان وترًا طوله $\\sqrt{20}$؟', 'Which legs give a hypotenuse of $\\sqrt{20}$?'),
            options: [
                say('$5$ eta $4$', '$5$ y $4$', '$5$ و$4$', '$5$ and $4$'),
                say('$4$ eta $2$', '$4$ y $2$', '$4$ و$2$', '$4$ and $2$'),
                say('$19$ eta $1$', '$19$ y $1$', '$19$ و$1$', '$19$ and $1$')
            ],
            correctIndex: 1,
            explanation: same('$4^{2}+2^{2}=16+4=20$')
        }
    },
    successive: {
        mistake: {
            wrong: say('Zoom bakoitzak tartea erdira txikitzen du.', 'Cada zoom hace el intervalo la mitad de pequeño.', 'كل تكبير يجعل الفترة نصف ما كانت.', 'Each zoom makes the interval half as long.'),
            right: say('Zoom bakoitzak 10 zatitan banatzen du: 1 luzerako tartetik $0{,}1$ luzerakora, gero $0{,}01$ luzerakora.', 'Cada zoom lo divide en 10 partes: de longitud 1 pasa a $0{,}1$ y después a $0{,}01$.', 'كل تكبير يقسمها إلى 10 أجزاء: من طول 1 إلى $0{,}1$ ثم إلى $0{,}01$.', 'Each zoom splits it into 10 parts: from length 1 to $0{,}1$, then to $0{,}01$.')
        },
        check: {
            prompt: say('Hamarrenetan, zein tartetan dago $\\pi=3{,}1415\\ldots$?', '¿Entre qué dos décimas está $\\pi=3{,}1415\\ldots$?', 'بين أيّ جزأين من عشرة يقع $\\pi=3{,}1415\\ldots$؟', 'Between which two tenths does $\\pi=3{,}1415\\ldots$ lie?'),
            options: [same('$3{,}1<\\pi<3{,}2$'), same('$3<\\pi<4$'), same('$3{,}14<\\pi<3{,}15$')],
            correctIndex: 0,
            explanation: say('Hamarrenetan, $3{,}1415\\ldots$ zenbakia $3{,}1$ eta $3{,}2$ artean dago.', 'En las décimas, $3{,}1415\\ldots$ está entre $3{,}1$ y $3{,}2$.', 'في الأعشار يقع $3{,}1415\\ldots$ بين $3{,}1$ و$3{,}2$.', 'In tenths, $3{,}1415\\ldots$ lies between $3{,}1$ and $3{,}2$.')
        }
    },
    intervals: {
        mistake: {
            wrong: say('$x\\ge 4$ honela idazten da: $[4,\\,+\\infty]$.', '$x\\ge 4$ se escribe $[4,\\,+\\infty]$.', 'تُكتب $x\\ge 4$ هكذا: $[4,\\,+\\infty]$.', '$x\\ge 4$ is written $[4,\\,+\\infty]$.'),
            right: say('Infinitua ez da zenbaki bat eta ez dago barne: $[4,\\,+\\infty)$.', 'El infinito no es un número y no se incluye: $[4,\\,+\\infty)$.', 'اللانهاية ليست عددًا ولا تدخل في الفترة: $[4,\\,+\\infty)$.', 'Infinity is not a number and is never included: $[4,\\,+\\infty)$.')
        },
        check: {
            prompt: say('Zer tarte da $-1\\le x<6$?', '¿Qué intervalo es $-1\\le x<6$?', 'ما الفترة $-1\\le x<6$؟', 'Which interval is $-1\\le x<6$?'),
            options: [same('$(-1,\\,6]$'), same('$[-1,\\,6]$'), same('$[-1,\\,6)$')],
            correctIndex: 2,
            explanation: say('$-1$ barne dago (kortxetea) eta $6$ ez (parentesia).', '$-1$ está incluido (corchete) y $6$ no (paréntesis).', '$-1$ داخل (قوس معقوف) و$6$ خارج (قوس عادي).', '$-1$ is included (square bracket) and $6$ is not (round bracket).')
        }
    },
    'interval-ops': {
        mistake: {
            wrong: say('$[1,\\,5]\\cap(5,\\,8)=\\{5\\}$, 5 bietan dagoelako.', '$[1,\\,5]\\cap(5,\\,8)=\\{5\\}$, porque el 5 está en los dos.', '$[1,\\,5]\\cap(5,\\,8)=\\{5\\}$ لأن 5 في الفترتين.', '$[1,\\,5]\\cap(5,\\,8)=\\{5\\}$, because 5 is in both.'),
            right: say('$5$ ez dago $(5,\\,8)$ tartean: ebakidura hutsa da, $\\emptyset$.', '$5$ no está en $(5,\\,8)$: la intersección es vacía, $\\emptyset$.', '$5$ ليس في $(5,\\,8)$: التقاطع خالٍ، $\\emptyset$.', '$5$ is not in $(5,\\,8)$: the intersection is empty, $\\emptyset$.')
        },
        check: {
            prompt: say('Zenbat da $(-3,\\,4]\\cap[2,\\,9)$?', '¿Cuánto vale $(-3,\\,4]\\cap[2,\\,9)$?', 'ما قيمة $(-3,\\,4]\\cap[2,\\,9)$؟', 'What is $(-3,\\,4]\\cap[2,\\,9)$?'),
            options: [same('$[2,\\,4]$'), same('$(-3,\\,9)$'), same('$[2,\\,4)$')],
            correctIndex: 0,
            explanation: say('$2$ eta $4$ bi tarteetan daude: $[2,\\,4]$. $(-3,\\,9)$ bildura da.', '$2$ y $4$ están en los dos intervalos: $[2,\\,4]$. $(-3,\\,9)$ es la unión.', '$2$ و$4$ في الفترتين: $[2,\\,4]$. أما $(-3,\\,9)$ فهو الاتحاد.', '$2$ and $4$ are in both intervals: $[2,\\,4]$. $(-3,\\,9)$ is the union.')
        }
    },
    rounding: {
        mistake: {
            wrong: say('$6{,}38$ hamarrenetara biribilduta $6{,}3$ da.', '$6{,}38$ redondeado a las décimas es $6{,}3$.', '$6{,}38$ مقرّبًا إلى الأعشار يساوي $6{,}3$.', '$6{,}38$ rounded to tenths is $6{,}3$.'),
            right: say('Kentzen den lehen zifra 8 da, 5 baino handiagoa: $6{,}38\\to 6{,}4$. $6{,}3$ trunkatzea da.', 'La primera cifra suprimida es 8, mayor que 5: $6{,}38\\to 6{,}4$. $6{,}3$ es truncar.', 'أول رقم محذوف هو 8 وهو أكبر من 5: $6{,}38\\to 6{,}4$. أما $6{,}3$ فهو البتر.', 'The first digit dropped is 8, more than 5: $6{,}38\\to 6{,}4$. $6{,}3$ is truncating.')
        },
        check: {
            prompt: say('Zein da $0{,}2951$ zenbakiaren biribiltzea ehunenetara?', '¿Cuál es el redondeo de $0{,}2951$ a las centésimas?', 'ما تقريب $0{,}2951$ إلى أجزاء المئة؟', 'What is $0{,}2951$ rounded to hundredths?'),
            options: [same('$0{,}29$'), same('$0{,}30$'), same('$0{,}31$')],
            correctIndex: 1,
            explanation: say('Kentzen den lehen zifra 5 da: 1 gehitzen zaie ehunenei, $0{,}29\\to 0{,}30$.', 'La primera cifra suprimida es 5: se suma 1 a las centésimas, $0{,}29\\to 0{,}30$.', 'أول رقم محذوف هو 5: نضيف 1 إلى أجزاء المئة، $0{,}29\\to 0{,}30$.', 'The first digit dropped is 5: add 1 to the hundredths, $0{,}29\\to 0{,}30$.')
        }
    },
    errors: {
        mistake: {
            wrong: say('1 km 1 m-ko errorearekin neurtzea 10 m 10 cm-ko errorearekin neurtzea baino okerragoa da, 1 m 10 cm baino gehiago delako.', 'Medir 1 km con 1 m de error es peor que medir 10 m con 10 cm de error, porque 1 m es más que 10 cm.', 'قياس 1 كم بخطأ 1 م أسوأ من قياس 10 م بخطأ 10 سم، لأن 1 م أكبر من 10 سم.', 'Measuring 1 km with a 1 m error is worse than measuring 10 m with a 10 cm error, because 1 m is more than 10 cm.'),
            right: say('Konparatu errore erlatiboak: $\\frac{1}{1000}=0{,}001$ eta $\\frac{0{,}1}{10}=0{,}01$. 1 km-ko neurketa da hobea.', 'Compara los errores relativos: $\\frac{1}{1000}=0{,}001$ frente a $\\frac{0{,}1}{10}=0{,}01$. La medida de 1 km es mejor.', 'قارن الخطأين النسبيين: $\\frac{1}{1000}=0{,}001$ مقابل $\\frac{0{,}1}{10}=0{,}01$. فقياس 1 كم أفضل.', 'Compare the relative errors: $\\frac{1}{1000}=0{,}001$ against $\\frac{0{,}1}{10}=0{,}01$. The 1 km measurement is better.')
        },
        check: {
            prompt: say('Benetako balioa 40 da, eta hurbilketa, 38. Zein da errore erlatiboa?', 'El valor real es 40 y la aproximación, 38. ¿Cuál es el error relativo?', 'القيمة الحقيقية 40 والتقريب 38. ما الخطأ النسبي؟', 'The real value is 40 and the approximation is 38. What is the relative error?'),
            options: [same('$2$'), same('$0{,}05$'), same('$\\approx 0{,}053$')],
            correctIndex: 1,
            explanation: say('$E_a=40-38=2$ eta $E_r=\\frac{2}{40}=0{,}05$, hau da, %\u00a05.', '$E_a=40-38=2$ y $E_r=\\frac{2}{40}=0{,}05$, es decir, un 5\u00a0%.', '$E_a=40-38=2$ و$E_r=\\frac{2}{40}=0{,}05$ أي 5\u00a0%.', '$E_a=40-38=2$ and $E_r=\\frac{2}{40}=0{,}05$, that is, 5%.')
        }
    },
    'percent-basics': {
        mistake: {
            wrong: say('50 zenbakiaren %\u00a08 $\\frac{50}{8}=6{,}25$ da.', 'El 8\u00a0% de 50 es $\\frac{50}{8}=6{,}25$.', '8\u00a0% من 50 هو $\\frac{50}{8}=6{,}25$.', '8% of 50 is $\\frac{50}{8}=6{,}25$.'),
            right: say('$\\frac{8}{100}$ zatikiaz biderkatu behar da: $0{,}08\\cdot 50=4$.', 'Hay que multiplicar por $\\frac{8}{100}$: $0{,}08\\cdot 50=4$.', 'يجب الضرب في $\\frac{8}{100}$: $0{,}08\\cdot 50=4$.', 'You have to multiply by $\\frac{8}{100}$: $0{,}08\\cdot 50=4$.')
        },
        check: {
            prompt: say('75 zenbakitik 18, zer ehuneko da?', '¿Qué porcentaje de 75 son 18?', 'ما النسبة التي يمثلها 18 من 75؟', 'What percentage of 75 is 18?'),
            options: [say('%\u00a018', '18\u00a0%', '18\u00a0%', '18%'), say('%\u00a057', '57\u00a0%', '57\u00a0%', '57%'), say('%\u00a024', '24\u00a0%', '24\u00a0%', '24%')],
            correctIndex: 2,
            explanation: say('$\\frac{18}{75}=0{,}24$: %\u00a024 da.', '$\\frac{18}{75}=0{,}24$: el 24\u00a0%.', '$\\frac{18}{75}=0{,}24$: أي 24\u00a0%.', '$\\frac{18}{75}=0{,}24$: 24%.')
        }
    },
    'percent-change': {
        mistake: {
            wrong: say('%\u00a025 jaistea $0{,}25$ zenbakiaz biderkatzea da.', 'Bajar un 25\u00a0% es multiplicar por $0{,}25$.', 'النقصان بنسبة 25\u00a0% هو الضرب في $0{,}25$.', 'Going down 25% is multiplying by $0{,}25$.'),
            right: say('%\u00a025 jaistean %\u00a075 geratzen da: indizea $1-0{,}25=0{,}75$ da.', 'Si baja un 25\u00a0%, queda el 75\u00a0%: el índice es $1-0{,}25=0{,}75$.', 'إذا انخفضت 25\u00a0% يبقى 75\u00a0%: المؤشر $1-0{,}25=0{,}75$.', 'If it goes down 25%, 75% is left: the multiplier is $1-0{,}25=0{,}75$.')
        },
        check: {
            prompt: say('Zer aldakuntza-indize du %\u00a06 igotzeak?', '¿Qué índice de variación tiene una subida del 6\u00a0%?', 'ما مؤشر التغير لزيادة بنسبة 6\u00a0%؟', 'What multiplier goes with a 6% rise?'),
            options: [same('$1{,}06$'), same('$0{,}06$'), same('$1{,}6$')],
            correctIndex: 0,
            explanation: same('$1+\\frac{6}{100}=1{,}06$')
        }
    },
    chained: {
        mistake: {
            wrong: say('Bi aldiz %\u00a015 igotzea %\u00a030 igotzea da.', 'Subir dos veces un 15\u00a0% es subir un 30\u00a0%.', 'الزيادة مرتين بنسبة 15\u00a0% هي زيادة 30\u00a0%.', 'Going up 15% twice is going up 30%.'),
            right: say('Indizeak biderkatzen dira: $1{,}15^{2}=1{,}3225$, hau da, %\u00a032,25 igotzea.', 'Los índices se multiplican: $1{,}15^{2}=1{,}3225$, una subida del 32,25\u00a0%.', 'تُضرب المؤشرات: $1{,}15^{2}=1{,}3225$، أي زيادة 32.25\u00a0%.', 'The multipliers are multiplied: $1{,}15^{2}=1{,}3225$, a rise of 32.25%.')
        },
        check: {
            prompt: say('Akzio bat %\u00a040 jaitsi da eta gero %\u00a050 igo. Nola geratu da?', 'Una acción baja un 40\u00a0% y después sube un 50\u00a0%. ¿Cómo ha quedado?', 'انخفض سهم 40\u00a0% ثم ارتفع 50\u00a0%. كيف أصبح؟', 'A share falls 40% and then rises 50%. Where does it end up?'),
            options: [
                say('%\u00a010 altuagoa', 'Un 10\u00a0% más alta', 'أعلى بنسبة 10\u00a0%', '10% higher'),
                say('%\u00a010 baxuagoa', 'Un 10\u00a0% más baja', 'أدنى بنسبة 10\u00a0%', '10% lower'),
                say('Lehen bezala', 'Igual que antes', 'كما كان', 'The same as before')
            ],
            correctIndex: 1,
            explanation: say('$0{,}60\\cdot 1{,}50=0{,}90$: %\u00a090 geratzen da, %\u00a010 gutxiago.', '$0{,}60\\cdot 1{,}50=0{,}90$: queda el 90\u00a0%, un 10\u00a0% menos.', '$0{,}60\\cdot 1{,}50=0{,}90$: يبقى 90\u00a0%، أي أقل بنسبة 10\u00a0%.', '$0{,}60\\cdot 1{,}50=0{,}90$: 90% is left, 10% less.')
        }
    },
    'percent-inverse': {
        mistake: {
            wrong: say('%\u00a020 merkatu ondoren 60\u00a0€ balio badu, lehen $60\\cdot 1{,}20=72$\u00a0€ balio zuen.', 'Si tras una rebaja del 20\u00a0% cuesta 60\u00a0€, antes costaba $60\\cdot 1{,}20=72$\u00a0€.', 'إذا صار سعره 60\u00a0€ بعد خصم 20\u00a0% فقد كان $60\\cdot 1{,}20=72$\u00a0€.', 'If it costs €60 after a 20% discount, it cost $60\\cdot 1{,}20=72$ euros before.'),
            right: say('Zatitu indizeaz: $C=\\frac{60}{0{,}80}=75$\u00a0€.', 'Divide entre el índice: $C=\\frac{60}{0{,}80}=75$\u00a0€.', 'اقسم على المؤشر: $C=\\frac{60}{0{,}80}=75$\u00a0€.', 'Divide by the multiplier: $C=\\frac{60}{0{,}80}=75$ euros.')
        },
        check: {
            prompt: say('%\u00a025 igo ondoren, alokairu bat 900\u00a0€ da. Zenbat zen lehen?', 'Tras subir un 25\u00a0%, un alquiler es de 900\u00a0€. ¿Cuánto era antes?', 'بعد زيادة 25\u00a0% صار الإيجار 900\u00a0€. كم كان قبلها؟', 'After a 25% rise, a rent is €900. How much was it before?'),
            options: [say('675\u00a0€', '675\u00a0€', '675\u00a0€', '€675'), say('1125\u00a0€', '1125\u00a0€', '1125\u00a0€', '€1,125'), say('720\u00a0€', '720\u00a0€', '720\u00a0€', '€720')],
            correctIndex: 2,
            explanation: say('$C=\\frac{900}{1{,}25}=720$\u00a0€.', '$C=\\frac{900}{1{,}25}=720$\u00a0€.', '$C=\\frac{900}{1{,}25}=720$\u00a0€.', '$C=\\frac{900}{1{,}25}=720$ euros.')
        }
    },
    'simple-interest': {
        mistake: {
            wrong: say('3000\u00a0€ %\u00a04 interesarekin 6 hilabetez: $I=\\frac{3000\\cdot 4\\cdot 6}{100}=720$\u00a0€.', '3000\u00a0€ al 4\u00a0% durante 6 meses: $I=\\frac{3000\\cdot 4\\cdot 6}{100}=720$\u00a0€.', '3000\u00a0€ بنسبة 4\u00a0% لمدة 6 أشهر: $I=\\frac{3000\\cdot 4\\cdot 6}{100}=720$\u00a0€.', '€3,000 at 4% for 6 months: $I=\\frac{3000\\cdot 4\\cdot 6}{100}=720$ euros.'),
            right: say('Denbora urtetan doa: $t=\\frac{6}{12}$, beraz $I=\\frac{3000\\cdot 4\\cdot 0{,}5}{100}=60$\u00a0€.', 'El tiempo va en años: $t=\\frac{6}{12}$, así que $I=\\frac{3000\\cdot 4\\cdot 0{,}5}{100}=60$\u00a0€.', 'الزمن بالسنوات: $t=\\frac{6}{12}$، إذن $I=\\frac{3000\\cdot 4\\cdot 0{,}5}{100}=60$\u00a0€.', 'Time goes in years: $t=\\frac{6}{12}$, so $I=\\frac{3000\\cdot 4\\cdot 0{,}5}{100}=60$ euros.')
        },
        check: {
            prompt: say('Zenbat interes ematen dute 1500 eurok %\u00a02 interes sinplean 4 urtez?', '¿Cuánto interés dan 1500\u00a0€ al 2\u00a0% durante 4 años, a interés simple?', 'كم فائدة تعطي 1500\u00a0€ بنسبة 2\u00a0% لمدة 4 سنوات بفائدة بسيطة؟', 'How much interest do €1,500 at 2% for 4 years earn, at simple interest?'),
            options: [say('30\u00a0€', '30\u00a0€', '30\u00a0€', '€30'), say('120\u00a0€', '120\u00a0€', '120\u00a0€', '€120'), say('1620\u00a0€', '1620\u00a0€', '1620\u00a0€', '€1,620')],
            correctIndex: 1,
            explanation: say('$I=\\frac{1500\\cdot 2\\cdot 4}{100}=120$\u00a0€.', '$I=\\frac{1500\\cdot 2\\cdot 4}{100}=120$\u00a0€.', '$I=\\frac{1500\\cdot 2\\cdot 4}{100}=120$\u00a0€.', '$I=\\frac{1500\\cdot 2\\cdot 4}{100}=120$ euros.')
        }
    },
    'compound-interest': {
        mistake: {
            wrong: say('1000\u00a0€ %\u00a05 interesarekin 2 urtez: $1000\\cdot 1{,}05\\cdot 2=2100$\u00a0€.', '1000\u00a0€ al 5\u00a0% durante 2 años: $1000\\cdot 1{,}05\\cdot 2=2100$\u00a0€.', '1000\u00a0€ بنسبة 5\u00a0% لمدة سنتين: $1000\\cdot 1{,}05\\cdot 2=2100$\u00a0€.', '€1,000 at 5% for 2 years: $1000\\cdot 1{,}05\\cdot 2=2100$ euros.'),
            right: say('Indizea urte adina aldiz biderkatzen da, ez denboraz: $1000\\cdot 1{,}05^{2}=1102{,}5$\u00a0€.', 'El índice se multiplica tantas veces como años, no por el tiempo: $1000\\cdot 1{,}05^{2}=1102{,}5$\u00a0€.', 'يُضرب المؤشر بعدد السنوات لا في الزمن: $1000\\cdot 1{,}05^{2}=1102{,}5$\u00a0€.', 'The multiplier is used once per year, not multiplied by the time: $1000\\cdot 1{,}05^{2}=1102{,}5$ euros.')
        },
        check: {
            prompt: say('Zer amaierako kapital ematen dute 800 eurok %\u00a03 interes konposatuan 2 urtez?', '¿Qué capital final dan 800\u00a0€ al 3\u00a0% durante 2 años, a interés compuesto?', 'ما رأس المال النهائي لمبلغ 800\u00a0€ بنسبة 3\u00a0% لمدة سنتين بفائدة مركبة؟', 'What final amount do €800 at 3% for 2 years give, at compound interest?'),
            options: [say('848\u00a0€', '848\u00a0€', '848\u00a0€', '€848'), say('848,72\u00a0€', '848,72\u00a0€', '848.72\u00a0€', '€848.72'), say('824\u00a0€', '824\u00a0€', '824\u00a0€', '€824')],
            correctIndex: 1,
            explanation: say('$800\\cdot 1{,}03^{2}=848{,}72$\u00a0€: interes sinplean baino 72 zentimo gehiago.', '$800\\cdot 1{,}03^{2}=848{,}72$\u00a0€: 72 céntimos más que con interés simple.', '$800\\cdot 1{,}03^{2}=848{,}72$\u00a0€: أي 72 سنتًا أكثر من الفائدة البسيطة.', '$800\\cdot 1{,}03^{2}=848{,}72$ euros: 72 cents more than with simple interest.')
        }
    },
    'interest-compare': {
        mistake: {
            wrong: say('Interes konposatuan beti irabazten da gehiago, baita lehen urtean ere.', 'A interés compuesto siempre se gana más que a simple, también el primer año.', 'الفائدة المركبة تعطي دائمًا أكثر من البسيطة، حتى في السنة الأولى.', 'Compound interest always earns more than simple interest, even in the first year.'),
            right: say('Lehen urtean gauza bera ematen dute: $C\\cdot\\frac{r}{100}$ bietan. Aldea bigarren urtean hasten da.', 'El primer año dan lo mismo: $C\\cdot\\frac{r}{100}$ en los dos. La diferencia empieza el segundo año.', 'في السنة الأولى تعطيان المبلغ نفسه: $C\\cdot\\frac{r}{100}$ في الحالتين. ويبدأ الفرق في السنة الثانية.', 'In the first year they give the same: $C\\cdot\\frac{r}{100}$ in both. The difference starts in the second year.')
        },
        check: {
            prompt: say('500\u00a0€ %\u00a04 interesarekin 2 urtez: zenbat irabazten da gehiago interes konposatuan sinplean baino?', '500\u00a0€ al 4\u00a0% durante 2 años: ¿cuánto se gana de más con interés compuesto que con simple?', '500\u00a0€ بنسبة 4\u00a0% لمدة سنتين: كم نربح أكثر بالفائدة المركبة مقارنةً بالبسيطة؟', '€500 at 4% for 2 years: how much more does compound interest earn than simple interest?'),
            options: [say('0,80\u00a0€', '0,80\u00a0€', '0.80\u00a0€', '€0.80'), say('0\u00a0€', '0\u00a0€', '0\u00a0€', '€0'), say('40,80\u00a0€', '40,80\u00a0€', '40.80\u00a0€', '€40.80')],
            correctIndex: 0,
            explanation: say('Konposatua: $500\\cdot 1{,}04^{2}=540{,}8$; sinplea: $500+40=540$. Aldea: $0{,}80$\u00a0€.', 'Compuesto: $500\\cdot 1{,}04^{2}=540{,}8$; simple: $500+40=540$. La diferencia: $0{,}80$\u00a0€.', 'المركبة: $500\\cdot 1{,}04^{2}=540{,}8$، والبسيطة: $500+40=540$. الفرق: $0{,}80$\u00a0€.', 'Compound: $500\\cdot 1{,}04^{2}=540{,}8$; simple: $500+40=540$. The difference: $0{,}80$ euros.')
        }
    }
}

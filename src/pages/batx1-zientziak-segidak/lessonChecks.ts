import type { LessonCheck, LessonMistake, LocalizedText } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Segidak · Batxilergoa 1 · Zientziak — the typical mistake and the «Check
   it» question of every lesson. Plain data (no JSX) so the tests can
   import it; lessons.tsx merges it into the topics. The questions use new
   numbers, never those of «Let's solve» or of the example, and one of their
   wrong answers is the lesson's typical mistake.
   ========================================================================== */

export type BachSequencesTopicId =
    | 'terms' | 'fibonacci' | 'monotony'
    | 'arithmetic' | 'geometric' | 'progression-problems'
    | 'geometric-series' | 'periodic-decimals' | 'squares-sum'
    | 'converge' | 'from-term' | 'infinite-limits' | 'quotient-limits'
    | 'e-number' | 'continuous-growth'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const bachSequencesLessonChecks: Record<BachSequencesTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    /* ---------- 1. Sequences ---------- */
    terms: {
        mistake: {
            wrong: same('$a_n=2n\\ \\to\\ a_{n+1}=2n+1$'),
            right: say('$n$ ordez $n+1$ jarri behar da: $a_{n+1}=2(n+1)=2n+2$.', 'Hay que poner $n+1$ en lugar de $n$: $a_{n+1}=2(n+1)=2n+2$.', 'يجب وضع $n+1$ مكان $n$: $a_{n+1}=2(n+1)=2n+2$.', 'You must put $n+1$ in place of $n$: $a_{n+1}=2(n+1)=2n+2$.')
        },
        check: {
            prompt: say('$a_n=n^2-3n$ bada, zenbat da $a_5$?', 'Si $a_n=n^2-3n$, ¿cuánto vale $a_5$?', 'إذا كان $a_n=n^2-3n$ فكم يساوي $a_5$؟', 'If $a_n=n^2-3n$, what is $a_5$?'),
            options: [same('$10$'), same('$22$'), same('$4$')],
            correctIndex: 0,
            explanation: same('$a_5=5^2-3\\cdot 5=25-15=10$')
        }
    },
    fibonacci: {
        mistake: {
            wrong: same('$1,\\ 1,\\ 2,\\ 3,\\ 5,\\ 8,\\ 11$'),
            right: say('Gai bakoitza aurreko bien batura da: $5+8=13$, ez 11.', 'Cada término suma los dos anteriores: $5+8=13$, no 11.', 'كل حد مجموع الحدين السابقين: $5+8=13$ لا 11.', 'Each term is the sum of the two before it: $5+8=13$, not 11.')
        },
        check: {
            prompt: say('$c_1=1$, $c_2=4$ eta $c_n=c_{n-1}+c_{n-2}$. Zenbat da $c_5$?', 'Con $c_1=1$, $c_2=4$ y $c_n=c_{n-1}+c_{n-2}$, ¿cuánto vale $c_5$?', 'مع $c_1=1$ و$c_2=4$ و$c_n=c_{n-1}+c_{n-2}$، كم يساوي $c_5$؟', 'With $c_1=1$, $c_2=4$ and $c_n=c_{n-1}+c_{n-2}$, what is $c_5$?'),
            options: [same('$13$'), same('$14$'), same('$9$')],
            correctIndex: 1,
            explanation: same('$\\begin{gathered}c_3=5\\\\ c_4=9\\\\ c_5=9+5=14\\end{gathered}$')
        }
    },
    monotony: {
        mistake: {
            wrong: say('$a_n=1-\\frac{1}{n}$ gorakorra da, beraz infinitura doa', '$a_n=1-\\frac{1}{n}$ es creciente, así que se va a infinito', '$a_n=1-\\frac{1}{n}$ متزايدة، إذن تذهب إلى اللانهاية', '$a_n=1-\\frac{1}{n}$ is increasing, so it goes off to infinity'),
            right: say('Gorakorra da, baina inoiz ez du 1 gainditzen: 1 zenbakira hurbiltzen da.', 'Es creciente, pero nunca pasa de 1: se acerca a 1.', 'هي متزايدة لكنها لا تتجاوز 1 أبدًا: تقترب من 1.', 'It is increasing, but it never goes past 1: it gets closer to 1.')
        },
        check: {
            prompt: say('Nolakoa da $d_n=(-1)^n\\cdot\\frac{1}{n}$ segida?', '¿Cómo es la sucesión $d_n=(-1)^n\\cdot\\frac{1}{n}$?', 'كيف هي المتتالية $d_n=(-1)^n\\cdot\\frac{1}{n}$؟', 'What kind of sequence is $d_n=(-1)^n\\cdot\\frac{1}{n}$?'),
            options: [say('Gorakorra', 'Creciente', 'متزايدة', 'Increasing'), say('Txandakatua', 'Alternada', 'متناوبة', 'Alternating'), say('Beherakorra', 'Decreciente', 'متناقصة', 'Decreasing')],
            correctIndex: 1,
            explanation: say('$-1,\\ \\frac{1}{2},\\ -\\frac{1}{3},\\ \\frac{1}{4},\\ldots$: zeinua aldatzen da gai batetik bestera.', '$-1,\\ \\frac{1}{2},\\ -\\frac{1}{3},\\ \\frac{1}{4},\\ldots$: el signo cambia de un término al siguiente.', '$-1,\\ \\frac{1}{2},\\ -\\frac{1}{3},\\ \\frac{1}{4},\\ldots$: تتغيّر الإشارة من حد إلى التالي.', '$-1,\\ \\frac{1}{2},\\ -\\frac{1}{3},\\ \\frac{1}{4},\\ldots$: the sign changes from one term to the next.')
        }
    },

    /* ---------- 2. Progressions ---------- */
    arithmetic: {
        mistake: {
            wrong: same('$a_n=a_1+n\\cdot d$'),
            right: say('$n$ gaira iristeko $n-1$ jauzi daude: $a_n=a_1+(n-1)\\,d$.', 'Hasta el término $n$ hay $n-1$ saltos: $a_n=a_1+(n-1)\\,d$.', 'حتى الحد $n$ توجد $n-1$ قفزة: $a_n=a_1+(n-1)\\,d$.', 'Up to term $n$ there are $n-1$ jumps: $a_n=a_1+(n-1)\\,d$.')
        },
        check: {
            prompt: say('Progresio aritmetiko batean $a_1=7$ eta $d=-2$ dira. Zenbat da $a_{10}$?', 'En una progresión aritmética, $a_1=7$ y $d=-2$. ¿Cuánto vale $a_{10}$?', 'في متتالية حسابية $a_1=7$ و$d=-2$. كم يساوي $a_{10}$؟', 'In an arithmetic progression, $a_1=7$ and $d=-2$. What is $a_{10}$?'),
            options: [same('$-11$'), same('$-13$'), same('$-12$')],
            correctIndex: 0,
            explanation: same('$a_{10}=7+9\\cdot(-2)=-11$')
        }
    },
    geometric: {
        mistake: {
            wrong: same('$a_n=a_1\\cdot r^{\\,n}$'),
            right: say('$n$ gaira iristeko $n-1$ aldiz biderkatzen da: $a_n=a_1\\cdot r^{\\,n-1}$.', 'Hasta el término $n$ se multiplica $n-1$ veces: $a_n=a_1\\cdot r^{\\,n-1}$.', 'حتى الحد $n$ نضرب $n-1$ مرة: $a_n=a_1\\cdot r^{\\,n-1}$.', 'Up to term $n$ you multiply $n-1$ times: $a_n=a_1\\cdot r^{\\,n-1}$.')
        },
        check: {
            prompt: say('$a_1=5$ eta $r=2$ dira. Zenbat da $a_4$?', '$a_1=5$ y $r=2$. ¿Cuánto vale $a_4$?', '$a_1=5$ و$r=2$. كم يساوي $a_4$؟', '$a_1=5$ and $r=2$. What is $a_4$?'),
            options: [same('$80$'), same('$40$'), same('$20$')],
            correctIndex: 1,
            explanation: same('$a_4=5\\cdot 2^{3}=40$')
        }
    },
    'progression-problems': {
        mistake: {
            wrong: say('% 5 hazten bada, $r=0{,}05$', 'Si crece un 5 %, $r=0{,}05$', 'إذا زاد بنسبة 5 % فإن $r=0{,}05$', 'If it grows by 5%, $r=0{,}05$'),
            right: say('Arrazoia $r=1+0{,}05=1{,}05$ da: kantitate osoa gehi % 5.', 'La razón es $r=1+0{,}05=1{,}05$: la cantidad entera más el 5 %.', 'الأساس $r=1+0{,}05=1{,}05$: الكمية كلها زائد 5 %.', 'The ratio is $r=1+0{,}05=1{,}05$: the whole amount plus 5%.')
        },
        check: {
            prompt: say('Kapital bat urtero % 4 hazten da. Zein da progresioaren arrazoia?', 'Un capital crece un 4 % cada año. ¿Cuál es la razón de la progresión?', 'يزداد رأس مال بنسبة 4 % كل سنة. ما أساس المتتالية؟', 'A sum of money grows by 4% each year. What is the ratio of the progression?'),
            options: [same('$1{,}04$'), same('$0{,}04$'), same('$4$')],
            correctIndex: 0,
            explanation: same('$r=1+\\frac{4}{100}=1{,}04$')
        }
    },

    /* ---------- 3. Infinite sums ---------- */
    'geometric-series': {
        mistake: {
            wrong: same('$1+2+4+8+\\ldots=\\frac{1}{1-2}=-1$'),
            right: say('$r=2$ denez, $|r|\\ge 1$: batura mugarik gabe hazten da, ez da $-1$.', 'Con $r=2$, $|r|\\ge 1$: la suma crece sin parar, no es $-1$.', 'مع $r=2$ يكون $|r|\\ge 1$: يزداد المجموع بلا توقف ولا يساوي $-1$.', 'With $r=2$, $|r|\\ge 1$: the sum grows without stopping, it is not $-1$.')
        },
        check: {
            prompt: say('Zenbat da $6+2+\\frac{2}{3}+\\ldots$?', '¿Cuánto vale $6+2+\\frac{2}{3}+\\ldots$?', 'كم يساوي $6+2+\\frac{2}{3}+\\ldots$؟', 'What is $6+2+\\frac{2}{3}+\\ldots$?'),
            options: [same('$9$'), same('$\\frac{26}{3}$'), same('$18$')],
            correctIndex: 0,
            explanation: same('$\\begin{gathered}r=\\frac{1}{3}\\\\ S_\\infty=\\frac{6}{1-\\frac{1}{3}}=9\\end{gathered}$')
        }
    },
    'periodic-decimals': {
        mistake: {
            wrong: same('$0{,}\\overline{4}=\\frac{4}{10}$'),
            right: say('Hori $0{,}4$ da. Periodikoa batura infinitu bat da: $0{,}\\overline{4}=\\frac{0{,}4}{1-0{,}1}=\\frac{4}{9}$.', 'Eso es $0{,}4$. El periódico es una suma infinita: $0{,}\\overline{4}=\\frac{0{,}4}{1-0{,}1}=\\frac{4}{9}$.', 'هذا $0{,}4$. أما الدوري فمجموع لا نهائي: $0{,}\\overline{4}=\\frac{0{,}4}{1-0{,}1}=\\frac{4}{9}$.', 'That is $0{,}4$. The recurring one is an infinite sum: $0{,}\\overline{4}=\\frac{0{,}4}{1-0{,}1}=\\frac{4}{9}$.')
        },
        check: {
            prompt: say('Zein zatiki da $0{,}\\overline{27}$?', '¿Qué fracción es $0{,}\\overline{27}$?', 'أيّ كسر هو $0{,}\\overline{27}$؟', 'Which fraction is $0{,}\\overline{27}$?'),
            options: [same('$\\frac{27}{100}$'), same('$\\frac{3}{11}$'), same('$\\frac{27}{90}$')],
            correctIndex: 1,
            explanation: same('$\\frac{0{,}27}{1-0{,}01}=\\frac{27}{99}=\\frac{3}{11}$')
        }
    },
    'squares-sum': {
        mistake: {
            wrong: same('$1^2+2^2+3^2=(1+2+3)^2=36$'),
            right: say('Batura baten karratua ez da karratuen batura: $1+4+9=14$.', 'El cuadrado de una suma no es la suma de los cuadrados: $1+4+9=14$.', 'مربع المجموع ليس مجموع المربعات: $1+4+9=14$.', 'The square of a sum is not the sum of the squares: $1+4+9=14$.')
        },
        check: {
            prompt: say('Zenbat da $1^2+2^2+\\ldots+5^2$?', '¿Cuánto es $1^2+2^2+\\ldots+5^2$?', 'كم يساوي $1^2+2^2+\\ldots+5^2$؟', 'What is $1^2+2^2+\\ldots+5^2$?'),
            options: [same('$55$'), same('$225$'), same('$15$')],
            correctIndex: 0,
            explanation: same('$\\frac{5\\cdot 6\\cdot 11}{6}=55$')
        }
    },

    /* ---------- 4. Limits ---------- */
    converge: {
        mistake: {
            wrong: say('Gaiak gero eta hurbilago daude elkarrengandik, beraz limitea 0 da', 'Los términos están cada vez más juntos, así que el límite es 0', 'الحدود تتقارب أكثر فأكثر، إذن النهاية 0', 'The terms are getting closer together, so the limit is 0'),
            right: say('Limitea gaiak hurbiltzen diren zenbakia da: $3{,}2,\\ 3{,}02,\\ 3{,}002$ segidan, 3.', 'El límite es el número al que se acercan: en $3{,}2,\\ 3{,}02,\\ 3{,}002$ es 3.', 'النهاية هي العدد الذي تقترب منه الحدود: في $3{,}2,\\ 3{,}02,\\ 3{,}002$ هي 3.', 'The limit is the number they get closer to: in $3{,}2,\\ 3{,}02,\\ 3{,}002$ it is 3.')
        },
        check: {
            prompt: say('Zein da $c_n=\\frac{4n+7}{n}$ segidaren limitea?', '¿Cuál es el límite de $c_n=\\frac{4n+7}{n}$?', 'ما نهاية $c_n=\\frac{4n+7}{n}$؟', 'What is the limit of $c_n=\\frac{4n+7}{n}$?'),
            options: [same('$7$'), same('$11$'), same('$4$')],
            correctIndex: 2,
            explanation: same('$\\frac{4n+7}{n}=4+\\frac{7}{n}\\ \\to\\ 4$')
        }
    },
    'from-term': {
        mistake: {
            wrong: same('$\\frac{1}{n}<0{,}01\\ \\to\\ n<100$'),
            right: say('Bi aldeei buelta ematean, desberdintzak norabidea aldatzen du: $n>100$.', 'Al dar la vuelta a los dos lados, la desigualdad cambia de sentido: $n>100$.', 'عند قلب الطرفين يتغيّر اتجاه المتباينة: $n>100$.', 'When you turn both sides upside down, the inequality changes direction: $n>100$.')
        },
        check: {
            prompt: say('$c_n=\\frac{3}{n}$ segidaren limitea 0 da. Zein da 0 zenbakitik $0{,}1$ baino gertuago dagoen lehen gaia?', '$c_n=\\frac{3}{n}$ tiende a 0. ¿Cuál es el primer término a menos de $0{,}1$ de 0?', '$c_n=\\frac{3}{n}$ تتجه إلى 0. ما أول حد يبعد عن 0 أقل من $0{,}1$؟', '$c_n=\\frac{3}{n}$ tends to 0. Which is the first term less than $0{,}1$ away from 0?'),
            options: [same('$30$'), same('$31$'), same('$3$')],
            correctIndex: 1,
            explanation: same('$\\frac{3}{n}<0{,}1\\ \\to\\ n>30$')
        }
    },
    'infinite-limits': {
        mistake: {
            wrong: say('$(-1)^n$ segidaren limitea 1 da', 'El límite de $(-1)^n$ es 1', 'نهاية $(-1)^n$ هي 1', 'The limit of $(-1)^n$ is 1'),
            right: say('Ez du limiterik: gaiak 1 eta $-1$ dira txandaka, eta ez dira bakar batera hurbiltzen.', 'No tiene límite: sus términos son 1 y $-1$ alternados, y no se acercan a uno solo.', 'ليس لها نهاية: حدودها 1 و$-1$ بالتناوب ولا تقترب من عدد واحد.', 'It has no limit: its terms are 1 and $-1$ in turn, and they do not get close to a single number.')
        },
        check: {
            prompt: say('Nora doa $f_n=5-n^2$ segida?', '¿A dónde va la sucesión $f_n=5-n^2$?', 'إلى أين تتجه المتتالية $f_n=5-n^2$؟', 'Where does the sequence $f_n=5-n^2$ go?'),
            options: [same('$-\\infty$'), same('$5$'), same('$+\\infty$')],
            correctIndex: 0,
            explanation: say('$n^2$ gaiak irabazten du, zeinu negatiboarekin: $f_{10}=-95$.', 'Manda el $n^2$, con signo negativo: $f_{10}=-95$.', 'الحد $n^2$ هو الغالب بإشارة سالبة: $f_{10}=-95$.', 'The $n^2$ wins, with a negative sign: $f_{10}=-95$.')
        }
    },
    'quotient-limits': {
        mistake: {
            wrong: same('$\\lim\\frac{2n+1}{n+3}=\\frac{1}{3}$'),
            right: say('Ez dira gai askeak zatitzen, koefiziente nagusiak baizik: $\\lim\\frac{2n+1}{n+3}=\\frac{2}{1}=2$.', 'No se dividen los términos independientes, sino los coeficientes principales: $\\lim\\frac{2n+1}{n+3}=\\frac{2}{1}=2$.', 'لا نقسم الحدين الثابتين بل المعاملين الرئيسيين: $\\lim\\frac{2n+1}{n+3}=\\frac{2}{1}=2$.', 'You do not divide the constant terms but the leading coefficients: $\\lim\\frac{2n+1}{n+3}=\\frac{2}{1}=2$.')
        },
        check: {
            prompt: say('Zenbat da $\\lim\\frac{5n^2+1}{3n-2n^2}$?', '¿Cuánto vale $\\lim\\frac{5n^2+1}{3n-2n^2}$?', 'كم يساوي $\\lim\\frac{5n^2+1}{3n-2n^2}$؟', 'What is $\\lim\\frac{5n^2+1}{3n-2n^2}$?'),
            options: [same('$\\frac{5}{3}$'), same('$-\\frac{5}{2}$'), same('$+\\infty$')],
            correctIndex: 1,
            explanation: say('Maila bera, 2: $\\frac{5}{-2}=-\\frac{5}{2}$.', 'Mismo grado, 2: $\\frac{5}{-2}=-\\frac{5}{2}$.', 'الدرجة نفسها، 2: $\\frac{5}{-2}=-\\frac{5}{2}$.', 'Same degree, 2: $\\frac{5}{-2}=-\\frac{5}{2}$.')
        }
    },

    /* ---------- 5. The number e ---------- */
    'e-number': {
        mistake: {
            wrong: say('$1+\\frac{1}{n}$ 1 zenbakira doa, beraz $\\left(1+\\frac{1}{n}\\right)^n$ ere bai', '$1+\\frac{1}{n}$ tiende a 1, así que $\\left(1+\\frac{1}{n}\\right)^n$ también', '$1+\\frac{1}{n}$ تتجه إلى 1، إذن $\\left(1+\\frac{1}{n}\\right)^n$ كذلك', '$1+\\frac{1}{n}$ tends to 1, so $\\left(1+\\frac{1}{n}\\right)^n$ does too'),
            right: say('Oinarria 1 zenbakira doa, baina berretzailea infinitura: emaitza $e$ da, ez 1.', 'La base tiende a 1, pero el exponente a infinito: el resultado es $e$, no 1.', 'الأساس يتجه إلى 1 لكن الأس إلى اللانهاية: النتيجة $e$ لا 1.', 'The base tends to 1, but the exponent to infinity: the result is $e$, not 1.')
        },
        check: {
            prompt: say('Nora hurbiltzen da $\\left(1+\\frac{1}{n}\\right)^n$?', '¿A qué se acerca $\\left(1+\\frac{1}{n}\\right)^n$?', 'إلامَ يقترب $\\left(1+\\frac{1}{n}\\right)^n$؟', 'What does $\\left(1+\\frac{1}{n}\\right)^n$ get close to?'),
            options: [same('$1$'), same('$e$'), same('$+\\infty$')],
            correctIndex: 1,
            explanation: say('Gorakorra da, eta $e\\approx 2{,}718$ zenbakira hurbiltzen da.', 'Es creciente y se acerca a $e\\approx 2{,}718$.', 'هي متزايدة وتقترب من $e\\approx 2{,}718$.', 'It is increasing and gets closer to $e\\approx 2{,}718$.')
        }
    },
    'continuous-growth': {
        mistake: {
            wrong: same('$\\left(1+\\frac{2}{n}\\right)^n\\ \\to\\ e$'),
            right: say('Goian 2 badago, limitea $e^2$ da: $\\left(1+\\frac{2}{n}\\right)^n\\ \\to\\ e^2\\approx 7{,}39$.', 'Si arriba hay un 2, el límite es $e^2$: $\\left(1+\\frac{2}{n}\\right)^n\\ \\to\\ e^2\\approx 7{,}39$.', 'إذا كان في البسط 2 فالنهاية $e^2$: $\\left(1+\\frac{2}{n}\\right)^n\\ \\to\\ e^2\\approx 7{,}39$.', 'If there is a 2 on top, the limit is $e^2$: $\\left(1+\\frac{2}{n}\\right)^n\\ \\to\\ e^2\\approx 7{,}39$.')
        },
        check: {
            prompt: say('Zein da $\\left(1+\\frac{3}{n}\\right)^n$ segidaren limitea?', '¿Cuál es el límite de $\\left(1+\\frac{3}{n}\\right)^n$?', 'ما نهاية $\\left(1+\\frac{3}{n}\\right)^n$؟', 'What is the limit of $\\left(1+\\frac{3}{n}\\right)^n$?'),
            options: [same('$e^3$'), same('$3e$'), same('$e$')],
            correctIndex: 0,
            explanation: same('$\\left(1+\\frac{3}{n}\\right)^n\\ \\to\\ e^3\\approx 20{,}09$')
        }
    }
}

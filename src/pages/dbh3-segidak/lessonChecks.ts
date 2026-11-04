import type { LessonCheck, LessonMistake } from '../../features/unit-v2/types.ts'
import { say, same } from './text.ts'

/* ==========================================================================
   Segidak · 3. DBH — the typical mistake and the «Check it» question of
   every lesson. Plain data (no JSX) so the tests can import it; lessons.tsx
   merges it into the topics. The mistakes are the ones the lessons already
   had; the questions use new numbers, never those of «Let's solve» or of
   the example, and one of their wrong answers is the lesson's typical
   mistake. Tests in tests/lesson-checks.test.ts.
   ========================================================================== */

export type SequencesTopicId = 'terms' | 'general-term' | 'recursive' | 'arith-difference' | 'arith-general' | 'arith-find' | 'gauss' | 'arith-sum' | 'arith-problems' | 'geo-ratio' | 'geo-general' | 'geo-find' | 'geo-sum' | 'geo-infinite' | 'geo-problems'

export const sequencesLessonChecks: Record<SequencesTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    terms: {
        mistake: {
            wrong: say('$5,\\,8,\\,11,\\,14$ segidan, $a_{2}=2$, bigarren lekuan dagoelako.', 'En $5,\\,8,\\,11,\\,14$, $a_{2}=2$, porque está en el segundo lugar.', 'في $5,\\,8,\\,11,\\,14$ يكون $a_{2}=2$ لأنه في الرتبة الثانية.', 'In $5,\\,8,\\,11,\\,14$, $a_{2}=2$, because it is in second place.'),
            right: say('Azpiindizea lekua da, eta $a_{2}$ leku horretan dagoen balioa: $a_{2}=8$.', 'El subíndice es el lugar, y $a_{2}$ es el valor que hay en ese lugar: $a_{2}=8$.', 'الدليل هو الرتبة، و$a_{2}$ هو القيمة في تلك الرتبة: $a_{2}=8$.', 'The subscript is the position, and $a_{2}$ is the value in that position: $a_{2}=8$.')
        },
        check: {
            prompt: say('$20,\\,23,\\,26,\\,29,\\ldots$ segidan, zenbat balio du $a_{3}$ gaiak?', 'En $20,\\,23,\\,26,\\,29,\\ldots$, ¿cuánto vale $a_{3}$?', 'في $20,\\,23,\\,26,\\,29,\\ldots$ كم يساوي $a_{3}$؟', 'In $20,\\,23,\\,26,\\,29,\\ldots$, what is $a_{3}$?'),
            options: [same('$3$'), same('$26$'), same('$23$')],
            correctIndex: 1,
            explanation: say('$a_{3}$ hirugarren lekuko gaiaren balioa da: 26. 3 zenbakia lekua da, ez balioa.', '$a_{3}$ es el valor que hay en el tercer lugar: 26. El 3 es el lugar, no el valor.', '$a_{3}$ هو القيمة في الرتبة الثالثة: 26. أما 3 فهي الرتبة لا القيمة.', '$a_{3}$ is the value in third place: 26. The 3 is the place, not the value.')
        }
    },
    'general-term': {
        mistake: {
            wrong: say('$a_{n}=2n+1$ bada, $a_{10}=2\\cdot 1+10=12$.', 'Si $a_{n}=2n+1$, $a_{10}=2\\cdot 1+10=12$.', 'إذا كان $a_{n}=2n+1$ فإن $a_{10}=2\\cdot 1+10=12$.', 'If $a_{n}=2n+1$, then $a_{10}=2\\cdot 1+10=12$.'),
            right: say('$n$ lekua da, eta hori ordezkatzen da: $a_{10}=2\\cdot 10+1=21$.', '$n$ es el lugar, y es lo que se sustituye: $a_{10}=2\\cdot 10+1=21$.', '$n$ هو الرتبة وهو ما نعوّضه: $a_{10}=2\\cdot 10+1=21$.', '$n$ is the position, and that is what you substitute: $a_{10}=2\\cdot 10+1=21$.')
        },
        check: {
            prompt: say('$a_{n}=3n+5$ bada, zenbat balio du $a_{4}$ gaiak?', 'Si $a_{n}=3n+5$, ¿cuánto vale $a_{4}$?', 'إذا كان $a_{n}=3n+5$ فكم يساوي $a_{4}$؟', 'If $a_{n}=3n+5$, what is $a_{4}$?'),
            options: [same('$19$'), same('$17$'), same('$12$')],
            correctIndex: 1,
            explanation: say('Ordezkatu lekua, $n=4$: $3\\cdot 4+5=17$.', 'Sustituye el lugar, $n=4$: $3\\cdot 4+5=17$.', 'عوّض الرتبة $n=4$: $3\\cdot 4+5=17$.', 'Substitute the place, $n=4$: $3\\cdot 4+5=17$.')
        }
    },
    recursive: {
        mistake: {
            wrong: say('$a_{n}=a_{n-1}+4$ segidan, $a_{5}=5+4=9$.', 'En $a_{n}=a_{n-1}+4$, $a_{5}=5+4=9$.', 'في $a_{n}=a_{n-1}+4$ يكون $a_{5}=5+4=9$.', 'In $a_{n}=a_{n-1}+4$, $a_{5}=5+4=9$.'),
            right: say('$a_{n-1}$ aurreko gaiaren balioa da, ez haren lekua. Lehen gaia behar da: $a_{1}=2$ bada, $a_{5}=18$.', '$a_{n-1}$ es el valor del término anterior, no su lugar. Hace falta el primer término: si $a_{1}=2$, $a_{5}=18$.', '$a_{n-1}$ قيمة الحد السابق لا رتبته. ويلزم الحد الأول: إذا كان $a_{1}=2$ فإن $a_{5}=18$.', '$a_{n-1}$ is the value of the previous term, not its position. You need the first term: if $a_{1}=2$, $a_{5}=18$.')
        },
        check: {
            prompt: say('$a_{1}=1$, $a_{2}=3$ eta $a_{n}=a_{n-1}+a_{n-2}$. Zenbat balio du $a_{4}$ gaiak?', '$a_{1}=1$, $a_{2}=3$ y $a_{n}=a_{n-1}+a_{n-2}$. ¿Cuánto vale $a_{4}$?', '$a_{1}=1$ و$a_{2}=3$ و$a_{n}=a_{n-1}+a_{n-2}$. كم يساوي $a_{4}$؟', '$a_{1}=1$, $a_{2}=3$ and $a_{n}=a_{n-1}+a_{n-2}$. What is $a_{4}$?'),
            options: [same('$7$'), same('$5$'), same('$4$')],
            correctIndex: 0,
            explanation: say('Aurreko gaien balioak batzen dira, ez haien lekuak: $a_{3}=3+1=4$ eta $a_{4}=4+3=7$.', 'Se suman los valores de los anteriores, no sus lugares: $a_{3}=3+1=4$ y $a_{4}=4+3=7$.', 'نجمع قيم الحدود السابقة لا رتبها: $a_{3}=3+1=4$ و$a_{4}=4+3=7$.', 'Add the values of the previous terms, not their places: $a_{3}=3+1=4$ and $a_{4}=4+3=7$.')
        }
    },
    'arith-difference': {
        mistake: {
            wrong: say('$17,\\,13,\\,9$ segidan, $d=4$, zenbakiak lauko jauzietan aldatzen direlako.', 'En $17,\\,13,\\,9$, $d=4$, porque los números cambian de 4 en 4.', 'في $17,\\,13,\\,9$ يكون $d=4$ لأن الأعداد تتغير بأربعة.', 'In $17,\\,13,\\,9$, $d=4$, because the numbers change by 4 each time.'),
            right: say('Diferentzia hurrengoa ken aurrekoa da: $13-17=-4$. Zeinuak esaten du jaisten dela.', 'La diferencia es el siguiente menos el anterior: $13-17=-4$. El signo dice que baja.', 'الفرق هو التالي ناقص السابق: $13-17=-4$. والإشارة تدل على النقصان.', 'The difference is the next term minus the previous one: $13-17=-4$. The sign says it is going down.')
        },
        check: {
            prompt: say('Zein da $20,\\ 14,\\ 8,\\ 2,\\ldots$ progresioaren diferentzia?', '¿Cuál es la diferencia de $20,\\ 14,\\ 8,\\ 2,\\ldots$?', 'ما فرق المتتالية $20,\\ 14,\\ 8,\\ 2,\\ldots$؟', 'What is the difference of $20,\\ 14,\\ 8,\\ 2,\\ldots$?'),
            options: [same('$d=6$'), same('$d=-6$'), same('$d=-8$')],
            correctIndex: 1,
            explanation: say('Hurrengoa ken aurrekoa: $14-20=-6$. Zeinuak esaten du jaisten dela.', 'El siguiente menos el anterior: $14-20=-6$. El signo dice que baja.', 'التالي ناقص السابق: $14-20=-6$. والإشارة تدل على أنها تتناقص.', 'The next minus the previous: $14-20=-6$. The sign says it goes down.')
        }
    },
    'arith-general': {
        mistake: {
            wrong: say('$a_{1}=7$ eta $d=3$: $a_{20}=7+20\\cdot 3=67$.', '$a_{1}=7$ y $d=3$: $a_{20}=7+20\\cdot 3=67$.', '$a_{1}=7$ و$d=3$: $a_{20}=7+20\\cdot 3=67$.', '$a_{1}=7$ and $d=3$: $a_{20}=7+20\\cdot 3=67$.'),
            right: say('Lehen gaitik hogeigarrenera 19 salto daude, ez 20: $a_{20}=7+19\\cdot 3=64$.', 'Del primero al vigésimo hay 19 saltos, no 20: $a_{20}=7+19\\cdot 3=64$.', 'من الأول إلى العشرين 19 قفزة لا 20: $a_{20}=7+19\\cdot 3=64$.', 'From the first to the twentieth there are 19 jumps, not 20: $a_{20}=7+19\\cdot 3=64$.')
        },
        check: {
            prompt: say('Progresio aritmetiko batean $a_{1}=5$ eta $d=4$. Zenbat balio du $a_{10}$ gaiak?', 'En una progresión aritmética, $a_{1}=5$ y $d=4$. ¿Cuánto vale $a_{10}$?', 'في متتالية حسابية $a_{1}=5$ و$d=4$. كم يساوي $a_{10}$؟', 'In an arithmetic sequence, $a_{1}=5$ and $d=4$. What is $a_{10}$?'),
            options: [same('$45$'), same('$40$'), same('$41$')],
            correctIndex: 2,
            explanation: say('Lehenengotik hamargarrenera 9 jauzi daude: $5+9\\cdot 4=41$.', 'Del primero al décimo hay 9 saltos: $5+9\\cdot 4=41$.', 'من الأول إلى العاشر 9 قفزات: $5+9\\cdot 4=41$.', 'From the first to the tenth there are 9 jumps: $5+9\\cdot 4=41$.')
        }
    },
    'arith-find': {
        mistake: {
            wrong: say('$a_{3}=11$ eta $a_{8}=31$: $d=\\frac{31-11}{8-3+1}=\\frac{20}{6}$.', '$a_{3}=11$ y $a_{8}=31$: $d=\\frac{31-11}{8-3+1}=\\frac{20}{6}$.', '$a_{3}=11$ و$a_{8}=31$: $d=\\frac{31-11}{8-3+1}=\\frac{20}{6}$.', '$a_{3}=11$ and $a_{8}=31$: $d=\\frac{31-11}{8-3+1}=\\frac{20}{6}$.'),
            right: say('Saltoak zenbatzen dira, ez gaiak: hirugarren lekutik zortzigarrenera $8-3=5$ salto, $d=4$.', 'Se cuentan los saltos, no los términos: del lugar 3 al 8 hay $8-3=5$ saltos, $d=4$.', 'تُعدّ القفزات لا الحدود: من الرتبة 3 إلى 8 هناك $8-3=5$ قفزات، $d=4$.', 'Count the jumps, not the terms: from position 3 to 8 there are $8-3=5$ jumps, $d=4$.')
        },
        check: {
            prompt: say('$a_{2}=7$ eta $a_{6}=23$. Zein da $d$?', '$a_{2}=7$ y $a_{6}=23$. ¿Cuál es $d$?', '$a_{2}=7$ و$a_{6}=23$. ما قيمة $d$؟', '$a_{2}=7$ and $a_{6}=23$. What is $d$?'),
            options: [same('$d=4$'), same('$d=\\frac{16}{5}$'), same('$d=\\frac{23}{6}$')],
            correctIndex: 0,
            explanation: say('2. lekutik 6.era $6-2=4$ jauzi daude: $d=\\frac{23-7}{4}=4$.', 'Del lugar 2 al 6 hay $6-2=4$ saltos: $d=\\frac{23-7}{4}=4$.', 'من الرتبة 2 إلى 6 توجد $6-2=4$ قفزات: $d=\\frac{23-7}{4}=4$.', 'From place 2 to 6 there are $6-2=4$ jumps: $d=\\frac{23-7}{4}=4$.')
        }
    },
    gauss: {
        mistake: {
            wrong: say('$1+2+\\cdots+40$: 40 bikote daude, beraz $40\\cdot 41=1640$.', '$1+2+\\cdots+40$: hay 40 parejas, así que $40\\cdot 41=1640$.', '$1+2+\\cdots+40$: هناك 40 زوجًا، إذن $40\\cdot 41=1640$.', '$1+2+\\cdots+40$: there are 40 pairs, so $40\\cdot 41=1640$.'),
            right: say('40 gai daude, eta bikote bakoitzak bi hartzen ditu: 20 bikote. $20\\cdot 41=820$.', 'Hay 40 términos, y cada pareja coge dos: 20 parejas. $20\\cdot 41=820$.', 'هناك 40 حدًا وكل زوج يأخذ حدّين: 20 زوجًا. $20\\cdot 41=820$.', 'There are 40 terms, and each pair takes two: 20 pairs. $20\\cdot 41=820$.')
        },
        check: {
            prompt: say('Zenbat da $1+2+3+\\cdots+50$?', '¿Cuánto es $1+2+3+\\cdots+50$?', 'كم يساوي $1+2+3+\\cdots+50$؟', 'What is $1+2+3+\\cdots+50$?'),
            options: [same('$2550$'), same('$1275$'), same('$1250$')],
            correctIndex: 1,
            explanation: say('50 gai daude, beraz 25 bikote, eta bakoitzak $1+50=51$ balio du: $25\\cdot 51=1275$.', 'Hay 50 términos, así que 25 parejas, y cada una vale $1+50=51$: $25\\cdot 51=1275$.', 'هناك 50 حدًا، إذن 25 زوجًا، وكل زوج يساوي $1+50=51$: $25\\cdot 51=1275$.', 'There are 50 terms, so 25 pairs, each worth $1+50=51$: $25\\cdot 51=1275$.')
        }
    },
    'arith-sum': {
        mistake: {
            wrong: say('$S_{20}=(5+62)\\cdot 20=1340$.', '$S_{20}=(5+62)\\cdot 20=1340$.', '$S_{20}=(5+62)\\cdot 20=1340$.', '$S_{20}=(5+62)\\cdot 20=1340$.'),
            right: say('Hori batura bikoitza da (progresioa bi aldiz). Zatitu 2 zenbakiaz: $S_{20}=670$.', 'Eso es el doble de la suma (la progresión dos veces). Divide entre 2: $S_{20}=670$.', 'هذا ضعف المجموع (المتتالية مرتين). اقسم على 2: $S_{20}=670$.', 'That is twice the sum (the progression twice). Divide by 2: $S_{20}=670$.')
        },
        check: {
            prompt: say('Batu $1,\\,4,\\,7,\\ldots$ progresioaren lehen 10 gaiak.', 'Suma los 10 primeros términos de $1,\\,4,\\,7,\\ldots$', 'اجمع الحدود العشرة الأولى من $1,\\,4,\\,7,\\ldots$', 'Add the first 10 terms of $1,\\,4,\\,7,\\ldots$'),
            options: [same('$145$'), same('$290$'), same('$130$')],
            correctIndex: 0,
            explanation: say('$a_{10}=1+9\\cdot 3=28$ eta $S_{10}=\\frac{(1+28)\\cdot 10}{2}=145$. 290 bikoitza da, 2 zenbakiaz zatitu gabe.', '$a_{10}=1+9\\cdot 3=28$ y $S_{10}=\\frac{(1+28)\\cdot 10}{2}=145$. 290 es el doble, sin dividir entre 2.', '$a_{10}=1+9\\cdot 3=28$ و$S_{10}=\\frac{(1+28)\\cdot 10}{2}=145$. أما 290 فهو الضعف دون القسمة على 2.', '$a_{10}=1+9\\cdot 3=28$ and $S_{10}=\\frac{(1+28)\\cdot 10}{2}=145$. 290 is double, without dividing by 2.')
        }
    },
    'arith-problems': {
        mistake: {
            wrong: say('Egunero 0,5 km gehiago, 10 egunez, astelehenean 2 km: azken egunean $2+10\\cdot 0{,}5=7$ km.', 'Cada día 0,5 km más, 10 días, el lunes 2 km: el último día $2+10\\cdot 0{,}5=7$ km.', 'كل يوم 0.5 كم زيادة مدة 10 أيام والاثنين 2 كم: اليوم الأخير $2+10\\cdot 0{,}5=7$ كم.', 'Each day 0.5 km more, for 10 days, 2 km on Monday: on the last day $2+10\\cdot 0{,}5=7$ km.'),
            right: say('Astelehena lehen eguna da: hamargarren egunera 9 salto. $2+9\\cdot 0{,}5=6{,}5$ km.', 'El lunes es el primer día: hasta el décimo hay 9 saltos. $2+9\\cdot 0{,}5=6{,}5$ km.', 'الاثنين هو اليوم الأول: حتى العاشر 9 قفزات. $2+9\\cdot 0{,}5=6{,}5$ كم.', 'Monday is the first day: up to the tenth there are 9 jumps. $2+9\\cdot 0{,}5=6{,}5$ km.')
        },
        check: {
            prompt: say('Norbaitek 3 km egiten ditu korrika lehen egunean, eta egun bakoitzean km 1 gehiago. Zenbat egiten ditu 8. egunean?', 'Una persona corre 3 km el primer día y cada día 1 km más. ¿Cuánto corre el día 8?', 'يجري شخص 3 كم في اليوم الأول ثم 1 كم أكثر كل يوم. كم يجري في اليوم الثامن؟', 'A person runs 3 km on the first day and 1 km more each day. How far do they run on day 8?'),
            options: [say('11 km', '11 km', '11 كم', '11 km'), say('10 km', '10 km', '10 كم', '10 km'), say('52 km', '52 km', '52 كم', '52 km')],
            correctIndex: 1,
            explanation: say('Lehen eguna $a_{1}=3$ da: 8. egunera arte 7 jauzi daude, $3+7\\cdot 1=10$.', 'El primer día es $a_{1}=3$: hasta el día 8 hay 7 saltos, $3+7\\cdot 1=10$.', 'اليوم الأول هو $a_{1}=3$: حتى اليوم الثامن 7 قفزات، $3+7\\cdot 1=10$.', 'The first day is $a_{1}=3$: up to day 8 there are 7 jumps, $3+7\\cdot 1=10$.')
        }
    },
    'geo-ratio': {
        mistake: {
            wrong: say('$48,\\,24,\\,12$ segidan, $r=-24$, 24 kentzen delako.', 'En $48,\\,24,\\,12$, $r=-24$, porque se resta 24.', 'في $48,\\,24,\\,12$ يكون $r=-24$ لأننا نطرح 24.', 'In $48,\\,24,\\,12$, $r=-24$, because 24 is subtracted.'),
            right: say('Arrazoia zatidura da, ez kendura (kendura ez da beti bera: 24, 12…). $r=\\frac{24}{48}=\\frac{1}{2}$.', 'La razón es un cociente, no una resta (la resta no es siempre igual: 24, 12…). $r=\\frac{24}{48}=\\frac{1}{2}$.', 'الأساس حاصل قسمة لا فرق (الفرق ليس ثابتًا: 24، 12…). $r=\\frac{24}{48}=\\frac{1}{2}$.', 'The ratio is a quotient, not a difference (the difference is not always the same: 24, 12…). $r=\\frac{24}{48}=\\frac{1}{2}$.')
        },
        check: {
            prompt: say('Zein da $81,\\ 27,\\ 9,\\ 3,\\ldots$ progresioaren arrazoia?', '¿Cuál es la razón de $81,\\ 27,\\ 9,\\ 3,\\ldots$?', 'ما أساس المتتالية $81,\\ 27,\\ 9,\\ 3,\\ldots$؟', 'What is the ratio of $81,\\ 27,\\ 9,\\ 3,\\ldots$?'),
            options: [same('$r=-54$'), same('$r=\\frac{1}{3}$'), same('$r=3$')],
            correctIndex: 1,
            explanation: say('Arrazoia zatidura bat da: $\\frac{27}{81}=\\frac{9}{27}=\\frac{1}{3}$. Gaiak txikitzen dira, beraz $r$ 1 baino txikiagoa da.', 'La razón es un cociente: $\\frac{27}{81}=\\frac{9}{27}=\\frac{1}{3}$. Los términos bajan, así que $r$ es menor que 1.', 'الأساس حاصل قسمة: $\\frac{27}{81}=\\frac{9}{27}=\\frac{1}{3}$. والحدود تتناقص، إذن $r$ أصغر من 1.', 'The ratio is a quotient: $\\frac{27}{81}=\\frac{9}{27}=\\frac{1}{3}$. The terms go down, so $r$ is less than 1.')
        }
    },
    'geo-general': {
        mistake: {
            wrong: say('$a_{1}=5$, $r=3$: $a_{5}=(5\\cdot 3)^{4}=50\\,625$.', '$a_{1}=5$, $r=3$: $a_{5}=(5\\cdot 3)^{4}=50\\,625$.', '$a_{1}=5$ و$r=3$: $a_{5}=(5\\cdot 3)^{4}=50\\,625$.', '$a_{1}=5$, $r=3$: $a_{5}=(5\\cdot 3)^{4}=50\\,625$.'),
            right: say('Berretzaileak $r$ zenbakiari bakarrik eragiten dio: $5\\cdot 3^{4}=405$.', 'El exponente solo afecta a $r$: $5\\cdot 3^{4}=405$.', 'الأس يؤثر في $r$ فقط: $5\\cdot 3^{4}=405$.', 'The exponent only applies to $r$: $5\\cdot 3^{4}=405$.')
        },
        check: {
            prompt: say('$a_{1}=4$ eta $r=2$ badira, zenbat balio du $a_{5}$ gaiak?', 'Si $a_{1}=4$ y $r=2$, ¿cuánto vale $a_{5}$?', 'إذا كان $a_{1}=4$ و$r=2$ فكم يساوي $a_{5}$؟', 'If $a_{1}=4$ and $r=2$, what is $a_{5}$?'),
            options: [same('$64$'), same('$4096$'), same('$128$')],
            correctIndex: 0,
            explanation: say('Berretzaileak $r$ zenbakiari bakarrik eragiten dio: $a_{5}=4\\cdot 2^{4}=4\\cdot 16=64$.', 'El exponente solo afecta a $r$: $a_{5}=4\\cdot 2^{4}=4\\cdot 16=64$.', 'الأس لا يؤثر إلا في $r$: $a_{5}=4\\cdot 2^{4}=4\\cdot 16=64$.', 'The exponent only affects $r$: $a_{5}=4\\cdot 2^{4}=4\\cdot 16=64$.')
        }
    },
    'geo-find': {
        mistake: {
            wrong: say('$a_{2}=6$ eta $a_{5}=162$: $r=\\frac{162}{6}=27$.', '$a_{2}=6$ y $a_{5}=162$: $r=\\frac{162}{6}=27$.', '$a_{2}=6$ و$a_{5}=162$: $r=\\frac{162}{6}=27$.', '$a_{2}=6$ and $a_{5}=162$: $r=\\frac{162}{6}=27$.'),
            right: say('27 hiru biderketen ondorioa da, $r^{3}$. $r=3$.', '27 es el resultado de tres multiplicaciones, $r^{3}$. $r=3$.', '27 ناتج ثلاث عمليات ضرب، $r^{3}$. $r=3$.', '27 is the result of three multiplications, $r^{3}$. $r=3$.')
        },
        check: {
            prompt: say('$a_{1}=2$ eta $a_{4}=250$. Zein da $r$?', '$a_{1}=2$ y $a_{4}=250$. ¿Cuál es $r$?', '$a_{1}=2$ و$a_{4}=250$. ما قيمة $r$؟', '$a_{1}=2$ and $a_{4}=250$. What is $r$?'),
            options: [same('$r=125$'), same('$r=5$'), same('$r=\\frac{248}{3}$')],
            correctIndex: 1,
            explanation: say('3 jauzi: $r^{3}=\\frac{250}{2}=125$; beraz, $r=\\sqrt[3]{125}=5$.', '3 saltos: $r^{3}=\\frac{250}{2}=125$, así que $r=\\sqrt[3]{125}=5$.', 'ثلاث قفزات: $r^{3}=\\frac{250}{2}=125$، إذن $r=\\sqrt[3]{125}=5$.', '3 jumps: $r^{3}=\\frac{250}{2}=125$, so $r=\\sqrt[3]{125}=5$.')
        }
    },
    'geo-sum': {
        mistake: {
            wrong: say('$S_{6}=\\frac{(a_{1}+a_{6})\\cdot 6}{2}=\\frac{(3+96)\\cdot 6}{2}=297$.', '$S_{6}=\\frac{(a_{1}+a_{6})\\cdot 6}{2}=\\frac{(3+96)\\cdot 6}{2}=297$.', '$S_{6}=\\frac{(a_{1}+a_{6})\\cdot 6}{2}=\\frac{(3+96)\\cdot 6}{2}=297$.', '$S_{6}=\\frac{(a_{1}+a_{6})\\cdot 6}{2}=\\frac{(3+96)\\cdot 6}{2}=297$.'),
            right: say('Gaussen formula aritmetikoentzat da. Geometrikoan: $S_{6}=\\frac{3\\cdot(2^{6}-1)}{2-1}=189$.', 'La fórmula de Gauss es para las aritméticas. En la geométrica: $S_{6}=\\frac{3\\cdot(2^{6}-1)}{2-1}=189$.', 'صيغة غاوس للحسابية. وفي الهندسية: $S_{6}=\\frac{3\\cdot(2^{6}-1)}{2-1}=189$.', 'Gauss\'s formula is for arithmetic progressions. For a geometric one: $S_{6}=\\frac{3\\cdot(2^{6}-1)}{2-1}=189$.')
        },
        check: {
            prompt: say('Zenbat da $1+3+9+27+81$?', '¿Cuánto es $1+3+9+27+81$?', 'كم يساوي $1+3+9+27+81$؟', 'What is $1+3+9+27+81$?'),
            options: [same('$121$'), same('$205$'), same('$243$')],
            correctIndex: 0,
            explanation: say('$r=3$ eta 5 gai: $\\frac{1\\cdot(3^{5}-1)}{3-1}=\\frac{242}{2}=121$. 205 Gaussen formularekin ateratzen da, eta hura aritmetikoetarako da.', '$r=3$ y 5 términos: $\\frac{1\\cdot(3^{5}-1)}{3-1}=\\frac{242}{2}=121$. 205 sale con la fórmula de Gauss, que es para las aritméticas.', '$r=3$ و5 حدود: $\\frac{1\\cdot(3^{5}-1)}{3-1}=\\frac{242}{2}=121$. أما 205 فتخرج بصيغة غاوس، وهي للمتتاليات الحسابية.', '$r=3$ and 5 terms: $\\frac{1\\cdot(3^{5}-1)}{3-1}=\\frac{242}{2}=121$. 205 comes from Gauss’s formula, which is for arithmetic sequences.')
        }
    },
    'geo-infinite': {
        mistake: {
            wrong: say('$5+10+20+\\cdots$ batura: $\\frac{5}{1-2}=-5$.', 'La suma $5+10+20+\\cdots$: $\\frac{5}{1-2}=-5$.', 'المجموع $5+10+20+\\cdots$: $\\frac{5}{1-2}=-5$.', 'The sum $5+10+20+\\cdots$: $\\frac{5}{1-2}=-5$.'),
            right: say('Formula $|r|<1$ denean bakarrik da baliozkoa. Hemen $r=2$: gaiak hazi egiten dira eta batura infinitua da.', 'La fórmula solo vale si $|r|<1$. Aquí $r=2$: los términos crecen y la suma es infinita.', 'الصيغة صالحة فقط إذا $|r|<1$. وهنا $r=2$: الحدود تكبر والمجموع لا نهائي.', 'The formula only works if $|r|<1$. Here $r=2$: the terms grow and the sum is infinite.')
        },
        check: {
            prompt: say('Zenbat batzen dute $0{,}6+0{,}06+0{,}006+\\cdots$ gaiek?', '¿Cuánto suman $0{,}6+0{,}06+0{,}006+\\cdots$?', 'كم مجموع $0{,}6+0{,}06+0{,}006+\\cdots$؟', 'What is $0{,}6+0{,}06+0{,}006+\\cdots$?'),
            options: [say('Infinitua', 'Infinito', 'لا نهائي', 'Infinite'), same('$\\frac{2}{3}$'), same('$0{,}6$')],
            correctIndex: 1,
            explanation: say('$r=0{,}1$, eta $|r|<1$: $S=\\frac{0{,}6}{1-0{,}1}=\\frac{0{,}6}{0{,}9}=\\frac{2}{3}$. Hau $0{,}\\overline{6}$ da.', '$r=0{,}1$, y $|r|<1$: $S=\\frac{0{,}6}{1-0{,}1}=\\frac{0{,}6}{0{,}9}=\\frac{2}{3}$. Es $0{,}\\overline{6}$.', '$r=0{,}1$ و$|r|<1$: $S=\\frac{0{,}6}{1-0{,}1}=\\frac{0{,}6}{0{,}9}=\\frac{2}{3}$. وهو $0{,}\\overline{6}$.', '$r=0{,}1$, and $|r|<1$: $S=\\frac{0{,}6}{1-0{,}1}=\\frac{0{,}6}{0{,}9}=\\frac{2}{3}$. It is $0{,}\\overline{6}$.')
        }
    },
    'geo-problems': {
        mistake: {
            wrong: say('500 bakterio, orduro bikoiztuz, 6 ordu: $500\\cdot 2\\cdot 6=6000$.', '500 bacterias que se duplican cada hora, 6 horas: $500\\cdot 2\\cdot 6=6000$.', '500 بكتيريا تتضاعف كل ساعة مدة 6 ساعات: $500\\cdot 2\\cdot 6=6000$.', '500 bacteria doubling every hour, 6 hours: $500\\cdot 2\\cdot 6=6000$.'),
            right: say('Ordu bakoitzean bider 2 egiten da: hori berretura da, ez biderketa bakarra. $500\\cdot 2^{6}=32\\,000$.', 'Cada hora se multiplica por 2: eso es una potencia, no un solo producto. $500\\cdot 2^{6}=32\\,000$.', 'كل ساعة نضرب في 2: هذه قوة لا ضرب واحد. $500\\cdot 2^{6}=32\\,000$.', 'Each hour you multiply by 2: that is a power, not a single product. $500\\cdot 2^{6}=32\\,000$.')
        },
        check: {
            prompt: say('15 000 €-ko auto batek bere balioaren % 10 galtzen du urtero. Zenbat balioko du 3 urte barru?', 'Un coche de 15 000 € pierde un 10 % de su valor cada año. ¿Cuánto valdrá dentro de 3 años?', 'سيارة ثمنها 15 000 € تفقد 10٪ من قيمتها كل سنة. كم ستساوي بعد 3 سنوات؟', 'A €15,000 car loses 10% of its value every year. What will it be worth in 3 years?'),
            options: [say('10 500 €', '10 500 €', '10 500 €', '€10,500'), say('10 935 €', '10 935 €', '10 935 €', '€10,935'), say('13 500 €', '13 500 €', '13 500 €', '€13,500')],
            correctIndex: 1,
            explanation: say('Urtero $r=0{,}9$ zenbakiaz biderkatzen da: $15\\,000\\cdot 0{,}9^{3}=10\\,935$. 10 500 € urtero kopuru bera kenduz ateratzen da.', 'Cada año se multiplica por $r=0{,}9$: $15\\,000\\cdot 0{,}9^{3}=10\\,935$. 10 500 € sale al restar cada año lo mismo.', 'نضرب كل سنة في $r=0{,}9$: $15\\,000\\cdot 0{,}9^{3}=10\\,935$. أما 10 500 € فتخرج بطرح المقدار نفسه كل سنة.', 'Each year it is multiplied by $r=0{,}9$: $15\\,000\\cdot 0{,}9^{3}=10\\,935$. €10,500 comes from taking off the same amount each year.')
        }
    }
}

import { fraction, type FractionValue } from '../../features/unit-v2/math/fraction.ts'
import type { ChallengeItem, DiagnosticQuestion, ExerciseSection, PracticeItem } from '../../features/unit-v2/types.ts'
import { same, say } from '../dbh4-akademikoak-trigonometria/text.ts'

/* ==========================================================================
   Funtzio esponentzialak, logaritmikoak eta trigonometrikoak · 4. DBH
   akademikoak — diagnostic, guided practice, exercise bank and challenges,
   after Santillana 4.º Académicas unit 11 and the exponential and
   logarithmic part of Anaya 4.º Académicas unit 5. Every closed answer is
   a single number: a value, an exponent, a parameter, an angle in degrees,
   or the coefficient a of a period written aπ. Inside formulas \sen and
   \tg become each language's names.
   ========================================================================== */

/** A decimal written with the comma, as an exact fraction */
const v = (text: string): FractionValue => {
    const negative = text.startsWith('-')
    const [whole, decimals = ''] = text.replace('-', '').split(',')
    return fraction((negative ? -1 : 1) * Number(whole + decimals), 10 ** decimals.length)
}
const n = (value: number) => fraction(value)

export const exponentialAkDiagnostic: DiagnosticQuestion[] = [
    {
        id: 6001,
        prompt: say('Zein puntutatik pasatzen da beti $y=5^{x}$?', '¿Por qué punto pasa siempre $y=5^{x}$?', 'بأي نقطة تمر $y=5^{x}$ دائمًا؟'),
        options: [same('$(0,\\,1)$'), same('$(1,\\,0)$'), same('$(0,\\,5)$')],
        correctIndex: 0,
        explanation: same('$5^{0}=1$'),
        topic: 'exp-graph'
    },
    {
        id: 6002,
        prompt: say('$2^{-3}$ hau da:', '$2^{-3}$ vale:', '$2^{-3}$ تساوي:'),
        options: [same('$-8$'), same('$\\frac{1}{8}$'), same('$-6$')],
        correctIndex: 1,
        explanation: same('$2^{-3}=\\frac{1}{2^{3}}=\\frac{1}{8}$'),
        topic: 'exp-values'
    },
    {
        id: 6003,
        prompt: say('1 000 € % 4an interes konposatuan. Zenbat diru $t$ urtean?', '1 000 € al 4 % de interés compuesto. ¿Cuánto dinero hay en $t$ años?', '1000 € بفائدة مركبة 4 %. كم يصبح المال بعد $t$ سنة؟'),
        options: [same('$1\\,000+40t$'), same('$1\\,000\\cdot 0{,}04^{t}$'), same('$1\\,000\\cdot 1{,}04^{t}$')],
        correctIndex: 2,
        explanation: say('Urtero $1{,}04$-z biderkatzen da.', 'Cada año se multiplica por $1{,}04$.', 'يُضرب كل سنة في $1{,}04$.'),
        topic: 'growth'
    },
    {
        id: 6004,
        prompt: say('$3^{x}=81$ ekuazioaren soluzioa:', 'La solución de $3^{x}=81$ es:', 'حل المعادلة $3^{x}=81$ هو:'),
        options: [same('$x=4$'), same('$x=27$'), same('$x=3$')],
        correctIndex: 0,
        explanation: same('$81=3^{4}$'),
        topic: 'exp-equations'
    },
    {
        id: 6005,
        prompt: say('$\\log_2 32$ hau da:', '$\\log_2 32$ vale:', '$\\log_2 32$ تساوي:'),
        options: [same('$16$'), same('$5$'), same('$64$')],
        correctIndex: 1,
        explanation: same('$2^{5}=32$'),
        topic: 'log-values'
    },
    {
        id: 6006,
        prompt: say('$y=\\log x$ funtzioaren izate-eremua:', 'El dominio de $y=\\log x$ es:', 'مجال $y=\\log x$ هو:'),
        options: [same('$\\mathbb{R}$'), same('$[0,\\,+\\infty)$'), same('$(0,\\,+\\infty)$')],
        correctIndex: 2,
        explanation: say('0k eta negatiboek ez dute logaritmorik.', 'El 0 y los negativos no tienen logaritmo.', 'الصفر والأعداد السالبة ليس لها لوغاريتم.'),
        topic: 'log-graph'
    },
    {
        id: 6007,
        prompt: say('$y=\\sen x$ funtzioaren periodoa:', 'El periodo de $y=\\sen x$ es:', 'دور $y=\\sen x$ هو:'),
        options: [same('$2\\pi$'), same('$\\pi$'), same('$\\frac{\\pi}{2}$')],
        correctIndex: 0,
        explanation: same('$\\sen(x+2\\pi)=\\sen x$'),
        topic: 'sine'
    },
    {
        id: 6008,
        prompt: say('$y=\\cos 2x$ funtzioaren periodoa:', 'El periodo de $y=\\cos 2x$ es:', 'دور $y=\\cos 2x$ هو:'),
        options: [same('$2\\pi$'), same('$\\pi$'), same('$4\\pi$')],
        correctIndex: 1,
        explanation: same('$T=\\frac{2\\pi}{2}=\\pi$'),
        topic: 'period'
    }
]

export const exponentialAkPractice: PracticeItem[] = [
    /* ---------- The exponential function ---------- */
    {
        id: 1, stage: 'exponential',
        prompt: say('$f(x)=2^{x}$ izanik, kalkulatu $f(-3)$.', 'Siendo $f(x)=2^{x}$, calcula $f(-3)$.', 'إذا كان $f(x)=2^{x}$ فاحسب $f(-3)$.'),
        expected: fraction(1, 8),
        hint: say('Berretzaile negatiboa: alderantzizkoa.', 'Exponente negativo: el inverso.', 'أس سالب: المقلوب.'),
        explanation: same('$2^{-3}=\\frac{1}{2^{3}}=\\frac{1}{8}$')
    },
    {
        id: 2, stage: 'exponential',
        prompt: say('$f(x)=9^{x}$ izanik, kalkulatu $f\\left(\\frac{3}{2}\\right)$.', 'Siendo $f(x)=9^{x}$, calcula $f\\left(\\frac{3}{2}\\right)$.', 'إذا كان $f(x)=9^{x}$ فاحسب $f\\left(\\frac{3}{2}\\right)$.'),
        expected: n(27),
        hint: say('Izendatzailea erroaren indizea da.', 'El denominador es el índice de la raíz.', 'المقام دليل الجذر.'),
        explanation: same('$9^{\\frac{3}{2}}=\\sqrt{9^{3}}=27$')
    },
    {
        id: 3, stage: 'exponential',
        prompt: say('$y=4^{x-1}+2$ funtzioaren asintota horizontala $y=k$ da. Zenbat da $k$?', 'La asíntota horizontal de $y=4^{x-1}+2$ es $y=k$. ¿Cuánto vale $k$?', 'المقارب الأفقي لـ $y=4^{x-1}+2$ هو $y=k$. كم قيمة $k$؟'),
        expected: n(2),
        hint: say('$4^{x-1}$ ez da inoiz 0, baina hurbiltzen da.', '$4^{x-1}$ nunca vale 0, pero se acerca.', '$4^{x-1}$ لا يساوي 0 أبدًا لكنه يقترب منه.'),
        explanation: say('$4^{x-1}>0$, beraz $y>2$: asintota $y=2$.', '$4^{x-1}>0$, así que $y>2$: la asíntota es $y=2$.', '$4^{x-1}>0$ إذن $y>2$: المقارب $y=2$.')
    },
    {
        id: 4, stage: 'exponential',
        prompt: say('Zein abszisatan ebakitzen du $y=3^{x+1}-9$ funtzioak X ardatza?', '¿En qué abscisa corta $y=3^{x+1}-9$ al eje X?', 'عند أي إحداثي سيني تقطع $y=3^{x+1}-9$ محور X؟'),
        expected: n(1),
        hint: say('Berdindu 0ri eta idatzi 9 hiruren berretura gisa.', 'Iguala a 0 y escribe 9 como potencia de 3.', 'ساوِ بـ 0 واكتب 9 قوةً للعدد 3.'),
        explanation: same('$3^{x+1}=9=3^{2}\\ \\to\\ x+1=2\\ \\to\\ x=1$')
    },
    /* ---------- Growth and equations ---------- */
    {
        id: 5, stage: 'growth',
        prompt: say('2 000 € % 5ean jarri dira interes konposatuan. Zenbat diru izango da 2 urtean (€)?', 'Se ponen 2 000 € al 5 % de interés compuesto. ¿Cuánto habrá en 2 años (€)?', 'وُضع 2000 € بفائدة مركبة 5 %. كم يصبح المبلغ بعد سنتين (€)؟'),
        expected: n(2205),
        hint: say('Urtero $1{,}05$-z biderkatu.', 'Multiplica por $1{,}05$ cada año.', 'اضرب في $1{,}05$ كل سنة.'),
        explanation: same('$2\\,000\\cdot 1{,}05^{2}=2\\,000\\cdot 1{,}1025=2\\,205$')
    },
    {
        id: 6, stage: 'growth',
        prompt: say('Bakterio-kolonia bat orduro hirukoizten da eta 200 bakteriorekin hasten da. Zenbat izango dira 3 ordutan?', 'Una colonia de bacterias se triplica cada hora y empieza con 200. ¿Cuántas habrá en 3 horas?', 'تتضاعف مستعمرة بكتيريا ثلاث مرات كل ساعة وتبدأ بـ 200. كم يصبح عددها بعد 3 ساعات؟'),
        expected: n(5400),
        hint: say('$N=200\\cdot 3^{t}$.', '$N=200\\cdot 3^{t}$.', '$N=200\\cdot 3^{t}$.'),
        explanation: same('$200\\cdot 3^{3}=200\\cdot 27=5\\,400$')
    },
    {
        id: 7, stage: 'growth',
        prompt: say('Substantzia baten erdibizitza 6 egun da. 64 g badira, zenbat gramo geratuko dira 18 egunean?', 'Una sustancia tiene una semivida de 6 días. Si hay 64 g, ¿cuántos gramos quedarán en 18 días?', 'عمر النصف لمادة 6 أيام. إذا كان لدينا 64 غ فكم غرامًا يبقى بعد 18 يومًا؟'),
        expected: n(8),
        hint: say('Zenbat erdibizitza dira 18 egun?', '¿Cuántas semividas son 18 días?', 'كم عمر نصف في 18 يومًا؟'),
        explanation: same('$\\frac{18}{6}=3\\qquad 64\\cdot\\frac{1}{2^{3}}=8$')
    },
    {
        id: 8, stage: 'growth',
        prompt: say('Ebatzi $2^{x-1}=16$.', 'Resuelve $2^{x-1}=16$.', 'حُلّ $2^{x-1}=16$.'),
        expected: n(5),
        hint: say('$16=2^{4}$.', '$16=2^{4}$.', '$16=2^{4}$.'),
        explanation: same('$2^{x-1}=2^{4}\\ \\to\\ x-1=4\\ \\to\\ x=5$')
    },
    /* ---------- The logarithmic function ---------- */
    {
        id: 9, stage: 'logarithmic',
        prompt: say('Kalkulatu $\\log_3 81$.', 'Calcula $\\log_3 81$.', 'احسب $\\log_3 81$.'),
        expected: n(4),
        hint: say('3 ber zenbat da 81?', '¿3 elevado a cuánto da 81?', '3 أس كم يساوي 81؟'),
        explanation: same('$3^{4}=81$')
    },
    {
        id: 10, stage: 'logarithmic',
        prompt: say('Kalkulatu $\\log_2\\frac{1}{8}$.', 'Calcula $\\log_2\\frac{1}{8}$.', 'احسب $\\log_2\\frac{1}{8}$.'),
        expected: n(-3),
        hint: say('Alderantzizkoa: berretzaile negatiboa.', 'El inverso: exponente negativo.', 'المقلوب: أس سالب.'),
        explanation: same('$2^{-3}=\\frac{1}{8}$')
    },
    {
        id: 11, stage: 'logarithmic',
        prompt: say('Zein da $y=\\log_2(x-3)$ funtzioaren izate-eremuaren ezkerreko muturra?', '¿Cuál es el extremo izquierdo del dominio de $y=\\log_2(x-3)$?', 'ما الطرف الأيسر لمجال $y=\\log_2(x-3)$؟'),
        expected: n(3),
        hint: say('Barrukoak positiboa izan behar du.', 'Lo de dentro tiene que ser positivo.', 'يجب أن يكون ما بالداخل موجبًا.'),
        explanation: same('$x-3>0\\ \\to\\ x>3\\qquad (3,\\,+\\infty)$')
    },
    {
        id: 12, stage: 'logarithmic',
        prompt: say('Zein abszisatan ebakitzen du $y=\\log_2 x+3$ funtzioak X ardatza?', '¿En qué abscisa corta $y=\\log_2 x+3$ al eje X?', 'عند أي إحداثي سيني تقطع $y=\\log_2 x+3$ محور X؟'),
        expected: fraction(1, 8),
        hint: say('$\\log_2 x=-3$.', '$\\log_2 x=-3$.', '$\\log_2 x=-3$.'),
        explanation: same('$\\log_2 x=-3\\ \\to\\ x=2^{-3}=\\frac{1}{8}$')
    },
    /* ---------- Sine and cosine ---------- */
    {
        id: 13, stage: 'trigonometric',
        prompt: say('Kalkulatu $\\sen\\frac{7\\pi}{6}$.', 'Calcula $\\sen\\frac{7\\pi}{6}$.', 'احسب $\\sen\\frac{7\\pi}{6}$.'),
        expected: fraction(-1, 2),
        hint: say('$\\frac{7\\pi}{6}=210°$: III. koadrantea, sinua negatiboa.', '$\\frac{7\\pi}{6}=210°$: tercer cuadrante, seno negativo.', '$\\frac{7\\pi}{6}=210°$: الربع الثالث، الجيب سالب.'),
        explanation: same('$\\sen\\frac{7\\pi}{6}=-\\sen\\frac{\\pi}{6}=-\\frac{1}{2}$')
    },
    {
        id: 14, stage: 'trigonometric',
        prompt: say('Kalkulatu $\\cos 3\\pi$.', 'Calcula $\\cos 3\\pi$.', 'احسب $\\cos 3\\pi$.'),
        expected: n(-1),
        hint: say('Kendu buelta bat ($2\\pi$).', 'Quita una vuelta ($2\\pi$).', 'احذف دورة ($2\\pi$).'),
        explanation: same('$\\cos 3\\pi=\\cos\\pi=-1$')
    },
    {
        id: 15, stage: 'trigonometric',
        prompt: say('Zenbat gradu dira $\\frac{5\\pi}{4}$ rad?', '¿Cuántos grados son $\\frac{5\\pi}{4}$ rad?', 'كم درجة تساوي $\\frac{5\\pi}{4}$ rad؟'),
        expected: n(225),
        hint: say('$\\pi$ rad $=180°$.', '$\\pi$ rad $=180°$.', '$\\pi$ rad $=180°$.'),
        explanation: same('$\\frac{5\\cdot 180°}{4}=225°$')
    },
    {
        id: 16, stage: 'trigonometric',
        prompt: say('Zenbat zero ditu $y=\\sen x$ funtzioak $[0,\\,2\\pi]$ tartean?', '¿Cuántos ceros tiene $y=\\sen x$ en $[0,\\,2\\pi]$?', 'كم صفرًا للدالة $y=\\sen x$ في $[0,\\,2\\pi]$؟'),
        expected: n(3),
        hint: say('Zeroak $k\\pi$ dira; muturrak barne.', 'Los ceros son $k\\pi$; extremos incluidos.', 'الأصفار $k\\pi$؛ مع الطرفين.'),
        explanation: say('$x=0$, $x=\\pi$ eta $x=2\\pi$: 3 zero.', '$x=0$, $x=\\pi$ y $x=2\\pi$: 3 ceros.', '$x=0$ و$x=\\pi$ و$x=2\\pi$: 3 أصفار.')
    },
    /* ---------- Amplitude, period and tangent ---------- */
    {
        id: 17, stage: 'transforms',
        prompt: say('Zein da $y=4\\sen x+1$ funtzioaren balio maximoa?', '¿Cuál es el valor máximo de $y=4\\sen x+1$?', 'ما القيمة العظمى لـ $y=4\\sen x+1$؟'),
        expected: n(5),
        hint: say('Maximoa $\\sen x=1$ denean.', 'El máximo, cuando $\\sen x=1$.', 'العظمى عندما $\\sen x=1$.'),
        explanation: same('$4+1=5$')
    },
    {
        id: 18, stage: 'transforms',
        prompt: say('$y=\\sen 3x$ funtzioaren periodoa $a\\pi$ da. Zenbat da $a$?', 'El periodo de $y=\\sen 3x$ es $a\\pi$. ¿Cuánto vale $a$?', 'دور $y=\\sen 3x$ هو $a\\pi$. كم قيمة $a$؟'),
        expected: fraction(2, 3),
        hint: say('$T=\\frac{2\\pi}{k}$.', '$T=\\frac{2\\pi}{k}$.', '$T=\\frac{2\\pi}{k}$.'),
        explanation: same('$T=\\frac{2\\pi}{3}=\\frac{2}{3}\\pi$')
    },
    {
        id: 19, stage: 'transforms',
        prompt: say('Zein da $y=2-3\\cos x$ funtzioaren balio minimoa?', '¿Cuál es el valor mínimo de $y=2-3\\cos x$?', 'ما القيمة الصغرى لـ $y=2-3\\cos x$؟'),
        expected: n(-1),
        hint: say('Minimoa $\\cos x=1$ denean.', 'El mínimo, cuando $\\cos x=1$.', 'الصغرى عندما $\\cos x=1$.'),
        explanation: same('$2-3=-1$')
    },
    {
        id: 20, stage: 'transforms',
        prompt: say('Kalkulatu $\\tg\\frac{3\\pi}{4}$.', 'Calcula $\\tg\\frac{3\\pi}{4}$.', 'احسب $\\tg\\frac{3\\pi}{4}$.'),
        expected: n(-1),
        hint: say('II. koadrantea: tangentea negatiboa.', 'Segundo cuadrante: tangente negativa.', 'الربع الثاني: الظل سالب.'),
        explanation: same('$\\tg\\frac{3\\pi}{4}=-\\tg\\frac{\\pi}{4}=-1$')
    }
]

export const exponentialAkChallenges: ChallengeItem[] = [
    /* ---------- The exponential function ---------- */
    {
        id: 101, stage: 'exponential', points: 10, context: 'starter',
        prompt: say('$f(x)=\\left(\\frac{1}{2}\\right)^{x}$ izanik, kalkulatu $f(-3)$.', 'Siendo $f(x)=\\left(\\frac{1}{2}\\right)^{x}$, calcula $f(-3)$.', 'إذا كان $f(x)=\\left(\\frac{1}{2}\\right)^{x}$ فاحسب $f(-3)$.'),
        expected: n(8),
        hint: say('$\\left(\\frac{1}{2}\\right)^{x}=2^{-x}$.', '$\\left(\\frac{1}{2}\\right)^{x}=2^{-x}$.', '$\\left(\\frac{1}{2}\\right)^{x}=2^{-x}$.'),
        explanation: same('$\\left(\\frac{1}{2}\\right)^{-3}=2^{3}=8$')
    },
    {
        id: 102, stage: 'exponential', points: 20, context: 'advanced',
        prompt: say('$y=a^{x}$ funtzioa $(2,\\,25)$ puntutik pasatzen da. Zenbat da $a$?', 'La función $y=a^{x}$ pasa por $(2,\\,25)$. ¿Cuánto vale $a$?', 'تمر الدالة $y=a^{x}$ بـ $(2,\\,25)$. كم قيمة $a$؟'),
        expected: n(5),
        hint: say('$a^{2}=25$ eta $a>0$.', '$a^{2}=25$ y $a>0$.', '$a^{2}=25$ و$a>0$.'),
        explanation: same('$a^{2}=25\\ \\to\\ a=5$')
    },
    {
        id: 103, stage: 'exponential', points: 30, context: 'master',
        prompt: say('$y=k\\cdot a^{x}$ funtzioa $(0,\\,3)$ eta $(2,\\,48)$ puntuetatik pasatzen da. Zenbat da $a$?', 'La función $y=k\\cdot a^{x}$ pasa por $(0,\\,3)$ y $(2,\\,48)$. ¿Cuánto vale $a$?', 'تمر الدالة $y=k\\cdot a^{x}$ بـ $(0,\\,3)$ و$(2,\\,48)$. كم قيمة $a$؟'),
        expected: n(4),
        hint: say('$x=0$ denean, $y=k$.', 'Con $x=0$, $y=k$.', 'عندما $x=0$ يكون $y=k$.'),
        explanation: same('$k=3\\qquad 3a^{2}=48\\ \\to\\ a^{2}=16\\ \\to\\ a=4$')
    },
    /* ---------- Growth and equations ---------- */
    {
        id: 104, stage: 'growth', points: 10, context: 'starter',
        prompt: say('20 000 €-ko auto batek urtero balioaren % 10 galtzen du. Zenbat balio du 2 urtera (€)?', 'Un coche de 20 000 € pierde cada año el 10 % de su valor. ¿Cuánto vale a los 2 años (€)?', 'سيارة قيمتها 20000 € تفقد كل سنة 10 % من قيمتها. كم قيمتها بعد سنتين (€)؟'),
        expected: n(16200),
        hint: say('Faktorea $0{,}9$ da.', 'El factor es $0{,}9$.', 'المعامل $0{,}9$.'),
        explanation: same('$20\\,000\\cdot 0{,}9^{2}=20\\,000\\cdot 0{,}81=16\\,200$')
    },
    {
        id: 105, stage: 'growth', points: 20, context: 'advanced',
        prompt: say('Ebatzi $9^{x}=27$.', 'Resuelve $9^{x}=27$.', 'حُلّ $9^{x}=27$.'),
        expected: fraction(3, 2),
        hint: say('Idatzi biak 3ren berretura gisa.', 'Escribe los dos como potencias de 3.', 'اكتب الطرفين قوتين للعدد 3.'),
        explanation: same('$3^{2x}=3^{3}\\ \\to\\ 2x=3\\ \\to\\ x=\\frac{3}{2}$')
    },
    {
        id: 106, stage: 'growth', points: 30, context: 'master',
        prompt: say('Kolonia bat 20 minuturo bikoizten da eta 100 bakteriorekin hasten da. Zenbat minututan iritsiko da 6 400 bakteriora?', 'Una colonia se duplica cada 20 minutos y empieza con 100 bacterias. ¿En cuántos minutos llegará a 6 400?', 'تتضاعف مستعمرة كل 20 دقيقة وتبدأ بـ 100 بكتيريا. في كم دقيقة تبلغ 6400؟'),
        expected: n(120),
        hint: say('Zenbat bikoizketa behar dira?', '¿Cuántas duplicaciones hacen falta?', 'كم تضاعفًا يلزم؟'),
        explanation: same('$2^{n}=64=2^{6}\\qquad 6\\cdot 20=120$')
    },
    /* ---------- The logarithmic function ---------- */
    {
        id: 107, stage: 'logarithmic', points: 10, context: 'starter',
        prompt: say('Kalkulatu $\\log_5\\frac{1}{25}$.', 'Calcula $\\log_5\\frac{1}{25}$.', 'احسب $\\log_5\\frac{1}{25}$.'),
        expected: n(-2),
        hint: say('$25=5^{2}$.', '$25=5^{2}$.', '$25=5^{2}$.'),
        explanation: same('$5^{-2}=\\frac{1}{25}$')
    },
    {
        id: 108, stage: 'logarithmic', points: 20, context: 'advanced',
        prompt: say('$\\log_a 64=3$ bada, zenbat da $a$?', 'Si $\\log_a 64=3$, ¿cuánto vale $a$?', 'إذا كان $\\log_a 64=3$ فكم قيمة $a$؟'),
        expected: n(4),
        hint: say('Definizioa: $a^{3}=64$.', 'Definición: $a^{3}=64$.', 'التعريف: $a^{3}=64$.'),
        explanation: same('$a^{3}=64\\ \\to\\ a=\\sqrt[3]{64}=4$')
    },
    {
        id: 109, stage: 'logarithmic', points: 30, context: 'master',
        prompt: say('$y=\\log_2(x+k)$ funtzioa $(2,\\,3)$ puntutik pasatzen da. Zenbat da $k$?', 'La función $y=\\log_2(x+k)$ pasa por $(2,\\,3)$. ¿Cuánto vale $k$?', 'تمر الدالة $y=\\log_2(x+k)$ بـ $(2,\\,3)$. كم قيمة $k$؟'),
        expected: n(6),
        hint: say('$\\log_2(2+k)=3$.', '$\\log_2(2+k)=3$.', '$\\log_2(2+k)=3$.'),
        explanation: same('$2+k=2^{3}=8\\ \\to\\ k=6$')
    },
    /* ---------- Sine and cosine ---------- */
    {
        id: 110, stage: 'trigonometric', points: 10, context: 'starter',
        prompt: say('Kalkulatu $\\sen\\frac{\\pi}{2}+\\cos\\pi$.', 'Calcula $\\sen\\frac{\\pi}{2}+\\cos\\pi$.', 'احسب $\\sen\\frac{\\pi}{2}+\\cos\\pi$.'),
        expected: n(0),
        hint: say('Begiratu zirkunferentzia unitarioari.', 'Mira la circunferencia unidad.', 'انظر إلى دائرة الوحدة.'),
        explanation: same('$1+(-1)=0$')
    },
    {
        id: 111, stage: 'trigonometric', points: 20, context: 'advanced',
        prompt: say('Kalkulatu $\\cos\\left(-\\frac{2\\pi}{3}\\right)$.', 'Calcula $\\cos\\left(-\\frac{2\\pi}{3}\\right)$.', 'احسب $\\cos\\left(-\\frac{2\\pi}{3}\\right)$.'),
        expected: fraction(-1, 2),
        hint: say('Kosinua bikoitia da.', 'El coseno es par.', 'جيب التمام دالة زوجية.'),
        explanation: same('$\\cos\\left(-\\frac{2\\pi}{3}\\right)=\\cos\\frac{2\\pi}{3}=-\\frac{1}{2}$')
    },
    {
        id: 112, stage: 'trigonometric', points: 30, context: 'master',
        prompt: say('Zenbat soluzio ditu $\\sen x=\\frac{1}{2}$ ekuazioak $[0,\\,2\\pi]$ tartean?', '¿Cuántas soluciones tiene $\\sen x=\\frac{1}{2}$ en $[0,\\,2\\pi]$?', 'كم حلًّا للمعادلة $\\sen x=\\frac{1}{2}$ في $[0,\\,2\\pi]$؟'),
        expected: n(2),
        hint: say('Sinua positiboa da I. eta II. koadranteetan.', 'El seno es positivo en los cuadrantes I y II.', 'الجيب موجب في الربعين الأول والثاني.'),
        explanation: say('$x=\\frac{\\pi}{6}$ eta $x=\\frac{5\\pi}{6}$: 2 soluzio.', '$x=\\frac{\\pi}{6}$ y $x=\\frac{5\\pi}{6}$: 2 soluciones.', '$x=\\frac{\\pi}{6}$ و$x=\\frac{5\\pi}{6}$: حلّان (2).')
    },
    /* ---------- Amplitude, period and tangent ---------- */
    {
        id: 113, stage: 'transforms', points: 10, context: 'starter',
        prompt: say('Zein da $y=3\\cos x$ funtzioaren balio maximoa?', '¿Cuál es el valor máximo de $y=3\\cos x$?', 'ما القيمة العظمى لـ $y=3\\cos x$؟'),
        expected: n(3),
        hint: say('$\\cos x$ gehienez 1 da.', '$\\cos x$ vale como mucho 1.', 'أكبر قيمة لـ $\\cos x$ هي 1.'),
        explanation: same('$3\\cdot 1=3$')
    },
    {
        id: 114, stage: 'transforms', points: 20, context: 'advanced',
        prompt: say('$y=A\\sen x+d$ funtzioak ($A>0$) 7 maximoa eta 1 minimoa ditu. Zenbat da $A$?', 'La función $y=A\\sen x+d$ ($A>0$) tiene máximo 7 y mínimo 1. ¿Cuánto vale $A$?', 'للدالة $y=A\\sen x+d$ ($A>0$) قيمة عظمى 7 وصغرى 1. كم قيمة $A$؟'),
        expected: n(3),
        hint: say('$d$ erdiko maila da; $A$, erdiko mailatik maximora dagoen distantzia.', '$d$ es el nivel medio; $A$, la distancia del nivel medio al máximo.', '$d$ المستوى الأوسط؛ و$A$ المسافة منه إلى العظمى.'),
        explanation: same('$d=\\frac{7+1}{2}=4\\qquad A=\\frac{7-1}{2}=3$')
    },
    {
        id: 115, stage: 'transforms', points: 30, context: 'master',
        prompt: say('$y=\\sen kx$ funtzioaren periodoa $\\frac{\\pi}{3}$ da ($k>0$). Zenbat da $k$?', 'El periodo de $y=\\sen kx$ es $\\frac{\\pi}{3}$ ($k>0$). ¿Cuánto vale $k$?', 'دور $y=\\sen kx$ هو $\\frac{\\pi}{3}$ ($k>0$). كم قيمة $k$؟'),
        expected: n(6),
        hint: say('$\\frac{2\\pi}{k}=\\frac{\\pi}{3}$.', '$\\frac{2\\pi}{k}=\\frac{\\pi}{3}$.', '$\\frac{2\\pi}{k}=\\frac{\\pi}{3}$.'),
        explanation: same('$\\frac{2\\pi}{k}=\\frac{\\pi}{3}\\ \\to\\ k=6$')
    }
]

export const exponentialAkExerciseBank: ExerciseSection[] = [
    {
        id: 'exponential',
        title: say('Funtzio esponentziala', 'Función exponencial', 'الدالة الأسية'),
        items: [
            { id: 1, difficulty: 'easy', question: say('$f(x)=5^{x}$ bada, kalkulatu $f(2)$.', 'Si $f(x)=5^{x}$, calcula $f(2)$.', 'إذا كان $f(x)=5^{x}$ فاحسب $f(2)$.'), solution: same('$5^{2}=25$'), answer: { expected: n(25) } },
            { id: 2, difficulty: 'easy', question: say('$f(x)=7^{x}$ bada, kalkulatu $f(0)$.', 'Si $f(x)=7^{x}$, calcula $f(0)$.', 'إذا كان $f(x)=7^{x}$ فاحسب $f(0)$.'), solution: same('$7^{0}=1$'), answer: { expected: n(1) } },
            { id: 3, difficulty: 'easy', question: say('$y=0{,}7^{x}$ funtzioa gorakorra da?', '¿Es creciente $y=0{,}7^{x}$?', 'هل $y=0{,}7^{x}$ متزايدة؟'), solution: say('Ez: $0<0{,}7<1$, beherakorra da.', 'No: $0<0{,}7<1$, es decreciente.', 'لا: $0<0{,}7<1$، إنها متناقصة.') },
            { id: 4, difficulty: 'medium', question: say('$f(x)=16^{x}$ bada, kalkulatu $f\\left(\\frac{1}{4}\\right)$.', 'Si $f(x)=16^{x}$, calcula $f\\left(\\frac{1}{4}\\right)$.', 'إذا كان $f(x)=16^{x}$ فاحسب $f\\left(\\frac{1}{4}\\right)$.'), solution: same('$16^{\\frac{1}{4}}=\\sqrt[4]{16}=2$'), answer: { expected: n(2) } },
            { id: 5, difficulty: 'medium', question: say('Kalkulatu $\\left(\\frac{1}{3}\\right)^{-2}$.', 'Calcula $\\left(\\frac{1}{3}\\right)^{-2}$.', 'احسب $\\left(\\frac{1}{3}\\right)^{-2}$.'), solution: same('$\\left(\\frac{1}{3}\\right)^{-2}=3^{2}=9$'), answer: { expected: n(9) } },
            { id: 6, difficulty: 'medium', question: say('$y=5^{x}-4$ funtzioaren asintota horizontala $y=k$ da. Zenbat da $k$?', 'La asíntota horizontal de $y=5^{x}-4$ es $y=k$. ¿Cuánto vale $k$?', 'المقارب الأفقي لـ $y=5^{x}-4$ هو $y=k$. كم قيمة $k$؟'), solution: say('$5^{x}>0$, beraz $y>-4$: $y=-4$.', '$5^{x}>0$, así que $y>-4$: $y=-4$.', '$5^{x}>0$ إذن $y>-4$: $y=-4$.'), answer: { expected: n(-4) } },
            { id: 7, difficulty: 'medium', question: say('$f(x)=2^{x+3}$ bada, kalkulatu $f(-3)$.', 'Si $f(x)=2^{x+3}$, calcula $f(-3)$.', 'إذا كان $f(x)=2^{x+3}$ فاحسب $f(-3)$.'), solution: same('$2^{0}=1$'), answer: { expected: n(1) } },
            { id: 8, difficulty: 'hard', question: say('Zein abszisatan ebakitzen du $y=2^{x}-8$ funtzioak X ardatza?', '¿En qué abscisa corta $y=2^{x}-8$ al eje X?', 'عند أي إحداثي سيني تقطع $y=2^{x}-8$ محور X؟'), solution: same('$2^{x}=8=2^{3}\\ \\to\\ x=3$'), answer: { expected: n(3) } },
            { id: 9, difficulty: 'hard', question: say('$y=k\\cdot a^{x}$ funtzioa $(0,\\,2)$ eta $(1,\\,6)$ puntuetatik pasatzen da. Zenbat da $a$?', 'La función $y=k\\cdot a^{x}$ pasa por $(0,\\,2)$ y $(1,\\,6)$. ¿Cuánto vale $a$?', 'تمر الدالة $y=k\\cdot a^{x}$ بـ $(0,\\,2)$ و$(1,\\,6)$. كم قيمة $a$؟'), solution: same('$k=2\\qquad 2a=6\\ \\to\\ a=3$'), answer: { expected: n(3) } },
            { id: 10, difficulty: 'hard', question: say('Azaldu zergatik $y=2^{x}$ funtzioak ez duen inoiz X ardatza ebakitzen.', 'Explica por qué $y=2^{x}$ no corta nunca al eje X.', 'اشرح لماذا لا تقطع $y=2^{x}$ محور X أبدًا.'), solution: say('Oinarri positibo baten berretura beti da positiboa: $2^{x}>0$. Ezkerrera 0ra hurbiltzen da, baina ez da iristen: $y=0$ asintota da.', 'Una potencia de base positiva siempre es positiva: $2^{x}>0$. Hacia la izquierda se acerca a 0, pero no llega: $y=0$ es una asíntota.', 'قوة الأساس الموجب موجبة دائمًا: $2^{x}>0$. وإلى اليسار تقترب من 0 دون أن تبلغه: $y=0$ مقارب.') }
        ]
    },
    {
        id: 'growth',
        title: say('Hazkundea eta ekuazioak', 'Crecimiento y ecuaciones', 'النمو والمعادلات'),
        items: [
            { id: 11, difficulty: 'easy', question: say('Zein da % 8ko igoera baten faktorea?', '¿Cuál es el factor de una subida del 8 %?', 'ما معامل زيادة 8 %؟'), solution: same('$1+\\frac{8}{100}=1{,}08$'), answer: { expected: v('1,08') } },
            { id: 12, difficulty: 'easy', question: say('Zein da % 25eko jaitsiera baten faktorea?', '¿Cuál es el factor de una bajada del 25 %?', 'ما معامل نقص 25 %؟'), solution: same('$1-\\frac{25}{100}=0{,}75$'), answer: { expected: v('0,75') } },
            { id: 13, difficulty: 'easy', question: say('Ebatzi $2^{x}=16$.', 'Resuelve $2^{x}=16$.', 'حُلّ $2^{x}=16$.'), solution: same('$2^{4}=16\\ \\to\\ x=4$'), answer: { expected: n(4) } },
            { id: 14, difficulty: 'medium', question: say('5 000 € % 2an jarri dira interes konposatuan. Zenbat diru izango da 2 urtean (€)?', 'Se ponen 5 000 € al 2 % de interés compuesto. ¿Cuánto habrá en 2 años (€)?', 'وُضع 5000 € بفائدة مركبة 2 %. كم يصبح المبلغ بعد سنتين (€)؟'), solution: same('$5\\,000\\cdot 1{,}02^{2}=5\\,000\\cdot 1{,}0404=5\\,202$'), answer: { expected: n(5202) } },
            { id: 15, difficulty: 'medium', question: say('Ebatzi $3^{x-2}=27$.', 'Resuelve $3^{x-2}=27$.', 'حُلّ $3^{x-2}=27$.'), solution: same('$3^{x-2}=3^{3}\\ \\to\\ x-2=3\\ \\to\\ x=5$'), answer: { expected: n(5) } },
            { id: 16, difficulty: 'medium', question: say('Ebatzi $4^{x}=\\frac{1}{16}$.', 'Resuelve $4^{x}=\\frac{1}{16}$.', 'حُلّ $4^{x}=\\frac{1}{16}$.'), solution: same('$4^{-2}=\\frac{1}{16}\\ \\to\\ x=-2$'), answer: { expected: n(-2) } },
            { id: 17, difficulty: 'medium', question: say('Isotopo baten erdibizitza 30 urte da. 200 g badira, zenbat gramo geratuko dira 90 urtean?', 'Un isótopo tiene una semivida de 30 años. Si hay 200 g, ¿cuántos gramos quedarán en 90 años?', 'عمر النصف لنظير 30 سنة. إذا كان لدينا 200 غ فكم غرامًا يبقى بعد 90 سنة؟'), solution: same('$\\frac{90}{30}=3\\qquad 200\\cdot\\frac{1}{2^{3}}=25$'), answer: { expected: n(25) } },
            { id: 18, difficulty: 'hard', question: say('Ebatzi $8^{x}=4$.', 'Resuelve $8^{x}=4$.', 'حُلّ $8^{x}=4$.'), solution: same('$2^{3x}=2^{2}\\ \\to\\ 3x=2\\ \\to\\ x=\\frac{2}{3}$'), answer: { expected: fraction(2, 3) } },
            { id: 19, difficulty: 'hard', question: say('1 000 biztanleko herri bat 5 urtero bikoizten da. Zenbat biztanle izango ditu 15 urtean?', 'Un pueblo de 1 000 habitantes se duplica cada 5 años. ¿Cuántos tendrá en 15 años?', 'قرية فيها 1000 نسمة تتضاعف كل 5 سنوات. كم يصبح عدد سكانها بعد 15 سنة؟'), solution: same('$\\frac{15}{5}=3\\qquad 1\\,000\\cdot 2^{3}=8\\,000$'), answer: { expected: n(8000) } },
            { id: 20, difficulty: 'hard', question: say('Kapital bat % 7an dago interes konposatuan. Gutxienez zenbat urte osotan bikoizten da?', 'Un capital está al 7 % de interés compuesto. ¿En cuántos años enteros, como mínimo, se duplica?', 'رأس مال بفائدة مركبة 7 %. في كم سنة كاملة على الأقل يتضاعف؟'), solution: say('$1{,}07^{t}=2$, $t=\\frac{\\log 2}{\\log 1{,}07}\\approx 10{,}24$: 11 urte behar dira.', '$1{,}07^{t}=2$, $t=\\frac{\\log 2}{\\log 1{,}07}\\approx 10{,}24$: hacen falta 11 años.', '$1{,}07^{t}=2$ و$t=\\frac{\\log 2}{\\log 1{,}07}\\approx 10{,}24$: يلزم 11 سنة.'), answer: { expected: n(11) } }
        ]
    },
    {
        id: 'logarithmic',
        title: say('Funtzio logaritmikoa', 'Función logarítmica', 'الدالة اللوغاريتمية'),
        items: [
            { id: 21, difficulty: 'easy', question: say('Kalkulatu $\\log_2 16$.', 'Calcula $\\log_2 16$.', 'احسب $\\log_2 16$.'), solution: same('$2^{4}=16$'), answer: { expected: n(4) } },
            { id: 22, difficulty: 'easy', question: say('Kalkulatu $\\log 1\\,000$.', 'Calcula $\\log 1\\,000$.', 'احسب $\\log 1\\,000$.'), solution: same('$10^{3}=1\\,000$'), answer: { expected: n(3) } },
            { id: 23, difficulty: 'easy', question: say('Kalkulatu $\\log_7 1$.', 'Calcula $\\log_7 1$.', 'احسب $\\log_7 1$.'), solution: same('$7^{0}=1$'), answer: { expected: n(0) } },
            { id: 24, difficulty: 'medium', question: say('Kalkulatu $\\log_9 3$.', 'Calcula $\\log_9 3$.', 'احسب $\\log_9 3$.'), solution: same('$9^{\\frac{1}{2}}=\\sqrt{9}=3$'), answer: { expected: fraction(1, 2) } },
            { id: 25, difficulty: 'medium', question: say('Kalkulatu $\\log_{\\frac{1}{2}} 8$.', 'Calcula $\\log_{\\frac{1}{2}} 8$.', 'احسب $\\log_{\\frac{1}{2}} 8$.'), solution: same('$\\left(\\frac{1}{2}\\right)^{-3}=2^{3}=8$'), answer: { expected: n(-3) } },
            { id: 26, difficulty: 'medium', question: say('$f(x)=\\log_3 x$ bada, kalkulatu $f(27)$.', 'Si $f(x)=\\log_3 x$, calcula $f(27)$.', 'إذا كان $f(x)=\\log_3 x$ فاحسب $f(27)$.'), solution: same('$3^{3}=27$'), answer: { expected: n(3) } },
            { id: 27, difficulty: 'medium', question: say('Zein da $y=\\log(x+5)$ funtzioaren izate-eremuaren ezkerreko muturra?', '¿Cuál es el extremo izquierdo del dominio de $y=\\log(x+5)$?', 'ما الطرف الأيسر لمجال $y=\\log(x+5)$؟'), solution: same('$x+5>0\\ \\to\\ x>-5$'), answer: { expected: n(-5) } },
            { id: 28, difficulty: 'hard', question: say('Zein abszisatan ebakitzen du $y=\\log_2(x-1)$ funtzioak X ardatza?', '¿En qué abscisa corta $y=\\log_2(x-1)$ al eje X?', 'عند أي إحداثي سيني تقطع $y=\\log_2(x-1)$ محور X؟'), solution: same('$x-1=2^{0}=1\\ \\to\\ x=2$'), answer: { expected: n(2) } },
            { id: 29, difficulty: 'hard', question: say('Azaldu zergatik pasatzen den beti $y=\\log_a x$ funtzioa $(a,\\,1)$ puntutik.', 'Explica por qué $y=\\log_a x$ pasa siempre por el punto $(a,\\,1)$.', 'اشرح لماذا تمر $y=\\log_a x$ دائمًا بالنقطة $(a,\\,1)$.'), solution: say('$a^{1}=a$ delako, eta beraz $\\log_a a=1$.', 'Porque $a^{1}=a$, así que $\\log_a a=1$.', 'لأن $a^{1}=a$، إذن $\\log_a a=1$.') },
            { id: 30, difficulty: 'hard', question: say('$f(x)=\\log_2 x+1$ bada, kalkulatu $f\\left(\\frac{1}{4}\\right)$.', 'Si $f(x)=\\log_2 x+1$, calcula $f\\left(\\frac{1}{4}\\right)$.', 'إذا كان $f(x)=\\log_2 x+1$ فاحسب $f\\left(\\frac{1}{4}\\right)$.'), solution: same('$\\log_2\\frac{1}{4}=-2\\qquad -2+1=-1$'), answer: { expected: n(-1) } }
        ]
    },
    {
        id: 'trigonometric',
        title: say('Sinua eta kosinua', 'Seno y coseno', 'الجيب وجيب التمام'),
        items: [
            { id: 31, difficulty: 'easy', question: say('Kalkulatu $\\sen\\frac{\\pi}{2}$.', 'Calcula $\\sen\\frac{\\pi}{2}$.', 'احسب $\\sen\\frac{\\pi}{2}$.'), solution: say('Zirkunferentziaren goiko puntua: 1.', 'El punto más alto de la circunferencia: 1.', 'أعلى نقطة في الدائرة: 1.'), answer: { expected: n(1) } },
            { id: 32, difficulty: 'easy', question: say('Kalkulatu $\\cos 0$.', 'Calcula $\\cos 0$.', 'احسب $\\cos 0$.'), solution: say('$(1,\\,0)$ puntua: $\\cos 0=1$.', 'El punto $(1,\\,0)$: $\\cos 0=1$.', 'النقطة $(1,\\,0)$: $\\cos 0=1$.'), answer: { expected: n(1) } },
            { id: 33, difficulty: 'easy', question: say('Zenbat gradu dira $2\\pi$ rad?', '¿Cuántos grados son $2\\pi$ rad?', 'كم درجة تساوي $2\\pi$ rad؟'), solution: same('$2\\cdot 180°=360°$'), answer: { expected: n(360) } },
            { id: 34, difficulty: 'medium', question: say('Zenbat gradu dira $\\frac{\\pi}{3}$ rad?', '¿Cuántos grados son $\\frac{\\pi}{3}$ rad?', 'كم درجة تساوي $\\frac{\\pi}{3}$ rad؟'), solution: same('$\\frac{180°}{3}=60°$'), answer: { expected: n(60) } },
            { id: 35, difficulty: 'medium', question: say('Kalkulatu $\\cos\\frac{\\pi}{3}$.', 'Calcula $\\cos\\frac{\\pi}{3}$.', 'احسب $\\cos\\frac{\\pi}{3}$.'), solution: same('$\\cos 60°=\\frac{1}{2}$'), answer: { expected: fraction(1, 2) } },
            { id: 36, difficulty: 'medium', question: say('Kalkulatu $\\sen\\frac{3\\pi}{2}$.', 'Calcula $\\sen\\frac{3\\pi}{2}$.', 'احسب $\\sen\\frac{3\\pi}{2}$.'), solution: say('Zirkunferentziaren beheko puntua: $-1$.', 'El punto más bajo de la circunferencia: $-1$.', 'أدنى نقطة في الدائرة: $-1$.'), answer: { expected: n(-1) } },
            { id: 37, difficulty: 'medium', question: say('Kalkulatu $\\sen\\frac{13\\pi}{2}$.', 'Calcula $\\sen\\frac{13\\pi}{2}$.', 'احسب $\\sen\\frac{13\\pi}{2}$.'), solution: same('$\\frac{13\\pi}{2}=6\\pi+\\frac{\\pi}{2}\\ \\to\\ \\sen\\frac{\\pi}{2}=1$'), answer: { expected: n(1) } },
            { id: 38, difficulty: 'hard', question: say('Zenbat maximo ditu $y=\\sen x$ funtzioak $[0,\\,6\\pi]$ tartean?', '¿Cuántos máximos tiene $y=\\sen x$ en $[0,\\,6\\pi]$?', 'كم قيمة عظمى للدالة $y=\\sen x$ في $[0,\\,6\\pi]$؟'), solution: say('$\\frac{\\pi}{2}$, $\\frac{5\\pi}{2}$ eta $\\frac{9\\pi}{2}$: 3, periodo bakoitzeko bat.', '$\\frac{\\pi}{2}$, $\\frac{5\\pi}{2}$ y $\\frac{9\\pi}{2}$: 3, uno por periodo.', '$\\frac{\\pi}{2}$ و$\\frac{5\\pi}{2}$ و$\\frac{9\\pi}{2}$: 3، واحدة في كل دور.'), answer: { expected: n(3) } },
            { id: 39, difficulty: 'hard', question: say('$y=\\cos x$ bikoitia ala bakoitia da? Azaldu.', '¿Es $y=\\cos x$ par o impar? Explícalo.', 'هل $y=\\cos x$ زوجية أم فردية؟ اشرح.'), solution: say('Bikoitia: $-x$ angeluaren puntuak abzisa bera du, $\\cos(-x)=\\cos x$, eta grafikoa Y ardatzarekiko simetrikoa da.', 'Par: el punto del ángulo $-x$ tiene la misma abscisa, $\\cos(-x)=\\cos x$, y la gráfica es simétrica respecto al eje Y.', 'زوجية: لنقطة الزاوية $-x$ الإحداثي السيني نفسه، $\\cos(-x)=\\cos x$، والرسم متماثل بالنسبة إلى محور Y.') },
            { id: 40, difficulty: 'hard', question: say('Kalkulatu $\\cos\\frac{5\\pi}{3}$.', 'Calcula $\\cos\\frac{5\\pi}{3}$.', 'احسب $\\cos\\frac{5\\pi}{3}$.'), solution: same('$\\frac{5\\pi}{3}=2\\pi-\\frac{\\pi}{3}\\ \\to\\ \\cos\\frac{\\pi}{3}=\\frac{1}{2}$'), answer: { expected: fraction(1, 2) } }
        ]
    },
    {
        id: 'transforms',
        title: say('Anplitudea eta periodoa', 'Amplitud y periodo', 'السعة والدور'),
        items: [
            { id: 41, difficulty: 'easy', question: say('Zein da $y=5\\sen x$ funtzioaren balio maximoa?', '¿Cuál es el valor máximo de $y=5\\sen x$?', 'ما القيمة العظمى لـ $y=5\\sen x$؟'), solution: same('$5\\cdot 1=5$'), answer: { expected: n(5) } },
            { id: 42, difficulty: 'easy', question: say('$y=\\cos x$ funtzioaren periodoa $a\\pi$ da. Zenbat da $a$?', 'El periodo de $y=\\cos x$ es $a\\pi$. ¿Cuánto vale $a$?', 'دور $y=\\cos x$ هو $a\\pi$. كم قيمة $a$؟'), solution: same('$T=2\\pi$'), answer: { expected: n(2) } },
            { id: 43, difficulty: 'easy', question: say('Zein da $y=\\sen x+3$ funtzioaren balio minimoa?', '¿Cuál es el valor mínimo de $y=\\sen x+3$?', 'ما القيمة الصغرى لـ $y=\\sen x+3$؟'), solution: same('$-1+3=2$'), answer: { expected: n(2) } },
            { id: 44, difficulty: 'medium', question: say('$y=\\cos 4x$ funtzioaren periodoa $a\\pi$ da. Zenbat da $a$?', 'El periodo de $y=\\cos 4x$ es $a\\pi$. ¿Cuánto vale $a$?', 'دور $y=\\cos 4x$ هو $a\\pi$. كم قيمة $a$؟'), solution: same('$T=\\frac{2\\pi}{4}=\\frac{1}{2}\\pi$'), answer: { expected: fraction(1, 2) } },
            { id: 45, difficulty: 'medium', question: say('Zein da $y=-2\\cos x+1$ funtzioaren balio maximoa?', '¿Cuál es el valor máximo de $y=-2\\cos x+1$?', 'ما القيمة العظمى لـ $y=-2\\cos x+1$؟'), solution: say('$\\cos x=-1$ denean: $2+1=3$.', 'Cuando $\\cos x=-1$: $2+1=3$.', 'عندما $\\cos x=-1$: $2+1=3$.'), answer: { expected: n(3) } },
            { id: 46, difficulty: 'medium', question: say('Zein da $y=-6\\sen x$ funtzioaren anplitudea?', '¿Cuál es la amplitud de $y=-6\\sen x$?', 'ما سعة $y=-6\\sen x$؟'), solution: same('$|-6|=6$'), answer: { expected: n(6) } },
            { id: 47, difficulty: 'medium', question: say('Kalkulatu $\\tg\\frac{\\pi}{4}$.', 'Calcula $\\tg\\frac{\\pi}{4}$.', 'احسب $\\tg\\frac{\\pi}{4}$.'), solution: say('$\\sen\\frac{\\pi}{4}=\\cos\\frac{\\pi}{4}$, beraz zatidura 1 da.', '$\\sen\\frac{\\pi}{4}=\\cos\\frac{\\pi}{4}$, así que el cociente es 1.', '$\\sen\\frac{\\pi}{4}=\\cos\\frac{\\pi}{4}$ إذن الناتج 1.'), answer: { expected: n(1) } },
            { id: 48, difficulty: 'hard', question: say('$y=\\sen kx$ funtzioaren periodoa $4\\pi$ da ($k>0$). Zenbat da $k$?', 'El periodo de $y=\\sen kx$ es $4\\pi$ ($k>0$). ¿Cuánto vale $k$?', 'دور $y=\\sen kx$ هو $4\\pi$ ($k>0$). كم قيمة $k$؟'), solution: same('$\\frac{2\\pi}{k}=4\\pi\\ \\to\\ k=\\frac{1}{2}$'), answer: { expected: fraction(1, 2) } },
            { id: 49, difficulty: 'hard', question: say('Zenbat asintota bertikal ditu $y=\\tg x$ funtzioak $(0,\\,2\\pi)$ tartean?', '¿Cuántas asíntotas verticales tiene $y=\\tg x$ en $(0,\\,2\\pi)$?', 'كم مقاربًا رأسيًا للدالة $y=\\tg x$ في $(0,\\,2\\pi)$؟'), solution: say('$x=\\frac{\\pi}{2}$ eta $x=\\frac{3\\pi}{2}$: 2.', '$x=\\frac{\\pi}{2}$ y $x=\\frac{3\\pi}{2}$: 2.', '$x=\\frac{\\pi}{2}$ و$x=\\frac{3\\pi}{2}$: 2.'), answer: { expected: n(2) } },
            { id: 50, difficulty: 'hard', question: say('Portu bateko ur-sakonera $h=1{,}5\\sen x+4$ da (metroak). Zein da sakonera maximoa?', 'La profundidad del agua en un puerto es $h=1{,}5\\sen x+4$ (metros). ¿Cuál es la profundidad máxima?', 'عمق الماء في ميناء $h=1{,}5\\sen x+4$ (بالأمتار). ما أقصى عمق؟'), solution: same('$1{,}5+4=5{,}5$'), answer: { expected: v('5,5') } }
        ]
    }
]

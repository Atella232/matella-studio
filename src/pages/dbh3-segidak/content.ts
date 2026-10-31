import { fraction, type FractionValue } from '../../features/unit-v2/math/fraction.ts'
import type { ChallengeItem, DiagnosticQuestion, ExerciseSection, PracticeItem } from '../../features/unit-v2/types.ts'
import { say, same } from './text.ts'

/* ==========================================================================
   Segidak · 3. DBH — diagnostic, guided practice, exercise bank and
   challenges, after Santillana 3.º ESO unit 3 and Anaya 3.º ESO unit 4
   (the books fix the scope and the order; every number and context here is
   original). Every closed answer is a single number: a term, a position, a
   difference, a ratio or a sum. Ratios and infinite sums may be fractions.
   ========================================================================== */

/** A decimal written with the comma, as an exact fraction */
const v = (text: string): FractionValue => {
    const negative = text.startsWith('-')
    const [whole, decimals = ''] = text.replace('-', '').split(',')
    return fraction((negative ? -1 : 1) * Number(whole + decimals), 10 ** decimals.length)
}
const n = (value: number) => fraction(value)
const f = (numerator: number, denominator: number) => fraction(numerator, denominator)

/** «Formula. How much is x?» */
const howMuch = (formula: string, letter: string) => say(`${formula}. Zenbat da $${letter}$?`, `${formula}. ¿Cuánto vale $${letter}$?`, `${formula}. كم يساوي $${letter}$؟`, `${formula}. What is $${letter}$?`)
const nextOf = (list: string) => say(`Zein da hurrengo gaia? $${list},\\ldots$`, `¿Cuál es el siguiente término? $${list},\\ldots$`, `ما الحد التالي؟ $${list},\\ldots$`, `What is the next term? $${list},\\ldots$`)

export const sequencesDiagnostic: DiagnosticQuestion[] = [
    {
        id: 6501,
        prompt: say('$5,\\,9,\\,13,\\,17,\\,21,\\ldots$ segidan, zein da $a_{4}$?', 'En la sucesión $5,\\,9,\\,13,\\,17,\\,21,\\ldots$, ¿cuál es $a_{4}$?', 'في المتتالية $5,\\,9,\\,13,\\,17,\\,21,\\ldots$ ما $a_{4}$؟', 'In the sequence $5,\\,9,\\,13,\\,17,\\,21,\\ldots$, what is $a_{4}$?'),
        options: [same('$17$'), same('$4$'), same('$13$')],
        correctIndex: 0,
        explanation: say('$a_{4}$ laugarren lekuan dagoen gaia da: 17. Azpiindizea lekua da, ez balioa.', '$a_{4}$ es el término del cuarto lugar: 17. El subíndice es el lugar, no el valor.', '$a_{4}$ هو الحد في الرتبة الرابعة: 17. الدليل هو الرتبة لا القيمة.', '$a_{4}$ is the term in fourth position: 17. The subscript is the position, not the value.'),
        topic: 'terms'
    },
    {
        id: 6502,
        prompt: say('$a_{n}=3n-1$. Zenbat da $a_{10}$?', '$a_{n}=3n-1$. ¿Cuánto vale $a_{10}$?', '$a_{n}=3n-1$. كم يساوي $a_{10}$؟', '$a_{n}=3n-1$. What is $a_{10}$?'),
        options: [same('$31$'), same('$29$'), same('$20$')],
        correctIndex: 1,
        explanation: say('Ordezkatu lekua: $3\\cdot 10-1=29$.', 'Se sustituye el lugar: $3\\cdot 10-1=29$.', 'نعوّض الرتبة: $3\\cdot 10-1=29$.', 'Substitute the position: $3\\cdot 10-1=29$.'),
        topic: 'general-term'
    },
    {
        id: 6503,
        prompt: say('$a_{1}=2$ eta $a_{n}=3a_{n-1}+1$. Zenbat da $a_{3}$?', '$a_{1}=2$ y $a_{n}=3a_{n-1}+1$. ¿Cuánto vale $a_{3}$?', '$a_{1}=2$ و$a_{n}=3a_{n-1}+1$. كم يساوي $a_{3}$؟', '$a_{1}=2$ and $a_{n}=3a_{n-1}+1$. What is $a_{3}$?'),
        options: [same('$10$'), same('$19$'), same('$22$')],
        correctIndex: 2,
        explanation: say('Pausoz pauso: $a_{2}=3\\cdot 2+1=7$ eta $a_{3}=3\\cdot 7+1=22$.', 'Paso a paso: $a_{2}=3\\cdot 2+1=7$ y $a_{3}=3\\cdot 7+1=22$.', 'خطوة خطوة: $a_{2}=3\\cdot 2+1=7$ و$a_{3}=3\\cdot 7+1=22$.', 'Step by step: $a_{2}=3\\cdot 2+1=7$ and $a_{3}=3\\cdot 7+1=22$.'),
        topic: 'recursive'
    },
    {
        id: 6504,
        prompt: say('Progresio aritmetiko batean $a_{1}=4$ eta $d=5$. Zenbat da $a_{10}$?', 'En una progresión aritmética $a_{1}=4$ y $d=5$. ¿Cuánto vale $a_{10}$?', 'في متتالية حسابية $a_{1}=4$ و$d=5$. كم يساوي $a_{10}$؟', 'In an arithmetic progression $a_{1}=4$ and $d=5$. What is $a_{10}$?'),
        options: [same('$54$'), same('$49$'), same('$50$')],
        correctIndex: 1,
        explanation: say('Lehenetik hamargarrenera 9 salto daude: $4+9\\cdot 5=49$.', 'Del primero al décimo hay 9 saltos: $4+9\\cdot 5=49$.', 'من الأول إلى العاشر 9 قفزات: $4+9\\cdot 5=49$.', 'From the first to the tenth there are 9 jumps: $4+9\\cdot 5=49$.'),
        topic: 'arith-general'
    },
    {
        id: 6505,
        prompt: say('Zenbat da $1+2+3+\\cdots+50$?', '¿Cuánto es $1+2+3+\\cdots+50$?', 'كم يساوي $1+2+3+\\cdots+50$؟', 'What is $1+2+3+\\cdots+50$?'),
        options: [same('$2550$'), same('$1275$'), same('$1250$')],
        correctIndex: 1,
        explanation: say('25 bikote, bakoitza 51: $25\\cdot 51=1275$.', '25 parejas de 51: $25\\cdot 51=1275$.', '25 زوجًا كل منها 51: $25\\cdot 51=1275$.', '25 pairs of 51: $25\\cdot 51=1275$.'),
        topic: 'gauss'
    },
    {
        id: 6506,
        prompt: say('Zein da progresio geometrikoa?', '¿Cuál es una progresión geométrica?', 'أيها متتالية هندسية؟', 'Which one is a geometric progression?'),
        options: [same('$3,\\,6,\\,12,\\,24$'), same('$3,\\,6,\\,9,\\,12$'), same('$1,\\,4,\\,9,\\,16$')],
        correctIndex: 0,
        explanation: say('Zatidura beti 2 da. Bigarrenean 3 batzen da (aritmetikoa) eta hirugarrenean karratuak daude.', 'El cociente siempre es 2. En la segunda se suma 3 (aritmética) y la tercera son cuadrados.', 'حاصل القسمة دائمًا 2. وفي الثانية نضيف 3 (حسابية) والثالثة مربعات.', 'The quotient is always 2. In the second you add 3 (arithmetic) and the third is the square numbers.'),
        topic: 'geo-ratio'
    },
    {
        id: 6507,
        prompt: say('$a_{1}=2$ eta $r=3$. Zenbat da $a_{4}$?', '$a_{1}=2$ y $r=3$. ¿Cuánto vale $a_{4}$?', '$a_{1}=2$ و$r=3$. كم يساوي $a_{4}$؟', '$a_{1}=2$ and $r=3$. What is $a_{4}$?'),
        options: [same('$216$'), same('$54$'), same('$24$')],
        correctIndex: 1,
        explanation: say('$a_{4}=2\\cdot 3^{3}=54$. Lehenik berretura; $(2\\cdot 3)^{3}=216$ okerra da.', '$a_{4}=2\\cdot 3^{3}=54$. Primero la potencia; $(2\\cdot 3)^{3}=216$ es un error.', '$a_{4}=2\\cdot 3^{3}=54$. القوة أولًا؛ و$(2\\cdot 3)^{3}=216$ خطأ.', '$a_{4}=2\\cdot 3^{3}=54$. The power first; $(2\\cdot 3)^{3}=216$ is a mistake.'),
        topic: 'geo-general'
    },
    {
        id: 6508,
        prompt: say('Zenbat da $8+4+2+1+\\cdots$ batura infinitua?', '¿Cuánto vale la suma infinita $8+4+2+1+\\cdots$?', 'كم يساوي المجموع اللانهائي $8+4+2+1+\\cdots$؟', 'What is the infinite sum $8+4+2+1+\\cdots$?'),
        options: [same('$16$'), same('$\\infty$'), same('$15$')],
        correctIndex: 0,
        explanation: say('$r=\\frac{1}{2}$, $|r|<1$: $S=\\frac{8}{1-\\frac{1}{2}}=16$. Gaiak gero eta txikiagoak dira, eta batura ez da infinitua.', '$r=\\frac{1}{2}$, $|r|<1$: $S=\\frac{8}{1-\\frac{1}{2}}=16$. Los términos se hacen cada vez más pequeños y la suma no es infinita.', '$r=\\frac{1}{2}$ و$|r|<1$: $S=\\frac{8}{1-\\frac{1}{2}}=16$. الحدود تصغر باستمرار والمجموع ليس لا نهائيًا.', '$r=\\frac{1}{2}$, $|r|<1$: $S=\\frac{8}{1-\\frac{1}{2}}=16$. The terms get smaller and smaller and the sum is not infinite.'),
        topic: 'geo-infinite'
    }
]

export const sequencesPractice: PracticeItem[] = [
    /* ---------- Sequences ---------- */
    { id: 1, stage: 'sequences', prompt: say('$2,\\,5,\\,10,\\,17,\\,26,\\ldots$ segidan, gai bakoitza $n^{2}+1$ da. Zenbat da $a_{6}$?', 'En $2,\\,5,\\,10,\\,17,\\,26,\\ldots$ cada término es $n^{2}+1$. ¿Cuánto vale $a_{6}$?', 'في $2,\\,5,\\,10,\\,17,\\,26,\\ldots$ كل حد يساوي $n^{2}+1$. كم يساوي $a_{6}$؟', 'In $2,\\,5,\\,10,\\,17,\\,26,\\ldots$ each term is $n^{2}+1$. What is $a_{6}$?'), expected: n(37), hint: say('Ordezkatu $n=6$.', 'Sustituye $n=6$.', 'عوّض $n=6$.', 'Substitute $n=6$.'), explanation: same('$a_{6}=6^{2}+1=37$') },
    { id: 2, stage: 'sequences', prompt: howMuch('$a_{n}=4n-7$', 'a_{15}'), expected: n(53), hint: say('Ordezkatu $n=15$.', 'Sustituye $n=15$.', 'عوّض $n=15$.', 'Substitute $n=15$.'), explanation: same('$a_{15}=4\\cdot 15-7=53$') },
    { id: 3, stage: 'sequences', prompt: say('$a_{n}=2n+3$. Zein lekutan dago 43?', '$a_{n}=2n+3$. ¿En qué lugar está el 43?', '$a_{n}=2n+3$. في أي رتبة يقع 43؟', '$a_{n}=2n+3$. In which position is 43?'), expected: n(20), hint: say('Berdindu: $2n+3=43$.', 'Iguala: $2n+3=43$.', 'ساوِ: $2n+3=43$.', 'Set it equal: $2n+3=43$.'), explanation: same('$2n+3=43\\ \\to\\ 2n=40\\ \\to\\ n=20$') },
    { id: 4, stage: 'sequences', prompt: howMuch('$a_{1}=1,\\ a_{2}=3,\\ a_{n}=a_{n-1}+a_{n-2}$', 'a_{6}'), expected: n(18), hint: say('Gai bakoitza aurreko bien batura da.', 'Cada término es la suma de los dos anteriores.', 'كل حد مجموع الحدين السابقين.', 'Each term is the sum of the two before it.'), explanation: same('$1,\\,3,\\,4,\\,7,\\,11,\\,18$') },

    /* ---------- Arithmetic progressions ---------- */
    { id: 5, stage: 'arithmetic', prompt: say('Zein da $7,\\,4,\\,1,\\,-2,\\ldots$ progresioaren diferentzia?', '¿Cuál es la diferencia de $7,\\,4,\\,1,\\,-2,\\ldots$?', 'ما فرق المتتالية $7,\\,4,\\,1,\\,-2,\\ldots$؟', 'What is the common difference of $7,\\,4,\\,1,\\,-2,\\ldots$?'), expected: n(-3), hint: say('Hurrengoa ken aurrekoa.', 'El siguiente menos el anterior.', 'التالي ناقص السابق.', 'The next term minus the previous one.'), explanation: same('$4-7=-3$') },
    { id: 6, stage: 'arithmetic', prompt: howMuch('$a_{1}=6,\\ d=4$', 'a_{25}'), expected: n(102), hint: say('24 salto daude.', 'Hay 24 saltos.', 'هناك 24 قفزة.', 'There are 24 jumps.'), explanation: same('$a_{25}=6+24\\cdot 4=102$') },
    { id: 7, stage: 'arithmetic', prompt: howMuch('$a_{4}=10,\\ a_{9}=35$', 'd'), expected: n(5), hint: say('4. lekutik 9. lekura 5 salto.', 'Del lugar 4 al 9 hay 5 saltos.', 'من الرتبة 4 إلى 9 خمس قفزات.', 'From position 4 to 9 there are 5 jumps.'), explanation: same('$d=\\frac{35-10}{5}=5$') },
    { id: 8, stage: 'arithmetic', prompt: say('$a_{n}=3n+2$. Zein lekutan dago 62?', '$a_{n}=3n+2$. ¿En qué lugar está el 62?', '$a_{n}=3n+2$. في أي رتبة يقع 62؟', '$a_{n}=3n+2$. In which position is 62?'), expected: n(20), hint: say('Berdindu eta ebatzi.', 'Iguala y resuelve.', 'ساوِ وحلّ.', 'Set equal and solve.'), explanation: same('$3n+2=62\\ \\to\\ n=20$') },

    /* ---------- Sums ---------- */
    { id: 9, stage: 'sums', prompt: say('Kalkulatu $1+2+3+\\cdots+60$.', 'Calcula $1+2+3+\\cdots+60$.', 'احسب $1+2+3+\\cdots+60$.', 'Work out $1+2+3+\\cdots+60$.'), expected: n(1830), hint: say('30 bikote, bakoitza 61.', '30 parejas de 61.', '30 زوجًا كل منها 61.', '30 pairs of 61.'), explanation: same('$\\frac{60\\cdot 61}{2}=1830$') },
    { id: 10, stage: 'sums', prompt: say('$3,\\,7,\\,11,\\ldots$ progresioaren lehen 12 gaien batura.', 'Suma de los 12 primeros términos de $3,\\,7,\\,11,\\ldots$', 'مجموع الحدود الاثني عشر الأولى من $3,\\,7,\\,11,\\ldots$', 'Sum of the first 12 terms of $3,\\,7,\\,11,\\ldots$'), expected: n(300), hint: say('Lehenik $a_{12}$.', 'Primero $a_{12}$.', 'أولًا $a_{12}$.', 'First $a_{12}$.'), explanation: same('$a_{12}=3+11\\cdot 4=47\\quad S_{12}=\\frac{(3+47)\\cdot 12}{2}=300$') },
    { id: 11, stage: 'sums', prompt: say('Batu lehen 10 zenbaki bikoitiak: $2+4+\\cdots+20$.', 'Suma los 10 primeros números pares: $2+4+\\cdots+20$.', 'اجمع الأعداد الزوجية العشرة الأولى: $2+4+\\cdots+20$.', 'Add the first 10 even numbers: $2+4+\\cdots+20$.'), expected: n(110), hint: say('$a_{1}=2$, $a_{10}=20$, $n=10$.', '$a_{1}=2$, $a_{10}=20$, $n=10$.', '$a_{1}=2$ و$a_{10}=20$ و$n=10$.', '$a_{1}=2$, $a_{10}=20$, $n=10$.'), explanation: same('$\\frac{(2+20)\\cdot 10}{2}=110$') },
    { id: 12, stage: 'sums', prompt: say('Antzoki batean lehen ilarak 20 eserleku ditu, eta ilara bakoitzak aurrekoak baino 3 gehiago. 12 ilara daude. Zenbat eserleku guztira?', 'Un teatro tiene 20 asientos en la primera fila y cada fila 3 más que la anterior. Hay 12 filas. ¿Cuántos asientos en total?', 'في مسرح 20 مقعدًا في الصف الأول وفي كل صف 3 مقاعد أكثر من سابقه. هناك 12 صفًا. كم مقعدًا إجمالًا؟', 'A theatre has 20 seats in the first row and each row has 3 more than the one before. There are 12 rows. How many seats in total?'), expected: n(438), hint: say('Lehenik azken ilara: $a_{12}$.', 'Primero la última fila: $a_{12}$.', 'أولًا الصف الأخير: $a_{12}$.', 'First the last row: $a_{12}$.'), explanation: same('$a_{12}=20+11\\cdot 3=53\\quad\\frac{(20+53)\\cdot 12}{2}=438$') },

    /* ---------- Geometric progressions ---------- */
    { id: 13, stage: 'geometric', prompt: say('Zein da $5,\\,15,\\,45,\\ldots$ progresioaren arrazoia?', '¿Cuál es la razón de $5,\\,15,\\,45,\\ldots$?', 'ما أساس المتتالية $5,\\,15,\\,45,\\ldots$؟', 'What is the common ratio of $5,\\,15,\\,45,\\ldots$?'), expected: n(3), hint: say('Zatitu ondoz ondoko gaiak.', 'Divide términos consecutivos.', 'اقسم الحدود المتتالية.', 'Divide consecutive terms.'), explanation: same('$\\frac{15}{5}=\\frac{45}{15}=3$') },
    { id: 14, stage: 'geometric', prompt: howMuch('$a_{1}=3,\\ r=2$', 'a_{7}'), expected: n(192), hint: say('$a_{7}=a_{1}\\cdot r^{6}$.', '$a_{7}=a_{1}\\cdot r^{6}$.', '$a_{7}=a_{1}\\cdot r^{6}$.', '$a_{7}=a_{1}\\cdot r^{6}$.'), explanation: same('$a_{7}=3\\cdot 2^{6}=192$') },
    { id: 15, stage: 'geometric', prompt: say('Gai positiboko progresio geometriko batean $a_{2}=12$ eta $a_{4}=48$. Zenbat da $r$?', 'En una progresión geométrica de términos positivos, $a_{2}=12$ y $a_{4}=48$. ¿Cuánto vale $r$?', 'في متتالية هندسية حدودها موجبة $a_{2}=12$ و$a_{4}=48$. كم يساوي $r$؟', 'In a geometric progression with positive terms, $a_{2}=12$ and $a_{4}=48$. What is $r$?'), expected: n(2), hint: say('Bi salto: $r^{2}$.', 'Dos saltos: $r^{2}$.', 'قفزتان: $r^{2}$.', 'Two jumps: $r^{2}$.'), explanation: same('$r^{2}=\\frac{48}{12}=4\\ \\to\\ r=2$') },
    { id: 16, stage: 'geometric', prompt: howMuch('$1024,\\,512,\\,256,\\ldots$', 'a_{6}'), expected: n(32), hint: say('$r=\\frac{1}{2}$ eta 5 salto.', '$r=\\frac{1}{2}$ y 5 saltos.', '$r=\\frac{1}{2}$ و5 قفزات.', '$r=\\frac{1}{2}$ and 5 jumps.'), explanation: same('$a_{6}=1024\\cdot\\left(\\frac{1}{2}\\right)^{5}=\\frac{1024}{32}=32$') },

    /* ---------- Geometric sums ---------- */
    { id: 17, stage: 'geo-sums', prompt: say('$2,\\,6,\\,18,\\ldots$ progresioaren lehen 6 gaien batura.', 'Suma de los 6 primeros términos de $2,\\,6,\\,18,\\ldots$', 'مجموع الحدود الستة الأولى من $2,\\,6,\\,18,\\ldots$', 'Sum of the first 6 terms of $2,\\,6,\\,18,\\ldots$'), expected: n(728), hint: say('$a_{1}=2$, $r=3$, $n=6$.', '$a_{1}=2$, $r=3$, $n=6$.', '$a_{1}=2$ و$r=3$ و$n=6$.', '$a_{1}=2$, $r=3$, $n=6$.'), explanation: same('$S_{6}=\\frac{2\\cdot(3^{6}-1)}{3-1}=728$') },
    { id: 18, stage: 'geo-sums', prompt: say('Kalkulatu $1+2+4+\\cdots+128$.', 'Calcula $1+2+4+\\cdots+128$.', 'احسب $1+2+4+\\cdots+128$.', 'Work out $1+2+4+\\cdots+128$.'), expected: n(255), hint: say('8 gai daude: $128=2^{7}$.', 'Hay 8 términos: $128=2^{7}$.', 'هناك 8 حدود: $128=2^{7}$.', 'There are 8 terms: $128=2^{7}$.'), explanation: same('$\\frac{2^{8}-1}{2-1}=255$') },
    { id: 19, stage: 'geo-sums', prompt: say('Kalkulatu $20+10+5+\\cdots$ batura infinitua.', 'Calcula la suma infinita $20+10+5+\\cdots$', 'احسب المجموع اللانهائي $20+10+5+\\cdots$', 'Work out the infinite sum $20+10+5+\\cdots$'), expected: n(40), hint: say('$r=\\frac{1}{2}$.', '$r=\\frac{1}{2}$.', '$r=\\frac{1}{2}$.', '$r=\\frac{1}{2}$.'), explanation: same('$\\frac{20}{1-\\frac{1}{2}}=40$') },
    { id: 20, stage: 'geo-sums', prompt: say('Kultibo batean 300 bakterio daude, eta orduro hirukoizten dira. Zenbat egongo dira 4 ordu barru?', 'Un cultivo tiene 300 bacterias que se triplican cada hora. ¿Cuántas habrá dentro de 4 horas?', 'في مزرعة 300 بكتيريا تتضاعف ثلاث مرات كل ساعة. كم سيكون عددها بعد 4 ساعات؟', 'A culture has 300 bacteria that triple every hour. How many will there be in 4 hours?'), expected: n(24300), hint: say('4 aldiz bider 3.', 'Cuatro veces por 3.', 'أربع مرات في 3.', 'Times 3, four times.'), explanation: same('$300\\cdot 3^{4}=24\\,300$') }
]

export const sequencesChallenges: ChallengeItem[] = [
    { id: 101, stage: 'sequences', points: 10, context: 'starter', prompt: say('Makilekin karratu-ilara bat egiteko, $n$ karratuk $3n+1$ makila behar dituzte. Zenbat makila 25 karraturentzat?', 'Para una fila de cuadrados de palillos, $n$ cuadrados necesitan $3n+1$ palillos. ¿Cuántos palillos para 25 cuadrados?', 'صف من المربعات يحتاج $n$ مربعًا منه إلى $3n+1$ عودًا. كم عودًا لخمسة وعشرين مربعًا؟', 'For a row of squares made of sticks, $n$ squares need $3n+1$ sticks. How many sticks for 25 squares?'), expected: n(76), hint: say('Ordezkatu $n=25$.', 'Sustituye $n=25$.', 'عوّض $n=25$.', 'Substitute $n=25$.'), explanation: same('$3\\cdot 25+1=76$') },
    { id: 102, stage: 'sequences', points: 20, context: 'advanced', prompt: say('$a_{n}=2n^{2}-1$. Zein lekutan dago 127?', '$a_{n}=2n^{2}-1$. ¿En qué lugar está el 127?', '$a_{n}=2n^{2}-1$. في أي رتبة يقع 127؟', '$a_{n}=2n^{2}-1$. In which position is 127?'), expected: n(8), hint: say('$2n^{2}=128$.', '$2n^{2}=128$.', '$2n^{2}=128$.', '$2n^{2}=128$.'), explanation: same('$2n^{2}-1=127\\ \\to\\ n^{2}=64\\ \\to\\ n=8$') },
    { id: 103, stage: 'sequences', points: 30, context: 'master', prompt: say('100 makila dituzu. Zenbat karratu egin ditzakezu gehienez ilaran ($3n+1$ makila)?', 'Tienes 100 palillos. ¿Cuántos cuadrados en fila puedes hacer como mucho ($3n+1$ palillos)?', 'لديك 100 عود. كم مربعًا في صف يمكنك أن تصنع على الأكثر ($3n+1$ عودًا)؟', 'You have 100 sticks. How many squares in a row can you make at most ($3n+1$ sticks)?'), expected: n(33), hint: say('$3n+1\\leq 100$.', '$3n+1\\leq 100$.', '$3n+1\\leq 100$.', '$3n+1\\leq 100$.'), explanation: same('$3\\cdot 33+1=100$') },
    { id: 104, stage: 'arithmetic', points: 10, context: 'starter', prompt: howMuch('$a_{1}=-5,\\ d=3$', 'a_{20}'), expected: n(52), hint: say('19 salto.', '19 saltos.', '19 قفزة.', '19 jumps.'), explanation: same('$a_{20}=-5+19\\cdot 3=52$') },
    { id: 105, stage: 'arithmetic', points: 20, context: 'advanced', prompt: howMuch('$a_{5}=17,\\ a_{12}=45$', 'a_{1}'), expected: n(1), hint: say('Lehenik $d$: 7 salto.', 'Primero $d$: 7 saltos.', 'أولًا $d$: سبع قفزات.', 'First $d$: 7 jumps.'), explanation: same('$d=\\frac{45-17}{7}=4\\quad a_{1}=17-4\\cdot 4=1$') },
    { id: 106, stage: 'arithmetic', points: 30, context: 'master', prompt: say('$7,\\,12,\\,17,\\ldots$ progresioan, zein lekutan dago 200 baino handiagoa den lehen gaia?', 'En $7,\\,12,\\,17,\\ldots$, ¿en qué lugar está el primer término mayor que 200?', 'في $7,\\,12,\\,17,\\ldots$ في أي رتبة أول حد أكبر من 200؟', 'In $7,\\,12,\\,17,\\ldots$, in which position is the first term greater than 200?'), expected: n(40), hint: say('$a_{n}=5n+2>200$.', '$a_{n}=5n+2>200$.', '$a_{n}=5n+2>200$.', '$a_{n}=5n+2>200$.'), explanation: same('$a_{39}=5\\cdot 39+2=197\\quad a_{40}=5\\cdot 40+2=202$') },
    { id: 107, stage: 'sums', points: 10, context: 'starter', prompt: say('Batu lehen 100 zenbaki bakoitiak: $1+3+5+\\cdots+199$.', 'Suma los 100 primeros impares: $1+3+5+\\cdots+199$.', 'اجمع الأعداد الفردية المئة الأولى: $1+3+5+\\cdots+199$.', 'Add the first 100 odd numbers: $1+3+5+\\cdots+199$.'), expected: n(10000), hint: say('$a_{1}=1$, $a_{100}=199$.', '$a_{1}=1$, $a_{100}=199$.', '$a_{1}=1$ و$a_{100}=199$.', '$a_{1}=1$, $a_{100}=199$.'), explanation: same('$\\frac{(1+199)\\cdot 100}{2}=10\\,000$') },
    { id: 108, stage: 'sums', points: 20, context: 'advanced', prompt: say('Lehen astean 5 € aurrezten dira, eta astero aurreko astean baino 2 € gehiago. Zenbat diru 20 asteren buruan?', 'La primera semana se ahorran 5 €, y cada semana 2 € más que la anterior. ¿Cuánto dinero al cabo de 20 semanas?', 'في الأسبوع الأول يُدّخر 5 € وفي كل أسبوع 2 € أكثر من سابقه. كم المال بعد 20 أسبوعًا؟', 'In the first week €5 is saved, and each week €2 more than the week before. How much money after 20 weeks?'), expected: n(480), hint: say('Lehenik azken astea: $a_{20}$.', 'Primero la última semana: $a_{20}$.', 'أولًا الأسبوع الأخير: $a_{20}$.', 'First the last week: $a_{20}$.'), explanation: same('$a_{20}=5+19\\cdot 2=43\\quad\\frac{(5+43)\\cdot 20}{2}=480$') },
    { id: 109, stage: 'sums', points: 30, context: 'master', prompt: say('$2,\\,5,\\,8,\\ldots$ progresioaren zenbat gai batu behar dira 155 lortzeko?', '¿Cuántos términos de $2,\\,5,\\,8,\\ldots$ hay que sumar para obtener 155?', 'كم حدًا من $2,\\,5,\\,8,\\ldots$ يجب جمعه للحصول على 155؟', 'How many terms of $2,\\,5,\\,8,\\ldots$ must be added to get 155?'), expected: n(10), hint: say('Saiatu: $S_{n}=\\frac{(2+a_{n})\\cdot n}{2}$.', 'Prueba: $S_{n}=\\frac{(2+a_{n})\\cdot n}{2}$.', 'جرّب: $S_{n}=\\frac{(2+a_{n})\\cdot n}{2}$.', 'Try: $S_{n}=\\frac{(2+a_{n})\\cdot n}{2}$.'), explanation: same('$a_{10}=2+9\\cdot 3=29\\quad\\frac{(2+29)\\cdot 10}{2}=155$') },
    { id: 110, stage: 'geometric', points: 10, context: 'starter', prompt: howMuch('$a_{1}=2,\\ r=-3$', 'a_{5}'), expected: n(162), hint: say('Berretzaile bikoitia: positiboa.', 'Exponente par: positivo.', 'أس زوجي: موجب.', 'Even exponent: positive.'), explanation: same('$a_{5}=2\\cdot(-3)^{4}=162$') },
    { id: 111, stage: 'geometric', points: 20, context: 'advanced', prompt: howMuch('$a_{3}=20,\\ a_{6}=160$', 'a_{1}'), expected: n(5), hint: say('$r^{3}=8$.', '$r^{3}=8$.', '$r^{3}=8$.', '$r^{3}=8$.'), explanation: same('$r^{3}=\\frac{160}{20}=8\\ \\to\\ r=2\\quad a_{1}=\\frac{20}{4}=5$') },
    { id: 112, stage: 'geometric', points: 30, context: 'master', prompt: say('Pilota bat 243 cm-tik erortzen da, eta errebote bakoitzean aurreko altueraren $\\frac{2}{3}$ igotzen da. Zenbateko altuera (cm) bosgarren errebotean?', 'Una pelota cae desde 243 cm y en cada bote sube $\\frac{2}{3}$ de la altura anterior. ¿Qué altura (cm) alcanza en el quinto bote?', 'تسقط كرة من 243 سم وترتفع في كل ارتداد $\\frac{2}{3}$ من الارتفاع السابق. ما الارتفاع (سم) في الارتداد الخامس؟', 'A ball falls from 243 cm and at each bounce rises $\\frac{2}{3}$ of the previous height. What height (cm) does it reach on the fifth bounce?'), expected: n(32), hint: say('5 aldiz bider $\\frac{2}{3}$.', 'Cinco veces por $\\frac{2}{3}$.', 'خمس مرات في $\\frac{2}{3}$.', 'Times $\\frac{2}{3}$, five times.'), explanation: same('$243\\cdot\\frac{32}{243}=32$') },
    { id: 113, stage: 'geo-sums', points: 10, context: 'starter', prompt: say('Kalkulatu $9+3+1+\\cdots$ batura infinitua.', 'Calcula la suma infinita $9+3+1+\\cdots$', 'احسب المجموع اللانهائي $9+3+1+\\cdots$', 'Work out the infinite sum $9+3+1+\\cdots$'), expected: v('13,5'), hint: say('$r=\\frac{1}{3}$.', '$r=\\frac{1}{3}$.', '$r=\\frac{1}{3}$.', '$r=\\frac{1}{3}$.'), explanation: same('$\\frac{9}{1-\\frac{1}{3}}=13{,}5$') },
    { id: 114, stage: 'geo-sums', points: 20, context: 'advanced', prompt: say('$0{,}777\\ldots=0{,}7+0{,}07+0{,}007+\\cdots$ Idatzi zatiki gisa.', '$0{,}777\\ldots=0{,}7+0{,}07+0{,}007+\\cdots$ Escríbelo como fracción.', '$0{,}777\\ldots=0{,}7+0{,}07+0{,}007+\\cdots$ اكتبه كسرًا.', '$0{,}777\\ldots=0{,}7+0{,}07+0{,}007+\\cdots$ Write it as a fraction.'), expected: f(7, 9), hint: say('$a_{1}=0{,}7$ eta $r=0{,}1$.', '$a_{1}=0{,}7$ y $r=0{,}1$.', '$a_{1}=0{,}7$ و$r=0{,}1$.', '$a_{1}=0{,}7$ and $r=0{,}1$.'), explanation: same('$\\frac{0{,}7}{1-0{,}1}=\\frac{0{,}7}{0{,}9}=\\frac{7}{9}$') },
    { id: 115, stage: 'geo-sums', points: 30, context: 'master', prompt: say('Mezu-kate bat: lehen egunean pertsona batek jasotzen du, eta egunero jaso duen bakoitzak beste 3 lagunei bidaltzen die. Zenbat pertsonak jaso dute 7 egunetan guztira?', 'Una cadena de mensajes: el primer día lo recibe 1 persona, y cada día cada una lo reenvía a 3 más. ¿Cuántas personas lo han recibido en total en 7 días?', 'سلسلة رسائل: في اليوم الأول يتلقاها شخص واحد، وكل يوم يرسلها كل متلقٍّ إلى 3 آخرين. كم شخصًا تلقاها إجمالًا في 7 أيام؟', 'A chain message: on the first day 1 person receives it, and each day everyone who got it sends it to 3 more. How many people have received it in total in 7 days?'), expected: n(1093), hint: say('$1,\\,3,\\,9,\\ldots$: 7 gai.', '$1,\\,3,\\,9,\\ldots$: 7 términos.', '$1,\\,3,\\,9,\\ldots$: سبعة حدود.', '$1,\\,3,\\,9,\\ldots$: 7 terms.'), explanation: same('$\\frac{3^{7}-1}{3-1}=1093$') }
]

export const sequencesExerciseBank: ExerciseSection[] = [
    {
        id: 'sequences',
        title: say('Segidak', 'Sucesiones', 'المتتاليات', 'Sequences'),
        items: [
            { id: 1, difficulty: 'easy', question: nextOf('3,\\,8,\\,13,\\,18'), solution: same('$18+5=23$'), answer: { expected: n(23) } },
            { id: 2, difficulty: 'easy', question: howMuch('$a_{n}=5n-2$', 'a_{8}'), solution: same('$a_{8}=5\\cdot 8-2=38$'), answer: { expected: n(38) } },
            { id: 3, difficulty: 'easy', question: howMuch('$a_{n}=n^{2}-n$', 'a_{6}'), solution: same('$a_{6}=36-6=30$'), answer: { expected: n(30) } },
            { id: 4, difficulty: 'easy', question: howMuch('$a_{n}=\\frac{n+1}{n}$', 'a_{4}'), solution: same('$a_{4}=\\frac{5}{4}=1{,}25$'), answer: { expected: v('1,25') } },
            { id: 5, difficulty: 'medium', question: say('$a_{n}=7n+3$. Zein lekutan dago 73?', '$a_{n}=7n+3$. ¿En qué lugar está el 73?', '$a_{n}=7n+3$. في أي رتبة يقع 73؟', '$a_{n}=7n+3$. In which position is 73?'), solution: same('$7n+3=73\\ \\to\\ n=10$'), answer: { expected: n(10) } },
            { id: 6, difficulty: 'medium', question: howMuch('$a_{1}=4,\\ a_{n}=2a_{n-1}-3$', 'a_{4}'), solution: same('$a_{2}=5\\quad a_{3}=7\\quad a_{4}=11$'), answer: { expected: n(11) } },
            { id: 7, difficulty: 'medium', question: howMuch('$a_{1}=2,\\ a_{2}=2,\\ a_{n}=a_{n-1}+a_{n-2}$', 'a_{7}'), solution: same('$2,\\,2,\\,4,\\,6,\\,10,\\,16,\\,26$'), answer: { expected: n(26) } },
            { id: 8, difficulty: 'medium', question: say('Makilekin triangelu-ilara bat: $n$ triangeluk $2n+1$ makila behar dituzte. Zenbat makila 15 triangelurentzat?', 'Una fila de triángulos de palillos: $n$ triángulos necesitan $2n+1$ palillos. ¿Cuántos para 15 triángulos?', 'صف مثلثات من العيدان: $n$ مثلثًا يحتاج $2n+1$ عودًا. كم عودًا لخمسة عشر مثلثًا؟', 'A row of triangles made of sticks: $n$ triangles need $2n+1$ sticks. How many for 15 triangles?'), solution: same('$2\\cdot 15+1=31$'), answer: { expected: n(31) } },
            { id: 9, difficulty: 'hard', question: say('$a_{n}=4n+1$ segidan, zenbat gai dira 100 baino txikiagoak?', 'En $a_{n}=4n+1$, ¿cuántos términos son menores que 100?', 'في $a_{n}=4n+1$ كم حدًا أصغر من 100؟', 'In $a_{n}=4n+1$, how many terms are less than 100?'), solution: say('$4n+1<100\\ \\to\\ n<24{,}75$: $a_{24}=97$ da azkena. 24 gai.', '$4n+1<100\\ \\to\\ n<24{,}75$: el último es $a_{24}=97$. 24 términos.', '$4n+1<100\\ \\to\\ n<24{,}75$: آخرها $a_{24}=97$. أربعة وعشرون حدًا.', '$4n+1<100\\ \\to\\ n<24{,}75$: the last one is $a_{24}=97$. 24 terms.'), answer: { expected: n(24) } },
            { id: 10, difficulty: 'hard', question: say('$a_{n}=n^{2}+2n$. Zein lekutan dago 99?', '$a_{n}=n^{2}+2n$. ¿En qué lugar está el 99?', '$a_{n}=n^{2}+2n$. في أي رتبة يقع 99؟', '$a_{n}=n^{2}+2n$. In which position is 99?'), solution: same('$a_{9}=81+18=99$'), answer: { expected: n(9) } }
        ]
    },
    {
        id: 'arithmetic',
        title: say('Progresio aritmetikoak', 'Progresiones aritméticas', 'المتتاليات الحسابية', 'Arithmetic progressions'),
        items: [
            { id: 11, difficulty: 'easy', question: say('Zein da $2{,}5,\\,4,\\,5{,}5,\\ldots$ progresioaren diferentzia?', '¿Cuál es la diferencia de $2{,}5,\\,4,\\,5{,}5,\\ldots$?', 'ما فرق المتتالية $2{,}5,\\,4,\\,5{,}5,\\ldots$؟', 'What is the common difference of $2{,}5,\\,4,\\,5{,}5,\\ldots$?'), solution: same('$4-2{,}5=1{,}5$'), answer: { expected: v('1,5') } },
            { id: 12, difficulty: 'easy', question: howMuch('$a_{1}=10,\\ d=-2$', 'a_{8}'), solution: same('$a_{8}=10+7\\cdot(-2)=-4$'), answer: { expected: n(-4) } },
            { id: 13, difficulty: 'easy', question: howMuch('$a_{1}=3,\\ d=7$', 'a_{12}'), solution: same('$a_{12}=3+11\\cdot 7=80$'), answer: { expected: n(80) } },
            { id: 14, difficulty: 'easy', question: nextOf('100,\\,94,\\,88'), solution: same('$88-6=82$'), answer: { expected: n(82) } },
            { id: 15, difficulty: 'medium', question: say('$a_{1}=8$ eta $d=3$ dituen progresioaren gai orokorra $a_{n}=3n+b$ da. Zenbat da $b$?', 'El término general de la progresión con $a_{1}=8$ y $d=3$ es $a_{n}=3n+b$. ¿Cuánto vale $b$?', 'الحد العام للمتتالية ذات $a_{1}=8$ و$d=3$ هو $a_{n}=3n+b$. كم يساوي $b$؟', 'The general term of the progression with $a_{1}=8$ and $d=3$ is $a_{n}=3n+b$. What is $b$?'), solution: same('$a_{n}=8+(n-1)\\cdot 3=3n+5$'), answer: { expected: n(5) } },
            { id: 16, difficulty: 'medium', question: howMuch('$a_{2}=9,\\ a_{7}=34$', 'd'), solution: same('$d=\\frac{34-9}{5}=5$'), answer: { expected: n(5) } },
            { id: 17, difficulty: 'medium', question: howMuch('$a_{3}=1,\\ a_{10}=-20$', 'a_{1}'), solution: same('$d=\\frac{-20-1}{7}=-3\\quad a_{1}=1+2\\cdot 3=7$'), answer: { expected: n(7) } },
            { id: 18, difficulty: 'medium', question: say('$5,\\,8,\\,11,\\ldots$ progresioan, zein lekutan dago 155?', 'En $5,\\,8,\\,11,\\ldots$, ¿en qué lugar está el 155?', 'في $5,\\,8,\\,11,\\ldots$ في أي رتبة يقع 155؟', 'In $5,\\,8,\\,11,\\ldots$, in which position is 155?'), solution: same('$a_{n}=3n+2=155\\ \\to\\ n=51$'), answer: { expected: n(51) } },
            { id: 19, difficulty: 'hard', question: say('Txertatu hiru gai 4 eta 24 artean progresio aritmetiko bat osatzeko. Zein da erdikoa?', 'Intercala tres términos entre 4 y 24 para formar una progresión aritmética. ¿Cuál es el del medio?', 'أدرج ثلاثة حدود بين 4 و24 لتكوين متتالية حسابية. ما الحد الأوسط؟', 'Insert three terms between 4 and 24 to make an arithmetic progression. What is the middle one?'), solution: same('$d=\\frac{24-4}{4}=5\\ \\to\\ 4,\\,9,\\,14,\\,19,\\,24$'), answer: { expected: n(14) } },
            { id: 20, difficulty: 'hard', question: say('$a_{1}=-8$ eta $d=1{,}5$. Zein lekutan dago lehen gai positiboa?', '$a_{1}=-8$ y $d=1{,}5$. ¿En qué lugar está el primer término positivo?', '$a_{1}=-8$ و$d=1{,}5$. في أي رتبة أول حد موجب؟', '$a_{1}=-8$ and $d=1{,}5$. In which position is the first positive term?'), solution: same('$a_{6}=-8+5\\cdot 1{,}5=-0{,}5\\quad a_{7}=-8+6\\cdot 1{,}5=1$'), answer: { expected: n(7) } }
        ]
    },
    {
        id: 'sums',
        title: say('Gaien batura', 'Suma de términos', 'مجموع الحدود', 'Sums of terms'),
        items: [
            { id: 21, difficulty: 'easy', question: say('Kalkulatu $1+2+\\cdots+20$.', 'Calcula $1+2+\\cdots+20$.', 'احسب $1+2+\\cdots+20$.', 'Work out $1+2+\\cdots+20$.'), solution: same('$\\frac{20\\cdot 21}{2}=210$'), answer: { expected: n(210) } },
            { id: 22, difficulty: 'easy', question: say('$1,\\,4,\\,7,\\ldots$ progresioaren lehen 10 gaien batura.', 'Suma de los 10 primeros términos de $1,\\,4,\\,7,\\ldots$', 'مجموع الحدود العشرة الأولى من $1,\\,4,\\,7,\\ldots$', 'Sum of the first 10 terms of $1,\\,4,\\,7,\\ldots$'), solution: same('$a_{10}=1+9\\cdot 3=28\\quad\\frac{(1+28)\\cdot 10}{2}=145$'), answer: { expected: n(145) } },
            { id: 23, difficulty: 'easy', question: say('Kalkulatu $5+10+15+\\cdots+100$.', 'Calcula $5+10+15+\\cdots+100$.', 'احسب $5+10+15+\\cdots+100$.', 'Work out $5+10+15+\\cdots+100$.'), solution: same('$\\frac{(5+100)\\cdot 20}{2}=1050$'), answer: { expected: n(1050) } },
            { id: 24, difficulty: 'medium', question: say('Kalkulatu $1+3+5+\\cdots+39$.', 'Calcula $1+3+5+\\cdots+39$.', 'احسب $1+3+5+\\cdots+39$.', 'Work out $1+3+5+\\cdots+39$.'), solution: same('$\\frac{(1+39)\\cdot 20}{2}=400$'), answer: { expected: n(400) } },
            { id: 25, difficulty: 'medium', question: say('$a_{1}=50$ eta $d=-4$ dituen progresioaren lehen 12 gaien batura.', 'Suma de los 12 primeros términos con $a_{1}=50$ y $d=-4$.', 'مجموع الحدود الاثني عشر الأولى مع $a_{1}=50$ و$d=-4$.', 'Sum of the first 12 terms with $a_{1}=50$ and $d=-4$.'), solution: same('$a_{12}=50-44=6\\quad\\frac{(50+6)\\cdot 12}{2}=336$'), answer: { expected: n(336) } },
            { id: 26, difficulty: 'medium', question: say('Enbor-pila bat: behean 15 enbor, eta ilara bakoitzean bat gutxiago, goian 1 egon arte. Zenbat enbor?', 'Una pila de troncos: abajo 15, y en cada fila uno menos, hasta 1 arriba. ¿Cuántos troncos?', 'كومة جذوع: 15 في الأسفل وفي كل صف جذع أقل حتى 1 في الأعلى. كم جذعًا؟', 'A pile of logs: 15 at the bottom, and one fewer in each row, up to 1 at the top. How many logs?'), solution: same('$\\frac{15\\cdot 16}{2}=120$'), answer: { expected: n(120) } },
            { id: 27, difficulty: 'medium', question: say('Lehen egunean 2 km korrika, eta egunero 0,5 km gehiago. Zenbat km 10 egunetan guztira?', 'El primer día 2 km corriendo, y cada día 0,5 km más. ¿Cuántos km en total en 10 días?', 'في اليوم الأول ركض 2 كم وكل يوم 0.5 كم زيادة. كم كيلومترًا إجمالًا في 10 أيام؟', 'On the first day 2 km running, and each day 0.5 km more. How many km in total in 10 days?'), solution: same('$a_{10}=2+9\\cdot 0{,}5=6{,}5\\quad\\frac{(2+6{,}5)\\cdot 10}{2}=42{,}5$'), answer: { expected: v('42,5') } },
            { id: 28, difficulty: 'hard', question: say('Batu 1 eta 100 arteko hiruren multiplo guztiak.', 'Suma todos los múltiplos de 3 entre 1 y 100.', 'اجمع كل مضاعفات 3 بين 1 و100.', 'Add all the multiples of 3 between 1 and 100.'), solution: say('$3,\\,6,\\ldots,99$: 33 gai. $\\frac{(3+99)\\cdot 33}{2}=1683$.', '$3,\\,6,\\ldots,99$: 33 términos. $\\frac{(3+99)\\cdot 33}{2}=1683$.', '$3,\\,6,\\ldots,99$: ثلاثة وثلاثون حدًا. $\\frac{(3+99)\\cdot 33}{2}=1683$.', '$3,\\,6,\\ldots,99$: 33 terms. $\\frac{(3+99)\\cdot 33}{2}=1683$.'), answer: { expected: n(1683) } },
            { id: 29, difficulty: 'hard', question: say('$1+2+3+\\cdots+n=210$. Zenbat da $n$?', '$1+2+3+\\cdots+n=210$. ¿Cuánto vale $n$?', '$1+2+3+\\cdots+n=210$. كم يساوي $n$؟', '$1+2+3+\\cdots+n=210$. What is $n$?'), solution: same('$\\frac{20\\cdot 21}{2}=210\\ \\to\\ n=20$'), answer: { expected: n(20) } },
            { id: 30, difficulty: 'hard', question: say('Progresio aritmetiko batean $a_{1}=4$ eta $S_{10}=175$. Zenbat da $d$?', 'En una progresión aritmética $a_{1}=4$ y $S_{10}=175$. ¿Cuánto vale $d$?', 'في متتالية حسابية $a_{1}=4$ و$S_{10}=175$. كم يساوي $d$؟', 'In an arithmetic progression $a_{1}=4$ and $S_{10}=175$. What is $d$?'), solution: same('$\\frac{(4+a_{10})\\cdot 10}{2}=175\\ \\to\\ a_{10}=31\\quad d=\\frac{31-4}{9}=3$'), answer: { expected: n(3) } }
        ]
    },
    {
        id: 'geometric',
        title: say('Progresio geometrikoak', 'Progresiones geométricas', 'المتتاليات الهندسية', 'Geometric progressions'),
        items: [
            { id: 31, difficulty: 'easy', question: nextOf('2,\\,10,\\,50'), solution: same('$50\\cdot 5=250$'), answer: { expected: n(250) } },
            { id: 32, difficulty: 'easy', question: say('Zein da $81,\\,27,\\,9,\\ldots$ progresioaren arrazoia?', '¿Cuál es la razón de $81,\\,27,\\,9,\\ldots$?', 'ما أساس المتتالية $81,\\,27,\\,9,\\ldots$؟', 'What is the common ratio of $81,\\,27,\\,9,\\ldots$?'), solution: same('$\\frac{27}{81}=\\frac{1}{3}$'), answer: { expected: f(1, 3) } },
            { id: 33, difficulty: 'easy', question: howMuch('$a_{1}=4,\\ r=3$', 'a_{5}'), solution: same('$a_{5}=4\\cdot 3^{4}=324$'), answer: { expected: n(324) } },
            { id: 34, difficulty: 'easy', question: howMuch('$a_{1}=1000,\\ r=0{,}1$', 'a_{4}'), solution: same('$a_{4}=1000\\cdot 0{,}1^{3}=1$'), answer: { expected: n(1) } },
            { id: 35, difficulty: 'medium', question: howMuch('$a_{1}=5,\\ r=-2$', 'a_{6}'), solution: same('$a_{6}=5\\cdot(-2)^{5}=-160$'), answer: { expected: n(-160) } },
            { id: 36, difficulty: 'medium', question: howMuch('$a_{3}=18,\\ r=3$', 'a_{1}'), solution: same('$a_{1}=\\frac{18}{3^{2}}=2$'), answer: { expected: n(2) } },
            { id: 37, difficulty: 'medium', question: howMuch('$a_{2}=6,\\ a_{5}=48$', 'r'), solution: same('$r^{3}=\\frac{48}{6}=8\\ \\to\\ r=2$'), answer: { expected: n(2) } },
            { id: 38, difficulty: 'medium', question: say('$3,\\,6,\\,12,\\ldots$ progresioan, zein lekutan dago 384?', 'En $3,\\,6,\\,12,\\ldots$, ¿en qué lugar está el 384?', 'في $3,\\,6,\\,12,\\ldots$ في أي رتبة يقع 384؟', 'In $3,\\,6,\\,12,\\ldots$, in which position is 384?'), solution: same('$3\\cdot 2^{n-1}=384\\ \\to\\ 2^{n-1}=128=2^{7}\\ \\to\\ n=8$'), answer: { expected: n(8) } },
            { id: 39, difficulty: 'hard', question: howMuch('$a_{1}=2,\\ a_{4}=54$', 'a_{6}'), solution: same('$r^{3}=27\\ \\to\\ r=3\\quad a_{6}=2\\cdot 3^{5}=486$'), answer: { expected: n(486) } },
            { id: 40, difficulty: 'hard', question: say('20 000 €-ko auto batek urtero bere balioaren % 20 galtzen du. Zenbat balio du 3 urteren buruan (€)?', 'Un coche de 20 000 € pierde cada año el 20 % de su valor. ¿Cuánto vale al cabo de 3 años (€)?', 'سيارة ثمنها 20000 € تفقد كل سنة 20٪ من قيمتها. كم تساوي بعد 3 سنوات (€)؟', 'A €20,000 car loses 20% of its value every year. How much is it worth after 3 years (€)?'), solution: same('$20\\,000\\cdot 0{,}8^{3}=10\\,240$'), answer: { expected: n(10240) } }
        ]
    },
    {
        id: 'geo-sums',
        title: say('Batura geometrikoak', 'Sumas geométricas', 'المجاميع الهندسية', 'Geometric sums'),
        items: [
            { id: 41, difficulty: 'easy', question: say('Kalkulatu $1+3+9+27+81$.', 'Calcula $1+3+9+27+81$.', 'احسب $1+3+9+27+81$.', 'Work out $1+3+9+27+81$.'), solution: same('$\\frac{3^{5}-1}{3-1}=121$'), answer: { expected: n(121) } },
            { id: 42, difficulty: 'easy', question: say('$2,\\,4,\\,8,\\ldots$ progresioaren lehen 5 gaien batura.', 'Suma de los 5 primeros términos de $2,\\,4,\\,8,\\ldots$', 'مجموع الحدود الخمسة الأولى من $2,\\,4,\\,8,\\ldots$', 'Sum of the first 5 terms of $2,\\,4,\\,8,\\ldots$'), solution: same('$\\frac{2\\cdot(2^{5}-1)}{2-1}=62$'), answer: { expected: n(62) } },
            { id: 43, difficulty: 'easy', question: say('Kalkulatu $6+3+1{,}5+\\cdots$ batura infinitua.', 'Calcula la suma infinita $6+3+1{,}5+\\cdots$', 'احسب المجموع اللانهائي $6+3+1{,}5+\\cdots$', 'Work out the infinite sum $6+3+1{,}5+\\cdots$'), solution: same('$\\frac{6}{1-\\frac{1}{2}}=12$'), answer: { expected: n(12) } },
            { id: 44, difficulty: 'medium', question: say('$1,\\,2,\\,4,\\ldots$ progresioaren lehen 8 gaien batura.', 'Suma de los 8 primeros términos de $1,\\,2,\\,4,\\ldots$', 'مجموع الحدود الثمانية الأولى من $1,\\,2,\\,4,\\ldots$', 'Sum of the first 8 terms of $1,\\,2,\\,4,\\ldots$'), solution: same('$\\frac{2^{8}-1}{2-1}=255$'), answer: { expected: n(255) } },
            { id: 45, difficulty: 'medium', question: say('Kalkulatu $10+1+0{,}1+\\cdots$ batura infinitua. Eman zatiki gisa.', 'Calcula la suma infinita $10+1+0{,}1+\\cdots$ Dala como fracción.', 'احسب المجموع اللانهائي $10+1+0{,}1+\\cdots$ واكتبه كسرًا.', 'Work out the infinite sum $10+1+0{,}1+\\cdots$ Give it as a fraction.'), solution: same('$\\frac{10}{1-\\frac{1}{10}}=\\frac{100}{9}$'), answer: { expected: f(100, 9) } },
            { id: 46, difficulty: 'medium', question: say('$0{,}444\\ldots=0{,}4+0{,}04+\\cdots$ Idatzi zatiki gisa.', '$0{,}444\\ldots=0{,}4+0{,}04+\\cdots$ Escríbelo como fracción.', '$0{,}444\\ldots=0{,}4+0{,}04+\\cdots$ اكتبه كسرًا.', '$0{,}444\\ldots=0{,}4+0{,}04+\\cdots$ Write it as a fraction.'), solution: same('$\\frac{0{,}4}{1-0{,}1}=\\frac{4}{9}$'), answer: { expected: f(4, 9) } },
            { id: 47, difficulty: 'medium', question: say('$5,\\,-10,\\,20,\\ldots$ progresioaren lehen 4 gaien batura.', 'Suma de los 4 primeros términos de $5,\\,-10,\\,20,\\ldots$', 'مجموع الحدود الأربعة الأولى من $5,\\,-10,\\,20,\\ldots$', 'Sum of the first 4 terms of $5,\\,-10,\\,20,\\ldots$'), solution: same('$5-10+20-40=-25$'), answer: { expected: n(-25) } },
            { id: 48, difficulty: 'hard', question: say('2000 € % 5eko interes konposatuan, 3 urtez. Zenbat diru amaieran (€)?', '2000 € al 5 % de interés compuesto durante 3 años. ¿Cuánto dinero al final (€)?', '2000 € بفائدة مركّبة 5٪ مدة 3 سنوات. كم المال في النهاية (€)؟', '€2,000 at 5% compound interest for 3 years. How much money at the end (€)?'), solution: same('$2000\\cdot 1{,}05^{3}=2315{,}25$'), answer: { expected: v('2315,25') } },
            { id: 49, difficulty: 'hard', question: say('Pilota bat 2 m-tik erortzen da, eta errebote bakoitzean aurreko altueraren erdia igotzen da. Zenbat metro egiten ditu guztira gelditu arte?', 'Una pelota cae desde 2 m y en cada bote sube la mitad de la altura anterior. ¿Cuántos metros recorre en total hasta pararse?', 'تسقط كرة من 2 م وترتفع في كل ارتداد نصف الارتفاع السابق. كم مترًا تقطع إجمالًا حتى تتوقف؟', 'A ball falls from 2 m and at each bounce rises half the previous height. How many metres does it travel in total until it stops?'), solution: say('Behera 2 m, eta gero gora eta behera $1+0{,}5+\\cdots$ bi aldiz: $2+2\\cdot\\frac{1}{1-\\frac{1}{2}}=6$ m.', 'Bajada de 2 m, y luego subida y bajada de $1+0{,}5+\\cdots$ dos veces: $2+2\\cdot\\frac{1}{1-\\frac{1}{2}}=6$ m.', 'نزول 2 م، ثم صعود ونزول $1+0{,}5+\\cdots$ مرتين: $2+2\\cdot\\frac{1}{1-\\frac{1}{2}}=6$ م.', 'Down 2 m, then up and down $1+0{,}5+\\cdots$ twice: $2+2\\cdot\\frac{1}{1-\\frac{1}{2}}=6$ m.'), answer: { expected: n(6) } },
            { id: 50, difficulty: 'hard', question: say('64 cm²-ko karratu batean, aldeen erdiko puntuak lotuz azalera erdiko karratu bat egiten da, eta horrela behin eta berriz. Zenbat da karratu guztien azaleren batura (cm²)?', 'En un cuadrado de 64 cm², uniendo los puntos medios de los lados sale otro de área la mitad, y así una y otra vez. ¿Cuánto suman las áreas de todos los cuadrados (cm²)?', 'في مربع مساحته 64 سم² نصل منتصفات الأضلاع فنحصل على مربع مساحته النصف، وهكذا مرارًا. كم مجموع مساحات كل المربعات (سم²)؟', 'In a square of 64 cm², joining the midpoints of the sides gives another square of half the area, and so on again and again. What is the sum of the areas of all the squares (cm²)?'), solution: same('$\\frac{64}{1-\\frac{1}{2}}=128$'), answer: { expected: n(128) } }
        ]
    }
]

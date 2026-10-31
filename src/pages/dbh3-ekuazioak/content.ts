import { fraction } from '../../features/unit-v2/math/fraction.ts'
import type { ChallengeItem, DiagnosticQuestion, ExerciseSection, LocalizedText, PracticeItem } from '../../features/unit-v2/types.ts'
import { say, same } from './text.ts'

/* ==========================================================================
   Ekuazioak eta sistemak · 3. DBH — diagnostic, guided practice, exercise
   bank and challenges, after Santillana 3.º ESO units 6–7 and Anaya 3.º ESO
   units 6–7 (the books fix the scope and the order; every number here is
   original). Answers are one number: the solution, the positive or the
   larger one when there are two, or the unknown that is asked for.
   ========================================================================== */

const n = (value: number, denominator = 1) => fraction(value, denominator)

const solve = (equation: string): LocalizedText => say(`Ebatzi ${equation}.`, `Resuelve ${equation}.`, `حلّ ${equation}.`, `Solve ${equation}.`)
const positive = (equation: string): LocalizedText => say(`Ebatzi ${equation}. Idatzi ebazpen positiboa.`, `Resuelve ${equation}. Escribe la solución positiva.`, `حلّ ${equation}. اكتب الحل الموجب.`, `Solve ${equation}. Write the positive solution.`)
const larger = (equation: string): LocalizedText => say(`Ebatzi ${equation}. Idatzi ebazpen handiena.`, `Resuelve ${equation}. Escribe la solución mayor.`, `حلّ ${equation}. اكتب الحل الأكبر.`, `Solve ${equation}. Write the larger solution.`)
const notZero = (equation: string): LocalizedText => say(`Ebatzi ${equation}. Idatzi zero ez den ebazpena.`, `Resuelve ${equation}. Escribe la solución distinta de cero.`, `حلّ ${equation}. اكتب الحل غير الصفري.`, `Solve ${equation}. Write the non-zero solution.`)
const system = (first: string, second: string, unknown: string): LocalizedText => say(
    `Ebatzi sistema: $${first}$, $${second}$. Zenbat da $${unknown}$?`,
    `Resuelve el sistema $${first}$, $${second}$. ¿Cuánto vale $${unknown}$?`,
    `حلّ النظام $${first}$، $${second}$. كم يساوي $${unknown}$؟`,
    `Solve the system $${first}$, $${second}$. What is $${unknown}$?`
)
const howMany = (equation: string): LocalizedText => say(`Zenbat ebazpen ditu ${equation} ekuazioak? Idatzi 0, 1 edo 2.`, `¿Cuántas soluciones tiene ${equation}? Escribe 0, 1 o 2.`, `كم حلًّا لـ ${equation}؟ اكتب 0 أو 1 أو 2.`, `How many solutions does ${equation} have? Write 0, 1 or 2.`)

export const equations3Diagnostic: DiagnosticQuestion[] = [
    {
        id: 6701,
        prompt: say('Zein da $3x-5=10$ ekuazioaren ebazpena?', '¿Cuál es la solución de $3x-5=10$?', 'ما حل $3x-5=10$؟', 'What is the solution of $3x-5=10$?'),
        options: [same('$x=5$'), same('$x=\\frac{5}{3}$'), same('$x=15$')],
        correctIndex: 0,
        explanation: same('$3x=15\\ \\to\\ x=5$'),
        topic: 'equations'
    },
    {
        id: 6702,
        prompt: say('Nola geratzen da $-(x-3)$ parentesia kenduta?', '¿Cómo queda $-(x-3)$ al quitar el paréntesis?', 'كيف تصير $-(x-3)$ بعد إزالة القوس؟', 'What does $-(x-3)$ become without the brackets?'),
        options: [same('$-x-3$'), same('$-x+3$'), same('$x-3$')],
        correctIndex: 1,
        explanation: say('Minusak bi gaiei eragiten die: $-x+3$.', 'El menos afecta a los dos términos: $-x+3$.', 'السالب يؤثر في الحدين: $-x+3$.', 'The minus affects both terms: $-x+3$.'),
        topic: 'brackets'
    },
    {
        id: 6703,
        prompt: say('$\\frac{x}{2}+1=4$ bider 2. Zer geratzen da?', 'Multiplico $\\frac{x}{2}+1=4$ por 2. ¿Qué queda?', 'أضرب $\\frac{x}{2}+1=4$ في 2. ماذا يبقى؟', 'I multiply $\\frac{x}{2}+1=4$ by 2. What is left?'),
        options: [same('$x+1=8$'), same('$x+2=4$'), same('$x+2=8$')],
        correctIndex: 2,
        explanation: say('Gai guztiak biderkatzen dira: $x+2=8$, beraz $x=6$.', 'Se multiplican todos los términos: $x+2=8$, así que $x=6$.', 'تُضرب كل الحدود: $x+2=8$، إذن $x=6$.', 'Every term is multiplied: $x+2=8$, so $x=6$.'),
        topic: 'denominators'
    },
    {
        id: 6704,
        prompt: say('Zeintzuk dira $x^{2}=25$ ekuazioaren ebazpenak?', '¿Cuáles son las soluciones de $x^{2}=25$?', 'ما حلول $x^{2}=25$؟', 'What are the solutions of $x^{2}=25$?'),
        options: [same('$x=5$'), same('$x=5,\\ x=-5$'), same('$x=12{,}5$')],
        correctIndex: 1,
        explanation: say('$5^{2}=25$ eta $(-5)^{2}=25$: bi ebazpen.', '$5^{2}=25$ y $(-5)^{2}=25$: dos soluciones.', '$5^{2}=25$ و$(-5)^{2}=25$: حلّان.', '$5^{2}=25$ and $(-5)^{2}=25$: two solutions.'),
        topic: 'incomplete'
    },
    {
        id: 6705,
        prompt: say('Zenbat ebazpen ditu $x^{2}+2x+5=0$ ekuazioak?', '¿Cuántas soluciones tiene $x^{2}+2x+5=0$?', 'كم حلًّا لـ $x^{2}+2x+5=0$؟', 'How many solutions does $x^{2}+2x+5=0$ have?'),
        options: [say('Bat ere ez', 'Ninguna', 'لا حل', 'None'), say('Bat', 'Una', 'حلّ واحد', 'One'), say('Bi', 'Dos', 'حلّان', 'Two')],
        correctIndex: 0,
        explanation: say('$\\Delta=4-20=-16$ negatiboa da: ebazpenik ez.', '$\\Delta=4-20=-16$ es negativo: no tiene solución.', '$\\Delta=4-20=-16$ سالب: لا حل.', '$\\Delta=4-20=-16$ is negative: no solution.'),
        topic: 'discriminant'
    },
    {
        id: 6706,
        prompt: say('Zein bikote da $x+y=6$, $x-y=2$ sistemaren ebazpena?', '¿Qué pareja es solución del sistema $x+y=6$, $x-y=2$?', 'أي زوج حلّ للنظام $x+y=6$، $x-y=2$؟', 'Which pair solves the system $x+y=6$, $x-y=2$?'),
        options: [same('$(3,3)$'), same('$(5,1)$'), same('$(4,2)$')],
        correctIndex: 2,
        explanation: say('$4+2=6$ eta $4-2=2$: biak betetzen ditu.', '$4+2=6$ y $4-2=2$: cumple las dos.', '$4+2=6$ و$4-2=2$: يحقق الاثنتين.', '$4+2=6$ and $4-2=2$: it satisfies both.'),
        topic: 'pairs'
    },
    {
        id: 6707,
        prompt: say('Nolakoa da $x+y=3$, $2x+2y=8$ sistema?', '¿Cómo es el sistema $x+y=3$, $2x+2y=8$?', 'ما نوع النظام $x+y=3$، $2x+2y=8$؟', 'What kind of system is $x+y=3$, $2x+2y=8$?'),
        options: [say('Ebazpen bakarra', 'Una solución', 'حلّ واحد', 'One solution'), say('Ebazpenik ez', 'Sin solución', 'لا حل', 'No solution'), say('Infinitu ebazpen', 'Infinitas soluciones', 'حلول لانهائية', 'Infinitely many')],
        correctIndex: 1,
        explanation: say('Bigarrena $x+y=4$ da: zuzen paraleloak, ebazpenik ez.', 'La segunda es $x+y=4$: rectas paralelas, sin solución.', 'الثانية هي $x+y=4$: مستقيمان متوازيان، لا حل.', 'The second is $x+y=4$: parallel lines, no solution.'),
        topic: 'classify'
    },
    {
        id: 6708,
        prompt: say('$x+y=10$ eta $x-y=4$ batzen ditut. Zer lortzen dut?', 'Sumo $x+y=10$ y $x-y=4$. ¿Qué obtengo?', 'أجمع $x+y=10$ و$x-y=4$. ماذا أحصل؟', 'I add $x+y=10$ and $x-y=4$. What do I get?'),
        options: [same('$2x=14$'), same('$2y=14$'), same('$2x=6$')],
        correctIndex: 0,
        explanation: say('$y$ eta $-y$ ezeztatzen dira: $2x=14$, $x=7$.', '$y$ y $-y$ se anulan: $2x=14$, $x=7$.', '$y$ و$-y$ يلغي أحدهما الآخر: $2x=14$، $x=7$.', '$y$ and $-y$ cancel out: $2x=14$, $x=7$.'),
        topic: 'elimination'
    }
]

export const equations3Practice: PracticeItem[] = [
    /* ---------- First degree ---------- */
    { id: 1, stage: 'linear', prompt: solve('$4x+7=x+19$'), expected: n(4), hint: say('Eraman $x$ gaiak ezkerrera eta zenbakiak eskuinera.', 'Pasa las $x$ a la izquierda y los números a la derecha.', 'انقل حدود $x$ إلى اليسار والأعداد إلى اليمين.', 'Move the $x$ terms to the left and the numbers to the right.'), explanation: same('$3x=12\\ \\to\\ x=4$') },
    { id: 2, stage: 'linear', prompt: solve('$5(x-2)=3(x+4)$'), expected: n(11), hint: say('Lehenik kendu parentesiak.', 'Primero quita los paréntesis.', 'أولًا أزل الأقواس.', 'First remove the brackets.'), explanation: same('$5x-10=3x+12\\ \\to\\ 2x=22\\ \\to\\ x=11$') },
    { id: 3, stage: 'linear', prompt: solve('$\\frac{x}{3}+\\frac{x}{4}=7$'), expected: n(12), hint: say('Biderkatu dena 12 zenbakiaz.', 'Multiplica todo por 12.', 'اضرب الكل في 12.', 'Multiply everything by 12.'), explanation: same('$4x+3x=84\\ \\to\\ x=12$') },
    { id: 4, stage: 'linear', prompt: solve('$\\frac{x+1}{2}-\\frac{x-2}{5}=3$'), expected: n(7), hint: say('m.k.t. 10 da; kontuz minusarekin.', 'El m.c.m. es 10; cuidado con el menos.', 'م.م.أ. هو 10؛ انتبه للسالب.', 'The LCM is 10; careful with the minus.'), explanation: same('$5(x+1)-2(x-2)=30\\ \\to\\ 3x+9=30\\ \\to\\ x=7$') },

    /* ---------- Second degree ---------- */
    { id: 5, stage: 'quadratic', prompt: positive('$2x^{2}-50=0$'), expected: n(5), hint: say('Bakandu $x^{2}$.', 'Despeja $x^{2}$.', 'اعزل $x^{2}$.', 'Isolate $x^{2}$.'), explanation: same('$x^{2}=25\\ \\to\\ x=5,\\ x=-5$') },
    { id: 6, stage: 'quadratic', prompt: notZero('$x^{2}-7x=0$'), expected: n(7), hint: say('Atera $x$ faktore komun gisa.', 'Saca $x$ factor común.', 'أخرج $x$ عاملًا مشتركًا.', 'Take $x$ out as a common factor.'), explanation: same('$x(x-7)=0\\ \\to\\ x=0,\\ x=7$') },
    { id: 7, stage: 'quadratic', prompt: positive('$x^{2}+2x-15=0$'), expected: n(3), hint: say('$a=1$, $b=2$, $c=-15$.', '$a=1$, $b=2$, $c=-15$.', '$a=1$، $b=2$، $c=-15$.', '$a=1$, $b=2$, $c=-15$.'), explanation: same('$x=\\frac{-2\\pm 8}{2}\\ \\to\\ x=3,\\ x=-5$') },
    { id: 8, stage: 'quadratic', prompt: say('Kalkulatu $3x^{2}-4x+2=0$ ekuazioaren diskriminatzailea.', 'Calcula el discriminante de $3x^{2}-4x+2=0$.', 'احسب مميّز $3x^{2}-4x+2=0$.', 'Work out the discriminant of $3x^{2}-4x+2=0$.'), expected: n(-8), hint: same('$\\Delta=b^{2}-4ac$'), explanation: same('$(-4)^{2}-4\\cdot 3\\cdot 2=-8$') },

    /* ---------- Systems ---------- */
    { id: 9, stage: 'systems', prompt: say('$(4,y)$ bikotea $3x+y=17$ ekuazioaren ebazpena da. Zenbat da $y$?', 'La pareja $(4,y)$ es solución de $3x+y=17$. ¿Cuánto vale $y$?', 'الزوج $(4,y)$ حلّ لـ $3x+y=17$. كم يساوي $y$؟', 'The pair $(4,y)$ is a solution of $3x+y=17$. What is $y$?'), expected: n(5), hint: say('Ordezkatu $x=4$.', 'Sustituye $x=4$.', 'عوّض $x=4$.', 'Substitute $x=4$.'), explanation: same('$3\\cdot 4+y=17\\ \\to\\ y=5$') },
    { id: 10, stage: 'systems', prompt: say('$y=2x-1$ eta $y=x+2$ zuzenak puntu batean ebakitzen dira. Zein da haren $y$?', 'Las rectas $y=2x-1$ e $y=x+2$ se cortan en un punto. ¿Cuál es su $y$?', 'يتقاطع المستقيمان $y=2x-1$ و$y=x+2$ في نقطة. ما قيمة $y$ فيها؟', 'The lines $y=2x-1$ and $y=x+2$ cross at one point. What is its $y$?'), expected: n(5), hint: say('Bi $y$ berdinak dira ebakidura-puntuan.', 'En el punto de corte las dos $y$ son iguales.', 'في نقطة التقاطع تتساوى قيمتا $y$.', 'At the crossing point both $y$ are equal.'), explanation: same('$2x-1=x+2\\ \\to\\ x=3,\\ y=5$') },
    { id: 11, stage: 'systems', prompt: say('Zein $k$ baliotarako ez du ebazpenik $x+2y=5$, $2x+ky=7$ sistemak?', '¿Para qué valor de $k$ no tiene solución el sistema $x+2y=5$, $2x+ky=7$?', 'لأي قيمة لـ $k$ لا حلّ للنظام $x+2y=5$، $2x+ky=7$؟', 'For which value of $k$ does the system $x+2y=5$, $2x+ky=7$ have no solution?'), expected: n(4), hint: say('Zuzen paraleloak: $x$ eta $y$ koefizienteak proportzionalak.', 'Rectas paralelas: coeficientes de $x$ e $y$ proporcionales.', 'مستقيمان متوازيان: معاملا $x$ و$y$ متناسبان.', 'Parallel lines: the coefficients of $x$ and $y$ are proportional.'), explanation: same('$\\frac{2}{1}=\\frac{k}{2}\\ \\to\\ k=4$') },
    { id: 12, stage: 'systems', prompt: say('$(a,2)$ bikotea $x+y=7$, $2x-y=8$ sistemaren ebazpena da. Zenbat da $a$?', 'La pareja $(a,2)$ es solución del sistema $x+y=7$, $2x-y=8$. ¿Cuánto vale $a$?', 'الزوج $(a,2)$ حلّ للنظام $x+y=7$، $2x-y=8$. كم يساوي $a$؟', 'The pair $(a,2)$ solves the system $x+y=7$, $2x-y=8$. What is $a$?'), expected: n(5), hint: say('Erabili lehen ekuazioa eta egiaztatu bigarrenean.', 'Usa la primera ecuación y comprueba en la segunda.', 'استعمل المعادلة الأولى وتحقّق في الثانية.', 'Use the first equation and check in the second.'), explanation: same('$a+2=7\\ \\to\\ a=5\\quad 2\\cdot 5-2=8$') },

    /* ---------- Methods ---------- */
    { id: 13, stage: 'methods', prompt: system('x=2y', 'x+y=12', 'x'), expected: n(8), hint: say('Ordezkatu $x=2y$ bigarrenean.', 'Sustituye $x=2y$ en la segunda.', 'عوّض $x=2y$ في الثانية.', 'Substitute $x=2y$ in the second.'), explanation: same('$2y+y=12\\ \\to\\ y=4,\\ x=8$') },
    { id: 14, stage: 'methods', prompt: system('y=3x-2', 'y=x+4', 'y'), expected: n(7), hint: say('Berdindu bi adierazpenak.', 'Iguala las dos expresiones.', 'ساوِ العبارتين.', 'Set the two expressions equal.'), explanation: same('$3x-2=x+4\\ \\to\\ x=3,\\ y=7$') },
    { id: 15, stage: 'methods', prompt: system('3x+2y=16', '5x-2y=16', 'x'), expected: n(4), hint: say('Batu bi ekuazioak: $2y$ eta $-2y$ desagertzen dira.', 'Suma las dos ecuaciones: $2y$ y $-2y$ se van.', 'اجمع المعادلتين: يختفي $2y$ و$-2y$.', 'Add the two equations: $2y$ and $-2y$ cancel.'), explanation: same('$8x=32\\ \\to\\ x=4,\\ y=2$') },
    { id: 16, stage: 'methods', prompt: system('2x+3y=13', '2x+y=7', 'y'), expected: n(3), hint: say('Kendu bigarrena lehenengoari.', 'Resta la segunda a la primera.', 'اطرح الثانية من الأولى.', 'Subtract the second from the first.'), explanation: same('$2y=6\\ \\to\\ y=3,\\ x=2$') },

    /* ---------- Problems ---------- */
    { id: 17, stage: 'problems', prompt: say('Hiru zenbaki jarraien batura 84 da. Zein da txikiena?', 'La suma de tres números consecutivos es 84. ¿Cuál es el menor?', 'مجموع ثلاثة أعداد متتالية 84. ما أصغرها؟', 'The sum of three consecutive numbers is 84. What is the smallest?'), expected: n(27), hint: same('$x+(x+1)+(x+2)=84$'), explanation: same('$3x+3=84\\ \\to\\ x=27$') },
    { id: 18, stage: 'problems', prompt: say('Aitak 40 urte ditu eta semeak 12. Zenbat urte barru izango du aitak semearen bikoitza?', 'Un padre tiene 40 años y su hijo 12. ¿Dentro de cuántos años tendrá el padre el doble que el hijo?', 'عمر أب 40 سنة وعمر ابنه 12. بعد كم سنة يصير عمر الأب ضعف عمر الابن؟', 'A father is 40 and his son is 12. In how many years will the father be twice the son\'s age?'), expected: n(16), hint: say('Urteak biei batu: $40+t$ eta $12+t$.', 'Suma los años a los dos: $40+t$ y $12+t$.', 'أضف السنوات إلى الاثنين: $40+t$ و$12+t$.', 'Add the years to both: $40+t$ and $12+t$.'), explanation: same('$40+t=2(12+t)\\ \\to\\ t=16$') },
    { id: 19, stage: 'problems', prompt: say('Laukizuzen baten aldeak $x$ eta $x+2$ dira, eta azalera 63. Zenbat da alde txikia?', 'Los lados de un rectángulo son $x$ y $x+2$, y su área es 63. ¿Cuánto mide el lado menor?', 'ضلعا مستطيل $x$ و$x+2$ ومساحته 63. كم طول الضلع الأصغر؟', 'The sides of a rectangle are $x$ and $x+2$, and its area is 63. How long is the shorter side?'), expected: n(7), hint: same('$x(x+2)=63$'), explanation: same('$x^{2}+2x-63=0\\ \\to\\ x=7,\\ x=-9$') },
    { id: 20, stage: 'problems', prompt: say('2 ogitarteko eta zuku 1: 8 euro. Ogitarteko 1 eta 2 zuku: 7 euro. Zenbat balio du ogitarteko batek?', '2 bocadillos y 1 zumo cuestan 8 €; 1 bocadillo y 2 zumos, 7 €. ¿Cuánto cuesta un bocadillo?', 'شطيرتان وعصير واحد بـ 8 يورو؛ وشطيرة وعصيران بـ 7 يورو. كم ثمن الشطيرة؟', '2 sandwiches and 1 juice cost 8 €; 1 sandwich and 2 juices, 7 €. How much is a sandwich?'), expected: n(3), hint: same('$2s+j=8,\\ s+2j=7$'), explanation: same('$4s+2j=16\\ \\to\\ 3s=9\\ \\to\\ s=3,\\ j=2$') }
]

export const equations3Challenges: ChallengeItem[] = [
    { id: 101, stage: 'linear', points: 10, context: 'starter', prompt: solve('$7-2(x-3)=x+1$'), expected: n(4), hint: say('$-2(x-3)=-2x+6$.', '$-2(x-3)=-2x+6$.', '$-2(x-3)=-2x+6$.', '$-2(x-3)=-2x+6$.'), explanation: same('$13-2x=x+1\\ \\to\\ x=4$') },
    { id: 102, stage: 'linear', points: 20, context: 'advanced', prompt: solve('$\\frac{2x-1}{3}-\\frac{x+2}{4}=\\frac{1}{2}$'), expected: n(16, 5), hint: say('Biderkatu dena 12 zenbakiaz.', 'Multiplica todo por 12.', 'اضرب الكل في 12.', 'Multiply everything by 12.'), explanation: same('$8x-4-3x-6=6\\ \\to\\ x=\\frac{16}{5}$') },
    { id: 103, stage: 'linear', points: 30, context: 'master', prompt: say('Zein $a$ baliotarako da $x=5$ ekuazio honen ebazpena: $ax+3=2x+a$?', '¿Para qué valor de $a$ es $x=5$ solución de $ax+3=2x+a$?', 'لأي قيمة لـ $a$ يكون $x=5$ حلًّا لـ $ax+3=2x+a$؟', 'For which value of $a$ is $x=5$ a solution of $ax+3=2x+a$?'), expected: n(7, 4), hint: say('Ordezkatu $x=5$ eta ebatzi $a$.', 'Sustituye $x=5$ y resuelve en $a$.', 'عوّض $x=5$ وحلّ بالنسبة إلى $a$.', 'Substitute $x=5$ and solve for $a$.'), explanation: same('$5a+3=10+a\\ \\to\\ a=\\frac{7}{4}$') },
    { id: 104, stage: 'quadratic', points: 10, context: 'starter', prompt: solve('$x^{2}-6x+9=0$'), expected: n(3), hint: say('Kalkulatu lehenik $\\Delta$.', 'Calcula primero $\\Delta$.', 'احسب أولًا $\\Delta$.', 'Work out $\\Delta$ first.'), explanation: same('$\\Delta=36-36=0\\ \\to\\ x=3$') },
    { id: 105, stage: 'quadratic', points: 20, context: 'advanced', prompt: say('Zein $k$ baliotarako du $x^{2}+6x+k=0$ ekuazioak ebazpen bakarra?', '¿Para qué valor de $k$ tiene $x^{2}+6x+k=0$ una sola solución?', 'لأي قيمة لـ $k$ يكون لـ $x^{2}+6x+k=0$ حلّ واحد؟', 'For which value of $k$ does $x^{2}+6x+k=0$ have a single solution?'), expected: n(9), hint: same('$\\Delta=0$'), explanation: same('$36-4k=0\\ \\to\\ k=9$') },
    { id: 106, stage: 'quadratic', points: 30, context: 'master', prompt: positive('$(x+1)^{2}=2x+10$'), expected: n(3), hint: say('Garatu karratua: $x$ gaiak ezeztatzen dira.', 'Desarrolla el cuadrado: los términos en $x$ se anulan.', 'انشر المربع: تختفي حدود $x$.', 'Expand the square: the $x$ terms cancel.'), explanation: same('$x^{2}+2x+1=2x+10\\ \\to\\ x^{2}=9\\ \\to\\ x=3$') },
    { id: 107, stage: 'systems', points: 10, context: 'starter', prompt: say('$x+y=6$ eta $x-y=0$ zuzenak puntu batean ebakitzen dira. Zenbat da haren $y$?', 'Las rectas $x+y=6$ y $x-y=0$ se cortan en un punto. ¿Cuánto vale su $y$?', 'يتقاطع المستقيمان $x+y=6$ و$x-y=0$ في نقطة. كم يساوي $y$ فيها؟', 'The lines $x+y=6$ and $x-y=0$ cross at one point. What is its $y$?'), expected: n(3), hint: say('Bigarrenak $x=y$ esan nahi du.', 'La segunda dice que $x=y$.', 'الثانية تعني $x=y$.', 'The second says $x=y$.'), explanation: same('$2x=6\\ \\to\\ x=3,\\ y=3$') },
    { id: 108, stage: 'systems', points: 20, context: 'advanced', prompt: say('Zein $m$ baliotarako ditu infinitu ebazpen $x+y=4$, $3x+my=12$ sistemak?', '¿Para qué valor de $m$ tiene infinitas soluciones el sistema $x+y=4$, $3x+my=12$?', 'لأي قيمة لـ $m$ يكون للنظام $x+y=4$، $3x+my=12$ حلول لانهائية؟', 'For which value of $m$ does the system $x+y=4$, $3x+my=12$ have infinitely many solutions?'), expected: n(3), hint: say('Bigarrenak lehena bider zenbaki bat izan behar du.', 'La segunda tiene que ser la primera por un número.', 'يجب أن تكون الثانية الأولى في عدد.', 'The second must be the first times a number.'), explanation: same('$\\frac{3}{1}=\\frac{m}{1}=\\frac{12}{4}\\ \\to\\ m=3$') },
    { id: 109, stage: 'systems', points: 30, context: 'master', prompt: say('$ax+by=12$ ekuazioak $(1,3)$ eta $(4,0)$ ebazpenak ditu. Zenbat da $b$?', 'La ecuación $ax+by=12$ tiene las soluciones $(1,3)$ y $(4,0)$. ¿Cuánto vale $b$?', 'للمعادلة $ax+by=12$ الحلّان $(1,3)$ و$(4,0)$. كم يساوي $b$؟', 'The equation $ax+by=12$ has the solutions $(1,3)$ and $(4,0)$. What is $b$?'), expected: n(3), hint: say('Ordezkatu bi bikoteak: bi ekuazio lortzen dituzu.', 'Sustituye las dos parejas: tienes dos ecuaciones.', 'عوّض الزوجين: تحصل على معادلتين.', 'Substitute both pairs: you get two equations.'), explanation: same('$4a=12\\ \\to\\ a=3\\quad 3+3b=12\\ \\to\\ b=3$') },
    { id: 110, stage: 'methods', points: 10, context: 'starter', prompt: system('y=x+1', '2x+y=10', 'x'), expected: n(3), hint: say('Ordezkatu $y$ bigarrenean.', 'Sustituye $y$ en la segunda.', 'عوّض $y$ في الثانية.', 'Substitute $y$ in the second.'), explanation: same('$2x+x+1=10\\ \\to\\ x=3,\\ y=4$') },
    { id: 111, stage: 'methods', points: 20, context: 'advanced', prompt: system('4x+3y=18', '3x-2y=5', 'y'), expected: n(2), hint: say('Lehena bider 2 eta bigarrena bider 3.', 'La primera por 2 y la segunda por 3.', 'الأولى في 2 والثانية في 3.', 'The first times 2 and the second times 3.'), explanation: same('$17x=51\\ \\to\\ x=3\\quad 12+3y=18\\ \\to\\ y=2$') },
    { id: 112, stage: 'methods', points: 30, context: 'master', prompt: system('\\frac{x}{2}+\\frac{y}{3}=4', 'x-y=3', 'x'), expected: n(6), hint: say('Lehenik kendu izendatzaileak: bider 6.', 'Primero quita denominadores: por 6.', 'أولًا أزل المقامات: في 6.', 'First clear the denominators: times 6.'), explanation: same('$3x+2y=24,\\ x=y+3\\ \\to\\ 5y+9=24\\ \\to\\ y=3,\\ x=6$') },
    { id: 113, stage: 'problems', points: 10, context: 'starter', prompt: say('Bi zenbakiren batura 30 da eta kendura 8. Zein da handiena?', 'Dos números suman 30 y se diferencian en 8. ¿Cuál es el mayor?', 'مجموع عددين 30 والفرق بينهما 8. ما الأكبر؟', 'Two numbers add up to 30 and differ by 8. What is the larger?'), expected: n(19), hint: same('$x+y=30,\\ x-y=8$'), explanation: same('$2x=38\\ \\to\\ x=19,\\ y=11$') },
    { id: 114, stage: 'problems', points: 20, context: 'advanced', prompt: say('Baserri batean oiloak eta untxiak daude: 35 buru eta 94 hanka. Zenbat untxi daude?', 'En una granja hay gallinas y conejos: 35 cabezas y 94 patas. ¿Cuántos conejos hay?', 'في مزرعة دجاج وأرانب: 35 رأسًا و94 رجلًا. كم أرنبًا هناك؟', 'A farm has hens and rabbits: 35 heads and 94 legs. How many rabbits are there?'), expected: n(12), hint: same('$g+r=35,\\ 2g+4r=94$'), explanation: same('$2r=94-70=24\\ \\to\\ r=12$') },
    { id: 115, stage: 'problems', points: 30, context: 'master', prompt: say('Lorategi karratu baten aldea 3 metro handitzen bada, azalera 64 metro karratu da. Zenbat zen aldea?', 'Si el lado de un jardín cuadrado aumenta 3 metros, el área es de 64 metros cuadrados. ¿Cuánto medía el lado?', 'إذا زاد ضلع حديقة مربعة 3 أمتار صارت مساحتها 64 مترًا مربعًا. كم كان طول الضلع؟', 'If the side of a square garden grows by 3 metres, its area is 64 square metres. How long was the side?'), expected: n(5), hint: same('$(x+3)^{2}=64$'), explanation: same('$x+3=8\\ \\to\\ x=5$') }
]

export const equations3ExerciseBank: ExerciseSection[] = [
    {
        id: 'linear',
        title: say('Lehen mailako ekuazioak', 'Ecuaciones de primer grado', 'معادلات الدرجة الأولى', 'First-degree equations'),
        items: [
            { id: 1, difficulty: 'easy', question: solve('$x+8=15$'), solution: same('$x=15-8=7$'), answer: { expected: n(7) } },
            { id: 2, difficulty: 'easy', question: solve('$3x=-12$'), solution: same('$x=-12\\div 3=-4$'), answer: { expected: n(-4) } },
            { id: 3, difficulty: 'easy', question: solve('$5x-3=2x+9$'), solution: same('$3x=12\\ \\to\\ x=4$'), answer: { expected: n(4) } },
            { id: 4, difficulty: 'easy', question: solve('$2(x+3)=14$'), solution: same('$2x+6=14\\ \\to\\ x=4$'), answer: { expected: n(4) } },
            { id: 5, difficulty: 'medium', question: solve('$4(x-1)-3(x+2)=0$'), solution: same('$4x-4-3x-6=0\\ \\to\\ x=10$'), answer: { expected: n(10) } },
            { id: 6, difficulty: 'medium', question: solve('$\\frac{x}{5}=\\frac{x}{2}-3$'), solution: same('$2x=5x-30\\ \\to\\ x=10$'), answer: { expected: n(10) } },
            { id: 7, difficulty: 'medium', question: solve('$\\frac{3x}{4}-2=\\frac{x}{2}$'), solution: same('$3x-8=2x\\ \\to\\ x=8$'), answer: { expected: n(8) } },
            { id: 8, difficulty: 'medium', question: solve('$6-(2x-4)=x+1$'), solution: same('$10-2x=x+1\\ \\to\\ x=3$'), answer: { expected: n(3) } },
            { id: 9, difficulty: 'hard', question: solve('$\\frac{x-1}{2}+\\frac{x+1}{3}=\\frac{x}{6}+3$'), solution: same('$3x-3+2x+2=x+18\\ \\to\\ x=\\frac{19}{4}$'), answer: { expected: n(19, 4) } },
            { id: 10, difficulty: 'hard', question: say('Zein $k$ baliotarako da $x=6$ ekuazio honen ebazpena: $2x+k=x+3k$?', '¿Para qué valor de $k$ es $x=6$ solución de $2x+k=x+3k$?', 'لأي قيمة لـ $k$ يكون $x=6$ حلًّا لـ $2x+k=x+3k$؟', 'For which value of $k$ is $x=6$ a solution of $2x+k=x+3k$?'), solution: same('$12+k=6+3k\\ \\to\\ k=3$'), answer: { expected: n(3) } }
        ]
    },
    {
        id: 'quadratic',
        title: say('Bigarren mailako ekuazioak', 'Ecuaciones de segundo grado', 'معادلات الدرجة الثانية', 'Quadratic equations'),
        items: [
            { id: 11, difficulty: 'easy', question: positive('$x^{2}=36$'), solution: same('$x=6,\\ x=-6$'), answer: { expected: n(6) } },
            { id: 12, difficulty: 'easy', question: notZero('$x^{2}-9x=0$'), solution: same('$x(x-9)=0\\ \\to\\ x=0,\\ x=9$'), answer: { expected: n(9) } },
            { id: 13, difficulty: 'easy', question: positive('$4x^{2}-100=0$'), solution: same('$x^{2}=25\\ \\to\\ x=5,\\ x=-5$'), answer: { expected: n(5) } },
            { id: 14, difficulty: 'easy', question: say('Kalkulatu $x^{2}+3x-4=0$ ekuazioaren diskriminatzailea.', 'Calcula el discriminante de $x^{2}+3x-4=0$.', 'احسب مميّز $x^{2}+3x-4=0$.', 'Work out the discriminant of $x^{2}+3x-4=0$.'), solution: same('$3^{2}-4\\cdot 1\\cdot(-4)=25$'), answer: { expected: n(25) } },
            { id: 15, difficulty: 'medium', question: larger('$x^{2}-8x+15=0$'), solution: same('$x=\\frac{8\\pm 2}{2}\\ \\to\\ x=5,\\ x=3$'), answer: { expected: n(5) } },
            { id: 16, difficulty: 'medium', question: positive('$x^{2}+x-6=0$'), solution: same('$x=\\frac{-1\\pm 5}{2}\\ \\to\\ x=2,\\ x=-3$'), answer: { expected: n(2) } },
            { id: 17, difficulty: 'medium', question: larger('$2x^{2}-7x+3=0$'), solution: same('$\\Delta=49-24=25\\ \\to\\ x=\\frac{7\\pm 5}{4}\\ \\to\\ x=3,\\ x=\\frac{1}{2}$'), answer: { expected: n(3) } },
            { id: 18, difficulty: 'medium', question: howMany('$x^{2}-4x+4=0$'), solution: say('$\\Delta=16-16=0$: ebazpen 1, $x=2$.', '$\\Delta=16-16=0$: 1 solución, $x=2$.', '$\\Delta=16-16=0$: حلّ 1، $x=2$.', '$\\Delta=16-16=0$: 1 solution, $x=2$.'), answer: { expected: n(1) } },
            { id: 19, difficulty: 'hard', question: notZero('$(x-2)^{2}=x+4$'), solution: same('$x^{2}-4x+4=x+4\\ \\to\\ x^{2}-5x=0\\ \\to\\ x=0,\\ x=5$'), answer: { expected: n(5) } },
            { id: 20, difficulty: 'hard', question: say('Zein $c$ baliotarako du $x^{2}-10x+c=0$ ekuazioak erro bikoitza?', '¿Para qué valor de $c$ tiene $x^{2}-10x+c=0$ una raíz doble?', 'لأي قيمة لـ $c$ يكون لـ $x^{2}-10x+c=0$ جذر مضاعف؟', 'For which value of $c$ does $x^{2}-10x+c=0$ have a double root?'), solution: same('$100-4c=0\\ \\to\\ c=25$'), answer: { expected: n(25) } }
        ]
    },
    {
        id: 'systems',
        title: say('Sistemak', 'Sistemas', 'الأنظمة', 'Systems'),
        items: [
            { id: 21, difficulty: 'easy', question: say('$(3,y)$ bikotea $x+y=10$ ekuazioaren ebazpena da. Zenbat da $y$?', 'La pareja $(3,y)$ es solución de $x+y=10$. ¿Cuánto vale $y$?', 'الزوج $(3,y)$ حلّ لـ $x+y=10$. كم يساوي $y$؟', 'The pair $(3,y)$ is a solution of $x+y=10$. What is $y$?'), solution: same('$y=10-3=7$'), answer: { expected: n(7) } },
            { id: 22, difficulty: 'easy', question: say('$(x,2)$ bikotea $2x-y=8$ ekuazioaren ebazpena da. Zenbat da $x$?', 'La pareja $(x,2)$ es solución de $2x-y=8$. ¿Cuánto vale $x$?', 'الزوج $(x,2)$ حلّ لـ $2x-y=8$. كم يساوي $x$؟', 'The pair $(x,2)$ is a solution of $2x-y=8$. What is $x$?'), solution: same('$2x=10\\ \\to\\ x=5$'), answer: { expected: n(5) } },
            { id: 23, difficulty: 'easy', question: say('$y=2x$ eta $y=9-x$ zuzenak ebakitzen dira. Zenbat da ebakidura-puntuaren $y$?', 'Las rectas $y=2x$ e $y=9-x$ se cortan. ¿Cuánto vale la $y$ del punto de corte?', 'يتقاطع المستقيمان $y=2x$ و$y=9-x$. كم يساوي $y$ لنقطة التقاطع؟', 'The lines $y=2x$ and $y=9-x$ cross. What is the $y$ of the crossing point?'), solution: same('$2x=9-x\\ \\to\\ x=3,\\ y=6$'), answer: { expected: n(6) } },
            { id: 24, difficulty: 'easy', question: say('Zenbat da $2x+3y$ $(1,4)$ puntuan?', '¿Cuánto vale $2x+3y$ en el punto $(1,4)$?', 'كم يساوي $2x+3y$ عند النقطة $(1,4)$؟', 'What is $2x+3y$ at the point $(1,4)$?'), solution: same('$2\\cdot 1+3\\cdot 4=14$'), answer: { expected: n(14) } },
            { id: 25, difficulty: 'medium', question: say('$x+2y=8$ zuzenean, zenbat da $y$ $x=-2$ denean?', 'En la recta $x+2y=8$, ¿cuánto vale $y$ si $x=-2$?', 'على المستقيم $x+2y=8$، كم يساوي $y$ عندما $x=-2$؟', 'On the line $x+2y=8$, what is $y$ when $x=-2$?'), solution: same('$-2+2y=8\\ \\to\\ y=5$'), answer: { expected: n(5) } },
            { id: 26, difficulty: 'medium', question: say('$y=3x-4$ eta $y=-x+8$ zuzenak ebakitzen dira. Zenbat da ebakidura-puntuaren $x$?', 'Las rectas $y=3x-4$ e $y=-x+8$ se cortan. ¿Cuánto vale la $x$ del punto de corte?', 'يتقاطع المستقيمان $y=3x-4$ و$y=-x+8$. كم يساوي $x$ لنقطة التقاطع؟', 'The lines $y=3x-4$ and $y=-x+8$ cross. What is the $x$ of the crossing point?'), solution: same('$3x-4=-x+8\\ \\to\\ x=3,\\ y=5$'), answer: { expected: n(3) } },
            { id: 27, difficulty: 'medium', question: say('Zein $k$ baliotarako ditu infinitu ebazpen $2x-y=3$, $4x-2y=k$ sistemak?', '¿Para qué valor de $k$ tiene infinitas soluciones el sistema $2x-y=3$, $4x-2y=k$?', 'لأي قيمة لـ $k$ يكون للنظام $2x-y=3$، $4x-2y=k$ حلول لانهائية؟', 'For which value of $k$ does the system $2x-y=3$, $4x-2y=k$ have infinitely many solutions?'), solution: same('$k=2\\cdot 3=6$'), answer: { expected: n(6) } },
            { id: 28, difficulty: 'medium', question: say('Zein $a$ baliotarako ez du ebazpenik $x+ay=5$, $2x+6y=1$ sistemak?', '¿Para qué valor de $a$ no tiene solución el sistema $x+ay=5$, $2x+6y=1$?', 'لأي قيمة لـ $a$ لا حلّ للنظام $x+ay=5$، $2x+6y=1$؟', 'For which value of $a$ does the system $x+ay=5$, $2x+6y=1$ have no solution?'), solution: same('$\\frac{2}{1}=\\frac{6}{a}\\ \\to\\ a=3$'), answer: { expected: n(3) } },
            { id: 29, difficulty: 'hard', question: say('$ax+y=10$ ekuazioak $(2,4)$ ebazpena du. Zenbat da $a$?', 'La ecuación $ax+y=10$ tiene la solución $(2,4)$. ¿Cuánto vale $a$?', 'للمعادلة $ax+y=10$ الحل $(2,4)$. كم يساوي $a$؟', 'The equation $ax+y=10$ has the solution $(2,4)$. What is $a$?'), solution: same('$2a+4=10\\ \\to\\ a=3$'), answer: { expected: n(3) } },
            { id: 30, difficulty: 'hard', question: say('$x+y=7$ eta $x-y=1$ zuzenak $P$ puntuan ebakitzen dira. Zein da $P$ puntuaren bigarren koordenatua?', 'Las rectas $x+y=7$ y $x-y=1$ se cortan en $P$. ¿Cuál es la segunda coordenada de $P$?', 'يتقاطع المستقيمان $x+y=7$ و$x-y=1$ في $P$. ما الإحداثي الثاني لـ $P$؟', 'The lines $x+y=7$ and $x-y=1$ cross at $P$. What is the second coordinate of $P$?'), solution: same('$2x=8\\ \\to\\ x=4,\\ y=3$'), answer: { expected: n(3) } }
        ]
    },
    {
        id: 'methods',
        title: say('Ebazteko metodoak', 'Métodos de resolución', 'طرق الحل', 'Methods of solving'),
        items: [
            { id: 31, difficulty: 'easy', question: system('x=3y', 'x+y=16', 'y'), solution: same('$3y+y=16\\ \\to\\ y=4,\\ x=12$'), answer: { expected: n(4) } },
            { id: 32, difficulty: 'easy', question: system('y=x+2', 'x+y=10', 'x'), solution: same('$x+x+2=10\\ \\to\\ x=4,\\ y=6$'), answer: { expected: n(4) } },
            { id: 33, difficulty: 'easy', question: system('x+y=11', 'x-y=3', 'x'), solution: same('$2x=14\\ \\to\\ x=7,\\ y=4$'), answer: { expected: n(7) } },
            { id: 34, difficulty: 'easy', question: system('y=2x+3', 'y=5x', 'y'), solution: same('$5x=2x+3\\ \\to\\ x=1,\\ y=5$'), answer: { expected: n(5) } },
            { id: 35, difficulty: 'medium', question: system('2x+y=7', 'x-y=2', 'y'), solution: same('$3x=9\\ \\to\\ x=3,\\ y=1$'), answer: { expected: n(1) } },
            { id: 36, difficulty: 'medium', question: system('3x+2y=12', 'x+2y=8', 'y'), solution: same('$2x=4\\ \\to\\ x=2,\\ y=3$'), answer: { expected: n(3) } },
            { id: 37, difficulty: 'medium', question: system('x=2y-1', 'x=y+3', 'x'), solution: same('$2y-1=y+3\\ \\to\\ y=4,\\ x=7$'), answer: { expected: n(7) } },
            { id: 38, difficulty: 'medium', question: system('2x+5y=1', '3x-2y=11', 'x'), solution: same('$19y=-19\\ \\to\\ y=-1,\\ x=3$'), answer: { expected: n(3) } },
            { id: 39, difficulty: 'hard', question: system('5x-3y=1', '4x+2y=14', 'y'), solution: same('$22x=44\\ \\to\\ x=2\\quad 8+2y=14\\ \\to\\ y=3$'), answer: { expected: n(3) } },
            { id: 40, difficulty: 'hard', question: system('\\frac{x}{3}+y=5', 'x-\\frac{y}{2}=8', 'y'), solution: same('$x+3y=15,\\ 2x-y=16\\ \\to\\ x=9,\\ y=2$'), answer: { expected: n(2) } }
        ]
    },
    {
        id: 'problems',
        title: say('Problemak', 'Problemas', 'المسائل', 'Problems'),
        items: [
            { id: 41, difficulty: 'easy', question: say('Zenbaki baten hirukoitza ken 5 berdin 25. Zein da zenbakia?', 'El triple de un número menos 5 es 25. ¿Cuál es el número?', 'ثلاثة أمثال عدد ناقص 5 يساوي 25. ما العدد؟', 'Three times a number minus 5 is 25. What is the number?'), solution: same('$3x-5=25\\ \\to\\ x=10$'), answer: { expected: n(10) } },
            { id: 42, difficulty: 'easy', question: say('Bi zenbaki jarraien batura 51 da. Zein da txikiena?', 'Dos números consecutivos suman 51. ¿Cuál es el menor?', 'مجموع عددين متتاليين 51. ما الأصغر؟', 'Two consecutive numbers add up to 51. What is the smaller?'), solution: same('$x+x+1=51\\ \\to\\ x=25$'), answer: { expected: n(25) } },
            { id: 43, difficulty: 'easy', question: say('Anek Jonek baino hiru aldiz diru gehiago du, eta biek batera 48 euro. Zenbat du Jonek?', 'Ana tiene el triple de dinero que Jon y entre los dos tienen 48 €. ¿Cuánto tiene Jon?', 'مع آنا ثلاثة أمثال ما مع جون، ومعهما معًا 48 يورو. كم مع جون؟', 'Ana has three times as much money as Jon, and together they have 48 €. How much does Jon have?'), solution: same('$x+3x=48\\ \\to\\ x=12$'), answer: { expected: n(12) } },
            { id: 44, difficulty: 'easy', question: say('Laukizuzen baten perimetroa 30 da eta luzera zabaleraren bikoitza. Zenbat da zabalera?', 'El perímetro de un rectángulo es 30 y el largo es el doble del ancho. ¿Cuánto mide el ancho?', 'محيط مستطيل 30 وطوله ضعف عرضه. كم عرضه؟', 'A rectangle has perimeter 30 and its length is twice its width. How wide is it?'), solution: same('$2(x+2x)=30\\ \\to\\ x=5$'), answer: { expected: n(5) } },
            { id: 45, difficulty: 'medium', question: say('Zenbaki baten karratua haren boskoitza da. Zein da zenbakia (zero ez dena)?', 'El cuadrado de un número es igual a su quíntuple. ¿Cuál es el número (distinto de cero)?', 'مربع عدد يساوي خمسة أمثاله. ما العدد (غير الصفر)؟', 'The square of a number equals five times the number. What is the number (not zero)?'), solution: same('$x^{2}=5x\\ \\to\\ x(x-5)=0\\ \\to\\ x=5$'), answer: { expected: n(5) } },
            { id: 46, difficulty: 'medium', question: say('Alabak 8 urte ditu eta amak 38. Zenbat urte barru izango du amak alabaren hirukoitza?', 'Una hija tiene 8 años y su madre 38. ¿Dentro de cuántos años tendrá la madre el triple que la hija?', 'عمر ابنة 8 سنوات وعمر أمها 38. بعد كم سنة يصير عمر الأم ثلاثة أمثال عمر الابنة؟', 'A daughter is 8 and her mother is 38. In how many years will the mother be three times the daughter\'s age?'), solution: same('$38+t=3(8+t)\\ \\to\\ t=7$'), answer: { expected: n(7) } },
            { id: 47, difficulty: 'medium', question: say('Karratu baten aldea 3 handitzean, azalera 33 handitzen da. Zenbat zen aldea?', 'Al aumentar 3 el lado de un cuadrado, el área aumenta 33. ¿Cuánto medía el lado?', 'عندما يزيد ضلع مربع 3 تزيد مساحته 33. كم كان طول الضلع؟', 'When the side of a square grows by 3, its area grows by 33. How long was the side?'), solution: same('$(x+3)^{2}-x^{2}=33\\ \\to\\ 6x+9=33\\ \\to\\ x=4$'), answer: { expected: n(4) } },
            { id: 48, difficulty: 'medium', question: say('Euro bateko eta bi euroko 20 txanpon ditut, guztira 32 euro. Zenbat dira bi eurokoak?', 'Tengo 20 monedas de 1 € y de 2 €, en total 32 €. ¿Cuántas son de 2 €?', 'معي 20 قطعة نقدية من فئة 1 يورو و2 يورو، بمجموع 32 يورو. كم قطعة من فئة 2 يورو؟', 'I have 20 coins of 1 € and 2 €, 32 € in total. How many are 2 € coins?'), solution: same('$x+y=20,\\ x+2y=32\\ \\to\\ y=12,\\ x=8$'), answer: { expected: n(12) } },
            { id: 49, difficulty: 'hard', question: say('Bi zenbakiren batura 15 da eta biderkadura 56. Zein da handiena?', 'Dos números suman 15 y su producto es 56. ¿Cuál es el mayor?', 'مجموع عددين 15 وجداؤهما 56. ما الأكبر؟', 'Two numbers add up to 15 and their product is 56. What is the larger?'), solution: same('$x(15-x)=56\\ \\to\\ x^{2}-15x+56=0\\ \\to\\ x=8,\\ x=7$'), answer: { expected: n(8) } },
            { id: 50, difficulty: 'hard', question: say('3 heldu eta 2 haurren sarrerak: 31 euro. 2 heldu eta 3 haurrenak: 29 euro. Zenbat balio du heldu baten sarrerak?', '3 entradas de adulto y 2 de niño cuestan 31 €; 2 de adulto y 3 de niño, 29 €. ¿Cuánto cuesta la de adulto?', '3 تذاكر للكبار و2 للصغار بـ 31 يورو؛ و2 للكبار و3 للصغار بـ 29 يورو. كم ثمن تذكرة الكبير؟', '3 adult and 2 child tickets cost 31 €; 2 adult and 3 child tickets, 29 €. How much is an adult ticket?'), solution: same('$9a+6c=93,\\ 4a+6c=58\\ \\to\\ 5a=35\\ \\to\\ a=7,\\ c=5$'), answer: { expected: n(7) } }
        ]
    }
]

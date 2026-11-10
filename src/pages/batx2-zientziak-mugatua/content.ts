import { fraction } from '../../features/unit-v2/math/fraction.ts'
import type { ChallengeItem, DiagnosticQuestion, ExerciseSection, PracticeItem } from '../../features/unit-v2/types.ts'
import { same, say } from '../batx1-zientziak-funtzioak/text.ts'

/* ==========================================================================
   Integral mugatua · Batxilergoa 2 · Zientziak — diagnostic, guided
   practice, exercise bank and challenges, with the scope of unit 12 of
   Santillana and Anaya 2.º Bachillerato (all the exercises and numbers are
   our own). The closed items have a rational answer: an integral, an area,
   a sum, a mean value, a derivative F′(a), a parameter or the a of a volume
   aπ. Results with e, ln or π stay in the open items of the bank.
   ========================================================================== */

const n = (value: number) => fraction(value)
const f = (numerator: number, denominator: number) => fraction(numerator, denominator)

/** «Work out …» with one formula */
const work = (latex: string) => say(`Kalkulatu $${latex}$.`, `Calcula $${latex}$.`, `احسب $${latex}$.`, `Work out $${latex}$.`)
/** «Find the area between the curve and the x-axis on [a, b]» */
const axisArea = (curve: string, interval: string) => say(
    `Aurkitu $${curve}$ kurbaren eta X ardatzaren arteko azalera $${interval}$ tartean.`,
    `Halla el área entre $${curve}$ y el eje X en $${interval}$.`,
    `أوجد المساحة بين $${curve}$ ومحور X في $${interval}$.`,
    `Find the area between $${curve}$ and the x-axis on $${interval}$.`
)
/** «Find the area enclosed by two curves» */
const twoCurves = (first: string, second: string) => say(
    `Aurkitu $${first}$ eta $${second}$ kurbek itxitako azalera.`,
    `Halla el área encerrada entre $${first}$ e $${second}$.`,
    `أوجد المساحة المحصورة بين $${first}$ و$${second}$.`,
    `Find the area enclosed by $${first}$ and $${second}$.`
)
/** «If F(x) = …, work out F′(a)» */
const derive = (F: string, at: string) => say(
    `$F(x)=${F}$ bada, kalkulatu $F'(${at})$.`,
    `Si $F(x)=${F}$, calcula $F'(${at})$.`,
    `إذا كانت $F(x)=${F}$ فاحسب $F'(${at})$.`,
    `If $F(x)=${F}$, work out $F'(${at})$.`
)
/** «Turning y = … about the x-axis between a and b, V = aπ. Find a.» */
const volume = (curve: string, from: string, to: string) => say(
    `$${curve}$ kurba X ardatzaren inguruan $${from}$ eta $${to}$ artean biratzean, $V=a\\pi$. Aurkitu $a$.`,
    `Al girar $${curve}$ alrededor del eje X entre $${from}$ y $${to}$, $V=a\\pi$. Halla $a$.`,
    `عند دوران $${curve}$ حول محور X بين $${from}$ و$${to}$ يكون $V=a\\pi$. أوجد $a$.`,
    `Turning $${curve}$ about the x-axis between $${from}$ and $${to}$ gives $V=a\\pi$. Find $a$.`
)

export const bach2DefiniteDiagnostic: DiagnosticQuestion[] = [
    {
        id: 127001,
        prompt: say('Zenbat da $\\int_0^2 3x^2\\,dx$?', '¿Cuánto vale $\\int_0^2 3x^2\\,dx$?', 'كم يساوي $\\int_0^2 3x^2\\,dx$؟', 'What is $\\int_0^2 3x^2\\,dx$?'),
        options: [same('$8$'), same('$12$'), same('$6$')],
        correctIndex: 0,
        explanation: same('$\\left[x^3\\right]_0^2=8-0=8$'),
        topic: 'barrow-review'
    },
    {
        id: 127002,
        prompt: say('Non mozten du $y=x^2-1$ kurbak X ardatza?', '¿Dónde corta $y=x^2-1$ al eje X?', 'أين يقطع $y=x^2-1$ محور X؟', 'Where does $y=x^2-1$ cross the x-axis?'),
        options: [same('$x=1$'), same('$x=\\pm 1$'), same('$x=-1$')],
        correctIndex: 1,
        explanation: say('$x^2=1$ ekuazioak bi soluzio ditu: $x=1$ eta $x=-1$.', '$x^2=1$ tiene dos soluciones: $x=1$ y $x=-1$.', 'للمعادلة $x^2=1$ حلّان: $x=1$ و$x=-1$.', '$x^2=1$ has two solutions: $x=1$ and $x=-1$.'),
        topic: 'areas-review'
    },
    {
        id: 127003,
        prompt: say('$[1,\\,3]$ tartean, zein da $f(x)=x^2$ funtzioaren minimoa?', 'En $[1,\\,3]$, ¿cuál es el mínimo de $f(x)=x^2$?', 'في $[1,\\,3]$، ما أصغر قيمة لـ $f(x)=x^2$؟', 'On $[1,\\,3]$, what is the minimum of $f(x)=x^2$?'),
        options: [same('$9$'), same('$1$'), same('$0$')],
        correctIndex: 1,
        explanation: say('$f$ gorakorra da tarte horretan: minimoa $f(1)=1$ da. 0 balioa tartetik kanpo dago.', '$f$ crece en ese intervalo: el mínimo es $f(1)=1$. El 0 queda fuera del intervalo.', '$f$ متزايدة في هذه الفترة: أصغر قيمة $f(1)=1$. والقيمة 0 خارج الفترة.', '$f$ increases on that interval: the minimum is $f(1)=1$. 0 is outside the interval.'),
        topic: 'lower-upper'
    },
    {
        id: 127004,
        prompt: say('Zenbat da $1+2+\\dots+10$?', '¿Cuánto vale $1+2+\\dots+10$?', 'كم يساوي $1+2+\\dots+10$؟', 'What is $1+2+\\dots+10$?'),
        options: [same('$50$'), same('$100$'), same('$55$')],
        correctIndex: 2,
        explanation: same('$\\frac{10\\cdot 11}{2}=55$'),
        topic: 'limit-sums'
    },
    {
        id: 127005,
        prompt: say('Zein da $F(x)=x^3+x$ funtzioaren deribatua?', '¿Cuál es la derivada de $F(x)=x^3+x$?', 'ما مشتقة $F(x)=x^3+x$؟', 'What is the derivative of $F(x)=x^3+x$?'),
        options: [same('$3x^2+1$'), same('$3x^2$'), same('$\\frac{x^4}{4}+\\frac{x^2}{2}$')],
        correctIndex: 0,
        explanation: say('$x^3$ funtzioaren deribatua $3x^2$ da, eta $x$ funtzioarena 1. Hirugarrena jatorrizko bat da.', 'La derivada de $x^3$ es $3x^2$ y la de $x$, 1. La tercera es una primitiva.', 'مشتقة $x^3$ هي $3x^2$ ومشتقة $x$ هي 1. والثالثة دالة أصلية.', 'The derivative of $x^3$ is $3x^2$ and that of $x$ is 1. The third is an antiderivative.'),
        topic: 'area-function'
    },
    {
        id: 127006,
        prompt: say('Zein da $(x^2+1)^3$ funtzioaren deribatua?', '¿Cuál es la derivada de $(x^2+1)^3$?', 'ما مشتقة $(x^2+1)^3$؟', 'What is the derivative of $(x^2+1)^3$?'),
        options: [same('$3(x^2+1)^2$'), same('$6x(x^2+1)$'), same('$6x(x^2+1)^2$')],
        correctIndex: 2,
        explanation: say('Katearen erregela: $3(x^2+1)^2\\cdot 2x$. Lehenari barrukoaren deribatua falta zaio.', 'Regla de la cadena: $3(x^2+1)^2\\cdot 2x$. A la primera le falta la derivada de dentro.', 'قاعدة السلسلة: $3(x^2+1)^2\\cdot 2x$. والأولى تنقصها مشتقة ما في الداخل.', 'The chain rule: $3(x^2+1)^2\\cdot 2x$. The first is missing the derivative of the inside.'),
        topic: 'upper-limit'
    },
    {
        id: 127007,
        prompt: say('$t=x^2$ bada, zenbat da $t$ $x=3$ denean?', 'Si $t=x^2$, ¿cuánto vale $t$ cuando $x=3$?', 'إذا كان $t=x^2$ فكم يساوي $t$ عندما $x=3$؟', 'If $t=x^2$, what is $t$ when $x=3$?'),
        options: [same('$6$'), same('$9$'), same('$3$')],
        correctIndex: 1,
        explanation: same('$t=3^2=9$'),
        topic: 'definite-change'
    },
    {
        id: 127008,
        prompt: say('Zenbat da $|2-5|$?', '¿Cuánto vale $|2-5|$?', 'كم يساوي $|2-5|$؟', 'What is $|2-5|$?'),
        options: [same('$-3$'), same('$7$'), same('$3$')],
        correctIndex: 2,
        explanation: say('$2-5=-3$, eta balio absolutuak zeinua kentzen du: 3.', '$2-5=-3$, y el valor absoluto quita el signo: 3.', '$2-5=-3$، والقيمة المطلقة تزيل الإشارة: 3.', '$2-5=-3$, and the absolute value removes the sign: 3.'),
        topic: 'piecewise'
    }
]

export const bach2DefinitePractice: PracticeItem[] = [
    /* ---------- Review from 1.º ---------- */
    { id: 1, stage: 'review', prompt: work('\\int_1^2(4x^3-1)\\,dx'), expected: n(14), hint: say('Jatorrizko bat: $x^4-x$.', 'Una primitiva: $x^4-x$.', 'دالة أصلية: $x^4-x$.', 'An antiderivative: $x^4-x$.'), explanation: same('$(16-2)-(1-1)=14$') },
    { id: 2, stage: 'review', prompt: say('$\\int_0^4 f(x)\\,dx=10$ eta $\\int_0^1 f(x)\\,dx=3$ badira, kalkulatu $\\int_1^4 f(x)\\,dx$.', 'Si $\\int_0^4 f(x)\\,dx=10$ y $\\int_0^1 f(x)\\,dx=3$, calcula $\\int_1^4 f(x)\\,dx$.', 'إذا كان $\\int_0^4 f(x)\\,dx=10$ و$\\int_0^1 f(x)\\,dx=3$ فاحسب $\\int_1^4 f(x)\\,dx$.', 'If $\\int_0^4 f(x)\\,dx=10$ and $\\int_0^1 f(x)\\,dx=3$, work out $\\int_1^4 f(x)\\,dx$.'), expected: n(7), hint: say('Zatitu $[0,\\,4]$ tartea 1 puntuan.', 'Parte $[0,\\,4]$ en 1.', 'قسّم $[0,\\,4]$ عند 1.', 'Split $[0,\\,4]$ at 1.'), explanation: same('$10-3=7$') },
    { id: 3, stage: 'review', prompt: axisArea('y=x^2-1', '[0,\\,2]'), expected: n(2), hint: say('Ardatza $x=1$ puntuan mozten du.', 'Corta el eje en $x=1$.', 'يقطع المحور عند $x=1$.', 'It crosses the axis at $x=1$.'), explanation: say('$\\int_0^1(x^2-1)\\,dx=-\\frac{2}{3}$ eta $\\int_1^2(x^2-1)\\,dx=\\frac{4}{3}$; azalera: $\\frac{2}{3}+\\frac{4}{3}=2$.', '$\\int_0^1(x^2-1)\\,dx=-\\frac{2}{3}$ y $\\int_1^2(x^2-1)\\,dx=\\frac{4}{3}$; área: $\\frac{2}{3}+\\frac{4}{3}=2$.', '$\\int_0^1(x^2-1)\\,dx=-\\frac{2}{3}$ و$\\int_1^2(x^2-1)\\,dx=\\frac{4}{3}$؛ المساحة: $\\frac{2}{3}+\\frac{4}{3}=2$.', '$\\int_0^1(x^2-1)\\,dx=-\\frac{2}{3}$ and $\\int_1^2(x^2-1)\\,dx=\\frac{4}{3}$; area: $\\frac{2}{3}+\\frac{4}{3}=2$.') },
    { id: 4, stage: 'review', prompt: twoCurves('y=x^2', 'y=2x'), expected: f(4, 3), hint: say('Ebaki-puntuak: $x^2=2x$, 0 eta 2 puntuetan; goian $2x$ dago.', 'Cortes: $x^2=2x$ en 0 y 2; arriba va $2x$.', 'التقاطع: $x^2=2x$ عند 0 و2؛ و$2x$ في الأعلى.', 'Crossings: $x^2=2x$ at 0 and 2; $2x$ is on top.'), explanation: same('$\\int_0^2(2x-x^2)\\,dx=4-\\frac{8}{3}=\\frac{4}{3}$') },

    /* ---------- Sums and mean value ---------- */
    { id: 5, stage: 'sums', prompt: say('$\\{0,\\,1,\\,2,\\,3\\}$ zatiketarekin, aurkitu $f(x)=x$ funtzioaren behe-batura $[0,\\,3]$ tartean.', 'Con la partición $\\{0,\\,1,\\,2,\\,3\\}$, halla la suma inferior de $f(x)=x$ en $[0,\\,3]$.', 'باستعمال التجزئة $\\{0,\\,1,\\,2,\\,3\\}$ أوجد المجموع الأدنى لـ $f(x)=x$ في $[0,\\,3]$.', 'With the partition $\\{0,\\,1,\\,2,\\,3\\}$, find the lower sum of $f(x)=x$ on $[0,\\,3]$.'), expected: n(3), hint: say('$f$ gorakorra da: zati bakoitzean, ezkerreko altuera.', '$f$ crece: en cada tramo, la altura de la izquierda.', '$f$ متزايدة: في كل جزء ارتفاع اليسار.', '$f$ increases: on each piece, the height on the left.'), explanation: same('$s=1\\cdot 0+1\\cdot 1+1\\cdot 2=3$') },
    { id: 6, stage: 'sums', prompt: say('$\\{0,\\,1,\\,2,\\,3\\}$ zatiketarekin, aurkitu $f(x)=x^2$ funtzioaren goi-batura $[0,\\,3]$ tartean.', 'Con $\\{0,\\,1,\\,2,\\,3\\}$, halla la suma superior de $f(x)=x^2$ en $[0,\\,3]$.', 'باستعمال $\\{0,\\,1,\\,2,\\,3\\}$ أوجد المجموع الأعلى لـ $f(x)=x^2$ في $[0,\\,3]$.', 'With $\\{0,\\,1,\\,2,\\,3\\}$, find the upper sum of $f(x)=x^2$ on $[0,\\,3]$.'), expected: n(14), hint: say('Zati bakoitzean, eskuineko altuera: 1, 4 eta 9.', 'En cada tramo, la altura de la derecha: 1, 4 y 9.', 'في كل جزء ارتفاع اليمين: 1 و4 و9.', 'On each piece, the height on the right: 1, 4 and 9.'), explanation: same('$S=1+4+9=14$') },
    { id: 7, stage: 'sums', prompt: say('$\\int_0^2 x^3\\,dx$ integralerako, $S_n=\\frac{4(n+1)^2}{n^2}$. Zein zenbakitara hurbiltzen da?', 'Para $\\int_0^2 x^3\\,dx$, $S_n=\\frac{4(n+1)^2}{n^2}$. ¿A qué tiende?', 'لـ $\\int_0^2 x^3\\,dx$ لدينا $S_n=\\frac{4(n+1)^2}{n^2}$. إلى أي عدد يقترب؟', 'For $\\int_0^2 x^3\\,dx$, $S_n=\\frac{4(n+1)^2}{n^2}$. What does it tend to?'), expected: n(4), hint: say('Zatitu goikoa eta behekoa $n^2$ adierazpenaz.', 'Divide arriba y abajo entre $n^2$.', 'اقسم البسط والمقام على $n^2$.', 'Divide top and bottom by $n^2$.'), explanation: same('$4\\left(1+\\frac{1}{n}\\right)^2\\to 4$') },
    { id: 8, stage: 'sums', prompt: say('Aurkitu $f(x)=6x^2$ funtzioaren batez besteko balioa $[0,\\,2]$ tartean.', 'Halla el valor medio de $f(x)=6x^2$ en $[0,\\,2]$.', 'أوجد القيمة المتوسطة لـ $f(x)=6x^2$ في $[0,\\,2]$.', 'Find the mean value of $f(x)=6x^2$ on $[0,\\,2]$.'), expected: n(8), hint: say('Kalkulatu integrala, eta zatitu $2-0$ luzeraz.', 'Calcula la integral y divide entre $2-0$.', 'احسب التكامل واقسم على $2-0$.', 'Work out the integral and divide by $2-0$.'), explanation: same('$\\int_0^2 6x^2\\,dx=16\\qquad\\frac{16}{2}=8$') },

    /* ---------- The fundamental theorem ---------- */
    { id: 9, stage: 'fundamental', prompt: derive('\\int_0^x(t^2+5)\\,dt', '2'), expected: n(9), hint: say('$F\'(x)$ barruko funtzioa da, $x$ jarrita.', '$F\'(x)$ es la función de dentro, con $x$.', '$F\'(x)$ هي الدالة التي في الداخل مع $x$.', '$F\'(x)$ is the function inside, with $x$.'), explanation: same('$F\'(2)=2^2+5=9$') },
    { id: 10, stage: 'fundamental', prompt: derive('\\int_1^{x^2}\\frac{dt}{t+1}', '1'), expected: n(1), hint: same('$F\'(x)=\\frac{1}{x^2+1}\\cdot 2x$'), explanation: same('$F\'(1)=\\frac{1}{1+1}\\cdot 2=1$') },
    { id: 11, stage: 'fundamental', prompt: derive('\\int_0^{3x}t\\,dt', '2'), expected: n(18), hint: say('$t$ letraren ordez $3x$, eta biderkatu 3 zenbakiaz.', 'Pon $3x$ en lugar de $t$ y multiplica por 3.', 'ضع $3x$ بدل $t$ واضرب في 3.', 'Put $3x$ in place of $t$ and multiply by 3.'), explanation: same('$F\'(2)=(3\\cdot 2)\\cdot 3=18$') },
    { id: 12, stage: 'fundamental', prompt: say('Kalkulatu $\\int_2^3\\frac{dx}{(x-1)^2}$; $x=1$ asintota tartetik kanpo dago.', 'Calcula $\\int_2^3\\frac{dx}{(x-1)^2}$; la asíntota $x=1$ queda fuera.', 'احسب $\\int_2^3\\frac{dx}{(x-1)^2}$؛ المقارب $x=1$ خارج الفترة.', 'Work out $\\int_2^3\\frac{dx}{(x-1)^2}$; the asymptote $x=1$ is outside.'), expected: f(1, 2), hint: say('Jatorrizko bat: $-\\frac{1}{x-1}$.', 'Una primitiva: $-\\frac{1}{x-1}$.', 'دالة أصلية: $-\\frac{1}{x-1}$.', 'An antiderivative: $-\\frac{1}{x-1}$.'), explanation: same('$-\\frac{1}{2}+1=\\frac{1}{2}$') },

    /* ---------- Working out definite integrals ---------- */
    { id: 13, stage: 'techniques', prompt: say('Kalkulatu $\\int_0^1 2x(x^2+1)^3\\,dx$, $t=x^2+1$ hartuta.', 'Calcula $\\int_0^1 2x(x^2+1)^3\\,dx$ con $t=x^2+1$.', 'احسب $\\int_0^1 2x(x^2+1)^3\\,dx$ مع $t=x^2+1$.', 'Work out $\\int_0^1 2x(x^2+1)^3\\,dx$ with $t=x^2+1$.'), expected: f(15, 4), hint: say('Muga berriak: $t=1$ eta $t=2$.', 'Límites nuevos: $t=1$ y $t=2$.', 'الحدود الجديدة: $t=1$ و$t=2$.', 'New limits: $t=1$ and $t=2$.'), explanation: same('$\\int_1^2 t^3\\,dt=\\frac{16-1}{4}=\\frac{15}{4}$') },
    { id: 14, stage: 'techniques', prompt: work('\\int_0^3\\frac{x}{\\sqrt{x^2+16}}\\,dx'), expected: n(1), hint: say('$t=x^2+16$: mugak 16 eta 25 dira.', '$t=x^2+16$: los límites son 16 y 25.', '$t=x^2+16$: الحدود 16 و25.', '$t=x^2+16$: the limits are 16 and 25.'), explanation: same('$\\left[\\sqrt{t}\\right]_{16}^{25}=5-4=1$') },
    { id: 15, stage: 'techniques', prompt: say('Kalkulatu $\\int_1^e\\ln x\\,dx$, zatika.', 'Calcula $\\int_1^e\\ln x\\,dx$ por partes.', 'احسب $\\int_1^e\\ln x\\,dx$ بالتجزئة.', 'Work out $\\int_1^e\\ln x\\,dx$ by parts.'), expected: n(1), hint: same('$u=\\ln x\\qquad dv=dx$'), explanation: same('$\\begin{aligned}&\\left[x\\ln x\\right]_1^e-\\int_1^e dx\\\\ &=e-(e-1)=1\\end{aligned}$') },
    { id: 16, stage: 'techniques', prompt: work('\\int_0^4|x-1|\\,dx'), expected: n(5), hint: say('Zatitu $x=1$ puntuan.', 'Parte en $x=1$.', 'قسّم عند $x=1$.', 'Split at $x=1$.'), explanation: same('$\\begin{aligned}&\\int_0^1(1-x)\\,dx+\\int_1^4(x-1)\\,dx\\\\ &=\\frac{1}{2}+\\frac{9}{2}=5\\end{aligned}$') },

    /* ---------- Regions and problems ---------- */
    { id: 17, stage: 'problems', prompt: say('Aurkitu lehen koadranteko barrutiaren azalera, $y=x^2$ kurbak, $y=6-x$ zuzenak eta X ardatzak mugatua.', 'Halla el área del recinto del primer cuadrante limitado por $y=x^2$, $y=6-x$ y el eje X.', 'أوجد مساحة المنطقة في الربع الأول التي يحدّها $y=x^2$ و$y=6-x$ ومحور X.', 'Find the area of the region in the first quadrant bounded by $y=x^2$, $y=6-x$ and the x-axis.'), expected: f(32, 3), hint: say('Ebaki-puntuak: $x=2$ eta $x=6$. Bi zerrenda.', 'Cortes: $x=2$ y $x=6$. Dos tiras.', 'نقاط التقاطع: $x=2$ و$x=6$. شريحتان.', 'Crossings: $x=2$ and $x=6$. Two strips.'), explanation: same('$\\begin{aligned}&\\int_0^2 x^2\\,dx+\\int_2^6(6-x)\\,dx\\\\ &=\\frac{8}{3}+8=\\frac{32}{3}\\end{aligned}$') },
    { id: 18, stage: 'problems', prompt: say('Aurkitu $b>0$, $\\int_0^b 2x\\,dx=25$ izan dadin.', 'Halla $b>0$ para que $\\int_0^b 2x\\,dx=25$.', 'أوجد $b>0$ بحيث $\\int_0^b 2x\\,dx=25$.', 'Find $b>0$ so that $\\int_0^b 2x\\,dx=25$.'), expected: n(5), hint: same('$\\int_0^b 2x\\,dx=b^2$'), explanation: same('$b^2=25\\to b=5$') },
    { id: 19, stage: 'problems', prompt: say('$F(x)=\\int_0^x(t^2-9)\\,dt$. Zein $x$ puntutan du $F$ funtzioak minimo erlatiboa?', '$F(x)=\\int_0^x(t^2-9)\\,dt$. ¿En qué $x$ tiene $F$ su mínimo relativo?', '$F(x)=\\int_0^x(t^2-9)\\,dt$. عند أي $x$ تكون لـ $F$ قيمتها الصغرى المحلية؟', '$F(x)=\\int_0^x(t^2-9)\\,dt$. At which $x$ does $F$ have its local minimum?'), expected: n(3), hint: same('$F\'(x)=x^2-9$'), explanation: say('$F\'$ deribatua $-$ izatetik $+$ izatera pasatzen da $x=3$ puntuan.', '$F\'$ pasa de $-$ a $+$ en $x=3$.', 'تنتقل $F\'$ من $-$ إلى $+$ عند $x=3$.', '$F\'$ goes from $-$ to $+$ at $x=3$.') },
    { id: 20, stage: 'problems', prompt: volume('y=\\sqrt{x}', '0', '2'), expected: n(2), hint: same('$V=\\pi\\int_0^2(\\sqrt{x})^2\\,dx$'), explanation: same('$\\pi\\int_0^2 x\\,dx=\\pi\\cdot 2\\to a=2$') }
]

export const bach2DefiniteChallenges: ChallengeItem[] = [
    { id: 101, stage: 'review', points: 10, context: 'starter', prompt: work('\\int_{-1}^{2}(x^2+1)\\,dx'), expected: n(6), hint: say('Jatorrizko bat: $\\frac{x^3}{3}+x$.', 'Una primitiva: $\\frac{x^3}{3}+x$.', 'دالة أصلية: $\\frac{x^3}{3}+x$.', 'An antiderivative: $\\frac{x^3}{3}+x$.'), explanation: same('$\\frac{14}{3}-\\left(-\\frac{4}{3}\\right)=6$') },
    { id: 102, stage: 'review', points: 20, context: 'advanced', prompt: axisArea('y=x^3', '[-1,\\,2]'), expected: f(17, 4), hint: say('Ardatzaren azpian $(-1,\\,0)$ tartean.', 'Bajo el eje en $(-1,\\,0)$.', 'تحت المحور في $(-1,\\,0)$.', 'Below the axis on $(-1,\\,0)$.'), explanation: same('$\\frac{1}{4}+4=\\frac{17}{4}$') },
    { id: 103, stage: 'review', points: 30, context: 'master', prompt: twoCurves('y=x^2-2x', 'y=x'), expected: f(9, 2), hint: say('Ebaki-puntuak 0 eta 3 dira, eta goian $y=x$ dago.', 'Cortes en 0 y 3; arriba va $y=x$.', 'التقاطع عند 0 و3، و$y=x$ في الأعلى.', 'Crossings at 0 and 3; $y=x$ is on top.'), explanation: same('$\\int_0^3(3x-x^2)\\,dx=\\frac{27}{2}-9=\\frac{9}{2}$') },
    { id: 104, stage: 'sums', points: 10, context: 'starter', prompt: say('$\\{0,\\,2,\\,4\\}$ zatiketarekin, aurkitu $S$, $f(x)=x^2$ funtzioarentzat $[0,\\,4]$ tartean.', 'Con $\\{0,\\,2,\\,4\\}$, halla $S$ para $f(x)=x^2$ en $[0,\\,4]$.', 'باستعمال $\\{0,\\,2,\\,4\\}$ أوجد $S$ لـ $f(x)=x^2$ في $[0,\\,4]$.', 'With $\\{0,\\,2,\\,4\\}$, find $S$ for $f(x)=x^2$ on $[0,\\,4]$.'), expected: n(40), hint: say('Oinarria 2 da, eta altuerak $f(2)$ eta $f(4)$.', 'Base 2 y alturas $f(2)$ y $f(4)$.', 'القاعدة 2 والارتفاعان $f(2)$ و$f(4)$.', 'Base 2 and heights $f(2)$ and $f(4)$.'), explanation: same('$S=2\\cdot 4+2\\cdot 16=40$') },
    { id: 105, stage: 'sums', points: 20, context: 'advanced', prompt: say('$f(x)=4-x^2$ funtzioarentzat $[0,\\,2]$ tartean, $\\{0,\\,1,\\,2\\}$ zatiketarekin, aurkitu $S-s$.', 'Para $f(x)=4-x^2$ en $[0,\\,2]$ con $\\{0,\\,1,\\,2\\}$, halla $S-s$.', 'لـ $f(x)=4-x^2$ في $[0,\\,2]$ مع $\\{0,\\,1,\\,2\\}$ أوجد $S-s$.', 'For $f(x)=4-x^2$ on $[0,\\,2]$ with $\\{0,\\,1,\\,2\\}$, find $S-s$.'), expected: n(4), hint: say('$f$ beherakorra da: maximoa ezkerrean dago.', '$f$ decrece: el máximo está a la izquierda.', '$f$ متناقصة: أكبر قيمة عند اليسار.', '$f$ decreases: the maximum is on the left.'), explanation: same('$\\begin{aligned}&S=4+3=7\\\\ &s=3+0=3\\\\ &S-s=7-3=4\\end{aligned}$') },
    { id: 106, stage: 'sums', points: 30, context: 'master', prompt: say('Aurkitu batez besteko balioaren teoremaren $c$, $f(x)=\\frac{1}{x^2}$ funtzioarentzat $[1,\\,4]$ tartean.', 'Halla el $c$ del teorema del valor medio para $f(x)=\\frac{1}{x^2}$ en $[1,\\,4]$.', 'أوجد $c$ مبرهنة القيمة المتوسطة لـ $f(x)=\\frac{1}{x^2}$ في $[1,\\,4]$.', 'Find the $c$ of the mean value theorem for $f(x)=\\frac{1}{x^2}$ on $[1,\\,4]$.'), expected: n(2), hint: same('$\\int_1^4\\frac{dx}{x^2}=1-\\frac{1}{4}$'), explanation: same('$\\frac{3}{4}\\div 3=\\frac{1}{4}\\to\\frac{1}{c^2}=\\frac{1}{4}\\to c=2$') },
    { id: 107, stage: 'fundamental', points: 10, context: 'starter', prompt: derive('\\int_2^x\\sqrt{t^2+5}\\,dt', '2'), expected: n(3), hint: say('Oinarrizko teorema: $F\'(x)=\\sqrt{x^2+5}$.', 'Teorema fundamental: $F\'(x)=\\sqrt{x^2+5}$.', 'المبرهنة الأساسية: $F\'(x)=\\sqrt{x^2+5}$.', 'Fundamental theorem: $F\'(x)=\\sqrt{x^2+5}$.'), explanation: same('$F\'(2)=\\sqrt{4+5}=3$') },
    { id: 108, stage: 'fundamental', points: 20, context: 'advanced', prompt: derive('\\int_0^{x^3}\\frac{dt}{1+t}', '1'), expected: f(3, 2), hint: same('$F\'(x)=\\frac{1}{1+x^3}\\cdot 3x^2$'), explanation: same('$F\'(1)=\\frac{1}{1+1}\\cdot 3=\\frac{3}{2}$') },
    { id: 109, stage: 'fundamental', points: 30, context: 'master', prompt: derive('\\int_x^{2x}t^2\\,dt', '1'), expected: n(7), hint: same('$F\'(x)=(2x)^2\\cdot 2-x^2\\cdot 1$'), explanation: same('$F\'(1)=4\\cdot 2-1=7$') },
    { id: 110, stage: 'techniques', points: 10, context: 'starter', prompt: work('\\int_0^2\\frac{x}{(x^2+1)^2}\\,dx'), expected: f(2, 5), hint: say('$t=x^2+1$: mugak 1 eta 5 dira.', '$t=x^2+1$: los límites son 1 y 5.', '$t=x^2+1$: الحدود 1 و5.', '$t=x^2+1$: the limits are 1 and 5.'), explanation: same('$\\frac{1}{2}\\left(1-\\frac{1}{5}\\right)=\\frac{2}{5}$') },
    { id: 111, stage: 'techniques', points: 20, context: 'advanced', prompt: say('$\\int_0^1 x^2e^{x^3}\\,dx=a(e-1)$. Aurkitu $a$.', '$\\int_0^1 x^2e^{x^3}\\,dx=a(e-1)$. Halla $a$.', '$\\int_0^1 x^2e^{x^3}\\,dx=a(e-1)$. أوجد $a$.', '$\\int_0^1 x^2e^{x^3}\\,dx=a(e-1)$. Find $a$.'), expected: f(1, 3), hint: say('$t=x^3$: mugak 0 eta 1 dira.', '$t=x^3$: los límites son 0 y 1.', '$t=x^3$: الحدود 0 و1.', '$t=x^3$: the limits are 0 and 1.'), explanation: same('$\\frac{1}{3}\\int_0^1 e^t\\,dt\\to a=\\frac{1}{3}$') },
    { id: 112, stage: 'techniques', points: 30, context: 'master', prompt: work('\\int_0^{\\pi}x\\cos x\\,dx'), expected: n(-2), hint: same('$u=x\\qquad dv=\\cos x\\,dx$'), explanation: same('$\\begin{aligned}&\\left[x\\sin x\\right]_0^{\\pi}-\\int_0^{\\pi}\\sin x\\,dx\\\\ &=0-2=-2\\end{aligned}$') },
    { id: 113, stage: 'problems', points: 10, context: 'starter', prompt: say('Aurkitu $k>0$, $y=kx^2$ kurbaren eta X ardatzaren arteko azalera $[0,\\,3]$ tartean 18 izan dadin.', 'Halla $k>0$ para que el área entre $y=kx^2$ y el eje X en $[0,\\,3]$ valga 18.', 'أوجد $k>0$ لتكون المساحة بين $y=kx^2$ ومحور X في $[0,\\,3]$ مساوية لـ 18.', 'Find $k>0$ so that the area between $y=kx^2$ and the x-axis on $[0,\\,3]$ is 18.'), expected: n(2), hint: same('$\\int_0^3 kx^2\\,dx=9k$'), explanation: same('$9k=18\\to k=2$') },
    { id: 114, stage: 'problems', points: 20, context: 'advanced', prompt: say('Aurkitu lehen koadranteko barrutiaren azalera, $y=\\sqrt{x}$ kurbak, $y=2-x$ zuzenak eta X ardatzak mugatua.', 'Halla el área del recinto del primer cuadrante limitado por $y=\\sqrt{x}$, $y=2-x$ y el eje X.', 'أوجد مساحة المنطقة في الربع الأول التي يحدّها $y=\\sqrt{x}$ و$y=2-x$ ومحور X.', 'Find the area of the region in the first quadrant bounded by $y=\\sqrt{x}$, $y=2-x$ and the x-axis.'), expected: f(7, 6), hint: say('Bi zerrenda: 0 eta 1 artean, eta 1 eta 2 artean.', 'Dos tiras: de 0 a 1 y de 1 a 2.', 'شريحتان: من 0 إلى 1 ومن 1 إلى 2.', 'Two strips: from 0 to 1 and from 1 to 2.'), explanation: same('$\\begin{aligned}&\\int_0^1\\sqrt{x}\\,dx+\\int_1^2(2-x)\\,dx\\\\ &=\\frac{2}{3}+\\frac{1}{2}=\\frac{7}{6}\\end{aligned}$') },
    { id: 115, stage: 'problems', points: 30, context: 'master', prompt: say('$y=\\sqrt{4-x^2}$ kurba X ardatzaren inguruan $-2$ eta 2 artean biratzean, esfera bat ateratzen da: $V=a\\pi$. Aurkitu $a$.', 'Al girar $y=\\sqrt{4-x^2}$ alrededor del eje X entre $-2$ y 2 sale una esfera: $V=a\\pi$. Halla $a$.', 'عند دوران $y=\\sqrt{4-x^2}$ حول محور X بين $-2$ و2 نحصل على كرة: $V=a\\pi$. أوجد $a$.', 'Turning $y=\\sqrt{4-x^2}$ about the x-axis between $-2$ and 2 gives a sphere: $V=a\\pi$. Find $a$.'), expected: f(32, 3), hint: same('$V=\\pi\\int_{-2}^{2}(4-x^2)\\,dx$'), explanation: same('$16-\\frac{16}{3}=\\frac{32}{3}$') }
]

export const bach2DefiniteExerciseBank: ExerciseSection[] = [
    {
        id: 'review',
        title: say('Barrow eta azalerak', 'Barrow y áreas', 'بارو والمساحات', 'Barrow and areas'),
        items: [
            { id: 1, difficulty: 'easy', question: work('\\int_0^3(2x+1)\\,dx'), solution: same('$\\left[x^2+x\\right]_0^3=9+3=12$'), answer: { expected: n(12) } },
            { id: 2, difficulty: 'easy', question: work('\\int_1^4\\frac{dx}{\\sqrt{x}}'), solution: same('$\\left[2\\sqrt{x}\\right]_1^4=4-2=2$'), answer: { expected: n(2) } },
            { id: 3, difficulty: 'easy', question: work('\\int_0^{\\pi}\\sin x\\,dx'), solution: same('$\\left[-\\cos x\\right]_0^{\\pi}=1+1=2$') },
            { id: 4, difficulty: 'medium', question: work('\\int_0^1 e^{2x}\\,dx'), solution: same('$\\left[\\frac{e^{2x}}{2}\\right]_0^1=\\frac{e^2-1}{2}$') },
            { id: 5, difficulty: 'medium', question: say('$\\int_1^5 f(x)\\,dx=8$ eta $\\int_3^5 f(x)\\,dx=5$ badira, kalkulatu $\\int_1^3 f(x)\\,dx$.', 'Si $\\int_1^5 f(x)\\,dx=8$ y $\\int_3^5 f(x)\\,dx=5$, calcula $\\int_1^3 f(x)\\,dx$.', 'إذا كان $\\int_1^5 f(x)\\,dx=8$ و$\\int_3^5 f(x)\\,dx=5$ فاحسب $\\int_1^3 f(x)\\,dx$.', 'If $\\int_1^5 f(x)\\,dx=8$ and $\\int_3^5 f(x)\\,dx=5$, work out $\\int_1^3 f(x)\\,dx$.'), solution: same('$8-5=3$'), answer: { expected: n(3) } },
            { id: 6, difficulty: 'medium', question: work('\\int_2^0(3x^2-1)\\,dx'), solution: same('$F(x)=x^3-x\\qquad F(0)-F(2)=0-6=-6$'), answer: { expected: n(-6) } },
            { id: 7, difficulty: 'medium', question: axisArea('y=x^3-x', '[-1,\\,1]'), solution: say('Ebaki-puntuak: $-1$, 0 eta 1. Zati bakoitzak $\\frac{1}{4}$ ematen du: $\\frac{1}{4}+\\frac{1}{4}=\\frac{1}{2}$.', 'Cortes en $-1$, 0 y 1. Cada parte da $\\frac{1}{4}$: $\\frac{1}{4}+\\frac{1}{4}=\\frac{1}{2}$.', 'التقاطع عند $-1$ و0 و1. كل جزء يعطي $\\frac{1}{4}$: $\\frac{1}{4}+\\frac{1}{4}=\\frac{1}{2}$.', 'Crossings at $-1$, 0 and 1. Each part gives $\\frac{1}{4}$: $\\frac{1}{4}+\\frac{1}{4}=\\frac{1}{2}$.'), answer: { expected: f(1, 2) } },
            { id: 8, difficulty: 'medium', question: say('Aurkitu $y=4-x^2$ kurbaren eta X ardatzaren arteko azalera.', 'Halla el área entre $y=4-x^2$ y el eje X.', 'أوجد المساحة بين $y=4-x^2$ ومحور X.', 'Find the area between $y=4-x^2$ and the x-axis.'), solution: same('$\\int_{-2}^{2}(4-x^2)\\,dx=16-\\frac{16}{3}=\\frac{32}{3}$'), answer: { expected: f(32, 3) } },
            { id: 9, difficulty: 'hard', question: twoCurves('y=x^2', 'y=\\sqrt{x}'), solution: same('$\\int_0^1(\\sqrt{x}-x^2)\\,dx=\\frac{2}{3}-\\frac{1}{3}=\\frac{1}{3}$'), answer: { expected: f(1, 3) } },
            { id: 10, difficulty: 'hard', question: axisArea('y=x^2-4x+3', '[0,\\,3]'), solution: say('Ebaki-puntuak: 1 eta 3. $\\int_0^1=\\frac{4}{3}$ eta $\\int_1^3=-\\frac{4}{3}$; azalera: $\\frac{4}{3}+\\frac{4}{3}=\\frac{8}{3}$.', 'Cortes en 1 y 3. $\\int_0^1=\\frac{4}{3}$ y $\\int_1^3=-\\frac{4}{3}$; área: $\\frac{4}{3}+\\frac{4}{3}=\\frac{8}{3}$.', 'التقاطع عند 1 و3. $\\int_0^1=\\frac{4}{3}$ و$\\int_1^3=-\\frac{4}{3}$؛ المساحة: $\\frac{4}{3}+\\frac{4}{3}=\\frac{8}{3}$.', 'Crossings at 1 and 3. $\\int_0^1=\\frac{4}{3}$ and $\\int_1^3=-\\frac{4}{3}$; area: $\\frac{4}{3}+\\frac{4}{3}=\\frac{8}{3}$.'), answer: { expected: f(8, 3) } }
        ]
    },
    {
        id: 'sums',
        title: say('Baturak eta batez besteko balioa', 'Sumas y valor medio', 'المجاميع والقيمة المتوسطة', 'Sums and mean value'),
        items: [
            { id: 11, difficulty: 'easy', question: say('$\\{0,\\,1,\\,2\\}$ zatiketarekin, aurkitu $s$ eta $S$, $f(x)=3x$ funtzioarentzat $[0,\\,2]$ tartean.', 'Con $\\{0,\\,1,\\,2\\}$, halla $s$ y $S$ para $f(x)=3x$ en $[0,\\,2]$.', 'باستعمال $\\{0,\\,1,\\,2\\}$ أوجد $s$ و$S$ لـ $f(x)=3x$ في $[0,\\,2]$.', 'With $\\{0,\\,1,\\,2\\}$, find $s$ and $S$ for $f(x)=3x$ on $[0,\\,2]$.'), solution: same('$s=0+3=3\\qquad S=3+6=9$') },
            { id: 12, difficulty: 'easy', question: say('Kalkulatu $1^2+2^2+\\dots+10^2$, formularekin.', 'Calcula $1^2+2^2+\\dots+10^2$ con la fórmula.', 'احسب $1^2+2^2+\\dots+10^2$ بالصيغة.', 'Work out $1^2+2^2+\\dots+10^2$ with the formula.'), solution: same('$\\frac{10\\cdot 11\\cdot 21}{6}=385$'), answer: { expected: n(385) } },
            { id: 13, difficulty: 'easy', question: say('Aurkitu $f(x)=2x$ funtzioaren batez besteko balioa $[1,\\,5]$ tartean.', 'Halla el valor medio de $f(x)=2x$ en $[1,\\,5]$.', 'أوجد القيمة المتوسطة لـ $f(x)=2x$ في $[1,\\,5]$.', 'Find the mean value of $f(x)=2x$ on $[1,\\,5]$.'), solution: same('$\\frac{25-1}{4}=6$'), answer: { expected: n(6) } },
            { id: 14, difficulty: 'medium', question: say('$n$ zati berdinekin, idatzi $S_n$, $f(x)=x$ funtzioarentzat $[0,\\,1]$ tartean, eta aurkitu haren limitea.', 'Con $n$ tramos iguales, escribe $S_n$ para $f(x)=x$ en $[0,\\,1]$ y halla su límite.', 'مع $n$ أجزاء متساوية اكتب $S_n$ لـ $f(x)=x$ في $[0,\\,1]$ وأوجد نهايته.', 'With $n$ equal pieces, write $S_n$ for $f(x)=x$ on $[0,\\,1]$ and find its limit.'), solution: same('$S_n=\\frac{1}{n^2}\\cdot\\frac{n(n+1)}{2}=\\frac{n+1}{2n}\\to\\frac{1}{2}$'), answer: { expected: f(1, 2) } },
            { id: 15, difficulty: 'medium', question: say('$n$ zati berdinekin, aurkitu $s_n$, $f(x)=x^2$ funtzioarentzat $[0,\\,1]$ tartean, eta haren limitea.', 'Con $n$ tramos iguales, halla $s_n$ para $f(x)=x^2$ en $[0,\\,1]$ y su límite.', 'مع $n$ أجزاء متساوية أوجد $s_n$ لـ $f(x)=x^2$ في $[0,\\,1]$ ونهايته.', 'With $n$ equal pieces, find $s_n$ for $f(x)=x^2$ on $[0,\\,1]$ and its limit.'), solution: same('$s_n=\\frac{(n-1)(2n-1)}{6n^2}\\to\\frac{1}{3}$'), answer: { expected: f(1, 3) } },
            { id: 16, difficulty: 'medium', question: say('Aurkitu batez besteko balioaren teoremaren $c$, $f(x)=2x+3$ funtzioarentzat $[0,\\,4]$ tartean.', 'Halla el $c$ del teorema del valor medio para $f(x)=2x+3$ en $[0,\\,4]$.', 'أوجد $c$ مبرهنة القيمة المتوسطة لـ $f(x)=2x+3$ في $[0,\\,4]$.', 'Find the $c$ of the mean value theorem for $f(x)=2x+3$ on $[0,\\,4]$.'), solution: same('$\\frac{28}{4}=7\\to 2c+3=7\\to c=2$'), answer: { expected: n(2) } },
            { id: 17, difficulty: 'medium', question: say('Integrala kalkulatu gabe, mugatu $\\int_1^3\\frac{dx}{x}$, $\\{1,\\,2,\\,3\\}$ zatiketarekin.', 'Sin calcular la integral, acota $\\int_1^3\\frac{dx}{x}$ con $\\{1,\\,2,\\,3\\}$.', 'دون حساب التكامل، احصر $\\int_1^3\\frac{dx}{x}$ باستعمال $\\{1,\\,2,\\,3\\}$.', 'Without working out the integral, bound $\\int_1^3\\frac{dx}{x}$ with $\\{1,\\,2,\\,3\\}$.'), solution: same('$\\frac{1}{2}+\\frac{1}{3}=\\frac{5}{6}\\qquad 1+\\frac{1}{2}=\\frac{3}{2}\\qquad\\frac{5}{6}\\le\\int_1^3\\frac{dx}{x}\\le\\frac{3}{2}$') },
            { id: 18, difficulty: 'hard', question: say('$f(x)=x^2$ funtzioarentzat $[0,\\,3]$ tartean, $n$ zatirekin, $S_n=\\frac{9(n+1)(2n+1)}{2n^2}$. Aurkitu limitea.', 'Para $f(x)=x^2$ en $[0,\\,3]$ con $n$ tramos, $S_n=\\frac{9(n+1)(2n+1)}{2n^2}$. Halla el límite.', 'لـ $f(x)=x^2$ في $[0,\\,3]$ مع $n$ أجزاء لدينا $S_n=\\frac{9(n+1)(2n+1)}{2n^2}$. أوجد النهاية.', 'For $f(x)=x^2$ on $[0,\\,3]$ with $n$ pieces, $S_n=\\frac{9(n+1)(2n+1)}{2n^2}$. Find the limit.'), solution: same('$\\frac{9\\cdot 2}{2}=9$'), answer: { expected: n(9) } },
            { id: 19, difficulty: 'hard', question: say('Aurkitu $f(x)=\\frac{1}{x^2}$ funtzioaren batez besteko balioa $[1,\\,2]$ tartean, eta lortzen den $c$ puntua.', 'Halla el valor medio de $f(x)=\\frac{1}{x^2}$ en $[1,\\,2]$ y el $c$ donde se alcanza.', 'أوجد القيمة المتوسطة لـ $f(x)=\\frac{1}{x^2}$ في $[1,\\,2]$ و$c$ الذي تُبلغ عنده.', 'Find the mean value of $f(x)=\\frac{1}{x^2}$ on $[1,\\,2]$ and the $c$ where it is reached.'), solution: same('$1-\\frac{1}{2}=\\frac{1}{2}\\to\\frac{1}{c^2}=\\frac{1}{2}\\to c=\\sqrt{2}$') },
            { id: 20, difficulty: 'hard', question: say('Labe baten tenperatura $T(t)=20+6t$ da (°C, minututan). Zein da batez besteko tenperatura lehen 10 minutuetan?', 'La temperatura de un horno es $T(t)=20+6t$ (°C, en minutos). ¿Cuál es la temperatura media en los primeros 10 minutos?', 'درجة حرارة فرن هي $T(t)=20+6t$ (°C، بالدقائق). ما متوسط درجة الحرارة في أول 10 دقائق؟', 'The temperature of an oven is $T(t)=20+6t$ (°C, in minutes). What is the mean temperature over the first 10 minutes?'), solution: same('$\\frac{1}{10}\\int_0^{10}(20+6t)\\,dt=\\frac{500}{10}=50$'), answer: { expected: n(50) } }
        ]
    },
    {
        id: 'fundamental',
        title: say('Oinarrizko teorema', 'Teorema fundamental', 'المبرهنة الأساسية', 'The fundamental theorem'),
        items: [
            { id: 21, difficulty: 'easy', question: say('$F(x)=\\int_1^x(3t^2-2)\\,dt$ bada, aurkitu $F\'(x)$.', 'Si $F(x)=\\int_1^x(3t^2-2)\\,dt$, halla $F\'(x)$.', 'إذا كانت $F(x)=\\int_1^x(3t^2-2)\\,dt$ فأوجد $F\'(x)$.', 'If $F(x)=\\int_1^x(3t^2-2)\\,dt$, find $F\'(x)$.'), solution: same('$F\'(x)=3x^2-2$') },
            { id: 22, difficulty: 'easy', question: derive('\\int_0^x e^{-t^2}\\,dt', '0'), solution: same('$F\'(0)=e^0=1$'), answer: { expected: n(1) } },
            { id: 23, difficulty: 'easy', question: say('$F(x)=\\int_2^x\\frac{dt}{t}$ bada, zenbat da $F(2)$?', 'Si $F(x)=\\int_2^x\\frac{dt}{t}$, ¿cuánto vale $F(2)$?', 'إذا كانت $F(x)=\\int_2^x\\frac{dt}{t}$ فكم يساوي $F(2)$؟', 'If $F(x)=\\int_2^x\\frac{dt}{t}$, what is $F(2)$?'), solution: same('$F(2)=\\int_2^2\\frac{dt}{t}=0$'), answer: { expected: n(0) } },
            { id: 24, difficulty: 'medium', question: say('Deribatu $F(x)=\\int_0^{x^2}\\sqrt{1+t}\\,dt$.', 'Deriva $F(x)=\\int_0^{x^2}\\sqrt{1+t}\\,dt$.', 'اشتق $F(x)=\\int_0^{x^2}\\sqrt{1+t}\\,dt$.', 'Differentiate $F(x)=\\int_0^{x^2}\\sqrt{1+t}\\,dt$.'), solution: same('$F\'(x)=2x\\sqrt{1+x^2}$') },
            { id: 25, difficulty: 'medium', question: say('Deribatu $F(x)=\\int_0^{\\sin x}\\frac{dt}{1+t^2}$.', 'Deriva $F(x)=\\int_0^{\\sin x}\\frac{dt}{1+t^2}$.', 'اشتق $F(x)=\\int_0^{\\sin x}\\frac{dt}{1+t^2}$.', 'Differentiate $F(x)=\\int_0^{\\sin x}\\frac{dt}{1+t^2}$.'), solution: same('$F\'(x)=\\frac{\\cos x}{1+\\sin^2 x}$') },
            { id: 26, difficulty: 'medium', question: derive('\\int_1^{2x}\\frac{dt}{t}', '3'), solution: same('$F\'(3)=\\frac{1}{6}\\cdot 2=\\frac{1}{3}$'), answer: { expected: f(1, 3) } },
            { id: 27, difficulty: 'medium', question: say('Barrow aplika daiteke $\\int_{-1}^{1}\\frac{dx}{x-2}$ integralean? Kalkulatu.', '¿Se puede aplicar Barrow a $\\int_{-1}^{1}\\frac{dx}{x-2}$? Calcúlala.', 'هل يمكن تطبيق بارو على $\\int_{-1}^{1}\\frac{dx}{x-2}$؟ احسبه.', 'Can Barrow be applied to $\\int_{-1}^{1}\\frac{dx}{x-2}$? Work it out.'), solution: say('Bai: $x=2$ tartetik kanpo dago. $\\ln 1-\\ln 3=-\\ln 3$.', 'Sí: $x=2$ queda fuera. $\\ln 1-\\ln 3=-\\ln 3$.', 'نعم: $x=2$ خارج الفترة. $\\ln 1-\\ln 3=-\\ln 3$.', 'Yes: $x=2$ is outside. $\\ln 1-\\ln 3=-\\ln 3$.') },
            { id: 28, difficulty: 'medium', question: say('Barrow aplika daiteke $\\int_0^2\\frac{dx}{x-1}$ integralean?', '¿Se puede aplicar Barrow a $\\int_0^2\\frac{dx}{x-1}$?', 'هل يمكن تطبيق بارو على $\\int_0^2\\frac{dx}{x-1}$؟', 'Can Barrow be applied to $\\int_0^2\\frac{dx}{x-1}$?'), solution: say('Ez: asintota bat dago $x=1$ puntuan, $[0,\\,2]$ tartearen barruan.', 'No: hay una asíntota en $x=1$, dentro de $[0,\\,2]$.', 'لا: يوجد مقارب عند $x=1$ داخل $[0,\\,2]$.', 'No: there is an asymptote at $x=1$, inside $[0,\\,2]$.') },
            { id: 29, difficulty: 'hard', question: derive('\\int_x^{x^2}t\\,dt', '2'), solution: same('$F\'(x)=x^2\\cdot 2x-x\\qquad F\'(2)=4\\cdot 4-2=14$'), answer: { expected: n(14) } },
            { id: 30, difficulty: 'hard', question: say('Aurkitu $a$, $F(x)=\\int_0^x(t^2-a)\\,dt$ funtzioak mutur bat izan dezan $x=3$ puntuan.', 'Halla $a$ para que $F(x)=\\int_0^x(t^2-a)\\,dt$ tenga un extremo en $x=3$.', 'أوجد $a$ لتكون لـ $F(x)=\\int_0^x(t^2-a)\\,dt$ قيمة قصوى عند $x=3$.', 'Find $a$ so that $F(x)=\\int_0^x(t^2-a)\\,dt$ has an extremum at $x=3$.'), solution: same('$F\'(3)=9-a=0\\to a=9$'), answer: { expected: n(9) } }
        ]
    },
    {
        id: 'techniques',
        title: say('Integral mugatuak kalkulatzea', 'Calcular integrales definidas', 'حساب التكاملات المحددة', 'Working out definite integrals'),
        items: [
            { id: 31, difficulty: 'easy', question: say('Kalkulatu $\\int_0^1(2x+1)^3\\,dx$, $t=2x+1$ hartuta.', 'Calcula $\\int_0^1(2x+1)^3\\,dx$ con $t=2x+1$.', 'احسب $\\int_0^1(2x+1)^3\\,dx$ مع $t=2x+1$.', 'Work out $\\int_0^1(2x+1)^3\\,dx$ with $t=2x+1$.'), solution: same('$\\frac{1}{2}\\int_1^3 t^3\\,dt=\\frac{81-1}{8}=10$'), answer: { expected: n(10) } },
            { id: 32, difficulty: 'easy', question: work('\\int_{-1}^{2}|x|\\,dx'), solution: same('$\\int_{-1}^{0}(-x)\\,dx+\\int_0^2 x\\,dx=\\frac{1}{2}+2=\\frac{5}{2}$'), answer: { expected: f(5, 2) } },
            { id: 33, difficulty: 'easy', question: work('\\int_0^1 xe^{x^2}\\,dx'), solution: same('$\\frac{1}{2}\\int_0^1 e^t\\,dt=\\frac{e-1}{2}$') },
            { id: 34, difficulty: 'medium', question: work('\\int_0^1 xe^{-x}\\,dx'), solution: same('$\\left[-xe^{-x}\\right]_0^1+\\int_0^1 e^{-x}\\,dx=1-\\frac{2}{e}$') },
            { id: 35, difficulty: 'medium', question: work('\\int_0^{\\frac{\\pi}{2}}x\\cos x\\,dx'), solution: same('$\\left[x\\sin x\\right]_0^{\\frac{\\pi}{2}}-\\int_0^{\\frac{\\pi}{2}}\\sin x\\,dx=\\frac{\\pi}{2}-1$') },
            { id: 36, difficulty: 'medium', question: say('Kalkulatu $\\int_0^3 f(x)\\,dx$, $f(x)=2x$ bada $x<1$ denean, eta $f(x)=2$ bada $x\\ge 1$ denean.', 'Calcula $\\int_0^3 f(x)\\,dx$ si $f(x)=2x$ para $x<1$ y $f(x)=2$ para $x\\ge 1$.', 'احسب $\\int_0^3 f(x)\\,dx$ إذا كانت $f(x)=2x$ عندما $x<1$ و$f(x)=2$ عندما $x\\ge 1$.', 'Work out $\\int_0^3 f(x)\\,dx$ if $f(x)=2x$ for $x<1$ and $f(x)=2$ for $x\\ge 1$.'), solution: same('$\\int_0^1 2x\\,dx+\\int_1^3 2\\,dx=1+4=5$'), answer: { expected: n(5) } },
            { id: 37, difficulty: 'medium', question: say('Kalkulatu $\\int_4^9\\frac{dx}{\\sqrt{x}-1}$, $t=\\sqrt{x}$ hartuta.', 'Calcula $\\int_4^9\\frac{dx}{\\sqrt{x}-1}$ con $t=\\sqrt{x}$.', 'احسب $\\int_4^9\\frac{dx}{\\sqrt{x}-1}$ مع $t=\\sqrt{x}$.', 'Work out $\\int_4^9\\frac{dx}{\\sqrt{x}-1}$ with $t=\\sqrt{x}$.'), solution: same('$\\int_2^3\\frac{2t}{t-1}\\,dt=2\\left[t+\\ln|t-1|\\right]_2^3=2+2\\ln 2$') },
            { id: 38, difficulty: 'medium', question: work('\\int_0^2|x^2-1|\\,dx'), solution: same('$\\int_0^1(1-x^2)\\,dx+\\int_1^2(x^2-1)\\,dx=\\frac{2}{3}+\\frac{4}{3}=2$'), answer: { expected: n(2) } },
            { id: 39, difficulty: 'hard', question: work('\\int_1^e\\ln^2 x\\,dx'), solution: same('$\\left[x\\ln^2 x\\right]_1^e-2\\int_1^e\\ln x\\,dx=e-2$') },
            { id: 40, difficulty: 'hard', question: say('$\\int_0^{\\ln 3}\\frac{e^x}{1+e^x}\\,dx=\\ln a$. Aurkitu $a$.', '$\\int_0^{\\ln 3}\\frac{e^x}{1+e^x}\\,dx=\\ln a$. Halla $a$.', '$\\int_0^{\\ln 3}\\frac{e^x}{1+e^x}\\,dx=\\ln a$. أوجد $a$.', '$\\int_0^{\\ln 3}\\frac{e^x}{1+e^x}\\,dx=\\ln a$. Find $a$.'), solution: say('$t=1+e^x$ aldaketarekin, $\\int_2^4\\frac{dt}{t}=\\ln\\frac{4}{2}=\\ln 2\\to a=2$.', 'Con $t=1+e^x$, $\\int_2^4\\frac{dt}{t}=\\ln\\frac{4}{2}=\\ln 2\\to a=2$.', 'مع $t=1+e^x$ يكون $\\int_2^4\\frac{dt}{t}=\\ln\\frac{4}{2}=\\ln 2\\to a=2$.', 'With $t=1+e^x$, $\\int_2^4\\frac{dt}{t}=\\ln\\frac{4}{2}=\\ln 2\\to a=2$.'), answer: { expected: n(2) } }
        ]
    },
    {
        id: 'problems',
        title: say('Barrutiak eta problemak', 'Recintos y problemas', 'المناطق والمسائل', 'Regions and problems'),
        items: [
            { id: 41, difficulty: 'easy', question: twoCurves('y=x^2', 'y=1'), solution: same('$\\int_{-1}^{1}(1-x^2)\\,dx=2-\\frac{2}{3}=\\frac{4}{3}$'), answer: { expected: f(4, 3) } },
            { id: 42, difficulty: 'easy', question: say('Aurkitu $b>0$, $\\int_0^b 3x^2\\,dx=64$ izan dadin.', 'Halla $b>0$ para que $\\int_0^b 3x^2\\,dx=64$.', 'أوجد $b>0$ بحيث $\\int_0^b 3x^2\\,dx=64$.', 'Find $b>0$ so that $\\int_0^b 3x^2\\,dx=64$.'), solution: same('$b^3=64\\to b=4$'), answer: { expected: n(4) } },
            { id: 43, difficulty: 'easy', question: volume('y=x', '0', '3'), solution: say('Kono bat da: $\\pi\\int_0^3 x^2\\,dx=9\\pi$, beraz $a=9$.', 'Es un cono: $\\pi\\int_0^3 x^2\\,dx=9\\pi$, así que $a=9$.', 'إنه مخروط: $\\pi\\int_0^3 x^2\\,dx=9\\pi$، إذن $a=9$.', 'It is a cone: $\\pi\\int_0^3 x^2\\,dx=9\\pi$, so $a=9$.'), answer: { expected: n(9) } },
            { id: 44, difficulty: 'medium', question: say('Aurkitu $y=x^2$ kurbak, $y=2-x$ zuzenak eta Y ardatzak mugatutako barrutiaren azalera.', 'Halla el área del recinto limitado por $y=x^2$, $y=2-x$ y el eje Y.', 'أوجد مساحة المنطقة التي يحدّها $y=x^2$ و$y=2-x$ ومحور Y.', 'Find the area of the region bounded by $y=x^2$, $y=2-x$ and the y-axis.'), solution: same('$\\int_0^1(2-x-x^2)\\,dx=2-\\frac{1}{2}-\\frac{1}{3}=\\frac{7}{6}$'), answer: { expected: f(7, 6) } },
            { id: 45, difficulty: 'medium', question: say('Aurkitu $k>0$, $y=kx$ eta $y=x^2$ kurben arteko azalera $\\frac{4}{3}$ izan dadin.', 'Halla $k>0$ para que el área entre $y=kx$ e $y=x^2$ valga $\\frac{4}{3}$.', 'أوجد $k>0$ لتكون المساحة بين $y=kx$ و$y=x^2$ مساوية لـ $\\frac{4}{3}$.', 'Find $k>0$ so that the area between $y=kx$ and $y=x^2$ is $\\frac{4}{3}$.'), solution: same('$\\int_0^k(kx-x^2)\\,dx=\\frac{k^3}{6}=\\frac{4}{3}\\to k^3=8\\to k=2$'), answer: { expected: n(2) } },
            { id: 46, difficulty: 'medium', question: say('$F(x)=\\int_0^x(t^2-4t+3)\\,dt$. Zein $x$ puntutan du $F$ funtzioak maximo erlatiboa?', '$F(x)=\\int_0^x(t^2-4t+3)\\,dt$. ¿En qué $x$ tiene $F$ su máximo relativo?', '$F(x)=\\int_0^x(t^2-4t+3)\\,dt$. عند أي $x$ تكون لـ $F$ قيمتها العظمى المحلية؟', '$F(x)=\\int_0^x(t^2-4t+3)\\,dt$. At which $x$ does $F$ have its local maximum?'), solution: say('$F\'(x)=(x-1)(x-3)$ deribatua $+$ izatetik $-$ izatera pasatzen da $x=1$ puntuan.', '$F\'(x)=(x-1)(x-3)$ pasa de $+$ a $-$ en $x=1$.', 'تنتقل $F\'(x)=(x-1)(x-3)$ من $+$ إلى $-$ عند $x=1$.', '$F\'(x)=(x-1)(x-3)$ goes from $+$ to $-$ at $x=1$.'), answer: { expected: n(1) } },
            { id: 47, difficulty: 'medium', question: say('Aurkitu $y=e^x$ kurba X ardatzaren inguruan 0 eta 1 artean biratzean lortzen den bolumena.', 'Halla el volumen al girar $y=e^x$ alrededor del eje X entre 0 y 1.', 'أوجد الحجم الناتج عن دوران $y=e^x$ حول محور X بين 0 و1.', 'Find the volume when $y=e^x$ is turned about the x-axis between 0 and 1.'), solution: same('$V=\\pi\\int_0^1 e^{2x}\\,dx=\\frac{\\pi(e^2-1)}{2}$') },
            { id: 48, difficulty: 'medium', question: say('Aurkitu $y=e^x$ eta $y=e^{-x}$ kurbek eta $x=1$ zuzenak mugatutako azalera.', 'Halla el área limitada por $y=e^x$, $y=e^{-x}$ y la recta $x=1$.', 'أوجد المساحة التي يحدّها $y=e^x$ و$y=e^{-x}$ والمستقيم $x=1$.', 'Find the area bounded by $y=e^x$, $y=e^{-x}$ and the line $x=1$.'), solution: same('$\\int_0^1(e^x-e^{-x})\\,dx=e+\\frac{1}{e}-2$') },
            { id: 49, difficulty: 'hard', question: say('Aurkitu lehen koadranteko barrutiaren azalera, $y=x^2$ eta $y=\\frac{x^2}{9}$ kurbek eta $y=9$ zuzenak mugatua.', 'Halla el área del recinto del primer cuadrante limitado por $y=x^2$, $y=\\frac{x^2}{9}$ e $y=9$.', 'أوجد مساحة المنطقة في الربع الأول التي يحدّها $y=x^2$ و$y=\\frac{x^2}{9}$ و$y=9$.', 'Find the area of the region in the first quadrant bounded by $y=x^2$, $y=\\frac{x^2}{9}$ and $y=9$.'), solution: same('$\\begin{aligned}&\\int_0^3\\frac{8x^2}{9}\\,dx=8\\\\ &\\int_3^9\\left(9-\\frac{x^2}{9}\\right)dx=54-26=28\\\\ &8+28=36\\end{aligned}$'), answer: { expected: n(36) } },
            { id: 50, difficulty: 'hard', question: say('Egiaztatu integral batekin 3 erradioko esferaren bolumena $36\\pi$ dela.', 'Comprueba con una integral que el volumen de una esfera de radio 3 es $36\\pi$.', 'تحقق بتكامل من أن حجم كرة نصف قطرها 3 هو $36\\pi$.', 'Check with an integral that the volume of a sphere of radius 3 is $36\\pi$.'), solution: same('$\\pi\\int_{-3}^{3}(9-x^2)\\,dx=\\pi(54-18)=36\\pi$') }
        ]
    }
]

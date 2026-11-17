import { fraction, type FractionValue } from '../../features/unit-v2/math/fraction.ts'
import type { ChallengeItem, DiagnosticQuestion, ExerciseSection, PracticeItem } from '../../features/unit-v2/types.ts'
import { same, say } from './text.ts'

/* ==========================================================================
   Funtzio esponentzialak eta logaritmikoak · Batxilergoa 1 · Gizarte
   Zientziak — diagnostic, guided practice, exercise bank and challenges,
   with the scope of unit 5 of Anaya Matemáticas aplicadas a las CCSS I
   (all the exercises and numbers are our own). Every closed answer is a
   single exact number; when a logarithm gives a decimal, the question asks
   for the whole year or the whole day.
   ========================================================================== */

const v = (text: string): FractionValue => {
    const negative = text.startsWith('-')
    const [whole, decimals = ''] = text.replace('-', '').split(',')
    return fraction((negative ? -1 : 1) * Number(whole + decimals), 10 ** decimals.length)
}
const n = (value: number) => fraction(value)

export const socExpDiagnostic: DiagnosticQuestion[] = [
    {
        id: 134001,
        prompt: say('Non dago $y=(x-2)^2+3$ parabolaren erpina?', '¿Dónde está el vértice de $y=(x-2)^2+3$?', 'أين رأس $y=(x-2)^2+3$؟', 'Where is the vertex of $y=(x-2)^2+3$?'),
        options: [same('$(2,3)$'), same('$(-2,3)$'), same('$(3,2)$')],
        correctIndex: 0,
        explanation: say('$y=x^2$ parabola, 2 eskuinera eta 3 gora.', 'Es $y=x^2$ llevada 2 a la derecha y 3 hacia arriba.', 'إنها $y=x^2$ منقولة 2 إلى اليمين و3 إلى الأعلى.', 'It is $y=x^2$ moved 2 right and 3 up.'),
        topic: 'shifts'
    },
    {
        id: 134002,
        prompt: say('Zein da $(4,1)$ puntuaren simetrikoa X ardatzarekiko?', '¿Cuál es el simétrico de $(4,1)$ respecto del eje X?', 'ما متناظر $(4,1)$ حول محور X؟', 'What is the reflection of $(4,1)$ in the x-axis?'),
        options: [same('$(-4,1)$'), same('$(4,-1)$'), same('$(-4,-1)$')],
        correctIndex: 1,
        explanation: say('X ardatzarekiko, $y$ koordenatuaren zeinua bakarrik aldatzen da.', 'Respecto del eje X solo cambia el signo de la $y$.', 'حول محور X تتغير إشارة $y$ فقط.', 'In the x-axis only the sign of $y$ changes.'),
        topic: 'reflections'
    },
    {
        id: 134003,
        prompt: say('$f(x)=x+3$ bada, zenbat da $f(f(1))$?', 'Si $f(x)=x+3$, ¿cuánto vale $f(f(1))$?', 'إذا كانت $f(x)=x+3$ فكم تساوي $f(f(1))$؟', 'If $f(x)=x+3$, what is $f(f(1))$?'),
        options: [same('$4$'), same('$16$'), same('$7$')],
        correctIndex: 2,
        explanation: same('$f(1)=4\\qquad f(4)=7$'),
        topic: 'composition'
    },
    {
        id: 134004,
        prompt: say('Askatu $x$, $y=3x-6$ adierazpenean.', 'Despeja $x$ en $y=3x-6$.', 'اعزل $x$ في $y=3x-6$.', 'Solve $y=3x-6$ for $x$.'),
        options: [same('$x=\\frac{y+6}{3}$'), same('$x=3y+6$'), same('$x=\\frac{y-6}{3}$')],
        correctIndex: 0,
        explanation: same('$y+6=3x\\ \\to\\ x=\\frac{y+6}{3}$'),
        topic: 'inverse'
    },
    {
        id: 134005,
        prompt: say('Zenbat da $2^5$?', '¿Cuánto vale $2^5$?', 'كم تساوي $2^5$؟', 'What is $2^5$?'),
        options: [same('$10$'), same('$32$'), same('$25$')],
        correctIndex: 1,
        explanation: same('$2\\cdot 2\\cdot 2\\cdot 2\\cdot 2=32$'),
        topic: 'exp-graph'
    },
    {
        id: 134006,
        prompt: say('% 10 handitzea zenbaki honekin biderkatzea da:', 'Aumentar un 10 % es multiplicar por…', 'زيادة 10 % تعني الضرب في…', 'Increasing by 10 % means multiplying by…'),
        options: [same('$0{,}1$'), same('$10$'), same('$1{,}1$')],
        correctIndex: 2,
        explanation: say('Osoa gehi haren % 10: $1+0{,}1=1{,}1$.', 'El total más su 10 %: $1+0{,}1=1{,}1$.', 'الكل زائد 10 % منه: $1+0{,}1=1{,}1$.', 'The whole plus its 10 %: $1+0{,}1=1{,}1$.'),
        topic: 'percent-growth'
    },
    {
        id: 134007,
        prompt: say('Zenbat da $\\log 1000$?', '¿Cuánto vale $\\log 1000$?', 'كم تساوي $\\log 1000$؟', 'What is $\\log 1000$?'),
        options: [same('$3$'), same('$100$'), same('$30$')],
        correctIndex: 0,
        explanation: same('$10^3=1000$'),
        topic: 'log-inverse'
    },
    {
        id: 134008,
        prompt: say('Kopuru bat 4 aldiz bikoizten bada, zenbat aldiz handitzen da?', 'Si una cantidad se duplica 4 veces seguidas, ¿por cuánto queda multiplicada?', 'إذا تضاعفت كمية 4 مرات متتالية، ففي كم تُضرب؟', 'If an amount doubles 4 times in a row, what is it multiplied by?'),
        options: [same('$8$'), same('$16$'), same('$4$')],
        correctIndex: 1,
        explanation: same('$2^4=16$'),
        topic: 'doubling'
    }
]

export const socExpPractice: PracticeItem[] = [
    /* ---------- Transformations ---------- */
    { id: 1, stage: 'transforms', prompt: say('$f$ funtzioa $(2,3)$ puntutik pasatzen da. Zenbat balio du $y=f(x+1)+4$ funtzioak $x=1$ denean?', 'La gráfica de $f$ pasa por $(2,3)$. ¿Cuánto vale $y=f(x+1)+4$ en $x=1$?', 'يمر رسم $f$ بالنقطة $(2,3)$. كم تساوي $y=f(x+1)+4$ عند $x=1$؟', 'The graph of $f$ passes through $(2,3)$. What is $y=f(x+1)+4$ at $x=1$?'), expected: n(7), hint: same('$1+1=2$'), explanation: same('$f(2)+4=3+4=7$') },
    { id: 2, stage: 'transforms', prompt: say('$f$ funtzioa $(-3,2)$ puntutik pasatzen da. Zein abzisa du $y=f(-x)$ funtzioaren puntu baliokideak?', 'La gráfica de $f$ pasa por $(-3,2)$. ¿Qué abscisa tiene el punto correspondiente de $y=f(-x)$?', 'يمر رسم $f$ بالنقطة $(-3,2)$. ما فاصلة النقطة المقابلة على $y=f(-x)$؟', 'The graph of $f$ passes through $(-3,2)$. What is the x-coordinate of the matching point of $y=f(-x)$?'), expected: n(3), hint: say('Y ardatzean islatzen da.', 'Se refleja en el eje Y.', 'ينعكس في محور Y.', 'It is reflected in the y-axis.'), explanation: same('$-x=-3\\ \\to\\ x=3$') },
    { id: 3, stage: 'transforms', prompt: say('$x^2-8x+10$ adierazpena $(x-m)^2+p$ moduan idaztean, zenbat da $p$?', 'Al escribir $x^2-8x+10$ como $(x-m)^2+p$, ¿cuánto vale $p$?', 'عند كتابة $x^2-8x+10$ على صورة $(x-m)^2+p$، كم تساوي $p$؟', 'Writing $x^2-8x+10$ as $(x-m)^2+p$, what is $p$?'), expected: n(-6), hint: same('$(x-4)^2=x^2-8x+16$'), explanation: same('$10-16=-6$') },
    { id: 4, stage: 'transforms', prompt: say('Zein da $y=x^2+6x+4$ parabolaren erpinaren ordenatua?', '¿Cuál es la ordenada del vértice de $y=x^2+6x+4$?', 'ما ترتيب رأس $y=x^2+6x+4$؟', 'What is the y-coordinate of the vertex of $y=x^2+6x+4$?'), expected: n(-5), hint: same('$(x+3)^2=x^2+6x+9$'), explanation: same('$x^2+6x+4=(x+3)^2-5$') },

    /* ---------- Composition and inverse ---------- */
    { id: 5, stage: 'composition', prompt: say('$f(x)=2x+1$ eta $g(x)=x^2$ badira, zenbat da $(f\\circ g)(3)$?', 'Si $f(x)=2x+1$ y $g(x)=x^2$, ¿cuánto vale $(f\\circ g)(3)$?', 'إذا كانت $f(x)=2x+1$ و$g(x)=x^2$ فكم تساوي $(f\\circ g)(3)$؟', 'If $f(x)=2x+1$ and $g(x)=x^2$, what is $(f\\circ g)(3)$?'), expected: n(19), hint: say('Lehenik $g$.', 'Primero $g$.', 'أولًا $g$.', '$g$ first.'), explanation: same('$g(3)=9\\qquad f(9)=19$') },
    { id: 6, stage: 'composition', prompt: say('Funtzio berekin, zenbat da $(g\\circ f)(3)$?', 'Con las mismas funciones, ¿cuánto vale $(g\\circ f)(3)$?', 'بالدالتين نفسيهما، كم تساوي $(g\\circ f)(3)$؟', 'With the same functions, what is $(g\\circ f)(3)$?'), expected: n(49), hint: say('Orain lehenik $f$.', 'Ahora primero $f$.', 'الآن أولًا $f$.', 'Now $f$ first.'), explanation: same('$f(3)=7\\qquad g(7)=49$') },
    { id: 7, stage: 'composition', prompt: say('$f(x)=3x-12$ bada, zenbat da $f^{-1}(0)$?', 'Si $f(x)=3x-12$, ¿cuánto vale $f^{-1}(0)$?', 'إذا كانت $f(x)=3x-12$ فكم تساوي $f^{-1}(0)$؟', 'If $f(x)=3x-12$, what is $f^{-1}(0)$?'), expected: n(4), hint: say('Ebatzi $3x-12=0$.', 'Resuelve $3x-12=0$.', 'حُلّ $3x-12=0$.', 'Solve $3x-12=0$.'), explanation: same('$3x=12\\ \\to\\ x=4$') },
    { id: 8, stage: 'composition', prompt: say('$f(x)=\\frac{x+4}{2}$ bada, zenbat da $f^{-1}(5)$?', 'Si $f(x)=\\frac{x+4}{2}$, ¿cuánto vale $f^{-1}(5)$?', 'إذا كانت $f(x)=\\frac{x+4}{2}$ فكم تساوي $f^{-1}(5)$؟', 'If $f(x)=\\frac{x+4}{2}$, what is $f^{-1}(5)$?'), expected: n(6), hint: same('$f^{-1}(x)=2x-4$'), explanation: same('$2\\cdot 5-4=6$') },

    /* ---------- Exponential functions ---------- */
    { id: 9, stage: 'exponential', prompt: say('Zenbat balio du $y=3\\cdot 2^x$ funtzioak $x=4$ denean?', '¿Cuánto vale $y=3\\cdot 2^x$ en $x=4$?', 'كم تساوي $y=3\\cdot 2^x$ عند $x=4$؟', 'What is $y=3\\cdot 2^x$ at $x=4$?'), expected: n(48), hint: same('$2^4=16$'), explanation: same('$3\\cdot 16=48$') },
    { id: 10, stage: 'exponential', prompt: say('1000 biztanleko herri bat % 10 hazten da urtero. Zenbat biztanle izango ditu 2 urteren buruan?', 'Un pueblo de 1000 habitantes crece un 10 % al año. ¿Cuántos tendrá a los 2 años?', 'قرية سكانها 1000 تنمو 10 % سنويًّا. كم سيصبح عدد سكانها بعد سنتين؟', 'A village of 1,000 people grows 10 % a year. How many will it have after 2 years?'), expected: n(1210), hint: say('Bider 1,1 urtero.', 'Por 1,1 cada año.', 'الضرب في 1.1 كل سنة.', 'Times 1.1 every year.'), explanation: same('$1000\\cdot 1{,}1^2=1210$') },
    { id: 11, stage: 'exponential', prompt: say('10 000 euroko auto batek % 20 galtzen du urtero. Zenbat balio du 2 urteren buruan, eurotan?', 'Un coche de 10 000 € pierde un 20 % al año. ¿Cuánto vale a los 2 años, en euros?', 'سيارة قيمتها 10 000 € تفقد 20 % سنويًّا. كم قيمتها بعد سنتين باليورو؟', 'A €10,000 car loses 20 % a year. What is it worth after 2 years, in euros?'), expected: n(6400), hint: say('% 80 geratzen da urtero.', 'Cada año queda el 80 %.', 'يبقى 80 % كل سنة.', '80 % is left each year.'), explanation: same('$10\\,000\\cdot 0{,}8^2=6400$') },
    { id: 12, stage: 'exponential', prompt: say('$y=k\\cdot a^x$ funtzioa $(0,5)$ eta $(2,45)$ puntuetatik pasatzen da. Zenbat da $a$?', 'La función $y=k\\cdot a^x$ pasa por $(0,5)$ y $(2,45)$. ¿Cuánto vale $a$?', 'تمر $y=k\\cdot a^x$ بـ $(0,5)$ و$(2,45)$. كم تساوي $a$؟', 'The function $y=k\\cdot a^x$ passes through $(0,5)$ and $(2,45)$. What is $a$?'), expected: n(3), hint: same('$a^2=\\frac{45}{5}$'), explanation: same('$a^2=9\\ \\to\\ a=3$') },

    /* ---------- Logarithmic functions ---------- */
    { id: 13, stage: 'logarithmic', prompt: say('Zenbat da $\\log_2 64$?', '¿Cuánto vale $\\log_2 64$?', 'كم تساوي $\\log_2 64$؟', 'What is $\\log_2 64$?'), expected: n(6), hint: say('Zein berretzailek ematen du 64, 2 oinarriarekin?', '¿Qué exponente da 64 con base 2?', 'أي أس يعطي 64 مع الأساس 2؟', 'Which exponent gives 64 with base 2?'), explanation: same('$2^6=64$') },
    { id: 14, stage: 'logarithmic', prompt: say('Zenbat da $\\log_5\\frac{1}{25}$?', '¿Cuánto vale $\\log_5\\frac{1}{25}$?', 'كم تساوي $\\log_5\\frac{1}{25}$؟', 'What is $\\log_5\\frac{1}{25}$?'), expected: n(-2), hint: same('$5^{-2}=\\frac{1}{25}$'), explanation: same('$\\log_5\\frac{1}{25}=-2$') },
    { id: 15, stage: 'logarithmic', prompt: say('Zein da $y=\\log(x-7)$ funtzioaren izate-eremuko zenbaki oso txikiena?', '¿Cuál es el menor entero del dominio de $y=\\log(x-7)$?', 'ما أصغر عدد صحيح في مجال $y=\\log(x-7)$؟', 'What is the smallest integer in the domain of $y=\\log(x-7)$?'), expected: n(8), hint: same('$x-7>0$'), explanation: say('$x>7$: lehen zenbaki osoa 8 da.', '$x>7$: el primer entero es 8.', '$x>7$: أول عدد صحيح هو 8.', '$x>7$: the first integer is 8.') },
    { id: 16, stage: 'logarithmic', prompt: say('Ebatzi $2^t=32$.', 'Resuelve $2^t=32$.', 'حُلّ $2^t=32$.', 'Solve $2^t=32$.'), expected: n(5), hint: same('$32=2^5$'), explanation: same('$t=\\log_2 32=5$') },

    /* ---------- Models ---------- */
    { id: 17, stage: 'models', prompt: say('Kopuru bat 6 urtean behin bikoizten da. Zenbat aldiz handiagoa da 24 urteren buruan?', 'Una cantidad se duplica cada 6 años. ¿Por cuánto queda multiplicada a los 24 años?', 'تتضاعف كمية كل 6 سنوات. في كم تُضرب بعد 24 سنة؟', 'An amount doubles every 6 years. What is it multiplied by after 24 years?'), expected: n(16), hint: say('Zenbat bikoizketa dira?', '¿Cuántas duplicaciones son?', 'كم مضاعفة؟', 'How many doublings are there?'), explanation: same('$\\frac{24}{6}=4\\qquad 2^4=16$') },
    { id: 18, stage: 'models', prompt: say('800 g substantzia bat dago, eta haren erdibizitza 10 urte da. Zenbat gramo geratzen dira 30 urteren buruan?', 'Hay 800 g de una sustancia con una semivida de 10 años. ¿Cuántos gramos quedan a los 30 años?', 'يوجد 800 غ من مادة عمر نصفها 10 سنوات. كم غرامًا يبقى بعد 30 سنة؟', 'There are 800 g of a substance with a half-life of 10 years. How many grams are left after 30 years?'), expected: n(100), hint: say('Hiru aldiz erdira.', 'Tres veces a la mitad.', 'ثلاث مرات إلى النصف.', 'Halved three times.'), explanation: same('$800\\cdot\\left(\\frac{1}{2}\\right)^3=100$') },
    { id: 19, stage: 'models', prompt: say('$f(x)=\\frac{1200}{1+5\\cdot 2^{-x}}$ bada, zenbat da $f(0)$?', 'Si $f(x)=\\frac{1200}{1+5\\cdot 2^{-x}}$, ¿cuánto vale $f(0)$?', 'إذا كانت $f(x)=\\frac{1200}{1+5\\cdot 2^{-x}}$ فكم تساوي $f(0)$؟', 'If $f(x)=\\frac{1200}{1+5\\cdot 2^{-x}}$, what is $f(0)$?'), expected: n(200), hint: same('$2^0=1$'), explanation: same('$\\frac{1200}{1+5}=200$') },
    { id: 20, stage: 'models', prompt: say('$R(t)=80-20\\log t$ bada, zenbat da $R(100)$?', 'Si $R(t)=80-20\\log t$, ¿cuánto vale $R(100)$?', 'إذا كانت $R(t)=80-20\\log t$ فكم تساوي $R(100)$؟', 'If $R(t)=80-20\\log t$, what is $R(100)$?'), expected: n(40), hint: same('$\\log 100=2$'), explanation: same('$80-20\\cdot 2=40$') }
]

export const socExpChallenges: ChallengeItem[] = [
    { id: 101, stage: 'transforms', points: 10, context: 'starter', prompt: say('$f$ funtzioa $(1,4)$ puntutik pasatzen da. Zein ordenatu du $y=-2f(x-3)+1$ funtzioaren puntu baliokideak?', 'La gráfica de $f$ pasa por $(1,4)$. ¿Qué ordenada tiene el punto correspondiente de $y=-2f(x-3)+1$?', 'يمر رسم $f$ بالنقطة $(1,4)$. ما ترتيب النقطة المقابلة على $y=-2f(x-3)+1$؟', 'The graph of $f$ passes through $(1,4)$. What is the y-coordinate of the matching point of $y=-2f(x-3)+1$?'), expected: n(-7), hint: say('Kanpokoa: bider $-2$, gehi 1.', 'Lo de fuera: por $-2$ y más 1.', 'ما بالخارج: في $-2$ ثم زائد 1.', 'The outside: times $-2$, plus 1.'), explanation: same('$-2\\cdot 4+1=-7$') },
    { id: 102, stage: 'transforms', points: 20, context: 'advanced', prompt: say('$x^2+12x+40$ adierazpena $(x+6)^2+p$ moduan idaztean, zenbat da $p$?', 'Al escribir $x^2+12x+40$ como $(x+6)^2+p$, ¿cuánto vale $p$?', 'عند كتابة $x^2+12x+40$ على صورة $(x+6)^2+p$، كم تساوي $p$؟', 'Writing $x^2+12x+40$ as $(x+6)^2+p$, what is $p$?'), expected: n(4), hint: same('$(x+6)^2=x^2+12x+36$'), explanation: same('$40-36=4$') },
    { id: 103, stage: 'transforms', points: 30, context: 'master', prompt: say('$y=\\frac{3x+7}{x+2}$ funtzioaren asintota horizontala $y=b$ da. Zenbat da $b$?', 'La asíntota horizontal de $y=\\frac{3x+7}{x+2}$ es $y=b$. ¿Cuánto vale $b$?', 'الخط المقارب الأفقي لـ $y=\\frac{3x+7}{x+2}$ هو $y=b$. كم تساوي $b$؟', 'The horizontal asymptote of $y=\\frac{3x+7}{x+2}$ is $y=b$. What is $b$?'), expected: n(3), hint: same('$3x+7=3(x+2)+1$'), explanation: same('$y=\\frac{1}{x+2}+3\\ \\to\\ b=3$') },
    { id: 104, stage: 'composition', points: 10, context: 'starter', prompt: say('$f(x)=x+5$ eta $g(x)=x^2$ badira, kalkulatu $(f\\circ g)(2)-(g\\circ f)(2)$.', 'Si $f(x)=x+5$ y $g(x)=x^2$, calcula $(f\\circ g)(2)-(g\\circ f)(2)$.', 'إذا كانت $f(x)=x+5$ و$g(x)=x^2$ فاحسب $(f\\circ g)(2)-(g\\circ f)(2)$.', 'If $f(x)=x+5$ and $g(x)=x^2$, work out $(f\\circ g)(2)-(g\\circ f)(2)$.'), expected: n(-40), hint: same('$(f\\circ g)(2)=f(4)$'), explanation: same('$9-49=-40$') },
    { id: 105, stage: 'composition', points: 20, context: 'advanced', prompt: say('Produktu baten prezioa BEZarekin $f(x)=1{,}21x$ da. Zein da BEZik gabeko prezioa, BEZarekin 242 € badira?', 'El precio con IVA de un artículo es $f(x)=1{,}21x$. ¿Cuál es el precio sin IVA si con IVA son 242 €?', 'سعر سلعة مع الضريبة $f(x)=1{,}21x$. ما السعر بلا ضريبة إذا كان مع الضريبة 242 €؟', 'The price of an item with VAT is $f(x)=1{,}21x$. What is the price without VAT if with VAT it is €242?'), expected: n(200), hint: say('Alderantzizkoa: zatitu 1,21 zenbakiaz.', 'La inversa: divide entre 1,21.', 'العكسية: اقسم على 1.21.', 'The inverse: divide by 1.21.'), explanation: same('$\\frac{242}{1{,}21}=200$') },
    { id: 106, stage: 'composition', points: 30, context: 'master', prompt: say('$f(x)=x^2+1$ da, $x\\ge 0$ denean. Zenbat da $f^{-1}(26)$?', 'Sea $f(x)=x^2+1$ con $x\\ge 0$. ¿Cuánto vale $f^{-1}(26)$?', 'لتكن $f(x)=x^2+1$ مع $x\\ge 0$. كم تساوي $f^{-1}(26)$؟', 'Let $f(x)=x^2+1$ with $x\\ge 0$. What is $f^{-1}(26)$?'), expected: n(5), hint: say('Ebatzi $x^2+1=26$, $x\\ge 0$ izanik.', 'Resuelve $x^2+1=26$ con $x\\ge 0$.', 'حُلّ $x^2+1=26$ مع $x\\ge 0$.', 'Solve $x^2+1=26$ with $x\\ge 0$.'), explanation: same('$x^2=25\\ \\to\\ x=5$') },
    { id: 107, stage: 'exponential', points: 10, context: 'starter', prompt: say('$y=k\\cdot a^x$ funtzioa $(1,6)$ eta $(3,54)$ puntuetatik pasatzen da. Zenbat da $k$?', 'La función $y=k\\cdot a^x$ pasa por $(1,6)$ y $(3,54)$. ¿Cuánto vale $k$?', 'تمر $y=k\\cdot a^x$ بـ $(1,6)$ و$(3,54)$. كم تساوي $k$؟', 'The function $y=k\\cdot a^x$ passes through $(1,6)$ and $(3,54)$. What is $k$?'), expected: n(2), hint: same('$a^2=\\frac{54}{6}=9$'), explanation: same('$a=3\\qquad k=\\frac{6}{3}=2$') },
    { id: 108, stage: 'exponential', points: 20, context: 'advanced', prompt: say('500 bakterio daude, eta orduro hirukoizten dira. Zenbat izango dira 3 orduren buruan?', 'Hay 500 bacterias y se triplican cada hora. ¿Cuántas habrá a las 3 horas?', 'توجد 500 بكتيريا تتضاعف ثلاث مرات كل ساعة. كم ستصبح بعد 3 ساعات؟', 'There are 500 bacteria and they triple every hour. How many will there be after 3 hours?'), expected: n(13500), hint: same('$3^3=27$'), explanation: same('$500\\cdot 27=13\\,500$') },
    { id: 109, stage: 'exponential', points: 30, context: 'master', prompt: say('800 euroko mugikor batek % 25 galtzen du urtero. Zein urtetan (zenbaki osoa) balioko du 300 € baino gutxiago?', 'Un móvil de 800 € pierde un 25 % al año. ¿En qué año (número entero) valdrá menos de 300 €?', 'هاتف قيمته 800 € يفقد 25 % سنويًّا. في أي سنة (عدد صحيح) تصبح قيمته أقل من 300 €؟', 'An €800 phone loses 25 % a year. In which year (whole number) will it be worth less than €300?'), expected: n(4), hint: same('$0{,}75^t=\\frac{300}{800}$'), explanation: same('$t=\\frac{\\log 0{,}375}{\\log 0{,}75}\\approx 3{,}41\\ \\to\\ 4$') },
    { id: 110, stage: 'logarithmic', points: 10, context: 'starter', prompt: say('Ebatzi $\\log_2 x=5$.', 'Resuelve $\\log_2 x=5$.', 'حُلّ $\\log_2 x=5$.', 'Solve $\\log_2 x=5$.'), expected: n(32), hint: same('$x=2^5$'), explanation: same('$2^5=32$') },
    { id: 111, stage: 'logarithmic', points: 20, context: 'advanced', prompt: say('Ebatzi $\\log_3(x+1)=2$.', 'Resuelve $\\log_3(x+1)=2$.', 'حُلّ $\\log_3(x+1)=2$.', 'Solve $\\log_3(x+1)=2$.'), expected: n(8), hint: same('$x+1=3^2$'), explanation: same('$x+1=9\\ \\to\\ x=8$') },
    { id: 112, stage: 'logarithmic', points: 30, context: 'master', prompt: say('Ebatzi $2\\cdot 3^t=162$.', 'Resuelve $2\\cdot 3^t=162$.', 'حُلّ $2\\cdot 3^t=162$.', 'Solve $2\\cdot 3^t=162$.'), expected: n(4), hint: say('Lehenik isolatu berretura.', 'Primero aísla la potencia.', 'اعزل القوة أولًا.', 'First isolate the power.'), explanation: same('$3^t=81=3^4\\ \\to\\ t=4$') },
    { id: 113, stage: 'models', points: 10, context: 'starter', prompt: say('640 g substantzia bat dago, eta haren erdibizitza 5 urte da. Zenbat urtetan geratuko dira 40 g?', 'Hay 640 g de una sustancia con una semivida de 5 años. ¿En cuántos años quedarán 40 g?', 'يوجد 640 غ من مادة عمر نصفها 5 سنوات. بعد كم سنة يبقى 40 غ؟', 'There are 640 g of a substance with a half-life of 5 years. In how many years will 40 g be left?'), expected: n(20), hint: same('$\\frac{640}{40}=16=2^4$'), explanation: same('$4\\cdot 5=20$') },
    { id: 114, stage: 'models', points: 20, context: 'advanced', prompt: say('Biztanleria bat 12 urtean behin bikoizten da. Zenbat urtetan biderkatzen da 8 zenbakiaz?', 'Una población se duplica cada 12 años. ¿En cuántos años se multiplica por 8?', 'يتضاعف عدد سكان كل 12 سنة. في كم سنة يُضرب في 8؟', 'A population doubles every 12 years. In how many years is it multiplied by 8?'), expected: n(36), hint: same('$8=2^3$'), explanation: same('$3\\cdot 12=36$') },
    { id: 115, stage: 'models', points: 30, context: 'master', prompt: say('$f(x)=\\frac{900}{1+9\\cdot 3^{-x}}$ bada, zein $x$ baliorekin da $f(x)=450$?', 'Si $f(x)=\\frac{900}{1+9\\cdot 3^{-x}}$, ¿para qué $x$ es $f(x)=450$?', 'إذا كانت $f(x)=\\frac{900}{1+9\\cdot 3^{-x}}$ فعند أي $x$ تكون $f(x)=450$؟', 'If $f(x)=\\frac{900}{1+9\\cdot 3^{-x}}$, for which $x$ is $f(x)=450$?'), expected: n(2), hint: say('Izendatzaileak 2 izan behar du.', 'El denominador tiene que valer 2.', 'يجب أن يساوي المقام 2.', 'The denominator must be 2.'), explanation: same('$9\\cdot 3^{-x}=1\\ \\to\\ 3^x=9\\ \\to\\ x=2$') }
]

export const socExpExerciseBank: ExerciseSection[] = [
    {
        id: 'transforms',
        title: say('Transformazioak', 'Transformaciones', 'التحويلات', 'Transformations'),
        items: [
            { id: 1, difficulty: 'easy', question: say('Nola lortzen da $y=x^2-4$, $y=x^2$ funtziotik?', '¿Cómo se obtiene $y=x^2-4$ a partir de $y=x^2$?', 'كيف نحصل على $y=x^2-4$ من $y=x^2$؟', 'How do you get $y=x^2-4$ from $y=x^2$?'), solution: say('4 unitate jaitsita.', 'Bajándola 4 unidades.', 'بخفضه 4 وحدات.', 'By lowering it 4 units.') },
            { id: 2, difficulty: 'easy', question: say('Nola lortzen da $y=\\sqrt{x+5}$, $y=\\sqrt{x}$ funtziotik?', '¿Cómo se obtiene $y=\\sqrt{x+5}$ a partir de $y=\\sqrt{x}$?', 'كيف نحصل على $y=\\sqrt{x+5}$ من $y=\\sqrt{x}$؟', 'How do you get $y=\\sqrt{x+5}$ from $y=\\sqrt{x}$?'), solution: say('5 unitate ezkerrera.', 'Llevándola 5 unidades a la izquierda.', 'بنقله 5 وحدات إلى اليسار.', 'By moving it 5 units to the left.') },
            { id: 3, difficulty: 'easy', question: say('$f$ funtzioa $(4,-2)$ puntutik pasatzen da. Zein puntutatik pasatzen da $y=-f(x)$?', 'La gráfica de $f$ pasa por $(4,-2)$. ¿Por qué punto pasa $y=-f(x)$?', 'يمر رسم $f$ بالنقطة $(4,-2)$. بأي نقطة يمر $y=-f(x)$؟', 'The graph of $f$ passes through $(4,-2)$. Which point does $y=-f(x)$ pass through?'), solution: same('$(4,2)$') },
            { id: 4, difficulty: 'medium', question: say('$f$ funtzioa $(2,6)$ puntutik pasatzen da. Zein puntutatik pasatzen da $y=\\frac{1}{2}f(x)-1$?', 'La gráfica de $f$ pasa por $(2,6)$. ¿Por qué punto pasa $y=\\frac{1}{2}f(x)-1$?', 'يمر رسم $f$ بالنقطة $(2,6)$. بأي نقطة يمر $y=\\frac{1}{2}f(x)-1$؟', 'The graph of $f$ passes through $(2,6)$. Which point does $y=\\frac{1}{2}f(x)-1$ pass through?'), solution: same('$\\frac{1}{2}\\cdot 6-1=2\\ \\to\\ (2,2)$') },
            { id: 5, difficulty: 'medium', question: say('Idatzi $y=x^2-2x-3$ funtzioa $(x-m)^2+p$ moduan, eta eman erpina.', 'Escribe $y=x^2-2x-3$ como $(x-m)^2+p$ y da el vértice.', 'اكتب $y=x^2-2x-3$ على صورة $(x-m)^2+p$ واذكر الرأس.', 'Write $y=x^2-2x-3$ as $(x-m)^2+p$ and give the vertex.'), solution: same('$(x-1)^2-4\\ \\to\\ V(1,-4)$') },
            { id: 6, difficulty: 'medium', question: say('Zein da $y=x^2+10x+30$ parabolaren erpinaren ordenatua?', '¿Cuál es la ordenada del vértice de $y=x^2+10x+30$?', 'ما ترتيب رأس $y=x^2+10x+30$؟', 'What is the y-coordinate of the vertex of $y=x^2+10x+30$?'), solution: same('$(x+5)^2+5$'), answer: { expected: n(5) } },
            { id: 7, difficulty: 'medium', question: say('Zein dira $y=\\frac{2}{x-3}+1$ funtzioaren asintotak?', '¿Cuáles son las asíntotas de $y=\\frac{2}{x-3}+1$?', 'ما الخطان المقاربان لـ $y=\\frac{2}{x-3}+1$؟', 'What are the asymptotes of $y=\\frac{2}{x-3}+1$?'), solution: same('$x=3\\qquad y=1$') },
            { id: 8, difficulty: 'hard', question: say('Nola lortzen da $y=-(x+1)^2+4$, $y=x^2$ funtziotik?', '¿Cómo se obtiene $y=-(x+1)^2+4$ a partir de $y=x^2$?', 'كيف نحصل على $y=-(x+1)^2+4$ من $y=x^2$؟', 'How do you get $y=-(x+1)^2+4$ from $y=x^2$?'), solution: say('1 ezkerrera, X ardatzean islatuta eta 4 gora: erpina $(-1,4)$, adarrak behera.', '1 a la izquierda, reflejo en el eje X y 4 hacia arriba: vértice $(-1,4)$, ramas hacia abajo.', 'وحدة إلى اليسار، ثم انعكاس في محور X، ثم 4 إلى الأعلى: الرأس $(-1,4)$ والفرعان إلى الأسفل.', '1 to the left, reflection in the x-axis and 4 up: vertex $(-1,4)$, branches down.') },
            { id: 9, difficulty: 'hard', question: say('$f$ funtzioa $(-2,3)$ puntutik pasatzen da. Zein abzisa du $y=f(-x)+5$ funtzioaren puntu baliokideak?', 'La gráfica de $f$ pasa por $(-2,3)$. ¿Qué abscisa tiene el punto correspondiente de $y=f(-x)+5$?', 'يمر رسم $f$ بالنقطة $(-2,3)$. ما فاصلة النقطة المقابلة على $y=f(-x)+5$؟', 'The graph of $f$ passes through $(-2,3)$. What is the x-coordinate of the matching point of $y=f(-x)+5$?'), solution: same('$-x=-2\\ \\to\\ x=2$'), answer: { expected: n(2) } },
            { id: 10, difficulty: 'hard', question: say('Idatzi $y=\\frac{2x+5}{x+1}$ funtzioa $\\frac{k}{x-a}+b$ moduan.', 'Escribe $y=\\frac{2x+5}{x+1}$ como $\\frac{k}{x-a}+b$.', 'اكتب $y=\\frac{2x+5}{x+1}$ على صورة $\\frac{k}{x-a}+b$.', 'Write $y=\\frac{2x+5}{x+1}$ as $\\frac{k}{x-a}+b$.'), solution: same('$\\frac{2(x+1)+3}{x+1}=\\frac{3}{x+1}+2$') }
        ]
    },
    {
        id: 'composition',
        title: say('Konposizioa eta alderantzizkoa', 'Composición e inversa', 'التركيب والعكسية', 'Composition and inverse'),
        items: [
            { id: 11, difficulty: 'easy', question: say('$f(x)=x-4$ eta $g(x)=3x$ badira, aurkitu $(f\\circ g)(x)$.', 'Si $f(x)=x-4$ y $g(x)=3x$, halla $(f\\circ g)(x)$.', 'إذا كانت $f(x)=x-4$ و$g(x)=3x$ فأوجد $(f\\circ g)(x)$.', 'If $f(x)=x-4$ and $g(x)=3x$, find $(f\\circ g)(x)$.'), solution: same('$f(3x)=3x-4$') },
            { id: 12, difficulty: 'easy', question: say('Funtzio berekin, aurkitu $(g\\circ f)(x)$.', 'Con las mismas funciones, halla $(g\\circ f)(x)$.', 'بالدالتين نفسيهما أوجد $(g\\circ f)(x)$.', 'With the same functions, find $(g\\circ f)(x)$.'), solution: same('$g(x-4)=3x-12$') },
            { id: 13, difficulty: 'easy', question: say('Aurkitu $f(x)=x+9$ funtzioaren alderantzizkoa.', 'Halla la inversa de $f(x)=x+9$.', 'أوجد عكسية $f(x)=x+9$.', 'Find the inverse of $f(x)=x+9$.'), solution: same('$f^{-1}(x)=x-9$') },
            { id: 14, difficulty: 'medium', question: say('Aurkitu $f(x)=4x-3$ funtzioaren alderantzizkoa, eta egiaztatu $f(f^{-1}(x))=x$.', 'Halla la inversa de $f(x)=4x-3$ y comprueba que $f(f^{-1}(x))=x$.', 'أوجد عكسية $f(x)=4x-3$ وتحقق أن $f(f^{-1}(x))=x$.', 'Find the inverse of $f(x)=4x-3$ and check that $f(f^{-1}(x))=x$.'), solution: same('$f^{-1}(x)=\\frac{x+3}{4}\\qquad 4\\cdot\\frac{x+3}{4}-3=x$') },
            { id: 15, difficulty: 'medium', question: say('Denda batek deskontu bat ($g(x)=0{,}8x$, % 20) eta bidalketa ($f(x)=x+5$, 5 €) aplikatzen ditu. Zenbat ordaintzen da 50 euroko produktu batengatik, $f\\circ g$ eginda?', 'Una tienda aplica un 20 % de descuento ($g(x)=0{,}8x$) y 5 € de envío ($f(x)=x+5$). ¿Cuánto se paga por un artículo de 50 € con $f\\circ g$?', 'يطبّق متجر خصمًا 20 % ($g(x)=0{,}8x$) وشحنًا قدره 5 € ($f(x)=x+5$). كم يُدفع مقابل سلعة ثمنها 50 € مع $f\\circ g$؟', 'A shop applies a 20 % discount ($g(x)=0{,}8x$) and €5 delivery ($f(x)=x+5$). How much is paid for a €50 item with $f\\circ g$?'), solution: same('$0{,}8\\cdot 50+5=45$'), answer: { expected: n(45) } },
            { id: 16, difficulty: 'medium', question: say('Funtzio berekin, zenbat ordaintzen da $g\\circ f$ eginda?', 'Con las mismas funciones, ¿cuánto se paga con $g\\circ f$?', 'بالدالتين نفسيهما، كم يُدفع مع $g\\circ f$؟', 'With the same functions, how much is paid with $g\\circ f$?'), solution: same('$0{,}8\\cdot(50+5)=44$'), answer: { expected: n(44) } },
            { id: 17, difficulty: 'medium', question: say('$f$ funtzioaren grafikoa $(3,-1)$ puntutik pasatzen da. Zein puntutatik pasatzen da $f^{-1}$ funtzioarena?', 'La gráfica de $f$ pasa por $(3,-1)$. ¿Por qué punto pasa la de $f^{-1}$?', 'يمر رسم $f$ بالنقطة $(3,-1)$. بأي نقطة يمر رسم $f^{-1}$؟', 'The graph of $f$ passes through $(3,-1)$. Which point does that of $f^{-1}$ pass through?'), solution: same('$(-1,3)$') },
            { id: 18, difficulty: 'hard', question: say('Aurkitu $f(x)=\\frac{2x+1}{3}$ funtzioaren alderantzizkoa, eta kalkulatu $f^{-1}(5)$.', 'Halla la inversa de $f(x)=\\frac{2x+1}{3}$ y calcula $f^{-1}(5)$.', 'أوجد عكسية $f(x)=\\frac{2x+1}{3}$ واحسب $f^{-1}(5)$.', 'Find the inverse of $f(x)=\\frac{2x+1}{3}$ and work out $f^{-1}(5)$.'), solution: same('$f^{-1}(x)=\\frac{3x-1}{2}\\ \\to\\ \\frac{3\\cdot 5-1}{2}=7$'), answer: { expected: n(7) } },
            { id: 19, difficulty: 'hard', question: say('Aurkitu $y=x^2-4x$ funtzioaren $x\\ge 2$ adarraren alderantzizkoa.', 'Halla la inversa de la rama $x\\ge 2$ de $y=x^2-4x$.', 'أوجد عكسية الفرع $x\\ge 2$ من $y=x^2-4x$.', 'Find the inverse of the branch $x\\ge 2$ of $y=x^2-4x$.'), solution: same('$(x-2)^2=y+4\\ \\to\\ f^{-1}(x)=2+\\sqrt{x+4}$') },
            { id: 20, difficulty: 'hard', question: say('$f(x)=x+1$ bada, aurkitu $g$, $(g\\circ f)(x)=x^2+2x$ izan dadin.', 'Si $f(x)=x+1$, halla $g$ para que $(g\\circ f)(x)=x^2+2x$.', 'إذا كانت $f(x)=x+1$ فأوجد $g$ بحيث $(g\\circ f)(x)=x^2+2x$.', 'If $f(x)=x+1$, find $g$ so that $(g\\circ f)(x)=x^2+2x$.'), solution: say('$x^2+2x=(x+1)^2-1$, beraz $g(x)=x^2-1$.', '$x^2+2x=(x+1)^2-1$, así que $g(x)=x^2-1$.', '$x^2+2x=(x+1)^2-1$ إذن $g(x)=x^2-1$.', '$x^2+2x=(x+1)^2-1$, so $g(x)=x^2-1$.') }
        ]
    },
    {
        id: 'exponential',
        title: say('Funtzio esponentzialak', 'Funciones exponenciales', 'الدوال الأسية', 'Exponential functions'),
        items: [
            { id: 21, difficulty: 'easy', question: say('Gorakorra ala beherakorra da $y=0{,}7^x$?', '¿Es creciente o decreciente $y=0{,}7^x$?', 'هل $y=0{,}7^x$ متزايدة أم متناقصة؟', 'Is $y=0{,}7^x$ increasing or decreasing?'), solution: say('Beherakorra, $0<0{,}7<1$ delako.', 'Decreciente, porque $0<0{,}7<1$.', 'متناقصة لأن $0<0{,}7<1$.', 'Decreasing, because $0<0{,}7<1$.') },
            { id: 22, difficulty: 'easy', question: say('Kalkulatu $y=5^x$ funtzioaren balioa $x=-1$, $x=0$ eta $x=2$ direnean.', 'Calcula $y=5^x$ en $x=-1$, $x=0$ y $x=2$.', 'احسب $y=5^x$ عند $x=-1$ و$x=0$ و$x=2$.', 'Work out $y=5^x$ at $x=-1$, $x=0$ and $x=2$.'), solution: same('$\\frac{1}{5}\\qquad 1\\qquad 25$') },
            { id: 23, difficulty: 'easy', question: say('Zein zenbakiz biderkatzen da urtero, % 6 jaisten bada?', '¿Por qué número se multiplica cada año si baja un 6 %?', 'في أي عدد نضرب كل سنة إذا نقصت 6 %؟', 'What number is it multiplied by each year if it falls 6 %?'), solution: same('$1-0{,}06=0{,}94$'), answer: { expected: v('0,94') } },
            { id: 24, difficulty: 'medium', question: say('2000 euroko aurrezkiek % 5 egiten dute gora urtero. Zenbat izango dira 2 urteren buruan?', 'Unos ahorros de 2000 € suben un 5 % al año. ¿Cuánto habrá a los 2 años?', 'مدّخرات قيمتها 2000 € تزيد 5 % سنويًّا. كم ستصبح بعد سنتين؟', 'Savings of €2,000 grow 5 % a year. How much will there be after 2 years?'), solution: same('$2000\\cdot 1{,}05^2=2205$'), answer: { expected: n(2205) } },
            { id: 25, difficulty: 'medium', question: say('Makina batek 30 000 € balio ditu, eta % 10 galtzen du urtero. Idatzi haren balioa $t$ urteren buruan.', 'Una máquina vale 30 000 € y pierde un 10 % al año. Escribe su valor a los $t$ años.', 'آلة قيمتها 30 000 € تفقد 10 % سنويًّا. اكتب قيمتها بعد $t$ سنة.', 'A machine is worth €30,000 and loses 10 % a year. Write its value after $t$ years.'), solution: same('$V(t)=30\\,000\\cdot 0{,}9^t$') },
            { id: 26, difficulty: 'medium', question: say('$y=k\\cdot a^x$ funtzioa $(0,4)$ eta $(1,10)$ puntuetatik pasatzen da. Zenbat da $a$?', 'La función $y=k\\cdot a^x$ pasa por $(0,4)$ y $(1,10)$. ¿Cuánto vale $a$?', 'تمر $y=k\\cdot a^x$ بـ $(0,4)$ و$(1,10)$. كم تساوي $a$؟', 'The function $y=k\\cdot a^x$ passes through $(0,4)$ and $(1,10)$. What is $a$?'), solution: same('$a=\\frac{10}{4}=2{,}5$'), answer: { expected: v('2,5') } },
            { id: 27, difficulty: 'medium', question: say('Biztanleria batek % 3 galtzen du urtero. Zer ehuneko geratzen da 2 urteren buruan?', 'Una población pierde un 3 % al año. ¿Qué porcentaje queda a los 2 años?', 'يفقد عدد سكان 3 % سنويًّا. أي نسبة تبقى بعد سنتين؟', 'A population loses 3 % a year. What percentage is left after 2 years?'), solution: same('$0{,}97^2=0{,}9409\\ \\to\\ 94{,}09$'), answer: { expected: v('94,09') } },
            { id: 28, difficulty: 'hard', question: say('$y=k\\cdot a^x$ funtzioa $(2,12)$ eta $(4,48)$ puntuetatik pasatzen da, $a>0$ izanik. Aurkitu $k$ eta $a$.', 'La función $y=k\\cdot a^x$ pasa por $(2,12)$ y $(4,48)$, con $a>0$. Halla $k$ y $a$.', 'تمر $y=k\\cdot a^x$ بـ $(2,12)$ و$(4,48)$ مع $a>0$. أوجد $k$ و$a$.', 'The function $y=k\\cdot a^x$ passes through $(2,12)$ and $(4,48)$, with $a>0$. Find $k$ and $a$.'), solution: same('$a^2=\\frac{48}{12}=4\\ \\to\\ a=2\\qquad k=\\frac{12}{4}=3$') },
            { id: 29, difficulty: 'hard', question: say('Bi datu: $(0,50)$ eta $(1,60)$. Alderatu zuzena eta esponentziala $x=5$ denean.', 'Dos datos: $(0,50)$ y $(1,60)$. Compara la recta y la exponencial en $x=5$.', 'بيانتان: $(0,50)$ و$(1,60)$. قارن المستقيم والأسية عند $x=5$.', 'Two data: $(0,50)$ and $(1,60)$. Compare the line and the exponential at $x=5$.'), solution: same('$50+10\\cdot 5=100\\qquad 50\\cdot 1{,}2^5=124{,}416$') },
            { id: 30, difficulty: 'hard', question: say('Prezio batek % 50 gora egin zuen, eta gero % 50 behera. Zer ehuneko da prezio berria hasierakoarekiko?', 'Un precio subió un 50 % y después bajó un 50 %. ¿Qué porcentaje es el precio nuevo respecto del inicial?', 'ارتفع سعر 50 % ثم انخفض 50 %. أي نسبة يمثّل السعر الجديد من الأول؟', 'A price rose 50 % and then fell 50 %. What percentage of the starting price is the new price?'), solution: same('$1{,}5\\cdot 0{,}5=0{,}75\\ \\to\\ 75$'), answer: { expected: n(75) } }
        ]
    },
    {
        id: 'logarithmic',
        title: say('Funtzio logaritmikoak', 'Funciones logarítmicas', 'الدوال اللوغاريتمية', 'Logarithmic functions'),
        items: [
            { id: 31, difficulty: 'easy', question: say('Kalkulatu $\\log_3 9$.', 'Calcula $\\log_3 9$.', 'احسب $\\log_3 9$.', 'Work out $\\log_3 9$.'), solution: same('$3^2=9$'), answer: { expected: n(2) } },
            { id: 32, difficulty: 'easy', question: say('Kalkulatu $\\log 0{,}01$.', 'Calcula $\\log 0{,}01$.', 'احسب $\\log 0{,}01$.', 'Work out $\\log 0{,}01$.'), solution: same('$10^{-2}=0{,}01$'), answer: { expected: n(-2) } },
            { id: 33, difficulty: 'easy', question: say('Zein da $y=\\log(x+4)$ funtzioaren izate-eremua?', '¿Cuál es el dominio de $y=\\log(x+4)$?', 'ما مجال $y=\\log(x+4)$؟', 'What is the domain of $y=\\log(x+4)$?'), solution: same('$x+4>0\\ \\to\\ (-4,+\\infty)$') },
            { id: 34, difficulty: 'medium', question: say('Ebatzi $\\log_2(x-3)=4$.', 'Resuelve $\\log_2(x-3)=4$.', 'حُلّ $\\log_2(x-3)=4$.', 'Solve $\\log_2(x-3)=4$.'), solution: same('$x-3=16\\ \\to\\ x=19$'), answer: { expected: n(19) } },
            { id: 35, difficulty: 'medium', question: say('Kalkulagailuarekin, kalkulatu $\\log_2 10$ bi hamartarrekin.', 'Con la calculadora, calcula $\\log_2 10$ con dos decimales.', 'بالآلة الحاسبة احسب $\\log_2 10$ بمنزلتين عشريتين.', 'With the calculator, work out $\\log_2 10$ to two decimal places.'), solution: same('$\\frac{\\log 10}{\\log 2}\\approx 3{,}32$') },
            { id: 36, difficulty: 'medium', question: say('Ebatzi $5^t=625$.', 'Resuelve $5^t=625$.', 'حُلّ $5^t=625$.', 'Solve $5^t=625$.'), solution: same('$625=5^4\\ \\to\\ t=4$'), answer: { expected: n(4) } },
            { id: 37, difficulty: 'medium', question: say('Aurkitu $y=\\log_2 x+3$ funtzioaren alderantzizkoa.', 'Halla la inversa de $y=\\log_2 x+3$.', 'أوجد عكسية $y=\\log_2 x+3$.', 'Find the inverse of $y=\\log_2 x+3$.'), solution: same('$x=2^{y-3}\\ \\to\\ f^{-1}(x)=2^{x-3}$') },
            { id: 38, difficulty: 'hard', question: say('Ebatzi $1{,}5^t=4$, bi hamartarrekin.', 'Resuelve $1{,}5^t=4$ con dos decimales.', 'حُلّ $1{,}5^t=4$ بمنزلتين عشريتين.', 'Solve $1{,}5^t=4$ to two decimal places.'), solution: same('$t=\\frac{\\log 4}{\\log 1{,}5}\\approx 3{,}42$') },
            { id: 39, difficulty: 'hard', question: say('Zein puntutan mozten du X ardatza $y=\\log_3(x-1)-2$ funtzioak?', '¿En qué punto corta al eje X la función $y=\\log_3(x-1)-2$?', 'في أي نقطة تقطع $y=\\log_3(x-1)-2$ محور X؟', 'Where does $y=\\log_3(x-1)-2$ cut the x-axis?'), solution: same('$\\log_3(x-1)=2\\ \\to\\ x-1=9\\ \\to\\ x=10$'), answer: { expected: n(10) } },
            { id: 40, difficulty: 'hard', question: say('3000 euroko aurrezkiek % 4 egiten dute gora urtero. Zein urtetan (zenbaki osoa) gaindituko dituzte 4000 €?', 'Unos ahorros de 3000 € suben un 4 % al año. ¿En qué año (número entero) pasarán de 4000 €?', 'مدّخرات قيمتها 3000 € تزيد 4 % سنويًّا. في أي سنة (عدد صحيح) تتجاوز 4000 €؟', 'Savings of €3,000 grow 4 % a year. In which year (whole number) will they pass €4,000?'), solution: same('$t=\\frac{\\log\\frac{4}{3}}{\\log 1{,}04}\\approx 7{,}33\\ \\to\\ 8$'), answer: { expected: n(8) } }
        ]
    },
    {
        id: 'models',
        title: say('Ereduak', 'Modelos', 'النماذج', 'Models'),
        items: [
            { id: 41, difficulty: 'easy', question: say('Kopuru bat 5 urtean behin bikoizten da. Zenbat aldiz handiagoa da 15 urteren buruan?', 'Una cantidad se duplica cada 5 años. ¿Por cuánto queda multiplicada a los 15 años?', 'تتضاعف كمية كل 5 سنوات. في كم تُضرب بعد 15 سنة؟', 'An amount doubles every 5 years. What is it multiplied by after 15 years?'), solution: same('$2^3=8$'), answer: { expected: n(8) } },
            { id: 42, difficulty: 'easy', question: say('1000 mg sendagai, eta erdibizitza 4 ordu. Zenbat mg geratzen dira 8 orduren buruan?', '1000 mg de un fármaco con semivida de 4 horas. ¿Cuántos mg quedan a las 8 horas?', '1000 ملغ من دواء عمر نصفه 4 ساعات. كم ملغ يبقى بعد 8 ساعات؟', '1,000 mg of a medicine with a half-life of 4 hours. How many mg are left after 8 hours?'), solution: same('$1000\\cdot\\left(\\frac{1}{2}\\right)^2=250$'), answer: { expected: n(250) } },
            { id: 43, difficulty: 'easy', question: say('$f(x)=\\frac{400}{1+3\\cdot 2^{-x}}$ bada, zein da sabaia?', 'Si $f(x)=\\frac{400}{1+3\\cdot 2^{-x}}$, ¿cuál es el techo?', 'إذا كانت $f(x)=\\frac{400}{1+3\\cdot 2^{-x}}$ فما السقف؟', 'If $f(x)=\\frac{400}{1+3\\cdot 2^{-x}}$, what is the ceiling?'), solution: say('$2^{-x}$ 0 baliora hurbiltzen da: 400.', '$2^{-x}$ se acerca a 0: 400.', '$2^{-x}$ يقترب من 0: ‏400.', '$2^{-x}$ approaches 0: 400.'), answer: { expected: n(400) } },
            { id: 44, difficulty: 'medium', question: say('Biztanleria bat % 2 hazten da urtero. Zenbat urtetan bikoizten da (bi hamartarrekin)?', 'Una población crece un 2 % al año. ¿En cuántos años se duplica (con dos decimales)?', 'ينمو عدد سكان 2 % سنويًّا. في كم سنة يتضاعف (بمنزلتين عشريتين)؟', 'A population grows 2 % a year. In how many years does it double (to two decimal places)?'), solution: same('$T=\\frac{\\log 2}{\\log 1{,}02}\\approx 35{,}00$') },
            { id: 45, difficulty: 'medium', question: say('Substantzia batek % 10 galtzen du urtero. Zenbat urtetan erdiratzen da (bi hamartarrekin)?', 'Una sustancia pierde un 10 % al año. ¿En cuántos años se reduce a la mitad (con dos decimales)?', 'تفقد مادة 10 % سنويًّا. في كم سنة تنقص إلى النصف (بمنزلتين عشريتين)؟', 'A substance loses 10 % a year. In how many years does it halve (to two decimal places)?'), solution: same('$T=\\frac{\\log 0{,}5}{\\log 0{,}9}\\approx 6{,}58$') },
            { id: 46, difficulty: 'medium', question: say('$f(x)=\\frac{400}{1+3\\cdot 2^{-x}}$ bada, zenbat da $f(0)$?', 'Si $f(x)=\\frac{400}{1+3\\cdot 2^{-x}}$, ¿cuánto vale $f(0)$?', 'إذا كانت $f(x)=\\frac{400}{1+3\\cdot 2^{-x}}$ فكم تساوي $f(0)$؟', 'If $f(x)=\\frac{400}{1+3\\cdot 2^{-x}}$, what is $f(0)$?'), solution: same('$\\frac{400}{1+3}=100$'), answer: { expected: n(100) } },
            { id: 47, difficulty: 'medium', question: say('$R(t)=95-30\\log(t+1)$ bada, zenbat da $R(9)$?', 'Si $R(t)=95-30\\log(t+1)$, ¿cuánto vale $R(9)$?', 'إذا كانت $R(t)=95-30\\log(t+1)$ فكم تساوي $R(9)$؟', 'If $R(t)=95-30\\log(t+1)$, what is $R(9)$?'), solution: same('$95-30\\cdot 1=65$'), answer: { expected: n(65) } },
            { id: 48, difficulty: 'hard', question: say('$f(x)=\\frac{400}{1+3\\cdot 2^{-x}}$ bada, zein $x$ baliorekin da $f(x)=200$ (bi hamartarrekin)?', 'Si $f(x)=\\frac{400}{1+3\\cdot 2^{-x}}$, ¿para qué $x$ es $f(x)=200$ (con dos decimales)?', 'إذا كانت $f(x)=\\frac{400}{1+3\\cdot 2^{-x}}$ فعند أي $x$ تكون $f(x)=200$ (بمنزلتين عشريتين)؟', 'If $f(x)=\\frac{400}{1+3\\cdot 2^{-x}}$, for which $x$ is $f(x)=200$ (to two decimal places)?'), solution: same('$2^x=3\\ \\to\\ x=\\frac{\\log 3}{\\log 2}\\approx 1{,}58$') },
            { id: 49, difficulty: 'hard', question: say('$C(x)=100+50\\log x$ bada, zenbat da $x$, $C(x)=250$ izateko?', 'Si $C(x)=100+50\\log x$, ¿cuánto vale $x$ para que $C(x)=250$?', 'إذا كانت $C(x)=100+50\\log x$ فكم تساوي $x$ لتكون $C(x)=250$؟', 'If $C(x)=100+50\\log x$, what is $x$ for $C(x)=250$?'), solution: same('$50\\log x=150\\ \\to\\ \\log x=3\\ \\to\\ x=1000$'), answer: { expected: n(1000) } },
            { id: 50, difficulty: 'hard', question: say('Bakterio-kolonia bat 3 orduan behin bikoizten da. Zenbat ordutan biderkatzen da 32 zenbakiaz?', 'Una colonia de bacterias se duplica cada 3 horas. ¿En cuántas horas se multiplica por 32?', 'تتضاعف مستعمرة بكتيريا كل 3 ساعات. في كم ساعة تُضرب في 32؟', 'A colony of bacteria doubles every 3 hours. In how many hours is it multiplied by 32?'), solution: same('$32=2^5\\qquad 5\\cdot 3=15$'), answer: { expected: n(15) } }
        ]
    }
]

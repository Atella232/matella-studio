import { fraction, type FractionValue } from '../../features/unit-v2/math/fraction.ts'
import type { ChallengeItem, DiagnosticQuestion, ExerciseSection, LocalizedText, PracticeItem } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Ekuazioak eta inekuazioak · 4. DBH akademikoak — diagnostic, guided
   practice, exercise bank and challenges, after Santillana 4.º Académicas
   unit 4 (x⁴ − 13x² + 36, x⁴ − 20x² + 64, first-degree equations with
   brackets) and the equations and inequalities of Anaya 4.º Académicas
   unit 3 (2x² − 50, 10x² − 3x − 1, the triangle 9-12-15, 4x⁴ + 19x² − 5,
   √(20 − x) = x − 8, 2ˣ + 2ˣ⁺³ = 36, 5ˣ = 193, log x + log (x − 3) = 1,
   x² − 8x < 12, the football match, x² − 5x + 4 against a line). Every
   closed answer is a single number: a solution, how many there are, a
   parameter, an end of an interval or how many whole numbers it holds.
   ========================================================================== */

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar: ar.replace(/\{,\}/g, '.') })
/** Same formula everywhere, decimal point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, ar: value.replace(/\{,\}/g, '.') })
const n = (value: number) => fraction(value)
const f = (numerator: number, denominator: number) => fraction(numerator, denominator)
const v = (text: string): FractionValue => {
    const negative = text.startsWith('-')
    const [whole, decimals = ''] = text.replace('-', '').split(',')
    return fraction((negative ? -1 : 1) * Number(whole + decimals), 10 ** decimals.length)
}

/** «Solve …» followed by what to give */
const solve = (equation: string, ask: LocalizedText) => say(`Ebatzi ${equation}. ${ask.eu}`, `Resuelve ${equation}. ${ask.es}`, `حل ${equation}. ${ask.ar}`)
const POSITIVE = say('Eman ebazpen positiboa.', 'Da la solución positiva.', 'أعطِ الحل الموجب.')
const GREATEST = say('Zein da ebazpenik handiena?', '¿Cuál es la mayor solución?', 'ما أكبر حل؟')
const SMALLEST = say('Zein da ebazpenik txikiena?', '¿Cuál es la menor solución?', 'ما أصغر حل؟')
const HOW_MANY = say('Zenbat ebazpen erreal ditu?', '¿Cuántas soluciones reales tiene?', 'كم حلًا حقيقيًا لها؟')
const SUM = say('Zenbat dira ebazpenak guztira?', '¿Cuánto suman sus soluciones?', 'ما مجموع حلولها؟')
const ONLY = say('Zein da ebazpena?', '¿Cuál es la solución?', 'ما الحل؟')
const END = say('Zein da ebazpen-tartearen muturra?', '¿Cuál es el extremo del intervalo solución?', 'ما طرف مجال الحل؟')
const TOP_INTEGER = say('Zein da hura betetzen duen zenbaki osorik handiena?', '¿Cuál es el mayor número entero que la cumple?', 'ما أكبر عدد صحيح يحققها؟')
const LOW_INTEGER = say('Zein da hura betetzen duen zenbaki osorik txikiena?', '¿Cuál es el menor número entero que la cumple?', 'ما أصغر عدد صحيح يحققها؟')
const AS_FRACTION = say('Eman zatiki gisa.', 'Dalo como fracción.', 'اكتبه كسرًا.')
const and = (first: LocalizedText, second: LocalizedText) => say(`${first.eu} ${second.eu}`, `${first.es} ${second.es}`, `${first.ar} ${second.ar}`)

export const equationsInequalitiesDiagnostic: DiagnosticQuestion[] = [
    {
        id: 5201,
        prompt: say('Zenbat ebazpen ditu $3x^{2}+5x+11=0$ ekuazioak?', '¿Cuántas soluciones tiene $3x^{2}+5x+11=0$?', 'كم حلًا للمعادلة $3x^{2}+5x+11=0$؟'),
        options: [same('$0$'), same('$1$'), same('$2$')],
        correctIndex: 0,
        explanation: say('$\\Delta=25-132=-107<0$: ebazpenik ez.', '$\\Delta=25-132=-107<0$: ninguna.', '$\\Delta=25-132=-107<0$: لا حل.'),
        topic: 'quadratic-formula'
    },
    {
        id: 5202,
        prompt: say('$x^{2}-7x+10=0$ ekuazioaren erroen batura…', 'Las raíces de $x^{2}-7x+10=0$ suman…', 'مجموع جذري $x^{2}-7x+10=0$…'),
        options: [same('$10$'), same('$7$'), same('$-7$')],
        correctIndex: 1,
        explanation: say('Batura $-\\frac{b}{a}=7$: erroak 2 eta 5 dira.', 'La suma es $-\\frac{b}{a}=7$: las raíces son 2 y 5.', 'المجموع $-\\frac{b}{a}=7$: الجذران 2 و5.'),
        topic: 'roots-relations'
    },
    {
        id: 5203,
        prompt: say('Zenbat ebazpen erreal ditu $x^{4}-10x^{2}+9=0$ ekuazioak?', '¿Cuántas soluciones reales tiene $x^{4}-10x^{2}+9=0$?', 'كم حلًا حقيقيًا للمعادلة $x^{4}-10x^{2}+9=0$؟'),
        options: [same('$2$'), same('$3$'), same('$4$')],
        correctIndex: 2,
        explanation: say('$t=9$ eta $t=1$: $x=\\pm 3$ eta $x=\\pm 1$.', '$t=9$ y $t=1$: $x=\\pm 3$ y $x=\\pm 1$.', '$t=9$ و$t=1$: $x=\\pm 3$ و$x=\\pm 1$.'),
        topic: 'biquadratic'
    },
    {
        id: 5204,
        prompt: say('$\\frac{x}{x-2}+\\frac{2}{x}=\\frac{4}{x(x-2)}$ ebaztean $x=2$ eta $x=-4$ ateratzen dira. Zein da ebazpena?', 'Al resolver $\\frac{x}{x-2}+\\frac{2}{x}=\\frac{4}{x(x-2)}$ salen $x=2$ y $x=-4$. ¿Cuál es solución?', 'عند حل $\\frac{x}{x-2}+\\frac{2}{x}=\\frac{4}{x(x-2)}$ نحصل على $x=2$ و$x=-4$. أيهما حل؟'),
        options: [same('$x=-4$'), same('$x=2$'), say('Biak', 'Las dos', 'كلاهما')],
        correctIndex: 0,
        explanation: say('$x=2$ denean izendatzailea 0 da.', 'Para $x=2$ el denominador es 0.', 'عندما $x=2$ يكون المقام 0.'),
        topic: 'rational'
    },
    {
        id: 5205,
        prompt: say('$\\sqrt{x+2}=x$ karratura jasotzean $x=2$ eta $x=-1$ ateratzen dira. Zein da ebazpena?', 'Al elevar al cuadrado $\\sqrt{x+2}=x$ salen $x=2$ y $x=-1$. ¿Cuál es solución?', 'عند تربيع $\\sqrt{x+2}=x$ نحصل على $x=2$ و$x=-1$. أيهما حل؟'),
        options: [same('$x=-1$'), same('$x=2$'), say('Biak', 'Las dos', 'كلاهما')],
        correctIndex: 1,
        explanation: say('$\\sqrt{1}=1\\neq -1$, baina $\\sqrt{4}=2$.', '$\\sqrt{1}=1\\neq -1$, pero $\\sqrt{4}=2$.', '$\\sqrt{1}=1\\neq -1$، لكن $\\sqrt{4}=2$.'),
        topic: 'radical'
    },
    {
        id: 5206,
        prompt: say('Ebatzi $2^{x+1}=\\frac{1}{8}$.', 'Resuelve $2^{x+1}=\\frac{1}{8}$.', 'حل $2^{x+1}=\\frac{1}{8}$.'),
        options: [same('$x=3$'), same('$x=-3$'), same('$x=-4$')],
        correctIndex: 2,
        explanation: say('$\\frac{1}{8}=2^{-3}$, beraz $x+1=-3$.', '$\\frac{1}{8}=2^{-3}$, así que $x+1=-3$.', '$\\frac{1}{8}=2^{-3}$، إذن $x+1=-3$.'),
        topic: 'exponential'
    },
    {
        id: 5207,
        prompt: say('$-2x>6$ inekuazioaren ebazpena…', 'La solución de $-2x>6$ es…', 'حل $-2x>6$ هو…'),
        options: [same('$x<-3$'), same('$x>-3$'), same('$x<3$')],
        correctIndex: 0,
        explanation: say('$-2$-z zatitzean zentzua aldatzen da.', 'Al dividir entre $-2$ cambia el sentido.', 'عند القسمة على $-2$ ينقلب الاتجاه.'),
        topic: 'linear-inequality'
    },
    {
        id: 5208,
        prompt: say('$x^{2}-4<0$ inekuazioaren ebazpena…', 'La solución de $x^{2}-4<0$ es…', 'حل $x^{2}-4<0$ هو…'),
        options: [same('$(-\\infty,-2)\\cup(2,+\\infty)$'), same('$(-2,2)$'), same('$[-2,2]$')],
        correctIndex: 1,
        explanation: say('Erroak $\\pm 2$; parabola negatiboa haien artean, eta muturrak ez dira sartzen.', 'Raíces $\\pm 2$; la parábola es negativa entre ellas, y los extremos no entran.', 'الجذران $\\pm 2$؛ والقطع سالب بينهما، والطرفان خارج.'),
        topic: 'quadratic-inequality'
    }
]

export const equationsInequalitiesPractice: PracticeItem[] = [
    /* ---------- Second-degree equations ---------- */
    { id: 1, stage: 'quadratic', prompt: solve('$2x^{2}-50=0$', POSITIVE), expected: n(5), hint: say('Bakandu $x^{2}$.', 'Despeja $x^{2}$.', 'اعزل $x^{2}$.'), explanation: same('$x^{2}=25\\ \\to\\ x=\\pm 5$') },
    { id: 2, stage: 'quadratic', prompt: solve('$10x^{2}-3x-1=0$', POSITIVE), expected: f(1, 2), hint: say('$\\Delta=9+40=49$', '$\\Delta=9+40=49$', '$\\Delta=9+40=49$'), explanation: same('$x=\\frac{3+7}{20}=\\frac{1}{2}$') },
    { id: 3, stage: 'quadratic', prompt: say('k-ren zein baliotarako du $x^{2}-6x+k=0$ ekuazioak erro bikoitza?', '¿Para qué valor de k tiene $x^{2}-6x+k=0$ una raíz doble?', 'لأي قيمة لـ k يكون للمعادلة $x^{2}-6x+k=0$ جذر مضاعف؟'), expected: n(9), hint: say('Diskriminatzailea 0.', 'Discriminante igual a 0.', 'المميّز يساوي 0.'), explanation: same('$36-4k=0\\ \\to\\ k=9$') },
    { id: 4, stage: 'quadratic', prompt: say('Triangelu angeluzuzen baten aldeak x, $x+3$ eta $x+6$ cm dira. Zenbat neurtzen du hipotenusak?', 'Los lados de un triángulo rectángulo miden x, $x+3$ y $x+6$ cm. ¿Cuánto mide la hipotenusa?', 'أضلاع مثلث قائم x و$x+3$ و$x+6$ سم. كم طول الوتر؟'), expected: n(15), hint: say('$(x+6)^{2}=x^{2}+(x+3)^{2}$', '$(x+6)^{2}=x^{2}+(x+3)^{2}$', '$(x+6)^{2}=x^{2}+(x+3)^{2}$'), explanation: same('$x^{2}-6x-27=0\\ \\to\\ x=9\\qquad 9+6=15$') },

    /* ---------- Other polynomial equations ---------- */
    { id: 5, stage: 'other', prompt: solve('$x^{4}-13x^{2}+36=0$', GREATEST), expected: n(3), hint: say('$t=x^{2}$ aldaketa.', 'Cambio $t=x^{2}$.', 'التعويض $t=x^{2}$.'), explanation: same('$t^{2}-13t+36=0\\ \\to\\ t=9,\\ t=4\\qquad x=\\pm 3,\\ \\pm 2$') },
    { id: 6, stage: 'other', prompt: say(`${'$4x^{4}+19x^{2}-5=0$'}. Zenbat ebazpen erreal ditu?`, `${'$4x^{4}+19x^{2}-5=0$'}. ¿Cuántas soluciones reales tiene?`, `${'$4x^{4}+19x^{2}-5=0$'}. كم حلًا حقيقيًا لها؟`), expected: n(2), hint: say('$t=\\frac{1}{4}$ edo $t=-5$.', '$t=\\frac{1}{4}$ o $t=-5$.', '$t=\\frac{1}{4}$ أو $t=-5$.'), explanation: say('$t=-5$ ez da baliozkoa: $x=\\pm\\frac{1}{2}$, 2 ebazpen.', '$t=-5$ no vale: $x=\\pm\\frac{1}{2}$, 2 soluciones.', '$t=-5$ لا يصلح: $x=\\pm\\frac{1}{2}$، حلّان (2).') },
    { id: 7, stage: 'other', prompt: solve('$x^{3}-4x^{2}+x+6=0$', SUM), expected: n(4), hint: say('Probatu $-1$ eta jarraitu Ruffiniz.', 'Prueba con $-1$ y sigue con Ruffini.', 'جرّب $-1$ وتابع بروفيني.'), explanation: same('$(x+1)(x-2)(x-3)=0\\qquad -1+2+3=4$') },
    { id: 8, stage: 'other', prompt: say('Ebatzi $\\frac{1}{x}+\\frac{1}{x+1}=\\frac{3}{2}$. Eman ebazpen negatiboa zatiki gisa.', 'Resuelve $\\frac{1}{x}+\\frac{1}{x+1}=\\frac{3}{2}$. Da la solución negativa como fracción.', 'حل $\\frac{1}{x}+\\frac{1}{x+1}=\\frac{3}{2}$. أعطِ الحل السالب كسرًا.'), expected: f(-2, 3), hint: say('Bider $2x(x+1)$.', 'Por $2x(x+1)$.', 'في $2x(x+1)$.'), explanation: same('$3x^{2}-x-2=0\\qquad \\frac{1-5}{6}=-\\frac{2}{3}$') },

    /* ---------- Radical, exponential and logarithmic ---------- */
    { id: 9, stage: 'exponential', prompt: solve('$\\sqrt{20-x}=x-8$', ONLY), expected: n(11), hint: say('Karratura jaso eta egiaztatu: 4 eta 11 ateratzen dira.', 'Eleva al cuadrado y comprueba: salen 4 y 11.', 'ربّع وتحقّق: يظهر 4 و11.'), explanation: same('$\\sqrt{20-11}=3=11-8$') },
    { id: 10, stage: 'exponential', prompt: solve('$3^{x+1}+3^{x}=108$', ONLY), expected: n(3), hint: say('$3^{x+1}=3\\cdot 3^{x}$', '$3^{x+1}=3\\cdot 3^{x}$', '$3^{x+1}=3\\cdot 3^{x}$'), explanation: same('$\\frac{108}{4}=27=3^{3}$') },
    { id: 11, stage: 'exponential', prompt: solve('$2^{x+1}=\\frac{1}{8}$', ONLY), expected: n(-4), hint: say('$\\frac{1}{8}=2^{-3}$', '$\\frac{1}{8}=2^{-3}$', '$\\frac{1}{8}=2^{-3}$'), explanation: same('$\\frac{1}{8}=2^{-3}\\qquad -3-1=-4$') },
    { id: 12, stage: 'exponential', prompt: solve('$\\log_3 (x+1)+\\log_3 (x-1)=1$', ONLY), expected: n(2), hint: say('$(x+1)(x-1)=3$', '$(x+1)(x-1)=3$', '$(x+1)(x-1)=3$'), explanation: say('$x^{2}=4$; $-2$ ez da baliozkoa: $x=2$.', '$x^{2}=4$; $-2$ no vale: $x=2$.', '$x^{2}=4$؛ و$-2$ لا يصلح: $x=2$.') },

    /* ---------- First-degree inequalities ---------- */
    { id: 13, stage: 'inequalities', prompt: say(`${'$3x+2<10$'}. Zein da hura betetzen duen zenbaki osorik handiena?`, `${'$3x+2<10$'}. ¿Cuál es el mayor número entero que la cumple?`, `${'$3x+2<10$'}. ما أكبر عدد صحيح يحققها؟`), expected: n(2), hint: say('$x<\\frac{8}{3}$', '$x<\\frac{8}{3}$', '$x<\\frac{8}{3}$'), explanation: say('$\\frac{8}{3}\\approx 2{,}67$: osoa, 2.', '$\\frac{8}{3}\\approx 2{,}67$: el entero, 2.', '$\\frac{8}{3}\\approx 2{,}67$: العدد الصحيح 2.') },
    { id: 14, stage: 'inequalities', prompt: solve('$\\frac{x-1}{2}-\\frac{x+3}{3}\\ge 1$', END), expected: n(15), hint: say('Bider 6.', 'Por 6.', 'في 6.'), explanation: same('$3(x-1)-2(x+3)\\ge 6\\ \\to\\ x\\ge 15$') },
    { id: 15, stage: 'inequalities', prompt: solve('$-2x+7>\\frac{x}{2}-3$', TOP_INTEGER), expected: n(3), hint: say('Bider 2 eta kontuz $-5$-ekin.', 'Por 2 y cuidado con el $-5$.', 'في 2 وانتبه لـ$-5$.'), explanation: same('$-5x>-20\\ \\to\\ x<4\\qquad 3<4$') },
    { id: 16, stage: 'inequalities', prompt: say('Tarifa batek 20 € balio du hilean gehi 0,10 € minutuko. Gehienez zenbat minutu hitz egin daitezke 35 € ez gainditzeko?', 'Una tarifa cuesta 20 € al mes más 0,10 € por minuto. ¿Cuántos minutos como máximo se pueden hablar para no pasar de 35 €?', 'يكلف عرض 20 € شهريًا زائد 0,10 € للدقيقة. كم دقيقة على الأكثر يمكن التحدث كي لا نتجاوز 35 €؟'), expected: n(150), hint: say('$20+0{,}1x\\le 35$', '$20+0{,}1x\\le 35$', '$20+0{,}1x\\le 35$'), explanation: same('$0{,}1x\\le 15\\ \\to\\ x\\le 150$') },

    /* ---------- Second-degree inequalities and systems ---------- */
    { id: 17, stage: 'quadratic-inequalities', prompt: say(`${'$x^{2}-2x-3\\le 0$'}. Zenbat zenbaki osok betetzen dute?`, `${'$x^{2}-2x-3\\le 0$'}. ¿Cuántos números enteros la cumplen?`, `${'$x^{2}-2x-3\\le 0$'}. كم عددًا صحيحًا يحققها؟`), expected: n(5), hint: say('Erroak $-1$ eta 3.', 'Raíces $-1$ y 3.', 'الجذران $-1$ و3.'), explanation: say('$[-1,3]$: $-1$, 0, 1, 2, 3; 5 zenbaki.', '$[-1,3]$: $-1$, 0, 1, 2, 3; 5 números.', '$[-1,3]$: $-1$ و0 و1 و2 و3؛ 5 أعداد.') },
    { id: 18, stage: 'quadratic-inequalities', prompt: say(`${'$x^{2}-x-6<0$'}. Zenbat zenbaki osok betetzen dute?`, `${'$x^{2}-x-6<0$'}. ¿Cuántos números enteros la cumplen?`, `${'$x^{2}-x-6<0$'}. كم عددًا صحيحًا يحققها؟`), expected: n(4), hint: say('Erroak $-2$ eta 3; muturrak ez.', 'Raíces $-2$ y 3; los extremos no.', 'الجذران $-2$ و3؛ دون الطرفين.'), explanation: say('$(-2,3)$: $-1$, 0, 1, 2; 4 zenbaki.', '$(-2,3)$: $-1$, 0, 1, 2; 4 números.', '$(-2,3)$: $-1$ و0 و1 و2؛ 4 أعداد.') },
    { id: 19, stage: 'quadratic-inequalities', prompt: say('Ebatzi grafikoki $x^{2}-5x+4<x-1$. Zenbatekoa da ebazpen-tartearen luzera?', 'Resuelve gráficamente $x^{2}-5x+4<x-1$. ¿Cuánto mide el intervalo solución?', 'حل بيانيًا $x^{2}-5x+4<x-1$. كم طول مجال الحل؟'), expected: n(4), hint: say('Ebaki-puntuak: $x^{2}-6x+5=0$.', 'Puntos de corte: $x^{2}-6x+5=0$.', 'نقاط التقاطع: $x^{2}-6x+5=0$.'), explanation: same('$(1,5)\\qquad 5-1=4$') },
    { id: 20, stage: 'quadratic-inequalities', prompt: say('Ebatzi sistema: $3x-1>5$ eta $x+4\\le 10$. Zein da betetzen duen zenbaki osorik handiena?', 'Resuelve el sistema: $3x-1>5$ y $x+4\\le 10$. ¿Cuál es el mayor entero que lo cumple?', 'حل النظام: $3x-1>5$ و$x+4\\le 10$. ما أكبر عدد صحيح يحققه؟'), expected: n(6), hint: say('$x>2$ eta $x\\le 6$.', '$x>2$ y $x\\le 6$.', '$x>2$ و$x\\le 6$.'), explanation: same('$(2,6]\\ \\to\\ 6$') }
]

export const equationsInequalitiesChallenges: ChallengeItem[] = [
    { id: 101, stage: 'quadratic', points: 10, context: 'starter', prompt: say('Bi zenbaki natural jarraien biderkadura 156 da. Zein da txikiena?', 'El producto de dos números naturales consecutivos es 156. ¿Cuál es el menor?', 'جداء عددين طبيعيين متتاليين 156. ما أصغرهما؟'), expected: n(12), hint: say('$x(x+1)=156$', '$x(x+1)=156$', '$x(x+1)=156$'), explanation: same('$12\\cdot 13=156$') },
    { id: 102, stage: 'quadratic', points: 20, context: 'advanced', prompt: say('$x^{2}+bx-12=0$ ekuazioaren erro bat 3 da. Zenbat da b?', 'Una raíz de $x^{2}+bx-12=0$ es 3. ¿Cuánto vale b?', 'أحد جذري $x^{2}+bx-12=0$ هو 3. كم تساوي b؟'), expected: n(1), hint: say('Ordeztu $x=3$.', 'Sustituye $x=3$.', 'عوّض $x=3$.'), explanation: same('$9+3b-12=0\\ \\to\\ b=1$') },
    { id: 103, stage: 'quadratic', points: 30, context: 'master', prompt: say('$x^{2}+bx+c=0$ ekuazioaren erroak 3 eta $-5$ dira. Zenbat da c?', 'Las raíces de $x^{2}+bx+c=0$ son 3 y $-5$. ¿Cuánto vale c?', 'جذرا $x^{2}+bx+c=0$ هما 3 و$-5$. كم تساوي c؟'), expected: n(-15), hint: say('c erroen biderkadura da.', 'c es el producto de las raíces.', 'c هو جداء الجذرين.'), explanation: same('$3\\cdot(-5)=-15$') },
    { id: 104, stage: 'other', points: 10, context: 'starter', prompt: say('Zenbat ebazpen desberdin ditu $3x^{4}-12x^{2}=0$ ekuazioak?', '¿Cuántas soluciones distintas tiene $3x^{4}-12x^{2}=0$?', 'كم حلًا مختلفًا للمعادلة $3x^{4}-12x^{2}=0$؟'), expected: n(3), hint: say('Faktore komuna: $3x^{2}$.', 'Factor común: $3x^{2}$.', 'العامل المشترك: $3x^{2}$.'), explanation: say('$3x^{2}(x^{2}-4)=0$: 0, 2 eta $-2$; 3 ebazpen.', '$3x^{2}(x^{2}-4)=0$: 0, 2 y $-2$; 3 soluciones.', '$3x^{2}(x^{2}-4)=0$: 0 و2 و$-2$؛ 3 حلول.') },
    { id: 105, stage: 'other', points: 20, context: 'advanced', prompt: say('Zenbat da $x^{4}-5x^{2}+4=0$ ekuazioaren ebazpenen biderkadura?', '¿Cuánto vale el producto de las soluciones de $x^{4}-5x^{2}+4=0$?', 'ما جداء حلول $x^{4}-5x^{2}+4=0$؟'), expected: n(4), hint: say('$t=4$ eta $t=1$.', '$t=4$ y $t=1$.', '$t=4$ و$t=1$.'), explanation: same('$1\\cdot(-1)\\cdot 2\\cdot(-2)=4$') },
    { id: 106, stage: 'other', points: 30, context: 'master', prompt: solve('$\\frac{x}{x-2}+\\frac{2}{x}=\\frac{4}{x(x-2)}$', ONLY), expected: n(-4), hint: say('Bider $x(x-2)$ eta egiaztatu.', 'Por $x(x-2)$ y comprueba.', 'في $x(x-2)$ ثم تحقّق.'), explanation: say('$x^{2}+2x-8=0$: $x=2$ (izendatzailea 0, ez) eta $x=-4$.', '$x^{2}+2x-8=0$: $x=2$ (anula el denominador, no) y $x=-4$.', '$x^{2}+2x-8=0$: $x=2$ (يعدم المقام، لا) و$x=-4$.') },
    { id: 107, stage: 'exponential', points: 10, context: 'starter', prompt: solve('$3^{x^{2}-5}=81$', POSITIVE), expected: n(3), hint: say('$81=3^{4}$', '$81=3^{4}$', '$81=3^{4}$'), explanation: same('$x^{2}-5=4\\ \\to\\ x=\\pm 3$') },
    { id: 108, stage: 'exponential', points: 20, context: 'advanced', prompt: solve('$2^{x}+2^{x+3}=36$', ONLY), expected: n(2), hint: say('Atera $2^{x}$ faktore komun gisa.', 'Saca $2^{x}$ factor común.', 'أخرج $2^{x}$ عاملًا مشتركًا.'), explanation: same('$9\\cdot 2^{x}=36\\ \\to\\ 2^{x}=4=2^{2}$') },
    { id: 109, stage: 'exponential', points: 30, context: 'master', prompt: solve('$\\log x+\\log (x-3)=1$', ONLY), expected: n(5), hint: say('$x(x-3)=10$; argumentuak positiboak.', '$x(x-3)=10$; argumentos positivos.', '$x(x-3)=10$؛ وما بداخل اللوغاريتم موجب.'), explanation: say('$x^{2}-3x-10=0$: $x=5$ eta $x=-2$ (ez).', '$x^{2}-3x-10=0$: $x=5$ y $x=-2$ (no vale).', '$x^{2}-3x-10=0$: $x=5$ و$x=-2$ (لا يصلح).') },
    { id: 110, stage: 'inequalities', points: 10, context: 'starter', prompt: say(`${'$2x+5\\ge 25$'}. Zein da hura betetzen duen zenbaki osorik txikiena?`, `${'$2x+5\\ge 25$'}. ¿Cuál es el menor número entero que la cumple?`, `${'$2x+5\\ge 25$'}. ما أصغر عدد صحيح يحققها؟`), expected: n(10), hint: say('Kendu 5 eta zatitu 2z.', 'Resta 5 y divide entre 2.', 'اطرح 5 واقسم على 2.'), explanation: same('$2x\\ge 20\\ \\to\\ x\\ge 10$') },
    { id: 111, stage: 'inequalities', points: 20, context: 'advanced', prompt: say('Txango baterako 28 ikasle daude; autobusak 400 € balio du eta sarrera bakoitzak 6 €. Gutxienez zenbat euro (osoak) ordaindu behar ditu ikasle bakoitzak?', 'Para una excursión hay 28 alumnos; el autobús cuesta 400 € y cada entrada 6 €. ¿Cuántos euros (enteros) debe pagar como mínimo cada alumno?', 'لرحلة 28 طالبًا؛ والحافلة تكلف 400 € وكل تذكرة 6 €. كم يورو (عدد صحيح) يجب أن يدفع كل طالب على الأقل؟'), expected: n(21), hint: say('$28x\\ge 400+28\\cdot 6$', '$28x\\ge 400+28\\cdot 6$', '$28x\\ge 400+28\\cdot 6$'), explanation: same('$28\\cdot 20=560<568\\qquad 28\\cdot 21=588$') },
    { id: 112, stage: 'inequalities', points: 30, context: 'master', prompt: say('Zenbaki natural baten hirukoitza ken 5 haren bikoitza gehi 7 baino handiagoa da, eta haren bikoitza 30 baino txikiagoa. Zenbat zenbaki natural betetzen dute?', 'El triple de un número natural menos 5 es mayor que su doble más 7, y su doble es menor que 30. ¿Cuántos números naturales lo cumplen?', 'ثلاثة أمثال عدد طبيعي ناقص 5 أكبر من ضعفه زائد 7، وضعفه أصغر من 30. كم عددًا طبيعيًا يحقق ذلك؟'), expected: n(2), hint: say('$3x-5>2x+7$ eta $2x<30$.', '$3x-5>2x+7$ y $2x<30$.', '$3x-5>2x+7$ و$2x<30$.'), explanation: say('$x>12$ eta $x<15$: 13 eta 14, 2 zenbaki.', '$x>12$ y $x<15$: 13 y 14, 2 números.', '$x>12$ و$x<15$: 13 و14، عددان (2).') },
    { id: 113, stage: 'quadratic-inequalities', points: 10, context: 'starter', prompt: say(`${'$x^{2}-4<0$'}. Zenbat zenbaki osok betetzen dute?`, `${'$x^{2}-4<0$'}. ¿Cuántos números enteros la cumplen?`, `${'$x^{2}-4<0$'}. كم عددًا صحيحًا يحققها؟`), expected: n(3), hint: say('$(-2,2)$, muturrak gabe.', '$(-2,2)$, sin los extremos.', '$(-2,2)$ دون الطرفين.'), explanation: say('$-1$, 0 eta 1: 3 zenbaki.', '$-1$, 0 y 1: 3 números.', '$-1$ و0 و1: 3 أعداد.') },
    { id: 114, stage: 'quadratic-inequalities', points: 20, context: 'advanced', prompt: say('Zenbat ebazpen ditu $x^{2}+1<0$ inekuazioak?', '¿Cuántas soluciones tiene $x^{2}+1<0$?', 'كم حلًا للمتراجحة $x^{2}+1<0$؟'), expected: n(0), hint: say('$x^{2}\\ge 0$ beti.', '$x^{2}\\ge 0$ siempre.', '$x^{2}\\ge 0$ دائمًا.'), explanation: say('$x^{2}+1\\ge 1$ beti: ebazpenik ez, 0.', '$x^{2}+1\\ge 1$ siempre: ninguna, 0.', '$x^{2}+1\\ge 1$ دائمًا: لا حل، 0.') },
    { id: 115, stage: 'quadratic-inequalities', points: 30, context: 'master', prompt: say('k-ren zein baliotarako ez du ebazpenik $x^{2}+kx+9=0$ ekuazioak? Eman k-ren balio osorik handiena.', '¿Para qué valores de k no tiene solución $x^{2}+kx+9=0$? Da el mayor valor entero de k.', 'لأي قيم k لا يكون للمعادلة $x^{2}+kx+9=0$ حل؟ أعطِ أكبر قيمة صحيحة لـ k.'), expected: n(5), hint: say('Diskriminatzaile negatiboa: $k^{2}-36<0$.', 'Discriminante negativo: $k^{2}-36<0$.', 'مميّز سالب: $k^{2}-36<0$.'), explanation: say('$-6<k<6$: osorik handiena 5.', '$-6<k<6$: el mayor entero es 5.', '$-6<k<6$: أكبر عدد صحيح 5.') }
]

export const equationsInequalitiesExerciseBank: ExerciseSection[] = [
    {
        id: 'quadratic',
        title: say('Bigarren mailako ekuazioak', 'Ecuaciones de segundo grado', 'معادلات الدرجة الثانية'),
        items: [
            { id: 1, difficulty: 'easy', question: solve('$x^{2}-9=0$', POSITIVE), solution: same('$x^{2}=9\\ \\to\\ x=\\pm 3$'), answer: { expected: n(3) } },
            { id: 2, difficulty: 'easy', question: solve('$7x^{2}+5x=0$', and(say('Eman zero ez den ebazpena.', 'Da la solución no nula.', 'أعطِ الحل غير الصفري.'), AS_FRACTION)), solution: same('$x(7x+5)=0\\ \\to\\ x=0,\\ x=-\\frac{5}{7}$'), answer: { expected: f(-5, 7) } },
            { id: 3, difficulty: 'easy', question: say('Zenbat da $x^{2}+3x-4=0$ ekuazioaren diskriminatzailea?', '¿Cuánto vale el discriminante de $x^{2}+3x-4=0$?', 'كم مميّز $x^{2}+3x-4=0$؟'), solution: same('$9+16=25$'), answer: { expected: n(25) } },
            { id: 4, difficulty: 'medium', question: solve('$x^{2}-20x+100=0$', ONLY), solution: same('$(x-10)^{2}=0\\ \\to\\ x=10$'), answer: { expected: n(10) } },
            { id: 5, difficulty: 'medium', question: solve('$2x^{2}-7x+3=0$', GREATEST), solution: same('$x=\\frac{7\\pm 5}{4}\\ \\to\\ \\frac{12}{4}=3$'), answer: { expected: n(3) } },
            { id: 6, difficulty: 'medium', question: say('Zenbat dira $2x^{2}-6x+1=0$ ekuazioaren erroak guztira?', '¿Cuánto suman las raíces de $2x^{2}-6x+1=0$?', 'ما مجموع جذري $2x^{2}-6x+1=0$؟'), solution: same('$\\frac{6}{2}=3$'), answer: { expected: n(3) } },
            { id: 7, difficulty: 'medium', question: say('Zenbat da $3x^{2}+5x-12=0$ ekuazioaren erroen biderkadura?', '¿Cuánto vale el producto de las raíces de $3x^{2}+5x-12=0$?', 'ما جداء جذري $3x^{2}+5x-12=0$؟'), solution: same('$\\frac{-12}{3}=-4$'), answer: { expected: n(-4) } },
            { id: 8, difficulty: 'medium', question: say('Idatzi 2 eta 5 erroak dituen ekuazio bat.', 'Escribe una ecuación cuyas raíces sean 2 y 5.', 'اكتب معادلة جذراها 2 و5.'), solution: same('$x^{2}-7x+10=0$') },
            { id: 9, difficulty: 'hard', question: say('Laukizuzen baten perimetroa 34 cm da eta diagonala 13 cm. Zenbat neurtzen du alderik luzeenak?', 'Un rectángulo tiene 34 cm de perímetro y 13 cm de diagonal. ¿Cuánto mide el lado mayor?', 'محيط مستطيل 34 سم وقطره 13 سم. كم طول ضلعه الأكبر؟'), solution: say('$x^{2}+(17-x)^{2}=169$, $x^{2}-17x+60=0$: aldeak 12 eta 5.', '$x^{2}+(17-x)^{2}=169$, $x^{2}-17x+60=0$: lados 12 y 5.', '$x^{2}+(17-x)^{2}=169$، $x^{2}-17x+60=0$: الضلعان 12 و5.'), answer: { expected: n(12) } },
            { id: 10, difficulty: 'hard', question: say('Bi zenbaki positiboren kendura 3 da eta biderkadura 70. Zein da handiena?', 'Dos números positivos se diferencian en 3 y su producto es 70. ¿Cuál es el mayor?', 'عددان موجبان الفرق بينهما 3 وجداؤهما 70. ما أكبرهما؟'), solution: same('$x^{2}+3x-70=0\\ \\to\\ x=7\\qquad 7+3=10$'), answer: { expected: n(10) } }
        ]
    },
    {
        id: 'other',
        title: say('Beste ekuazio polinomiko batzuk', 'Otras ecuaciones polinómicas', 'معادلات حدودية أخرى'),
        items: [
            { id: 11, difficulty: 'easy', question: solve('$x^{4}-16=0$', POSITIVE), solution: same('$x^{4}=16\\ \\to\\ x=\\pm 2$'), answer: { expected: n(2) } },
            { id: 12, difficulty: 'easy', question: solve('$x(x-3)(x+5)=0$', SMALLEST), solution: say('Faktore bakoitza 0: 0, 3 eta $-5$.', 'Cada factor a 0: 0, 3 y $-5$.', 'كل عامل يساوي 0: 0 و3 و$-5$.'), answer: { expected: n(-5) } },
            { id: 13, difficulty: 'easy', question: solve('$x^{4}-10x^{2}+9=0$', HOW_MANY), solution: say('$t=9$ eta $t=1$: $\\pm 3$ eta $\\pm 1$, 4 ebazpen.', '$t=9$ y $t=1$: $\\pm 3$ y $\\pm 1$, 4 soluciones.', '$t=9$ و$t=1$: $\\pm 3$ و$\\pm 1$، 4 حلول.'), answer: { expected: n(4) } },
            { id: 14, difficulty: 'medium', question: solve('$x^{4}+9x^{2}+18=0$', HOW_MANY), solution: say('$t=-3$ eta $t=-6$, negatiboak: ebazpenik ez, 0.', '$t=-3$ y $t=-6$, negativos: ninguna, 0.', '$t=-3$ و$t=-6$ سالبان: لا حل، 0.'), answer: { expected: n(0) } },
            { id: 15, difficulty: 'medium', question: solve('$x^{4}-5x^{2}+4=0$', GREATEST), solution: same('$t^{2}-5t+4=0\\ \\to\\ t=4,\\ t=1\\qquad x=\\pm 2,\\ \\pm 1$'), answer: { expected: n(2) } },
            { id: 16, difficulty: 'medium', question: solve('$x^{3}-7x-6=0$', GREATEST), solution: same('$(x+1)(x+2)(x-3)=0\\ \\to\\ x=3$'), answer: { expected: n(3) } },
            { id: 17, difficulty: 'medium', question: solve('$x^{3}-x^{2}-4x+4=0$', SUM), solution: same('$(x-1)(x^{2}-4)=0\\qquad 1+2-2=1$'), answer: { expected: n(1) } },
            { id: 18, difficulty: 'hard', question: solve('$\\frac{6}{x}-\\frac{6}{x+1}=1$', POSITIVE), solution: same('$x^{2}+x-6=0\\ \\to\\ x=2,\\ x=-3\\qquad \\frac{6}{2}-\\frac{6}{3}=1$'), answer: { expected: n(2) } },
            { id: 19, difficulty: 'hard', question: solve('$\\frac{x+1}{x-1}=\\frac{2}{x^{2}-1}+1$', ONLY), solution: same('$(x+1)^{2}=2+x^{2}-1\\ \\to\\ 2x=0\\ \\to\\ x=0$'), answer: { expected: n(0) } },
            { id: 20, difficulty: 'hard', question: solve('$\\frac{x}{x-3}=\\frac{3}{x-3}+2$', HOW_MANY), solution: say('$x=3+2(x-3)$, $x=3$; baina izendatzailea 0 egiten du: ebazpenik ez, 0.', '$x=3+2(x-3)$, $x=3$; pero anula el denominador: ninguna, 0.', '$x=3+2(x-3)$، $x=3$؛ لكنه يعدم المقام: لا حل، 0.'), answer: { expected: n(0) } }
        ]
    },
    {
        id: 'exponential',
        title: say('Erroak, esponentzialak eta logaritmoak', 'Radicales, exponenciales y logaritmos', 'الجذور والأسية واللوغاريتمية'),
        items: [
            { id: 21, difficulty: 'easy', question: solve('$\\sqrt{x+2}=x$', ONLY), solution: say('$x^{2}-x-2=0$: $x=2$ eta $x=-1$; $-1$ ez da baliozkoa.', '$x^{2}-x-2=0$: $x=2$ y $x=-1$; $-1$ no vale.', '$x^{2}-x-2=0$: $x=2$ و$x=-1$؛ و$-1$ لا يصلح.'), answer: { expected: n(2) } },
            { id: 22, difficulty: 'easy', question: solve('$2^{x}=32$', ONLY), solution: same('$32=2^{5}$'), answer: { expected: n(5) } },
            { id: 23, difficulty: 'easy', question: solve('$\\log_2 (2x-1)=3$', AS_FRACTION), solution: same('$2x-1=2^{3}\\ \\to\\ x=\\frac{9}{2}$'), answer: { expected: f(9, 2) } },
            { id: 24, difficulty: 'medium', question: solve('$\\sqrt{4x+5}=x+2$', SUM), solution: say('$x^{2}=1$: $x=1$ eta $x=-1$, biak baliozkoak; batura 0.', '$x^{2}=1$: $x=1$ y $x=-1$, las dos valen; suman 0.', '$x^{2}=1$: $x=1$ و$x=-1$ وكلاهما صالح؛ المجموع 0.'), answer: { expected: n(0) } },
            { id: 25, difficulty: 'medium', question: solve('$x-1=\\sqrt{2x-3}$', ONLY), solution: same('$x^{2}-4x+4=0\\ \\to\\ x=2\\qquad 2-1=\\sqrt{1}$'), answer: { expected: n(2) } },
            { id: 26, difficulty: 'medium', question: solve('$4^{x}+4^{x+2}=272$', ONLY), solution: same('$17\\cdot 4^{x}=272\\ \\to\\ 4^{x}=16=4^{2}$'), answer: { expected: n(2) } },
            { id: 27, difficulty: 'medium', question: solve('$\\log (x-2)=2$', ONLY), solution: same('$x-2=10^{2}=100\\ \\to\\ x=102$'), answer: { expected: n(102) } },
            { id: 28, difficulty: 'hard', question: solve('$5^{x}=193$', say('Hurbildu ehunenetara.', 'Aproxima a las centésimas.', 'قرّب إلى الأجزاء من مئة.')), solution: same('$x=\\frac{\\log 193}{\\log 5}\\approx 3{,}27$'), answer: { expected: v('3,27') } },
            { id: 29, difficulty: 'hard', question: solve('$2\\log x=\\log (5x-6)$', SUM), solution: same('$x^{2}=5x-6\\ \\to\\ x=2,\\ x=3\\qquad 2+3=5$'), answer: { expected: n(5) } },
            { id: 30, difficulty: 'hard', question: solve('$3^{2x}-10\\cdot 3^{x}+9=0$', GREATEST), solution: say('$t=3^{x}$: $t^{2}-10t+9=0$, $t=9$ edo $t=1$; $x=2$ edo $x=0$.', '$t=3^{x}$: $t^{2}-10t+9=0$, $t=9$ o $t=1$; $x=2$ o $x=0$.', '$t=3^{x}$: $t^{2}-10t+9=0$، $t=9$ أو $t=1$؛ $x=2$ أو $x=0$.'), answer: { expected: n(2) } }
        ]
    },
    {
        id: 'inequalities',
        title: say('Lehen mailako inekuazioak', 'Inecuaciones de primer grado', 'متراجحات الدرجة الأولى'),
        items: [
            { id: 31, difficulty: 'easy', question: say('3 al da $2x-1>4$ inekuazioaren ebazpena?', '¿Es 3 solución de $2x-1>4$?', 'هل 3 حل للمتراجحة $2x-1>4$؟'), solution: say('Bai: $2\\cdot 3-1=5>4$.', 'Sí: $2\\cdot 3-1=5>4$.', 'نعم: $2\\cdot 3-1=5>4$.') },
            { id: 32, difficulty: 'easy', question: say('Idatzi tarte gisa: $x<4$.', 'Escribe como intervalo: $x<4$.', 'اكتب مجالًا: $x<4$.'), solution: same('$(-\\infty,4)$') },
            { id: 33, difficulty: 'easy', question: say(`${'$3x<50$'}. Zein da hura betetzen duen zenbaki osorik handiena?`, `${'$3x<50$'}. ¿Cuál es el mayor número entero que la cumple?`, `${'$3x<50$'}. ما أكبر عدد صحيح يحققها؟`), solution: say('$x<\\frac{50}{3}\\approx 16{,}7$: 16.', '$x<\\frac{50}{3}\\approx 16{,}7$: 16.', '$x<\\frac{50}{3}\\approx 16{,}7$: 16.'), answer: { expected: n(16) } },
            { id: 34, difficulty: 'medium', question: solve('$5-2x\\ge 1$', TOP_INTEGER), solution: same('$-2x\\ge -4\\ \\to\\ x\\le 2$'), answer: { expected: n(2) } },
            { id: 35, difficulty: 'medium', question: solve('$\\frac{x}{3}-1<\\frac{x}{2}$', LOW_INTEGER), solution: same('$2x-6<3x\\ \\to\\ x>-6\\qquad -5>-6$'), answer: { expected: n(-5) } },
            { id: 36, difficulty: 'medium', question: solve('$2(x-1)-3(x+2)\\le x$', END), solution: same('$-x-8\\le x\\ \\to\\ x\\ge -4$'), answer: { expected: n(-4) } },
            { id: 37, difficulty: 'medium', question: say('«Futbolera joan naizen aldien hirukoitza gehi 2 ez da 10era iristen». Zenbat erantzun posible daude?', '«El triple de las veces que he ido al fútbol más 2 no llega a 10». ¿Cuántas respuestas posibles hay?', '«ثلاثة أمثال عدد مرات ذهابي إلى الملعب زائد 2 لا يصل إلى 10». كم إجابة ممكنة؟'), solution: say('$3x+2<10$, $x<\\frac{8}{3}$: 0, 1 edo 2 aldiz, 3 erantzun.', '$3x+2<10$, $x<\\frac{8}{3}$: 0, 1 o 2 veces, 3 respuestas.', '$3x+2<10$، $x<\\frac{8}{3}$: 0 أو 1 أو 2 مرات، 3 إجابات.'), answer: { expected: n(3) } },
            { id: 38, difficulty: 'hard', question: say('Nire dirua hirukoiztuko balitz eta 20 € emango balizkidate, gutxienez 110 € izango nituzke. Gutxienez zenbat diru daukat?', 'Si mi dinero se triplicara y me dieran 20 €, tendría al menos 110 €. ¿Cuánto dinero tengo como mínimo?', 'لو تضاعف مالي ثلاث مرات وأُعطيت 20 € لكان عندي 110 € على الأقل. كم معي على الأقل؟'), solution: same('$3x+20\\ge 110\\ \\to\\ x\\ge 30$'), answer: { expected: n(30) } },
            { id: 39, difficulty: 'hard', question: say('Taxi batek 3 € kobratzen ditu hasteko eta 1,20 € kilometroko. 15 €-rekin, gehienez zenbat kilometro egin daitezke?', 'Un taxi cobra 3 € de bajada de bandera y 1,20 € por kilómetro. Con 15 €, ¿cuántos kilómetros como máximo?', 'يأخذ تاكسي 3 € عند الركوب و1,20 € لكل كيلومتر. بـ15 € كم كيلومترًا على الأكثر؟'), solution: same('$3+1{,}2x\\le 15\\ \\to\\ x\\le 10$'), answer: { expected: n(10) } },
            { id: 40, difficulty: 'hard', question: say('A enpresak 50 € gehi 2 € orduko kobratzen ditu, eta B-k 4 € orduko. Zenbat ordutatik aurrera da merkeagoa A? Eman lehen ordu osoa.', 'La empresa A cobra 50 € más 2 € por hora, y la B, 4 € por hora. ¿A partir de cuántas horas es más barata A? Da la primera hora entera.', 'تأخذ الشركة A ‏50 € زائد 2 € للساعة، والشركة B ‏4 € للساعة. ابتداءً من كم ساعة تصبح A أرخص؟ أعطِ أول ساعة كاملة.'), solution: same('$50+2x<4x\\ \\to\\ x>25\\ \\to\\ 26$'), answer: { expected: n(26) } }
        ]
    },
    {
        id: 'quadratic-inequalities',
        title: say('Bigarren mailakoak eta sistemak', 'Segundo grado y sistemas', 'الدرجة الثانية والأنظمة'),
        items: [
            { id: 41, difficulty: 'easy', question: say(`${'$x^{2}-9\\le 0$'}. Zenbat zenbaki osok betetzen dute?`, `${'$x^{2}-9\\le 0$'}. ¿Cuántos números enteros la cumplen?`, `${'$x^{2}-9\\le 0$'}. كم عددًا صحيحًا يحققها؟`), solution: say('$[-3,3]$: $-3$-tik 3-ra, 7 zenbaki.', '$[-3,3]$: de $-3$ a 3, 7 números.', '$[-3,3]$: من $-3$ إلى 3، 7 أعداد.'), answer: { expected: n(7) } },
            { id: 42, difficulty: 'easy', question: say('0 al da $x^{2}-5x+6>0$ inekuazioaren ebazpena?', '¿Es 0 solución de $x^{2}-5x+6>0$?', 'هل 0 حل للمتراجحة $x^{2}-5x+6>0$؟'), solution: say('Bai: $6>0$.', 'Sí: $6>0$.', 'نعم: $6>0$.') },
            { id: 43, difficulty: 'easy', question: say('Zein x-k betetzen dute $x^{2}+1>0$?', '¿Qué x cumplen $x^{2}+1>0$?', 'ما قيم x التي تحقق $x^{2}+1>0$؟'), solution: say('Guztiek: $x^{2}+1\\ge 1$ beti.', 'Todos: $x^{2}+1\\ge 1$ siempre.', 'كلها: $x^{2}+1\\ge 1$ دائمًا.') },
            { id: 44, difficulty: 'medium', question: say('Ebatzi $x^{2}-2x-3>0$.', 'Resuelve $x^{2}-2x-3>0$.', 'حل $x^{2}-2x-3>0$.'), solution: same('$(-\\infty,-1)\\cup(3,+\\infty)$') },
            { id: 45, difficulty: 'medium', question: say(`${'$x^{2}-5x\\le 0$'}. Zenbat zenbaki osok betetzen dute?`, `${'$x^{2}-5x\\le 0$'}. ¿Cuántos números enteros la cumplen?`, `${'$x^{2}-5x\\le 0$'}. كم عددًا صحيحًا يحققها؟`), solution: say('$x(x-5)\\le 0$: $[0,5]$, 6 zenbaki.', '$x(x-5)\\le 0$: $[0,5]$, 6 números.', '$x(x-5)\\le 0$: $[0,5]$، 6 أعداد.'), answer: { expected: n(6) } },
            { id: 46, difficulty: 'medium', question: say('Ebatzi $-x^{2}+4x\\ge 2x-3$. Zenbatekoa da ebazpen-tartearen luzera?', 'Resuelve $-x^{2}+4x\\ge 2x-3$. ¿Cuánto mide el intervalo solución?', 'حل $-x^{2}+4x\\ge 2x-3$. كم طول مجال الحل؟'), solution: same('$x^{2}-2x-3\\le 0\\ \\to\\ [-1,3]\\qquad 3+1=4$'), answer: { expected: n(4) } },
            { id: 47, difficulty: 'medium', question: say('Ebatzi sistema: $x^{2}-4\\le 0$ eta $x>0$. Zein da ebazpenik handiena?', 'Resuelve el sistema: $x^{2}-4\\le 0$ y $x>0$. ¿Cuál es la mayor solución?', 'حل النظام: $x^{2}-4\\le 0$ و$x>0$. ما أكبر حل؟'), solution: same('$[-2,2]\\cap(0,+\\infty)=(0,2]$'), answer: { expected: n(2) } },
            { id: 48, difficulty: 'hard', question: say('Ebatzi sistema: $2x-1>3$ eta $x^{2}-9<0$. Zenbatekoa da ebazpen-tartearen luzera?', 'Resuelve el sistema: $2x-1>3$ y $x^{2}-9<0$. ¿Cuánto mide el intervalo solución?', 'حل النظام: $2x-1>3$ و$x^{2}-9<0$. كم طول مجال الحل؟'), solution: same('$(2,+\\infty)\\cap(-3,3)=(2,3)\\qquad 3-2=1$'), answer: { expected: n(1) } },
            { id: 49, difficulty: 'hard', question: say('k-ren zein baliotarako ez du ebazpenik $x^{2}+kx+9=0$ ekuazioak? Eman k-ren balio osorik txikiena.', '¿Para qué valores de k no tiene solución $x^{2}+kx+9=0$? Da el menor valor entero de k.', 'لأي قيم k لا يكون للمعادلة $x^{2}+kx+9=0$ حل؟ أعطِ أصغر قيمة صحيحة لـ k.'), solution: say('$k^{2}-36<0$: $-6<k<6$; osorik txikiena $-5$.', '$k^{2}-36<0$: $-6<k<6$; el menor entero es $-5$.', '$k^{2}-36<0$: $-6<k<6$؛ أصغر عدد صحيح $-5$.'), answer: { expected: n(-5) } },
            { id: 50, difficulty: 'hard', question: say('20 cm-ko perimetroko laukizuzen baten azalera 21 cm² baino handiagoa da. Alde batek x neurtzen badu, zein da x-ren beheko muga?', 'Un rectángulo de 20 cm de perímetro tiene más de 21 cm² de área. Si un lado mide x, ¿cuál es el extremo inferior de x?', 'مستطيل محيطه 20 سم ومساحته أكبر من 21 سم². إذا كان أحد ضلعيه x فما الطرف الأدنى لـ x؟'), solution: same('$x(10-x)>21\\ \\to\\ x^{2}-10x+21<0\\ \\to\\ (3,7)$'), answer: { expected: n(3) } }
        ]
    }
]

import { fraction } from '../../features/unit-v2/math/fraction.ts'
import type { ChallengeItem, DiagnosticQuestion, ExerciseSection, LocalizedText, PracticeItem } from '../../features/unit-v2/types.ts'
import { same, say } from '../batx1-zientziak-funtzioak/text.ts'

/* ==========================================================================
   Limiteak eta jarraitutasuna · Batxilergoa 1 · Zientziak — diagnostic,
   guided practice, exercise bank and challenges, with the scope of unit 9
   of Santillana 1.º Bachillerato Ciencias and unit 11 of Anaya
   Matemáticas I (all the exercises and numbers are our own). Every closed
   answer is a single number: a limit, a parameter, the a of eᵃ, how many
   asymptotes or discontinuities there are, or the smaller integer of the
   interval where Bolzano finds a root.
   ========================================================================== */

const n = (value: number) => fraction(value)
const f = (numerator: number, denominator: number) => fraction(numerator, denominator)

const work = (formula: string) => say(`Kalkulatu $${formula}$.`, `Calcula $${formula}$.`, `احسب $${formula}$.`, `Work out $${formula}$.`)
/** «Work out …» and then what to give */
const with_ = (prompt: LocalizedText, ...rules: LocalizedText[]): LocalizedText => ({
    eu: [prompt.eu, ...rules.map((rule) => rule.eu)].join(' '),
    es: [prompt.es, ...rules.map((rule) => rule.es)].join(' '),
    en: [prompt.en, ...rules.map((rule) => rule.en)].join(' '),
    ar: [prompt.ar, ...rules.map((rule) => rule.ar)].join(' ')
})
const AS_FRACTION = say('Eman zatiki gisa.', 'Dalo como fracción.', 'اكتبه كسرًا.', 'Give it as a fraction.')
const howManyVertical = (formula: string) => say(`Zenbat asintota bertikal ditu $${formula}$ funtzioak?`, `¿Cuántas asíntotas verticales tiene $${formula}$?`, `كم مقاربًا رأسيًّا للدالة $${formula}$؟`, `How many vertical asymptotes does $${formula}$ have?`)

export const bachLimitsDiagnostic: DiagnosticQuestion[] = [
    {
        id: 109001,
        prompt: say('Zer baliora hurbiltzen da $a_n=\\frac{2n}{n+1}$ segida?', '¿A qué valor se acerca la sucesión $a_n=\\frac{2n}{n+1}$?', 'إلى أي قيمة تقترب المتتالية $a_n=\\frac{2n}{n+1}$؟', 'Which value does the sequence $a_n=\\frac{2n}{n+1}$ approach?'),
        options: [same('$2$'), same('$1$'), same('$0$')],
        correctIndex: 0,
        explanation: say('Maila bera goian eta behean: $\\frac{2n}{n}=2$.', 'Mismo grado arriba y abajo: $\\frac{2n}{n}=2$.', 'الدرجة نفسها في البسط والمقام: $\\frac{2n}{n}=2$.', 'Same degree on top and below: $\\frac{2n}{n}=2$.'),
        topic: 'idea'
    },
    {
        id: 109002,
        prompt: say('$f(x)=x+3$ da $x<0$ denean, eta $f(x)=x^2$ $x\\ge 0$ denean. Zenbat da $f(0)$?', 'Si $f(x)=x+3$ para $x<0$ y $f(x)=x^2$ para $x\\ge 0$, ¿cuánto vale $f(0)$?', 'إذا كانت $f(x)=x+3$ عندما $x<0$ و$f(x)=x^2$ عندما $x\\ge 0$، فكم تساوي $f(0)$؟', 'If $f(x)=x+3$ for $x<0$ and $f(x)=x^2$ for $x\\ge 0$, what is $f(0)$?'),
        options: [same('$3$'), same('$0$'), say('Ez dago', 'No existe', 'غير موجودة', 'It does not exist')],
        correctIndex: 1,
        explanation: say('$x=0$ balioak bigarren zatia erabiltzen du: $0^2=0$.', '$x=0$ usa el segundo trozo: $0^2=0$.', '$x=0$ تستعمل الجزء الثاني: $0^2=0$.', '$x=0$ uses the second piece: $0^2=0$.'),
        topic: 'one-sided'
    },
    {
        id: 109003,
        prompt: say('Zer gertatzen zaio $\\frac{1}{x}$ adierazpenari $x$ eskuinetik 0 baliora hurbiltzean?', '¿Qué le pasa a $\\frac{1}{x}$ cuando $x$ se acerca a 0 por la derecha?', 'ماذا يحدث لـ $\\frac{1}{x}$ عندما يقترب $x$ من 0 من اليمين؟', 'What happens to $\\frac{1}{x}$ as $x$ approaches 0 from the right?'),
        options: [say('1 baliora hurbiltzen da', 'Se acerca a 1', 'تقترب من 1', 'It approaches 1'), say('0 baliora hurbiltzen da', 'Se acerca a 0', 'تقترب من 0', 'It approaches 0'), say('Mugarik gabe hazten da', 'Crece sin límite', 'تكبر بلا حد', 'It grows without bound')],
        correctIndex: 2,
        explanation: same('$\\frac{1}{0{,}1}=10\\qquad\\frac{1}{0{,}01}=100$'),
        topic: 'infinite'
    },
    {
        id: 109004,
        prompt: say('Zenbat balio du $\\frac{x^2+1}{x+1}$ adierazpenak $x=2$ denean?', '¿Cuánto vale $\\frac{x^2+1}{x+1}$ en $x=2$?', 'كم تساوي $\\frac{x^2+1}{x+1}$ عند $x=2$؟', 'What is $\\frac{x^2+1}{x+1}$ at $x=2$?'),
        options: [same('$\\frac{5}{3}$'), same('$5$'), same('$1$')],
        correctIndex: 0,
        explanation: same('$\\frac{4+1}{2+1}=\\frac{5}{3}$'),
        topic: 'substitute'
    },
    {
        id: 109005,
        prompt: say('Faktorizatu $x^2-16$.', 'Factoriza $x^2-16$.', 'حلّل $x^2-16$.', 'Factorise $x^2-16$.'),
        options: [same('$(x-16)(x+1)$'), same('$(x-4)(x+4)$'), same('$(x-4)^2$')],
        correctIndex: 1,
        explanation: same('$x^2-16=x^2-4^2=(x-4)(x+4)$'),
        topic: 'zero-zero'
    },
    {
        id: 109006,
        prompt: say('Zein da $a_n=\\frac{3n^2}{n^2+1}$ segidaren limitea?', '¿Cuál es el límite de la sucesión $a_n=\\frac{3n^2}{n^2+1}$?', 'ما نهاية المتتالية $a_n=\\frac{3n^2}{n^2+1}$؟', 'What is the limit of the sequence $a_n=\\frac{3n^2}{n^2+1}$?'),
        options: [same('$0$'), same('$+\\infty$'), same('$3$')],
        correctIndex: 2,
        explanation: say('Maila bera: $\\frac{3n^2}{n^2}=3$.', 'Mismo grado: $\\frac{3n^2}{n^2}=3$.', 'الدرجة نفسها: $\\frac{3n^2}{n^2}=3$.', 'Same degree: $\\frac{3n^2}{n^2}=3$.'),
        topic: 'degrees'
    },
    {
        id: 109007,
        prompt: say('Zein asintota bertikal du $y=\\frac{2}{x-5}$ hiperbolak?', '¿Qué asíntota vertical tiene la hipérbola $y=\\frac{2}{x-5}$?', 'ما المقارب الرأسي للقطع الزائد $y=\\frac{2}{x-5}$؟', 'Which vertical asymptote does the hyperbola $y=\\frac{2}{x-5}$ have?'),
        options: [same('$x=5$'), same('$x=-5$'), same('$y=2$')],
        correctIndex: 0,
        explanation: say('Izendatzailea 0 da $x=5$ denean.', 'El denominador vale 0 en $x=5$.', 'ينعدم المقام عند $x=5$.', 'The denominator is 0 at $x=5$.'),
        topic: 'vertical-horizontal'
    },
    {
        id: 109008,
        prompt: say('$y=x^2$ funtzioa arkatza altxatu gabe marraz daiteke?', '¿Se puede dibujar $y=x^2$ sin levantar el lápiz?', 'هل يمكن رسم $y=x^2$ دون رفع القلم؟', 'Can $y=x^2$ be drawn without lifting the pencil?'),
        options: [say('Ez, jauzi egiten du 0 puntuan', 'No, salta en 0', 'لا، تقفز عند 0', 'No, it jumps at 0'), say('Bai', 'Sí', 'نعم', 'Yes'), say('Bakarrik $x>0$ denean', 'Solo para $x>0$', 'فقط عندما $x>0$', 'Only for $x>0$')],
        correctIndex: 1,
        explanation: say('Polinomio bat da: jarraitua da $\\mathbb{R}$ osoan.', 'Es un polinomio: es continua en todo $\\mathbb{R}$.', 'إنها حدودية: متصلة على كل $\\mathbb{R}$.', 'It is a polynomial: it is continuous on the whole of $\\mathbb{R}$.'),
        topic: 'continuous'
    }
]

export const bachLimitsPractice: PracticeItem[] = [
    /* ---------- The limit at a point ---------- */
    { id: 1, stage: 'point', prompt: say('$f(x)=3x-1$ da $x\\neq 2$ denean, eta $f(2)=0$. Zenbat da $\\lim_{x\\to 2}f(x)$?', 'Si $f(x)=3x-1$ para $x\\neq 2$ y $f(2)=0$, ¿cuánto vale $\\lim_{x\\to 2}f(x)$?', 'إذا كانت $f(x)=3x-1$ عندما $x\\neq 2$ و$f(2)=0$، فكم تساوي $\\lim_{x\\to 2}f(x)$؟', 'If $f(x)=3x-1$ for $x\\neq 2$ and $f(2)=0$, what is $\\lim_{x\\to 2}f(x)$?'), expected: n(5), hint: say('Limiteak ez du $f(2)$ begiratzen.', 'El límite no mira $f(2)$.', 'النهاية لا تنظر إلى $f(2)$.', 'The limit does not look at $f(2)$.'), explanation: same('$3\\cdot 2-1=5$') },
    { id: 2, stage: 'point', prompt: say('Kalkulatu $\\lim_{x\\to 1^-}f(x)$ funtzio honetan: $f(x)=\\begin{cases}2x+3 & x<1\\\\ x+4 & x\\ge 1\\end{cases}$', 'Calcula $\\lim_{x\\to 1^-}f(x)$ para esta función: $f(x)=\\begin{cases}2x+3 & x<1\\\\ x+4 & x\\ge 1\\end{cases}$', 'احسب $\\lim_{x\\to 1^-}f(x)$ لهذه الدالة: $f(x)=\\begin{cases}2x+3 & x<1\\\\ x+4 & x\\ge 1\\end{cases}$', 'Work out $\\lim_{x\\to 1^-}f(x)$ for this function: $f(x)=\\begin{cases}2x+3 & x<1\\\\ x+4 & x\\ge 1\\end{cases}$'), expected: n(5), hint: say('Ezkerretik, lehen zatia.', 'Por la izquierda, el primer trozo.', 'من اليسار الجزء الأول.', 'From the left, the first piece.'), explanation: same('$2\\cdot 1+3=5$') },
    { id: 3, stage: 'point', prompt: say('$f(x)=x^2$ da $x<2$ denean, eta $f(x)=x+k$ $x\\ge 2$ denean. Aurkitu $k$, $\\lim_{x\\to 2}f(x)$ egon dadin.', 'Sea $f(x)=x^2$ si $x<2$ y $f(x)=x+k$ si $x\\ge 2$. Halla $k$ para que exista $\\lim_{x\\to 2}f(x)$.', 'لتكن $f(x)=x^2$ إذا كان $x<2$ و$f(x)=x+k$ إذا كان $x\\ge 2$. أوجد $k$ كي توجد $\\lim_{x\\to 2}f(x)$.', 'Let $f(x)=x^2$ if $x<2$ and $f(x)=x+k$ if $x\\ge 2$. Find $k$ so that $\\lim_{x\\to 2}f(x)$ exists.'), expected: n(2), hint: say('Bi alboko limiteek berdinak izan behar dute.', 'Los dos límites laterales tienen que coincidir.', 'يجب أن تتساوى النهايتان الجانبيتان.', 'The two one-sided limits must be equal.'), explanation: same('$2^2=2+k\\ \\to\\ k=2$') },
    { id: 4, stage: 'point', prompt: howManyVertical('f(x)=\\frac{1}{x^2-9}'), expected: n(2), hint: say('Non da 0 izendatzailea?', '¿Dónde se anula el denominador?', 'أين ينعدم المقام؟', 'Where is the denominator 0?'), explanation: say('$x^2-9=0$ da $x=\\pm 3$ denean: 2 asintota.', '$x^2-9=0$ en $x=\\pm 3$: 2 asíntotas.', '$x^2-9=0$ عند $x=\\pm 3$: مقاربان، أي 2.', '$x^2-9=0$ at $x=\\pm 3$: 2 asymptotes.') },

    /* ---------- Working out limits at a point ---------- */
    { id: 5, stage: 'calculus', prompt: work('\\lim_{x\\to -1}\\frac{x^2+3}{x+2}'), expected: n(4), hint: say('Ordezkatu besterik ez.', 'Basta con sustituir.', 'يكفي التعويض.', 'Just substitute.'), explanation: same('$\\frac{1+3}{-1+2}=4$') },
    { id: 6, stage: 'calculus', prompt: work('\\lim_{x\\to 2}\\frac{x^2-4}{x-2}'), expected: n(4), hint: say('$\\frac{0}{0}$: faktorizatu.', '$\\frac{0}{0}$: factoriza.', '$\\frac{0}{0}$: حلّل.', '$\\frac{0}{0}$: factorise.'), explanation: same('$\\frac{(x-2)(x+2)}{x-2}=x+2\\ \\to\\ 4$') },
    { id: 7, stage: 'calculus', prompt: with_(work('\\lim_{x\\to 1}\\frac{x^3-1}{x^2-1}'), AS_FRACTION), expected: f(3, 2), hint: same('$x^3-1=(x-1)(x^2+x+1)$'), explanation: same('$\\frac{x^2+x+1}{x+1}\\ \\to\\ \\frac{3}{2}$') },
    { id: 8, stage: 'calculus', prompt: with_(work('\\lim_{x\\to 9}\\frac{\\sqrt{x}-3}{x-9}'), AS_FRACTION), expected: f(1, 6), hint: say('Biderkatu $\\sqrt{x}+3$ adierazpenaz.', 'Multiplica por $\\sqrt{x}+3$.', 'اضرب في $\\sqrt{x}+3$.', 'Multiply by $\\sqrt{x}+3$.'), explanation: same('$\\frac{1}{\\sqrt{9}+3}=\\frac{1}{6}$') },

    /* ---------- Limits at infinity ---------- */
    { id: 9, stage: 'infinity', prompt: work('\\lim_{x\\to+\\infty}\\frac{4x^2+1}{2x^2-x}'), expected: n(2), hint: say('Maila bera goian eta behean.', 'Mismo grado arriba y abajo.', 'الدرجة نفسها في البسط والمقام.', 'Same degree on top and below.'), explanation: same('$\\frac{4x^2}{2x^2}=2$') },
    { id: 10, stage: 'infinity', prompt: work('\\lim_{x\\to+\\infty}\\frac{x+7}{x^2+1}'), expected: n(0), hint: say('Behean maila handiagoa.', 'Abajo, mayor grado.', 'درجة المقام أكبر.', 'Higher degree below.'), explanation: same('$\\frac{x}{x^2}=\\frac{1}{x}\\ \\to\\ 0$') },
    { id: 11, stage: 'infinity', prompt: work('\\lim_{x\\to+\\infty}\\left(\\sqrt{x^2+8x}-x\\right)'), expected: n(4), hint: say('Biderkatu eta zatitu konjokatuaz.', 'Multiplica y divide por el conjugado.', 'اضرب واقسم على المرافق.', 'Multiply and divide by the conjugate.'), explanation: same('$\\frac{8x}{\\sqrt{x^2+8x}+x}\\ \\to\\ \\frac{8}{2}=4$') },
    { id: 12, stage: 'infinity', prompt: say('$\\lim_{x\\to+\\infty}\\left(1+\\frac{2}{x}\\right)^{x}=e^a$. Zenbat da $a$?', '$\\lim_{x\\to+\\infty}\\left(1+\\frac{2}{x}\\right)^{x}=e^a$. ¿Cuánto vale $a$?', '$\\lim_{x\\to+\\infty}\\left(1+\\frac{2}{x}\\right)^{x}=e^a$. كم تساوي $a$؟', '$\\lim_{x\\to+\\infty}\\left(1+\\frac{2}{x}\\right)^{x}=e^a$. What is $a$?'), expected: n(2), hint: same('$e^{\\lim g(x)\\,(f(x)-1)}$'), explanation: same('$x\\cdot\\frac{2}{x}=2$') },

    /* ---------- Asymptotes ---------- */
    { id: 13, stage: 'asymptotes', prompt: say('$f(x)=\\frac{6x-1}{2x+3}$ funtzioaren asintota horizontala $y=b$ da. Zenbat da $b$?', 'La asíntota horizontal de $f(x)=\\frac{6x-1}{2x+3}$ es $y=b$. ¿Cuánto vale $b$?', 'المقارب الأفقي لـ $f(x)=\\frac{6x-1}{2x+3}$ هو $y=b$. كم تساوي $b$؟', 'The horizontal asymptote of $f(x)=\\frac{6x-1}{2x+3}$ is $y=b$. What is $b$?'), expected: n(3), hint: say('Maila bera: koefizienteen zatidura.', 'Mismo grado: cociente de coeficientes.', 'الدرجة نفسها: خارج قسمة المعاملين.', 'Same degree: quotient of the coefficients.'), explanation: same('$\\frac{6x}{2x}=3$') },
    { id: 14, stage: 'asymptotes', prompt: say('$f(x)=\\frac{x+1}{x-4}$ funtzioak asintota bertikala du $x=a$ zuzenean. Zenbat da $a$?', '$f(x)=\\frac{x+1}{x-4}$ tiene una asíntota vertical en $x=a$. ¿Cuánto vale $a$?', 'للدالة $f(x)=\\frac{x+1}{x-4}$ مقارب رأسي عند $x=a$. كم تساوي $a$؟', '$f(x)=\\frac{x+1}{x-4}$ has a vertical asymptote at $x=a$. What is $a$?'), expected: n(4), hint: say('Izendatzailea 0, zenbakitzailea ez.', 'Denominador 0 y numerador no.', 'المقام 0 والبسط لا.', 'Denominator 0 and numerator not.'), explanation: same('$x-4=0\\ \\to\\ x=4$') },
    { id: 15, stage: 'asymptotes', prompt: say('$f(x)=\\frac{x^2+2x}{x-1}$ funtzioaren asintota zeiharra $y=x+n$ da. Zenbat da $n$?', 'La asíntota oblicua de $f(x)=\\frac{x^2+2x}{x-1}$ es $y=x+n$. ¿Cuánto vale $n$?', 'المقارب المائل لـ $f(x)=\\frac{x^2+2x}{x-1}$ هو $y=x+n$. كم تساوي $n$؟', 'The oblique asymptote of $f(x)=\\frac{x^2+2x}{x-1}$ is $y=x+n$. What is $n$?'), expected: n(3), hint: say('Zatitu $x^2+2x$ zati $x-1$.', 'Divide $x^2+2x$ entre $x-1$.', 'اقسم $x^2+2x$ على $x-1$.', 'Divide $x^2+2x$ by $x-1$.'), explanation: same('$\\frac{x^2+2x}{x-1}=x+3+\\frac{3}{x-1}$') },
    { id: 16, stage: 'asymptotes', prompt: howManyVertical('f(x)=\\frac{x-2}{x^2-4}'), expected: n(1), hint: say('$x=2$ puntuan $\\frac{0}{0}$ da.', 'En $x=2$ sale $\\frac{0}{0}$.', 'عند $x=2$ نجد $\\frac{0}{0}$.', 'At $x=2$ it gives $\\frac{0}{0}$.'), explanation: say('$\\frac{1}{x+2}$: zuloa $x=2$ puntuan eta asintota $x=-2$ zuzenean; 1 asintota.', '$\\frac{1}{x+2}$: agujero en $x=2$ y asíntota en $x=-2$; 1 asíntota.', '$\\frac{1}{x+2}$: ثقب عند $x=2$ ومقارب عند $x=-2$؛ أي مقارب واحد، 1.', '$\\frac{1}{x+2}$: hole at $x=2$ and asymptote at $x=-2$; 1 asymptote.') },

    /* ---------- Continuity ---------- */
    { id: 17, stage: 'continuity', prompt: say('Aurkitu $a$, $f(x)=\\begin{cases}ax+1 & x<2\\\\ x^2-1 & x\\ge 2\\end{cases}$ jarraitua izan dadin.', 'Halla $a$ para que $f(x)=\\begin{cases}ax+1 & x<2\\\\ x^2-1 & x\\ge 2\\end{cases}$ sea continua.', 'أوجد $a$ لتكون $f(x)=\\begin{cases}ax+1 & x<2\\\\ x^2-1 & x\\ge 2\\end{cases}$ متصلة.', 'Find $a$ so that $f(x)=\\begin{cases}ax+1 & x<2\\\\ x^2-1 & x\\ge 2\\end{cases}$ is continuous.'), expected: n(1), hint: say('Berdindu bi zatiak $x=2$ puntuan.', 'Iguala los dos trozos en $x=2$.', 'ساوِ الجزأين عند $x=2$.', 'Set both pieces equal at $x=2$.'), explanation: same('$2a+1=2^2-1=3\\ \\to\\ a=1$') },
    { id: 18, stage: 'continuity', prompt: say('Zer balio eman behar zaio $f(3)$ puntuari, $f(x)=\\frac{x^2-9}{x-3}$ funtzioa 3 puntuan jarraitua izan dadin?', '¿Qué valor hay que dar a $f(3)$ para que $f(x)=\\frac{x^2-9}{x-3}$ sea continua en 3?', 'ما القيمة التي تُعطى لـ $f(3)$ كي تكون $f(x)=\\frac{x^2-9}{x-3}$ متصلة عند 3؟', 'What value must $f(3)$ take so that $f(x)=\\frac{x^2-9}{x-3}$ is continuous at 3?'), expected: n(6), hint: say('Kalkulatu limitea.', 'Calcula el límite.', 'احسب النهاية.', 'Work out the limit.'), explanation: same('$x+3\\ \\to\\ 3+3=6$') },
    { id: 19, stage: 'continuity', prompt: say('Zenbat etenune ditu $f(x)=\\frac{x}{x^2-5x+6}$ funtzioak?', '¿Cuántos puntos de discontinuidad tiene $f(x)=\\frac{x}{x^2-5x+6}$?', 'كم نقطة انقطاع للدالة $f(x)=\\frac{x}{x^2-5x+6}$؟', 'How many points of discontinuity does $f(x)=\\frac{x}{x^2-5x+6}$ have?'), expected: n(2), hint: say('Izendatzailearen erroak.', 'Las raíces del denominador.', 'جذور المقام.', 'The roots of the denominator.'), explanation: say('$x^2-5x+6=(x-2)(x-3)$: 2 eta 3; guztira 2.', '$x^2-5x+6=(x-2)(x-3)$: en 2 y en 3; en total, 2.', '$x^2-5x+6=(x-2)(x-3)$: عند 2 وعند 3؛ المجموع 2.', '$x^2-5x+6=(x-2)(x-3)$: at 2 and at 3; 2 in all.') },
    { id: 20, stage: 'continuity', prompt: say('$f(x)=x^3-2x-5$. Zein bi zenbaki oso jarraituren artean du erro bat? Eman txikiena.', '$f(x)=x^3-2x-5$. ¿Entre qué dos enteros consecutivos tiene una raíz? Da el menor.', '$f(x)=x^3-2x-5$. بين أي عددين صحيحين متتاليين يقع جذر لها؟ اكتب الأصغر.', '$f(x)=x^3-2x-5$. Between which two consecutive integers does it have a root? Give the smaller.'), expected: n(2), hint: say('Probatu $f(2)$ eta $f(3)$.', 'Prueba $f(2)$ y $f(3)$.', 'جرّب $f(2)$ و$f(3)$.', 'Try $f(2)$ and $f(3)$.'), explanation: same('$f(2)=8-4-5=-1\\qquad f(3)=27-6-5=16$') }
]

export const bachLimitsChallenges: ChallengeItem[] = [
    { id: 101, stage: 'point', points: 10, context: 'starter', prompt: say('Aurkitu $a$, $\\lim_{x\\to 1}f(x)$ egon dadin, $f(x)=ax+2$ bada $x<1$ denean eta $f(x)=3x^2$ $x\\ge 1$ denean.', 'Halla $a$ para que exista $\\lim_{x\\to 1}f(x)$, con $f(x)=ax+2$ si $x<1$ y $f(x)=3x^2$ si $x\\ge 1$.', 'أوجد $a$ كي توجد $\\lim_{x\\to 1}f(x)$ مع $f(x)=ax+2$ إذا كان $x<1$ و$f(x)=3x^2$ إذا كان $x\\ge 1$.', 'Find $a$ so that $\\lim_{x\\to 1}f(x)$ exists, with $f(x)=ax+2$ if $x<1$ and $f(x)=3x^2$ if $x\\ge 1$.'), expected: n(1), hint: say('Berdindu alboko limiteak.', 'Iguala los límites laterales.', 'ساوِ النهايتين الجانبيتين.', 'Set the one-sided limits equal.'), explanation: same('$a+2=3\\ \\to\\ a=1$') },
    { id: 102, stage: 'point', points: 20, context: 'advanced', prompt: howManyVertical('\\frac{x+3}{x^2+3x}'), expected: n(1), hint: same('$x^2+3x=x(x+3)$'), explanation: say('$x=-3$ puntuan $\\frac{0}{0}$ da (zuloa); $x=0$ puntuan bakarrik dago asintota: 1.', 'En $x=-3$ sale $\\frac{0}{0}$ (agujero); solo hay asíntota en $x=0$: 1.', 'عند $x=-3$ نجد $\\frac{0}{0}$ (ثقب)؛ ولا يوجد مقارب إلا عند $x=0$: أي 1.', 'At $x=-3$ it gives $\\frac{0}{0}$ (a hole); there is an asymptote only at $x=0$: 1.') },
    { id: 103, stage: 'point', points: 30, context: 'master', prompt: work('\\lim_{x\\to 0^+}\\frac{|x|+x}{x}'), expected: n(2), hint: say('Eskuinean $|x|=x$.', 'A la derecha, $|x|=x$.', 'إلى اليمين $|x|=x$.', 'To the right, $|x|=x$.'), explanation: same('$\\frac{x+x}{x}=2$') },
    { id: 104, stage: 'calculus', points: 10, context: 'starter', prompt: work('\\lim_{x\\to 5}\\frac{x^2-25}{x-5}'), expected: n(10), hint: say('$\\frac{0}{0}$: faktorizatu.', '$\\frac{0}{0}$: factoriza.', '$\\frac{0}{0}$: حلّل.', '$\\frac{0}{0}$: factorise.'), explanation: same('$x+5\\ \\to\\ 5+5=10$') },
    { id: 105, stage: 'calculus', points: 20, context: 'advanced', prompt: work('\\lim_{x\\to 2}\\frac{x^3-8}{x-2}'), expected: n(12), hint: same('$x^3-8=(x-2)(x^2+2x+4)$'), explanation: same('$2^2+2\\cdot 2+4=12$') },
    { id: 106, stage: 'calculus', points: 30, context: 'master', prompt: work('\\lim_{x\\to 0}\\frac{\\sqrt{1+x}-\\sqrt{1-x}}{x}'), expected: n(1), hint: say('Biderkatu $\\sqrt{1+x}+\\sqrt{1-x}$ adierazpenaz.', 'Multiplica por $\\sqrt{1+x}+\\sqrt{1-x}$.', 'اضرب في $\\sqrt{1+x}+\\sqrt{1-x}$.', 'Multiply by $\\sqrt{1+x}+\\sqrt{1-x}$.'), explanation: same('$\\frac{2}{\\sqrt{1}+\\sqrt{1}}=1$') },
    { id: 107, stage: 'infinity', points: 10, context: 'starter', prompt: work('\\lim_{x\\to-\\infty}\\frac{5x^3-x}{2-x^3}'), expected: n(-5), hint: say('Maila bera: kontuz zeinuarekin.', 'Mismo grado: cuidado con el signo.', 'الدرجة نفسها: انتبه للإشارة.', 'Same degree: watch the sign.'), explanation: same('$\\frac{5x^3}{-x^3}=-5$') },
    { id: 108, stage: 'infinity', points: 20, context: 'advanced', prompt: work('\\lim_{x\\to+\\infty}\\left(\\frac{x^2+3x}{x+1}-x\\right)'), expected: n(2), hint: say('Izendatzaile komuna.', 'Denominador común.', 'وحّد المقامات.', 'Common denominator.'), explanation: same('$\\frac{x^2+3x-x^2-x}{x+1}=\\frac{2x}{x+1}\\ \\to\\ 2$') },
    { id: 109, stage: 'infinity', points: 30, context: 'master', prompt: say('$\\lim_{x\\to+\\infty}\\left(\\frac{x+3}{x-1}\\right)^{x}=e^a$. Zenbat da $a$?', '$\\lim_{x\\to+\\infty}\\left(\\frac{x+3}{x-1}\\right)^{x}=e^a$. ¿Cuánto vale $a$?', '$\\lim_{x\\to+\\infty}\\left(\\frac{x+3}{x-1}\\right)^{x}=e^a$. كم تساوي $a$؟', '$\\lim_{x\\to+\\infty}\\left(\\frac{x+3}{x-1}\\right)^{x}=e^a$. What is $a$?'), expected: n(4), hint: same('$\\frac{x+3}{x-1}-1=\\frac{4}{x-1}$'), explanation: same('$x\\cdot\\frac{4}{x-1}\\ \\to\\ 4$') },
    { id: 110, stage: 'asymptotes', points: 10, context: 'starter', prompt: say('$\\frac{8x^2}{2x^2+5}$ funtzioaren asintota horizontala $y=b$ da. Zenbat da $b$?', 'La asíntota horizontal de $\\frac{8x^2}{2x^2+5}$ es $y=b$. ¿Cuánto vale $b$?', 'المقارب الأفقي لـ $\\frac{8x^2}{2x^2+5}$ هو $y=b$. كم تساوي $b$؟', 'The horizontal asymptote of $\\frac{8x^2}{2x^2+5}$ is $y=b$. What is $b$?'), expected: n(4), hint: say('Maila bera.', 'Mismo grado.', 'الدرجة نفسها.', 'Same degree.'), explanation: same('$\\frac{8x^2}{2x^2}=4$') },
    { id: 111, stage: 'asymptotes', points: 20, context: 'advanced', prompt: say('$\\frac{2x^2+1}{x}$ funtzioaren asintota zeiharra $y=mx+n$ da. Kalkulatu $m+n$.', 'La asíntota oblicua de $\\frac{2x^2+1}{x}$ es $y=mx+n$. Calcula $m+n$.', 'المقارب المائل لـ $\\frac{2x^2+1}{x}$ هو $y=mx+n$. احسب $m+n$.', 'The oblique asymptote of $\\frac{2x^2+1}{x}$ is $y=mx+n$. Work out $m+n$.'), expected: n(2), hint: same('$\\frac{2x^2+1}{x}=2x+\\frac{1}{x}$'), explanation: say('$m=2$ eta $n=0$: $2+0=2$.', '$m=2$ y $n=0$: $2+0=2$.', '$m=2$ و$n=0$: ‏$2+0=2$.', '$m=2$ and $n=0$: $2+0=2$.') },
    { id: 112, stage: 'asymptotes', points: 30, context: 'master', prompt: say('Zenbat asintota ditu (mota guztietakoak) $\\frac{x^2}{x^2-1}$ funtzioak?', '¿Cuántas asíntotas (de cualquier tipo) tiene $\\frac{x^2}{x^2-1}$?', 'كم مقاربًا (من أي نوع) للدالة $\\frac{x^2}{x^2-1}$؟', 'How many asymptotes (of any kind) does $\\frac{x^2}{x^2-1}$ have?'), expected: n(3), hint: say('Bertikalak eta horizontala.', 'Verticales y horizontal.', 'رأسية وأفقي.', 'Vertical ones and a horizontal one.'), explanation: say('$x=1$, $x=-1$ eta $y=1$: 3 asintota.', '$x=1$, $x=-1$ e $y=1$: 3 asíntotas.', '$x=1$ و$x=-1$ و$y=1$: ‏3 مقاربات.', '$x=1$, $x=-1$ and $y=1$: 3 asymptotes.') },
    { id: 113, stage: 'continuity', points: 10, context: 'starter', prompt: say('Zenbat etenune ditu $E(x)$ funtzioak $(0,5)$ tartean?', '¿Cuántas discontinuidades tiene $E(x)$ en el intervalo $(0,5)$?', 'كم انقطاعًا للدالة $E(x)$ في المجال $(0,5)$؟', 'How many discontinuities does $E(x)$ have on the interval $(0,5)$?'), expected: n(4), hint: say('Zenbaki oso bakoitzean jauzi egiten du.', 'Salta en cada número entero.', 'تقفز عند كل عدد صحيح.', 'It jumps at every whole number.'), explanation: say('1, 2, 3 eta 4 zenbakietan: 4 jauzi.', 'En 1, 2, 3 y 4: 4 saltos.', 'عند 1 و2 و3 و4: ‏4 قفزات.', 'At 1, 2, 3 and 4: 4 jumps.') },
    { id: 114, stage: 'continuity', points: 20, context: 'advanced', prompt: say('Aurkitu $k$, $f(x)=\\begin{cases}\\frac{x^2-1}{x-1} & x\\neq 1\\\\ k & x=1\\end{cases}$ jarraitua izan dadin.', 'Halla $k$ para que $f(x)=\\begin{cases}\\frac{x^2-1}{x-1} & x\\neq 1\\\\ k & x=1\\end{cases}$ sea continua.', 'أوجد $k$ لتكون $f(x)=\\begin{cases}\\frac{x^2-1}{x-1} & x\\neq 1\\\\ k & x=1\\end{cases}$ متصلة.', 'Find $k$ so that $f(x)=\\begin{cases}\\frac{x^2-1}{x-1} & x\\neq 1\\\\ k & x=1\\end{cases}$ is continuous.'), expected: n(2), hint: say('$k$ zenbakiak limitearen berdina izan behar du.', '$k$ tiene que ser igual al límite.', 'يجب أن تساوي $k$ النهاية.', '$k$ must equal the limit.'), explanation: same('$x+1\\ \\to\\ 1+1=2$') },
    { id: 115, stage: 'continuity', points: 30, context: 'master', prompt: say('$f(x)=x^3+x^2-7$. Bolzanoren arabera, zein bi zenbaki oso positibo jarraituren artean dago bere erroa? Eman handiena.', '$f(x)=x^3+x^2-7$. Por Bolzano, ¿entre qué dos enteros positivos consecutivos está su raíz? Da el mayor.', '$f(x)=x^3+x^2-7$. حسب بولتسانو، بين أي عددين صحيحين موجبين متتاليين يقع جذرها؟ اكتب الأكبر.', '$f(x)=x^3+x^2-7$. By Bolzano, between which two consecutive positive integers is its root? Give the larger.'), expected: n(2), hint: say('Probatu $f(1)$ eta $f(2)$.', 'Prueba $f(1)$ y $f(2)$.', 'جرّب $f(1)$ و$f(2)$.', 'Try $f(1)$ and $f(2)$.'), explanation: same('$f(1)=1+1-7=-5\\qquad f(2)=8+4-7=5$') }
]

export const bachLimitsExerciseBank: ExerciseSection[] = [
    {
        id: 'point',
        title: say('Limitea puntu batean', 'Límite en un punto', 'النهاية عند نقطة', 'The limit at a point'),
        items: [
            { id: 1, difficulty: 'easy', question: work('\\lim_{x\\to 3}(x^2-2x)'), solution: same('$9-6=3$'), answer: { expected: n(3) } },
            { id: 2, difficulty: 'easy', question: say('$f(x)=x-1$ da $x<2$ denean, eta $f(x)=2x-3$ $x\\ge 2$ denean. Kalkulatu alboko limiteak 2 puntuan.', 'Si $f(x)=x-1$ para $x<2$ y $f(x)=2x-3$ para $x\\ge 2$, halla los límites laterales en 2.', 'إذا كانت $f(x)=x-1$ عندما $x<2$ و$f(x)=2x-3$ عندما $x\\ge 2$، فأوجد النهايتين الجانبيتين عند 2.', 'If $f(x)=x-1$ for $x<2$ and $f(x)=2x-3$ for $x\\ge 2$, find the one-sided limits at 2.'), solution: same('$2-1=1\\qquad 2\\cdot 2-3=1$') },
            { id: 3, difficulty: 'easy', question: say('Ba al dago $\\lim_{x\\to 0}\\frac{1}{x}$?', '¿Existe $\\lim_{x\\to 0}\\frac{1}{x}$?', 'هل توجد $\\lim_{x\\to 0}\\frac{1}{x}$؟', 'Does $\\lim_{x\\to 0}\\frac{1}{x}$ exist?'), solution: say('Ez: ezkerretik $-\\infty$ eta eskuinetik $+\\infty$.', 'No: por la izquierda $-\\infty$ y por la derecha $+\\infty$.', 'لا: من اليسار $-\\infty$ ومن اليمين $+\\infty$.', 'No: from the left $-\\infty$ and from the right $+\\infty$.') },
            { id: 4, difficulty: 'medium', question: say('Kalkulatu $\\lim_{x\\to 1^-}\\frac{2}{x-1}$ eta $\\lim_{x\\to 1^+}\\frac{2}{x-1}$.', 'Calcula $\\lim_{x\\to 1^-}\\frac{2}{x-1}$ y $\\lim_{x\\to 1^+}\\frac{2}{x-1}$.', 'احسب $\\lim_{x\\to 1^-}\\frac{2}{x-1}$ و$\\lim_{x\\to 1^+}\\frac{2}{x-1}$.', 'Work out $\\lim_{x\\to 1^-}\\frac{2}{x-1}$ and $\\lim_{x\\to 1^+}\\frac{2}{x-1}$.'), solution: say('$-\\infty$ eta $+\\infty$: $x=1$ asintota bertikala da.', '$-\\infty$ y $+\\infty$: $x=1$ es asíntota vertical.', '$-\\infty$ و$+\\infty$: ‏$x=1$ مقارب رأسي.', '$-\\infty$ and $+\\infty$: $x=1$ is a vertical asymptote.') },
            { id: 5, difficulty: 'medium', question: work('\\lim_{x\\to 0}\\frac{3}{x^2}'), solution: say('$x^2>0$ bi aldeetan: $+\\infty$.', '$x^2>0$ a los dos lados: $+\\infty$.', '$x^2>0$ على الجانبين: $+\\infty$.', '$x^2>0$ on both sides: $+\\infty$.') },
            { id: 6, difficulty: 'medium', question: say('Ba al dago $\\lim_{x\\to 2}f(x)$ funtzio honetan? $f(x)=\\begin{cases}x^2 & x\\le 2\\\\ 6-x & x>2\\end{cases}$', '¿Existe $\\lim_{x\\to 2}f(x)$ para esta función? $f(x)=\\begin{cases}x^2 & x\\le 2\\\\ 6-x & x>2\\end{cases}$', 'هل توجد $\\lim_{x\\to 2}f(x)$ لهذه الدالة؟ $f(x)=\\begin{cases}x^2 & x\\le 2\\\\ 6-x & x>2\\end{cases}$', 'Does $\\lim_{x\\to 2}f(x)$ exist for this function? $f(x)=\\begin{cases}x^2 & x\\le 2\\\\ 6-x & x>2\\end{cases}$'), solution: say('Bai: $2^2=4$ eta $6-2=4$; limitea 4 da.', 'Sí: $2^2=4$ y $6-2=4$; el límite es 4.', 'نعم: $2^2=4$ و$6-2=4$؛ النهاية 4.', 'Yes: $2^2=4$ and $6-2=4$; the limit is 4.'), answer: { expected: n(4) } },
            { id: 7, difficulty: 'medium', question: say('Aurkitu $f(x)=\\frac{x}{x^2-4x}$ funtzioaren asintota bertikalak.', 'Halla las asíntotas verticales de $f(x)=\\frac{x}{x^2-4x}$.', 'أوجد المقاربات الرأسية لـ $f(x)=\\frac{x}{x^2-4x}$.', 'Find the vertical asymptotes of $f(x)=\\frac{x}{x^2-4x}$.'), solution: say('$\\frac{x}{x(x-4)}=\\frac{1}{x-4}$: $x=4$ bakarrik; $x=0$ puntuan zuloa dago.', '$\\frac{x}{x(x-4)}=\\frac{1}{x-4}$: solo $x=4$; en $x=0$ hay un agujero.', '$\\frac{x}{x(x-4)}=\\frac{1}{x-4}$: فقط $x=4$؛ وعند $x=0$ ثقب.', '$\\frac{x}{x(x-4)}=\\frac{1}{x-4}$: only $x=4$; at $x=0$ there is a hole.') },
            { id: 8, difficulty: 'hard', question: say('Aurkitu $a$, $\\lim_{x\\to 3}f(x)$ egon dadin, $f(x)=ax$ bada $x<3$ denean eta $f(x)=x^2-3$ $x\\ge 3$ denean.', 'Halla $a$ para que exista $\\lim_{x\\to 3}f(x)$, con $f(x)=ax$ si $x<3$ y $f(x)=x^2-3$ si $x\\ge 3$.', 'أوجد $a$ كي توجد $\\lim_{x\\to 3}f(x)$ مع $f(x)=ax$ إذا كان $x<3$ و$f(x)=x^2-3$ إذا كان $x\\ge 3$.', 'Find $a$ so that $\\lim_{x\\to 3}f(x)$ exists, with $f(x)=ax$ if $x<3$ and $f(x)=x^2-3$ if $x\\ge 3$.'), solution: same('$3a=3^2-3=6\\ \\to\\ a=2$'), answer: { expected: n(2) } },
            { id: 9, difficulty: 'hard', question: work('\\lim_{x\\to 2}\\frac{x+1}{(x-2)^2}'), solution: say('$\\frac{3}{0}$ eta izendatzailea beti positiboa: $+\\infty$ bi aldeetan.', '$\\frac{3}{0}$ con denominador siempre positivo: $+\\infty$ por los dos lados.', '$\\frac{3}{0}$ مع مقام موجب دائمًا: $+\\infty$ من الجانبين.', '$\\frac{3}{0}$ with an always positive denominator: $+\\infty$ on both sides.') },
            { id: 10, difficulty: 'hard', question: say('Kalkulatu $\\lim_{x\\to 0^-}\\frac{x}{|x|}$ eta $\\lim_{x\\to 0^+}\\frac{x}{|x|}$.', 'Calcula $\\lim_{x\\to 0^-}\\frac{x}{|x|}$ y $\\lim_{x\\to 0^+}\\frac{x}{|x|}$.', 'احسب $\\lim_{x\\to 0^-}\\frac{x}{|x|}$ و$\\lim_{x\\to 0^+}\\frac{x}{|x|}$.', 'Work out $\\lim_{x\\to 0^-}\\frac{x}{|x|}$ and $\\lim_{x\\to 0^+}\\frac{x}{|x|}$.'), solution: say('$-1$ eta 1: ez dago limiterik 0 puntuan.', '$-1$ y 1: no existe el límite en 0.', '$-1$ و1: لا توجد نهاية عند 0.', '$-1$ and 1: the limit at 0 does not exist.') }
        ]
    },
    {
        id: 'calculus',
        title: say('Limiteak puntu batean kalkulatzea', 'Calcular límites en un punto', 'حساب النهايات عند نقطة', 'Working out limits at a point'),
        items: [
            { id: 11, difficulty: 'easy', question: work('\\lim_{x\\to 2}\\frac{x+6}{x^2}'), solution: same('$\\frac{2+6}{4}=2$'), answer: { expected: n(2) } },
            { id: 12, difficulty: 'easy', question: work('\\lim_{x\\to -3}\\frac{x^2-9}{x+3}'), solution: same('$x-3\\ \\to\\ -3-3=-6$'), answer: { expected: n(-6) } },
            { id: 13, difficulty: 'easy', question: work('\\lim_{x\\to 1}\\frac{x^2-1}{x^2-x}'), solution: same('$\\frac{(x-1)(x+1)}{x(x-1)}=\\frac{x+1}{x}\\ \\to\\ 2$'), answer: { expected: n(2) } },
            { id: 14, difficulty: 'medium', question: work('\\lim_{x\\to 4}\\frac{x^2-5x+4}{x-4}'), solution: same('$\\frac{(x-4)(x-1)}{x-4}=x-1\\ \\to\\ 3$'), answer: { expected: n(3) } },
            { id: 15, difficulty: 'medium', question: work('\\lim_{x\\to -1}\\frac{x^2+3x+2}{x^2-1}'), solution: same('$\\frac{x+2}{x-1}\\ \\to\\ \\frac{1}{-2}=-\\frac{1}{2}$'), answer: { expected: f(-1, 2) } },
            { id: 16, difficulty: 'medium', question: work('\\lim_{x\\to 0}\\frac{\\sqrt{x+4}-2}{x}'), solution: same('$\\frac{1}{\\sqrt{x+4}+2}\\ \\to\\ \\frac{1}{4}$'), answer: { expected: f(1, 4) } },
            { id: 17, difficulty: 'medium', question: work('\\lim_{x\\to 0}\\frac{x^2+5x}{x}'), solution: same('$x+5\\ \\to\\ 5$'), answer: { expected: n(5) } },
            { id: 18, difficulty: 'hard', question: work('\\lim_{x\\to 3}\\frac{\\sqrt{x+1}-2}{x-3}'), solution: same('$\\frac{1}{\\sqrt{3+1}+2}=\\frac{1}{4}$'), answer: { expected: f(1, 4) } },
            { id: 19, difficulty: 'hard', question: work('\\lim_{x\\to 1}\\frac{x^3-3x+2}{x^2-2x+1}'), solution: same('$\\frac{(x-1)^2(x+2)}{(x-1)^2}=x+2\\ \\to\\ 3$'), answer: { expected: n(3) } },
            { id: 20, difficulty: 'hard', question: work('\\lim_{x\\to 2}\\left(\\frac{1}{x-2}-\\frac{4}{x^2-4}\\right)'), solution: same('$\\frac{x+2-4}{(x-2)(x+2)}=\\frac{1}{x+2}\\ \\to\\ \\frac{1}{4}$'), answer: { expected: f(1, 4) } }
        ]
    },
    {
        id: 'infinity',
        title: say('Limiteak infinituan', 'Límites en el infinito', 'النهايات عند اللانهاية', 'Limits at infinity'),
        items: [
            { id: 21, difficulty: 'easy', question: work('\\lim_{x\\to+\\infty}\\frac{2x+3}{x-1}'), solution: same('$\\frac{2x}{x}=2$'), answer: { expected: n(2) } },
            { id: 22, difficulty: 'easy', question: work('\\lim_{x\\to+\\infty}\\frac{x^2}{x+5}'), solution: say('Goian maila handiagoa: $+\\infty$.', 'Arriba, mayor grado: $+\\infty$.', 'درجة البسط أكبر: $+\\infty$.', 'Higher degree on top: $+\\infty$.') },
            { id: 23, difficulty: 'easy', question: work('\\lim_{x\\to+\\infty}\\frac{7}{x^2+1}'), solution: same('$\\frac{7}{\\infty}=0$'), answer: { expected: n(0) } },
            { id: 24, difficulty: 'medium', question: work('\\lim_{x\\to-\\infty}\\frac{3x^2-x}{1-x^2}'), solution: same('$\\frac{3x^2}{-x^2}=-3$'), answer: { expected: n(-3) } },
            { id: 25, difficulty: 'medium', question: work('\\lim_{x\\to+\\infty}\\left(\\sqrt{x^2+10x}-x\\right)'), solution: same('$\\frac{10x}{\\sqrt{x^2+10x}+x}\\ \\to\\ \\frac{10}{2}=5$'), answer: { expected: n(5) } },
            { id: 26, difficulty: 'medium', question: work('\\lim_{x\\to+\\infty}\\left(\\frac{x^2}{x+1}-x\\right)'), solution: same('$\\frac{x^2-x^2-x}{x+1}=\\frac{-x}{x+1}\\ \\to\\ -1$'), answer: { expected: n(-1) } },
            { id: 27, difficulty: 'medium', question: work('\\lim_{x\\to+\\infty}\\left(1+\\frac{1}{x}\\right)^{5x}'), solution: same('$e^{\\lim 5x\\cdot\\frac{1}{x}}=e^5$') },
            { id: 28, difficulty: 'hard', question: work('\\lim_{x\\to+\\infty}\\left(\\frac{x-1}{x+2}\\right)^{x}'), solution: same('$\\frac{x-1}{x+2}-1=\\frac{-3}{x+2}\\ \\to\\ e^{-3}$') },
            { id: 29, difficulty: 'hard', question: work('\\lim_{x\\to-\\infty}\\frac{\\sqrt{x^2+1}}{x}'), solution: say('$x<0$ denean, $\\sqrt{x^2}=-x$: limitea $-1$ da.', 'Con $x<0$, $\\sqrt{x^2}=-x$: el límite es $-1$.', 'مع $x<0$ يكون $\\sqrt{x^2}=-x$: النهاية $-1$.', 'With $x<0$, $\\sqrt{x^2}=-x$: the limit is $-1$.'), answer: { expected: n(-1) } },
            { id: 30, difficulty: 'hard', question: work('\\lim_{x\\to+\\infty}\\left(\\sqrt{x+5}-\\sqrt{x}\\right)'), solution: same('$\\frac{5}{\\sqrt{x+5}+\\sqrt{x}}\\ \\to\\ 0$'), answer: { expected: n(0) } }
        ]
    },
    {
        id: 'asymptotes',
        title: say('Asintotak', 'Asíntotas', 'المقاربات', 'Asymptotes'),
        items: [
            { id: 31, difficulty: 'easy', question: say('Aurkitu $f(x)=\\frac{1}{x+2}$ funtzioaren asintotak.', 'Halla las asíntotas de $f(x)=\\frac{1}{x+2}$.', 'أوجد مقاربات $f(x)=\\frac{1}{x+2}$.', 'Find the asymptotes of $f(x)=\\frac{1}{x+2}$.'), solution: same('$x=-2\\qquad y=0$') },
            { id: 32, difficulty: 'easy', question: say('Aurkitu $f(x)=\\frac{5x}{x-1}$ funtzioaren asintota horizontala.', 'Halla la asíntota horizontal de $f(x)=\\frac{5x}{x-1}$.', 'أوجد المقارب الأفقي لـ $f(x)=\\frac{5x}{x-1}$.', 'Find the horizontal asymptote of $f(x)=\\frac{5x}{x-1}$.'), solution: same('$\\frac{5x}{x}=5\\ \\to\\ y=5$') },
            { id: 33, difficulty: 'easy', question: howManyVertical('f(x)=\\frac{x}{x^2+1}'), solution: say('$x^2+1$ ez da inoiz 0: asintota bertikalik ez, 0.', '$x^2+1$ nunca vale 0: ninguna asíntota vertical, 0.', '$x^2+1$ لا ينعدم أبدًا: لا مقارب رأسيًّا، أي 0.', '$x^2+1$ is never 0: no vertical asymptote, 0.'), answer: { expected: n(0) } },
            { id: 34, difficulty: 'medium', question: say('Aurkitu $f(x)=\\frac{x^2}{x^2-9}$ funtzioaren asintotak.', 'Halla las asíntotas de $f(x)=\\frac{x^2}{x^2-9}$.', 'أوجد مقاربات $f(x)=\\frac{x^2}{x^2-9}$.', 'Find the asymptotes of $f(x)=\\frac{x^2}{x^2-9}$.'), solution: same('$x=3\\qquad x=-3\\qquad y=1$') },
            { id: 35, difficulty: 'medium', question: say('Aurkitu $f(x)=\\frac{x^2-2}{x}$ funtzioaren asintota zeiharra.', 'Halla la asíntota oblicua de $f(x)=\\frac{x^2-2}{x}$.', 'أوجد المقارب المائل لـ $f(x)=\\frac{x^2-2}{x}$.', 'Find the oblique asymptote of $f(x)=\\frac{x^2-2}{x}$.'), solution: same('$\\frac{x^2-2}{x}=x-\\frac{2}{x}\\ \\to\\ y=x$') },
            { id: 36, difficulty: 'medium', question: say('Aurkitu $f(x)=\\frac{3x^2+x}{x+1}$ funtzioaren asintota zeiharra.', 'Halla la asíntota oblicua de $f(x)=\\frac{3x^2+x}{x+1}$.', 'أوجد المقارب المائل لـ $f(x)=\\frac{3x^2+x}{x+1}$.', 'Find the oblique asymptote of $f(x)=\\frac{3x^2+x}{x+1}$.'), solution: same('$\\frac{3x^2+x}{x+1}=3x-2+\\frac{2}{x+1}\\ \\to\\ y=3x-2$') },
            { id: 37, difficulty: 'medium', question: say('Zein posizio du $f(x)=\\frac{x+1}{x}$ kurbak $y=1$ asintotarekiko?', '¿Qué posición tiene $f(x)=\\frac{x+1}{x}$ respecto de su asíntota $y=1$?', 'ما موضع $f(x)=\\frac{x+1}{x}$ بالنسبة إلى مقاربها $y=1$؟', 'Where is $f(x)=\\frac{x+1}{x}$ with respect to its asymptote $y=1$?'), solution: say('$f(x)-1=\\frac{1}{x}$: gainetik $x>0$ denean, eta azpitik $x<0$ denean.', '$f(x)-1=\\frac{1}{x}$: por encima si $x>0$ y por debajo si $x<0$.', '$f(x)-1=\\frac{1}{x}$: فوقه إذا $x>0$ وتحته إذا $x<0$.', '$f(x)-1=\\frac{1}{x}$: above if $x>0$ and below if $x<0$.') },
            { id: 38, difficulty: 'hard', question: say('Zer adar ditu $f(x)=\\frac{x^3+1}{x}$ funtzioak?', '¿Qué ramas tiene $f(x)=\\frac{x^3+1}{x}$?', 'ما فروع $f(x)=\\frac{x^3+1}{x}$؟', 'What branches does $f(x)=\\frac{x^3+1}{x}$ have?'), solution: say('$x=0$ asintota bertikala; goian bi maila gehiago: adar parabolikoak.', 'Asíntota vertical $x=0$; arriba dos grados más: ramas parabólicas.', 'مقارب رأسي $x=0$؛ ودرجتان أكثر في البسط: فروع شلجمية.', 'Vertical asymptote $x=0$; two degrees more on top: parabolic branches.') },
            { id: 39, difficulty: 'hard', question: say('Aurkitu $a$, $f(x)=\\frac{ax^2+1}{2x^2-3}$ funtzioak $y=3$ asintota horizontala izan dezan.', 'Halla $a$ para que $f(x)=\\frac{ax^2+1}{2x^2-3}$ tenga la asíntota horizontal $y=3$.', 'أوجد $a$ ليكون للدالة $f(x)=\\frac{ax^2+1}{2x^2-3}$ المقارب الأفقي $y=3$.', 'Find $a$ so that $f(x)=\\frac{ax^2+1}{2x^2-3}$ has the horizontal asymptote $y=3$.'), solution: same('$\\frac{a}{2}=3\\ \\to\\ a=6$'), answer: { expected: n(6) } },
            { id: 40, difficulty: 'hard', question: say('Aurkitu $f(x)=\\frac{x^2-x-2}{x-1}$ funtzioaren asintota guztiak.', 'Halla todas las asíntotas de $f(x)=\\frac{x^2-x-2}{x-1}$.', 'أوجد كل مقاربات $f(x)=\\frac{x^2-x-2}{x-1}$.', 'Find all the asymptotes of $f(x)=\\frac{x^2-x-2}{x-1}$.'), solution: same('$\\frac{x^2-x-2}{x-1}=x-\\frac{2}{x-1}\\ \\to\\ x=1\\qquad y=x$') }
        ]
    },
    {
        id: 'continuity',
        title: say('Jarraitutasuna', 'Continuidad', 'الاتصال', 'Continuity'),
        items: [
            { id: 41, difficulty: 'easy', question: say('Jarraitua al da $f(x)=x^2-3x$ funtzioa $x=2$ puntuan?', '¿Es continua $f(x)=x^2-3x$ en $x=2$?', 'هل $f(x)=x^2-3x$ متصلة عند $x=2$؟', 'Is $f(x)=x^2-3x$ continuous at $x=2$?'), solution: say('Bai: polinomio bat da.', 'Sí: es un polinomio.', 'نعم: إنها حدودية.', 'Yes: it is a polynomial.') },
            { id: 42, difficulty: 'easy', question: say('Non ez da jarraitua $f(x)=\\frac{2}{x-7}$?', '¿Dónde no es continua $f(x)=\\frac{2}{x-7}$?', 'أين لا تكون $f(x)=\\frac{2}{x-7}$ متصلة؟', 'Where is $f(x)=\\frac{2}{x-7}$ not continuous?'), solution: same('$x-7=0\\ \\to\\ x=7$'), answer: { expected: n(7) } },
            { id: 43, difficulty: 'easy', question: say('Zer etenune du $\\frac{x^2-1}{x-1}$ funtzioak $x=1$ puntuan?', '¿Qué tipo de discontinuidad tiene $\\frac{x^2-1}{x-1}$ en $x=1$?', 'ما نوع انقطاع $\\frac{x^2-1}{x-1}$ عند $x=1$؟', 'What kind of discontinuity does $\\frac{x^2-1}{x-1}$ have at $x=1$?'), solution: say('Gaindigarria: limitea $1+1=2$ da.', 'Evitable: el límite es $1+1=2$.', 'قابل للإزالة: النهاية $1+1=2$.', 'Removable: the limit is $1+1=2$.') },
            { id: 44, difficulty: 'medium', question: say('Aurkitu $k$, $f(x)=\\begin{cases}x+k & x<1\\\\ 2x^2 & x\\ge 1\\end{cases}$ jarraitua izan dadin.', 'Halla $k$ para que $f(x)=\\begin{cases}x+k & x<1\\\\ 2x^2 & x\\ge 1\\end{cases}$ sea continua.', 'أوجد $k$ لتكون $f(x)=\\begin{cases}x+k & x<1\\\\ 2x^2 & x\\ge 1\\end{cases}$ متصلة.', 'Find $k$ so that $f(x)=\\begin{cases}x+k & x<1\\\\ 2x^2 & x\\ge 1\\end{cases}$ is continuous.'), solution: same('$1+k=2\\ \\to\\ k=1$'), answer: { expected: n(1) } },
            { id: 45, difficulty: 'medium', question: say('Sailkatu $f(x)=\\begin{cases}x & x<0\\\\ x+2 & x\\ge 0\\end{cases}$ funtzioaren etenunea 0 puntuan.', 'Clasifica la discontinuidad de $f(x)=\\begin{cases}x & x<0\\\\ x+2 & x\\ge 0\\end{cases}$ en 0.', 'صنّف انقطاع $f(x)=\\begin{cases}x & x<0\\\\ x+2 & x\\ge 0\\end{cases}$ عند 0.', 'Classify the discontinuity of $f(x)=\\begin{cases}x & x<0\\\\ x+2 & x\\ge 0\\end{cases}$ at 0.'), solution: say('Alboko limiteak 0 eta 2: jauzi finitua.', 'Laterales 0 y 2: salto finito.', 'النهايتان الجانبيتان 0 و2: قفزة منتهية.', 'One-sided limits 0 and 2: finite jump.') },
            { id: 46, difficulty: 'medium', question: say('Sailkatu $\\frac{x+2}{x^2+2x}$ funtzioaren etenuneak.', 'Clasifica las discontinuidades de $\\frac{x+2}{x^2+2x}$.', 'صنّف انقطاعات $\\frac{x+2}{x^2+2x}$.', 'Classify the discontinuities of $\\frac{x+2}{x^2+2x}$.'), solution: say('$\\frac{1}{x}$: $x=-2$ puntuan gaindigarria, eta $x=0$ puntuan jauzi infinitua.', '$\\frac{1}{x}$: en $x=-2$ evitable y en $x=0$ salto infinito.', '$\\frac{1}{x}$: عند $x=-2$ قابل للإزالة وعند $x=0$ قفزة لانهائية.', '$\\frac{1}{x}$: removable at $x=-2$ and an infinite jump at $x=0$.') },
            { id: 47, difficulty: 'medium', question: say('Zenbat etenune ditu $E(x)$ funtzioak $[-2,2]$ tartean?', '¿Cuántas discontinuidades tiene $E(x)$ en $[-2,2]$?', 'كم انقطاعًا للدالة $E(x)$ في $[-2,2]$؟', 'How many discontinuities does $E(x)$ have on $[-2,2]$?'), solution: say('$-2$, $-1$, 0, 1 eta 2 zenbakietan: 5.', 'En $-2$, $-1$, 0, 1 y 2: 5.', 'عند $-2$ و$-1$ و0 و1 و2: ‏5.', 'At $-2$, $-1$, 0, 1 and 2: 5.'), answer: { expected: n(5) } },
            { id: 48, difficulty: 'hard', question: say('Aurkitu $a$, $f(x)=\\begin{cases}x^2+a & x<0\\\\ \\frac{x+4}{x+2} & x\\ge 0\\end{cases}$ jarraitua izan dadin.', 'Halla $a$ para que $f(x)=\\begin{cases}x^2+a & x<0\\\\ \\frac{x+4}{x+2} & x\\ge 0\\end{cases}$ sea continua.', 'أوجد $a$ لتكون $f(x)=\\begin{cases}x^2+a & x<0\\\\ \\frac{x+4}{x+2} & x\\ge 0\\end{cases}$ متصلة.', 'Find $a$ so that $f(x)=\\begin{cases}x^2+a & x<0\\\\ \\frac{x+4}{x+2} & x\\ge 0\\end{cases}$ is continuous.'), solution: same('$0+a=\\frac{0+4}{0+2}=2\\ \\to\\ a=2$'), answer: { expected: n(2) } },
            { id: 49, difficulty: 'hard', question: say('Frogatu $x^3+3x-1=0$ ekuazioak erro bat duela $(0,1)$ tartean.', 'Demuestra que $x^3+3x-1=0$ tiene una raíz en $(0,1)$.', 'برهن أن للمعادلة $x^3+3x-1=0$ جذرًا في $(0,1)$.', 'Show that $x^3+3x-1=0$ has a root in $(0,1)$.'), solution: say('Polinomioa jarraitua da, eta $f(0)=-1<0$ eta $f(1)=3>0$: Bolzanoren arabera, badago.', 'El polinomio es continuo, y $f(0)=-1<0$ y $f(1)=3>0$: por Bolzano, la hay.', 'الحدودية متصلة، و$f(0)=-1<0$ و$f(1)=3>0$: يوجد جذر حسب بولتسانو.', 'The polynomial is continuous, and $f(0)=-1<0$ and $f(1)=3>0$: by Bolzano, there is one.') },
            { id: 50, difficulty: 'hard', question: say('Aplika al daiteke Bolzanoren teorema $f(x)=\\frac{1}{x-1}$ funtzioari $[0,2]$ tartean?', '¿Se puede aplicar Bolzano a $f(x)=\\frac{1}{x-1}$ en $[0,2]$?', 'هل يمكن تطبيق مبرهنة بولتسانو على $f(x)=\\frac{1}{x-1}$ في $[0,2]$؟', 'Can Bolzano\'s theorem be applied to $f(x)=\\frac{1}{x-1}$ on $[0,2]$?'), solution: say('Ez: ez da jarraitua $x=1$ puntuan, nahiz eta $f(0)=-1$ eta $f(2)=1$ izan.', 'No: no es continua en $x=1$, aunque $f(0)=-1$ y $f(2)=1$.', 'لا: ليست متصلة عند $x=1$ مع أن $f(0)=-1$ و$f(2)=1$.', 'No: it is not continuous at $x=1$, even though $f(0)=-1$ and $f(2)=1$.') }
        ]
    }
]

import type { UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { localizeNames, same, say } from '../batx1-zientziak-funtzioak/text'
import { BolzanoEquationFigure, EpsilonDeltaFigure, InfinityBandFigure, IntermediateFigure, IntervalFigure, MinusInfinityFigure, OneInfinityFigure, OrdersFigure, ParameterFigure, ReviewContinuityFigure, ReviewInfinityFigure, ReviewPointFigure, SineLimitFigure, TwoParametersFigure, WeierstrassFigure } from './figures'
import { bach2LimitsLessonChecks, type Bach2LimitsTopicId } from './lessonChecks'
import { bach2LimitsLessonTexts } from './lessonTexts'

/* ==========================================================================
   Limiteak eta jarraitutasuna · Batxilergoa 2 · Zientziak — stages and
   lessons. The scope follows unit 7 of Santillana 2.º Bachillerato
   Ciencias, in its order (limits at infinity and at a point, continuity,
   Bolzano, intermediate values and Weierstrass), with unit 7 of Anaya
   Matemáticas II (the ε–δ definition, comparing infinities, sin x / x).
   What 1.º Bachillerato already taught (0/0, ∞/∞, ∞ − ∞, the kinds of
   discontinuity) is one short review stage linked to its lessons; the
   asymptotes go to «Representación de funciones» and L'Hôpital to
   «Aplicaciones de la derivada», as in Santillana (owner, 2026-11-09).
   ========================================================================== */

export type Bach2LimitsStageId = 'review' | 'definition' | 'notable' | 'continuity' | 'theorems'

export const bach2LimitsStages: UnitStage[] = [
    { id: 'review', tone: 'blue', title: { eu: 'Batxilergoko 1. mailako errepasoa', es: 'Repaso de 1.º de Bachillerato', en: 'Review of 1st Bachillerato', ar: 'مراجعة السنة الأولى من البكالوريا' } },
    { id: 'definition', tone: 'violet', title: { eu: 'Definizio zehatza', es: 'La definición exacta', en: 'The exact definition', ar: 'التعريف الدقيق' } },
    { id: 'notable', tone: 'mustard', title: { eu: 'Infinituak eta limite nabarmenak', es: 'Infinitos y límites notables', en: 'Infinities and notable limits', ar: 'اللانهايات والنهايات الشهيرة' } },
    { id: 'continuity', tone: 'coral', title: { eu: 'Jarraitutasuna sakonago', es: 'Continuidad a fondo', en: 'Continuity in depth', ar: 'الاتصال بعمق' } },
    { id: 'theorems', tone: 'green', title: { eu: 'Funtzio jarraituen teoremak', es: 'Teoremas de las funciones continuas', en: 'Theorems on continuous functions', ar: 'مبرهنات الدوال المتصلة' } }
]

const LIMITS1 = 'batx1-zientziak/limites-continuidad'
const FUNCTIONS1 = 'batx1-zientziak/funciones'

/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    /* ---------- 1. Review of 1.º ---------- */
    {
        id: 'review-point',
        stage: 'review',
        title: say('Limiteak puntu batean: errepasoa', 'Límites en un punto: repaso', 'النهايات عند نقطة: مراجعة', 'Limits at a point: review'),
        goal: say('Puntu bateko limitea nola kalkulatzen den gogoratzea: ordezkatu, $\\frac{k}{0}$ alde bakoitzeko zeinuarekin, eta $\\frac{0}{0}$ faktorizatuz edo konjokatuaz.', 'Recordar cómo se calcula un límite en un punto: sustituir, $\\frac{k}{0}$ con el signo a cada lado y $\\frac{0}{0}$ factorizando o con el conjugado.', 'تذكّر طريقة حساب النهاية عند نقطة: التعويض، و$\\frac{k}{0}$ مع الإشارة على كل جانب، و$\\frac{0}{0}$ بالتحليل أو بالمرافق.', 'Recall how a limit at a point is worked out: substitute, $\\frac{k}{0}$ with the sign on each side, and $\\frac{0}{0}$ by factorising or with the conjugate.'),
        needs: [
            { unit: LIMITS1, topic: 'one-sided', title: { eu: 'Alboko limiteak', es: 'Límites laterales', en: 'One-sided limits', ar: 'النهايتان الجانبيتان' } },
            { unit: LIMITS1, topic: 'zero-zero', title: { eu: 'Zero zati zero: faktorizatu', es: 'Cero entre cero: factorizar', en: 'Zero over zero: factorising', ar: 'صفر على صفر: التحليل' } },
            { unit: LIMITS1, topic: 'roots', title: { eu: 'Erroak: konjokatuaz biderkatu', es: 'Raíces: multiplicar por el conjugado', en: 'Roots: multiplying by the conjugate', ar: 'الجذور: الضرب في المرافق' } }
        ],
        problem: say('Kalkulatu $\\lim_{x\\to 2}\\frac{x^2-x-2}{x^2-4}$.', 'Calcula $\\lim_{x\\to 2}\\frac{x^2-x-2}{x^2-4}$.', 'احسب $\\lim_{x\\to 2}\\frac{x^2-x-2}{x^2-4}$.', 'Work out $\\lim_{x\\to 2}\\frac{x^2-x-2}{x^2-4}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ordezkatuz gero, $\\frac{0}{0}$: indeterminazioa.', 'Al sustituir sale $\\frac{0}{0}$: indeterminación.', 'بالتعويض نجد $\\frac{0}{0}$: حالة عدم تعيين.', 'Substituting gives $\\frac{0}{0}$: indeterminate.'), math: same('$\\frac{4-2-2}{4-4}$') },
            { text: say('Faktorizatu eta sinplifikatu $x-2$.', 'Factoriza y simplifica $x-2$.', 'حلّل واختصر $x-2$.', 'Factorise and cancel $x-2$.'), math: same('$\\frac{(x-2)(x+1)}{(x-2)(x+2)}=\\frac{x+1}{x+2}$') },
            { text: say('Ordezkatu berriro.', 'Vuelve a sustituir.', 'عوّض من جديد.', 'Substitute again.'), math: same('$\\frac{2+1}{2+2}=\\frac{3}{4}$') }
        ],
        takeaway: say('Lehenik ordezkatu. $\\frac{k}{0}$ bada, limitea infinitua da eta zeinua alde bakoitzean begiratzen da; $\\frac{0}{0}$ bada, faktorizatu (edo konjokatua erabili erroak badaude) eta ordezkatu berriro.', 'Primero se sustituye. Con $\\frac{k}{0}$ el límite es infinito y se mira el signo a cada lado; con $\\frac{0}{0}$ se factoriza (o se usa el conjugado si hay raíces) y se vuelve a sustituir.', 'نعوّض أولًا. مع $\\frac{k}{0}$ تكون النهاية لانهائية وننظر إلى الإشارة على كل جانب؛ ومع $\\frac{0}{0}$ نحلّل (أو نستعمل المرافق إذا وُجدت جذور) ثم نعوّض من جديد.', 'Substitute first. With $\\frac{k}{0}$ the limit is infinite and you look at the sign on each side; with $\\frac{0}{0}$ you factorise (or use the conjugate if there are roots) and substitute again.'),
        figure: (language) => <ReviewPointFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'review-infinity',
        stage: 'review',
        title: say('Limiteak infinituan: errepasoa', 'Límites en el infinito: repaso', 'النهايات عند اللانهاية: مراجعة', 'Limits at infinity: review'),
        goal: say('Infinituko indeterminazioak gogoratzea: $\\frac{\\infty}{\\infty}$ mailak alderatuz, $\\infty-\\infty$ konjokatuaz edo izendatzaile komunarekin, eta $1^{\\infty}$ $e$ zenbakiarekin.', 'Recordar las indeterminaciones en el infinito: $\\frac{\\infty}{\\infty}$ comparando grados, $\\infty-\\infty$ con el conjugado o un denominador común y $1^{\\infty}$ con el número $e$.', 'تذكّر حالات عدم التعيين عند اللانهاية: $\\frac{\\infty}{\\infty}$ بمقارنة الدرجات، و$\\infty-\\infty$ بالمرافق أو بتوحيد المقامات، و$1^{\\infty}$ بالعدد $e$.', 'Recall the indeterminate forms at infinity: $\\frac{\\infty}{\\infty}$ by comparing degrees, $\\infty-\\infty$ with the conjugate or a common denominator, and $1^{\\infty}$ with the number $e$.'),
        needs: [
            { unit: LIMITS1, topic: 'degrees', title: { eu: 'Polinomioen zatidurak infinituan', es: 'Cocientes de polinomios en el infinito', en: 'Quotients of polynomials at infinity', ar: 'خوارج قسمة الحدوديات عند اللانهاية' } },
            { unit: LIMITS1, topic: 'infinity-minus', title: { eu: 'Infinitu ken infinitu', es: 'Infinito menos infinito', en: 'Infinity minus infinity', ar: 'لانهاية ناقص لانهاية' } },
            { unit: LIMITS1, topic: 'e-limits', title: { eu: 'Bat infinitura berretuta eta e zenbakia', es: 'Uno elevado a infinito y el número e', en: 'One to the power of infinity and the number e', ar: 'واحد أس لانهاية والعدد e' } }
        ],
        problem: say('Kalkulatu $\\lim_{x\\to+\\infty}\\left(\\sqrt{x^2+6x}-x\\right)$.', 'Calcula $\\lim_{x\\to+\\infty}\\left(\\sqrt{x^2+6x}-x\\right)$.', 'احسب $\\lim_{x\\to+\\infty}\\left(\\sqrt{x^2+6x}-x\\right)$.', 'Work out $\\lim_{x\\to+\\infty}\\left(\\sqrt{x^2+6x}-x\\right)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$\\infty-\\infty$ da: biderkatu eta zatitu konjokatuaz.', 'Sale $\\infty-\\infty$: multiplica y divide por el conjugado.', 'تظهر $\\infty-\\infty$: اضرب واقسم على المرافق.', 'It gives $\\infty-\\infty$: multiply and divide by the conjugate.'), math: same('$\\frac{(x^2+6x)-x^2}{\\sqrt{x^2+6x}+x}=\\frac{6x}{\\sqrt{x^2+6x}+x}$') },
            { text: say('Orain $\\frac{\\infty}{\\infty}$ da, maila berarekin: zatitu $x$ aldagaiaz.', 'Ahora es $\\frac{\\infty}{\\infty}$ con el mismo grado: divide entre $x$.', 'صارت $\\frac{\\infty}{\\infty}$ بالدرجة نفسها: اقسم على $x$.', 'Now it is $\\frac{\\infty}{\\infty}$ with the same degree: divide by $x$.'), math: same('$\\frac{6}{\\sqrt{1+\\frac{6}{x}}+1}$') },
            { text: say('$x\\to+\\infty$ denean, $\\frac{6}{x}\\to 0$.', 'Cuando $x\\to+\\infty$, $\\frac{6}{x}\\to 0$.', 'عندما $x\\to+\\infty$ يكون $\\frac{6}{x}\\to 0$.', 'As $x\\to+\\infty$, $\\frac{6}{x}\\to 0$.'), math: same('$\\frac{6}{\\sqrt{1}+1}=3$') }
        ],
        takeaway: say('$\\frac{\\infty}{\\infty}$ denean, maila handieneko gaiak agintzen du; $\\infty-\\infty$ denean, zatidura bihurtzen da (konjokatua edo izendatzaile komuna); $1^{\\infty}$ denean, $\\lim f^{g}=e^{\\lim g\\,(f-1)}$.', 'En $\\frac{\\infty}{\\infty}$ manda el término de mayor grado; en $\\infty-\\infty$ se pasa a un cociente (conjugado o denominador común); en $1^{\\infty}$, $\\lim f^{g}=e^{\\lim g\\,(f-1)}$.', 'في $\\frac{\\infty}{\\infty}$ يتحكم الحد ذو الدرجة الأكبر؛ وفي $\\infty-\\infty$ نحوّلها إلى خارج قسمة (بالمرافق أو بتوحيد المقامات)؛ وفي $1^{\\infty}$ نستعمل $\\lim f^{g}=e^{\\lim g\\,(f-1)}$.', 'In $\\frac{\\infty}{\\infty}$ the term of highest degree rules; in $\\infty-\\infty$ you turn it into a quotient (conjugate or common denominator); in $1^{\\infty}$, $\\lim f^{g}=e^{\\lim g\\,(f-1)}$.'),
        figure: (language) => <ReviewInfinityFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'review-continuity',
        stage: 'review',
        title: say('Jarraitutasuna: errepasoa', 'Continuidad: repaso', 'الاتصال: مراجعة', 'Continuity: review'),
        goal: say('Puntu bateko jarraitutasunaren hiru baldintzak eta etenune motak gogoratzea: saihesgarria, jauzi finitukoa eta jauzi infinitukoa.', 'Recordar las tres condiciones de la continuidad en un punto y los tipos de discontinuidad: evitable, de salto finito y de salto infinito.', 'تذكّر شروط الاتصال الثلاثة عند نقطة وأنواع الانقطاع: القابل للإزالة، والقفزة المنتهية، والقفزة اللانهائية.', 'Recall the three conditions for continuity at a point and the kinds of discontinuity: removable, finite jump and infinite jump.'),
        needs: [
            { unit: LIMITS1, topic: 'continuous', title: { eu: 'Funtzio jarraitua puntu batean', es: 'Función continua en un punto', en: 'A function continuous at a point', ar: 'الدالة المتصلة عند نقطة' } },
            { unit: LIMITS1, topic: 'discontinuities', title: { eu: 'Etenune motak', es: 'Tipos de discontinuidad', en: 'Kinds of discontinuity', ar: 'أنواع الانقطاع' } }
        ],
        problem: say('Aztertu eta sailkatu funtzio honen etenuneak: $f(x)=\\frac{x^2-1}{x^2-x}$', 'Estudia y clasifica las discontinuidades de esta función: $f(x)=\\frac{x^2-1}{x^2-x}$', 'ادرس انقطاعات هذه الدالة وصنّفها: $f(x)=\\frac{x^2-1}{x^2-x}$', 'Study and classify the discontinuities of this function: $f(x)=\\frac{x^2-1}{x^2-x}$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Izendatzailea 0 da $x=0$ eta $x=1$ puntuetan: han ez dago $f$.', 'El denominador se anula en $x=0$ y en $x=1$: ahí no existe $f$.', 'ينعدم المقام عند $x=0$ وعند $x=1$: هناك لا توجد $f$.', 'The denominator is 0 at $x=0$ and at $x=1$: $f$ does not exist there.'), math: same('$x^2-x=x(x-1)$') },
            { text: say('$x=1$ puntuan $\\frac{0}{0}$ da: sinplifikatu. Limitea 2 da: etenune saihesgarria.', 'En $x=1$ sale $\\frac{0}{0}$: simplifica. El límite es 2: discontinuidad evitable.', 'عند $x=1$ نجد $\\frac{0}{0}$: اختصر. النهاية 2: انقطاع قابل للإزالة.', 'At $x=1$ it gives $\\frac{0}{0}$: cancel. The limit is 2: a removable discontinuity.'), math: same('$\\frac{(x-1)(x+1)}{x(x-1)}=\\frac{x+1}{x}\\ \\to\\ \\frac{1+1}{1}=2$') },
            { text: say('$x=0$ puntuan $\\frac{-1}{0}$ da: jauzi infinitua eta asintota bertikala.', 'En $x=0$ sale $\\frac{-1}{0}$: salto infinito y asíntota vertical.', 'عند $x=0$ نجد $\\frac{-1}{0}$: قفزة لانهائية ومقارب رأسي.', 'At $x=0$ it gives $\\frac{-1}{0}$: an infinite jump and a vertical asymptote.'), math: same('$\\lim_{x\\to 0^-}f(x)=-\\infty\\qquad\\lim_{x\\to 0^+}f(x)=+\\infty$') }
        ],
        takeaway: say('$f$ jarraitua da $a$ puntuan $f(a)$ badago, $\\lim_{x\\to a}f(x)$ badago eta berdinak badira. Limitea badago baina beste zerbait huts egiten badu, etenunea saihesgarria da; alboko limiteak desberdinak badira, jauzi finitukoa; bat infinitua bada, jauzi infinitukoa.', '$f$ es continua en $a$ si existe $f(a)$, existe $\\lim_{x\\to a}f(x)$ y coinciden. Si el límite existe pero falla lo demás, la discontinuidad es evitable; si los laterales son distintos, de salto finito; si alguno es infinito, de salto infinito.', 'تكون $f$ متصلة عند $a$ إذا وُجدت $f(a)$ ووُجدت $\\lim_{x\\to a}f(x)$ وتساوتا. إذا وُجدت النهاية واختل شرط آخر فالانقطاع قابل للإزالة؛ وإذا اختلفت النهايتان الجانبيتان فهو قفزة منتهية؛ وإذا كانت إحداهما لانهائية فهو قفزة لانهائية.', '$f$ is continuous at $a$ if $f(a)$ exists, $\\lim_{x\\to a}f(x)$ exists and they are equal. If the limit exists but something else fails, the discontinuity is removable; if the one-sided limits differ, a finite jump; if one is infinite, an infinite jump.'),
        figure: (language) => <ReviewContinuityFigure language={language} />,
        figureAfterSteps: true
    },

    /* ---------- 2. The exact definition ---------- */
    {
        id: 'epsilon-delta',
        stage: 'definition',
        title: say('Limitearen definizioa: epsilon eta delta', 'Definición de límite: épsilon y delta', 'تعريف النهاية: إبسيلون ودلتا', 'The definition of a limit: epsilon and delta'),
        goal: say('$\\lim_{x\\to a}f(x)=L$ adierazpenaren definizio zehatza ulertzea, eta $\\varepsilon$ bat emanda, balio duen $\\delta$ bat aurkitzea.', 'Entender la definición exacta de $\\lim_{x\\to a}f(x)=L$ y, dado un $\\varepsilon$, encontrar un $\\delta$ que sirva.', 'فهم التعريف الدقيق لـ $\\lim_{x\\to a}f(x)=L$، وإيجاد $\\delta$ مناسبة إذا أُعطيت $\\varepsilon$.', 'Understand the exact definition of $\\lim_{x\\to a}f(x)=L$ and, given an $\\varepsilon$, find a $\\delta$ that works.'),
        needs: [
            { unit: 'batx1-zientziak/numeros-reales', topic: 'absolute-value', title: { eu: 'Balio absolutua eta distantzia', es: 'Valor absoluto y distancia', en: 'Absolute value and distance', ar: 'القيمة المطلقة والمسافة' } },
            { unit: 'batx1-zientziak/numeros-reales', topic: 'neighbourhoods', title: { eu: 'Inguruneak', es: 'Entornos', en: 'Neighbourhoods', ar: 'الجوارات' } }
        ],
        problem: say('Badakigu $\\lim_{x\\to 1}(3x-1)=2$ dela. Aurkitu $\\varepsilon=0{,}3$ baliorako balio duen $\\delta$ bat.', 'Sabiendo que $\\lim_{x\\to 1}(3x-1)=2$, halla un $\\delta$ que sirva para $\\varepsilon=0{,}3$.', 'نعلم أن $\\lim_{x\\to 1}(3x-1)=2$. أوجد $\\delta$ مناسبة لـ $\\varepsilon=0{,}3$.', 'Knowing that $\\lim_{x\\to 1}(3x-1)=2$, find a $\\delta$ that works for $\\varepsilon=0{,}3$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Idatzi 2 baliorako distantzia $|x-1|$ erabiliz.', 'Escribe la distancia a 2 en función de $|x-1|$.', 'اكتب المسافة إلى 2 بدلالة $|x-1|$.', 'Write the distance to 2 in terms of $|x-1|$.'), math: same('$|(3x-1)-2|=|3x-3|=3|x-1|$') },
            { text: say('Eskatu $\\varepsilon$ baino txikiagoa izatea.', 'Pide que sea menor que $\\varepsilon$.', 'اشترط أن تكون أصغر من $\\varepsilon$.', 'Ask for it to be less than $\\varepsilon$.'), math: same('$3|x-1|<0{,}3\\ \\to\\ |x-1|<0{,}1$') },
            { text: say('$\\delta=0{,}1$ balio du (eta txikiagoa den edozein $\\delta$).', 'Sirve $\\delta=0{,}1$ (y cualquier $\\delta$ más pequeño).', 'تصلح $\\delta=0{,}1$ (وأي $\\delta$ أصغر منها).', '$\\delta=0{,}1$ works (and any smaller $\\delta$).'), math: same('$\\delta=\\frac{0{,}3}{3}=0{,}1$') }
        ],
        takeaway: say('$\\lim_{x\\to a}f(x)=L$: $\\varepsilon>0$ bakoitzerako $\\delta>0$ bat dago, $0<|x-a|<\\delta$ bada $|f(x)-L|<\\varepsilon$ izateko. Zenbat eta txikiagoa $\\varepsilon$, orduan eta txikiagoa izan ohi da $\\delta$.', '$\\lim_{x\\to a}f(x)=L$: para cada $\\varepsilon>0$ hay un $\\delta>0$ tal que, si $0<|x-a|<\\delta$, entonces $|f(x)-L|<\\varepsilon$. Cuanto menor es $\\varepsilon$, menor suele ser $\\delta$.', '$\\lim_{x\\to a}f(x)=L$: لكل $\\varepsilon>0$ توجد $\\delta>0$ بحيث إذا كان $0<|x-a|<\\delta$ فإن $|f(x)-L|<\\varepsilon$. وكلما صغرت $\\varepsilon$ صغرت $\\delta$ عادةً.', '$\\lim_{x\\to a}f(x)=L$: for every $\\varepsilon>0$ there is a $\\delta>0$ such that, if $0<|x-a|<\\delta$, then $|f(x)-L|<\\varepsilon$. The smaller $\\varepsilon$ is, the smaller $\\delta$ usually is.'),
        figure: (language) => <EpsilonDeltaFigure language={language} />
    },
    {
        id: 'infinite-definitions',
        stage: 'definition',
        title: say('Infinitua duten definizioak', 'Definiciones con el infinito', 'تعريفات فيها اللانهاية', 'Definitions with infinity'),
        goal: say('$\\lim_{x\\to+\\infty}f(x)=L$ eta $\\lim_{x\\to a}f(x)=+\\infty$ adierazpenek zer esan nahi duten zenbakiekin idaztea, eta zein $x$ baliotik aurrera betetzen den aurkitzea.', 'Escribir con números qué quieren decir $\\lim_{x\\to+\\infty}f(x)=L$ y $\\lim_{x\\to a}f(x)=+\\infty$, y encontrar desde qué $x$ se cumple.', 'كتابة معنى $\\lim_{x\\to+\\infty}f(x)=L$ و$\\lim_{x\\to a}f(x)=+\\infty$ بالأعداد، وإيجاد ابتداءً من أي $x$ يتحقق ذلك.', 'Write with numbers what $\\lim_{x\\to+\\infty}f(x)=L$ and $\\lim_{x\\to a}f(x)=+\\infty$ mean, and find from which $x$ on it holds.'),
        needs: [
            { unit: 'batx1-zientziak/sucesiones', topic: 'from-term', title: { eu: 'Zein gaitik aurrera?', es: '¿A partir de qué término?', en: 'From which term on?', ar: 'ابتداءً من أيّ حد؟' } }
        ],
        problem: say('Badakigu $\\lim_{x\\to+\\infty}\\frac{2x+1}{x}=2$ dela. Zein $x$ baliotik aurrera dago $f(x)$ 2 baliotik $0{,}01$ baino gutxiagora?', 'Se sabe que $\\lim_{x\\to+\\infty}\\frac{2x+1}{x}=2$. ¿A partir de qué $x$ dista $f(x)$ de 2 menos de $0{,}01$?', 'نعلم أن $\\lim_{x\\to+\\infty}\\frac{2x+1}{x}=2$. ابتداءً من أي $x$ تكون المسافة بين $f(x)$ و2 أقل من $0{,}01$؟', 'We know that $\\lim_{x\\to+\\infty}\\frac{2x+1}{x}=2$. From which $x$ on is $f(x)$ less than $0{,}01$ away from 2?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Kalkulatu 2 baliorako distantzia ($x>0$).', 'Calcula la distancia a 2 ($x>0$).', 'احسب المسافة إلى 2 ($x>0$).', 'Work out the distance to 2 ($x>0$).'), math: same('$\\left|\\frac{2x+1}{x}-2\\right|=\\frac{1}{x}$') },
            { text: say('Eskatu $0{,}01$ baino txikiagoa izatea.', 'Pide que sea menor que $0{,}01$.', 'اشترط أن تكون أصغر من $0{,}01$.', 'Ask for it to be less than $0{,}01$.'), math: same('$\\frac{1}{x}<0{,}01\\ \\to\\ x>100$') },
            { text: say('$K=100$ balio du: $x>100$ bada, $f(x)$ bandaren barruan dago.', 'Sirve $K=100$: si $x>100$, $f(x)$ queda dentro de la banda.', 'تصلح $K=100$: إذا كان $x>100$ فإن $f(x)$ داخل الشريط.', '$K=100$ works: if $x>100$, $f(x)$ is inside the band.') }
        ],
        takeaway: say('$\\lim_{x\\to+\\infty}f(x)=L$: $\\varepsilon>0$ bakoitzerako $K$ bat dago, $x>K$ bada $|f(x)-L|<\\varepsilon$ izateko. $\\lim_{x\\to a}f(x)=+\\infty$: $M$ bakoitzerako $\\delta>0$ bat dago, $0<|x-a|<\\delta$ bada $f(x)>M$ izateko.', '$\\lim_{x\\to+\\infty}f(x)=L$: para cada $\\varepsilon>0$ hay un $K$ tal que, si $x>K$, $|f(x)-L|<\\varepsilon$. $\\lim_{x\\to a}f(x)=+\\infty$: para cada $M$ hay un $\\delta>0$ tal que, si $0<|x-a|<\\delta$, $f(x)>M$.', '$\\lim_{x\\to+\\infty}f(x)=L$: لكل $\\varepsilon>0$ يوجد $K$ بحيث إذا كان $x>K$ فإن $|f(x)-L|<\\varepsilon$. و$\\lim_{x\\to a}f(x)=+\\infty$: لكل $M$ توجد $\\delta>0$ بحيث إذا كان $0<|x-a|<\\delta$ فإن $f(x)>M$.', '$\\lim_{x\\to+\\infty}f(x)=L$: for every $\\varepsilon>0$ there is a $K$ such that, if $x>K$, $|f(x)-L|<\\varepsilon$. $\\lim_{x\\to a}f(x)=+\\infty$: for every $M$ there is a $\\delta>0$ such that, if $0<|x-a|<\\delta$, $f(x)>M$.'),
        figure: (language) => <InfinityBandFigure language={language} />
    },
    {
        id: 'minus-infinity',
        stage: 'definition',
        title: say('x minus infinitura doanean', 'Cuando x tiende a menos infinito', 'عندما يؤول x إلى سالب لانهاية', 'When x tends to minus infinity'),
        goal: say('$x\\to-\\infty$ denean limiteak kalkulatzea $x=-t$ aldaketarekin, ahaztu gabe $\\sqrt{x^2}=|x|=-x$ dela $x<0$ denean.', 'Calcular límites cuando $x\\to-\\infty$ con el cambio $x=-t$, sin olvidar que $\\sqrt{x^2}=|x|=-x$ si $x<0$.', 'حساب النهايات عندما $x\\to-\\infty$ بالتعويض $x=-t$، دون نسيان أن $\\sqrt{x^2}=|x|=-x$ إذا كان $x<0$.', 'Work out limits as $x\\to-\\infty$ with the change $x=-t$, without forgetting that $\\sqrt{x^2}=|x|=-x$ if $x<0$.'),
        needs: [
            { unit: LIMITS1, topic: 'degrees', title: { eu: 'Polinomioen zatidurak infinituan', es: 'Cocientes de polinomios en el infinito', en: 'Quotients of polynomials at infinity', ar: 'خوارج قسمة الحدوديات عند اللانهاية' } }
        ],
        problem: say('Kalkulatu $\\lim_{x\\to-\\infty}\\frac{\\sqrt{x^2+1}}{2x}$.', 'Calcula $\\lim_{x\\to-\\infty}\\frac{\\sqrt{x^2+1}}{2x}$.', 'احسب $\\lim_{x\\to-\\infty}\\frac{\\sqrt{x^2+1}}{2x}$.', 'Work out $\\lim_{x\\to-\\infty}\\frac{\\sqrt{x^2+1}}{2x}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Aldatu $x=-t$, $t\\to+\\infty$ izanik.', 'Cambia $x=-t$, con $t\\to+\\infty$.', 'ضع $x=-t$ مع $t\\to+\\infty$.', 'Change $x=-t$, with $t\\to+\\infty$.'), math: same('$\\lim_{t\\to+\\infty}\\frac{\\sqrt{t^2+1}}{-2t}$') },
            { text: say('Maila bera goian eta behean ($\\sqrt{t^2}=t$).', 'Mismo grado arriba y abajo ($\\sqrt{t^2}=t$).', 'الدرجة نفسها في البسط والمقام ($\\sqrt{t^2}=t$).', 'Same degree on top and below ($\\sqrt{t^2}=t$).'), math: same('$\\frac{t}{-2t}=-\\frac{1}{2}$') },
            { text: say('$+\\infty$ aldean $\\frac{1}{2}$ da: bi asintota horizontal desberdin daude.', 'En $+\\infty$ sale $\\frac{1}{2}$: hay dos asíntotas horizontales distintas.', 'عند $+\\infty$ نجد $\\frac{1}{2}$: يوجد مقاربان أفقيان مختلفان.', 'At $+\\infty$ it gives $\\frac{1}{2}$: there are two different horizontal asymptotes.'), math: same('$\\lim_{x\\to+\\infty}\\frac{\\sqrt{x^2+1}}{2x}=\\frac{1}{2}$') }
        ],
        takeaway: say('$x\\to-\\infty$ denean, aldatu $x$ eta $-t$ jarri, eta kalkulatu limitea $t\\to+\\infty$ denean. Erroekin, $\\sqrt{x^2}=|x|$: $x$ negatiboa bada, $\\sqrt{x^2}=-x$. $+\\infty$ eta $-\\infty$ aldeetako limiteak desberdinak izan daitezke.', 'Para $x\\to-\\infty$, cambia $x$ por $-t$ y calcula el límite cuando $t\\to+\\infty$. Con raíces, $\\sqrt{x^2}=|x|$: si $x$ es negativo, $\\sqrt{x^2}=-x$. Los límites en $+\\infty$ y en $-\\infty$ pueden ser distintos.', 'عندما $x\\to-\\infty$ ضع $-t$ مكان $x$ واحسب النهاية عندما $t\\to+\\infty$. ومع الجذور $\\sqrt{x^2}=|x|$: إذا كان $x$ سالبًا فإن $\\sqrt{x^2}=-x$. وقد تختلف النهايتان عند $+\\infty$ وعند $-\\infty$.', 'For $x\\to-\\infty$, change $x$ into $-t$ and work out the limit as $t\\to+\\infty$. With roots, $\\sqrt{x^2}=|x|$: if $x$ is negative, $\\sqrt{x^2}=-x$. The limits at $+\\infty$ and at $-\\infty$ can be different.'),
        figure: (language) => <MinusInfinityFigure language={language} />,
        figureAfterSteps: true
    },

    /* ---------- 3. Infinities and notable limits ---------- */
    {
        id: 'orders',
        stage: 'notable',
        title: say('Infinituak alderatzea', 'Comparar infinitos', 'مقارنة اللانهايات', 'Comparing infinities'),
        goal: say('Infinituak ordenatzea (logaritmoa, berreketa, esponentziala) eta ordena hori erabiltzea $+\\infty$ aldeko limiteak eragiketarik egin gabe kalkulatzeko.', 'Ordenar los infinitos (logaritmo, potencia, exponencial) y usar ese orden para calcular límites en $+\\infty$ sin operar.', 'ترتيب اللانهايات (اللوغاريتم والقوة والأسية) واستعمال هذا الترتيب لحساب النهايات عند $+\\infty$ دون حساب طويل.', 'Put the infinities in order (logarithm, power, exponential) and use that order to work out limits at $+\\infty$ without long calculations.'),
        needs: [
            { unit: FUNCTIONS1, topic: 'exp-log', title: { eu: 'Esponentziala eta logaritmoa, alderantzizkoak', es: 'Exponencial y logaritmo, inversas', en: 'Exponential and logarithm, inverses', ar: 'الأسية واللوغاريتمية دالتان عكسيتان' } }
        ],
        problem: say('Kalkulatu $\\lim_{x\\to+\\infty}\\frac{e^x+x^3}{2e^x-x}$.', 'Calcula $\\lim_{x\\to+\\infty}\\frac{e^x+x^3}{2e^x-x}$.', 'احسب $\\lim_{x\\to+\\infty}\\frac{e^x+x^3}{2e^x-x}$.', 'Work out $\\lim_{x\\to+\\infty}\\frac{e^x+x^3}{2e^x-x}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Goian eta behean $e^x$ gaiak agintzen du: $x^3$ eta $x$ ordena txikiagoko infinituak dira.', 'Arriba y abajo manda $e^x$: $x^3$ y $x$ son infinitos de orden menor.', 'في البسط والمقام يتحكم $e^x$: فـ $x^3$ و$x$ لانهايتان من رتبة أصغر.', 'On top and below $e^x$ rules: $x^3$ and $x$ are infinities of lower order.'), math: same('$e^x\\gg x^3\\qquad e^x\\gg x$') },
            { text: say('Zatitu goian eta behean $e^x$ adierazpenaz.', 'Divide arriba y abajo entre $e^x$.', 'اقسم البسط والمقام على $e^x$.', 'Divide top and bottom by $e^x$.'), math: same('$\\frac{1+\\frac{x^3}{e^x}}{2-\\frac{x}{e^x}}$') },
            { text: say('$\\frac{x^3}{e^x}\\to 0$ eta $\\frac{x}{e^x}\\to 0$.', '$\\frac{x^3}{e^x}\\to 0$ y $\\frac{x}{e^x}\\to 0$.', '$\\frac{x^3}{e^x}\\to 0$ و$\\frac{x}{e^x}\\to 0$.', '$\\frac{x^3}{e^x}\\to 0$ and $\\frac{x}{e^x}\\to 0$.'), math: same('$\\frac{1+0}{2-0}=\\frac{1}{2}$') }
        ],
        takeaway: say('$x\\to+\\infty$ denean: $\\ln x\\ll x^p\\ll a^x\\ll x^x$ ($p>0$, $a>1$). Zatidura batean, ordena handieneko infinitua goian badago, limitea $\\infty$ da; behean badago, 0; bera bada, koefizienteak zatitzen dira.', 'Cuando $x\\to+\\infty$: $\\ln x\\ll x^p\\ll a^x\\ll x^x$ ($p>0$, $a>1$). En un cociente, si el infinito de mayor orden está arriba, el límite es $\\infty$; si está abajo, 0; si es el mismo, se dividen los coeficientes.', 'عندما $x\\to+\\infty$: $\\ln x\\ll x^p\\ll a^x\\ll x^x$ ($p>0$، $a>1$). في خارج القسمة، إذا كانت اللانهاية ذات الرتبة الأكبر في البسط فالنهاية $\\infty$؛ وإذا كانت في المقام فهي 0؛ وإذا كانت نفسها نقسم المعاملين.', 'As $x\\to+\\infty$: $\\ln x\\ll x^p\\ll a^x\\ll x^x$ ($p>0$, $a>1$). In a quotient, if the infinity of highest order is on top, the limit is $\\infty$; if it is below, 0; if it is the same, divide the coefficients.'),
        figure: (language) => <OrdersFigure language={language} />
    },
    {
        id: 'one-infinity',
        stage: 'notable',
        title: say('Bat infinitura berretuta, orokorrean', 'Uno elevado a infinito, en general', 'واحد أس لانهاية بشكل عام', 'One to the power of infinity, in general'),
        goal: say('$1^{\\infty}$ indeterminazioa ebaztea puntu batean edo infinituan, $e^{\\lim g\\,(f-1)}$ formularekin.', 'Resolver la indeterminación $1^{\\infty}$ en un punto o en el infinito con la fórmula $e^{\\lim g\\,(f-1)}$.', 'حل حالة عدم التعيين $1^{\\infty}$ عند نقطة أو عند اللانهاية بالصيغة $e^{\\lim g\\,(f-1)}$.', 'Resolve the indeterminate form $1^{\\infty}$ at a point or at infinity with the formula $e^{\\lim g\\,(f-1)}$.'),
        needs: [
            { unit: LIMITS1, topic: 'e-limits', title: { eu: 'Bat infinitura berretuta eta e zenbakia', es: 'Uno elevado a infinito y el número e', en: 'One to the power of infinity and the number e', ar: 'واحد أس لانهاية والعدد e' } }
        ],
        problem: say('Kalkulatu $\\lim_{x\\to 0}(1+3x)^{\\frac{2}{x}}$.', 'Calcula $\\lim_{x\\to 0}(1+3x)^{\\frac{2}{x}}$.', 'احسب $\\lim_{x\\to 0}(1+3x)^{\\frac{2}{x}}$.', 'Work out $\\lim_{x\\to 0}(1+3x)^{\\frac{2}{x}}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Oinarria 1 baliora doa eta berretzailea $\\infty$ aldera: $1^{\\infty}$ da.', 'La base tiende a 1 y el exponente a $\\infty$: es $1^{\\infty}$.', 'الأساس يؤول إلى 1 والأس إلى $\\infty$: إنها $1^{\\infty}$.', 'The base tends to 1 and the exponent to $\\infty$: it is $1^{\\infty}$.'), math: same('$1+3x\\to 1\\qquad\\frac{2}{x}\\to\\infty$') },
            { text: say('Aplikatu $\\lim f^{g}=e^{\\lim g\\,(f-1)}$.', 'Aplica $\\lim f^{g}=e^{\\lim g\\,(f-1)}$.', 'طبّق $\\lim f^{g}=e^{\\lim g\\,(f-1)}$.', 'Apply $\\lim f^{g}=e^{\\lim g\\,(f-1)}$.'), math: same('$\\frac{2}{x}\\,(1+3x-1)=\\frac{2}{x}\\cdot 3x=6$') },
            { text: say('Limitea $e^{6}$ da.', 'El límite vale $e^{6}$.', 'النهاية تساوي $e^{6}$.', 'The limit is $e^{6}$.'), math: same('$\\lim_{x\\to 0}(1+3x)^{\\frac{2}{x}}=e^{6}$') }
        ],
        takeaway: say('$f(x)\\to 1$ eta $g(x)\\to\\infty$ badira, $\\lim f(x)^{g(x)}=e^{\\lim g(x)\\,(f(x)-1)}$. Berdin balio du $x\\to a$ denean eta $x\\to\\pm\\infty$ denean.', 'Si $f(x)\\to 1$ y $g(x)\\to\\infty$, entonces $\\lim f(x)^{g(x)}=e^{\\lim g(x)\\,(f(x)-1)}$. Vale igual cuando $x\\to a$ que cuando $x\\to\\pm\\infty$.', 'إذا كان $f(x)\\to 1$ و$g(x)\\to\\infty$ فإن $\\lim f(x)^{g(x)}=e^{\\lim g(x)\\,(f(x)-1)}$. ويصلح ذلك عندما $x\\to a$ وعندما $x\\to\\pm\\infty$.', 'If $f(x)\\to 1$ and $g(x)\\to\\infty$, then $\\lim f(x)^{g(x)}=e^{\\lim g(x)\\,(f(x)-1)}$. It works the same as $x\\to a$ and as $x\\to\\pm\\infty$.'),
        figure: (language) => <OneInfinityFigure language={language} />
    },
    {
        id: 'sine-limit',
        stage: 'notable',
        title: say('Limite trigonometriko nabarmena', 'El límite trigonométrico notable', 'النهاية المثلثية الشهيرة', 'The notable trigonometric limit'),
        goal: say('$\\lim_{x\\to 0}\\frac{\\sin x}{x}=1$ erabiltzea ($x$ radianetan) sinuak eta tangenteak dituzten limiteak kalkulatzeko.', 'Usar $\\lim_{x\\to 0}\\frac{\\sin x}{x}=1$ (con $x$ en radianes) para calcular límites con senos y tangentes.', 'استعمال $\\lim_{x\\to 0}\\frac{\\sin x}{x}=1$ (مع $x$ بالراديان) لحساب نهايات فيها جيوب وظلال.', 'Use $\\lim_{x\\to 0}\\frac{\\sin x}{x}=1$ (with $x$ in radians) to work out limits with sines and tangents.'),
        needs: [
            { unit: 'batx1-zientziak/funciones-trigonometricas', topic: 'radians-review', title: { eu: 'Graduak eta radianak', es: 'Grados y radianes', en: 'Degrees and radians', ar: 'الدرجات والراديان' } }
        ],
        problem: say('Kalkulatu $\\lim_{x\\to 0}\\frac{\\sin 5x}{2x}$.', 'Calcula $\\lim_{x\\to 0}\\frac{\\sin 5x}{2x}$.', 'احسب $\\lim_{x\\to 0}\\frac{\\sin 5x}{2x}$.', 'Work out $\\lim_{x\\to 0}\\frac{\\sin 5x}{2x}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$\\frac{0}{0}$ da. Bilatu $\\frac{\\sin u}{u}$ itxura, $u=5x$ izanik.', 'Sale $\\frac{0}{0}$. Busca la forma $\\frac{\\sin u}{u}$ con $u=5x$.', 'تظهر $\\frac{0}{0}$. ابحث عن الصورة $\\frac{\\sin u}{u}$ مع $u=5x$.', 'It gives $\\frac{0}{0}$. Look for the shape $\\frac{\\sin u}{u}$ with $u=5x$.'), math: same('$\\frac{\\sin 5x}{2x}=\\frac{5}{2}\\cdot\\frac{\\sin 5x}{5x}$') },
            { text: say('$x\\to 0$ denean, $u=5x$ ere 0 baliora doa.', 'Cuando $x\\to 0$, también $u=5x\\to 0$.', 'عندما $x\\to 0$ يؤول $u=5x$ أيضًا إلى 0.', 'As $x\\to 0$, also $u=5x\\to 0$.'), math: same('$\\frac{\\sin 5x}{5x}\\to 1$') },
            { text: say('Limitea $\\frac{5}{2}$ da.', 'El límite vale $\\frac{5}{2}$.', 'النهاية تساوي $\\frac{5}{2}$.', 'The limit is $\\frac{5}{2}$.'), math: same('$\\frac{5}{2}\\cdot 1=\\frac{5}{2}$') }
        ],
        takeaway: say('$x$ radianetan dagoenean, $\\lim_{x\\to 0}\\frac{\\sin x}{x}=1$. Horregatik, $\\frac{\\sin kx}{x}\\to k$, $\\frac{\\tan x}{x}\\to 1$ eta $\\frac{1-\\cos x}{x^2}\\to\\frac{1}{2}$.', 'Con $x$ en radianes, $\\lim_{x\\to 0}\\frac{\\sin x}{x}=1$. Por eso $\\frac{\\sin kx}{x}\\to k$, $\\frac{\\tan x}{x}\\to 1$ y $\\frac{1-\\cos x}{x^2}\\to\\frac{1}{2}$.', 'عندما يكون $x$ بالراديان فإن $\\lim_{x\\to 0}\\frac{\\sin x}{x}=1$. لذلك $\\frac{\\sin kx}{x}\\to k$ و$\\frac{\\tan x}{x}\\to 1$ و$\\frac{1-\\cos x}{x^2}\\to\\frac{1}{2}$.', 'With $x$ in radians, $\\lim_{x\\to 0}\\frac{\\sin x}{x}=1$. That is why $\\frac{\\sin kx}{x}\\to k$, $\\frac{\\tan x}{x}\\to 1$ and $\\frac{1-\\cos x}{x^2}\\to\\frac{1}{2}$.'),
        figure: (language) => <SineLimitFigure language={language} />
    },

    /* ---------- 4. Continuity in depth ---------- */
    {
        id: 'interval',
        stage: 'continuity',
        title: say('Jarraitutasuna tarte batean', 'Continuidad en un intervalo', 'الاتصال على فترة', 'Continuity on an interval'),
        goal: say('Funtzio bat tarte itxi batean noiz den jarraitua jakitea (alboko limiteak muturretan), eta funtzio elementalak beren eremuan jarraituak direla.', 'Saber cuándo una función es continua en un intervalo cerrado (laterales en los extremos) y que las funciones elementales son continuas en su dominio.', 'معرفة متى تكون الدالة متصلة على فترة مغلقة (النهايتان الجانبيتان عند الطرفين)، وأن الدوال الأساسية متصلة في مجالها.', 'Know when a function is continuous on a closed interval (one-sided limits at the ends), and that elementary functions are continuous on their domain.'),
        needs: [
            { unit: FUNCTIONS1, topic: 'domain', title: { eu: 'Izate-eremua: baldintza guztiak batera', es: 'Dominio: todas las condiciones a la vez', en: 'Domain: every condition at once', ar: 'المجال: كل الشروط معًا' } },
            { unit: LIMITS1, topic: 'continuous', title: { eu: 'Funtzio jarraitua puntu batean', es: 'Función continua en un punto', en: 'A function continuous at a point', ar: 'الدالة المتصلة عند نقطة' } }
        ],
        problem: say('Jarraitua al da $f(x)=\\sqrt{9-x^2}$ funtzioa $[-3,3]$ tartean?', '¿Es continua $f(x)=\\sqrt{9-x^2}$ en el intervalo $[-3,3]$?', 'هل الدالة $f(x)=\\sqrt{9-x^2}$ متصلة على الفترة $[-3,3]$؟', 'Is $f(x)=\\sqrt{9-x^2}$ continuous on the interval $[-3,3]$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Barruan, $(-3,3)$ tartean, polinomio positibo baten erroa da: jarraitua.', 'Dentro, en $(-3,3)$, es la raíz de un polinomio positivo: continua.', 'في الداخل، على $(-3,3)$، هي جذر لحدودية موجبة: متصلة.', 'Inside, on $(-3,3)$, it is the root of a positive polynomial: continuous.'), math: same('$9-x^2>0$') },
            { text: say('$-3$ puntuan eskuineko aldea bakarrik hartzen da.', 'En $-3$ solo cuenta el lado derecho.', 'عند $-3$ لا يُحسب إلا الجانب الأيمن.', 'At $-3$ only the right side counts.'), math: same('$\\lim_{x\\to -3^+}\\sqrt{9-x^2}=0=f(-3)$') },
            { text: say('3 puntuan, ezkerrekoa. Jarraitua da $[-3,3]$ tartean.', 'En 3, el izquierdo. Es continua en $[-3,3]$.', 'وعند 3 الجانب الأيسر. فهي متصلة على $[-3,3]$.', 'At 3, the left one. It is continuous on $[-3,3]$.'), math: same('$\\lim_{x\\to 3^-}\\sqrt{9-x^2}=0=f(3)$') }
        ],
        takeaway: say('$f$ jarraitua da $[a,b]$ tartean $(a,b)$ tarteko puntu guztietan jarraitua bada, $a$ puntuan eskuinetik eta $b$ puntuan ezkerretik. Polinomioak, erroak, esponentzialak, logaritmoak eta funtzio trigonometrikoak jarraituak dira beren eremuan, baita haien baturak, biderkadurak, zatidurak eta konposizioak ere.', '$f$ es continua en $[a,b]$ si lo es en cada punto de $(a,b)$, por la derecha en $a$ y por la izquierda en $b$. Polinomios, raíces, exponenciales, logaritmos y funciones trigonométricas son continuas en su dominio, y también sus sumas, productos, cocientes y composiciones.', 'تكون $f$ متصلة على $[a,b]$ إذا كانت متصلة عند كل نقطة من $(a,b)$، ومن اليمين عند $a$ ومن اليسار عند $b$. والحدوديات والجذور والأسية واللوغاريتمية والمثلثية متصلة في مجالها، وكذلك مجاميعها وجداءاتها وخوارج قسمتها وتركيباتها.', '$f$ is continuous on $[a,b]$ if it is continuous at every point of $(a,b)$, from the right at $a$ and from the left at $b$. Polynomials, roots, exponentials, logarithms and trigonometric functions are continuous on their domain, and so are their sums, products, quotients and compositions.'),
        figure: (language) => <IntervalFigure language={language} />
    },
    {
        id: 'parameter',
        stage: 'continuity',
        title: say('Parametro bat jarraitutasunerako', 'Un parámetro para la continuidad', 'وسيط واحد للاتصال', 'One parameter for continuity'),
        goal: say('Esponentzialak, logaritmoak edo sinuak dituen zatika definitutako funtzio bat jarraitua izateko parametroaren balioa aurkitzea.', 'Hallar el valor de un parámetro para que una función a trozos con exponenciales, logaritmos o senos sea continua.', 'إيجاد قيمة الوسيط لتكون دالة معرّفة على أجزاء، فيها أسية أو لوغاريتم أو جيب، متصلة.', 'Find the value of a parameter so that a piecewise function with exponentials, logarithms or sines is continuous.'),
        needs: [
            { unit: FUNCTIONS1, topic: 'piecewise', title: { eu: 'Zatika definitutako funtzioak marraztea', es: 'Dibujar funciones a trozos', en: 'Drawing piecewise functions', ar: 'رسم الدوال المعرّفة على أجزاء' } }
        ],
        problem: say('Aurkitu $a$, funtzio hau $x=0$ puntuan jarraitua izan dadin: $f(x)=\\begin{cases}e^{2x}+a & x\\le 0\\\\ \\frac{\\sin 3x}{x} & x>0\\end{cases}$', 'Halla $a$ para que esta función sea continua en $x=0$: $f(x)=\\begin{cases}e^{2x}+a & x\\le 0\\\\ \\frac{\\sin 3x}{x} & x>0\\end{cases}$', 'أوجد $a$ لتكون هذه الدالة متصلة عند $x=0$: $f(x)=\\begin{cases}e^{2x}+a & x\\le 0\\\\ \\frac{\\sin 3x}{x} & x>0\\end{cases}$', 'Find $a$ so that this function is continuous at $x=0$: $f(x)=\\begin{cases}e^{2x}+a & x\\le 0\\\\ \\frac{\\sin 3x}{x} & x>0\\end{cases}$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ezkerretik (eta puntuan bertan) lehen zatiak agintzen du.', 'Por la izquierda (y en el punto) manda el primer trozo.', 'من اليسار (وعند النقطة نفسها) يتحكم الجزء الأول.', 'From the left (and at the point itself) the first piece rules.'), math: same('$f(0)=\\lim_{x\\to 0^-}(e^{2x}+a)=1+a$') },
            { text: say('Eskuinetik, sinuaren limite nabarmena.', 'Por la derecha, el límite notable del seno.', 'من اليمين، نهاية الجيب الشهيرة.', 'From the right, the notable limit of the sine.'), math: same('$\\lim_{x\\to 0^+}\\frac{\\sin 3x}{x}=3$') },
            { text: say('Berdindu: $1+a=3$.', 'Iguala: $1+a=3$.', 'ساوِ: $1+a=3$.', 'Set them equal: $1+a=3$.'), math: same('$a=2$') }
        ],
        takeaway: say('Lotune-puntuan, kalkulatu $f(a)$ eta bi alboko limiteak, alde bakoitzeko zatiarekin, eta berdindu: parametroa duen ekuazio bat ateratzen da. Zatiak beren tarteetan jarraituak dira jada.', 'En el punto de unión, calcula $f(a)$ y los dos límites laterales con el trozo de cada lado, e iguálalos: sale una ecuación con el parámetro. Los trozos ya son continuos en sus intervalos.', 'عند نقطة الالتقاء احسب $f(a)$ والنهايتين الجانبيتين بجزء كل جانب، ثم ساوِ بينها: تنتج معادلة فيها الوسيط. والأجزاء متصلة أصلًا في فتراتها.', 'At the joining point, work out $f(a)$ and both one-sided limits with the piece on each side, and set them equal: you get an equation with the parameter. The pieces are already continuous on their intervals.'),
        figure: (language) => <ParameterFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'two-parameters',
        stage: 'continuity',
        title: say('Bi parametro: sistema bat', 'Dos parámetros: un sistema', 'وسيطان: نظام معادلات', 'Two parameters: a system'),
        goal: say('Hiru zatiko funtzio bat $\\mathbb{R}$ osoan jarraitua izateko bi parametro aurkitzea, lotune bakoitzean ekuazio bat planteatuz.', 'Hallar dos parámetros para que una función de tres trozos sea continua en todo $\\mathbb{R}$, planteando una ecuación en cada unión.', 'إيجاد وسيطين لتكون دالة من ثلاثة أجزاء متصلة على $\\mathbb{R}$ كلها، بكتابة معادلة عند كل نقطة التقاء.', 'Find two parameters so that a function in three pieces is continuous on the whole of $\\mathbb{R}$, writing an equation at each joint.'),
        needs: [
            { unit: 'dbh4-akademikoak/sistemas', topic: 'substitution', title: { eu: 'Ordezkapen-metodoa', es: 'Método de sustitución', en: 'Substitution method', ar: 'طريقة التعويض' } }
        ],
        problem: say('Aurkitu $a$ eta $b$, funtzio hau $\\mathbb{R}$ osoan jarraitua izan dadin: $f(x)=\\begin{cases}ax+2 & x<1\\\\ x^2+b & 1\\le x<3\\\\ ax & x\\ge 3\\end{cases}$', 'Halla $a$ y $b$ para que esta función sea continua en $\\mathbb{R}$: $f(x)=\\begin{cases}ax+2 & x<1\\\\ x^2+b & 1\\le x<3\\\\ ax & x\\ge 3\\end{cases}$', 'أوجد $a$ و$b$ لتكون هذه الدالة متصلة على $\\mathbb{R}$: $f(x)=\\begin{cases}ax+2 & x<1\\\\ x^2+b & 1\\le x<3\\\\ ax & x\\ge 3\\end{cases}$', 'Find $a$ and $b$ so that this function is continuous on $\\mathbb{R}$: $f(x)=\\begin{cases}ax+2 & x<1\\\\ x^2+b & 1\\le x<3\\\\ ax & x\\ge 3\\end{cases}$'),
        stepsKind: 'steps',
        steps: [
            { text: say('$x=1$ puntuko lotunea.', 'Unión en $x=1$.', 'الالتقاء عند $x=1$.', 'The joint at $x=1$.'), math: same('$a+2=1+b$') },
            { text: say('$x=3$ puntuko lotunea.', 'Unión en $x=3$.', 'الالتقاء عند $x=3$.', 'The joint at $x=3$.'), math: same('$9+b=3a$') },
            { text: say('Ebatzi sistema.', 'Resuelve el sistema.', 'حلّ النظام.', 'Solve the system.'), math: same('$\\begin{gathered}b=a+1\\\\ 9+a+1=3a\\\\ a=5,\\ b=6\\end{gathered}$') }
        ],
        takeaway: say('Lotune bakoitzak ekuazio bat ematen du: ezkerreko limitea = eskuineko limitea = $f$ puntuan. Bi lotune eta bi parametro badaude, bi ekuazioko sistema bat ateratzen da; zati bakoitzaren barruan funtzioa jarraitua da jada.', 'Cada unión da una ecuación: límite por la izquierda = límite por la derecha = $f$ en el punto. Con dos uniones y dos parámetros sale un sistema de dos ecuaciones; dentro de cada trozo la función ya es continua.', 'كل نقطة التقاء تعطي معادلة: النهاية من اليسار = النهاية من اليمين = قيمة $f$ عند النقطة. ومع نقطتي التقاء ووسيطين ينتج نظام من معادلتين؛ وداخل كل جزء تكون الدالة متصلة أصلًا.', 'Each joint gives an equation: limit from the left = limit from the right = $f$ at the point. With two joints and two parameters you get a system of two equations; inside each piece the function is already continuous.'),
        figure: (language) => <TwoParametersFigure language={language} />,
        figureAfterSteps: true
    },

    /* ---------- 5. Theorems on continuous functions ---------- */
    {
        id: 'bolzano-equations',
        stage: 'theorems',
        title: say('Bolzano: ekuazio batek soluzioa du', 'Bolzano: una ecuación tiene solución', 'بولتسانو: للمعادلة حل', 'Bolzano: an equation has a solution'),
        goal: say('Bolzanoren teoremarekin frogatzea ekuazio batek soluzioa duela tarte batean, baita bi kurba ebakitzen direla ikusi behar denean ere.', 'Demostrar con Bolzano que una ecuación tiene solución en un intervalo, también cuando hay que ver que dos curvas se cortan.', 'إثبات أن للمعادلة حلًّا في فترة بمبرهنة بولتسانو، وكذلك عندما يجب إثبات أن منحنيين يتقاطعان.', 'Prove with Bolzano that an equation has a solution on an interval, also when you must show that two curves cross.'),
        needs: [
            { unit: LIMITS1, topic: 'bolzano', title: { eu: 'Bolzanoren teorema', es: 'El teorema de Bolzano', en: 'Bolzano\'s theorem', ar: 'مبرهنة بولتسانو' } }
        ],
        problem: say('Frogatu $e^x=3-x$ ekuazioak soluzio bat duela $(0,1)$ tartean.', 'Demuestra que la ecuación $e^x=3-x$ tiene una solución en $(0,1)$.', 'أثبت أن للمعادلة $e^x=3-x$ حلًّا في $(0,1)$.', 'Prove that the equation $e^x=3-x$ has a solution in $(0,1)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Eraman dena alde batera: $h$ jarraitua da $\\mathbb{R}$ osoan.', 'Pasa todo a un lado: $h$ es continua en $\\mathbb{R}$.', 'انقل كل شيء إلى طرف واحد: $h$ متصلة على $\\mathbb{R}$.', 'Move everything to one side: $h$ is continuous on $\\mathbb{R}$.'), math: same('$h(x)=e^x+x-3$') },
            { text: say('Begiratu zeinua muturretan.', 'Mira el signo en los extremos.', 'انظر إلى الإشارة عند الطرفين.', 'Look at the sign at the ends.'), math: same('$h(0)=-2<0\\qquad h(1)=e-2>0$') },
            { text: say('Bolzanoren arabera, $c\\in(0,1)$ bat dago $h(c)=0$ izateko; hau da, $e^c=3-c$.', 'Por Bolzano hay un $c\\in(0,1)$ con $h(c)=0$, es decir, $e^c=3-c$.', 'حسب بولتسانو يوجد $c\\in(0,1)$ بحيث $h(c)=0$، أي $e^c=3-c$.', 'By Bolzano there is a $c\\in(0,1)$ with $h(c)=0$, that is, $e^c=3-c$.') }
        ],
        takeaway: say('Bolzano: $h$ jarraitua bada $[a,b]$ tartean eta $h(a)$ eta $h(b)$ zeinu desberdinekoak badira, $c\\in(a,b)$ bat dago $h(c)=0$ izateko. $f(x)=g(x)$ ekuazioarekin, aplikatu $h=f-g$ funtzioari. Erroa badagoela esaten du, ez non dagoen ez zenbat dauden.', 'Bolzano: si $h$ es continua en $[a,b]$ y $h(a)$, $h(b)$ tienen distinto signo, existe $c\\in(a,b)$ con $h(c)=0$. Para $f(x)=g(x)$, aplícalo a $h=f-g$. Dice que la raíz existe, no dónde está ni cuántas hay.', 'بولتسانو: إذا كانت $h$ متصلة على $[a,b]$ وكانت إشارتا $h(a)$ و$h(b)$ مختلفتين فيوجد $c\\in(a,b)$ بحيث $h(c)=0$. ومع $f(x)=g(x)$ طبّقها على $h=f-g$. وهي تقول إن الجذر موجود، لا أين هو ولا كم عدد الجذور.', 'Bolzano: if $h$ is continuous on $[a,b]$ and $h(a)$, $h(b)$ have different signs, there is a $c\\in(a,b)$ with $h(c)=0$. For $f(x)=g(x)$, apply it to $h=f-g$. It says the root exists, not where it is or how many there are.'),
        figure: (language) => <BolzanoEquationFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'intermediate',
        stage: 'theorems',
        title: say('Tarteko balioen teorema', 'El teorema de los valores intermedios', 'مبرهنة القيم الوسيطة', 'The intermediate value theorem'),
        goal: say('Darbouxen teorema erabiltzea funtzio jarraitu batek $f(a)$ eta $f(b)$ arteko $k$ balio bat hartzen duela ziurtatzeko.', 'Usar el teorema de Darboux para asegurar que una función continua toma un valor $k$ entre $f(a)$ y $f(b)$.', 'استعمال مبرهنة داربو لضمان أن الدالة المتصلة تأخذ قيمة $k$ بين $f(a)$ و$f(b)$.', 'Use Darboux\'s theorem to make sure that a continuous function takes a value $k$ between $f(a)$ and $f(b)$.'),
        needs: [
            { unit: LIMITS1, topic: 'bolzano', title: { eu: 'Bolzanoren teorema', es: 'El teorema de Bolzano', en: 'Bolzano\'s theorem', ar: 'مبرهنة بولتسانو' } }
        ],
        problem: say('$f(x)=x^3+x$ funtzioak 5 balioa hartzen al du $[0,2]$ tarteko punturen batean?', '¿Toma $f(x)=x^3+x$ el valor 5 en algún punto de $[0,2]$?', 'هل تأخذ $f(x)=x^3+x$ القيمة 5 عند نقطة ما من $[0,2]$؟', 'Does $f(x)=x^3+x$ take the value 5 at some point of $[0,2]$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('$f$ polinomio bat da: jarraitua $[0,2]$ tartean.', '$f$ es un polinomio: continua en $[0,2]$.', '$f$ حدودية: متصلة على $[0,2]$.', '$f$ is a polynomial: continuous on $[0,2]$.') },
            { text: say('Balioak muturretan.', 'Valores en los extremos.', 'القيم عند الطرفين.', 'The values at the ends.'), math: same('$f(0)=0\\qquad f(2)=2^{3}+2=10$') },
            { text: say('5 zenbakia 0 eta 10 artean dago: $c\\in(0,2)$ bat dago $f(c)=5$ izateko.', '5 está entre 0 y 10: existe $c\\in(0,2)$ con $f(c)=5$.', 'العدد 5 بين 0 و10: يوجد $c\\in(0,2)$ بحيث $f(c)=5$.', '5 is between 0 and 10: there is a $c\\in(0,2)$ with $f(c)=5$.'), math: same('$0<5<10$') }
        ],
        takeaway: say('$f$ jarraitua bada $[a,b]$ tartean, $f(a)$ eta $f(b)$ arteko balio guztiak hartzen ditu: haien arteko $k$ bakoitzerako $c\\in(a,b)$ bat dago $f(c)=k$ izateko. $f(x)-k$ funtzioari aplikatutako Bolzano da.', 'Si $f$ es continua en $[a,b]$, toma todos los valores entre $f(a)$ y $f(b)$: para cada $k$ entre ellos hay un $c\\in(a,b)$ con $f(c)=k$. Es Bolzano aplicado a $f(x)-k$.', 'إذا كانت $f$ متصلة على $[a,b]$ فإنها تأخذ كل القيم بين $f(a)$ و$f(b)$: لكل $k$ بينهما يوجد $c\\in(a,b)$ بحيث $f(c)=k$. إنها بولتسانو مطبّقة على $f(x)-k$.', 'If $f$ is continuous on $[a,b]$, it takes every value between $f(a)$ and $f(b)$: for each $k$ between them there is a $c\\in(a,b)$ with $f(c)=k$. It is Bolzano applied to $f(x)-k$.'),
        figure: (language) => <IntermediateFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'weierstrass',
        stage: 'theorems',
        title: say('Weierstrassen teorema', 'El teorema de Weierstrass', 'مبرهنة فايرشتراس', 'The Weierstrass theorem'),
        goal: say('Funtzio batek maximo eta minimo absolutuak noiz hartzen dituen ziur jakitea: tarte itxi batean jarraitua denean.', 'Saber cuándo una función alcanza seguro un máximo y un mínimo absolutos: cuando es continua en un intervalo cerrado.', 'معرفة متى تبلغ الدالة حتمًا قيمة عظمى وقيمة صغرى مطلقتين: عندما تكون متصلة على فترة مغلقة.', 'Know when a function surely reaches an absolute maximum and minimum: when it is continuous on a closed interval.'),
        needs: [
            { unit: 'batx1-zientziak/aplicaciones-derivada', topic: 'absolute-extremes', title: { eu: 'Maximo eta minimo absolutuak tarte batean', es: 'Máximo y mínimo absolutos en un intervalo', en: 'Absolute maximum and minimum on an interval', ar: 'القيمتان العظمى والصغرى المطلقتان في فترة' } }
        ],
        problem: say('$f(x)=x^2$ funtzioak maximo eta minimo absolutuak hartzen al ditu $[-1,2]$ tartean? Eta $g(x)=\\frac{1}{x}$ funtzioak $(0,1]$ tartean?', '¿Alcanza $f(x)=x^2$ un máximo y un mínimo absolutos en $[-1,2]$? ¿Y $g(x)=\\frac{1}{x}$ en $(0,1]$?', 'هل تبلغ $f(x)=x^2$ قيمة عظمى وقيمة صغرى مطلقتين على $[-1,2]$؟ وماذا عن $g(x)=\\frac{1}{x}$ على $(0,1]$؟', 'Does $f(x)=x^2$ reach an absolute maximum and minimum on $[-1,2]$? And $g(x)=\\frac{1}{x}$ on $(0,1]$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('$x^2$ jarraitua da eta $[-1,2]$ itxia: Weierstrassek maximoa eta minimoa ziurtatzen ditu.', '$x^2$ es continua y $[-1,2]$ es cerrado: Weierstrass asegura máximo y mínimo.', '$x^2$ متصلة و$[-1,2]$ مغلقة: فايرشتراس يضمن قيمة عظمى وصغرى.', '$x^2$ is continuous and $[-1,2]$ is closed: Weierstrass ensures a maximum and a minimum.'), math: same('$\\max=f(2)=4\\qquad\\min=f(0)=0$') },
            { text: say('$\\frac{1}{x}$ jarraitua da $(0,1]$ tartean, baina tartea ez da itxia.', '$\\frac{1}{x}$ es continua en $(0,1]$, pero el intervalo no es cerrado.', '$\\frac{1}{x}$ متصلة على $(0,1]$ لكن الفترة ليست مغلقة.', '$\\frac{1}{x}$ is continuous on $(0,1]$, but the interval is not closed.') },
            { text: say('0 inguruan mugarik gabe hazten da: ez du maximorik. Minimoa $g(1)=1$ da.', 'Cerca de 0 crece sin límite: no tiene máximo. Su mínimo es $g(1)=1$.', 'قرب 0 تكبر بلا حد: ليست لها قيمة عظمى. وقيمتها الصغرى $g(1)=1$.', 'Near 0 it grows without bound: it has no maximum. Its minimum is $g(1)=1$.'), math: same('$\\lim_{x\\to 0^+}\\frac{1}{x}=+\\infty$') }
        ],
        takeaway: say('Weierstrass: $f$ jarraitua bada $[a,b]$ tarte itxian, maximo eta minimo absolutuak hartzen ditu bertan. Tartea irekia bada edo $f$ funtzioak jauzi bat badu, baliteke ez hartzea.', 'Weierstrass: si $f$ es continua en el intervalo cerrado $[a,b]$, alcanza en él un máximo y un mínimo absolutos. Si el intervalo es abierto o $f$ tiene un salto, puede no alcanzarlos.', 'فايرشتراس: إذا كانت $f$ متصلة على الفترة المغلقة $[a,b]$ فإنها تبلغ فيها قيمة عظمى وقيمة صغرى مطلقتين. وإذا كانت الفترة مفتوحة أو كان لـ $f$ قفزة فقد لا تبلغهما.', 'Weierstrass: if $f$ is continuous on the closed interval $[a,b]$, it reaches an absolute maximum and minimum on it. If the interval is open or $f$ has a jump, it may not reach them.'),
        figure: (language) => <WeierstrassFigure language={language} />,
        figureAfterSteps: true
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts); \sin and \tan in each language's names */
export const bach2LimitsTopics: UnitTopic[] = baseTopics.map((topic) => ({ ...topic, ...localizeNames({ ...bach2LimitsLessonTexts[topic.id as Bach2LimitsTopicId], ...bach2LimitsLessonChecks[topic.id as Bach2LimitsTopicId] }) }))

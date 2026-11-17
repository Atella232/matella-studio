import type { LessonTexts, LocalizedText } from '../../features/unit-v2/types.ts'
import type { InferenceBatx2gTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Inferentzia · Batxilergoa 2 · Gizarte Zientziak — what each lesson
   tells: the new words, a short explanation, the example as an exercise,
   the key words and, in some lessons, «Why does it work?». Plain data so
   the tests can import it; lessons.tsx merges it into the topics.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const inferenceBatx2gLessonTexts: Record<InferenceBatx2gTopicId, LessonTexts> = {
    'point-estimate': {
        definitions: [
            { term: say('Estimazio puntuala', 'Estimación puntual', 'التقدير النقطي', 'Point estimate'), meaning: say('Populazioaren parametro bat lagin baten zenbaki bakar batekin ematea.', 'Dar un parámetro de la población con un solo número de la muestra.', 'إعطاء معلمة للمجتمع بعدد واحد من العيّنة.', 'Giving a population parameter as a single number from the sample.') }
        ],
        vocabulary: [say('parametroa', 'parámetro', 'معلمة', 'parameter'), say('estimatzen', 'estima', 'يقدّر', 'estimates')],
        explanation: say(
            'Populazioaren parametroak, $\\mu$ eta $p$, ezezagunak dira. Laginaren batez bestekoak, $\\bar{x}$, eta proportzioak, $\\hat{p}$, haiek estimatzen dituzte. Erraz kalkulatzen dira, baina ez dakigu zenbat huts egiten duten: horretarako dira konfiantza-tarteak.',
            'Los parámetros de la población, $\\mu$ y $p$, son desconocidos. La media de la muestra, $\\bar{x}$, y su proporción, $\\hat{p}$, los estiman. Se calculan fácil, pero no sabemos cuánto fallan: para eso están los intervalos de confianza.',
            'معلمات المجتمع $\\mu$ و$p$ مجهولة. ومتوسط العيّنة $\\bar{x}$ ونسبتها $\\hat{p}$ يقدّران تلك المعلمات. يُحسبان بسهولة، لكننا لا نعرف مقدار خطئهما: ولهذا توجد فترات الثقة.',
            'The population parameters, $\\mu$ and $p$, are unknown. The sample mean, $\\bar{x}$, and its proportion, $\\hat{p}$, estimate them. They are easy to work out, but we do not know how far off they are: that is what confidence intervals are for.'
        ),
        examplePrompt: say('400 langiletatik, 92 langilek bizikletaz egiten dute lanerako bidea. Estimatu $p$.', 'De 400 trabajadores, 92 van al trabajo en bici. Estima $p$.', 'من 400 عامل يذهب 92 إلى العمل بالدراجة. قدّر $p$.', 'Of 400 workers, 92 cycle to work. Estimate $p$.'),
        example: same('$\\hat{p}=\\frac{92}{400}=0{,}23$'),
        exampleAnswer: say('Langileen % 23 inguru.', 'Cerca del 23 % de los trabajadores.', 'نحو 23 % من العمال.', 'About 23% of the workers.')
    },
    'confidence-level': {
        definitions: [
            { term: say('Konfiantza-maila', 'Nivel de confianza', 'مستوى الثقة', 'Confidence level'), meaning: say('$1-\\alpha$: lagin askorekin, $\\mu$ harrapatzen duten tarteen proportzioa.', '$1-\\alpha$: con muchas muestras, la proporción de intervalos que atrapan $\\mu$.', '$1-\\alpha$: مع عيّنات كثيرة، نسبة الفترات التي تلتقط $\\mu$.', '$1-\\alpha$: with many samples, the share of intervals that catch $\\mu$.') }
        ],
        vocabulary: [say('buztan', 'cola', 'ذيل', 'tail'), say('balio kritikoa', 'valor crítico', 'القيمة الحرجة', 'critical value')],
        explanation: say(
            'Konfiantza-tartea kanpaiaren erdiko zatia da, $1-\\alpha$ probabilitatearekin. Kanpoan $\\alpha$ geratzen da, erdia buztan bakoitzean. Balio kritikoak erdiko zatia mugatzen du: haren azpian $1-\\frac{\\alpha}{2}$ dago.',
            'El intervalo de confianza es la parte central de la campana, con probabilidad $1-\\alpha$. Fuera queda $\\alpha$, la mitad en cada cola. El valor crítico limita la parte central: por debajo de él hay $1-\\frac{\\alpha}{2}$.',
            'فترة الثقة هي الجزء الأوسط من الجرس باحتمال $1-\\alpha$. ويبقى خارجها $\\alpha$، نصفه في كل ذيل. وتحدّ القيمة الحرجة الجزء الأوسط: تحتها $1-\\frac{\\alpha}{2}$.',
            'The confidence interval is the central part of the bell, with probability $1-\\alpha$. Outside lies $\\alpha$, half in each tail. The critical value bounds the central part: below it there is $1-\\frac{\\alpha}{2}$.'
        ),
        examplePrompt: say('Zein da balio kritikoa, % 80 konfiantza-mailan?', '¿Cuál es el valor crítico para un nivel de confianza del 80 %?', 'ما القيمة الحرجة لمستوى ثقة 80 %؟', 'What is the critical value for an 80% confidence level?'),
        example: same('$1-0{,}1=0{,}9\\ \\to\\ 1{,}28$'),
        exampleAnswer: same('$1{,}28$')
    },
    'critical-value': {
        vocabulary: [say('hurbilena', 'cercano', 'الأقرب', 'closest'), say('erdiko puntua', 'punto medio', 'منتصف', 'midpoint')],
        explanation: say(
            'Taulak $P(Z\\le z)$ ematen du. Balio kritikoa bilatzeko, alderantziz irakurtzen da: $1-\\frac{\\alpha}{2}$ probabilitatea bilatzen da taularen barruan, eta haren ${z}$ irakurtzen da. Hurbilena hartzen da, eta bi berdin hurbil badaude, haien erdiko puntua.',
            'La tabla da $P(Z\\le z)$. Para hallar el valor crítico se lee al revés: se busca la probabilidad $1-\\frac{\\alpha}{2}$ dentro de la tabla y se lee su ${z}$. Se toma el más cercano, y si dos están igual de cerca, su punto medio.',
            'يعطي الجدول $P(Z\\le z)$. ولإيجاد القيمة الحرجة نقرؤه بالعكس: نبحث عن الاحتمال $1-\\frac{\\alpha}{2}$ داخل الجدول ونقرأ ${z}$ الخاصة به. نأخذ الأقرب، وإذا تساوت قيمتان في القرب نأخذ منتصفهما.',
            'The table gives $P(Z\\le z)$. To find the critical value, read it backwards: look for the probability $1-\\frac{\\alpha}{2}$ inside the table and read its ${z}$. Take the closest, and if two are equally close, their midpoint.'
        ),
        examplePrompt: say('Aurkitu balio kritikoa, % 96 konfiantza-mailan.', 'Halla el valor crítico para un nivel de confianza del 96 %.', 'جد القيمة الحرجة لمستوى ثقة 96 %.', 'Find the critical value for a 96% confidence level.'),
        example: same('$1-0{,}02=0{,}98\\ \\to\\ 2{,}05$'),
        exampleAnswer: same('$2{,}05$')
    },
    'mean-interval': {
        definitions: [
            { term: say('Konfiantza-tartea', 'Intervalo de confianza', 'فترة الثقة', 'Confidence interval'), meaning: say('Lagin batetik kalkulatutako tartea, parametroa konfiantza-maila jakin batekin harrapatzen duena.', 'Intervalo calculado con una muestra que atrapa el parámetro con un nivel de confianza dado.', 'فترة محسوبة من عيّنة تلتقط المعلمة بمستوى ثقة معيّن.', 'An interval worked out from a sample that catches the parameter with a given confidence level.') }
        ],
        vocabulary: [say('erradioa', 'radio', 'نصف القطر', 'radius'), say('erdian', 'centro', 'وسط', 'middle')],
        explanation: say(
            'Laginketan, $\\bar{X}$ zenbakiaren % 95 $\\mu\\pm 1{,}96\\,\\frac{\\sigma}{\\sqrt{n}}$ tartean dago. Alderantziz: $\\bar{x}$ ezagutzen dugunez, haren inguruan tarte bera eraikitzen da, eta tarte horrek $\\mu$ harrapatzen du laginen % 95 kasuetan.',
            'En el muestreo, el 95 % de $\\bar{X}$ cae en $\\mu\\pm 1{,}96\\,\\frac{\\sigma}{\\sqrt{n}}$. Al revés: como conocemos $\\bar{x}$, se construye el mismo intervalo a su alrededor, y ese intervalo atrapa $\\mu$ en el 95 % de las muestras.',
            'في المعاينة يقع 95 % من $\\bar{X}$ في $\\mu\\pm 1{,}96\\,\\frac{\\sigma}{\\sqrt{n}}$. وبالعكس: لأننا نعرف $\\bar{x}$ نبني الفترة نفسها حوله، فتلتقط هذه الفترة $\\mu$ في 95 % من العيّنات.',
            'In sampling, 95% of $\\bar{X}$ falls within $\\mu\\pm 1{,}96\\,\\frac{\\sigma}{\\sqrt{n}}$. The other way round: since we know $\\bar{x}$, the same interval is built around it, and that interval catches $\\mu$ in 95% of the samples.'
        ),
        examplePrompt: say('$\\bar{x}=50$, $\\sigma=10$ eta $n=25$. Aurkitu $\\mu$ zenbakiaren tartea, % 90 mailan.', '$\\bar{x}=50$, $\\sigma=10$ y $n=25$. Halla el intervalo del 90 % para $\\mu$.', '$\\bar{x}=50$ و$\\sigma=10$ و$n=25$. جد فترة 90 % لـ $\\mu$.', '$\\bar{x}=50$, $\\sigma=10$ and $n=25$. Find the 90% interval for $\\mu$.'),
        example: same('$1{,}645\\cdot\\frac{10}{\\sqrt{25}}=3{,}29\\ \\to\\ (46{,}71;\\ 53{,}29)$'),
        exampleAnswer: same('$(46{,}71;\\ 53{,}29)$'),
        why: {
            text: say('$|\\bar{x}-\\mu|\\le E$ bada, $\\mu$ zenbakia $\\bar{x}\\pm E$ tartean dago, eta alderantziz: bi esaldiak berdinak dira.', 'Si $|\\bar{x}-\\mu|\\le E$, $\\mu$ está en $\\bar{x}\\pm E$, y al revés: las dos frases son la misma.', 'إذا كان $|\\bar{x}-\\mu|\\le E$ فإن $\\mu$ في $\\bar{x}\\pm E$، والعكس: العبارتان واحدة.', 'If $|\\bar{x}-\\mu|\\le E$, $\\mu$ lies in $\\bar{x}\\pm E$, and the other way round: the two sentences are the same.')
        }
    },
    interpret: {
        vocabulary: [say('finkoa', 'fijo', 'ثابت', 'fixed'), say('metodoa', 'método', 'الطريقة', 'method')],
        explanation: say(
            '$\\mu$ zenbaki finkoa da; tartea da aldatzen dena, lagin batetik bestera. Konfiantza metodoari dagokio: lagin asko hartuz gero, tarteen % 95 inguruk harrapatzen dute $\\mu$. Gure tarteak $\\mu$ barruan du ala ez, baina ezin dugu jakin.',
            '$\\mu$ es un número fijo; lo que cambia de una muestra a otra es el intervalo. La confianza es del método: si se toman muchas muestras, cerca del 95 % de los intervalos atrapan $\\mu$. El nuestro contiene $\\mu$ o no, pero no podemos saberlo.',
            '$\\mu$ عدد ثابت؛ والذي يتغير من عيّنة إلى أخرى هو الفترة. والثقة تخص الطريقة: إذا أُخذت عيّنات كثيرة تلتقط نحو 95 % من الفترات $\\mu$. وفترتنا إما تحوي $\\mu$ أو لا، لكن لا يمكننا معرفة ذلك.',
            '$\\mu$ is a fixed number; what changes from one sample to another is the interval. The confidence belongs to the method: if many samples are taken, about 95% of the intervals catch $\\mu$. Ours contains $\\mu$ or not, but we cannot know which.'
        ),
        examplePrompt: say('% 99 mailan, 300 tarte egiten dira. Zenbatek ez dute $\\mu$ harrapatuko, gutxi gorabehera?', 'Al 99 % se construyen 300 intervalos. ¿Cuántos no atraparán $\\mu$, más o menos?', 'عند 99 % تُبنى 300 فترة. كم فترة لن تلتقط $\\mu$ تقريبًا؟', 'At 99%, 300 intervals are built. About how many will miss $\\mu$?'),
        example: same('$300\\cdot 0{,}01=3$'),
        exampleAnswer: say('3 tarte inguru.', 'Unos 3 intervalos.', 'نحو 3 فترات.', 'About 3 intervals.')
    },
    'interval-to-data': {
        vocabulary: [say('zabalera', 'anchura', 'العرض', 'width'), say('askatu', 'despejar', 'استخراج', 'solve')],
        explanation: say(
            'Tarte bat $(a;\\ b)$ bada, erdiko puntua $\\bar{x}=\\frac{a+b}{2}$ da eta errorea $E=\\frac{b-a}{2}$. Gero, errorearen formulatik askatu daiteke falta dena: $n$, $\\sigma$ edo balio kritikoa, eta harekin maila.',
            'Si un intervalo es $(a;\\ b)$, su punto medio es $\\bar{x}=\\frac{a+b}{2}$ y el error $E=\\frac{b-a}{2}$. Después se puede despejar de la fórmula del error lo que falte: $n$, $\\sigma$ o el valor crítico, y con él el nivel.',
            'إذا كانت الفترة $(a;\\ b)$ فمنتصفها $\\bar{x}=\\frac{a+b}{2}$ والخطأ $E=\\frac{b-a}{2}$. ثم يمكن استخراج الناقص من صيغة الخطأ: $n$ أو $\\sigma$ أو القيمة الحرجة ومعها المستوى.',
            'If an interval is $(a;\\ b)$, its midpoint is $\\bar{x}=\\frac{a+b}{2}$ and the error $E=\\frac{b-a}{2}$. Then you can solve the error formula for whatever is missing: $n$, $\\sigma$ or the critical value, and with it the level.'
        ),
        examplePrompt: say('Tartea $(21{,}5;\\ 28{,}5)$ da. Zenbat dira $\\bar{x}$ eta $E$?', 'El intervalo es $(21{,}5;\\ 28{,}5)$. ¿Cuánto valen $\\bar{x}$ y $E$?', 'الفترة $(21{,}5;\\ 28{,}5)$. كم يساوي $\\bar{x}$ و$E$؟', 'The interval is $(21{,}5;\\ 28{,}5)$. What are $\\bar{x}$ and $E$?'),
        example: same('$\\bar{x}=\\frac{21{,}5+28{,}5}{2}=25\\qquad E=\\frac{28{,}5-21{,}5}{2}=3{,}5$'),
        exampleAnswer: same('$\\bar{x}=25\\qquad E=3{,}5$')
    },
    'error-margin': {
        vocabulary: [say('urrunago', 'distan', 'يبعد', 'apart'), say('erradioa', 'radio', 'نصف القطر', 'radius')],
        explanation: say(
            'Errore maximoak esaten du estimazioa eta parametroa gehienez zenbat urruntzen diren, konfiantza-maila horrekin. Hiru zatik osatzen dute: balio kritikoa, populazioaren desbideratzea eta laginaren tamaina, errotik.',
            'El error máximo dice cuánto distan como mucho la estimación y el parámetro, con ese nivel de confianza. Lo forman tres piezas: el valor crítico, la desviación de la población y el tamaño de la muestra, bajo una raíz.',
            'يقول الخطأ الأقصى كم يبعد التقدير عن المعلمة على الأكثر بذلك المستوى من الثقة. ويتكوّن من ثلاث قطع: القيمة الحرجة وانحراف المجتمع وحجم العيّنة تحت جذر.',
            'The maximum error says how far apart, at most, the estimate and the parameter are, at that confidence level. It is made of three pieces: the critical value, the population deviation and the sample size, under a root.'
        ),
        examplePrompt: say('$\\sigma=6$ eta $n=16$. Zein da errore maximoa, % 95 mailan?', '$\\sigma=6$ y $n=16$. ¿Cuál es el error máximo al 95 %?', '$\\sigma=6$ و$n=16$. ما الخطأ الأقصى عند 95 %؟', '$\\sigma=6$ and $n=16$. What is the maximum error at 95%?'),
        example: same('$1{,}96\\cdot\\frac{6}{\\sqrt{16}}=2{,}94$'),
        exampleAnswer: same('$E=2{,}94$')
    },
    'sample-size': {
        vocabulary: [say('gorantz', 'arriba', 'الأعلى', 'round'), say('askatu', 'despeja', 'استخرج', 'solve')],
        explanation: say(
            'Errorearen formulan $n$ askatzen da: $\\sqrt{n}\\ge\\frac{{z}_{\\alpha/2}\\,\\sigma}{E}$, eta karratura jasotzen da. $n$ pertsona kopuru bat denez, osoa izan behar da; gorantz biribiltzen da, beherantz biribilduz gero errorea muga baino handiagoa izango litzatekeelako.',
            'En la fórmula del error se despeja $n$: $\\sqrt{n}\\ge\\frac{{z}_{\\alpha/2}\\,\\sigma}{E}$, y se eleva al cuadrado. Como $n$ es un número de personas, debe ser entero; se redondea hacia arriba, porque hacia abajo el error pasaría del límite.',
            'نستخرج $n$ من صيغة الخطأ: $\\sqrt{n}\\ge\\frac{{z}_{\\alpha/2}\\,\\sigma}{E}$ ثم نربّع. ولأن $n$ عدد أشخاص فيجب أن يكون صحيحًا؛ نقرّب إلى الأعلى لأن التقريب إلى الأسفل يجعل الخطأ يتجاوز الحد.',
            'Solve the error formula for $n$: $\\sqrt{n}\\ge\\frac{{z}_{\\alpha/2}\\,\\sigma}{E}$, and square it. As $n$ is a number of people, it must be whole; round up, because rounding down would push the error past the limit.'
        ),
        examplePrompt: say('$\\sigma=10$. Zenbat pertsona behar dira errorea 1 baino handiagoa ez izateko, % 90 mailan?', '$\\sigma=10$. ¿Cuántas personas hacen falta para que el error no pase de 1, al 90 %?', '$\\sigma=10$. كم شخصًا نحتاج كي لا يتجاوز الخطأ 1 عند 90 %؟', '$\\sigma=10$. How many people are needed for the error not to go past 1, at 90%?'),
        example: same('$\\left(\\frac{1{,}645\\cdot 10}{1}\\right)^2=270{,}6025\\ \\to\\ 271$'),
        exampleAnswer: same('$n=271$')
    },
    'what-changes': {
        vocabulary: [say('lau aldiz', 'cuatro veces', 'بأربع مرات', 'four times'), say('hazten', 'crece', 'يكبر', 'grow')],
        explanation: say(
            'Formulak dena esaten du: balio kritikoa eta $\\sigma$ zenbakitzailean daude, eta haiek hazten badira, errorea ere bai. $\\sqrt{n}$ izendatzailean dago: lagina handitzean, errorea txikitzen da, baina poliki.',
            'La fórmula lo dice todo: el valor crítico y $\\sigma$ están en el numerador, y si crecen, el error también. $\\sqrt{n}$ está en el denominador: al agrandar la muestra el error baja, pero despacio.',
            'الصيغة تقول كل شيء: القيمة الحرجة و$\\sigma$ في البسط، فإذا كبرا كبر الخطأ. و$\\sqrt{n}$ في المقام: بتكبير العيّنة يصغر الخطأ لكن ببطء.',
            'The formula says it all: the critical value and $\\sigma$ are in the numerator, and if they grow, so does the error. $\\sqrt{n}$ is in the denominator: making the sample bigger lowers the error, but slowly.'
        ),
        examplePrompt: say('% 95 mailan, $n=50$ izanik, $E=4$ da. Zein da errorea, $n=200$ bada?', 'Al 95 %, con $n=50$, $E=4$. ¿Cuál es el error si $n=200$?', 'عند 95 % ومع $n=50$ يكون $E=4$. ما الخطأ إذا كان $n=200$؟', 'At 95%, with $n=50$, $E=4$. What is the error if $n=200$?'),
        example: same('$\\frac{4}{\\sqrt{4}}=2$'),
        exampleAnswer: say('Lagina lau aldiz handiagoa: errorea erdia.', 'Muestra cuatro veces mayor: la mitad de error.', 'عيّنة أكبر بأربع مرات: نصف الخطأ.', 'A sample four times bigger: half the error.')
    },
    'proportion-interval': {
        vocabulary: [say('ezezaguna', 'desconocida', 'مجهولة', 'unknown'), say('erdian', 'centro', 'الوسط', 'middle')],
        explanation: say(
            'Laginketan, $\\hat{p}$ normala da, $p$ batez bestekoarekin eta $\\sqrt{\\frac{pq}{n}}$ desbideratzearekin. $p$ ezezaguna denez, desbideratzean $\\hat{p}$ eta $\\hat{q}$ jartzen dira. Gainerakoa batez bestekoaren tartean bezala egiten da.',
            'En el muestreo, $\\hat{p}$ es normal, de media $p$ y desviación $\\sqrt{\\frac{pq}{n}}$. Como $p$ es desconocida, en la desviación se ponen $\\hat{p}$ y $\\hat{q}$. Lo demás se hace igual que en el intervalo de la media.',
            'في المعاينة $\\hat{p}$ طبيعي بمتوسط $p$ وانحراف $\\sqrt{\\frac{pq}{n}}$. ولأن $p$ مجهولة نضع في الانحراف $\\hat{p}$ و$\\hat{q}$. والباقي كما في فترة المتوسط.',
            'In sampling, $\\hat{p}$ is normal, with mean $p$ and deviation $\\sqrt{\\frac{pq}{n}}$. As $p$ is unknown, $\\hat{p}$ and $\\hat{q}$ go into the deviation. The rest is done as in the interval for the mean.'
        ),
        examplePrompt: say('$\\hat{p}=0{,}1$ eta $n=100$. Aurkitu $p$ zenbakiaren tartea, % 90 mailan.', '$\\hat{p}=0{,}1$ y $n=100$. Halla el intervalo del 90 % para $p$.', '$\\hat{p}=0{,}1$ و$n=100$. جد فترة 90 % لـ $p$.', '$\\hat{p}=0{,}1$ and $n=100$. Find the 90% interval for $p$.'),
        example: same('$1{,}645\\cdot\\sqrt{\\frac{0{,}09}{100}}=0{,}04935\\ \\to\\ (0{,}05065;\\ 0{,}14935)$'),
        exampleAnswer: same('$(0{,}05065;\\ 0{,}14935)$')
    },
    'proportion-error': {
        vocabulary: [say('ehunekotan', 'porcentaje', 'بالنسبة المئوية', 'percentage'), say('ezaugarri', 'característica', 'صفة', 'feature')],
        explanation: say(
            'Proportzio baten errorea tartearen erradioa da. Zenbat eta $n$ handiagoa, orduan eta txikiagoa; eta $\\hat{p}$ 0,5 zenbakitik zenbat eta gertuago, orduan eta handiagoa, $\\hat{p}\\hat{q}$ biderkadura handiena 0,5 zenbakian baitago.',
            'El error de una proporción es el radio del intervalo. Cuanto mayor es $n$, menor es; y cuanto más cerca está $\\hat{p}$ de 0,5, mayor es, porque $\\hat{p}\\hat{q}$ es máximo en 0,5.',
            'خطأ النسبة هو نصف قطر الفترة. كلما كبر $n$ صغر؛ وكلما اقترب $\\hat{p}$ من 0.5 كبر، لأن $\\hat{p}\\hat{q}$ أكبر ما يمكن عند 0.5.',
            'The error of a proportion is the radius of the interval. The bigger $n$ is, the smaller it is; and the closer $\\hat{p}$ is to 0.5, the bigger it is, because $\\hat{p}\\hat{q}$ is largest at 0.5.'
        ),
        examplePrompt: say('$\\hat{p}=0{,}5$ eta $n=625$. Zein da errorea, % 95 mailan?', '$\\hat{p}=0{,}5$ y $n=625$. ¿Cuál es el error al 95 %?', '$\\hat{p}=0{,}5$ و$n=625$. ما الخطأ عند 95 %؟', '$\\hat{p}=0{,}5$ and $n=625$. What is the error at 95%?'),
        example: same('$1{,}96\\cdot\\sqrt{\\frac{0{,}25}{625}}=1{,}96\\cdot 0{,}02=0{,}0392$'),
        exampleAnswer: say('Hau da, % 3,92.', 'Es decir, un 3,92 %.', 'أي 3.92 %.', 'That is, 3.92%.')
    },
    'proportion-size': {
        vocabulary: [say('aurretiko', 'previos', 'سابقة', 'previous'), say('nahikoa', 'bastará', 'تكفي', 'enough')],
        explanation: say(
            'Errorearen formulan $n$ askatuz, $n\\ge\\frac{{z}_{\\alpha/2}^2\\,\\hat{p}\\hat{q}}{E^2}$. Inkesta egin aurretik ez dakigu $\\hat{p}$; aurreko azterketa bat badago, haren balioa erabiltzen da, eta bestela 0,5, lagin handiena eskatzen duena.',
            'Despejando $n$ en la fórmula del error, $n\\ge\\frac{{z}_{\\alpha/2}^2\\,\\hat{p}\\hat{q}}{E^2}$. Antes de la encuesta no conocemos $\\hat{p}$; si hay un estudio anterior se usa su valor, y si no, 0,5, que es el que pide la muestra más grande.',
            'باستخراج $n$ من صيغة الخطأ: $n\\ge\\frac{{z}_{\\alpha/2}^2\\,\\hat{p}\\hat{q}}{E^2}$. وقبل الاستطلاع لا نعرف $\\hat{p}$؛ فإن وُجدت دراسة سابقة نستعمل قيمتها، وإلا 0.5 التي تتطلب أكبر عيّنة.',
            'Solving the error formula for $n$, $n\\ge\\frac{{z}_{\\alpha/2}^2\\,\\hat{p}\\hat{q}}{E^2}$. Before the poll we do not know $\\hat{p}$; if there is a previous study its value is used, and if not, 0.5, the one that asks for the biggest sample.'
        ),
        examplePrompt: say('Aurreko azterketa batean $\\hat{p}=0{,}2$ zen. Zenbat pertsona behar dira $E\\le 0{,}04$ izateko, % 95 mailan?', 'Un estudio anterior dio $\\hat{p}=0{,}2$. ¿Cuántas personas hacen falta para $E\\le 0{,}04$ al 95 %?', 'أعطت دراسة سابقة $\\hat{p}=0{,}2$. كم شخصًا نحتاج لـ $E\\le 0{,}04$ عند 95 %؟', 'A previous study gave $\\hat{p}=0{,}2$. How many people are needed for $E\\le 0{,}04$ at 95%?'),
        example: same('$\\frac{1{,}96^2\\cdot 0{,}16}{0{,}04^2}=384{,}16\\ \\to\\ 385$'),
        exampleAnswer: same('$n=385$'),
        why: {
            text: say('$\\hat{p}\\hat{q}=\\hat{p}(1-\\hat{p})$ parabola bat da, eta haren erpina $\\hat{p}=0{,}5$ zenbakian dago, $0{,}25$ balioarekin.', '$\\hat{p}\\hat{q}=\\hat{p}(1-\\hat{p})$ es una parábola con el vértice en $\\hat{p}=0{,}5$, donde vale $0{,}25$.', '$\\hat{p}\\hat{q}=\\hat{p}(1-\\hat{p})$ قطع مكافئ رأسه عند $\\hat{p}=0{,}5$ حيث يساوي $0{,}25$.', '$\\hat{p}\\hat{q}=\\hat{p}(1-\\hat{p})$ is a parabola with its vertex at $\\hat{p}=0{,}5$, where it is $0{,}25$.')
        }
    },
    polls: {
        definitions: [
            { term: say('Fitxa teknikoa', 'Ficha técnica', 'البطاقة التقنية', 'Technical sheet'), meaning: say('Inkesta baten datuak: populazioa, lagina, konfiantza-maila eta errorea.', 'Los datos de una encuesta: población, muestra, nivel de confianza y error.', 'بيانات الاستطلاع: المجتمع والعيّنة ومستوى الثقة والخطأ.', 'The facts of a poll: population, sample, confidence level and error.') }
        ],
        vocabulary: [say('errore-marjina', 'margen de error', 'هامش الخطأ', 'margin of error'), say('elkarrizketa', 'entrevistas', 'مقابلة', 'interviews')],
        explanation: say(
            'Hauteskunde-inkestek $p=q=0{,}5$ hartzen dute, kasurik txarrena, alderdi guztientzat errore-marjina bera emateko. Bi alderdiren aldea marjina baino txikiagoa bada, «berdinketa teknikoa» dagoela esaten da.',
            'Las encuestas electorales toman $p=q=0{,}5$, el caso más desfavorable, para dar un mismo margen de error a todos los partidos. Si la diferencia entre dos partidos es menor que el margen, se habla de «empate técnico».',
            'تأخذ الاستطلاعات الانتخابية $p=q=0{,}5$، أسوأ حالة، لتعطي هامش الخطأ نفسه لكل الأحزاب. وإذا كان الفرق بين حزبين أصغر من الهامش يُقال إن هناك «تعادلًا تقنيًّا».',
            'Election polls take $p=q=0{,}5$, the worst case, to give the same margin of error to every party. If the gap between two parties is smaller than the margin, it is called a ‘statistical tie’.'
        ),
        examplePrompt: say('400 elkarrizketa eta % 99 maila. Zein da errore-marjina, kasurik txarrenean?', '400 entrevistas y nivel del 99 %. ¿Cuál es el margen de error en el caso más desfavorable?', '400 مقابلة ومستوى 99 %. ما هامش الخطأ في أسوأ حالة؟', '400 interviews and a 99% level. What is the margin of error in the worst case?'),
        example: same('$2{,}575\\cdot\\sqrt{\\frac{0{,}25}{400}}=0{,}064375$'),
        exampleAnswer: say('± 6,4 puntu inguru.', 'Unos ± 6,4 puntos.', 'نحو ± 6.4 نقطة.', 'About ± 6.4 points.')
    },
    'compare-claim': {
        vocabulary: [say('bateragarria', 'compatible', 'متوافق', 'compatible'), say('sinesgarria', 'creíble', 'مقنعة', 'believable')],
        explanation: say(
            'Konfiantza-tarteak balio sinesgarriak biltzen ditu. Norbaitek parametroaren balio bat baieztatzen badu, begiratu tartean dagoen: barruan badago, datuek ez diote kontra egiten; kanpoan badago, datuek baieztapena zalantzan jartzen dute.',
            'El intervalo de confianza reúne los valores creíbles. Si alguien afirma un valor del parámetro, mira si está en el intervalo: si está dentro, los datos no lo contradicen; si está fuera, los datos ponen la afirmación en duda.',
            'تجمع فترة الثقة القيم المقنعة. فإذا ادّعى أحد قيمة للمعلمة فانظر هل هي في الفترة: إذا كانت داخلها فالبيانات لا تناقضها؛ وإذا كانت خارجها فالبيانات تشكّك في الادعاء.',
            'The confidence interval gathers the believable values. If someone claims a value for the parameter, check whether it is in the interval: if it is inside, the data do not contradict it; if it is outside, the data cast doubt on the claim.'
        ),
        examplePrompt: say('Batez bestekoa 12 dela diote, eta % 95 mailako tartea $(11{,}2;\\ 12{,}6)$ da. Bateragarria da?', 'Dicen que la media es 12, y el intervalo al 95 % es $(11{,}2;\\ 12{,}6)$. ¿Es compatible?', 'يقولون إن المتوسط 12، وفترة 95 % هي $(11{,}2;\\ 12{,}6)$. هل هذا متوافق؟', 'They say the mean is 12, and the 95% interval is $(11{,}2;\\ 12{,}6)$. Is it compatible?'),
        example: '',
        exampleAnswer: say('Bai: 12 tartearen barruan dago.', 'Sí: 12 está dentro del intervalo.', 'نعم: 12 داخل الفترة.', 'Yes: 12 is inside the interval.')
    },
    'level-or-size': {
        vocabulary: [say('garestiagoa', 'cara', 'أغلى', 'costs'), say('lotuta', 'unidos', 'مترابطة', 'together')],
        explanation: say(
            'Errorearen formulak hiru gauza lotzen ditu: konfiantza (balio kritikoaren bidez), errorea eta laginaren tamaina. Konfiantza gehiago nahi badugu errorea handitu gabe, $n$ handitu behar da; lagin handiagoa, ordea, garestiagoa da.',
            'La fórmula del error une tres cosas: la confianza (a través del valor crítico), el error y el tamaño de la muestra. Si queremos más confianza sin que crezca el error, hay que aumentar $n$; pero una muestra mayor sale más cara.',
            'تربط صيغة الخطأ ثلاثة أشياء: الثقة (عبر القيمة الحرجة) والخطأ وحجم العيّنة. وإذا أردنا ثقة أكبر دون أن يكبر الخطأ يجب أن نزيد $n$؛ لكن العيّنة الأكبر أغلى.',
            'The error formula ties three things together: confidence (through the critical value), the error and the sample size. If we want more confidence without a bigger error, $n$ must grow; but a bigger sample costs more.'
        ),
        examplePrompt: say('$\\sigma=6$ eta $E\\le 2$. Zenbat pertsona behar dira % 99 mailan?', '$\\sigma=6$ y $E\\le 2$. ¿Cuántas personas hacen falta al 99 %?', '$\\sigma=6$ و$E\\le 2$. كم شخصًا نحتاج عند 99 %؟', '$\\sigma=6$ and $E\\le 2$. How many people are needed at 99%?'),
        example: same('$\\left(\\frac{2{,}575\\cdot 6}{2}\\right)^2=59{,}675625\\ \\to\\ 60$'),
        exampleAnswer: same('$n=60$')
    }
}

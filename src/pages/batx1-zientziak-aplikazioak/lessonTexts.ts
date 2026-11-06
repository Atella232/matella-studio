import type { LessonTexts } from '../../features/unit-v2/types.ts'
import { plain as say, plainSame as same } from '../batx1-zientziak-funtzioak/text.ts'
import type { BachApplicationsTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Deribatuaren aplikazioak · Batxilergoa 1 · Zientziak — what each lesson
   tells: the new words (definitions), a short explanation, the example as
   an exercise («Another example»), the key words in four languages and,
   in five lessons, «Why does it work?». Plain data so the tests can
   import it; lessons.tsx merges it into the topics. The example uses
   numbers of its own, never those of «Let's solve», of «Check it» or of
   the typical mistake. Curvature: cóncava/ahurra/concave up is ∪ (f″ > 0)
   and convexa/ganbila/concave down is ∩ (f″ < 0), always with the drawing.
   Tests in tests/lesson-texts.test.ts.
   ========================================================================== */

export const bachApplicationsLessonTexts: Record<BachApplicationsTopicId, LessonTexts> = {
    /* ---------- 1. Increase and decrease ---------- */
    'sign-monotony': {
        definitions: [
            { term: say('Funtzio gorakorra puntu batean', 'Función creciente en un punto', 'دالة متزايدة عند نقطة', 'Increasing at a point'), meaning: say('$a$ puntuaren ondoan, eskuineko balioak $f(a)$ baino handiagoak dira, eta ezkerrekoak txikiagoak.', 'Cerca de $a$, los valores de la derecha son mayores que $f(a)$, y los de la izquierda, menores.', 'قرب $a$ تكون القيم إلى اليمين أكبر من $f(a)$، والقيم إلى اليسار أصغر.', 'Near $a$, the values on the right are greater than $f(a)$, and those on the left are smaller.') },
            { term: say('Monotonia', 'Monotonía', 'الرتابة', 'Monotony'), meaning: say('Funtzio bat gorakorra ala beherakorra den, eta zer tartetan.', 'Si una función crece o decrece, y en qué intervalos.', 'هل الدالة متزايدة أو متناقصة، وفي أي فترات.', 'Whether a function increases or decreases, and on which intervals.') }
        ],
        vocabulary: [
            say('gorakorra', 'creciente', 'متزايدة', 'increasing'),
            say('beherakorra', 'decreciente', 'متناقصة', 'decreasing')
        ],
        explanation: say(
            '$f\'(a)$ zuzen ukitzailearen malda da $a$ puntuan. Positiboa bada, zuzen ukitzailea igotzen da, eta kurba ere bai: $f$ gorakorra da $a$ puntuan. Negatiboa bada, $f$ beherakorra da. $f\'$ deribatuak tarte oso batean zeinu bera badu, zeinu hori tarte osorako da.',
            '$f\'(a)$ es la pendiente de la tangente en $a$. Si es positiva, la tangente sube, y la curva también: $f$ es creciente en $a$. Si es negativa, $f$ es decreciente. Si $f\'$ tiene el mismo signo en todo un intervalo, ese signo vale para todo él.',
            '$f\'(a)$ هو ميل المماس عند $a$. فإذا كان موجبًا صعد المماس وصعد المنحنى معه: $f$ متزايدة عند $a$. وإذا كان سالبًا فإن $f$ متناقصة. وإذا كانت لـ $f\'$ الإشارة نفسها في فترة كاملة فهذه الإشارة صالحة للفترة كلها.',
            '$f\'(a)$ is the slope of the tangent at $a$. If it is positive, the tangent goes up, and so does the curve: $f$ is increasing at $a$. If it is negative, $f$ is decreasing. If $f\'$ has the same sign on a whole interval, that sign holds for all of it.'
        ),
        examplePrompt: say('Gorakorra ala beherakorra da $f(x)=e^x-4x$ funtzioa $x=0$ puntuan?', '¿Crece o decrece $f(x)=e^x-4x$ en $x=0$?', 'هل الدالة $f(x)=e^x-4x$ متزايدة أو متناقصة عند $x=0$؟', 'Is $f(x)=e^x-4x$ increasing or decreasing at $x=0$?'),
        example: same('$f\'(x)=e^x-4\\ \\to\\ f\'(0)=1-4=-3$'),
        exampleAnswer: say('Deribatua negatiboa da: $f$ beherakorra da $x=0$ puntuan.', 'La derivada es negativa: $f$ decrece en $x=0$.', 'المشتقة سالبة: $f$ متناقصة عند $x=0$.', 'The derivative is negative: $f$ is decreasing at $x=0$.'),
        why: {
            text: say(
                'Zergatik erabakitzen du $f\'$ deribatuaren zeinuak? $f\'(a)$ T.V.M.-aren limitea da. Positiboa bada, $h$ txikia denean T.V.M. ere positiboa da: eskuinean $f(a+h)>f(a)$, eta ezkerrean $f(a-h)<f(a)$.',
                '¿Por qué decide el signo de $f\'$? $f\'(a)$ es el límite de la T.V.M. Si es positivo, para $h$ pequeño la T.V.M. también lo es: a la derecha $f(a+h)>f(a)$, y a la izquierda $f(a-h)<f(a)$.',
                'لماذا تحسم إشارة $f\'$؟ $f\'(a)$ نهاية معدل التغير المتوسط. فإذا كانت موجبة كان المعدل موجبًا أيضًا عندما يكون $h$ صغيرًا: يمينًا $f(a+h)>f(a)$، ويسارًا $f(a-h)<f(a)$.',
                'Why does the sign of $f\'$ decide? $f\'(a)$ is the limit of the average rate. If it is positive, for a small $h$ the average rate is positive too: on the right $f(a+h)>f(a)$, and on the left $f(a-h)<f(a)$.'
            ),
            math: same('$\\frac{f(a+h)-f(a)}{h}>0$')
        }
    },
    intervals: {
        definitions: [
            { term: say('Zeinu-taula', 'Tabla de signos', 'جدول الإشارات', 'Sign chart'), meaning: say('$f\'$ deribatuaren zeroek eta izate-eremutik kanpoko puntuek zatitutako zuzena, zati bakoitzean $f\'$ deribatuaren zeinuarekin.', 'La recta partida por los ceros de $f\'$ y los puntos fuera del dominio, con el signo de $f\'$ en cada trozo.', 'المستقيم مقسومًا بأصفار $f\'$ والنقاط الواقعة خارج المجال، مع إشارة $f\'$ في كل جزء.', 'The line split by the zeros of $f\'$ and the points outside the domain, with the sign of $f\'$ on each piece.') }
        ],
        vocabulary: [
            say('tartea', 'intervalo', 'الفترة', 'interval'),
            say('izate-eremua', 'dominio', 'المجال', 'domain')
        ],
        explanation: say(
            'Funtzio bat non den gorakorra jakiteko, $f\'(x)=0$ ebazten da, eta $f$ existitzen ez den puntuak ere markatzen dira. Puntu horiek zuzena tartetan zatitzen dute; tarte bakoitzean, proba-puntu baten zeinuak tarte osoarena ematen du. Izate-eremutik kanpoko puntu batek tarteak bereizten ditu, baina ez da mutur bat.',
            'Para hallar dónde crece una función, se resuelve $f\'(x)=0$ y se marcan también los puntos donde $f$ no existe. Esos puntos parten la recta en intervalos; en cada uno, el signo de un punto de prueba da el de todo el intervalo. Un punto fuera del dominio separa intervalos, pero no es un extremo.',
            'لمعرفة أين تتزايد الدالة نحلّ $f\'(x)=0$ ونعلّم أيضًا النقاط التي لا توجد فيها $f$. تقسم هذه النقاط المستقيم إلى فترات، وفي كل فترة تعطي إشارة نقطة تجربة إشارة الفترة كلها. والنقطة الواقعة خارج المجال تفصل الفترات لكنها ليست قيمة قصوى.',
            'To find where a function increases, solve $f\'(x)=0$ and also mark the points where $f$ does not exist. Those points split the line into intervals; on each one, the sign at a test point gives that of the whole interval. A point outside the domain separates intervals, but it is not an extremum.'
        ),
        examplePrompt: say('Aurkitu non den gorakorra eta non beherakorra $f(x)=x+\\frac{4}{x}$.', 'Halla dónde crece y dónde decrece $f(x)=x+\\frac{4}{x}$.', 'أوجد أين تتزايد $f(x)=x+\\frac{4}{x}$ وأين تتناقص.', 'Find where $f(x)=x+\\frac{4}{x}$ increases and where it decreases.'),
        example: same('$f\'(x)=1-\\frac{4}{x^2}=\\frac{(x-2)(x+2)}{x^2}$'),
        exampleAnswer: say('Zeroak $-2$ eta 2, eta 0 izate-eremutik kanpo: gorakorra $(-\\infty,\\,-2)\\cup(2,\\,+\\infty)$ tartean, eta beherakorra $(-2,\\,0)\\cup(0,\\,2)$ tartean.', 'Ceros $-2$ y 2, y el 0 fuera del dominio: crece en $(-\\infty,\\,-2)\\cup(2,\\,+\\infty)$ y decrece en $(-2,\\,0)\\cup(0,\\,2)$.', 'الصفران $-2$ و2، والعدد 0 خارج المجال: تتزايد في $(-\\infty,\\,-2)\\cup(2,\\,+\\infty)$ وتتناقص في $(-2,\\,0)\\cup(0,\\,2)$.', 'Zeros $-2$ and 2, and 0 outside the domain: it increases on $(-\\infty,\\,-2)\\cup(2,\\,+\\infty)$ and decreases on $(-2,\\,0)\\cup(0,\\,2)$.')
    },
    'always-increasing': {
        definitions: [
            { term: say('Gorakorra tarte batean', 'Creciente en un intervalo', 'متزايدة في فترة', 'Increasing on an interval'), meaning: say('Tarteko $x_1<x_2$ bada, orduan $f(x_1)<f(x_2)$: aurrera egitean, beti igotzen da.', 'Si $x_1<x_2$ en el intervalo, entonces $f(x_1)<f(x_2)$: al avanzar, siempre sube.', 'إذا كان $x_1<x_2$ في الفترة فإن $f(x_1)<f(x_2)$: كلما تقدمنا صعدت.', 'If $x_1<x_2$ in the interval, then $f(x_1)<f(x_2)$: moving right, it always goes up.') },
            { term: say('Diskriminatzailea', 'Discriminante', 'المميز', 'Discriminant'), meaning: say('$b^2-4ac$: negatiboa edo zero bada, $ax^2+bx+c$ parabolak ez du ardatza bi aldiz mozten.', '$b^2-4ac$: si es negativo o cero, la parábola $ax^2+bx+c$ no corta el eje dos veces.', '$b^2-4ac$: إذا كان سالبًا أو صفرًا فإن القطع $ax^2+bx+c$ لا يقطع المحور مرتين.', '$b^2-4ac$: if it is negative or zero, the parabola $ax^2+bx+c$ does not cross the axis twice.') }
        ],
        vocabulary: [
            say('parametroa', 'parámetro', 'الوسيط', 'parameter'),
            say('parabola', 'parábola', 'القطع المكافئ', 'parabola')
        ],
        explanation: say(
            'Funtzio bat $\\mathbb{R}$ osoan gorakorra izan daiteke, nahiz eta bere deribatua puntu batean anulatu: $x^3$ beti da gorakorra, eta $f\'(0)=0$. Ezin dena da $f\'$ deribatua zati batean negatiboa izatea. $f\'$ gorantz irekitzen den parabola bat bada, hori lortzen da ardatza bi aldiz mozten ez duenean.',
            'Una función puede crecer en todo $\\mathbb{R}$ aunque su derivada se anule en algún punto: $x^3$ crece siempre, y $f\'(0)=0$. Lo que no puede pasar es que $f\'$ sea negativa en un trozo. Si $f\'$ es una parábola que se abre hacia arriba, eso se consigue cuando no corta el eje dos veces.',
            'قد تتزايد الدالة في كل $\\mathbb{R}$ ولو انعدمت مشتقتها عند نقطة: $x^3$ متزايدة دائمًا، و$f\'(0)=0$. أما ما لا يجوز فهو أن تكون $f\'$ سالبة في جزء. وإذا كانت $f\'$ قطعًا مكافئًا مفتوحًا إلى الأعلى فذلك يتحقق عندما لا يقطع المحور مرتين.',
            'A function can increase on all of $\\mathbb{R}$ even if its derivative is zero at some point: $x^3$ always increases, and $f\'(0)=0$. What cannot happen is $f\'$ being negative on a piece. If $f\'$ is a parabola that opens upwards, that holds when it does not cross the axis twice.'
        ),
        examplePrompt: say('$k$ parametroaren zer baliotarako da gorakorra $\\mathbb{R}$ osoan $f(x)=x^3+6x^2+kx$ funtzioa?', '¿Para qué valores de $k$ es creciente en todo $\\mathbb{R}$ la función $f(x)=x^3+6x^2+kx$?', 'ما قيم $k$ التي تكون فيها الدالة متزايدة في كل $\\mathbb{R}$: $f(x)=x^3+6x^2+kx$؟', 'For which values of $k$ is the function increasing on all of $\\mathbb{R}$: $f(x)=x^3+6x^2+kx$?'),
        example: same('$\\begin{aligned}&f\'(x)=3x^2+12x+k\\\\ &144-12k\\le 0\\ \\to\\ k\\ge 12\\end{aligned}$'),
        exampleAnswer: say('$\\mathbb{R}$ osoan gorakorra da $k\\ge 12$ bada.', 'Es creciente en todo $\\mathbb{R}$ si $k\\ge 12$.', 'تكون متزايدة في كل $\\mathbb{R}$ إذا كان $k\\ge 12$.', 'It is increasing on all of $\\mathbb{R}$ if $k\\ge 12$.')
    },

    /* ---------- 2. Maxima and minima ---------- */
    'singular-points': {
        definitions: [
            { term: say('Puntu singularra', 'Punto singular', 'النقطة الحرجة', 'Stationary point'), meaning: say('$f\'(a)=0$ den puntu bat: zuzen ukitzailea horizontala da.', 'Un punto donde $f\'(a)=0$: la tangente es horizontal.', 'نقطة يكون فيها $f\'(a)=0$: المماس أفقي.', 'A point where $f\'(a)=0$: the tangent is horizontal.') },
            { term: say('Maximo erlatiboa', 'Máximo relativo', 'القيمة العظمى المحلية', 'Local maximum'), meaning: say('Inguruko puntu guztiak baino altuagoa den puntu bat: funtzioa igotzetik jaistera pasatzen da.', 'Un punto más alto que todos los de su alrededor: la función pasa de subir a bajar.', 'نقطة أعلى من كل النقاط المحيطة بها: تنتقل الدالة من الصعود إلى النزول.', 'A point higher than all those around it: the function goes from rising to falling.') },
            { term: say('Minimo erlatiboa', 'Mínimo relativo', 'القيمة الصغرى المحلية', 'Local minimum'), meaning: say('Inguruko puntu guztiak baino baxuagoa den puntu bat: jaistetik igotzera pasatzen da.', 'Un punto más bajo que todos los de su alrededor: pasa de bajar a subir.', 'نقطة أدنى من كل النقاط المحيطة بها: تنتقل من النزول إلى الصعود.', 'A point lower than all those around it: it goes from falling to rising.') }
        ],
        vocabulary: [
            say('zeinu-aldaketa', 'cambio de signo', 'تغير الإشارة', 'change of sign'),
            say('zuzen ukitzaile horizontala', 'tangente horizontal', 'مماس أفقي', 'horizontal tangent')
        ],
        explanation: say(
            'Maximo edo minimo batean zuzen ukitzailea horizontala da; beraz, $f\'(x)=0$ duten puntuen artean bilatzen dira. Baina ez dira denak: $f\'$ deribatuaren zeinuari begiratu behar zaio bi aldeetan. $+$ zeinutik $-$ zeinura pasatzen bada, funtzioa igo eta gero jaisten da: maximoa. $-$ zeinutik $+$ zeinura pasatzen bada, minimoa.',
            'En un máximo o en un mínimo la tangente es horizontal, así que se buscan entre los puntos con $f\'(x)=0$. Pero no todos lo son: hay que mirar el signo de $f\'$ a los dos lados. Si pasa de $+$ a $-$, la función sube y luego baja: máximo. Si pasa de $-$ a $+$, mínimo.',
            'عند القيمة العظمى أو الصغرى يكون المماس أفقيًّا، لذا نبحث عنهما بين النقاط التي فيها $f\'(x)=0$. لكن ليست كلها كذلك: يجب النظر إلى إشارة $f\'$ على الجانبين. فإذا انتقلت من $+$ إلى $-$ صعدت الدالة ثم نزلت: قيمة عظمى. وإذا انتقلت من $-$ إلى $+$ فقيمة صغرى.',
            'At a maximum or a minimum the tangent is horizontal, so you look for them among the points with $f\'(x)=0$. But not all of them are: you must look at the sign of $f\'$ on both sides. If it goes from $+$ to $-$, the function rises and then falls: a maximum. If it goes from $-$ to $+$, a minimum.'
        ),
        examplePrompt: say('Aurkitu $f(x)=x^2-8x+5$ funtzioaren mutur erlatiboak.', 'Halla los extremos relativos de $f(x)=x^2-8x+5$.', 'أوجد القيم القصوى المحلية للدالة $f(x)=x^2-8x+5$.', 'Find the local extrema of $f(x)=x^2-8x+5$.'),
        example: same('$\\begin{aligned}&f\'(x)=2x-8=0\\ \\to\\ x=4\\\\ &f(4)=16-32+5=-11\\end{aligned}$'),
        exampleAnswer: say('$f\'$ deribatua $-$ zeinutik $+$ zeinura pasatzen da 4 puntuan: minimo bat dago $(4,\\,-11)$ puntuan.', '$f\'$ pasa de $-$ a $+$ en 4: hay un mínimo en $(4,\\,-11)$.', 'تنتقل $f\'$ من $-$ إلى $+$ عند 4: توجد قيمة صغرى عند $(4,\\,-11)$.', '$f\'$ goes from $-$ to $+$ at 4: there is a minimum at $(4,\\,-11)$.'),
        why: {
            text: say(
                'Zergatik ez da nahikoa $f\'(a)=0$? $x^3$ funtzioan, $f\'(0)=0$ da, baina $f\'(x)=3x^2$ positiboa da bi aldeetan: funtzioa igotzen da 0 baino lehen eta ondoren. Zuzen ukitzailea horizontala da, baina ez dago ez gailurrik ez haranik.',
                '¿Por qué no basta $f\'(a)=0$? En $x^3$, $f\'(0)=0$, pero $f\'(x)=3x^2$ es positiva a los dos lados: la función sube antes y después de 0. La tangente es horizontal, pero no hay ni cima ni valle.',
                'لماذا لا يكفي $f\'(a)=0$؟ في $x^3$ يكون $f\'(0)=0$، لكن $f\'(x)=3x^2$ موجبة على الجانبين: تصعد الدالة قبل 0 وبعده. المماس أفقي، لكن لا قمة ولا وادي.',
                'Why is $f\'(a)=0$ not enough? For $x^3$, $f\'(0)=0$, but $f\'(x)=3x^2$ is positive on both sides: the function rises before and after 0. The tangent is horizontal, but there is neither a peak nor a valley.'
            ),
            math: same('$f\'(-0{,}1)=0{,}03\\qquad f\'(0{,}1)=0{,}03$')
        }
    },
    'second-derivative': {
        definitions: [
            { term: say('Bigarren deribatua', 'Segunda derivada', 'المشتقة الثانية', 'Second derivative'), meaning: say('$f\'\'$: $f\'$ deribatuaren deribatua. Malda nola aldatzen den adierazten du.', '$f\'\'$: la derivada de $f\'$. Dice cómo cambia la pendiente.', '$f\'\'$: مشتقة $f\'$. تبيّن كيف يتغير الميل.', '$f\'\'$: the derivative of $f\'$. It tells how the slope changes.') }
        ],
        vocabulary: [
            say('irizpidea', 'criterio', 'اختبار', 'test'),
            say('maximoa', 'máximo', 'عظمى', 'maximum'),
            say('minimoa', 'mínimo', 'صغرى', 'minimum')
        ],
        explanation: say(
            'Puntu singular batean, $f\'\'$ deribatuaren zeinuak $f\'$ deribatua nola aldatzen den esaten du. $f\'\'(a)<0$ bada, malda txikitzen da: positibotik negatibora pasatzen da, eta maximo bat dago. $f\'\'(a)>0$ bada, malda handitzen da: minimo bat dago. $f\'\'(a)=0$ bada, $f\'$ deribatuaren zeinua aztertu behar da.',
            'En un punto singular, el signo de $f\'\'$ dice cómo cambia $f\'$. Si $f\'\'(a)<0$, la pendiente disminuye: pasa de positiva a negativa, y hay un máximo. Si $f\'\'(a)>0$, la pendiente aumenta: hay un mínimo. Si $f\'\'(a)=0$, hay que estudiar el signo de $f\'$.',
            'عند نقطة حرجة تبيّن إشارة $f\'\'$ كيف تتغير $f\'$. فإذا كان $f\'\'(a)<0$ نقص الميل: ينتقل من موجب إلى سالب، وتوجد قيمة عظمى. وإذا كان $f\'\'(a)>0$ زاد الميل: توجد قيمة صغرى. وإذا كان $f\'\'(a)=0$ وجب دراسة إشارة $f\'$.',
            'At a stationary point, the sign of $f\'\'$ tells how $f\'$ changes. If $f\'\'(a)<0$, the slope decreases: it goes from positive to negative, and there is a maximum. If $f\'\'(a)>0$, the slope increases: there is a minimum. If $f\'\'(a)=0$, you must study the sign of $f\'$.'
        ),
        examplePrompt: say('Zer da $f(x)=4x-x^2$ funtzioaren puntu singularra: maximoa ala minimoa?', '¿Qué es el punto singular de $f(x)=4x-x^2$: un máximo o un mínimo?', 'ما النقطة الحرجة للدالة $f(x)=4x-x^2$: عظمى أم صغرى؟', 'What is the stationary point of $f(x)=4x-x^2$: a maximum or a minimum?'),
        example: same('$f\'(x)=4-2x=0\\ \\to\\ x=2\\qquad f\'\'(2)=-2$'),
        exampleAnswer: say('$f\'\'(2)<0$: maximo bat da, $(2,\\,4)$ puntuan.', '$f\'\'(2)<0$: es un máximo, en $(2,\\,4)$.', '$f\'\'(2)<0$: إنها قيمة عظمى عند $(2,\\,4)$.', '$f\'\'(2)<0$: it is a maximum, at $(2,\\,4)$.'),
        why: {
            text: say(
                'Zergatik dabil? $f\'\'$ deribatua $f\'$ deribatuaren malda da. $f\'\'(a)<0$ bada, $f\'$ beherakorra da $a$ puntutik pasatzean: positibotik negatibora doa, eta $f$ igotzetik jaistera pasatzen da. Adibidean, $x=1$ puntutik hurbil:',
                '¿Por qué funciona? $f\'\'$ es la pendiente de $f\'$. Si $f\'\'(a)<0$, $f\'$ decrece al pasar por $a$: va de positiva a negativa, y $f$ pasa de subir a bajar. En el ejemplo, cerca de $x=1$:',
                'لماذا ينجح؟ $f\'\'$ هي ميل $f\'$. فإذا كان $f\'\'(a)<0$ تناقصت $f\'$ عند المرور بـ $a$: تنتقل من موجبة إلى سالبة، وتنتقل $f$ من الصعود إلى النزول. في المثال قرب $x=1$:',
                'Why does it work? $f\'\'$ is the slope of $f\'$. If $f\'\'(a)<0$, $f\'$ decreases as it passes $a$: it goes from positive to negative, and $f$ goes from rising to falling. In the example, near $x=1$:'
            ),
            math: same('$f\'(0{,}9)=0{,}63\\qquad f\'(1{,}1)=-0{,}57$')
        }
    },
    'extreme-coefficients': {
        definitions: [
            { term: say('Koefizientea', 'Coeficiente', 'المعامل', 'Coefficient'), meaning: say('Formulako zenbaki bat, $a$ edo $b$ bezala $x^3+ax^2+b$ adierazpenean, datuekin aurkitu behar dena.', 'Un número de la fórmula, como $a$ o $b$ en $x^3+ax^2+b$, que hay que hallar con los datos.', 'عدد في الصيغة مثل $a$ أو $b$ في $x^3+ax^2+b$ يجب إيجاده من المعطيات.', 'A number in the formula, like $a$ or $b$ in $x^3+ax^2+b$, that you have to find from the data.') }
        ],
        vocabulary: [
            say('ekuazioa', 'ecuación', 'معادلة', 'equation'),
            say('baldintza', 'condición', 'شرط', 'condition')
        ],
        explanation: say(
            'Enuntziatuko datu bakoitza ekuazio bat ematen duen baldintza bat da. «Mutur bat du $x=a$ puntuan» datuak $f\'(a)=0$ ematen du. «$(a,\\,b)$ puntutik pasatzen da» datuak $f(a)=b$ ematen du. Koefizienteak adina ekuaziorekin, sistema ebazten da. Amaieran, $f\'\'(a)$ balioak baieztatzen du maximoa ala minimoa den.',
            'Cada dato del enunciado es una condición que da una ecuación. «Tiene un extremo en $x=a$» da $f\'(a)=0$. «Pasa por $(a,\\,b)$» da $f(a)=b$. Con tantas ecuaciones como coeficientes, se resuelve el sistema. Al final, $f\'\'(a)$ confirma si es un máximo o un mínimo.',
            'كل معطى في المسألة شرط يعطي معادلة. «لها قيمة قصوى عند $x=a$» يعطي $f\'(a)=0$. و«تمر بـ $(a,\\,b)$» يعطي $f(a)=b$. وبعدد من المعادلات يساوي عدد المعاملات نحل النظام. وفي النهاية تؤكد $f\'\'(a)$ هل هي عظمى أو صغرى.',
            'Each piece of data in the statement is a condition that gives an equation. «It has an extremum at $x=a$» gives $f\'(a)=0$. «It goes through $(a,\\,b)$» gives $f(a)=b$. With as many equations as coefficients, solve the system. At the end, $f\'\'(a)$ confirms whether it is a maximum or a minimum.'
        ),
        examplePrompt: say('$f(x)=x^2+bx+c$ parabolak minimo bat du $(3,\\,1)$ puntuan. Aurkitu $b$ eta $c$.', 'La parábola $f(x)=x^2+bx+c$ tiene un mínimo en $(3,\\,1)$. Halla $b$ y $c$.', 'للقطع المكافئ $f(x)=x^2+bx+c$ قيمة صغرى عند $(3,\\,1)$. أوجد $b$ و$c$.', 'The parabola $f(x)=x^2+bx+c$ has a minimum at $(3,\\,1)$. Find $b$ and $c$.'),
        example: same('$\\begin{aligned}&f\'(3)=6+b=0\\ \\to\\ b=-6\\\\ &9-18+c=1\\ \\to\\ c=10\\end{aligned}$'),
        exampleAnswer: say('$b=-6$ eta $c=10$: $f(x)=x^2-6x+10$.', '$b=-6$ y $c=10$: $f(x)=x^2-6x+10$.', '$b=-6$ و$c=10$: $f(x)=x^2-6x+10$.', '$b=-6$ and $c=10$: $f(x)=x^2-6x+10$.')
    },

    /* ---------- 3. Concavity ---------- */
    concavity: {
        definitions: [
            { term: say('Ahurra (∪)', 'Cóncava (∪)', 'مقعّرة نحو الأعلى (∪)', 'Concave up (∪)'), meaning: say('Kurba gorantz irekitzen da: zuzen ukitzailea azpian geratzen da. $f\'\'>0$ denean gertatzen da.', 'La curva se abre hacia arriba: la tangente queda por debajo. Pasa donde $f\'\'>0$.', 'ينفتح المنحنى إلى الأعلى: يبقى المماس تحته. يحدث ذلك حيث $f\'\'>0$.', 'The curve opens upwards: the tangent lies below it. It happens where $f\'\'>0$.') },
            { term: say('Ganbila (∩)', 'Convexa (∩)', 'مقعّرة نحو الأسفل (∩)', 'Concave down (∩)'), meaning: say('Kurba beherantz irekitzen da: zuzen ukitzailea gainean geratzen da. $f\'\'<0$ denean gertatzen da.', 'La curva se abre hacia abajo: la tangente queda por encima. Pasa donde $f\'\'<0$.', 'ينفتح المنحنى إلى الأسفل: يبقى المماس فوقه. يحدث ذلك حيث $f\'\'<0$.', 'The curve opens downwards: the tangent lies above it. It happens where $f\'\'<0$.') }
        ],
        vocabulary: [
            say('kurbadura', 'curvatura', 'التقعّر', 'concavity'),
            say('malda', 'pendiente', 'الميل', 'slope')
        ],
        explanation: say(
            'Kurbadura $f\'\'$ deribatuak ematen du, maldaren malda. $f\'\'>0$ bada, maldak handitzen dira ezkerretik eskuinera, eta kurba gorantz tolesten da: ahurra da (∪). $f\'\'<0$ bada, beherantz tolesten da: ganbila da (∩). Kontuz: liburu batzuek bi izen hauek alderantziz erabiltzen dituzte; marrazkiak agintzen du.',
            'La curvatura la da $f\'\'$, la pendiente de la pendiente. Si $f\'\'>0$, las pendientes crecen de izquierda a derecha y la curva se dobla hacia arriba: es cóncava (∪). Si $f\'\'<0$, se dobla hacia abajo: es convexa (∩). Ojo: hay libros que usan estos dos nombres al revés; el dibujo es el que manda.',
            'يحدد $f\'\'$ التقعّر، فهي ميل الميل. فإذا كان $f\'\'>0$ تزايدت الميول من اليسار إلى اليمين وانثنى المنحنى إلى الأعلى: مقعّر نحو الأعلى (∪). وإذا كان $f\'\'<0$ انثنى إلى الأسفل: مقعّر نحو الأسفل (∩). والرسم هو المرجع دائمًا.',
            'The concavity comes from $f\'\'$, the slope of the slope. If $f\'\'>0$, the slopes grow from left to right and the curve bends upwards: it is concave up (∪). If $f\'\'<0$, it bends downwards: it is concave down (∩). Careful: books give these two shapes other names too; the drawing is what counts.'
        ),
        examplePrompt: say('Nolakoa da $f(x)=\\ln x$ funtzioaren kurbadura?', '¿Cómo es la curvatura de $f(x)=\\ln x$?', 'كيف تقعّر $f(x)=\\ln x$؟', 'How is $f(x)=\\ln x$ curved?'),
        example: same('$f\'(x)=\\frac{1}{x}\\qquad f\'\'(x)=-\\frac{1}{x^2}<0$'),
        exampleAnswer: say('$f\'\'$ negatiboa da $x>0$ guztietarako: $\\ln x$ ganbila da (∩) izate-eremu osoan.', '$f\'\'$ es negativa para todo $x>0$: $\\ln x$ es convexa (∩) en todo su dominio.', '$f\'\'$ سالبة لكل $x>0$: $\\ln x$ مقعّرة نحو الأسفل (∩) في كل مجالها.', '$f\'\'$ is negative for every $x>0$: $\\ln x$ is concave down (∩) on its whole domain.'),
        why: {
            text: say(
                'Zergatik ematen du $f\'\'>0$ balioak ∪ forma? $f\'\'>0$ esan nahi du $f\'$ gorakorra dela: ezkerretik eskuinera, zuzen ukitzaileak gorantz biratzen dira; lehenik jaisten dira, gero horizontalak dira, eta gero igotzen dira. $x^3-3x^2$ funtzioan, $x=1$ puntutik aurrera:',
                '¿Por qué $f\'\'>0$ da forma de ∪? $f\'\'>0$ significa que $f\'$ crece: de izquierda a derecha, las tangentes giran hacia arriba; primero bajan, luego son horizontales y luego suben. En $x^3-3x^2$, a partir de $x=1$:',
                'لماذا يعطي $f\'\'>0$ شكل ∪؟ $f\'\'>0$ يعني أن $f\'$ متزايدة: من اليسار إلى اليمين تدور المماسات نحو الأعلى، فتنزل أولًا ثم تصير أفقية ثم تصعد. في $x^3-3x^2$ ابتداءً من $x=1$:',
                'Why does $f\'\'>0$ give the shape ∪? $f\'\'>0$ means that $f\'$ increases: from left to right, the tangents turn upwards; first they go down, then they are horizontal, then they go up. For $x^3-3x^2$, from $x=1$ on:'
            ),
            math: same('$f\'(1)=-3\\qquad f\'(2)=0\\qquad f\'(3)=9$')
        }
    },
    inflection: {
        definitions: [
            { term: say('Inflexio-puntua', 'Punto de inflexión', 'نقطة الانعطاف', 'Point of inflection'), meaning: say('Kurbak kurbadura aldatzen duen puntua, ∩ izatetik ∪ izatera edo alderantziz; han $f\'\'$ deribatuak zeinua aldatzen du.', 'Un punto donde la curva cambia de curvatura, de ∩ a ∪ o al revés; allí $f\'\'$ cambia de signo.', 'نقطة يغير فيها المنحنى تقعّره من ∩ إلى ∪ أو العكس، وتغير فيها $f\'\'$ إشارتها.', 'A point where the curve changes concavity, from ∩ to ∪ or the other way round; there $f\'\'$ changes sign.') }
        ],
        vocabulary: [
            say('bigarren deribatua', 'segunda derivada', 'المشتقة الثانية', 'second derivative'),
            say('kurbadura', 'curvatura', 'التقعّر', 'concavity')
        ],
        explanation: say(
            'Kurbadura-tarteak hazkunde-tarteak bezala aurkitzen dira, baina $f\'\'$ deribatuarekin: $f\'\'(x)=0$ ebazten da, eta zati bakoitzean zeinuari begiratzen zaio. Zeinua aldatzen den tokian inflexio-puntu bat dago: zuzen ukitzaileak kurba zeharkatzen du. $f\'\'$ zeinurik aldatu gabe anulatzen bada, $x^4$ funtzioan bezala, ez dago.',
            'Los intervalos de curvatura se hallan como los de crecimiento, pero con $f\'\'$: se resuelve $f\'\'(x)=0$ y se mira el signo en cada trozo. Donde el signo cambia, hay un punto de inflexión: la tangente atraviesa la curva. Si $f\'\'$ se anula sin cambiar de signo, como en $x^4$, no lo hay.',
            'تُوجد فترات التقعّر كما تُوجد فترات التزايد لكن بـ $f\'\'$: نحل $f\'\'(x)=0$ وننظر إلى الإشارة في كل جزء. وحيث تتغير الإشارة توجد نقطة انعطاف: يخترق المماس المنحنى. وإذا انعدمت $f\'\'$ دون أن تغير إشارتها، كما في $x^4$، فلا توجد.',
            'The intervals of concavity are found like those of increase, but with $f\'\'$: solve $f\'\'(x)=0$ and look at the sign on each piece. Where the sign changes, there is a point of inflection: the tangent crosses the curve. If $f\'\'$ is zero without changing sign, as for $x^4$, there is none.'
        ),
        examplePrompt: say('Aurkitu $f(x)=x^3+3x^2-5$ funtzioaren inflexio-puntua.', 'Halla el punto de inflexión de $f(x)=x^3+3x^2-5$.', 'أوجد نقطة انعطاف $f(x)=x^3+3x^2-5$.', 'Find the point of inflection of $f(x)=x^3+3x^2-5$.'),
        example: same('$\\begin{aligned}&f\'\'(x)=6x+6=0\\ \\to\\ x=-1\\\\ &f(-1)=-1+3-5=-3\\end{aligned}$'),
        exampleAnswer: say('$f\'\'$ deribatua $-$ zeinutik $+$ zeinura pasatzen da $-1$ puntuan: inflexioa $(-1,\\,-3)$ puntuan.', '$f\'\'$ pasa de $-$ a $+$ en $-1$: inflexión en $(-1,\\,-3)$.', 'تنتقل $f\'\'$ من $-$ إلى $+$ عند $-1$: انعطاف عند $(-1,\\,-3)$.', '$f\'\'$ goes from $-$ to $+$ at $-1$: an inflection at $(-1,\\,-3)$.')
    },
    'inflection-coefficients': {
        definitions: [
            { term: say('Inflexioko zuzen ukitzailea', 'Tangente de inflexión', 'مماس الانعطاف', 'Tangent at the inflection'), meaning: say('Inflexio-puntuko zuzen ukitzailea: kurba zeharkatzen du, eta haren malda $f\'(a)$ da.', 'La tangente en el punto de inflexión: atraviesa la curva, y su pendiente es $f\'(a)$.', 'المماس عند نقطة الانعطاف: يخترق المنحنى، وميله $f\'(a)$.', 'The tangent at the point of inflection: it crosses the curve, and its slope is $f\'(a)$.') }
        ],
        vocabulary: [
            say('koefizientea', 'coeficiente', 'المعامل', 'coefficient'),
            say('ekuazioa', 'ecuación', 'معادلة', 'equation')
        ],
        explanation: say(
            '$x=a$ puntuko inflexio batek $f\'\'(a)=0$ ekuazioa ematen du, eta $(a,\\,b)$ puntutik pasatzeak $f(a)=b$ ematen du. Han zuzen ukitzailearen $m$ malda ematen badute, beste bat ateratzen da: $f\'(a)=m$. Dagokion deribatua erabili behar da: bigarrena inflexiorako, lehena maldarako.',
            'Un punto de inflexión en $x=a$ da la ecuación $f\'\'(a)=0$, y que pase por $(a,\\,b)$ da $f(a)=b$. Si dicen la pendiente $m$ de la tangente allí, sale otra: $f\'(a)=m$. Hay que usar la derivada que toca: la segunda para la inflexión, la primera para la pendiente.',
            'تعطي نقطة الانعطاف عند $x=a$ المعادلة $f\'\'(a)=0$، ومرورها بـ $(a,\\,b)$ يعطي $f(a)=b$. وإذا أُعطي ميل المماس $m$ هناك نتجت معادلة أخرى: $f\'(a)=m$. يجب استعمال المشتقة المناسبة: الثانية للانعطاف والأولى للميل.',
            'A point of inflection at $x=a$ gives the equation $f\'\'(a)=0$, and going through $(a,\\,b)$ gives $f(a)=b$. If you are given the slope $m$ of the tangent there, you get another: $f\'(a)=m$. Use the right derivative: the second for the inflection, the first for the slope.'
        ),
        examplePrompt: say('$f(x)=x^3+ax^2+bx$ funtzioak inflexio bat du $x=2$ puntuan, eta han zuzen ukitzailearen malda $-3$ da. Aurkitu $a$ eta $b$.', '$f(x)=x^3+ax^2+bx$ tiene una inflexión en $x=2$, donde la tangente tiene pendiente $-3$. Halla $a$ y $b$.', 'للدالة $f(x)=x^3+ax^2+bx$ انعطاف عند $x=2$ حيث ميل المماس $-3$. أوجد $a$ و$b$.', '$f(x)=x^3+ax^2+bx$ has an inflection at $x=2$, where the tangent has slope $-3$. Find $a$ and $b$.'),
        example: same('$\\begin{aligned}&12+2a=0\\ \\to\\ a=-6\\\\ &12-24+b=-3\\ \\to\\ b=9\\end{aligned}$'),
        exampleAnswer: say('$a=-6$ eta $b=9$: $f(x)=x^3-6x^2+9x$.', '$a=-6$ y $b=9$: $f(x)=x^3-6x^2+9x$.', '$a=-6$ و$b=9$: $f(x)=x^3-6x^2+9x$.', '$a=-6$ and $b=9$: $f(x)=x^3-6x^2+9x$.')
    },

    /* ---------- 4. Optimisation ---------- */
    'absolute-extremes': {
        definitions: [
            { term: say('Maximo absolutua', 'Máximo absoluto', 'القيمة العظمى المطلقة', 'Absolute maximum'), meaning: say('Funtzioak tarte osoan hartzen duen baliorik handiena.', 'El mayor valor que toma la función en todo el intervalo.', 'أكبر قيمة تأخذها الدالة في الفترة كلها.', 'The greatest value the function takes on the whole interval.') },
            { term: say('Minimo absolutua', 'Mínimo absoluto', 'القيمة الصغرى المطلقة', 'Absolute minimum'), meaning: say('Funtzioak tarte osoan hartzen duen baliorik txikiena.', 'El menor valor que toma la función en todo el intervalo.', 'أصغر قيمة تأخذها الدالة في الفترة كلها.', 'The least value the function takes on the whole interval.') }
        ],
        vocabulary: [
            say('tarte itxia', 'intervalo cerrado', 'فترة مغلقة', 'closed interval'),
            say('jarraitua', 'continua', 'متصلة', 'continuous')
        ],
        explanation: say(
            '$[a,\\,b]$ tarte itxi batean, funtzio jarraitu batek beti du balio maximo bat eta minimo bat. Barruan egon daitezke, puntu singular batean, edo $a$ eta $b$ ertzetan, nahiz eta han $f\'$ ez izan 0. Horregatik, $f$ kalkulatzen da barruko puntu singularretan eta bi ertzetan, eta handiena eta txikiena aukeratzen dira.',
            'En un intervalo cerrado $[a,\\,b]$, una función continua siempre tiene un valor máximo y uno mínimo. Pueden estar dentro, en un punto singular, o en los bordes $a$ y $b$, aunque allí $f\'$ no sea 0. Por eso se calcula $f$ en los puntos singulares de dentro y en los dos bordes, y se elige el mayor y el menor.',
            'في الفترة المغلقة $[a,\\,b]$ يكون للدالة المتصلة دائمًا قيمة عظمى وقيمة صغرى. وقد تقعان في الداخل عند نقطة حرجة، أو عند الطرفين $a$ و$b$ ولو لم تكن $f\'$ صفرًا هناك. لذلك نحسب $f$ عند النقاط الحرجة الداخلية وعند الطرفين، ونختار الأكبر والأصغر.',
            'On a closed interval $[a,\\,b]$, a continuous function always has a greatest and a least value. They can be inside, at a stationary point, or at the edges $a$ and $b$, even if $f\'$ is not 0 there. So work out $f$ at the stationary points inside and at the two edges, and choose the greatest and the least.'
        ),
        examplePrompt: say('Aurkitu $f(x)=x^2-4x$ funtzioaren maximo eta minimo absolutuak $[1,\\,5]$ tartean.', 'Halla el máximo y el mínimo absolutos de $f(x)=x^2-4x$ en $[1,\\,5]$.', 'أوجد القيمتين العظمى والصغرى المطلقتين للدالة $f(x)=x^2-4x$ في $[1,\\,5]$.', 'Find the absolute maximum and minimum of $f(x)=x^2-4x$ on $[1,\\,5]$.'),
        example: same('$f(1)=-3\\quad f(2)=-4\\quad f(5)=25-20=5$'),
        exampleAnswer: say('Maximo absolutua 5, $x=5$ puntuan (ertz bat); minimo absolutua $-4$, $x=2$ puntuan.', 'Máximo absoluto 5, en $x=5$ (un borde); mínimo absoluto $-4$, en $x=2$.', 'القيمة العظمى المطلقة 5 عند $x=5$ (طرف)، والصغرى المطلقة $-4$ عند $x=2$.', 'Absolute maximum 5, at $x=5$ (an edge); absolute minimum $-4$, at $x=2$.'),
        why: {
            text: say(
                'Zergatik puntu horiek bakarrik? Maximoa barruan egongo balitz eta han $f\'$ ez balitz 0, funtzioa alde batera igoko litzateke, eta balio handiagoak egongo lirateke ondoan. Barruan, $f\'=0$ den tokian bakarrik egon daiteke; bestela, ertz batean, funtzioak aurrera egin ezin duen tokian.',
                '¿Por qué solo esos puntos? Si el máximo estuviera dentro y $f\'$ no fuera 0 allí, la función subiría hacia un lado y habría valores mayores cerca. Dentro, solo puede estar donde $f\'=0$; si no, en un borde, donde la función ya no puede seguir.',
                'لماذا هذه النقاط وحدها؟ لو كانت القيمة العظمى في الداخل ولم تكن $f\'$ صفرًا هناك لصعدت الدالة نحو أحد الجانبين ولوُجدت قيم أكبر قريبة. ففي الداخل لا تكون إلا حيث $f\'=0$، وإلا فعند طرف لا تستطيع الدالة تجاوزه.',
                'Why only those points? If the maximum were inside and $f\'$ were not 0 there, the function would rise towards one side and there would be greater values nearby. Inside, it can only be where $f\'=0$; otherwise, at an edge, where the function cannot go on.'
            )
        }
    },
    geometry: {
        definitions: [
            { term: say('Helburu-funtzioa', 'Función objetivo', 'الدالة الهدف', 'Objective function'), meaning: say('Maximo edo minimo egin nahi den magnitudea (azalera, bolumena, kostua), funtzio gisa idatzita.', 'La magnitud que se quiere hacer máxima o mínima (un área, un volumen, un coste), escrita como función.', 'المقدار المراد جعله أكبر أو أصغر ما يمكن (مساحة أو حجم أو تكلفة) مكتوبًا دالةً.', 'The quantity you want to make as large or as small as possible (an area, a volume, a cost), written as a function.') },
            { term: say('Baldintza', 'Condición', 'الشرط', 'Constraint'), meaning: say('Aldagaiak lotzen dituen datua (perimetroa, bolumen finko bat), aldagai bakarra uzteko balio duena.', 'El dato que relaciona las variables (un perímetro, un volumen fijo) y permite dejar una sola.', 'المعطى الذي يربط المتغيرات (محيط أو حجم ثابت) ويسمح بإبقاء متغير واحد.', 'The data that links the variables (a perimeter, a fixed volume) and lets you keep only one.') }
        ],
        vocabulary: [
            say('azalera', 'área', 'المساحة', 'area'),
            say('perimetroa', 'perímetro', 'المحيط', 'perimeter')
        ],
        explanation: say(
            'Optimizazio-problema batek magnitude baten baliorik onena eskatzen du. Lehenik funtzio gisa idazten da; bi aldagai baditu, enuntziatuaren baldintzak bata bestearen funtzioan ematen du. Gero deribatu, zerorekin berdindu, eta $f\'\'$ deribatuarekin edo zeinuarekin egiaztatzen da eskatutako maximoa edo minimoa dela.',
            'Un problema de optimización pide el mejor valor de una magnitud. Primero se escribe como función; si tiene dos variables, la condición del enunciado da una en función de la otra. Después se deriva, se iguala a 0 y se comprueba con $f\'\'$ o con el signo que es el máximo o el mínimo que se pide.',
            'تطلب مسألة الاستمثال أفضل قيمة لمقدار. نكتبه أولًا دالةً، وإذا كان فيه متغيران أعطى شرط المسألة أحدهما بدلالة الآخر. ثم نشتق ونساوي بالصفر ونتحقق بـ $f\'\'$ أو بالإشارة من أنها العظمى أو الصغرى المطلوبة.',
            'An optimisation problem asks for the best value of a quantity. First write it as a function; if it has two variables, the condition in the statement gives one in terms of the other. Then differentiate, set it equal to 0 and check with $f\'\'$ or with the sign that it is the maximum or minimum asked for.'
        ),
        examplePrompt: say('40 m hesirekin ibai baten ondoko lur laukizuzen bat itxi nahi da, alde horretan hesirik gabe. Zer azalera maximo itxi daiteke?', 'Con 40 m de valla se cerca un terreno rectangular junto a un río, sin valla en ese lado. ¿Qué área máxima se puede cercar?', 'بسياج طوله 40 م نسيّج أرضًا مستطيلة بجانب نهر دون سياج على ذلك الجانب. ما أكبر مساحة يمكن تسييجها؟', 'With 40 m of fencing you enclose a rectangular plot next to a river, with no fence on that side. What is the greatest area you can enclose?'),
        example: same('$\\begin{aligned}&A(x)=x(40-2x)\\\\ &A\'(x)=40-4x=0\\ \\to\\ x=10\\end{aligned}$'),
        exampleAnswer: say('Aldeak 10 m eta 20 m: azalera maximoa 200 m² da.', 'Lados de 10 m y 20 m: el área máxima es de 200 m².', 'ضلعان 10 م و20 م: أكبر مساحة 200 م².', 'Sides of 10 m and 20 m: the greatest area is 200 m².')
    },
    contexts: {
        definitions: [
            { term: say('Mozkina', 'Beneficio', 'الربح', 'Profit'), meaning: say('Sarrerak ken kostuak: $B(x)=I(x)-C(x)$.', 'Ingresos menos costes: $B(x)=I(x)-C(x)$.', 'الإيرادات ناقص التكاليف: $B(x)=I(x)-C(x)$.', 'Revenue minus costs: $B(x)=I(x)-C(x)$.') }
        ],
        vocabulary: [
            say('sarrerak', 'ingresos', 'الإيرادات', 'revenue'),
            say('kostuak', 'costes', 'التكاليف', 'costs'),
            say('distantzia', 'distancia', 'المسافة', 'distance')
        ],
        explanation: say(
            'Ekonomian mozkina maximizatzen da edo kostu bat minimizatzen; geometrian, distantzia bat. $d$ distantzia baterako nahikoa da $d^2$ minimizatzea: minimoa puntu berean du, eta ez du errorik. Amaitzean, galdera ondo irakurri: «zenbat unitate?» galderak $x$ eskatzen du; «zein da mozkina?» galderak, $B(x)$.',
            'En economía se maximiza el beneficio o se minimiza un coste; en geometría, una distancia. Para una distancia $d$ basta minimizar $d^2$: tiene el mínimo en el mismo punto y no lleva raíz. Al terminar, se lee bien la pregunta: «¿cuántas unidades?» pide $x$; «¿cuál es el beneficio?» pide $B(x)$.',
            'في الاقتصاد نجعل الربح أكبر ما يمكن أو التكلفة أصغر ما يمكن، وفي الهندسة المسافة. وللمسافة $d$ يكفي جعل $d^2$ أصغر ما يمكن: لها القيمة الصغرى عند النقطة نفسها ولا جذر فيها. وفي النهاية نقرأ السؤال جيدًا: «كم وحدة؟» يطلب $x$، و«ما الربح؟» يطلب $B(x)$.',
            'In economics you maximise the profit or minimise a cost; in geometry, a distance. For a distance $d$ it is enough to minimise $d^2$: it has its minimum at the same point and no square root. At the end, read the question carefully: «how many units?» asks for $x$; «what is the profit?» asks for $B(x)$.'
        ),
        examplePrompt: say('$y=2x$ zuzeneko zein puntu dago $(5,\\,0)$ puntutik hurbilen?', '¿Qué punto de la recta $y=2x$ está más cerca de $(5,\\,0)$?', 'أي نقطة من المستقيم $y=2x$ أقرب إلى $(5,\\,0)$؟', 'Which point of the line $y=2x$ is closest to $(5,\\,0)$?'),
        example: same('$\\begin{aligned}d^2&=(x-5)^2+4x^2\\\\ &=5x^2-10x+25\\\\ 10x-10&=0\\ \\to\\ x=1\\end{aligned}$'),
        exampleAnswer: say('$(1,\\,2)$ puntua, $\\sqrt{20}$ distantziara.', 'El punto $(1,\\,2)$, a distancia $\\sqrt{20}$.', 'النقطة $(1,\\,2)$ على بعد $\\sqrt{20}$.', 'The point $(1,\\,2)$, at a distance of $\\sqrt{20}$.')
    },

    /* ---------- 5. Sketching functions ---------- */
    'polynomial-graph': {
        definitions: [
            { term: say('Adarrak', 'Ramas', 'الفروع', 'Branches'), meaning: say('Grafikoa nora doan $x\\to+\\infty$ denean eta $x\\to-\\infty$ denean: polinomio batean, maila handieneko gaiak markatzen ditu.', 'Hacia dónde va la gráfica cuando $x\\to+\\infty$ y cuando $x\\to-\\infty$: en un polinomio, las marca el término de mayor grado.', 'إلى أين يتجه الرسم عندما $x\\to+\\infty$ وعندما $x\\to-\\infty$: في الحدودية يحددها الحد ذو الدرجة الكبرى.', 'Where the graph goes as $x\\to+\\infty$ and as $x\\to-\\infty$: for a polynomial, the term of highest degree sets them.') }
        ],
        vocabulary: [
            say('ebaki-puntuak', 'cortes', 'نقاط التقاطع', 'intercepts'),
            say('maila', 'grado', 'الدرجة', 'degree'),
            say('grafikoa', 'gráfica', 'الرسم', 'graph')
        ],
        explanation: say(
            'Grafiko bat geruzaka marrazten da. Lehenik, ardatzekiko ebaki-puntuak eta adarrak. Gero, maximoak eta minimoak, $f\'$ deribatuarekin. Azkenik, kurbadura eta inflexioak, $f\'\'$ deribatuarekin. Puntu horiek markatuta, kurbak lotzen ditu, $f\'$ deribatuaren zeinuaren arabera igoz edo jaitsiz.',
            'Una gráfica se dibuja por capas. Primero, los cortes con los ejes y las ramas. Después, los máximos y mínimos, con $f\'$. Por último, la curvatura y las inflexiones, con $f\'\'$. Con esos puntos marcados, la curva los une subiendo o bajando según el signo de $f\'$.',
            'يُرسم البيان طبقةً طبقة. أولًا نقاط التقاطع مع المحورين والفروع. ثم القيم العظمى والصغرى بـ $f\'$. وأخيرًا التقعّر ونقاط الانعطاف بـ $f\'\'$. وبعد تعليم هذه النقاط يصلها المنحنى صاعدًا أو نازلًا حسب إشارة $f\'$.',
            'A graph is drawn in layers. First, the intercepts with the axes and the branches. Then, the maxima and minima, with $f\'$. Last, the concavity and the inflections, with $f\'\'$. With those points marked, the curve joins them, going up or down according to the sign of $f\'$.'
        ),
        examplePrompt: say('Aurkitu $f(x)=x^3+3x^2$ funtzioaren muturrak eta inflexio-puntua.', 'Halla los extremos y el punto de inflexión de $f(x)=x^3+3x^2$.', 'أوجد القيم القصوى ونقطة الانعطاف للدالة $f(x)=x^3+3x^2$.', 'Find the extrema and the point of inflection of $f(x)=x^3+3x^2$.'),
        example: same('$\\begin{aligned}&f\'(x)=3x^2+6x=0\\ \\to\\ x=0,\\ x=-2\\\\ &f\'\'(x)=6x+6=0\\ \\to\\ x=-1\\end{aligned}$'),
        exampleAnswer: say('Maximoa $(-2,\\,4)$, minimoa $(0,\\,0)$ eta inflexioa $(-1,\\,2)$.', 'Máximo $(-2,\\,4)$, mínimo $(0,\\,0)$ e inflexión $(-1,\\,2)$.', 'قيمة عظمى $(-2,\\,4)$، وصغرى $(0,\\,0)$، وانعطاف $(-1,\\,2)$.', 'Maximum $(-2,\\,4)$, minimum $(0,\\,0)$ and inflection $(-1,\\,2)$.')
    },
    'rational-graph': {
        definitions: [
            { term: say('Asintota zeiharra', 'Asíntota oblicua', 'المقارب المائل', 'Oblique asymptote'), meaning: say('Grafikoa hurbiltzen zaion $y=mx+n$ zuzena, $x\\to\\pm\\infty$ denean; zatiketan ateratzen da, zenbakitzaileak maila bat gehiago badu.', 'La recta $y=mx+n$ a la que se acerca la gráfica cuando $x\\to\\pm\\infty$; sale al dividir, si el numerador tiene un grado más.', 'المستقيم $y=mx+n$ الذي يقترب منه الرسم عندما $x\\to\\pm\\infty$، ويظهر بالقسمة إذا زادت درجة البسط واحدًا.', 'The line $y=mx+n$ that the graph approaches as $x\\to\\pm\\infty$; it comes out of the division, if the numerator has one degree more.') }
        ],
        vocabulary: [
            say('asintota bertikala', 'asíntota vertical', 'المقارب الرأسي', 'vertical asymptote'),
            say('izendatzailea', 'denominador', 'المقام', 'denominator')
        ],
        explanation: say(
            'Funtzio arrazional batean, izate-eremuak izendatzailearen zeroak kentzen ditu, eta han asintota bertikalak egon ohi dira. Mailek esaten dute horizontala ala zeiharra dagoen. Gero $f\'$ aztertzen da: haren zeroek muturrak ematen dituzte, eta zeinu-taulan izate-eremutik kanpoko puntuak ere sartzen dira, muturrak ez badira ere.',
            'En una función racional, el dominio quita los ceros del denominador, y allí suele haber asíntotas verticales. Los grados dicen si hay horizontal u oblicua. Después se estudia $f\'$: sus ceros dan los extremos, y en la tabla de signos entran también los puntos fuera del dominio, aunque no sean extremos.',
            'في الدالة الكسرية يحذف المجال أصفار المقام، وهناك تكون عادةً مقاربات رأسية. وتبيّن الدرجات هل يوجد مقارب أفقي أو مائل. ثم ندرس $f\'$: تعطي أصفارها القيم القصوى، وتدخل جدول الإشارات أيضًا النقاط الواقعة خارج المجال وإن لم تكن قيمًا قصوى.',
            'For a rational function, the domain removes the zeros of the denominator, and there you usually find vertical asymptotes. The degrees tell whether there is a horizontal or an oblique one. Then study $f\'$: its zeros give the extrema, and the sign chart also takes in the points outside the domain, even though they are not extrema.'
        ),
        examplePrompt: say('Aurkitu $f(x)=\\frac{x^2+9}{x}$ funtzioaren asintotak eta muturrak.', 'Halla las asíntotas y los extremos de $f(x)=\\frac{x^2+9}{x}$.', 'أوجد مقاربات $f(x)=\\frac{x^2+9}{x}$ وقيمها القصوى.', 'Find the asymptotes and the extrema of $f(x)=\\frac{x^2+9}{x}$.'),
        example: same('$\\begin{aligned}&f(x)=x+\\frac{9}{x}\\\\ &f\'(x)=1-\\frac{9}{x^2}=0\\ \\to\\ x=\\pm 3\\end{aligned}$'),
        exampleAnswer: say('Asintotak: $x=0$ eta $y=x$; maximoa $(-3,\\,-6)$ eta minimoa $(3,\\,6)$.', 'Asíntotas $x=0$ e $y=x$; máximo $(-3,\\,-6)$ y mínimo $(3,\\,6)$.', 'المقاربان $x=0$ و$y=x$، وقيمة عظمى $(-3,\\,-6)$ وصغرى $(3,\\,6)$.', 'Asymptotes $x=0$ and $y=x$; maximum $(-3,\\,-6)$ and minimum $(3,\\,6)$.')
    },
    'exp-log-graph': {
        definitions: [
            { term: say('Asintota horizontala', 'Asíntota horizontal', 'المقارب الأفقي', 'Horizontal asymptote'), meaning: say('Grafikoa hurbiltzen zaion $y=k$ zuzena, $x\\to+\\infty$ edo $x\\to-\\infty$ denean; alde batetik bakarrik izan daiteke.', 'La recta $y=k$ a la que se acerca la gráfica cuando $x\\to+\\infty$ o $x\\to-\\infty$; puede ser solo por un lado.', 'المستقيم $y=k$ الذي يقترب منه الرسم عندما $x\\to+\\infty$ أو $x\\to-\\infty$، وقد يكون من جهة واحدة فقط.', 'The line $y=k$ that the graph approaches as $x\\to+\\infty$ or $x\\to-\\infty$; it may be on one side only.') }
        ],
        vocabulary: [
            say('esponentziala', 'exponencial', 'الأسية', 'exponential'),
            say('logaritmoa', 'logaritmo', 'اللوغاريتم', 'logarithm'),
            say('izate-eremua', 'dominio', 'المجال', 'domain')
        ],
        explanation: say(
            '$e^x$ eta $\\ln x$ funtzioekin urrats berak egiten dira, bi oharrekin. Logaritmoa argumentua positiboa denean bakarrik existitzen da: $\\ln x$ funtzioaren izate-eremua $x>0$ da. Eta $e^x$ beti da positiboa eta ez da inoiz anulatzen; beraz, $f\'=(\\ldots)\\,e^x$ deribatuan parentesiak ematen du zeinua.',
            'Con $e^x$ y $\\ln x$ se siguen los mismos pasos, con dos avisos. El logaritmo solo existe si su argumento es positivo: el dominio de $\\ln x$ es $x>0$. Y $e^x$ es siempre positiva y nunca se anula, así que en $f\'=(\\ldots)\\,e^x$ el signo lo da el paréntesis.',
            'مع $e^x$ و$\\ln x$ نتبع الخطوات نفسها مع تنبيهين. لا يوجد اللوغاريتم إلا إذا كان ما داخله موجبًا: مجال $\\ln x$ هو $x>0$. و$e^x$ موجبة دائمًا ولا تنعدم أبدًا، لذا في $f\'=(\\ldots)\\,e^x$ يحدد ما بين القوسين الإشارة.',
            'With $e^x$ and $\\ln x$ you follow the same steps, with two warnings. The logarithm only exists if its argument is positive: the domain of $\\ln x$ is $x>0$. And $e^x$ is always positive and never zero, so in $f\'=(\\ldots)\\,e^x$ the bracket gives the sign.'
        ),
        examplePrompt: say('Aztertu $f(x)=x-\\ln x$ funtzioaren izate-eremua eta muturra.', 'Estudia el dominio y el extremo de $f(x)=x-\\ln x$.', 'ادرس مجال $f(x)=x-\\ln x$ وقيمتها القصوى.', 'Study the domain and the extremum of $f(x)=x-\\ln x$.'),
        example: same('$f\'(x)=1-\\frac{1}{x}=0\\ \\to\\ x=1\\qquad f(1)=1$'),
        exampleAnswer: say('Izate-eremua $x>0$ da, $x=0$ asintota bertikalarekin. Minimoa $(1,\\,1)$ puntuan: $f\'$ deribatua $-$ zeinutik $+$ zeinura pasatzen da.', 'Dominio $x>0$, con asíntota vertical $x=0$. Mínimo en $(1,\\,1)$: $f\'$ pasa de $-$ a $+$.', 'المجال $x>0$ مع مقارب رأسي $x=0$. قيمة صغرى عند $(1,\\,1)$: تنتقل $f\'$ من $-$ إلى $+$.', 'Domain $x>0$, with a vertical asymptote $x=0$. A minimum at $(1,\\,1)$: $f\'$ goes from $-$ to $+$.')
    }
}

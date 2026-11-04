import type { LessonTexts, LocalizedText } from '../../features/unit-v2/types.ts'
import type { EquationsTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Ekuazioak eta inekuazioak · 4. DBH akademikoak — what each lesson tells:
   the new words (definitions), a short explanation, its cases, the example
   as an exercise («Another example»), the key words in four languages and,
   in three lessons, «Why does it work?». Plain data so the tests can import
   it; lessons.tsx merges it into the topics. Every x = … that an example
   gives must solve its equation (tests/lesson-texts.test.ts checks it), so
   a value that does not work is written without «x =».
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const equationsLessonTexts: Record<EquationsTopicId, LessonTexts> = {
    /* ---------- 1. Quadratic equations ---------- */
    'quadratic-formula': {
        definitions: [
            {
                term: say('Diskriminatzailea', 'Discriminante', 'المميّز', 'Discriminant'),
                meaning: say('$\\Delta=b^{2}-4ac$, formulako erroaren barruan dagoena.', '$\\Delta=b^{2}-4ac$, lo que va dentro de la raíz de la fórmula.', '$\\Delta=b^{2}-4ac$، ما يوجد تحت الجذر في الصيغة.', '$\\Delta=b^{2}-4ac$, what goes under the root in the formula.')
            }
        ],
        vocabulary: [
            say('ebazpen bikoitza', 'solución doble', 'حل مضاعف', 'double solution'),
            say('osatugabea', 'incompleta', 'ناقصة', 'incomplete')
        ],
        explanation: say(
            '$ax^{2}+bx+c=0$ ekuazioaren ebazpenak $x=\\frac{-b\\pm\\sqrt{b^{2}-4ac}}{2a}$ dira; $x^{2}-7x+6=0$ ekuazioan 6 eta 1 ateratzen dira. Ekuazio osatugabeak errazago ebazten dira: $b=0$ bada, askatu $x^{2}$; $c=0$ bada, atera $x$ faktore komun gisa.',
            'Las soluciones de $ax^{2}+bx+c=0$ son $x=\\frac{-b\\pm\\sqrt{b^{2}-4ac}}{2a}$; con $x^{2}-7x+6=0$ salen 6 y 1. Las ecuaciones incompletas se resuelven más fácil: si $b=0$, despeja $x^{2}$; si $c=0$, saca $x$ factor común.',
            'حلول $ax^{2}+bx+c=0$ هي $x=\\frac{-b\\pm\\sqrt{b^{2}-4ac}}{2a}$؛ ومع $x^{2}-7x+6=0$ نحصل على 6 و1. والمعادلات الناقصة أسهل: إذا كان $b=0$ فاعزل $x^{2}$، وإذا كان $c=0$ فأخرج $x$ عاملًا مشتركًا.',
            'The solutions of $ax^{2}+bx+c=0$ are $x=\\frac{-b\\pm\\sqrt{b^{2}-4ac}}{2a}$; for $x^{2}-7x+6=0$ they come out as 6 and 1. Incomplete equations are easier: if $b=0$, solve for $x^{2}$; if $c=0$, take out $x$ as a common factor.'
        ),
        cases: [
            { title: say('Positiboa', 'Positivo', 'موجب', 'Positive'), text: say('Bi ebazpen desberdin.', 'Dos soluciones distintas.', 'حلان مختلفان.', 'Two different solutions.'), math: same('$\\Delta>0$') },
            { title: say('Zero', 'Cero', 'صفر', 'Zero'), text: say('Ebazpen bikoitz bat.', 'Una solución doble.', 'حل مضاعف واحد.', 'One double solution.'), math: same('$\\Delta=0$') },
            { title: say('Negatiboa', 'Negativo', 'سالب', 'Negative'), text: say('Ez dago ebazpen errealik.', 'Ninguna solución real.', 'لا يوجد حل حقيقي.', 'No real solution.'), math: same('$\\Delta<0$') }
        ],
        examplePrompt: say('Ebatzi $2x^{2}+x-15=0$.', 'Resuelve $2x^{2}+x-15=0$.', 'حلّ $2x^{2}+x-15=0$.', 'Solve $2x^{2}+x-15=0$.'),
        example: same('$\\begin{gathered}\\Delta=1+120=121\\\\ x=\\frac{-1\\pm 11}{4}\\ \\to\\ x=\\frac{5}{2},\\ x=-3\\end{gathered}$'),
        exampleAnswer: say('$\\frac{5}{2}$ eta $-3$: bi ebazpen, $\\Delta>0$ delako.', '$\\frac{5}{2}$ y $-3$: dos soluciones, porque $\\Delta>0$.', '$\\frac{5}{2}$ و$-3$: حلان لأن $\\Delta>0$.', '$\\frac{5}{2}$ and $-3$: two solutions, because $\\Delta>0$.')
    },
    'roots-relations': {
        vocabulary: [
            say('batura', 'suma', 'مجموع', 'sum'),
            say('biderkadura', 'producto', 'جداء', 'product')
        ],
        explanation: say(
            '$x_1$ eta $x_2$ $ax^{2}+bx+c=0$ ekuazioaren erroak badira, $x_1+x_2=-\\frac{b}{a}$ eta $x_1\\cdot x_2=\\frac{c}{a}$. $x^{2}-7x+10=0$ ekuazioan, 2 eta 5 erroen batura 7 da eta biderkadura 10. Alderantziz, $S$ batura eta $P$ biderkadura dituzten erroen ekuazioa $x^{2}-Sx+P=0$ da.',
            'Si $x_1$ y $x_2$ son las raíces de $ax^{2}+bx+c=0$, entonces $x_1+x_2=-\\frac{b}{a}$ y $x_1\\cdot x_2=\\frac{c}{a}$. En $x^{2}-7x+10=0$, las raíces 2 y 5 suman 7 y su producto es 10. Al revés, la ecuación cuyas raíces tienen suma $S$ y producto $P$ es $x^{2}-Sx+P=0$.',
            'إذا كان $x_1$ و$x_2$ جذري $ax^{2}+bx+c=0$ فإن $x_1+x_2=-\\frac{b}{a}$ و$x_1\\cdot x_2=\\frac{c}{a}$. في $x^{2}-7x+10=0$ مجموع الجذرين 2 و5 هو 7 وجداؤهما 10. وبالعكس، المعادلة التي مجموع جذريها $S$ وجداؤهما $P$ هي $x^{2}-Sx+P=0$.',
            'If $x_1$ and $x_2$ are the roots of $ax^{2}+bx+c=0$, then $x_1+x_2=-\\frac{b}{a}$ and $x_1\\cdot x_2=\\frac{c}{a}$. In $x^{2}-7x+10=0$, the roots 2 and 5 add up to 7 and their product is 10. Conversely, the equation whose roots have sum $S$ and product $P$ is $x^{2}-Sx+P=0$.'
        ),
        examplePrompt: say('Idatzi erroak 4 eta $-6$ dituen bigarren mailako ekuazioa.', 'Escribe la ecuación de segundo grado cuyas raíces son 4 y $-6$.', 'اكتب معادلة الدرجة الثانية التي جذراها 4 و$-6$.', 'Write the quadratic equation whose roots are 4 and $-6$.'),
        example: same('$\\begin{gathered}S=4-6=-2\\qquad P=4\\cdot(-6)=-24\\\\ x^{2}+2x-24=0\\end{gathered}$'),
        exampleAnswer: say('Egiaztatu $x=4$ denean: $16+8-24=0$.', 'Comprueba con $x=4$: $16+8-24=0$.', 'تحقّق عندما $x=4$: $16+8-24=0$.', 'Check with $x=4$: $16+8-24=0$.'),
        why: {
            text: say(
                'Erroak $x_1$ eta $x_2$ badira, polinomioa $a(x-x_1)(x-x_2)=ax^{2}-a(x_1+x_2)x+a\\,x_1x_2$ da. $ax^{2}+bx+c$ polinomioarekin alderatuz: $b=-a(x_1+x_2)$ eta $c=a\\,x_1x_2$. Askatu, eta bi formulak ateratzen dira.',
                'Si las raíces son $x_1$ y $x_2$, el polinomio es $a(x-x_1)(x-x_2)=ax^{2}-a(x_1+x_2)x+a\\,x_1x_2$. Comparando con $ax^{2}+bx+c$: $b=-a(x_1+x_2)$ y $c=a\\,x_1x_2$. Despeja y salen las dos fórmulas.',
                'إذا كان الجذران $x_1$ و$x_2$ فإن كثير الحدود هو $a(x-x_1)(x-x_2)=ax^{2}-a(x_1+x_2)x+a\\,x_1x_2$. وبالمقارنة مع $ax^{2}+bx+c$: $b=-a(x_1+x_2)$ و$c=a\\,x_1x_2$. اعزل فتظهر الصيغتان.',
                'If the roots are $x_1$ and $x_2$, the polynomial is $a(x-x_1)(x-x_2)=ax^{2}-a(x_1+x_2)x+a\\,x_1x_2$. Comparing with $ax^{2}+bx+c$: $b=-a(x_1+x_2)$ and $c=a\\,x_1x_2$. Solve and both formulas come out.'
            )
        }
    },
    'quadratic-problems': {
        vocabulary: [
            say('ezezaguna', 'incógnita', 'المجهول', 'unknown'),
            say('egiaztatu', 'comprobar', 'تحقّق', 'check')
        ],
        explanation: say(
            'Urratsak beti berberak dira: ezezaguna izendatu, ekuazioa idatzi, ebatzi eta egiaztatu. Bigarren mailako ekuazio batek bi ebazpen eman ditzake, eta batzuetan bat ez da baliozkoa: luzera negatibo batek ez du zentzurik. Triangelu angeluzuzen baten aldeak $x$, $x+3$ eta $x+6$ badira, Pitagorasek $x^{2}-6x-27=0$ ematen du: $x=9$, eta $-3$ ez da baliozkoa.',
            'Los pasos son siempre los mismos: nombrar la incógnita, escribir la ecuación, resolverla y comprobar. Una ecuación de segundo grado puede dar dos soluciones, y a veces una no vale: una longitud negativa no tiene sentido. Si los lados de un triángulo rectángulo miden $x$, $x+3$ y $x+6$, Pitágoras da $x^{2}-6x-27=0$: $x=9$, y $-3$ no vale.',
            'الخطوات هي نفسها دائمًا: سمِّ المجهول، واكتب المعادلة، وحلّها، وتحقّق. قد تعطي معادلة الدرجة الثانية حلين، وأحيانًا لا يصلح أحدهما: فالطول السالب لا معنى له. إذا كانت أضلاع مثلث قائم $x$ و$x+3$ و$x+6$ فإن فيثاغورس يعطي $x^{2}-6x-27=0$: $x=9$، و$-3$ لا يصلح.',
            'The steps are always the same: name the unknown, write the equation, solve it and check. A quadratic equation can give two solutions, and sometimes one does not work: a negative length makes no sense. If the sides of a right-angled triangle are $x$, $x+3$ and $x+6$, Pythagoras gives $x^{2}-6x-27=0$: $x=9$, and $-3$ does not work.'
        ),
        examplePrompt: say('Bi zenbaki arrunt jarraituren biderkadura 132 da. Zein dira?', 'El producto de dos números naturales consecutivos es 132. ¿Cuáles son?', 'جداء عددين طبيعيين متتاليين 132. ما هما؟', 'The product of two consecutive natural numbers is 132. What are they?'),
        example: same('$x(x+1)=132\\ \\to\\ x^{2}+x-132=0\\ \\to\\ x=11$'),
        exampleAnswer: say('11 eta 12; $-12$ ez da zenbaki arrunta.', '11 y 12; $-12$ no es natural.', '11 و12؛ و$-12$ ليس عددًا طبيعيًا.', '11 and 12; $-12$ is not a natural number.')
    },

    /* ---------- 2. Other polynomial equations ---------- */
    biquadratic: {
        definitions: [
            {
                term: say('Ekuazio bikarratua', 'Ecuación bicuadrada', 'معادلة ثنائية التربيع', 'Biquadratic equation'),
                meaning: say('4 mailako ekuazioa, $x$ 4 eta 2 berretzaileekin bakarrik duena: $ax^{4}+bx^{2}+c=0$.', 'Una ecuación de grado 4 en la que $x$ solo tiene los exponentes 4 y 2: $ax^{4}+bx^{2}+c=0$.', 'معادلة من الدرجة 4 لا يظهر فيها $x$ إلا بالأسين 4 و2: $ax^{4}+bx^{2}+c=0$.', 'An equation of degree 4 in which $x$ only has the exponents 4 and 2: $ax^{4}+bx^{2}+c=0$.')
            }
        ],
        vocabulary: [
            say('aldaketa', 'cambio', 'التعويض', 'substitution'),
            say('negatiboa', 'negativo', 'سالب', 'negative')
        ],
        explanation: say(
            '$t=x^{2}$ aldaketarekin bigarren mailako ekuazio bihurtzen da: $x^{4}-10x^{2}+9=0$ ekuazioa $t^{2}-10t+9=0$ da, $t=9$ eta $t=1$ ebazpenekin; beraz, $x=\\pm 3$ eta $x=\\pm 1$. $t$ positibo bakoitzak bi ebazpen ematen ditu; $t$ negatibo batek, bat ere ez, $x^{2}$ ezin delako negatiboa izan.',
            'Con el cambio $t=x^{2}$ se convierte en una de segundo grado: $x^{4}-10x^{2}+9=0$ queda $t^{2}-10t+9=0$, con $t=9$ y $t=1$, así que $x=\\pm 3$ y $x=\\pm 1$. Cada $t$ positivo da dos soluciones; un $t$ negativo no da ninguna, porque $x^{2}$ no puede ser negativo.',
            'بالتعويض $t=x^{2}$ تصبح معادلة من الدرجة الثانية: $x^{4}-10x^{2}+9=0$ تصير $t^{2}-10t+9=0$، فيها $t=9$ و$t=1$، إذن $x=\\pm 3$ و$x=\\pm 1$. كل $t$ موجب يعطي حلين، و$t$ السالب لا يعطي شيئًا لأن $x^{2}$ لا يكون سالبًا.',
            'The substitution $t=x^{2}$ turns it into a quadratic: $x^{4}-10x^{2}+9=0$ becomes $t^{2}-10t+9=0$, with $t=9$ and $t=1$, so $x=\\pm 3$ and $x=\\pm 1$. Each positive $t$ gives two solutions; a negative $t$ gives none, because $x^{2}$ cannot be negative.'
        ),
        examplePrompt: say('Ebatzi $x^{4}-3x^{2}-4=0$.', 'Resuelve $x^{4}-3x^{2}-4=0$.', 'حلّ $x^{4}-3x^{2}-4=0$.', 'Solve $x^{4}-3x^{2}-4=0$.'),
        example: same('$\\begin{gathered}t^{2}-3t-4=0\\ \\to\\ t=4,\\ t=-1\\\\ x=\\pm 2\\end{gathered}$'),
        exampleAnswer: say('$x=\\pm 2$ bakarrik: $t=-1$ balioak ez du ebazpen errealik ematen.', 'Solo $x=\\pm 2$: $t=-1$ no da soluciones reales.', 'فقط $x=\\pm 2$: القيمة $t=-1$ لا تعطي حلولًا حقيقية.', 'Only $x=\\pm 2$: $t=-1$ gives no real solutions.')
    },
    factored: {
        vocabulary: [
            say('faktorea', 'factor', 'العامل', 'factor'),
            say('biderkadura', 'producto', 'الجداء', 'product')
        ],
        explanation: say(
            'Biderkadura bat 0 da faktoreren bat 0 bada. $P(x)=0$ ebazteko, faktorizatu $P$ eta berdindu faktore bakoitza 0: $(x+1)(x^{2}-4)=0$ ekuazioan, $x=-1$, $x=2$ eta $x=-2$. Faktorizatzeko: faktore komuna, identitateak eta Ruffini. Ez zatitu inoiz bi atalak $x$ letraz: $x=0$ ebazpena galduko zenuke.',
            'Un producto es 0 si algún factor es 0. Para resolver $P(x)=0$, factoriza $P$ e iguala a 0 cada factor: en $(x+1)(x^{2}-4)=0$, $x=-1$, $x=2$ y $x=-2$. Para factorizar: factor común, identidades y Ruffini. Nunca dividas los dos miembros entre $x$: perderías la solución $x=0$.',
            'يكون الجداء صفرًا إذا كان أحد عوامله صفرًا. لحل $P(x)=0$ حلّل $P$ واجعل كل عامل يساوي 0: في $(x+1)(x^{2}-4)=0$ نجد $x=-1$ و$x=2$ و$x=-2$. وللتحليل: العامل المشترك والمتطابقات وروفيني. لا تقسم الطرفين على $x$ أبدًا: ستفقد الحل $x=0$.',
            'A product is 0 if one of its factors is 0. To solve $P(x)=0$, factorise $P$ and set each factor equal to 0: in $(x+1)(x^{2}-4)=0$, $x=-1$, $x=2$ and $x=-2$. To factorise: common factor, identities and Ruffini. Never divide both sides by $x$: you would lose the solution $x=0$.'
        ),
        examplePrompt: say('Ebatzi $x^{3}-2x^{2}-3x=0$.', 'Resuelve $x^{3}-2x^{2}-3x=0$.', 'حلّ $x^{3}-2x^{2}-3x=0$.', 'Solve $x^{3}-2x^{2}-3x=0$.'),
        example: same('$x(x-3)(x+1)=0\\ \\to\\ x=0,\\ x=3,\\ x=-1$'),
        exampleAnswer: say('Hiru ebazpen; $x=0$ faktore komunetik dator.', 'Tres soluciones; la $x=0$ sale del factor común.', 'ثلاثة حلول؛ والحل $x=0$ يأتي من العامل المشترك.', 'Three solutions; $x=0$ comes from the common factor.')
    },
    rational: {
        vocabulary: [
            say('izendatzailea', 'denominador', 'المقام', 'denominator'),
            say('egiaztatu', 'comprueba', 'تحقّق', 'check')
        ],
        explanation: say(
            'Izendatzaileak kentzeko, biderkatu bi atalak haien m.k.t.-az. Amaieran, egiaztatu ebazpenak hasierako ekuazioan: izendatzaile bat anulatzen dutenak ez dira baliozkoak. $\\frac{x}{x-2}+\\frac{2}{x}=\\frac{4}{x(x-2)}$ ekuazioan 2 eta $-4$ ateratzen dira, baina 2 balioarekin $x-2$ anulatzen da: $-4$ bakarrik da baliozkoa.',
            'Para quitar los denominadores, multiplica los dos miembros por su m.c.m. Al final, comprueba las soluciones en la ecuación inicial: las que anulan un denominador no valen. En $\\frac{x}{x-2}+\\frac{2}{x}=\\frac{4}{x(x-2)}$ salen 2 y $-4$, pero con 2 se anula $x-2$: solo vale $-4$.',
            'لإزالة المقامات اضرب الطرفين في م.م.أ لها. وفي النهاية تحقّق من الحلول في المعادلة الأصلية: ما يجعل مقامًا صفرًا لا يصلح. في $\\frac{x}{x-2}+\\frac{2}{x}=\\frac{4}{x(x-2)}$ نحصل على 2 و$-4$، لكن مع 2 يصير $x-2$ صفرًا: فلا يصلح إلا $-4$.',
            'To clear the denominators, multiply both sides by their LCM. At the end, check the solutions in the original equation: those that make a denominator zero do not work. In $\\frac{x}{x-2}+\\frac{2}{x}=\\frac{4}{x(x-2)}$ you get 2 and $-4$, but 2 makes $x-2$ zero: only $-4$ works.'
        ),
        examplePrompt: say('Ebatzi $\\frac{x+3}{x}=\\frac{4}{x-1}$.', 'Resuelve $\\frac{x+3}{x}=\\frac{4}{x-1}$.', 'حلّ $\\frac{x+3}{x}=\\frac{4}{x-1}$.', 'Solve $\\frac{x+3}{x}=\\frac{4}{x-1}$.'),
        example: same('$\\begin{gathered}(x+3)(x-1)=4x\\\\ x^{2}-2x-3=0\\ \\to\\ x=3,\\ x=-1\\end{gathered}$'),
        exampleAnswer: say('Biak dira baliozkoak: batek ere ez ditu $x$ eta $x-1$ anulatzen.', 'Las dos valen: ninguna anula $x$ ni $x-1$.', 'كلاهما يصلح: لا يجعل أيٌّ منهما $x$ أو $x-1$ صفرًا.', 'Both work: neither makes $x$ or $x-1$ zero.')
    },

    /* ---------- 3. Radical, exponential and logarithmic equations ---------- */
    radical: {
        vocabulary: [
            say('erroa', 'raíz', 'الجذر', 'root'),
            say('ebazpen faltsua', 'solución falsa', 'حل زائف', 'false solution')
        ],
        explanation: say(
            'Bakartu erroa atal batean eta jaso bi atalak karratura. Karratura jasotzean ebazpen faltsuak ager daitezke ($3\\neq -3$, baina $9=9$), beraz beti egiaztatu behar dira. $\\sqrt{x+2}=x$ ekuazioan, $x+2=x^{2}$, eta 2 eta $-1$ ateratzen dira; baina $\\sqrt{1}\\neq -1$, beraz 2 bakarrik da baliozkoa. Kontuz: $(a+b)^{2}$ ez da $a^{2}+b^{2}$.',
            'Aísla la raíz en un miembro y eleva los dos miembros al cuadrado. Al elevar al cuadrado pueden aparecer soluciones falsas ($3\\neq -3$, pero $9=9$), así que hay que comprobarlas siempre. En $\\sqrt{x+2}=x$, $x+2=x^{2}$, que da 2 y $-1$; pero $\\sqrt{1}\\neq -1$, así que solo vale 2. Cuidado: $(a+b)^{2}$ no es $a^{2}+b^{2}$.',
            'اعزل الجذر في طرف وربّع الطرفين. عند التربيع قد تظهر حلول زائفة ($3\\neq -3$ لكن $9=9$)، لذلك يجب التحقق منها دائمًا. في $\\sqrt{x+2}=x$ نجد $x+2=x^{2}$، فنحصل على 2 و$-1$؛ لكن $\\sqrt{1}\\neq -1$، فلا يصلح إلا 2. انتبه: $(a+b)^{2}$ لا يساوي $a^{2}+b^{2}$.',
            'Isolate the root on one side and square both sides. Squaring can bring in false solutions ($3\\neq -3$, but $9=9$), so they must always be checked. In $\\sqrt{x+2}=x$, $x+2=x^{2}$, which gives 2 and $-1$; but $\\sqrt{1}\\neq -1$, so only 2 works. Careful: $(a+b)^{2}$ is not $a^{2}+b^{2}$.'
        ),
        examplePrompt: say('Ebatzi $\\sqrt{2x+7}=x+2$.', 'Resuelve $\\sqrt{2x+7}=x+2$.', 'حلّ $\\sqrt{2x+7}=x+2$.', 'Solve $\\sqrt{2x+7}=x+2$.'),
        example: same('$\\begin{gathered}2x+7=x^{2}+4x+4\\\\ x^{2}+2x-3=0\\end{gathered}$'),
        exampleAnswer: say('1 eta $-3$ ateratzen dira; $x=1$ bakarrik da baliozkoa, $\\sqrt{1}\\neq -1$ delako.', 'Salen 1 y $-3$; solo vale $x=1$, porque $\\sqrt{1}\\neq -1$.', 'نحصل على 1 و$-3$؛ ولا يصلح إلا $x=1$ لأن $\\sqrt{1}\\neq -1$.', 'You get 1 and $-3$; only $x=1$ works, because $\\sqrt{1}\\neq -1$.'),
        why: {
            text: say(
                'Karratura jasotzeak ez ditu zeinuak bereizten: $a=b$ bada, $a^{2}=b^{2}$; baina $a^{2}=b^{2}$ bada, $a=-b$ ere izan daiteke. $\\sqrt{x+2}=x$ ekuazioan, $-1$ balioak karraturako ekuazioa betetzen du, $1=1$, baina ez hasierakoa: $1\\neq -1$.',
                'Elevar al cuadrado no distingue los signos: si $a=b$, entonces $a^{2}=b^{2}$; pero si $a^{2}=b^{2}$, también puede ser $a=-b$. En $\\sqrt{x+2}=x$, el valor $-1$ cumple la ecuación al cuadrado, $1=1$, pero no la de partida: $1\\neq -1$.',
                'التربيع لا يميّز الإشارات: إذا كان $a=b$ فإن $a^{2}=b^{2}$؛ لكن إذا كان $a^{2}=b^{2}$ فقد يكون $a=-b$. في $\\sqrt{x+2}=x$ تحقق القيمة $-1$ المعادلة بعد التربيع، $1=1$، ولا تحقق المعادلة الأصلية: $1\\neq -1$.',
                'Squaring does not tell signs apart: if $a=b$, then $a^{2}=b^{2}$; but if $a^{2}=b^{2}$, it may also be that $a=-b$. In $\\sqrt{x+2}=x$, the value $-1$ satisfies the squared equation, $1=1$, but not the original one: $1\\neq -1$.'
            )
        }
    },
    exponential: {
        vocabulary: [
            say('oinarria', 'base', 'الأساس', 'base'),
            say('berretzailea', 'exponente', 'الأس', 'exponent')
        ],
        explanation: say(
            'Bi atalak oinarri bereko berretura gisa idatz badaitezke, berretzaileak berdintzen dira: $2^{x+1}=\\frac{1}{8}=2^{-3}$, beraz $x+1=-3$ eta $x=-4$. Berreturak batzen badira, atera faktore komuna: $2^{x}+2^{x+3}=9\\cdot 2^{x}=36$, $2^{x}=4$, $x=2$. Oinarri komunik ez badago, hartu logaritmoak.',
            'Si los dos miembros se pueden escribir como potencias de la misma base, se igualan los exponentes: $2^{x+1}=\\frac{1}{8}=2^{-3}$, así que $x+1=-3$ y $x=-4$. Si se suman potencias, saca factor común: $2^{x}+2^{x+3}=9\\cdot 2^{x}=36$, $2^{x}=4$, $x=2$. Si no hay base común, toma logaritmos.',
            'إذا أمكن كتابة الطرفين قوتين للأساس نفسه نساوي الأسين: $2^{x+1}=\\frac{1}{8}=2^{-3}$، إذن $x+1=-3$ و$x=-4$. وإذا جُمعت قوى فأخرج العامل المشترك: $2^{x}+2^{x+3}=9\\cdot 2^{x}=36$، $2^{x}=4$، $x=2$. وإذا لم يوجد أساس مشترك فخذ اللوغاريتمات.',
            'If both sides can be written as powers of the same base, set the exponents equal: $2^{x+1}=\\frac{1}{8}=2^{-3}$, so $x+1=-3$ and $x=-4$. If powers are added, take out a common factor: $2^{x}+2^{x+3}=9\\cdot 2^{x}=36$, $2^{x}=4$, $x=2$. If there is no common base, take logarithms.'
        ),
        examplePrompt: say('Ebatzi $3^{x^{2}-x}=9$.', 'Resuelve $3^{x^{2}-x}=9$.', 'حلّ $3^{x^{2}-x}=9$.', 'Solve $3^{x^{2}-x}=9$.'),
        example: same('$\\begin{gathered}3^{x^{2}-x}=3^{2}\\ \\to\\ x^{2}-x-2=0\\\\ x=2,\\ x=-1\\end{gathered}$'),
        exampleAnswer: say('Biak dira baliozkoak: bi kasuetan berretzailea 2 da.', 'Las dos valen: en los dos casos el exponente es 2.', 'كلاهما يصلح: الأس في الحالتين 2.', 'Both work: in both cases the exponent is 2.')
    },
    logarithmic: {
        vocabulary: [
            say('logaritmoa', 'logaritmo', 'اللوغاريتم', 'logarithm'),
            say('definizioa', 'definición', 'التعريف', 'definition')
        ],
        explanation: say(
            'Logaritmo bakarra badago, erabili definizioa: $\\log_a A=k$ bada, $A=a^{k}$; horrela, $\\log_2(2x-1)=3$ ekuazioak $2x-1=8$ ematen du. Logaritmo bat baino gehiago badaude, propietateekin utzi logaritmo bakarra atal bakoitzean eta berdindu argumentuak. Beti egiaztatu: logaritmo baten argumentuak positiboa izan behar du.',
            'Si hay un solo logaritmo, usa la definición: si $\\log_a A=k$, entonces $A=a^{k}$; así, $\\log_2(2x-1)=3$ da $2x-1=8$. Si hay varios, con las propiedades deja un solo logaritmo en cada miembro e iguala los argumentos. Comprueba siempre: el argumento de un logaritmo tiene que ser positivo.',
            'إذا كان هناك لوغاريتم واحد فاستعمل التعريف: إذا كان $\\log_a A=k$ فإن $A=a^{k}$؛ وهكذا $\\log_2(2x-1)=3$ تعطي $2x-1=8$. وإذا كانت عدة لوغاريتمات فاترك بالخصائص لوغاريتمًا واحدًا في كل طرف وساوِ ما بداخلهما. وتحقّق دائمًا: ما داخل اللوغاريتم يجب أن يكون موجبًا.',
            'If there is only one logarithm, use the definition: if $\\log_a A=k$, then $A=a^{k}$; so $\\log_2(2x-1)=3$ gives $2x-1=8$. If there are several, use the properties to leave one logarithm on each side and set the arguments equal. Always check: the argument of a logarithm must be positive.'
        ),
        examplePrompt: say('Ebatzi $\\log x+\\log(x+3)=1$.', 'Resuelve $\\log x+\\log(x+3)=1$.', 'حلّ $\\log x+\\log(x+3)=1$.', 'Solve $\\log x+\\log(x+3)=1$.'),
        example: same('$\\begin{gathered}\\log[x(x+3)]=\\log 10\\\\ x^{2}+3x-10=0\\end{gathered}$'),
        exampleAnswer: say('2 eta $-5$ ateratzen dira; $x=2$ bakarrik da baliozkoa: $-5$ balioarekin argumentua negatiboa da.', 'Salen 2 y $-5$; solo vale $x=2$: con $-5$ el argumento es negativo.', 'نحصل على 2 و$-5$؛ ولا يصلح إلا $x=2$: مع $-5$ يكون ما داخل اللوغاريتم سالبًا.', 'You get 2 and $-5$; only $x=2$ works: with $-5$ the argument is negative.')
    },

    /* ---------- 4. First-degree inequalities ---------- */
    inequalities: {
        definitions: [
            {
                term: say('Inekuazioa', 'Inecuación', 'المتباينة', 'Inequality'),
                meaning: say('Ezezagun bat duen desberdintza bat ($<$, $>$, $\\le$, $\\ge$).', 'Una desigualdad ($<$, $>$, $\\le$, $\\ge$) con una incógnita.', 'متباينة ($<$، $>$، $\\le$، $\\ge$) فيها مجهول.', 'An inequality ($<$, $>$, $\\le$, $\\ge$) with one unknown.')
            }
        ],
        vocabulary: [
            say('tartea', 'intervalo', 'المجال', 'interval'),
            say('muturra', 'extremo', 'الطرف', 'endpoint')
        ],
        explanation: say(
            'Haren ebazpenak desberdintza egia egiten duten zenbakiak dira, eta normalean infinitu dira: tarteekin idazten dira. $x\\ge -2$ da $[-2,+\\infty)$; $x<4$ da $(-\\infty,4)$; $-1\\le x<3$ da $[-1,3)$. Kortxeteak muturra sartzen dela esan nahi du (puntu betea), eta parentesiak, ez dela sartzen (puntu hutsa).',
            'Sus soluciones son los números que hacen cierta la desigualdad, y suelen ser infinitas: se escriben con intervalos. $x\\ge -2$ es $[-2,+\\infty)$; $x<4$ es $(-\\infty,4)$; $-1\\le x<3$ es $[-1,3)$. El corchete indica que el extremo entra (punto lleno), y el paréntesis, que no entra (punto hueco).',
            'حلولها هي الأعداد التي تجعل المتباينة صحيحة، وغالبًا تكون لا نهائية: تُكتب بالمجالات. $x\\ge -2$ هو $[-2,+\\infty)$؛ و$x<4$ هو $(-\\infty,4)$؛ و$-1\\le x<3$ هو $[-1,3)$. القوس المعقوف يعني أن الطرف داخل (نقطة ممتلئة)، والقوس العادي أنه غير داخل (نقطة فارغة).',
            'Its solutions are the numbers that make the inequality true, and there are usually infinitely many: they are written as intervals. $x\\ge -2$ is $[-2,+\\infty)$; $x<4$ is $(-\\infty,4)$; $-1\\le x<3$ is $[-1,3)$. A square bracket means the endpoint is in (filled dot), and a round bracket that it is not (open dot).'
        ),
        examplePrompt: say('$-1$, 1 eta 3 zenbakietatik, zein dira $x^{2}-2x<3$ inekuazioaren ebazpenak?', '¿Cuáles de $-1$, 1 y 3 son soluciones de $x^{2}-2x<3$?', 'أيّ الأعداد $-1$ و1 و3 حلول للمتباينة $x^{2}-2x<3$؟', 'Which of $-1$, 1 and 3 are solutions of $x^{2}-2x<3$?'),
        example: same('$\\begin{gathered}(-1)^{2}+2=3\\qquad 1-2=-1<3\\\\ 9-6=3\\end{gathered}$'),
        exampleAnswer: say('1 bakarrik: $-1$ eta 3 zenbakiekin $3<3$ ateratzen da, eta hori faltsua da.', 'Solo 1: con $-1$ y con 3 sale $3<3$, que es falso.', 'العدد 1 فقط: مع $-1$ ومع 3 نحصل على $3<3$ وهذا خطأ.', 'Only 1: with $-1$ and with 3 you get $3<3$, which is false.')
    },
    'linear-inequality': {
        vocabulary: [
            say('zentzua', 'sentido', 'الاتجاه', 'direction'),
            say('negatiboa', 'negativo', 'سالب', 'negative')
        ],
        explanation: say(
            'Ekuazio bat bezala ebazten da: parentesiak eta izendatzaileak kendu, gaiak pasatu eta askatu. Arau desberdin bakarra dago: bi atalak zenbaki negatibo batez biderkatzen edo zatitzen badira, desberdintzaren zentzua aldatzen da, $3<5$ baina $-3>-5$ delako.',
            'Se resuelve como una ecuación: quitar paréntesis y denominadores, pasar términos y despejar. Solo hay una regla distinta: si se multiplican o dividen los dos miembros por un número negativo, cambia el sentido de la desigualdad, porque $3<5$, pero $-3>-5$.',
            'تُحل كالمعادلة: نحذف الأقواس والمقامات وننقل الحدود ونعزل المجهول. وهناك قاعدة مختلفة واحدة: إذا ضُرب الطرفان أو قُسما على عدد سالب ينقلب اتجاه المتباينة، لأن $3<5$ لكن $-3>-5$.',
            'It is solved like an equation: remove brackets and denominators, move terms and solve. There is just one different rule: if both sides are multiplied or divided by a negative number, the direction of the inequality changes, because $3<5$, but $-3>-5$.'
        ),
        examplePrompt: say('Ebatzi $5-3x\\le 2x-10$.', 'Resuelve $5-3x\\le 2x-10$.', 'حلّ $5-3x\\le 2x-10$.', 'Solve $5-3x\\le 2x-10$.'),
        example: same('$-5x\\le -15\\ \\to\\ x\\ge 3\\ \\to\\ [3,+\\infty)$'),
        exampleAnswer: say('$-5$ zenbakiaz zatitzean, $\\le$ ikurra $\\ge$ bihurtzen da.', 'Al dividir entre $-5$, $\\le$ pasa a $\\ge$.', 'عند القسمة على $-5$ تصير $\\le$ إلى $\\ge$.', 'Dividing by $-5$ turns $\\le$ into $\\ge$.')
    },
    'inequality-problems': {
        vocabulary: [
            say('gutxienez', 'al menos', 'على الأقل', 'at least'),
            say('gehienez', 'como mucho', 'على الأكثر', 'at most')
        ],
        explanation: say(
            'Itzuli hitzak: «gutxienez» $\\ge$ da; «gehienez» edo «ez da pasatzen», $\\le$; «ez da iristen», $<$; «baino gehiago», $>$. Ebatzi ondoren, begiratu ebazpenek zentzua duten: pertsonen edo objektuen kopuruak osoak eta ez-negatiboak dira.',
            'Traduce las palabras: «al menos» es $\\ge$; «como mucho» o «no supera», $\\le$; «no llega a», $<$; «más de», $>$. Después de resolver, mira si las soluciones tienen sentido: las cantidades de personas o de objetos son enteras y no negativas.',
            'ترجم الكلمات: «على الأقل» هي $\\ge$؛ و«على الأكثر» أو «لا يتجاوز» $\\le$؛ و«لا يبلغ» $<$؛ و«أكثر من» $>$. وبعد الحل انظر هل للحلول معنى: أعداد الأشخاص أو الأشياء صحيحة وغير سالبة.',
            'Translate the words: “at least” is $\\ge$; “at most” or “does not exceed”, $\\le$; “does not reach”, $<$; “more than”, $>$. After solving, see whether the solutions make sense: numbers of people or objects are whole and not negative.'
        ),
        examplePrompt: say('Taxi batek 3 € kobratzen ditu hasieran eta 1,20 € kilometroko. Gehienez zenbat km egin ditzaket 15 €-rekin?', 'Un taxi cobra 3 € de bajada de bandera y 1,20 € por km. ¿Cuántos km puedo hacer como mucho con 15 €?', 'تتقاضى سيارة أجرة 3 € عند الركوب و1.20 € لكل كم. كم كيلومترًا على الأكثر أقطع بـ 15 €؟', 'A taxi charges €3 to start and €1.20 per km. At most, how many km can I go for €15?'),
        example: same('$3+1{,}2x\\le 15\\ \\to\\ x\\le 10$'),
        exampleAnswer: say('Gehienez, 10 km.', 'Como mucho, 10 km.', 'على الأكثر 10 كم.', 'At most, 10 km.')
    },

    /* ---------- 5. Second-degree inequalities and systems ---------- */
    'quadratic-inequality': {
        vocabulary: [
            say('zeinua', 'signo', 'الإشارة', 'sign'),
            say('parabola', 'parábola', 'القطع المكافئ', 'parabola')
        ],
        explanation: say(
            'Pasatu dena atal batera eta aurkitu erroak: zuzena zatitan banatzen dute, eta zati bakoitzean zeinua ez da aldatzen; nahikoa da zati bakoitzeko zenbaki bat probatzea. $a>0$ bada, parabola negatiboa da erroen artean eta positiboa kanpoan: $x^{2}-2x-3\\le 0$ inekuazioaren erroak $-1$ eta 3 dira, beraz ebazpena $[-1,3]$ da. Errorik gabe, zeinua beti bera da.',
            'Pasa todo a un miembro y halla las raíces: parten la recta en trozos, y en cada uno el signo no cambia; basta probar un número de cada trozo. Si $a>0$, la parábola es negativa entre las raíces y positiva fuera: $x^{2}-2x-3\\le 0$ tiene raíces $-1$ y 3, así que su solución es $[-1,3]$. Sin raíces, el signo no cambia.',
            'انقل كل شيء إلى طرف وجد الجذور: تقسم المستقيم إلى أجزاء، ولا تتغيّر الإشارة في كل جزء؛ يكفي تجريب عدد من كل جزء. إذا كان $a>0$ فالقطع المكافئ سالب بين الجذرين وموجب خارجهما: $x^{2}-2x-3\\le 0$ جذراها $-1$ و3، إذن حلها $[-1,3]$. وبلا جذور تبقى الإشارة نفسها دائمًا.',
            'Move everything to one side and find the roots: they split the line into pieces, and on each piece the sign does not change; testing one number from each is enough. If $a>0$, the parabola is negative between the roots and positive outside: $x^{2}-2x-3\\le 0$ has roots $-1$ and 3, so its solution is $[-1,3]$. With no roots, the sign is always the same.'
        ),
        examplePrompt: say('Ebatzi $x^{2}-9\\ge 0$.', 'Resuelve $x^{2}-9\\ge 0$.', 'حلّ $x^{2}-9\\ge 0$.', 'Solve $x^{2}-9\\ge 0$.'),
        example: same('$\\begin{gathered}x^{2}-9=0\\ \\to\\ x=\\pm 3\\\\ (-\\infty,-3]\\cup[3,+\\infty)\\end{gathered}$'),
        exampleAnswer: say('Erroetatik kanpo, muturrak barne.', 'Fuera de las raíces, con los extremos incluidos.', 'خارج الجذرين مع إدخال الطرفين.', 'Outside the roots, with the endpoints included.'),
        why: {
            text: say(
                'Polinomioaren grafikoa ezin da X ardatzaren gainetik azpira pasatu hura moztu gabe, eta ebaki-puntuak erroak dira. Horregatik, bi erro jarraituren artean zeinua ez da aldatzen, eta nahikoa da zati bakoitzeko zenbaki bakar bat probatzea.',
                'La gráfica del polinomio no puede pasar de estar encima del eje X a estar debajo sin cortarlo, y los cortes son las raíces. Por eso, entre dos raíces seguidas el signo no cambia, y basta probar un solo número de cada trozo.',
                'لا يمكن لمنحنى كثير الحدود أن ينتقل من فوق المحور X إلى تحته دون أن يقطعه، ونقاط القطع هي الجذور. لذلك لا تتغيّر الإشارة بين جذرين متتاليين، ويكفي تجريب عدد واحد من كل جزء.',
                'The graph of the polynomial cannot go from above the X axis to below it without crossing it, and the crossings are the roots. That is why the sign does not change between two consecutive roots, and testing a single number from each piece is enough.'
            )
        }
    },
    'graphic-inequality': {
        vocabulary: [
            say('grafikoa', 'gráfica', 'المنحنى', 'graph'),
            say('ebaki-puntua', 'punto de corte', 'نقطة التقاطع', 'crossing point')
        ],
        explanation: say(
            '$f(x)<g(x)$ ebaztea $f$ funtzioaren grafikoa $g$ funtzioarenaren azpian dagoen $x$ balioak bilatzea da. Muturrak ebaki-puntuak dira, $f(x)=g(x)$ ekuazioaren ebazpenak: $x^{2}-5x+4=x-1$ ekuazioak $x=1$ eta $x=5$ ematen ditu, eta haien artean parabola zuzenaren azpian dago; beraz, ebazpena $(1,5)$ da.',
            'Resolver $f(x)<g(x)$ es buscar los $x$ en los que la gráfica de $f$ está por debajo de la de $g$. Los extremos son los puntos de corte, las soluciones de $f(x)=g(x)$: $x^{2}-5x+4=x-1$ da $x=1$ y $x=5$, y entre ellos la parábola está por debajo de la recta, así que la solución es $(1,5)$.',
            'حل $f(x)<g(x)$ هو البحث عن قيم $x$ التي يكون فيها منحنى $f$ تحت منحنى $g$. والطرفان هما نقطتا التقاطع، أي حلول $f(x)=g(x)$: المعادلة $x^{2}-5x+4=x-1$ تعطي $x=1$ و$x=5$، وبينهما يقع القطع المكافئ تحت المستقيم، إذن الحل $(1,5)$.',
            'Solving $f(x)<g(x)$ means finding the $x$ where the graph of $f$ is below that of $g$. The endpoints are the crossing points, the solutions of $f(x)=g(x)$: $x^{2}-5x+4=x-1$ gives $x=1$ and $x=5$, and between them the parabola lies below the line, so the solution is $(1,5)$.'
        ),
        examplePrompt: say('Ebatzi grafikoki $x^{2}\\le x+2$.', 'Resuelve gráficamente $x^{2}\\le x+2$.', 'حلّ بيانيًا $x^{2}\\le x+2$.', 'Solve $x^{2}\\le x+2$ graphically.'),
        example: same('$\\begin{gathered}x^{2}=x+2\\ \\to\\ x=-1,\\ x=2\\\\ [-1,2]\\end{gathered}$'),
        exampleAnswer: say('$y=x^{2}$ parabola $y=x+2$ zuzenaren azpian dago $-1$ eta 2 artean.', 'La parábola $y=x^{2}$ queda por debajo de la recta $y=x+2$ entre $-1$ y 2.', 'يقع القطع المكافئ $y=x^{2}$ تحت المستقيم $y=x+2$ بين $-1$ و2.', 'The parabola $y=x^{2}$ lies below the line $y=x+2$ between $-1$ and 2.')
    },
    'inequality-systems': {
        vocabulary: [
            say('ebakidura', 'intersección', 'التقاطع', 'intersection'),
            say('zati komuna', 'parte común', 'الجزء المشترك', 'common part')
        ],
        explanation: say(
            'Inekuazio bakoitza bere aldetik ebazten da, eta sistemaren ebazpena bi ebazpen-multzoen zati komuna da, haien ebakidura: $3x-1>5$ eta $x+4\\le 10$ inekuazioek $x>2$ eta $x\\le 6$ ematen dituzte, beraz $(2,6]$. Marraztu zuzen berean, bata bestearen gainean. Zati komunik ez badago, sistemak ez du ebazpenik.',
            'Cada inecuación se resuelve por separado, y la solución del sistema es la parte común de los dos conjuntos de soluciones, su intersección: $3x-1>5$ y $x+4\\le 10$ dan $x>2$ y $x\\le 6$, así que $(2,6]$. Dibújalas en la misma recta, una encima de otra. Si no hay parte común, el sistema no tiene solución.',
            'تُحل كل متباينة على حدة، وحل النظام هو الجزء المشترك بين مجموعتي الحلول، أي تقاطعهما: $3x-1>5$ و$x+4\\le 10$ تعطيان $x>2$ و$x\\le 6$، إذن $(2,6]$. ارسمهما على المستقيم نفسه إحداهما فوق الأخرى. وإذا لم يوجد جزء مشترك فلا حل للنظام.',
            'Each inequality is solved on its own, and the solution of the system is the common part of the two solution sets, their intersection: $3x-1>5$ and $x+4\\le 10$ give $x>2$ and $x\\le 6$, so $(2,6]$. Draw them on the same line, one above the other. If there is no common part, the system has no solution.'
        ),
        examplePrompt: say('Ebatzi sistema: $x+5>3$ eta $4x\\le 12$.', 'Resuelve el sistema: $x+5>3$ y $4x\\le 12$.', 'حلّ النظام: $x+5>3$ و$4x\\le 12$.', 'Solve the system: $x+5>3$ and $4x\\le 12$.'),
        example: same('$x>-2\\qquad x\\le 3\\ \\to\\ (-2,3]$'),
        exampleAnswer: say('$-2$ kanpoan geratzen da, eta 3 barruan.', '$-2$ queda fuera, y 3 dentro.', '$-2$ خارج، و3 داخل.', '$-2$ is left out, and 3 is in.')
    }
}

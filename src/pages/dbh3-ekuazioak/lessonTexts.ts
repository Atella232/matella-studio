import type { LessonTexts } from '../../features/unit-v2/types.ts'
import { say, same } from './text.ts'
import type { Equations3TopicId } from './lessonChecks.ts'

/* ==========================================================================
   Ekuazioak · 3. DBH — what each lesson tells: the new words (definitions),
   the key words in four languages (vocabulary), a short explanation, its
   cases, the example as an exercise («Another example») and, in four
   lessons, «Why does it work?» (the balance, a product that is zero, the
   two square roots, adding equal things). Plain data so the tests can
   import it; lessons.tsx merges it into the topics. The explanations use
   the numbers of their drawings (the balance x + 2 = 8, x/2 + x/3 = 5,
   x + y = 5, the rectangle of 150 cm², 20 heads and 56 legs); the example
   uses numbers of its own, and the solutions it gives satisfy its equation.
   No text command inside the formulas (the unit test forbids it). Tests in
   tests/lesson-texts.test.ts.
   ========================================================================== */

export const equations3LessonTexts: Record<Equations3TopicId, LessonTexts> = {
    equations: {
        definitions: [
            {
                term: say('Ekuazioa', 'Ecuación', 'المعادلة', 'Equation'),
                meaning: say('Balio batzuetarako bakarrik betetzen den letradun berdintza: $2x+1=7$, $x=3$ denean bakarrik.', 'Una igualdad con letras que solo se cumple para algunos valores: $2x+1=7$ solo si $x=3$.', 'مساواة فيها حروف لا تتحقق إلا لبعض القيم: $2x+1=7$ فقط إذا كان $x=3$.', 'An equality with letters that only holds for some values: $2x+1=7$ only if $x=3$.')
            },
            {
                term: say('Identitatea', 'Identidad', 'المتطابقة', 'Identity'),
                meaning: say('Beti betetzen den berdintza: $2(x+1)=2x+2$.', 'Una igualdad que se cumple siempre: $2(x+1)=2x+2$.', 'مساواة تتحقق دائمًا: $2(x+1)=2x+2$.', 'An equality that always holds: $2(x+1)=2x+2$.')
            },
            {
                term: say('Ekuazio baliokideak', 'Ecuaciones equivalentes', 'المعادلات المتكافئة', 'Equivalent equations'),
                meaning: say('Soluzio bera duten ekuazioak.', 'Las que tienen la misma solución.', 'المعادلات التي لها الحل نفسه.', 'Equations with the same solution.')
            }
        ],
        vocabulary: [
            say('atalak', 'miembros', 'الطرفين', 'sides'),
            say('askatu', 'despejar', 'عزل', 'solve for'),
            say('balantza', 'balanza', 'الميزان', 'balance')
        ],
        explanation: say(
            'Ekuazio bat ebazteko, ekuazio baliokideak idazten dira $x$ askatu arte: bi ataletan gauza bera batu edo ken daiteke, edo biak zenbaki beraz biderkatu edo zatitu, 0 ez bada. $x+2=8$ balantzan, platertxo bakoitzetik 2 kentzen badituzu, $x=6$ geratzen da.',
            'Para resolver una ecuación se escriben ecuaciones equivalentes hasta despejar $x$: se puede sumar o restar lo mismo en los dos miembros, o multiplicar o dividir los dos por el mismo número distinto de 0. En la balanza $x+2=8$, si quitas 2 de cada platillo, queda $x=6$.',
            'لحل معادلة نكتب معادلات متكافئة حتى نعزل $x$: يمكن جمع العدد نفسه أو طرحه في الطرفين، أو ضرب الطرفين في العدد نفسه غير الصفر أو قسمتهما عليه. في الميزان $x+2=8$ إذا نزعت 2 من كل كفة يبقى $x=6$.',
            'To solve an equation, write equivalent equations until you solve for $x$: you can add or subtract the same on both sides, or multiply or divide both sides by the same number other than 0. On the balance $x+2=8$, if you take 2 off each pan, $x=6$ is left.'
        ),
        examplePrompt: say('Ebatzi $6x+7=2x-5$.', 'Resuelve $6x+7=2x-5$.', 'حلّ $6x+7=2x-5$.', 'Solve $6x+7=2x-5$.'),
        example: same('$\\begin{gathered}6x-2x=-5-7\\\\ \\to\\ 4x=-12\\\\ \\to\\ x=-3\\end{gathered}$'),
        exampleAnswer: say('$x=-3$: bi atalek $-11$ balio dute.', '$x=-3$: los dos miembros valen $-11$.', '$x=-3$: الطرفان يساويان $-11$.', '$x=-3$: both sides are worth $-11$.'),
        why: {
            text: say(
                'Ekuazio bat oreka-balantza bat bezalakoa da: bi platertxoetan gauza bera jarri edo kentzen bada, orekan jarraitzen du. Horregatik ez da soluzioa aldatzen.',
                'Una ecuación es como una balanza en equilibrio: si se pone o se quita lo mismo en los dos platillos, sigue en equilibrio. Por eso la solución no cambia.',
                'المعادلة كميزان متوازن: إذا وضعنا الشيء نفسه في الكفتين أو نزعناه منهما يبقى متوازنًا. ولذلك لا يتغير الحل.',
                'An equation is like a balance in equilibrium: if you put on or take off the same in both pans, it stays balanced. That is why the solution does not change.'
            ),
            math: same('$\\begin{gathered}x+2=8\\\\ \\to\\ x+2-2=8-2\\\\ \\to\\ x=6\\end{gathered}$')
        }
    },
    brackets: {
        vocabulary: [
            say('parentesiak', 'paréntesis', 'الأقواس', 'brackets'),
            say('zeinuak', 'signos', 'الإشارات', 'signs'),
            say('atala', 'miembro', 'طرف', 'side')
        ],
        explanation: say(
            'Ordena hau da: kendu parentesiak, zenbakia barruko gai guztiez biderkatuz; eraman $x$ gaiak atal batera eta zenbakiak bestera; laburtu eta askatu. Parentesiaren aurrean minus bat badago, barruko zeinu guztiak aldatzen dira: $-(2x-3)=-2x+3$.',
            'El orden es: quitar paréntesis, multiplicando el número por todos los términos; pasar las $x$ a un miembro y los números al otro; reducir y despejar. Si delante del paréntesis hay un menos, cambian todos los signos de dentro: $-(2x-3)=-2x+3$.',
            'الترتيب: نحذف الأقواس بضرب العدد في كل الحدود، ثم ننقل حدود $x$ إلى طرف والأعداد إلى الطرف الآخر، ثم نختصر ونعزل. وإذا سبقت القوسَ إشارة ناقص تتغير كل الإشارات داخله: $-(2x-3)=-2x+3$.',
            'The order is: remove the brackets, multiplying the number by every term; move the $x$ terms to one side and the numbers to the other; collect and solve. If there is a minus before the bracket, every sign inside changes: $-(2x-3)=-2x+3$.'
        ),
        examplePrompt: say('Ebatzi $5-3(x-2)=2(x+1)-1$.', 'Resuelve $5-3(x-2)=2(x+1)-1$.', 'حلّ $5-3(x-2)=2(x+1)-1$.', 'Solve $5-3(x-2)=2(x+1)-1$.'),
        example: same('$\\begin{gathered}5-3x+6=2x+2-1\\\\ \\to\\ 10=5x\\\\ \\to\\ x=2\\end{gathered}$'),
        exampleAnswer: say('$x=2$: $-3$ zenbakiak $-2$ ere biderkatzen du, eta $+6$ ematen du.', '$x=2$: el $-3$ multiplica también al $-2$, y da $+6$.', '$x=2$: العدد $-3$ يضرب $-2$ أيضًا فيعطي $+6$.', '$x=2$: the $-3$ also multiplies the $-2$, giving $+6$.')
    },
    denominators: {
        vocabulary: [
            say('izendatzaileak', 'denominadores', 'المقامات', 'denominators'),
            say('zenbakitzailea', 'numerador', 'البسط', 'numerator'),
            say('parentesia', 'paréntesis', 'قوسين', 'brackets')
        ],
        explanation: say(
            'Biderkatu bi atalak izendatzaileen m.k.t. zenbakiaz: gai guztiak, izendatzailerik ez dutenak ere bai. $\\frac{x}{2}+\\frac{x}{3}=5$ ekuazioan, bider 6: $3x+2x=30$. Zenbakitzailea batuketa bat bada, jarri parentesi artean: $-\\frac{x-1}{3}$ bider 6, $-2(x-1)$.',
            'Multiplica los dos miembros por el m.c.m. de los denominadores: todos los términos, también los que no tienen denominador. En $\\frac{x}{2}+\\frac{x}{3}=5$, por 6: $3x+2x=30$. Si un numerador es una suma, ponlo entre paréntesis: $-\\frac{x-1}{3}$ por 6 es $-2(x-1)$.',
            'اضرب الطرفين في المضاعف المشترك الأصغر للمقامات: كل الحدود، حتى التي لا مقام لها. في $\\frac{x}{2}+\\frac{x}{3}=5$ نضرب في 6: $3x+2x=30$. وإذا كان البسط مجموعًا فضعه بين قوسين: $-\\frac{x-1}{3}$ في 6 هو $-2(x-1)$.',
            'Multiply both sides by the LCM of the denominators: every term, including those with no denominator. In $\\frac{x}{2}+\\frac{x}{3}=5$, times 6: $3x+2x=30$. If a numerator is a sum, put it in brackets: $-\\frac{x-1}{3}$ times 6 is $-2(x-1)$.'
        ),
        examplePrompt: say('Ebatzi $\\frac{x+3}{4}-\\frac{x}{6}=1$.', 'Resuelve $\\frac{x+3}{4}-\\frac{x}{6}=1$.', 'حلّ $\\frac{x+3}{4}-\\frac{x}{6}=1$.', 'Solve $\\frac{x+3}{4}-\\frac{x}{6}=1$.'),
        example: same('$\\begin{gathered}3(x+3)-2x=12\\\\ \\to\\ x+9=12\\\\ \\to\\ x=3\\end{gathered}$'),
        exampleAnswer: say('$x=3$: m.k.t. 12 da, eta 1 zenbakia ere biderkatzen da.', '$x=3$: el m.c.m. es 12, y también se multiplica el 1.', '$x=3$: المضاعف المشترك الأصغر 12، ونضرب العدد 1 أيضًا.', '$x=3$: the LCM is 12, and the 1 is multiplied too.')
    },
    incomplete: {
        definitions: [
            {
                term: say('Bigarren graduko ekuazioa', 'Ecuación de segundo grado', 'معادلة من الدرجة الثانية', 'Quadratic equation'),
                meaning: say('$ax^{2}+bx+c=0$ formako ekuazioa, $a\\neq 0$ izanik; osatugabea da $b$ edo $c$ zero badira.', 'Una ecuación de la forma $ax^{2}+bx+c=0$, con $a\\neq 0$; es incompleta si $b$ o $c$ valen 0.', 'معادلة على الصورة $ax^{2}+bx+c=0$ مع $a\\neq 0$؛ وتكون ناقصة إذا كان $b$ أو $c$ صفرًا.', 'An equation of the form $ax^{2}+bx+c=0$, with $a\\neq 0$; it is incomplete if $b$ or $c$ is 0.')
            }
        ],
        vocabulary: [
            say('faktore komuna', 'factor común', 'العامل المشترك', 'common factor'),
            say('erro karratua', 'raíz cuadrada', 'الجذر التربيعي', 'square root'),
            say('soluzioa', 'solución', 'الحل', 'solution')
        ],
        explanation: say(
            'Osatugabeak formularik gabe ebazten dira. $bx$ falta bada, askatu $x^{2}$ eta atera erro karratua: bi soluzio, $+$ eta $-$ zeinuekin, edo bat ere ez $x^{2}$ negatiboa bada. $c$ falta bada, atera $x$ faktore komun gisa: $x=0$ beti da soluzio bat.',
            'Las incompletas se resuelven sin fórmula. Si falta $bx$, despeja $x^{2}$ y saca la raíz cuadrada: dos soluciones, con $+$ y con $-$, o ninguna si $x^{2}$ es negativo. Si falta $c$, saca $x$ factor común: $x=0$ siempre es una solución.',
            'تُحل الناقصة دون صيغة. إذا غاب $bx$ اعزل $x^{2}$ واستخرج الجذر التربيعي: حلّان بالإشارتين $+$ و$-$، أو لا حل إذا كان $x^{2}$ سالبًا. وإذا غاب $c$ فأخرج $x$ عاملًا مشتركًا: $x=0$ حل دائمًا.',
            'Incomplete ones are solved without the formula. If $bx$ is missing, isolate $x^{2}$ and take the square root: two solutions, with $+$ and with $-$, or none if $x^{2}$ is negative. If $c$ is missing, take $x$ out as a common factor: $x=0$ is always a solution.'
        ),
        cases: [
            { title: same('$ax^{2}+c=0$'), text: say('$x^{2}$ bakandu eta erroa atera.', 'Despeja $x^{2}$ y saca la raíz.', 'اعزل $x^{2}$ وخذ الجذر.', 'Isolate $x^{2}$ and take the root.'), math: same('$\\begin{gathered}2x^{2}-18=0\\\\ \\to\\ x^{2}=9\\\\ \\to\\ x=\\pm 3\\end{gathered}$') },
            { title: same('$ax^{2}+bx=0$'), text: say('$x$ faktore komuna.', 'Factor común $x$.', 'العامل المشترك $x$.', 'Common factor $x$.'), math: same('$\\begin{gathered}x^{2}-5x=0\\\\ \\to\\ x(x-5)=0\\\\ \\to\\ x=0,\\ x=5\\end{gathered}$') }
        ],
        examplePrompt: say('Ebatzi $2x^{2}-50=0$ eta $3x^{2}+12x=0$.', 'Resuelve $2x^{2}-50=0$ y $3x^{2}+12x=0$.', 'حلّ $2x^{2}-50=0$ و$3x^{2}+12x=0$.', 'Solve $2x^{2}-50=0$ and $3x^{2}+12x=0$.'),
        example: same('$\\begin{gathered}x^{2}=25\\ \\to\\ x=\\pm 5\\\\ 3x(x+4)=0\\ \\to\\ x=0,\\ x=-4\\end{gathered}$'),
        exampleAnswer: say('Lehenengoak $x=5$ eta $x=-5$; bigarrenak $x=0$ eta $x=-4$.', 'La primera, $x=5$ y $x=-5$; la segunda, $x=0$ y $x=-4$.', 'الأولى $x=5$ و$x=-5$، والثانية $x=0$ و$x=-4$.', 'The first, $x=5$ and $x=-5$; the second, $x=0$ and $x=-4$.'),
        why: {
            text: say(
                'Biderkadura bat 0 bada, haren faktoreren bat 0 da: 0 ez diren bi zenbakik ez dute inoiz 0 ematen. Horregatik, $x(x-5)=0$ bada, $x=0$ edo $x-5=0$.',
                'Si un producto vale 0, alguno de sus factores vale 0: dos números distintos de 0 nunca dan 0. Por eso, si $x(x-5)=0$, o bien $x=0$ o bien $x-5=0$.',
                'إذا كان حاصل ضرب يساوي 0 فأحد عوامله يساوي 0: عددان غير صفريين لا يعطيان 0 أبدًا. لذلك إذا كان $x(x-5)=0$ فإما $x=0$ وإما $x-5=0$.',
                'If a product is 0, one of its factors is 0: two numbers other than 0 never give 0. So if $x(x-5)=0$, either $x=0$ or $x-5=0$.'
            ),
            math: same('$x(x-5)=0\\ \\to\\ x=0,\\ x=5$')
        }
    },
    formula: {
        vocabulary: [
            say('koefizienteak', 'coeficientes', 'المعاملات', 'coefficients'),
            say('erroa', 'raíz', 'الجذر', 'root'),
            say('zeinua', 'signo', 'الإشارة', 'sign')
        ],
        explanation: say(
            'Jarri ekuazioa $ax^{2}+bx+c=0$ forman, eta irakurri $a$, $b$ eta $c$ beren zeinuarekin. Gero, erabili formula, $x=\\frac{-b\\pm\\sqrt{b^{2}-4ac}}{2a}$: kalkulatu erroaren barrukoa, atera erroa eta egin bi kontuak, $+$ eta $-$ zeinuekin.',
            'Pon la ecuación en la forma $ax^{2}+bx+c=0$ y lee $a$, $b$ y $c$ con su signo. Después usa la fórmula, $x=\\frac{-b\\pm\\sqrt{b^{2}-4ac}}{2a}$: calcula lo de dentro de la raíz, sácala y haz las dos cuentas, con $+$ y con $-$.',
            'ضع المعادلة على الصورة $ax^{2}+bx+c=0$ واقرأ $a$ و$b$ و$c$ بإشاراتها. ثم استعمل الصيغة $x=\\frac{-b\\pm\\sqrt{b^{2}-4ac}}{2a}$: احسب ما تحت الجذر واستخرج الجذر وأجرِ الحسابين، بالإشارة $+$ وبالإشارة $-$.',
            'Put the equation in the form $ax^{2}+bx+c=0$ and read $a$, $b$ and $c$ with their signs. Then use the formula, $x=\\frac{-b\\pm\\sqrt{b^{2}-4ac}}{2a}$: work out what is under the root, take the root and do both sums, with $+$ and with $-$.'
        ),
        examplePrompt: say('Ebatzi $3x^{2}-2x-8=0$.', 'Resuelve $3x^{2}-2x-8=0$.', 'حلّ $3x^{2}-2x-8=0$.', 'Solve $3x^{2}-2x-8=0$.'),
        example: same('$x=\\frac{2\\pm 10}{6}\\ \\to\\ x=2,\\ x=-\\frac{4}{3}$'),
        exampleAnswer: say('$b=-2$ denez, $-b=2$; erroaren barruan $4+96=100$.', 'Como $b=-2$, $-b=2$; dentro de la raíz, $4+96=100$.', 'بما أن $b=-2$ فإن $-b=2$؛ وما تحت الجذر $4+96=100$.', 'Since $b=-2$, $-b=2$; under the root, $4+96=100$.'),
        why: {
            text: say(
                '$\\pm$ zeinua agertzen da zenbaki positibo batek bi erro karratu dituelako: $3^{2}=9$ eta $(-3)^{2}=9$. Horregatik ateratzen dira normalean bi soluzio, zeinu bakoitzarekin bat.',
                'El $\\pm$ aparece porque un número positivo tiene dos raíces cuadradas: $3^{2}=9$ y $(-3)^{2}=9$. Por eso suelen salir dos soluciones, una con cada signo.',
                'تظهر $\\pm$ لأن للعدد الموجب جذرين تربيعيين: $3^{2}=9$ و$(-3)^{2}=9$. ولذلك نحصل عادة على حلين، واحد بكل إشارة.',
                'The $\\pm$ appears because a positive number has two square roots: $3^{2}=9$ and $(-3)^{2}=9$. That is why you usually get two solutions, one with each sign.'
            ),
            math: same('$3^{2}=(-3)^{2}=9$')
        }
    },
    discriminant: {
        definitions: [
            {
                term: say('Diskriminatzailea', 'Discriminante', 'المميّز', 'Discriminant'),
                meaning: say('$\\Delta=b^{2}-4ac$: formulan erroaren barruan dagoena.', '$\\Delta=b^{2}-4ac$: lo que va dentro de la raíz de la fórmula.', '$\\Delta=b^{2}-4ac$: ما تحت الجذر في الصيغة.', '$\\Delta=b^{2}-4ac$: what is under the root in the formula.')
            }
        ],
        vocabulary: [
            say('soluzioa', 'solución', 'الحل', 'solution'),
            say('parabola', 'parábola', 'القطع المكافئ', 'parabola'),
            say('ardatza', 'eje', 'المحور', 'axis')
        ],
        explanation: say(
            'Haren zeinuak esaten du zenbat soluzio dauden formula amaitu gabe, zenbaki negatibo baten erro karratua ez baita existitzen. Grafikoan, $y=ax^{2}+bx+c$ parabolak ardatza bi puntutan ebakitzen du, puntu batean ukitzen du edo ez du ukitzen.',
            'Su signo dice cuántas soluciones hay sin terminar la fórmula, porque no existe la raíz cuadrada de un número negativo. En la gráfica, la parábola $y=ax^{2}+bx+c$ corta el eje en dos puntos, lo toca en uno o no lo toca.',
            'تدل إشارته على عدد الحلول دون إكمال الصيغة، لأنه لا يوجد جذر تربيعي لعدد سالب. وفي الرسم يقطع القطع المكافئ $y=ax^{2}+bx+c$ المحور في نقطتين، أو يمسّه في نقطة، أو لا يمسّه.',
            'Its sign tells how many solutions there are without finishing the formula, because a negative number has no square root. On the graph, the parabola $y=ax^{2}+bx+c$ cuts the axis at two points, touches it at one or does not touch it.'
        ),
        cases: [
            { title: same('$\\Delta>0$'), text: say('Bi ebazpen.', 'Dos soluciones.', 'حلّان.', 'Two solutions.'), math: same('$x^{2}-4=0$') },
            { title: same('$\\Delta=0$'), text: say('Ebazpen bat.', 'Una solución.', 'حلّ واحد.', 'One solution.'), math: same('$x^{2}-6x+9=0$') },
            { title: same('$\\Delta<0$'), text: say('Ebazpenik ez.', 'Ninguna solución.', 'لا حل.', 'No solution.'), math: same('$x^{2}+x+5=0$') }
        ],
        examplePrompt: say('Zenbat soluzio ditu $2x^{2}-3x+5=0$ ekuazioak?', '¿Cuántas soluciones tiene $2x^{2}-3x+5=0$?', 'كم حلًا للمعادلة $2x^{2}-3x+5=0$؟', 'How many solutions does $2x^{2}-3x+5=0$ have?'),
        example: same('$\\begin{aligned}&\\Delta=(-3)^{2}-4\\cdot 2\\cdot 5\\\\&=9-40=-31\\end{aligned}$'),
        exampleAnswer: say('Bat ere ez: $\\Delta<0$, eta parabolak ez du ardatza ukitzen.', 'Ninguna: $\\Delta<0$, y la parábola no toca el eje.', 'لا حل: ‏$\\Delta<0$، والقطع المكافئ لا يمسّ المحور.', 'None: $\\Delta<0$, and the parabola does not touch the axis.')
    },
    pairs: {
        definitions: [
            {
                term: say('Ekuazio-sistema', 'Sistema de ecuaciones', 'نظام معادلات', 'System of equations'),
                meaning: say('Aldi berean bete behar diren bi ekuazio.', 'Dos ecuaciones que se tienen que cumplir a la vez.', 'معادلتان يجب أن تتحققا معًا.', 'Two equations that must both hold at once.')
            }
        ],
        vocabulary: [
            say('bikotea', 'pareja', 'زوج', 'pair'),
            say('zuzena', 'recta', 'مستقيم', 'line'),
            say('ezezagunak', 'incógnitas', 'مجهولين', 'unknowns')
        ],
        explanation: say(
            '$x+y=5$ ekuazioak infinitu soluzio ditu, guztiak bikoteak: $(0,5)$, $(1,4)$, $(2,3)$… Planoan zuzen bat osatzen dute. Sistema baten soluzioa bi ekuazioak betetzen dituen bikotea da.',
            'La ecuación $x+y=5$ tiene infinitas soluciones, todas parejas: $(0,5)$, $(1,4)$, $(2,3)$… En el plano forman una recta. La solución de un sistema es la pareja que cumple las dos ecuaciones.',
            'للمعادلة $x+y=5$ حلول لا نهائية، كلها أزواج: $(0,5)$ و$(1,4)$ و$(2,3)$… وفي المستوى تكوّن مستقيمًا. وحل النظام هو الزوج الذي يحقق المعادلتين ذواتي المجهولين.',
            'The equation $x+y=5$ has infinitely many solutions, all pairs: $(0,5)$, $(1,4)$, $(2,3)$… In the plane they form a line. The solution of a system is the pair that satisfies both equations in two unknowns.'
        ),
        examplePrompt: say('Eman $2x+y=6$ ekuazioaren hiru soluzio.', 'Da tres soluciones de $2x+y=6$.', 'أعطِ ثلاثة حلول للمعادلة $2x+y=6$.', 'Give three solutions of $2x+y=6$.'),
        example: same('$y=6-2x\\ \\to\\ (0,6),\\ (1,4),\\ (3,0)$'),
        exampleAnswer: say('Adibidez, $(0,6)$, $(1,4)$ eta $(3,0)$; infinitu daude.', 'Por ejemplo, $(0,6)$, $(1,4)$ y $(3,0)$; hay infinitas.', 'مثلًا $(0,6)$ و$(1,4)$ و$(3,0)$؛ وهي لا نهائية.', 'For example, $(0,6)$, $(1,4)$ and $(3,0)$; there are infinitely many.')
    },
    graphic: {
        vocabulary: [
            say('ebaki-puntua', 'punto de corte', 'نقطة التقاطع', 'crossing point'),
            say('taula', 'tabla', 'جدول', 'table'),
            say('zuzena', 'recta', 'مستقيم', 'line')
        ],
        explanation: say(
            'Ekuazio bakoitza zuzen bat da: marrazteko, egin taula bat, eman bizpahiru balio $x$ letrari eta kalkulatu $y$. Sistemaren soluzioa ebaki-puntua da, bi zuzenetan dagoen bakarra. Ebakia zenbaki osoetan erortzen ez bada, ez da zehatza.',
            'Cada ecuación es una recta: para dibujarla, haz una tabla, da dos o tres valores a $x$ y calcula $y$. La solución del sistema es el punto de corte, el único que está en las dos. Si el corte no cae en números enteros, no es exacto.',
            'كل معادلة مستقيم: لرسمه أعطِ $x$ قيمتين أو ثلاثًا في جدول واحسب $y$. وحل النظام هو نقطة التقاطع، النقطة الوحيدة التي تقع على المستقيمين. وإذا لم يقع التقاطع على أعداد صحيحة فالطريقة ليست دقيقة.',
            'Each equation is a line: to draw it, give $x$ two or three values in a table and work out $y$. The solution of the system is the crossing point, the only one on both lines. If the crossing is not at whole numbers, it is not exact.'
        ),
        examplePrompt: say('Ebatzi grafikoki $y=x+3$, $y=-x+1$.', 'Resuelve gráficamente $y=x+3$, $y=-x+1$.', 'حلّ بيانيًا $y=x+3$، $y=-x+1$.', 'Solve graphically $y=x+3$, $y=-x+1$.'),
        example: same('$-1+3=2\\qquad -(-1)+1=2$'),
        exampleAnswer: say('$(-1,2)$ puntuan ebakitzen dira: hori da soluzioa, $x=-1$, $y=2$.', 'Se cortan en $(-1,2)$: esa es la solución, $x=-1$, $y=2$.', 'يتقاطعان في $(-1,2)$: وهذا هو الحل، $x=-1$ و$y=2$.', 'They cross at $(-1,2)$: that is the solution, $x=-1$, $y=2$.')
    },
    classify: {
        definitions: [
            {
                term: say('Sistema bateragarria', 'Sistema compatible', 'نظام متوافق', 'Consistent system'),
                meaning: say('Soluzioa duena: determinatua bat badu, indeterminatua infinitu baditu. Soluziorik ez badu, bateraezina da.', 'El que tiene solución: determinado si tiene una, indeterminado si tiene infinitas. Si no tiene, es incompatible.', 'النظام الذي له حل: محدد إذا كان له حل واحد، وغير محدد إذا كانت حلوله لا نهائية. وإذا لم يكن له حل فهو غير متوافق.', 'One that has a solution: determined if it has one, undetermined if it has infinitely many. If it has none, it is inconsistent.')
            }
        ],
        vocabulary: [
            say('paraleloak', 'paralelas', 'متوازيان', 'parallel'),
            say('proportzionalak', 'proporcionales', 'متناسبة', 'proportional'),
            say('gai askeak', 'términos independientes', 'الحدود الثابتة', 'constant terms')
        ],
        explanation: say(
            'Bi zuzenek elkar ebaki dezakete, paraleloak izan edo bat bera izan: sistemak soluzio bat du, bat ere ez edo infinitu. Koefizienteetan ikusten da: $x$ eta $y$ letrenak proportzionalak badira, zuzenak paraleloak edo berdinak dira; gai askeak ere bai, bat bera dira.',
            'Dos rectas se pueden cortar, ser paralelas o ser la misma: el sistema tiene una solución, ninguna o infinitas. Se ve en los coeficientes: si los de $x$ y los de $y$ son proporcionales, las rectas son paralelas o iguales; si también lo son los términos independientes, son la misma.',
            'يمكن أن يتقاطع مستقيمان أو يكونا متوازيين أو يكونا المستقيم نفسه: فللنظام حل واحد أو لا حل أو حلول لا نهائية. ويظهر ذلك في المعاملات: إذا كانت معاملات $x$ و$y$ متناسبة فالمستقيمان متوازيان أو متطابقان، وإذا كانت الحدود الثابتة متناسبة أيضًا فهما المستقيم نفسه.',
            'Two lines can cross, be parallel or be the same line: the system has one solution, none or infinitely many. You can see it in the coefficients: if those of $x$ and $y$ are proportional, the lines are parallel or equal; if the constant terms are too, they are the same.'
        ),
        cases: [
            { title: say('Ebazpen bat', 'Una solución', 'حلّ واحد', 'One solution'), text: say('Ebakitzen dira.', 'Se cortan.', 'يتقاطعان.', 'They cross.'), math: same('$x+y=4,\\ x-y=2$') },
            { title: say('Ebazpenik ez', 'Ninguna', 'لا حل', 'None'), text: say('Paraleloak.', 'Paralelas.', 'متوازيان.', 'Parallel.'), math: same('$x+y=4,\\ x+y=6$') },
            { title: say('Infinitu', 'Infinitas', 'لانهائية', 'Infinitely many'), text: say('Zuzen bera.', 'La misma recta.', 'المستقيم نفسه.', 'The same line.'), math: same('$x+y=4,\\ 2x+2y=8$') }
        ],
        examplePrompt: say('Zer motatakoa da $2x+y=3$, $6x+3y=9$ sistema?', '¿De qué tipo es el sistema $2x+y=3$, $6x+3y=9$?', 'من أي نوع النظام $2x+y=3$، $6x+3y=9$؟', 'What kind of system is $2x+y=3$, $6x+3y=9$?'),
        example: same('$\\frac{6}{2}=\\frac{3}{1}=\\frac{9}{3}=3$'),
        exampleAnswer: say('Bateragarri indeterminatua: bigarren ekuazioa lehena bider 3 da, zuzen bera.', 'Compatible indeterminado: la segunda ecuación es la primera por 3, la misma recta.', 'متوافق غير محدد: المعادلة الثانية هي الأولى في 3، المستقيم نفسه.', 'Consistent and undetermined: the second equation is the first times 3, the same line.')
    },
    substitution: {
        vocabulary: [
            say('ordezkatu', 'sustituir', 'عوّض', 'substitute'),
            say('askatu', 'despejar', 'اعزل', 'solve for'),
            say('parentesiak', 'paréntesis', 'قوسين', 'brackets')
        ],
        explanation: say(
            'Askatu ezezagun bat ekuazio batean, ahal bada 1 edo $-1$ koefizientea duena; ordezkatu bestean, parentesi artean; ebatzi ezezagun bakarreko ekuazioa, eta itzuli askatutakora bestea kalkulatzeko.',
            'Despeja una incógnita en una ecuación, mejor la que tiene coeficiente 1 o $-1$, y sustituye en la otra, entre paréntesis; resuelve la ecuación de una incógnita y vuelve a la despejada para calcular la otra.',
            'اعزل مجهولًا في إحدى المعادلتين، ويُفضَّل الذي معامله 1 أو $-1$، ثم عوّض في الأخرى بين قوسين. حلّ المعادلة ذات المجهول الواحد، ثم ارجع إلى المعزول لحساب الآخر.',
            'Solve for one unknown in one equation, ideally the one with coefficient 1 or $-1$, and substitute it into the other, in brackets; solve the one-unknown equation and go back to work out the other.'
        ),
        examplePrompt: say('Ebatzi $y=3x-1$, $2x+y=9$.', 'Resuelve $y=3x-1$, $2x+y=9$.', 'حلّ $y=3x-1$، $2x+y=9$.', 'Solve $y=3x-1$, $2x+y=9$.'),
        example: same('$\\begin{gathered}2x+(3x-1)=9\\ \\to\\ x=2\\\\ y=3\\cdot 2-1=5\\end{gathered}$'),
        exampleAnswer: same('$x=2,\\ y=5$')
    },
    equalisation: {
        vocabulary: [
            say('berdindu', 'igualar', 'نساوي', 'set equal'),
            say('ezezagun bera', 'misma incógnita', 'المجهول نفسه', 'same unknown'),
            say('adierazpenak', 'expresiones', 'العبارتين', 'expressions')
        ],
        explanation: say(
            'Askatu ezezagun bera bi ekuazioetan, adibidez $y$. Bi adierazpenek gauza bera balio dutenez, berdindu egiten dira: $x$ bakarrik duen ekuazio bat geratzen da. Ebatzi ondoren, ordezkatu askatutako edozeinetan.',
            'Despeja la misma incógnita en las dos ecuaciones, por ejemplo $y$. Como las dos expresiones valen lo mismo, se igualan: queda una ecuación solo con $x$. Después de resolverla, sustituye en cualquiera de las despejadas.',
            'اعزل المجهول نفسه في المعادلتين، مثلًا $y$. ولأن العبارتين متساويتان نساوي بينهما: تبقى معادلة فيها $x$ فقط. وبعد حلها عوّض في أي من المعادلتين المعزولتين.',
            'Solve for the same unknown in both equations, for example $y$. As the two expressions are worth the same, set them equal: an equation with only $x$ is left. After solving it, substitute into either of the rearranged ones.'
        ),
        examplePrompt: say('Ebatzi $y=4x-3$, $y=2x+5$.', 'Resuelve $y=4x-3$, $y=2x+5$.', 'حلّ $y=4x-3$، $y=2x+5$.', 'Solve $y=4x-3$, $y=2x+5$.'),
        example: same('$\\begin{gathered}4x-3=2x+5\\ \\to\\ x=4\\\\ y=4\\cdot 4-3=13\\end{gathered}$'),
        exampleAnswer: same('$x=4,\\ y=13$')
    },
    elimination: {
        vocabulary: [
            say('koefiziente aurkakoak', 'coeficientes opuestos', 'معاملات متعاكسة', 'opposite coefficients'),
            say('batu', 'sumar', 'اجمع', 'add'),
            say('desagertu', 'desaparecer', 'يختفي', 'disappear')
        ],
        explanation: say(
            'Biderkatu ekuazioak zenbakiren batez, ezezagun batek koefiziente aurkakoak izan ditzan, $3y$ eta $-3y$ bezala. Gero batu bi ekuazioak, atalez atal: ezezagun hori desagertu egiten da. Metodo onena da ezezagun batek ere koefiziente 1 ez duenean.',
            'Multiplica las ecuaciones por algún número para que una incógnita tenga coeficientes opuestos, como $3y$ y $-3y$. Después suma las dos ecuaciones, miembro a miembro: esa incógnita desaparece. Es el mejor método cuando ninguna incógnita tiene coeficiente 1.',
            'اضرب المعادلتين في عدد ما ليصير لأحد المجهولين معاملان متعاكسان، مثل $3y$ و$-3y$. ثم اجمع المعادلتين طرفًا بطرف: فيختفي ذلك المجهول. وهي أفضل طريقة عندما لا يكون لأي مجهول المعامل 1.',
            'Multiply the equations by some number so that one unknown has opposite coefficients, like $3y$ and $-3y$. Then add the two equations, side by side: that unknown disappears. It is the best method when no unknown has coefficient 1.'
        ),
        examplePrompt: say('Ebatzi $3x+2y=16$, $5x-2y=0$.', 'Resuelve $3x+2y=16$, $5x-2y=0$.', 'حلّ $3x+2y=16$، $5x-2y=0$.', 'Solve $3x+2y=16$, $5x-2y=0$.'),
        example: same('$\\begin{gathered}8x=16\\ \\to\\ x=2\\\\ 3\\cdot 2+2y=16\\ \\to\\ y=5\\end{gathered}$'),
        exampleAnswer: say('$x=2$ eta $y=5$: $2y$ eta $-2y$ aurkakoak ziren jada.', '$x=2$ e $y=5$: $2y$ y $-2y$ ya eran opuestos.', '$x=2$ و$y=5$: كان $2y$ و$-2y$ متعاكسين من البداية.', '$x=2$ and $y=5$: $2y$ and $-2y$ were already opposite.'),
        why: {
            text: say(
                '$A=B$ eta $C=D$ badira, $A+C=B+D$ da: gauza berdinei gauza berdinak batzen zaizkie, orekan dauden bi balantza elkartzean bezala. Koefiziente aurkakoekin, ezezagun horrek zero batzen du.',
                'Si $A=B$ y $C=D$, entonces $A+C=B+D$: se suman cosas iguales a cosas iguales, como al juntar dos balanzas en equilibrio. Con coeficientes opuestos, esa incógnita suma cero.',
                'إذا كان $A=B$ و$C=D$ فإن $A+C=B+D$: نجمع أشياء متساوية إلى أشياء متساوية، كما لو جمعنا ميزانين متوازنين. ومع المعاملين المتعاكسين يصير مجموع ذلك المجهول صفرًا.',
                'If $A=B$ and $C=D$, then $A+C=B+D$: equal things are added to equal things, like putting two balanced scales together. With opposite coefficients, that unknown adds up to zero.'
            ),
            math: same('$\\begin{aligned}&(7+3)+(7-3)=10+4\\\\&=14=2\\cdot 7\\end{aligned}$')
        }
    },
    'equation-problems': {
        vocabulary: [
            say('enuntziatua', 'enunciado', 'نص المسألة', 'statement'),
            say('adinak', 'edades', 'الأعمار', 'ages'),
            say('egiaztatu', 'comprueba', 'تحقق', 'check')
        ],
        explanation: say(
            'Lau pauso: erabaki zer den $x$; idatzi beste kopuruak $x$ erabiliz; idatzi ekuazioa enuntziatuaren berdintzarekin; ebatzi eta egiaztatu emaitzak zentzua duela. Adinetan, urteak denentzat igarotzen dira: 10 urte barru, $x$ eta $3x$ izango dira $x+10$ eta $3x+10$.',
            'Cuatro pasos: decide qué es $x$; escribe las otras cantidades con $x$; plantea la ecuación con la igualdad del enunciado; resuélvela y comprueba que la respuesta tiene sentido. En las edades, los años pasan para todos: dentro de 10 años, $x$ y $3x$ serán $x+10$ y $3x+10$.',
            'أربع خطوات: قرّر ما هو $x$؛ اكتب الكميات الأخرى بدلالة $x$؛ اكتب المعادلة من المساواة في نص المسألة؛ حلّها وتحقق من أن الجواب منطقي. وفي الأعمار تمر السنوات على الجميع: بعد 10 سنوات يصير $x$ و$3x$ هما $x+10$ و$3x+10$.',
            'Four steps: decide what $x$ is; write the other amounts with $x$; set up the equation from the equality in the statement; solve it and check that the answer makes sense. With ages, the years go by for everyone: in 10 years, $x$ and $3x$ will be $x+10$ and $3x+10$.'
        ),
        examplePrompt: say('Bi zenbaki jarraiek 85 batzen dute. Zein dira?', 'Dos números consecutivos suman 85. ¿Cuáles son?', 'مجموع عددين متتاليين 85. ما هما؟', 'Two consecutive numbers add up to 85. What are they?'),
        example: same('$\\begin{gathered}x+(x+1)=85\\\\ \\to\\ 2x=84\\\\ \\to\\ x=42\\end{gathered}$'),
        exampleAnswer: say('42 eta 43; egiaztatu: $42+43=85$.', '42 y 43; comprueba: $42+43=85$.', '42 و43؛ تحقق: $42+43=85$.', '42 and 43; check: $42+43=85$.')
    },
    'quadratic-problems': {
        vocabulary: [
            say('luzera', 'longitud', 'الطول', 'length'),
            say('azalera', 'área', 'المساحة', 'area'),
            say('negatiboa', 'negativo', 'سالبًا', 'negative')
        ],
        explanation: say(
            'Azalerek eta biderkadurek bigarren graduko ekuazioak ematen dituzte. Bi soluzio ateratzen badira, aztertu biak: luzera edo adin bat ezin da negatiboa izan. $x$ eta $x+5$ aldeko eta 150 azalerako laukizuzenak $x=10$ edo $x=-15$ ematen du: aldeak 10 eta 15 dira.',
            'Las áreas y los productos dan ecuaciones de segundo grado. Si salen dos soluciones, estudia las dos: una longitud o una edad no puede ser negativa. Un rectángulo de lados $x$ y $x+5$ y área 150 da $x=10$ o $x=-15$: los lados son 10 y 15.',
            'المساحات وحواصل الضرب تعطي معادلات من الدرجة الثانية. وإذا خرج حلّان فادرسهما: لا يمكن أن يكون الطول أو العمر سالبًا. ومستطيل ضلعاه $x$ و$x+5$ ومساحته 150 يعطي $x=10$ أو $x=-15$: الضلعان 10 و15.',
            'Areas and products give quadratic equations. If two solutions come out, study both: a length or an age cannot be negative. A rectangle with sides $x$ and $x+5$ and area 150 gives $x=10$ or $x=-15$: the sides are 10 and 15.'
        ),
        examplePrompt: say('Zenbaki bat gehi haren karratua 56 da. Zein zenbaki da?', 'Un número más su cuadrado da 56. ¿Qué número es?', 'عدد زائد مربعه يساوي 56. ما العدد؟', 'A number plus its square is 56. What is the number?'),
        example: same('$\\begin{gathered}x^{2}+x-56=0\\\\ \\to\\ x=\\frac{-1\\pm 15}{2}\\\\ \\to\\ x=7,\\ x=-8\\end{gathered}$'),
        exampleAnswer: say('7 edo $-8$: hemen biek balio dute, zenbaki bat negatiboa izan daitekeelako.', '7 o $-8$: aquí sirven las dos, porque un número puede ser negativo.', '7 أو $-8$: هنا يصلح الحلّان لأن العدد يمكن أن يكون سالبًا.', '7 or $-8$: here both work, because a number can be negative.')
    },
    'system-problems': {
        vocabulary: [
            say('baldintzak', 'condiciones', 'الشرطين', 'conditions'),
            say('ezezagunak', 'desconocidas', 'المجهولتين', 'unknown'),
            say('egiaztatu', 'comprueba', 'تحقق', 'check')
        ],
        explanation: say(
            'Bi kopuru ezezagun eta bi baldintza badaude, deitu $x$ eta $y$ kopuruei eta idatzi ekuazio bat baldintza bakoitzeko: oiloetan eta untxietan, buruak eta hankak, $x+y=20$ eta $2x+4y=56$. Amaieran, erantzun hitzez eta egiaztatu bi baldintzak.',
            'Si hay dos cantidades desconocidas y dos condiciones, llama $x$ e $y$ a las cantidades y escribe una ecuación por cada condición: en las gallinas y conejos, las cabezas y las patas, $x+y=20$ y $2x+4y=56$. Al final, responde con palabras y comprueba las dos condiciones.',
            'إذا كانت هناك كميتان مجهولتان وشرطان فسمِّ الكميتين $x$ و$y$ واكتب معادلة لكل شرط: في الدجاج والأرانب الرؤوس والأرجل، $x+y=20$ و$2x+4y=56$. وفي النهاية أجب بالكلمات وتحقق من الشرطين.',
            'If there are two unknown amounts and two conditions, call the amounts $x$ and $y$ and write one equation for each condition: with chickens and rabbits, heads and legs, $x+y=20$ and $2x+4y=56$. At the end, answer in words and check both conditions.'
        ),
        examplePrompt: say('Ogitarteko batek eta zuku batek 5 € balio dute; bi ogitartekok eta hiru zukuk, 12 €. Zenbat balio du bakoitzak?', 'Un bocadillo y un zumo cuestan 5 €; dos bocadillos y tres zumos, 12 €. ¿Cuánto cuesta cada cosa?', 'شطيرة وعصير ثمنهما 5 €، وشطيرتان وثلاثة عصائر 12 €. كم ثمن كل منهما؟', 'A sandwich and a juice cost €5; two sandwiches and three juices, €12. How much is each?'),
        example: same('$\\begin{gathered}x+y=5,\\ 2x+3y=12\\\\ \\to\\ y=2,\\ x=3\\end{gathered}$'),
        exampleAnswer: say('Ogitartekoa 3 € eta zukua 2 €: $3+2=5$ eta $2\\cdot 3+3\\cdot 2=12$.', 'El bocadillo, 3 €, y el zumo, 2 €: $3+2=5$ y $2\\cdot 3+3\\cdot 2=12$.', 'الشطيرة 3 € والعصير 2 €: ‏$3+2=5$ و$2\\cdot 3+3\\cdot 2=12$.', 'The sandwich, €3, and the juice, €2: $3+2=5$ and $2\\cdot 3+3\\cdot 2=12$.')
    }
}

import type { LessonTexts, LocalizedText } from '../../features/unit-v2/types.ts'
import type { BachSystemsTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Ekuazio-sistemak · Batxilergoa 1 · Zientziak — what each lesson tells:
   the new words (definitions), a short explanation, the example as an
   exercise («Another example»), the key words in four languages and, in
   four lessons, «Why does it work?». Plain data so the tests can import
   it; lessons.tsx merges it into the topics. The example uses numbers of
   its own, never those of «Let's solve», of «Check it» or of the typical
   mistake. An impossible row is written with its letters (0z = 5), never
   as 0 = 5 inside a formula: the tests check every equality of numbers.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const bachSystemsLessonTexts: Record<BachSystemsTopicId, LessonTexts> = {
    /* ---------- 1. Linear systems ---------- */
    'linear-equations': {
        definitions: [
            { term: say('Ekuazio lineala', 'Ecuación lineal', 'المعادلة الخطية', 'Linear equation'), meaning: say('Ezezagun bakoitza 1 berretzailearekin eta beste batez biderkatu gabe agertzen den ekuazioa: $2x-y+3z=4$.', 'Una ecuación en la que cada incógnita aparece con exponente 1 y sin multiplicarse por otra: $2x-y+3z=4$.', 'معادلة يظهر فيها كل مجهول بأس 1 ودون أن يُضرب في مجهول آخر: $2x-y+3z=4$.', 'An equation in which each unknown has exponent 1 and is not multiplied by another one: $2x-y+3z=4$.') },
            { term: say('Hirukotea', 'Terna', 'الثلاثية', 'Triple'), meaning: say('Ordenan dauden hiru zenbaki, $(x,y,z)$; soluzio gisa, ekuazio guztiak betetzen dituzte aldi berean.', 'Tres números en orden, $(x,y,z)$; como solución, cumplen a la vez todas las ecuaciones.', 'ثلاثة أعداد مرتبة $(x,y,z)$؛ وإذا كانت حلًّا حققت كل المعادلات معًا.', 'Three numbers in order, $(x,y,z)$; as a solution, they satisfy every equation at once.') }
        ],
        vocabulary: [
            say('koefizientea', 'coeficiente', 'المعامل', 'coefficient'),
            say('gai askea', 'término independiente', 'الحد الثابت', 'constant term'),
            say('ezezaguna', 'incógnita', 'المجهول', 'unknown')
        ],
        explanation: say(
            'Ekuazio lineal batean, ezezagun bakoitza zenbaki batez biderkatuta dago, bere koefizienteaz, eta gai askea eskuinean geratzen da. Bi ezezagun edo gehiagoko ekuazio batek infinitu soluzio ditu. Sistema batek zenbait ekuazio biltzen ditu, eta haren soluzioak denak bete behar ditu: hiru ezezagunekin, hirukote bat da, $(x,y,z)$.',
            'En una ecuación lineal, cada incógnita va multiplicada por un número, su coeficiente, y el término independiente queda a la derecha. Una ecuación con dos o más incógnitas tiene infinitas soluciones. Un sistema reúne varias ecuaciones, y su solución tiene que cumplirlas todas: con tres incógnitas, es una terna $(x,y,z)$.',
            'في المعادلة الخطية يُضرب كل مجهول في عدد هو معامله، ويبقى الحد الثابت في اليمين. وللمعادلة ذات المجهولين أو أكثر عدد لا نهائي من الحلول. ويجمع النظام عدة معادلات، ويجب أن يحققها حله كلها: مع ثلاثة مجاهيل يكون الحل ثلاثية $(x,y,z)$.',
            'In a linear equation, each unknown is multiplied by a number, its coefficient, and the constant term stays on the right. An equation in two or more unknowns has infinitely many solutions. A system brings several equations together, and its solution has to satisfy all of them: with three unknowns, it is a triple $(x,y,z)$.'
        ),
        examplePrompt: say('$(3,-1,2)$ hirukoteak betetzen al ditu $x-y+2z=8$ eta $2x+y-z=3$?', '¿Cumple la terna $(3,-1,2)$ las ecuaciones $x-y+2z=8$ y $2x+y-z=3$?', 'هل تحقق الثلاثية $(3,-1,2)$ المعادلتين $x-y+2z=8$ و$2x+y-z=3$؟', 'Does the triple $(3,-1,2)$ satisfy $x-y+2z=8$ and $2x+y-z=3$?'),
        example: same('$3-(-1)+2\\cdot 2=8\\qquad 2\\cdot 3+(-1)-2=3$'),
        exampleAnswer: say('Bai: bi ekuazioak betetzen ditu.', 'Sí: cumple las dos ecuaciones.', 'نعم: تحقق المعادلتين.', 'Yes: it satisfies both equations.')
    },
    'classify-systems': {
        definitions: [
            { term: say('Sistema bateragarria', 'Sistema compatible', 'النظام المتوافق', 'Consistent system'), meaning: say('Soluzioren bat duen sistema: determinatua, soluzio bakarra badu; indeterminatua, infinitu baditu.', 'Un sistema que tiene alguna solución: determinado si tiene una sola, indeterminado si tiene infinitas.', 'نظام له حل واحد على الأقل: محدد إذا كان له حل واحد، وغير محدد إذا كان له ما لا نهاية من الحلول.', 'A system that has some solution: independent if it has exactly one, dependent if it has infinitely many.') },
            { term: say('Sistema bateraezina', 'Sistema incompatible', 'النظام غير المتوافق', 'Inconsistent system'), meaning: say('Soluziorik ez duen sistema.', 'Un sistema que no tiene ninguna solución.', 'نظام ليس له أي حل.', 'A system that has no solution at all.') }
        ],
        vocabulary: [
            say('zuzen paraleloak', 'rectas paralelas', 'مستقيمان متوازيان', 'parallel lines'),
            say('ebaki-puntua', 'punto de corte', 'نقطة التقاطع', 'crossing point')
        ],
        explanation: say(
            'Bi ezezaguneko ekuazio lineal bakoitza zuzen bat da, eta sistemaren soluzioa haien zati komuna. Ebakitzen badira, ebaki-puntu bat dago: soluzio bat. Zuzen paraleloak badira, bat ere ez. Bat badatoz, haien puntu guztiek balio dute. Koefizienteek marraztu gabe esaten dute: $\\frac{a_1}{a_2}\\neq\\frac{b_1}{b_2}$ bada, zuzenak ebakitzen dira.',
            'Cada ecuación lineal con dos incógnitas es una recta, y la solución del sistema es lo que tienen en común. Si se cortan, hay un punto de corte: una solución. Si son rectas paralelas, no hay ninguno. Si coinciden, valen todos sus puntos. Los coeficientes lo dicen sin dibujar: con $\\frac{a_1}{a_2}\\neq\\frac{b_1}{b_2}$, las rectas se cortan.',
            'كل معادلة خطية بمجهولين مستقيم، وحل النظام هو ما يشتركان فيه. إذا تقاطعا فهناك نقطة تقاطع: حل واحد. وإذا كانا مستقيمين متوازيين فلا حل. وإذا انطبقا صلحت كل نقاطهما. والمعاملات تخبرنا بذلك دون رسم: إذا كان $\\frac{a_1}{a_2}\\neq\\frac{b_1}{b_2}$ تقاطع المستقيمان.',
            'Each linear equation in two unknowns is a straight line, and the solution of the system is what they have in common. If they cross, there is one crossing point: one solution. If they are parallel lines, there is none. If they coincide, all their points work. The coefficients tell you without drawing: if $\\frac{a_1}{a_2}\\neq\\frac{b_1}{b_2}$, the lines cross.'
        ),
        examplePrompt: say('Sailkatu $\\begin{cases}x+3y=4\\\\ 2x+6y=8\\end{cases}$ sistema.', 'Clasifica el sistema $\\begin{cases}x+3y=4\\\\ 2x+6y=8\\end{cases}$.', 'صنّف النظام $\\begin{cases}x+3y=4\\\\ 2x+6y=8\\end{cases}$.', 'Classify the system $\\begin{cases}x+3y=4\\\\ 2x+6y=8\\end{cases}$.'),
        example: same('$2E_1\\ \\to\\ 2x+6y=8$'),
        exampleAnswer: say('Bigarrena lehenaren bikoitza da: zuzenak bat datoz, bateragarri indeterminatua.', 'La segunda es el doble de la primera: rectas coincidentes, compatible indeterminado.', 'الثانية ضعف الأولى: المستقيمان منطبقان، والنظام متوافق غير محدد.', 'The second is twice the first: the lines coincide, consistent and dependent.')
    },
    'equivalent-systems': {
        definitions: [
            { term: say('Sistema baliokideak', 'Sistemas equivalentes', 'الأنظمة المتكافئة', 'Equivalent systems'), meaning: say('Soluzio berberak dituzten bi sistema, nahiz eta haien ekuazioak desberdinak izan.', 'Dos sistemas con las mismas soluciones, aunque sus ecuaciones sean distintas.', 'نظامان لهما الحلول نفسها وإن اختلفت معادلاتهما.', 'Two systems with the same solutions, even if their equations are different.') }
        ],
        vocabulary: [
            say('trukatu', 'intercambiar', 'مبادلة', 'swap'),
            say('multiploa', 'múltiplo', 'مضاعف', 'multiple')
        ],
        explanation: say(
            'Sistema bat ebaztea gero eta sinpleagoak diren beste sistema baliokide batzuetan bihurtzea da, soluzioa zuzenean irakurtzen den arte. Hiru eragiketak ez dituzte soluzioak aldatzen: bi ekuazio trukatzeak, ekuazio bat 0 ez den zenbaki batez biderkatzeak eta ekuazio bat hura bera gehi beste baten multiplo batez ordezteak. Laburketa-metodoak hori egiten du.',
            'Resolver un sistema es cambiarlo por otros equivalentes cada vez más sencillos, hasta que la solución se lee directamente. Hay tres operaciones que no cambian las soluciones: intercambiar dos ecuaciones, multiplicar una ecuación por un número distinto de 0 y sustituir una ecuación por ella más un múltiplo de otra. Es lo que hace el método de reducción.',
            'حل النظام هو تحويله إلى أنظمة مكافئة أبسط فأبسط حتى يُقرأ الحل مباشرة. وثلاث عمليات لا تغيّر الحلول: مبادلة معادلتين، وضرب معادلة في عدد غير 0، واستبدال معادلة بها مضافًا إليها مضاعف معادلة أخرى. وهذا ما تفعله طريقة الحذف.',
            'Solving a system means changing it into simpler and simpler equivalent ones until the solution can be read off. Three operations do not change the solutions: swapping two equations, multiplying an equation by a number other than 0, and replacing an equation by itself plus a multiple of another one. That is what the elimination method does.'
        ),
        examplePrompt: say('Sinplifikatu $\\begin{cases}3x-y=7\\\\ x+2y=7\\end{cases}$ sistema $E_1-3E_2$ eragiketarekin, eta ebatzi.', 'Simplifica $\\begin{cases}3x-y=7\\\\ x+2y=7\\end{cases}$ con $E_1-3E_2$ y resuélvelo.', 'بسّط $\\begin{cases}3x-y=7\\\\ x+2y=7\\end{cases}$ بالعملية $E_1-3E_2$ ثم حُلّه.', 'Simplify $\\begin{cases}3x-y=7\\\\ x+2y=7\\end{cases}$ with $E_1-3E_2$ and solve it.'),
        example: same('$-7y=-14\\ \\to\\ y=2,\\ x=3$'),
        exampleAnswer: say('Soluzioa: $x=3$, $y=2$.', 'Solución: $x=3$, $y=2$.', 'الحل: $x=3$ و$y=2$.', 'Solution: $x=3$, $y=2$.'),
        why: {
            text: say(
                'Zergatik ez dira soluzioak aldatzen? Bikote batek $E_1$ eta $E_2$ betetzen baditu, $E_2+kE_1$ ere betetzen du, berdintza egiazkoak batzen baitira. Eta alderantziz: $E_1$ eta $E_2+kE_1$ ekuazioetatik $E_2$ itzultzen da, $kE_1$ kenduta. Horregatik dago debekatuta 0 zenbakiaz biderkatzea: ezin da desegin.',
                '¿Por qué no cambian las soluciones? Si un par cumple $E_1$ y $E_2$, también cumple $E_2+kE_1$, porque se suman igualdades ciertas. Y al revés: de $E_1$ y $E_2+kE_1$ se vuelve a $E_2$ restando $kE_1$. Por eso multiplicar por 0 está prohibido: no se puede deshacer.',
                'لماذا لا تتغير الحلول؟ إذا حقق زوج $E_1$ و$E_2$ فإنه يحقق $E_2+kE_1$ أيضًا، لأننا نجمع مساواتين صحيحتين. والعكس: من $E_1$ و$E_2+kE_1$ نعود إلى $E_2$ بطرح $kE_1$. ولهذا يُمنع الضرب في 0: لا يمكن الرجوع عنه.',
                'Why do the solutions not change? If a pair satisfies $E_1$ and $E_2$, it also satisfies $E_2+kE_1$, because true equalities are being added. And the other way round: from $E_1$ and $E_2+kE_1$ you get back to $E_2$ by subtracting $kE_1$. That is why multiplying by 0 is not allowed: it cannot be undone.'
            ),
            math: same('$(2\\cdot 2+3\\cdot 3)-2\\cdot(2+3)=13-2\\cdot 5$')
        }
    },

    /* ---------- 2. Gaussian elimination ---------- */
    'triangular-systems': {
        definitions: [
            { term: say('Sistema mailakatua', 'Sistema escalonado', 'النظام الدرجي', 'Triangular system'), meaning: say('Ekuazio bakoitzak aurrekoak baino ezezagun bat gutxiago, gutxienez, duen sistema, eskailera baten mailak bezala.', 'Un sistema en el que cada ecuación tiene al menos una incógnita menos que la anterior, como los peldaños de una escalera.', 'نظام تنقص فيه كل معادلة مجهولًا واحدًا على الأقل عن التي قبلها، كدرجات السلم.', 'A system in which each equation has at least one unknown fewer than the one before, like the steps of a staircase.') }
        ],
        vocabulary: [
            say('ordeztu', 'sustituir', 'عوّض', 'substitute'),
            say('askatu', 'despejar', 'العزل', 'solve for')
        ],
        explanation: say(
            'Sistema mailakatu bat ia ebatzita dago: azken ekuazioak ezezagun bakarra du. Hura askatzen da, haren balioa goiko ekuazioan ordezten da —orduan hark ere ezezagun bakarra du—, eta horrela lehenengora arte. Gaussen metodoak edozein sistema forma horretara eramaten du.',
            'Un sistema escalonado ya está casi resuelto: la última ecuación tiene una sola incógnita. Se despeja, se sustituye su valor en la ecuación de encima —que entonces también tiene una sola incógnita— y así hasta la primera. El método de Gauss consiste en llevar cualquier sistema a esta forma.',
            'النظام الدرجي شبه محلول: في المعادلة الأخيرة مجهول واحد. نعزله ونعوّض قيمته في المعادلة التي فوقها —فيصير فيها مجهول واحد أيضًا— وهكذا حتى الأولى. وطريقة غاوس تحوّل أي نظام إلى هذا الشكل.',
            'A triangular system is almost solved: the last equation has only one unknown. You solve for it, substitute its value into the equation above —which then also has only one unknown— and so on up to the first. Gaussian elimination brings any system to this form.'
        ),
        examplePrompt: say('Ebatzi $\\begin{cases}2x-y+z=3\\\\ 3y+z=11\\\\ 4z=8\\end{cases}$.', 'Resuelve $\\begin{cases}2x-y+z=3\\\\ 3y+z=11\\\\ 4z=8\\end{cases}$.', 'حُلّ $\\begin{cases}2x-y+z=3\\\\ 3y+z=11\\\\ 4z=8\\end{cases}$.', 'Solve $\\begin{cases}2x-y+z=3\\\\ 3y+z=11\\\\ 4z=8\\end{cases}$.'),
        example: same('$\\begin{gathered}z=2\\\\ 3y+2=11\\ \\to\\ y=3\\\\ 2x-3+2=3\\ \\to\\ x=2\\end{gathered}$'),
        exampleAnswer: say('$x=2$, $y=3$, ${z}=2$.', '$x=2$, $y=3$, ${z}=2$.', '$x=2$ و$y=3$ و${z}=2$.', '$x=2$, $y=3$, ${z}=2$.')
    },
    'gauss-method': {
        definitions: [
            { term: say('Gaussen metodoa', 'Método de Gauss', 'طريقة غاوس', 'Gaussian elimination'), meaning: say('Sistema baliokideen eragiketekin diagonalaren azpian zeroak egitea, sistema mailakatuta geratu arte.', 'Hacer ceros por debajo de la diagonal con las operaciones de los sistemas equivalentes hasta que el sistema queda escalonado.', 'جعل ما تحت القطر أصفارًا بعمليات الأنظمة المتكافئة حتى يصير النظام درجيًّا.', 'Making zeros below the diagonal with the operations of equivalent systems until the system is triangular.') }
        ],
        vocabulary: [
            say('diagonala', 'diagonal', 'القطر', 'diagonal'),
            say('kendu', 'quitar', 'حذف', 'remove')
        ],
        explanation: say(
            'Lehenik, $x$ duen ekuazio bat aukeratzen da, eta besteetatik $x$ kentzeko erabiltzen da, haren multiplo bat batuta. Gero, geratzen diren ekuazioekin, $y$ kentzen da. Koefizientea 1 bada, dena errazagoa da: horregatik komeni da lehenik $x$ zenbakiarekin hasten den ekuazio bat jartzea. Bukaeran, sistema mailakatuta geratzen da.',
            'Primero se elige una ecuación con $x$ y se usa para quitar la $x$ de las demás, sumándoles un múltiplo suyo. Después, con las ecuaciones que quedan, se quita la $y$. Si el coeficiente es 1, todo es más fácil: por eso conviene poner primero una ecuación que empiece por $x$. Al final, el sistema queda escalonado.',
            'أولًا نختار معادلة فيها $x$ ونستعملها لحذف $x$ من البقية بإضافة مضاعف لها. ثم نحذف $y$ بالمعادلات الباقية. وإذا كان المعامل 1 كان كل شيء أسهل: لذلك يُستحسن أن نضع أولًا معادلة تبدأ بـ $x$. وفي النهاية يصير النظام درجيًّا.',
            'First you choose an equation with $x$ and use it to remove the $x$ from the others, adding a multiple of it. Then, with the equations left, you remove the $y$. If the coefficient is 1, everything is easier: that is why it pays to put first an equation that starts with $x$. In the end, the system is triangular.'
        ),
        examplePrompt: say('Ebatzi Gaussen metodoaz $\\begin{cases}x-y+z=2\\\\ x+y+2z=5\\\\ 2x+y-z=4\\end{cases}$.', 'Resuelve por Gauss $\\begin{cases}x-y+z=2\\\\ x+y+2z=5\\\\ 2x+y-z=4\\end{cases}$.', 'حُلّ بطريقة غاوس $\\begin{cases}x-y+z=2\\\\ x+y+2z=5\\\\ 2x+y-z=4\\end{cases}$.', 'Solve by Gaussian elimination $\\begin{cases}x-y+z=2\\\\ x+y+2z=5\\\\ 2x+y-z=4\\end{cases}$.'),
        example: same('$\\begin{gathered}2y+z=3\\\\ 3y-3z=0\\\\ -9z=-9\\ \\to\\ z=1,\\ y=1,\\ x=2\\end{gathered}$'),
        exampleAnswer: say('$E_2-E_1$, $E_3-2E_1$ eta $2E_3-3E_2$ eginda: $x=2$, $y=1$, ${z}=1$.', 'Con $E_2-E_1$, $E_3-2E_1$ y $2E_3-3E_2$: $x=2$, $y=1$, ${z}=1$.', 'بالعمليات $E_2-E_1$ و$E_3-2E_1$ و$2E_3-3E_2$: $x=2$ و$y=1$ و${z}=1$.', 'With $E_2-E_1$, $E_3-2E_1$ and $2E_3-3E_2$: $x=2$, $y=1$, ${z}=1$.')
    },
    'augmented-matrix': {
        definitions: [
            { term: say('Matrize zabaldua', 'Matriz ampliada', 'المصفوفة الموسعة', 'Augmented matrix'), meaning: say('Sistemaren koefizienteen taula, zutabe bat gehiagorekin, marra batez bereizia, gai askeentzat.', 'La tabla de los coeficientes del sistema, con una columna más, separada por una barra, para los términos independientes.', 'جدول معاملات النظام مع عمود إضافي، يفصله خط، للحدود الثابتة.', 'The table of the coefficients of the system, with one more column, after a bar, for the constant terms.') }
        ],
        vocabulary: [
            say('errenkada', 'fila', 'الصف', 'row'),
            say('zutabea', 'columna', 'العمود', 'column')
        ],
        explanation: say(
            'Gaussen metodoan, ezezagunak ez dira tokiz aldatzen: zenbakiak bakarrik aldatzen dira. Horregatik, aski da matrize zabaldua idaztea: errenkada bat ekuazio bakoitzeko, $x$, $y$ eta ${z}$ ezezagunen koefizienteak zutabeetan eta gai askeak marraren ondoren. Ekuazioekiko eragiketak errenkadekiko eragiketak dira orain.',
            'Al hacer Gauss, las incógnitas no cambian de sitio: solo cambian los números. Por eso basta escribir la matriz ampliada: una fila por ecuación, con los coeficientes de $x$, $y$ y ${z}$ en columnas y los términos independientes tras la barra. Las operaciones con ecuaciones son ahora operaciones con filas.',
            'في طريقة غاوس لا تتغير أماكن المجاهيل، بل الأعداد فقط. لذلك تكفي كتابة المصفوفة الموسعة: صف لكل معادلة، ومعاملات $x$ و$y$ و${z}$ في أعمدة، والحدود الثابتة بعد الخط. وتصير العمليات على المعادلات عمليات على الصفوف.',
            'In Gaussian elimination, the unknowns never move: only the numbers change. So it is enough to write the augmented matrix: one row per equation, with the coefficients of $x$, $y$ and ${z}$ in columns and the constant terms after the bar. Operations on equations are now operations on rows.'
        ),
        examplePrompt: say('Idatzi $\\begin{cases}2x+z=5\\\\ x-3y=4\\\\ y+z=0\\end{cases}$ sistemaren matrize zabaldua.', 'Escribe la matriz ampliada de $\\begin{cases}2x+z=5\\\\ x-3y=4\\\\ y+z=0\\end{cases}$.', 'اكتب المصفوفة الموسعة للنظام $\\begin{cases}2x+z=5\\\\ x-3y=4\\\\ y+z=0\\end{cases}$.', 'Write the augmented matrix of $\\begin{cases}2x+z=5\\\\ x-3y=4\\\\ y+z=0\\end{cases}$.'),
        example: same('$\\left(\\begin{array}{ccc|c}2&0&1&5\\\\ 1&-3&0&4\\\\ 0&1&1&0\\end{array}\\right)$'),
        exampleAnswer: say('Ezezagun bat falta denean, haren koefizientea 0 da.', 'Donde falta una incógnita, su coeficiente es 0.', 'حيث يغيب مجهول يكون معامله 0.', 'Where an unknown is missing, its coefficient is 0.')
    },
    'three-unknown-problems': {
        definitions: [
            { term: say('Planteatu', 'Plantear', 'صياغة المسألة', 'Set up'), meaning: say('Enuntziatua ekuazioetara itzultzea: datu bakoitzak ezezagunen arteko ekuazio bat ematen du.', 'Traducir el enunciado a ecuaciones: cada dato da una ecuación entre las incógnitas.', 'ترجمة نص المسألة إلى معادلات: كل معطى يعطي معادلة بين المجاهيل.', 'Translating the statement into equations: each piece of data gives an equation between the unknowns.') }
        ],
        vocabulary: [
            say('datua', 'dato', 'المعطى', 'data'),
            say('egiaztatu', 'comprobar', 'تحقق', 'check')
        ],
        explanation: say(
            'Lehenik, ezezagunak aukeratzen dira eta bakoitza zer den idazten da. Gero, enuntziatuaren datu bakoitza ekuazio batera itzultzen da: guztizkoa, kopurua edo haien arteko erlazio bat («bikoitza», «beste hainbeste»). Sistema Gaussen metodoaz ebazten da, eta soluzioa enuntziatuarekin egiaztatzen da, ez ekuazioekin bakarrik.',
            'Primero se eligen las incógnitas y se escribe qué es cada una. Después cada dato del enunciado se traduce en una ecuación: un total, una cantidad o una relación entre ellas («el doble», «tantas como»). El sistema se resuelve por Gauss y hay que comprobar la solución con el enunciado, no solo con las ecuaciones.',
            'أولًا نختار المجاهيل ونكتب ما يمثله كل منها. ثم نترجم كل معطى في النص إلى معادلة: مجموع أو كمية أو علاقة بينها («الضعف»، «بقدر»). نحل النظام بطريقة غاوس ونتحقق من الحل بنص المسألة لا بالمعادلات فقط.',
            'First you choose the unknowns and write down what each one is. Then each piece of data in the statement becomes an equation: a total, an amount or a relation between them («twice», «as many as»). The system is solved by Gaussian elimination and the solution is checked against the statement, not only against the equations.'
        ),
        examplePrompt: say('Hiru kutxatxok 60 € dituzte guztira. Bigarrenak lehenaren bikoitza du, eta hirugarrenak lehenak baino 4 € gehiago. Zenbat du lehenak?', 'Tres huchas tienen 60 € entre las tres. La segunda tiene el doble que la primera, y la tercera 4 € más que la primera. ¿Cuánto tiene la primera?', 'في ثلاث حصالات 60 € معًا. في الثانية ضعف ما في الأولى، وفي الثالثة 4 € أكثر من الأولى. كم في الأولى؟', 'Three money boxes hold €60 between them. The second has twice as much as the first, and the third has €4 more than the first. How much does the first hold?'),
        example: same('$\\begin{cases}x+y+z=60\\\\ y=2x\\\\ z=x+4\\end{cases}\\ \\to\\ 4x+4=60$'),
        exampleAnswer: say('Lehenak 14 € ditu; bigarrenak, 28 €; eta hirugarrenak, 18 €.', 'La primera tiene 14 €, la segunda 28 € y la tercera 18 €.', 'في الأولى 14 € وفي الثانية 28 € وفي الثالثة 18 €.', 'The first holds €14, the second €28 and the third €18.')
    },

    /* ---------- 3. Analysing a system ---------- */
    'solutions-count': {
        definitions: [
            { term: say('Sistema bat eztabaidatzea', 'Discutir un sistema', 'مناقشة نظام', 'Analysing a system'), meaning: say('Bateragarri determinatua, bateragarri indeterminatua edo bateraezina den esatea, ebatzi beharrik gabe.', 'Decir si es compatible determinado, compatible indeterminado o incompatible, sin necesidad de resolverlo.', 'قول هل هو متوافق محدد أو متوافق غير محدد أو غير متوافق، دون حاجة إلى حله.', 'Saying whether it is consistent and independent, consistent and dependent, or inconsistent, without having to solve it.') }
        ],
        vocabulary: [
            say('bateragarria', 'compatible', 'متوافق', 'consistent'),
            say('bateraezina', 'incompatible', 'غير متوافق', 'inconsistent')
        ],
        explanation: say(
            'Mailakatzean, azken errenkadak erabakitzen du. ${z}$ duen ekuazio bat geratzen bada, $3z=6$ bezala, ${z}$ askatzen da eta soluzio bakarra dago. $0z=0$ geratzen bada, ekuazio hori soberan dago: ezezagun gehiago daude ekuazio baliagarriak baino, eta soluzioak infinituak dira. $0z=5$ geratzen bada, ez dago hura betetzen duen zenbakirik: ez dago soluziorik.',
            'Al escalonar, la última fila decide. Si queda una ecuación con ${z}$, como $3z=6$, se despeja ${z}$ y hay una sola solución. Si queda $0z=0$, esa ecuación sobra: hay más incógnitas que ecuaciones útiles y las soluciones son infinitas. Si queda $0z=5$, ningún número la cumple: no hay solución.',
            'عند التحويل إلى الشكل الدرجي يحسم الصف الأخير الأمر. إذا بقيت معادلة فيها ${z}$ مثل $3z=6$ عزلنا ${z}$ وكان هناك حل واحد. وإذا بقي $0z=0$ فتلك المعادلة زائدة: المجاهيل أكثر من المعادلات المفيدة والحلول لا نهائية. وإذا بقي $0z=5$ فلا عدد يحققها: لا حل.',
            'When you make the system triangular, the last row decides. If an equation with ${z}$ is left, such as $3z=6$, you solve for ${z}$ and there is exactly one solution. If $0z=0$ is left, that equation is spare: there are more unknowns than useful equations and the solutions are infinite. If $0z=5$ is left, no number satisfies it: there is no solution.'
        ),
        examplePrompt: say('Eztabaidatu $\\begin{cases}x-y+z=1\\\\ 2x+y-z=5\\\\ 4x-y+z=7\\end{cases}$.', 'Discute $\\begin{cases}x-y+z=1\\\\ 2x+y-z=5\\\\ 4x-y+z=7\\end{cases}$.', 'ناقش $\\begin{cases}x-y+z=1\\\\ 2x+y-z=5\\\\ 4x-y+z=7\\end{cases}$.', 'Analyse $\\begin{cases}x-y+z=1\\\\ 2x+y-z=5\\\\ 4x-y+z=7\\end{cases}$.'),
        example: same('$\\begin{gathered}3y-3z=3\\\\ 3y-3z=3\\ \\to\\ 0z=0\\end{gathered}$'),
        exampleAnswer: say('$E_2-2E_1$ eta $E_3-4E_1$ berdinak dira: errenkada bat soberan dago, bateragarri indeterminatua.', '$E_2-2E_1$ y $E_3-4E_1$ son iguales: una fila sobra, compatible indeterminado.', '$E_2-2E_1$ و$E_3-4E_1$ متساويتان: صف زائد، والنظام متوافق غير محدد.', '$E_2-2E_1$ and $E_3-4E_1$ are the same: one row is spare, consistent and dependent.'),
        why: {
            text: say(
                'Zergatik ematen ditu $0z=0$ errenkadak infinitu soluzio? Ekuazio hori edozein ${z}$ zenbakirekin betetzen da. Hiru ezezagunentzat bi ekuazio baliagarri geratzen dira: ${z}$ libreki aukeratzen da, eta beste biek $y$ eta $x$ ematen dituzte. ${z}$ balio bakoitzak soluzio desberdin bat ematen du.',
                '¿Por qué $0z=0$ da infinitas soluciones? Esa ecuación se cumple con cualquier ${z}$. Quedan dos ecuaciones útiles para tres incógnitas: se elige ${z}$ libremente y las otras dos dan $y$ y $x$. Cada valor de ${z}$ da una solución distinta.',
                'لماذا يعطي $0z=0$ ما لا نهاية من الحلول؟ تتحقق هذه المعادلة مع أي ${z}$. فتبقى معادلتان مفيدتان لثلاثة مجاهيل: نختار ${z}$ بحرية، وتعطي المعادلتان الأخريان $y$ و$x$. وكل قيمة لـ ${z}$ تعطي حلًّا مختلفًا.',
                'Why does $0z=0$ give infinitely many solutions? That equation holds for any ${z}$. Two useful equations are left for three unknowns: you choose ${z}$ freely and the other two give $y$ and $x$. Each value of ${z}$ gives a different solution.'
            ),
            math: same('$0\\cdot 5=0\\qquad 0\\cdot(-2)=0$')
        }
    },
    'parametric-solutions': {
        definitions: [
            { term: say('Parametroa', 'Parámetro', 'الوسيط', 'Parameter'), meaning: say('Edozein balio erreal har dezakeen letra bat, $\\lambda$ bezala; balio bakoitzak sistemaren soluzio bat ematen du.', 'Una letra, como $\\lambda$, que puede tomar cualquier valor real; cada valor da una solución del sistema.', 'حرف مثل $\\lambda$ يأخذ أي قيمة حقيقية؛ وكل قيمة تعطي حلًّا للنظام.', 'A letter, such as $\\lambda$, that can take any real value; each value gives a solution of the system.') },
            { term: say('Soluzio orokorra', 'Solución general', 'الحل العام', 'General solution'), meaning: say('Soluzio guztiak parametroarekin idatzita, $(2+\\lambda,\\ \\lambda,\\ 1)$ bezala.', 'Todas las soluciones escritas con el parámetro, como $(2+\\lambda,\\ \\lambda,\\ 1)$.', 'كل الحلول مكتوبة بالوسيط، مثل $(2+\\lambda,\\ \\lambda,\\ 1)$.', 'All the solutions written with the parameter, such as $(2+\\lambda,\\ \\lambda,\\ 1)$.') }
        ],
        vocabulary: [
            say('aske', 'libre', 'حر', 'free'),
            say('soluzio partikularra', 'solución particular', 'الحل الخاص', 'particular solution')
        ],
        explanation: say(
            'Sistema bateragarri indeterminatu batek infinitu soluzio ditu, baina ez edozein: denek arau bat jarraitzen dute. Ezezagun aske bat aukeratzen da, $\\lambda$ izena ematen zaio, eta besteak $\\lambda$ parametroaren funtzioan askatzen dira. $\\lambda$ parametroari balioak emanez, soluzio partikularrak ateratzen dira; bi ekuazio soberan badaude, bi parametro behar dira, $\\lambda$ eta $\\mu$.',
            'Un sistema compatible indeterminado tiene infinitas soluciones, pero no cualesquiera: todas siguen una regla. Se elige una incógnita libre, se le da el nombre $\\lambda$ y las demás se despejan en función de $\\lambda$. Al dar valores a $\\lambda$ salen soluciones particulares; si sobran dos ecuaciones, hacen falta dos parámetros, $\\lambda$ y $\\mu$.',
            'للنظام المتوافق غير المحدد عدد لا نهائي من الحلول، لكنها ليست أي حلول: كلها تتبع قاعدة. نختار مجهولًا حرًّا ونسميه $\\lambda$ ونعزل البقية بدلالة $\\lambda$. وبإعطاء قيم لـ $\\lambda$ نحصل على حلول خاصة؛ وإذا زادت معادلتان احتجنا إلى وسيطين $\\lambda$ و$\\mu$.',
            'A consistent dependent system has infinitely many solutions, but not just any: they all follow a rule. You choose a free unknown, give it the name $\\lambda$ and solve for the others in terms of $\\lambda$. Giving values to $\\lambda$ produces particular solutions; if two equations are spare, you need two parameters, $\\lambda$ and $\\mu$.'
        ),
        examplePrompt: say('Idatzi $\\begin{cases}x+2y-z=5\\\\ y+z=4\\end{cases}$ sistemaren soluzioak ${z}=\\lambda$ eginda, eta $\\lambda=1$ duena.', 'Escribe las soluciones de $\\begin{cases}x+2y-z=5\\\\ y+z=4\\end{cases}$ con ${z}=\\lambda$, y la que tiene $\\lambda=1$.', 'اكتب حلول $\\begin{cases}x+2y-z=5\\\\ y+z=4\\end{cases}$ مع ${z}=\\lambda$، والحل الذي فيه $\\lambda=1$.', 'Write the solutions of $\\begin{cases}x+2y-z=5\\\\ y+z=4\\end{cases}$ with ${z}=\\lambda$, and the one with $\\lambda=1$.'),
        example: same('$(-3+3\\lambda,\\ 4-\\lambda,\\ \\lambda)\\ \\to\\ (0,\\ 3,\\ 1)$'),
        exampleAnswer: say('$\\lambda=1$ denean: $x=0$, $y=3$, ${z}=1$.', 'Con $\\lambda=1$: $x=0$, $y=3$, ${z}=1$.', 'مع $\\lambda=1$: $x=0$ و$y=3$ و${z}=1$.', 'With $\\lambda=1$: $x=0$, $y=3$, ${z}=1$.'),
        why: {
            text: say(
                'Nola dakit denak ditudala? $(x,y,z)$ soluzio bat bada, haren ${z}$ zenbaki bat da: deitu $\\lambda$. Orduan, ekuazioek behartzen dute $y$ eta $x$ formulakoak izatera. Horrela, soluzio bakoitza $\\lambda$ batekin ateratzen da, eta $\\lambda$ bakoitzak soluzio bat ematen du.',
                '¿Cómo sé que las tengo todas? Si $(x,y,z)$ es una solución, su ${z}$ es algún número: llámalo $\\lambda$. Entonces las ecuaciones obligan a que $y$ y $x$ sean justo las de la fórmula. Así, cada solución sale con algún $\\lambda$, y cada $\\lambda$ da una solución.',
                'كيف أعرف أنني وجدتها كلها؟ إذا كان $(x,y,z)$ حلًّا فإن ${z}$ عدد ما: سمِّه $\\lambda$. عندئذ تفرض المعادلات أن يكون $y$ و$x$ كما في الصيغة تمامًا. فكل حل يأتي من $\\lambda$ ما، وكل $\\lambda$ يعطي حلًّا.',
                'How do I know I have them all? If $(x,y,z)$ is a solution, its ${z}$ is some number: call it $\\lambda$. Then the equations force $y$ and $x$ to be exactly the ones in the formula. So every solution comes from some $\\lambda$, and every $\\lambda$ gives a solution.'
            ),
            math: same('$(3-2)+1+2=4$')
        }
    },
    'parameter-discussion': {
        definitions: [
            { term: say('Balio kritikoa', 'Valor crítico', 'القيمة الحرجة', 'Critical value'), meaning: say('Zatitu beharko genukeen koefizientea 0 egiten duen parametroaren balioa; han, sistemak mota aldatzen du.', 'Un valor del parámetro que anula el coeficiente por el que habría que dividir; ahí el sistema cambia de tipo.', 'قيمة للوسيط تعدم المعامل الذي كنا سنقسم عليه؛ وعندها يتغير نوع النظام.', 'A value of the parameter that makes zero the coefficient you would have to divide by; there the system changes type.') }
        ],
        vocabulary: [
            say('zatitu', 'dividir', 'القسمة', 'divide'),
            say('aparte', 'aparte', 'على حدة', 'separately')
        ],
        explanation: say(
            'Koefizienteen artean $a$ letra bat duen sistema bat, egiaz, sistema desberdin bat da $a$ zenbakiaren balio bakoitzeko. Beti bezala mailakatzen da, ekuazio bat $(a-4)y=-1$ bezala geratu arte. Ezin da zuzenean zatitu: lehenik, $a-4$ anulatzen duen balioa bilatzen da eta aparte aztertzen da; beste balioetarako, soluzio bat dago.',
            'Un sistema con una letra $a$ entre los coeficientes es, en realidad, un sistema distinto para cada valor de $a$. Se escalona como siempre hasta que una ecuación queda como $(a-4)y=-1$. No se puede dividir sin más: primero se busca el valor que anula $a-4$ y se estudia aparte; para los demás valores, hay una solución.',
            'النظام الذي بين معاملاته حرف $a$ هو في الحقيقة نظام مختلف لكل قيمة من قيم $a$. نحوّله إلى الشكل الدرجي كالعادة حتى تبقى معادلة مثل $(a-4)y=-1$. ولا يمكن القسمة مباشرة: أولًا نبحث عن القيمة التي تعدم $a-4$ وندرسها على حدة؛ وفي القيم الأخرى يوجد حل واحد.',
            'A system with a letter $a$ among its coefficients is really a different system for each value of $a$. You make it triangular as usual until an equation looks like $(a-4)y=-1$. You cannot just divide: first you find the value that makes $a-4$ zero and study it separately; for the other values, there is one solution.'
        ),
        examplePrompt: say('Eztabaidatu $\\begin{cases}x-y=2\\\\ 3x+ay=6\\end{cases}$, $a$ zenbakiaren arabera.', 'Discute $\\begin{cases}x-y=2\\\\ 3x+ay=6\\end{cases}$ según $a$.', 'ناقش $\\begin{cases}x-y=2\\\\ 3x+ay=6\\end{cases}$ حسب $a$.', 'Analyse $\\begin{cases}x-y=2\\\\ 3x+ay=6\\end{cases}$ for the values of $a$.'),
        example: same('$E_2-3E_1\\ \\to\\ (a+3)y=0$'),
        exampleAnswer: say('$a=-3$ bada, bateragarri indeterminatua; $a\\neq -3$ bada, bateragarri determinatua, $x=2$ eta $y=0$ soluzioarekin.', 'Si $a=-3$, compatible indeterminado; si $a\\neq -3$, compatible determinado con $x=2$, $y=0$.', 'إذا كان $a=-3$ فالنظام متوافق غير محدد؛ وإذا كان $a\\neq -3$ فهو متوافق محدد وحله $x=2$ و$y=0$.', 'If $a=-3$, consistent and dependent; if $a\\neq -3$, consistent and independent with $x=2$, $y=0$.'),
        why: {
            text: say(
                'Zergatik aztertu behar da $a=4$ aparte? $y$ askatzeko $(a-4)y=-1$ ekuazioan, $a-4$ zenbakiaz zatitzen da, eta ezin da 0 zenbakiaz zatitu. $a=4$ denean, ekuazioak ez du $y$ ezezagunaz ezer esaten: $0y=-1$ da, ezinezkoa.',
                '¿Por qué hay que mirar aparte $a=4$? Para despejar $y$ en $(a-4)y=-1$ se divide entre $a-4$, y entre 0 no se puede dividir. Con $a=4$ la ecuación ya no habla de $y$: es $0y=-1$, imposible.',
                'لماذا ندرس $a=4$ على حدة؟ لعزل $y$ في $(a-4)y=-1$ نقسم على $a-4$، ولا تجوز القسمة على 0. ومع $a=4$ لا تعود المعادلة تتحدث عن $y$: إنها $0y=-1$، وهي مستحيلة.',
                'Why must $a=4$ be looked at separately? To solve for $y$ in $(a-4)y=-1$ you divide by $a-4$, and you cannot divide by 0. With $a=4$ the equation no longer says anything about $y$: it is $0y=-1$, which is impossible.'
            ),
            math: same('$(4-4)\\cdot 7=0$')
        }
    },

    /* ---------- 4. Non-linear systems ---------- */
    'nonlinear-substitution': {
        definitions: [
            { term: say('Sistema ez-lineala', 'Sistema no lineal', 'النظام غير الخطي', 'Non-linear system'), meaning: say('Ekuazioren bat lineala ez duen sistema: ezezagun bat karratura, $xy$ biderkadura, erro bat edo logaritmo bat.', 'Un sistema con alguna ecuación que no es lineal: una incógnita al cuadrado, un producto $xy$, una raíz o un logaritmo.', 'نظام فيه معادلة غير خطية: مجهول مربع أو جداء $xy$ أو جذر أو لوغاريتم.', 'A system with some equation that is not linear: an unknown squared, a product $xy$, a root or a logarithm.') }
        ],
        vocabulary: [
            say('faktorizatu', 'factorizar', 'التحليل', 'factorise'),
            say('ordeztu', 'sustituir', 'التعويض', 'substitute')
        ],
        explanation: say(
            'Laburketak eta berdinketak ez dute beti balio, baina ordezkapenak ia beti bai: ekuazio errazenean ezezagun bat askatzen da eta bestean ordezten da. Ezezagun bakarreko ekuazio bat ateratzen da, bigarren mailakoa edo handiagoa, faktorizatuz edo Ruffinirekin ebazten dena. Soluzio bakoitzak bi kurben ebaki-puntu bat ematen du.',
            'Los métodos de reducción e igualación no siempre sirven, pero la sustitución casi siempre: se despeja una incógnita en la ecuación más sencilla y se sustituye en la otra. Sale una ecuación con una sola incógnita, de grado 2 o más, que se resuelve al factorizar o con Ruffini. Cada solución da un punto de corte de las dos curvas.',
            'لا تصلح طريقتا الحذف والمساواة دائمًا، أما التعويض فيصلح في الغالب: نعزل مجهولًا في أبسط معادلة ونعوّضه في الأخرى. فتظهر معادلة بمجهول واحد من الدرجة الثانية أو أكثر، تُحل بالتحليل أو بروفيني. وكل حل يعطي نقطة تقاطع للمنحنيين.',
            'Elimination and equating do not always work, but substitution nearly always does: you solve the simplest equation for one unknown and substitute into the other. You get an equation in a single unknown, of degree 2 or more, that you solve when you factorise it or with Ruffini. Each solution gives a crossing point of the two curves.'
        ),
        examplePrompt: say('Ebatzi $\\begin{cases}x+y=5\\\\ xy=6\\end{cases}$.', 'Resuelve $\\begin{cases}x+y=5\\\\ xy=6\\end{cases}$.', 'حُلّ $\\begin{cases}x+y=5\\\\ xy=6\\end{cases}$.', 'Solve $\\begin{cases}x+y=5\\\\ xy=6\\end{cases}$.'),
        example: same('$x(5-x)=6\\ \\to\\ x^2-5x+6=0$'),
        exampleAnswer: say('Bi soluzio: $(2,3)$ eta $(3,2)$.', 'Dos soluciones: $(2,3)$ y $(3,2)$.', 'حلّان: $(2,3)$ و$(3,2)$.', 'Two solutions: $(2,3)$ and $(3,2)$.')
    },
    'radical-log-systems': {
        definitions: [
            { term: say('Soluzio faltsua', 'Solución falsa', 'الحل الزائف', 'False solution'), meaning: say('Ebaztean ateratzen den baina hasierako sistema betetzen ez duen balio bat; adibidez, zenbaki negatibo baten logaritmoa ematen duelako.', 'Un valor que sale al resolver, pero no cumple el sistema de partida, por ejemplo porque da el logaritmo de un número negativo.', 'قيمة تظهر عند الحل لكنها لا تحقق النظام الأصلي، مثلًا لأنها تعطي لوغاريتم عدد سالب.', 'A value that comes out when solving but does not satisfy the starting system, for instance because it gives the logarithm of a negative number.') }
        ],
        vocabulary: [
            say('logaritmoa', 'logaritmo', 'اللوغاريتم', 'logarithm'),
            say('biderkadura', 'producto', 'الجداء', 'product')
        ],
        explanation: say(
            'Logaritmoen propietateekin, $\\log x+\\log y=\\log(xy)$, edo karratura jasoz, sistema logaritmorik eta errorik gabeko beste bat bihurtzen da. Baina aldatzean, hasierako sistemak ez dituen soluzioak ager daitezke. Horregatik, soluzio bakoitza hasierako ekuazioetan ordeztu behar da, eta zenbaki negatibo baten logaritmoa ematen dutenak baztertu.',
            'Con las propiedades de los logaritmos, $\\log x+\\log y=\\log(xy)$, o elevando al cuadrado, el sistema se convierte en otro sin logaritmos ni raíces. Pero al cambiarlo pueden aparecer soluciones que el sistema de partida no tiene. Por eso hay que sustituir cada solución en las ecuaciones de partida y descartar las que dan el logaritmo de un número negativo.',
            'بخصائص اللوغاريتمات $\\log x+\\log y=\\log(xy)$ أو بالتربيع يتحول النظام إلى نظام خالٍ من اللوغاريتمات والجذور. لكن عند تغييره قد تظهر حلول ليست للنظام الأصلي. لذلك يجب تعويض كل حل في المعادلات الأصلية واستبعاد ما يعطي لوغاريتم عدد سالب.',
            'With the properties of logarithms, $\\log x+\\log y=\\log(xy)$, or by squaring, the system becomes one without logarithms or roots. But changing it can bring in solutions that the starting system does not have. So each solution must be substituted into the starting equations, and those that give the logarithm of a negative number are thrown out.'
        ),
        examplePrompt: say('Ebatzi $\\begin{cases}\\sqrt{x}+y=5\\\\ x-y=7\\end{cases}$.', 'Resuelve $\\begin{cases}\\sqrt{x}+y=5\\\\ x-y=7\\end{cases}$.', 'حُلّ $\\begin{cases}\\sqrt{x}+y=5\\\\ x-y=7\\end{cases}$.', 'Solve $\\begin{cases}\\sqrt{x}+y=5\\\\ x-y=7\\end{cases}$.'),
        example: same('$\\sqrt{x}=12-x\\ \\to\\ x^2-25x+144=0$'),
        exampleAnswer: say('9 eta 16 ateratzen dira, baina 16 zenbakiarekin $\\sqrt{16}=4\\neq -4$ geratzen da. Soluzioa: $x=9$, $y=2$.', 'Salen 9 y 16, pero con 16 queda $\\sqrt{16}=4\\neq -4$. Solución: $x=9$, $y=2$.', 'نحصل على 9 و16، لكن مع 16 يكون $\\sqrt{16}=4\\neq -4$. الحل: $x=9$ و$y=2$.', 'You get 9 and 16, but with 16 you have $\\sqrt{16}=4\\neq -4$. Solution: $x=9$, $y=2$.')
    },
    'exponential-systems': {
        definitions: [
            { term: say('Aldagai-aldaketa', 'Cambio de variable', 'تغيير المتغير', 'Change of variable'), meaning: say('Errepikatzen den adierazpen bati letra berri bat ematea, $u=2^x$ bezala, sistema sinpleagoa izan dadin.', 'Llamar con una letra nueva a una expresión que se repite, como $u=2^x$, para que el sistema sea más sencillo.', 'تسمية عبارة متكررة بحرف جديد مثل $u=2^x$ ليصير النظام أبسط.', 'Giving a new letter to an expression that repeats, such as $u=2^x$, so that the system is simpler.') }
        ],
        vocabulary: [
            say('berretzailea', 'exponente', 'الأس', 'exponent'),
            say('desegin', 'deshacer', 'عكس', 'undo')
        ],
        explanation: say(
            'Sistema esponentzial batean, ezezagunak berretzaileetan daude. Berretura bakoitza beti berdin agertzen bada, $2^x$ eta $3^y$ bezala, letra berriekin ordezten dira, $u$ eta $v$, eta sistema lineal bat geratzen da. Ebatzi eta aldaketa desegiten da, oinarri bereko berreturekin edo logaritmoekin. $u$ negatibo batek ez du $x$ zenbakirik ematen.',
            'En un sistema exponencial, las incógnitas están en los exponentes. Si cada potencia aparece siempre igual, como $2^x$ y $3^y$, se cambian por letras nuevas, $u$ y $v$, y queda un sistema lineal. Se resuelve y se deshace el cambio con potencias de la misma base o con logaritmos. Un $u$ negativo no da ninguna $x$.',
            'في النظام الأسي توجد المجاهيل في الأسس. وإذا ظهرت كل قوة دائمًا بالشكل نفسه مثل $2^x$ و$3^y$ استبدلناها بحرفين جديدين $u$ و$v$ فيبقى نظام خطي. نحله ثم نعكس التغيير بقوى للأساس نفسه أو باللوغاريتمات. وقيمة سالبة لـ $u$ لا تعطي أي $x$.',
            'In an exponential system, the unknowns are in the exponents. If each power always appears in the same way, such as $2^x$ and $3^y$, you replace them with new letters, $u$ and $v$, and a linear system is left. You solve it and undo the change with powers of the same base or with logarithms. A negative $u$ gives no $x$ at all.'
        ),
        examplePrompt: say('Ebatzi $\\begin{cases}5^x+2\\cdot 3^y=23\\\\ 5^x-3^y=-4\\end{cases}$.', 'Resuelve $\\begin{cases}5^x+2\\cdot 3^y=23\\\\ 5^x-3^y=-4\\end{cases}$.', 'حُلّ $\\begin{cases}5^x+2\\cdot 3^y=23\\\\ 5^x-3^y=-4\\end{cases}$.', 'Solve $\\begin{cases}5^x+2\\cdot 3^y=23\\\\ 5^x-3^y=-4\\end{cases}$.'),
        example: same('$\\begin{gathered}u+2v=23\\\\ u-v=-4\\ \\to\\ v=9,\\ u=5\\end{gathered}$'),
        exampleAnswer: say('$3^y=9$ eta $5^x=5$: $x=1$, $y=2$.', '$3^y=9$ y $5^x=5$: $x=1$, $y=2$.', '$3^y=9$ و$5^x=5$: $x=1$ و$y=2$.', '$3^y=9$ and $5^x=5$: $x=1$, $y=2$.')
    },
    'nonlinear-problems': {
        vocabulary: [
            say('katetoa', 'cateto', 'ضلع القائمة', 'leg'),
            say('hipotenusa', 'hipotenusa', 'الوتر', 'hypotenuse'),
            say('perimetroa', 'perímetro', 'المحيط', 'perimeter')
        ],
        explanation: say(
            'Geometriako problemetan, ezagutzen den neurri bakoitzak ekuazio bat ematen du. Perimetroak ekuazio lineal bat ematen du; laukizuzen baten azalerak, $xy$; eta Pitagorasen teoremak, $x^2+y^2$. Sistema ordezkapenez edo ekuazioak konbinatuz ebazten da, eta soluzio positiboek bakarrik balio dute.',
            'En los problemas de geometría, cada medida que se conoce da una ecuación. El perímetro da una ecuación lineal; el área de un rectángulo, $xy$; y el teorema de Pitágoras, $x^2+y^2$. El sistema se resuelve por sustitución o combinando ecuaciones, y solo valen las soluciones positivas.',
            'في مسائل الهندسة يعطي كل قياس معروف معادلة. فالمحيط يعطي معادلة خطية، ومساحة المستطيل $xy$، ومبرهنة فيثاغورس $x^2+y^2$. ويُحل النظام بالتعويض أو بجمع المعادلات، ولا تصلح إلا الحلول الموجبة.',
            'In geometry problems, each known measurement gives an equation. The perimeter gives a linear equation; the area of a rectangle, $xy$; and Pythagoras\' theorem, $x^2+y^2$. The system is solved by substitution or by combining equations, and only positive solutions are valid.'
        ),
        examplePrompt: say('Laukizuzen baten perimetroa 30 cm da, eta azalera 56 cm². Zenbat neurtzen dute aldeek?', 'Un rectángulo tiene 30 cm de perímetro y 56 cm² de área. ¿Cuánto miden sus lados?', 'مستطيل محيطه 30 سم ومساحته 56 سم². ما طولا ضلعيه؟', 'A rectangle has a perimeter of 30 cm and an area of 56 cm². How long are its sides?'),
        example: same('$\\begin{cases}x+y=15\\\\ xy=56\\end{cases}\\ \\to\\ x^2-15x+56=0$'),
        exampleAnswer: say('Aldeek 7 cm eta 8 cm neurtzen dute.', 'Los lados miden 7 cm y 8 cm.', 'طولا الضلعين 7 سم و8 سم.', 'The sides are 7 cm and 8 cm long.')
    },

    /* ---------- 5. Inequalities in two unknowns ---------- */
    'half-plane-regions': {
        definitions: [
            { term: say('Erdiplanoa', 'Semiplano', 'نصف المستوى', 'Half-plane'), meaning: say('Zuzen batek planoa banatzen duen bi zatietako bakoitza.', 'Cada una de las dos partes en que una recta divide al plano.', 'كل واحد من الجزأين اللذين يقسم إليهما مستقيمٌ المستوى.', 'Each of the two parts into which a straight line splits the plane.') },
            { term: say('Muga-zuzena', 'Recta frontera', 'المستقيم الحدّي', 'Boundary line'), meaning: say('Inekuazioa betetzen duten puntuak betetzen ez dutenetatik bereizten dituen $ax+by=c$ zuzena.', 'La recta $ax+by=c$ que separa los puntos que cumplen la inecuación de los que no.', 'المستقيم $ax+by=c$ الذي يفصل النقاط التي تحقق المتراجحة عن التي لا تحققها.', 'The line $ax+by=c$ that separates the points that satisfy the inequality from those that do not.') }
        ],
        vocabulary: [
            say('proba-puntua', 'punto de prueba', 'نقطة الاختبار', 'test point'),
            say('erpina', 'vértice', 'الرؤوس', 'vertex'),
            say('eskualdea', 'región', 'المنطقة', 'region')
        ],
        explanation: say(
            '$2x+y\\le 4$ bezalako inekuazio bat erdiplano oso batean betetzen da. Muga-zuzena marrazten da, haren gainean ez dagoen puntu bat probatzen da —askotan $(0,0)$—, eta betetzen den aldea margotzen da. $\\le$ edo $\\ge$ denean, zuzena barruan dago; $<$ edo $>$ denean, ez. Inekuazio-sistema bat eskualde komuna da.',
            'Una inecuación como $2x+y\\le 4$ se cumple en todo un semiplano. Se dibuja la recta frontera, se prueba un punto que no esté en ella —a menudo $(0,0)$— y se pinta el lado donde se cumple. Con $\\le$ o $\\ge$ la recta entra; con $<$ o $>$, no. Un sistema de inecuaciones es la región común.',
            'تتحقق متراجحة مثل $2x+y\\le 4$ في نصف مستوى كامل. نرسم المستقيم الحدّي ونجرب نقطة ليست عليه —غالبًا $(0,0)$— ونلوّن الجانب الذي تتحقق فيه. ومع $\\le$ أو $\\ge$ يدخل المستقيم، ومع $<$ أو $>$ لا يدخل. ونظام المتراجحات هو المنطقة المشتركة.',
            'An inequality such as $2x+y\\le 4$ holds on a whole half-plane. You draw the boundary line, try a point that is not on it —often $(0,0)$— and shade the side where it holds. With $\\le$ or $\\ge$ the line is included; with $<$ or $>$, it is not. A system of inequalities is the common region.'
        ),
        examplePrompt: say('$(3,1)$ puntua $\\begin{cases}x+2y\\le 6\\\\ x-y\\ge 1\\end{cases}$ eskualdean al dago?', '¿Está el punto $(3,1)$ en la región $\\begin{cases}x+2y\\le 6\\\\ x-y\\ge 1\\end{cases}$?', 'هل النقطة $(3,1)$ في المنطقة $\\begin{cases}x+2y\\le 6\\\\ x-y\\ge 1\\end{cases}$؟', 'Is the point $(3,1)$ in the region $\\begin{cases}x+2y\\le 6\\\\ x-y\\ge 1\\end{cases}$?'),
        example: same('$3+2\\cdot 1=5\\le 6\\qquad 3-1=2\\ge 1$'),
        exampleAnswer: say('Bai: bi inekuazioak betetzen ditu.', 'Sí: cumple las dos inecuaciones.', 'نعم: تحقق المتراجحتين.', 'Yes: it satisfies both inequalities.')
    },
    'region-cases': {
        definitions: [
            { term: say('Eskualde bornatua', 'Región acotada', 'المنطقة المحدودة', 'Bounded region'), meaning: say('Zirkulu baten barruan sartzen den eskualdea: triangelu bat, lauki bat…', 'Una región que cabe dentro de un círculo: un triángulo, un cuadrilátero…', 'منطقة تتسع لها دائرة: مثلث أو رباعي…', 'A region that fits inside a circle: a triangle, a quadrilateral…') },
            { term: say('Eskualde hutsa', 'Región vacía', 'المنطقة الخالية', 'Empty region'), meaning: say('Ez dago inekuazio guztiak aldi berean betetzen dituen punturik.', 'No hay ningún punto que cumpla a la vez todas las inecuaciones.', 'لا توجد نقطة تحقق كل المتراجحات معًا.', 'There is no point that satisfies all the inequalities at once.') }
        ],
        vocabulary: [
            say('poligonoa', 'polígono', 'المضلع', 'polygon'),
            say('erdiplanoa', 'semiplano', 'نصف المستوى', 'half-plane')
        ],
        explanation: say(
            'Zenbait erdiplanoren eskualde komunak hiru itxura izan ditzake. Zuzenek inguratuta geratzen bada, poligono bat da: bornatua da eta erpinak ditu. Alderen batera amaierarik gabe hedatzen bada, irekia da. Eta erdiplanoek elkar ukitzen ez badute, eskualdea hutsa da: sistemak ez du soluziorik. Zuzenak marraztuta, berehala ikusten da.',
            'La región común de varios semiplanos puede ser de tres tipos. Si queda encerrada por las rectas, es un polígono: está acotada y tiene vértices. Si se extiende sin fin hacia algún lado, es abierta. Y si los semiplanos no se tocan, la región es vacía: el sistema no tiene solución. Al dibujar las rectas se ve enseguida.',
            'يمكن أن تكون المنطقة المشتركة بين عدة أنصاف مستويات من ثلاثة أنواع. إذا أحاطت بها المستقيمات فهي مضلع: محدودة ولها رؤوس. وإذا امتدت بلا نهاية نحو جهة ما فهي مفتوحة. وإذا لم تتلاقَ أنصاف المستويات فالمنطقة خالية: لا حل للنظام. وبرسم المستقيمات يظهر ذلك فورًا.',
            'The common region of several half-planes can be of three kinds. If the lines close it in, it is a polygon: it is bounded and has vertices. If it stretches without end in some direction, it is open. And if the half-planes do not meet, the region is empty: the system has no solution. Drawing the lines shows it at once.'
        ),
        examplePrompt: say('Nolakoa da $\\begin{cases}x\\ge 0\\\\ y\\ge 0\\\\ x+2y\\ge 4\\end{cases}$ eskualdea?', '¿Cómo es la región $\\begin{cases}x\\ge 0\\\\ y\\ge 0\\\\ x+2y\\ge 4\\end{cases}$?', 'كيف هي المنطقة $\\begin{cases}x\\ge 0\\\\ y\\ge 0\\\\ x+2y\\ge 4\\end{cases}$؟', 'What is the region $\\begin{cases}x\\ge 0\\\\ y\\ge 0\\\\ x+2y\\ge 4\\end{cases}$ like?'),
        example: same('$(4,0),\\ (0,2)$'),
        exampleAnswer: say('Irekia: bi erpin ditu, $(4,0)$ eta $(0,2)$, eta amaierarik gabe jarraitzen du gora eta eskuinera.', 'Abierta: tiene dos vértices, $(4,0)$ y $(0,2)$, y sigue sin fin hacia arriba y hacia la derecha.', 'مفتوحة: لها رأسان $(4,0)$ و$(0,2)$، وتمتد بلا نهاية إلى الأعلى وإلى اليمين.', 'Open: it has two vertices, $(4,0)$ and $(0,2)$, and goes on without end upwards and to the right.')
    }
}

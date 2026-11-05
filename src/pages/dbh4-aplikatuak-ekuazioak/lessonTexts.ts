import type { LessonTexts, LocalizedText } from '../../features/unit-v2/types.ts'
import type { EquationsSystemsTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Ekuazioak eta sistemak · 4. DBH aplikatuak — what each lesson tells: the
   new words (definitions), a short explanation, its cases and the example
   as an exercise («Another example»), with the key words in four languages
   and, in four lessons, «Why does it work?». Plain data so the tests can
   import it; lessons.tsx merges it into the topics. The explanations keep
   what their drawings show: the three kinds of equation, x/2 + x/3 = 5,
   x² − 7x + 6 = 0, (x + 1)(x² − 4) = 0, √(x + 2) = x, the rectangle of
   150 cm², x + y = 5, and the system 2x + y = 7, x − y = 2 that the three
   methods solve. A contradiction is written 2 ≠ 5, never 0 = 3, so the
   test does not read it as a wrong sum.
   ========================================================================== */

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
/** The same formula in every language; the decimal comma becomes a point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })

export const equationsSystemsLessonTexts: Record<EquationsSystemsTopicId, LessonTexts> = {
    /* ---------- 1. First-degree equations ---------- */
    brackets: {
        vocabulary: [
            say('atala', 'miembro', 'الطرف', 'side'),
            say('askatu', 'despejar', 'اعزل', 'solve for'),
            say('identitatea', 'identidad', 'متطابقة', 'identity')
        ],
        explanation: say(
            'Ekuazio bat ebaztea bi atalak berdin uzten dituen $x$ balioa aurkitzea da. Kendu parentesiak (minus baten atzean zeinu guztiak aldatzen dira), eraman $x$ gaiak atal batera eta zenbakiak bestera, laburtu eta askatu $x$. Kako zuzenak badaude, hasi barrukoenetik.',
            'Resolver una ecuación es encontrar el valor de $x$ que hace iguales los dos miembros. Quita paréntesis (tras un menos cambian todos los signos), pasa las $x$ a un miembro y los números al otro, reduce y despeja $x$. Si hay corchetes, empieza por el más interior.',
            'حل المعادلة هو إيجاد قيمة $x$ التي تجعل الطرفين متساويين. أزل الأقواس (بعد الناقص تتغيّر كل الإشارات)، وانقل حدود $x$ إلى طرف والأعداد إلى الآخر، واختصر واعزل $x$. وإذا وُجدت أقواس معقوفة فابدأ بالداخلي.',
            'Solving an equation is finding the value of $x$ that makes both sides equal. Remove the brackets (after a minus every sign changes), move the $x$ terms to one side and the numbers to the other, simplify and solve for $x$. If there are square brackets, start with the innermost.'
        ),
        cases: [
            { title: say('Ebazpen bat', 'Una solución', 'حل واحد', 'One solution'), text: say('$x$ askatzen da.', 'Se despeja $x$.', 'نعزل $x$.', 'You solve for $x$.'), math: same('$3x-2=x+4\\ \\to\\ x=3$') },
            { title: say('Ebazpenik ez', 'Ninguna', 'لا حل', 'None'), text: say('$x$ desagertzen da eta berdintza faltsu bat geratzen da.', 'La $x$ desaparece y queda una igualdad falsa.', 'يختفي $x$ وتبقى مساواة خاطئة.', 'The $x$ disappears and a false equality is left.'), math: same('$2x+2=2x+5\\ \\to\\ 2\\neq 5$') },
            { title: say('Infinitu', 'Infinitas', 'ما لا نهاية', 'Infinitely many'), text: say('Beti egia den berdintza bat geratzen da: identitate bat da.', 'Queda una igualdad siempre cierta: es una identidad.', 'تبقى مساواة صحيحة دائمًا: إنها متطابقة.', 'An equality that is always true is left: it is an identity.'), math: same('$3(x-1)=3x-3$') }
        ],
        examplePrompt: say('Ebatzi $5(x-2)-3(x+1)=7$.', 'Resuelve $5(x-2)-3(x+1)=7$.', 'حلّ $5(x-2)-3(x+1)=7$.', 'Solve $5(x-2)-3(x+1)=7$.'),
        example: same('$\\begin{gathered}5x-10-3x-3=7\\\\ 2x=20\\ \\to\\ x=10\\end{gathered}$'),
        exampleAnswer: say('$x=10$. Egiaztatu: $5\\cdot 8-3\\cdot 11=7$.', '$x=10$. Comprueba: $5\\cdot 8-3\\cdot 11=7$.', '$x=10$. تحقّق: $5\\cdot 8-3\\cdot 11=7$.', '$x=10$. Check: $5\\cdot 8-3\\cdot 11=7$.')
    },
    denominators: {
        vocabulary: [
            say('MKTa', 'm.c.m.', 'المضاعف المشترك الأصغر', 'LCM'),
            say('izendatzailea', 'denominador', 'المقام', 'denominator'),
            say('zenbakitzailea', 'numerador', 'البسط', 'numerator')
        ],
        explanation: say(
            'Izendatzaileak badaude, kalkulatu haien MKTa eta biderkatu harekin gai GUZTIAK, zenbaki solteak ere bai. Gai bakoitzean, zatitu MKTa izendatzaileaz eta biderkatu zenbakitzailea, parentesi artean: zatiki baten aurreko minusak zenbakitzaile osoari eragiten dio.',
            'Si hay denominadores, calcula su m.c.m. y multiplica por él TODOS los términos, también los números sueltos. En cada término, divide el m.c.m. entre el denominador y multiplica el numerador, entre paréntesis: un menos delante de una fracción afecta a todo el numerador.',
            'إذا وُجدت مقامات فاحسب المضاعف المشترك الأصغر لها واضرب فيه كل الحدود، حتى الأعداد المنفردة. في كل حد اقسم المضاعف على المقام واضرب البسط، بين قوسين: الناقص أمام كسر يؤثر في البسط كله.',
            'If there are denominators, work out their LCM and multiply ALL the terms by it, the lone numbers too. In each term, divide the LCM by the denominator and multiply the numerator, in brackets: a minus in front of a fraction affects the whole numerator.'
        ),
        cases: [
            { title: say('Marrazkikoa', 'La del dibujo', 'معادلة الرسم', 'The one in the drawing'), text: say('MKTa 6 da: 5 zenbakia ere bider 6.', 'El m.c.m. es 6: el 5 también, por 6.', 'المضاعف 6: والعدد 5 أيضًا في 6.', 'The LCM is 6: the 5 is multiplied by 6 too.'), math: same('$\\frac{x}{2}+\\frac{x}{3}=5\\ \\to\\ 3x+2x=30$') },
            { title: say('Egiaztatu', 'Comprueba', 'تحقّق', 'Check'), text: say('Ordeztu ebazpena hasierako ekuazioan: $x=6$ denean, $3+2=5$.', 'Sustituye la solución en la ecuación inicial: con $x=6$, $3+2=5$.', 'عوّض الحل في المعادلة الأصلية: مع $x=6$ يكون $3+2=5$.', 'Put the solution into the original equation: with $x=6$, $3+2=5$.') }
        ],
        examplePrompt: say('Ebatzi $\\frac{x+1}{3}-\\frac{x-2}{4}=\\frac{3}{2}$.', 'Resuelve $\\frac{x+1}{3}-\\frac{x-2}{4}=\\frac{3}{2}$.', 'حلّ $\\frac{x+1}{3}-\\frac{x-2}{4}=\\frac{3}{2}$.', 'Solve $\\frac{x+1}{3}-\\frac{x-2}{4}=\\frac{3}{2}$.'),
        example: same('$\\begin{gathered}4(x+1)-3(x-2)=18\\\\ x+10=18\\ \\to\\ x=8\\end{gathered}$'),
        exampleAnswer: say('MKTa 12 da. Egiaztatu: $3-1{,}5=1{,}5$.', 'El m.c.m. es 12. Comprueba: $3-1{,}5=1{,}5$.', 'المضاعف 12. تحقّق: $3-1{,}5=1{,}5$.', 'The LCM is 12. Check: $3-1{,}5=1{,}5$.')
    },
    'linear-problems': {
        vocabulary: [
            say('planteatu', 'plantear', 'الصياغة', 'set up'),
            say('egiaztatu', 'comprobar', 'التحقق', 'check'),
            say('taula', 'tabla', 'جدول', 'table')
        ],
        explanation: say(
            'Lau urrats: ulertu (zer da $x$?), planteatu (idatzi beste guztia $x$ erabiliz eta bilatu berdintza), ebatzi eta egiaztatu enuntziatuarekin. Amaieran, erantzun esaldi batez eta begiratu emaitzak zentzua duen: adin negatiborik ez. Adinetan taula bat lagungarria da.',
            'Cuatro pasos: comprender (¿qué es $x$?), plantear (escribe todo lo demás con $x$ y busca la igualdad), resolver y comprobar con el enunciado. Al final, responde con una frase y mira que el resultado tenga sentido: nada de edades negativas. En las edades ayuda una tabla.',
            'أربع خطوات: الفهم (ما $x$؟)، والصياغة (اكتب كل الباقي بـ$x$ وابحث عن المساواة)، والحل، والتحقق بالنص. وفي النهاية أجب بجملة وانظر هل للنتيجة معنى: لا أعمار سالبة. وفي الأعمار يساعد جدول.',
            'Four steps: understand (what is $x$?), set up (write everything else with $x$ and look for the equality), solve and check with the statement. At the end, answer with a sentence and make sure the result makes sense: no negative ages. With ages, a table helps.'
        ),
        cases: [
            { title: say('Adinak', 'Edades', 'الأعمار', 'Ages'), text: say('Gaur Martak $x$ urte ditu eta Albertok $4x$; 5 urte barru, Albertok hirukoitza izango du.', 'Hoy Marta tiene $x$ años y Alberto $4x$; dentro de 5 años, él tendrá el triple.', 'اليوم عمر مارتا $x$ وعمر ألبرتو $4x$؛ وبعد 5 سنوات يصير عمره ثلاثة أضعاف عمرها.', 'Today Marta is $x$ and Alberto is $4x$; in 5 years he will be three times her age.'), math: same('$4x+5=3(x+5)\\ \\to\\ x=10$') },
            { title: say('Nahasketak', 'Mezclas', 'الخلائط', 'Mixtures'), text: say('Balioak batzen dira: $x$ kg $7{,}50$ €/kg-an eta $90-x$ kg $5{,}70$ €/kg-an, $6{,}50$ €/kg-an guztira.', 'Se suman los valores: $x$ kg a $7{,}50$ €/kg y $90-x$ kg a $5{,}70$ €/kg salen a $6{,}50$ €/kg.', 'نجمع القيم: $x$ كغ بسعر $7{,}50$ €/كغ و$90-x$ كغ بسعر $5{,}70$ €/كغ يصير السعر $6{,}50$ €/كغ.', 'The values add up: $x$ kg at €$7{,}50$/kg and $90-x$ kg at €$5{,}70$/kg come out at €$6{,}50$/kg.'), math: same('$7{,}5x+5{,}7(90-x)=90\\cdot 6{,}5\\ \\to\\ x=40$') }
        ],
        examplePrompt: say('Aita batek 40 urte ditu eta semeak 12. Zenbat urte barru izango ditu aitak semearen bikoitza?', 'Un padre tiene 40 años y su hijo, 12. ¿Dentro de cuántos años tendrá el padre el doble que el hijo?', 'عمر أب 40 سنة وعمر ابنه 12. بعد كم سنة يصير عمر الأب ضعف عمر الابن؟', 'A father is 40 and his son is 12. In how many years will the father be twice as old as the son?'),
        example: same('$40+x=2(12+x)\\ \\to\\ x=16$'),
        exampleAnswer: say('16 urte barru: 56 eta 28 urte.', 'Dentro de 16 años: 56 y 28 años.', 'بعد 16 سنة: 56 و28 سنة.', 'In 16 years: 56 and 28.')
    },
    /* ---------- 2. Quadratic equations ---------- */
    incomplete: {
        definitions: [
            {
                term: say('Bigarren mailako ekuazioa', 'Ecuación de segundo grado', 'معادلة من الدرجة الثانية', 'Quadratic equation'),
                meaning: say('$ax^{2}+bx+c=0$ forman idatz daitekeena, $a\\neq 0$ izanik. Osatugabea da $b$ edo $c$ falta bada.', 'La que se puede escribir como $ax^{2}+bx+c=0$, con $a\\neq 0$. Es incompleta si falta $b$ o $c$.', 'التي يمكن كتابتها $ax^{2}+bx+c=0$ مع $a\\neq 0$. وتكون ناقصة إذا نقص $b$ أو $c$.', 'One that can be written as $ax^{2}+bx+c=0$, with $a\\neq 0$. It is incomplete if $b$ or $c$ is missing.')
            }
        ],
        vocabulary: [
            say('erro karratua', 'raíz cuadrada', 'الجذر التربيعي', 'square root'),
            say('faktore komuna', 'factor común', 'العامل المشترك', 'common factor'),
            say('ebazpena', 'solución', 'الحل', 'solution')
        ],
        explanation: say(
            'Osatugabeek ez dute formularik behar. Eta ez zatitu inoiz $x$ zenbakiaz: $x=0$ ebazpena galduko zenuke.',
            'Las incompletas no necesitan fórmula. Y nunca dividas entre $x$: perderías la solución $x=0$.',
            'المعادلات الناقصة لا تحتاج إلى الصيغة. ولا تقسم أبدًا على $x$: ستفقد الحل $x=0$.',
            'Incomplete ones need no formula. And never divide by $x$: you would lose the solution $x=0$.'
        ),
        cases: [
            { title: say('$b$ falta da', 'Falta $b$', 'ينقص $b$', 'No $b$'), text: say('Askatu $x^{2}$ eta atera erro karratua; zenbakia negatiboa bada, ez dago ebazpenik.', 'Despeja $x^{2}$ y haz la raíz cuadrada; si el número es negativo, no hay solución.', 'اعزل $x^{2}$ وخذ الجذر التربيعي؛ وإذا كان العدد سالبًا فلا حل.', 'Solve for $x^{2}$ and take the square root; if the number is negative, there is no solution.'), math: same('$2x^{2}-50=0\\ \\to\\ x^{2}=25\\ \\to\\ x=\\pm 5$') },
            { title: say('$c$ falta da', 'Falta $c$', 'ينقص $c$', 'No $c$'), text: say('Atera $x$ faktore komun gisa: biderkadura bat 0 da faktoreetako bat 0 bada.', 'Saca $x$ factor común: un producto es 0 si lo es uno de sus factores.', 'أخرج $x$ عاملًا مشتركًا: الجداء 0 إذا كان أحد عوامله 0.', 'Take out $x$ as a common factor: a product is 0 if one of its factors is.'), math: same('$x^{2}-5x=0\\ \\to\\ x(x-5)=0$') }
        ],
        examplePrompt: say('Ebatzi $5x^{2}-80=0$.', 'Resuelve $5x^{2}-80=0$.', 'حلّ $5x^{2}-80=0$.', 'Solve $5x^{2}-80=0$.'),
        example: same('$x^{2}=\\frac{80}{5}=16\\ \\to\\ x=\\pm 4$'),
        exampleAnswer: say('Bi ebazpen: $x=4$ eta $x=-4$.', 'Dos soluciones: $x=4$ y $x=-4$.', 'حلان: $x=4$ و$x=-4$.', 'Two solutions: $x=4$ and $x=-4$.')
    },
    formula: {
        vocabulary: [
            say('formula orokorra', 'fórmula general', 'الصيغة العامة', 'quadratic formula'),
            say('koefizientea', 'coeficiente', 'المعامل', 'coefficient'),
            say('zeinua', 'signo', 'الإشارة', 'sign')
        ],
        explanation: say(
            'Ekuazio osoak formula orokorrarekin ebazten dira. Lehenik ordenatu ($ax^{2}+bx+c=0$) eta idatzi $a$, $b$ eta $c$ zeinuekin. Kontuz $b$ negatiboa bada: $-b$ positiboa da, eta $b^{2}$ ere bai. Koefiziente guztiek zatitzaile komun bat badute, sinplifikatu lehenago.',
            'Las ecuaciones completas se resuelven con la fórmula general. Primero ordena ($ax^{2}+bx+c=0$) y escribe $a$, $b$ y $c$ con sus signos. Cuidado si $b$ es negativo: $-b$ es positivo, y $b^{2}$ también. Si todos los coeficientes tienen un divisor común, simplifica antes.',
            'تُحل المعادلات الكاملة بالصيغة العامة. رتّب أولًا ($ax^{2}+bx+c=0$) واكتب $a$ و$b$ و$c$ بإشاراتها. انتبه إذا كان $b$ سالبًا: $-b$ موجب، و$b^{2}$ أيضًا. وإذا كان للمعاملات كلها قاسم مشترك فبسّط أولًا.',
            'Complete equations are solved with the quadratic formula. First put it in order ($ax^{2}+bx+c=0$) and write $a$, $b$ and $c$ with their signs. Careful if $b$ is negative: $-b$ is positive, and so is $b^{2}$. If all the coefficients have a common divisor, simplify first.'
        ),
        cases: [
            { title: say('Formula', 'La fórmula', 'الصيغة', 'The formula'), text: say('Bi ebazpenak, $\\pm$ zeinuarekin.', 'Las dos soluciones, con el $\\pm$.', 'الحلان، بالإشارة $\\pm$.', 'Both solutions, with the $\\pm$.'), math: same('$x=\\dfrac{-b\\pm\\sqrt{b^{2}-4ac}}{2a}$') },
            { title: say('Marrazkikoa', 'La del dibujo', 'معادلة الرسم', 'The one in the drawing'), text: say('$x^{2}-7x+6=0$: $a=1$, $b=-7$, $c=6$; beraz, $x=6$ eta $x=1$.', '$x^{2}-7x+6=0$: $a=1$, $b=-7$, $c=6$; así que $x=6$ y $x=1$.', '$x^{2}-7x+6=0$: $a=1$، $b=-7$، $c=6$؛ إذن $x=6$ و$x=1$.', '$x^{2}-7x+6=0$: $a=1$, $b=-7$, $c=6$; so $x=6$ and $x=1$.'), math: same('$x=\\dfrac{7\\pm\\sqrt{49-24}}{2}=\\dfrac{7\\pm 5}{2}$') }
        ],
        examplePrompt: say('Ebatzi $2x^{2}-3x-2=0$.', 'Resuelve $2x^{2}-3x-2=0$.', 'حلّ $2x^{2}-3x-2=0$.', 'Solve $2x^{2}-3x-2=0$.'),
        example: same('$\\begin{gathered}x=\\frac{3\\pm\\sqrt{9+16}}{4}=\\frac{3\\pm 5}{4}\\\\ x=2,\\ x=-\\frac{1}{2}\\end{gathered}$'),
        exampleAnswer: say('$a=2$, $b=-3$ eta $c=-2$: $-b=3$ eta $-4ac=16$.', '$a=2$, $b=-3$ y $c=-2$: $-b=3$ y $-4ac=16$.', '$a=2$ و$b=-3$ و$c=-2$: $-b=3$ و$-4ac=16$.', '$a=2$, $b=-3$ and $c=-2$: $-b=3$ and $-4ac=16$.')
    },
    discriminant: {
        definitions: [
            {
                term: say('Diskriminatzailea', 'Discriminante', 'المميّز', 'Discriminant'),
                meaning: say('Formulako erroaren barruan dagoena: $\\Delta=b^{2}-4ac$.', 'Lo que hay dentro de la raíz de la fórmula: $\\Delta=b^{2}-4ac$.', 'ما تحت الجذر في الصيغة: $\\Delta=b^{2}-4ac$.', 'What is inside the root of the formula: $\\Delta=b^{2}-4ac$.')
            }
        ],
        vocabulary: [
            say('ebazpen bikoitza', 'solución doble', 'حل مضاعف', 'double solution'),
            say('ordenatu', 'ordenar', 'رتّب', 'put in order'),
            say('atala', 'miembro', 'طرف', 'side')
        ],
        explanation: say(
            'Diskriminatzaileak esaten du zenbat ebazpen dauden, formula bukatu gabe. Askotan ekuazioa ez dator ordenatuta: lehenik kendu parentesiak, garatu identitateak eta eraman dena atal batera.',
            'El discriminante dice cuántas soluciones hay sin terminar la fórmula. A menudo la ecuación no viene ordenada: primero quita paréntesis, desarrolla las identidades y pasa todo a un miembro.',
            'المميّز يخبرنا بعدد الحلول دون إكمال الصيغة. وكثيرًا ما لا تأتي المعادلة مرتّبة: أزل الأقواس أولًا وانشر المتطابقات وانقل كل شيء إلى طرف واحد، أي رتّبها.',
            'The discriminant tells you how many solutions there are without finishing the formula. Often the equation does not come in order: first remove brackets, expand the identities and move everything to one side.'
        ),
        cases: [
            { title: say('Positiboa', 'Positivo', 'موجب', 'Positive'), text: say('Bi ebazpen desberdin.', 'Dos soluciones distintas.', 'حلان مختلفان.', 'Two different solutions.'), math: same('$x^{2}-5x+4=0\\ \\to\\ \\Delta=25-16=9$') },
            { title: say('Zero', 'Cero', 'صفر', 'Zero'), text: say('Ebazpen bakarra, bikoitza.', 'Una sola solución, doble.', 'حل واحد مضاعف.', 'A single solution, a double one.'), math: same('$x^{2}-20x+100=0\\ \\to\\ \\Delta=400-400=0$') },
            { title: say('Negatiboa', 'Negativo', 'سالب', 'Negative'), text: say('Ez dago ebazpenik.', 'Ninguna solución.', 'لا حل.', 'No solution.'), math: same('$3x^{2}+5x+11=0\\ \\to\\ \\Delta=25-132<0$') }
        ],
        why: {
            text: say(
                'Formulan, $\\Delta$ erroaren barruan dago. Negatiboa bada, ez dago erro errealik, eta ez dago ebazpenik. 0 bada, 0 batzea edo kentzea gauza bera da: bi ebazpenak bat egiten dute.',
                'En la fórmula, $\\Delta$ va dentro de la raíz. Si es negativo, no hay raíz real y no hay solución. Si es 0, sumar o restar 0 da lo mismo: las dos soluciones coinciden.',
                'في الصيغة يقع $\\Delta$ تحت الجذر. إذا كان سالبًا فلا جذر حقيقي ولا حل. وإذا كان 0 فجمع 0 أو طرحه سواء: يتطابق الحلان.',
                'In the formula, $\\Delta$ sits inside the root. If it is negative, there is no real root and no solution. If it is 0, adding or subtracting 0 is the same: the two solutions coincide.'
            ),
            math: same('$x=\\frac{-b\\pm\\sqrt{0}}{2a}=\\frac{-b}{2a}$')
        },
        examplePrompt: say('Zenbat ebazpen ditu $4x^{2}-12x+9=0$ ekuazioak?', '¿Cuántas soluciones tiene $4x^{2}-12x+9=0$?', 'كم حلًا للمعادلة $4x^{2}-12x+9=0$؟', 'How many solutions does $4x^{2}-12x+9=0$ have?'),
        example: same('$\\Delta=144-144=0$'),
        exampleAnswer: say('Bakarra, bikoitza: $x=\\frac{3}{2}$.', 'Una sola, doble: $x=\\frac{3}{2}$.', 'حل واحد مضاعف: $x=\\frac{3}{2}$.', 'Just one, a double one: $x=\\frac{3}{2}$.')
    },
    /* ---------- 3. Other equations ---------- */
    factored: {
        vocabulary: [
            say('faktorea', 'factor', 'عامل', 'factor'),
            say('biderkadura', 'producto', 'الجداء', 'product'),
            say('garatu', 'desarrollar', 'تنشر', 'expand')
        ],
        explanation: say(
            'Biderkadura bat 0 da faktoreetako bat 0 denean. Ekuazioa 0 berdin den biderkadura bat bada, ez garatu: egin faktore bakoitza 0 eta ebatzi zatika. Faktorizatuta ez badago, faktorizatu lehenago. Biderkadura 0 denean bakarrik balio du.',
            'Un producto vale 0 cuando alguno de sus factores es 0. Si la ecuación es un producto igual a 0, no desarrolles: iguala a 0 cada factor y resuelve por partes. Si no está factorizada, factoriza antes. Solo vale si el producto es 0.',
            'يكون الجداء 0 عندما يكون أحد عوامله 0. فإذا كانت المعادلة جداءً يساوي 0 فلا تنشر: اجعل كل عامل 0 وحلّ كل جزء. وإذا لم تكن محلَّلة فحلّلها أولًا. ولا يصح ذلك إلا إذا كان الجداء 0.',
            'A product is 0 when one of its factors is 0. If the equation is a product equal to 0, do not expand: set each factor to 0 and solve piece by piece. If it is not factorised, factorise it first. It only works when the product is 0.'
        ),
        cases: [
            { title: say('Marrazkikoa', 'La del dibujo', 'معادلة الرسم', 'The one in the drawing'), text: say('Hiru ebazpen.', 'Tres soluciones.', 'ثلاثة حلول.', 'Three solutions.'), math: same('$\\begin{gathered}(x+1)(x^{2}-4)=0\\\\ x=-1,\\ x=2,\\ x=-2\\end{gathered}$') },
            { title: say('Faktorizatu lehenago', 'Factoriza antes', 'حلّل أولًا', 'Factorise first'), text: say('Faktore komuna eta karratuen kendura.', 'Factor común y diferencia de cuadrados.', 'عامل مشترك وفرق مربعين.', 'Common factor and difference of squares.'), math: same('$x^{3}-64x=x(x+8)(x-8)$') }
        ],
        why: {
            text: say(
                'Bi zenbakiren biderkadura 0 bada, haietako bat 0 da: $5\\cdot 0=0$, baina $5\\cdot 2$ ez da inoiz 0. $(x-4)(x-6)=0$ bada, edo $x-4=0$ da, edo $x-6=0$.',
                'Si el producto de dos números da 0, uno de ellos es 0: $5\\cdot 0=0$, pero $5\\cdot 2$ nunca da 0. Si $(x-4)(x-6)=0$, o $x-4=0$ o $x-6=0$.',
                'إذا كان جداء عددين 0 فأحدهما 0: $5\\cdot 0=0$، لكن $5\\cdot 2$ لا يساوي 0 أبدًا. فإذا كان $(x-4)(x-6)=0$ فإما $x-4=0$ وإما $x-6=0$.',
                'If the product of two numbers is 0, one of them is 0: $5\\cdot 0=0$, but $5\\cdot 2$ is never 0. If $(x-4)(x-6)=0$, either $x-4=0$ or $x-6=0$.'
            )
        },
        examplePrompt: say('Ebatzi $(x-3)(2x+8)=0$.', 'Resuelve $(x-3)(2x+8)=0$.', 'حلّ $(x-3)(2x+8)=0$.', 'Solve $(x-3)(2x+8)=0$.'),
        example: same('$\\begin{gathered}x-3=0\\ \\to\\ x=3\\\\ 2x+8=0\\ \\to\\ x=-4\\end{gathered}$'),
        exampleAnswer: say('Bi ebazpen, garatu gabe.', 'Dos soluciones, sin desarrollar.', 'حلان دون نشر.', 'Two solutions, without expanding.')
    },
    radical: {
        vocabulary: [
            say('erroa', 'raíz', 'الجذر', 'root'),
            say('karratura jaso', 'elevar al cuadrado', 'ربّع', 'square'),
            say('egiaztatu', 'comprobar', 'تحقّق', 'check')
        ],
        explanation: say(
            '$x$ erro baten barruan badago, utzi erroa bakarrik atal batean eta jaso bi atalak karratura: erroa desagertzen da. Karratura jasotzean ebazpen faltsuak ager daitezke: egiaztatu BETI hasierako ekuazioan.',
            'Si la $x$ está dentro de una raíz, deja la raíz sola en un miembro y eleva los dos miembros al cuadrado: la raíz desaparece. Al elevar al cuadrado pueden aparecer soluciones falsas: comprueba SIEMPRE en la ecuación inicial.',
            'إذا كان $x$ تحت جذر فاترك الجذر وحده في طرف وربّع الطرفين: يختفي الجذر. وعند التربيع قد تظهر حلول خاطئة: تحقّق دائمًا في المعادلة الأصلية.',
            'If the $x$ is inside a root, leave the root on its own on one side and square both sides: the root disappears. Squaring can bring in false solutions: ALWAYS check in the original equation.'
        ),
        cases: [
            { title: say('Marrazkikoa', 'La del dibujo', 'معادلة الرسم', 'The one in the drawing'), text: say('Karratura jasoz, bigarren mailako ekuazio bat.', 'Al elevar al cuadrado, una de segundo grado.', 'بالتربيع تظهر معادلة من الدرجة الثانية.', 'Squaring gives a quadratic.'), math: same('$\\sqrt{x+2}=x\\ \\to\\ x^{2}-x-2=0$') },
            { title: say('Egiaztatu', 'Comprueba', 'تحقّق', 'Check'), text: say('$\\sqrt{4}=2$ ondo dago, baina $\\sqrt{1}=1\\neq -1$: ebazpena $x=2$ bakarrik da.', '$\\sqrt{4}=2$ vale, pero $\\sqrt{1}=1\\neq -1$: la solución es solo $x=2$.', '$\\sqrt{4}=2$ يصح، لكن $\\sqrt{1}=1\\neq -1$: الحل $x=2$ فقط.', '$\\sqrt{4}=2$ works, but $\\sqrt{1}=1\\neq -1$: the only solution is $x=2$.') }
        ],
        why: {
            text: say(
                'Karratura jasotzeak zeinua ezabatzen du: $2^{2}=4$ eta $(-2)^{2}=4$. Horregatik, $x^{2}=x+2$ ekuazioak $\\sqrt{x+2}=x$ ekuazioaren ebazpenak ematen ditu, baina baita $\\sqrt{x+2}=-x$ ekuazioarenak ere.',
                'Elevar al cuadrado borra el signo: $2^{2}=4$ y $(-2)^{2}=4$. Por eso $x^{2}=x+2$ da las soluciones de $\\sqrt{x+2}=x$, pero también las de $\\sqrt{x+2}=-x$.',
                'التربيع يمحو الإشارة: $2^{2}=4$ و$(-2)^{2}=4$. لذلك تعطي $x^{2}=x+2$ حلول $\\sqrt{x+2}=x$، وكذلك حلول $\\sqrt{x+2}=-x$.',
                'Squaring wipes out the sign: $2^{2}=4$ and $(-2)^{2}=4$. That is why $x^{2}=x+2$ gives the solutions of $\\sqrt{x+2}=x$, but also those of $\\sqrt{x+2}=-x$.'
            )
        },
        examplePrompt: say('Ebatzi $\\sqrt{2x+1}=x-1$.', 'Resuelve $\\sqrt{2x+1}=x-1$.', 'حلّ $\\sqrt{2x+1}=x-1$.', 'Solve $\\sqrt{2x+1}=x-1$.'),
        example: same('$\\begin{gathered}2x+1=x^{2}-2x+1\\\\ x(x-4)=0\\end{gathered}$'),
        exampleAnswer: say('$0$ eta $4$ ateratzen dira, baina $0$ faltsua da: $\\sqrt{1}\\neq -1$. Ebazpena: $x=4$.', 'Salen $0$ y $4$, pero $0$ es falsa: $\\sqrt{1}\\neq -1$. Solución: $x=4$.', 'يخرج $0$ و$4$، لكن $0$ خاطئ: $\\sqrt{1}\\neq -1$. الحل: $x=4$.', 'You get $0$ and $4$, but $0$ is false: $\\sqrt{1}\\neq -1$. Solution: $x=4$.')
    },
    'quadratic-problems': {
        vocabulary: [
            say('ezezaguna', 'incógnita', 'المجهول', 'unknown'),
            say('baztertu', 'descartar', 'يُستبعد', 'discard'),
            say('azalera', 'área', 'المساحة', 'area')
        ],
        explanation: say(
            'Ezezaguna bere buruaz biderkatzen denean (azalerak, zenbaki jarraien biderkadurak…), bigarren mailako ekuazio bat agertzen da. Begiratu beti emaitzak: luzera, adin edo kantitate negatiboek ez dute balio, eta baztertu egiten dira.',
            'Cuando la incógnita se multiplica por sí misma (áreas, productos de números consecutivos…), aparece una ecuación de segundo grado. Mira siempre los resultados: no valen longitudes, edades ni cantidades negativas, y se descartan.',
            'عندما يُضرب المجهول في نفسه (مساحات، جداءات أعداد متتالية…) تظهر معادلة من الدرجة الثانية. انظر دائمًا في النتائج: لا تصح الأطوال ولا الأعمار ولا الكميات السالبة، وكل حل منها يُستبعد.',
            'When the unknown is multiplied by itself (areas, products of consecutive numbers…), a quadratic equation appears. Always look at the results: negative lengths, ages or amounts are no good, and you discard them.'
        ),
        cases: [
            { title: say('Zenbaki jarraiak', 'Consecutivos', 'أعداد متتالية', 'Consecutive numbers'), text: say('Bi natural jarraik 90 ematen dute biderkatuta: $-10$ baztertu egiten da; 9 eta 10.', 'Dos naturales consecutivos cuyo producto es 90: se descarta $-10$; son 9 y 10.', 'عددان طبيعيان متتاليان جداؤهما 90: يُستبعد $-10$؛ هما 9 و10.', 'Two consecutive natural numbers whose product is 90: $-10$ is discarded; they are 9 and 10.'), math: same('$x(x+1)=90\\ \\to\\ x=9,\\ x=-10$') },
            { title: say('Marrazkiko laukizuzena', 'El rectángulo del dibujo', 'مستطيل الرسم', 'The rectangle in the drawing'), text: say('150 cm² eta 50 cm-ko perimetroa: aldeak $x$ eta $25-x$.', '150 cm² de área y 50 cm de perímetro: los lados son $x$ y $25-x$.', 'مساحته 150 سم² ومحيطه 50 سم: الضلعان $x$ و$25-x$.', 'Area 150 cm² and perimeter 50 cm: the sides are $x$ and $25-x$.'), math: same('$x(25-x)=150\\ \\to\\ x=15,\\ x=10$') }
        ],
        examplePrompt: say('Zenbaki baten karratua ken haren bikoitza 48 da. Zein zenbaki da?', 'El cuadrado de un número menos su doble es 48. ¿Qué número es?', 'مربع عدد ناقص ضعفه يساوي 48. ما العدد؟', 'The square of a number minus twice the number is 48. What is the number?'),
        example: same('$\\begin{gathered}x^{2}-2x-48=0\\\\ x=8,\\ x=-6\\end{gathered}$'),
        exampleAnswer: say('Biek balio dute: $8^{2}-16=48$ eta $(-6)^{2}+12=48$.', 'Valen los dos: $8^{2}-16=48$ y $(-6)^{2}+12=48$.', 'يصح الاثنان: $8^{2}-16=48$ و$(-6)^{2}+12=48$.', 'Both work: $8^{2}-16=48$ and $(-6)^{2}+12=48$.')
    },
    /* ---------- 4. Systems ---------- */
    'two-unknowns': {
        vocabulary: [
            say('bikotea', 'pareja', 'زوج', 'pair'),
            say('zuzena', 'recta', 'مستقيم', 'straight line'),
            say('ekuazio lineala', 'ecuación lineal', 'معادلة خطية', 'linear equation')
        ],
        explanation: say(
            '$ax+by=c$ motako ekuazio batek bi ezezagun ditu, eta ebazpen bat hura betetzen duen $(x,\\,y)$ bikote bat da. Infinitu ditu: eman balio bat $x$ aldagaiari eta askatu $y$. Planoan denak marraztuz gero, zuzen bat osatzen dute; horregatik deitzen zaio ekuazio lineala.',
            'Una ecuación del tipo $ax+by=c$ tiene dos incógnitas, y una solución es una pareja $(x,\\,y)$ que la cumple. Tiene infinitas: da un valor a $x$ y despeja $y$. Si se dibujan todas en el plano, forman una recta; por eso se llama ecuación lineal.',
            'للمعادلة من النوع $ax+by=c$ مجهولان، وحلّها زوج $(x,\\,y)$ يحقّقها. ولها حلول لا نهاية لها: أعطِ $x$ قيمة واعزل $y$. وإذا رسمناها كلها في المستوى كوّنت مستقيمًا؛ لذلك تسمى معادلة خطية.',
            'An equation like $ax+by=c$ has two unknowns, and a solution is a pair $(x,\\,y)$ that satisfies it. It has infinitely many: give $x$ a value and solve for $y$. If you draw them all on the plane, they make a straight line; that is why it is called a linear equation.'
        ),
        cases: [
            { title: say('Marrazkikoa', 'La del dibujo', 'معادلة الرسم', 'The one in the drawing'), text: say('Taulako bikote guztiak zuzen berean daude.', 'Todas las parejas de la tabla están en la misma recta.', 'كل أزواج الجدول على المستقيم نفسه.', 'All the pairs in the table lie on the same straight line.'), math: same('$x+y=5\\ \\to\\ (0,\\,5),\\ (1,\\,4),\\ (2,\\,3)$') },
            { title: say('Bikote bat egiaztatu', 'Comprobar una pareja', 'التحقق من زوج', 'Checking a pair'), text: say('Ordeztu $x$ eta $y$ ekuazioan.', 'Sustituye $x$ e $y$ en la ecuación.', 'عوّض $x$ و$y$ في المعادلة.', 'Put $x$ and $y$ into the equation.'), math: same('$(1,\\,4)\\ \\to\\ 1+4=5$') }
        ],
        examplePrompt: say('Aurkitu $3x-2y=6$ ekuazioaren bi ebazpen.', 'Halla dos soluciones de $3x-2y=6$.', 'أوجد حلّين لـ$3x-2y=6$.', 'Find two solutions of $3x-2y=6$.'),
        example: same('$\\begin{gathered}x=0\\ \\to\\ y=-3\\\\ x=2\\ \\to\\ y=0\\end{gathered}$'),
        exampleAnswer: say('$(0,\\,-3)$ eta $(2,\\,0)$. Egiaztatu: $3\\cdot 2-0=6$.', '$(0,\\,-3)$ y $(2,\\,0)$. Comprueba: $3\\cdot 2-0=6$.', '$(0,\\,-3)$ و$(2,\\,0)$. تحقّق: $3\\cdot 2-0=6$.', '$(0,\\,-3)$ and $(2,\\,0)$. Check: $3\\cdot 2-0=6$.')
    },
    graphic: {
        vocabulary: [
            say('ebaki-puntua', 'punto de corte', 'نقطة التقاطع', 'intersection point'),
            say('paraleloak', 'paralelas', 'متوازيان', 'parallel'),
            say('sistema', 'sistema', 'نظام', 'system')
        ],
        explanation: say(
            'Bi ekuazioko sistema batean, ebazpena biak batera betetzen dituen bikotea da. Ekuazio bakoitza zuzen bat denez, ebazpena ebaki-puntua da: $x+y=4$ eta $x-y=2$ zuzenak $(3,\\,1)$ puntuan ebakitzen dira.',
            'En un sistema de dos ecuaciones, la solución es la pareja que cumple las dos a la vez. Como cada ecuación es una recta, la solución es el punto de corte: $x+y=4$ y $x-y=2$ se cortan en $(3,\\,1)$.',
            'في نظام من معادلتين يكون الحل الزوجَ الذي يحقّقهما معًا. ولأن كل معادلة مستقيم، فالحل نقطة التقاطع: $x+y=4$ و$x-y=2$ يتقاطعان في $(3,\\,1)$.',
            'In a system of two equations, the solution is the pair that satisfies both at once. Since each equation is a straight line, the solution is the intersection point: $x+y=4$ and $x-y=2$ cross at $(3,\\,1)$.'
        ),
        cases: [
            { title: say('Ebakitzen dira', 'Se cortan', 'يتقاطعان', 'They cross'), text: say('Ebazpen bakarra: bateragarri determinatua.', 'Una sola solución: compatible determinado.', 'حل واحد: متوافق محدد.', 'A single solution: consistent and independent.') },
            { title: say('Paraleloak', 'Paralelas', 'متوازيان', 'Parallel'), text: say('Ebazpenik ez: bateraezina.', 'Ninguna solución: incompatible.', 'لا حل: غير متوافق.', 'No solution: inconsistent.'), math: same('$x+y=1\\qquad x+y=3$') },
            { title: say('Berdinak', 'Coinciden', 'منطبقان', 'The same line'), text: say('Infinitu ebazpen: bateragarri indeterminatua.', 'Infinitas soluciones: compatible indeterminado.', 'حلول لا نهاية لها: متوافق غير محدد.', 'Infinitely many solutions: consistent and dependent.'), math: same('$x+y=1\\qquad 2x+2y=2$') }
        ],
        examplePrompt: say('$(2,\\,-1)$ bikotea al da $x+y=1$ eta $3x+y=4$ sistemaren ebazpena?', '¿Es $(2,\\,-1)$ solución del sistema $x+y=1$, $3x+y=4$?', 'هل $(2,\\,-1)$ حل للنظام $x+y=1$، $3x+y=4$؟', 'Is $(2,\\,-1)$ a solution of the system $x+y=1$, $3x+y=4$?'),
        example: same('$\\begin{gathered}2+(-1)=1\\\\ 3\\cdot 2+(-1)=5\\neq 4\\end{gathered}$'),
        exampleAnswer: say('Ez: lehena betetzen du, baina ez bigarrena.', 'No: cumple la primera, pero no la segunda.', 'لا: يحقق الأولى لا الثانية.', 'No: it satisfies the first one, but not the second.')
    },
    substitution: {
        vocabulary: [
            say('askatu', 'despejar', 'اعزل', 'solve for'),
            say('ordeztu', 'sustituir', 'عوّض', 'substitute'),
            say('parentesia', 'paréntesis', 'قوسين', 'brackets')
        ],
        explanation: say(
            'Askatu ezezagun bat ekuazio batean (hobe koefizientea 1 edo $-1$ duena), ordeztu adierazpen hori beste ekuazioan, ebatzi ateratzen den ezezagun bakarreko ekuazioa eta kalkulatu bestea. Ordeztean, jarri adierazpena parentesi artean.',
            'Despeja una incógnita en una ecuación (mejor la de coeficiente 1 o $-1$), sustituye esa expresión en la otra, resuelve la ecuación de una incógnita que sale y calcula la otra. Al sustituir, pon la expresión entre paréntesis.',
            'اعزل مجهولًا في إحدى المعادلتين (الأفضل الذي معامله 1 أو $-1$)، وعوّض تلك العبارة في الأخرى، وحلّ المعادلة ذات المجهول الواحد الناتجة، ثم احسب الآخر. وعند التعويض ضع العبارة بين قوسين.',
            'Solve for one unknown in one equation (best the one with coefficient 1 or $-1$), substitute that expression into the other, solve the one-unknown equation you get and work out the other. When you substitute, put the expression in brackets.'
        ),
        cases: [
            { title: say('Askatu', 'Despeja', 'اعزل', 'Solve for'), text: say('Marrazkiko sisteman, $2x+y=7$ ekuaziotik:', 'En el sistema del dibujo, de $2x+y=7$:', 'في نظام الرسم، من $2x+y=7$:', 'In the system in the drawing, from $2x+y=7$:'), math: same('$y=7-2x$') },
            { title: say('Ordeztu', 'Sustituye', 'عوّض', 'Substitute'), text: say('$x-y=2$ ekuazioan, parentesiarekin.', 'En $x-y=2$, con paréntesis.', 'في $x-y=2$، مع القوسين.', 'Into $x-y=2$, with brackets.'), math: same('$x-(7-2x)=2\\ \\to\\ x=3$') },
            { title: say('Bestea', 'La otra', 'الآخر', 'The other'), text: say('Itzuli askatutako adierazpenera.', 'Vuelve a la expresión despejada.', 'ارجع إلى العبارة المعزولة.', 'Go back to the expression you solved for.'), math: same('$y=7-2\\cdot 3=1$') }
        ],
        examplePrompt: say('Ebatzi ordezkapenez: $x+y=6$ eta $3x-y=2$.', 'Resuelve por sustitución: $x+y=6$ y $3x-y=2$.', 'حلّ بطريقة التعويض: $x+y=6$ و$3x-y=2$.', 'Solve by substitution: $x+y=6$ and $3x-y=2$.'),
        example: same('$\\begin{gathered}y=6-x\\\\ 3x-(6-x)=2\\ \\to\\ x=2\\\\ y=6-2=4\\end{gathered}$'),
        exampleAnswer: say('Ebazpena: $x=2$, $y=4$.', 'Solución: $x=2$, $y=4$.', 'الحل: $x=2$، $y=4$.', 'Solution: $x=2$, $y=4$.')
    },
    /* ---------- 5. Methods ---------- */
    equalization: {
        vocabulary: [
            say('berdindu', 'igualar', 'المساواة', 'equate'),
            say('adierazpena', 'expresión', 'العبارة', 'expression'),
            say('ezezaguna', 'incógnita', 'المجهول', 'unknown')
        ],
        explanation: say(
            'Askatu ezezagun bera bi ekuazioetan; bi adierazpenek gauza bera balio dutenez, berdindu itzazu. Ebatzi eta ordeztu emaitza haietako batean. Metodorik naturalena da bi ekuazioek ezezagun bat askatuta dutenean.',
            'Despeja la misma incógnita en las dos ecuaciones; como las dos expresiones valen lo mismo, iguálalas. Resuelve y sustituye el resultado en una de ellas. Es el método más natural cuando las dos ecuaciones ya tienen una incógnita despejada.',
            'اعزل المجهول نفسه في المعادلتين؛ ولأن العبارتين متساويتان فساوِ بينهما. حلّ وعوّض النتيجة في إحداهما. وهي الطريقة الأنسب حين يكون في المعادلتين مجهول معزول.',
            'Solve for the same unknown in both equations; since the two expressions are equal, equate them. Solve and substitute the result into one of them. It is the most natural method when both equations already have an unknown on its own.'
        ),
        cases: [
            { title: say('Marrazkiko sistema', 'El sistema del dibujo', 'نظام الرسم', 'The system in the drawing'), text: say('$2x+y=7$ eta $x-y=2$: $y=7-2x$ eta $y=x-2$.', '$2x+y=7$ y $x-y=2$: $y=7-2x$ e $y=x-2$.', '$2x+y=7$ و$x-y=2$: $y=7-2x$ و$y=x-2$.', '$2x+y=7$ and $x-y=2$: $y=7-2x$ and $y=x-2$.'), math: same('$7-2x=x-2\\ \\to\\ x=3$') },
            { title: say('Bestea', 'La otra', 'الآخر', 'The other'), text: say('Ordeztu adierazpen batean.', 'Sustituye en una de las expresiones.', 'عوّض في إحدى العبارتين.', 'Substitute into one of the expressions.'), math: same('$y=3-2=1$') }
        ],
        why: {
            text: say(
                'Hiru metodoek bikote bera ematen dute, ebazpena bi zuzenen ebaki-puntua delako, eta puntu hori ez dago bidearen mende. $2x+y=7$ eta $x-y=2$ sistemarekin, hirurek $(3,\\,1)$ ematen dute.',
                'Los tres métodos dan la misma pareja, porque la solución es el punto de corte de las dos rectas, y ese punto no depende del camino. Con $2x+y=7$ y $x-y=2$, los tres dan $(3,\\,1)$.',
                'تعطي الطرق الثلاث الزوج نفسه، لأن الحل نقطة تقاطع المستقيمين، وهذه النقطة لا تتعلق بالطريق. ومع $2x+y=7$ و$x-y=2$ تعطي الثلاث $(3,\\,1)$.',
                'The three methods give the same pair, because the solution is where the two lines cross, and that point does not depend on the route. With $2x+y=7$ and $x-y=2$, all three give $(3,\\,1)$.'
            ),
            math: same('$2\\cdot 3+1=7\\qquad 3-1=2$')
        },
        examplePrompt: say('Ebatzi berdinketaz: $y=3x-4$ eta $y=x+6$.', 'Resuelve por igualación: $y=3x-4$ e $y=x+6$.', 'حلّ بطريقة المساواة: $y=3x-4$ و$y=x+6$.', 'Solve by equating: $y=3x-4$ and $y=x+6$.'),
        example: same('$\\begin{gathered}3x-4=x+6\\ \\to\\ x=5\\\\ y=5+6=11\\end{gathered}$'),
        exampleAnswer: say('Ebazpena: $x=5$, $y=11$.', 'Solución: $x=5$, $y=11$.', 'الحل: $x=5$، $y=11$.', 'Solution: $x=5$, $y=11$.')
    },
    reduction: {
        vocabulary: [
            say('aurkakoak', 'opuestos', 'متعاكسان', 'opposites'),
            say('koefizientea', 'coeficiente', 'معامل', 'coefficient'),
            say('batu', 'sumar', 'اجمع', 'add')
        ],
        explanation: say(
            'Biderkatu ekuazioak zenbaki egokiez, ezezagun baten koefizienteak aurkakoak izan daitezen; bi ekuazioak batzean, ezezagun hori desagertu egiten da. Sistemak parentesiak edo izendatzaileak baditu, idatzi lehenik ekuazio bakoitza $ax+by=c$ moduan.',
            'Multiplica las ecuaciones por los números adecuados para que los coeficientes de una incógnita sean opuestos; al sumar las dos ecuaciones, esa incógnita desaparece. Si el sistema trae paréntesis o denominadores, escribe antes cada ecuación como $ax+by=c$.',
            'اضرب المعادلتين في أعداد مناسبة ليصير معاملا أحد المجهولين متعاكسين؛ وعند جمع المعادلتين يختفي ذلك المجهول. وإذا كان في النظام أقواس أو مقامات فاكتب أولًا كل معادلة على الصورة $ax+by=c$.',
            'Multiply the equations by suitable numbers so that the coefficients of one unknown are opposites; when you add the two equations, that unknown disappears. If the system has brackets or denominators, first write each equation as $ax+by=c$.'
        ),
        cases: [
            { title: say('Jada aurkakoak', 'Ya opuestos', 'متعاكسان أصلًا', 'Already opposites'), text: say('Marrazkian, $+y$ eta $-y$: zuzenean batzen da.', 'En el dibujo, $+y$ y $-y$: se suma directamente.', 'في الرسم $+y$ و$-y$: نجمع مباشرة.', 'In the drawing, $+y$ and $-y$: add straight away.'), math: same('$(2x+y)+(x-y)=7+2\\ \\to\\ 3x=9$') },
            { title: say('Biderkatuz', 'Multiplicando', 'بالضرب', 'Multiplying'), text: say('$3x+2y=13$ bider 2 eginda, $6x+4y=26$, $5x-4y=7$ ekuazioaren aurkakoa:', '$3x+2y=13$ por 2 da $6x+4y=26$, opuesta a $5x-4y=7$:', '$3x+2y=13$ في 2 تعطي $6x+4y=26$، المعاكسة لـ$5x-4y=7$:', '$3x+2y=13$ times 2 is $6x+4y=26$, the opposite of $5x-4y=7$:'), math: same('$11x=33\\ \\to\\ x=3$') }
        ],
        examplePrompt: say('Ebatzi laburketaz: $x+3y=7$ eta $2x-3y=-4$.', 'Resuelve por reducción: $x+3y=7$ y $2x-3y=-4$.', 'حلّ بطريقة الحذف: $x+3y=7$ و$2x-3y=-4$.', 'Solve by elimination: $x+3y=7$ and $2x-3y=-4$.'),
        example: same('$\\begin{gathered}3x=3\\ \\to\\ x=1\\\\ 1+3y=7\\ \\to\\ y=2\\end{gathered}$'),
        exampleAnswer: say('$y$ aldagaiaren koefizienteak jada aurkakoak ziren: $x=1$, $y=2$.', 'Los coeficientes de $y$ ya eran opuestos: $x=1$, $y=2$.', 'معاملا $y$ كانا متعاكسين أصلًا: $x=1$، $y=2$.', 'The coefficients of $y$ were already opposites: $x=1$, $y=2$.')
    },
    'system-problems': {
        vocabulary: [
            say('baldintza', 'condición', 'شرط', 'condition'),
            say('ezezaguna', 'incógnita', 'مجهول', 'unknown'),
            say('ekuazioa', 'ecuación', 'معادلة', 'equation')
        ],
        explanation: say(
            'Problemak bi kantitate ezezagun baditu, deitu $x$ eta $y$, eta bilatu bi baldintza: bakoitza ekuazio bat da. Ebatzi, egiaztatu bi baldintzak eta erantzun esaldi batez.',
            'Si el problema tiene dos cantidades desconocidas, llámalas $x$ e $y$ y busca dos condiciones: cada una es una ecuación. Resuelve, comprueba las dos condiciones y responde con una frase.',
            'إذا كان في المسألة كميتان مجهولتان فسمّهما $x$ و$y$ وابحث عن شرطين: كل شرط معادلة. حلّ، وتحقّق من الشرطين، وأجب بجملة.',
            'If the problem has two unknown amounts, call them $x$ and $y$ and look for two conditions: each one is an equation. Solve, check both conditions and answer with a sentence.'
        ),
        cases: [
            { title: say('Oiloak eta untxiak', 'Gallinas y conejos', 'دجاج وأرانب', 'Hens and rabbits'), text: say('Marrazkikoak: 20 buru eta 56 hanka.', 'Las del dibujo: 20 cabezas y 56 patas.', 'التي في الرسم: 20 رأسًا و56 رجلًا.', 'The ones in the drawing: 20 heads and 56 legs.'), math: same('$x+y=20\\qquad 2x+4y=56$') },
            { title: say('Ordezkapenez', 'Por sustitución', 'بالتعويض', 'By substitution'), text: say('12 oilo eta 8 untxi.', '12 gallinas y 8 conejos.', '12 دجاجة و8 أرانب.', '12 hens and 8 rabbits.'), math: same('$x=20-y\\ \\to\\ 40+2y=56\\ \\to\\ y=8$') }
        ],
        examplePrompt: say('2 kg sagarrek eta 1 kg udarek 5 € balio dute; 1 kg sagarrek eta 3 kg udarek, $7{,}50$ €. Zenbat balio du fruta bakoitzaren kiloak?', '2 kg de manzanas y 1 kg de peras cuestan 5 €; 1 kg de manzanas y 3 kg de peras, $7{,}50$ €. ¿Cuánto cuesta el kilo de cada fruta?', 'ثمن 2 كغ من التفاح و1 كغ من الإجاص 5 €؛ وثمن 1 كغ من التفاح و3 كغ من الإجاص $7{,}50$ €. كم ثمن كيلوغرام كل فاكهة؟', '2 kg of apples and 1 kg of pears cost €5; 1 kg of apples and 3 kg of pears, €$7{,}50$. How much is a kilo of each fruit?'),
        example: same('$\\begin{gathered}2x+y=5\\qquad x+3y=7{,}5\\\\ x=1{,}5\\qquad y=2\\end{gathered}$'),
        exampleAnswer: say('Sagarrak $1{,}50$ €/kg eta udareak 2 €/kg. Egiaztatu: $3+2=5$.', 'Las manzanas, $1{,}50$ €/kg; las peras, 2 €/kg. Comprueba: $3+2=5$.', 'التفاح $1{,}50$ €/كغ والإجاص 2 €/كغ. تحقّق: $3+2=5$.', 'Apples €$1{,}50$/kg; pears €2/kg. Check: $3+2=5$.')
    }
}

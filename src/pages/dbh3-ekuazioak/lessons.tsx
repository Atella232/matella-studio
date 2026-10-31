import type { UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { BalanceFigure } from '../dbh1-aljebra-v2/figures'
import { DenominatorsFigure, DiscriminantFigure, StepsFigure, ZeroProductFigure } from '../dbh2-ekuazioak-v2/figures'
import { AreaProblemFigure, EqualizationFigure, LinearSolutionsFigure, QuadraticFormulaFigure, ReductionFigure, SubstitutionFigure, SystemProblemFigure, SystemTypesFigure } from '../dbh4-aplikatuak-ekuazioak/figures'
import { AgesFigure } from './figures'
import { say, same } from './text'

/* ==========================================================================
   Ekuazioak eta sistemak · 3. DBH — stages and lessons, following
   Santillana 3.º ESO units 6 «Ecuaciones de primer y segundo grado» and 7
   «Sistemas de ecuaciones», and Anaya 3.º ESO units 6 and 7 (same names).
   Every number and context is original: the books only fix the scope and
   the order. Each lesson names its typical mistake.
   ========================================================================== */

export type Equations3StageId = 'linear' | 'quadratic' | 'systems' | 'methods' | 'problems'

export const equations3Stages: UnitStage[] = [
    { id: 'linear', tone: 'blue', title: { eu: 'Lehen mailakoak', es: 'Primer grado', en: 'First degree', ar: 'الدرجة الأولى' } },
    { id: 'quadratic', tone: 'violet', title: { eu: 'Bigarren mailakoak', es: 'Segundo grado', en: 'Second degree', ar: 'الدرجة الثانية' } },
    { id: 'systems', tone: 'mustard', title: { eu: 'Sistemak', es: 'Sistemas', en: 'Systems', ar: 'الأنظمة' } },
    { id: 'methods', tone: 'coral', title: { eu: 'Ebazteko metodoak', es: 'Métodos de resolución', en: 'Methods of solving', ar: 'طرق الحل' } },
    { id: 'problems', tone: 'green', title: { eu: 'Problemak', es: 'Problemas', en: 'Problems', ar: 'المسائل' } }
]

export const equations3Topics: UnitTopic[] = [
    /* ---------- 1. First degree ---------- */
    {
        id: 'equations',
        stage: 'linear',
        title: say('Ekuazioak eta identitateak', 'Ecuaciones e identidades', 'المعادلات والمتطابقات', 'Equations and identities'),
        goal: say('Ekuazio bat identitate batetik bereiztea eta ekuazio baliokideak lortzea.', 'Distinguir una ecuación de una identidad y obtener ecuaciones equivalentes.', 'التمييز بين المعادلة والمتطابقة والحصول على معادلات مكافئة.', 'Tell an equation from an identity and get equivalent equations.'),
        explanation: say(
            'Ekuazio bat letrak dituen berdintza bat da, balio batzuetarako bakarrik betetzen dena: $2x+1=7$ betetzen da $x=3$ denean bakarrik. Identitate bat, berriz, beti betetzen da: $2(x+1)=2x+2$. Ekuazioa ebaztea ebazpena aurkitzea da. Horretarako ekuazio baliokideak idazten dira (ebazpen bera dutenak): bi ataletan gauza bera batu edo kendu, edo bi atalak zenbaki beraz (0 ez dena) biderkatu edo zatitu. Balantza bat bezala da: bi aldeetan gauza bera egiten bada, oreka mantentzen da.',
            'Una ecuación es una igualdad con letras que solo se cumple para algunos valores: $2x+1=7$ se cumple solo si $x=3$. Una identidad, en cambio, se cumple siempre: $2(x+1)=2x+2$. Resolver una ecuación es encontrar su solución. Para ello se escriben ecuaciones equivalentes (con la misma solución): sumar o restar lo mismo en los dos miembros, o multiplicar o dividir los dos miembros por el mismo número distinto de 0. Es como una balanza: si se hace lo mismo en los dos platillos, sigue en equilibrio.',
            'المعادلة مساواة فيها حروف لا تتحقق إلا لبعض القيم: $2x+1=7$ تتحقق فقط عندما $x=3$. أما المتطابقة فتتحقق دائمًا: $2(x+1)=2x+2$. وحلّ المعادلة هو إيجاد حلّها. ولذلك نكتب معادلات مكافئة (لها الحل نفسه): نجمع أو نطرح الشيء نفسه في الطرفين، أو نضرب الطرفين أو نقسمهما على العدد نفسه غير الصفر. إنها كالميزان: إذا فعلنا الشيء نفسه في الكفتين يبقى متوازنًا.',
            'An equation is an equality with letters that holds only for some values: $2x+1=7$ holds only when $x=3$. An identity, on the other hand, always holds: $2(x+1)=2x+2$. Solving an equation means finding its solution. To do so you write equivalent equations (with the same solution): add or subtract the same on both sides, or multiply or divide both sides by the same non-zero number. It is like a balance: if you do the same to both pans, it stays level.'
        ),
        problem: same('$5x-4=3x+6$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Kendu $3x$ bi ataletan.', 'Resta $3x$ en los dos miembros.', 'اطرح $3x$ من الطرفين.', 'Subtract $3x$ from both sides.'), math: same('$2x-4=6$') },
            { text: say('Batu 4 bi ataletan.', 'Suma 4 en los dos miembros.', 'أضف 4 إلى الطرفين.', 'Add 4 to both sides.'), math: same('$2x=10$') },
            { text: say('Zatitu bi atalak 2 zenbakiaz.', 'Divide los dos miembros entre 2.', 'اقسم الطرفين على 2.', 'Divide both sides by 2.'), math: same('$x=5$') },
            { text: say('Egiaztatu: bi atalek 21 balio dute.', 'Comprueba: los dos miembros valen 21.', 'تحقّق: قيمة كل طرف 21.', 'Check: both sides are worth 21.'), math: same('$5\\cdot 5-4=3\\cdot 5+6$') }
        ],
        example: same('$3(x-1)=3x-3$'),
        mistake: {
            wrong: say('$2x=10$ ekuaziotik $x=10-2=8$.', 'De $2x=10$ sale $x=10-2=8$.', 'من $2x=10$ نحصل على $x=10-2=8$.', 'From $2x=10$ you get $x=10-2=8$.'),
            right: say('$2x$ bider 2 da: bi atalak zatitu behar dira, $x=10\\div 2=5$.', '$2x$ es 2 por $x$: hay que dividir los dos miembros, $x=10\\div 2=5$.', '$2x$ هو 2 في $x$: يجب قسمة الطرفين، $x=10\\div 2=5$.', '$2x$ is 2 times $x$: divide both sides, $x=10\\div 2=5$.')
        },
        takeaway: say('Bi ataletan gauza bera: $A=B\\Rightarrow A+C=B+C$.', 'Lo mismo en los dos miembros: $A=B\\Rightarrow A+C=B+C$.', 'الشيء نفسه في الطرفين: $A=B\\Rightarrow A+C=B+C$.', 'The same on both sides: $A=B\\Rightarrow A+C=B+C$.'),
        figure: (language) => <BalanceFigure language={language} />
    },
    {
        id: 'brackets',
        stage: 'linear',
        title: say('Parentesiak dituzten ekuazioak', 'Ecuaciones con paréntesis', 'معادلات بأقواس', 'Equations with brackets'),
        goal: say('Parentesiak kendu eta lehen mailako ekuazio bat ebaztea.', 'Quitar paréntesis y resolver una ecuación de primer grado.', 'إزالة الأقواس وحلّ معادلة من الدرجة الأولى.', 'Remove brackets and solve a first-degree equation.'),
        explanation: say(
            'Ordena hau jarraitzen da: (1) parentesiak kendu, zenbakia gai guztiez biderkatuz; (2) $x$ duten gaiak atal batera eta zenbakiak bestera eraman; (3) antzekoak laburtu; (4) $x$ bakandu. Parentesiaren aurrean minus bat badago, barruko zeinu guztiak aldatzen dira: $-(2x-3)=-2x+3$. Atal batetik bestera igarotzean, batzen zena kentzen da eta alderantziz.',
            'Se sigue este orden: (1) quitar paréntesis, multiplicando el número por todos los términos; (2) pasar los términos con $x$ a un miembro y los números al otro; (3) reducir los semejantes; (4) despejar $x$. Si delante del paréntesis hay un menos, cambian todos los signos de dentro: $-(2x-3)=-2x+3$. Al pasar de un miembro a otro, lo que suma pasa restando y al revés.',
            'نتبع هذا الترتيب: (1) نزيل الأقواس بضرب العدد في كل الحدود؛ (2) ننقل الحدود التي فيها $x$ إلى طرف والأعداد إلى الآخر؛ (3) نختصر المتشابهة؛ (4) نعزل $x$. وإذا سبق القوسَ سالبٌ تتغيّر كل الإشارات داخله: $-(2x-3)=-2x+3$. وعند النقل من طرف إلى آخر يصير الجمع طرحًا والعكس.',
            'Follow this order: (1) remove the brackets, multiplying the number by every term; (2) move the terms with $x$ to one side and the numbers to the other; (3) collect like terms; (4) isolate $x$. If there is a minus in front of the brackets, every sign inside changes: $-(2x-3)=-2x+3$. When a term moves to the other side, adding becomes subtracting and the other way round.'
        ),
        problem: same('$3(x-2)-(x-4)=8$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Kendu parentesiak.', 'Quita los paréntesis.', 'أزل الأقواس.', 'Remove the brackets.'), math: same('$3x-6-x+4=8$') },
            { text: say('Laburtu.', 'Reduce.', 'اختصر.', 'Collect like terms.'), math: same('$2x-2=8$') },
            { text: say('Igaro $-2$ beste atalera.', 'Pasa el $-2$ al otro miembro.', 'انقل $-2$ إلى الطرف الآخر.', 'Move the $-2$ to the other side.'), math: same('$2x=10$') },
            { text: say('Bakandu $x$.', 'Despeja $x$.', 'اعزل $x$.', 'Isolate $x$.'), math: same('$x=5$') }
        ],
        example: same('$4-2(x+1)=x-7\\ \\to\\ x=3$'),
        mistake: {
            wrong: say('$-(x-4)=-x-4$', '$-(x-4)=-x-4$', '$-(x-4)=-x-4$', '$-(x-4)=-x-4$'),
            right: say('Minusak parentesiko gai guztiei eragiten die: $-(x-4)=-x+4$.', 'El menos afecta a todos los términos: $-(x-4)=-x+4$.', 'السالب يؤثر في كل الحدود: $-(x-4)=-x+4$.', 'The minus affects every term: $-(x-4)=-x+4$.')
        },
        takeaway: say('$-(A-B)=-A+B$: zeinu guztiak aldatzen dira.', '$-(A-B)=-A+B$: cambian todos los signos.', '$-(A-B)=-A+B$: تتغيّر كل الإشارات.', '$-(A-B)=-A+B$: every sign changes.'),
        figure: (language) => <StepsFigure language={language} />
    },
    {
        id: 'denominators',
        stage: 'linear',
        title: say('Izendatzaileak dituzten ekuazioak', 'Ecuaciones con denominadores', 'معادلات بمقامات', 'Equations with denominators'),
        goal: say('Izendatzaileak kentzea m.k.t.-az biderkatuz.', 'Quitar denominadores multiplicando por el m.c.m.', 'إزالة المقامات بالضرب في المضاعف المشترك الأصغر.', 'Clear the denominators by multiplying by the LCM.'),
        explanation: say(
            'Izendatzaileak kentzeko, bi atalak izendatzaile guztien m.k.t.-az biderkatzen dira. Gai guztiak biderkatu behar dira, izendatzailerik ez dutenak ere bai. Zenbakitzailean batuketa bat badago, parentesi artean jarri behar da, izendatzailearen aurreko minusak gai guztiei eragiten baitie: $-\\frac{x-1}{3}$ bider 6 da $-2(x-1)$.',
            'Para quitar los denominadores se multiplican los dos miembros por el m.c.m. de todos los denominadores. Hay que multiplicar todos los términos, también los que no tienen denominador. Si en el numerador hay una suma, se pone entre paréntesis, porque el menos que hay delante de la fracción afecta a todos los términos: $-\\frac{x-1}{3}$ por 6 es $-2(x-1)$.',
            'لإزالة المقامات نضرب الطرفين في المضاعف المشترك الأصغر لكل المقامات. ويجب ضرب كل الحدود، حتى التي بلا مقام. وإذا كان في البسط جمع نضعه بين قوسين، لأن السالب أمام الكسر يؤثر في كل الحدود: $-\\frac{x-1}{3}$ في 6 يساوي $-2(x-1)$.',
            'To clear the denominators, multiply both sides by the LCM of all the denominators. Every term must be multiplied, including those without a denominator. If the numerator is a sum, put it in brackets, because the minus in front of the fraction affects every term: $-\\frac{x-1}{3}$ times 6 is $-2(x-1)$.'
        ),
        problem: same('$\\frac{x}{2}-\\frac{x-1}{3}=2$'),
        stepsKind: 'steps',
        steps: [
            { text: say('m.k.t.$(2,3)=6$. Biderkatu gai guztiak 6 zenbakiaz.', 'm.c.m.$(2,3)=6$. Multiplica todos los términos por 6.', 'م.م.أ.$(2,3)=6$. اضرب كل الحدود في 6.', 'LCM$(2,3)=6$. Multiply every term by 6.'), math: same('$3x-2(x-1)=12$') },
            { text: say('Kendu parentesia.', 'Quita el paréntesis.', 'أزل القوس.', 'Remove the brackets.'), math: same('$3x-2x+2=12$') },
            { text: say('Bakandu $x$.', 'Despeja $x$.', 'اعزل $x$.', 'Isolate $x$.'), math: same('$x=10$') }
        ],
        example: same('$\\frac{x}{4}+1=\\frac{x}{2}\\ \\to\\ x=4$'),
        mistake: {
            wrong: say('$\\frac{x}{3}+2=5$ bider 3: $x+2=15$.', '$\\frac{x}{3}+2=5$ por 3: $x+2=15$.', '$\\frac{x}{3}+2=5$ في 3: $x+2=15$.', '$\\frac{x}{3}+2=5$ times 3: $x+2=15$.'),
            right: say('Gai guztiak biderkatzen dira, 2 ere bai: $x+6=15$, $x=9$.', 'Se multiplican todos los términos, también el 2: $x+6=15$, $x=9$.', 'تُضرب كل الحدود، حتى 2: $x+6=15$، $x=9$.', 'Every term is multiplied, the 2 as well: $x+6=15$, $x=9$.')
        },
        takeaway: say('m.k.t.-az biderkatu GAI GUZTIAK: $\\frac{A}{B}\\cdot M$.', 'Multiplica por el m.c.m. TODOS los términos: $\\frac{A}{B}\\cdot M$.', 'اضرب كل الحدود في م.م.أ.: $\\frac{A}{B}\\cdot M$.', 'Multiply EVERY term by the LCM: $\\frac{A}{B}\\cdot M$.'),
        figure: (language) => <DenominatorsFigure language={language} />
    },
    /* ---------- 2. Second degree ---------- */
    {
        id: 'incomplete',
        stage: 'quadratic',
        title: say('Bigarren mailako ekuazio osatugabeak', 'Ecuaciones de segundo grado incompletas', 'معادلات الدرجة الثانية الناقصة', 'Incomplete quadratic equations'),
        goal: say('$ax^{2}+c=0$ eta $ax^{2}+bx=0$ ekuazioak formularik gabe ebaztea.', 'Resolver $ax^{2}+c=0$ y $ax^{2}+bx=0$ sin fórmula.', 'حلّ $ax^{2}+c=0$ و$ax^{2}+bx=0$ بلا صيغة.', 'Solve $ax^{2}+c=0$ and $ax^{2}+bx=0$ without the formula.'),
        explanation: say(
            'Bigarren mailako ekuazio batek $ax^{2}+bx+c=0$ forma du, $a\\neq 0$ izanik. $b$ edo $c$ zero bada, osatugabea da. $b=0$ bada ($ax^{2}+c=0$), $x^{2}$ bakandu eta erro karratua atera: bi ebazpen ditu, $+$ eta $-$, edo bat ere ez $x^{2}$ negatiboa bada. $c=0$ bada ($ax^{2}+bx=0$), atera $x$ faktore komun gisa: $x(ax+b)=0$. Biderkadura bat zero da faktoreren bat zero bada, beraz $x=0$ beti da ebazpen bat.',
            'Una ecuación de segundo grado tiene la forma $ax^{2}+bx+c=0$, con $a\\neq 0$. Si $b$ o $c$ valen cero, es incompleta. Si $b=0$ ($ax^{2}+c=0$), despeja $x^{2}$ y saca la raíz cuadrada: tiene dos soluciones, con $+$ y con $-$, o ninguna si $x^{2}$ sale negativo. Si $c=0$ ($ax^{2}+bx=0$), saca $x$ factor común: $x(ax+b)=0$. Un producto es cero si algún factor es cero, así que $x=0$ siempre es una solución.',
            'معادلة الدرجة الثانية على الصورة $ax^{2}+bx+c=0$ مع $a\\neq 0$. وإذا كان $b$ أو $c$ صفرًا فهي ناقصة. إذا $b=0$ ($ax^{2}+c=0$) نعزل $x^{2}$ ونأخذ الجذر التربيعي: لها حلّان، بـ$+$ وبـ$-$، أو لا حل إذا كان $x^{2}$ سالبًا. وإذا $c=0$ ($ax^{2}+bx=0$) نُخرج $x$ عاملًا مشتركًا: $x(ax+b)=0$. والجداء صفر إذا كان أحد عوامله صفرًا، لذا $x=0$ حلّ دائمًا.',
            'A quadratic equation has the form $ax^{2}+bx+c=0$, with $a\\neq 0$. If $b$ or $c$ is zero, it is incomplete. If $b=0$ ($ax^{2}+c=0$), isolate $x^{2}$ and take the square root: there are two solutions, with $+$ and with $-$, or none if $x^{2}$ comes out negative. If $c=0$ ($ax^{2}+bx=0$), take $x$ out as a common factor: $x(ax+b)=0$. A product is zero if some factor is zero, so $x=0$ is always a solution.'
        ),
        cases: [
            { title: same('$ax^{2}+c=0$'), text: say('$x^{2}$ bakandu eta erroa atera.', 'Despeja $x^{2}$ y saca la raíz.', 'اعزل $x^{2}$ وخذ الجذر.', 'Isolate $x^{2}$ and take the root.'), math: same('$2x^{2}-18=0\\ \\to\\ x^{2}=9\\ \\to\\ x=\\pm 3$') },
            { title: same('$ax^{2}+bx=0$'), text: say('$x$ faktore komuna.', 'Factor común $x$.', 'العامل المشترك $x$.', 'Common factor $x$.'), math: same('$x^{2}-5x=0\\ \\to\\ x(x-5)=0\\ \\to\\ x=0,\\ x=5$') }
        ],
        problem: same('$3x^{2}-48=0$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Bakandu $x^{2}$.', 'Despeja $x^{2}$.', 'اعزل $x^{2}$.', 'Isolate $x^{2}$.'), math: same('$x^{2}=48\\div 3=16$') },
            { text: say('Atera erroa, bi zeinuekin.', 'Saca la raíz, con los dos signos.', 'خذ الجذر بالإشارتين.', 'Take the root, with both signs.'), math: same('$x=4,\\ x=-4$') }
        ],
        example: same('$x^{2}+9=0\\ \\to\\ x^{2}=-9$'),
        mistake: {
            wrong: say('$x^{2}=4x$ eta $x$ ezezagunaz zatitzen dut: $x=4$ bakarrik.', '$x^{2}=4x$, divido entre $x$: solo $x=4$.', '$x^{2}=4x$، أقسم على $x$: $x=4$ فقط.', '$x^{2}=4x$, divide by $x$: only $x=4$.'),
            right: say('$x$ ezezagunaz zatitzean $x=0$ galtzen da. Faktore komuna: $x(x-4)=0$, $x=0$ eta $x=4$.', 'Al dividir entre $x$ se pierde $x=0$. Factor común: $x(x-4)=0$, $x=0$ y $x=4$.', 'بالقسمة على $x$ نفقد $x=0$. العامل المشترك: $x(x-4)=0$، $x=0$ و$x=4$.', 'Dividing by $x$ loses $x=0$. Common factor: $x(x-4)=0$, $x=0$ and $x=4$.')
        },
        takeaway: say('$X(AX+B)=0\\Rightarrow X=0$ EDO $AX+B=0$.', '$X(AX+B)=0\\Rightarrow X=0$ O $AX+B=0$.', '$X(AX+B)=0\\Rightarrow X=0$ أو $AX+B=0$.', '$X(AX+B)=0\\Rightarrow X=0$ OR $AX+B=0$.'),
        figure: (language) => <ZeroProductFigure language={language} />
    },
    {
        id: 'formula',
        stage: 'quadratic',
        title: say('Formula orokorra', 'La fórmula general', 'الصيغة العامة', 'The quadratic formula'),
        goal: say('Bigarren mailako ekuazio osoak formularekin ebaztea.', 'Resolver ecuaciones de segundo grado completas con la fórmula.', 'حلّ معادلات الدرجة الثانية التامة بالصيغة.', 'Solve complete quadratic equations with the formula.'),
        explanation: say(
            '$ax^{2}+bx+c=0$ ekuazioaren ebazpenak hauek dira: $x=\\frac{-b\\pm\\sqrt{b^{2}-4ac}}{2a}$. Lehenik, ekuazioa forma horretan jarri behar da (dena atal batean, zero bestean) eta $a$, $b$ eta $c$ irakurri, zeinuekin. Gero, kalkulatu erro barrukoa, atera erroa eta egin bi kontuak: bata $+$ zeinuarekin, bestea $-$ zeinuarekin. Kontuz $-b$ zeinuarekin: $b=-5$ bada, $-b=5$.',
            'Las soluciones de $ax^{2}+bx+c=0$ son $x=\\frac{-b\\pm\\sqrt{b^{2}-4ac}}{2a}$. Primero hay que poner la ecuación en esa forma (todo en un miembro y cero en el otro) y leer $a$, $b$ y $c$ con su signo. Después calcula lo de dentro de la raíz, saca la raíz y haz las dos cuentas: una con $+$ y otra con $-$. Cuidado con $-b$: si $b=-5$, $-b=5$.',
            'حلول $ax^{2}+bx+c=0$ هي $x=\\frac{-b\\pm\\sqrt{b^{2}-4ac}}{2a}$. أولًا نكتب المعادلة بهذه الصورة (كل شيء في طرف والصفر في الآخر) ونقرأ $a$ و$b$ و$c$ بإشاراتها. ثم نحسب ما تحت الجذر ونأخذ الجذر ونجري الحسابين: واحد بـ$+$ وآخر بـ$-$. انتبه إلى $-b$: إذا $b=-5$ فإن $-b=5$.',
            'The solutions of $ax^{2}+bx+c=0$ are $x=\\frac{-b\\pm\\sqrt{b^{2}-4ac}}{2a}$. First write the equation in that form (everything on one side and zero on the other) and read $a$, $b$ and $c$ with their signs. Then work out what is under the root, take the root and do both sums: one with $+$ and one with $-$. Careful with $-b$: if $b=-5$, $-b=5$.'
        ),
        problem: same('$x^{2}-5x+6=0$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Irakurri koefizienteak.', 'Lee los coeficientes.', 'اقرأ المعاملات.', 'Read the coefficients.'), math: same('$a=1,\\ b=-5,\\ c=6$') },
            { text: say('Erro barrukoa.', 'Lo de dentro de la raíz.', 'ما تحت الجذر.', 'Under the root.'), math: same('$(-5)^{2}-4\\cdot 1\\cdot 6=1$') },
            { text: say('Ordezkatu.', 'Sustituye.', 'عوّض.', 'Substitute.'), math: same('$x=\\frac{5\\pm 1}{2}$') },
            { text: say('Bi ebazpenak.', 'Las dos soluciones.', 'الحلّان.', 'The two solutions.'), math: same('$x=3,\\ x=2$') }
        ],
        example: same('$2x^{2}+x-3=0\\ \\to\\ x=\\frac{-1\\pm 5}{4}$'),
        mistake: {
            wrong: say('$x^{2}-4x+3=0$: $x=\\frac{-4\\pm 2}{2}$.', '$x^{2}-4x+3=0$: $x=\\frac{-4\\pm 2}{2}$.', '$x^{2}-4x+3=0$: $x=\\frac{-4\\pm 2}{2}$.', '$x^{2}-4x+3=0$: $x=\\frac{-4\\pm 2}{2}$.'),
            right: say('$b=-4$ da, beraz $-b=4$: $x=\\frac{4\\pm 2}{2}$, $x=3$ eta $x=1$.', '$b=-4$, así que $-b=4$: $x=\\frac{4\\pm 2}{2}$, $x=3$ y $x=1$.', '$b=-4$، إذن $-b=4$: $x=\\frac{4\\pm 2}{2}$، $x=3$ و$x=1$.', '$b=-4$, so $-b=4$: $x=\\frac{4\\pm 2}{2}$, $x=3$ and $x=1$.')
        },
        takeaway: say('$X=\\frac{-B\\pm\\sqrt{B^{2}-4AC}}{2A}$', '$X=\\frac{-B\\pm\\sqrt{B^{2}-4AC}}{2A}$', '$X=\\frac{-B\\pm\\sqrt{B^{2}-4AC}}{2A}$', '$X=\\frac{-B\\pm\\sqrt{B^{2}-4AC}}{2A}$'),
        figure: (language) => <QuadraticFormulaFigure language={language} />
    },
    {
        id: 'discriminant',
        stage: 'quadratic',
        title: say('Diskriminatzailea', 'El discriminante', 'المميّز', 'The discriminant'),
        goal: say('Ebazpen kopurua ebatzi gabe jakitea.', 'Saber cuántas soluciones hay sin resolver.', 'معرفة عدد الحلول دون حلّ المعادلة.', 'Know how many solutions there are without solving.'),
        explanation: say(
            'Erro barrukoari diskriminatzailea deritzo: $\\Delta=b^{2}-4ac$. Positiboa bada, bi ebazpen daude; zero bada, bakarra (erro bikoitza); negatiboa bada, bat ere ez, zenbaki negatibo baten erro karraturik ez baitago. Grafikoan, $y=ax^{2}+bx+c$ parabolak ardatza bi puntutan mozten du, puntu batean ukitzen du edo ez du ukitzen.',
            'Lo de dentro de la raíz se llama discriminante: $\\Delta=b^{2}-4ac$. Si es positivo, hay dos soluciones; si es cero, una sola (raíz doble); si es negativo, ninguna, porque no existe la raíz cuadrada de un número negativo. En la gráfica, la parábola $y=ax^{2}+bx+c$ corta el eje en dos puntos, lo toca en uno o no lo toca.',
            'ما تحت الجذر يُسمّى المميّز: $\\Delta=b^{2}-4ac$. إذا كان موجبًا فهناك حلّان؛ وإذا كان صفرًا فحلّ واحد (جذر مضاعف)؛ وإذا كان سالبًا فلا حل، لأنه لا جذر تربيعي لعدد سالب. وفي التمثيل البياني، يقطع القطع المكافئ $y=ax^{2}+bx+c$ المحور في نقطتين أو يمسّه في نقطة أو لا يمسّه.',
            'What is under the root is called the discriminant: $\\Delta=b^{2}-4ac$. If it is positive, there are two solutions; if it is zero, only one (a double root); if it is negative, none, because a negative number has no square root. On the graph, the parabola $y=ax^{2}+bx+c$ crosses the axis at two points, touches it at one or does not touch it.'
        ),
        cases: [
            { title: same('$\\Delta>0$'), text: say('Bi ebazpen.', 'Dos soluciones.', 'حلّان.', 'Two solutions.'), math: same('$x^{2}-4=0$') },
            { title: same('$\\Delta=0$'), text: say('Ebazpen bat.', 'Una solución.', 'حلّ واحد.', 'One solution.'), math: same('$x^{2}-6x+9=0$') },
            { title: same('$\\Delta<0$'), text: say('Ebazpenik ez.', 'Ninguna solución.', 'لا حل.', 'No solution.'), math: same('$x^{2}+x+5=0$') }
        ],
        problem: say('Zenbat ebazpen ditu $x^{2}+4x+k=0$ ekuazioak $k=4$ denean?', '¿Cuántas soluciones tiene $x^{2}+4x+k=0$ si $k=4$?', 'كم حلًّا لـ $x^{2}+4x+k=0$ عندما $k=4$؟', 'How many solutions does $x^{2}+4x+k=0$ have when $k=4$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Kalkulatu $\\Delta$.', 'Calcula $\\Delta$.', 'احسب $\\Delta$.', 'Work out $\\Delta$.'), math: same('$4^{2}-4\\cdot 1\\cdot 4=0$') },
            { text: say('$\\Delta=0$: ebazpen bakarra.', '$\\Delta=0$: una sola solución.', '$\\Delta=0$: حلّ واحد.', '$\\Delta=0$: a single solution.'), math: same('$x=\\frac{-4}{2}=-2$') }
        ],
        example: same('$\\Delta=4-20=-16<0$'),
        mistake: {
            wrong: say('$x^{2}+2x-8=0$: $\\Delta=2^{2}-4\\cdot 1\\cdot 8<0$, ebazpenik ez.', '$x^{2}+2x-8=0$: $\\Delta=2^{2}-4\\cdot 1\\cdot 8<0$, no tiene solución.', '$x^{2}+2x-8=0$: $\\Delta=2^{2}-4\\cdot 1\\cdot 8<0$، لا حل.', '$x^{2}+2x-8=0$: $\\Delta=2^{2}-4\\cdot 1\\cdot 8<0$, no solution.'),
            right: say('$c=-8$ da, zeinuarekin: $\\Delta=4+32=36>0$, bi ebazpen.', '$c=-8$, con su signo: $\\Delta=4+32=36>0$, dos soluciones.', '$c=-8$ بإشارته: $\\Delta=4+32=36>0$، حلّان.', '$c=-8$, with its sign: $\\Delta=4+32=36>0$, two solutions.')
        },
        takeaway: say('$\\Delta=B^{2}-4AC$: $>0$ bi, $=0$ bat, $<0$ bat ere ez.', '$\\Delta=B^{2}-4AC$: $>0$ dos, $=0$ una, $<0$ ninguna.', '$\\Delta=B^{2}-4AC$: $>0$ حلّان، $=0$ حلّ، $<0$ لا حل.', '$\\Delta=B^{2}-4AC$: $>0$ two, $=0$ one, $<0$ none.'),
        figure: (language) => <DiscriminantFigure language={language} />
    },
    /* ---------- 3. Systems ---------- */
    {
        id: 'pairs',
        stage: 'systems',
        title: say('Bi ezezaguneko ekuazioak', 'Ecuaciones con dos incógnitas', 'معادلات بمجهولين', 'Equations in two unknowns'),
        goal: say('Ekuazio lineal baten ebazpenak bikoteak direla ulertzea eta sistema baten ebazpena egiaztatzea.', 'Entender que las soluciones de una ecuación lineal son parejas y comprobar la solución de un sistema.', 'فهم أن حلول المعادلة الخطية أزواج والتحقق من حل نظام.', 'Understand that the solutions of a linear equation are pairs and check the solution of a system.'),
        explanation: say(
            '$x+y=7$ ekuazioak bi ezezagun ditu. Ebazpen bat bikote bat da: $(3,4)$, $(5,2)$, $(-1,8)$… Infinitu daude, eta planoan zuzen bat osatzen dute. Sistema bat batera bete behar diren bi ekuazio dira. Haren ebazpena bi ekuazioak betetzen dituen bikotea da. Egiaztatzeko, ordezkatu $x$ eta $y$ bi ekuazioetan.',
            'La ecuación $x+y=7$ tiene dos incógnitas. Una solución es una pareja: $(3,4)$, $(5,2)$, $(-1,8)$… Hay infinitas, y en el plano forman una recta. Un sistema son dos ecuaciones que se tienen que cumplir a la vez. Su solución es la pareja que cumple las dos. Para comprobarla, sustituye $x$ e $y$ en las dos ecuaciones.',
            'المعادلة $x+y=7$ فيها مجهولان. والحل زوج: $(3,4)$ و$(5,2)$ و$(-1,8)$… وهي لا نهائية، وتشكّل في المستوى مستقيمًا. والنظام معادلتان يجب أن تتحققا معًا. وحلّه هو الزوج الذي يحقق المعادلتين. وللتحقق عوّض $x$ و$y$ في المعادلتين.',
            'The equation $x+y=7$ has two unknowns. A solution is a pair: $(3,4)$, $(5,2)$, $(-1,8)$… There are infinitely many, and on the plane they make a line. A system is two equations that must hold at the same time. Its solution is the pair that satisfies both. To check it, substitute $x$ and $y$ in both equations.'
        ),
        problem: say('$(2,3)$ bikotea $x+y=5$, $3x-y=3$ sistemaren ebazpena al da?', '¿Es $(2,3)$ solución del sistema $x+y=5$, $3x-y=3$?', 'هل $(2,3)$ حلّ للنظام $x+y=5$، $3x-y=3$؟', 'Is $(2,3)$ a solution of the system $x+y=5$, $3x-y=3$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Lehen ekuazioa.', 'Primera ecuación.', 'المعادلة الأولى.', 'First equation.'), math: same('$2+3=5$') },
            { text: say('Bigarrena.', 'Segunda.', 'الثانية.', 'Second.'), math: same('$3\\cdot 2-3=3$') },
            { text: say('Biak betetzen dira: bai, ebazpena da.', 'Se cumplen las dos: sí es solución.', 'تتحقق الاثنتان: نعم، هو حل.', 'Both hold: yes, it is the solution.') }
        ],
        example: same('$y=7-x\\ \\to\\ (0,7),\\ (1,6),\\ (2,5)$'),
        mistake: {
            wrong: say('$(4,1)$ ebazpena da: $x+y=5$ betetzen du.', '$(4,1)$ es solución: cumple $x+y=5$.', '$(4,1)$ حلّ: يحقق $x+y=5$.', '$(4,1)$ is the solution: it satisfies $x+y=5$.'),
            right: say('Bi ekuazioak bete behar ditu: $3\\cdot 4-1=11\\neq 3$, beraz ez da sistemaren ebazpena.', 'Tiene que cumplir las dos: $3\\cdot 4-1=11\\neq 3$, así que no es solución del sistema.', 'يجب أن يحقق الاثنتين: $3\\cdot 4-1=11\\neq 3$، إذن ليس حلًّا للنظام.', 'It must satisfy both: $3\\cdot 4-1=11\\neq 3$, so it is not the solution of the system.')
        },
        takeaway: say('Sistemaren ebazpena: BI ekuazioak betetzen dituen $(X,Y)$.', 'Solución del sistema: el $(X,Y)$ que cumple LAS DOS.', 'حل النظام: الزوج $(X,Y)$ الذي يحقق المعادلتين.', 'Solution of the system: the $(X,Y)$ that satisfies BOTH.'),
        figure: (language) => <LinearSolutionsFigure language={language} />
    },
    {
        id: 'graphic',
        stage: 'systems',
        title: say('Ebazpen grafikoa', 'Resolución gráfica', 'الحل البياني', 'Solving graphically'),
        goal: say('Sistema bat bi zuzen marraztuz ebaztea.', 'Resolver un sistema dibujando dos rectas.', 'حلّ نظام برسم مستقيمين.', 'Solve a system by drawing two lines.'),
        explanation: say(
            'Ekuazio bakoitza zuzen bat da. Marrazteko, egin bi edo hiru puntuko taula bat: eman $x$-ri balio bat eta kalkulatu $y$. Bi zuzenak marraztu ondoren, ebazpena ebakidura-puntua da, bi zuzenetan dagoen puntu bakarra baita. Metodo honek ikusten laguntzen du, baina ebakidura zenbaki osoetan ez badago, ez da zehatza.',
            'Cada ecuación es una recta. Para dibujarla, haz una tabla de dos o tres puntos: da un valor a $x$ y calcula $y$. Dibujadas las dos rectas, la solución es el punto de corte, porque es el único punto que está en las dos. Este método ayuda a ver, pero si el corte no cae en números enteros no es exacto.',
            'كل معادلة مستقيم. ولرسمه نعدّ جدولًا بنقطتين أو ثلاث: نعطي $x$ قيمة ونحسب $y$. وبعد رسم المستقيمين يكون الحل نقطة التقاطع، لأنها النقطة الوحيدة التي على الاثنين. هذه الطريقة تساعد على الرؤية، لكنها ليست دقيقة إذا لم يقع التقاطع على أعداد صحيحة.',
            'Each equation is a line. To draw it, make a table of two or three points: give $x$ a value and work out $y$. Once both lines are drawn, the solution is the crossing point, because it is the only point on both. This method helps you see, but if the crossing is not at whole numbers it is not exact.'
        ),
        problem: same('$y=x+1,\\ y=-x+5$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Lehen zuzena: $x=0$ denean $y=1$; $x=2$ denean $y=3$.', 'Primera recta: si $x=0$, $y=1$; si $x=2$, $y=3$.', 'المستقيم الأول: إذا $x=0$ فإن $y=1$؛ إذا $x=2$ فإن $y=3$.', 'First line: if $x=0$, $y=1$; if $x=2$, $y=3$.'), math: same('$(0,1),\\ (2,3)$') },
            { text: say('Bigarrena: $x=0$ denean $y=5$; $x=2$ denean $y=3$.', 'Segunda: si $x=0$, $y=5$; si $x=2$, $y=3$.', 'الثاني: إذا $x=0$ فإن $y=5$؛ إذا $x=2$ فإن $y=3$.', 'Second: if $x=0$, $y=5$; if $x=2$, $y=3$.'), math: same('$(0,5),\\ (2,3)$') },
            { text: say('Puntu komuna: ebakidura.', 'El punto común: el corte.', 'النقطة المشتركة: التقاطع.', 'The common point: the crossing.'), math: same('$x=2,\\ y=3$') }
        ],
        example: same('$2+1=3\\quad -2+5=3$'),
        mistake: {
            wrong: say('Ebazpena zuzen batek $y$ ardatza mozten duen puntua da.', 'La solución es donde una recta corta el eje $y$.', 'الحل حيث يقطع أحد المستقيمين محور $y$.', 'The solution is where one line crosses the $y$ axis.'),
            right: say('Ebazpena bi zuzenen arteko ebakidura da, ez ardatzekin.', 'La solución es el corte de las dos rectas entre sí, no con los ejes.', 'الحل تقاطع المستقيمين معًا، لا مع المحورين.', 'The solution is where the two lines cross each other, not the axes.')
        },
        takeaway: say('Ebazpena = bi zuzenen EBAKIDURA-PUNTUA.', 'Solución = PUNTO DE CORTE de las dos rectas.', 'الحل = نقطة تقاطع المستقيمين.', 'Solution = the CROSSING POINT of the two lines.'),
        figure: (language) => <LinearSolutionsFigure language={language} />
    },
    {
        id: 'classify',
        stage: 'systems',
        title: say('Sistema motak', 'Tipos de sistemas', 'أنواع الأنظمة', 'Types of systems'),
        goal: say('Sistema batek ebazpen bat, infinitu edo bat ere ez duen jakitea.', 'Saber si un sistema tiene una solución, infinitas o ninguna.', 'معرفة ما إذا كان للنظام حلّ واحد أو عدد لانهائي أو لا حل.', 'Know whether a system has one solution, infinitely many or none.'),
        explanation: say(
            'Bi zuzenek hiru modutan jar daitezke. Puntu batean ebakitzen badira, ebazpen bakarra dago: sistema bateragarri determinatua. Paraleloak badira, ez dago ebazpenik: bateraezina. Zuzen bera badira, infinitu ebazpen: bateragarri indeterminatua. Koefizienteetan ikusten da: $x$ eta $y$-ren koefizienteak proportzionalak badira, zuzenak paraleloak edo berdinak dira; gai askeak ere proportzionalak badira, berdinak.',
            'Dos rectas se pueden colocar de tres maneras. Si se cortan en un punto, hay una sola solución: sistema compatible determinado. Si son paralelas, no hay solución: incompatible. Si son la misma recta, infinitas soluciones: compatible indeterminado. Se ve en los coeficientes: si los de $x$ y los de $y$ son proporcionales, las rectas son paralelas o iguales; si también lo son los términos independientes, son la misma.',
            'يمكن أن يتوضّع مستقيمان بثلاث طرق. إذا تقاطعا في نقطة فهناك حلّ واحد: نظام متوافق محدّد. وإذا كانا متوازيين فلا حل: غير متوافق. وإذا كانا المستقيم نفسه فعدد لانهائي من الحلول: متوافق غير محدّد. ويظهر ذلك في المعاملات: إذا تناسبت معاملات $x$ و$y$ فالمستقيمان متوازيان أو متطابقان؛ وإذا تناسبت الحدود الثابتة أيضًا فهما المستقيم نفسه.',
            'Two lines can sit in three ways. If they cross at one point, there is a single solution: a consistent independent system. If they are parallel, there is no solution: inconsistent. If they are the same line, infinitely many solutions: consistent dependent. You can see it in the coefficients: if those of $x$ and $y$ are proportional, the lines are parallel or the same; if the constants are proportional too, they are the same line.'
        ),
        cases: [
            { title: say('Ebazpen bat', 'Una solución', 'حلّ واحد', 'One solution'), text: say('Ebakitzen dira.', 'Se cortan.', 'يتقاطعان.', 'They cross.'), math: same('$x+y=4,\\ x-y=2$') },
            { title: say('Ebazpenik ez', 'Ninguna', 'لا حل', 'None'), text: say('Paraleloak.', 'Paralelas.', 'متوازيان.', 'Parallel.'), math: same('$x+y=4,\\ x+y=6$') },
            { title: say('Infinitu', 'Infinitas', 'لانهائية', 'Infinitely many'), text: say('Zuzen bera.', 'La misma recta.', 'المستقيم نفسه.', 'The same line.'), math: same('$x+y=4,\\ 2x+2y=8$') }
        ],
        problem: same('$2x-y=3,\\ 4x-2y=5$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Konparatu koefizienteak.', 'Compara los coeficientes.', 'قارن المعاملات.', 'Compare the coefficients.'), math: same('$\\frac{4}{2}=\\frac{-2}{-1}=2$') },
            { text: say('Gai askeak: $5\\div 3$ ez da 2.', 'Términos independientes: $5\\div 3$ no es 2.', 'الحدود الثابتة: $5\\div 3$ ليس 2.', 'Constants: $5\\div 3$ is not 2.') },
            { text: say('Zuzen paraleloak: ebazpenik ez.', 'Rectas paralelas: no tiene solución.', 'مستقيمان متوازيان: لا حل.', 'Parallel lines: no solution.') }
        ],
        example: same('$x-3y=1,\\ 3x-9y=3$'),
        mistake: {
            wrong: say('$x+y=4$ eta $2x+2y=8$ desberdinak dira: ebazpen bakarra dute.', '$x+y=4$ y $2x+2y=8$ son distintas: tienen una solución.', '$x+y=4$ و$2x+2y=8$ مختلفتان: لهما حلّ واحد.', '$x+y=4$ and $2x+2y=8$ are different: they have one solution.'),
            right: say('Bigarrena lehena bider 2 da: zuzen bera, infinitu ebazpen.', 'La segunda es la primera por 2: la misma recta, infinitas soluciones.', 'الثانية هي الأولى في 2: المستقيم نفسه، حلول لانهائية.', 'The second is the first times 2: the same line, infinitely many solutions.')
        },
        takeaway: say('Ebakitzen dira: bat. Paraleloak: bat ere ez. Berdinak: INFINITU.', 'Se cortan: una. Paralelas: ninguna. Iguales: INFINITAS.', 'متقاطعان: حلّ. متوازيان: لا حل. متطابقان: لانهائية.', 'Crossing: one. Parallel: none. The same: INFINITELY MANY.'),
        figure: (language) => <SystemTypesFigure language={language} />
    },
    /* ---------- 4. Methods ---------- */
    {
        id: 'substitution',
        stage: 'methods',
        title: say('Ordezkapen metodoa', 'Método de sustitución', 'طريقة التعويض', 'The substitution method'),
        goal: say('Ezezagun bat bakandu eta beste ekuazioan ordezkatzea.', 'Despejar una incógnita y sustituirla en la otra ecuación.', 'عزل مجهول وتعويضه في المعادلة الأخرى.', 'Isolate one unknown and substitute it in the other equation.'),
        explanation: say(
            'Ordezkapen metodoan: (1) bakandu ezezagun bat ekuazio batean (errazena, koefizientea 1 edo $-1$ duena); (2) ordezkatu beste ekuazioan, parentesi artean; (3) ebatzi ezezagun bakarreko ekuazioa; (4) itzuli bakandutakora bestea kalkulatzeko. Egokiena da ezezagun batek 1 koefizientea duenean.',
            'En el método de sustitución: (1) despeja una incógnita en una ecuación (la más fácil, la que tiene coeficiente 1 o $-1$); (2) sustitúyela en la otra ecuación, entre paréntesis; (3) resuelve la ecuación de una incógnita; (4) vuelve a la despejada para calcular la otra. Es el más cómodo cuando una incógnita tiene coeficiente 1.',
            'في طريقة التعويض: (1) اعزل مجهولًا في إحدى المعادلتين (الأسهل، ذات المعامل 1 أو $-1$)؛ (2) عوّضه في المعادلة الأخرى بين قوسين؛ (3) حلّ المعادلة ذات المجهول الواحد؛ (4) ارجع إلى المعزول لحساب الآخر. وهي الأنسب عندما يكون معامل أحد المجهولين 1.',
            'In the substitution method: (1) isolate one unknown in one equation (the easiest, with coefficient 1 or $-1$); (2) substitute it in the other equation, in brackets; (3) solve the equation in one unknown; (4) go back to the isolated one to work out the other. It is the handiest when an unknown has coefficient 1.'
        ),
        problem: same('$x+2y=8,\\ 3x-y=3$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Bakandu $x$ lehenengoan.', 'Despeja $x$ en la primera.', 'اعزل $x$ في الأولى.', 'Isolate $x$ in the first.'), math: same('$x=8-2y$') },
            { text: say('Ordezkatu bigarrenean.', 'Sustituye en la segunda.', 'عوّض في الثانية.', 'Substitute in the second.'), math: same('$3(8-2y)-y=3$') },
            { text: say('Ebatzi.', 'Resuelve.', 'حلّ.', 'Solve.'), math: same('$24-7y=3\\ \\to\\ y=3$') },
            { text: say('Itzuli $x$ kalkulatzera.', 'Vuelve para calcular $x$.', 'ارجع لحساب $x$.', 'Go back for $x$.'), math: same('$x=8-2\\cdot 3=2$') }
        ],
        example: same('$y=2x,\\ x+y=9\\ \\to\\ x=3$'),
        mistake: {
            wrong: say('$x=8-2y$ ordezkatzean: $3\\cdot 8-2y-y=3$.', 'Al sustituir $x=8-2y$: $3\\cdot 8-2y-y=3$.', 'عند تعويض $x=8-2y$: $3\\cdot 8-2y-y=3$.', 'Substituting $x=8-2y$: $3\\cdot 8-2y-y=3$.'),
            right: say('Ordezkatutakoa parentesi artean doa: $3(8-2y)=24-6y$.', 'Lo sustituido va entre paréntesis: $3(8-2y)=24-6y$.', 'ما نعوّضه يوضع بين قوسين: $3(8-2y)=24-6y$.', 'What you substitute goes in brackets: $3(8-2y)=24-6y$.')
        },
        takeaway: say('Bakandu, ordezkatu (PARENTESIAREKIN), ebatzi, itzuli.', 'Despeja, sustituye (CON PARÉNTESIS), resuelve, vuelve.', 'اعزل، عوّض (بقوسين)، حلّ، ارجع.', 'Isolate, substitute (IN BRACKETS), solve, go back.'),
        figure: (language) => <SubstitutionFigure language={language} />
    },
    {
        id: 'equalisation',
        stage: 'methods',
        title: say('Berdinketa metodoa', 'Método de igualación', 'طريقة المساواة', 'The equalisation method'),
        goal: say('Ezezagun bera bi ekuazioetan bakandu eta berdintzea.', 'Despejar la misma incógnita en las dos ecuaciones e igualar.', 'عزل المجهول نفسه في المعادلتين ومساواتهما.', 'Isolate the same unknown in both equations and set them equal.'),
        explanation: say(
            'Berdinketa metodoan ezezagun bera bakantzen da bi ekuazioetan, adibidez $y$. Bi adierazpenek $y$ bera balio dutenez, berdinak dira: hala, $x$ bakarrik duen ekuazio bat geratzen da. Ebatzi eta gero, ordezkatu bakandutako edozein adierazpenetan. Egokia da bi ekuazioetan ezezaguna dagoeneko bakanduta dagoenean: $y=2x+1$ eta $y=-x+7$.',
            'En el método de igualación se despeja la misma incógnita en las dos ecuaciones, por ejemplo $y$. Como las dos expresiones valen el mismo $y$, son iguales: así queda una ecuación solo con $x$. Después de resolverla, sustituye en cualquiera de las despejadas. Es cómodo cuando la incógnita ya está despejada en las dos: $y=2x+1$ e $y=-x+7$.',
            'في طريقة المساواة نعزل المجهول نفسه في المعادلتين، مثل $y$. وبما أن العبارتين تساويان $y$ نفسه فهما متساويتان: فتبقى معادلة فيها $x$ فقط. وبعد حلّها نعوّض في أيّ من العبارتين. وهي مريحة عندما يكون المجهول معزولًا في الاثنتين: $y=2x+1$ و$y=-x+7$.',
            'In the equalisation method you isolate the same unknown in both equations, for example $y$. As both expressions equal the same $y$, they are equal to each other: that leaves an equation with only $x$. After solving it, substitute in either isolated expression. It is handy when the unknown is already isolated in both: $y=2x+1$ and $y=-x+7$.'
        ),
        problem: same('$y=2x+1,\\ y=-x+7$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Berdindu bi adierazpenak.', 'Iguala las dos expresiones.', 'ساوِ العبارتين.', 'Set the two expressions equal.'), math: same('$2x+1=-x+7$') },
            { text: say('Ebatzi.', 'Resuelve.', 'حلّ.', 'Solve.'), math: same('$3x=6\\ \\to\\ x=2$') },
            { text: say('Ordezkatu.', 'Sustituye.', 'عوّض.', 'Substitute.'), math: same('$y=2\\cdot 2+1=5$') }
        ],
        example: same('$x=y+3,\\ x=2y-1\\ \\to\\ y=4$'),
        mistake: {
            wrong: say('$y=2x+1$ eta $x=-y+7$ berdindu: $2x+1=-y+7$.', 'Igualo $y=2x+1$ y $x=-y+7$: $2x+1=-y+7$.', 'أساوي $y=2x+1$ و$x=-y+7$: $2x+1=-y+7$.', 'I set $y=2x+1$ and $x=-y+7$ equal: $2x+1=-y+7$.'),
            right: say('Ezezagun BERA bakandu behar da bietan; bestela bi ezezagun geratzen dira.', 'Hay que despejar la MISMA incógnita en las dos; si no, quedan dos incógnitas.', 'يجب عزل المجهول نفسه في الاثنتين؛ وإلا يبقى مجهولان.', 'You must isolate the SAME unknown in both; otherwise two unknowns are left.')
        },
        takeaway: say('$Y=A$ ETA $Y=B\\Rightarrow A=B$', '$Y=A$ E $Y=B\\Rightarrow A=B$', '$Y=A$ و$Y=B\\Rightarrow A=B$', '$Y=A$ AND $Y=B\\Rightarrow A=B$'),
        figure: (language) => <EqualizationFigure language={language} />
    },
    {
        id: 'elimination',
        stage: 'methods',
        title: say('Laburketa metodoa', 'Método de reducción', 'طريقة الحذف', 'The elimination method'),
        goal: say('Ekuazioak biderkatu eta batu, ezezagun bat desager dadin.', 'Multiplicar y sumar las ecuaciones para que desaparezca una incógnita.', 'ضرب المعادلتين وجمعهما ليختفي مجهول.', 'Multiply and add the equations so that one unknown disappears.'),
        explanation: say(
            'Laburketa metodoan ekuazioak zenbakiren batez biderkatzen dira, ezezagun batek koefiziente aurkakoak izan ditzan (adibidez $3y$ eta $-3y$). Gero bi ekuazioak batzen dira, atalez atal, eta ezezagun hori desagertu egiten da. Koefizienteak dagoeneko aurkakoak badira, zuzenean batu. Egokiena da ezezagunek 1 koefizienterik ez dutenean.',
            'En el método de reducción se multiplican las ecuaciones por algún número para que una incógnita tenga coeficientes opuestos (por ejemplo $3y$ y $-3y$). Después se suman las dos ecuaciones, miembro a miembro, y esa incógnita desaparece. Si los coeficientes ya son opuestos, se suman directamente. Es el mejor cuando ninguna incógnita tiene coeficiente 1.',
            'في طريقة الحذف نضرب المعادلتين في عدد ما ليصير لمجهول معاملان متعاكسان (مثل $3y$ و$-3y$). ثم نجمع المعادلتين طرفًا بطرف فيختفي ذلك المجهول. وإذا كان المعاملان متعاكسين أصلًا نجمع مباشرة. وهي الأفضل عندما لا يكون لأي مجهول المعامل 1.',
            'In the elimination method you multiply the equations by some number so that one unknown has opposite coefficients (for example $3y$ and $-3y$). Then you add the two equations, side by side, and that unknown disappears. If the coefficients are already opposite, add them straight away. It is the best when no unknown has coefficient 1.'
        ),
        problem: same('$2x+3y=12,\\ 5x-y=13$'),
        stepsKind: 'steps',
        steps: [
            { text: say('Biderkatu bigarrena 3 zenbakiaz.', 'Multiplica la segunda por 3.', 'اضرب الثانية في 3.', 'Multiply the second by 3.'), math: same('$15x-3y=39$') },
            { text: say('Batu lehenengoarekin: $y$ desagertzen da.', 'Súmala a la primera: desaparece $y$.', 'اجمعها مع الأولى: يختفي $y$.', 'Add it to the first: $y$ disappears.'), math: same('$17x=51\\ \\to\\ x=3$') },
            { text: say('Ordezkatu.', 'Sustituye.', 'عوّض.', 'Substitute.'), math: same('$5\\cdot 3-y=13\\ \\to\\ y=2$') }
        ],
        example: same('$x+y=10,\\ x-y=4\\ \\to\\ x=7$'),
        mistake: {
            wrong: say('$5x-y=13$ bider 3: $15x-3y=13$.', '$5x-y=13$ por 3: $15x-3y=13$.', '$5x-y=13$ في 3: $15x-3y=13$.', '$5x-y=13$ times 3: $15x-3y=13$.'),
            right: say('Bi atalak biderkatzen dira, gai askea ere bai: $15x-3y=39$.', 'Se multiplican los dos miembros, también el término independiente: $15x-3y=39$.', 'يُضرب الطرفان، حتى الحد الثابت: $15x-3y=39$.', 'Both sides are multiplied, the constant as well: $15x-3y=39$.')
        },
        takeaway: say('Koefiziente AURKAKOAK lortu eta batu: $3Y+(-3Y)=0$.', 'Consigue coeficientes OPUESTOS y suma: $3Y+(-3Y)=0$.', 'احصل على معاملين متعاكسين واجمع: $3Y+(-3Y)=0$.', 'Make the coefficients OPPOSITE and add: $3Y+(-3Y)=0$.'),
        figure: (language) => <ReductionFigure language={language} />
    },
    /* ---------- 5. Problems ---------- */
    {
        id: 'equation-problems',
        stage: 'problems',
        title: say('Problemak ekuazioekin', 'Problemas con ecuaciones', 'مسائل بالمعادلات', 'Problems with equations'),
        goal: say('Problema bat ekuazio batekin planteatu eta ebaztea.', 'Plantear y resolver un problema con una ecuación.', 'صياغة مسألة بمعادلة وحلّها.', 'Set up and solve a problem with an equation.'),
        explanation: say(
            'Lau urrats: (1) irakurri eta erabaki zer den $x$; (2) idatzi beste kopuruak $x$ erabiliz; (3) planteatu ekuazioa enuntziatuko berdintzarekin; (4) ebatzi eta egiaztatu emaitzak zentzua duela. Adinetan, urteak bi pertsonei igarotzen zaizkie: orain $x$ eta $3x$ badute, 10 urte barru $x+10$ eta $3x+10$ izango dituzte.',
            'Cuatro pasos: (1) lee y decide qué es $x$; (2) escribe las otras cantidades con $x$; (3) plantea la ecuación con la igualdad del enunciado; (4) resuelve y comprueba que el resultado tiene sentido. En las edades, los años pasan para las dos personas: si ahora tienen $x$ y $3x$, dentro de 10 años tendrán $x+10$ y $3x+10$.',
            'أربع خطوات: (1) اقرأ وحدّد ما هو $x$؛ (2) اكتب الكميات الأخرى بدلالة $x$؛ (3) اكتب المعادلة من المساواة في النص؛ (4) حلّ وتحقّق أن النتيجة معقولة. وفي الأعمار تمرّ السنوات على الشخصين: إذا كان عمراهما الآن $x$ و$3x$ فبعد 10 سنوات يصيران $x+10$ و$3x+10$.',
            'Four steps: (1) read and decide what $x$ is; (2) write the other quantities using $x$; (3) set up the equation from the equality in the problem; (4) solve and check that the result makes sense. With ages, the years pass for both people: if they are $x$ and $3x$ now, in 10 years they will be $x+10$ and $3x+10$.'
        ),
        problem: say('Ama batek semeak baino 28 urte gehiago ditu. 4 urte barru, semearen hirukoitza izango du. Zenbat urte ditu semeak?', 'Una madre tiene 28 años más que su hijo. Dentro de 4 años tendrá el triple que él. ¿Cuántos años tiene el hijo?', 'عمر أمّ يزيد 28 سنة على عمر ابنها. بعد 4 سنوات يصير عمرها ثلاثة أمثال عمره. كم عمر الابن؟', 'A mother is 28 years older than her son. In 4 years she will be three times his age. How old is the son?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Semea: $x$. Ama: $x+28$.', 'Hijo: $x$. Madre: $x+28$.', 'الابن: $x$. الأم: $x+28$.', 'Son: $x$. Mother: $x+28$.') },
            { text: say('4 urte barru.', 'Dentro de 4 años.', 'بعد 4 سنوات.', 'In 4 years.'), math: same('$x+32=3(x+4)$') },
            { text: say('Ebatzi.', 'Resuelve.', 'حلّ.', 'Solve.'), math: same('$x+32=3x+12\\ \\to\\ x=10$') },
            { text: say('Egiaztatu: 14 eta 42.', 'Comprueba: 14 y 42.', 'تحقّق: 14 و42.', 'Check: 14 and 42.'), math: same('$3\\cdot 14=42$') }
        ],
        example: same('$3x+3=72\\ \\to\\ x=23$'),
        mistake: {
            wrong: say('4 urte barru: $x+28=3(x+4)$.', 'Dentro de 4 años: $x+28=3(x+4)$.', 'بعد 4 سنوات: $x+28=3(x+4)$.', 'In 4 years: $x+28=3(x+4)$.'),
            right: say('Urteak amari ere igarotzen zaizkio: $x+28+4=3(x+4)$.', 'Los años también pasan para la madre: $x+28+4=3(x+4)$.', 'السنوات تمرّ على الأم أيضًا: $x+28+4=3(x+4)$.', 'The years pass for the mother too: $x+28+4=3(x+4)$.')
        },
        takeaway: say('Erabaki $X$, idatzi dena $X$-rekin, planteatu, EGIAZTATU.', 'Decide $X$, escribe todo con $X$, plantea, COMPRUEBA.', 'حدّد $X$، اكتب الكل بـ$X$، صُغ، تحقّق.', 'Choose $X$, write everything with $X$, set up, CHECK.'),
        figure: (language) => <AgesFigure language={language} />
    },
    {
        id: 'quadratic-problems',
        stage: 'problems',
        title: say('Bigarren mailako problemak', 'Problemas de segundo grado', 'مسائل من الدرجة الثانية', 'Quadratic problems'),
        goal: say('Bigarren mailako ekuazio bat sortzen duten problemak ebaztea eta ebazpenak aztertzea.', 'Resolver problemas que llevan a una ecuación de segundo grado y estudiar las soluciones.', 'حلّ مسائل تؤدي إلى معادلة من الدرجة الثانية ودراسة الحلول.', 'Solve problems that lead to a quadratic equation and study the solutions.'),
        explanation: say(
            'Azalerek, biderkadurek eta karratuek bigarren mailako ekuazioak sortzen dituzte. Bi ebazpen ateratzen direnean, aztertu biak: luzera, adin edo pertsona kopuru batek ezin du negatiboa izan. Laukizuzen baten aldeak $x$ eta $x+3$ badira eta azalera 40 bada: $x(x+3)=40$, $x^{2}+3x-40=0$, $x=5$ edo $x=-8$. Negatiboa baztertu egiten da: aldeak 5 eta 8 dira.',
            'Las áreas, los productos y los cuadrados dan ecuaciones de segundo grado. Cuando salen dos soluciones, estudia las dos: una longitud, una edad o un número de personas no puede ser negativo. Si los lados de un rectángulo son $x$ y $x+3$ y el área es 40: $x(x+3)=40$, $x^{2}+3x-40=0$, $x=5$ o $x=-8$. La negativa se descarta: los lados miden 5 y 8.',
            'المساحات والجداءات والمربعات تعطي معادلات من الدرجة الثانية. وعندما يخرج حلّان ادرس الاثنين: لا يمكن أن يكون الطول أو العمر أو عدد الأشخاص سالبًا. إذا كان ضلعا مستطيل $x$ و$x+3$ ومساحته 40: $x(x+3)=40$، $x^{2}+3x-40=0$، $x=5$ أو $x=-8$. ونستبعد السالب: الضلعان 5 و8.',
            'Areas, products and squares give quadratic equations. When two solutions come out, study both: a length, an age or a number of people cannot be negative. If the sides of a rectangle are $x$ and $x+3$ and the area is 40: $x(x+3)=40$, $x^{2}+3x-40=0$, $x=5$ or $x=-8$. The negative one is rejected: the sides are 5 and 8.'
        ),
        problem: say('Bi zenbaki jarraien biderkadura 132 da. Zeintzuk dira (positiboak)?', 'El producto de dos números consecutivos es 132. ¿Cuáles son (positivos)?', 'جداء عددين متتاليين 132. ما هما (موجبان)؟', 'The product of two consecutive numbers is 132. What are they (positive)?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Planteatu.', 'Plantea.', 'صُغ المعادلة.', 'Set up.'), math: same('$x(x+1)=132\\ \\to\\ x^{2}+x-132=0$') },
            { text: say('Formula.', 'Fórmula.', 'الصيغة.', 'Formula.'), math: same('$x=\\frac{-1\\pm 23}{2}$') },
            { text: say('$x=11$ edo $x=-12$. Positiboa: 11 eta 12.', '$x=11$ o $x=-12$. El positivo: 11 y 12.', '$x=11$ أو $x=-12$. الموجب: 11 و12.', '$x=11$ or $x=-12$. The positive one: 11 and 12.'), math: same('$11\\cdot 12=132$') }
        ],
        example: same('$x^{2}=2x+15\\ \\to\\ x=5,\\ x=-3$'),
        mistake: {
            wrong: say('Karratu baten aldea: $x^{2}=49$, $x=\\pm 7$, beraz $-7$ ere bai.', 'Lado de un cuadrado: $x^{2}=49$, $x=\\pm 7$, así que también $-7$.', 'ضلع مربع: $x^{2}=49$، $x=\\pm 7$، إذن $-7$ أيضًا.', 'Side of a square: $x^{2}=49$, $x=\\pm 7$, so $-7$ as well.'),
            right: say('Luzera batek ezin du negatiboa izan: aldea 7 da bakarrik.', 'Una longitud no puede ser negativa: el lado mide solo 7.', 'لا يمكن للطول أن يكون سالبًا: الضلع 7 فقط.', 'A length cannot be negative: the side is only 7.')
        },
        takeaway: say('Bi ebazpen? Aztertu biak: LUZERA BAT EZ DA NEGATIBOA.', '¿Dos soluciones? Estudia las dos: UNA LONGITUD NO ES NEGATIVA.', 'حلّان؟ ادرس الاثنين: الطول لا يكون سالبًا.', 'Two solutions? Study both: A LENGTH IS NEVER NEGATIVE.'),
        figure: (language) => <AreaProblemFigure language={language} />
    },
    {
        id: 'system-problems',
        stage: 'problems',
        title: say('Problemak sistemekin', 'Problemas con sistemas', 'مسائل بالأنظمة', 'Problems with systems'),
        goal: say('Bi ezezaguneko problema bat sistema batekin planteatu eta ebaztea.', 'Plantear y resolver un problema de dos incógnitas con un sistema.', 'صياغة مسألة بمجهولين بنظام وحلّها.', 'Set up and solve a two-unknown problem with a system.'),
        explanation: say(
            'Problemak bi kopuru ezezagun eta bi baldintza dituenean, erabili $x$ eta $y$ eta idatzi ekuazio bat baldintza bakoitzeko. Adibidez: «sarrera handiak eta txikiak» → kopuruen batura eta diruen batura. Ebatzi ondoren, erantzun galderari hitzez eta egiaztatu bi baldintzak.',
            'Cuando el problema tiene dos cantidades desconocidas y dos condiciones, usa $x$ e $y$ y escribe una ecuación por cada condición. Por ejemplo: «entradas de adulto y de niño» → la suma de entradas y la suma de dinero. Después de resolver, responde a la pregunta con palabras y comprueba las dos condiciones.',
            'عندما يكون في المسألة كميتان مجهولتان وشرطان، استعمل $x$ و$y$ واكتب معادلة لكل شرط. مثلًا: «تذاكر للكبار وللصغار» ← مجموع التذاكر ومجموع المال. وبعد الحل أجب عن السؤال بالكلمات وتحقّق من الشرطين.',
            'When the problem has two unknown quantities and two conditions, use $x$ and $y$ and write one equation for each condition. For example: «adult and child tickets» → the total number of tickets and the total money. After solving, answer the question in words and check both conditions.'
        ),
        problem: say('Zinema batean 9 euroko eta 6 euroko 40 sarrera saldu dira, guztira 303 euro. Zenbat saldu dira 9 eurokoak?', 'En un cine se han vendido 40 entradas de 9 € y de 6 €, en total 303 €. ¿Cuántas de 9 € se han vendido?', 'بيعت في سينما 40 تذكرة بسعر 9 يورو و6 يورو، بمجموع 303 يورو. كم تذكرة بسعر 9 يورو بيعت؟', 'A cinema sold 40 tickets at 9 € and 6 €, 303 € in total. How many 9 € tickets were sold?'),
        stepsKind: 'steps',
        steps: [
            { text: say('$x$: 9 eurokoak; $y$: 6 eurokoak.', '$x$: las de 9 €; $y$: las de 6 €.', '$x$: تذاكر 9 يورو؛ $y$: تذاكر 6 يورو.', '$x$: the 9 € ones; $y$: the 6 € ones.'), math: same('$x+y=40,\\ 9x+6y=303$') },
            { text: say('Bigarrenari lehena bider 6 kendu.', 'A la segunda réstale la primera por 6.', 'اطرح من الثانية الأولى مضروبة في 6.', 'Subtract the first times 6 from the second.'), math: same('$3x=63\\ \\to\\ x=21$') },
            { text: say('Beste aldagaia.', 'La otra incógnita.', 'المجهول الآخر.', 'The other unknown.'), math: same('$y=40-21=19$') },
            { text: say('Egiaztatu.', 'Comprueba.', 'تحقّق.', 'Check.'), math: same('$9\\cdot 21+6\\cdot 19=303$') }
        ],
        example: same('$x+y=50,\\ x-y=12\\ \\to\\ x=31$'),
        mistake: {
            wrong: say('$x+y=40$ eta $x+y=303$.', '$x+y=40$ y $x+y=303$.', '$x+y=40$ و$x+y=303$.', '$x+y=40$ and $x+y=303$.'),
            right: say('Bigarren ekuazioa dirua da: sarrera bakoitza bere prezioaz biderkatu, $9x+6y=303$.', 'La segunda ecuación es de dinero: cada entrada por su precio, $9x+6y=303$.', 'المعادلة الثانية للمال: كل تذكرة في سعرها، $9x+6y=303$.', 'The second equation is about money: each ticket times its price, $9x+6y=303$.')
        },
        takeaway: say('Baldintza bakoitzeko EKUAZIO BAT; amaieran, egiaztatu biak.', 'UNA ECUACIÓN por condición; al final, comprueba las dos.', 'معادلة لكل شرط؛ وفي النهاية تحقّق من الاثنين.', 'ONE EQUATION per condition; at the end, check both.'),
        figure: (language) => <SystemProblemFigure language={language} />
    }
]

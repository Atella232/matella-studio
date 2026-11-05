import type { LocalizedText, UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { LinearSolutionsFigure, SystemTypesFigure } from '../dbh4-aplikatuak-ekuazioak/figures'
import {
    AugmentedMatrixFigure,
    CandidatesFigure,
    CubicLineFigure,
    EliminationFigure,
    EquivalentFigure,
    ExponentialChangeFigure,
    LastRowFigure,
    ParameterFigure,
    ParametricFigure,
    RegionCasesFigure,
    RightTriangleFigure,
    StaircaseFigure,
    TicketsFigure,
    TriangleRegionFigure
} from './figures'
import { bachSystemsLessonChecks, type BachSystemsTopicId } from './lessonChecks'
import { bachSystemsLessonTexts } from './lessonTexts'

/* ==========================================================================
   Ekuazio-sistemak · Batxilergoa 1 · Zientziak — stages and lessons. The
   scope follows unit 3 of Santillana 1.º Bachillerato Ciencias (linear
   equations in several unknowns, equivalent systems, Gauss on the
   augmented matrix, the number of solutions, λ and the discussion by a
   parameter, non-linear systems, problems with three unknowns) and the
   systems part of unit 3 of Anaya Matemáticas I (non-linear systems with
   roots and logarithms, inequalities in two unknowns). What 4. DBH
   académicas already taught comes back as a short review with «Review
   first» links. All the exercises and numbers are our own.
   ========================================================================== */

export type BachSystemsStageId = 'linear' | 'gauss' | 'discussion' | 'nonlinear' | 'inequalities'

export const bachSystemsStages: UnitStage[] = [
    { id: 'linear', tone: 'blue', title: { eu: 'Sistema linealak', es: 'Sistemas lineales', en: 'Linear systems', ar: 'الأنظمة الخطية' } },
    { id: 'gauss', tone: 'violet', title: { eu: 'Gaussen metodoa', es: 'El método de Gauss', en: 'Gaussian elimination', ar: 'طريقة غاوس' } },
    { id: 'discussion', tone: 'mustard', title: { eu: 'Sistema bat eztabaidatzea', es: 'Discutir un sistema', en: 'Analysing a system', ar: 'مناقشة نظام' } },
    { id: 'nonlinear', tone: 'coral', title: { eu: 'Sistema ez-linealak', es: 'Sistemas no lineales', en: 'Non-linear systems', ar: 'الأنظمة غير الخطية' } },
    { id: 'inequalities', tone: 'green', title: { eu: 'Bi ezezaguneko inekuazioak', es: 'Inecuaciones con dos incógnitas', en: 'Inequalities in two unknowns', ar: 'متراجحات بمجهولين' } }
]

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
/** The same formula in every language; the decimal comma becomes a point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })

/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    /* ---------- 1. Linear systems ---------- */
    {
        id: 'linear-equations',
        stage: 'linear',
        title: say('Ekuazio linealak eta haien soluzioak', 'Ecuaciones lineales y sus soluciones', 'المعادلات الخطية وحلولها', 'Linear equations and their solutions'),
        goal: say('Bi edo hiru ezezaguneko ekuazio linealak ezagutzea, eta bikote edo hirukote bat ekuazio baten edo sistema baten soluzioa den egiaztatzea.', 'Reconocer las ecuaciones lineales con dos o tres incógnitas y comprobar si un par o una terna es solución de una ecuación o de un sistema.', 'تمييز المعادلات الخطية بمجهولين أو ثلاثة، والتحقق هل زوج أو ثلاثية حلٌّ لمعادلة أو لنظام.', 'Recognise linear equations in two or three unknowns and check whether a pair or a triple is a solution of an equation or of a system.'),
        needs: [
            { unit: 'dbh4-akademikoak/sistemas', topic: 'linear-equations', title: { eu: 'Bi ezezaguneko ekuazio linealak', es: 'Ecuaciones lineales con dos incógnitas', en: 'Linear equations with two unknowns', ar: 'المعادلات الخطية بمجهولين' } }
        ],
        problem: say(
            '$(1,2,-1)$ hirukotea $\\begin{cases}x+y+z=2\\\\ 2x-y+z=-1\\\\ x+2y-z=6\\end{cases}$ sistemaren soluzioa al da?',
            '¿Es la terna $(1,2,-1)$ solución del sistema $\\begin{cases}x+y+z=2\\\\ 2x-y+z=-1\\\\ x+2y-z=6\\end{cases}$?',
            'هل الثلاثية $(1,2,-1)$ حلٌّ للنظام $\\begin{cases}x+y+z=2\\\\ 2x-y+z=-1\\\\ x+2y-z=6\\end{cases}$؟',
            'Is the triple $(1,2,-1)$ a solution of the system $\\begin{cases}x+y+z=2\\\\ 2x-y+z=-1\\\\ x+2y-z=6\\end{cases}$?'
        ),
        stepsKind: 'steps',
        steps: [
            { text: say('Ordeztu lehen ekuazioan.', 'Sustituye en la primera ecuación.', 'عوّض في المعادلة الأولى.', 'Substitute into the first equation.'), math: same('$1+2+(-1)=2$') },
            { text: say('Gero, bigarrenean.', 'Después, en la segunda.', 'ثم في الثانية.', 'Then into the second.'), math: same('$2\\cdot 1-2+(-1)=-1$') },
            { text: say('Eta hirugarrenean. Hirurak betetzen dira: soluzioa da.', 'Y en la tercera. Se cumplen las tres: es solución.', 'ثم في الثالثة. تتحقق الثلاث: إنها حل.', 'And into the third. All three hold: it is a solution.'), math: same('$1+2\\cdot 2-(-1)=6$') }
        ],
        takeaway: say(
            'Sistema baten soluzioa ekuazio guztiak aldi berean betetzen dituen bikote edo hirukote bat da. $x=1$, $y=2$, ${z}=-1$ soluzio bakarra da, ez hiru.',
            'Una solución de un sistema es un par o una terna que cumple todas las ecuaciones a la vez. $x=1$, $y=2$, ${z}=-1$ es una sola solución, no tres.',
            'حل النظام زوج أو ثلاثية تحقق كل المعادلات في آن واحد. و$x=1$ و$y=2$ و${z}=-1$ حل واحد لا ثلاثة حلول.',
            'A solution of a system is a pair or a triple that satisfies every equation at once. $x=1$, $y=2$, ${z}=-1$ is one solution, not three.'
        ),
        figure: (language) => <LinearSolutionsFigure language={language} />
    },
    {
        id: 'classify-systems',
        stage: 'linear',
        title: say('Sistema motak', 'Tipos de sistemas', 'أنواع الأنظمة', 'Types of systems'),
        goal: say('Sistema bat soluzio kopuruaren arabera sailkatzea —bateragarri determinatua, bateragarri indeterminatua edo bateraezina— eta bi zuzenekin ikustea.', 'Clasificar un sistema por su número de soluciones —compatible determinado, compatible indeterminado o incompatible— y verlo con dos rectas.', 'تصنيف نظام حسب عدد حلوله —متوافق محدد أو متوافق غير محدد أو غير متوافق— ورؤية ذلك بمستقيمين.', 'Classify a system by its number of solutions —consistent and independent, consistent and dependent, or inconsistent— and see it with two straight lines.'),
        needs: [
            { unit: 'dbh4-akademikoak/sistemas', topic: 'graphic', title: { eu: 'Ebazpen grafikoa', es: 'Resolución gráfica', en: 'Graphical solution', ar: 'الحل البياني' } },
            { unit: 'dbh4-akademikoak/sistemas', topic: 'classify', title: { eu: 'Koefizienteekin sailkatzea', es: 'Clasificar con los coeficientes', en: 'Classify using the coefficients', ar: 'التصنيف بالمعاملات' } }
        ],
        problem: say('Sailkatu $\\begin{cases}2x-y=3\\\\ -4x+2y=5\\end{cases}$ sistema.', 'Clasifica el sistema $\\begin{cases}2x-y=3\\\\ -4x+2y=5\\end{cases}$.', 'صنّف النظام $\\begin{cases}2x-y=3\\\\ -4x+2y=5\\end{cases}$.', 'Classify the system $\\begin{cases}2x-y=3\\\\ -4x+2y=5\\end{cases}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Konparatu $x$ eta $y$ ezezagunen koefizienteak.', 'Compara los coeficientes de $x$ y de $y$.', 'قارن معاملَي $x$ و$y$.', 'Compare the coefficients of $x$ and $y$.'), math: same('$\\frac{2}{-4}=\\frac{-1}{2}$') },
            { text: say('Konparatu gai askeak ere.', 'Compara también los términos independientes.', 'قارن الحدين الثابتين أيضًا.', 'Compare the constant terms too.'), math: same('$\\frac{3}{5}\\neq\\frac{-1}{2}$') },
            { text: say('Batzean, ezinezko berdintza bat ateratzen da: zuzen paraleloak, bateraezina.', 'Al sumar sale una igualdad imposible: rectas paralelas, incompatible.', 'بالجمع تظهر مساواة مستحيلة: مستقيمان متوازيان، والنظام غير متوافق.', 'Adding gives an impossible equality: parallel lines, inconsistent.'), math: same('$2E_1+E_2\\ \\to\\ 0x+0y=11$') }
        ],
        takeaway: say(
            'Bateragarri determinatua: soluzio bat (zuzenak ebakitzen dira). Bateragarri indeterminatua: infinitu (bat datoz). Bateraezina: bat ere ez (paraleloak dira).',
            'Compatible determinado: una solución (las rectas se cortan). Compatible indeterminado: infinitas (coinciden). Incompatible: ninguna (son paralelas).',
            'متوافق محدد: حل واحد (المستقيمان متقاطعان). متوافق غير محدد: ما لا نهاية من الحلول (منطبقان). غير متوافق: لا حل (متوازيان).',
            'Consistent and independent: one solution (the lines cross). Consistent and dependent: infinitely many (they coincide). Inconsistent: none (they are parallel).'
        ),
        figure: (language) => <SystemTypesFigure language={language} />
    },
    {
        id: 'equivalent-systems',
        stage: 'linear',
        title: say('Sistema baliokideak', 'Sistemas equivalentes', 'الأنظمة المتكافئة', 'Equivalent systems'),
        goal: say('Sistema bat beste baliokide sinpleago batean bihurtzea, soluzioak aldatzen ez dituzten eragiketekin.', 'Transformar un sistema en otro equivalente, más sencillo, con las operaciones que no cambian sus soluciones.', 'تحويل نظام إلى نظام مكافئ أبسط بالعمليات التي لا تغيّر حلوله.', 'Turn a system into a simpler equivalent one with the operations that do not change its solutions.'),
        needs: [
            { unit: 'dbh4-akademikoak/sistemas', topic: 'reduction', title: { eu: 'Laburketa-metodoa', es: 'Método de reducción', en: 'Elimination method', ar: 'طريقة الحذف' } }
        ],
        problem: say('Bihurtu $\\begin{cases}x+y=5\\\\ 2x+3y=13\\end{cases}$ sistema beste baliokide sinpleago batean, eta ebatzi.', 'Transforma $\\begin{cases}x+y=5\\\\ 2x+3y=13\\end{cases}$ en un sistema equivalente más sencillo y resuélvelo.', 'حوّل $\\begin{cases}x+y=5\\\\ 2x+3y=13\\end{cases}$ إلى نظام مكافئ أبسط وحُلّه.', 'Turn $\\begin{cases}x+y=5\\\\ 2x+3y=13\\end{cases}$ into a simpler equivalent system and solve it.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Bigarren ekuazioari kendu lehenaren bikoitza: $E_2-2E_1$. $x$ desagertzen da.', 'Resta a la segunda ecuación el doble de la primera: $E_2-2E_1$. Desaparece la $x$.', 'اطرح من المعادلة الثانية ضعف الأولى: $E_2-2E_1$. يختفي $x$.', 'Subtract twice the first equation from the second: $E_2-2E_1$. The $x$ disappears.'), math: same('$\\begin{cases}x+y=5\\\\ y=3\\end{cases}$') },
            { text: say('Sistema berriak soluzio berberak ditu, eta berehala ebazten da.', 'El sistema nuevo tiene las mismas soluciones y se resuelve enseguida.', 'للنظام الجديد الحلول نفسها، ويُحل فورًا.', 'The new system has the same solutions and is solved at once.'), math: same('$y=3,\\ x=5-3=2$') },
            { text: say('Egiaztatu aldatu duzun ekuazioan.', 'Comprueba en la ecuación que cambiaste.', 'تحقق في المعادلة التي غيّرتها.', 'Check in the equation you changed.'), math: same('$2\\cdot 2+3\\cdot 3=13$') }
        ],
        takeaway: say(
            'Bi sistema baliokideak dira soluzio berberak badituzte. Ez dituzte soluzioak aldatzen: bi ekuazio trukatzeak, bat 0 ez den zenbaki batez biderkatzeak eta bati beste baten multiplo bat batzeak.',
            'Dos sistemas son equivalentes si tienen las mismas soluciones. No cambian las soluciones: intercambiar dos ecuaciones, multiplicar una por un número distinto de 0 y sumarle a una un múltiplo de otra.',
            'يتكافأ نظامان إذا كانت لهما الحلول نفسها. ولا تغيّر الحلول: مبادلة معادلتين، وضرب معادلة في عدد غير 0، وإضافة مضاعف معادلة إلى أخرى.',
            'Two systems are equivalent if they have the same solutions. These do not change the solutions: swapping two equations, multiplying one by a number other than 0 and adding a multiple of one equation to another.'
        ),
        figure: (language) => <EquivalentFigure language={language} />
    },

    /* ---------- 2. Gaussian elimination ---------- */
    {
        id: 'triangular-systems',
        stage: 'gauss',
        title: say('Sistema mailakatuak', 'Sistemas escalonados', 'الأنظمة الدرجية', 'Triangular systems'),
        goal: say('Sistema mailakatu bat ezagutzea eta behetik gora ebaztea, balio bakoitza goiko ekuazioan ordeztuz.', 'Reconocer un sistema escalonado y resolverlo de abajo arriba, sustituyendo cada valor en la ecuación de encima.', 'تمييز النظام الدرجي وحله من الأسفل إلى الأعلى بتعويض كل قيمة في المعادلة التي فوقها.', 'Recognise a triangular system and solve it from the bottom up, substituting each value into the equation above.'),
        needs: [
            { unit: 'dbh4-akademikoak/sistemas', topic: 'substitution', title: { eu: 'Ordezkapen-metodoa', es: 'Método de sustitución', en: 'Substitution method', ar: 'طريقة التعويض' } }
        ],
        problem: say('Ebatzi $\\begin{cases}x+y+z=6\\\\ y-z=-1\\\\ 2z=6\\end{cases}$.', 'Resuelve $\\begin{cases}x+y+z=6\\\\ y-z=-1\\\\ 2z=6\\end{cases}$.', 'حُلّ $\\begin{cases}x+y+z=6\\\\ y-z=-1\\\\ 2z=6\\end{cases}$.', 'Solve $\\begin{cases}x+y+z=6\\\\ y-z=-1\\\\ 2z=6\\end{cases}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Azken ekuazioak ${z}$ bakarrik du.', 'La última ecuación solo tiene ${z}$.', 'المعادلة الأخيرة فيها ${z}$ فقط.', 'The last equation has only ${z}$.'), math: same('$2z=6\\ \\to\\ z=3$') },
            { text: say('Igo bigarrenera, ${z}=3$ balioarekin.', 'Sube a la segunda con ${z}=3$.', 'اصعد إلى الثانية مع ${z}=3$.', 'Go up to the second with ${z}=3$.'), math: same('$y-3=-1\\ \\to\\ y=2$') },
            { text: say('Igo lehenera.', 'Sube a la primera.', 'اصعد إلى الأولى.', 'Go up to the first.'), math: same('$x+2+3=6\\ \\to\\ x=1$') }
        ],
        takeaway: say(
            'Sistema mailakatu batean, ekuazio bakoitzak goikoak baino ezezagun bat gutxiago du. Behetik gora ebazten da: ${z}$, gero $y$ eta azkenik $x$.',
            'En un sistema escalonado, cada ecuación tiene una incógnita menos que la de encima. Se resuelve de abajo arriba: ${z}$, después $y$ y por último $x$.',
            'في النظام الدرجي تنقص كل معادلة مجهولًا عن التي فوقها. ويُحل من الأسفل إلى الأعلى: ${z}$ ثم $y$ وأخيرًا $x$.',
            'In a triangular system, each equation has one unknown fewer than the one above. It is solved from the bottom up: ${z}$, then $y$ and finally $x$.'
        ),
        figure: (language) => <StaircaseFigure language={language} />
    },
    {
        id: 'gauss-method',
        stage: 'gauss',
        title: say('Gaussen metodoa', 'El método de Gauss', 'طريقة غاوس', 'Gaussian elimination'),
        goal: say('Hiru ekuazioko sistema bat forma mailakatura eramatea, diagonalaren azpian zeroak eginez, eta ebaztea.', 'Llevar un sistema de tres ecuaciones a la forma escalonada haciendo ceros por debajo de la diagonal, y resolverlo.', 'تحويل نظام من ثلاث معادلات إلى الشكل الدرجي بجعل ما تحت القطر أصفارًا، ثم حله.', 'Bring a system of three equations to triangular form by making zeros below the diagonal, and solve it.'),
        problem: say('Ebatzi Gaussen metodoaz $\\begin{cases}x+y+z=6\\\\ 2x-y+z=3\\\\ x+2y-z=2\\end{cases}$.', 'Resuelve por Gauss $\\begin{cases}x+y+z=6\\\\ 2x-y+z=3\\\\ x+2y-z=2\\end{cases}$.', 'حُلّ بطريقة غاوس $\\begin{cases}x+y+z=6\\\\ 2x-y+z=3\\\\ x+2y-z=2\\end{cases}$.', 'Solve by Gaussian elimination $\\begin{cases}x+y+z=6\\\\ 2x-y+z=3\\\\ x+2y-z=2\\end{cases}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Erabili $E_1$ beste bietatik $x$ kentzeko: $E_2-2E_1$ eta $E_3-E_1$.', 'Usa $E_1$ para quitar la $x$ de las otras dos: $E_2-2E_1$ y $E_3-E_1$.', 'استعمل $E_1$ لحذف $x$ من المعادلتين الأخريين: $E_2-2E_1$ و$E_3-E_1$.', 'Use $E_1$ to remove the $x$ from the other two: $E_2-2E_1$ and $E_3-E_1$.'), math: same('$\\begin{cases}x+y+z=6\\\\ -3y-z=-9\\\\ y-2z=-4\\end{cases}$') },
            { text: say('Kendu $y$ hirugarrenetik: $3E_3+E_2$.', 'Quita la $y$ de la tercera: $3E_3+E_2$.', 'احذف $y$ من الثالثة: $3E_3+E_2$.', 'Remove the $y$ from the third: $3E_3+E_2$.'), math: same('$-7z=-21$') },
            { text: say('Ebatzi behetik gora.', 'Resuelve de abajo arriba.', 'حُلّ من الأسفل إلى الأعلى.', 'Solve from the bottom up.'), math: same('${z}=3,\\ y=2,\\ x=1$') }
        ],
        takeaway: say(
            'Gaussek lehen ekuazioa erabiltzen du beheko ekuazioetatik $x$ kentzeko, eta bigarrena hirugarrenetik $y$ kentzeko. Horrela, sistema mailakatuta geratzen da.',
            'Gauss usa la primera ecuación para quitar la $x$ de las de abajo, y la segunda para quitar la $y$ de la tercera. Así el sistema queda escalonado.',
            'تستعمل طريقة غاوس المعادلة الأولى لحذف $x$ مما تحتها، والثانية لحذف $y$ من الثالثة. فيصير النظام درجيًّا.',
            'Gaussian elimination uses the first equation to remove $x$ from the ones below, and the second to remove $y$ from the third. Then the system is triangular.'
        ),
        figure: (language) => <EliminationFigure language={language} />
    },
    {
        id: 'augmented-matrix',
        stage: 'gauss',
        title: say('Matrize zabaldua', 'La matriz ampliada', 'المصفوفة الموسعة', 'The augmented matrix'),
        goal: say('Sistema bat matrize zabaldu gisa idaztea eta Gaussen metodoa haren errenkadekin egitea, ezezagunak idatzi gabe.', 'Escribir un sistema como matriz ampliada y hacer el método de Gauss con sus filas, sin escribir las incógnitas.', 'كتابة النظام على شكل مصفوفة موسعة وإجراء طريقة غاوس على صفوفها دون كتابة المجاهيل.', 'Write a system as an augmented matrix and carry out Gaussian elimination on its rows, without writing the unknowns.'),
        problem: say('Ebatzi matrize zabalduarekin $\\begin{cases}x-y+2z=1\\\\ 2x+y+z=8\\\\ -x+2y+z=5\\end{cases}$.', 'Resuelve con la matriz ampliada $\\begin{cases}x-y+2z=1\\\\ 2x+y+z=8\\\\ -x+2y+z=5\\end{cases}$.', 'حُلّ بالمصفوفة الموسعة $\\begin{cases}x-y+2z=1\\\\ 2x+y+z=8\\\\ -x+2y+z=5\\end{cases}$.', 'Solve with the augmented matrix $\\begin{cases}x-y+2z=1\\\\ 2x+y+z=8\\\\ -x+2y+z=5\\end{cases}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Idatzi zenbakiak bakarrik: errenkada bat ekuazio bakoitzeko, eta marra gai askeen aurretik.', 'Escribe solo los números: una fila por ecuación y la barra antes de los términos independientes.', 'اكتب الأعداد فقط: صفًّا لكل معادلة، والخط قبل الحدود الثابتة.', 'Write only the numbers: one row per equation, and the bar before the constant terms.'), math: same('$\\left(\\begin{array}{ccc|c}1&-1&2&1\\\\ 2&1&1&8\\\\ -1&2&1&5\\end{array}\\right)$') },
            { text: say('Egin zeroak lehen zutabean: $E_2-2E_1$ eta $E_3+E_1$.', 'Haz ceros en la primera columna: $E_2-2E_1$ y $E_3+E_1$.', 'اجعل أصفارًا في العمود الأول: $E_2-2E_1$ و$E_3+E_1$.', 'Make zeros in the first column: $E_2-2E_1$ and $E_3+E_1$.'), math: same('$\\left(\\begin{array}{ccc|c}1&-1&2&1\\\\ 0&3&-3&6\\\\ 0&1&3&6\\end{array}\\right)$') },
            { text: say('Eta bigarrenean: $3E_3-E_2$.', 'Y en la segunda: $3E_3-E_2$.', 'ثم في العمود الثاني: $3E_3-E_2$.', 'And in the second: $3E_3-E_2$.'), math: same('$\\left(\\begin{array}{ccc|c}1&-1&2&1\\\\ 0&3&-3&6\\\\ 0&0&12&12\\end{array}\\right)$') },
            { text: say('Azken errenkada $12z=12$ da. Ebatzi behetik gora.', 'La última fila es $12z=12$. Resuelve de abajo arriba.', 'الصف الأخير هو $12z=12$. حُلّ من الأسفل إلى الأعلى.', 'The last row is $12z=12$. Solve from the bottom up.'), math: same('${z}=1,\\ y=3,\\ x=2$') }
        ],
        takeaway: say(
            'Matrize zabalduak koefizienteak gordetzen ditu eta, marraren ondoren, gai askeak. Eragiketa bakoitza errenkada osoarekin egiten da, marraren ondoren ere bai.',
            'La matriz ampliada guarda los coeficientes y, tras la barra, los términos independientes. Cada operación se hace con la fila entera, también tras la barra.',
            'تحفظ المصفوفة الموسعة المعاملات، وبعد الخط الحدود الثابتة. وتُجرى كل عملية على الصف كله، وبعد الخط أيضًا.',
            'The augmented matrix keeps the coefficients and, after the bar, the constant terms. Each operation is done on the whole row, after the bar too.'
        ),
        figure: (language) => <AugmentedMatrixFigure language={language} />
    },
    {
        id: 'three-unknown-problems',
        stage: 'gauss',
        title: say('Hiru ezezaguneko problemak', 'Problemas con tres incógnitas', 'مسائل بثلاثة مجاهيل', 'Problems with three unknowns'),
        goal: say('Hiru ezezaguneko problema bat sistema gisa planteatzea, ebaztea eta soluzioa interpretatzea.', 'Plantear un problema con tres incógnitas como un sistema, resolverlo e interpretar la solución.', 'صياغة مسألة بثلاثة مجاهيل على شكل نظام وحله وتفسير الحل.', 'Set up a problem with three unknowns as a system, solve it and interpret the solution.'),
        needs: [
            { unit: 'dbh4-akademikoak/sistemas', topic: 'linear-problems', title: { eu: 'Sistema linealen problemak', es: 'Problemas con sistemas lineales', en: 'Problems with linear systems', ar: 'مسائل بالأنظمة الخطية' } }
        ],
        problem: say(
            'Zinema batek 100 sarrera saldu ditu, 4, 6 eta 8 euroan, eta 640 € bildu ditu. 8 euroko sarrerak beste bi motakoak adina dira, batera. Zenbat saldu ditu prezio bakoitzean?',
            'Un cine vende 100 entradas de 4 €, 6 € y 8 € y recauda 640 €. De 8 € vende tantas como de las otras dos juntas. ¿Cuántas vende de cada precio?',
            'باعت سينما 100 تذكرة بأسعار 4 € و6 € و8 € وجمعت 640 €. وعدد تذاكر 8 € يساوي مجموع النوعين الآخرين. كم تذكرة باعت من كل سعر؟',
            'A cinema sells 100 tickets at €4, €6 and €8 and takes €640. It sells as many €8 tickets as the other two kinds together. How many does it sell at each price?'
        ),
        stepsKind: 'steps',
        steps: [
            { text: say('Izan bitez $x$, $y$ eta ${z}$ 4, 6 eta 8 euroko sarrerak.', 'Llama $x$, $y$ y ${z}$ a las entradas de 4 €, 6 € y 8 €.', 'لتكن $x$ و$y$ و${z}$ تذاكر 4 € و6 € و8 €.', 'Let $x$, $y$ and ${z}$ be the €4, €6 and €8 tickets.'), math: same('$\\begin{cases}x+y+z=100\\\\ 4x+6y+8z=640\\\\ z=x+y\\end{cases}$') },
            { text: say('${z}=x+y$ lehenean ordeztuta, $2z=100$.', 'Con ${z}=x+y$ en la primera, $2z=100$.', 'بتعويض ${z}=x+y$ في الأولى: $2z=100$.', 'With ${z}=x+y$ in the first, $2z=100$.'), math: same('${z}=50,\\ x+y=50$') },
            { text: say('Ordeztu bigarrenean eta ebatzi.', 'Sustituye en la segunda y resuelve.', 'عوّض في الثانية وحُلّ.', 'Substitute into the second and solve.'), math: same('$4x+6y=240\\ \\to\\ x=30,\\ y=20$') }
        ],
        takeaway: say(
            'Hiru ezezagunek hiru ekuazio behar dituzte, datu bakoitzeko bat. Bukaeran, egiaztatu soluzioak zentzua duela: kopuru osoak eta ez negatiboak.',
            'Tres incógnitas necesitan tres ecuaciones, una por dato. Al final, comprueba que la solución tiene sentido: cantidades enteras y no negativas.',
            'تحتاج ثلاثة مجاهيل إلى ثلاث معادلات، واحدة لكل معطى. وفي النهاية تحقق أن للحل معنى: كميات صحيحة وغير سالبة.',
            'Three unknowns need three equations, one per piece of data. At the end, check that the solution makes sense: whole, non-negative amounts.'
        ),
        figure: (language) => <TicketsFigure language={language} />
    },

    /* ---------- 3. Analysing a system ---------- */
    {
        id: 'solutions-count',
        stage: 'discussion',
        title: say('Soluzio kopurua azken errenkadan', 'El número de soluciones en la última fila', 'عدد الحلول في الصف الأخير', 'The number of solutions in the last row'),
        goal: say('Sistema mailakatu bat eztabaidatzea —zenbat soluzio dituen esatea— haren azken errenkada irakurrita.', 'Discutir un sistema escalonado —decir cuántas soluciones tiene— leyendo su última fila.', 'مناقشة نظام درجي —أي قول كم حلًّا له— بقراءة صفه الأخير.', 'Analyse a triangular system —say how many solutions it has— by reading its last row.'),
        problem: say('Eztabaidatu $\\begin{cases}x+y+z=3\\\\ x+2y+3z=5\\\\ 2x+3y+4z=9\\end{cases}$.', 'Discute $\\begin{cases}x+y+z=3\\\\ x+2y+3z=5\\\\ 2x+3y+4z=9\\end{cases}$.', 'ناقش $\\begin{cases}x+y+z=3\\\\ x+2y+3z=5\\\\ 2x+3y+4z=9\\end{cases}$.', 'Analyse $\\begin{cases}x+y+z=3\\\\ x+2y+3z=5\\\\ 2x+3y+4z=9\\end{cases}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$E_2-E_1$ eta $E_3-2E_1$.', '$E_2-E_1$ y $E_3-2E_1$.', '$E_2-E_1$ و$E_3-2E_1$.', '$E_2-E_1$ and $E_3-2E_1$.'), math: same('$\\begin{cases}x+y+z=3\\\\ y+2z=2\\\\ y+2z=3\\end{cases}$') },
            { text: say('Kendu bigarrena hirugarrenari: $E_3-E_2$.', 'Resta la segunda a la tercera: $E_3-E_2$.', 'اطرح الثانية من الثالثة: $E_3-E_2$.', 'Subtract the second from the third: $E_3-E_2$.'), math: same('$0y+0z=1$') },
            { text: say('Ez dago ekuazio hori betetzen duen baliorik: sistema bateraezina da.', 'Ningún valor cumple esa ecuación: el sistema es incompatible.', 'لا توجد قيمة تحقق هذه المعادلة: النظام غير متوافق.', 'No value satisfies that equation: the system is inconsistent.'), math: same('$\\left(\\begin{array}{ccc|c}0&0&0&1\\end{array}\\right)$') }
        ],
        takeaway: say(
            'Begiratu forma mailakatuaren azken errenkadari: $0\\ 0\\ c\\mid d$ eta $c\\neq 0$, soluzio bat; $0\\ 0\\ 0\\mid 0$, infinitu; $0\\ 0\\ 0\\mid d$ eta $d\\neq 0$, bat ere ez.',
            'Mira la última fila de la forma escalonada: $0\\ 0\\ c\\mid d$ con $c\\neq 0$, una solución; $0\\ 0\\ 0\\mid 0$, infinitas; $0\\ 0\\ 0\\mid d$ con $d\\neq 0$, ninguna.',
            'انظر إلى الصف الأخير من الشكل الدرجي: $0\\ 0\\ c\\mid d$ مع $c\\neq 0$ حل واحد؛ و$0\\ 0\\ 0\\mid 0$ ما لا نهاية؛ و$0\\ 0\\ 0\\mid d$ مع $d\\neq 0$ لا حل.',
            'Look at the last row of the triangular form: $0\\ 0\\ c\\mid d$ with $c\\neq 0$, one solution; $0\\ 0\\ 0\\mid 0$, infinitely many; $0\\ 0\\ 0\\mid d$ with $d\\neq 0$, none.'
        ),
        figure: (language) => <LastRowFigure language={language} />
    },
    {
        id: 'parametric-solutions',
        stage: 'discussion',
        title: say('Soluzio infinituak parametro batekin', 'Infinitas soluciones con un parámetro', 'عدد لا نهائي من الحلول بوسيط', 'Infinitely many solutions with a parameter'),
        goal: say('Sistema bateragarri indeterminatu baten soluzio guztiak $\\lambda$ parametro baten funtzioan idaztea, eta soluzio zehatzak ateratzea.', 'Escribir todas las soluciones de un sistema compatible indeterminado en función de un parámetro $\\lambda$ y sacar soluciones concretas.', 'كتابة كل حلول نظام متوافق غير محدد بدلالة وسيط $\\lambda$ واستخراج حلول محددة.', 'Write all the solutions of a consistent dependent system in terms of a parameter $\\lambda$ and get particular solutions.'),
        problem: say('Ebatzi $\\begin{cases}x+y+z=4\\\\ x-y+z=2\\\\ 2x+2z=6\\end{cases}$.', 'Resuelve $\\begin{cases}x+y+z=4\\\\ x-y+z=2\\\\ 2x+2z=6\\end{cases}$.', 'حُلّ $\\begin{cases}x+y+z=4\\\\ x-y+z=2\\\\ 2x+2z=6\\end{cases}$.', 'Solve $\\begin{cases}x+y+z=4\\\\ x-y+z=2\\\\ 2x+2z=6\\end{cases}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$E_2-E_1$ eta $E_3-2E_1$: biek gauza bera ematen dute.', '$E_2-E_1$ y $E_3-2E_1$: las dos dan lo mismo.', '$E_2-E_1$ و$E_3-2E_1$: كلتاهما تعطيان الشيء نفسه.', '$E_2-E_1$ and $E_3-2E_1$: both give the same.'), math: same('$-2y=-2\\qquad -2y=-2$') },
            { text: say('Errenkada bat soberan dago. Hartatik, $y=1$; eta ${z}$ ezezagunari $\\lambda$ deitzen zaio.', 'Una fila sobra. De ella, $y=1$; llama $\\lambda$ a ${z}$.', 'صف زائد. ومنه $y=1$؛ وسمِّ ${z}$ باسم $\\lambda$.', 'One row is left over. From it, $y=1$; call ${z}$ by the name $\\lambda$.'), math: same('$y=1,\\ z=\\lambda$') },
            { text: say('Askatu $x$ lehen ekuazioan.', 'Despeja $x$ en la primera.', 'اعزل $x$ في الأولى.', 'Solve for $x$ in the first.'), math: same('$x=3-\\lambda\\ \\to\\ (3-\\lambda,\\ 1,\\ \\lambda)$') }
        ],
        takeaway: say(
            'Ekuazio bat soberan badago, ezezagun bat aske geratzen da: $\\lambda$ deitzen zaio, eta besteak haren funtzioan idazten dira. $\\lambda$ balio bakoitzak soluzio bat ematen du.',
            'Si sobra una ecuación, una incógnita queda libre: se llama $\\lambda$ y las demás se escriben en función de ella. Cada valor de $\\lambda$ da una solución.',
            'إذا زادت معادلة بقي مجهول حرًّا: نسميه $\\lambda$ ونكتب الباقي بدلالته. وكل قيمة لـ $\\lambda$ تعطي حلًّا.',
            'If one equation is left over, one unknown is free: it is called $\\lambda$ and the others are written in terms of it. Each value of $\\lambda$ gives a solution.'
        ),
        figure: (language) => <ParametricFigure language={language} />
    },
    {
        id: 'parameter-discussion',
        stage: 'discussion',
        title: say('Parametro baten araberako eztabaida', 'Discutir según un parámetro', 'مناقشة نظام حسب وسيط', 'Analysing a system with a parameter'),
        goal: say('Koefiziente ezezagun bat, $a$, duen sistema bat eztabaidatzea: $a$ zenbakiaren zein baliotarako den bateragarri determinatua, indeterminatua edo bateraezina.', 'Discutir un sistema con un coeficiente desconocido $a$: para qué valores de $a$ es compatible determinado, indeterminado o incompatible.', 'مناقشة نظام فيه معامل مجهول $a$: لأي قيم $a$ يكون متوافقًا محددًا أو غير محدد أو غير متوافق.', 'Analyse a system with an unknown coefficient $a$: for which values of $a$ it is consistent and independent, consistent and dependent, or inconsistent.'),
        needs: [
            { unit: 'dbh4-akademikoak/sistemas', topic: 'classify', title: { eu: 'Koefizienteekin sailkatzea', es: 'Clasificar con los coeficientes', en: 'Classify using the coefficients', ar: 'التصنيف بالمعاملات' } }
        ],
        problem: say('Eztabaidatu $\\begin{cases}x+2y=3\\\\ 2x+ay=5\\end{cases}$, $a$ zenbakiaren balioen arabera.', 'Discute $\\begin{cases}x+2y=3\\\\ 2x+ay=5\\end{cases}$ según los valores de $a$.', 'ناقش $\\begin{cases}x+2y=3\\\\ 2x+ay=5\\end{cases}$ حسب قيم $a$.', 'Analyse $\\begin{cases}x+2y=3\\\\ 2x+ay=5\\end{cases}$ for the values of $a$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$E_2-2E_1$ eginda, ezezagun bakarra geratzen da.', '$E_2-2E_1$ deja una sola incógnita.', 'تترك $E_2-2E_1$ مجهولًا واحدًا.', '$E_2-2E_1$ leaves a single unknown.'), math: same('$(a-4)y=-1$') },
            { text: say('$a=4$ bada, $0y=-1$ geratzen da: bateraezina.', 'Si $a=4$, queda $0y=-1$: incompatible.', 'إذا كان $a=4$ بقي $0y=-1$: غير متوافق.', 'If $a=4$, you get $0y=-1$: inconsistent.'), math: same('$a=4\\ \\to\\ 0y=-1$') },
            { text: say('$a\\neq 4$ bada, zati daiteke: soluzio bat.', 'Si $a\\neq 4$, se puede dividir: una solución.', 'إذا كان $a\\neq 4$ أمكن القسمة: حل واحد.', 'If $a\\neq 4$, you can divide: one solution.'), math: same('$y=\\frac{-1}{a-4}$') }
        ],
        takeaway: say(
            'Mailakatu, eta begiratu $a$ daraman koefizienteari: hura 0 egiten duten balioak aparte aztertzen dira. Gainerakoetan, sistema bateragarri determinatua da.',
            'Escalona y mira el coeficiente que lleva $a$: los valores que lo hacen 0 se estudian aparte. Para los demás, el sistema es compatible determinado.',
            'حوّل النظام إلى الشكل الدرجي وانظر إلى المعامل الذي فيه $a$: القيم التي تجعله 0 تُدرس على حدة. وفي غيرها يكون النظام متوافقًا محددًا.',
            'Make it triangular and look at the coefficient that carries $a$: the values that make it 0 are studied separately. For the rest, the system is consistent and independent.'
        ),
        figure: (language) => <ParameterFigure language={language} />
    },

    /* ---------- 4. Non-linear systems ---------- */
    {
        id: 'nonlinear-substitution',
        stage: 'nonlinear',
        title: say('Sistema ez-linealak ordezkapenez', 'Sistemas no lineales por sustitución', 'الأنظمة غير الخطية بالتعويض', 'Non-linear systems by substitution'),
        goal: say('Sistema ez-linealak ebaztea, ekuazio errazenean askatu eta ordeztuz, nahiz eta hiru mailako edo handiagoko ekuazio bat atera.', 'Resolver sistemas no lineales despejando en la ecuación más sencilla y sustituyendo, aunque salga una ecuación de grado 3 o más.', 'حل الأنظمة غير الخطية بالعزل في أبسط معادلة والتعويض، حتى لو ظهرت معادلة من الدرجة الثالثة أو أكثر.', 'Solve non-linear systems by solving the simplest equation for one unknown and substituting, even when an equation of degree 3 or more comes out.'),
        needs: [
            { unit: 'dbh4-akademikoak/sistemas', topic: 'line-curve', title: { eu: 'Lehen mailakoa eta bigarren mailakoa', es: 'Una de primer grado y otra de segundo', en: 'One linear and one quadratic', ar: 'معادلة من الدرجة الأولى وأخرى من الثانية' } },
            { unit: 'batx1-zientziak/ecuaciones-inecuaciones', topic: 'high-degree', title: { eu: 'Hiru mailako edo handiagoko ekuazioak', es: 'Ecuaciones de grado tres o más', en: 'Equations of degree three or more', ar: 'معادلات الدرجة الثالثة فما فوق' } }
        ],
        problem: say('Ebatzi $\\begin{cases}y=x^3-3x\\\\ y=x\\end{cases}$.', 'Resuelve $\\begin{cases}y=x^3-3x\\\\ y=x\\end{cases}$.', 'حُلّ $\\begin{cases}y=x^3-3x\\\\ y=x\\end{cases}$.', 'Solve $\\begin{cases}y=x^3-3x\\\\ y=x\\end{cases}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ordeztu $y$ lehen ekuazioan.', 'Sustituye $y$ en la primera.', 'عوّض $y$ في الأولى.', 'Substitute $y$ into the first.'), math: same('$x=x^3-3x\\ \\to\\ x^3-4x=0$') },
            { text: say('Faktorizatu; ez zatitu $x$ ezezagunaz.', 'Factoriza; no dividas entre $x$.', 'حلّل؛ ولا تقسم على $x$.', 'Factorise; do not divide by $x$.'), math: same('$x(x-2)(x+2)=0$') },
            { text: say('$x$ bakoitzak bere $y$ ematen du.', 'Cada $x$ da su $y$.', 'كل $x$ يعطي $y$ الخاص به.', 'Each $x$ gives its $y$.'), math: same('$(0,0),\\ (2,2),\\ (-2,-2)$') }
        ],
        takeaway: say(
            'Askatu ekuazio errazenean eta ordeztu bestean. Ateratzen den ekuazioaren soluzio bakoitzak puntu bat ematen du: ez zatitu ezezagun batez, soluzioak galtzen dira.',
            'Despeja en la ecuación más sencilla y sustituye en la otra. Cada solución de la ecuación que sale da un punto: no dividas entre una incógnita, que se pierden soluciones.',
            'اعزل في أبسط معادلة وعوّض في الأخرى. وكل حل للمعادلة الناتجة يعطي نقطة: لا تقسم على مجهول، فتضيع حلول.',
            'Solve the simplest equation for one unknown and substitute into the other. Each solution of the resulting equation gives a point: do not divide by an unknown, or solutions are lost.'
        ),
        figure: (language) => <CubicLineFigure language={language} />
    },
    {
        id: 'radical-log-systems',
        stage: 'nonlinear',
        title: say('Erroak eta logaritmoak dituzten sistemak', 'Sistemas con radicales y logaritmos', 'أنظمة فيها جذور ولوغاريتمات', 'Systems with radicals and logarithms'),
        goal: say('Erroak edo logaritmoak dituzten sistemak ebaztea, haiek gabeko ekuazioetara pasatuz, eta soluzioak hasierako sisteman egiaztatzea.', 'Resolver sistemas con raíces o logaritmos pasándolos a ecuaciones sin ellos, y comprobar las soluciones en el sistema de partida.', 'حل أنظمة فيها جذور أو لوغاريتمات بتحويلها إلى معادلات خالية منها، والتحقق من الحلول في النظام الأصلي.', 'Solve systems with roots or logarithms by turning them into equations without them, and check the solutions in the starting system.'),
        needs: [
            { unit: 'batx1-zientziak/ecuaciones-inecuaciones', topic: 'radical-equations', title: { eu: 'Erroak dituzten ekuazioak', es: 'Ecuaciones con radicales', en: 'Equations with radicals', ar: 'معادلات فيها جذور' } },
            { unit: 'batx1-zientziak/ecuaciones-inecuaciones', topic: 'log-equations', title: { eu: 'Ekuazio logaritmikoak eta eremua', es: 'Ecuaciones logarítmicas y dominio', en: 'Logarithmic equations and domain', ar: 'المعادلات اللوغاريتمية والمجال' } }
        ],
        problem: say('Ebatzi $\\begin{cases}\\log x+\\log y=2\\\\ x-y=15\\end{cases}$.', 'Resuelve $\\begin{cases}\\log x+\\log y=2\\\\ x-y=15\\end{cases}$.', 'حُلّ $\\begin{cases}\\log x+\\log y=2\\\\ x-y=15\\end{cases}$.', 'Solve $\\begin{cases}\\log x+\\log y=2\\\\ x-y=15\\end{cases}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Logaritmoen batura biderkaduraren logaritmoa da.', 'La suma de logaritmos es el logaritmo del producto.', 'مجموع اللوغاريتمات لوغاريتم الجداء.', 'A sum of logarithms is the logarithm of the product.'), math: same('$\\log(xy)=2\\ \\to\\ xy=100$') },
            { text: say('Ordeztu $x=y+15$.', 'Sustituye $x=y+15$.', 'عوّض $x=y+15$.', 'Substitute $x=y+15$.'), math: same('$y^2+15y-100=0\\ \\to\\ y=5,\\ y=-20$') },
            { text: say('Egiaztatu: $y=-20$ balioarekin $\\log(-5)$ ateratzen da, eta ez dago.', 'Comprueba: con $y=-20$ sale $\\log(-5)$, que no existe.', 'تحقق: مع $y=-20$ يظهر $\\log(-5)$، وهو غير موجود.', 'Check: with $y=-20$ you get $\\log(-5)$, which does not exist.'), math: same('$x=20,\\ y=5$') }
        ],
        takeaway: say(
            'Kendu erroak edo logaritmoak sistema aljebraiko bat izateko, eta gero egiaztatu soluzio bakoitza hasierako sisteman: zenbaki negatiboen edo 0 zenbakiaren logaritmoak ez daude.',
            'Quita las raíces o los logaritmos para tener un sistema algebraico, y después comprueba cada solución en el sistema de partida: los logaritmos de números negativos o de 0 no existen.',
            'أزل الجذور أو اللوغاريتمات لتحصل على نظام جبري، ثم تحقق من كل حل في النظام الأصلي: لا توجد لوغاريتمات للأعداد السالبة ولا للصفر.',
            'Remove the roots or the logarithms to get an algebraic system, and then check each solution in the starting system: logarithms of negative numbers or of 0 do not exist.'
        ),
        figure: (language) => <CandidatesFigure language={language} />
    },
    {
        id: 'exponential-systems',
        stage: 'nonlinear',
        title: say('Sistema esponentzialak', 'Sistemas exponenciales', 'الأنظمة الأسية', 'Exponential systems'),
        goal: say('Sistema esponentzialak aldagai-aldaketa batekin ebaztea, $u=2^x$ eta $v=3^y$, sistema lineal bihurtzen baititu.', 'Resolver sistemas exponenciales con un cambio de variable, $u=2^x$ y $v=3^y$, que los convierte en sistemas lineales.', 'حل الأنظمة الأسية بتغيير المتغير $u=2^x$ و$v=3^y$ الذي يحوّلها إلى أنظمة خطية.', 'Solve exponential systems with a change of variable, $u=2^x$ and $v=3^y$, which turns them into linear systems.'),
        needs: [
            { unit: 'batx1-zientziak/ecuaciones-inecuaciones', topic: 'exponential-change', title: { eu: 'Esponentzialak aldagai-aldaketarekin', es: 'Exponenciales con cambio de variable', en: 'Exponentials with a change of variable', ar: 'المعادلات الأسية بتغيير المتغير' } }
        ],
        problem: say('Ebatzi $\\begin{cases}2^x+3^y=11\\\\ 2^x-3^y=5\\end{cases}$.', 'Resuelve $\\begin{cases}2^x+3^y=11\\\\ 2^x-3^y=5\\end{cases}$.', 'حُلّ $\\begin{cases}2^x+3^y=11\\\\ 2^x-3^y=5\\end{cases}$.', 'Solve $\\begin{cases}2^x+3^y=11\\\\ 2^x-3^y=5\\end{cases}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Aldaketa: $u=2^x$, $v=3^y$.', 'Cambio: $u=2^x$, $v=3^y$.', 'التغيير: $u=2^x$ و$v=3^y$.', 'Change: $u=2^x$, $v=3^y$.'), math: same('$\\begin{cases}u+v=11\\\\ u-v=5\\end{cases}$') },
            { text: say('Ebatzi sistema lineala.', 'Resuelve el sistema lineal.', 'حُلّ النظام الخطي.', 'Solve the linear system.'), math: same('$u=8,\\ v=3$') },
            { text: say('Desegin aldaketa.', 'Deshaz el cambio.', 'اعكس التغيير.', 'Undo the change.'), math: same('$2^x=8\\ \\to\\ x=3\\qquad 3^y=3\\ \\to\\ y=1$') }
        ],
        takeaway: say(
            '$u=2^x$, $v=3^y$ aldaketarekin, sistema esponentziala lineal bihurtzen da. Desegitean, $u$ eta $v$ positiboak izan behar dira: $2^x$ ez da inoiz 0 edo negatiboa.',
            'Con el cambio $u=2^x$, $v=3^y$, el sistema exponencial pasa a ser lineal. Al deshacerlo, $u$ y $v$ tienen que ser positivos: $2^x$ nunca es 0 ni negativo.',
            'بالتغيير $u=2^x$ و$v=3^y$ يصير النظام الأسي خطيًّا. وعند عكسه يجب أن يكون $u$ و$v$ موجبين: $2^x$ لا يساوي 0 ولا يكون سالبًا أبدًا.',
            'With the change $u=2^x$, $v=3^y$, the exponential system becomes linear. When you undo it, $u$ and $v$ must be positive: $2^x$ is never 0 or negative.'
        ),
        figure: (language) => <ExponentialChangeFigure language={language} />
    },
    {
        id: 'nonlinear-problems',
        stage: 'nonlinear',
        title: say('Geometria-problemak sistemekin', 'Problemas geométricos con sistemas', 'مسائل هندسية بالأنظمة', 'Geometry problems with systems'),
        goal: say('Azalera, perimetro eta Pitagorasen problemak sistema ez-lineal gisa planteatzea, eta zentzua duten soluzioak bakarrik hartzea.', 'Plantear problemas de áreas, perímetros y Pitágoras como sistemas no lineales y quedarse con las soluciones que tienen sentido.', 'صياغة مسائل المساحات والمحيطات وفيثاغورس على شكل أنظمة غير خطية والاحتفاظ بالحلول ذات المعنى.', 'Set up problems about areas, perimeters and Pythagoras\' theorem as non-linear systems and keep only the solutions that make sense.'),
        needs: [
            { unit: 'dbh4-akademikoak/sistemas', topic: 'nonlinear-problems', title: { eu: 'Sistema ez-linealen problemak', es: 'Problemas con sistemas no lineales', en: 'Problems with non-linear systems', ar: 'مسائل بالأنظمة غير الخطية' } }
        ],
        problem: say(
            'Triangelu zuzen baten hipotenusak 10 cm ditu, eta azalerak 24 cm². Zenbat neurtzen dute katetoek?',
            'Un triángulo rectángulo tiene 10 cm de hipotenusa y 24 cm² de área. ¿Cuánto miden sus catetos?',
            'مثلث قائم وتره 10 سم ومساحته 24 سم². ما طولا ضلعَي القائمة؟',
            'A right-angled triangle has a hypotenuse of 10 cm and an area of 24 cm². How long are its legs?'
        ),
        stepsKind: 'steps',
        steps: [
            { text: say('Pitagoras eta azalera.', 'Pitágoras y el área.', 'فيثاغورس والمساحة.', 'Pythagoras\' theorem and the area.'), math: same('$\\begin{cases}x^2+y^2=100\\\\ xy=48\\end{cases}$') },
            { text: say('Batu bigarrenaren bikoitza lehenari.', 'Suma el doble de la segunda a la primera.', 'أضف ضعف الثانية إلى الأولى.', 'Add twice the second to the first.'), math: same('$(x+y)^2=196\\ \\to\\ x+y=14$') },
            { text: say('$x+y=14$ eta $xy=48$ dira: zenbakiak 6 eta 8.', 'Con $x+y=14$ y $xy=48$, los números son 6 y 8.', 'مع $x+y=14$ و$xy=48$ يكون العددان 6 و8.', 'With $x+y=14$ and $xy=48$, the numbers are 6 and 8.'), math: same('$x=6,\\ y=8$') }
        ],
        takeaway: say(
            'Datu geometriko bakoitzak ekuazio bat ematen du: perimetroak, lineal bat; azalerak eta Pitagorasek, bigarren mailakoak. Luzera negatiboak baztertzen dira.',
            'Cada dato geométrico da una ecuación: el perímetro, una lineal; el área y Pitágoras, de segundo grado. Las longitudes negativas se descartan.',
            'كل معطى هندسي يعطي معادلة: المحيط معادلة خطية، والمساحة وفيثاغورس معادلات من الدرجة الثانية. وتُستبعد الأطوال السالبة.',
            'Each geometric fact gives an equation: the perimeter, a linear one; the area and Pythagoras\' theorem, quadratic ones. Negative lengths are thrown out.'
        ),
        figure: (language) => <RightTriangleFigure language={language} />
    },

    /* ---------- 5. Inequalities in two unknowns ---------- */
    {
        id: 'half-plane-regions',
        stage: 'inequalities',
        title: say('Erdiplanoak eta eskualdeak', 'Semiplanos y regiones', 'أنصاف المستويات والمناطق', 'Half-planes and regions'),
        goal: say('Bi ezezaguneko inekuazio lineal bat proba-puntu batekin ebaztea, eta inekuazio-sistema bat erdiplanoen eskualde komun gisa.', 'Resolver una inecuación lineal con dos incógnitas con un punto de prueba, y un sistema de inecuaciones como la región común de los semiplanos.', 'حل متراجحة خطية بمجهولين بنقطة اختبار، وحل نظام متراجحات على أنه المنطقة المشتركة بين أنصاف المستويات.', 'Solve a linear inequality in two unknowns with a test point, and a system of inequalities as the common region of the half-planes.'),
        needs: [
            { unit: 'dbh4-akademikoak/sistemas', topic: 'half-plane', title: { eu: 'Bi ezezaguneko inekuazioak', es: 'Inecuaciones con dos incógnitas', en: 'Inequalities with two unknowns', ar: 'المتراجحات بمجهولين' } },
            { unit: 'dbh4-akademikoak/sistemas', topic: 'region', title: { eu: 'Bi ezezaguneko inekuazio-sistemak', es: 'Sistemas de inecuaciones con dos incógnitas', en: 'Systems of inequalities with two unknowns', ar: 'أنظمة المتراجحات بمجهولين' } }
        ],
        problem: say('Ebatzi $\\begin{cases}x+y\\le 5\\\\ x\\ge 1\\\\ y\\ge 0\\end{cases}$.', 'Resuelve $\\begin{cases}x+y\\le 5\\\\ x\\ge 1\\\\ y\\ge 0\\end{cases}$.', 'حُلّ $\\begin{cases}x+y\\le 5\\\\ x\\ge 1\\\\ y\\ge 0\\end{cases}$.', 'Solve $\\begin{cases}x+y\\le 5\\\\ x\\ge 1\\\\ y\\ge 0\\end{cases}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$x+y\\le 5$ inekuazioan, probatu $(0,0)$ puntuarekin: betetzen da; beraz, $O$ dagoen aldea da.', 'Para $x+y\\le 5$ prueba con $(0,0)$: se cumple, así que vale el lado de $O$.', 'في $x+y\\le 5$ جرّب $(0,0)$: تتحقق، إذن الجانب الذي فيه $O$.', 'For $x+y\\le 5$ try $(0,0)$: it holds, so it is the side of $O$.'), math: same('$0+0\\le 5$') },
            { text: say('$x\\ge 1$ zuzenaren eskuinaldea da, $x=1$; eta $y\\ge 0$, ardatzaren gainekoa.', '$x\\ge 1$ es lo que queda a la derecha de $x=1$, e $y\\ge 0$, lo que está encima del eje.', '$x\\ge 1$ هو ما يقع يمين $x=1$، و$y\\ge 0$ ما يقع فوق المحور.', '$x\\ge 1$ is what lies to the right of $x=1$, and $y\\ge 0$ is what lies above the axis.'), math: same('$x\\ge 1,\\ y\\ge 0$') },
            { text: say('Soluzioa triangelu komuna da; haren erpinak zuzenen ebaki-puntuak dira.', 'La solución es el triángulo común; sus vértices son los cortes de las rectas.', 'الحل هو المثلث المشترك، ورؤوسه نقاط تقاطع المستقيمات.', 'The solution is the common triangle; its vertices are where the lines meet.'), math: same('$(1,0),\\ (5,0),\\ (1,4)$') }
        ],
        takeaway: say(
            'Inekuazio lineal bakoitza erdiplano bat da; zuzenean ez dagoen proba-puntu batek esaten du zein. Sistemaren soluzioa guztien eskualde komuna da.',
            'Cada inecuación lineal es un semiplano; un punto de prueba que no esté en la recta dice cuál. La solución del sistema es la región común a todos.',
            'كل متراجحة خطية نصف مستوى، وتخبرنا نقطة اختبار ليست على المستقيم أيّهما. وحل النظام هو المنطقة المشتركة بينها كلها.',
            'Each linear inequality is a half-plane; a test point that is not on the line tells you which one. The solution of the system is the region common to all of them.'
        ),
        figure: (language) => <TriangleRegionFigure language={language} />
    },
    {
        id: 'region-cases',
        stage: 'inequalities',
        title: say('Eskualde itxiak, irekiak eta hutsak', 'Regiones cerradas, abiertas y vacías', 'مناطق مغلقة ومفتوحة وخالية', 'Closed, open and empty regions'),
        goal: say('Inekuazio-sistema baten eskualdea itxia (poligono bat), irekia (ez du amaierarik) edo hutsa (ez dago soluziorik) den jakitea.', 'Saber si la región de un sistema de inecuaciones es cerrada (un polígono), abierta (no tiene fin) o vacía (no hay solución).', 'معرفة هل منطقة نظام المتراجحات مغلقة (مضلع) أو مفتوحة (لا نهاية لها) أو خالية (لا حل).', 'Tell whether the region of a system of inequalities is closed (a polygon), open (it has no end) or empty (there is no solution).'),
        problem: say('Ba al du soluziorik $\\begin{cases}x+y\\ge 6\\\\ x\\le 2\\\\ y\\le 3\\end{cases}$ sistemak?', '¿Tiene solución $\\begin{cases}x+y\\ge 6\\\\ x\\le 2\\\\ y\\le 3\\end{cases}$?', 'هل للنظام $\\begin{cases}x+y\\ge 6\\\\ x\\le 2\\\\ y\\le 3\\end{cases}$ حل؟', 'Does $\\begin{cases}x+y\\ge 6\\\\ x\\le 2\\\\ y\\le 3\\end{cases}$ have a solution?'),
        stepsKind: 'steps',
        steps: [
            { text: say('$x\\le 2$ eta $y\\le 3$ izkina bat dira: $x+y$ handiena duen puntua $(2,3)$ da.', '$x\\le 2$ e $y\\le 3$ forman una esquina: el punto con $x+y$ más grande es $(2,3)$.', 'تشكّل $x\\le 2$ و$y\\le 3$ زاوية: النقطة ذات أكبر $x+y$ هي $(2,3)$.', '$x\\le 2$ and $y\\le 3$ make a corner: the point with the largest $x+y$ is $(2,3)$.'), math: same('$2+3=5$') },
            { text: say('Gehienezko hori ez da 6 zenbakira iristen.', 'Ese máximo no llega a 6.', 'هذه القيمة العظمى لا تبلغ 6.', 'That largest value does not reach 6.'), math: same('$5<6$') },
            { text: say('Ez dago hirurak betetzen dituen punturik: eskualdea hutsa da, eta sistemak ez du soluziorik.', 'Ningún punto cumple las tres: la región es vacía y el sistema no tiene solución.', 'لا توجد نقطة تحقق الثلاث: المنطقة خالية وليس للنظام حل.', 'No point satisfies all three: the region is empty and the system has no solution.') }
        ],
        takeaway: say(
            'Marraztu erdiplanoak eta begiratu zer duten komunean: poligono bat, ixten ez den eskualde bat edo ezer ez. Eskualde komunik ez badago, inekuazio-sistemak ez du soluziorik.',
            'Dibuja los semiplanos y mira qué tienen en común: un polígono, una región que no se cierra o nada. Si no hay región común, el sistema de inecuaciones no tiene solución.',
            'ارسم أنصاف المستويات وانظر ما المشترك بينها: مضلع، أو منطقة لا تنغلق، أو لا شيء. وإذا لم توجد منطقة مشتركة فليس لنظام المتراجحات حل.',
            'Draw the half-planes and see what they have in common: a polygon, a region that does not close, or nothing. If there is no common region, the system of inequalities has no solution.'
        ),
        figure: (language) => <RegionCasesFigure language={language} />
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts) */
export const bachSystemsTopics: UnitTopic[] = baseTopics.map((topic) => ({ ...topic, ...bachSystemsLessonTexts[topic.id as BachSystemsTopicId], ...bachSystemsLessonChecks[topic.id as BachSystemsTopicId] }))

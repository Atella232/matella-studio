import type { UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { BalanceFigure } from '../dbh1-aljebra-v2/figures'
import { DenominatorsFigure, DiscriminantFigure, EquationPartsFigure, ProblemStepsFigure, StepsFigure, ZeroProductFigure } from './figures'
import { equationLessonChecks, type EquationTopicId } from './lessonChecks'
import { equationLessonTexts } from './lessonTexts'

/* ==========================================================================
   Ekuazioak · 2. DBH — stages and lessons
   Sequence follows the class textbook (Santillana 2.º ESO unit 6,
   "Ecuaciones de primer y segundo grado") with Anaya 2.º ESO unit 7:
   meaning and elements, equivalent equations, first-degree equations with
   brackets and denominators, special cases, problems and second-degree
   equations (incomplete ones and the general formula).
   ========================================================================== */

export type EquationsStageId = 'basics' | 'first-degree' | 'denominators' | 'problems' | 'quadratic'

export const equationsStages: UnitStage[] = [
    { id: 'basics', tone: 'blue', title: { eu: 'Ekuazioak eta ebazpenak', es: 'Ecuaciones y soluciones', en: 'Equations and solutions', ar: 'المعادلات والحلول' } },
    { id: 'first-degree', tone: 'violet', title: { eu: 'Lehen mailako ekuazioak', es: 'Ecuaciones de primer grado', en: 'First-degree equations', ar: 'معادلات الدرجة الأولى' } },
    { id: 'denominators', tone: 'mustard', title: { eu: 'Izendatzaileak dituzten ekuazioak', es: 'Ecuaciones con denominadores', en: 'Equations with denominators', ar: 'معادلات بمقامات' } },
    { id: 'problems', tone: 'coral', title: { eu: 'Buruketak ekuazioekin', es: 'Problemas con ecuaciones', en: 'Problems with equations', ar: 'مسائل بالمعادلات' } },
    { id: 'quadratic', tone: 'green', title: { eu: 'Bigarren mailako ekuazioak', es: 'Ecuaciones de segundo grado', en: 'Second-degree equations', ar: 'معادلات الدرجة الثانية' } }
]

/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    {
        id: 'meaning',
        stage: 'basics',
        title: { eu: 'Ekuazioak eta identitateak', es: 'Ecuaciones e identidades', en: 'Equations and identities', ar: 'المعادلات والمتطابقات' },
        goal: {
            eu: 'Ekuazioa eta identitatea bereiztea eta balio bat ebazpena den egiaztatzea.',
            es: 'Distinguir ecuación e identidad y comprobar si un valor es solución.',
            en: 'Distinguish between an equation and an identity, and check whether a value is a solution.',
            ar: 'التمييز بين المعادلة والمتطابقة والتحقق مما إذا كانت قيمة ما حلًّا.'
        },
        problem: { eu: 'x = 3 ebazpena al da $2x+5=3x+2$ ekuazioan?', es: '¿Es x = 3 solución de $2x+5=3x+2$?', en: 'Is x = 3 a solution of $2x+5=3x+2$?', ar: 'هل x = 3 حل للمعادلة $2x+5=3x+2$؟' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Lehen atala.', es: 'Primer miembro.', en: 'Left side.', ar: 'الطرف الأول.' }, math: '$2\\cdot 3+5=11$' },
            { text: { eu: 'Bigarren atala.', es: 'Segundo miembro.', en: 'Right side.', ar: 'الطرف الثاني.' }, math: '$3\\cdot 3+2=11$' },
            { text: { eu: 'Berdinak dira: x = 3 ebazpena da.', es: 'Son iguales: x = 3 es solución.', en: 'They are equal: x = 3 is a solution.', ar: 'متساويان: x = 3 حل.' } }
        ],
        takeaway: {
            eu: 'Identitatea: beti egia. Ekuazioa: ebazpenetan bakarrik.',
            es: 'Identidad: siempre cierta. Ecuación: solo en sus soluciones.',
            en: 'Identity: always true. Equation: only true for its solutions.',
            ar: 'المتطابقة: صحيحة دائمًا. المعادلة: عند حلولها فقط.'
        },
        figure: (language) => <BalanceFigure language={language} />
    },
    {
        id: 'elements',
        stage: 'basics',
        title: { eu: 'Elementuak eta ekuazio baliokideak', es: 'Elementos y ecuaciones equivalentes', en: 'Parts of an equation and equivalent equations', ar: 'العناصر والمعادلات المتكافئة' },
        goal: {
            eu: 'Ekuazio baten atalak, gaiak, ezezaguna eta maila ezagutzea, eta ekuazio baliokideak lortzea.',
            es: 'Reconocer miembros, términos, incógnita y grado de una ecuación, y obtener ecuaciones equivalentes.',
            en: 'Recognise the sides, terms, unknown and degree of an equation, and find equivalent equations.',
            ar: 'معرفة أطراف المعادلة وحدودها ومجهولها ودرجتها، والحصول على معادلات متكافئة.'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Batzen → kentzen', es: 'Sumando → restando', en: 'Adding → subtracting', ar: 'جمع ← طرح' }, text: { eu: 'Bi ataletan 5 kendu.', es: 'Restar 5 en los dos miembros.', en: 'Subtract 5 from both sides.', ar: 'اطرح 5 من الطرفين.' }, math: '$x+5=12\\ \\to\\ x=7$' },
            { title: { eu: 'Biderkatzen → zatitzen', es: 'Multiplicando → dividiendo', en: 'Multiplying → dividing', ar: 'ضرب ← قسمة' }, text: { eu: 'Bi atalak 3 zenbakiaz zatitu.', es: 'Dividir los dos miembros entre 3.', en: 'Divide both sides by 3.', ar: 'اقسم الطرفين على 3.' }, math: '$3x=21\\ \\to\\ x=7$' },
            { title: { eu: 'Baliokideak', es: 'Equivalentes', en: 'Equivalent', ar: 'متكافئة' }, text: { eu: 'Ebazpen bera: x = 7.', es: 'La misma solución: x = 7.', en: 'The same solution: x = 7.', ar: 'الحل نفسه: x = 7.' }, math: '$x+5=12\\ \\sim\\ 3x=21$' }
        ],
        takeaway: {
            eu: 'Bi ataletan gauza bera eginez, ekuazioak orekan jarraitzen du.',
            es: 'Haciendo lo mismo en los dos miembros, la ecuación sigue en equilibrio.',
            en: 'Doing the same to both sides keeps the equation balanced.',
            ar: 'إذا فعلنا الشيء نفسه في الطرفين تبقى المعادلة متوازنة.'
        },
        figure: (language) => <EquationPartsFigure language={language} />
    },
    {
        id: 'simple',
        stage: 'first-degree',
        needs: [{ unit: 'dbh2/algebra', topic: 'add-monomials', title: { eu: 'Monomioen batuketa eta kenketa', es: 'Suma y resta de monomios', en: 'Adding and subtracting monomials', ar: 'جمع وحيدات الحد وطرحها' } }],
        title: { eu: 'x bi ataletan', es: 'La x en los dos miembros', en: 'The x on both sides', ar: 'x في الطرفين' },
        goal: {
            eu: '$ax+b=cx+d$ motako ekuazioak ebaztea gaiak transposatuz.',
            es: 'Resolver ecuaciones del tipo $ax+b=cx+d$ transponiendo términos.',
            en: 'Solve equations of the form $ax+b=cx+d$ by moving terms across.',
            ar: 'حل معادلات من النوع $ax+b=cx+d$ بنقل الحدود.'
        },
        problem: { eu: 'Ebatzi $5x-4=2x+11$.', es: 'Resuelve $5x-4=2x+11$.', en: 'Solve $5x-4=2x+11$.', ar: 'حلّ $5x-4=2x+11$.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: '2x ezkerrera (kentzen) eta −4 eskuinera (batzen).', es: '2x a la izquierda (restando) y −4 a la derecha (sumando).', en: '2x to the left (subtracting) and −4 to the right (adding).', ar: '2x إلى اليسار (طرحًا) و−4 إلى اليمين (جمعًا).' }, math: '$5x-2x=11+4$' },
            { text: { eu: 'Laburtu.', es: 'Reduce.', en: 'Simplify.', ar: 'بسّط.' }, math: '$3x=15$' },
            { text: { eu: 'Askatu x.', es: 'Despeja x.', en: 'Solve for x.', ar: 'اعزل x.' }, math: '$x=5$' }
        ],
        takeaway: {
            eu: 'Atalez aldatzean, zeinua aldatu. Koefizientea zatitzen pasatzen da.',
            es: 'Al cambiar de miembro, cambia el signo. El coeficiente pasa dividiendo.',
            en: 'When you move a term to the other side, its sign changes. The coefficient moves across, dividing.',
            ar: 'عند تغيير الطرف تتغيّر الإشارة. وينتقل المعامل قاسمًا.'
        }
    },
    {
        id: 'brackets',
        stage: 'first-degree',
        needs: [{ unit: 'dbh2/algebra', topic: 'multiply-monomial', title: { eu: 'Polinomioa bider monomioa eta zati monomioa', es: 'Polinomio por monomio y entre monomio', en: 'Multiplying and dividing a polynomial by a monomial', ar: 'حدودية في وحيد حد وعلى وحيد حد' } }],
        title: { eu: 'Parentesiak dituzten ekuazioak', es: 'Ecuaciones con paréntesis', en: 'Equations with brackets', ar: 'معادلات بأقواس' },
        goal: {
            eu: 'Parentesiak dituzten ekuazioak ebaztea, urratsen ordena jarraituz.',
            es: 'Resolver ecuaciones con paréntesis siguiendo el orden de los pasos.',
            en: 'Solve equations with brackets by following the order of the steps.',
            ar: 'حل معادلات بأقواس باتباع ترتيب الخطوات.'
        },
        problem: { eu: 'Ebatzi $3(x-2)-(x-4)=8$.', es: 'Resuelve $3(x-2)-(x-4)=8$.', en: 'Solve $3(x-2)-(x-4)=8$.', ar: 'حلّ $3(x-2)-(x-4)=8$.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Kendu parentesiak: minusaren atzean zeinuak aldatzen dira.', es: 'Quita paréntesis: tras el menos cambian los signos.', en: 'Remove the brackets: after the minus sign, the signs change.', ar: 'احذف الأقواس: بعد الناقص تتغيّر الإشارات.' }, math: '$3x-6-x+4=8$' },
            { text: { eu: 'Bildu eta laburtu.', es: 'Agrupa y reduce.', en: 'Group and simplify.', ar: 'اجمع وبسّط.' }, math: '$2x=10$' },
            { text: { eu: 'Askatu x eta egiaztatu.', es: 'Despeja x y comprueba.', en: 'Solve for x and check.', ar: 'اعزل x وتحقّق.' }, math: '$x=5\\qquad 3\\cdot 3-1=8$' }
        ],
        takeaway: {
            eu: 'Parentesiak → bildu → laburtu → askatu → egiaztatu.',
            es: 'Paréntesis → agrupar → reducir → despejar → comprobar.',
            en: 'Brackets → group → simplify → solve for x → check.',
            ar: 'الأقواس ← الجمع ← التبسيط ← العزل ← التحقق.'
        },
        figure: (language) => <StepsFigure language={language} />
    },
    {
        id: 'special',
        stage: 'first-degree',
        title: { eu: 'Ebazpenik gabe edo infinitu ebazpenekin', es: 'Sin solución o con infinitas soluciones', en: 'No solution or infinitely many solutions', ar: 'بلا حل أو بعدد لا نهائي من الحلول' },
        goal: {
            eu: 'Ebazpenik ez duten ekuazioak eta identitateak ezagutzea.',
            es: 'Reconocer ecuaciones sin solución e identidades.',
            en: 'Recognise equations with no solution and identities.',
            ar: 'التعرّف إلى المعادلات التي لا حل لها وإلى المتطابقات.'
        },
        stepsKind: 'facts',
        steps: [
            { title: { eu: 'Ebazpenik ez', es: 'Sin solución', en: 'No solution', ar: 'بلا حل' }, text: { eu: 'x desagertzen da eta berdintza faltsua geratzen da.', es: 'La x desaparece y queda una igualdad falsa.', en: 'The x disappears and you are left with a false equality.', ar: 'تختفي x وتبقى مساواة خاطئة.' }, math: '$2x+1=2x+4\\ \\to\\ 0x=3$' },
            { title: { eu: 'Infinitu ebazpen', es: 'Infinitas soluciones', en: 'Infinitely many solutions', ar: 'عدد لا نهائي من الحلول' }, text: { eu: 'x desagertzen da eta berdintza egiazkoa geratzen da.', es: 'La x desaparece y queda una igualdad cierta.', en: 'The x disappears and you are left with a true equality.', ar: 'تختفي x وتبقى مساواة صحيحة.' }, math: '$2(x+3)=2x+6\\ \\to\\ 0x=0$' }
        ],
        takeaway: {
            eu: '0x = zenbaki bat (≠ 0): ebazpenik ez. 0x = 0: identitatea.',
            es: '0x = número (≠ 0): sin solución. 0x = 0: identidad.',
            en: '0x = a number (≠ 0): no solution. 0x = 0: identity.',
            ar: '0x = عدد (≠ 0): لا حل. 0x = 0: متطابقة.'
        }
    },
    {
        id: 'denominators',
        stage: 'denominators',
        title: { eu: 'Izendatzaile bat', es: 'Un denominador', en: 'One denominator', ar: 'مقام واحد' },
        goal: {
            eu: 'Izendatzaile bakarra duten ekuazioak ebaztea.',
            es: 'Resolver ecuaciones con un solo denominador.',
            en: 'Solve equations with one denominator.',
            ar: 'حل معادلات بمقام واحد.'
        },
        problem: { eu: 'Ebatzi $\\frac{x}{3}+2=7$.', es: 'Resuelve $\\frac{x}{3}+2=7$.', en: 'Solve $\\frac{x}{3}+2=7$.', ar: 'حلّ $\\frac{x}{3}+2=7$.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Biderkatu gai guztiak 3 zenbakiaz.', es: 'Multiplica todos los términos por 3.', en: 'Multiply all the terms by 3.', ar: 'اضرب كل الحدود في 3.' }, math: '$x+6=21$' },
            { text: { eu: 'Askatu x.', es: 'Despeja x.', en: 'Solve for x.', ar: 'اعزل x.' }, math: '$x=15$' }
        ],
        takeaway: {
            eu: 'Zenbaki soilak ere biderkatu behar dira: 2 → 6.',
            es: 'También hay que multiplicar los números sueltos: 2 → 6.',
            en: 'Don\'t forget to multiply the numbers on their own: 2 → 6.',
            ar: 'يجب ضرب الأعداد المنفردة أيضًا: 2 ← 6.'
        }
    },
    {
        id: 'lcm',
        stage: 'denominators',
        needs: [{ unit: 'dbh2/divisibilidad', topic: 'lcm', title: { eu: 'Multiplo komunetako txikiena (MKT)', es: 'Mínimo común múltiplo (m.c.m.)', en: 'Least common multiple (LCM)', ar: 'المضاعف المشترك الأصغر (م.م.أ · MKT)' } }],
        figureAfterSteps: true,
        title: { eu: 'Izendatzaile batzuk: MKT', es: 'Varios denominadores: m.c.m.', en: 'Several denominators: LCM', ar: 'عدة مقامات: م.م.أ' },
        goal: {
            eu: 'Izendatzaile desberdinak dituzten ekuazioak MKTa erabiliz ebaztea.',
            es: 'Resolver ecuaciones con denominadores distintos usando el m.c.m.',
            en: 'Solve equations with different denominators using the LCM.',
            ar: 'حل معادلات بمقامات مختلفة باستعمال م.م.أ.'
        },
        problem: { eu: 'Ebatzi $\\frac{x}{2}+\\frac{x}{3}=5$.', es: 'Resuelve $\\frac{x}{2}+\\frac{x}{3}=5$.', en: 'Solve $\\frac{x}{2}+\\frac{x}{3}=5$.', ar: 'حلّ $\\frac{x}{2}+\\frac{x}{3}=5$.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'MKT(2, 3) = 6. Biderkatu gai guztiak 6 zenbakiaz.', es: 'm.c.m.(2, 3) = 6. Multiplica todos los términos por 6.', en: 'LCM(2, 3) = 6. Multiply all the terms by 6.', ar: 'م.م.أ(2، 3) = 6. اضرب كل الحدود في 6.' }, math: '$3x+2x=30$' },
            { text: { eu: 'Laburtu eta askatu x.', es: 'Reduce y despeja x.', en: 'Simplify and solve for x.', ar: 'بسّط واعزل x.' }, math: '$5x=30\\ \\to\\ x=6$' }
        ],
        takeaway: {
            eu: 'MKTaz biderkatu, eta zatikiak desagertzen dira.',
            es: 'Multiplica por el m.c.m. y las fracciones desaparecen.',
            en: 'Multiply by the LCM and the fractions disappear.',
            ar: 'اضرب في م.م.أ فتختفي الكسور.'
        },
        figure: (language) => <DenominatorsFigure language={language} />
    },
    {
        id: 'mixed',
        stage: 'denominators',
        title: { eu: 'Izendatzaileak eta parentesiak', es: 'Denominadores y paréntesis', en: 'Denominators and brackets', ar: 'المقامات والأقواس' },
        goal: {
            eu: 'Izendatzaileak eta parentesiak dituzten ekuazioak ebaztea, zatiki baten aurreko minusa kontuan hartuz.',
            es: 'Resolver ecuaciones con denominadores y paréntesis, teniendo en cuenta el menos delante de una fracción.',
            en: 'Solve equations with denominators and brackets, taking into account the minus sign in front of a fraction.',
            ar: 'حل معادلات بمقامات وأقواس مع مراعاة الناقص قبل الكسر.'
        },
        problem: { eu: 'Ebatzi $\\frac{x+1}{2}-\\frac{x-3}{4}=3$.', es: 'Resuelve $\\frac{x+1}{2}-\\frac{x-3}{4}=3$.', en: 'Solve $\\frac{x+1}{2}-\\frac{x-3}{4}=3$.', ar: 'حلّ $\\frac{x+1}{2}-\\frac{x-3}{4}=3$.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'MKT = 4: biderkatu gai bakoitza.', es: 'm.c.m. = 4: multiplica cada término.', en: 'LCM = 4: multiply each term.', ar: 'م.م.أ = 4: اضرب كل حد.' }, math: '$2(x+1)-(x-3)=12$' },
            { text: { eu: 'Kendu parentesiak.', es: 'Quita paréntesis.', en: 'Remove the brackets.', ar: 'احذف الأقواس.' }, math: '$2x+2-x+3=12$' },
            { text: { eu: 'Laburtu eta askatu x.', es: 'Reduce y despeja x.', en: 'Simplify and solve for x.', ar: 'بسّط واعزل x.' }, math: '$x=7$' }
        ],
        takeaway: {
            eu: 'Zenbakitzaile luzea = parentesi artean.',
            es: 'Numerador largo = entre paréntesis.',
            en: 'Long numerator = in brackets.',
            ar: 'البسط الطويل = بين قوسين.'
        }
    },
    {
        id: 'problem-steps',
        stage: 'problems',
        needs: [{ unit: 'dbh2/algebra', topic: 'language', title: { eu: 'Hizkuntza aljebraikoa eta segidak', es: 'Lenguaje algebraico y series', en: 'Algebraic language and sequences', ar: 'اللغة الجبرية والمتتاليات' } }],
        title: { eu: 'Buruketa bat ebazteko urratsak', es: 'Pasos para resolver un problema', en: 'Steps to solve a problem', ar: 'خطوات حل مسألة' },
        goal: {
            eu: 'Enuntziatu bat ekuazio bihurtzea eta lau urratsak jarraitzea.',
            es: 'Convertir un enunciado en una ecuación y seguir los cuatro pasos.',
            en: 'Turn a word problem into an equation and follow the four steps.',
            ar: 'تحويل نص إلى معادلة واتباع الخطوات الأربع.'
        },
        problem: { eu: 'Zenbaki baten erdiari 13 batuz, bere bikoitzari 11 kenduta bezainbeste lortzen da. Zein da zenbakia?', es: 'Sumando 13 a la mitad de un número se obtiene lo mismo que restando 11 a su doble. ¿Qué número es?', en: 'Adding 13 to half of a number gives the same result as subtracting 11 from twice the number. What is the number?', ar: 'بإضافة 13 إلى نصف عدد نحصل على ما نحصل عليه بطرح 11 من ضعفه. ما العدد؟' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Zenbakia: x.', es: 'El número: x.', en: 'The number: x.', ar: 'العدد: x.' }, math: '$\\frac{x}{2}+13=2x-11$' },
            { text: { eu: 'Biderkatu 2 zenbakiaz eta ebatzi.', es: 'Multiplica por 2 y resuelve.', en: 'Multiply by 2 and solve.', ar: 'اضرب في 2 وحلّ.' }, math: '$x+26=4x-22\\ \\to\\ x=16$' },
            { text: { eu: 'Egiaztatu: 8 + 13 = 21 eta 32 − 11 = 21. Zenbakia 16 da.', es: 'Comprueba: 8 + 13 = 21 y 32 − 11 = 21. El número es 16.', en: 'Check: 8 + 13 = 21 and 32 − 11 = 21. The number is 16.', ar: 'تحقّق: 8 + 13 = 21 و32 − 11 = 21. العدد 16.' } }
        ],
        takeaway: {
            eu: 'Ulertu → planteatu → ebatzi → egiaztatu.',
            es: 'Comprender → plantear → resolver → comprobar.',
            en: 'Understand → set up → solve → check.',
            ar: 'الفهم ← الصياغة ← الحل ← التحقق.'
        },
        figure: (language) => <ProblemStepsFigure language={language} />
    },
    {
        id: 'problems-ages',
        stage: 'problems',
        title: { eu: 'Adinak eta dirua', es: 'Edades y dinero', en: 'Ages and money', ar: 'الأعمار والمال' },
        goal: {
            eu: 'Adinei eta prezioei buruzko buruketak ekuazioz ebaztea.',
            es: 'Resolver problemas de edades y precios con ecuaciones.',
            en: 'Solve problems about ages and prices with equations.',
            ar: 'حل مسائل الأعمار والأسعار بالمعادلات.'
        },
        problem: { eu: 'Aitak semeak baino 30 urte gehiago ditu, eta 5 urte barru semearen adinaren hirukoitza izango du. Zenbat urte ditu semeak?', es: 'Un padre tiene 30 años más que su hijo y dentro de 5 años tendrá el triple de la edad del hijo. ¿Cuántos años tiene el hijo?', en: 'A father is 30 years older than his son, and in 5 years he will be three times his son\'s age. How old is the son?', ar: 'الأب أكبر من ابنه بـ 30 سنة، وبعد 5 سنوات سيكون عمره ثلاثة أضعاف عمر الابن. كم عمر الابن؟' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Semea: x. Aita: x + 30. 5 urte barru: x + 5 eta x + 35.', es: 'Hijo: x. Padre: x + 30. Dentro de 5 años: x + 5 y x + 35.', en: 'Son: x. Father: x + 30. In 5 years: x + 5 and x + 35.', ar: 'الابن: x. الأب: x + 30. بعد 5 سنوات: x + 5 وx + 35.' }, math: '$x+35=3(x+5)$' },
            { text: { eu: 'Ebatzi.', es: 'Resuelve.', en: 'Solve.', ar: 'حلّ.' }, math: '$x+35=3x+15\\ \\to\\ x=10$' },
            { text: { eu: 'Semeak 10 urte ditu eta aitak 40. 5 urte barru: 15 eta 45 = 3 · 15 ✓.', es: 'El hijo tiene 10 años y el padre 40. Dentro de 5 años: 15 y 45 = 3 · 15 ✓.', en: 'The son is 10 and the father is 40. In 5 years: 15 and 45 = 3 · 15 ✓.', ar: 'عمر الابن 10 سنوات والأب 40. بعد 5 سنوات: 15 و45 = 3 · 15 ✓.' } }
        ],
        takeaway: {
            eu: 'Urteak pasatzen dira pertsona guztientzat.',
            es: 'Los años pasan para todas las personas.',
            en: 'Years go by for everyone.',
            ar: 'السنوات تمر على الجميع.'
        }
    },
    {
        id: 'problems-geometry',
        stage: 'problems',
        title: { eu: 'Geometria eta osoaren zatiak', es: 'Geometría y partes de un total', en: 'Geometry and parts of a whole', ar: 'الهندسة وأجزاء الكل' },
        goal: {
            eu: 'Perimetro, zenbaki jarraitu eta osoaren zatiei buruzko buruketak ebaztea.',
            es: 'Resolver problemas de perímetros, números consecutivos y partes de un total.',
            en: 'Solve problems about perimeters, consecutive numbers and parts of a whole.',
            ar: 'حل مسائل المحيطات والأعداد المتتالية وأجزاء الكل.'
        },
        problem: { eu: 'Laukizuzen bat zabalera baino 3 m luzeagoa da, eta perimetroa 30 m. Zenbat neurtzen du zabalerak?', es: 'Un rectángulo es 3 m más largo que ancho y su perímetro mide 30 m. ¿Cuánto mide el ancho?', en: 'A rectangle is 3 m longer than it is wide, and its perimeter is 30 m. What is the width?', ar: 'مستطيل طوله أكبر من عرضه بـ 3 م ومحيطه 30 م. كم عرضه؟' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Zabalera: x. Luzera: x + 3.', es: 'Ancho: x. Largo: x + 3.', en: 'Width: x. Length: x + 3.', ar: 'العرض: x. الطول: x + 3.' }, math: '$2x+2(x+3)=30$' },
            { text: { eu: 'Ebatzi.', es: 'Resuelve.', en: 'Solve.', ar: 'حلّ.' }, math: '$4x+6=30\\ \\to\\ x=6$' },
            { text: { eu: 'Zabalera 6 m eta luzera 9 m: 12 + 18 = 30 ✓.', es: 'Ancho 6 m y largo 9 m: 12 + 18 = 30 ✓.', en: 'Width 6 m and length 9 m: 12 + 18 = 30 ✓.', ar: 'العرض 6 م والطول 9 م: 12 + 18 = 30 ✓.' } }
        ],
        takeaway: {
            eu: 'Marraztu eta idatzi dena x-ren bidez.',
            es: 'Dibuja y escríbelo todo en función de x.',
            en: 'Draw it and write everything in terms of x.',
            ar: 'ارسم واكتب كل شيء بدلالة x.'
        }
    },
    {
        id: 'quadratic',
        stage: 'quadratic',
        title: { eu: 'Bigarren mailako ekuazioak', es: 'Ecuaciones de segundo grado', en: 'Second-degree equations', ar: 'معادلات الدرجة الثانية' },
        goal: {
            eu: 'Bigarren mailako ekuazioak ezagutzea eta haien a, b eta c koefizienteak identifikatzea.',
            es: 'Reconocer ecuaciones de segundo grado e identificar sus coeficientes a, b y c.',
            en: 'Recognise second-degree equations and identify their coefficients a, b and c.',
            ar: 'التعرّف إلى معادلات الدرجة الثانية وتحديد معاملاتها a وb وc.'
        },
        problem: { eu: 'Idatzi forma orokorrean: $x^{2}-3=2x$.', es: 'Escribe en forma general: $x^{2}-3=2x$.', en: 'Write in general form: $x^{2}-3=2x$.', ar: 'اكتب بالصيغة العامة: $x^{2}-3=2x$.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Pasa 2x ezkerrera.', es: 'Pasa 2x a la izquierda.', en: 'Move 2x to the left.', ar: 'انقل 2x إلى اليسار.' }, math: '$x^{2}-2x-3=0$' },
            { text: { eu: 'Koefizienteak: a = 1, b = −2, c = −3.', es: 'Coeficientes: a = 1, b = −2, c = −3.', en: 'Coefficients: a = 1, b = −2, c = −3.', ar: 'المعاملات: a = 1، b = −2، c = −3.' } },
            { text: { eu: 'Egiaztatu x = 3: 9 − 3 = 6 = 2 · 3 ✓. Eta x = −1 ere bai.', es: 'Comprueba x = 3: 9 − 3 = 6 = 2 · 3 ✓. Y también x = −1.', en: 'Check x = 3: 9 − 3 = 6 = 2 · 3 ✓. And x = −1 too.', ar: 'تحقّق من x = 3: 9 − 3 = 6 = 2 · 3 ✓. وx = −1 أيضًا.' } }
        ],
        takeaway: {
            eu: 'Ordenatu beti: $ax^{2}+bx+c=0$.',
            es: 'Ordena siempre: $ax^{2}+bx+c=0$.',
            en: 'Always put it in the form $ax^{2}+bx+c=0$.',
            ar: 'رتّب دائمًا: $ax^{2}+bx+c=0$.'
        }
    },
    {
        id: 'incomplete',
        stage: 'quadratic',
        needs: [{ unit: 'dbh2/algebra', topic: 'common-factor', title: { eu: 'Faktore komuna ateratzea', es: 'Sacar factor común', en: 'Taking out a common factor', ar: 'إخراج العامل المشترك' } }],
        figureAfterSteps: true,
        title: { eu: 'Ekuazio osatugabeak', es: 'Ecuaciones incompletas', en: 'Incomplete equations', ar: 'المعادلات الناقصة' },
        goal: {
            eu: '$ax^{2}+c=0$ eta $ax^{2}+bx=0$ motakoak formularik gabe ebaztea.',
            es: 'Resolver las del tipo $ax^{2}+c=0$ y $ax^{2}+bx=0$ sin fórmula.',
            en: 'Solve the ones of the type $ax^{2}+c=0$ and $ax^{2}+bx=0$ without the formula.',
            ar: 'حل معادلات من النوع $ax^{2}+c=0$ و$ax^{2}+bx=0$ دون صيغة.'
        },
        problem: { eu: 'Ebatzi $2x^{2}-50=0$ eta $x^{2}-5x=0$.', es: 'Resuelve $2x^{2}-50=0$ y $x^{2}-5x=0$.', en: 'Solve $2x^{2}-50=0$ and $x^{2}-5x=0$.', ar: 'حلّ $2x^{2}-50=0$ و$x^{2}-5x=0$.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'Askatu $x^{2}$ eta atera erroa.', es: 'Despeja $x^{2}$ y haz la raíz.', en: 'Solve for $x^{2}$ and take the square root.', ar: 'اعزل $x^{2}$ وخذ الجذر.' }, math: '$x^{2}=25\\ \\to\\ x=\\pm 5$' },
            { text: { eu: 'Atera x faktore komun gisa.', es: 'Saca x factor común.', en: 'Factor out x.', ar: 'أخرج x عاملًا مشتركًا.' }, math: '$x(x-5)=0\\ \\to\\ x=0,\\ x=5$' }
        ],
        takeaway: {
            eu: 'Ez zatitu x-z: ebazpen bat galtzen da (x = 0).',
            es: 'No dividas entre x: se pierde una solución (x = 0).',
            en: 'Don\'t divide by x: you lose one solution (x = 0).',
            ar: 'لا تقسم على x: يضيع حل (x = 0).'
        },
        figure: (language) => <ZeroProductFigure language={language} />
    },
    {
        id: 'formula',
        stage: 'quadratic',
        title: { eu: 'Formula orokorra eta diskriminatzailea', es: 'Fórmula general y discriminante', en: 'General formula and discriminant', ar: 'الصيغة العامة والمميّز' },
        goal: {
            eu: 'Ekuazio osoak formula orokorrarekin ebaztea eta ebazpen kopurua aurreikustea.',
            es: 'Resolver ecuaciones completas con la fórmula general y prever cuántas soluciones tienen.',
            en: 'Solve complete equations with the general formula and predict how many solutions they have.',
            ar: 'حل المعادلات الكاملة بالصيغة العامة وتوقع عدد حلولها.'
        },
        problem: { eu: 'Ebatzi $x^{2}-5x+6=0$.', es: 'Resuelve $x^{2}-5x+6=0$.', en: 'Solve $x^{2}-5x+6=0$.', ar: 'حلّ $x^{2}-5x+6=0$.' },
        stepsKind: 'steps',
        steps: [
            { text: { eu: 'a = 1, b = −5, c = 6. Diskriminatzailea:', es: 'a = 1, b = −5, c = 6. Discriminante:', en: 'a = 1, b = −5, c = 6. Discriminant:', ar: 'a = 1، b = −5، c = 6. المميّز:' }, math: '$(-5)^{2}-4\\cdot 1\\cdot 6=1$' },
            { text: { eu: 'Formula.', es: 'Fórmula.', en: 'Formula', ar: 'الصيغة.' }, math: '$x=\\frac{5\\pm 1}{2}$' },
            { text: { eu: 'Bi ebazpen.', es: 'Dos soluciones.', en: 'Two solutions.', ar: 'حلان.' }, math: '$x_{1}=3,\\ x_{2}=2$' }
        ],
        takeaway: {
            eu: 'Lehenik kalkulatu Δ: ebazpen kopurua esaten dizu.',
            es: 'Calcula primero Δ: te dice cuántas soluciones hay.',
            en: 'First work out Δ: it tells you how many solutions there are.',
            ar: 'احسب Δ أولًا: فهو يخبرك بعدد الحلول.'
        },
        figure: (language) => <DiscriminantFigure language={language} />
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts) */
export const equationsTopics: UnitTopic[] = baseTopics.map((topic) => ({ ...topic, ...equationLessonTexts[topic.id as EquationTopicId], ...equationLessonChecks[topic.id as EquationTopicId] }))

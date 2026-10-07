import type { LocalizedText, UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { DenominatorsFigure, DiscriminantFigure, ProblemStepsFigure, ZeroProductFigure } from '../dbh2-ekuazioak-v2/figures'
import { AreaProblemFigure, EqualizationFigure, FactoredFigure, LinearSolutionsFigure, QuadraticFormulaFigure, RadicalFigure, ReductionFigure, SolutionCountFigure, SubstitutionFigure, SystemProblemFigure, SystemTypesFigure } from './figures'

/* ==========================================================================
   Ekuazioak eta sistemak · 4. DBH aplikatuak — stages and lessons. Follows
   the class textbook (Santillana Aplicadas 4, unit 4 «Ecuaciones y
   sistemas»: first- and second-degree equations, systems of two linear
   equations and their methods, problems) and Anaya Aplicadas 4, units 6
   «Ecuaciones» (equations with brackets and denominators, complete and
   incomplete quadratics, factored and radical equations, problems with
   mixtures, ages and rectangles) and 7 «Sistemas de ecuaciones» (linear
   equations with two unknowns, the three kinds of systems seen as lines,
   substitution, equalisation and reduction, problems).
   ========================================================================== */

export type EquationsSystemsStageId = 'first-degree' | 'quadratic' | 'other' | 'systems' | 'methods'

export const equationsSystemsStages: UnitStage[] = [
    { id: 'first-degree', tone: 'blue', title: { eu: 'Lehen mailako ekuazioak', es: 'Ecuaciones de primer grado', ar: 'معادلات الدرجة الأولى' } },
    { id: 'quadratic', tone: 'violet', title: { eu: 'Bigarren mailako ekuazioak', es: 'Ecuaciones de segundo grado', ar: 'معادلات الدرجة الثانية' } },
    { id: 'other', tone: 'mustard', title: { eu: 'Beste ekuazio batzuk', es: 'Otras ecuaciones', ar: 'معادلات أخرى' } },
    { id: 'systems', tone: 'coral', title: { eu: 'Ekuazio-sistemak', es: 'Sistemas de ecuaciones', ar: 'أنظمة المعادلات' } },
    { id: 'methods', tone: 'green', title: { eu: 'Metodoak eta problemak', es: 'Métodos y problemas', ar: 'الطرق والمسائل' } }
]

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar: ar.replace(/\{,\}/g, '.') })
/** The same formula in every language; the decimal comma becomes a point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, ar: value.replace(/\{,\}/g, '.') })

export const equationsSystemsTopics: UnitTopic[] = [
    /* ---------- 1. First-degree equations ---------- */
    {
        id: 'brackets',
        stage: 'first-degree',
        title: say('Parentesidun ekuazioak', 'Ecuaciones con paréntesis', 'معادلات بأقواس'),
        goal: say('Lehen mailako ekuazioak parentesiak kenduz ebaztea eta ebazpenik gabekoak eta identitateak ezagutzea.', 'Resolver ecuaciones de primer grado quitando paréntesis y reconocer las que no tienen solución y las identidades.', 'حل معادلات الدرجة الأولى بإزالة الأقواس والتعرّف على المعادلات التي لا حل لها وعلى المتطابقات.'),
        explanation: say(
            'Ekuazio bat ebaztea bi atalak berdin uzten dituen x-ren balioa aurkitzea da. Urratsak: kendu parentesiak (minus baten atzean zeinu guztiak aldatuz), eraman x-dun gaiak atal batera eta zenbakiak bestera, laburtu eta askatu x. $3(5x-7)+2(x-1)=5x-3$: $15x-21+2x-2=5x-3$, $12x=20$, $x=\\frac{5}{3}$. Kortxeteak badaude, hasi barrukoenetik: $10[2x-(x-1)]=10(x+1)$. Batzuetan x desagertzen da: $0=3$ ateratzen bada, ez dago ebazpenik; $0=0$ ateratzen bada, edozein zenbaki da ebazpena (identitatea).',
            'Resolver una ecuación es encontrar el valor de x que hace iguales los dos miembros. Pasos: quita paréntesis (cambiando todos los signos tras un menos), pasa los términos con x a un miembro y los números al otro, reduce y despeja x. $3(5x-7)+2(x-1)=5x-3$: $15x-21+2x-2=5x-3$, $12x=20$, $x=\\frac{5}{3}$. Si hay corchetes, empieza por el más interior: $10[2x-(x-1)]=10(x+1)$. A veces la x desaparece: si sale $0=3$, no hay solución; si sale $0=0$, cualquier número es solución (identidad).',
            'حل المعادلة هو إيجاد قيمة x التي تجعل الطرفين متساويين. الخطوات: أزل الأقواس (مع تغيير كل الإشارات بعد الناقص)، وانقل الحدود التي فيها x إلى طرف والأعداد إلى الطرف الآخر، وبسّط واعزل x. $3(5x-7)+2(x-1)=5x-3$: $15x-21+2x-2=5x-3$، $12x=20$، $x=\\frac{5}{3}$. وإذا وُجدت معقوفات فابدأ بالداخلية: $10[2x-(x-1)]=10(x+1)$. وقد يختفي x: إذا خرج $0=3$ فلا حل؛ وإذا خرج $0=0$ فكل عدد حل (متطابقة).'
        ),
        problem: say('Ebatzi $4(2+3x)=10(x-1)+2(x+9)$.', 'Resuelve $4(2+3x)=10(x-1)+2(x+9)$.', 'حلّ $4(2+3x)=10(x-1)+2(x+9)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Kendu parentesiak.', 'Quita paréntesis.', 'أزل الأقواس.'), math: same('$8+12x=10x-10+2x+18$') },
            { text: say('Laburtu bi atalak.', 'Reduce los dos miembros.', 'بسّط الطرفين.'), math: same('$12x+8=12x+8$') },
            { text: say('x desagertzen da eta $0=0$ geratzen da: identitatea, infinitu ebazpen.', 'La x desaparece y queda $0=0$: identidad, infinitas soluciones.', 'يختفي x ويبقى $0=0$: متطابقة، حلول لا نهاية لها.'), math: same('$0=0$') }
        ],
        example: same('$3x-2=x+4\\to x=3$'),
        takeaway: say('Parentesiak kendu, x-ak atal batera, laburtu eta askatu.', 'Quita paréntesis, las x a un miembro, reduce y despeja.', 'أزل الأقواس، وx إلى طرف، وبسّط واعزل.'),
        figure: (language) => <SolutionCountFigure language={language} />
    },
    {
        id: 'denominators',
        stage: 'first-degree',
        title: say('Izendatzailedun ekuazioak', 'Ecuaciones con denominadores', 'معادلات بمقامات'),
        goal: say('Izendatzaileak kentzea, gai guztiak izendatzaileen MKTz biderkatuz, eta ekuazioa ebaztea.', 'Quitar denominadores multiplicando todos los términos por el m.c.m. de los denominadores, y resolver la ecuación.', 'إزالة المقامات بضرب كل الحدود في المضاعف المشترك الأصغر للمقامات، وحل المعادلة.'),
        explanation: say(
            'Izendatzaileak badaude, kalkulatu haien MKTa eta biderkatu ekuazioaren gai GUZTIAK harekin, zenbaki solteak ere bai. Gai bakoitzean, MKTa izendatzaileaz zatitu eta zenbakitzailea biderkatu. Zenbakitzailea parentesi artean jarri: zatikiaren aurrean minus bat badago, zenbakitzaile osoari eragiten dio. $\\frac{x+1}{3}-\\frac{x-2}{4}=\\frac{3}{2}$: MKTa 12, beraz $4(x+1)-3(x-2)=18$, $4x+4-3x+6=18$ eta $x=8$. Gero, lehen mailako ekuazio arrunta da. Egiaztatu: $\\frac{9}{3}-\\frac{6}{4}=3-1{,}5=1{,}5$.',
            'Si hay denominadores, calcula su m.c.m. y multiplica por él TODOS los términos de la ecuación, también los números sueltos. En cada término, divide el m.c.m. entre el denominador y multiplica el numerador. Pon el numerador entre paréntesis: si delante de la fracción hay un menos, afecta a todo el numerador. $\\frac{x+1}{3}-\\frac{x-2}{4}=\\frac{3}{2}$: el m.c.m. es 12, así que $4(x+1)-3(x-2)=18$, $4x+4-3x+6=18$ y $x=8$. Después es una ecuación de primer grado normal. Comprueba: $\\frac{9}{3}-\\frac{6}{4}=3-1{,}5=1{,}5$.',
            'إذا وُجدت مقامات فاحسب مضاعفها المشترك الأصغر واضرب فيه كل حدود المعادلة، حتى الأعداد المنفردة. في كل حد اقسم المضاعف على المقام واضرب البسط. وضع البسط بين قوسين: إذا كان قبل الكسر ناقص فإنه يؤثر في البسط كله. $\\frac{x+1}{3}-\\frac{x-2}{4}=\\frac{3}{2}$: المضاعف 12، إذن $4(x+1)-3(x-2)=18$ و$4x+4-3x+6=18$ و$x=8$. وبعدها هي معادلة عادية من الدرجة الأولى. تحقّق: $\\frac{9}{3}-\\frac{6}{4}=3-1{,}5=1{,}5$.'
        ),
        problem: say('Ebatzi $\\frac{x}{2}-\\frac{x-1}{3}=\\frac{x+3}{6}$.', 'Resuelve $\\frac{x}{2}-\\frac{x-1}{3}=\\frac{x+3}{6}$.', 'حلّ $\\frac{x}{2}-\\frac{x-1}{3}=\\frac{x+3}{6}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('MKT(2, 3, 6) = 6. Biderkatu gai guztiak.', 'm.c.m.(2, 3, 6) = 6. Multiplica todos los términos.', 'م.م.أ(2، 3، 6) = 6. اضرب كل الحدود.'), math: same('$3x-2(x-1)=x+3$') },
            { text: say('Kendu parentesia: minusak bi zeinuak aldatzen ditu.', 'Quita el paréntesis: el menos cambia los dos signos.', 'أزل القوس: الناقص يغيّر الإشارتين.'), math: same('$3x-2x+2=x+3$') },
            { text: say('x desagertzen da: ez dago ebazpenik.', 'La x desaparece: no hay solución.', 'يختفي x: لا حل.'), math: same('$2=3$') }
        ],
        example: same('$\\frac{x}{2}+\\frac{x}{3}=5$'),
        takeaway: say('Biderkatu gai GUZTIAK MKTz; zenbakitzailea parentesi artean.', 'Multiplica TODOS los términos por el m.c.m.; el numerador, entre paréntesis.', 'اضرب كل الحدود في المضاعف؛ والبسط بين قوسين.'),
        figure: (language) => <DenominatorsFigure language={language} />
    },
    {
        id: 'linear-problems',
        stage: 'first-degree',
        title: say('Lehen mailako problemak', 'Problemas de primer grado', 'مسائل من الدرجة الأولى'),
        goal: say('Adin, diru eta nahasketa problemak ekuazio baten bidez planteatzea eta ebaztea.', 'Plantear y resolver con una ecuación problemas de edades, dinero y mezclas.', 'صياغة مسائل الأعمار والمال والخلائط بمعادلة وحلّها.'),
        explanation: say(
            'Lau urrats: ulertu (zer da x?), planteatu (idatzi beste guztia x-rekin eta bilatu berdintza), ebatzi eta egiaztatu enuntziatuarekin. Adinetan, taula bat lagungarria da: gaur Martak x urte ditu eta Albertok $4x$; 5 urte barru, $x+5$ eta $4x+5$, eta orduan hirukoitza: $4x+5=3(x+5)$, beraz $x=10$. Nahasketetan, balioen batura: 7,50 €/kg-ko x kg eta 5,70 €/kg-ko $90-x$ kg nahastuta 6,50 €/kg ateratzen bada, $7{,}5x+5{,}7(90-x)=90\\cdot 6{,}5$ eta $x=40$. Amaitzeko, erantzun esaldi batez eta begiratu emaitzak zentzua duen (adin negatiborik ez).',
            'Cuatro pasos: comprender (¿qué es x?), plantear (escribe todo lo demás con x y busca la igualdad), resolver y comprobar con el enunciado. En las edades ayuda una tabla: hoy Marta tiene x años y Alberto $4x$; dentro de 5 años, $x+5$ y $4x+5$, y entonces el triple: $4x+5=3(x+5)$, así que $x=10$. En las mezclas, se suman los valores: si se mezclan x kg de 7,50 €/kg y $90-x$ kg de 5,70 €/kg y sale a 6,50 €/kg, $7{,}5x+5{,}7(90-x)=90\\cdot 6{,}5$ y $x=40$. Al final, responde con una frase y mira que el resultado tenga sentido (nada de edades negativas).',
            'أربع خطوات: الفهم (ما x؟)، والصياغة (اكتب كل الباقي بـx وابحث عن المساواة)، والحل، والتحقق بالنص. في الأعمار يساعد الجدول: اليوم عمر مارتا x وعمر ألبرتو $4x$؛ وبعد 5 سنوات $x+5$ و$4x+5$، وعندها ثلاثة أضعاف: $4x+5=3(x+5)$، إذن $x=10$. وفي الخلائط نجمع القيم: إذا خُلط x كغ بسعر 7.50 €/كغ مع $90-x$ كغ بسعر 5.70 €/كغ فصار السعر 6.50 €/كغ، فإن $7{,}5x+5{,}7(90-x)=90\\cdot 6{,}5$ و$x=40$. وفي النهاية أجب بجملة وانظر هل للنتيجة معنى (لا أعمار سالبة).'
        ),
        problem: say('Adelaren aurrezkiak Beatrizenen bost aldiz dira. Adelak Beatrizi 800 € emanez gero, hirukoitza bakarrik izango lirateke. Zenbat ditu Beatrizek?', 'Los ahorros de Adela quintuplican los de su hermana Beatriz, pero si Adela le diera 800 €, solo serían el triple. ¿Cuánto tiene Beatriz?', 'مدخرات أديلا خمسة أضعاف مدخرات أختها بياتريث، ولو أعطتها أديلا 800 € لصارت ثلاثة أضعافها فقط. كم لدى بياتريث؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Beatriz: x; Adela: $5x$. Transferentziaren ondoren:', 'Beatriz: x; Adela: $5x$. Tras la transferencia:', 'بياتريث: x؛ أديلا: $5x$. بعد التحويل:'), math: same('$5x-800=3(x+800)$') },
            { text: say('Ebatzi.', 'Resuelve.', 'حلّ.'), math: same('$2x=3200\\to x=1600$') },
            { text: say('Beatrizek 1600 € ditu eta Adelak 8000 €.', 'Beatriz tiene 1600 € y Adela 8000 €.', 'لدى بياتريث 1600 € ولدى أديلا 8000 €.'), math: same('$7200=3\\cdot 2400$') }
        ],
        example: same('$4x+5=3(x+5)$'),
        takeaway: say('Ulertu, planteatu, ebatzi eta egiaztatu.', 'Comprende, plantea, resuelve y comprueba.', 'افهم وصُغ وحُلّ وتحقّق.'),
        figure: (language) => <ProblemStepsFigure language={language} />
    },

    /* ---------- 2. Second-degree equations ---------- */
    {
        id: 'incomplete',
        stage: 'quadratic',
        title: say('Ekuazio osatugabeak', 'Ecuaciones incompletas', 'المعادلات الناقصة'),
        goal: say('$ax^{2}+c=0$ eta $ax^{2}+bx=0$ motako ekuazioak formularik gabe ebaztea.', 'Resolver las ecuaciones del tipo $ax^{2}+c=0$ y $ax^{2}+bx=0$ sin fórmula.', 'حل معادلات من النوع $ax^{2}+c=0$ و$ax^{2}+bx=0$ دون صيغة.'),
        explanation: say(
            'Bigarren mailako ekuazioa $ax^{2}+bx+c=0$ forman idatz daitekeena da, $a\\neq 0$ izanik. b edo c falta bada, osatugabea da. b = 0 bada, askatu $x^{2}$ eta atera erroa: $2x^{2}-50=0$, $x^{2}=25$, $x=\\pm 5$; zenbakia negatiboa bada ($3x^{2}+5=0$), ez dago ebazpenik. c = 0 bada, atera x faktore komun gisa eta biderkadura 0 da faktoreetako bat 0 bada: $7x^{2}-5x=0$, $x(7x-5)=0$, $x=0$ edo $x=\\frac{5}{7}$. Ez zatitu x-z: x = 0 ebazpena galduko zenuke.',
            'Una ecuación de segundo grado es la que se puede escribir como $ax^{2}+bx+c=0$, con $a\\neq 0$. Si falta b o c, es incompleta. Si b = 0, despeja $x^{2}$ y haz la raíz: $2x^{2}-50=0$, $x^{2}=25$, $x=\\pm 5$; si el número es negativo ($3x^{2}+5=0$), no hay solución. Si c = 0, saca x factor común y un producto es 0 si lo es uno de sus factores: $7x^{2}-5x=0$, $x(7x-5)=0$, $x=0$ o $x=\\frac{5}{7}$. No dividas entre x: perderías la solución x = 0.',
            'معادلة الدرجة الثانية هي التي يمكن كتابتها $ax^{2}+bx+c=0$ مع $a\\neq 0$. وإذا نقص b أو c فهي ناقصة. إذا كان b = 0 فاعزل $x^{2}$ وخذ الجذر: $2x^{2}-50=0$، $x^{2}=25$، $x=\\pm 5$؛ وإذا كان العدد سالبًا ($3x^{2}+5=0$) فلا حل. وإذا كان c = 0 فأخرج x عاملًا مشتركًا، والجداء 0 إذا كان أحد عوامله 0: $7x^{2}-5x=0$، $x(7x-5)=0$، $x=0$ أو $x=\\frac{5}{7}$. لا تقسم على x: ستضيع الحل x = 0.'
        ),
        problem: say('Ebatzi $4x^{2}-9=0$ eta $2x^{2}+10x=0$.', 'Resuelve $4x^{2}-9=0$ y $2x^{2}+10x=0$.', 'حلّ $4x^{2}-9=0$ و$2x^{2}+10x=0$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Askatu $x^{2}$ eta atera erroa.', 'Despeja $x^{2}$ y haz la raíz.', 'اعزل $x^{2}$ وخذ الجذر.'), math: same('$x^{2}=\\frac{9}{4}\\to x=\\pm\\frac{3}{2}$') },
            { text: say('Atera $2x$ faktore komun gisa.', 'Saca $2x$ factor común.', 'أخرج $2x$ عاملًا مشتركًا.'), math: same('$2x(x+5)=0$') },
            { text: say('Faktore bakoitza 0.', 'Cada factor, 0.', 'كل عامل 0.'), math: same('$x=0,\\ x=-5$') }
        ],
        example: same('$x^{2}+4=0$'),
        takeaway: say('Ez zatitu x-z: x = 0 ebazpena galtzen da.', 'No dividas entre x: se pierde la solución x = 0.', 'لا تقسم على x: يضيع الحل x = 0.'),
        figure: (language) => <ZeroProductFigure language={language} />
    },
    {
        id: 'formula',
        stage: 'quadratic',
        title: say('Formula orokorra', 'La fórmula general', 'الصيغة العامة'),
        goal: say('Bigarren mailako ekuazio osoak $x=\\dfrac{-b\\pm\\sqrt{b^{2}-4ac}}{2a}$ formularekin ebaztea.', 'Resolver ecuaciones de segundo grado completas con la fórmula $x=\\dfrac{-b\\pm\\sqrt{b^{2}-4ac}}{2a}$.', 'حل معادلات الدرجة الثانية الكاملة بالصيغة $x=\\dfrac{-b\\pm\\sqrt{b^{2}-4ac}}{2a}$.'),
        explanation: say(
            'Ekuazio osoak formula orokorrarekin ebazten dira: $x=\\dfrac{-b\\pm\\sqrt{b^{2}-4ac}}{2a}$. Lehenik ordenatu ($ax^{2}+bx+c=0$) eta idatzi a, b eta c zeinuekin. $x^{2}-7x+6=0$: a = 1, b = −7, c = 6, eta $x=\\dfrac{7\\pm\\sqrt{49-24}}{2}=\\dfrac{7\\pm 5}{2}$, beraz $x=6$ eta $x=1$. Kontuz b negatiboa denean: $-b=7$ eta $b^{2}=49$, ez $-49$. Koefiziente guztiak zenbaki batez zatigarriak badira, sinplifikatu lehenik: $2x^{2}-8x+8=0$ eta $x^{2}-4x+4=0$ baliokideak dira. Egiaztatu ebazpen bat ordezkatuz.',
            'Las ecuaciones completas se resuelven con la fórmula general: $x=\\dfrac{-b\\pm\\sqrt{b^{2}-4ac}}{2a}$. Primero ordena ($ax^{2}+bx+c=0$) y escribe a, b y c con sus signos. $x^{2}-7x+6=0$: a = 1, b = −7, c = 6, y $x=\\dfrac{7\\pm\\sqrt{49-24}}{2}=\\dfrac{7\\pm 5}{2}$, así que $x=6$ y $x=1$. Cuidado cuando b es negativo: $-b=7$ y $b^{2}=49$, no $-49$. Si todos los coeficientes son divisibles por un número, simplifica antes: $2x^{2}-8x+8=0$ y $x^{2}-4x+4=0$ son equivalentes. Comprueba una solución sustituyendo.',
            'تُحل المعادلات الكاملة بالصيغة العامة: $x=\\dfrac{-b\\pm\\sqrt{b^{2}-4ac}}{2a}$. رتّب أولًا ($ax^{2}+bx+c=0$) واكتب a وb وc بإشاراتها. $x^{2}-7x+6=0$: a = 1 وb = −7 وc = 6، و$x=\\dfrac{7\\pm\\sqrt{49-24}}{2}=\\dfrac{7\\pm 5}{2}$، إذن $x=6$ و$x=1$. انتبه عندما يكون b سالبًا: $-b=7$ و$b^{2}=49$ لا $-49$. وإذا قبلت كل المعاملات القسمة على عدد فبسّط أولًا: $2x^{2}-8x+8=0$ و$x^{2}-4x+4=0$ متكافئتان. تحقّق بتعويض حل.'
        ),
        problem: say('Ebatzi $6x^{2}+5x+1=0$.', 'Resuelve $6x^{2}+5x+1=0$.', 'حلّ $6x^{2}+5x+1=0$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('a = 6, b = 5, c = 1.', 'a = 6, b = 5, c = 1.', 'a = 6، b = 5، c = 1.'), math: same('$x=\\frac{-5\\pm\\sqrt{25-24}}{12}$') },
            { text: say('Erroa 1 da.', 'La raíz es 1.', 'الجذر 1.'), math: same('$x=\\frac{-5\\pm 1}{12}$') },
            { text: say('Bi ebazpenak.', 'Las dos soluciones.', 'الحلان.'), math: same('$x_{1}=-\\frac{1}{3},\\ x_{2}=-\\frac{1}{2}$') }
        ],
        example: same('$x^{2}-7x+6=0$'),
        takeaway: say('Ordenatu, idatzi a, b eta c zeinuekin, eta aplikatu formula.', 'Ordena, escribe a, b y c con sus signos y aplica la fórmula.', 'رتّب واكتب a وb وc بإشاراتها وطبّق الصيغة.'),
        figure: (language) => <QuadraticFormulaFigure language={language} />
    },
    {
        id: 'discriminant',
        stage: 'quadratic',
        title: say('Diskriminatzailea eta ekuazioak prestatzea', 'Discriminante y ecuaciones con operaciones', 'المميّز والمعادلات مع العمليات'),
        goal: say('Ebazpen kopurua $\\Delta=b^{2}-4ac$-rekin aurreikustea eta ekuazioak eragiketak eginez ordenatzea.', 'Prever cuántas soluciones hay con $\\Delta=b^{2}-4ac$ y ordenar ecuaciones que tienen operaciones.', 'توقّع عدد الحلول بـ$\\Delta=b^{2}-4ac$ وترتيب المعادلات التي فيها عمليات.'),
        explanation: say(
            'Erroaren barrukoa, $\\Delta=b^{2}-4ac$, diskriminatzailea da. $\\Delta>0$ bada, bi ebazpen daude; $\\Delta=0$ bada, bat (bikoitza): $x^{2}-20x+100=0$, $\\Delta=400-400=0$, $x=10$; $\\Delta<0$ bada, ez dago ebazpenik: $3x^{2}+5x+11=0$, $\\Delta=25-132<0$. Askotan ekuazioa ez dator ordenatuta: lehenik kendu parentesiak, garatu identitateak eta izendatzaileak, eta eraman dena atal batera. $(x+2)(x-1)+2=x(2-x)$: $x^{2}+x=2x-x^{2}$, $2x^{2}-x=0$, $x(2x-1)=0$, beraz $x=0$ eta $x=\\frac{1}{2}$.',
            'Lo que hay dentro de la raíz, $\\Delta=b^{2}-4ac$, es el discriminante. Si $\\Delta>0$, hay dos soluciones; si $\\Delta=0$, una (doble): $x^{2}-20x+100=0$, $\\Delta=400-400=0$, $x=10$; si $\\Delta<0$, no hay solución: $3x^{2}+5x+11=0$, $\\Delta=25-132<0$. A menudo la ecuación no viene ordenada: primero quita paréntesis, desarrolla identidades y denominadores, y pasa todo a un miembro. $(x+2)(x-1)+2=x(2-x)$: $x^{2}+x=2x-x^{2}$, $2x^{2}-x=0$, $x(2x-1)=0$, así que $x=0$ y $x=\\frac{1}{2}$.',
            'ما تحت الجذر $\\Delta=b^{2}-4ac$ هو المميّز. إذا كان $\\Delta>0$ فهناك حلان؛ وإذا كان $\\Delta=0$ فحل واحد (مضاعف): $x^{2}-20x+100=0$، $\\Delta=400-400=0$، $x=10$؛ وإذا كان $\\Delta<0$ فلا حل: $3x^{2}+5x+11=0$، $\\Delta=25-132<0$. وكثيرًا ما لا تأتي المعادلة مرتّبة: أزل الأقواس أولًا وانشر المتطابقات والمقامات وانقل كل شيء إلى طرف. $(x+2)(x-1)+2=x(2-x)$: $x^{2}+x=2x-x^{2}$، $2x^{2}-x=0$، $x(2x-1)=0$، إذن $x=0$ و$x=\\frac{1}{2}$.'
        ),
        problem: say('Eragiketak egin eta ebatzi: $x(x-5)+x^{2}=(3x-1)(x-1)$.', 'Opera y resuelve: $x(x-5)+x^{2}=(3x-1)(x-1)$.', 'أجرِ العمليات وحلّ: $x(x-5)+x^{2}=(3x-1)(x-1)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Garatu bi atalak.', 'Desarrolla los dos miembros.', 'انشر الطرفين.'), math: same('$2x^{2}-5x=3x^{2}-4x+1$') },
            { text: say('Dena atal batera.', 'Todo a un miembro.', 'كل شيء إلى طرف.'), math: same('$x^{2}+x+1=0$') },
            { text: say('$\\Delta<0$: ez dago ebazpenik.', '$\\Delta<0$: no hay solución.', '$\\Delta<0$: لا حل.'), math: same('$\\Delta=1-4=-3$') }
        ],
        example: same('$\\Delta=b^{2}-4ac$'),
        takeaway: say('Δ > 0: bi ebazpen. Δ = 0: bat. Δ < 0: bat ere ez.', 'Δ > 0: dos soluciones. Δ = 0: una. Δ < 0: ninguna.', 'Δ > 0: حلان. Δ = 0: حل. Δ < 0: لا حل.'),
        figure: (language) => <DiscriminantFigure language={language} />
    },

    /* ---------- 3. Other equations ---------- */
    {
        id: 'factored',
        stage: 'other',
        title: say('Ekuazio faktorizatuak', 'Ecuaciones factorizadas', 'المعادلات المحلَّلة'),
        goal: say('Biderkadura bat zero den ekuazioak faktore bakoitza zero eginez ebaztea.', 'Resolver ecuaciones en las que un producto vale cero igualando a cero cada factor.', 'حل المعادلات التي يساوي فيها جداء صفرًا بجعل كل عامل صفرًا.'),
        explanation: say(
            'Biderkadura bat 0 da faktoreetako bat 0 denean. Beraz, ekuazioa faktoreen biderkadura $=0$ bada, ez garatu: egin faktore bakoitza 0 eta ebatzi zatika. $(x-4)(x-6)=0$: $x=4$ edo $x=6$. $(x+1)(x^{2}-4)=0$: $x=-1$, edo $x^{2}=4$, hau da, $x=2$ eta $x=-2$. Hiru ebazpen! Ekuazioa faktorizatuta ez badago, faktorizatu lehenik: $x^{3}-64x=0$, $x(x^{2}-64)=0$, $x=0$, $x=8$, $x=-8$. Kontuz: biderkadura 0 bada bakarrik balio du; $(x-1)(x-2)=6$ ez da horrela ebazten.',
            'Un producto vale 0 cuando alguno de sus factores es 0. Así que si la ecuación es un producto de factores $=0$, no desarrolles: iguala a 0 cada factor y resuelve por partes. $(x-4)(x-6)=0$: $x=4$ o $x=6$. $(x+1)(x^{2}-4)=0$: $x=-1$, o bien $x^{2}=4$, es decir, $x=2$ y $x=-2$. ¡Tres soluciones! Si la ecuación no está factorizada, factoriza antes: $x^{3}-64x=0$, $x(x^{2}-64)=0$, $x=0$, $x=8$, $x=-8$. Cuidado: solo vale si el producto es 0; $(x-1)(x-2)=6$ no se resuelve así.',
            'يكون الجداء 0 عندما يكون أحد عوامله 0. فإذا كانت المعادلة جداء عوامل $=0$ فلا تنشر: اجعل كل عامل 0 وحلّ كل جزء. $(x-4)(x-6)=0$: $x=4$ أو $x=6$. $(x+1)(x^{2}-4)=0$: $x=-1$، أو $x^{2}=4$ أي $x=2$ و$x=-2$. ثلاثة حلول! وإذا لم تكن المعادلة محلَّلة فحلّلها أولًا: $x^{3}-64x=0$، $x(x^{2}-64)=0$، $x=0$، $x=8$، $x=-8$. انتبه: لا يصح هذا إلا إذا كان الجداء 0؛ فـ$(x-1)(x-2)=6$ لا تُحل هكذا.'
        ),
        problem: say('Ebatzi $(2x+1)(x^{2}+5x-24)=0$.', 'Resuelve $(2x+1)(x^{2}+5x-24)=0$.', 'حلّ $(2x+1)(x^{2}+5x-24)=0$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Lehen faktorea 0.', 'Primer factor, 0.', 'العامل الأول 0.'), math: same('$2x+1=0\\to x=-\\frac{1}{2}$') },
            { text: say('Bigarrena 0: formula.', 'El segundo, 0: fórmula.', 'الثاني 0: الصيغة.'), math: same('$x=\\frac{-5\\pm 11}{2}$') },
            { text: say('Hiru ebazpen.', 'Tres soluciones.', 'ثلاثة حلول.'), math: same('$x=-\\frac{1}{2},\\ x=3,\\ x=-8$') }
        ],
        example: same('$(x-4)(x-6)=0$'),
        takeaway: say('Biderkadura = 0 bada, faktore bakoitza 0 egin.', 'Si un producto = 0, iguala a 0 cada factor.', 'إذا كان الجداء = 0 فاجعل كل عامل 0.'),
        figure: (language) => <FactoredFigure language={language} />
    },
    {
        id: 'radical',
        stage: 'other',
        title: say('Ekuazio irrazionalak', 'Ecuaciones con radicales', 'المعادلات الجذرية'),
        goal: say('x erro karratu baten barruan duten ekuazioak ebaztea eta ebazpenak egiaztatzea.', 'Resolver ecuaciones con la x dentro de una raíz cuadrada y comprobar las soluciones.', 'حل المعادلات التي يكون فيها x تحت جذر تربيعي والتحقق من الحلول.'),
        explanation: say(
            'x erro baten barruan badago, utzi erroa bakarrik atal batean eta jaso bi atalak karratura: erroa desagertzen da. $\\sqrt{x}-3=0$: $\\sqrt{x}=3$, $x=9$. $\\sqrt{x+2}=x$: $x+2=x^{2}$, $x^{2}-x-2=0$, $x=2$ edo $x=-1$. Baina karratura jasotzean ebazpen faltsuak ager daitezke, beraz egiaztatu BETI hasierako ekuazioan: $\\sqrt{4}=2$ ✓, baina $\\sqrt{1}=1\\neq -1$ ✗. Ebazpena $x=2$ bakarrik da. Kontuz atal batean batura bat dagoenean: $(x-5)^{2}=x^{2}-10x+25$, ez $x^{2}+25$.',
            'Si la x está dentro de una raíz, deja la raíz sola en un miembro y eleva los dos miembros al cuadrado: la raíz desaparece. $\\sqrt{x}-3=0$: $\\sqrt{x}=3$, $x=9$. $\\sqrt{x+2}=x$: $x+2=x^{2}$, $x^{2}-x-2=0$, $x=2$ o $x=-1$. Pero al elevar al cuadrado pueden aparecer soluciones falsas, así que comprueba SIEMPRE en la ecuación inicial: $\\sqrt{4}=2$ ✓, pero $\\sqrt{1}=1\\neq -1$ ✗. La solución es solo $x=2$. Cuidado cuando un miembro es una suma: $(x-5)^{2}=x^{2}-10x+25$, no $x^{2}+25$.',
            'إذا كان x تحت جذر فاترك الجذر وحده في طرف وربّع الطرفين: يختفي الجذر. $\\sqrt{x}-3=0$: $\\sqrt{x}=3$، $x=9$. $\\sqrt{x+2}=x$: $x+2=x^{2}$، $x^{2}-x-2=0$، $x=2$ أو $x=-1$. لكن التربيع قد يُظهر حلولًا زائفة، فتحقّق دائمًا في المعادلة الأصلية: $\\sqrt{4}=2$ ✓، أما $\\sqrt{1}=1\\neq -1$ ✗. فالحل $x=2$ وحده. وانتبه عندما يكون أحد الطرفين مجموعًا: $(x-5)^{2}=x^{2}-10x+25$ لا $x^{2}+25$.'
        ),
        problem: say('Ebatzi $\\sqrt{x+1}+5=x$.', 'Resuelve $\\sqrt{x+1}+5=x$.', 'حلّ $\\sqrt{x+1}+5=x$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Utzi erroa bakarrik eta jaso karratura.', 'Aísla la raíz y eleva al cuadrado.', 'اعزل الجذر وربّع.'), math: same('$x+1=x^{2}-10x+25$') },
            { text: say('Ordenatu eta ebatzi.', 'Ordena y resuelve.', 'رتّب وحلّ.'), math: same('$x^{2}-11x+24=0\\to x=8,\\ x=3$') },
            { text: say('Egiaztatu: x = 3 faltsua da ($2+5\\neq 3$). Ebazpena: $x=8$.', 'Comprueba: x = 3 es falsa ($2+5\\neq 3$). Solución: $x=8$.', 'تحقّق: x = 3 زائف ($2+5\\neq 3$). الحل: $x=8$.'), math: same('$\\sqrt{9}+5=8$') }
        ],
        example: same('$\\sqrt{x}=3\\to x=9$'),
        takeaway: say('Erroa bakarrik utzi, karratura jaso eta egiaztatu beti.', 'Aísla la raíz, eleva al cuadrado y comprueba siempre.', 'اعزل الجذر وربّع وتحقّق دائمًا.'),
        figure: (language) => <RadicalFigure language={language} />
    },
    {
        id: 'quadratic-problems',
        stage: 'other',
        title: say('Bigarren mailako problemak', 'Problemas de segundo grado', 'مسائل من الدرجة الثانية'),
        goal: say('Bigarren mailako ekuazio batera daramaten problemak ebaztea eta zentzurik ez duten ebazpenak baztertzea.', 'Resolver problemas que llevan a una ecuación de segundo grado y descartar las soluciones que no tienen sentido.', 'حل المسائل التي تؤدي إلى معادلة من الدرجة الثانية واستبعاد الحلول التي لا معنى لها.'),
        explanation: say(
            'Ezezaguna bere buruaz biderkatzen denean (azalerak, zenbaki jarraien biderkadura…), bigarren mailako ekuazio bat agertzen da. Bi zenbaki natural jarraien biderkadura 90 bada, $x(x+1)=90$, $x^{2}+x-90=0$, eta $x=9$ edo $x=-10$; zenbakiak naturalak direnez, $-10$ baztertzen da: 9 eta 10. Laukizuzen baten azalera 150 cm² bada eta perimetroa 50 cm, aldeak x eta $25-x$ dira: $x(25-x)=150$, $x^{2}-25x+150=0$, $x=15$ edo $x=10$, eta bi ebazpenek laukizuzen bera ematen dute. Begiratu beti emaitzak: luzera, adin edo kopuru negatiboak ez dira onartzen.',
            'Cuando la incógnita se multiplica por sí misma (áreas, producto de números consecutivos…), aparece una ecuación de segundo grado. Si el producto de dos naturales consecutivos es 90, $x(x+1)=90$, $x^{2}+x-90=0$, y $x=9$ o $x=-10$; como son naturales, se descarta $-10$: 9 y 10. Si un rectángulo tiene 150 cm² de área y 50 cm de perímetro, los lados son x y $25-x$: $x(25-x)=150$, $x^{2}-25x+150=0$, $x=15$ o $x=10$, y las dos soluciones dan el mismo rectángulo. Mira siempre los resultados: no valen longitudes, edades ni cantidades negativas.',
            'عندما يُضرب المجهول في نفسه (مساحات، جداء أعداد متتالية…) تظهر معادلة من الدرجة الثانية. إذا كان جداء عددين طبيعيين متتاليين 90 فإن $x(x+1)=90$ و$x^{2}+x-90=0$ و$x=9$ أو $x=-10$؛ ولأنهما طبيعيان نستبعد $-10$: العددان 9 و10. وإذا كانت مساحة مستطيل 150 سم² ومحيطه 50 سم فضلعاه x و$25-x$: $x(25-x)=150$، $x^{2}-25x+150=0$، $x=15$ أو $x=10$، والحلان يعطيان المستطيل نفسه. انظر دائمًا في النتائج: لا تُقبل الأطوال ولا الأعمار ولا الكميات السالبة.'
        ),
        problem: say('Gela laukizuzen bat zabalera baino 3 m luzeagoa da eta haren azalera 40 m² da. Zenbat da zabalera?', 'Una sala rectangular es 3 m más larga que ancha y su área es 40 m². ¿Cuánto mide de ancho?', 'قاعة مستطيلة طولها يزيد على عرضها بـ3 م ومساحتها 40 م². كم عرضها؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zabalera x, luzera $x+3$.', 'Ancho x, largo $x+3$.', 'العرض x والطول $x+3$.'), math: same('$x(x+3)=40$') },
            { text: say('Formula.', 'Fórmula.', 'الصيغة.'), math: same('$x=\\frac{-3\\pm 13}{2}$') },
            { text: say('$x=-8$ baztertu: zabalera 5 m da.', 'Se descarta $x=-8$: el ancho es 5 m.', 'نستبعد $x=-8$: العرض 5 م.'), math: same('$5\\cdot 8=40$') }
        ],
        example: same('$x(x+1)=90$'),
        takeaway: say('Planteatu, ebatzi eta baztertu zentzurik gabeko ebazpenak.', 'Plantea, resuelve y descarta las soluciones sin sentido.', 'صُغ وحُلّ واستبعد الحلول التي لا معنى لها.'),
        figure: (language) => <AreaProblemFigure language={language} />
    },

    /* ---------- 4. Systems of equations ---------- */
    {
        id: 'two-unknowns',
        stage: 'systems',
        title: say('Bi ezezaguneko ekuazioak', 'Ecuaciones con dos incógnitas', 'معادلات بمجهولين'),
        goal: say('$ax+by=c$ ekuazio baten ebazpenak aurkitzea eta zuzen baten puntu gisa irudikatzea.', 'Encontrar soluciones de una ecuación $ax+by=c$ y representarlas como puntos de una recta.', 'إيجاد حلول معادلة $ax+by=c$ وتمثيلها نقاطًا على مستقيم.'),
        explanation: say(
            '$ax+by=c$ motako ekuazio batek bi ezezagun ditu, eta haren ebazpena ekuazioa betetzen duen $(x, y)$ zenbaki-bikote bat da. $x+y=5$ ekuazioaren ebazpenak dira $(0, 5)$, $(1, 4)$, $(2, 3)$… eta infinitu gehiago. Ebazpenak aurkitzeko, eman x-ri balio bat eta askatu y: $3x-2y=6$ ekuazioan, $x=0$ bada, $-2y=6$ eta $y=-3$. Bikote bat ebazpena den jakiteko, ordeztu: $(4, 3)$, $12-6=6$ ✓. Ebazpen guztiak planoan irudikatuz gero, zuzen bat osatzen dute; horregatik deitzen zaio ekuazio lineala.',
            'Una ecuación del tipo $ax+by=c$ tiene dos incógnitas, y una solución es una pareja de números $(x, y)$ que la cumple. Son soluciones de $x+y=5$: $(0, 5)$, $(1, 4)$, $(2, 3)$… e infinitas más. Para encontrar soluciones, da un valor a x y despeja y: en $3x-2y=6$, si $x=0$, $-2y=6$ e $y=-3$. Para saber si una pareja es solución, sustituye: $(4, 3)$, $12-6=6$ ✓. Si se representan todas las soluciones en el plano, forman una recta; por eso se llama ecuación lineal.',
            'للمعادلة من النوع $ax+by=c$ مجهولان، وحلّها زوج أعداد $(x, y)$ يحقّقها. من حلول $x+y=5$: $(0, 5)$ و$(1, 4)$ و$(2, 3)$… وما لا نهاية غيرها. ولإيجاد حلول أعطِ x قيمة واعزل y: في $3x-2y=6$ إذا كان $x=0$ فإن $-2y=6$ و$y=-3$. ولمعرفة هل زوج ما حل، عوّض: $(4, 3)$، $12-6=6$ ✓. وإذا مثّلنا كل الحلول في المستوى شكّلت مستقيمًا؛ لذلك تسمى معادلة خطية.'
        ),
        problem: say('$2x+y=10$ ekuazioan, aurkitu y x = 3 denean, eta x y = 0 denean.', 'En la ecuación $2x+y=10$, halla y cuando x = 3, y x cuando y = 0.', 'في المعادلة $2x+y=10$ أوجد y عندما x = 3، وx عندما y = 0.'),
        stepsKind: 'steps',
        steps: [
            { text: say('x = 3 ordeztu.', 'Sustituye x = 3.', 'عوّض x = 3.'), math: same('$6+y=10\\to y=4$') },
            { text: say('y = 0 ordeztu.', 'Sustituye y = 0.', 'عوّض y = 0.'), math: same('$2x=10\\to x=5$') },
            { text: say('Bi ebazpen: $(3, 4)$ eta $(5, 0)$.', 'Dos soluciones: $(3, 4)$ y $(5, 0)$.', 'حلان: $(3, 4)$ و$(5, 0)$.'), math: same('$2\\cdot 3+4=10$') }
        ],
        example: same('$x+y=5$'),
        takeaway: say('Ebazpenak bikoteak dira, eta zuzen bat osatzen dute.', 'Las soluciones son parejas y forman una recta.', 'الحلول أزواج وتشكّل مستقيمًا.'),
        figure: (language) => <LinearSolutionsFigure language={language} />
    },
    {
        id: 'graphic',
        stage: 'systems',
        title: say('Sistemak eta haien grafikoa', 'Sistemas y su gráfica', 'الأنظمة وتمثيلها البياني'),
        goal: say('Sistema baten ebazpena bi zuzenen ebaki-puntua dela ulertzea eta sistema motak sailkatzea.', 'Entender que la solución de un sistema es el punto de corte de dos rectas y clasificar los tipos de sistemas.', 'فهم أن حل النظام نقطة تقاطع مستقيمين وتصنيف أنواع الأنظمة.'),
        explanation: say(
            'Bi ekuazio linealeko sistema batean, ebazpena bi ekuazioak batera betetzen dituen bikotea da. Ekuazio bakoitza zuzen bat denez, ebazpena bi zuzenen ebaki-puntua da. $x+y=4$ eta $x-y=2$: lehenengoaren puntuak $(0, 4)$, $(4, 0)$; bigarrenarenak $(2, 0)$, $(4, 2)$; ebakitzen dira $(3, 1)$ puntuan. Hiru kasu: zuzenak ebakitzen badira, ebazpen bakarra (bateragarri determinatua); paraleloak badira, ebazpenik ez (bateraezina): $x+y=1$, $x+y=3$; berdinak badira, infinitu ebazpen (bateragarri indeterminatua): $x+y=1$, $2x+2y=2$.',
            'En un sistema de dos ecuaciones lineales, la solución es la pareja que cumple las dos ecuaciones a la vez. Como cada ecuación es una recta, la solución es el punto de corte de las dos rectas. $x+y=4$ y $x-y=2$: puntos de la primera, $(0, 4)$, $(4, 0)$; de la segunda, $(2, 0)$, $(4, 2)$; se cortan en $(3, 1)$. Tres casos: si las rectas se cortan, una única solución (compatible determinado); si son paralelas, ninguna (incompatible): $x+y=1$, $x+y=3$; si coinciden, infinitas (compatible indeterminado): $x+y=1$, $2x+2y=2$.',
            'في نظام من معادلتين خطيتين يكون الحل الزوجَ الذي يحقّق المعادلتين معًا. ولأن كل معادلة مستقيم، فالحل نقطة تقاطع المستقيمين. $x+y=4$ و$x-y=2$: من نقاط الأولى $(0, 4)$ و$(4, 0)$، ومن نقاط الثانية $(2, 0)$ و$(4, 2)$؛ ويتقاطعان في $(3, 1)$. ثلاث حالات: إذا تقاطع المستقيمان فحل وحيد (متوافق محدد)؛ وإذا توازيا فلا حل (غير متوافق): $x+y=1$ و$x+y=3$؛ وإذا انطبقا فحلول لا نهاية لها (متوافق غير محدد): $x+y=1$ و$2x+2y=2$.'
        ),
        problem: say('$(3, 1)$ bikotea $x+2y=5$ eta $2x-y=5$ sistemaren ebazpena al da?', '¿Es $(3, 1)$ solución del sistema $x+2y=5$, $2x-y=5$?', 'هل $(3, 1)$ حل للنظام $x+2y=5$ و$2x-y=5$؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Lehen ekuazioa.', 'Primera ecuación.', 'المعادلة الأولى.'), math: same('$3+2\\cdot 1=5$ ✓') },
            { text: say('Bigarrena.', 'Segunda.', 'الثانية.'), math: same('$2\\cdot 3-1=5$ ✓') },
            { text: say('Biak betetzen ditu: bai, ebazpena da; zuzenak $(3, 1)$ puntuan ebakitzen dira.', 'Cumple las dos: sí, es la solución; las rectas se cortan en $(3, 1)$.', 'تحقّق المعادلتين: نعم، هو الحل؛ يتقاطع المستقيمان في $(3, 1)$.') }
        ],
        example: same('$x+y=1,\\ x+y=3$'),
        takeaway: say('Ebakitzen dira: bat. Paraleloak: bat ere ez. Berdinak: infinitu.', 'Se cortan: una. Paralelas: ninguna. Coinciden: infinitas.', 'متقاطعان: حل. متوازيان: لا حل. منطبقان: ما لا نهاية.'),
        figure: (language) => <SystemTypesFigure language={language} />
    },
    {
        id: 'substitution',
        stage: 'systems',
        title: say('Ordezkapen-metodoa', 'Método de sustitución', 'طريقة التعويض'),
        goal: say('Sistemak ezezagun bat askatuz eta beste ekuazioan ordeztuz ebaztea.', 'Resolver sistemas despejando una incógnita y sustituyéndola en la otra ecuación.', 'حل الأنظمة بعزل مجهول وتعويضه في المعادلة الأخرى.'),
        explanation: say(
            'Ordezkapen-metodoa: askatu ezezagun bat ekuazio batean (errazena, koefizientea 1 edo −1 duena), ordeztu adierazpen hori beste ekuazioan, ebatzi lortzen den ezezagun bakarreko ekuazioa eta, azkenik, kalkulatu beste ezezaguna. $2x+y=7$, $x-y=2$: $y=7-2x$; $x-(7-2x)=2$, $3x-7=2$, $x=3$; $y=7-6=1$. Ordeztean, jarri adierazpena parentesi artean, eta egiaztatu emaitza bi ekuazioetan. Ezezagunetako batek koefizientea 1 duenean, metodo hau da azkarrena.',
            'Método de sustitución: despeja una incógnita en una ecuación (la más fácil, la de coeficiente 1 o −1), sustituye esa expresión en la otra ecuación, resuelve la ecuación con una sola incógnita que sale y, por último, calcula la otra incógnita. $2x+y=7$, $x-y=2$: $y=7-2x$; $x-(7-2x)=2$, $3x-7=2$, $x=3$; $y=7-6=1$. Al sustituir, pon la expresión entre paréntesis, y comprueba el resultado en las dos ecuaciones. Cuando una incógnita tiene coeficiente 1, este método es el más rápido.',
            'طريقة التعويض: اعزل مجهولًا في معادلة (الأسهل، الذي معامله 1 أو −1)، وعوّض تلك العبارة في المعادلة الأخرى، وحلّ المعادلة ذات المجهول الواحد الناتجة، ثم احسب المجهول الآخر. $2x+y=7$ و$x-y=2$: $y=7-2x$؛ $x-(7-2x)=2$، $3x-7=2$، $x=3$؛ $y=7-6=1$. عند التعويض ضع العبارة بين قوسين، وتحقّق من النتيجة في المعادلتين. وعندما يكون معامل مجهول 1 تكون هذه الطريقة الأسرع.'
        ),
        problem: say('Ebatzi ordezkapenez: $x+3y=5$, $2x-y=3$.', 'Resuelve por sustitución: $x+3y=5$, $2x-y=3$.', 'حلّ بالتعويض: $x+3y=5$ و$2x-y=3$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Askatu x lehenengoan.', 'Despeja x en la primera.', 'اعزل x في الأولى.'), math: same('$x=5-3y$') },
            { text: say('Ordeztu bigarrenean.', 'Sustituye en la segunda.', 'عوّض في الثانية.'), math: same('$2(5-3y)-y=3\\to y=1$') },
            { text: say('Kalkulatu x.', 'Calcula x.', 'احسب x.'), math: same('$x=5-3\\cdot 1=2$') }
        ],
        example: same('$y=7-2x$'),
        takeaway: say('Askatu, ordeztu parentesi artean, ebatzi eta kalkulatu bestea.', 'Despeja, sustituye entre paréntesis, resuelve y calcula la otra.', 'اعزل، وعوّض بين قوسين، وحُلّ واحسب الآخر.'),
        figure: (language) => <SubstitutionFigure language={language} />
    },

    /* ---------- 5. Methods and problems ---------- */
    {
        id: 'equalization',
        stage: 'methods',
        title: say('Berdinketa-metodoa', 'Método de igualación', 'طريقة المساواة'),
        goal: say('Sistemak ezezagun bera bi ekuazioetan askatuz eta adierazpenak berdinduz ebaztea.', 'Resolver sistemas despejando la misma incógnita en las dos ecuaciones e igualando las expresiones.', 'حل الأنظمة بعزل المجهول نفسه في المعادلتين ومساواة العبارتين.'),
        explanation: say(
            'Berdinketa-metodoa: askatu ezezagun bera bi ekuazioetan; bi adierazpenak gauza bera direnez, berdindu; ebatzi ekuazioa eta ordeztu emaitza askatutako adierazpenetako batean. $x+y=8$, $x-2y=2$: $x=8-y$ eta $x=2+2y$, beraz $8-y=2+2y$, $6=3y$, $y=2$, eta $x=8-2=6$. Bi ekuazioetan ezezagun bat jada askatuta dagoenean ($y=2x+1$, $y=-x+7$) metodo hau da naturalena. Hiru metodoek emaitza bera ematen dute: aukeratu kontu gutxien eskatzen duena.',
            'Método de igualación: despeja la misma incógnita en las dos ecuaciones; como las dos expresiones valen lo mismo, iguálalas; resuelve la ecuación y sustituye el resultado en una de las expresiones despejadas. $x+y=8$, $x-2y=2$: $x=8-y$ y $x=2+2y$, así que $8-y=2+2y$, $6=3y$, $y=2$, y $x=8-2=6$. Cuando en las dos ecuaciones ya hay una incógnita despejada ($y=2x+1$, $y=-x+7$), este es el método más natural. Los tres métodos dan el mismo resultado: elige el que pida menos cuentas.',
            'طريقة المساواة: اعزل المجهول نفسه في المعادلتين؛ ولأن العبارتين متساويتان فساوِ بينهما؛ وحلّ المعادلة وعوّض النتيجة في إحدى العبارتين. $x+y=8$ و$x-2y=2$: $x=8-y$ و$x=2+2y$، إذن $8-y=2+2y$، $6=3y$، $y=2$، و$x=8-2=6$. وعندما يكون مجهول معزولًا في المعادلتين ($y=2x+1$ و$y=-x+7$) تكون هذه الطريقة الأنسب. والطرق الثلاث تعطي النتيجة نفسها: اختر الأقل حسابًا.'
        ),
        problem: say('Ebatzi berdinketaz: $y=2x+1$, $y=-x+7$.', 'Resuelve por igualación: $y=2x+1$, $y=-x+7$.', 'حلّ بالمساواة: $y=2x+1$ و$y=-x+7$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Berdindu.', 'Iguala.', 'ساوِ.'), math: same('$2x+1=-x+7$') },
            { text: say('Ebatzi.', 'Resuelve.', 'حلّ.'), math: same('$3x=6\\to x=2$') },
            { text: say('Kalkulatu y.', 'Calcula y.', 'احسب y.'), math: same('$y=2\\cdot 2+1=5$') }
        ],
        example: same('$8-y=2+2y$'),
        takeaway: say('Askatu bera bietan, berdindu, ebatzi eta ordeztu.', 'Despeja la misma en las dos, iguala, resuelve y sustituye.', 'اعزل المجهول نفسه في المعادلتين وساوِ وحُلّ وعوّض.'),
        figure: (language) => <EqualizationFigure language={language} />
    },
    {
        id: 'reduction',
        stage: 'methods',
        title: say('Laburketa-metodoa', 'Método de reducción', 'طريقة الحذف'),
        goal: say('Sistemak ekuazioak zenbaki batez biderkatuz eta batuz ezezagun bat desagerrarazita ebaztea.', 'Resolver sistemas multiplicando las ecuaciones por un número y sumándolas para que desaparezca una incógnita.', 'حل الأنظمة بضرب المعادلتين في عدد وجمعهما ليختفي مجهول.'),
        explanation: say(
            'Laburketa-metodoa: biderkatu ekuazioak zenbaki egokiez, ezezagun baten koefizienteak aurkakoak izan daitezen; batu bi ekuazioak eta ezezagun hori desagertzen da. $3x+2y=13$, $5x-4y=7$: biderkatu lehenengoa 2z, $6x+4y=26$; batu, $11x=33$, $x=3$; eta $9+2y=13$, $y=2$. Sistema parentesiekin edo izendatzaileekin badator, lehenik idatzi ekuazio bakoitza $ax+by=c$ moduan: $2(x+1)-y=5$ ekuazioa $2x-y=3$ bihurtzen da. Koefizienteak jada aurkakoak badira, batu zuzenean.',
            'Método de reducción: multiplica las ecuaciones por los números adecuados para que los coeficientes de una incógnita sean opuestos; suma las dos ecuaciones y esa incógnita desaparece. $3x+2y=13$, $5x-4y=7$: multiplica la primera por 2, $6x+4y=26$; suma, $11x=33$, $x=3$; y $9+2y=13$, $y=2$. Si el sistema viene con paréntesis o denominadores, primero escribe cada ecuación en la forma $ax+by=c$: $2(x+1)-y=5$ se convierte en $2x-y=3$. Si los coeficientes ya son opuestos, suma directamente.',
            'طريقة الحذف: اضرب المعادلتين في أعداد مناسبة ليصير معاملا أحد المجهولين متعاكسين؛ ثم اجمع المعادلتين فيختفي ذلك المجهول. $3x+2y=13$ و$5x-4y=7$: اضرب الأولى في 2، $6x+4y=26$؛ اجمع، $11x=33$، $x=3$؛ و$9+2y=13$، $y=2$. وإذا جاء النظام بأقواس أو مقامات فاكتب أولًا كل معادلة بالشكل $ax+by=c$: تصير $2(x+1)-y=5$ هي $2x-y=3$. وإذا كان المعاملان متعاكسين أصلًا فاجمع مباشرة.'
        ),
        problem: say('Ebatzi laburketaz: $2x+3y=8$, $3x-2y=-1$.', 'Resuelve por reducción: $2x+3y=8$, $3x-2y=-1$.', 'حلّ بالحذف: $2x+3y=8$ و$3x-2y=-1$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Biderkatu lehenengoa 2z eta bigarrena 3z.', 'Multiplica la primera por 2 y la segunda por 3.', 'اضرب الأولى في 2 والثانية في 3.'), math: same('$4x+6y=16,\\ 9x-6y=-3$') },
            { text: say('Batu: y desagertzen da.', 'Suma: la y desaparece.', 'اجمع: يختفي y.'), math: same('$13x=13\\to x=1$') },
            { text: say('Ordeztu.', 'Sustituye.', 'عوّض.'), math: same('$2+3y=8\\to y=2$') }
        ],
        example: same('$11x=33\\to x=3$'),
        takeaway: say('Koefizienteak aurkako bihurtu, batu, ebatzi eta ordeztu.', 'Haz opuestos los coeficientes, suma, resuelve y sustituye.', 'اجعل المعاملين متعاكسين واجمع وحُلّ وعوّض.'),
        figure: (language) => <ReductionFigure language={language} />
    },
    {
        id: 'system-problems',
        stage: 'methods',
        title: say('Problemak sistemekin', 'Problemas con sistemas', 'مسائل بالأنظمة'),
        goal: say('Bi ezezaguneko problemak sistema baten bidez planteatzea eta ebaztea.', 'Plantear y resolver con un sistema problemas con dos incógnitas.', 'صياغة مسائل بمجهولين بنظام وحلّها.'),
        explanation: say(
            'Problemak bi kantitate ezezagun baditu, izendatu x eta y, eta bilatu bi baldintza: bakoitza ekuazio bat da. Taula bat lagungarria da. Baserri batean oiloak (x) eta untxiak (y) daude: 20 buru eta 56 hanka. Buruak: $x+y=20$; hankak: $2x+4y=56$. Ordezkapenez, $x=20-y$, $40-2y+4y=56$, $y=8$ eta $x=12$. Beste adibide bat: 3 kafe eta 2 kruasan 7,70 € dira, eta 1 kafe eta 1 kruasan 2,96 €: $3x+2y=7{,}7$ eta $x+y=2{,}96$. Ebatzi, egiaztatu bi baldintzak eta erantzun esaldi batez.',
            'Si el problema tiene dos cantidades desconocidas, llámalas x e y, y busca dos condiciones: cada una es una ecuación. Ayuda una tabla. En una granja hay gallinas (x) y conejos (y): 20 cabezas y 56 patas. Cabezas: $x+y=20$; patas: $2x+4y=56$. Por sustitución, $x=20-y$, $40-2y+4y=56$, $y=8$ y $x=12$. Otro ejemplo: 3 cafés y 2 cruasanes cuestan 7,70 €, y 1 café y 1 cruasán, 2,96 €: $3x+2y=7{,}7$ y $x+y=2{,}96$. Resuelve, comprueba las dos condiciones y responde con una frase.',
            'إذا كان في المسألة كميتان مجهولتان فسمّهما x وy وابحث عن شرطين: كل شرط معادلة. ويساعد الجدول. في مزرعة دجاج (x) وأرانب (y): 20 رأسًا و56 رجلًا. الرؤوس: $x+y=20$؛ الأرجل: $2x+4y=56$. بالتعويض $x=20-y$، $40-2y+4y=56$، $y=8$ و$x=12$. مثال آخر: 3 فناجين قهوة و2 كرواسان بـ7.70 €، وقهوة وكرواسان بـ2.96 €: $3x+2y=7{,}7$ و$x+y=2{,}96$. حلّ وتحقّق من الشرطين وأجب بجملة.'
        ),
        problem: say('Aparkaleku batean autoak eta motoak daude: 25 ibilgailu eta 80 gurpil. Zenbat auto daude?', 'En un aparcamiento hay coches y motos: 25 vehículos y 80 ruedas. ¿Cuántos coches hay?', 'في موقف سيارات وفيه سيارات ودراجات نارية: 25 مركبة و80 عجلة. كم سيارة؟'),
        stepsKind: 'steps',
        steps: [
            { text: say('Autoak x, motoak y.', 'Coches x, motos y.', 'السيارات x والدراجات y.'), math: same('$x+y=25,\\ 4x+2y=80$') },
            { text: say('Ordeztu $y=25-x$.', 'Sustituye $y=25-x$.', 'عوّض $y=25-x$.'), math: same('$4x+50-2x=80\\to x=15$') },
            { text: say('15 auto eta 10 moto.', '15 coches y 10 motos.', '15 سيارة و10 دراجات.'), math: same('$60+20=80$') }
        ],
        example: same('$x+y=20$'),
        takeaway: say('Bi ezezagun, bi baldintza, bi ekuazio.', 'Dos incógnitas, dos condiciones, dos ecuaciones.', 'مجهولان، شرطان، معادلتان.'),
        figure: (language) => <SystemProblemFigure language={language} />
    }
]

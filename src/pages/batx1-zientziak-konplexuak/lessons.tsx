import type { UnitStage, UnitTopic } from '../../features/unit-v2/types'
import {
    BinomialSetsFigure,
    ComplexPlaneFigure,
    DivisionFigure,
    ImaginaryUnitFigure,
    ModulusArgumentFigure,
    PolarFigure,
    PowerSpiralFigure,
    PowersOfIFigure,
    ProductFigure,
    QuadraticRootsFigure,
    RootsFigure,
    RotationFigure,
    SumFigure
} from './figures'
import { complexLessonChecks, type ComplexTopicId } from './lessonChecks'
import { complexLessonTexts } from './lessonTexts'
import { localizeNames, same, say } from './text'

/* ==========================================================================
   Zenbaki konplexuak · Batxilergoa 1 · Zientziak — stages and lessons. The
   scope follows unit 6 of Anaya Matemáticas I and unit 5 of Santillana
   1.º Bachillerato Ciencias: the imaginary unit and the binomial form, the
   complex plane, the operations in binomial form and the powers of i, the
   second-degree equations with complex solutions, the polar and the
   trigonometric form, the product and the quotient in polar form (turns),
   De Moivre's formula and the n-th roots with their regular polygons. The
   polar form is written with a subscript, 2_{60°}, and the argument in
   degrees between 0° and 360°. Inside formulas \sen is written in each
   language's name (text.ts); lessonTexts.ts and lessonChecks.ts write
   \sin and localizeNames turns it into that name. z is written {z}: the
   Basque suffix tests read a formula that starts with z as a glued
   ending.
   ========================================================================== */

export type ComplexStageId = 'binomial' | 'operations' | 'polar' | 'turns' | 'roots'

export const complexStages: UnitStage[] = [
    { id: 'binomial', tone: 'blue', title: { eu: 'Zenbaki berriak', es: 'Números nuevos', en: 'New numbers', ar: 'أعداد جديدة' } },
    { id: 'operations', tone: 'violet', title: { eu: 'Eragiketak', es: 'Operaciones', en: 'Operations', ar: 'العمليات' } },
    { id: 'polar', tone: 'mustard', title: { eu: 'Forma polarra', es: 'Forma polar', en: 'Polar form', ar: 'الشكل القطبي' } },
    { id: 'turns', tone: 'coral', title: { eu: 'Birak eta berreturak', es: 'Giros y potencias', en: 'Turns and powers', ar: 'الدوران والقوى' } },
    { id: 'roots', tone: 'green', title: { eu: 'Erroak', es: 'Raíces', en: 'Roots', ar: 'الجذور' } }
]

/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    /* ---------- 1. New numbers ---------- */
    {
        id: 'imaginary-unit',
        stage: 'binomial',
        title: say('Unitate irudikaria', 'La unidad imaginaria', 'الوحدة التخيلية', 'The imaginary unit'),
        goal: say('Zenbaki negatiboen erro karratuak $i$ unitatearekin idaztea eta $i^2=-1$ erabiltzea.', 'Escribir las raíces cuadradas de los números negativos con la unidad $i$ y usar $i^2=-1$.', 'كتابة الجذور التربيعية للأعداد السالبة بالوحدة $i$ واستعمال $i^2=-1$.', 'Write the square roots of negative numbers with the unit $i$ and use $i^2=-1$.'),
        needs: [
            { unit: 'batx1-zientziak/numeros-reales', topic: 'sets', title: { eu: 'Multzoak eta ikurrak', es: 'Conjuntos y símbolos', en: 'Sets and symbols', ar: 'المجموعات والرموز' } }
        ],
        problem: say('Ebatzi $x^2+9=0$ ekuazioa.', 'Resuelve la ecuación $x^2+9=0$.', 'حُلّ المعادلة $x^2+9=0$.', 'Solve the equation $x^2+9=0$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Bakandu $x^2$: karratu bat negatiboa da, eta zenbaki errealen artean ez dago soluziorik.', 'Despeja $x^2$: un cuadrado negativo, que en los reales no tiene solución.', 'اعزل $x^2$: مربع سالب، وليس له حل في الأعداد الحقيقية.', 'Isolate $x^2$: a negative square, which has no real solution.'), math: same('$x^2=-9$') },
            { text: say('Atera erroa $i=\\sqrt{-1}$ erabiliz.', 'Saca la raíz usando $i=\\sqrt{-1}$.', 'استخرج الجذر مستعملًا $i=\\sqrt{-1}$.', 'Take the root using $i=\\sqrt{-1}$.'), math: same('$\\sqrt{-9}=\\sqrt{9}\\cdot\\sqrt{-1}=3i$') },
            { text: say('Bi soluzio daude, bata bestearen aurkakoa. Egiaztatu: $(3i)^2=9i^2=-9$.', 'Hay dos soluciones, opuestas. Comprueba: $(3i)^2=9i^2=-9$.', 'هناك حلان متعاكسان. تحقّق: $(3i)^2=9i^2=-9$.', 'There are two solutions, opposite to each other. Check: $(3i)^2=9i^2=-9$.'), math: same('$x=3i\\qquad x=-3i$') }
        ],
        takeaway: say('$i=\\sqrt{-1}$ eta $i^2=-1$; $a>0$ bada, $\\sqrt{-a}=\\sqrt{a}\\,i$.', '$i=\\sqrt{-1}$ y $i^2=-1$; si $a>0$, $\\sqrt{-a}=\\sqrt{a}\\,i$.', '$i=\\sqrt{-1}$ و$i^2=-1$؛ وإذا كان $a>0$ فإن $\\sqrt{-a}=\\sqrt{a}\\,i$.', '$i=\\sqrt{-1}$ and $i^2=-1$; if $a>0$, $\\sqrt{-a}=\\sqrt{a}\\,i$.'),
        figure: (language) => <ImaginaryUnitFigure language={language} />
    },
    {
        id: 'binomial-form',
        stage: 'binomial',
        title: say('Forma binomikoa', 'La forma binómica', 'الشكل الجبري', 'The binomial form'),
        goal: say('Zenbaki konplexu baten zati erreala eta zati irudikaria ezagutzea, eta haren aurkakoa eta konjokatua idaztea.', 'Reconocer la parte real y la parte imaginaria de un número complejo y escribir su opuesto y su conjugado.', 'التعرف على الجزء الحقيقي والجزء التخيلي لعدد مركب وكتابة معاكسه ومرافقه.', 'Recognise the real and the imaginary part of a complex number and write its opposite and its conjugate.'),
        problem: say('${z}=-2+7i$ izanik, eman haren zati erreala, zati irudikaria, aurkakoa eta konjokatua.', 'Para ${z}=-2+7i$, da su parte real, su parte imaginaria, su opuesto y su conjugado.', 'ليكن ${z}=-2+7i$. أعطِ جزأه الحقيقي وجزأه التخيلي ومعاكسه ومرافقه.', 'For ${z}=-2+7i$, give its real part, its imaginary part, its opposite and its conjugate.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zati irudikaria $i$ unitatearekin doan zenbakia da, $i$ gabe.', 'La parte imaginaria es el número que acompaña a $i$, sin la $i$.', 'الجزء التخيلي هو العدد المرافق لـ $i$، من دون $i$.', 'The imaginary part is the number next to $i$, without the $i$.'), math: same('$a=-2\\qquad b=7$') },
            { text: say('Aurkakoak bi zeinuak aldatzen ditu.', 'El opuesto cambia los dos signos.', 'المعاكس يغيّر الإشارتين.', 'The opposite changes both signs.'), math: same('$-{z}=2-7i$') },
            { text: say('Konjokatuak zati irudikariaren zeinua bakarrik aldatzen du.', 'El conjugado cambia solo el signo de la parte imaginaria.', 'المرافق يغيّر إشارة الجزء التخيلي فقط.', 'The conjugate changes only the sign of the imaginary part.'), math: same('$\\overline{z}=-2-7i$') }
        ],
        takeaway: say('$a+bi$ zenbakian, $a$ zati erreala da eta $b$ zati irudikaria; aurkakoa $-a-bi$ da, eta konjokatua $a-bi$.', 'En $a+bi$, $a$ es la parte real y $b$ la parte imaginaria; el opuesto es $-a-bi$ y el conjugado, $a-bi$.', 'في $a+bi$ يكون $a$ الجزء الحقيقي و$b$ الجزء التخيلي؛ والمعاكس $-a-bi$ والمرافق $a-bi$.', 'In $a+bi$, $a$ is the real part and $b$ the imaginary part; the opposite is $-a-bi$ and the conjugate $a-bi$.'),
        figure: (language) => <BinomialSetsFigure language={language} />
    },
    {
        id: 'complex-plane',
        stage: 'binomial',
        figureAfterSteps: true,
        title: say('Plano konplexua', 'El plano complejo', 'المستوى المركب', 'The complex plane'),
        goal: say('Zenbaki konplexu bat planoko puntu gisa (haren afixua) irudikatzea, eta aurkakoa eta konjokatua non dauden ikustea.', 'Representar un número complejo como un punto del plano, su afijo, y ver dónde quedan su opuesto y su conjugado.', 'تمثيل عدد مركب نقطةً في المستوى، وهي صورته، ورؤية موضع معاكسه ومرافقه.', 'Draw a complex number as a point of the plane, its affix, and see where its opposite and its conjugate are.'),
        needs: [
            { unit: 'dbh4-akademikoak/vectores-rectas', topic: 'vector-operations', title: { eu: 'Bektoreekin eragiketak', es: 'Operaciones con vectores', en: 'Operations with vectors', ar: 'العمليات على المتجهات' } }
        ],
        problem: say('Irudikatu ${z}=3+2i$, haren aurkakoa eta haren konjokatua. Zein koadrantetan dago bakoitza?', 'Representa ${z}=3+2i$, su opuesto y su conjugado. ¿En qué cuadrante está cada uno?', 'مثّل ${z}=3+2i$ ومعاكسه ومرافقه. في أي ربع يقع كل منها؟', 'Draw ${z}=3+2i$, its opposite and its conjugate. Which quadrant is each one in?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Afixua: zati erreala ardatz horizontalean eta zati irudikaria bertikalean. Lehen koadrantean dago.', 'El afijo: la parte real en el eje horizontal y la imaginaria en el vertical. Está en el primer cuadrante.', 'الصورة: الجزء الحقيقي على المحور الأفقي والتخيلي على العمودي. تقع في الربع الأول.', 'The affix: the real part on the horizontal axis and the imaginary part on the vertical one. It is in the first quadrant.'), math: same('$3+2i\\ \\to\\ (3,\\ 2)$') },
            { text: say('Aurkakoa jatorriarekiko simetrikoa da: hirugarren koadrantean.', 'El opuesto es simétrico respecto al origen: tercer cuadrante.', 'المعاكس متناظر بالنسبة إلى الأصل: الربع الثالث.', 'The opposite is symmetric about the origin: third quadrant.'), math: same('$-3-2i\\ \\to\\ (-3,\\ -2)$') },
            { text: say('Konjokatua ardatz errealarekiko simetrikoa da: laugarren koadrantean.', 'El conjugado es simétrico respecto al eje real: cuarto cuadrante.', 'المرافق متناظر بالنسبة إلى المحور الحقيقي: الربع الرابع.', 'The conjugate is symmetric about the real axis: fourth quadrant.'), math: same('$3-2i\\ \\to\\ (3,\\ -2)$') }
        ],
        takeaway: say('$a+bi$ zenbakiaren afixua $(a,\\ b)$ puntua da; aurkakoa jatorriarekiko simetrikoa da, eta konjokatua ardatz errealarekiko.', 'El afijo de $a+bi$ es el punto $(a,\\ b)$; el opuesto es su simétrico respecto al origen, y el conjugado, respecto al eje real.', 'صورة $a+bi$ هي النقطة $(a,\\ b)$؛ والمعاكس مناظرها بالنسبة إلى الأصل، والمرافق مناظرها بالنسبة إلى المحور الحقيقي.', 'The affix of $a+bi$ is the point $(a,\\ b)$; the opposite is its mirror image through the origin, and the conjugate in the real axis.'),
        figure: (language) => <ComplexPlaneFigure language={language} />
    },
    /* ---------- 2. Operations ---------- */
    {
        id: 'add-multiply',
        stage: 'operations',
        title: say('Batuketa eta biderketa', 'Suma y producto', 'الجمع والضرب', 'Sum and product'),
        goal: say('Zenbaki konplexuak forma binomikoan batzea, kentzea eta biderkatzea, $i^2=-1$ erabiliz.', 'Sumar, restar y multiplicar números complejos en forma binómica usando $i^2=-1$.', 'جمع الأعداد المركبة وطرحها وضربها في الشكل الجبري باستعمال $i^2=-1$.', 'Add, subtract and multiply complex numbers in binomial form using $i^2=-1$.'),
        needs: [
            { unit: 'batx1-zientziak/numeros-reales', topic: 'newton', title: { eu: 'Newtonen binomioa', es: 'Binomio de Newton', en: 'The binomial theorem', ar: 'ذات الحدين لنيوتن' } }
        ],
        problem: say('Kalkulatu $(2+3i)+(4-i)$ eta $(2+3i)\\cdot(4-i)$.', 'Calcula $(2+3i)+(4-i)$ y $(2+3i)\\cdot(4-i)$.', 'احسب $(2+3i)+(4-i)$ و$(2+3i)\\cdot(4-i)$.', 'Work out $(2+3i)+(4-i)$ and $(2+3i)\\cdot(4-i)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Batuketa: zati erreala zati errealarekin, eta irudikaria irudikariarekin.', 'La suma: parte real con parte real, e imaginaria con imaginaria.', 'الجمع: الجزء الحقيقي مع الحقيقي، والتخيلي مع التخيلي.', 'The sum: real part with real part, and imaginary with imaginary.'), math: same('$(2+3i)+(4-i)=6+2i$') },
            { text: say('Biderketa: gai bakoitza gai bakoitzaz.', 'El producto: cada término por cada término.', 'الضرب: كل حد في كل حد.', 'The product: each term times each term.'), math: same('$\\begin{gathered}(2+3i)(4-i)\\\\ =8-2i+12i-3i^2\\end{gathered}$') },
            { text: say('Jarri $-1$ zenbakia $i^2$ adierazpenaren ordez, eta elkartu.', 'Cambia $i^2$ por $-1$ y agrupa.', 'ضع $-1$ مكان $i^2$ واجمع الحدود.', 'Put $-1$ in place of $i^2$ and collect terms.'), math: same('$=8+10i+3=11+10i$') }
        ],
        takeaway: say('Zati errealak eta irudikariak bakoitza bere aldetik batzen dira; biderkatzeko, polinomioekin bezala banatzen da, eta $i^2$ adierazpenaren ordez $-1$ jartzen da.', 'Las partes reales y las imaginarias se suman por separado; para multiplicar, se reparte como con polinomios y se cambia $i^2$ por $-1$.', 'تُجمع الأجزاء الحقيقية والتخيلية كلٌّ على حدة؛ وللضرب نوزّع كما في الحدوديات ونضع $-1$ مكان $i^2$.', 'The real parts and the imaginary parts are added separately; to multiply, expand as with polynomials and put $-1$ in place of $i^2$.'),
        figure: (language) => <SumFigure language={language} />
    },
    {
        id: 'division',
        stage: 'operations',
        figureAfterSteps: true,
        title: say('Zatiketa', 'La división', 'القسمة', 'Division'),
        goal: say('Zenbaki konplexuak zatitzea, goian eta behean izendatzailearen konjokatuaz biderkatuz.', 'Dividir números complejos multiplicando arriba y abajo por el conjugado del denominador.', 'قسمة الأعداد المركبة بضرب البسط والمقام في مرافق المقام.', 'Divide complex numbers by multiplying top and bottom by the conjugate of the denominator.'),
        needs: [
            { unit: 'batx1-zientziak/numeros-reales', topic: 'rationalize', title: { eu: 'Izendatzaileak arrazionalizatzea', es: 'Racionalizar denominadores', en: 'Rationalising denominators', ar: 'إنطاق المقامات' } }
        ],
        problem: say('Kalkulatu $\\frac{5+5i}{2+i}$.', 'Calcula $\\frac{5+5i}{2+i}$.', 'احسب $\\frac{5+5i}{2+i}$.', 'Work out $\\frac{5+5i}{2+i}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Biderkatu goian eta behean izendatzailearen konjokatuaz.', 'Multiplica arriba y abajo por el conjugado del denominador.', 'اضرب البسط والمقام في مرافق المقام.', 'Multiply top and bottom by the conjugate of the denominator.'), math: same('$\\frac{(5+5i)(2-i)}{(2+i)(2-i)}$') },
            { text: say('Behean zenbaki erreal bat geratzen da.', 'Abajo queda un número real.', 'يبقى في المقام عدد حقيقي.', 'A real number is left at the bottom.'), math: same('$(2+i)(2-i)=4-i^2=5$') },
            { text: say('Goian, banatu eta sinplifikatu.', 'Arriba, reparte y simplifica.', 'وفي البسط وزّع وبسّط.', 'At the top, expand and simplify.'), math: same('$\\frac{10-5i+10i-5i^2}{5}=\\frac{15+5i}{5}=3+i$') }
        ],
        takeaway: say('Zatitzeko, zenbakitzailea eta izendatzailea izendatzailearen konjokatuaz biderkatzen dira: behean $a^2+b^2$ geratzen da, zenbaki erreal bat.', 'Para dividir, se multiplican el numerador y el denominador por el conjugado del denominador: abajo queda $a^2+b^2$, un número real.', 'للقسمة نضرب البسط والمقام في مرافق المقام: فيبقى في المقام $a^2+b^2$، وهو عدد حقيقي.', 'To divide, multiply the numerator and the denominator by the conjugate of the denominator: $a^2+b^2$ is left at the bottom, a real number.'),
        figure: (language) => <DivisionFigure language={language} />
    },
    {
        id: 'powers-of-i',
        stage: 'operations',
        title: say('i zenbakiaren berreturak', 'Potencias de i', 'قوى i', 'Powers of i'),
        goal: say('$i$ zenbakiaren edozein berretura kalkulatzea, berretzailea zati 4 egitean geratzen den hondarrarekin.', 'Calcular cualquier potencia de $i$ con el resto de dividir el exponente entre 4.', 'حساب أي قوة لـ $i$ بباقي قسمة الأس على 4.', 'Work out any power of $i$ with the remainder of dividing the exponent by 4.'),
        problem: say('Kalkulatu $i^{27}$ eta $i^{50}$.', 'Calcula $i^{27}$ y $i^{50}$.', 'احسب $i^{27}$ و$i^{50}$.', 'Work out $i^{27}$ and $i^{50}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Berreturak lauka errepikatzen dira.', 'Las potencias se repiten de cuatro en cuatro.', 'تتكرر القوى كل أربع.', 'The powers repeat every four.'), math: same('$i^0=1\\quad i^1=i\\quad i^2=-1\\quad i^3=-i$') },
            { text: say('Zatitu berretzailea 4 zenbakiaz: hondarrak agintzen du.', 'Divide el exponente entre 4: manda el resto.', 'اقسم الأس على 4: الباقي هو الذي يحسم.', 'Divide the exponent by 4: the remainder decides.'), math: same('$27=4\\cdot 6+3\\ \\to\\ i^{27}=i^3=-i$') },
            { text: say('Gauza bera 50 zenbakiarekin.', 'Lo mismo con 50.', 'وكذلك مع 50.', 'The same with 50.'), math: same('$50=4\\cdot 12+2\\ \\to\\ i^{50}=i^2=-1$') }
        ],
        takeaway: say('$i^4=1$; beraz, $i^n=i^r$, $r$ izanik $n$ zati 4 egitean geratzen den hondarra.', '$i^4=1$, así que $i^n=i^r$, donde $r$ es el resto de dividir $n$ entre 4.', '$i^4=1$، لذلك $i^n=i^r$ حيث $r$ باقي قسمة $n$ على 4.', '$i^4=1$, so $i^n=i^r$, where $r$ is the remainder of dividing $n$ by 4.'),
        figure: (language) => <PowersOfIFigure language={language} />
    },
    {
        id: 'quadratic-complex',
        stage: 'operations',
        title: say('Soluzio konplexuak dituzten ekuazioak', 'Ecuaciones con soluciones complejas', 'معادلات بحلول مركبة', 'Equations with complex solutions'),
        goal: say('Diskriminatzaile negatiboko bigarren mailako ekuazioak ebaztea, eta haien soluzioak konjokatuak direla ikustea.', 'Resolver ecuaciones de segundo grado con discriminante negativo y ver que sus soluciones son conjugadas.', 'حل معادلات الدرجة الثانية ذات المميز السالب، وملاحظة أن حليها مترافقان.', 'Solve second-degree equations with a negative discriminant and see that their solutions are conjugate.'),
        needs: [
            { unit: 'dbh4-akademikoak/ecuaciones-inecuaciones', topic: 'quadratic-formula', title: { eu: 'Bigarren mailako ekuazioak', es: 'Ecuaciones de segundo grado', en: 'Second-degree equations', ar: 'معادلات الدرجة الثانية' } }
        ],
        problem: say('Ebatzi $x^2-4x+13=0$ ekuazioa.', 'Resuelve $x^2-4x+13=0$.', 'حُلّ $x^2-4x+13=0$.', 'Solve $x^2-4x+13=0$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Diskriminatzailea negatiboa da.', 'El discriminante es negativo.', 'المميز سالب.', 'The discriminant is negative.'), math: same('$\\Delta=16-52=-36$') },
            { text: say('Haren erroa irudikaria da.', 'Su raíz es imaginaria.', 'جذره تخيلي.', 'Its root is imaginary.'), math: same('$\\sqrt{-36}=6i$') },
            { text: say('Bi soluzioak konjokatuak dira.', 'Las dos soluciones son conjugadas.', 'الحلان مترافقان.', 'The two solutions are conjugate.'), math: same('$x=\\frac{4\\pm 6i}{2}=2\\pm 3i$') }
        ],
        takeaway: say('$\\Delta<0$ bada, koefiziente errealeko bigarren mailako ekuazio batek bi soluzio konplexu konjokatu ditu: $\\frac{-b\\pm\\sqrt{-\\Delta}\\,i}{2a}$.', 'Si $\\Delta<0$, una ecuación de segundo grado con coeficientes reales tiene dos soluciones complejas conjugadas: $\\frac{-b\\pm\\sqrt{-\\Delta}\\,i}{2a}$.', 'إذا كان $\\Delta<0$ فلمعادلة الدرجة الثانية ذات المعاملات الحقيقية حلّان مركبان مترافقان: $\\frac{-b\\pm\\sqrt{-\\Delta}\\,i}{2a}$.', 'If $\\Delta<0$, a second-degree equation with real coefficients has two conjugate complex solutions: $\\frac{-b\\pm\\sqrt{-\\Delta}\\,i}{2a}$.'),
        figure: (language) => <QuadraticRootsFigure language={language} />
    },

    /* ---------- 3. Polar form ---------- */
    {
        id: 'modulus-argument',
        stage: 'polar',
        title: say('Modulua eta argumentua', 'Módulo y argumento', 'الطويلة والعمدة', 'Modulus and argument'),
        goal: say('Zenbaki konplexu baten modulua eta argumentua kalkulatzea, zein koadrantetan dagoen begiratuta.', 'Calcular el módulo y el argumento de un número complejo, mirando en qué cuadrante está.', 'حساب طويلة عدد مركب وعمدته بالنظر إلى الربع الذي يقع فيه.', 'Work out the modulus and the argument of a complex number, looking at which quadrant it is in.'),
        needs: [
            { unit: 'batx1-zientziak/resolucion-triangulos', topic: 'quadrant-ratios', title: { eu: 'Arrazoiak lau koadranteetan', es: 'Razones en los cuatro cuadrantes', en: 'Ratios in the four quadrants', ar: 'النسب في الأرباع الأربعة' } },
            { unit: 'batx1-zientziak/resolucion-triangulos', topic: 'inverse-angles', title: { eu: 'Kalkulagailua eta beste angelua', es: 'La calculadora y el otro ángulo', en: 'The calculator and the other angle', ar: 'الآلة الحاسبة والزاوية الأخرى' } }
        ],
        problem: say('Aurkitu ${z}=-1+\\sqrt{3}\\,i$ zenbakiaren modulua eta argumentua.', 'Halla el módulo y el argumento de ${z}=-1+\\sqrt{3}\\,i$.', 'أوجد طويلة ${z}=-1+\\sqrt{3}\\,i$ وعمدته.', 'Find the modulus and the argument of ${z}=-1+\\sqrt{3}\\,i$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Modulua jatorrirako distantzia da, Pitagorasen bidez.', 'El módulo es la distancia al origen, por Pitágoras.', 'الطويلة هي المسافة إلى الأصل، بمبرهنة فيثاغورس.', 'The modulus is the distance to the origin, by Pythagoras.'), math: same('$|{z}|=\\sqrt{(-1)^2+(\\sqrt{3})^2}=\\sqrt{4}=2$') },
            { text: say('Argumentuaren tangentea.', 'La tangente del argumento.', 'ظل العمدة.', 'The tangent of the argument.'), math: same('$\\tg\\alpha=\\frac{\\sqrt{3}}{-1}=-\\sqrt{3}$') },
            { text: say('Afixua bigarren koadrantean dago: −60° ez da baliozkoa.', 'El afijo está en el segundo cuadrante: −60° no vale.', 'الصورة في الربع الثاني: −60° لا تصلح.', 'The affix is in the second quadrant: −60° does not work.'), math: same('$\\alpha=180°-60°=120°$') }
        ],
        takeaway: say('$|a+bi|=\\sqrt{a^2+b^2}$ eta $\\tg\\alpha=\\frac{b}{a}$; argumentua afixuaren koadrantearen arabera aukeratzen da, 0° eta 360° artean.', '$|a+bi|=\\sqrt{a^2+b^2}$ y $\\tg\\alpha=\\frac{b}{a}$; el argumento se elige según el cuadrante del afijo, entre 0° y 360°.', '$|a+bi|=\\sqrt{a^2+b^2}$ و$\\tg\\alpha=\\frac{b}{a}$؛ وتُختار العمدة بحسب ربع الصورة، بين 0° و360°.', '$|a+bi|=\\sqrt{a^2+b^2}$ and $\\tg\\alpha=\\frac{b}{a}$; the argument is chosen by the quadrant of the affix, between 0° and 360°.'),
        figure: (language) => <ModulusArgumentFigure language={language} />
    },
    {
        id: 'polar-binomial',
        stage: 'polar',
        figureAfterSteps: true,
        title: say('Forma polarra eta trigonometrikoa', 'Forma polar y trigonométrica', 'الشكل القطبي والشكل المثلثي', 'Polar and trigonometric form'),
        goal: say('Zenbaki konplexu bat forma binomikotik forma polarrera, $r_\\alpha$, eta alderantziz pasatzea, $r(\\cos\\alpha+i\\sen\\alpha)$ forma trigonometrikoarekin.', 'Pasar un complejo de forma binómica a polar, $r_\\alpha$, y al revés, con la forma trigonométrica $r(\\cos\\alpha+i\\sen\\alpha)$.', 'تحويل عدد مركب من الشكل الجبري إلى القطبي $r_\\alpha$ والعكس، بالشكل المثلثي $r(\\cos\\alpha+i\\sen\\alpha)$.', 'Turn a complex number from binomial into polar form, $r_\\alpha$, and back, with the trigonometric form $r(\\cos\\alpha+i\\sen\\alpha)$.'),
        needs: [
            { unit: 'dbh4-akademikoak/trigonometria', topic: 'notable-angles', title: { eu: '30°, 45° eta 60°', es: '30°, 45° y 60°', en: '30°, 45° and 60°', ar: '30° و45° و60°' } }
        ],
        problem: say('Idatzi $4_{150°}$ forma binomikoan.', 'Escribe $4_{150°}$ en forma binómica.', 'اكتب $4_{150°}$ بالشكل الجبري.', 'Write $4_{150°}$ in binomial form.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Forma trigonometrikoa: kosinuak zati erreala ematen du, eta sinuak irudikaria.', 'La forma trigonométrica: el coseno da la parte real y el seno, la imaginaria.', 'الشكل المثلثي: جيب التمام يعطي الجزء الحقيقي والجيب يعطي التخيلي.', 'The trigonometric form: the cosine gives the real part and the sine the imaginary part.'), math: same('$4_{150°}=4(\\cos 150°+i\\sen 150°)$') },
            { text: say('150° angeluaren arrazoiak.', 'Las razones de 150°.', 'نسب الزاوية 150°.', 'The ratios of 150°.'), math: same('$\\cos 150°=-\\frac{\\sqrt{3}}{2}\\qquad\\sen 150°=\\frac{1}{2}$') },
            { text: say('Biderkatu modulua.', 'Multiplica por el módulo.', 'اضرب في الطويلة.', 'Multiply by the modulus.'), math: same('$4_{150°}=-2\\sqrt{3}+2i$') }
        ],
        takeaway: say('$r_\\alpha=r(\\cos\\alpha+i\\sen\\alpha)$: zati erreala $r\\cos\\alpha$ da, eta irudikaria $r\\sen\\alpha$.', '$r_\\alpha=r(\\cos\\alpha+i\\sen\\alpha)$: la parte real es $r\\cos\\alpha$ y la imaginaria, $r\\sen\\alpha$.', '$r_\\alpha=r(\\cos\\alpha+i\\sen\\alpha)$: الجزء الحقيقي $r\\cos\\alpha$ والتخيلي $r\\sen\\alpha$.', '$r_\\alpha=r(\\cos\\alpha+i\\sen\\alpha)$: the real part is $r\\cos\\alpha$ and the imaginary part $r\\sen\\alpha$.'),
        figure: (language) => <PolarFigure language={language} />
    },

    /* ---------- 4. Turns and powers ---------- */
    {
        id: 'product-quotient',
        stage: 'turns',
        title: say('Biderkadura eta zatidura forma polarrean', 'Producto y cociente en polar', 'الجداء والقسمة في الشكل القطبي', 'Product and quotient in polar form'),
        goal: say('Zenbaki konplexuak forma polarrean biderkatzea eta zatitzea: moduluak biderkatu edo zatitu, eta argumentuak batu edo kendu.', 'Multiplicar y dividir complejos en forma polar: los módulos se multiplican o se dividen y los argumentos se suman o se restan.', 'ضرب الأعداد المركبة وقسمتها في الشكل القطبي: تُضرب الطويلات أو تُقسم، وتُجمع العُمَد أو تُطرح.', 'Multiply and divide complex numbers in polar form: the moduli multiply or divide and the arguments add or subtract.'),
        needs: [
            { unit: 'batx1-zientziak/funciones-trigonometricas', topic: 'sum-formulas', title: { eu: 'Batuketaren sinua eta kosinua', es: 'Seno y coseno de una suma', en: 'Sine and cosine of a sum', ar: 'جيب مجموع زاويتين وجيب تمامه' } }
        ],
        problem: say('${z}=6_{150°}$ eta $w=2_{60°}$ badira, kalkulatu ${z}\\cdot w$ eta $\\frac{z}{w}$.', 'Si ${z}=6_{150°}$ y $w=2_{60°}$, calcula ${z}\\cdot w$ y $\\frac{z}{w}$.', 'إذا كان ${z}=6_{150°}$ و$w=2_{60°}$ فاحسب ${z}\\cdot w$ و$\\frac{z}{w}$.', 'If ${z}=6_{150°}$ and $w=2_{60°}$, work out ${z}\\cdot w$ and $\\frac{z}{w}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Biderkadura: moduluak biderkatu eta argumentuak batu.', 'Producto: se multiplican los módulos y se suman los argumentos.', 'الجداء: تُضرب الطويلتان وتُجمع العمدتان.', 'Product: multiply the moduli and add the arguments.'), math: same('${z}\\cdot w=(6\\cdot 2)_{150°+60°}=12_{210°}$') },
            { text: say('Zatidura: moduluak zatitu eta argumentuak kendu.', 'Cociente: se dividen los módulos y se restan los argumentos.', 'القسمة: تُقسم الطويلتان وتُطرح العمدتان.', 'Quotient: divide the moduli and subtract the arguments.'), math: same('$\\frac{z}{w}=\\left(\\frac{6}{2}\\right)_{150°-60°}=3_{90°}$') },
            { text: say('Forma binomikoan, zatidura irudikari hutsa da.', 'En forma binómica, el cociente es imaginario puro.', 'في الشكل الجبري يكون خارج القسمة تخيليًا صرفًا.', 'In binomial form, the quotient is purely imaginary.'), math: same('$3_{90°}=3i$') }
        ],
        takeaway: say('$r_\\alpha\\cdot s_\\beta=(r\\cdot s)_{\\alpha+\\beta}$ eta $\\frac{r_\\alpha}{s_\\beta}=\\left(\\frac{r}{s}\\right)_{\\alpha-\\beta}$.', '$r_\\alpha\\cdot s_\\beta=(r\\cdot s)_{\\alpha+\\beta}$ y $\\frac{r_\\alpha}{s_\\beta}=\\left(\\frac{r}{s}\\right)_{\\alpha-\\beta}$.', '$r_\\alpha\\cdot s_\\beta=(r\\cdot s)_{\\alpha+\\beta}$ و$\\frac{r_\\alpha}{s_\\beta}=\\left(\\frac{r}{s}\\right)_{\\alpha-\\beta}$.', '$r_\\alpha\\cdot s_\\beta=(r\\cdot s)_{\\alpha+\\beta}$ and $\\frac{r_\\alpha}{s_\\beta}=\\left(\\frac{r}{s}\\right)_{\\alpha-\\beta}$.'),
        figure: (language) => <ProductFigure language={language} />
    },
    {
        id: 'rotations',
        stage: 'turns',
        figureAfterSteps: true,
        title: say('Biderkatzea biratzea da', 'Multiplicar es girar', 'الضرب دوران', 'Multiplying is turning'),
        goal: say('Puntu bat jatorriaren inguruan biratzea, haren zenbaki konplexua $i$ edo $1_\\alpha$ zenbakiaz biderkatuz.', 'Girar un punto alrededor del origen multiplicando su complejo por $i$ o por $1_\\alpha$.', 'تدوير نقطة حول الأصل بضرب عددها المركب في $i$ أو في $1_\\alpha$.', 'Turn a point about the origin by multiplying its complex number by $i$ or by $1_\\alpha$.'),
        problem: say('Biratu $(4,\\ 2)$ puntua 90° jatorriaren inguruan, erlojuaren orratzen kontrako noranzkoan.', 'Gira el punto $(4,\\ 2)$ 90° alrededor del origen, en sentido contrario a las agujas del reloj.', 'دوّر النقطة $(4,\\ 2)$ بزاوية 90° حول الأصل، عكس اتجاه عقارب الساعة.', 'Turn the point $(4,\\ 2)$ through 90° about the origin, anticlockwise.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Puntua zenbaki konplexu baten afixua da.', 'El punto es el afijo de un complejo.', 'النقطة صورة عدد مركب.', 'The point is the affix of a complex number.'), math: same('$(4,\\ 2)\\ \\to\\ 4+2i$') },
            { text: say('90° biratzea $i=1_{90°}$ zenbakiaz biderkatzea da: modulua ez da aldatzen.', 'Girar 90° es multiplicar por $i=1_{90°}$: el módulo no cambia.', 'الدوران 90° هو الضرب في $i=1_{90°}$: لا تتغير الطويلة.', 'Turning 90° is multiplying by $i=1_{90°}$: the modulus does not change.'), math: same('$(4+2i)\\cdot i=4i+2i^2=-2+4i$') },
            { text: say('Biratutako puntua.', 'El punto girado.', 'النقطة بعد الدوران.', 'The turned point.'), math: same('$-2+4i\\ \\to\\ (-2,\\ 4)$') }
        ],
        takeaway: say('$1_\\alpha$ zenbakiaz biderkatzeak afixua α angelu biratzen du jatorriaren inguruan; $i$ zenbakiaz, 90°; $-1$ zenbakiaz, 180°.', 'Multiplicar por $1_\\alpha$ gira el afijo un ángulo α alrededor del origen; por $i$, 90°; por $-1$, 180°.', 'الضرب في $1_\\alpha$ يدوّر الصورة بزاوية α حول الأصل؛ وفي $i$ بزاوية 90°؛ وفي $-1$ بزاوية 180°.', 'Multiplying by $1_\\alpha$ turns the affix through an angle α about the origin; by $i$, 90°; by $-1$, 180°.'),
        figure: (language) => <RotationFigure language={language} />
    },
    {
        id: 'de-moivre',
        stage: 'turns',
        title: say('Moivreren formula', 'La fórmula de Moivre', 'صيغة دي موافر', 'De Moivre\'s formula'),
        goal: say('Zenbaki konplexuen berreturak forma polarrean kalkulatzea, Moivreren formularekin.', 'Calcular potencias de complejos en forma polar con la fórmula de Moivre.', 'حساب قوى الأعداد المركبة في الشكل القطبي بصيغة دي موافر.', 'Work out powers of complex numbers in polar form with De Moivre\'s formula.'),
        needs: [
            { unit: 'batx1-zientziak/funciones-trigonometricas', topic: 'double-angle', title: { eu: 'Angelu bikoitza', es: 'El ángulo doble', en: 'The double angle', ar: 'ضعف الزاوية' } }
        ],
        problem: say('Kalkulatu $(1+\\sqrt{3}\\,i)^6$.', 'Calcula $(1+\\sqrt{3}\\,i)^6$.', 'احسب $(1+\\sqrt{3}\\,i)^6$.', 'Work out $(1+\\sqrt{3}\\,i)^6$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Pasatu forma polarrera.', 'Pásalo a forma polar.', 'حوّله إلى الشكل القطبي.', 'Turn it into polar form.'), math: same('$|1+\\sqrt{3}\\,i|=\\sqrt{1+3}=2\\qquad 1+\\sqrt{3}\\,i=2_{60°}$') },
            { text: say('Moivre: modulua seigarren berreturara, eta argumentua bider 6.', 'Moivre: el módulo a la sexta y el argumento por 6.', 'دي موافر: الطويلة أُس 6 والعمدة في 6.', 'De Moivre: the modulus to the sixth power and the argument times 6.'), math: same('$(2_{60°})^6=(2^6)_{6\\cdot 60°}=64_{360°}$') },
            { text: say('Bira oso bat 0° da: emaitza erreala da.', 'Una vuelta entera es 0°: el resultado es real.', 'الدورة الكاملة تساوي 0°: النتيجة حقيقية.', 'A whole turn is 0°: the result is real.'), math: same('$64_{360°}=64_{0°}=64$') }
        ],
        takeaway: say('$(r_\\alpha)^n=(r^n)_{n\\alpha}$: modulua $n$ berreturara jasotzen da, eta argumentua bider $n$ egiten da.', '$(r_\\alpha)^n=(r^n)_{n\\alpha}$: el módulo se eleva a $n$ y el argumento se multiplica por $n$.', '$(r_\\alpha)^n=(r^n)_{n\\alpha}$: تُرفع الطويلة إلى الأس $n$ وتُضرب العمدة في $n$.', '$(r_\\alpha)^n=(r^n)_{n\\alpha}$: the modulus is raised to the power $n$ and the argument is multiplied by $n$.'),
        figure: (language) => <PowerSpiralFigure language={language} />
    },

    /* ---------- 5. Roots ---------- */
    {
        id: 'nth-roots',
        stage: 'roots',
        figureAfterSteps: true,
        title: say('Erro n-garrenak', 'Raíces n-ésimas', 'الجذور النونية', 'n-th roots'),
        goal: say('Forma polarrean emandako zenbaki konplexu baten $n$ erro $n$-garrenak aurkitzea.', 'Hallar las $n$ raíces $n$-ésimas de un número complejo en forma polar.', 'إيجاد الجذور النونية الـ $n$ لعدد مركب في الشكل القطبي.', 'Find the $n$ $n$-th roots of a complex number in polar form.'),
        problem: say('Aurkitu $8i$ zenbakiaren erro kubikoak.', 'Halla las raíces cúbicas de $8i$.', 'أوجد الجذور التكعيبية لـ $8i$.', 'Find the cube roots of $8i$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Forma polarrean.', 'En forma polar.', 'في الشكل القطبي.', 'In polar form.'), math: same('$8i=8_{90°}$') },
            { text: say('Erroen modulua moduluaren erro kubikoa da.', 'El módulo de las raíces es la raíz cúbica del módulo.', 'طويلة الجذور هي الجذر التكعيبي للطويلة.', 'The modulus of the roots is the cube root of the modulus.'), math: same('$\\sqrt[3]{8}=2$') },
            { text: say('Argumentuak: batu 360° graduko birak eta zatitu 3 zenbakiaz.', 'Los argumentos: suma vueltas de 360° y divide entre 3.', 'العُمَد: أضف دورات من 360° واقسم على 3.', 'The arguments: add turns of 360° and divide by 3.'), math: same('$\\frac{90°+360°\\cdot k}{3}=30°+120°\\cdot k$') },
            { text: say('$k=0,\\ 1,\\ 2$ balioekin hiru erroak ateratzen dira.', 'Con $k=0,\\ 1,\\ 2$ salen las tres raíces.', 'مع $k=0,\\ 1,\\ 2$ تخرج الجذور الثلاثة.', 'With $k=0,\\ 1,\\ 2$ the three roots come out.'), math: same('$2_{30°}\\qquad 2_{150°}\\qquad 2_{270°}$') }
        ],
        takeaway: say('$r_\\alpha$ zenbakiaren $n$ erroek $\\sqrt[n]{r}$ modulua eta $\\frac{\\alpha+360°\\cdot k}{n}$ argumentuak dituzte, $k=0,\\ 1,\\ \\ldots,\\ n-1$ izanik.', 'Las $n$ raíces de $r_\\alpha$ tienen módulo $\\sqrt[n]{r}$ y argumentos $\\frac{\\alpha+360°\\cdot k}{n}$, con $k=0,\\ 1,\\ \\ldots,\\ n-1$.', 'للجذور الـ $n$ للعدد $r_\\alpha$ الطويلة $\\sqrt[n]{r}$ والعُمَد $\\frac{\\alpha+360°\\cdot k}{n}$ حيث $k=0,\\ 1,\\ \\ldots,\\ n-1$.', 'The $n$ roots of $r_\\alpha$ have modulus $\\sqrt[n]{r}$ and arguments $\\frac{\\alpha+360°\\cdot k}{n}$, with $k=0,\\ 1,\\ \\ldots,\\ n-1$.'),
        figure: (language) => <RootsFigure language={language} kind="cube" />
    },
    {
        id: 'roots-polygons',
        stage: 'roots',
        figureAfterSteps: true,
        title: say('Erroak eta poligono erregularrak', 'Raíces y polígonos regulares', 'الجذور والمضلعات المنتظمة', 'Roots and regular polygons'),
        goal: say('Erro $n$-garrenak poligono erregular baten erpinak direla ikustea, eta hori erpinak aurkitzeko erabiltzea.', 'Ver que las raíces $n$-ésimas son los vértices de un polígono regular y usarlo para hallar vértices.', 'ملاحظة أن الجذور النونية رؤوس مضلع منتظم واستعمال ذلك لإيجاد الرؤوس.', 'See that the $n$-th roots are the vertices of a regular polygon and use it to find vertices.'),
        problem: say('Jatorrian zentratutako triangelu aldeberdin batek erpin bat du $2i$ puntuan. Aurkitu beste biak forma binomikoan.', 'Un triángulo equilátero centrado en el origen tiene un vértice en $2i$. Halla los otros dos en forma binómica.', 'مثلث متساوي الأضلاع مركزه الأصل وأحد رؤوسه $2i$. أوجد الرأسين الآخرين بالشكل الجبري.', 'An equilateral triangle centred at the origin has a vertex at $2i$. Find the other two in binomial form.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Erpinak zenbaki baten erro kubikoak dira: $\\frac{360°}{3}=120°$ banatzen dira.', 'Los vértices son las raíces cúbicas de un número: se separan $\\frac{360°}{3}=120°$.', 'الرؤوس هي الجذور التكعيبية لعدد: تفصل بينها $\\frac{360°}{3}=120°$.', 'The vertices are the cube roots of a number: they are $\\frac{360°}{3}=120°$ apart.'), math: same('$2i=2_{90°}$') },
            { text: say('Batu 120° bi aldiz.', 'Suma 120° dos veces.', 'أضف 120° مرتين.', 'Add 120° twice.'), math: same('$2_{210°}\\qquad 2_{330°}$') },
            { text: say('Forma binomikoan.', 'En forma binómica.', 'بالشكل الجبري.', 'In binomial form.'), math: same('$2_{210°}=-\\sqrt{3}-i\\qquad 2_{330°}=\\sqrt{3}-i$') }
        ],
        takeaway: say('Zenbaki baten $n$ erro $n$-garrenak jatorrian zentratutako $n$ aldeko poligono erregular baten erpinak dira; erpin batetik hurrengora $\\frac{360°}{n}$ biratzen da.', 'Las $n$ raíces $n$-ésimas de un número son los vértices de un polígono regular de $n$ lados centrado en el origen; de un vértice al siguiente se gira $\\frac{360°}{n}$.', 'الجذور النونية الـ $n$ لعدد هي رؤوس مضلع منتظم له $n$ ضلعًا ومركزه الأصل؛ ومن رأس إلى التالي ندور $\\frac{360°}{n}$.', 'The $n$ $n$-th roots of a number are the vertices of a regular polygon with $n$ sides centred at the origin; from one vertex to the next you turn $\\frac{360°}{n}$.'),
        figure: (language) => <RootsFigure language={language} kind="triangle" />
    },
    {
        id: 'binomial-equations',
        stage: 'roots',
        figureAfterSteps: true,
        title: say('Ekuazio binomikoak', 'Ecuaciones binómicas', 'المعادلات ذات الحدين', 'Binomial equations'),
        goal: say('${z}^n=w$ erako ekuazioak ebaztea, $w$ zenbakiaren $n$ erroak aurkituz.', 'Resolver ecuaciones del tipo ${z}^n=w$ hallando las $n$ raíces de $w$.', 'حل معادلات من النوع ${z}^n=w$ بإيجاد الجذور الـ $n$ لـ $w$.', 'Solve equations of the type ${z}^n=w$ by finding the $n$ roots of $w$.'),
        needs: [
            { unit: 'batx1-zientziak/ecuaciones-inecuaciones', topic: 'ruffini-roots', title: { eu: 'Erro osoak eta Ruffini', es: 'Raíces enteras y Ruffini', en: 'Integer roots and Ruffini', ar: 'الجذور الصحيحة وروفيني' } }
        ],
        problem: say('Ebatzi ${z}^3+8=0$ ekuazioa.', 'Resuelve ${z}^3+8=0$.', 'حُلّ ${z}^3+8=0$.', 'Solve ${z}^3+8=0$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Bakandu ${z}^3$, eta pasatu forma polarrera.', 'Despeja ${z}^3$ y pasa a forma polar.', 'اعزل ${z}^3$ وحوّل إلى الشكل القطبي.', 'Isolate ${z}^3$ and turn it into polar form.'), math: same('${z}^3=-8=8_{180°}$') },
            { text: say('Hiru erro kubikoak.', 'Las tres raíces cúbicas.', 'الجذور التكعيبية الثلاثة.', 'The three cube roots.'), math: same('$2_{60°}\\qquad 2_{180°}\\qquad 2_{300°}$') },
            { text: say('Forma binomikoan: bat erreala da, eta beste biak konjokatuak.', 'En forma binómica: una real y dos conjugadas.', 'بالشكل الجبري: حل حقيقي وحلّان مترافقان.', 'In binomial form: one real and two conjugate.'), math: same('$1+\\sqrt{3}\\,i\\qquad -2\\qquad 1-\\sqrt{3}\\,i$') }
        ],
        takeaway: say('${z}^n=w$ ebazteko, $w$ forma polarrean idazten da, eta haren $n$ erro $n$-garrenak aurkitzen dira.', 'Para resolver ${z}^n=w$, se escribe $w$ en forma polar y se hallan sus $n$ raíces $n$-ésimas.', 'لحل ${z}^n=w$ نكتب $w$ بالشكل القطبي ونوجد جذوره النونية الـ $n$.', 'To solve ${z}^n=w$, write $w$ in polar form and find its $n$ $n$-th roots.'),
        figure: (language) => <RootsFigure language={language} kind="equation" />
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts), in each language's names */
export const complexTopics: UnitTopic[] = baseTopics.map((topic) => ({
    ...topic,
    ...localizeNames(complexLessonTexts[topic.id as ComplexTopicId]),
    ...localizeNames(complexLessonChecks[topic.id as ComplexTopicId])
}))

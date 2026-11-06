import type { UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { BinomialSetsFigure, ComplexPlaneFigure, ImaginaryUnitFigure } from './figures'
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
   Basque suffix tests read «$z» as a glued ending.
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
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts), in each language's names */
export const complexTopics: UnitTopic[] = baseTopics.map((topic) => ({
    ...topic,
    ...localizeNames(complexLessonTexts[topic.id as ComplexTopicId]),
    ...localizeNames(complexLessonChecks[topic.id as ComplexTopicId])
}))

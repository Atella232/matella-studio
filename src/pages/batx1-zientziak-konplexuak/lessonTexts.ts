import type { LessonTexts, LocalizedText } from '../../features/unit-v2/types.ts'
import type { ComplexTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Zenbaki konplexuak · Batxilergoa 1 · Zientziak — what each lesson tells:
   the new words (definitions), a short explanation, the example as an
   exercise («Another example»), the key words in four languages, «Why
   does it work?» in five lessons and the cases in three. Plain data so
   the tests can import it; lessons.tsx merges it into the topics.
   Formulas write \sin in every language (so the shared tests see the same
   formulas) and localizeNames gives each language its name. The examples
   use numbers of their own. Tests in tests/lesson-texts.test.ts and
   tests/konplexuak-batx1z-content.test.ts.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const complexLessonTexts: Record<ComplexTopicId, LessonTexts> = {
    /* ---------- 1. New numbers ---------- */
    'imaginary-unit': {
        definitions: [
            { term: say('Unitate irudikaria', 'Unidad imaginaria', 'الوحدة التخيلية', 'Imaginary unit'), meaning: say('Karratua $-1$ duen $i$ zenbakia: $i^2=-1$.', 'El número $i$ cuyo cuadrado es $-1$: $i^2=-1$.', 'العدد $i$ الذي مربعه $-1$: $i^2=-1$.', 'The number $i$ whose square is $-1$: $i^2=-1$.') }
        ],
        vocabulary: [
            say('irudikari hutsa', 'imaginario puro', 'تخيلي صرف', 'purely imaginary'),
            say('erro karratua', 'raíz cuadrada', 'الجذر التربيعي', 'square root')
        ],
        explanation: say(
            'Zenbaki erreal baten karratua ez da inoiz negatiboa; beraz, $x^2=-9$ ekuazioak ez du soluzio errealik. Zenbaki berri bat asmatzen da, $i$ unitate irudikaria, $i^2=-1$ betetzen duena. Horrela, zenbaki negatibo bakoitzak bi erro karratu ditu: $\\sqrt{-16}=4i$, eta baita $-4i$ ere. $i$ unitatearen multiplo errealei irudikari huts esaten zaie.',
            'El cuadrado de un número real nunca es negativo, así que $x^2=-9$ no tiene solución real. Se inventa un número nuevo, la unidad imaginaria $i$, que cumple $i^2=-1$. Así, cada número negativo tiene dos raíces cuadradas: $\\sqrt{-16}=4i$, y también $-4i$. Los múltiplos reales de $i$ se llaman imaginarios puros.',
            'مربع العدد الحقيقي لا يكون سالبًا أبدًا، لذلك ليس للمعادلة $x^2=-9$ حل حقيقي. فنبتكر عددًا جديدًا هو الوحدة التخيلية $i$ التي تحقق $i^2=-1$. وهكذا يكون لكل عدد سالب جذران تربيعيان: $\\sqrt{-16}=4i$ وكذلك $-4i$. وتُسمّى المضاعفات الحقيقية لـ $i$ أعدادًا تخيلية صرفة.',
            'The square of a real number is never negative, so $x^2=-9$ has no real solution. A new number is invented, the imaginary unit $i$, with $i^2=-1$. Then every negative number has two square roots: $\\sqrt{-16}=4i$, and also $-4i$. The real multiples of $i$ are called purely imaginary.'
        ),
        examplePrompt: say('Ebatzi $x^2+49=0$ ekuazioa.', 'Resuelve $x^2+49=0$.', 'حُلّ $x^2+49=0$.', 'Solve $x^2+49=0$.'),
        example: same('$x^2=-49\\qquad x=\\pm\\sqrt{-49}=\\pm 7i$')
    },
    'binomial-form': {
        definitions: [
            { term: say('Zenbaki konplexua', 'Número complejo', 'العدد المركب', 'Complex number'), meaning: say('$a+bi$ erako zenbakia, $a$ eta $b$ errealak izanik; denen multzoa $\\mathbb{C}$ da.', 'Un número $a+bi$ con $a$ y $b$ reales; el conjunto de todos es $\\mathbb{C}$.', 'عدد من الشكل $a+bi$ حيث $a$ و$b$ حقيقيان؛ ومجموعتها كلها $\\mathbb{C}$.', 'A number $a+bi$ with $a$ and $b$ real; the set of all of them is $\\mathbb{C}$.') },
            { term: say('Konjokatua', 'Conjugado', 'المرافق', 'Conjugate'), meaning: say('$a-bi$ zenbakia: zati erreal bera, eta zati irudikaria zeinuz aldatuta.', 'El número $a-bi$: la misma parte real y la imaginaria cambiada de signo.', 'العدد $a-bi$: الجزء الحقيقي نفسه والجزء التخيلي بإشارة معاكسة.', 'The number $a-bi$: the same real part and the imaginary part with its sign changed.') }
        ],
        vocabulary: [
            say('zati erreala', 'parte real', 'الجزء الحقيقي', 'real part'),
            say('aurkakoa', 'opuesto', 'المعاكس', 'opposite')
        ],
        explanation: say(
            'Zenbaki konplexu batek zenbaki erreal bat eta irudikari huts bat batzen ditu: $a+bi$. $a$ zenbakia zati erreala da, eta $b$, zati irudikaria ($i$ gabe). Bi zenbakik izen berezia dute: aurkakoak, $-a-bi$, bi zeinuak aldatzen ditu; konjokatuak, $a-bi$, zati irudikariarena bakarrik.',
            'Un número complejo junta un número real y un imaginario puro: $a+bi$. El número $a$ es la parte real y $b$, la parte imaginaria (sin la $i$). Dos números tienen nombre propio: el opuesto, $-a-bi$, cambia los dos signos; el conjugado, $a-bi$, solo el de la parte imaginaria.',
            'العدد المركب يجمع عددًا حقيقيًا وعددًا تخيليًا صرفًا: $a+bi$. العدد $a$ هو الجزء الحقيقي و$b$ هو الجزء التخيلي (من دون $i$). ولعددين اسم خاص: المعاكس $-a-bi$ يغيّر الإشارتين، والمرافق $a-bi$ يغيّر إشارة الجزء التخيلي فقط.',
            'A complex number puts together a real number and a purely imaginary one: $a+bi$. The number $a$ is the real part and $b$ the imaginary part (without the $i$). Two numbers have their own name: the opposite, $-a-bi$, changes both signs; the conjugate, $a-bi$, only that of the imaginary part.'
        ),
        cases: [
            { title: say('Zenbaki errealak', 'Números reales', 'الأعداد الحقيقية', 'Real numbers'), text: say('$b=0$ bada, zenbakia erreala da: errealak konplexuen barruan daude.', 'Si $b=0$, el número es real: los reales están dentro de los complejos.', 'إذا كان $b=0$ فالعدد حقيقي: الأعداد الحقيقية داخل الأعداد المركبة.', 'If $b=0$, the number is real: the reals are inside the complex numbers.'), math: same('$5=5+0i$') },
            { title: say('Irudikari hutsak', 'Imaginarios puros', 'التخيلية الصرفة', 'Purely imaginary'), text: say('$a=0$ eta $b\\neq 0$ badira, irudikari hutsa da.', 'Si $a=0$ y $b\\neq 0$, es imaginario puro.', 'إذا كان $a=0$ و$b\\neq 0$ فهو تخيلي صرف.', 'If $a=0$ and $b\\neq 0$, it is purely imaginary.'), math: same('$-3i=0-3i$') },
            { title: say('Bi zenbaki berdinak', 'Dos números iguales', 'عددان متساويان', 'Two equal numbers'), text: say('Zati erreal bera eta zati irudikari bera dituzte.', 'Tienen la misma parte real y la misma parte imaginaria.', 'لهما الجزء الحقيقي نفسه والجزء التخيلي نفسه.', 'They have the same real part and the same imaginary part.'), math: same('$a+bi=4-i\\ \\to\\ a=4,\\ b=-1$') }
        ],
        examplePrompt: say('Idatzi $4-3i$ zenbakiaren aurkakoa eta konjokatua.', 'Escribe el opuesto y el conjugado de $4-3i$.', 'اكتب معاكس $4-3i$ ومرافقه.', 'Write the opposite and the conjugate of $4-3i$.'),
        example: same('$-(4-3i)=-4+3i\\qquad\\overline{4-3i}=4+3i$')
    },
    'complex-plane': {
        definitions: [
            { term: say('Afixua', 'Afijo', 'الصورة', 'Affix'), meaning: say('$a+bi$ zenbakia irudikatzen duen $(a,\\ b)$ puntua.', 'El punto $(a,\\ b)$ que representa al número $a+bi$.', 'النقطة $(a,\\ b)$ التي تمثل العدد $a+bi$.', 'The point $(a,\\ b)$ that stands for the number $a+bi$.') }
        ],
        vocabulary: [
            say('ardatz erreala', 'eje real', 'المحور الحقيقي', 'real axis'),
            say('simetrikoa', 'simétrico', 'متناظر', 'symmetric')
        ],
        explanation: say(
            'Zenbaki konplexu bakoitza planoko puntu bat da: zati erreala ardatz horizontalean, ardatz errealean, eta zati irudikaria ardatz bertikalean, ardatz irudikarian. Errealak ardatz horizontalean daude, eta irudikari hutsak bertikalean. Puntu hori bektore bat ere bada: horregatik, konplexuak batzea bektoreak batzea da.',
            'Cada número complejo es un punto del plano: la parte real en el eje horizontal, el eje real, y la imaginaria en el vertical, el eje imaginario. Los reales quedan sobre el eje horizontal y los imaginarios puros sobre el vertical. Ese punto es también un vector: por eso, sumar complejos es sumar vectores.',
            'كل عدد مركب نقطة في المستوى: الجزء الحقيقي على المحور الأفقي، وهو المحور الحقيقي، والجزء التخيلي على العمودي، وهو المحور التخيلي. وتقع الأعداد الحقيقية على المحور الأفقي والتخيلية الصرفة على العمودي. وهذه النقطة متجه أيضًا، ولذلك فجمع الأعداد المركبة هو جمع متجهات.',
            'Each complex number is a point of the plane: the real part on the horizontal axis, the real axis, and the imaginary part on the vertical one, the imaginary axis. The reals lie on the horizontal axis and the purely imaginary numbers on the vertical one. That point is also a vector: that is why adding complex numbers is adding vectors.'
        ),
        examplePrompt: say('Non dago $-1+4i$ zenbakiaren afixua? Eta haren aurkakoarena?', '¿Dónde está el afijo de $-1+4i$? ¿Y el de su opuesto?', 'أين صورة $-1+4i$؟ وأين صورة معاكسه؟', 'Where is the affix of $-1+4i$? And that of its opposite?'),
        example: same('$-1+4i\\ \\to\\ (-1,\\ 4)\\qquad 1-4i\\ \\to\\ (1,\\ -4)$')
    }
}

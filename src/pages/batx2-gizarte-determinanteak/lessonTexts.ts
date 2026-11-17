import type { LessonTexts, LocalizedText } from '../../features/unit-v2/types.ts'
import type { GizarteDeterminanteakTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Determinanteak · Batxilergoa 2 · Gizarte Zientziak — what the lesson of
   this unit tells: the new words, a short explanation, the example as an
   exercise, the key words and «Why does it work?». Plain data so the tests
   can import it; lessons.tsx merges it into the topic. The example uses
   numbers of its own.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const gizarteDeterminanteakLessonTexts: Record<GizarteDeterminanteakTopicId, LessonTexts> = {
    'unique-prices': {
        definitions: [
            { term: say('Matrize erregularra', 'Matriz regular', 'مصفوفة نظامية', 'Regular matrix'), meaning: say('Determinantea zero ez duen matrize karratua; alderantzizkoa du.', 'Matriz cuadrada cuyo determinante no es cero; tiene inversa.', 'مصفوفة مربعة محددها ليس صفرًا؛ لها معكوس.', 'A square matrix whose determinant is not zero; it has an inverse.') },
            { term: say('Matrize singularra', 'Matriz singular', 'مصفوفة شاذة', 'Singular matrix'), meaning: say('Determinantea zero duen matrize karratua; ez du alderantzizkorik.', 'Matriz cuadrada cuyo determinante es cero; no tiene inversa.', 'مصفوفة مربعة محددها صفر؛ ليس لها معكوس.', 'A square matrix whose determinant is zero; it has no inverse.') }
        ],
        vocabulary: [
            say('sorta', 'lote', 'مجموعة', 'bundle'),
            say('prezio bakarrak', 'precios únicos', 'أسعار وحيدة', 'unique prices'),
            say('datu nahikoak', 'datos suficientes', 'معطيات كافية', 'enough data')
        ],
        explanation: say(
            'Sorten prezioek sistema bat osatzen dute, $AX=B$, eta $A$ matrizean sorta bakoitzaren kopuruak daude. $|A|\\neq 0$ bada, $A$ matrizeak alderantzizkoa du eta prezioak bakarrak dira. $|A|=0$ bada, sorta bat beste baten multiploa da, eta datuak ez dira nahikoak prezioak finkatzeko.',
            'Los precios de los lotes forman un sistema $AX=B$, con las cantidades de cada lote en $A$. Si $|A|\\neq 0$, $A$ tiene inversa y los precios son únicos. Si $|A|=0$, un lote es múltiplo de otro y los datos no bastan para fijar los precios.',
            'تكوّن أسعار المجموعات نظامًا $AX=B$، وكميات كل مجموعة في $A$. إذا كان $|A|\\neq 0$ فلـ $A$ معكوس والأسعار وحيدة. وإذا كان $|A|=0$ فإحدى المجموعات مضاعف لأخرى والمعطيات لا تكفي لتحديد الأسعار.',
            'The prices of the bundles make a system $AX=B$, with the quantities of each bundle in $A$. If $|A|\\neq 0$, $A$ has an inverse and the prices are unique. If $|A|=0$, one bundle is a multiple of another and the data are not enough to fix the prices.'
        ),
        examplePrompt: say(
            'Sortak: $(2,a)$ eta $(6,9)$ kilo laranja eta limoi. Zein $a$ baliotarako ez dira prezioak ondorioztatzen?',
            'Lotes de $(2,a)$ y $(6,9)$ kilos de naranjas y limones. ¿Para qué $a$ no se deducen los precios?',
            'مجموعتان من $(2,a)$ و$(6,9)$ كيلوغرامات من البرتقال والليمون. لأي $a$ لا تُستنتج الأسعار؟',
            'Bundles of $(2,a)$ and $(6,9)$ kilos of oranges and lemons. For which $a$ can the prices not be found?'
        ),
        example: same('$\\begin{vmatrix}2&a\\\\6&9\\end{vmatrix}=18-6a=0\\ \\to\\ a=3$'),
        exampleAnswer: say(
            '$a=3$ denean, $2\\cdot 9-3\\cdot 6=0$: bigarren sorta lehenaren hirukoitza da. Beste edozein $a$ baliotarako, prezioak bakarrak dira.',
            'Con $a=3$, $2\\cdot 9-3\\cdot 6=0$: el segundo lote es el triple del primero. Con cualquier otro $a$, los precios son únicos.',
            'مع $a=3$ يكون $2\\cdot 9-3\\cdot 6=0$: المجموعة الثانية ثلاثة أضعاف الأولى. ومع أي $a$ آخر تكون الأسعار وحيدة.',
            'With $a=3$, $2\\cdot 9-3\\cdot 6=0$: the second bundle is three times the first. With any other $a$, the prices are unique.'
        ),
        why: {
            text: say(
                'Zergatik $|A|$? $|A|\\neq 0$ bada, $A^{-1}$ badago, eta $AX=B$ ezkerretik $A^{-1}$ matrizeaz biderkatuz $X$ bakarra ateratzen da.',
                '¿Por qué $|A|$? Si $|A|\\neq 0$, existe $A^{-1}$, y al multiplicar $AX=B$ por $A^{-1}$ por la izquierda sale una sola $X$.',
                'لماذا $|A|$؟ إذا كان $|A|\\neq 0$ يوجد $A^{-1}$، وبضرب $AX=B$ في $A^{-1}$ من اليسار يخرج $X$ واحد.',
                'Why $|A|$? If $|A|\\neq 0$, $A^{-1}$ exists, and multiplying $AX=B$ by $A^{-1}$ on the left gives a single $X$.'
            ),
            math: same('$|A|\\neq 0\\ \\to\\ X=A^{-1}B$')
        }
    }
}

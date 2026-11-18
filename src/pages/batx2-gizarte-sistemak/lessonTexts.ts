import type { LessonTexts, LocalizedText } from '../../features/unit-v2/types.ts'
import type { GizarteSistemakTopicId } from './lessonChecks.ts'

/* ==========================================================================
   Sistemak · Batxilergoa 2 · Gizarte Zientziak — what the two lessons of
   this unit tell: the new words, a short explanation, the example as an
   exercise, the key words and «Why does it work?». Plain data so the tests
   can import it; lessons.tsx merges it into the topics. The examples use
   numbers of their own.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const gizarteSistemakLessonTexts: Record<GizarteSistemakTopicId, LessonTexts> = {
    'prices-how-many': {
        definitions: [
            { term: say('Datu kontraesankorrak', 'Datos contradictorios', 'معطيات متناقضة', 'Contradictory data'), meaning: say('Aldi berean egia izan ezin diren datuak: sistema bateraezina da.', 'Datos que no pueden ser ciertos a la vez: el sistema es incompatible.', 'معطيات لا يمكن أن تصحّ معًا: النظام غير متوافق.', 'Data that cannot all be true at once: the system is inconsistent.') }
        ],
        vocabulary: [
            say('bateragarri determinatua', 'compatible determinado', 'متوافق محدد', 'consistent, one solution'),
            say('bateragarri indeterminatua', 'compatible indeterminado', 'متوافق غير محدد', 'consistent, many solutions'),
            say('bateraezina', 'incompatible', 'غير متوافق', 'inconsistent')
        ],
        explanation: say(
            'Sorta bakoitza ekuazio bat da. Rouchéren teoremak esaten du zenbat prezio-multzo dauden: $\\operatorname{rg}(A)\\neq\\operatorname{rg}(A^*)$ bada, bat ere ez (datuak ez datoz bat); heinak berdinak eta produktu-kopurua badira, bat (bateragarri determinatua); berdinak baina txikiagoak badira, infinitu (bateragarri indeterminatua: datuak falta dira).',
            'Cada lote es una ecuación. El teorema de Rouché dice cuántos juegos de precios hay: si $\\operatorname{rg}(A)\\neq\\operatorname{rg}(A^*)$, ninguno (los datos no cuadran); si son iguales al número de productos, uno; si son iguales pero menores, infinitos (faltan datos).',
            'كل مجموعة معادلة. تقول مبرهنة روشيه كم مجموعة أسعار توجد: إذا كان $\\operatorname{rg}(A)\\neq\\operatorname{rg}(A^*)$ فلا شيء (المعطيات لا تتوافق)؛ وإذا تساوتا مع عدد المنتجات فواحدة؛ وإذا تساوتا وكانتا أصغر فلا نهائية (تنقص معطيات).',
            'Each bundle is an equation. Rouché\'s theorem says how many sets of prices there are: if $\\operatorname{rg}(A)\\neq\\operatorname{rg}(A^*)$, none (the data do not fit); if they are equal to the number of products, one; if equal but smaller, infinitely many (data are missing).'
        ),
        examplePrompt: say(
            'Sortak: $(1,2)$ 7 euro, $(2,1)$ 8 euro eta $(1,1)$ 6 euro. Ba al dago preziorik?',
            'Lotes: $(1,2)$ a 7 €, $(2,1)$ a 8 € y $(1,1)$ a 6 €. ¿Hay precios?',
            'المجموعات: $(1,2)$ بـ 7 € و$(2,1)$ بـ 8 € و$(1,1)$ بـ 6 €. هل توجد أسعار؟',
            'Bundles: $(1,2)$ at €7, $(2,1)$ at €8 and $(1,1)$ at €6. Are there prices?'
        ),
        example: same('$|A^*|=\\begin{vmatrix}1&2&7\\\\2&1&8\\\\1&1&6\\end{vmatrix}=-3\\neq 0$'),
        exampleAnswer: say(
            '$\\operatorname{rg}(A)=2$ eta $\\operatorname{rg}(A^*)=3$: ez dago preziorik. Lehen bi sortek $x=3$ eta $y=2$ ematen dute, baina orduan $3+2=5$ litzateke hirugarrena, ez 6.',
            '$\\operatorname{rg}(A)=2$ y $\\operatorname{rg}(A^*)=3$: no hay precios. Los dos primeros lotes dan $x=3$ e $y=2$, pero entonces el tercero costaría $3+2=5$, no 6.',
            '$\\operatorname{rg}(A)=2$ و$\\operatorname{rg}(A^*)=3$: لا توجد أسعار. تعطي المجموعتان الأوليان $x=3$ و$y=2$، لكن عندئذ تكلّف الثالثة $3+2=5$ لا 6.',
            '$\\operatorname{rg}(A)=2$ and $\\operatorname{rg}(A^*)=3$: there are no prices. The first two bundles give $x=3$ and $y=2$, but then the third would cost $3+2=5$, not 6.'
        ),
        why: {
            text: say(
                'Zergatik? $B$ zutabea $A$ matrizearen zutabeen konbinazioa denean bakarrik dago soluziorik; orduan ez du heina igotzen.',
                '¿Por qué? Solo hay solución si la columna $B$ es combinación de las columnas de $A$; entonces no sube el rango.',
                'لماذا؟ لا يوجد حل إلا إذا كان العمود $B$ تركيبًا من أعمدة $A$؛ وعندئذ لا ترتفع الرتبة.',
                'Why? There is a solution only if the column $B$ is a combination of the columns of $A$; then it does not raise the rank.'
            ),
            math: same('$xA_1+yA_2=B\\ \\to\\ \\operatorname{rg}(A^*)=\\operatorname{rg}(A)$')
        }
    },
    'statement-system': {
        definitions: [
            { term: say('Ezezaguna', 'Incógnita', 'المجهول', 'Unknown'), meaning: say('Aurkitu behar den kopurua; letra batekin eta bere unitatearekin izendatzen da.', 'La cantidad que hay que hallar; se nombra con una letra y su unidad.', 'الكمية المطلوبة؛ تُسمّى بحرف ومع وحدتها.', 'The amount to be found; it is named with a letter and its unit.') }
        ],
        vocabulary: [
            say('bikoitza', 'el doble', 'الضعف', 'twice'),
            say('guztira', 'en total', 'إجمالًا', 'in total'),
            say('baino gehiago', 'más que', 'أكثر من', 'more than')
        ],
        explanation: say(
            'Lehenik, izendatu ezezagunak, unitatearekin. Gero, esaldi bakoitza ekuazio bat da: «guztira» batuketa da, «bikoitza» bider bi, eta «baino 6 gehiago» +6, txikiaren aldean. Ebatzi Gaussen metodoaz eta egiaztatu emaitza esaldi bakoitzean.',
            'Primero nombra las incógnitas, con su unidad. Después, cada frase es una ecuación: «en total» es una suma, «el doble» es por dos y «6 más que» es +6 en el lado de la pequeña. Resuelve por Gauss y comprueba el resultado en cada frase.',
            'أولًا سمِّ المجاهيل مع وحدتها. ثم كل جملة معادلة: «إجمالًا» جمع، و«الضعف» ضرب في اثنين، و«أكثر بـ 6» إضافة 6 إلى جهة الأصغر. حُلّ بطريقة غاوس وتحقق من النتيجة في كل جملة.',
            'First name the unknowns, with their unit. Then each sentence is an equation: «in total» is a sum, «twice» is times two and «6 more than» is +6 on the side of the smaller one. Solve by Gauss and check the result in each sentence.'
        ),
        examplePrompt: say(
            '20 galderako azterketa: asmatzeak 3 puntu, hutsak $-1$ eta zuriak 0. Ikasle batek 32 puntu ditu, eta hainbat huts eta zuri. Zenbat asmatu ditu?',
            'Examen de 20 preguntas: acierto 3 puntos, fallo $-1$ y en blanco 0. Un alumno saca 32 puntos con tantos fallos como blancos. ¿Cuántos aciertos?',
            'امتحان من 20 سؤالًا: الإجابة الصحيحة 3 نقاط والخاطئة $-1$ والفارغة 0. حصل طالب على 32 نقطة وعدد أخطائه يساوي عدد الفارغة. كم إجابة صحيحة؟',
            'A 20-question exam: a right answer scores 3, a wrong one $-1$ and a blank 0. A student scores 32 with as many wrong as blank. How many right answers?'
        ),
        example: same('$\\begin{cases}a+f+b=20\\\\ 3a-f=32\\\\ b=f\\end{cases}\\ \\to\\ a=12,\\ f=4,\\ b=4$'),
        exampleAnswer: say(
            '12 asmatu. Egiaztatu: $12+4+4=20$ eta $3\\cdot 12-4=32$.',
            '12 aciertos. Comprueba: $12+4+4=20$ y $3\\cdot 12-4=32$.',
            '12 إجابة صحيحة. تحقق: $12+4+4=20$ و$3\\cdot 12-4=32$.',
            '12 right answers. Check: $12+4+4=20$ and $3\\cdot 12-4=32$.'
        )
    }
}

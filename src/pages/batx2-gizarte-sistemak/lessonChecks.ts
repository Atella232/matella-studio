import type { LessonCheck, LessonMistake, LocalizedText } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Sistemak · Batxilergoa 2 · Gizarte Zientziak — the typical mistake and
   the «Check it» question of the two lessons of this unit (the others come
   from the Ciencias twins with their own). Plain data so the tests can
   import it; lessons.tsx merges it into the topics. New numbers, never
   those of «Let's solve» or of the example.
   ========================================================================== */

export type GizarteSistemakTopicId = 'prices-how-many' | 'statement-system'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const gizarteSistemakLessonChecks: Record<GizarteSistemakTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    'prices-how-many': {
        mistake: {
            wrong: say(
                'Hiru sorta ditut eta bi prezio falta: ekuazio gehiago daude ezezagunak baino; beraz, sistemak ez du soluziorik.',
                'Tengo tres lotes y faltan dos precios: hay más ecuaciones que incógnitas, así que el sistema no tiene solución.',
                'لديّ ثلاث مجموعات وينقص سعران: المعادلات أكثر من المجاهيل، إذن ليس للنظام حل.',
                'I have three bundles and two prices are missing: there are more equations than unknowns, so the system has no solution.'
            ),
            right: say(
                'Ekuazioak zenbatzea ez da nahikoa: konparatu $\\operatorname{rg}(A)$ eta $\\operatorname{rg}(A^*)$. Hirugarren sortak beste biekin bat badator, bi heinak 2 dira, eta prezioak bakarrak dira.',
                'Contar ecuaciones no basta: compara $\\operatorname{rg}(A)$ y $\\operatorname{rg}(A^*)$. Si el tercer lote cuadra con los otros dos, los dos rangos valen 2 y los precios son únicos.',
                'عدّ المعادلات لا يكفي: قارن $\\operatorname{rg}(A)$ و$\\operatorname{rg}(A^*)$. إذا توافقت المجموعة الثالثة مع الأخريين فالرتبتان تساويان 2 والأسعار وحيدة.',
                'Counting equations is not enough: compare $\\operatorname{rg}(A)$ and $\\operatorname{rg}(A^*)$. If the third bundle fits the other two, both ranks are 2 and the prices are unique.'
            )
        },
        check: {
            prompt: say(
                'Bi produktuko hiru sortatan, $\\operatorname{rg}(A)=2$ eta $\\operatorname{rg}(A^*)=3$ dira. Zer esan daiteke prezioei buruz?',
                'En tres lotes de dos productos, $\\operatorname{rg}(A)=2$ y $\\operatorname{rg}(A^*)=3$. ¿Qué se puede decir de los precios?',
                'في ثلاث مجموعات من منتجين، $\\operatorname{rg}(A)=2$ و$\\operatorname{rg}(A^*)=3$. ماذا يمكن القول عن الأسعار؟',
                'In three bundles of two products, $\\operatorname{rg}(A)=2$ and $\\operatorname{rg}(A^*)=3$. What can be said about the prices?'
            ),
            options: [
                say('Bakarrak dira', 'Son únicos', 'إنها وحيدة', 'They are unique'),
                say('Infinitu aukera daude', 'Hay infinitas posibilidades', 'توجد احتمالات لا نهائية', 'There are infinitely many possibilities'),
                say('Datuak ez datoz bat: ez dago preziorik', 'Los datos no cuadran: no hay precios', 'المعطيات لا تتوافق: لا توجد أسعار', 'The data do not fit: there are no prices')
            ],
            correctIndex: 2,
            explanation: say(
                '$\\operatorname{rg}(A)\\neq\\operatorname{rg}(A^*)$: sistema bateraezina. Hiru sortak ezin dira egia izan aldi berean.',
                '$\\operatorname{rg}(A)\\neq\\operatorname{rg}(A^*)$: sistema incompatible. Los tres lotes no pueden ser ciertos a la vez.',
                '$\\operatorname{rg}(A)\\neq\\operatorname{rg}(A^*)$: نظام غير متوافق. لا يمكن أن تصحّ المجموعات الثلاث معًا.',
                '$\\operatorname{rg}(A)\\neq\\operatorname{rg}(A^*)$: an inconsistent system. The three bundles cannot all be true at once.'
            )
        }
    },
    'statement-system': {
        mistake: {
            wrong: say(
                '$x$ A fondoan jarritakoa eta $y$ B fondoan jarritakoa dira. «B fondoan, A fondoan beste bikoitza»: $x=2y$ idatzi dut.',
                '$x$ es lo que va al fondo A e $y$ lo del fondo B. «En B, el doble que en A»: he escrito $x=2y$.',
                '$x$ هو ما يوضع في الصندوق A و$y$ ما يوضع في الصندوق B. «في B ضعف ما في A»: كتبتُ $x=2y$.',
                '$x$ is what goes into fund A and $y$ into fund B. «Twice as much in B as in A»: I wrote $x=2y$.'
            ),
            right: say(
                '«B fondoan A fondoan bezainbeste bider bi» esaldian, bikoiztu egiten dena A da: $y=2x$. Egiaztatu zenbaki batekin: $x=5$ bada, $y=10$.',
                'En «en B el doble que en A», lo que se dobla es A: $y=2x$. Compruébalo con un número: si $x=5$, $y=10$.',
                'في «في B ضعف ما في A» الذي يُضاعف هو A: $y=2x$. تحقق بعدد: إذا كان $x=5$ فإن $y=10$.',
                'In «twice as much in B as in A», what is doubled is A: $y=2x$. Check with a number: if $x=5$, $y=10$.'
            )
        },
        check: {
            prompt: say(
                'Denda batek kafe-kiloak ($x$) eta te-kiloak ($y$) saltzen ditu. «Tea kafea baino 4 kilo gutxiago saldu da.» Zein da ekuazioa?',
                'Una tienda vende kilos de café ($x$) y de té ($y$). «Se han vendido 4 kilos menos de té que de café.» ¿Cuál es la ecuación?',
                'يبيع متجر كيلوغرامات من القهوة ($x$) ومن الشاي ($y$). «بيع من الشاي 4 كيلوغرامات أقل من القهوة.» ما المعادلة؟',
                'A shop sells kilos of coffee ($x$) and of tea ($y$). «4 kilos less tea than coffee have been sold.» What is the equation?'
            ),
            options: [same('$y=x-4$'), same('$x=y-4$'), same('$x+y=4$')],
            correctIndex: 0,
            explanation: say(
                'Tea da gutxiago: kafeari 4 kendu: $y=x-4$. Adibidez, 10 kilo kafe eta 6 kilo te.',
                'El té es lo que hay menos: al café se le quitan 4, $y=x-4$. Por ejemplo, 10 kilos de café y 6 de té.',
                'الشاي هو الأقل: نطرح 4 من القهوة، $y=x-4$. مثلًا 10 كيلوغرامات قهوة و6 شاي.',
                'Tea is the smaller one: take 4 from the coffee, $y=x-4$. For example, 10 kilos of coffee and 6 of tea.'
            )
        }
    }
}

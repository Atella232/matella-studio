import type { LessonCheck, LessonMistake, LocalizedText } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Aljebra · Batxilergoa 1 · Gizarte Zientziak — the typical mistake and the
   «Check it» question of the four lessons of its own. The other thirteen
   come from 1.º Ciencias with their own mistakes and questions. Plain data
   (no JSX) so the tests can import it.
   ========================================================================== */

export type GizAlgebraTopicId = 'money-systems' | 'break-even' | 'supply-demand' | 'budget-region'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const gizAlgebraLessonChecks: Record<GizAlgebraTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    'money-systems': {
        mistake: {
            wrong: say('$x+y+z=100$ eta $2x+3y+5z=300$ ekuazioekin ebatz daiteke.', 'Con $x+y+z=100$ y $2x+3y+5z=300$ ya se puede resolver.', 'بالمعادلتين $x+y+z=100$ و$2x+3y+5z=300$ يمكن الحل.', 'With $x+y+z=100$ and $2x+3y+5z=300$ it can already be solved.'),
            right: say('Hiru ezezaguneko bi ekuazioek infinitu soluzio dituzte: hirugarren datu bat behar da.', 'Dos ecuaciones con tres incógnitas tienen infinitas soluciones: hace falta un tercer dato.', 'معادلتان بثلاثة مجاهيل لهما حلول لا نهائية: نحتاج إلى معطى ثالث.', 'Two equations in three unknowns have infinitely many solutions: a third fact is needed.')
        },
        check: {
            prompt: say('1 eta 2 euroko 50 txanpon daude, eta 80 euro balio dute. Zenbat dira 2 eurokoak?', 'Hay 50 monedas de 1 y 2 euros que valen 80 euros. ¿Cuántas monedas de 2 euros hay?', 'توجد 50 قطعة نقدية من فئة 1 و2 يورو قيمتها 80 يورو. كم قطعة من فئة 2 يورو؟', 'There are 50 coins of 1 and 2 euros worth 80 euros. How many 2-euro coins are there?'),
            options: [same('$20$'), same('$30$'), same('$40$')],
            correctIndex: 1,
            explanation: say('$x+y=50$ eta $x+2y=80$: kenduta, $y=30$.', '$x+y=50$ y $x+2y=80$: restando, $y=30$.', '$x+y=50$ و$x+2y=80$: بالطرح $y=30$.', '$x+y=50$ and $x+2y=80$: subtracting, $y=30$.')
        }
    },
    'break-even': {
        mistake: {
            wrong: say('Kostu finkoak 600 euro, unitateko kostua 4 euro eta prezioa 10 euro: $x=\\frac{600}{10}=60$.', 'Costes fijos 600 euros, coste por unidad 4 euros y precio 10 euros: $x=\\frac{600}{10}=60$.', 'تكاليف ثابتة 600 يورو، وتكلفة الوحدة 4 يورو، والسعر 10 يورو: $x=\\frac{600}{10}=60$.', 'Fixed costs 600 euros, cost per unit 4 euros and price 10 euros: $x=\\frac{600}{10}=60$.'),
            right: say('Unitate bakoitzak $10-4=6$ euro uzten ditu kostu finkoak ordaintzeko: $x=\\frac{600}{6}=100$.', 'Cada unidad deja $10-4=6$ euros para pagar los costes fijos: $x=\\frac{600}{6}=100$.', 'كل وحدة تترك $10-4=6$ يورو لدفع التكاليف الثابتة: $x=\\frac{600}{6}=100$.', 'Each unit leaves $10-4=6$ euros to pay the fixed costs: $x=\\frac{600}{6}=100$.')
        },
        check: {
            prompt: say('Kostu finkoak 900 euro dira, unitateko kostua 2 euro eta prezioa 5 euro. Zein da atalasea?', 'Costes fijos de 900 euros, coste por unidad de 2 euros y precio de 5 euros. ¿Cuál es el punto muerto?', 'التكاليف الثابتة 900 يورو، وتكلفة الوحدة 2 يورو، والسعر 5 يورو. ما نقطة التعادل؟', 'Fixed costs of 900 euros, a cost per unit of 2 euros and a price of 5 euros. What is the break-even point?'),
            options: [same('$300$'), same('$180$'), same('$450$')],
            correctIndex: 0,
            explanation: say('Unitate bakoitzak $5-2=3$ euro uzten ditu: $x=\\frac{900}{3}=300$ unitate.', 'Cada unidad deja $5-2=3$ euros: $x=\\frac{900}{3}=300$ unidades.', 'كل وحدة تترك $5-2=3$ يورو: $x=\\frac{900}{3}=300$ وحدة.', 'Each unit leaves $5-2=3$ euros: $x=\\frac{900}{3}=300$ units.')
        }
    },
    'supply-demand': {
        mistake: {
            wrong: say('Prezioa oreka-prezioaren gainetik igotzen bada, produktua falta da.', 'Si el precio sube por encima del de equilibrio, falta producto.', 'إذا ارتفع السعر فوق سعر التوازن ينقص المنتج.', 'If the price goes above the equilibrium price, there is not enough product.'),
            right: say('Orekaren gainetik eskaintza eskaria baino handiagoa da: produktua soberan dago (soberakina).', 'Por encima del equilibrio la oferta supera a la demanda: sobra producto (excedente).', 'فوق التوازن يتجاوز العرض الطلب: يفيض المنتج (فائض).', 'Above equilibrium, supply is greater than demand: there is product left over (a surplus).')
        },
        check: {
            prompt: {
                eu: '$p$ euroko prezioan, eskaria $120-2p$ unitate da, eta eskaintza $3p-30$. Zein da oreka-prezioa?',
                es: 'A un precio de $p$ euros, la demanda es de $120-2p$ unidades y la oferta, de $3p-30$. ¿Cuál es el precio de equilibrio?',
                en: 'At a price of $p$ euros, demand is $120-2p$ units and supply is $3p-30$. What is the equilibrium price?',
                ar: 'بسعر $p$ يورو يكون الطلب $120-2p$ وحدة والعرض $3p-30$. ما سعر التوازن؟'
            },
            options: [same('$24$'), same('$18$'), same('$30$')],
            correctIndex: 2,
            explanation: same('$120-2p=3p-30\\ \\to\\ 150=5p\\ \\to\\ p=30$')
        }
    },
    'budget-region': {
        mistake: {
            wrong: say('$(40,\\,4)$ puntuak $20x+50y\\le 1000$ betetzen du; beraz, plana posible da.', 'El punto $(40,\\,4)$ cumple $20x+50y\\le 1000$, así que el plan es posible.', 'النقطة $(40,\\,4)$ تحقق $20x+50y\\le 1000$، إذن الخطة ممكنة.', 'The point $(40,\\,4)$ meets $20x+50y\\le 1000$, so the plan is possible.'),
            right: say('Murrizketa guztiak egiaztatu behar dira. Orduetan $2\\cdot 40+4\\cdot 4=96$, eta hori 90 baino gehiago da: ez da sartzen.', 'Hay que comprobar todas las restricciones. En horas, $2\\cdot 40+4\\cdot 4=96$, más de 90: no cabe.', 'يجب التحقق من كل القيود. في الساعات $2\\cdot 40+4\\cdot 4=96$، أي أكثر من 90: لا تتسع.', 'All the constraints must be checked. In hours, $2\\cdot 40+4\\cdot 4=96$, more than 90: it does not fit.')
        },
        check: {
            prompt: say('$x+y\\le 10$ eta $2x+y\\le 14$ badira, zein puntu da posible?', 'Con $x+y\\le 10$ y $2x+y\\le 14$, ¿qué punto es posible?', 'مع $x+y\\le 10$ و$2x+y\\le 14$، أيّ نقطة ممكنة؟', 'With $x+y\\le 10$ and $2x+y\\le 14$, which point is possible?'),
            options: [same('$(5,\\,6)$'), same('$(3,\\,6)$'), same('$(6,\\,3)$')],
            correctIndex: 1,
            explanation: say('$(3,\\,6)$: $3+6=9$ eta $6+6=12$, biak betetzen ditu. $(5,\\,6)$ puntuak 11 ematen du lehenengoan, eta $(6,\\,3)$ puntuak 15 bigarrenean.', '$(3,\\,6)$: $3+6=9$ y $6+6=12$, cumple las dos. $(5,\\,6)$ da 11 en la primera y $(6,\\,3)$ da 15 en la segunda.', '$(3,\\,6)$: ‏$3+6=9$ و$6+6=12$، تحقق القيدين. والنقطة $(5,\\,6)$ تعطي 11 في الأول، و$(6,\\,3)$ تعطي 15 في الثاني.', '$(3,\\,6)$: $3+6=9$ and $6+6=12$, it meets both. $(5,\\,6)$ gives 11 in the first and $(6,\\,3)$ gives 15 in the second.')
        }
    }
}

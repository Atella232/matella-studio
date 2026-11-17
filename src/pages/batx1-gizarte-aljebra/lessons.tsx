import type { LocalizedText, UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { bachEquationsTopics } from '../batx1-zientziak-ekuazioak/lessons'
import { bachSystemsTopics } from '../batx1-zientziak-sistemak/lessons'
import { BreakEvenFigure, BudgetRegionFigure, SupplyDemandFigure } from './figures'
import { gizAlgebraLessonChecks, type GizAlgebraTopicId } from './lessonChecks'
import { gizAlgebraLessonTexts } from './lessonTexts'

/* ==========================================================================
   Aljebra · Batxilergoa 1 · Gizarte Zientziak — stages and lessons, in the
   order of unit 3 of Anaya Matemáticas aplicadas a las Ciencias Sociales I:
   polynomials and algebraic fractions, equations, systems, inequalities and
   the algebra of economics. Thirteen lessons come from 1.º Ciencias,
   imported unchanged in another stage; four are of this unit (problems
   with three unknowns and money, the break-even point, supply and demand,
   and the budget region).
   ========================================================================== */

export type GizAlgebraStageId = 'polynomials' | 'equations' | 'systems' | 'inequalities' | 'economy'

export const gizAlgebraStages: UnitStage[] = [
    { id: 'polynomials', tone: 'blue', title: { eu: 'Polinomioak eta zatiki aljebraikoak', es: 'Polinomios y fracciones', en: 'Polynomials and fractions', ar: 'كثيرات الحدود والكسور' } },
    { id: 'equations', tone: 'violet', title: { eu: 'Ekuazioak', es: 'Ecuaciones', en: 'Equations', ar: 'المعادلات' } },
    { id: 'systems', tone: 'mustard', title: { eu: 'Sistemak', es: 'Sistemas', en: 'Systems', ar: 'الأنظمة' } },
    { id: 'inequalities', tone: 'green', title: { eu: 'Inekuazioak', es: 'Inecuaciones', en: 'Inequalities', ar: 'المتراجحات' } },
    { id: 'economy', tone: 'coral', title: { eu: 'Ekonomiaren aljebra', es: 'Álgebra de la economía', en: 'The algebra of economics', ar: 'جبر الاقتصاد' } }
]

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })

/** A lesson of another unit, unchanged, in a stage of this unit */
function borrowed(topics: UnitTopic[], id: string, stage: GizAlgebraStageId): UnitTopic {
    const topic = topics.find((item) => item.id === id)
    if (!topic) throw new Error(`No lesson ${id}`)
    return { ...topic, stage }
}

/** The four lessons of this unit, without what they tell (lessonTexts.ts) */
const ownTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    /* ---------- 3. Systems ---------- */
    {
        id: 'money-systems',
        stage: 'systems',
        title: say('Hiru ezezaguneko problemak', 'Problemas con tres incógnitas', 'مسائل بثلاثة مجاهيل', 'Problems with three unknowns'),
        goal: say('Diruarekin lotutako hiru ezezaguneko problemak planteatzea eta ebaztea.', 'Plantear y resolver problemas de dinero con tres incógnitas.', 'صياغة مسائل مالية بثلاثة مجاهيل وحلها.', 'Set up and solve money problems with three unknowns.'),
        problem: say(
            'Antzoki batek 300 sarrera saltzen ditu, 10, 15 eta 20 eurotan, eta 4200 euro biltzen ditu. 10 euroko sarrerak 20 eurokoen bikoitza dira. Zenbat sarrera saltzen ditu prezio bakoitzean?',
            'Un teatro vende 300 entradas de 10, 15 y 20 euros y recauda 4200 euros. Hay el doble de entradas de 10 euros que de 20. ¿Cuántas entradas vende de cada precio?',
            'يبيع مسرح 300 تذكرة بأسعار 10 و15 و20 يورو ويجمع 4200 يورو. عدد تذاكر 10 يورو ضعف عدد تذاكر 20 يورو. كم تذكرة يبيع بكل سعر؟',
            'A theatre sells 300 tickets at 10, 15 and 20 euros and takes 4,200 euros. There are twice as many 10-euro tickets as 20-euro ones. How many tickets does it sell at each price?'
        ),
        stepsKind: 'steps',
        steps: [
            { text: say('Izan bitez $x$, $y$ eta $z$ 10, 15 eta 20 euroko sarrerak. Idatzi hiru ekuazio.', 'Llama $x$, $y$ y $z$ a las entradas de 10, 15 y 20 euros. Escribe tres ecuaciones.', 'سمِّ $x$ و$y$ و$z$ تذاكر 10 و15 و20 يورو. اكتب ثلاث معادلات.', 'Call $x$, $y$ and $z$ the tickets at 10, 15 and 20 euros. Write three equations.'), math: same('$\\begin{cases}x+y+z=300\\\\10x+15y+20z=4200\\\\x=2z\\end{cases}$') },
            { text: say('Ordeztu $x=2z$ beste bietan.', 'Sustituye $x=2z$ en las otras dos.', 'عوّض $x=2z$ في المعادلتين الأخريين.', 'Put $x=2z$ into the other two.'), math: same('$\\begin{cases}y+3z=300\\\\15y+40z=4200\\end{cases}$') },
            { text: say('Kendu lehenengoa bider 15: $z$ ateratzen da, eta gero $y$ eta $x$.', 'Resta 15 veces la primera: sale $z$, y después $y$ y $x$.', 'اطرح 15 مرة المعادلة الأولى: يخرج $z$ ثم $y$ و$x$.', 'Subtract 15 times the first one: $z$ comes out, then $y$ and $x$.'), math: same('$-5z=-300\\ \\to\\ z=60\\qquad y=120\\qquad x=120$') }
        ],
        takeaway: say('Hiru ezezagunek hiru ekuazio behar dituzte. Soluzioak zentzua izan behar du: zenbaki osoak eta ez negatiboak, eta enuntziatuak dioena betetzen dutenak.', 'Tres incógnitas piden tres ecuaciones. La solución tiene que tener sentido: números enteros y no negativos que cumplan lo que dice el enunciado.', 'ثلاثة مجاهيل تحتاج إلى ثلاث معادلات. ويجب أن يكون للحل معنى: أعداد صحيحة غير سالبة تحقق ما يقوله نص المسألة.', 'Three unknowns need three equations. The solution has to make sense: whole numbers, not negative, that do what the statement says.')
    },

    /* ---------- 5. The algebra of economics ---------- */
    {
        id: 'break-even',
        stage: 'economy',
        title: say('Errentagarritasun-atalasea', 'El punto muerto', 'نقطة التعادل', 'The break-even point'),
        goal: say('Dirurik ez galtzeko zenbat unitate saldu behar diren aurkitzea, diru-sarrerak eta kostuak berdinduz.', 'Encontrar cuántas unidades hay que vender para no perder dinero, igualando ingresos y costes.', 'إيجاد عدد الوحدات التي يجب بيعها كي لا نخسر المال، بمساواة الإيرادات والتكاليف.', 'Find how many units must be sold not to lose money, by setting income equal to costs.'),
        problem: say(
            'Tailer batek hilean 1200 euroko kostu finkoak ditu, eta motxila bakoitzak 5 euroko materiala behar du. Motxilak 9 eurotan saltzen ditu. Zenbat motxila saldu behar ditu dirurik ez galtzeko?',
            'Un taller tiene 1200 euros de costes fijos al mes y cada mochila le cuesta 5 euros de material. Las vende a 9 euros. ¿Cuántas mochilas tiene que vender para no perder dinero?',
            'لدى ورشة تكاليف ثابتة قدرها 1200 يورو في الشهر، وكل حقيبة تكلفها 5 يورو من المواد. تبيعها بسعر 9 يورو. كم حقيبة يجب أن تبيع كي لا تخسر المال؟',
            'A workshop has fixed costs of 1,200 euros a month and each backpack costs it 5 euros of material. It sells them at 9 euros. How many backpacks must it sell not to lose money?'
        ),
        stepsKind: 'steps',
        steps: [
            { text: say('$x$ motxilaren diru-sarrerak eta kostuak:', 'Ingresos y costes de $x$ mochilas:', 'إيرادات $x$ حقيبة وتكاليفها:', 'Income and costs of $x$ backpacks:'), math: same('$I(x)=9x\\qquad C(x)=1200+5x$') },
            { text: say('Atalasean, diru-sarrerak = kostuak:', 'En el punto muerto, ingresos = costes:', 'عند نقطة التعادل: الإيرادات = التكاليف:', 'At the break-even point, income = costs:'), math: same('$9x=1200+5x\\ \\to\\ 4x=1200\\ \\to\\ x=300$') },
            { text: say('300 motxila baino gehiagorekin mozkina dago:', 'Con más de 300 mochilas hay beneficio:', 'مع أكثر من 300 حقيبة يوجد ربح:', 'With more than 300 backpacks there is profit:'), math: { eu: '$B(x)=I(x)-C(x)=4x-1200$', es: '$B(x)=I(x)-C(x)=4x-1200$', en: '$P(x)=I(x)-C(x)=4x-1200$', ar: '$B(x)=I(x)-C(x)=4x-1200$' } }
        ],
        takeaway: {
            eu: 'Mozkina: $B(x)=I(x)-C(x)$. Atalasean $I(x)=C(x)$: azpitik dirua galtzen da, eta gainetik irabazi.',
            es: 'Beneficio: $B(x)=I(x)-C(x)$. En el punto muerto $I(x)=C(x)$: por debajo se pierde dinero y por encima se gana.',
            en: 'Profit: $P(x)=I(x)-C(x)$. At the break-even point $I(x)=C(x)$: below it you lose money, above it you earn.',
            ar: 'الربح: $B(x)=I(x)-C(x)$. عند نقطة التعادل $I(x)=C(x)$: تحتها نخسر المال وفوقها نربح.'
        },
        figure: (language) => <BreakEvenFigure language={language} />
    },
    {
        id: 'supply-demand',
        stage: 'economy',
        title: say('Eskaintza eta eskaria', 'Oferta y demanda', 'العرض والطلب', 'Supply and demand'),
        goal: say('Oreka-prezioa aurkitzea, eskaintza eta eskaria berdinduz.', 'Encontrar el precio de equilibrio igualando la oferta y la demanda.', 'إيجاد سعر التوازن بمساواة العرض والطلب.', 'Find the equilibrium price by setting supply equal to demand.'),
        problem: {
            eu: '$p$ euroko prezioan, bezeroek $D(p)=200-4p$ unitate erosi nahi dituzte, eta ekoizleek $O(p)=6p-50$ saldu nahi dituzte. Zein prezioan datoz bat?',
            es: 'A un precio de $p$ euros, los clientes quieren comprar $D(p)=200-4p$ unidades y los productores quieren vender $O(p)=6p-50$. ¿A qué precio coinciden?',
            en: 'At a price of $p$ euros, customers want to buy $D(p)=200-4p$ units and producers want to sell $S(p)=6p-50$. At what price do they match?',
            ar: 'بسعر $p$ يورو يريد الزبائن شراء $D(p)=200-4p$ وحدة ويريد المنتجون بيع $O(p)=6p-50$. عند أي سعر يتساويان؟'
        },
        stepsKind: 'steps',
        steps: [
            { text: say('Orekan, eskaintzen dena eskatzen dena da:', 'En el equilibrio, lo que se ofrece es lo que se pide:', 'في التوازن، ما يُعرض هو ما يُطلب:', 'At equilibrium, what is offered is what is asked for:'), math: same('$200-4p=6p-50$') },
            { text: say('Askatu prezioa:', 'Despeja el precio:', 'اعزل السعر:', 'Solve for the price:'), math: same('$250=10p\\ \\to\\ p=25$') },
            { text: say('Ordeztu, kantitatea jakiteko:', 'Sustituye para saber la cantidad:', 'عوّض لتعرف الكمية:', 'Put it back in to find the quantity:'), math: same('$200-4\\cdot 25=100$') }
        ],
        takeaway: {
            eu: 'Oreka-prezioa: $D(p)=O(p)$. Gainetik produktua soberan dago (soberakina); azpitik falta da (eskasia).',
            es: 'Precio de equilibrio: $D(p)=O(p)$. Por encima sobra producto (excedente); por debajo falta (escasez).',
            en: 'Equilibrium price: $D(p)=S(p)$. Above it there is product left over (surplus); below it there is not enough (shortage).',
            ar: 'سعر التوازن: $D(p)=O(p)$. فوقه يفيض المنتج (فائض)، وتحته ينقص (نقص).'
        },
        figure: (language) => <SupplyDemandFigure language={language} />
    },
    {
        id: 'budget-region',
        stage: 'economy',
        title: say('Aurrekontuaren eskualdea', 'La región del presupuesto', 'منطقة الميزانية', 'The budget region'),
        goal: say('Aurrekontu batek eta denbora batek uzten dutena bi ezezaguneko inekuazioekin idaztea, eta plan bat sartzen den ikustea.', 'Escribir con inecuaciones de dos incógnitas lo que permiten un presupuesto y un tiempo, y ver si un plan cabe.', 'كتابة ما تسمح به ميزانية ووقت بمتراجحات بمجهولين، ومعرفة هل تتسع لخطة ما.', 'Write with two-unknown inequalities what a budget and a time allow, and see whether a plan fits.'),
        problem: say(
            'Tailer batek $x$ aulki eta $y$ mahai egiten ditu. Aulki bakoitzak 20 euroko materiala eta 2 ordu behar ditu; mahai bakoitzak, 50 euro eta 4 ordu. 1000 euro eta 90 ordu ditu. Egin ditzake 20 aulki eta 10 mahai?',
            'Un taller fabrica $x$ sillas e $y$ mesas. Cada silla necesita 20 euros de material y 2 horas; cada mesa, 50 euros y 4 horas. Tiene 1000 euros y 90 horas. ¿Puede fabricar 20 sillas y 10 mesas?',
            'تصنع ورشة $x$ كرسيًا و$y$ طاولة. يحتاج كل كرسي إلى 20 يورو من المواد وساعتين، وكل طاولة إلى 50 يورو و4 ساعات. لديها 1000 يورو و90 ساعة. هل تستطيع صنع 20 كرسيًا و10 طاولات؟',
            'A workshop makes $x$ chairs and $y$ tables. Each chair needs 20 euros of material and 2 hours; each table, 50 euros and 4 hours. It has 1,000 euros and 90 hours. Can it make 20 chairs and 10 tables?'
        ),
        stepsKind: 'steps',
        steps: [
            { text: say('Idatzi murrizketak: dirua, orduak, eta ez dago kopuru negatiborik.', 'Escribe las restricciones: el dinero, las horas, y que no hay cantidades negativas.', 'اكتب القيود: المال والساعات، ولا توجد كميات سالبة.', 'Write the constraints: the money, the hours, and no negative amounts.'), math: same('$\\begin{cases}20x+50y\\le 1000\\\\2x+4y\\le 90\\\\x\\ge 0,\\ y\\ge 0\\end{cases}$') },
            { text: say('Ordeztu $(20,\\,10)$ puntua diruaren murrizketan:', 'Sustituye el punto $(20,\\,10)$ en la del dinero:', 'عوّض النقطة $(20,\\,10)$ في قيد المال:', 'Put the point $(20,\\,10)$ into the money one:'), math: same('$20\\cdot 20+50\\cdot 10=900\\qquad 900\\le 1000$') },
            { text: say('Eta orduenean. Biak betetzen ditu: bai, egin ditzake.', 'Y en la de las horas. Cumple las dos: sí, puede.', 'وفي قيد الساعات. تحقق القيدين: نعم، تستطيع.', 'And into the hours one. It meets both: yes, it can.'), math: same('$2\\cdot 20+4\\cdot 10=80\\qquad 80\\le 90$') }
        ],
        takeaway: say('Baliabide bakoitzak inekuazio bat ematen du, $ax+by\\le c$, eta gainera $x\\ge 0$, $y\\ge 0$. Plan bat posible da bere puntuak guztiak betetzen baditu: eskualdearen barruan dago.', 'Cada recurso da una inecuación $ax+by\\le c$, y además $x\\ge 0$, $y\\ge 0$. Un plan es posible si su punto las cumple todas: está dentro de la región.', 'كل مورد يعطي متراجحة $ax+by\\le c$، ومعها $x\\ge 0$ و$y\\ge 0$. تكون الخطة ممكنة إذا حققت نقطتها كل القيود: أي إنها داخل المنطقة.', 'Each resource gives an inequality $ax+by\\le c$, plus $x\\ge 0$, $y\\ge 0$. A plan is possible if its point meets them all: it is inside the region.'),
        figure: (language) => <BudgetRegionFigure language={language} />
    }
]

const own = (id: GizAlgebraTopicId): UnitTopic => {
    const topic = ownTopics.find((item) => item.id === id)!
    return { ...topic, ...gizAlgebraLessonTexts[id], ...gizAlgebraLessonChecks[id] }
}

/** The seventeen lessons in the order of the book */
export const gizAlgebraTopics: UnitTopic[] = [
    borrowed(bachEquationsTopics, 'ruffini-roots', 'polynomials'),
    borrowed(bachEquationsTopics, 'factorize-high', 'polynomials'),
    borrowed(bachEquationsTopics, 'algebraic-fractions', 'polynomials'),
    borrowed(bachEquationsTopics, 'change-variable', 'equations'),
    borrowed(bachEquationsTopics, 'rational-equations', 'equations'),
    borrowed(bachEquationsTopics, 'radical-equations', 'equations'),
    borrowed(bachEquationsTopics, 'exponential-equations', 'equations'),
    borrowed(bachEquationsTopics, 'log-equations', 'equations'),
    borrowed(bachSystemsTopics, 'nonlinear-substitution', 'systems'),
    borrowed(bachSystemsTopics, 'gauss-method', 'systems'),
    own('money-systems'),
    borrowed(bachEquationsTopics, 'polynomial-inequalities', 'inequalities'),
    borrowed(bachEquationsTopics, 'rational-inequalities', 'inequalities'),
    borrowed(bachSystemsTopics, 'half-plane-regions', 'inequalities'),
    own('break-even'),
    own('supply-demand'),
    own('budget-region')
]

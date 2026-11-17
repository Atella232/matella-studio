import { shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'

/* ==========================================================================
   J1 · Zein biderkadurak kalkulatzen du? (¿Qué producto lo calcula?): a
   short story names two or three matrices (what their rows and columns
   are, and their size) and asks for something (what each shop takes in,
   the parts each customer needs…). Four expressions: only one computes
   it. The wrong ones are the slips of the unit: the factors swapped, a
   transpose missing or left over, a sum instead of a product, the cost
   subtracted after multiplying. Level 1: quantities and prices. Level 2:
   profit, chains and two months. Level 3: data laid out the other way.
   The tests give the matrices numbers and check that no wrong option
   gives the same numbers as the right one.
   ========================================================================== */

export const WHICH_ROUNDS = 5

export interface NamedMatrix {
    name: string
    rows: number
    columns: number
    meaning: LocalizedText
}

export interface WhichTemplate {
    matrices: NamedMatrix[]
    question: LocalizedText
    right: string
    wrong: [string, string, string]
    why: LocalizedText
}

export interface WhichRound extends WhichTemplate {
    level: number
    options: string[]
    answer: number
}

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const m = (name: string, rows: number, columns: number, meaning: LocalizedText): NamedMatrix => ({ name, rows, columns, meaning })

const quantitiesFirst = say('Kopuruak lehenik, eta prezioak zutabe gisa: errenkada bider zutabe, denda bakoitzeko guztizko bat.', 'Las cantidades primero y los precios en columna: fila por columna, un total por tienda.', 'الكميات أولًا والأسعار في عمود: صفّ في عمود، مجموع لكل متجر.', 'The quantities first and the prices as a column: row by column, one total per shop.')
const rowFirst = say('Lehen matrizearen zutabeek eta bigarrenaren errenkadek gauza bera izan behar dute.', 'Las columnas de la primera matriz y las filas de la segunda tienen que ser lo mismo.', 'يجب أن تكون أعمدة المصفوفة الأولى وصفوف الثانية الشيء نفسه.', 'The columns of the first matrix and the rows of the second must be the same thing.')

export const WHICH_TEMPLATES: WhichTemplate[][] = [
    [
        {
            matrices: [m('Q', 2, 3, say('dendak × produktuak (saldutako unitateak)', 'tiendas × productos (unidades vendidas)', 'المتاجر × المنتجات (الوحدات المبيعة)', 'shops × products (units sold)')), m('V', 3, 1, say('produktu bakoitzaren salmenta-prezioa', 'precio de venta de cada producto', 'سعر بيع كل منتج', 'selling price of each product'))],
            question: say('Zenbat jasotzen du denda bakoitzak?', '¿Cuánto ingresa cada tienda?', 'كم إيراد كل متجر؟', 'How much does each shop take in?'),
            right: 'QV', wrong: ['VQ', 'Q+V', 'Q^tV'], why: quantitiesFirst
        },
        {
            matrices: [m('F', 2, 3, say('hilabeteak × produktuak (egindako unitateak)', 'meses × productos (unidades fabricadas)', 'الأشهر × المنتجات (الوحدات المصنوعة)', 'months × products (units made)')), m('C', 3, 1, say('produktu bakoitzaren unitateko kostua', 'coste por unidad de cada producto', 'كلفة الوحدة لكل منتج', 'cost per unit of each product'))],
            question: say('Zenbat balio du hilabete bakoitzeko ekoizpenak?', '¿Cuánto cuesta la producción de cada mes?', 'كم تكلّف إنتاجية كل شهر؟', 'How much does each month\'s production cost?'),
            right: 'FC', wrong: ['CF', 'F^tC', 'F-C'], why: rowFirst
        },
        {
            matrices: [m('N', 3, 2, say('ikasleak × azterketak (notak)', 'alumnos × exámenes (notas)', 'الطلاب × الامتحانات (العلامات)', 'students × exams (marks)')), m('W', 2, 1, say('azterketa bakoitzaren pisua', 'peso de cada examen', 'وزن كل امتحان', 'weight of each exam'))],
            question: say('Zein da ikasle bakoitzaren batez besteko haztatua?', '¿Cuál es la media ponderada de cada alumno?', 'ما المعدل الموزون لكل طالب؟', 'What is each student\'s weighted mean?'),
            right: 'NW', wrong: ['WN', 'N^tW', 'N+W'], why: rowFirst
        },
        {
            matrices: [m('H', 2, 3, say('familiak × produktuak (erositako kiloak)', 'familias × productos (kilos comprados)', 'الأسر × المنتجات (الكيلوغرامات المشتراة)', 'families × products (kilos bought)')), m('P', 3, 1, say('produktu bakoitzaren kiloaren prezioa', 'precio del kilo de cada producto', 'سعر الكيلو لكل منتج', 'price per kilo of each product'))],
            question: say('Zenbat gastatzen du familia bakoitzak?', '¿Cuánto gasta cada familia?', 'كم تنفق كل أسرة؟', 'How much does each family spend?'),
            right: 'HP', wrong: ['PH', 'H^tP', 'H+P'], why: quantitiesFirst
        },
        {
            matrices: [m('P', 1, 3, say('produktu bakoitzaren prezioa, errenkada batean', 'precio de cada producto, en una fila', 'سعر كل منتج في صف', 'price of each product, in a row')), m('Q', 3, 2, say('produktuak × dendak (saldutako unitateak)', 'productos × tiendas (unidades vendidas)', 'المنتجات × المتاجر (الوحدات المبيعة)', 'products × shops (units sold)'))],
            question: say('Zenbat jasotzen du denda bakoitzak? (errenkada batean)', '¿Cuánto ingresa cada tienda? (en una fila)', 'كم إيراد كل متجر؟ (في صف)', 'How much does each shop take in? (in a row)'),
            right: 'PQ', wrong: ['QP', 'Q^tP', 'P^tQ'], why: say('Prezioen errenkada ($1\\times 3$) bider produktuak × dendak ($3\\times 2$): denda bakoitzeko guztizko bat.', 'La fila de precios ($1\\times 3$) por productos × tiendas ($3\\times 2$): un total por tienda.', 'صف الأسعار ($1\\times 3$) في المنتجات × المتاجر ($3\\times 2$): مجموع لكل متجر.', 'The row of prices ($1\\times 3$) times products × shops ($3\\times 2$): one total per shop.')
        }
    ],
    [
        {
            matrices: [m('Q', 2, 3, say('dendak × produktuak (saldutako unitateak)', 'tiendas × productos (unidades vendidas)', 'المتاجر × المنتجات (الوحدات المبيعة)', 'shops × products (units sold)')), m('V', 3, 1, say('salmenta-prezioak', 'precios de venta', 'أسعار البيع', 'selling prices')), m('C', 3, 1, say('unitateko kostuak', 'costes por unidad', 'تكاليف الوحدة', 'costs per unit'))],
            question: say('Zenbat irabazten du denda bakoitzak?', '¿Cuánto gana cada tienda?', 'كم ربح كل متجر؟', 'How much profit does each shop make?'),
            right: 'Q(V-C)', wrong: ['(V-C)Q', 'Q(C-V)', 'QV-QC^t'], why: say('Unitateko irabazia $V-C$ da; gero, kopuruak bider irabazia.', 'El beneficio por unidad es $V-C$; después, cantidades por beneficio.', 'ربح الوحدة هو $V-C$؛ ثم الكميات في الربح.', 'The profit per unit is $V-C$; then quantities times profit.')
        },
        {
            matrices: [m('A', 2, 3, say('bezeroak × altzariak (eskaera)', 'clientes × muebles (pedido)', 'الزبائن × الأثاث (الطلب)', 'customers × furniture (order)')), m('B', 3, 2, say('altzariak × piezak (errezeta)', 'muebles × piezas (receta)', 'الأثاث × القطع (الوصفة)', 'furniture × parts (recipe)'))],
            question: say('Zenbat pieza behar ditu bezero bakoitzak?', '¿Cuántas piezas necesita cada cliente?', 'كم قطعة يحتاج كل زبون؟', 'How many parts does each customer need?'),
            right: 'AB', wrong: ['BA', 'A^tB^t', 'B^tA'], why: say('Bezeroak → altzariak → piezak: katearen ordena, $AB$.', 'Clientes → muebles → piezas: el orden de la cadena, $AB$.', 'الزبائن ← الأثاث ← القطع: ترتيب السلسلة، $AB$.', 'Customers → furniture → parts: the order of the chain, $AB$.')
        },
        {
            matrices: [m('A', 2, 2, say('bezeroak × altzariak (eskaera)', 'clientes × muebles (pedido)', 'الزبائن × الأثاث (الطلب)', 'customers × furniture (order)')), m('B', 2, 3, say('altzariak × piezak (errezeta)', 'muebles × piezas (receta)', 'الأثاث × القطع (الوصفة)', 'furniture × parts (recipe)')), m('P', 3, 1, say('pieza bakoitzaren prezioa', 'precio de cada pieza', 'سعر كل قطعة', 'price of each part'))],
            question: say('Zenbat balio dute bezero bakoitzaren piezek?', '¿Cuánto cuestan las piezas de cada cliente?', 'كم تكلّف قطع كل زبون؟', 'How much do each customer\'s parts cost?'),
            right: 'ABP', wrong: ['BAP', 'PAB', 'AP^tB'], why: say('Kate osoa: bezeroak → altzariak → piezak → euroak.', 'La cadena entera: clientes → muebles → piezas → euros.', 'السلسلة كاملة: الزبائن ← الأثاث ← القطع ← اليورو.', 'The whole chain: customers → furniture → parts → euros.')
        },
        {
            matrices: [m('Q', 2, 3, say('dendak × produktuak, urtarrilean', 'tiendas × productos, en enero', 'المتاجر × المنتجات في يناير', 'shops × products, in January')), m('R', 2, 3, say('dendak × produktuak, otsailean', 'tiendas × productos, en febrero', 'المتاجر × المنتجات في فبراير', 'shops × products, in February')), m('V', 3, 1, say('salmenta-prezioak', 'precios de venta', 'أسعار البيع', 'selling prices'))],
            question: say('Zenbat jasotzen du denda bakoitzak bi hilabeteetan?', '¿Cuánto ingresa cada tienda en los dos meses?', 'كم إيراد كل متجر في الشهرين؟', 'How much does each shop take in over the two months?'),
            right: '(Q+R)V', wrong: ['QRV', 'V(Q+R)', 'Q+RV'], why: say('Lehenik batu bi hilabeteetako kopuruak, eta gero biderkatu prezioez.', 'Primero suma las cantidades de los dos meses y después multiplica por los precios.', 'اجمع أولًا كميات الشهرين ثم اضرب في الأسعار.', 'First add the quantities of the two months, then multiply by the prices.')
        },
        {
            matrices: [m('Q', 2, 3, say('dendak × produktuak, ostiralean', 'tiendas × productos, el viernes', 'المتاجر × المنتجات يوم الجمعة', 'shops × products, on Friday')), m('V', 3, 1, say('salmenta-prezioak', 'precios de venta', 'أسعار البيع', 'selling prices'))],
            question: say('Larunbatean ostiralean bezainbeste saltzen da. Zenbat jasotzen du denda bakoitzak bi egunetan?', 'El sábado se vende lo mismo que el viernes. ¿Cuánto ingresa cada tienda en los dos días?', 'يُباع يوم السبت ما بيع يوم الجمعة. كم إيراد كل متجر في اليومين؟', 'On Saturday they sell the same as on Friday. How much does each shop take in over the two days?'),
            right: '2QV', wrong: ['QV+2', 'Q^2V', '2Q+V'], why: say('Bi egunetako kopuruak $2Q$ dira: $2Q$ matrizeak elementu guztiak bikoizten ditu.', 'Las cantidades de los dos días son $2Q$: el 2 multiplica todos los elementos.', 'كميات اليومين هي $2Q$: العدد 2 يضرب كل العناصر.', 'The quantities of the two days are $2Q$: the 2 multiplies every entry.')
        }
    ],
    [
        {
            matrices: [m('Q', 3, 2, say('produktuak × dendak (saldutako unitateak)', 'productos × tiendas (unidades vendidas)', 'المنتجات × المتاجر (الوحدات المبيعة)', 'products × shops (units sold)')), m('V', 3, 1, say('salmenta-prezioak', 'precios de venta', 'أسعار البيع', 'selling prices'))],
            question: say('Zenbat jasotzen du denda bakoitzak? (zutabe batean)', '¿Cuánto ingresa cada tienda? (en una columna)', 'كم إيراد كل متجر؟ (في عمود)', 'How much does each shop take in? (in a column)'),
            right: 'Q^tV', wrong: ['QV', 'VQ^t', 'Q+V'], why: say('$Q$ matrizeak dendak zutabeetan ditu: $Q^t$ matrizeak errenkadetan jartzen ditu.', '$Q$ tiene las tiendas en columnas: $Q^t$ las pone en filas.', '$Q$ فيها المتاجر في الأعمدة: $Q^t$ تضعها في الصفوف.', '$Q$ has the shops in columns: $Q^t$ puts them in rows.')
        },
        {
            matrices: [m('Q', 3, 2, say('produktuak × dendak (saldutako unitateak)', 'productos × tiendas (unidades vendidas)', 'المنتجات × المتاجر (الوحدات المبيعة)', 'products × shops (units sold)')), m('V', 3, 1, say('salmenta-prezioak, zutabe batean', 'precios de venta, en una columna', 'أسعار البيع في عمود', 'selling prices, in a column'))],
            question: say('Zenbat jasotzen du denda bakoitzak? (errenkada batean)', '¿Cuánto ingresa cada tienda? (en una fila)', 'كم إيراد كل متجر؟ (في صف)', 'How much does each shop take in? (in a row)'),
            right: 'V^tQ', wrong: ['Q^tV^t', 'VQ', 'QV^t'], why: say('Prezioak errenkada gisa ($V^t$, $1\\times 3$) bider produktuak × dendak.', 'Los precios en fila ($V^t$, $1\\times 3$) por productos × tiendas.', 'الأسعار في صف ($V^t$، $1\\times 3$) في المنتجات × المتاجر.', 'The prices as a row ($V^t$, $1\\times 3$) times products × shops.')
        },
        {
            matrices: [m('A', 2, 3, say('bezeroak × altzariak (eskaera)', 'clientes × muebles (pedido)', 'الزبائن × الأثاث (الطلب)', 'customers × furniture (order)')), m('B', 2, 3, say('piezak × altzariak (errezeta)', 'piezas × muebles (receta)', 'القطع × الأثاث (الوصفة)', 'parts × furniture (recipe)'))],
            question: say('Zenbat pieza behar ditu bezero bakoitzak? (bezeroak errenkadetan)', '¿Cuántas piezas necesita cada cliente? (clientes en filas)', 'كم قطعة يحتاج كل زبون؟ (الزبائن في الصفوف)', 'How many parts does each customer need? (customers in rows)'),
            right: 'AB^t', wrong: ['AB', 'B^tA', 'A^tB'], why: say('$B$ matrizeak altzariak zutabeetan ditu: $B^t$ altzariak × piezak da.', '$B$ tiene los muebles en columnas: $B^t$ es muebles × piezas.', '$B$ فيها الأثاث في الأعمدة: $B^t$ هي الأثاث × القطع.', '$B$ has the furniture in columns: $B^t$ is furniture × parts.')
        },
        {
            matrices: [m('Q', 2, 3, say('dendak × produktuak (saldutako unitateak)', 'tiendas × productos (unidades vendidas)', 'المتاجر × المنتجات (الوحدات المبيعة)', 'shops × products (units sold)')), m('P', 1, 3, say('prezioak, errenkada batean', 'precios, en una fila', 'الأسعار في صف', 'prices, in a row'))],
            question: say('Zenbat jasotzen du denda bakoitzak? (zutabe batean)', '¿Cuánto ingresa cada tienda? (en una columna)', 'كم إيراد كل متجر؟ (في عمود)', 'How much does each shop take in? (in a column)'),
            right: 'QP^t', wrong: ['QP', 'PQ', 'P^tQ'], why: say('Prezioak zutabe bihurtu behar dira: $P^t$, $3\\times 1$.', 'Los precios tienen que pasar a columna: $P^t$, $3\\times 1$.', 'يجب أن تصير الأسعار عمودًا: $P^t$، $3\\times 1$.', 'The prices must become a column: $P^t$, $3\\times 1$.')
        },
        {
            matrices: [m('A', 3, 2, say('altzariak × bezeroak (eskaera)', 'muebles × clientes (pedido)', 'الأثاث × الزبائن (الطلب)', 'furniture × customers (order)')), m('B', 3, 2, say('altzariak × piezak (errezeta)', 'muebles × piezas (receta)', 'الأثاث × القطع (الوصفة)', 'furniture × parts (recipe)'))],
            question: say('Zenbat pieza behar ditu bezero bakoitzak? (bezeroak errenkadetan)', '¿Cuántas piezas necesita cada cliente? (clientes en filas)', 'كم قطعة يحتاج كل زبون؟ (الزبائن في الصفوف)', 'How many parts does each customer need? (customers in rows)'),
            right: 'A^tB', wrong: ['AB', 'BA', 'AB^t'], why: say('$A^t$ bezeroak × altzariak da, eta $B$ altzariak × piezak: altzariak erdian.', '$A^t$ es clientes × muebles y $B$, muebles × piezas: los muebles en el medio.', '$A^t$ هي الزبائن × الأثاث و$B$ هي الأثاث × القطع: الأثاث في الوسط.', '$A^t$ is customers × furniture and $B$ furniture × parts: the furniture in the middle.')
        }
    ]
]

export function createWhichRounds(random: Random, level: number): WhichRound[] {
    const templates = shuffle(random, WHICH_TEMPLATES[level] ?? WHICH_TEMPLATES[0]).slice(0, WHICH_ROUNDS)
    return templates.map((template) => {
        const options = shuffle(random, [template.right, ...template.wrong])
        return { ...template, level, options, answer: options.indexOf(template.right) }
    })
}

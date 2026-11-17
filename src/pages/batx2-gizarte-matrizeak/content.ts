import { fraction } from '../../features/unit-v2/math/fraction.ts'
import type { ChallengeItem, DiagnosticQuestion, ExerciseItem, ExerciseSection, LocalizedText, PracticeItem } from '../../features/unit-v2/types.ts'
import { matrizeakChallenges, matrizeakDiagnostic, matrizeakExerciseBank, matrizeakPractice } from '../batx2-zientziak-matrizeak/content.ts'

/* ==========================================================================
   Matrizeak · Batxilergoa 2 · Gizarte Zientziak — diagnostic, guided
   practice, challenges and exercise bank. The exercises of pure calculation
   come from the Ciencias twin (imported and renumbered, never copied or
   edited); those of this unit put matrices to work in economy and society:
   tables of data, costs, income and profit, production chains, systems in
   matrix form and the style of the Basque exam of Matemáticas Aplicadas a
   las CCSS II. Linear dependence and commuting matrices stay out.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })
const n = (value: number, denominator = 1) => fraction(value, denominator)

const twinDiagnostic = (id: number) => matrizeakDiagnostic.find((question) => question.id === id)!
const twinPractice = (id: number) => matrizeakPractice.find((item) => item.id === id)!
const twinChallenge = (id: number) => matrizeakChallenges.find((item) => item.id === id)!
const twinBank = (id: number) => matrizeakExerciseBank.flatMap((section) => section.items).find((item) => item.id === id)!

export const gizarteMatrizeakDiagnostic: DiagnosticQuestion[] = [
    {
        id: 141001,
        prompt: say(
            'Taula batek 5 dendak 3 produktutatik saldutakoa jasotzen du, dendak errenkadetan. Zer da $a_{32}$?',
            'Una tabla recoge lo que venden 5 tiendas de 3 productos, con las tiendas en filas. ¿Qué es $a_{32}$?',
            'جدول يجمع ما تبيعه 5 متاجر من 3 منتجات، والمتاجر في الصفوف. ما هو $a_{32}$؟',
            'A table records what 5 shops sell of 3 products, with the shops in rows. What is $a_{32}$?'
        ),
        options: [
            say('2. dendak 3. produktutik saldutakoa', 'Lo que vende la tienda 2 del producto 3', 'ما يبيعه المتجر 2 من المنتج 3', 'What shop 2 sells of product 3'),
            say('Dendetan guztira saldutakoa', 'Lo que venden en total las tiendas', 'ما تبيعه المتاجر كلها', 'What all the shops sell in total'),
            say('3. dendak 2. produktutik saldutakoa', 'Lo que vende la tienda 3 del producto 2', 'ما يبيعه المتجر 3 من المنتج 2', 'What shop 3 sells of product 2')
        ],
        correctIndex: 2,
        explanation: say('Lehenik errenkada (denda), gero zutabea (produktua): 3. denda eta 2. produktua.', 'Primero la fila (la tienda) y después la columna (el producto): tienda 3 y producto 2.', 'الصف أولًا (المتجر) ثم العمود (المنتج): المتجر 3 والمنتج 2.', 'Row first (the shop), then column (the product): shop 3 and product 2.'),
        topic: 'data-tables'
    },
    { ...twinDiagnostic(116002), id: 141002 },
    { ...twinDiagnostic(116003), id: 141003 },
    { ...twinDiagnostic(116004), id: 141004 },
    { ...twinDiagnostic(116005), id: 141005 },
    { ...twinDiagnostic(116006), id: 141006 },
    {
        id: 141007,
        prompt: say(
            '$Q$ matrizeak denda bakoitzak (errenkadak) produktu bakoitzetik (zutabeak) saltzen duena ematen du, eta $P$ zutabeak produktu bakoitzaren prezioa. Zer ematen du $QP$ biderkadurak?',
            '$Q$ da lo que vende cada tienda (filas) de cada producto (columnas) y la columna $P$, el precio de cada producto. ¿Qué da $QP$?',
            '$Q$ تعطي ما يبيعه كل متجر (الصفوف) من كل منتج (الأعمدة)، والعمود $P$ سعر كل منتج. ماذا يعطي $QP$؟',
            '$Q$ gives what each shop (rows) sells of each product (columns) and the column $P$ the price of each product. What does $QP$ give?'
        ),
        options: [
            say('Produktu bakoitzaren prezio berria', 'El precio nuevo de cada producto', 'السعر الجديد لكل منتج', 'The new price of each product'),
            say('Denda bakoitzak jasotzen duen dirua', 'Lo que ingresa cada tienda', 'إيراد كل متجر', 'What each shop takes in'),
            say('Ezin da biderkatu', 'No se puede multiplicar', 'لا يمكن الضرب', 'It cannot be multiplied')
        ],
        correctIndex: 1,
        explanation: say('Denda baten errenkada bider prezioen zutabea: produktu bakoitza bere prezioaz, eta batuta.', 'La fila de una tienda por la columna de precios: cada producto por su precio, y sumado.', 'صف المتجر في عمود الأسعار: كل منتج في سعره، ثم الجمع.', 'A shop\'s row times the column of prices: each product times its price, added up.'),
        topic: 'costs-profits'
    },
    { ...twinDiagnostic(116008), id: 141008 }
]

/* ---------- Guided practice: four per stage ---------- */

const ownPractice: Record<string, Omit<PracticeItem, 'id'>> = {
    table: {
        stage: 'basics',
        prompt: say(
            'Taula batek 5 dendak 3 produktutatik saldutakoa jasotzen du. Zenbat elementu ditu haren matrizeak?',
            'Una tabla recoge lo que venden 5 tiendas de 3 productos. ¿Cuántos elementos tiene su matriz?',
            'جدول يجمع ما تبيعه 5 متاجر من 3 منتجات. كم عنصرًا في مصفوفته؟',
            'A table records what 5 shops sell of 3 products. How many entries does its matrix have?'
        ),
        expected: n(15),
        hint: say('Errenkada bat denda bakoitzeko eta zutabe bat produktu bakoitzeko.', 'Una fila por tienda y una columna por producto.', 'صف لكل متجر وعمود لكل منتج.', 'One row per shop and one column per product.'),
        explanation: same('$5\\times 3\\ \\to\\ 5\\cdot 3=15$')
    },
    income: {
        stage: 'operations',
        prompt: say(
            'Denda batek 20 liburu eta 15 koaderno saltzen ditu. Liburua 12 euro da, eta koadernoa 3 euro. Zenbat jasotzen du? Kalkulatu $\\begin{pmatrix}20&15\\end{pmatrix}\\begin{pmatrix}12\\\\3\\end{pmatrix}$.',
            'Una tienda vende 20 libros y 15 cuadernos. El libro cuesta 12 € y el cuaderno, 3 €. ¿Cuánto ingresa? Calcula $\\begin{pmatrix}20&15\\end{pmatrix}\\begin{pmatrix}12\\\\3\\end{pmatrix}$.',
            'يبيع متجر 20 كتابًا و15 دفترًا. سعر الكتاب 12 € والدفتر 3 €. كم إيراده؟ احسب $\\begin{pmatrix}20&15\\end{pmatrix}\\begin{pmatrix}12\\\\3\\end{pmatrix}$.',
            'A shop sells 20 books and 15 notebooks. A book costs €12 and a notebook €3. How much does it take in? Work out $\\begin{pmatrix}20&15\\end{pmatrix}\\begin{pmatrix}12\\\\3\\end{pmatrix}$.'
        ),
        expected: n(285),
        hint: say('Errenkada bider zutabea: banan-banan biderkatu eta batu.', 'Fila por columna: multiplica uno a uno y suma.', 'صف في عمود: اضرب واحدًا في واحد ثم اجمع.', 'Row times column: multiply one by one and add.'),
        explanation: same('$20\\cdot 12+15\\cdot 3=240+45=285$')
    },
    chain: {
        stage: 'operations',
        prompt: say(
            'Etxe batek 3 gela eta 2 bainugela ditu. Gela batek 4 entxufe ditu, eta bainugela batek 2. Zenbat entxufe ditu etxeak? Kalkulatu $\\begin{pmatrix}3&2\\end{pmatrix}\\begin{pmatrix}4\\\\2\\end{pmatrix}$.',
            'Una casa tiene 3 habitaciones y 2 baños. Cada habitación lleva 4 enchufes y cada baño, 2. ¿Cuántos enchufes tiene la casa? Calcula $\\begin{pmatrix}3&2\\end{pmatrix}\\begin{pmatrix}4\\\\2\\end{pmatrix}$.',
            'في بيت 3 غرف وحمّامان. في كل غرفة 4 مقابس وفي كل حمّام 2. كم مقبسًا في البيت؟ احسب $\\begin{pmatrix}3&2\\end{pmatrix}\\begin{pmatrix}4\\\\2\\end{pmatrix}$.',
            'A house has 3 bedrooms and 2 bathrooms. Each bedroom has 4 sockets and each bathroom 2. How many sockets does the house have? Work out $\\begin{pmatrix}3&2\\end{pmatrix}\\begin{pmatrix}4\\\\2\\end{pmatrix}$.'
        ),
        expected: n(16),
        hint: say('Etxea → gelak → entxufeak: errenkada bider zutabea.', 'Casa → habitaciones → enchufes: fila por columna.', 'البيت ← الغرف ← المقابس: صف في عمود.', 'House → rooms → sockets: row times column.'),
        explanation: same('$3\\cdot 4+2\\cdot 2=16$')
    },
    rank: {
        stage: 'rank',
        prompt: say(
            'Hiru hilabeteko salmentak $\\begin{pmatrix}10&20\\\\20&40\\\\30&60\\end{pmatrix}$ dira. Zein da matrizearen heina?',
            'Las ventas de tres meses son $\\begin{pmatrix}10&20\\\\20&40\\\\30&60\\end{pmatrix}$. ¿Cuál es el rango de la matriz?',
            'مبيعات ثلاثة أشهر هي $\\begin{pmatrix}10&20\\\\20&40\\\\30&60\\end{pmatrix}$. ما رتبة المصفوفة؟',
            'The sales of three months are $\\begin{pmatrix}10&20\\\\20&40\\\\30&60\\end{pmatrix}$. What is the rank of the matrix?'
        ),
        expected: n(1),
        hint: say('Konparatu errenkada bakoitza lehenarekin.', 'Compara cada fila con la primera.', 'قارن كل صف بالأول.', 'Compare each row with the first.'),
        explanation: say('$E_2=2E_1$ eta $E_3=3E_1$: errenkada independente bakarra dago; heina 1 da.', '$E_2=2E_1$ y $E_3=3E_1$: solo hay una fila independiente; el rango es 1.', '$E_2=2E_1$ و$E_3=3E_1$: يوجد صف مستقل واحد فقط؛ الرتبة 1.', '$E_2=2E_1$ and $E_3=3E_1$: there is only one independent row; the rank is 1.')
    },
    form: {
        stage: 'equations',
        prompt: say(
            '$\\begin{pmatrix}1&1\\\\1&2\\end{pmatrix}\\begin{pmatrix}x\\\\y\\end{pmatrix}=\\begin{pmatrix}9\\\\14\\end{pmatrix}$ sisteman, $A^{-1}=\\begin{pmatrix}2&-1\\\\-1&1\\end{pmatrix}$ da. Zenbat da $x$?',
            'En el sistema $\\begin{pmatrix}1&1\\\\1&2\\end{pmatrix}\\begin{pmatrix}x\\\\y\\end{pmatrix}=\\begin{pmatrix}9\\\\14\\end{pmatrix}$, $A^{-1}=\\begin{pmatrix}2&-1\\\\-1&1\\end{pmatrix}$. ¿Cuánto vale $x$?',
            'في النظام $\\begin{pmatrix}1&1\\\\1&2\\end{pmatrix}\\begin{pmatrix}x\\\\y\\end{pmatrix}=\\begin{pmatrix}9\\\\14\\end{pmatrix}$ يكون $A^{-1}=\\begin{pmatrix}2&-1\\\\-1&1\\end{pmatrix}$. كم تساوي $x$؟',
            'In the system $\\begin{pmatrix}1&1\\\\1&2\\end{pmatrix}\\begin{pmatrix}x\\\\y\\end{pmatrix}=\\begin{pmatrix}9\\\\14\\end{pmatrix}$, $A^{-1}=\\begin{pmatrix}2&-1\\\\-1&1\\end{pmatrix}$. What is $x$?'
        ),
        expected: n(4),
        hint: same('$X=A^{-1}B$'),
        explanation: same('$x=2\\cdot 9-1\\cdot 14=4$')
    }
}

const practiceOrder: Array<number | string> = [
    1, 2, 4, 'table',
    5, 7, 'income', 'chain',
    9, 10, 11, 'rank',
    13, 14, 15, 16,
    17, 18, 19, 'form'
]

export const gizarteMatrizeakPractice: PracticeItem[] = practiceOrder.map((key, index) => (typeof key === 'number' ? { ...twinPractice(key), id: index + 1 } : { ...ownPractice[key], id: index + 1 }))

/* ---------- Challenges: three per stage ---------- */

const ownChallenges: Record<string, Omit<ChallengeItem, 'id'>> = {
    days: {
        stage: 'basics',
        points: 10,
        context: 'starter',
        prompt: say(
            'Bi dendaren salmentak hiru egunetan $\\begin{pmatrix}12&15&9\\\\20&11&14\\end{pmatrix}$ dira, dendak errenkadetan eta egunak zutabeetan. Zenbat unitate saldu ziren guztira 2. egunean?',
            'Las ventas de dos tiendas en tres días son $\\begin{pmatrix}12&15&9\\\\20&11&14\\end{pmatrix}$, con las tiendas en filas y los días en columnas. ¿Cuántas unidades se vendieron en total el día 2?',
            'مبيعات متجرين في ثلاثة أيام هي $\\begin{pmatrix}12&15&9\\\\20&11&14\\end{pmatrix}$، المتاجر في الصفوف والأيام في الأعمدة. كم وحدة بيعت إجمالًا في اليوم 2؟',
            'The sales of two shops over three days are $\\begin{pmatrix}12&15&9\\\\20&11&14\\end{pmatrix}$, with the shops in rows and the days in columns. How many units were sold in all on day 2?'
        ),
        expected: n(26),
        hint: say('2. eguna 2. zutabea da: batu haren bi elementuak.', 'El día 2 es la columna 2: suma sus dos elementos.', 'اليوم 2 هو العمود 2: اجمع عنصريه.', 'Day 2 is column 2: add its two entries.'),
        explanation: same('$a_{12}+a_{22}=15+11=26$')
    },
    boxes: {
        stage: 'operations',
        points: 20,
        context: 'advanced',
        prompt: say(
            'Denda batek 3 kutxa handi eta 5 txiki eskatzen ditu. Kutxa handi batek 12 ur-botila eta 6 zuku-botila ditu; txiki batek, 6 ur-botila eta 4 zuku-botila. Zenbat zuku-botila jasotzen ditu?',
            'Una tienda pide 3 cajas grandes y 5 pequeñas. Cada caja grande trae 12 botellas de agua y 6 de zumo; cada pequeña, 6 de agua y 4 de zumo. ¿Cuántas botellas de zumo recibe?',
            'يطلب متجر 3 صناديق كبيرة و5 صغيرة. في كل صندوق كبير 12 زجاجة ماء و6 زجاجات عصير، وفي كل صغير 6 زجاجات ماء و4 زجاجات عصير. كم زجاجة عصير يتسلّم؟',
            'A shop orders 3 large boxes and 5 small ones. Each large box holds 12 bottles of water and 6 of juice; each small one, 6 of water and 4 of juice. How many bottles of juice does it get?'
        ),
        expected: n(38),
        hint: say('Eskaera → kutxak → botilak: $\\begin{pmatrix}3&5\\end{pmatrix}$ bider kutxen matrizea.', 'Pedido → cajas → botellas: $\\begin{pmatrix}3&5\\end{pmatrix}$ por la matriz de las cajas.', 'الطلب ← الصناديق ← الزجاجات: $\\begin{pmatrix}3&5\\end{pmatrix}$ في مصفوفة الصناديق.', 'Order → boxes → bottles: $\\begin{pmatrix}3&5\\end{pmatrix}$ times the matrix of the boxes.'),
        explanation: same('$\\begin{pmatrix}3&5\\end{pmatrix}\\begin{pmatrix}12&6\\\\6&4\\end{pmatrix}=\\begin{pmatrix}66&38\\end{pmatrix}\\qquad 3\\cdot 6+5\\cdot 4=38$')
    },
    profit: {
        stage: 'operations',
        points: 30,
        context: 'master',
        prompt: say(
            'Enpresa batek hiru produktu saltzen ditu. Unitateko kostuak $A=\\begin{pmatrix}20&35&50\\end{pmatrix}$ dira, salmenta-prezioak $B=\\begin{pmatrix}30&50&80\\end{pmatrix}$, eta urtean saldutako unitateak $D=\\begin{pmatrix}100\\\\60\\\\40\\end{pmatrix}$. Zenbat euro irabazten ditu urtean?',
            'Una empresa vende tres productos. Los costes por unidad son $A=\\begin{pmatrix}20&35&50\\end{pmatrix}$, los precios de venta $B=\\begin{pmatrix}30&50&80\\end{pmatrix}$ y las unidades vendidas en el año, $D=\\begin{pmatrix}100\\\\60\\\\40\\end{pmatrix}$. ¿Cuántos euros gana en el año?',
            'تبيع شركة ثلاثة منتجات. تكاليف الوحدة $A=\\begin{pmatrix}20&35&50\\end{pmatrix}$، وأسعار البيع $B=\\begin{pmatrix}30&50&80\\end{pmatrix}$، والوحدات المبيعة في السنة $D=\\begin{pmatrix}100\\\\60\\\\40\\end{pmatrix}$. كم يورو تربح في السنة؟',
            'A company sells three products. The costs per unit are $A=\\begin{pmatrix}20&35&50\\end{pmatrix}$, the selling prices $B=\\begin{pmatrix}30&50&80\\end{pmatrix}$ and the units sold in the year $D=\\begin{pmatrix}100\\\\60\\\\40\\end{pmatrix}$. How many euros does it make in the year?'
        ),
        expected: n(3100),
        hint: say('Irabazia: $(B-A)D$, unitateko irabazia bider unitateak.', 'Beneficio: $(B-A)D$, el beneficio por unidad por las unidades.', 'الربح: $(B-A)D$، ربح الوحدة في عدد الوحدات.', 'Profit: $(B-A)D$, the profit per unit times the units.'),
        explanation: same('$B-A=\\begin{pmatrix}10&15&30\\end{pmatrix}\\qquad 10\\cdot 100+15\\cdot 60+30\\cdot 40=3100$')
    },
    ebau: {
        stage: 'equations',
        points: 30,
        context: 'master',
        prompt: say(
            '$A=\\begin{pmatrix}1&a\\\\2&b\\end{pmatrix}$ matrizea bere iraulia bezalakoa da, eta ez du alderantzizkorik. Zenbat da $a\\cdot b$?',
            'La matriz $A=\\begin{pmatrix}1&a\\\\2&b\\end{pmatrix}$ coincide con su traspuesta y no tiene inversa. ¿Cuánto vale $a\\cdot b$?',
            'المصفوفة $A=\\begin{pmatrix}1&a\\\\2&b\\end{pmatrix}$ تساوي منقولها وليس لها معكوس. كم يساوي $a\\cdot b$؟',
            'The matrix $A=\\begin{pmatrix}1&a\\\\2&b\\end{pmatrix}$ equals its transpose and has no inverse. What is $a\\cdot b$?'
        ),
        expected: n(8),
        hint: say('Simetrikoa: $a=2$. Alderantzizkorik ez: heina 1, errenkadak proportzionalak.', 'Simétrica: $a=2$. Sin inversa: rango 1, filas proporcionales.', 'متماثلة: $a=2$. بلا معكوس: الرتبة 1، والصفان متناسبان.', 'Symmetric: $a=2$. No inverse: rank 1, proportional rows.'),
        explanation: say('$a=2$; $(1,\\ 2)$ eta $(2,\\ b)$ proportzionalak: $b=4$. $2\\cdot 4=8$', '$a=2$; $(1,\\ 2)$ y $(2,\\ b)$ proporcionales: $b=4$. $2\\cdot 4=8$', '$a=2$؛ و$(1,\\ 2)$ و$(2,\\ b)$ متناسبان: $b=4$. $2\\cdot 4=8$', '$a=2$; $(1,\\ 2)$ and $(2,\\ b)$ proportional: $b=4$. $2\\cdot 4=8$')
    }
}

const challengeOrder: Array<number | string> = [
    'days', 102, 103,
    104, 'boxes', 'profit',
    107, 108, 109,
    110, 111, 112,
    113, 114, 'ebau'
]

export const gizarteMatrizeakChallenges: ChallengeItem[] = challengeOrder.map((key, index) => (typeof key === 'number' ? { ...twinChallenge(key), id: 101 + index } : { ...ownChallenges[key], id: 101 + index }))

/* ---------- Exercise bank: ten per stage ---------- */

const ownBank: Record<string, Omit<ExerciseItem, 'id'>> = {
    marks: {
        difficulty: 'easy',
        question: say(
            'Ane-k 7, 8 eta 6 atera ditu hiru azterketatan, eta Jon-ek 9, 5 eta 7. Idatzi notak matrize gisa, ikasleak errenkadetan, eta eman haren dimentsioa.',
            'Ane ha sacado 7, 8 y 6 en tres exámenes y Jon, 9, 5 y 7. Escribe las notas como matriz, con los alumnos en filas, y da su dimensión.',
            'حصلت آنه على 7 و8 و6 في ثلاثة امتحانات، وحصل جون على 9 و5 و7. اكتب العلامات على شكل مصفوفة، والطلاب في الصفوف، وأعطِ أبعادها.',
            'Ane got 7, 8 and 6 in three exams and Jon 9, 5 and 7. Write the marks as a matrix, with the students in rows, and give its size.'
        ),
        solution: same('$\\begin{pmatrix}7&8&6\\\\9&5&7\\end{pmatrix}\\qquad 2\\times 3$')
    },
    buses: {
        difficulty: 'medium',
        question: say(
            'Hiru autobus-lineak (A, B, C) astelehenean 5, 3 eta 4 bidaia egiten dituzte; asteartean, 2, 1 eta 4; asteazkenean, 1, 3 eta 5. Idatzi matrizea, egunak errenkadetan, eta esan zer den $a_{31}$.',
            'Tres líneas de autobús (A, B, C) hacen el lunes 5, 3 y 4 viajes; el martes, 2, 1 y 4; el miércoles, 1, 3 y 5. Escribe la matriz con los días en filas y di qué es $a_{31}$.',
            'تقوم ثلاثة خطوط حافلات (A وB وC) يوم الاثنين بـ 5 و3 و4 رحلات، ويوم الثلاثاء بـ 2 و1 و4، ويوم الأربعاء بـ 1 و3 و5. اكتب المصفوفة والأيام في الصفوف، وقل ما هو $a_{31}$.',
            'Three bus lines (A, B, C) make 5, 3 and 4 trips on Monday; 2, 1 and 4 on Tuesday; 1, 3 and 5 on Wednesday. Write the matrix with the days in rows and say what $a_{31}$ is.'
        ),
        solution: say(
            '$\\begin{pmatrix}5&3&4\\\\2&1&4\\\\1&3&5\\end{pmatrix}$; $a_{31}=1$: A lineak asteazkenean egiten dituen bidaiak.',
            '$\\begin{pmatrix}5&3&4\\\\2&1&4\\\\1&3&5\\end{pmatrix}$; $a_{31}=1$: los viajes de la línea A el miércoles.',
            '$\\begin{pmatrix}5&3&4\\\\2&1&4\\\\1&3&5\\end{pmatrix}$؛ $a_{31}=1$: رحلات الخط A يوم الأربعاء.',
            '$\\begin{pmatrix}5&3&4\\\\2&1&4\\\\1&3&5\\end{pmatrix}$; $a_{31}=1$: the trips of line A on Wednesday.'
        )
    },
    spending: {
        difficulty: 'easy',
        question: say(
            'Familia batek irailean 400 euro gastatu ditu janarian eta 120 euro fakturetan, eta urrian 500 eta 180. Idatzi bi hilabeteen gastuen $G$ matrizea eta kalkulatu bien arteko aldea, $G$ matrizearen errenkadak kenduz.',
            'Una familia gastó en septiembre 400 € en comida y 120 € en recibos, y en octubre, 500 € y 180 €. Escribe la matriz $G$ de gastos y halla cuánto subió cada gasto de un mes a otro.',
            'أنفقت أسرة في سبتمبر 400 € على الطعام و120 € على الفواتير، وفي أكتوبر 500 € و180 €. اكتب مصفوفة النفقات $G$ وأوجد كم زاد كل إنفاق من شهر إلى آخر.',
            'A family spent €400 on food and €120 on bills in September, and €500 and €180 in October. Write the matrix $G$ of spending and find how much each expense went up from one month to the next.'
        ),
        solution: say(
            '$G=\\begin{pmatrix}400&120\\\\500&180\\end{pmatrix}$; $E_2-E_1=(100,\\ 60)$: janaria 100 euro eta fakturak 60 euro.',
            '$G=\\begin{pmatrix}400&120\\\\500&180\\end{pmatrix}$; $E_2-E_1=(100,\\ 60)$: la comida sube 100 € y los recibos, 60 €.',
            '$G=\\begin{pmatrix}400&120\\\\500&180\\end{pmatrix}$؛ $E_2-E_1=(100,\\ 60)$: يزيد الطعام 100 € والفواتير 60 €.',
            '$G=\\begin{pmatrix}400&120\\\\500&180\\end{pmatrix}$; $E_2-E_1=(100,\\ 60)$: food goes up €100 and bills €60.'
        )
    },
    cannery: {
        difficulty: 'medium',
        question: say(
            'Kontserba-lantegi batek bi lata mota egiten ditu. 1. latak 100 g arrain eta 20 g olio ditu; 2. latak, 150 g arrain eta 40 g olio. Bi biltegik $\\begin{pmatrix}200&100\\\\300&50\\end{pmatrix}$ lata eskatzen dituzte (biltegiak errenkadetan, lata motak zutabeetan). Zenbat arrain eta olio (gramotan) behar du biltegi bakoitzak?',
            'Una conservera hace dos tipos de lata. La lata 1 lleva 100 g de pescado y 20 g de aceite; la lata 2, 150 g de pescado y 40 g de aceite. Dos almacenes piden $\\begin{pmatrix}200&100\\\\300&50\\end{pmatrix}$ latas (almacenes en filas, tipos de lata en columnas). ¿Cuánto pescado y aceite (en gramos) necesita cada almacén?',
            'يصنع مصنع معلبات نوعين من العلب. في العلبة 1 يوجد 100 g من السمك و20 g من الزيت، وفي العلبة 2 يوجد 150 g من السمك و40 g من الزيت. يطلب مستودعان $\\begin{pmatrix}200&100\\\\300&50\\end{pmatrix}$ علبة (المستودعات في الصفوف وأنواع العلب في الأعمدة). كم من السمك والزيت (بالغرام) يحتاج كل مستودع؟',
            'A cannery makes two types of can. Can 1 holds 100 g of fish and 20 g of oil; can 2, 150 g of fish and 40 g of oil. Two warehouses order $\\begin{pmatrix}200&100\\\\300&50\\end{pmatrix}$ cans (warehouses in rows, types of can in columns). How much fish and oil (in grams) does each warehouse need?'
        ),
        solution: same('$\\begin{pmatrix}200&100\\\\300&50\\end{pmatrix}\\begin{pmatrix}100&20\\\\150&40\\end{pmatrix}=\\begin{pmatrix}35\\,000&8000\\\\37\\,500&8000\\end{pmatrix}$')
    },
    windows: {
        difficulty: 'medium',
        question: say(
            'Eraikin batean bi etxebizitza mota daude. A motak 3 leiho txiki eta 2 handi ditu; B motak, 4 txiki eta 3 handi. Leiho txiki batek 2 kristal eta 4 bisagra ditu, eta handi batek 4 kristal eta 6 bisagra. Kalkulatu etxebizitza mota bakoitzaren kristalak eta bisagrak.',
            'En un edificio hay dos tipos de vivienda. La A tiene 3 ventanas pequeñas y 2 grandes; la B, 4 pequeñas y 3 grandes. Cada ventana pequeña lleva 2 cristales y 4 bisagras, y cada grande, 4 cristales y 6 bisagras. Halla los cristales y las bisagras de cada tipo de vivienda.',
            'في مبنى نوعان من الشقق. في الشقة A ثلاث نوافذ صغيرة واثنتان كبيرتان، وفي B أربع صغيرة وثلاث كبيرة. في كل نافذة صغيرة لوحا زجاج و4 مفصلات، وفي كل كبيرة 4 ألواح زجاج و6 مفصلات. أوجد ألواح الزجاج والمفصلات لكل نوع من الشقق.',
            'A building has two types of flat. Type A has 3 small windows and 2 large ones; type B, 4 small and 3 large. Each small window has 2 panes and 4 hinges, and each large one 4 panes and 6 hinges. Find the panes and the hinges of each type of flat.'
        ),
        solution: same('$\\begin{pmatrix}3&2\\\\4&3\\end{pmatrix}\\begin{pmatrix}2&4\\\\4&6\\end{pmatrix}=\\begin{pmatrix}14&24\\\\20&34\\end{pmatrix}$')
    },
    suppliers: {
        difficulty: 'hard',
        question: say(
            'Bi jatetxek kafea eta azukrea erosten dituzte (kiloak): $Q=\\begin{pmatrix}8&5\\\\12&6\\end{pmatrix}$. M hornitzaileak kiloa 9 eta 2 euro kobratzen ditu; N hornitzaileak, 10 eta 1 euro. Idatzi $P$ (produktuak × hornitzaileak), kalkulatu $QP$ eta esan zein hornitzaile den merkeagoa jatetxe bakoitzarentzat.',
            'Dos restaurantes compran café y azúcar (en kilos): $Q=\\begin{pmatrix}8&5\\\\12&6\\end{pmatrix}$. El proveedor M cobra el kilo a 9 € y 2 €; el proveedor N, a 10 € y 1 €. Escribe $P$ (productos × proveedores), calcula $QP$ y di qué proveedor le sale más barato a cada restaurante.',
            'يشتري مطعمان القهوة والسكر (بالكيلوغرام): $Q=\\begin{pmatrix}8&5\\\\12&6\\end{pmatrix}$. يبيع المورد M الكيلو بـ 9 € و2 €، والمورد N بـ 10 € و1 €. اكتب $P$ (المنتجات × الموردون) واحسب $QP$ وقل أي مورد أرخص لكل مطعم.',
            'Two restaurants buy coffee and sugar (in kilos): $Q=\\begin{pmatrix}8&5\\\\12&6\\end{pmatrix}$. Supplier M charges €9 and €2 a kilo; supplier N, €10 and €1. Write $P$ (products × suppliers), work out $QP$ and say which supplier is cheaper for each restaurant.'
        ),
        solution: say(
            '$QP=\\begin{pmatrix}8&5\\\\12&6\\end{pmatrix}\\begin{pmatrix}9&10\\\\2&1\\end{pmatrix}=\\begin{pmatrix}82&85\\\\120&126\\end{pmatrix}$: M merkeagoa da bientzat.',
            '$QP=\\begin{pmatrix}8&5\\\\12&6\\end{pmatrix}\\begin{pmatrix}9&10\\\\2&1\\end{pmatrix}=\\begin{pmatrix}82&85\\\\120&126\\end{pmatrix}$: M es más barato para los dos.',
            '$QP=\\begin{pmatrix}8&5\\\\12&6\\end{pmatrix}\\begin{pmatrix}9&10\\\\2&1\\end{pmatrix}=\\begin{pmatrix}82&85\\\\120&126\\end{pmatrix}$: المورد M أرخص للاثنين.',
            '$QP=\\begin{pmatrix}8&5\\\\12&6\\end{pmatrix}\\begin{pmatrix}9&10\\\\2&1\\end{pmatrix}=\\begin{pmatrix}82&85\\\\120&126\\end{pmatrix}$: M is cheaper for both.'
        )
    },
    sumRows: {
        difficulty: 'easy',
        question: say(
            'Matrize batean, 3. errenkada lehen bien batura da: $\\begin{pmatrix}2&1&4\\\\1&3&0\\\\3&4&4\\end{pmatrix}$. Zein da haren heina?',
            'En una matriz, la fila 3 es la suma de las dos primeras: $\\begin{pmatrix}2&1&4\\\\1&3&0\\\\3&4&4\\end{pmatrix}$. ¿Cuál es su rango?',
            'في مصفوفة يكون الصف 3 مجموع الصفين الأولين: $\\begin{pmatrix}2&1&4\\\\1&3&0\\\\3&4&4\\end{pmatrix}$. ما رتبتها؟',
            'In a matrix, row 3 is the sum of the first two: $\\begin{pmatrix}2&1&4\\\\1&3&0\\\\3&4&4\\end{pmatrix}$. What is its rank?'
        ),
        solution: say('$E_3=E_1+E_2$, eta $E_1$, $E_2$ ez dira proportzionalak: heina 2 da.', '$E_3=E_1+E_2$, y $E_1$, $E_2$ no son proporcionales: el rango es 2.', '$E_3=E_1+E_2$، و$E_1$ و$E_2$ غير متناسبين: الرتبة 2.', '$E_3=E_1+E_2$, and $E_1$, $E_2$ are not proportional: the rank is 2.'),
        answer: { expected: n(2) }
    },
    rankSales: {
        difficulty: 'medium',
        question: say(
            'Hiru dendaren prezioak $\\begin{pmatrix}2&4&6\\\\1&k&3\\\\3&6&9\\end{pmatrix}$ dira. Zein $k$ baliotarako du matrizeak 1 heina?',
            'Los precios de tres tiendas son $\\begin{pmatrix}2&4&6\\\\1&k&3\\\\3&6&9\\end{pmatrix}$. ¿Para qué valor de $k$ tiene la matriz rango 1?',
            'أسعار ثلاثة متاجر هي $\\begin{pmatrix}2&4&6\\\\1&k&3\\\\3&6&9\\end{pmatrix}$. لأي قيمة لـ $k$ تكون رتبة المصفوفة 1؟',
            'The prices of three shops are $\\begin{pmatrix}2&4&6\\\\1&k&3\\\\3&6&9\\end{pmatrix}$. For which value of $k$ does the matrix have rank 1?'
        ),
        solution: say('$E_3$ errenkada $E_1$ errenkadaren proportzionala da beti; $E_2=\\frac{1}{2}E_1$ izateko, $k=2$.', '$E_3$ siempre es proporcional a $E_1$; para que $E_2=\\frac{1}{2}E_1$ tiene que ser $k=2$.', '$E_3$ متناسب دائمًا مع $E_1$؛ ولكي يكون $E_2=\\frac{1}{2}E_1$ يجب أن يكون $k=2$.', '$E_3$ is always proportional to $E_1$; for $E_2=\\frac{1}{2}E_1$ you need $k=2$.'),
        answer: { expected: n(2) }
    },
    tickets: {
        difficulty: 'medium',
        question: say(
            'Museo batean, helduen 3 sarrerak eta ikasleen 2 sarrerak 26 euro balio dute, eta helduen 2 sarrerak eta ikasleen sarrera batek, 16 euro. Idatzi $AX=B$ eta ebatzi $A^{-1}$ matrizearen bidez.',
            'En un museo, 3 entradas de adulto y 2 de estudiante cuestan 26 €, y 2 de adulto y 1 de estudiante, 16 €. Escribe $AX=B$ y resuélvelo con $A^{-1}$.',
            'في متحف، تكلّف 3 تذاكر للكبار وتذكرتان للطلاب 26 €، وتذكرتان للكبار وتذكرة للطلاب 16 €. اكتب $AX=B$ وحُلّه باستعمال $A^{-1}$.',
            'At a museum, 3 adult tickets and 2 student tickets cost €26, and 2 adult tickets and 1 student ticket €16. Write $AX=B$ and solve it with $A^{-1}$.'
        ),
        solution: say(
            '$A=\\begin{pmatrix}3&2\\\\2&1\\end{pmatrix}$, $A^{-1}=\\begin{pmatrix}-1&2\\\\2&-3\\end{pmatrix}$, $X=A^{-1}\\begin{pmatrix}26\\\\16\\end{pmatrix}=\\begin{pmatrix}6\\\\4\\end{pmatrix}$: helduena 6 euro, ikasleena 4 euro.',
            '$A=\\begin{pmatrix}3&2\\\\2&1\\end{pmatrix}$, $A^{-1}=\\begin{pmatrix}-1&2\\\\2&-3\\end{pmatrix}$, $X=A^{-1}\\begin{pmatrix}26\\\\16\\end{pmatrix}=\\begin{pmatrix}6\\\\4\\end{pmatrix}$: adulto 6 €, estudiante 4 €.',
            '$A=\\begin{pmatrix}3&2\\\\2&1\\end{pmatrix}$، $A^{-1}=\\begin{pmatrix}-1&2\\\\2&-3\\end{pmatrix}$، $X=A^{-1}\\begin{pmatrix}26\\\\16\\end{pmatrix}=\\begin{pmatrix}6\\\\4\\end{pmatrix}$: تذكرة الكبار 6 € والطلاب 4 €.',
            '$A=\\begin{pmatrix}3&2\\\\2&1\\end{pmatrix}$, $A^{-1}=\\begin{pmatrix}-1&2\\\\2&-3\\end{pmatrix}$, $X=A^{-1}\\begin{pmatrix}26\\\\16\\end{pmatrix}=\\begin{pmatrix}6\\\\4\\end{pmatrix}$: adult €6, student €4.'
        )
    },
    exam: {
        difficulty: 'hard',
        question: say(
            '$A=\\begin{pmatrix}1&0\\\\1&1\\end{pmatrix}$ izanik, ebatzi $XA+2I=A^2$ eta eman $X$.',
            'Con $A=\\begin{pmatrix}1&0\\\\1&1\\end{pmatrix}$, resuelve $XA+2I=A^2$ y da $X$.',
            'مع $A=\\begin{pmatrix}1&0\\\\1&1\\end{pmatrix}$ حُلّ $XA+2I=A^2$ وأعطِ $X$.',
            'With $A=\\begin{pmatrix}1&0\\\\1&1\\end{pmatrix}$, solve $XA+2I=A^2$ and give $X$.'
        ),
        solution: same('$X=(A^2-2I)A^{-1}=\\begin{pmatrix}-1&0\\\\2&-1\\end{pmatrix}\\begin{pmatrix}1&0\\\\-1&1\\end{pmatrix}=\\begin{pmatrix}-1&0\\\\3&-1\\end{pmatrix}$')
    }
}

const sectionOrder: Record<string, Array<number | string>> = {
    basics: [1, 'marks', 2, 3, 4, 'buses', 5, 6, 7, 8],
    operations: [11, 12, 'spending', 13, 14, 15, 'cannery', 'windows', 17, 'suppliers'],
    rank: ['sumRows', 22, 23, 24, 25, 'rankSales', 27, 28, 29, 30],
    inverse: [31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
    equations: [41, 42, 43, 44, 45, 'tickets', 46, 47, 48, 'exam']
}

let bankId = 0
export const gizarteMatrizeakExerciseBank: ExerciseSection[] = matrizeakExerciseBank.map((section) => ({
    ...section,
    items: sectionOrder[section.id].map((key) => {
        bankId += 1
        return typeof key === 'number' ? { ...twinBank(key), id: bankId } : { ...ownBank[key], id: bankId }
    })
}))

import type { LessonCheck, LessonMistake, LocalizedText } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Matrizeak · Batxilergoa 2 · Gizarte Zientziak — the typical mistake and
   the «Check it» question of the four lessons of this unit (the others
   come from the Ciencias twin with their own). Plain data so the tests can
   import it; lessons.tsx merges it into the topics. New numbers, never
   those of «Let's solve» or of the example.
   ========================================================================== */

export type GizarteMatrizeakTopicId = 'data-tables' | 'costs-profits' | 'production-chain' | 'matrix-form-system'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => say(value, value, value, value)

export const gizarteMatrizeakLessonChecks: Record<GizarteMatrizeakTopicId, { mistake: LessonMistake; check: LessonCheck }> = {
    'data-tables': {
        mistake: {
            wrong: say(
                'Salmenten taulan dendak errenkadetan eta produktuak zutabeetan daude; beraz, $a_{12}$ elementua 1. produktuak 2. dendan izan dituen salmentak dira.',
                'En la tabla de ventas, las tiendas van en filas y los productos en columnas, así que $a_{12}$ son las ventas del producto 1 en la tienda 2.',
                'في جدول المبيعات تكون المتاجر في الصفوف والمنتجات في الأعمدة، إذن $a_{12}$ هو مبيعات المنتج 1 في المتجر 2.',
                'In the sales table the shops are in rows and the products in columns, so $a_{12}$ is the sales of product 1 in shop 2.'
            ),
            right: say(
                'Lehenik errenkada: $a_{12}$ elementua 1. denda eta 2. produktua da, hau da, 1. dendak 2. produktutik saldu duena.',
                'Primero la fila: $a_{12}$ es la tienda 1 y el producto 2, es decir, lo que vende la tienda 1 del producto 2.',
                'الصف أولًا: $a_{12}$ هو المتجر 1 والمنتج 2، أي ما يبيعه المتجر 1 من المنتج 2.',
                'Row first: $a_{12}$ is shop 1 and product 2, that is, what shop 1 sells of product 2.'
            )
        },
        check: {
            prompt: say(
                'Matrize batek 4 jatetxek (errenkadak) 3 barazkitatik (zutabeak) erosten dituzten kiloak jasotzen ditu. Zein da haren dimentsioa?',
                'Una matriz recoge los kilos que compran 4 restaurantes (filas) de 3 verduras (columnas). ¿Qué dimensión tiene?',
                'مصفوفة تجمع الكيلوغرامات التي تشتريها 4 مطاعم (الصفوف) من 3 أنواع من الخضار (الأعمدة). ما أبعادها؟',
                'A matrix records the kilos that 4 restaurants (rows) buy of 3 vegetables (columns). What size is it?'
            ),
            options: [same('$3\\times 4$'), same('$4\\times 3$'), same('$12$')],
            correctIndex: 1,
            explanation: say(
                'Errenkada bat jatetxe bakoitzeko eta zutabe bat barazki bakoitzeko: $4\\times 3$.',
                'Una fila por restaurante y una columna por verdura: $4\\times 3$.',
                'صف لكل مطعم وعمود لكل نوع من الخضار: $4\\times 3$.',
                'One row per restaurant and one column per vegetable: $4\\times 3$.'
            )
        }
    },
    'costs-profits': {
        mistake: {
            wrong: say(
                'Denda bakoitzaren gastua kalkulatzeko, $PQ$ egiten dut: prezioen zutabea bider kopuruen matrizea.',
                'Para el gasto de cada tienda hago $PQ$: la columna de precios por la matriz de cantidades.',
                'لحساب إنفاق كل متجر أحسب $PQ$: عمود الأسعار في مصفوفة الكميات.',
                'To get what each shop spends I work out $PQ$: the column of prices times the matrix of quantities.'
            ),
            right: say(
                '$P$ matrizea $2\\times 1$ da eta $Q$ matrizea $2\\times 2$: $PQ$ ezin da egin. Kopuruak lehenik doaz, $QP$, eta dendak errenkadetan ateratzen dira.',
                '$P$ es $2\\times 1$ y $Q$ es $2\\times 2$: $PQ$ no se puede hacer. Las cantidades van primero, $QP$, y salen las tiendas en filas.',
                '$P$ من الأبعاد $2\\times 1$ و$Q$ من الأبعاد $2\\times 2$: لا يمكن حساب $PQ$. الكميات أولًا، $QP$، فتظهر المتاجر في الصفوف.',
                '$P$ is $2\\times 1$ and $Q$ is $2\\times 2$: $PQ$ cannot be done. The quantities go first, $QP$, and the shops come out in rows.'
            )
        },
        check: {
            prompt: say(
                'Bi dendak kafea eta tea saltzen dituzte (kiloak): $Q=\\begin{pmatrix}10&20\\\\14&11\\end{pmatrix}$, errenkadetan dendak eta zutabeetan kafea eta tea. Kafea 8 euro da kiloa, eta tea 5 euro. Zenbat jasotzen du lehen dendak?',
                'Dos tiendas venden café y té (en kilos): $Q=\\begin{pmatrix}10&20\\\\14&11\\end{pmatrix}$, con las tiendas en filas y el café y el té en columnas. El café sale a 8 € el kilo y el té, a 5 €. ¿Cuánto ingresa la primera tienda?',
                'يبيع متجران القهوة والشاي (بالكيلوغرام): $Q=\\begin{pmatrix}10&20\\\\14&11\\end{pmatrix}$، المتاجر في الصفوف والقهوة والشاي في الأعمدة. سعر كيلو القهوة 8 € وكيلو الشاي 5 €. كم يكون إيراد المتجر الأول؟',
                'Two shops sell coffee and tea (in kilos): $Q=\\begin{pmatrix}10&20\\\\14&11\\end{pmatrix}$, with the shops in rows and coffee and tea in columns. Coffee costs €8 a kilo and tea €5. How much does the first shop take in?'
            ),
            options: [same('$150$'), same('$210$'), same('$180$')],
            correctIndex: 2,
            explanation: say(
                '1. errenkada bider prezioen zutabea: $10\\cdot 8+20\\cdot 5=180$ euro.',
                'Fila 1 por la columna de precios: $10\\cdot 8+20\\cdot 5=180$ euros.',
                'الصف 1 في عمود الأسعار: $10\\cdot 8+20\\cdot 5=180$ يورو.',
                'Row 1 times the column of prices: $10\\cdot 8+20\\cdot 5=180$ euros.'
            )
        }
    },
    'production-chain': {
        mistake: {
            wrong: say(
                'Etxe bakoitzaren piezak lortzeko, $BA$ egiten dut: piezak bider etxeak.',
                'Para las piezas de cada casa hago $BA$: piezas por casas.',
                'للحصول على قطع كل بيت أحسب $BA$: القطع في البيوت.',
                'To get the parts of each house I work out $BA$: parts times houses.'
            ),
            right: say(
                'Ordena katearena da: etxeak → leihoak → piezak; beraz, $AB$. $BA$ biderkadurak ez du zentzurik: leihoak eta etxeak nahasten ditu.',
                'El orden es el de la cadena: casas → ventanas → piezas, así que $AB$. $BA$ no tiene sentido: mezcla ventanas con casas.',
                'الترتيب هو ترتيب السلسلة: البيوت ← النوافذ ← القطع، إذن $AB$. أما $BA$ فلا معنى له: يخلط النوافذ بالبيوت.',
                'The order is the chain\'s: houses → windows → parts, so $AB$. $BA$ makes no sense: it mixes windows with houses.'
            )
        },
        check: {
            prompt: say(
                '$A$ matrizeak pastel bakoitzaren osagaiak ematen ditu (pastelak × osagaiak), eta $B$ matrizeak osagai bakoitzaren prezioa bi dendatan (osagaiak × dendak). Zein biderkadurak ematen du pastel bakoitzak denda bakoitzean zenbat balio duen?',
                '$A$ da los ingredientes de cada pastel (pasteles × ingredientes) y $B$, el precio de cada ingrediente en dos tiendas (ingredientes × tiendas). ¿Qué producto da lo que cuesta cada pastel en cada tienda?',
                '$A$ تعطي مكوّنات كل كعكة (الكعكات × المكوّنات) و$B$ سعر كل مكوّن في متجرين (المكوّنات × المتاجر). أي جداء يعطي كلفة كل كعكة في كل متجر؟',
                '$A$ gives the ingredients of each cake (cakes × ingredients) and $B$ the price of each ingredient in two shops (ingredients × shops). Which product gives what each cake costs in each shop?'
            ),
            options: [same('$BA$'), same('$AB$'), same('$A+B$')],
            correctIndex: 1,
            explanation: say(
                'Pastelak → osagaiak → dendak: $AB$, pastelak × dendak.',
                'Pasteles → ingredientes → tiendas: $AB$, que es pasteles × tiendas.',
                'الكعكات ← المكوّنات ← المتاجر: $AB$، أي الكعكات × المتاجر.',
                'Cakes → ingredients → shops: $AB$, which is cakes × shops.'
            )
        }
    },
    'matrix-form-system': {
        mistake: {
            wrong: same('$AX=B\\ \\to\\ X=BA^{-1}$'),
            right: say(
                '$A$ matrizea $X$ matrizearen ezkerrean dago: $A^{-1}$ matrizeaz ezkerretik biderkatzen da, $X=A^{-1}B$. Gainera, $BA^{-1}$ ezin da egin: $B$ zutabe bat da.',
                '$A$ está a la izquierda de $X$: se multiplica por $A^{-1}$ por la izquierda, $X=A^{-1}B$. Además, $BA^{-1}$ no se puede hacer: $B$ es una columna.',
                '$A$ على يسار $X$: نضرب في $A^{-1}$ من اليسار، $X=A^{-1}B$. ثم إن $BA^{-1}$ لا يمكن حسابه: $B$ عمود.',
                '$A$ is to the left of $X$: you multiply by $A^{-1}$ on the left, $X=A^{-1}B$. Besides, $BA^{-1}$ cannot be done: $B$ is a column.'
            )
        },
        check: {
            prompt: say(
                'Zein da $x-2y=7$, $4x+y=1$ sistemaren forma matriziala?',
                '¿Cuál es la forma matricial de $x-2y=7$, $4x+y=1$?',
                'ما الشكل المصفوفي للنظام $x-2y=7$، $4x+y=1$؟',
                'What is the matrix form of $x-2y=7$, $4x+y=1$?'
            ),
            options: [
                same('$\\begin{pmatrix}1&-2\\\\4&1\\end{pmatrix}\\begin{pmatrix}x\\\\y\\end{pmatrix}=\\begin{pmatrix}7\\\\1\\end{pmatrix}$'),
                same('$\\begin{pmatrix}1&4\\\\-2&1\\end{pmatrix}\\begin{pmatrix}x\\\\y\\end{pmatrix}=\\begin{pmatrix}7\\\\1\\end{pmatrix}$'),
                same('$\\begin{pmatrix}1&-2\\\\4&1\\end{pmatrix}\\begin{pmatrix}7\\\\1\\end{pmatrix}=\\begin{pmatrix}x\\\\y\\end{pmatrix}$')
            ],
            correctIndex: 0,
            explanation: say(
                'Errenkada bat ekuazio bakoitzeko, koefizienteak ordenan: $\\begin{pmatrix}1&-2\\\\4&1\\end{pmatrix}$.',
                'Una fila por ecuación, con sus coeficientes en orden: $\\begin{pmatrix}1&-2\\\\4&1\\end{pmatrix}$.',
                'صف لكل معادلة، ومعاملاتها بالترتيب: $\\begin{pmatrix}1&-2\\\\4&1\\end{pmatrix}$.',
                'One row per equation, with its coefficients in order: $\\begin{pmatrix}1&-2\\\\4&1\\end{pmatrix}$.'
            )
        }
    }
}

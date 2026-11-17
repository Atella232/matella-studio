import type { LocalizedText, UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { matrizeakStages, matrizeakTopics } from '../batx2-zientziak-matrizeak/lessons'
import { ChainFigure, MatrixFormFigure, ProfitFigure, TableMatrixFigure } from './figures'
import { gizarteMatrizeakLessonChecks, type GizarteMatrizeakTopicId } from './lessonChecks'
import { gizarteMatrizeakLessonTexts } from './lessonTexts'

/* ==========================================================================
   Matrizeak · Batxilergoa 2 · Gizarte Zientziak — stages and lessons. The
   scope follows unit 1 of Santillana 2.º Bachillerato CCSS and unit 2 of
   Anaya Matemáticas Aplicadas a las CCSS II. As the owner chose (2026-11-17),
   the lessons of pure calculation come from the Ciencias twin as they are
   (imported, never copied or edited), and the four lessons with an economic
   context are this unit's own: from a table to a matrix, costs and profit,
   production chains and the matrix form of a system. Linear dependence of
   rows (not in the Sociales books) and commuting matrices stay out.
   ========================================================================== */

export type GizarteMatrizeakStageId = 'basics' | 'operations' | 'rank' | 'inverse' | 'equations'

export const gizarteMatrizeakStages: UnitStage[] = matrizeakStages

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })

/** The lessons of this unit without what they tell, which lives in lessonTexts.ts */
const ownTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    {
        id: 'data-tables',
        stage: 'basics',
        title: say('Taulatik matrizera', 'De la tabla a la matriz', 'من الجدول إلى المصفوفة', 'From a table to a matrix'),
        goal: say('Taula bateko datuak matrize gisa idaztea, haren dimentsioa ematea eta elementu bat zer den jakinda irakurtzea.', 'Escribir los datos de una tabla como matriz, dar su dimensión y leer un elemento sabiendo qué significa.', 'كتابة معطيات جدول على شكل مصفوفة، وإعطاء أبعادها، وقراءة عنصر مع معرفة معناه.', 'Write the data of a table as a matrix, give its size and read an entry knowing what it means.'),
        needs: [
            { unit: 'batx1-zientziak/sistemas', topic: 'augmented-matrix', title: { eu: 'Matrize zabaldua', es: 'La matriz ampliada', en: 'The augmented matrix', ar: 'المصفوفة الموسعة' } }
        ],
        problem: say(
            'Akademia batek bi talde ditu. A taldean 15 ikasle daude ingelesean, 9 frantsesean eta 6 alemanean; B taldean, 18, 8 eta 13. Idatzi matrizea, eman haren dimentsioa eta esan zer den $a_{23}$.',
            'Una academia tiene dos grupos. En el A hay 15 alumnos de inglés, 9 de francés y 6 de alemán; en el B, 18, 8 y 13. Escribe la matriz, da su dimensión y di qué significa $a_{23}$.',
            'لأكاديمية مجموعتان. في المجموعة A يوجد 15 طالبًا في الإنجليزية و9 في الفرنسية و6 في الألمانية؛ وفي B يوجد 18 و8 و13. اكتب المصفوفة وأعطِ أبعادها وقل ما معنى $a_{23}$.',
            'An academy has two groups. Group A has 15 students of English, 9 of French and 6 of German; group B, 18, 8 and 13. Write the matrix, give its size and say what $a_{23}$ means.'
        ),
        stepsKind: 'steps',
        steps: [
            { text: say('Errenkada bat talde bakoitzeko eta zutabe bat hizkuntza bakoitzeko, taularen ordenan.', 'Una fila por grupo y una columna por idioma, en el orden de la tabla.', 'صف لكل مجموعة وعمود لكل لغة، بترتيب الجدول.', 'One row per group and one column per language, in the order of the table.'), math: same('$M=\\begin{pmatrix}15&9&6\\\\18&8&13\\end{pmatrix}$') },
            { text: say('2 errenkada eta 3 zutabe ditu.', 'Tiene 2 filas y 3 columnas.', 'لها صفّان و3 أعمدة.', 'It has 2 rows and 3 columns.'), math: same('$2\\times 3$') },
            { text: say('$a_{23}$ elementua 2. errenkadan (B taldea) eta 3. zutabean (alemana) dago: B taldeko alemaneko ikasleak.', '$a_{23}$ está en la fila 2 (grupo B) y la columna 3 (alemán): son los alumnos de alemán del grupo B.', '$a_{23}$ في الصف 2 (المجموعة B) والعمود 3 (الألمانية): هم طلاب الألمانية في المجموعة B.', '$a_{23}$ is in row 2 (group B) and column 3 (German): the German students of group B.'), math: same('$a_{23}=13$') }
        ],
        takeaway: say(
            '$m\\times n$ matrize batek $m$ errenkada eta $n$ zutabe ditu, eta $a_{ij}$ elementua $i$ errenkadan eta $j$ zutabean dago. Problema batean, esan zer doan errenkadetan eta zer zutabeetan: hortik dator elementu bakoitzaren esanahia.',
            'Una matriz $m\\times n$ tiene $m$ filas y $n$ columnas, y $a_{ij}$ está en la fila $i$ y la columna $j$. En un problema, di qué va en las filas y qué en las columnas: de ahí sale el significado de cada elemento.',
            'للمصفوفة $m\\times n$ عدد $m$ من الصفوف و$n$ من الأعمدة، والعنصر $a_{ij}$ في الصف $i$ والعمود $j$. وفي المسألة قل ما في الصفوف وما في الأعمدة: من ذلك يأتي معنى كل عنصر.',
            'An $m\\times n$ matrix has $m$ rows and $n$ columns, and $a_{ij}$ is in row $i$ and column $j$. In a problem, say what goes in the rows and what in the columns: that is where the meaning of each entry comes from.'
        ),
        figure: (language) => <TableMatrixFigure language={language} />
    },
    {
        id: 'costs-profits',
        stage: 'operations',
        title: say('Kostuak, diru-sarrerak eta irabaziak', 'Costes, ingresos y beneficios', 'التكاليف والإيرادات والأرباح', 'Costs, income and profit'),
        goal: say('Kopuru-matrize bat prezio-zutabe batez biderkatzea gastuak, diru-sarrerak eta irabaziak kalkulatzeko, eta emaitza irakurtzea.', 'Multiplicar una matriz de cantidades por una columna de precios para hallar gastos, ingresos y beneficios, y leer el resultado.', 'ضرب مصفوفة كميات في عمود أسعار لإيجاد النفقات والإيرادات والأرباح، وقراءة الناتج.', 'Multiply a matrix of quantities by a column of prices to find costs, income and profit, and read the result.'),
        problem: say(
            'Lantegi batek aulkiak eta mahaiak egiten ditu. Urtarrilean 40 aulki eta 10 mahai egiten ditu; otsailean, 20 aulki eta 15 mahai. Aulki bakoitzak 25 euro balio du egitea eta 40 eurotan saltzen da; mahai bakoitzak 60 euro eta 90 eurotan. Zenbat irabazten du hilabete bakoitzean?',
            'Una fábrica hace sillas y mesas. En enero fabrica 40 sillas y 10 mesas; en febrero, 20 sillas y 15 mesas. Cada silla cuesta 25 € y se vende a 40 €; cada mesa cuesta 60 € y se vende a 90 €. ¿Qué beneficio deja cada mes?',
            'مصنع يصنع كراسي وطاولات. في يناير يصنع 40 كرسيًا و10 طاولات، وفي فبراير 20 كرسيًا و15 طاولة. كلفة الكرسي 25 € ويُباع بـ 40 €، وكلفة الطاولة 60 € وتُباع بـ 90 €. ما ربح كل شهر؟',
            'A factory makes chairs and tables. In January it makes 40 chairs and 10 tables; in February, 20 chairs and 15 tables. Each chair costs €25 and sells for €40; each table costs €60 and sells for €90. What profit does each month leave?'
        ),
        stepsKind: 'steps',
        steps: [
            { text: say('$Q$: hilabeteak × produktuak. $C$ kostuak eta $V$ prezioak zutabeetan doaz, errenkada bat produktu bakoitzeko.', '$Q$: meses × productos. Los costes $C$ y los precios $V$ van en columnas, una fila por producto.', '$Q$: الأشهر × المنتجات. التكاليف $C$ والأسعار $V$ في أعمدة، صف لكل منتج.', '$Q$: months × products. The costs $C$ and the prices $V$ go in columns, one row per product.'), math: same('$Q=\\begin{pmatrix}40&10\\\\20&15\\end{pmatrix}\\qquad C=\\begin{pmatrix}25\\\\60\\end{pmatrix}\\qquad V=\\begin{pmatrix}40\\\\90\\end{pmatrix}$') },
            { text: say('Unitateko irabazia: prezioa ken kostua.', 'Beneficio por unidad: precio menos coste.', 'الربح للوحدة: السعر ناقص الكلفة.', 'Profit per unit: price minus cost.'), math: same('$V-C=\\begin{pmatrix}15\\\\30\\end{pmatrix}$') },
            { text: say('Biderkatu errenkada bider zutabe: urtarrilak 900 euro uzten ditu, eta otsailak 750 euro.', 'Multiplica fila por columna: enero deja 900 € y febrero, 750 €.', 'اضرب صفًّا في عمود: يترك يناير 900 € وفبراير 750 €.', 'Multiply row by column: January leaves €900 and February €750.'), math: same('$Q(V-C)=\\begin{pmatrix}900\\\\750\\end{pmatrix}$') }
        ],
        takeaway: say(
            'Jarri kopuruak errenkadetan (hilabete bat, denda bat) eta unitateko prezioak zutabe batean, errenkada bat produktu bakoitzeko: $QP$ biderkadurak errenkada bakoitzaren guztizkoa ematen du. Irabazia diru-sarrera ken kostua da: $QV-QC=Q(V-C)$.',
            'Pon las cantidades en filas (un mes, una tienda) y los precios por unidad en una columna, una fila por producto: $QP$ da el total de cada fila. El beneficio es ingreso menos coste: $QV-QC=Q(V-C)$.',
            'ضع الكميات في صفوف (شهر، متجر) وأسعار الوحدة في عمود، صف لكل منتج: $QP$ يعطي مجموع كل صف. والربح هو الإيراد ناقص الكلفة: $QV-QC=Q(V-C)$.',
            'Put the quantities in rows (a month, a shop) and the prices per unit in a column, one row per product: $QP$ gives the total of each row. Profit is income minus cost: $QV-QC=Q(V-C)$.'
        ),
        figure: (language) => <ProfitFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'production-chain',
        stage: 'operations',
        title: say('Ekoizpen-kateak', 'Cadenas de producción', 'سلاسل الإنتاج', 'Production chains'),
        goal: say('Bi urratseko problema bat (etxeak → leihoak → piezak) bi matrizeren biderkadura gisa idaztea, katearen ordenan.', 'Escribir un problema de dos pasos (casas → ventanas → piezas) como el producto de dos matrices, en el orden de la cadena.', 'كتابة مسألة بخطوتين (البيوت ← النوافذ ← القطع) على شكل جداء مصفوفتين بترتيب السلسلة.', 'Write a two-step problem (houses → windows → parts) as the product of two matrices, in the order of the chain.'),
        problem: say(
            'Eraikuntza-enpresa batek bi motatako etxeak egiten ditu. 1. motak 4 leiho txiki eta 2 handi ditu; 2. motak, 3 txiki eta 5 handi. Leiho txiki bakoitzak 2 kristal eta 4 bisagra ditu; handi bakoitzak, 3 kristal eta 5 bisagra. Zenbat kristal eta bisagra ditu etxe-mota bakoitzak?',
            'Una constructora hace casas de dos tipos. El tipo 1 lleva 4 ventanas pequeñas y 2 grandes; el tipo 2, 3 pequeñas y 5 grandes. Cada ventana pequeña lleva 2 cristales y 4 bisagras, y cada grande, 3 cristales y 5 bisagras. ¿Cuántos cristales y bisagras lleva cada tipo de casa?',
            'شركة بناء تبني بيوتًا من نوعين. النوع 1 فيه 4 نوافذ صغيرة و2 كبيرتان، والنوع 2 فيه 3 صغيرة و5 كبيرة. كل نافذة صغيرة فيها لوحا زجاج و4 مفصلات، وكل كبيرة فيها 3 ألواح زجاج و5 مفصلات. كم لوح زجاج وكم مفصلة في كل نوع من البيوت؟',
            'A builder makes two types of house. Type 1 has 4 small windows and 2 large ones; type 2, 3 small and 5 large. Each small window has 2 panes and 4 hinges, and each large one 3 panes and 5 hinges. How many panes and hinges does each type of house have?'
        ),
        stepsKind: 'steps',
        steps: [
            { text: say('$A$: etxeak × leihoak. $B$: leihoak × piezak. Erdiko katebegiak, leihoek, biak lotzen dituzte.', '$A$: casas × ventanas. $B$: ventanas × piezas. El eslabón del medio, las ventanas, une las dos.', '$A$: البيوت × النوافذ. $B$: النوافذ × القطع. الحلقة الوسطى، النوافذ، تربط بينهما.', '$A$: houses × windows. $B$: windows × parts. The middle link, the windows, joins the two.'), math: same('$A=\\begin{pmatrix}4&2\\\\3&5\\end{pmatrix}\\qquad B=\\begin{pmatrix}2&4\\\\3&5\\end{pmatrix}$') },
            { text: say('Biderkatu katearen ordenan: etxeak → leihoak → piezak.', 'Multiplica en el orden de la cadena: casas → ventanas → piezas.', 'اضرب بترتيب السلسلة: البيوت ← النوافذ ← القطع.', 'Multiply in the order of the chain: houses → windows → parts.'), math: same('$AB=\\begin{pmatrix}4\\cdot 2+2\\cdot 3&4\\cdot 4+2\\cdot 5\\\\3\\cdot 2+5\\cdot 3&3\\cdot 4+5\\cdot 5\\end{pmatrix}$') },
            { text: say('Irakurri: 2. motako etxeak 21 kristal eta 37 bisagra ditu.', 'Lee: la casa de tipo 2 lleva 21 cristales y 37 bisagras.', 'اقرأ: في بيت النوع 2 يوجد 21 لوح زجاج و37 مفصلة.', 'Read it: a type 2 house has 21 panes and 37 hinges.'), math: same('$AB=\\begin{pmatrix}14&26\\\\21&37\\end{pmatrix}$') }
        ],
        takeaway: say(
            'Bi urratseko kate batean (etxeak → leihoak → piezak) matrizeak katearen ordenan biderkatzen dira: $AB$ biderkadurak etxeak × piezak ematen ditu. Erdiko katebegia $A$ matrizearen zutabeak eta $B$ matrizearen errenkadak dira; bat ez badatoz, biderkadurak ez du zentzurik.',
            'En una cadena de dos pasos (casas → ventanas → piezas) las matrices se multiplican en el orden de la cadena: $AB$ da casas × piezas. El eslabón del medio son las columnas de $A$ y las filas de $B$; si no coinciden, el producto no tiene sentido.',
            'في سلسلة بخطوتين (البيوت ← النوافذ ← القطع) تُضرب المصفوفات بترتيب السلسلة: $AB$ يعطي البيوت × القطع. والحلقة الوسطى هي أعمدة $A$ وصفوف $B$؛ وإذا لم تتطابق فلا معنى للجداء.',
            'In a two-step chain (houses → windows → parts) the matrices are multiplied in the order of the chain: $AB$ gives houses × parts. The middle link is the columns of $A$ and the rows of $B$; if they do not match, the product makes no sense.'
        ),
        figure: (language) => <ChainFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'matrix-form-system',
        stage: 'equations',
        title: say('Sistema baten forma matriziala', 'La forma matricial de un sistema', 'الشكل المصفوفي للنظام', 'The matrix form of a system'),
        goal: say('Ekuazio-sistema bat $AX=B$ gisa idaztea eta, $A$ matrizeak alderantzizkoa badu, $X=A^{-1}B$ eginez ebaztea.', 'Escribir un sistema de ecuaciones como $AX=B$ y, si $A$ tiene inversa, resolverlo con $X=A^{-1}B$.', 'كتابة نظام معادلات على الشكل $AX=B$، وإذا كان لـ $A$ معكوس حلّه بـ $X=A^{-1}B$.', 'Write a system of equations as $AX=B$ and, if $A$ has an inverse, solve it with $X=A^{-1}B$.'),
        needs: [
            { unit: 'batx1-zientziak/sistemas', topic: 'gauss-method', title: { eu: 'Gaussen metodoa', es: 'El método de Gauss', en: 'Gaussian elimination', ar: 'طريقة غاوس' } }
        ],
        problem: say(
            'Zinema batean, helduen 2 sarrerak eta haurren 3 sarrerak 31 euro balio dute, eta helduen sarrera batek eta haurren 2 sarrerak, 18 euro. Idatzi sistema $AX=B$ gisa eta ebatzi $A^{-1}$ matrizearen bidez.',
            'En un cine, 2 entradas de adulto y 3 de niño cuestan 31 €, y 1 de adulto y 2 de niño, 18 €. Escribe el sistema como $AX=B$ y resuélvelo con $A^{-1}$.',
            'في سينما، تكلّف تذكرتان للكبار و3 للأطفال 31 €، وتذكرة للكبار وتذكرتان للأطفال 18 €. اكتب النظام على الشكل $AX=B$ وحُلّه باستعمال $A^{-1}$.',
            'At a cinema, 2 adult tickets and 3 child tickets cost €31, and 1 adult and 2 child tickets cost €18. Write the system as $AX=B$ and solve it with $A^{-1}$.'
        ),
        stepsKind: 'steps',
        steps: [
            { text: say('Koefizienteak $A$ matrizean, ezezagunak $X$ zutabean eta gai askeak $B$ zutabean.', 'Coeficientes en $A$, incógnitas en la columna $X$ y términos independientes en $B$.', 'المعاملات في $A$، والمجاهيل في العمود $X$، والحدود الثابتة في $B$.', 'Coefficients in $A$, unknowns in the column $X$ and constant terms in $B$.'), math: same('$\\begin{pmatrix}2&3\\\\1&2\\end{pmatrix}\\begin{pmatrix}x\\\\y\\end{pmatrix}=\\begin{pmatrix}31\\\\18\\end{pmatrix}$') },
            { text: say('Kalkulatu $A$ matrizearen alderantzizkoa (Gauss-Jordan metodoaz).', 'Calcula la inversa de $A$ (por Gauss-Jordan).', 'احسب معكوس $A$ (بطريقة غاوس-جوردان).', 'Work out the inverse of $A$ (by Gauss–Jordan).'), math: same('$A^{-1}=\\begin{pmatrix}2&-3\\\\-1&2\\end{pmatrix}$') },
            { text: say('Biderkatu ezkerretik: helduen sarrerak 8 euro balio du, eta haurrenak 5 euro.', 'Multiplica por la izquierda: la entrada de adulto cuesta 8 € y la de niño, 5 €.', 'اضرب من اليسار: تذكرة الكبار بـ 8 € وتذكرة الأطفال بـ 5 €.', 'Multiply on the left: an adult ticket costs €8 and a child ticket €5.'), math: same('$X=A^{-1}B=\\begin{pmatrix}2&-3\\\\-1&2\\end{pmatrix}\\begin{pmatrix}31\\\\18\\end{pmatrix}=\\begin{pmatrix}8\\\\5\\end{pmatrix}$') }
        ],
        takeaway: say(
            'Sistema lineal bat $AX=B$ idazten da: $A$ koefizienteekin, $X$ ezezagunekin zutabean eta $B$ gai askeekin. $A$ matrizeak alderantzizkoa badu, soluzio bakarra dago: $X=A^{-1}B$, ezkerretik biderkatuz.',
            'Un sistema lineal se escribe $AX=B$: $A$ con los coeficientes, $X$ con las incógnitas en columna y $B$ con los términos independientes. Si $A$ tiene inversa, la solución es única: $X=A^{-1}B$, multiplicando por la izquierda.',
            'يُكتب النظام الخطي $AX=B$: $A$ بالمعاملات، و$X$ بالمجاهيل في عمود، و$B$ بالحدود الثابتة. وإذا كان لـ $A$ معكوس فالحل وحيد: $X=A^{-1}B$، بالضرب من اليسار.',
            'A linear system is written $AX=B$: $A$ with the coefficients, $X$ with the unknowns in a column and $B$ with the constant terms. If $A$ has an inverse, the solution is unique: $X=A^{-1}B$, multiplying on the left.'
        ),
        figure: (language) => <MatrixFormFigure language={language} />
    }
]

const own = Object.fromEntries(ownTopics.map((topic) => [topic.id, {
    ...topic,
    ...gizarteMatrizeakLessonTexts[topic.id as GizarteMatrizeakTopicId],
    ...gizarteMatrizeakLessonChecks[topic.id as GizarteMatrizeakTopicId]
} as UnitTopic]))
const twin = Object.fromEntries(matrizeakTopics.map((topic) => [topic.id, topic]))

/** The order of the unit: this unit's lessons among those of the Ciencias twin */
const order = [
    'data-tables', 'matrix-types', 'transpose-symmetric',
    'sum-scalar', 'matrix-product', 'product-properties', 'costs-profits', 'production-chain',
    'rank-gauss', 'rank-parameter',
    'inverse-definition', 'gauss-jordan', 'matrix-powers',
    'matrix-equations', 'equation-systems', 'matrix-form-system'
]

/** The lesson ids borrowed from the Ciencias twin */
export const gizarteMatrizeakTwinTopicIds = order.filter((id) => !(id in own))

export const gizarteMatrizeakTopics: UnitTopic[] = order.map((id) => own[id] ?? twin[id])

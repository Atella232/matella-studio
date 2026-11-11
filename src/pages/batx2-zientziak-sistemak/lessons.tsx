import type { LocalizedText, UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { AugmentedFigure, CramerFigure, ParameterMapFigure, RoucheFigure, ThreeLinesFigure } from './figures'
import { sistemakLessonChecks, type SistemakTopicId } from './lessonChecks'
import { sistemakLessonTexts } from './lessonTexts'

/* ==========================================================================
   Sistemak · Batxilergoa 2 · Zientziak — stages and lessons. The scope
   follows unit 3 of Santillana 2.º Bachillerato Ciencias and unit 3 of
   Anaya Matemáticas II from what 1.º Bachillerato does not cover: the
   matrix form and A*, the Rouché–Frobenius theorem with ranks by minors,
   Cramer's rule (also with infinitely many solutions), the inverse,
   homogeneous systems, and discussing a system with a parameter as the
   Basque university entrance exams ask. All the exercises are ours. The
   augmented matrix is written A*, as in Santillana.
   ========================================================================== */

export type SistemakStageId = 'rouche' | 'cramer' | 'homogeneous' | 'discussion' | 'problems'

export const sistemakStages: UnitStage[] = [
    { id: 'rouche', tone: 'blue', title: { eu: 'Rouché-Frobenius', es: 'Rouché-Frobenius', en: 'Rouché–Frobenius', ar: 'روشيه-فروبينيوس' } },
    { id: 'cramer', tone: 'violet', title: { eu: 'Cramerren erregela', es: 'La regla de Cramer', en: 'Cramer\'s rule', ar: 'قاعدة كرامر' } },
    { id: 'homogeneous', tone: 'mustard', title: { eu: 'Sistema homogeneoak', es: 'Sistemas homogéneos', en: 'Homogeneous systems', ar: 'الأنظمة المتجانسة' } },
    { id: 'discussion', tone: 'coral', title: { eu: 'Parametro baten araberako eztabaida', es: 'Discusión según un parámetro', en: 'Discussing with a parameter', ar: 'المناقشة حسب وسيط' } },
    { id: 'problems', tone: 'green', title: { eu: 'Problemak', es: 'Problemas', en: 'Problems', ar: 'المسائل' } }
]

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })

const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    /* ---------- 1. Rouché–Frobenius ---------- */
    {
        id: 'matrix-form',
        stage: 'rouche',
        title: say('Forma matriziala eta matrize zabaldua', 'Forma matricial y matriz ampliada', 'الصيغة المصفوفية والمصفوفة الموسعة', 'Matrix form and the augmented matrix'),
        goal: say('Sistema bat $AX=B$ gisa idaztea, eta haren matrize zabaldua, $A^*$, osatzea.', 'Escribir un sistema como $AX=B$ y formar su matriz ampliada $A^*$.', 'كتابة نظام بصورة $AX=B$ وتكوين مصفوفته الموسعة $A^*$.', 'Write a system as $AX=B$ and build its augmented matrix $A^*$.'),
        needs: [
            { unit: 'batx2-zientziak/matrices', topic: 'matrix-product', title: { eu: 'Matrizeen biderkadura', es: 'El producto de matrices', en: 'Multiplying matrices', ar: 'ضرب المصفوفات' } },
            { unit: 'batx1-zientziak/sistemas', topic: 'augmented-matrix', title: { eu: 'Matrize zabaldua', es: 'La matriz ampliada', en: 'The augmented matrix', ar: 'المصفوفة الموسعة' } }
        ],
        problem: say('Idatzi $\\begin{cases}2x+y-z=3\\\\ x-y+2z=1\\\\ 3x+2z=4\\end{cases}$ sistema $AX=B$ gisa, eta eman $A^*$.', 'Escribe $\\begin{cases}2x+y-z=3\\\\ x-y+2z=1\\\\ 3x+2z=4\\end{cases}$ como $AX=B$ y da $A^*$.', 'اكتب $\\begin{cases}2x+y-z=3\\\\ x-y+2z=1\\\\ 3x+2z=4\\end{cases}$ بصورة $AX=B$ وأعطِ $A^*$.', 'Write $\\begin{cases}2x+y-z=3\\\\ x-y+2z=1\\\\ 3x+2z=4\\end{cases}$ as $AX=B$ and give $A^*$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Koefizienteek $A$ osatzen dute; ezezagun bat falta denean, 0 bat.', 'Los coeficientes forman $A$; donde falta una incógnita, un 0.', 'المعاملات تكوّن $A$؛ وحيث يغيب مجهول نضع 0.', 'The coefficients make $A$; where an unknown is missing, a 0.'), math: same('$A=\\begin{pmatrix}2&1&-1\\\\1&-1&2\\\\3&0&2\\end{pmatrix}$') },
            { text: say('Ezezagunak $X$ zutabean, eta gai askeak $B$ zutabean.', 'Las incógnitas en la columna $X$ y los términos independientes en la columna $B$.', 'المجاهيل في العمود $X$ والحدود الثابتة في العمود $B$.', 'The unknowns in the column $X$ and the constant terms in the column $B$.'), math: same('$X=\\begin{pmatrix}x\\\\y\\\\z\\end{pmatrix}\\qquad B=\\begin{pmatrix}3\\\\1\\\\4\\end{pmatrix}$') },
            { text: say('Matrize zabalduak $B$ gehitzen du azken zutabe gisa.', 'La matriz ampliada añade $B$ como última columna.', 'المصفوفة الموسعة تضيف $B$ عمودًا أخيرًا.', 'The augmented matrix adds $B$ as its last column.'), math: same('$A^*=\\left(\\begin{array}{ccc|c}2&1&-1&3\\\\1&-1&2&1\\\\3&0&2&4\\end{array}\\right)$') }
        ],
        takeaway: say(
            'Sistema lineal oro $AX=B$ idazten da: $A$ koefizienteen matrizea, $X$ ezezagunen zutabea eta $B$ gai askeena. Matrize zabaldua, $A^*$, $A$ da $B$ zutabea gehituta.',
            'Todo sistema lineal se escribe $AX=B$: $A$ es la matriz de coeficientes, $X$ la columna de incógnitas y $B$ la de términos independientes. La matriz ampliada $A^*$ es $A$ con la columna $B$ añadida.',
            'يُكتب كل نظام خطي بصورة $AX=B$: $A$ مصفوفة المعاملات و$X$ عمود المجاهيل و$B$ عمود الحدود الثابتة. والمصفوفة الموسعة $A^*$ هي $A$ مضافًا إليها العمود $B$.',
            'Every linear system is written $AX=B$: $A$ is the coefficient matrix, $X$ the column of unknowns and $B$ that of the constant terms. The augmented matrix $A^*$ is $A$ with the column $B$ added.'
        ),
        figure: (language) => <AugmentedFigure language={language} />
    },
    {
        id: 'rouche-theorem',
        stage: 'rouche',
        title: say('Rouché-Frobeniusen teorema', 'El teorema de Rouché-Frobenius', 'مبرهنة روشيه-فروبينيوس', 'The Rouché–Frobenius theorem'),
        goal: say('Sistema bat sailkatzea, ebatzi gabe, $\\operatorname{rg}(A)$, $\\operatorname{rg}(A^*)$ eta ezezagun kopurua konparatuz.', 'Clasificar un sistema sin resolverlo comparando $\\operatorname{rg}(A)$, $\\operatorname{rg}(A^*)$ y el número de incógnitas.', 'تصنيف نظام دون حله بمقارنة $\\operatorname{rg}(A)$ و$\\operatorname{rg}(A^*)$ وعدد المجاهيل.', 'Classify a system without solving it by comparing $\\operatorname{rg}(A)$, $\\operatorname{rg}(A^*)$ and the number of unknowns.'),
        needs: [{ unit: 'batx1-zientziak/sistemas', topic: 'classify-systems', title: { eu: 'Sistema motak', es: 'Tipos de sistemas', en: 'Types of systems', ar: 'أنواع الأنظمة' } }],
        problem: say('3 ezezaguneko sistema batek $\\operatorname{rg}(A)=2$ du. Zer motatakoa da $\\operatorname{rg}(A^*)=2$ bada? Eta $\\operatorname{rg}(A^*)=3$ bada?', 'Un sistema de 3 incógnitas tiene $\\operatorname{rg}(A)=2$. ¿De qué tipo es si $\\operatorname{rg}(A^*)=2$? ¿Y si $\\operatorname{rg}(A^*)=3$?', 'نظام بثلاثة مجاهيل فيه $\\operatorname{rg}(A)=2$. ما نوعه إذا كان $\\operatorname{rg}(A^*)=2$؟ وإذا كان $\\operatorname{rg}(A^*)=3$؟', 'A system in 3 unknowns has $\\operatorname{rg}(A)=2$. What type is it if $\\operatorname{rg}(A^*)=2$? And if $\\operatorname{rg}(A^*)=3$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Heinak berdinak dira, baina ezezagun kopurua baino txikiagoak: bateragarri indeterminatua.', 'Rangos iguales pero menores que el número de incógnitas: compatible indeterminado.', 'رتبتان متساويتان لكن أصغر من عدد المجاهيل: متوافق غير محدد.', 'Equal ranks, but less than the number of unknowns: consistent and dependent.'), math: same('$\\operatorname{rg}(A)=\\operatorname{rg}(A^*)=2<3$') },
            { text: say('Ezezagun bat geratzen da libre: parametro bat.', 'Queda una incógnita libre: un parámetro.', 'يبقى مجهول حر: وسيط واحد.', 'One unknown is left free: one parameter.'), math: same('$3-2=1$') },
            { text: say('Heina desberdinak: bateraezina.', 'Rangos distintos: incompatible.', 'رتبتان مختلفتان: غير متوافق.', 'Different ranks: inconsistent.'), math: same('$\\operatorname{rg}(A)=2\\neq\\operatorname{rg}(A^*)=3$') }
        ],
        takeaway: say(
            'Rouché-Frobenius: sistema bateragarria da $\\operatorname{rg}(A)=\\operatorname{rg}(A^*)$ bada bakarrik. Heina hori ezezagun kopuruaren, $n$, berdina bada, determinatua da; txikiagoa bada, indeterminatua, $n-\\operatorname{rg}(A)$ parametrorekin.',
            'Rouché-Frobenius: el sistema es compatible si y solo si $\\operatorname{rg}(A)=\\operatorname{rg}(A^*)$. Si ese rango es igual al número de incógnitas $n$, es determinado; si es menor, indeterminado, con $n-\\operatorname{rg}(A)$ parámetros.',
            'روشيه-فروبينيوس: يكون النظام متوافقًا إذا وفقط إذا كان $\\operatorname{rg}(A)=\\operatorname{rg}(A^*)$. وإذا ساوت هذه الرتبة عدد المجاهيل $n$ فهو محدد؛ وإذا كانت أصغر فهو غير محدد بعدد $n-\\operatorname{rg}(A)$ من الوسائط.',
            'Rouché–Frobenius: the system is consistent if and only if $\\operatorname{rg}(A)=\\operatorname{rg}(A^*)$. If that rank equals the number of unknowns $n$, it is independent; if it is less, dependent, with $n-\\operatorname{rg}(A)$ parameters.'
        ),
        figure: (language) => <RoucheFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'rank-classify',
        stage: 'rouche',
        title: say('Heinak menoreekin sailkatzeko', 'Clasificar con rangos por menores', 'التصنيف بالرتب عبر المحددات الصغرى', 'Classifying with ranks by minors'),
        goal: say('$\\operatorname{rg}(A)$ eta $\\operatorname{rg}(A^*)$ menoreekin kalkulatzea, menore ez-nulua $B$ zutabearekin orlatuz.', 'Calcular $\\operatorname{rg}(A)$ y $\\operatorname{rg}(A^*)$ con menores, orlando el menor no nulo con la columna $B$.', 'حساب $\\operatorname{rg}(A)$ و$\\operatorname{rg}(A^*)$ بالمحددات الصغرى بتطويق المحدد غير الصفري بالعمود $B$.', 'Find $\\operatorname{rg}(A)$ and $\\operatorname{rg}(A^*)$ with minors, bordering the non-zero minor with the column $B$.'),
        needs: [{ unit: 'batx2-zientziak/determinantes', topic: 'rank-by-minors', title: { eu: 'Heina menoreekin', es: 'El rango con menores', en: 'Rank with minors', ar: 'الرتبة بالمحددات الصغرى' } }],
        problem: say('Sailkatu $\\begin{cases}x+y+z=2\\\\ x+2y+3z=5\\\\ 2x+3y+4z=7\\end{cases}$.', 'Clasifica $\\begin{cases}x+y+z=2\\\\ x+2y+3z=5\\\\ 2x+3y+4z=7\\end{cases}$.', 'صنّف $\\begin{cases}x+y+z=2\\\\ x+2y+3z=5\\\\ 2x+3y+4z=7\\end{cases}$.', 'Classify $\\begin{cases}x+y+z=2\\\\ x+2y+3z=5\\\\ 2x+3y+4z=7\\end{cases}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Kalkulatu $|A|$: 0 da; beraz, $\\operatorname{rg}(A)<3$.', 'Calcula $|A|$: vale 0, así que $\\operatorname{rg}(A)<3$.', 'احسب $|A|$: يساوي 0، إذن $\\operatorname{rg}(A)<3$.', 'Work out $|A|$: it is 0, so $\\operatorname{rg}(A)<3$.'), math: same('$|A|=\\begin{vmatrix}1&1&1\\\\1&2&3\\\\2&3&4\\end{vmatrix}=0$') },
            { text: say('2. ordenako menore bat ez da 0: $\\operatorname{rg}(A)=2$.', 'Un menor de orden 2 no es 0: $\\operatorname{rg}(A)=2$.', 'محدد أصغر من الرتبة 2 غير صفري: $\\operatorname{rg}(A)=2$.', 'A minor of order 2 is not 0: $\\operatorname{rg}(A)=2$.'), math: same('$\\begin{vmatrix}1&1\\\\1&2\\end{vmatrix}=1\\neq 0$') },
            { text: say('Orlatu $B$ zutabearekin: hori ere 0 da. $\\operatorname{rg}(A^*)=2$ da: bateragarri indeterminatua.', 'Orla con la columna $B$: también vale 0. $\\operatorname{rg}(A^*)=2$: compatible indeterminado.', 'طوّق بالعمود $B$: يساوي 0 أيضًا. $\\operatorname{rg}(A^*)=2$: متوافق غير محدد.', 'Border with the column $B$: it is 0 as well. $\\operatorname{rg}(A^*)=2$: consistent and dependent.'), math: same('$\\begin{vmatrix}1&1&2\\\\1&2&5\\\\2&3&7\\end{vmatrix}=0$') }
        ],
        takeaway: say(
            '$\\operatorname{rg}(A^*)$ kalkulatzeko ez da hutsetik hasi behar: $A$ matrizearen menore ez-nulua $B$ zutabearekin eta falta den errenkadarekin orlatzen da. Orlatutako guztiak 0 badira, bi heinak berdinak dira.',
            'Para $\\operatorname{rg}(A^*)$ no hace falta empezar de cero: se orla el menor no nulo de $A$ con la columna $B$ y la fila que falta. Si todos los orlados valen 0, los dos rangos coinciden.',
            'لحساب $\\operatorname{rg}(A^*)$ لا حاجة إلى البدء من جديد: نطوّق المحدد غير الصفري من $A$ بالعمود $B$ والصف الناقص. وإذا كانت كل المطوَّقات أصفارًا فالرتبتان متساويتان.',
            'For $\\operatorname{rg}(A^*)$ there is no need to start again: border the non-zero minor of $A$ with the column $B$ and the missing row. If every bordered minor is 0, the two ranks are equal.'
        )
    },
    {
        id: 'geometric-meaning',
        stage: 'rouche',
        title: say('Zuzenak eta heinak', 'Rectas y rangos', 'المستقيمات والرتب', 'Lines and ranks'),
        goal: say('Bi ezezagun eta hiru ekuazio dituen sistema bat planoko hiru zuzen gisa irakurtzea, eta haien posizioa heinekin lotzea.', 'Leer un sistema de tres ecuaciones con dos incógnitas como tres rectas del plano y relacionar su posición con los rangos.', 'قراءة نظام من ثلاث معادلات بمجهولين على أنه ثلاثة مستقيمات في المستوى وربط وضعها بالرتب.', 'Read a system of three equations in two unknowns as three lines in the plane and link their position to the ranks.'),
        problem: say('Nola daude $\\begin{cases}x+y=3\\\\ x-y=1\\\\ 2x+y=5\\end{cases}$ sistemaren zuzenak?', '¿Cómo están las rectas de $\\begin{cases}x+y=3\\\\ x-y=1\\\\ 2x+y=5\\end{cases}$?', 'كيف تقع مستقيمات $\\begin{cases}x+y=3\\\\ x-y=1\\\\ 2x+y=5\\end{cases}$؟', 'How do the lines of $\\begin{cases}x+y=3\\\\ x-y=1\\\\ 2x+y=5\\end{cases}$ lie?'),
        stepsKind: 'steps',
        steps: [
            { text: say('$A$ matrizeak bi zutabe ditu, eta 2. ordenako menore bat 0 ez da: $\\operatorname{rg}(A)=2$.', '$A$ tiene dos columnas y un menor de orden 2 no es 0: $\\operatorname{rg}(A)=2$.', 'لـ $A$ عمودان ومحدد أصغر من الرتبة 2 غير صفري: $\\operatorname{rg}(A)=2$.', '$A$ has two columns and a minor of order 2 is not 0: $\\operatorname{rg}(A)=2$.'), math: same('$\\begin{vmatrix}1&1\\\\1&-1\\end{vmatrix}=-2$') },
            { text: say('$A^*$ karratua da: haren determinanteak esaten du hirugarren zuzena puntu beretik pasatzen den.', '$A^*$ es cuadrada: su determinante dice si la tercera recta pasa por el mismo punto.', '$A^*$ مربعة: محددها يقول هل يمر المستقيم الثالث بالنقطة نفسها.', '$A^*$ is square: its determinant says whether the third line goes through the same point.'), math: same('$|A^*|=\\begin{vmatrix}1&1&3\\\\1&-1&1\\\\2&1&5\\end{vmatrix}=0$') },
            { text: say('Bi heinak 2: hiru zuzenak puntu batean ebakitzen dira.', 'Los dos rangos valen 2: las tres rectas se cortan en un punto.', 'الرتبتان 2: تتقاطع المستقيمات الثلاثة في نقطة.', 'Both ranks are 2: the three lines meet at one point.'), math: same('$x=2,\\ y=1$') }
        ],
        takeaway: say(
            'Bi ezezagunekin, ekuazio bakoitza zuzen bat da. $\\operatorname{rg}(A)=\\operatorname{rg}(A^*)=2$: puntu batean ebakitzen dira. $\\operatorname{rg}(A)=2$ eta $\\operatorname{rg}(A^*)=3$: ez dago puntu komunik. 1 heina bietan: zuzen bera.',
            'Con dos incógnitas, cada ecuación es una recta. $\\operatorname{rg}(A)=\\operatorname{rg}(A^*)=2$: se cortan en un punto. $\\operatorname{rg}(A)=2$ y $\\operatorname{rg}(A^*)=3$: no hay punto común. Rango 1 en las dos: la misma recta.',
            'مع مجهولين تكون كل معادلة مستقيمًا. $\\operatorname{rg}(A)=\\operatorname{rg}(A^*)=2$: تتقاطع في نقطة. $\\operatorname{rg}(A)=2$ و$\\operatorname{rg}(A^*)=3$: لا نقطة مشتركة. الرتبة 1 في الاثنتين: المستقيم نفسه.',
            'With two unknowns, each equation is a line. $\\operatorname{rg}(A)=\\operatorname{rg}(A^*)=2$: they meet at one point. $\\operatorname{rg}(A)=2$ and $\\operatorname{rg}(A^*)=3$: no common point. Rank 1 in both: the same line.'
        ),
        figure: (language) => <ThreeLinesFigure language={language} />,
        figureAfterSteps: true
    },

    /* ---------- 2. Cramer ---------- */
    {
        id: 'cramer-rule',
        stage: 'cramer',
        title: say('Cramerren erregela', 'La regla de Cramer', 'قاعدة كرامر', 'Cramer\'s rule'),
        goal: say('Cramerren sistema bat determinanteekin ebaztea: $x=\\frac{|A_x|}{|A|}$.', 'Resolver un sistema de Cramer con determinantes: $x=\\frac{|A_x|}{|A|}$.', 'حل نظام كرامر بالمحددات: $x=\\frac{|A_x|}{|A|}$.', 'Solve a Cramer system with determinants: $x=\\frac{|A_x|}{|A|}$.'),
        needs: [{ unit: 'batx2-zientziak/determinantes', topic: 'sarrus', title: { eu: 'Sarrusen erregela', es: 'La regla de Sarrus', en: 'Sarrus\' rule', ar: 'قاعدة ساروس' } }],
        problem: say('Ebatzi Cramerren bidez $\\begin{cases}x+y+z=6\\\\ 2x-y+z=3\\\\ x+2y-z=2\\end{cases}$.', 'Resuelve por Cramer $\\begin{cases}x+y+z=6\\\\ 2x-y+z=3\\\\ x+2y-z=2\\end{cases}$.', 'حُلّ بطريقة كرامر $\\begin{cases}x+y+z=6\\\\ 2x-y+z=3\\\\ x+2y-z=2\\end{cases}$.', 'Solve by Cramer $\\begin{cases}x+y+z=6\\\\ 2x-y+z=3\\\\ x+2y-z=2\\end{cases}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$|A|\\neq 0$: Cramer erabil daiteke.', '$|A|\\neq 0$: se puede usar Cramer.', '$|A|\\neq 0$: يمكن استعمال كرامر.', '$|A|\\neq 0$: Cramer can be used.'), math: same('$|A|=\\begin{vmatrix}1&1&1\\\\2&-1&1\\\\1&2&-1\\end{vmatrix}=7$') },
            { text: say('$x$ kalkulatzeko, $B$ zutabea $x$ ezezagunaren zutabearen ordez jartzen da.', 'Para $x$, la columna $B$ sustituye a la columna de $x$.', 'لحساب $x$ يحل العمود $B$ محل عمود $x$.', 'For $x$, the column $B$ replaces the column of $x$.'), math: same('$x=\\frac{1}{7}\\begin{vmatrix}6&1&1\\\\3&-1&1\\\\2&2&-1\\end{vmatrix}=\\frac{7}{7}=1$') },
            { text: say('Berdin $y$ eta $z$ ezezagunekin.', 'Igual con $y$ y $z$.', 'وكذلك مع $y$ و$z$.', 'The same with $y$ and $z$.'), math: same('$y=\\frac{14}{7}=2\\qquad z=\\frac{21}{7}=3$') }
        ],
        takeaway: say(
            'Cramer: $|A|\\neq 0$ bada, ezezagun bakoitza determinanteen zatidura bat da, $x=\\frac{|A_x|}{|A|}$. $A_x$ matrizea $A$ da, $x$ ezezagunaren zutabearen ordez $B$ jarrita.',
            'Cramer: si $|A|\\neq 0$, cada incógnita es un cociente de determinantes, $x=\\frac{|A_x|}{|A|}$, donde $A_x$ es $A$ con la columna de $x$ cambiada por $B$.',
            'كرامر: إذا كان $|A|\\neq 0$ فكل مجهول خارج قسمة محددين، $x=\\frac{|A_x|}{|A|}$، حيث $A_x$ هي $A$ بعد استبدال عمود $x$ بـ $B$.',
            'Cramer: if $|A|\\neq 0$, each unknown is a quotient of determinants, $x=\\frac{|A_x|}{|A|}$, where $A_x$ is $A$ with the column of $x$ replaced by $B$.'
        ),
        figure: (language) => <CramerFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'cramer-indeterminate',
        stage: 'cramer',
        title: say('Cramer, infinitu soluziorekin', 'Cramer con infinitas soluciones', 'كرامر مع حلول لا نهائية', 'Cramer with infinitely many solutions'),
        goal: say('Sistema bateragarri indeterminatu bat Cramerren bidez ebaztea, menore ez-nuluarekin eta $\\lambda$ parametroarekin.', 'Resolver un sistema compatible indeterminado por Cramer, con el menor no nulo y el parámetro $\\lambda$.', 'حل نظام متوافق غير محدد بطريقة كرامر، بالمحدد الأصغر غير الصفري والوسيط $\\lambda$.', 'Solve a consistent dependent system by Cramer, with the non-zero minor and the parameter $\\lambda$.'),
        needs: [{ unit: 'batx1-zientziak/sistemas', topic: 'parametric-solutions', title: { eu: 'Soluzio infinituak parametro batekin', es: 'Infinitas soluciones con un parámetro', en: 'Infinitely many solutions with a parameter', ar: 'عدد لا نهائي من الحلول بوسيط' } }],
        problem: say('Ebatzi $\\begin{cases}x+y+z=4\\\\ x-y+z=2\\\\ 2x+2z=6\\end{cases}$.', 'Resuelve $\\begin{cases}x+y+z=4\\\\ x-y+z=2\\\\ 2x+2z=6\\end{cases}$.', 'حُلّ $\\begin{cases}x+y+z=4\\\\ x-y+z=2\\\\ 2x+2z=6\\end{cases}$.', 'Solve $\\begin{cases}x+y+z=4\\\\ x-y+z=2\\\\ 2x+2z=6\\end{cases}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$E_3=E_1+E_2$: ekuazio bat soberan dago. Menore hau ez da 0, eta bi heinak 2 dira.', '$E_3=E_1+E_2$: sobra una ecuación. Este menor no es 0 y los dos rangos valen 2.', '$E_3=E_1+E_2$: معادلة زائدة. هذا المحدد الأصغر غير صفري والرتبتان 2.', '$E_3=E_1+E_2$: one equation is spare. This minor is not 0 and both ranks are 2.'), math: same('$\\begin{vmatrix}1&1\\\\1&-1\\end{vmatrix}=-2\\ \\to\\ \\operatorname{rg}(A)=2$') },
            { text: say('Kendu $E_3$, eta pasatu $z=\\lambda$ bigarren atalera.', 'Quita $E_3$ y pasa $z=\\lambda$ al segundo miembro.', 'احذف $E_3$ وانقل $z=\\lambda$ إلى الطرف الثاني.', 'Drop $E_3$ and move $z=\\lambda$ to the right-hand side.'), math: same('$\\begin{cases}x+y=4-\\lambda\\\\ x-y=2-\\lambda\\end{cases}$') },
            { text: say('Cramer, $\\lambda$ barruan dela.', 'Cramer con $\\lambda$ dentro.', 'كرامر و$\\lambda$ في الداخل.', 'Cramer with $\\lambda$ inside.'), math: same('$x=\\frac{-6+2\\lambda}{-2}=3-\\lambda\\qquad y=\\frac{-2}{-2}=1\\qquad z=\\lambda$') }
        ],
        takeaway: say(
            '$\\operatorname{rg}(A)=\\operatorname{rg}(A^*)=r<n$ bada: utzi menore ez-nuluaren $r$ ekuazioak, pasatu beste $n-r$ ezezagunak bigarren atalera parametro gisa, eta erabili Cramer.',
            'Si $\\operatorname{rg}(A)=\\operatorname{rg}(A^*)=r<n$: quédate con las $r$ ecuaciones del menor no nulo, pasa las otras $n-r$ incógnitas al segundo miembro como parámetros y aplica Cramer.',
            'إذا كان $\\operatorname{rg}(A)=\\operatorname{rg}(A^*)=r<n$: أبقِ المعادلات $r$ للمحدد الأصغر غير الصفري، وانقل المجاهيل الأخرى $n-r$ إلى الطرف الثاني وسائطَ، وطبّق كرامر.',
            'If $\\operatorname{rg}(A)=\\operatorname{rg}(A^*)=r<n$: keep the $r$ equations of the non-zero minor, move the other $n-r$ unknowns to the right-hand side as parameters and use Cramer.'
        )
    },
    {
        id: 'inverse-solve',
        stage: 'cramer',
        title: say('Alderantzizkoarekin ebaztea', 'Resolver con la inversa', 'الحل بالمعكوس', 'Solving with the inverse'),
        goal: say('$|A|\\neq 0$ duen sistema bat $X=A^{-1}B$ eginez ebaztea.', 'Resolver un sistema con $|A|\\neq 0$ haciendo $X=A^{-1}B$.', 'حل نظام فيه $|A|\\neq 0$ بحساب $X=A^{-1}B$.', 'Solve a system with $|A|\\neq 0$ by working out $X=A^{-1}B$.'),
        needs: [{ unit: 'batx2-zientziak/matrices', topic: 'matrix-equations', title: { eu: 'Matrize bat askatzea', es: 'Despejar una matriz', en: 'Solving for a matrix', ar: 'استخراج مصفوفة مجهولة' } }],
        problem: say('Ebatzi $\\begin{cases}3x+y=5\\\\ 5x+2y=8\\end{cases}$, $X=A^{-1}B$ eginez.', 'Resuelve $\\begin{cases}3x+y=5\\\\ 5x+2y=8\\end{cases}$ haciendo $X=A^{-1}B$.', 'حُلّ $\\begin{cases}3x+y=5\\\\ 5x+2y=8\\end{cases}$ بحساب $X=A^{-1}B$.', 'Solve $\\begin{cases}3x+y=5\\\\ 5x+2y=8\\end{cases}$ by working out $X=A^{-1}B$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Idatzi $AX=B$.', 'Escribe $AX=B$.', 'اكتب $AX=B$.', 'Write $AX=B$.'), math: same('$A=\\begin{pmatrix}3&1\\\\5&2\\end{pmatrix}\\qquad B=\\begin{pmatrix}5\\\\8\\end{pmatrix}$') },
            { text: say('$|A|=1\\neq 0$: alderantzizkoa dago.', '$|A|=1\\neq 0$: hay inversa.', '$|A|=1\\neq 0$: يوجد معكوس.', '$|A|=1\\neq 0$: there is an inverse.'), math: same('$A^{-1}=\\begin{pmatrix}2&-1\\\\-5&3\\end{pmatrix}$') },
            { text: say('Biderkatu ezkerretik.', 'Multiplica por la izquierda.', 'اضرب من اليسار.', 'Multiply on the left.'), math: same('$X=A^{-1}B=\\begin{pmatrix}2\\\\-1\\end{pmatrix}$') }
        ],
        takeaway: say(
            '$|A|\\neq 0$ bada, $AX=B$ matrize-ekuazio bat bezala ebazten da: $X=A^{-1}B$, $A^{-1}$ ezkerretik jarrita.',
            'Si $|A|\\neq 0$, $AX=B$ se resuelve como una ecuación matricial: $X=A^{-1}B$, con $A^{-1}$ por la izquierda.',
            'إذا كان $|A|\\neq 0$ تُحل $AX=B$ كمعادلة مصفوفية: $X=A^{-1}B$، و$A^{-1}$ من اليسار.',
            'If $|A|\\neq 0$, $AX=B$ is solved as a matrix equation: $X=A^{-1}B$, with $A^{-1}$ on the left.'
        )
    },

    /* ---------- 3. Homogeneous systems ---------- */
    {
        id: 'homogeneous-trivial',
        stage: 'homogeneous',
        title: say('Sistema homogeneoak', 'Sistemas homogéneos', 'الأنظمة المتجانسة', 'Homogeneous systems'),
        goal: say('Sistema homogeneo bat beti bateragarria dela jakitea, eta noiz duen soluzio tribiala bakarrik.', 'Saber que un sistema homogéneo siempre es compatible y cuándo tiene solo la solución trivial.', 'معرفة أن النظام المتجانس متوافق دائمًا، ومتى يكون له الحل البديهي فقط.', 'Know that a homogeneous system is always consistent and when it has only the trivial solution.'),
        problem: say('Ebatzi $\\begin{cases}x+y-z=0\\\\ 2x-y+z=0\\\\ x+2y+z=0\\end{cases}$.', 'Resuelve $\\begin{cases}x+y-z=0\\\\ 2x-y+z=0\\\\ x+2y+z=0\\end{cases}$.', 'حُلّ $\\begin{cases}x+y-z=0\\\\ 2x-y+z=0\\\\ x+2y+z=0\\end{cases}$.', 'Solve $\\begin{cases}x+y-z=0\\\\ 2x-y+z=0\\\\ x+2y+z=0\\end{cases}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Homogeneoa da: $(0,0,0)$ beti da soluzioa, eta sistema bateragarria da.', 'Es homogéneo: $(0,0,0)$ siempre es solución y el sistema es compatible.', 'إنه متجانس: $(0,0,0)$ حل دائمًا والنظام متوافق.', 'It is homogeneous: $(0,0,0)$ is always a solution and the system is consistent.'), math: same('$\\operatorname{rg}(A)=\\operatorname{rg}(A^*)$') },
            { text: say('Kalkulatu $|A|$.', 'Calcula $|A|$.', 'احسب $|A|$.', 'Work out $|A|$.'), math: same('$|A|=\\begin{vmatrix}1&1&-1\\\\2&-1&1\\\\1&2&1\\end{vmatrix}=-9$') },
            { text: say('$|A|\\neq 0$: bateragarri determinatua; soluzio tribiala da bakarra.', '$|A|\\neq 0$: compatible determinado; la única solución es la trivial.', '$|A|\\neq 0$: متوافق محدد؛ والحل الوحيد هو البديهي.', '$|A|\\neq 0$: consistent and independent; the only solution is the trivial one.'), math: same('$x=0,\\ y=0,\\ z=0$') }
        ],
        takeaway: say(
            'Sistema homogeneo bat ($B=0$) beti da bateragarria: soluzio tribiala du. $|A|\\neq 0$ bada, hura da bakarra; $|A|=0$ bada, infinitu daude.',
            'Un sistema homogéneo ($B=0$) siempre es compatible: tiene la solución trivial. Si $|A|\\neq 0$, es la única; si $|A|=0$, hay infinitas.',
            'النظام المتجانس ($B=0$) متوافق دائمًا: له الحل البديهي. وإذا كان $|A|\\neq 0$ فهو الوحيد؛ وإذا كان $|A|=0$ فالحلول لا نهائية.',
            'A homogeneous system ($B=0$) is always consistent: it has the trivial solution. If $|A|\\neq 0$, it is the only one; if $|A|=0$, there are infinitely many.'
        )
    },
    {
        id: 'homogeneous-parameter',
        stage: 'homogeneous',
        title: say('Soluzio ez-tribialak', 'Soluciones no triviales', 'الحلول غير البديهية', 'Non-trivial solutions'),
        goal: say('Sistema homogeneo batek soluzio ez-tribialak izateko parametroaren balioak aurkitzea, eta orduan ebaztea.', 'Hallar los valores del parámetro con los que un homogéneo tiene soluciones no triviales, y resolverlo entonces.', 'إيجاد قيم الوسيط التي يكون فيها لنظام متجانس حلول غير بديهية، ثم حله.', 'Find the values of the parameter for which a homogeneous system has non-trivial solutions, and solve it then.'),
        needs: [{ unit: 'batx2-zientziak/determinantes', topic: 'det-equations', title: { eu: 'Ekuazioak determinanteekin', es: 'Ecuaciones con determinantes', en: 'Equations with determinants', ar: 'معادلات بالمحددات' } }],
        problem: say('Zein $k$ baliotarako ditu soluzio ez-tribialak $\\begin{cases}x+y+z=0\\\\ x+ky+2z=0\\\\ x+2y+kz=0\\end{cases}$ sistemak?', '¿Para qué $k$ tiene soluciones no triviales $\\begin{cases}x+y+z=0\\\\ x+ky+2z=0\\\\ x+2y+kz=0\\end{cases}$?', 'لأي $k$ يكون لـ $\\begin{cases}x+y+z=0\\\\ x+ky+2z=0\\\\ x+2y+kz=0\\end{cases}$ حلول غير بديهية؟', 'For which $k$ does $\\begin{cases}x+y+z=0\\\\ x+ky+2z=0\\\\ x+2y+kz=0\\end{cases}$ have non-trivial solutions?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Soluzio ez-tribialak daude $|A|=0$ bada bakarrik.', 'Hay soluciones no triviales si y solo si $|A|=0$.', 'توجد حلول غير بديهية إذا وفقط إذا كان $|A|=0$.', 'There are non-trivial solutions if and only if $|A|=0$.'), math: same('$|A|=\\begin{vmatrix}1&1&1\\\\1&k&2\\\\1&2&k\\end{vmatrix}=k^2-2k$') },
            { text: say('Berdindu zerora.', 'Iguala a cero.', 'ساوِ بالصفر.', 'Set it equal to zero.'), math: same('$k(k-2)=0\\ \\to\\ k=0,\\ k=2$') },
            { text: say('$k=2$ denean, $E_2=E_3$: parametro bat.', 'Con $k=2$, $E_2=E_3$: un parámetro.', 'مع $k=2$، $E_2=E_3$: وسيط واحد.', 'With $k=2$, $E_2=E_3$: one parameter.'), math: same('$(0,-\\lambda,\\lambda)$') }
        ],
        takeaway: say(
            'Sistema homogeneo karratu batek soluzio ez-tribialak ditu, $|A|=0$ denean hain zuzen. Parametro batekin: berdindu $|A|$ zerora; balio horiek infinitu soluzio ematen dituzte, eta besteek tribiala bakarrik.',
            'Un homogéneo cuadrado tiene soluciones no triviales justo cuando $|A|=0$. Con un parámetro: iguala $|A|$ a cero; esos valores dan infinitas soluciones y los demás solo la trivial.',
            'للنظام المتجانس المربع حلول غير بديهية عندما يكون $|A|=0$ بالضبط. ومع وسيط: ساوِ $|A|$ بالصفر؛ تلك القيم تعطي حلولًا لا نهائية والباقي يعطي البديهي فقط.',
            'A square homogeneous system has non-trivial solutions exactly when $|A|=0$. With a parameter: set $|A|$ equal to zero; those values give infinitely many solutions and the rest only the trivial one.'
        )
    },

    /* ---------- 4. Discussing with a parameter ---------- */
    {
        id: 'parameter-determinant',
        stage: 'discussion',
        title: say('Balio kritikoak', 'Los valores críticos', 'القيم الحرجة', 'The critical values'),
        goal: say('$|A|$ parametroaren arabera kalkulatzea eta haren erroak aurkitzea: horietatik kanpo, sistema bateragarri determinatua da.', 'Calcular $|A|$ en función del parámetro y hallar sus raíces: fuera de ellas, el sistema es compatible determinado.', 'حساب $|A|$ بدلالة الوسيط وإيجاد جذوره: خارجها يكون النظام متوافقًا محددًا.', 'Work out $|A|$ in terms of the parameter and find its roots: away from them, the system is consistent and independent.'),
        needs: [
            { unit: 'batx2-zientziak/determinantes', topic: 'rank-parameter-minors', title: { eu: 'Heina parametro baten arabera, menoreekin', es: 'El rango según un parámetro, con menores', en: 'Rank with a parameter, using minors', ar: 'الرتبة حسب وسيط بالمحددات الصغرى' } },
            { unit: 'batx1-zientziak/sistemas', topic: 'parameter-discussion', title: { eu: 'Parametro baten araberako eztabaida', es: 'Discutir según un parámetro', en: 'Analysing a system with a parameter', ar: 'مناقشة نظام حسب وسيط' } }
        ],
        problem: say('Zein $a$ baliotarako da bateragarri determinatua $\\begin{cases}x+y+az=1\\\\ x+ay+z=1\\\\ ax+y+z=1\\end{cases}$?', '¿Para qué $a$ es compatible determinado $\\begin{cases}x+y+az=1\\\\ x+ay+z=1\\\\ ax+y+z=1\\end{cases}$?', 'لأي $a$ يكون $\\begin{cases}x+y+az=1\\\\ x+ay+z=1\\\\ ax+y+z=1\\end{cases}$ متوافقًا محددًا؟', 'For which $a$ is $\\begin{cases}x+y+az=1\\\\ x+ay+z=1\\\\ ax+y+z=1\\end{cases}$ consistent and independent?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Kalkulatu $|A|$, $a$ barruan dela.', 'Calcula $|A|$ con la $a$ dentro.', 'احسب $|A|$ و$a$ في الداخل.', 'Work out $|A|$ with $a$ inside.'), math: same('$|A|=-a^3+3a-2=-(a-1)^2(a+2)$') },
            { text: say('Berdindu zerora: balio kritikoak.', 'Iguala a cero: los valores críticos.', 'ساوِ بالصفر: القيم الحرجة.', 'Set it equal to zero: the critical values.'), math: same('$a=1,\\ a=-2$') },
            { text: say('Beste edozein $a$ baliotarako, bi heinak 3 dira: bateragarri determinatua.', 'Para cualquier otro $a$, los dos rangos valen 3: compatible determinado.', 'لأي $a$ آخر تكون الرتبتان 3: متوافق محدد.', 'For any other $a$, both ranks are 3: consistent and independent.'), math: same('$a\\neq 1,\\ a\\neq -2$') }
        ],
        takeaway: say(
            'Eztabaida orotan, lehen urratsa: $|A|$ parametroaren arabera. $|A|\\neq 0$ den lekuan, sistema bateragarri determinatua da; $|A|=0$ egiten duten balioak banan-banan aztertzen dira.',
            'Primer paso de toda discusión: $|A|$ en función del parámetro. Donde $|A|\\neq 0$ el sistema es compatible determinado; los valores con $|A|=0$ se estudian uno a uno.',
            'الخطوة الأولى في كل مناقشة: $|A|$ بدلالة الوسيط. حيث $|A|\\neq 0$ يكون النظام متوافقًا محددًا؛ وتُدرس القيم التي تجعل $|A|=0$ واحدة واحدة.',
            'First step of every discussion: $|A|$ in terms of the parameter. Where $|A|\\neq 0$ the system is consistent and independent; the values with $|A|=0$ are studied one by one.'
        )
    },
    {
        id: 'parameter-ranks',
        stage: 'discussion',
        title: say('Heinak balio kritiko bakoitzean', 'Los rangos en cada valor crítico', 'الرتب عند كل قيمة حرجة', 'The ranks at each critical value'),
        goal: say('Balio kritiko bakoitzean $\\operatorname{rg}(A)$ eta $\\operatorname{rg}(A^*)$ kalkulatzea, eta eztabaida osatzea.', 'Calcular $\\operatorname{rg}(A)$ y $\\operatorname{rg}(A^*)$ en cada valor crítico y completar la discusión.', 'حساب $\\operatorname{rg}(A)$ و$\\operatorname{rg}(A^*)$ عند كل قيمة حرجة وإكمال المناقشة.', 'Find $\\operatorname{rg}(A)$ and $\\operatorname{rg}(A^*)$ at each critical value and complete the discussion.'),
        problem: say('$\\begin{cases}x+y+az=1\\\\ x+ay+z=1\\\\ ax+y+z=1\\end{cases}$ sisteman, zer motatakoa da $a=1$ eta $a=-2$ direnean?', 'En $\\begin{cases}x+y+az=1\\\\ x+ay+z=1\\\\ ax+y+z=1\\end{cases}$, ¿de qué tipo es con $a=1$ y con $a=-2$?', 'في $\\begin{cases}x+y+az=1\\\\ x+ay+z=1\\\\ ax+y+z=1\\end{cases}$، ما نوعه مع $a=1$ ومع $a=-2$؟', 'In $\\begin{cases}x+y+az=1\\\\ x+ay+z=1\\\\ ax+y+z=1\\end{cases}$, what type is it with $a=1$ and with $a=-2$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('$a=1$: hiru ekuazioak berdinak dira. Bateragarri indeterminatua, bi parametrorekin.', '$a=1$: las tres ecuaciones son la misma. Compatible indeterminado, con dos parámetros.', '$a=1$: المعادلات الثلاث واحدة. متوافق غير محدد بوسيطين.', '$a=1$: the three equations are the same. Consistent and dependent, with two parameters.'), math: same('$\\operatorname{rg}(A)=\\operatorname{rg}(A^*)=1<3$') },
            { text: say('$a=-2$: $A$ matrizearen 2. ordenako menore bat ez da 0.', '$a=-2$: un menor de orden 2 de $A$ no es 0.', '$a=-2$: محدد أصغر من الرتبة 2 من $A$ غير صفري.', '$a=-2$: a minor of order 2 of $A$ is not 0.'), math: same('$\\begin{vmatrix}1&1\\\\1&-2\\end{vmatrix}=-3\\neq 0$') },
            { text: say('$B$ zutabearekin orlatuta, ez da 0: $\\operatorname{rg}(A^*)=3$, eta bateraezina da.', 'Orlado con $B$ no es 0: $\\operatorname{rg}(A^*)=3$ y es incompatible.', 'المطوَّق بـ $B$ غير صفري: $\\operatorname{rg}(A^*)=3$ وهو غير متوافق.', 'Bordered with $B$ it is not 0: $\\operatorname{rg}(A^*)=3$ and it is inconsistent.'), math: same('$\\begin{vmatrix}1&1&1\\\\1&-2&1\\\\-2&1&1\\end{vmatrix}=-9$') }
        ],
        takeaway: say(
            'Balio kritiko bakoitzean, ordeztu parametroa eta kalkulatu bi heinak menoreekin: $A$ matrizearen menore ez-nulu bat, eta, $B$ zutabearekin orlatuta, $A^*$ matrizearena. Berdinak: bateragarri indeterminatua; desberdinak: bateraezina.',
            'En cada valor crítico, sustituye el parámetro y calcula los dos rangos con menores: un menor no nulo de $A$ y, orlándolo con $B$, el de $A^*$. Iguales: compatible indeterminado; distintos: incompatible.',
            'عند كل قيمة حرجة عوّض الوسيط واحسب الرتبتين بالمحددات الصغرى: محدد أصغر غير صفري من $A$، ثم رتبة $A^*$ بتطويقه بـ $B$. متساويتان: متوافق غير محدد؛ مختلفتان: غير متوافق.',
            'At each critical value, substitute the parameter and find both ranks with minors: a non-zero minor of $A$ and, bordering it with $B$, that of $A^*$. Equal: consistent and dependent; different: inconsistent.'
        ),
        figure: (language) => <ParameterMapFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'parameter-solve',
        stage: 'discussion',
        title: say('Parametroaren araberako ebazpena', 'Resolver según el parámetro', 'الحل حسب الوسيط', 'Solving with the parameter'),
        goal: say('Kasu bateragarri determinatuan, sistema Cramerren bidez ebaztea, parametroa barruan dela.', 'Resolver el sistema por Cramer en el caso compatible determinado, con el parámetro dentro.', 'حل النظام بطريقة كرامر في حالة المتوافق المحدد، والوسيط في الداخل.', 'Solve the system by Cramer in the consistent independent case, with the parameter inside.'),
        problem: say('Ebatzi $\\begin{cases}x+y+az=1\\\\ x+ay+z=1\\\\ ax+y+z=1\\end{cases}$, bateragarri determinatua denean.', 'Resuelve $\\begin{cases}x+y+az=1\\\\ x+ay+z=1\\\\ ax+y+z=1\\end{cases}$ cuando es compatible determinado.', 'حُلّ $\\begin{cases}x+y+az=1\\\\ x+ay+z=1\\\\ ax+y+z=1\\end{cases}$ عندما يكون متوافقًا محددًا.', 'Solve $\\begin{cases}x+y+az=1\\\\ x+ay+z=1\\\\ ax+y+z=1\\end{cases}$ when it is consistent and independent.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$a\\neq 1$ eta $a\\neq -2$ direnean, Cramer erabiltzen da.', 'Para $a\\neq 1$ y $a\\neq -2$ se usa Cramer.', 'عندما $a\\neq 1$ و$a\\neq -2$ يُستعمل كرامر.', 'For $a\\neq 1$ and $a\\neq -2$, use Cramer.'), math: same('$|A_x|=\\begin{vmatrix}1&1&a\\\\1&a&1\\\\1&1&1\\end{vmatrix}=-(a-1)^2$') },
            { text: say('Zatitu $|A|$ zenbakiaz eta sinplifikatu.', 'Divide entre $|A|$ y simplifica.', 'اقسم على $|A|$ وبسّط.', 'Divide by $|A|$ and simplify.'), math: same('$x=\\frac{-(a-1)^2}{-(a-1)^2(a+2)}=\\frac{1}{a+2}$') },
            { text: say('Simetriagatik, $y$ eta $z$ berdinak ateratzen dira.', 'Por la simetría, $y$ y $z$ salen iguales.', 'بسبب التماثل يكون $y$ و$z$ متساويين.', 'By symmetry, $y$ and $z$ come out the same.'), math: same('$x=y=z=\\frac{1}{a+2}$') }
        ],
        takeaway: say(
            'Kasu bateragarri determinatuan, Cramerrek soluzioa ematen du parametroaren arabera; $|A|$ determinantearen faktoreez zatituz sinplifikatzen da, hor ez baitira 0. Kasu indeterminatuetan, $\\lambda$ parametroarekin ebazten da.',
            'En el caso compatible determinado, Cramer da la solución en función del parámetro; se simplifica dividiendo entre los factores de $|A|$, que ahí no son 0. En los casos indeterminados se resuelve con $\\lambda$.',
            'في حالة المتوافق المحدد يعطي كرامر الحل بدلالة الوسيط؛ ويُبسَّط بالقسمة على عوامل $|A|$ لأنها ليست أصفارًا هناك. وفي الحالات غير المحددة يُحل بـ $\\lambda$.',
            'In the consistent independent case, Cramer gives the solution in terms of the parameter; simplify by dividing by the factors of $|A|$, which are not 0 there. In the dependent cases, solve with $\\lambda$.'
        )
    },

    /* ---------- 5. Problems ---------- */
    {
        id: 'extra-equations',
        stage: 'problems',
        title: say('Ezezagunak baino ekuazio gehiago', 'Más ecuaciones que incógnitas', 'معادلات أكثر من المجاهيل', 'More equations than unknowns'),
        goal: say('Ekuazioak ezezagunak baino gehiago dituen sistema bat eztabaidatzea, $A^*$ matrizearen determinantearekin.', 'Discutir un sistema con más ecuaciones que incógnitas con el determinante de $A^*$.', 'مناقشة نظام فيه معادلات أكثر من المجاهيل بمحدد $A^*$.', 'Discuss a system with more equations than unknowns with the determinant of $A^*$.'),
        problem: say('Eztabaidatu $\\begin{cases}x+y=2\\\\ x-y=0\\\\ 2x+y=k\\end{cases}$, $k$ parametroaren arabera.', 'Discute $\\begin{cases}x+y=2\\\\ x-y=0\\\\ 2x+y=k\\end{cases}$ según $k$.', 'ناقش $\\begin{cases}x+y=2\\\\ x-y=0\\\\ 2x+y=k\\end{cases}$ حسب $k$.', 'Discuss $\\begin{cases}x+y=2\\\\ x-y=0\\\\ 2x+y=k\\end{cases}$ depending on $k$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$A$ matrizea $3\\times 2$ da: haren heina, gehienez, 2. Hemen, 2.', '$A$ es $3\\times 2$: su rango es como mucho 2. Aquí, 2.', '$A$ من الأبعاد $3\\times 2$: رتبتها 2 على الأكثر. وهنا 2.', '$A$ is $3\\times 2$: its rank is at most 2. Here, 2.'), math: same('$\\begin{vmatrix}1&1\\\\1&-1\\end{vmatrix}=-2\\neq 0$') },
            { text: say('$A^*$ karratua da: haren determinanteak erabakitzen du.', '$A^*$ es cuadrada: decide su determinante.', '$A^*$ مربعة: محددها يقرر.', '$A^*$ is square: its determinant decides.'), math: same('$|A^*|=6-2k$') },
            { text: say('$k=3$ denean, bi heinak 2 dira: bateragarri determinatua. Bestela, bateraezina.', 'Con $k=3$, los dos rangos valen 2: compatible determinado. Si no, incompatible.', 'مع $k=3$ تكون الرتبتان 2: متوافق محدد. وإلا فغير متوافق.', 'With $k=3$, both ranks are 2: consistent and independent. Otherwise, inconsistent.'), math: same('$k=3\\ \\to\\ x=1,\\ y=1$') }
        ],
        takeaway: say(
            'Ezezagunak baino ekuazio gehiago badaude, $A$ ez da karratua, eta haren heina ezezagun kopurua da gehienez. $A^*$ karratua bada, sistema bateraezina da $|A^*|\\neq 0$ denean.',
            'Con más ecuaciones que incógnitas, $A$ no es cuadrada y su rango es como mucho el número de incógnitas. Si $A^*$ es cuadrada, el sistema es incompatible cuando $|A^*|\\neq 0$.',
            'إذا زادت المعادلات على المجاهيل فـ $A$ ليست مربعة ورتبتها على الأكثر عدد المجاهيل. وإذا كانت $A^*$ مربعة فالنظام غير متوافق عندما $|A^*|\\neq 0$.',
            'With more equations than unknowns, $A$ is not square and its rank is at most the number of unknowns. If $A^*$ is square, the system is inconsistent when $|A^*|\\neq 0$.'
        )
    },
    {
        id: 'word-problems',
        stage: 'problems',
        title: say('Enuntziatu-problemak', 'Problemas de enunciado', 'مسائل كلامية', 'Word problems'),
        goal: say('Problema bat hiru ezezaguneko sistema gisa planteatzea, eta Rouché eta Cramerren bidez ebaztea.', 'Plantear un problema como un sistema de tres incógnitas y resolverlo con Rouché y Cramer.', 'صياغة مسألة كنظام بثلاثة مجاهيل وحلها بروشيه وكرامر.', 'Set up a problem as a system in three unknowns and solve it with Rouché and Cramer.'),
        needs: [{ unit: 'batx1-zientziak/sistemas', topic: 'three-unknown-problems', title: { eu: 'Hiru ezezaguneko problemak', es: 'Problemas con tres incógnitas', en: 'Problems with three unknowns', ar: 'مسائل بثلاثة مجاهيل' } }],
        problem: say('Hiru lagunek 70 € dituzte guztira. Anak Beak baino bi aldiz gehiago du, eta Carlak Beak baino 10 € gehiago. Zenbat du bakoitzak?', 'Entre tres amigas tienen 70 €. Ana tiene el doble que Bea y Carla tiene 10 € más que Bea. ¿Cuánto tiene cada una?', 'مع ثلاث صديقات 70 € معًا. مع آنا ضعف ما مع بيا، ومع كارلا 10 € أكثر من بيا. كم مع كل واحدة؟', 'Three friends have €70 between them. Ana has twice as much as Bea and Carla has €10 more than Bea. How much does each have?'),
        stepsKind: 'steps',
        steps: [
            { text: say('$x$, $y$ eta $z$: Anaren, Bearen eta Carlaren dirua. Ekuazio bat datu bakoitzeko.', '$x$, $y$ y $z$: el dinero de Ana, Bea y Carla. Una ecuación por dato.', '$x$ و$y$ و$z$: مال آنا وبيا وكارلا. معادلة لكل معطى.', '$x$, $y$ and $z$: the money of Ana, Bea and Carla. One equation per piece of data.'), math: same('$\\begin{cases}x+y+z=70\\\\ x-2y=0\\\\ -y+z=10\\end{cases}$') },
            { text: say('$|A|=-4\\neq 0$: bateragarri determinatua. Cramer $y$ ezezagunerako.', '$|A|=-4\\neq 0$: compatible determinado. Cramer para $y$.', '$|A|=-4\\neq 0$: متوافق محدد. كرامر لـ $y$.', '$|A|=-4\\neq 0$: consistent and independent. Cramer for $y$.'), math: same('$y=\\frac{-60}{-4}=15$') },
            { text: say('Ordeztu.', 'Sustituye.', 'عوّض.', 'Substitute.'), math: same('$x=30,\\ z=25$') }
        ],
        takeaway: say(
            'Problema batean: ezezagun bat kopuru ezezagun bakoitzeko, eta ekuazio bat datu bakoitzeko. Rouchék esaten du soluziorik dagoen, eta Cramerrek kalkulatzen du. Amaieran, egiaztatu soluzioak zentzua duela.',
            'En un problema: una incógnita por cada cantidad desconocida y una ecuación por cada dato. Rouché dice si hay solución y Cramer la calcula. Al final, comprueba que la solución tiene sentido.',
            'في المسألة: مجهول لكل كمية مجهولة ومعادلة لكل معطى. يقول روشيه هل يوجد حل ويحسبه كرامر. وفي النهاية تحقق أن للحل معنى.',
            'In a problem: one unknown for each unknown amount and one equation for each piece of data. Rouché says whether there is a solution and Cramer works it out. At the end, check that the solution makes sense.'
        )
    },
    {
        id: 'parameter-problems',
        stage: 'problems',
        title: say('Parametroa duten problemak', 'Problemas con parámetro', 'مسائل بوسيط', 'Problems with a parameter'),
        goal: say('Soluzio bat ematen denean, parametroaren balioa aurkitzea, eta soluzio hori bakarra den ikustea.', 'Hallar el valor del parámetro cuando se da una solución, y ver si esa solución es la única.', 'إيجاد قيمة الوسيط عند إعطاء حل، ومعرفة هل هذا الحل هو الوحيد.', 'Find the value of the parameter when a solution is given, and see whether that solution is the only one.'),
        problem: say('Zein $a$ baliotarako da $(1,2,-1)$ $\\begin{cases}x+y+z=2\\\\ ax+y-z=5\\\\ x-ay+z=-4\\end{cases}$ sistemaren soluzioa?', '¿Para qué $a$ es $(1,2,-1)$ solución de $\\begin{cases}x+y+z=2\\\\ ax+y-z=5\\\\ x-ay+z=-4\\end{cases}$?', 'لأي $a$ يكون $(1,2,-1)$ حلًّا لـ $\\begin{cases}x+y+z=2\\\\ ax+y-z=5\\\\ x-ay+z=-4\\end{cases}$؟', 'For which $a$ is $(1,2,-1)$ a solution of $\\begin{cases}x+y+z=2\\\\ ax+y-z=5\\\\ x-ay+z=-4\\end{cases}$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ordeztu hirukotea bigarren ekuazioan.', 'Sustituye la terna en la segunda ecuación.', 'عوّض الثلاثية في المعادلة الثانية.', 'Substitute the triple in the second equation.'), math: same('$a+2+1=5\\ \\to\\ a=2$') },
            { text: say('Egiaztatu hirugarrena, $a$ horrekin.', 'Comprueba la tercera con ese $a$.', 'تحقق من الثالثة بهذه القيمة لـ $a$.', 'Check the third with that $a$.'), math: same('$1-2\\cdot 2-1=-4$') },
            { text: say('$a=2$ denean, $|A|=-9\\neq 0$: hori da soluzio bakarra.', 'Con $a=2$, $|A|=-9\\neq 0$: es la única solución.', 'مع $a=2$ يكون $|A|=-9\\neq 0$: هو الحل الوحيد.', 'With $a=2$, $|A|=-9\\neq 0$: it is the only solution.'), math: same('$|A|=-9$') }
        ],
        takeaway: say(
            'Soluzio bat ematen bada, ordeztu egiten da: ekuazio bakoitzak baldintza bat ematen du parametroaren gainean, eta denek balio bera eman behar dute. Gero, $|A|$ determinanteak esaten du soluzio hori bakarra den.',
            'Si se da una solución, se sustituye: cada ecuación da una condición sobre el parámetro, y todas deben dar el mismo valor. Después, $|A|$ dice si esa solución es la única.',
            'إذا أُعطي حل فإنه يُعوَّض: كل معادلة تعطي شرطًا على الوسيط، ويجب أن تعطي كلها القيمة نفسها. ثم يقول $|A|$ هل هذا الحل هو الوحيد.',
            'If a solution is given, substitute it: each equation gives a condition on the parameter, and they must all give the same value. Then $|A|$ says whether that solution is the only one.'
        )
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts) */
export const sistemakTopics: UnitTopic[] = baseTopics.map((topic) => ({ ...topic, ...sistemakLessonTexts[topic.id as SistemakTopicId], ...sistemakLessonChecks[topic.id as SistemakTopicId] }))

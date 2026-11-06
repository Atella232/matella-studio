import type { LocalizedText, UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { OperationsFigure, VectorFigure } from '../dbh4-akademikoak-bektoreak/figures'
import { AngleFigure, BasisFigure, CombinationFigure, DecompositionFigure, DiagonalsFigure, DotSignFigure, OrthonormalFigure, PerpendicularFigure, ProjectionFigure, RiverFigure, SkewGridFigure, TailToTailFigure, UnitVectorFigure } from './figures'
import { bachVectorsLessonChecks, type BachVectorsTopicId } from './lessonChecks'
import { bachVectorsLessonTexts } from './lessonTexts'

/* ==========================================================================
   Bektoreak · Batxilergoa 1 · Zientziak — stages and lessons. The scope
   follows unit 7 of Anaya Matemáticas I and the vector half of unit 6 of
   Santillana 1.º Bachillerato Ciencias (the points, lines and distances
   go to the next topic, geometria-analitica). What 4. DBH académicas
   already taught (coordinates, magnitude, operations, parallel vectors)
   comes back as a short review with «Review first» links; linear
   combinations, bases that are not orthonormal, the dot product, angles,
   projections and splitting a vector are new.
   ========================================================================== */

export type BachVectorsStageId = 'vectors' | 'bases' | 'dot' | 'analytic' | 'applications'

export const bachVectorsStages: UnitStage[] = [
    { id: 'vectors', tone: 'blue', title: { eu: 'Bektoreak eta eragiketak', es: 'Vectores y operaciones', en: 'Vectors and operations', ar: 'المتجهات والعمليات' } },
    { id: 'bases', tone: 'violet', title: { eu: 'Konbinazio lineala eta oinarriak', es: 'Combinación lineal y bases', en: 'Linear combinations and bases', ar: 'التركيب الخطي والأساسات' } },
    { id: 'dot', tone: 'mustard', title: { eu: 'Biderkadura eskalarra', es: 'Producto escalar', en: 'Dot product', ar: 'الجداء السلمي' } },
    { id: 'analytic', tone: 'coral', title: { eu: 'Biderkadura eskalarra koordenatuekin', es: 'Producto escalar con coordenadas', en: 'Dot product with coordinates', ar: 'الجداء السلمي بالمركّبات' } },
    { id: 'applications', tone: 'green', title: { eu: 'Proiekzioak eta aplikazioak', es: 'Proyecciones y aplicaciones', en: 'Projections and applications', ar: 'الإسقاطات والتطبيقات' } }
]

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
/** The same formula in every language; the decimal comma becomes a point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })

const VECTOR_COORDINATES = { unit: 'dbh4-akademikoak/vectores-rectas', topic: 'vector-coordinates', title: { eu: 'Bektore baten koordenatuak eta modulua', es: 'Coordenadas y módulo de un vector', en: 'Coordinates and magnitude of a vector', ar: 'مركّبتا المتجه وطوله' } }
const PARALLEL_VECTORS = { unit: 'dbh4-akademikoak/vectores-rectas', topic: 'parallel-vectors', title: { eu: 'Bektore paraleloak eta perpendikularrak', es: 'Vectores paralelos y perpendiculares', en: 'Parallel and perpendicular vectors', ar: 'المتجهات المتوازية والمتعامدة' } }

/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    /* ---------- 1. Vectors and operations ---------- */
    {
        id: 'free-vectors',
        stage: 'vectors',
        title: say('Bektore finkoak eta askeak', 'Vectores fijos y libres', 'المتجهات المقيّدة والحرة', 'Fixed and free vectors'),
        goal: say('Bektore finko bat eta bektore aske bat bereiztea, eta haien koordenatuak eta modulua kalkulatzea.', 'Distinguir un vector fijo de un vector libre, y calcular sus coordenadas y su módulo.', 'التمييز بين المتجه المقيّد والمتجه الحر، وحساب مركّبتيه وطوله.', 'Tell a fixed vector from a free vector, and work out its coordinates and magnitude.'),
        needs: [VECTOR_COORDINATES],
        problem: say('$A(1,-1)$, $B(4,3)$, $C(-2,2)$ eta $D(1,6)$ badira, $\\overrightarrow{AB}$ eta $\\overrightarrow{CD}$ bektore aske bera dira? Zein da haien modulua?', 'Dados $A(1,-1)$, $B(4,3)$, $C(-2,2)$ y $D(1,6)$, ¿son $\\overrightarrow{AB}$ y $\\overrightarrow{CD}$ el mismo vector libre? ¿Cuál es su módulo?', 'إذا كانت $A(1,-1)$ و$B(4,3)$ و$C(-2,2)$ و$D(1,6)$، فهل $\\overrightarrow{AB}$ و$\\overrightarrow{CD}$ المتجه الحر نفسه؟ وما طوله؟', 'Given $A(1,-1)$, $B(4,3)$, $C(-2,2)$ and $D(1,6)$, are $\\overrightarrow{AB}$ and $\\overrightarrow{CD}$ the same free vector? What is its magnitude?'),
        stepsKind: 'steps',
        steps: [
            { text: say('$\\overrightarrow{AB}$: muturra ken jatorria.', '$\\overrightarrow{AB}$: extremo menos origen.', '$\\overrightarrow{AB}$: الطرف ناقص الأصل.', '$\\overrightarrow{AB}$: end point minus start point.'), math: same('$\\overrightarrow{AB}=(4-1,3-(-1))=(3,4)$') },
            { text: say('$\\overrightarrow{CD}$, berdin.', '$\\overrightarrow{CD}$, igual.', '$\\overrightarrow{CD}$ بالطريقة نفسها.', '$\\overrightarrow{CD}$, the same way.'), math: same('$\\overrightarrow{CD}=(1-(-2),6-2)=(3,4)$') },
            { text: say('Koordenatu berak: bektore aske bera, eta modulua 5.', 'Mismas coordenadas: el mismo vector libre, de módulo 5.', 'المركّبتان نفسهما: المتجه الحر نفسه، وطوله 5.', 'Same coordinates: the same free vector, with magnitude 5.'), math: same('$|\\overrightarrow{AB}|=\\sqrt{3^2+4^2}=5$') }
        ],
        takeaway: say('Bektore askea modulu, norabide eta noranzko bera duten bektore finko guztiak dira. Haren koordenatuak muturra ken jatorria dira: $\\overrightarrow{AB}=B-A$.', 'Un vector libre son todos los vectores fijos con el mismo módulo, dirección y sentido. Sus coordenadas son extremo menos origen: $\\overrightarrow{AB}=B-A$.', 'المتجه الحر هو كل المتجهات المقيّدة التي لها الطول والاتجاه والمنحى نفسها. ومركّبتاه الطرف ناقص الأصل: $\\overrightarrow{AB}=B-A$.', 'A free vector is all the fixed vectors with the same magnitude, direction and sense. Its coordinates are end point minus start point: $\\overrightarrow{AB}=B-A$.'),
        figure: (language) => <VectorFigure language={language} />
    },
    {
        id: 'vector-operations',
        stage: 'vectors',
        title: say('Batuketa, kenketa eta zenbaki bider bektorea', 'Suma, resta y producto por un número', 'الجمع والطرح والضرب في عدد', 'Adding, subtracting and multiplying by a number'),
        goal: say('Bektoreak batzea eta kentzea, eta zenbaki batez biderkatzea, marrazkiz (paralelogramoaren erregela) eta koordenatuekin.', 'Sumar y restar vectores y multiplicarlos por un número, con dibujo (regla del paralelogramo) y con coordenadas.', 'جمع المتجهات وطرحها وضربها في عدد، بالرسم (قاعدة متوازي الأضلاع) وبالمركّبات.', 'Add and subtract vectors and multiply them by a number, with a drawing (parallelogram rule) and with coordinates.'),
        needs: [{ unit: 'dbh4-akademikoak/vectores-rectas', topic: 'vector-operations', title: { eu: 'Bektoreekin eragiketak', es: 'Operaciones con vectores', en: 'Operations with vectors', ar: 'العمليات على المتجهات' } }],
        problem: say('$\\vec{u}=(2,-1)$ eta $\\vec{v}=(-1,3)$ badira, kalkulatu $2\\vec{u}-\\vec{v}$.', 'Con $\\vec{u}=(2,-1)$ y $\\vec{v}=(-1,3)$, calcula $2\\vec{u}-\\vec{v}$.', 'إذا كان $\\vec{u}=(2,-1)$ و$\\vec{v}=(-1,3)$، فاحسب $2\\vec{u}-\\vec{v}$.', 'With $\\vec{u}=(2,-1)$ and $\\vec{v}=(-1,3)$, work out $2\\vec{u}-\\vec{v}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zenbaki bider bektorea: bi koordenatuak.', 'Por un número: las dos coordenadas.', 'الضرب في عدد: المركّبتان معًا.', 'Times a number: both coordinates.'), math: same('$2\\vec{u}=(4,-2)$') },
            { text: say('Kentzea aurkakoa batzea da.', 'Restar es sumar el opuesto.', 'الطرح جمع المعاكس.', 'Subtracting is adding the opposite.'), math: same('$-\\vec{v}=(1,-3)$') },
            { text: say('Batu koordenatuz koordenatu.', 'Suma coordenada a coordenada.', 'اجمع مركّبةً مركّبة.', 'Add coordinate by coordinate.'), math: same('$2\\vec{u}-\\vec{v}=(4+1,-2-3)=(5,-5)$') }
        ],
        takeaway: say('Koordenatuz koordenatu egiten da. $k\\vec{u}$ bektoreak $\\vec{u}$ bektorearen norabidea du, eta $\\vec{u}+\\vec{v}$ haien paralelogramoaren diagonala da.', 'Se opera coordenada a coordenada. $k\\vec{u}$ tiene la dirección de $\\vec{u}$, y $\\vec{u}+\\vec{v}$ es la diagonal de su paralelogramo.', 'نُجري العمليات مركّبةً مركّبة. للمتجه $k\\vec{u}$ اتجاه $\\vec{u}$، و$\\vec{u}+\\vec{v}$ قطر متوازي أضلاعهما.', 'You work coordinate by coordinate. $k\\vec{u}$ has the direction of $\\vec{u}$, and $\\vec{u}+\\vec{v}$ is the diagonal of their parallelogram.'),
        figure: (language) => <OperationsFigure language={language} />
    },

    /* ---------- 2. Linear combinations and bases ---------- */
    {
        id: 'linear-combination',
        stage: 'bases',
        title: say('Konbinazio lineala', 'Combinación lineal', 'التركيب الخطي', 'Linear combinations'),
        goal: say('Bektore bat beste biren konbinazio lineal gisa idaztea, $a\\vec{u}+b\\vec{v}$, $a$ eta $b$ zenbakiak sistema batekin aurkituz.', 'Escribir un vector como combinación lineal de otros dos, $a\\vec{u}+b\\vec{v}$, hallando los números $a$ y $b$ con un sistema.', 'كتابة متجه تركيبًا خطيًا لمتجهين آخرين $a\\vec{u}+b\\vec{v}$ بإيجاد العددين $a$ و$b$ بنظام.', 'Write a vector as a linear combination of two others, $a\\vec{u}+b\\vec{v}$, finding the numbers $a$ and $b$ with a system.'),
        needs: [{ unit: 'dbh4-akademikoak/sistemas', topic: 'reduction', title: { eu: 'Laburketa-metodoa', es: 'Método de reducción', en: 'Elimination method', ar: 'طريقة الحذف' } }],
        problem: say('Idatzi $\\vec{w}=(1,8)$ bektorea $\\vec{u}=(1,2)$ eta $\\vec{v}=(-1,1)$ bektoreen konbinazio lineal gisa.', 'Escribe $\\vec{w}=(1,8)$ como combinación lineal de $\\vec{u}=(1,2)$ y $\\vec{v}=(-1,1)$.', 'اكتب $\\vec{w}=(1,8)$ تركيبًا خطيًا لـ $\\vec{u}=(1,2)$ و$\\vec{v}=(-1,1)$.', 'Write $\\vec{w}=(1,8)$ as a linear combination of $\\vec{u}=(1,2)$ and $\\vec{v}=(-1,1)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Planteatu $a\\vec{u}+b\\vec{v}=\\vec{w}$ koordenatuz koordenatu.', 'Plantea $a\\vec{u}+b\\vec{v}=\\vec{w}$ coordenada a coordenada.', 'اكتب $a\\vec{u}+b\\vec{v}=\\vec{w}$ مركّبةً مركّبة.', 'Set up $a\\vec{u}+b\\vec{v}=\\vec{w}$ coordinate by coordinate.'), math: same('$\\begin{cases}a-b=1\\\\ 2a+b=8\\end{cases}$') },
            { text: say('Batu bi ekuazioak.', 'Suma las dos ecuaciones.', 'اجمع المعادلتين.', 'Add the two equations.'), math: same('$3a=9\\ \\to\\ a=3,\\ b=2$') },
            { text: say('Idatzi konbinazioa.', 'Escribe la combinación.', 'اكتب التركيب.', 'Write the combination.'), math: same('$\\vec{w}=3\\vec{u}+2\\vec{v}$') }
        ],
        takeaway: say('$\\vec{u}$ eta $\\vec{v}$ bektoreen konbinazio lineal bat $a\\vec{u}+b\\vec{v}$ da. $a$ eta $b$ aurkitzeko, koordenatuak berdintzen dira eta sistema bat ebazten da.', 'Una combinación lineal de $\\vec{u}$ y $\\vec{v}$ es $a\\vec{u}+b\\vec{v}$. Para hallar $a$ y $b$ se igualan coordenadas y se resuelve un sistema.', 'التركيب الخطي لـ $\\vec{u}$ و$\\vec{v}$ هو $a\\vec{u}+b\\vec{v}$. ولإيجاد $a$ و$b$ نساوي المركّبات ونحل نظامًا.', 'A linear combination of $\\vec{u}$ and $\\vec{v}$ is $a\\vec{u}+b\\vec{v}$. To find $a$ and $b$, set the coordinates equal and solve a system.'),
        figure: (language) => <CombinationFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'basis',
        stage: 'bases',
        title: say('Planoaren oinarriak', 'Bases del plano', 'أساسات المستوى', 'Bases of the plane'),
        goal: say('Bi bektorek noiz osatzen duten oinarri bat jakitea: paraleloak ez direnean, hau da, haien koordenatuak proportzionalak ez direnean.', 'Reconocer cuándo dos vectores forman una base: cuando no son paralelos, es decir, cuando sus coordenadas no son proporcionales.', 'معرفة متى يكوّن متجهان أساسًا: عندما لا يكونان متوازيين، أي عندما لا تكون مركّباتهما متناسبة.', 'Recognise when two vectors form a basis: when they are not parallel, that is, when their coordinates are not proportional.'),
        needs: [PARALLEL_VECTORS],
        problem: say('$\\vec{u}=(2,-3)$ eta $\\vec{v}=(-4,6)$ bektoreek oinarri bat osatzen dute? Eta $\\vec{u}$ eta $\\vec{w}=(1,2)$ bektoreek?', '¿Forman una base $\\vec{u}=(2,-3)$ y $\\vec{v}=(-4,6)$? ¿Y $\\vec{u}$ y $\\vec{w}=(1,2)$?', 'هل يكوّن $\\vec{u}=(2,-3)$ و$\\vec{v}=(-4,6)$ أساسًا؟ وماذا عن $\\vec{u}$ و$\\vec{w}=(1,2)$؟', 'Do $\\vec{u}=(2,-3)$ and $\\vec{v}=(-4,6)$ form a basis? And $\\vec{u}$ and $\\vec{w}=(1,2)$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Konparatu $\\vec{u}$ eta $\\vec{v}$ bektoreen koordenatuak.', 'Compara las coordenadas de $\\vec{u}$ y $\\vec{v}$.', 'قارن مركّبات $\\vec{u}$ و$\\vec{v}$.', 'Compare the coordinates of $\\vec{u}$ and $\\vec{v}$.'), math: same('$\\frac{-4}{2}=\\frac{6}{-3}=-2$') },
            { text: say('Paraleloak dira: ez dute oinarririk osatzen.', 'Son paralelos: no forman una base.', 'إنهما متوازيان: لا يكوّنان أساسًا.', 'They are parallel: they do not form a basis.'), math: same('$\\vec{v}=-2\\vec{u}$') },
            { text: say('$\\vec{w}$ bektorearekin ez dago proportziorik: oinarri bat osatzen dute.', 'Con $\\vec{w}$ no hay proporción: forman una base.', 'مع $\\vec{w}$ لا يوجد تناسب: يكوّنان أساسًا.', 'With $\\vec{w}$ there is no proportion: they form a basis.'), math: same('$\\frac{1}{2}\\neq\\frac{2}{-3}$') }
        ],
        takeaway: say('Bi bektorek oinarri bat osatzen dute paraleloak ez badira, hau da, haien koordenatuak proportzionalak ez badira. Orduan, edozein bektore modu bakarrean idazten da $a\\vec{u}+b\\vec{v}$ gisa.', 'Dos vectores forman una base si no son paralelos, es decir, si sus coordenadas no son proporcionales. Entonces cualquier vector se escribe de una sola manera como $a\\vec{u}+b\\vec{v}$.', 'يكوّن متجهان أساسًا إذا لم يكونا متوازيين، أي إذا لم تكن مركّباتهما متناسبة. وعندئذ يُكتب أي متجه بطريقة واحدة فقط على الشكل $a\\vec{u}+b\\vec{v}$.', 'Two vectors form a basis if they are not parallel, that is, if their coordinates are not proportional. Then any vector can be written in just one way as $a\\vec{u}+b\\vec{v}$.'),
        figure: (language) => <BasisFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'basis-coordinates',
        stage: 'bases',
        title: say('Oinarri bateko koordenatuak', 'Coordenadas en una base', 'المركّبات في أساس', 'Coordinates in a basis'),
        goal: say('Bektore baten koordenatuak edozein oinarritan aurkitzea, eta oinarria aldatzean aldatzen direla ikustea.', 'Hallar las coordenadas de un vector en cualquier base y ver que cambian al cambiar la base.', 'إيجاد مركّبات متجه في أي أساس، وملاحظة أنها تتغير بتغيّر الأساس.', 'Find the coordinates of a vector in any basis and see that they change when the basis changes.'),
        needs: [{ unit: 'dbh4-akademikoak/sistemas', topic: 'substitution', title: { eu: 'Ordezkapen-metodoa', es: 'Método de sustitución', en: 'Substitution method', ar: 'طريقة التعويض' } }],
        problem: say('$B=(\\vec{u},\\vec{v})$ oinarrian, $\\vec{u}=(1,1)$ eta $\\vec{v}=(-1,2)$ izanik, zein dira $\\vec{w}=(-1,8)$ bektorearen koordenatuak?', 'En la base $B=(\\vec{u},\\vec{v})$, con $\\vec{u}=(1,1)$ y $\\vec{v}=(-1,2)$, ¿qué coordenadas tiene $\\vec{w}=(-1,8)$?', 'في الأساس $B=(\\vec{u},\\vec{v})$ حيث $\\vec{u}=(1,1)$ و$\\vec{v}=(-1,2)$، ما مركّبتا $\\vec{w}=(-1,8)$؟', 'In the basis $B=(\\vec{u},\\vec{v})$, with $\\vec{u}=(1,1)$ and $\\vec{v}=(-1,2)$, what are the coordinates of $\\vec{w}=(-1,8)$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Planteatu $\\vec{w}=a\\vec{u}+b\\vec{v}$.', 'Plantea $\\vec{w}=a\\vec{u}+b\\vec{v}$.', 'اكتب $\\vec{w}=a\\vec{u}+b\\vec{v}$.', 'Set up $\\vec{w}=a\\vec{u}+b\\vec{v}$.'), math: same('$\\begin{cases}a-b=-1\\\\ a+2b=8\\end{cases}$') },
            { text: say('Kendu ekuazioak.', 'Resta las ecuaciones.', 'اطرح المعادلتين.', 'Subtract the equations.'), math: same('$3b=9\\ \\to\\ b=3,\\ a=2$') },
            { text: say('$B$ oinarrian, $(2,3)$; lauki-sarean, $(-1,8)$.', 'En la base $B$, $(2,3)$; en la cuadrícula, $(-1,8)$.', 'في الأساس $B$ المركّبتان $(2,3)$، وفي الشبكة $(-1,8)$.', 'In the basis $B$, $(2,3)$; on the grid, $(-1,8)$.'), math: same('$\\vec{w}=2\\vec{u}+3\\vec{v}=(2,3)_B$') }
        ],
        takeaway: say('$B=(\\vec{u},\\vec{v})$ oinarriko koordenatuak $\\vec{w}=a\\vec{u}+b\\vec{v}$ berdintzako $(a,b)$ koefizienteak dira. Bektore berak beste koordenatu batzuk ditu beste oinarri batean.', 'Las coordenadas de $\\vec{w}$ en la base $B=(\\vec{u},\\vec{v})$ son los coeficientes $(a,b)$ de $\\vec{w}=a\\vec{u}+b\\vec{v}$. El mismo vector tiene otras coordenadas en otra base.', 'مركّبتا $\\vec{w}$ في الأساس $B=(\\vec{u},\\vec{v})$ هما المعاملان $(a,b)$ في $\\vec{w}=a\\vec{u}+b\\vec{v}$. وللمتجه نفسه مركّبات أخرى في أساس آخر.', 'The coordinates of $\\vec{w}$ in the basis $B=(\\vec{u},\\vec{v})$ are the coefficients $(a,b)$ in $\\vec{w}=a\\vec{u}+b\\vec{v}$. The same vector has other coordinates in another basis.'),
        figure: (language) => <SkewGridFigure language={language} />,
        figureAfterSteps: true
    },

    /* ---------- 3. The dot product ---------- */
    {
        id: 'dot-definition',
        stage: 'dot',
        title: say('Biderkadura eskalarra', 'El producto escalar', 'الجداء السلمي', 'The dot product'),
        goal: say('Biderkadura eskalarra kalkulatzea, $\\vec{u}\\cdot\\vec{v}=|\\vec{u}|\\,|\\vec{v}|\\cos\\alpha$, eta haren zeinuan angelua zorrotza, zuzena ala kamutsa den irakurtzea.', 'Calcular el producto escalar $\\vec{u}\\cdot\\vec{v}=|\\vec{u}|\\,|\\vec{v}|\\cos\\alpha$ y leer en su signo si el ángulo es agudo, recto u obtuso.', 'حساب الجداء السلمي $\\vec{u}\\cdot\\vec{v}=|\\vec{u}|\\,|\\vec{v}|\\cos\\alpha$ وقراءة نوع الزاوية من إشارته: حادة أو قائمة أو منفرجة.', 'Work out the dot product $\\vec{u}\\cdot\\vec{v}=|\\vec{u}|\\,|\\vec{v}|\\cos\\alpha$ and read from its sign whether the angle is acute, right or obtuse.'),
        needs: [{ unit: 'dbh4-akademikoak/trigonometria', topic: 'unit-circle', title: { eu: 'Edozein angeluren arrazoiak', es: 'Razones de cualquier ángulo', en: 'Ratios of any angle', ar: 'نسب أي زاوية' } }],
        problem: say('Bi bektorek $|\\vec{u}|=4$ eta $|\\vec{v}|=3$ neurtzen dute, eta $60^\\circ$ osatzen dute. Kalkulatu $\\vec{u}\\cdot\\vec{v}$. Eta angelua $120^\\circ$ balitz?', 'Dos vectores miden $|\\vec{u}|=4$ y $|\\vec{v}|=3$ y forman un ángulo de $60^\\circ$. Calcula $\\vec{u}\\cdot\\vec{v}$. ¿Y si el ángulo fuera de $120^\\circ$?', 'متجهان طولاهما $|\\vec{u}|=4$ و$|\\vec{v}|=3$ ويصنعان زاوية $60^\\circ$. احسب $\\vec{u}\\cdot\\vec{v}$. وماذا لو كانت الزاوية $120^\\circ$؟', 'Two vectors have $|\\vec{u}|=4$ and $|\\vec{v}|=3$ and make an angle of $60^\\circ$. Work out $\\vec{u}\\cdot\\vec{v}$. And if the angle were $120^\\circ$?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Aplikatu definizioa.', 'Aplica la definición.', 'طبّق التعريف.', 'Apply the definition.'), math: same('$\\vec{u}\\cdot\\vec{v}=4\\cdot 3\\cdot\\cos 60^\\circ$') },
            { text: say('$\\cos 60^\\circ=\\frac{1}{2}$ da.', '$\\cos 60^\\circ=\\frac{1}{2}$.', '$\\cos 60^\\circ=\\frac{1}{2}$.', '$\\cos 60^\\circ=\\frac{1}{2}$.'), math: same('$4\\cdot 3\\cdot\\frac{1}{2}=6$') },
            { text: say('$120^\\circ$ denean, kosinua negatiboa da.', 'Con $120^\\circ$, el coseno es negativo.', 'مع $120^\\circ$ يكون جيب التمام سالبًا.', 'With $120^\\circ$, the cosine is negative.'), math: same('$4\\cdot 3\\cdot\\left(-\\frac{1}{2}\\right)=-6$') }
        ],
        takeaway: say('Biderkadura eskalarra, $\\vec{u}\\cdot\\vec{v}=|\\vec{u}|\\,|\\vec{v}|\\cos\\alpha$, zenbaki bat da. Positiboa da angelua zorrotza bada, 0 zuzena bada eta negatiboa kamutsa bada.', 'El producto escalar $\\vec{u}\\cdot\\vec{v}=|\\vec{u}|\\,|\\vec{v}|\\cos\\alpha$ es un número. Es positivo si el ángulo es agudo, 0 si es recto y negativo si es obtuso.', 'الجداء السلمي $\\vec{u}\\cdot\\vec{v}=|\\vec{u}|\\,|\\vec{v}|\\cos\\alpha$ عدد. وهو موجب إذا كانت الزاوية حادة، و0 إذا كانت قائمة، وسالب إذا كانت منفرجة.', 'The dot product $\\vec{u}\\cdot\\vec{v}=|\\vec{u}|\\,|\\vec{v}|\\cos\\alpha$ is a number. It is positive if the angle is acute, 0 if it is a right angle and negative if it is obtuse.'),
        figure: (language) => <DotSignFigure language={language} />
    },
    {
        id: 'dot-figures',
        stage: 'dot',
        title: say('Biderkadura eskalarra irudietan', 'El producto escalar en figuras', 'الجداء السلمي في الأشكال', 'The dot product in figures'),
        goal: say('Poligono erregularretan biderkadura eskalarrak koordenaturik gabe kalkulatzea, bi bektoreak lehenago jatorri berean jarrita.', 'Calcular productos escalares en polígonos regulares sin coordenadas, poniendo antes los dos vectores con el mismo origen.', 'حساب الجداءات السلمية في المضلعات المنتظمة دون مركّبات، بعد وضع المتجهين من الأصل نفسه.', 'Work out dot products in regular polygons without coordinates, first putting both vectors at the same start point.'),
        needs: [{ unit: 'dbh4-akademikoak/trigonometria', topic: 'notable-angles', title: { eu: '30°, 45° eta 60°', es: '30°, 45° y 60°', en: '30°, 45° and 60°', ar: '30° و45° و60°' } }],
        problem: say('Alde 2 duen $ABC$ triangelu aldeberdin batean, kalkulatu $\\overrightarrow{AB}\\cdot\\overrightarrow{AC}$ eta $\\overrightarrow{AB}\\cdot\\overrightarrow{BC}$.', 'En un triángulo equilátero $ABC$ de lado 2, calcula $\\overrightarrow{AB}\\cdot\\overrightarrow{AC}$ y $\\overrightarrow{AB}\\cdot\\overrightarrow{BC}$.', 'في مثلث متساوي الأضلاع $ABC$ طول ضلعه 2، احسب $\\overrightarrow{AB}\\cdot\\overrightarrow{AC}$ و$\\overrightarrow{AB}\\cdot\\overrightarrow{BC}$.', 'In an equilateral triangle $ABC$ with side 2, work out $\\overrightarrow{AB}\\cdot\\overrightarrow{AC}$ and $\\overrightarrow{AB}\\cdot\\overrightarrow{BC}$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$\\overrightarrow{AB}$ eta $\\overrightarrow{AC}$ bektoreak $A$ puntutik ateratzen dira: $60^\\circ$ osatzen dute.', '$\\overrightarrow{AB}$ y $\\overrightarrow{AC}$ salen de $A$: forman $60^\\circ$.', 'يخرج $\\overrightarrow{AB}$ و$\\overrightarrow{AC}$ من $A$: يصنعان $60^\\circ$.', '$\\overrightarrow{AB}$ and $\\overrightarrow{AC}$ leave $A$: they make $60^\\circ$.'), math: same('$\\overrightarrow{AB}\\cdot\\overrightarrow{AC}=2\\cdot 2\\cdot\\frac{1}{2}=2$') },
            { text: say('$\\overrightarrow{BC}$ bektorea $B$ puntutik ateratzen da: jatorri berean jarrita, $120^\\circ$ osatzen ditu.', '$\\overrightarrow{BC}$ sale de $B$: puestos con el mismo origen, forman $120^\\circ$.', 'يخرج $\\overrightarrow{BC}$ من $B$: وعند وضعهما من الأصل نفسه يصنعان $120^\\circ$.', '$\\overrightarrow{BC}$ leaves $B$: drawn from the same start point, they make $120^\\circ$.'), math: same('$\\overrightarrow{AB}\\cdot\\overrightarrow{BC}=2\\cdot 2\\cdot\\left(-\\frac{1}{2}\\right)=-2$') },
            { text: say('Egiaztatu: $\\overrightarrow{AC}=\\overrightarrow{AB}+\\overrightarrow{BC}$.', 'Comprueba: $\\overrightarrow{AC}=\\overrightarrow{AB}+\\overrightarrow{BC}$.', 'تحقق: $\\overrightarrow{AC}=\\overrightarrow{AB}+\\overrightarrow{BC}$.', 'Check: $\\overrightarrow{AC}=\\overrightarrow{AB}+\\overrightarrow{BC}$.'), math: same('$\\begin{gathered}\\overrightarrow{AB}\\cdot\\overrightarrow{AC}=|\\overrightarrow{AB}|^2+\\overrightarrow{AB}\\cdot\\overrightarrow{BC}\\\\ =4-2=2\\end{gathered}$') }
        ],
        takeaway: say('$\\overrightarrow{AB}$ eta $\\overrightarrow{BC}$ bektoreen angelua jakiteko, lekualdatu bat, puntu beretik atera daitezen: kanpoko angelua da, $180^\\circ-B$, ez poligonoaren $B$ angelua.', 'Para el ángulo de $\\overrightarrow{AB}$ y $\\overrightarrow{BC}$, traslada uno para que salgan del mismo punto: es el exterior, $180^\\circ-B$, no el ángulo $B$ del polígono.', 'لزاوية $\\overrightarrow{AB}$ و$\\overrightarrow{BC}$ انقل أحدهما ليخرجا من النقطة نفسها: إنها الخارجية $180^\\circ-B$ لا زاوية المضلع $B$.', 'For the angle of $\\overrightarrow{AB}$ and $\\overrightarrow{BC}$, move one so that both leave the same point: it is the outer one, $180^\\circ-B$, not the angle $B$ of the polygon.'),
        figure: (language) => <TailToTailFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'dot-properties',
        stage: 'dot',
        title: say('Biderkadura eskalarraren propietateak', 'Propiedades del producto escalar', 'خصائص الجداء السلمي', 'Properties of the dot product'),
        goal: say('Propietateak erabiltzea (trukakorra, banakorra, zenbakiak kanpora eta $\\vec{u}\\cdot\\vec{u}=|\\vec{u}|^2$) $|\\vec{u}+\\vec{v}|$ marraztu gabe kalkulatzeko.', 'Usar las propiedades (conmutativa, distributiva, sacar números y $\\vec{u}\\cdot\\vec{u}=|\\vec{u}|^2$) para calcular $|\\vec{u}+\\vec{v}|$ sin dibujar.', 'استعمال الخصائص (التبديل والتوزيع وإخراج الأعداد و$\\vec{u}\\cdot\\vec{u}=|\\vec{u}|^2$) لحساب $|\\vec{u}+\\vec{v}|$ دون رسم.', 'Use the properties (commutative, distributive, taking numbers out and $\\vec{u}\\cdot\\vec{u}=|\\vec{u}|^2$) to work out $|\\vec{u}+\\vec{v}|$ without drawing.'),
        needs: [{ unit: 'dbh3/polinomios', topic: 'square-sum', title: { eu: 'Batura baten karratua', es: 'Cuadrado de una suma', en: 'The square of a sum', ar: 'مربع مجموع' } }],
        problem: say('$|\\vec{u}|=3$, $|\\vec{v}|=5$ eta $\\vec{u}\\cdot\\vec{v}=-9$ badira, aurkitu $|\\vec{u}+\\vec{v}|$.', 'Si $|\\vec{u}|=3$, $|\\vec{v}|=5$ y $\\vec{u}\\cdot\\vec{v}=-9$, halla $|\\vec{u}+\\vec{v}|$.', 'إذا كان $|\\vec{u}|=3$ و$|\\vec{v}|=5$ و$\\vec{u}\\cdot\\vec{v}=-9$، فأوجد $|\\vec{u}+\\vec{v}|$.', 'If $|\\vec{u}|=3$, $|\\vec{v}|=5$ and $\\vec{u}\\cdot\\vec{v}=-9$, find $|\\vec{u}+\\vec{v}|$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Modulu baten karratua bektorearen biderkadura eskalarra da bere buruarekin.', 'El cuadrado de un módulo es el producto escalar del vector por sí mismo.', 'مربع الطول هو الجداء السلمي للمتجه في نفسه.', 'The square of a magnitude is the dot product of the vector with itself.'), math: same('$|\\vec{u}+\\vec{v}|^2=(\\vec{u}+\\vec{v})\\cdot(\\vec{u}+\\vec{v})$') },
            { text: say('Garatu propietate banakorrarekin eta trukakorrarekin.', 'Desarrolla con la distributiva y la conmutativa.', 'انشر بخاصيتي التوزيع والتبديل.', 'Expand with the distributive and commutative properties.'), math: same('$|\\vec{u}|^2+2\\,\\vec{u}\\cdot\\vec{v}+|\\vec{v}|^2$') },
            { text: say('Ordezkatu.', 'Sustituye.', 'عوّض.', 'Substitute.'), math: same('$9+2\\cdot(-9)+25=16\\ \\to\\ |\\vec{u}+\\vec{v}|=4$') }
        ],
        takeaway: say('$|\\vec{u}+\\vec{v}|^2=|\\vec{u}|^2+2\\,\\vec{u}\\cdot\\vec{v}+|\\vec{v}|^2$: batura baten karratua bezala garatzen da. Horregatik, $|\\vec{u}+\\vec{v}|$ ez da $|\\vec{u}|+|\\vec{v}|$.', '$|\\vec{u}+\\vec{v}|^2=|\\vec{u}|^2+2\\,\\vec{u}\\cdot\\vec{v}+|\\vec{v}|^2$: se desarrolla como el cuadrado de una suma. Por eso $|\\vec{u}+\\vec{v}|$ no es $|\\vec{u}|+|\\vec{v}|$.', '$|\\vec{u}+\\vec{v}|^2=|\\vec{u}|^2+2\\,\\vec{u}\\cdot\\vec{v}+|\\vec{v}|^2$: يُنشر كمربع مجموع. لذلك $|\\vec{u}+\\vec{v}|$ ليس $|\\vec{u}|+|\\vec{v}|$.', '$|\\vec{u}+\\vec{v}|^2=|\\vec{u}|^2+2\\,\\vec{u}\\cdot\\vec{v}+|\\vec{v}|^2$: it expands like the square of a sum. That is why $|\\vec{u}+\\vec{v}|$ is not $|\\vec{u}|+|\\vec{v}|$.'),
        figure: (language) => <DiagonalsFigure language={language} />,
        figureAfterSteps: true
    },

    /* ---------- 4. The dot product with coordinates ---------- */
    {
        id: 'orthonormal',
        stage: 'analytic',
        title: say('Oinarri ortonormala eta koordenatuak', 'Base ortonormal y coordenadas', 'الأساس المتعامد المتجانس والمركّبات', 'Orthonormal basis and coordinates'),
        goal: say('Biderkadura eskalarra koordenatuekin kalkulatzea oinarri ortonormal batean: $\\vec{u}\\cdot\\vec{v}=u_1v_1+u_2v_2$.', 'Calcular el producto escalar con coordenadas en una base ortonormal: $\\vec{u}\\cdot\\vec{v}=u_1v_1+u_2v_2$.', 'حساب الجداء السلمي بالمركّبات في أساس متعامد ومتجانس: $\\vec{u}\\cdot\\vec{v}=u_1v_1+u_2v_2$.', 'Work out the dot product with coordinates in an orthonormal basis: $\\vec{u}\\cdot\\vec{v}=u_1v_1+u_2v_2$.'),
        problem: say('Oinarri ortonormal batean, $\\vec{u}=(3,-2)$ eta $\\vec{v}=(4,5)$ dira. Kalkulatu $\\vec{u}\\cdot\\vec{v}$, eta esan angelua zorrotza, zuzena ala kamutsa den.', 'En una base ortonormal, $\\vec{u}=(3,-2)$ y $\\vec{v}=(4,5)$. Calcula $\\vec{u}\\cdot\\vec{v}$ y di si el ángulo es agudo, recto u obtuso.', 'في أساس متعامد ومتجانس، $\\vec{u}=(3,-2)$ و$\\vec{v}=(4,5)$. احسب $\\vec{u}\\cdot\\vec{v}$ وقل هل الزاوية حادة أم قائمة أم منفرجة.', 'In an orthonormal basis, $\\vec{u}=(3,-2)$ and $\\vec{v}=(4,5)$. Work out $\\vec{u}\\cdot\\vec{v}$ and say whether the angle is acute, right or obtuse.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Biderkatu lehen koordenatuak eta bigarrenak, eta batu.', 'Multiplica las primeras coordenadas y las segundas, y suma.', 'اضرب المركّبتين الأوليين والثانيتين واجمع.', 'Multiply the first coordinates and the second ones, and add.'), math: same('$\\vec{u}\\cdot\\vec{v}=3\\cdot 4+(-2)\\cdot 5$') },
            { text: say('Egin eragiketak.', 'Opera.', 'أجرِ العمليات.', 'Work it out.'), math: same('$12-10=2$') },
            { text: say('Positiboa: angelua zorrotza da.', 'Positivo: el ángulo es agudo.', 'موجب: الزاوية حادة.', 'Positive: the angle is acute.'), math: same('$2>0$') }
        ],
        takeaway: say('Oinarri ortonormal batean, $\\vec{u}\\cdot\\vec{v}=u_1v_1+u_2v_2$. Beste oinarri batean, formula hori ez da betetzen.', 'En una base ortonormal, $\\vec{u}\\cdot\\vec{v}=u_1v_1+u_2v_2$. En otra base, esa fórmula no vale.', 'في أساس متعامد ومتجانس $\\vec{u}\\cdot\\vec{v}=u_1v_1+u_2v_2$. وفي أساس آخر لا تصح هذه الصيغة.', 'In an orthonormal basis, $\\vec{u}\\cdot\\vec{v}=u_1v_1+u_2v_2$. In another basis, that formula does not hold.'),
        figure: (language) => <OrthonormalFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'modulus-unit',
        stage: 'analytic',
        title: say('Modulua eta bektore unitarioak', 'Módulo y vectores unitarios', 'الطول ومتجهات الوحدة', 'Magnitude and unit vectors'),
        goal: say('Koordenatuak dituen bektore baten modulua kalkulatzea, eta haren norabidean bektore unitarioak edo modulu jakin bat dutenak lortzea.', 'Calcular el módulo de un vector con coordenadas y obtener vectores unitarios o de un módulo dado en su dirección.', 'حساب طول متجه بمركّباته، وإيجاد متجهات الوحدة أو متجهات بطول معلوم في اتجاهه.', 'Work out the magnitude of a vector from its coordinates and get unit vectors, or vectors of a given magnitude, in its direction.'),
        needs: [VECTOR_COORDINATES],
        problem: say('Aurkitu $\\vec{v}=(6,-8)$ bektorearen norabide eta noranzko bereko bektore unitario bat, eta beste bat, modulua 5 duena.', 'Halla un vector unitario con la dirección y el sentido de $\\vec{v}=(6,-8)$, y otro de módulo 5.', 'أوجد متجه وحدة له اتجاه $\\vec{v}=(6,-8)$ ومنحاه، ومتجهًا آخر طوله 5.', 'Find a unit vector with the direction and sense of $\\vec{v}=(6,-8)$, and another one of magnitude 5.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Modulua.', 'El módulo.', 'الطول.', 'The magnitude.'), math: same('$|\\vec{v}|=\\sqrt{6^2+(-8)^2}=\\sqrt{100}=10$') },
            { text: say('Zatitu moduluaz.', 'Divide entre el módulo.', 'اقسم على الطول.', 'Divide by the magnitude.'), math: same('$\\frac{1}{10}(6,-8)=\\left(\\frac{3}{5},-\\frac{4}{5}\\right)$') },
            { text: say('Biderkatu unitarioa 5 zenbakiaz.', 'Multiplica el unitario por 5.', 'اضرب متجه الوحدة في 5.', 'Multiply the unit vector by 5.'), math: same('$5\\left(\\frac{3}{5},-\\frac{4}{5}\\right)=(3,-4)$') }
        ],
        takeaway: say('$|\\vec{v}|=\\sqrt{v_1^2+v_2^2}=\\sqrt{\\vec{v}\\cdot\\vec{v}}$. $\\vec{v}$ bere moduluaz zatituta, norabide eta noranzko bereko bektore unitarioa ateratzen da.', '$|\\vec{v}|=\\sqrt{v_1^2+v_2^2}=\\sqrt{\\vec{v}\\cdot\\vec{v}}$. Al dividir $\\vec{v}$ entre su módulo sale el vector unitario con su dirección y su sentido.', '$|\\vec{v}|=\\sqrt{v_1^2+v_2^2}=\\sqrt{\\vec{v}\\cdot\\vec{v}}$. وبقسمة $\\vec{v}$ على طوله نحصل على متجه الوحدة الذي له اتجاهه ومنحاه.', '$|\\vec{v}|=\\sqrt{v_1^2+v_2^2}=\\sqrt{\\vec{v}\\cdot\\vec{v}}$. Dividing $\\vec{v}$ by its magnitude gives the unit vector with its direction and sense.'),
        figure: (language) => <UnitVectorFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'angle-vectors',
        stage: 'analytic',
        title: say('Bi bektoreren angelua', 'Ángulo de dos vectores', 'زاوية متجهين', 'The angle between two vectors'),
        goal: say('Bi bektoreren angelua aurkitzea, $\\cos\\alpha=\\frac{\\vec{u}\\cdot\\vec{v}}{|\\vec{u}|\\,|\\vec{v}|}$ erabiliz.', 'Hallar el ángulo de dos vectores con $\\cos\\alpha=\\frac{\\vec{u}\\cdot\\vec{v}}{|\\vec{u}|\\,|\\vec{v}|}$.', 'إيجاد زاوية متجهين بالعلاقة $\\cos\\alpha=\\frac{\\vec{u}\\cdot\\vec{v}}{|\\vec{u}|\\,|\\vec{v}|}$.', 'Find the angle between two vectors with $\\cos\\alpha=\\frac{\\vec{u}\\cdot\\vec{v}}{|\\vec{u}|\\,|\\vec{v}|}$.'),
        needs: [{ unit: 'dbh4-akademikoak/trigonometria', topic: 'calculator', title: { eu: 'Kalkulagailua trigonometrian', es: 'La calculadora en trigonometría', en: 'The calculator in trigonometry', ar: 'الآلة الحاسبة في حساب المثلثات' } }],
        problem: say('Aurkitu $\\vec{u}=(1,3)$ eta $\\vec{v}=(2,-4)$ bektoreek osatzen duten angelua.', 'Halla el ángulo que forman $\\vec{u}=(1,3)$ y $\\vec{v}=(2,-4)$.', 'أوجد الزاوية بين $\\vec{u}=(1,3)$ و$\\vec{v}=(2,-4)$.', 'Find the angle between $\\vec{u}=(1,3)$ and $\\vec{v}=(2,-4)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Biderkadura eskalarra eta moduluak.', 'Producto escalar y módulos.', 'الجداء السلمي والطولان.', 'Dot product and magnitudes.'), math: same('$\\begin{gathered}\\vec{u}\\cdot\\vec{v}=2-12=-10\\\\ |\\vec{u}|=\\sqrt{10}\\qquad |\\vec{v}|=\\sqrt{20}\\end{gathered}$') },
            { text: say('Askatu kosinua.', 'Despeja el coseno.', 'استخرج جيب التمام.', 'Solve for the cosine.'), math: same('$\\cos\\alpha=\\frac{-10}{\\sqrt{10}\\cdot\\sqrt{20}}=-\\frac{\\sqrt{2}}{2}$') },
            { text: say('Kosinua negatiboa da: angelua kamutsa.', 'El coseno es negativo: el ángulo es obtuso.', 'جيب التمام سالب: الزاوية منفرجة.', 'The cosine is negative: the angle is obtuse.'), math: same('$\\alpha=135^\\circ$') }
        ],
        takeaway: say('$\\cos\\alpha=\\frac{\\vec{u}\\cdot\\vec{v}}{|\\vec{u}|\\,|\\vec{v}|}$, $0^\\circ\\le\\alpha\\le 180^\\circ$ izanik. Kosinua negatiboa bada, angelua kamutsa da: ez hartu zorrotza.', '$\\cos\\alpha=\\frac{\\vec{u}\\cdot\\vec{v}}{|\\vec{u}|\\,|\\vec{v}|}$, con $0^\\circ\\le\\alpha\\le 180^\\circ$. Si el coseno es negativo, el ángulo es obtuso: no tomes el agudo.', '$\\cos\\alpha=\\frac{\\vec{u}\\cdot\\vec{v}}{|\\vec{u}|\\,|\\vec{v}|}$ حيث $0^\\circ\\le\\alpha\\le 180^\\circ$. إذا كان جيب التمام سالبًا فالزاوية منفرجة: لا تأخذ الحادة.', '$\\cos\\alpha=\\frac{\\vec{u}\\cdot\\vec{v}}{|\\vec{u}|\\,|\\vec{v}|}$, with $0^\\circ\\le\\alpha\\le 180^\\circ$. If the cosine is negative, the angle is obtuse: do not take the acute one.'),
        figure: (language) => <AngleFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'perpendicular-vectors',
        stage: 'analytic',
        title: say('Bektore perpendikularrak', 'Vectores perpendiculares', 'المتجهات المتعامدة', 'Perpendicular vectors'),
        goal: say('$\\vec{u}\\perp\\vec{v}$ baldin eta soilik baldin $\\vec{u}\\cdot\\vec{v}=0$ erabiltzea: perpendikulartasuna egiaztatzeko, parametro bat aurkitzeko eta perpendikularrak eraikitzeko.', 'Usar que $\\vec{u}\\perp\\vec{v}$ si y solo si $\\vec{u}\\cdot\\vec{v}=0$ para comprobar perpendicularidad, hallar un parámetro y construir perpendiculares.', 'استعمال أن $\\vec{u}\\perp\\vec{v}$ إذا وفقط إذا كان $\\vec{u}\\cdot\\vec{v}=0$ للتحقق من التعامد وإيجاد وسيط وبناء متجهات عمودية.', 'Use that $\\vec{u}\\perp\\vec{v}$ if and only if $\\vec{u}\\cdot\\vec{v}=0$ to check perpendicularity, find a parameter and build perpendicular vectors.'),
        needs: [PARALLEL_VECTORS],
        problem: say('Aurkitu $k$, $\\vec{u}=(3,k)$ bektorea $\\vec{v}=(4,-6)$ bektorearen perpendikularra izan dadin. Zenbat neurtzen du orduan $\\vec{u}$ bektoreak?', 'Halla $k$ para que $\\vec{u}=(3,k)$ sea perpendicular a $\\vec{v}=(4,-6)$. ¿Cuánto mide entonces $\\vec{u}$?', 'أوجد $k$ ليكون $\\vec{u}=(3,k)$ عموديًا على $\\vec{v}=(4,-6)$. وكم يكون طول $\\vec{u}$ عندئذ؟', 'Find $k$ so that $\\vec{u}=(3,k)$ is perpendicular to $\\vec{v}=(4,-6)$. How long is $\\vec{u}$ then?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Biderkadura eskalarra, 0.', 'Producto escalar igual a 0.', 'الجداء السلمي يساوي 0.', 'Dot product equal to 0.'), math: same('$(3,k)\\cdot(4,-6)=12-6k=0$') },
            { text: say('Askatu $k$.', 'Despeja $k$.', 'استخرج $k$.', 'Solve for $k$.'), math: same('$k=2$') },
            { text: say('Egiaztatu, eta kalkulatu modulua.', 'Comprueba y calcula el módulo.', 'تحقق واحسب الطول.', 'Check and work out the magnitude.'), math: same('$\\begin{gathered}(3,2)\\cdot(4,-6)=12-12=0\\\\ |\\vec{u}|=\\sqrt{13}\\end{gathered}$') }
        ],
        takeaway: say('Bi bektore perpendikularrak dira baldin eta soilik baldin haien biderkadura eskalarra 0 bada. $(a,b)$ bektorearen perpendikular bat $(-b,a)$ da.', 'Dos vectores son perpendiculares si y solo si su producto escalar es 0. Un perpendicular a $(a,b)$ es $(-b,a)$.', 'يتعامد متجهان إذا وفقط إذا كان جداؤهما السلمي 0. ومتجه عمودي على $(a,b)$ هو $(-b,a)$.', 'Two vectors are perpendicular if and only if their dot product is 0. A vector perpendicular to $(a,b)$ is $(-b,a)$.'),
        figure: (language) => <PerpendicularFigure language={language} />,
        figureAfterSteps: true
    },

    /* ---------- 5. Projections and applications ---------- */
    {
        id: 'projection',
        stage: 'applications',
        title: say('Bektore baten proiekzioa beste baten gainean', 'Proyección de un vector sobre otro', 'إسقاط متجه على آخر', 'Projecting a vector onto another'),
        goal: say('Bektore baten proiekzioa beste baten gainean kalkulatzea: haren luzera zeinuarekin eta proiekzio-bektorea.', 'Calcular la proyección de un vector sobre otro: su longitud con signo y el vector proyección.', 'حساب إسقاط متجه على آخر: طوله بإشارته ومتجه الإسقاط.', 'Work out the projection of a vector onto another: its signed length and the projection vector.'),
        needs: [{ unit: 'dbh4-akademikoak/trigonometria', topic: 'right-ratios', title: { eu: 'Sinua, kosinua eta tangentea', es: 'Seno, coseno y tangente', en: 'Sine, cosine and tangent', ar: 'الجيب وجيب التمام والظل' } }],
        problem: say('Aurkitu $\\vec{u}=(7,1)$ bektorearen proiekzioa $\\vec{v}=(3,4)$ bektorearen gainean: haren luzera eta proiekzio-bektorea.', 'Halla la proyección de $\\vec{u}=(7,1)$ sobre $\\vec{v}=(3,4)$: su longitud y el vector proyección.', 'أوجد إسقاط $\\vec{u}=(7,1)$ على $\\vec{v}=(3,4)$: طوله ومتجه الإسقاط.', 'Find the projection of $\\vec{u}=(7,1)$ onto $\\vec{v}=(3,4)$: its length and the projection vector.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Biderkadura eskalarra eta $\\vec{v}$ bektorearen modulua.', 'Producto escalar y módulo de $\\vec{v}$.', 'الجداء السلمي وطول $\\vec{v}$.', 'Dot product and magnitude of $\\vec{v}$.'), math: same('$\\vec{u}\\cdot\\vec{v}=21+4=25\\qquad |\\vec{v}|=5$') },
            { text: say('Proiekzioaren luzera.', 'Longitud de la proyección.', 'طول الإسقاط.', 'Length of the projection.'), math: same('$\\frac{\\vec{u}\\cdot\\vec{v}}{|\\vec{v}|}=\\frac{25}{5}=5$') },
            { text: say('Proiekzio-bektorea: luzera hori, $\\vec{v}$ bektorearen norabidean.', 'Vector proyección: esa longitud en la dirección de $\\vec{v}$.', 'متجه الإسقاط: ذلك الطول في اتجاه $\\vec{v}$.', 'Projection vector: that length in the direction of $\\vec{v}$.'), math: same('$\\frac{25}{25}(3,4)=(3,4)$') }
        ],
        takeaway: say('$\\vec{u}$ bektorearen proiekzioak $\\vec{v}$ bektorearen gainean $\\frac{\\vec{u}\\cdot\\vec{v}}{|\\vec{v}|}$ neurtzen du (negatiboa, angelua kamutsa bada), eta proiekzio-bektorea $\\frac{\\vec{u}\\cdot\\vec{v}}{|\\vec{v}|^2}\\,\\vec{v}$ da.', 'La proyección de $\\vec{u}$ sobre $\\vec{v}$ mide $\\frac{\\vec{u}\\cdot\\vec{v}}{|\\vec{v}|}$ (negativa si el ángulo es obtuso), y el vector proyección es $\\frac{\\vec{u}\\cdot\\vec{v}}{|\\vec{v}|^2}\\,\\vec{v}$.', 'طول إسقاط $\\vec{u}$ على $\\vec{v}$ هو $\\frac{\\vec{u}\\cdot\\vec{v}}{|\\vec{v}|}$ (سالب إذا كانت الزاوية منفرجة)، ومتجه الإسقاط $\\frac{\\vec{u}\\cdot\\vec{v}}{|\\vec{v}|^2}\\,\\vec{v}$.', 'The projection of $\\vec{u}$ onto $\\vec{v}$ is $\\frac{\\vec{u}\\cdot\\vec{v}}{|\\vec{v}|}$ long (negative if the angle is obtuse), and the projection vector is $\\frac{\\vec{u}\\cdot\\vec{v}}{|\\vec{v}|^2}\\,\\vec{v}$.'),
        figure: (language) => <ProjectionFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'decomposition',
        stage: 'applications',
        title: say('Bektore bat bi zatitan banatzea', 'Descomponer un vector', 'تفكيك متجه', 'Splitting a vector'),
        goal: say('Bektore bat bi zatitan banatzea: bat norabide jakin baten paraleloa eta bestea perpendikularra.', 'Descomponer un vector en una parte paralela y otra perpendicular a una dirección dada.', 'تفكيك متجه إلى جزء موازٍ لاتجاه معلوم وجزء عمودي عليه.', 'Split a vector into a part parallel and a part perpendicular to a given direction.'),
        problem: say('Banatu $\\vec{w}=(1,7)$ bi zatitan: bat $\\vec{v}=(1,1)$ bektorearen paraleloa eta bestea perpendikularra.', 'Descompón $\\vec{w}=(1,7)$ en un vector paralelo a $\\vec{v}=(1,1)$ y otro perpendicular.', 'فكّك $\\vec{w}=(1,7)$ إلى متجه موازٍ لـ $\\vec{v}=(1,1)$ وآخر عمودي عليه.', 'Split $\\vec{w}=(1,7)$ into a vector parallel to $\\vec{v}=(1,1)$ and a perpendicular one.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zati paraleloa proiekzio-bektorea da.', 'La parte paralela es el vector proyección.', 'الجزء الموازي هو متجه الإسقاط.', 'The parallel part is the projection vector.'), math: same('$\\vec{w}_{\\parallel}=\\frac{8}{2}(1,1)=(4,4)$') },
            { text: say('Zati perpendikularra falta dena da.', 'La parte perpendicular es lo que falta.', 'الجزء العمودي هو ما ينقص.', 'The perpendicular part is what is left.'), math: same('$\\vec{w}_{\\perp}=(1,7)-(4,4)=(-3,3)$') },
            { text: say('Egiaztatu perpendikularra dela.', 'Comprueba que es perpendicular.', 'تحقق أنه عمودي.', 'Check that it is perpendicular.'), math: same('$(-3,3)\\cdot(1,1)=-3+3=0$') }
        ],
        takeaway: say('$\\vec{w}=\\vec{w}_{\\parallel}+\\vec{w}_{\\perp}$: zati paraleloa proiekzioa da, eta perpendikularra $\\vec{w}-\\vec{w}_{\\parallel}$; haren biderkadura eskalarra $\\vec{v}$ bektorearekin 0 da.', '$\\vec{w}=\\vec{w}_{\\parallel}+\\vec{w}_{\\perp}$: la parte paralela es la proyección, y la perpendicular es $\\vec{w}-\\vec{w}_{\\parallel}$; su producto escalar con $\\vec{v}$ es 0.', '$\\vec{w}=\\vec{w}_{\\parallel}+\\vec{w}_{\\perp}$: الجزء الموازي هو الإسقاط، والعمودي $\\vec{w}-\\vec{w}_{\\parallel}$؛ وجداؤه السلمي مع $\\vec{v}$ يساوي 0.', '$\\vec{w}=\\vec{w}_{\\parallel}+\\vec{w}_{\\perp}$: the parallel part is the projection, and the perpendicular one is $\\vec{w}-\\vec{w}_{\\parallel}$; its dot product with $\\vec{v}$ is 0.'),
        figure: (language) => <DecompositionFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'forces',
        stage: 'applications',
        title: say('Indarrak eta abiadurak', 'Fuerzas y velocidades', 'القوى والسرعات', 'Forces and velocities'),
        goal: say('Bektoreak eta biderkadura eskalarra fisikan erabiltzea: indarrak eta abiadurak batzea, eta lana kalkulatzea, $W=\\vec{F}\\cdot\\vec{d}$.', 'Usar vectores y el producto escalar en física: sumar fuerzas y velocidades y calcular el trabajo $W=\\vec{F}\\cdot\\vec{d}$.', 'استعمال المتجهات والجداء السلمي في الفيزياء: جمع القوى والسرعات وحساب الشغل $W=\\vec{F}\\cdot\\vec{d}$.', 'Use vectors and the dot product in physics: add forces and velocities and work out the work $W=\\vec{F}\\cdot\\vec{d}$.'),
        problem: say('Txalupa bat ertzarekiko perpendikularki irteten da ($4$ m/s), eta ibaiaren korronteak alde batera eramaten du ($3$ m/s). Zein abiaduratan aurreratzen da benetan, eta zenbat desbideratzen da?', 'Una barca sale perpendicular a la orilla a $4$ m/s y la corriente del río la arrastra a $3$ m/s. ¿A qué velocidad avanza de verdad y cuánto se desvía?', 'يخرج قارب عموديًا على الضفة بسرعة $4$ m/s ويجرّه تيار النهر بسرعة $3$ m/s. بأي سرعة يتقدم فعلًا، وكم ينحرف؟', 'A boat sets off perpendicular to the bank at $4$ m/s and the current of the river drags it at $3$ m/s. How fast does it really move, and how much does it drift?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Batu abiadurak.', 'Suma las velocidades.', 'اجمع السرعتين.', 'Add the velocities.'), math: same('$\\vec{v}=(0,4)+(3,0)=(3,4)$') },
            { text: say('Modulua.', 'El módulo.', 'الطول.', 'The magnitude.'), math: same('$|\\vec{v}|=\\sqrt{3^2+4^2}=5\\ \\text{m/s}$') },
            { text: say('Desbideratzea, perpendikularrarekiko.', 'El desvío respecto de la perpendicular.', 'الانحراف عن العمودي.', 'The drift from the perpendicular.'), math: same('$\\cos\\alpha=\\frac{4}{5}\\ \\to\\ \\alpha\\approx 36{,}87^\\circ$') }
        ],
        takeaway: say('Indarrak eta abiadurak bektore gisa batzen dira. Indar batek desplazamendu batean egiten duen lana biderkadura eskalarra da: $W=\\vec{F}\\cdot\\vec{d}=|\\vec{F}|\\,|\\vec{d}|\\cos\\alpha$.', 'Las fuerzas y las velocidades se suman como vectores. El trabajo de una fuerza en un desplazamiento es el producto escalar $W=\\vec{F}\\cdot\\vec{d}=|\\vec{F}|\\,|\\vec{d}|\\cos\\alpha$.', 'تُجمع القوى والسرعات كمتجهات. وشغل قوة في إزاحة هو الجداء السلمي $W=\\vec{F}\\cdot\\vec{d}=|\\vec{F}|\\,|\\vec{d}|\\cos\\alpha$.', 'Forces and velocities add as vectors. The work of a force over a displacement is the dot product $W=\\vec{F}\\cdot\\vec{d}=|\\vec{F}|\\,|\\vec{d}|\\cos\\alpha$.'),
        figure: (language) => <RiverFigure language={language} />,
        figureAfterSteps: true
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts) */
export const bachVectorsTopics: UnitTopic[] = baseTopics.map((topic) => ({ ...topic, ...bachVectorsLessonTexts[topic.id as BachVectorsTopicId], ...bachVectorsLessonChecks[topic.id as BachVectorsTopicId] }))

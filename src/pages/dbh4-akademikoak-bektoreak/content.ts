import { fraction, type FractionValue } from '../../features/unit-v2/math/fraction.ts'
import type { ChallengeItem, DiagnosticQuestion, ExerciseSection, LocalizedText, PracticeItem } from '../../features/unit-v2/types.ts'
import { same, say } from './text.ts'

/* ==========================================================================
   Bektoreak eta zuzenak · 4. DBH akademikoak — diagnostic, guided
   practice, exercise bank and challenges, after Anaya 4.º Académicas unit
   8 and Santillana 4.º Académicas unit 8 (coordinates and modulus,
   operations, parallel vectors, distances, midpoints and symmetric
   points, aligned points, the equations of a line, slopes, parallel and
   perpendicular lines, intersections, bisectors, circumferences and
   polygons). Every closed answer is a single number: one coordinate, a
   length, a slope, a parameter.
   ========================================================================== */

/** A decimal written with the comma, as an exact fraction */
const v = (text: string): FractionValue => {
    const negative = text.startsWith('-')
    const [whole, decimals = ''] = text.replace('-', '').split(',')
    return fraction((negative ? -1 : 1) * Number(whole + decimals), 10 ** decimals.length)
}
const n = (value: number) => fraction(value)

const HUNDREDTHS = say('Hurbildu ehunenetara.', 'Aproxima a las centésimas.', 'قرّب إلى الأجزاء من مئة.', 'Round to two decimal places.')
/** A prompt followed by an instruction (rounding) */
const with_ = (prompt: LocalizedText, ...rules: LocalizedText[]): LocalizedText => ({
    eu: [prompt.eu, ...rules.map((rule) => rule.eu)].join(' '),
    es: [prompt.es, ...rules.map((rule) => rule.es)].join(' '),
    en: [prompt.en, ...rules.map((rule) => rule.en)].join(' '),
    ar: [prompt.ar, ...rules.map((rule) => rule.ar)].join(' ')
})

export const vectorsDiagnostic: DiagnosticQuestion[] = [
    {
        id: 5601,
        prompt: say('$A(1,2)$ eta $B(4,6)$ badira, $\\overrightarrow{AB}$ hau da:', 'Si $A(1,2)$ y $B(4,6)$, $\\overrightarrow{AB}$ es:', 'إذا كانت $A(1,2)$ و$B(4,6)$ فإن $\\overrightarrow{AB}$ هو:', 'If $A(1,2)$ and $B(4,6)$, then $\\overrightarrow{AB}$ is:'),
        options: [same('$(3,4)$'), same('$(5,8)$'), same('$(-3,-4)$')],
        correctIndex: 0,
        explanation: say('Muturra ken jatorria: $(4-1,6-2)=(3,4)$.', 'Extremo menos origen: $(4-1,6-2)=(3,4)$.', 'الطرف ناقص الأصل: $(4-1,6-2)=(3,4)$.', 'Endpoint minus initial point: $(4-1,6-2)=(3,4)$.'),
        topic: 'vector-coordinates'
    },
    {
        id: 5602,
        prompt: same('$(2,-1)+3\\cdot(1,2)=$'),
        options: [same('$(3,1)$'), same('$(5,5)$'), same('$(9,3)$')],
        correctIndex: 1,
        explanation: say('Lehenik bider 3, gero batu: $(2+3,-1+6)=(5,5)$.', 'Primero por 3 y después suma: $(2+3,-1+6)=(5,5)$.', 'أولًا الضرب في 3 ثم الجمع: $(2+3,-1+6)=(5,5)$.', 'First multiply by 3, then add: $(2+3,-1+6)=(5,5)$.'),
        topic: 'vector-operations'
    },
    {
        id: 5603,
        prompt: say('Zein bektore da $(2,3)$-ren paraleloa?', '¿Qué vector es paralelo a $(2,3)$?', 'أي متجه يوازي $(2,3)$؟', 'Which vector is parallel to $(2,3)$?'),
        options: [same('$(3,2)$'), same('$(3,-2)$'), same('$(-4,-6)$')],
        correctIndex: 2,
        explanation: say('$(-4,-6)$ bektorea $(2,3)$ bider $-2$ da.', '$(-4,-6)$ es $(2,3)$ multiplicado por $-2$.', '$(-4,-6)$ هو $(2,3)$ مضروبًا في $-2$.', '$(-4,-6)$ is $(2,3)$ multiplied by $-2$.'),
        topic: 'parallel-vectors'
    },
    {
        id: 5604,
        prompt: say('$(0,0)$ eta $(6,8)$ puntuen arteko distantzia hau da:', 'La distancia entre $(0,0)$ y $(6,8)$ es:', 'المسافة بين $(0,0)$ و$(6,8)$ هي:', 'The distance between $(0,0)$ and $(6,8)$ is:'),
        options: [same('$14$'), same('$10$'), same('$48$')],
        correctIndex: 1,
        explanation: same('$\\sqrt{6^{2}+8^{2}}=\\sqrt{100}=10$'),
        topic: 'distance'
    },
    {
        id: 5605,
        prompt: say('$A(2,4)$ eta $B(8,0)$ puntuen erdiko puntua hau da:', 'El punto medio de $A(2,4)$ y $B(8,0)$ es:', 'منتصف $A(2,4)$ و$B(8,0)$ هو:', 'The midpoint of $A(2,4)$ and $B(8,0)$ is:'),
        options: [same('$(5,2)$'), same('$(6,-4)$'), same('$(10,4)$')],
        correctIndex: 0,
        explanation: same('$\\left(\\frac{2+8}{2},\\frac{4+0}{2}\\right)=(5,2)$'),
        topic: 'midpoint'
    },
    {
        id: 5606,
        prompt: say('$y=-3x+2$ zuzenaren malda hau da:', 'La pendiente de la recta $y=-3x+2$ es:', 'ميل المستقيم $y=-3x+2$ هو:', 'The slope of the straight line $y=-3x+2$ is:'),
        options: [same('$2$'), same('$3$'), same('$-3$')],
        correctIndex: 2,
        explanation: say('Ekuazio esplizituan, x-ren koefizientea.', 'En la ecuación explícita, el coeficiente de x.', 'في المعادلة الصريحة: معامل x.', 'In the explicit equation, the coefficient of x.'),
        topic: 'slope'
    },
    {
        id: 5607,
        prompt: say('$(1,1)$ eta $(3,5)$ puntuetatik pasatzen den zuzenaren norabide-bektore bat:', 'Un vector director de la recta que pasa por $(1,1)$ y $(3,5)$:', 'متجه توجيه للمستقيم المار بـ $(1,1)$ و$(3,5)$:', 'A direction vector of the straight line through $(1,1)$ and $(3,5)$:'),
        options: [same('$(4,6)$'), same('$(2,4)$'), same('$(1,1)$')],
        correctIndex: 1,
        explanation: same('$(3-1,5-1)=(2,4)$'),
        topic: 'parametric'
    },
    {
        id: 5608,
        prompt: say('$y=2x$ zuzenaren perpendikular baten malda hau da:', 'Una recta perpendicular a $y=2x$ tiene pendiente:', 'ميل مستقيم عمودي على $y=2x$ هو:', 'A straight line perpendicular to $y=2x$ has slope:'),
        options: [same('$2$'), same('$-2$'), same('$-\\frac{1}{2}$')],
        correctIndex: 2,
        explanation: same('$2\\cdot\\left(-\\frac{1}{2}\\right)=-1$'),
        topic: 'parallel-perpendicular'
    }
]

export const vectorsPractice: PracticeItem[] = [
    /* ---------- Vectors ---------- */
    {
        id: 1, stage: 'vectors',
        prompt: say('$A(3,-2)$ eta $B(7,1)$ emanda, kalkulatu $\\overrightarrow{AB}$-ren modulua.', 'Dados $A(3,-2)$ y $B(7,1)$, calcula el módulo de $\\overrightarrow{AB}$.', 'إذا كانت $A(3,-2)$ و$B(7,1)$، فاحسب طول $\\overrightarrow{AB}$.', 'Given $A(3,-2)$ and $B(7,1)$, calculate the magnitude of $\\overrightarrow{AB}$.'),
        expected: n(5),
        hint: say('Koordenatuak: muturra ken jatorria; gero, Pitagoras.', 'Coordenadas: extremo menos origen; después, Pitágoras.', 'المركّبتان: الطرف ناقص الأصل؛ ثم فيثاغورس.', 'Coordinates: endpoint minus initial point; then, Pythagoras\' theorem.'),
        explanation: same('$\\overrightarrow{AB}=(7-3,1-(-2))=(4,3)\\qquad |\\overrightarrow{AB}|=\\sqrt{4^{2}+3^{2}}=5$')
    },
    {
        id: 2, stage: 'vectors',
        prompt: say('$\\vec{u}=(2,-3)$ eta $\\vec{v}=(-1,4)$ badira, zein da $3\\vec{u}+2\\vec{v}$-ren bigarren koordenatua?', 'Si $\\vec{u}=(2,-3)$ y $\\vec{v}=(-1,4)$, ¿cuál es la segunda coordenada de $3\\vec{u}+2\\vec{v}$?', 'إذا كان $\\vec{u}=(2,-3)$ و$\\vec{v}=(-1,4)$، فما المركّبة الثانية لـ $3\\vec{u}+2\\vec{v}$؟', 'If $\\vec{u}=(2,-3)$ and $\\vec{v}=(-1,4)$, what is the second coordinate of $3\\vec{u}+2\\vec{v}$?'),
        expected: n(-1),
        hint: say('Biderkatu lehenik, eta gero batu koordenatuz koordenatu.', 'Multiplica primero y después suma coordenada a coordenada.', 'اضرب أولًا ثم اجمع مركّبةً مركّبة.', 'Multiply first, then add coordinate by coordinate.'),
        explanation: same('$3\\vec{u}=(6,-9)\\qquad 2\\vec{v}=(-2,8)\\qquad (6-2,-9+8)=(4,-1)$')
    },
    {
        id: 3, stage: 'vectors',
        prompt: say('Kalkulatu k, $(k,6)$ bektorea $(2,3)$-ren paraleloa izan dadin.', 'Halla k para que $(k,6)$ sea paralelo a $(2,3)$.', 'أوجد k ليكون $(k,6)$ موازيًا لـ $(2,3)$.', 'Find k so that $(k,6)$ is parallel to $(2,3)$.'),
        expected: n(4),
        hint: say('Biderkadura gurutzatuak berdinak: $a\\cdot d=b\\cdot c$.', 'Productos cruzados iguales: $a\\cdot d=b\\cdot c$.', 'الضربان التبادليان متساويان: $a\\cdot d=b\\cdot c$.', 'Equal cross products: $a\\cdot d=b\\cdot c$.'),
        explanation: same('$k\\cdot 3=6\\cdot 2\\ \\to\\ k=4$')
    },
    {
        id: 4, stage: 'vectors',
        prompt: say('$\\vec{u}$ bektorearen jatorria $A(-2,5)$ da eta $\\vec{u}=(6,-2)$. Zein da haren muturraren abzisa?', 'Un vector $\\vec{u}=(6,-2)$ tiene su origen en $A(-2,5)$. ¿Cuál es la abscisa de su extremo?', 'متجه $\\vec{u}=(6,-2)$ أصله $A(-2,5)$. ما الإحداثي السيني لطرفه؟', 'A vector $\\vec{u}=(6,-2)$ has its initial point at $A(-2,5)$. What is the x-coordinate of its endpoint?'),
        expected: n(4),
        hint: say('Muturra = jatorria + bektorea.', 'Extremo = origen + vector.', 'الطرف = الأصل + المتجه.', 'Endpoint = initial point + vector.'),
        explanation: same('$B=(-2+6,5-2)=(4,3)$')
    },
    /* ---------- Points and distances ---------- */
    {
        id: 5, stage: 'points',
        prompt: say('Kalkulatu $A(-3,2)$ eta $B(5,8)$ puntuen arteko distantzia.', 'Calcula la distancia entre $A(-3,2)$ y $B(5,8)$.', 'احسب المسافة بين $A(-3,2)$ و$B(5,8)$.', 'Calculate the distance between $A(-3,2)$ and $B(5,8)$.'),
        expected: n(10),
        hint: say('Abzisen kendura 8 da eta ordenatuena 6.', 'La diferencia de abscisas es 8 y la de ordenadas 6.', 'فرق السينات 8 وفرق الصادات 6.', 'The difference in x-coordinates is 8 and the difference in y-coordinates is 6.'),
        explanation: same('$\\sqrt{8^{2}+6^{2}}=\\sqrt{100}=10$')
    },
    {
        id: 6, stage: 'points',
        prompt: say('Kalkulatu $A(-4,7)$ eta $B(6,-3)$ puntuen erdiko puntuaren ordenatua.', 'Halla la ordenada del punto medio de $A(-4,7)$ y $B(6,-3)$.', 'أوجد الإحداثي الصادي لمنتصف $A(-4,7)$ و$B(6,-3)$.', 'Find the y-coordinate of the midpoint of $A(-4,7)$ and $B(6,-3)$.'),
        expected: n(2),
        hint: say('Ordenatuen batez bestekoa.', 'La media de las ordenadas.', 'متوسط الإحداثيين الصاديين.', 'The mean of the y-coordinates.'),
        explanation: same('$M=\\left(\\frac{-4+6}{2},\\frac{7+(-3)}{2}\\right)=(1,2)$')
    },
    {
        id: 7, stage: 'points',
        prompt: say('AB-ren erdiko puntua $M(3,1)$ da eta $A(-1,4)$. Zein da B-ren ordenatua?', 'El punto medio de AB es $M(3,1)$ y $A(-1,4)$. ¿Cuál es la ordenada de B?', 'منتصف AB هو $M(3,1)$ و$A(-1,4)$. ما الإحداثي الصادي لـ B؟', 'The midpoint of AB is $M(3,1)$ and $A(-1,4)$. What is the y-coordinate of B?'),
        expected: n(-2),
        hint: same('$B=2M-A$'),
        explanation: same('$B=(2\\cdot 3-(-1),2\\cdot 1-4)=(7,-2)$')
    },
    {
        id: 8, stage: 'points',
        prompt: say('Kalkulatu k, $A(0,1)$, $B(2,5)$ eta $C(4,k)$ lerrokatuta egon daitezen.', 'Halla k para que $A(0,1)$, $B(2,5)$ y $C(4,k)$ estén alineados.', 'أوجد k لتكون $A(0,1)$ و$B(2,5)$ و$C(4,k)$ على استقامة واحدة.', 'Find k so that $A(0,1)$, $B(2,5)$ and $C(4,k)$ are collinear.'),
        expected: n(9),
        hint: say('$\\overrightarrow{AB}=(2,4)$ eta $\\overrightarrow{AC}=(4,k-1)$ proportzionalak.', '$\\overrightarrow{AB}=(2,4)$ y $\\overrightarrow{AC}=(4,k-1)$, proporcionales.', '$\\overrightarrow{AB}=(2,4)$ و$\\overrightarrow{AC}=(4,k-1)$ متناسبان.', '$\\overrightarrow{AB}=(2,4)$ and $\\overrightarrow{AC}=(4,k-1)$ are proportional.'),
        explanation: same('$\\frac{4}{2}=\\frac{k-1}{4}\\ \\to\\ k-1=8\\ \\to\\ k=9$')
    },
    /* ---------- Equations of a line ---------- */
    {
        id: 9, stage: 'equations',
        prompt: say('$x=2-t$, $y=5+3t$ zuzena $(-1,k)$ puntutik pasatzen da. Kalkulatu k.', 'La recta $x=2-t$, $y=5+3t$ pasa por el punto $(-1,k)$. Halla k.', 'المستقيم $x=2-t$، $y=5+3t$ يمر بالنقطة $(-1,k)$. أوجد k.', 'The straight line $x=2-t$, $y=5+3t$ passes through the point $(-1,k)$. Find k.'),
        expected: n(14),
        hint: say('Lehen ekuaziotik t; gero, bigarrenean.', 'De la primera ecuación, t; después, en la segunda.', 'من المعادلة الأولى t؛ ثم في الثانية.', 'From the first equation, find t; then use the second one.'),
        explanation: same('$-1=2-t\\ \\to\\ t=3\\qquad y=5+3\\cdot 3=14$')
    },
    {
        id: 10, stage: 'equations',
        prompt: say('Kalkulatu $\\frac{x-1}{4}=\\frac{y+2}{-6}$ zuzenaren malda.', 'Halla la pendiente de la recta $\\frac{x-1}{4}=\\frac{y+2}{-6}$.', 'أوجد ميل المستقيم $\\frac{x-1}{4}=\\frac{y+2}{-6}$.', 'Find the slope of the straight line $\\frac{x-1}{4}=\\frac{y+2}{-6}$.'),
        expected: v('-1,5'),
        hint: say('Norabide-bektorea $(4,-6)$ da: $m=\\frac{d_2}{d_1}$.', 'El vector director es $(4,-6)$: $m=\\frac{d_2}{d_1}$.', 'متجه التوجيه $(4,-6)$: $m=\\frac{d_2}{d_1}$.', 'The direction vector is $(4,-6)$: $m=\\frac{d_2}{d_1}$.'),
        explanation: same('$m=\\frac{-6}{4}=-1{,}5$')
    },
    {
        id: 11, stage: 'equations',
        prompt: say('Zein da $3x+2y-8=0$ zuzenaren jatorriko ordenatua?', '¿Cuál es la ordenada en el origen de la recta $3x+2y-8=0$?', 'ما المقطع الصادي للمستقيم $3x+2y-8=0$؟', 'What is the y-intercept of the straight line $3x+2y-8=0$?'),
        expected: n(4),
        hint: say('Askatu y: $y=mx+n$.', 'Despeja y: $y=mx+n$.', 'اعزل y: $y=mx+n$.', 'Solve for y: $y=mx+n$.'),
        explanation: same('$2y=-3x+8\\ \\to\\ y=-\\frac{3}{2}x+4$')
    },
    {
        id: 12, stage: 'equations',
        prompt: say('$2x-5y+10=0$ zuzenak X ardatza zein puntutan ebakitzen du? Eman abzisa.', '¿En qué punto corta al eje X la recta $2x-5y+10=0$? Da su abscisa.', 'في أي نقطة يقطع المستقيم $2x-5y+10=0$ محور X؟ أعطِ إحداثيها السيني.', 'At what point does the straight line $2x-5y+10=0$ cut the x-axis? Give its x-coordinate.'),
        expected: n(-5),
        hint: say('X ardatzean y = 0.', 'En el eje X, y = 0.', 'على محور X يكون y = 0.', 'On the x-axis, y = 0.'),
        explanation: same('$2x+10=0\\ \\to\\ x=-5$')
    },
    /* ---------- Slope and relative positions ---------- */
    {
        id: 13, stage: 'positions',
        prompt: say('Kalkulatu $A(2,-1)$ eta $B(6,7)$ puntuetatik pasatzen den zuzenaren malda.', 'Halla la pendiente de la recta que pasa por $A(2,-1)$ y $B(6,7)$.', 'أوجد ميل المستقيم المار بـ $A(2,-1)$ و$B(6,7)$.', 'Find the slope of the straight line that passes through $A(2,-1)$ and $B(6,7)$.'),
        expected: n(2),
        hint: say('Ordenatuen kendura zati abzisen kendura.', 'Diferencia de ordenadas entre diferencia de abscisas.', 'فرق الصادات على فرق السينات.', 'Difference in y-coordinates divided by difference in x-coordinates.'),
        explanation: same('$m=\\frac{7-(-1)}{6-2}=\\frac{8}{4}=2$')
    },
    {
        id: 14, stage: 'positions',
        prompt: say('Zein da $y=\\frac{2}{5}x-1$ zuzenaren perpendikular baten malda?', '¿Qué pendiente tiene una recta perpendicular a $y=\\frac{2}{5}x-1$?', 'ما ميل مستقيم عمودي على $y=\\frac{2}{5}x-1$؟', 'What slope does a straight line perpendicular to $y=\\frac{2}{5}x-1$ have?'),
        expected: v('-2,5'),
        hint: say('Alderantzizkoa, zeinua aldatuta.', 'La inversa, cambiada de signo.', 'المقلوب مع تغيير الإشارة.', 'The reciprocal, with its sign changed.'),
        explanation: same('$m\'=-\\frac{5}{2}=-2{,}5$')
    },
    {
        id: 15, stage: 'positions',
        prompt: say('$P(1,3)$ puntutik pasatzen den $y=4x+1$-en paraleloak Y ardatza $(0,n)$ puntuan ebakitzen du. Kalkulatu n.', 'La paralela a $y=4x+1$ que pasa por $P(1,3)$ corta al eje Y en $(0,n)$. Halla n.', 'الموازي لـ $y=4x+1$ المار بـ $P(1,3)$ يقطع محور Y في $(0,n)$. أوجد n.', 'The straight line parallel to $y=4x+1$ that passes through $P(1,3)$ cuts the y-axis at $(0,n)$. Find n.'),
        expected: n(-1),
        hint: say('Malda bera, 4, eta puntu-malda ekuazioa.', 'La misma pendiente, 4, y la ecuación punto-pendiente.', 'الميل نفسه 4 ومعادلة النقطة والميل.', 'The same slope, 4, and the point-slope equation.'),
        explanation: same('$y-3=4\\,(x-1)\\ \\to\\ y=4x-1$')
    },
    {
        id: 16, stage: 'positions',
        prompt: say('Kalkulatu $y=2x-1$ eta $y=-x+5$ zuzenen ebaki-puntuaren abzisa.', 'Halla la abscisa del punto de corte de $y=2x-1$ e $y=-x+5$.', 'أوجد الإحداثي السيني لنقطة تقاطع $y=2x-1$ و$y=-x+5$.', 'Find the x-coordinate of the point where $y=2x-1$ and $y=-x+5$ intersect.'),
        expected: n(2),
        hint: say('Berdindu bi y-ak.', 'Iguala las dos y.', 'ساوِ بين قيمتي y.', 'Set the two y-values equal.'),
        explanation: same('$2x-1=-x+5\\ \\to\\ 3x=6\\ \\to\\ x=2$')
    },
    /* ---------- Applications ---------- */
    {
        id: 17, stage: 'applications',
        prompt: say('$A(0,0)$ eta $B(4,2)$ muturreko zuzenkiaren erdibitzaileak Y ardatza $(0,n)$ puntuan ebakitzen du. Kalkulatu n.', 'La mediatriz del segmento de extremos $A(0,0)$ y $B(4,2)$ corta al eje Y en $(0,n)$. Halla n.', 'محور القطعة التي طرفاها $A(0,0)$ و$B(4,2)$ يقطع محور Y في $(0,n)$. أوجد n.', 'The perpendicular bisector of the segment with endpoints $A(0,0)$ and $B(4,2)$ cuts the y-axis at $(0,n)$. Find n.'),
        expected: n(5),
        hint: say('Erdiko puntua $(2,1)$ da eta AB-ren malda $\\frac{1}{2}$.', 'El punto medio es $(2,1)$ y la pendiente de AB, $\\frac{1}{2}$.', 'المنتصف $(2,1)$ وميل AB هو $\\frac{1}{2}$.', 'The midpoint is $(2,1)$ and the slope of AB is $\\frac{1}{2}$.'),
        explanation: same('$M=(2,1)\\qquad y-1=-2\\,(x-2)\\ \\to\\ y=-2x+5$')
    },
    {
        id: 18, stage: 'applications',
        prompt: say('Zein da $(x+1)^{2}+(y-3)^{2}=49$ zirkunferentziaren erradioa?', '¿Cuál es el radio de la circunferencia $(x+1)^{2}+(y-3)^{2}=49$?', 'ما نصف قطر الدائرة $(x+1)^{2}+(y-3)^{2}=49$؟', 'What is the radius of the circumference $(x+1)^{2}+(y-3)^{2}=49$?'),
        expected: n(7),
        hint: say('Eskuineko atala $r^{2}$ da.', 'El segundo miembro es $r^{2}$.', 'الطرف الثاني هو $r^{2}$.', 'The right-hand side is $r^{2}$.'),
        explanation: same('$r=\\sqrt{49}=7$')
    },
    {
        id: 19, stage: 'applications',
        prompt: say('Zirkunferentzia baten zentroa $C(1,2)$ da eta $P(4,6)$ puntutik pasatzen da. Kalkulatu erradioa.', 'Una circunferencia tiene centro $C(1,2)$ y pasa por $P(4,6)$. Halla su radio.', 'دائرة مركزها $C(1,2)$ وتمر بـ $P(4,6)$. أوجد نصف قطرها.', 'A circumference has its centre at $C(1,2)$ and passes through $P(4,6)$. Find its radius.'),
        expected: n(5),
        hint: say('Erradioa = zentrotik puntura dagoen distantzia.', 'Radio = distancia del centro al punto.', 'نصف القطر = المسافة من المركز إلى النقطة.', 'Radius = distance from the centre to the point.'),
        explanation: same('$r=\\sqrt{3^{2}+4^{2}}=5$')
    },
    {
        id: 20, stage: 'applications',
        prompt: say('$A(1,0)$, $B(4,1)$ eta $C(5,4)$ ABCD paralelogramoaren hiru erpin jarraitu dira. Kalkulatu D-ren ordenatua.', '$A(1,0)$, $B(4,1)$ y $C(5,4)$ son tres vértices consecutivos del paralelogramo ABCD. Halla la ordenada de D.', '$A(1,0)$ و$B(4,1)$ و$C(5,4)$ ثلاثة رؤوس متتالية لمتوازي الأضلاع ABCD. أوجد الإحداثي الصادي لـ D.', '$A(1,0)$, $B(4,1)$ and $C(5,4)$ are three consecutive vertices of the parallelogram ABCD. Find the y-coordinate of D.'),
        expected: n(3),
        hint: same('$D=A+C-B$'),
        explanation: same('$D=(1+5-4,0+4-1)=(2,3)$')
    }
]

export const vectorsChallenges: ChallengeItem[] = [
    /* ---------- Vectors ---------- */
    {
        id: 101, stage: 'vectors', points: 10, context: 'starter',
        prompt: say('Itsasontzi bat $P(2,1)$ portutik abiatzen da eta $(6,8)$ bektorea jarraitzen du (km-tan). Zenbat km egiten ditu?', 'Un barco sale del puerto $P(2,1)$ y sigue el vector $(6,8)$ (en km). ¿Cuántos km recorre?', 'تنطلق سفينة من الميناء $P(2,1)$ وتتبع المتجه $(6,8)$ (بالكيلومترات). كم كيلومترًا تقطع؟', 'A boat leaves port at $P(2,1)$ and follows the vector $(6,8)$ (in km). How many km does it travel?'),
        expected: n(10),
        hint: say('Bidea bektorearen modulua da.', 'El recorrido es el módulo del vector.', 'المسافة المقطوعة هي طول المتجه.', 'The distance travelled is the magnitude of the vector.'),
        explanation: same('$\\sqrt{6^{2}+8^{2}}=\\sqrt{100}=10$')
    },
    {
        id: 102, stage: 'vectors', points: 20, context: 'advanced',
        prompt: say('Kalkulatu k > 0, $(k,12)$ bektorearen modulua 13 izan dadin.', 'Halla k > 0 para que el vector $(k,12)$ tenga módulo 13.', 'أوجد k > 0 ليكون طول المتجه $(k,12)$ يساوي 13.', 'Find k > 0 so that the vector $(k,12)$ has magnitude 13.'),
        expected: n(5),
        hint: same('$k^{2}+12^{2}=13^{2}$'),
        explanation: same('$k=\\sqrt{13^{2}-12^{2}}=\\sqrt{25}=5$')
    },
    {
        id: 103, stage: 'vectors', points: 30, context: 'master',
        prompt: say('$\\vec{u}=(1,2)$ eta $\\vec{v}=(3,-1)$ badira, kalkulatu a, $a\\vec{u}+\\vec{v}$ bektorea $(1,1)$-en paraleloa izan dadin.', 'Si $\\vec{u}=(1,2)$ y $\\vec{v}=(3,-1)$, halla a para que $a\\vec{u}+\\vec{v}$ sea paralelo a $(1,1)$.', 'إذا كان $\\vec{u}=(1,2)$ و$\\vec{v}=(3,-1)$، فأوجد a ليكون $a\\vec{u}+\\vec{v}$ موازيًا لـ $(1,1)$.', 'If $\\vec{u}=(1,2)$ and $\\vec{v}=(3,-1)$, find a so that $a\\vec{u}+\\vec{v}$ is parallel to $(1,1)$.'),
        expected: n(4),
        hint: say('$(1,1)$-en paraleloak bi koordenatu berdinak ditu.', 'Un paralelo a $(1,1)$ tiene sus dos coordenadas iguales.', 'الموازي لـ $(1,1)$ مركّبتاه متساويتان.', 'A vector parallel to $(1,1)$ has both coordinates equal.'),
        explanation: same('$a\\vec{u}+\\vec{v}=(a+3,2a-1)\\qquad a+3=2a-1\\ \\to\\ a=4$')
    },
    /* ---------- Points and distances ---------- */
    {
        id: 104, stage: 'points', points: 10, context: 'starter',
        prompt: say('Mapa koadrikulatu batean (km-tan) bi hiri $A(-3,4)$ eta $B(9,-1)$ puntuetan daude. Zer distantziatara daude?', 'En un mapa cuadriculado en km, dos ciudades están en $A(-3,4)$ y $B(9,-1)$. ¿A qué distancia están?', 'على خريطة مربّعات بالكيلومترات تقع مدينتان في $A(-3,4)$ و$B(9,-1)$. ما المسافة بينهما؟', 'On a grid map measured in km, two cities are at $A(-3,4)$ and $B(9,-1)$. How far apart are they?'),
        expected: n(13),
        hint: say('Kendurak 12 eta −5 dira.', 'Las diferencias son 12 y −5.', 'الفرقان 12 و−5.', 'The differences are 12 and −5.'),
        explanation: same('$\\sqrt{12^{2}+(-5)^{2}}=\\sqrt{169}=13$')
    },
    {
        id: 105, stage: 'points', points: 20, context: 'advanced',
        prompt: say('P puntua X ardatzean dago eta $A(1,3)$ eta $B(5,1)$ puntuetatik distantzia berera. Kalkulatu haren abzisa.', 'Un punto P está en el eje X y a la misma distancia de $A(1,3)$ y de $B(5,1)$. Halla su abscisa.', 'نقطة P على محور X وعلى المسافة نفسها من $A(1,3)$ و$B(5,1)$. أوجد إحداثيها السيني.', 'A point P is on the x-axis and the same distance from $A(1,3)$ and $B(5,1)$. Find its x-coordinate.'),
        expected: n(2),
        hint: say('$P(x,0)$: berdindu distantzien karratuak.', '$P(x,0)$: iguala los cuadrados de las distancias.', '$P(x,0)$: ساوِ بين مربعي المسافتين.', '$P(x,0)$: set the squares of the distances equal.'),
        explanation: same('$(x-1)^{2}+9=(x-5)^{2}+1\\ \\to\\ 8x=16\\ \\to\\ x=2$')
    },
    {
        id: 106, stage: 'points', points: 30, context: 'master',
        prompt: say('$A(1,1)$ eta $B(10,7)$ muturreko zuzenkia hiru zati berdinetan banatzen da. Kalkulatu A-tik hurbilen dagoen banaketa-puntuaren ordenatua.', 'El segmento de extremos $A(1,1)$ y $B(10,7)$ se divide en tres partes iguales. Halla la ordenada del punto de división más cercano a A.', 'تُقسم القطعة التي طرفاها $A(1,1)$ و$B(10,7)$ إلى ثلاثة أجزاء متساوية. أوجد الإحداثي الصادي لنقطة التقسيم الأقرب إلى A.', 'The segment with endpoints $A(1,1)$ and $B(10,7)$ is divided into three equal parts. Find the y-coordinate of the division point closest to A.'),
        expected: n(3),
        hint: same('$A+\\frac{1}{3}\\overrightarrow{AB}$'),
        explanation: same('$\\overrightarrow{AB}=(9,6)\\qquad A+\\frac{1}{3}\\overrightarrow{AB}=(1+3,1+2)=(4,3)$')
    },
    /* ---------- Equations of a line ---------- */
    {
        id: 107, stage: 'equations', points: 10, context: 'starter',
        prompt: say('Mugikor bat $x=1+2t$, $y=3-t$ ekuazioen arabera mugitzen da (t segundotan). Zein da haren abzisa 5 s-ra?', 'Un móvil se mueve según $x=1+2t$, $y=3-t$ (t en segundos). ¿Cuál es su abscisa a los 5 s?', 'يتحرك جسم وفق $x=1+2t$، $y=3-t$ (t بالثواني). ما إحداثيه السيني بعد 5 ث؟', 'A moving object travels according to $x=1+2t$, $y=3-t$ (t in seconds). What is its x-coordinate at 5 s?'),
        expected: n(11),
        hint: say('Ordeztu t = 5.', 'Sustituye t = 5.', 'عوّض t = 5.', 'Substitute t = 5.'),
        explanation: same('$x=1+2\\cdot 5=11$')
    },
    {
        id: 108, stage: 'equations', points: 20, context: 'advanced',
        prompt: say('$A(2,3)$ eta $B(5,9)$ puntuetatik pasatzen den zuzenak Y ardatza $(0,n)$ puntuan ebakitzen du. Kalkulatu n.', 'La recta que pasa por $A(2,3)$ y $B(5,9)$ corta al eje Y en $(0,n)$. Halla n.', 'المستقيم المار بـ $A(2,3)$ و$B(5,9)$ يقطع محور Y في $(0,n)$. أوجد n.', 'The straight line through $A(2,3)$ and $B(5,9)$ cuts the y-axis at $(0,n)$. Find n.'),
        expected: n(-1),
        hint: say('Malda eta puntu-malda ekuazioa.', 'La pendiente y la ecuación punto-pendiente.', 'الميل ومعادلة النقطة والميل.', 'The slope and the point-slope equation.'),
        explanation: same('$m=\\frac{9-3}{5-2}=2\\qquad y-3=2\\,(x-2)\\ \\to\\ y=2x-1$')
    },
    {
        id: 109, stage: 'equations', points: 30, context: 'master',
        prompt: say('$kx+3y-6=0$ zuzena $(4,-2)$ puntutik pasatzen da. Kalkulatu k.', 'La recta $kx+3y-6=0$ pasa por el punto $(4,-2)$. Halla k.', 'المستقيم $kx+3y-6=0$ يمر بالنقطة $(4,-2)$. أوجد k.', 'The straight line $kx+3y-6=0$ passes through the point $(4,-2)$. Find k.'),
        expected: n(3),
        hint: say('Puntuak ekuazioa bete behar du.', 'El punto tiene que cumplir la ecuación.', 'يجب أن تحقق النقطة المعادلة.', 'The point must satisfy the equation.'),
        explanation: same('$4k+3\\cdot(-2)-6=0\\ \\to\\ 4k=12\\ \\to\\ k=3$')
    },
    /* ---------- Slope and relative positions ---------- */
    {
        id: 110, stage: 'positions', points: 10, context: 'starter',
        prompt: say('Kalkulatu $(-2,1)$ eta $(2,9)$ puntuetatik pasatzen den zuzenaren malda.', 'Halla la pendiente de la recta que pasa por $(-2,1)$ y $(2,9)$.', 'أوجد ميل المستقيم المار بـ $(-2,1)$ و$(2,9)$.', 'Find the slope of the straight line that passes through $(-2,1)$ and $(2,9)$.'),
        expected: n(2),
        hint: say('Igoera zati aurrerapena.', 'Lo que sube entre lo que avanza.', 'الصعود على التقدّم.', 'Rise over run.'),
        explanation: same('$\\frac{9-1}{2-(-2)}=\\frac{8}{4}=2$')
    },
    {
        id: 111, stage: 'positions', points: 20, context: 'advanced',
        prompt: say('Kalkulatu a, $ax+2y=1$ eta $3x-y=4$ zuzenak paraleloak izan daitezen.', 'Halla a para que las rectas $ax+2y=1$ y $3x-y=4$ sean paralelas.', 'أوجد a ليكون المستقيمان $ax+2y=1$ و$3x-y=4$ متوازيين.', 'Find a so that the straight lines $ax+2y=1$ and $3x-y=4$ are parallel.'),
        expected: n(-6),
        hint: same('$\\frac{A}{A\'}=\\frac{B}{B\'}$'),
        explanation: same('$\\frac{a}{3}=\\frac{2}{-1}\\ \\to\\ a=-6$')
    },
    {
        id: 112, stage: 'positions', points: 30, context: 'master',
        prompt: say('Kalkulatu k, $y=kx+1$ eta $y=\\frac{3}{4}x-2$ zuzenak perpendikularrak izan daitezen.', 'Halla k para que las rectas $y=kx+1$ e $y=\\frac{3}{4}x-2$ sean perpendiculares.', 'أوجد k ليكون المستقيمان $y=kx+1$ و$y=\\frac{3}{4}x-2$ متعامدين.', 'Find k so that the straight lines $y=kx+1$ and $y=\\frac{3}{4}x-2$ are perpendicular.'),
        expected: fraction(-4, 3),
        hint: same('$m\\cdot m\'=-1$'),
        explanation: same('$k\\cdot\\frac{3}{4}=-1\\ \\to\\ k=-\\frac{4}{3}$')
    },
    /* ---------- Applications ---------- */
    {
        id: 113, stage: 'applications', points: 10, context: 'starter',
        prompt: say('Zein da $x^{2}+y^{2}=36$ zirkunferentziaren erradioa?', '¿Cuál es el radio de la circunferencia $x^{2}+y^{2}=36$?', 'ما نصف قطر الدائرة $x^{2}+y^{2}=36$؟', 'What is the radius of the circumference $x^{2}+y^{2}=36$?'),
        expected: n(6),
        hint: say('Zentroa jatorria da eta eskuinean $r^{2}$.', 'El centro es el origen y a la derecha está $r^{2}$.', 'المركز هو الأصل وفي الطرف الأيمن $r^{2}$.', 'The centre is the origin, and the right-hand side is $r^{2}$.'),
        explanation: same('$r=\\sqrt{36}=6$')
    },
    {
        id: 114, stage: 'applications', points: 20, context: 'advanced',
        prompt: say('Diametro baten muturrak $A(-1,2)$ eta $B(7,8)$ dira. Kalkulatu erradioa.', 'Los extremos de un diámetro son $A(-1,2)$ y $B(7,8)$. Halla el radio.', 'طرفا قطر هما $A(-1,2)$ و$B(7,8)$. أوجد نصف القطر.', 'The endpoints of a diameter are $A(-1,2)$ and $B(7,8)$. Find the radius.'),
        expected: n(5),
        hint: say('Erradioa diametroaren erdia da.', 'El radio es la mitad del diámetro.', 'نصف القطر نصف القطر الكامل.', 'The radius is half the diameter.'),
        explanation: same('$d(A,B)=\\sqrt{8^{2}+6^{2}}=10\\qquad r=\\frac{10}{2}=5$')
    },
    {
        id: 115, stage: 'applications', points: 30, context: 'master',
        prompt: say('Kalkulatu $A(1,1)$, $B(7,1)$ eta $C(3,5)$ erpineko triangeluaren azalera.', 'Halla el área del triángulo de vértices $A(1,1)$, $B(7,1)$ y $C(3,5)$.', 'أوجد مساحة المثلث الذي رؤوسه $A(1,1)$ و$B(7,1)$ و$C(3,5)$.', 'Find the area of the triangle with vertices $A(1,1)$, $B(7,1)$ and $C(3,5)$.'),
        expected: n(12),
        hint: say('AB horizontala da: oinarria 6; altuera, C-ren ordenatuen kendura.', 'AB es horizontal: base 6; la altura, la diferencia de ordenadas de C.', 'AB أفقي: القاعدة 6؛ والارتفاع فرق الصادات لـ C.', 'AB is horizontal: base 6; the height is the difference in y-coordinates of C.'),
        explanation: same('$\\frac{6\\cdot 4}{2}=12$')
    }
]

export const vectorsExerciseBank: ExerciseSection[] = [
    {
        id: 'vectors',
        title: say('Bektoreak', 'Vectores', 'المتجهات', 'Vectors'),
        items: [
            { id: 1, difficulty: 'easy', question: say('$A(2,1)$ eta $B(5,-3)$ emanda, zein da $\\overrightarrow{AB}$-ren lehen koordenatua?', 'Dados $A(2,1)$ y $B(5,-3)$, ¿cuál es la primera coordenada de $\\overrightarrow{AB}$?', 'إذا كانت $A(2,1)$ و$B(5,-3)$ فما المركّبة الأولى لـ $\\overrightarrow{AB}$؟', 'Given $A(2,1)$ and $B(5,-3)$, what is the first coordinate of $\\overrightarrow{AB}$?'), solution: same('$\\overrightarrow{AB}=(5-2,-3-1)=(3,-4)$'), answer: { expected: n(3) } },
            { id: 2, difficulty: 'easy', question: say('Kalkulatu $(5,-12)$ bektorearen modulua.', 'Calcula el módulo del vector $(5,-12)$.', 'احسب طول المتجه $(5,-12)$.', 'Calculate the magnitude of the vector $(5,-12)$.'), solution: same('$\\sqrt{5^{2}+(-12)^{2}}=\\sqrt{169}=13$'), answer: { expected: n(13) } },
            { id: 3, difficulty: 'easy', question: say('Zein da $(4,-1)+(-6,3)$-ren bigarren koordenatua?', '¿Cuál es la segunda coordenada de $(4,-1)+(-6,3)$?', 'ما المركّبة الثانية لـ $(4,-1)+(-6,3)$؟', 'What is the second coordinate of $(4,-1)+(-6,3)$?'), solution: same('$(4-6,-1+3)=(-2,2)$'), answer: { expected: n(2) } },
            { id: 4, difficulty: 'medium', question: say('Zein da $-2\\cdot(3,-5)$-en lehen koordenatua?', '¿Cuál es la primera coordenada de $-2\\cdot(3,-5)$?', 'ما المركّبة الأولى لـ $-2\\cdot(3,-5)$؟', 'What is the first coordinate of $-2\\cdot(3,-5)$?'), solution: same('$-2\\cdot(3,-5)=(-6,10)$'), answer: { expected: n(-6) } },
            { id: 5, difficulty: 'medium', question: say('Kalkulatu k, $(k,-2)$ eta $(6,3)$ paraleloak izan daitezen.', 'Halla k para que $(k,-2)$ y $(6,3)$ sean paralelos.', 'أوجد k ليكون $(k,-2)$ و$(6,3)$ متوازيين.', 'Find k so that $(k,-2)$ and $(6,3)$ are parallel.'), solution: same('$3k=-2\\cdot 6\\ \\to\\ k=-4$'), answer: { expected: n(-4) } },
            { id: 6, difficulty: 'medium', question: say('$(5,2)$-ren bektore perpendikular baten lehen koordenatua 2 da. Zein da bigarrena?', 'Un vector perpendicular a $(5,2)$ tiene primera coordenada 2. ¿Cuál es la segunda?', 'متجه عمودي على $(5,2)$ مركّبته الأولى 2. ما الثانية؟', 'A vector perpendicular to $(5,2)$ has a first coordinate of 2. What is the second coordinate?'), solution: say('$(a,b)\\perp(b,-a)$, beraz $(5,2)\\perp(2,-5)$.', '$(a,b)\\perp(b,-a)$, así que $(5,2)\\perp(2,-5)$.', '$(a,b)\\perp(b,-a)$، إذن $(5,2)\\perp(2,-5)$.', '$(a,b)\\perp(b,-a)$, so $(5,2)\\perp(2,-5)$.'), answer: { expected: n(-5) } },
            { id: 7, difficulty: 'medium', question: with_(say('$\\vec{u}=(1,3)$ eta $\\vec{v}=(2,-1)$ badira, kalkulatu $\\vec{u}+\\vec{v}$-ren modulua.', 'Si $\\vec{u}=(1,3)$ y $\\vec{v}=(2,-1)$, calcula el módulo de $\\vec{u}+\\vec{v}$.', 'إذا كان $\\vec{u}=(1,3)$ و$\\vec{v}=(2,-1)$ فاحسب طول $\\vec{u}+\\vec{v}$.', 'If $\\vec{u}=(1,3)$ and $\\vec{v}=(2,-1)$, calculate the magnitude of $\\vec{u}+\\vec{v}$.'), HUNDREDTHS), solution: same('$\\vec{u}+\\vec{v}=(3,2)\\qquad \\sqrt{3^{2}+2^{2}}=\\sqrt{13}\\approx 3{,}61$'), answer: { expected: v('3,61') } },
            { id: 8, difficulty: 'hard', question: say('$B=A+2\\vec{u}$, $A(-1,4)$ eta $\\vec{u}=(3,-2)$ izanik. Zein da B-ren ordenatua?', '$B=A+2\\vec{u}$, con $A(-1,4)$ y $\\vec{u}=(3,-2)$. ¿Cuál es la ordenada de B?', '$B=A+2\\vec{u}$ حيث $A(-1,4)$ و$\\vec{u}=(3,-2)$. ما الإحداثي الصادي لـ B؟', '$B=A+2\\vec{u}$, with $A(-1,4)$ and $\\vec{u}=(3,-2)$. What is the y-coordinate of B?'), solution: same('$B=(-1+6,4-4)=(5,0)$'), answer: { expected: n(0) } },
            { id: 9, difficulty: 'hard', question: say('Zein da $(3,4)$-ren norabide eta noranzko bereko bektore unitarioaren lehen koordenatua?', '¿Cuál es la primera coordenada del vector unitario con la dirección y el sentido de $(3,4)$?', 'ما المركّبة الأولى للمتجه الواحدي الذي له اتجاه $(3,4)$ ومنحاه؟', 'What is the first coordinate of the unit vector in the same direction as $(3,4)$?'), solution: same('$|(3,4)|=5\\qquad \\left(\\frac{3}{5},\\frac{4}{5}\\right)=(0{,}6,0{,}8)$'), answer: { expected: v('0,6') } },
            { id: 10, difficulty: 'hard', question: say('3 eta 4 moduluko bi bektoreren batura 7 moduluko bektore bat izan daiteke? Eta 1 modulukoa?', '¿Pueden sumar dos vectores de módulos 3 y 4 un vector de módulo 7? ¿Y de módulo 1?', 'هل يمكن أن يكون مجموع متجهين طولاهما 3 و4 متجهًا طوله 7؟ وطوله 1؟', 'Can two vectors with magnitudes 3 and 4 add up to a vector with magnitude 7? And one with magnitude 1?'), solution: say('Bai: norabide eta noranzko bera badute, modulua $3+4=7$ da. Eta 1 ere bai: norabide bera eta aurkako noranzkoa badute, $4-3=1$.', 'Sí: si tienen la misma dirección y sentido, el módulo es $3+4=7$. Y 1 también: si tienen la misma dirección y sentidos contrarios, $4-3=1$.', 'نعم: إذا كان لهما الاتجاه والمنحى نفساهما فالطول $3+4=7$. والطول 1 ممكن أيضًا: إذا كان لهما الاتجاه نفسه ومنحيان متعاكسان، $4-3=1$.', 'Yes: if they point in the same direction, the magnitude is $3+4=7$. And 1 too: if they point in opposite directions, $4-3=1$.') }
        ]
    },
    {
        id: 'points',
        title: say('Puntuak eta distantziak', 'Puntos y distancias', 'النقاط والمسافات', 'Points and distances'),
        items: [
            { id: 11, difficulty: 'easy', question: say('Kalkulatu $(1,2)$ eta $(4,6)$ puntuen arteko distantzia.', 'Calcula la distancia entre $(1,2)$ y $(4,6)$.', 'احسب المسافة بين $(1,2)$ و$(4,6)$.', 'Calculate the distance between $(1,2)$ and $(4,6)$.'), solution: same('$\\sqrt{3^{2}+4^{2}}=5$'), answer: { expected: n(5) } },
            { id: 12, difficulty: 'easy', question: say('Zein da $(-2,5)$ eta $(4,-1)$ puntuen erdiko puntuaren abzisa?', '¿Cuál es la abscisa del punto medio de $(-2,5)$ y $(4,-1)$?', 'ما الإحداثي السيني لمنتصف $(-2,5)$ و$(4,-1)$؟', 'What is the x-coordinate of the midpoint of $(-2,5)$ and $(4,-1)$?'), solution: same('$\\left(\\frac{-2+4}{2},\\frac{5-1}{2}\\right)=(1,2)$'), answer: { expected: n(1) } },
            { id: 13, difficulty: 'easy', question: say('Zer distantziatara dago $(-8,6)$ puntua jatorritik?', '¿A qué distancia del origen está el punto $(-8,6)$?', 'ما بعد النقطة $(-8,6)$ عن الأصل؟', 'How far from the origin is the point $(-8,6)$?'), solution: same('$\\sqrt{(-8)^{2}+6^{2}}=\\sqrt{100}=10$'), answer: { expected: n(10) } },
            { id: 14, difficulty: 'medium', question: say('Zein da $A(3,-2)$ puntuaren simetrikoaren abzisa $P(1,1)$ puntuarekiko?', '¿Cuál es la abscisa del simétrico de $A(3,-2)$ respecto de $P(1,1)$?', 'ما الإحداثي السيني لنظيرة $A(3,-2)$ بالنسبة إلى $P(1,1)$؟', 'What is the x-coordinate of the point symmetric to $A(3,-2)$ with respect to $P(1,1)$?'), solution: same('$A\'=(2\\cdot 1-3,2\\cdot 1-(-2))=(-1,4)$'), answer: { expected: n(-1) } },
            { id: 15, difficulty: 'medium', question: say('Kalkulatu $A(0,0)$, $B(4,0)$ eta $C(0,3)$ erpineko triangeluaren perimetroa.', 'Calcula el perímetro del triángulo de vértices $A(0,0)$, $B(4,0)$ y $C(0,3)$.', 'احسب محيط المثلث الذي رؤوسه $A(0,0)$ و$B(4,0)$ و$C(0,3)$.', 'Calculate the perimeter of the triangle with vertices $A(0,0)$, $B(4,0)$ and $C(0,3)$.'), solution: same('$4+3+\\sqrt{4^{2}+3^{2}}=12$'), answer: { expected: n(12) } },
            { id: 16, difficulty: 'medium', question: say('Kalkulatu k, $A(1,1)$, $B(3,4)$ eta $C(7,k)$ lerrokatuta egon daitezen.', 'Halla k para que $A(1,1)$, $B(3,4)$ y $C(7,k)$ estén alineados.', 'أوجد k لتكون $A(1,1)$ و$B(3,4)$ و$C(7,k)$ على استقامة واحدة.', 'Find k so that $A(1,1)$, $B(3,4)$ and $C(7,k)$ are collinear.'), solution: same('$\\overrightarrow{AB}=(2,3)\\qquad \\overrightarrow{AC}=(6,k-1)\\qquad \\frac{6}{2}=\\frac{k-1}{3}\\ \\to\\ k=10$'), answer: { expected: n(10) } },
            { id: 17, difficulty: 'medium', question: say('Kalkulatu y > 0, $P(3,y)$ puntua $A(-1,1)$ puntutik 5eko distantziara egon dadin.', 'Halla y > 0 para que $P(3,y)$ esté a distancia 5 de $A(-1,1)$.', 'أوجد y > 0 لتكون $P(3,y)$ على بعد 5 من $A(-1,1)$.', 'Find y > 0 so that $P(3,y)$ is a distance of 5 from $A(-1,1)$.'), solution: same('$4^{2}+(y-1)^{2}=25\\ \\to\\ y-1=3\\ \\to\\ y=4$'), answer: { expected: n(4) } },
            { id: 18, difficulty: 'hard', question: with_(say('$A(-2,0)$, $B(2,0)$ eta $C(0,5)$ triangeluan, kalkulatu AC aldea. Nolakoa da triangelua?', 'En el triángulo $A(-2,0)$, $B(2,0)$, $C(0,5)$, calcula el lado AC. ¿Cómo es el triángulo?', 'في المثلث $A(-2,0)$ و$B(2,0)$ و$C(0,5)$ احسب الضلع AC. ما نوع المثلث؟', 'In the triangle $A(-2,0)$, $B(2,0)$, $C(0,5)$, calculate the side AC. What kind of triangle is it?'), HUNDREDTHS), solution: say('$d(A,C)=\\sqrt{2^{2}+5^{2}}=\\sqrt{29}\\approx 5{,}39$, eta BC berdina: isoszelea da.', '$d(A,C)=\\sqrt{2^{2}+5^{2}}=\\sqrt{29}\\approx 5{,}39$, y BC es igual: es isósceles.', '$d(A,C)=\\sqrt{2^{2}+5^{2}}=\\sqrt{29}\\approx 5{,}39$، وBC مساوٍ له: متساوي الساقين.', '$d(A,C)=\\sqrt{2^{2}+5^{2}}=\\sqrt{29}\\approx 5{,}39$, and BC is equal too: it is isosceles.'), answer: { expected: v('5,39') } },
            { id: 19, difficulty: 'hard', question: say('$M(5,-1)$ da AB-ren erdiko puntua eta $A(2,1)$. Zein da B-ren abzisa?', '$M(5,-1)$ es el punto medio de AB y $A(2,1)$. ¿Cuál es la abscisa de B?', '$M(5,-1)$ منتصف AB و$A(2,1)$. ما الإحداثي السيني لـ B؟', '$M(5,-1)$ is the midpoint of AB and $A(2,1)$. What is the x-coordinate of B?'), solution: same('$B=(2\\cdot 5-2,2\\cdot(-1)-1)=(8,-3)$'), answer: { expected: n(8) } },
            { id: 20, difficulty: 'hard', question: say('Frogatu $A(0,0)$, $B(3,1)$ eta $C(2,4)$ puntuek triangelu angeluzuzen bat osatzen dutela.', 'Demuestra que $A(0,0)$, $B(3,1)$ y $C(2,4)$ forman un triángulo rectángulo.', 'برهن أن $A(0,0)$ و$B(3,1)$ و$C(2,4)$ تكوّن مثلثًا قائمًا.', 'Prove that $A(0,0)$, $B(3,1)$ and $C(2,4)$ form a right-angled triangle.'), solution: say('$AB^{2}=10$, $BC^{2}=1+9=10$ eta $AC^{2}=4+16=20$; $10+10=20$ denez, Pitagoras betetzen da: angeluzuzena eta isoszelea da B-n.', '$AB^{2}=10$, $BC^{2}=1+9=10$ y $AC^{2}=4+16=20$; como $10+10=20$, se cumple Pitágoras: es rectángulo e isósceles en B.', '$AB^{2}=10$ و$BC^{2}=1+9=10$ و$AC^{2}=4+16=20$؛ وبما أن $10+10=20$ تتحقق فيثاغورس: المثلث قائم ومتساوي الساقين في B.', '$AB^{2}=10$, $BC^{2}=1+9=10$ and $AC^{2}=4+16=20$; as $10+10=20$, Pythagoras\' theorem holds: it is right-angled and isosceles at B.') }
        ]
    },
    {
        id: 'equations',
        title: say('Zuzenaren ekuazioak', 'Ecuaciones de la recta', 'معادلات المستقيم', 'Equations of a straight line'),
        items: [
            { id: 21, difficulty: 'easy', question: say('$(1,2)$ eta $(4,8)$ puntuetatik pasatzen den zuzenaren norabide-bektorea kalkulatu: zein da bigarren koordenatua?', 'Halla un vector director de la recta que pasa por $(1,2)$ y $(4,8)$: ¿cuál es su segunda coordenada?', 'أوجد متجه توجيه للمستقيم المار بـ $(1,2)$ و$(4,8)$: ما مركّبته الثانية؟', 'Find a direction vector of the straight line through $(1,2)$ and $(4,8)$: what is its second coordinate?'), solution: same('$(4-1,8-2)=(3,6)$'), answer: { expected: n(6) } },
            { id: 22, difficulty: 'easy', question: say('$x=3+2t$, $y=-1+t$ zuzenean, zein da t = 2 balioko puntuaren ordenatua?', 'En la recta $x=3+2t$, $y=-1+t$, ¿cuál es la ordenada del punto con t = 2?', 'في المستقيم $x=3+2t$، $y=-1+t$ ما الإحداثي الصادي للنقطة التي فيها t = 2؟', 'On the straight line $x=3+2t$, $y=-1+t$, what is the y-coordinate of the point with t = 2?'), solution: same('$y=-1+2=1$'), answer: { expected: n(1) } },
            { id: 23, difficulty: 'easy', question: say('Zein da $y=5x-3$ zuzenaren malda?', '¿Cuál es la pendiente de la recta $y=5x-3$?', 'ما ميل المستقيم $y=5x-3$؟', 'What is the slope of the straight line $y=5x-3$?'), solution: say('x-ren koefizientea: $m=5$.', 'El coeficiente de x: $m=5$.', 'معامل x: $m=5$.', 'The coefficient of x: $m=5$.'), answer: { expected: n(5) } },
            { id: 24, difficulty: 'medium', question: say('Zein da $4x-2y+6=0$ zuzenaren jatorriko ordenatua?', '¿Cuál es la ordenada en el origen de $4x-2y+6=0$?', 'ما المقطع الصادي لـ $4x-2y+6=0$؟', 'What is the y-intercept of $4x-2y+6=0$?'), solution: same('$2y=4x+6\\ \\to\\ y=2x+3$'), answer: { expected: n(3) } },
            { id: 25, difficulty: 'medium', question: say('$(5,4)$ puntua $x=1+2t$, $y=2+t$ zuzenekoa da? t-ren zein baliotarako?', '¿Es $(5,4)$ un punto de la recta $x=1+2t$, $y=2+t$? ¿Para qué valor de t?', 'هل $(5,4)$ نقطة من المستقيم $x=1+2t$، $y=2+t$؟ ولأي قيمة لـ t؟', 'Is $(5,4)$ a point on the straight line $x=1+2t$, $y=2+t$? For what value of t?'), solution: same('$5=1+2t\\ \\to\\ t=2\\qquad y=2+2=4$'), answer: { expected: n(2) } },
            { id: 26, difficulty: 'medium', question: say('$y=3x-6$ zuzenak X ardatza zein abzisatan ebakitzen du?', '¿En qué abscisa corta la recta $y=3x-6$ al eje X?', 'عند أي إحداثي سيني يقطع المستقيم $y=3x-6$ محور X؟', 'At what x-coordinate does the straight line $y=3x-6$ cross the x-axis?'), solution: same('$3x-6=0\\ \\to\\ x=2$'), answer: { expected: n(2) } },
            { id: 27, difficulty: 'medium', question: say('$P(1,4)$ puntutik pasatzen den eta $(2,-6)$ norabide-bektorea duen zuzenaren ekuazio esplizitua idatzi: zein da n?', 'Escribe la explícita de la recta que pasa por $P(1,4)$ con vector director $(2,-6)$: ¿cuánto vale n?', 'اكتب المعادلة الصريحة للمستقيم المار بـ $P(1,4)$ ومتجه توجيهه $(2,-6)$: كم n؟', 'Write the explicit equation of the straight line through $P(1,4)$ with direction vector $(2,-6)$: what is n?'), solution: same('$m=\\frac{-6}{2}=-3\\qquad y-4=-3\\,(x-1)\\ \\to\\ y=-3x+7$'), answer: { expected: n(7) } },
            { id: 28, difficulty: 'hard', question: say('$(2,1)$ eta $(4,5)$ puntuetatik pasatzen den zuzena $2x-y+c=0$ moduan idatzi. Zenbat da c?', 'Escribe la recta que pasa por $(2,1)$ y $(4,5)$ en la forma $2x-y+c=0$. ¿Cuánto vale c?', 'اكتب المستقيم المار بـ $(2,1)$ و$(4,5)$ على الصورة $2x-y+c=0$. كم c؟', 'Write the straight line through $(2,1)$ and $(4,5)$ in the form $2x-y+c=0$. What is c?'), solution: same('$m=\\frac{5-1}{4-2}=2\\qquad y-1=2\\,(x-2)\\ \\to\\ 2x-y-3=0$'), answer: { expected: n(-3) } },
            { id: 29, difficulty: 'hard', question: say('$\\frac{x-3}{2}=\\frac{y+1}{5}$ zuzenean, zein da x = 7 abzisako puntuaren ordenatua?', 'En la recta $\\frac{x-3}{2}=\\frac{y+1}{5}$, ¿cuál es la ordenada del punto de abscisa x = 7?', 'في المستقيم $\\frac{x-3}{2}=\\frac{y+1}{5}$ ما الإحداثي الصادي للنقطة التي إحداثيها السيني x = 7؟', 'On the straight line $\\frac{x-3}{2}=\\frac{y+1}{5}$, what is the y-coordinate of the point where x = 7?'), solution: same('$\\frac{7-3}{2}=2=\\frac{y+1}{5}\\ \\to\\ y=9$'), answer: { expected: n(9) } },
            { id: 30, difficulty: 'hard', question: say('Idatzi $x=2$ zuzena parametrikoetan. Zergatik ez du ekuazio esplizitorik?', 'Escribe la recta $x=2$ en paramétricas. ¿Por qué no tiene ecuación explícita?', 'اكتب المستقيم $x=2$ بالمعادلتين الوسيطيتين. لماذا لا معادلة صريحة له؟', 'Write the straight line $x=2$ in parametric form. Why does it have no explicit equation?'), solution: say('$(2,0)$ puntutik pasatzen da eta $(0,1)$ norabide-bektorea du: $x=2$, $y=t$. Bertikala da: ez du maldarik eta ezin da y askatu.', 'Pasa por $(2,0)$ con vector director $(0,1)$: $x=2$, $y=t$. Es vertical: no tiene pendiente y no se puede despejar y.', 'يمر بـ $(2,0)$ ومتجه توجيهه $(0,1)$: $x=2$، $y=t$. إنه رأسي: لا ميل له ولا يمكن عزل y.', 'It passes through $(2,0)$ with direction vector $(0,1)$: $x=2$, $y=t$. It is vertical: it has no slope, and it is not possible to solve for y.') }
        ]
    },
    {
        id: 'positions',
        title: say('Malda eta posizio erlatiboak', 'Pendiente y posiciones relativas', 'الميل والأوضاع النسبية', 'Slope and relative positions'),
        items: [
            { id: 31, difficulty: 'easy', question: say('Kalkulatu $(0,-2)$ eta $(3,4)$ puntuetatik pasatzen den zuzenaren malda.', 'Halla la pendiente de la recta que pasa por $(0,-2)$ y $(3,4)$.', 'أوجد ميل المستقيم المار بـ $(0,-2)$ و$(3,4)$.', 'Find the slope of the straight line through $(0,-2)$ and $(3,4)$.'), solution: same('$m=\\frac{4-(-2)}{3-0}=\\frac{6}{3}=2$'), answer: { expected: n(2) } },
            { id: 32, difficulty: 'easy', question: say('Zein da $y=-2x+7$ zuzenaren paralelo baten malda?', '¿Qué pendiente tiene una paralela a $y=-2x+7$?', 'ما ميل مستقيم يوازي $y=-2x+7$؟', 'What is the slope of a straight line parallel to $y=-2x+7$?'), solution: say('Paraleloek malda bera dute: $m=-2$.', 'Las paralelas tienen la misma pendiente: $m=-2$.', 'للمتوازيات الميل نفسه: $m=-2$.', 'Parallel straight lines have the same slope: $m=-2$.'), answer: { expected: n(-2) } },
            { id: 33, difficulty: 'easy', question: say('Zein da $y=4x$ zuzenaren perpendikular baten malda?', '¿Qué pendiente tiene una perpendicular a $y=4x$?', 'ما ميل مستقيم عمودي على $y=4x$؟', 'What is the slope of a straight line perpendicular to $y=4x$?'), solution: same('$m\'=-\\frac{1}{4}=-0{,}25$'), answer: { expected: v('-0,25') } },
            { id: 34, difficulty: 'medium', question: say('Zein posizio erlatibo dute $y=3x+1$ eta $y=3x-2$ zuzenek?', '¿Qué posición relativa tienen $y=3x+1$ e $y=3x-2$?', 'ما الوضع النسبي لـ $y=3x+1$ و$y=3x-2$؟', 'What is the relative position of $y=3x+1$ and $y=3x-2$?'), solution: say('Malda bera (3) eta jatorriko ordenatu desberdinak (1 eta −2): paraleloak dira.', 'Misma pendiente (3) y distinta ordenada en el origen (1 y −2): son paralelas.', 'الميل نفسه (3) ومقطعان صاديان مختلفان (1 و−2): متوازيان.', 'Same slope (3) and different y-intercepts (1 and −2): they are parallel.') },
            { id: 35, difficulty: 'medium', question: say('Zein da $y=x+1$ eta $y=-2x+7$ zuzenen ebaki-puntuaren abzisa?', '¿Cuál es la abscisa del punto de corte de $y=x+1$ e $y=-2x+7$?', 'ما الإحداثي السيني لنقطة تقاطع $y=x+1$ و$y=-2x+7$؟', 'What is the x-coordinate of the point where $y=x+1$ and $y=-2x+7$ intersect?'), solution: same('$x+1=-2x+7\\ \\to\\ 3x=6\\ \\to\\ x=2\\qquad y=2+1=3$'), answer: { expected: n(2) } },
            { id: 36, difficulty: 'medium', question: say('$(1,4)$ puntutik pasatzen den $2x+y-5=0$ zuzenaren paraleloa: zein da haren jatorriko ordenatua?', 'La paralela a $2x+y-5=0$ por $(1,4)$: ¿cuál es su ordenada en el origen?', 'الموازي لـ $2x+y-5=0$ المار بـ $(1,4)$: ما مقطعه الصادي؟', 'The straight line parallel to $2x+y-5=0$ through $(1,4)$: what is its y-intercept?'), solution: same('$m=-2\\qquad y-4=-2\\,(x-1)\\ \\to\\ y=-2x+6$'), answer: { expected: n(6) } },
            { id: 37, difficulty: 'medium', question: say('$(4,1)$ puntutik pasatzen den $y=2x+1$ zuzenaren perpendikularra: zein da haren jatorriko ordenatua?', 'La perpendicular a $y=2x+1$ por $(4,1)$: ¿cuál es su ordenada en el origen?', 'العمودي على $y=2x+1$ المار بـ $(4,1)$: ما مقطعه الصادي؟', 'The straight line perpendicular to $y=2x+1$ through $(4,1)$: what is its y-intercept?'), solution: same('$y-1=-\\frac{1}{2}\\,(x-4)\\ \\to\\ y=-\\frac{1}{2}x+3$'), answer: { expected: n(3) } },
            { id: 38, difficulty: 'hard', question: say('Kalkulatu k, $3x+ky=2$ eta $6x-4y=1$ zuzenak paraleloak izan daitezen.', 'Halla k para que $3x+ky=2$ y $6x-4y=1$ sean paralelas.', 'أوجد k ليكون $3x+ky=2$ و$6x-4y=1$ متوازيين.', 'Find k so that $3x+ky=2$ and $6x-4y=1$ are parallel.'), solution: same('$\\frac{3}{6}=\\frac{k}{-4}\\ \\to\\ k=-2$'), answer: { expected: n(-2) } },
            { id: 39, difficulty: 'hard', question: say('Zein da $2x+3y=12$ eta $x-y=1$ zuzenen ebaki-puntuaren ordenatua?', '¿Cuál es la ordenada del punto de corte de $2x+3y=12$ y $x-y=1$?', 'ما الإحداثي الصادي لنقطة تقاطع $2x+3y=12$ و$x-y=1$؟', 'What is the y-coordinate of the point where $2x+3y=12$ and $x-y=1$ intersect?'), solution: same('$x=y+1\\qquad 2\\,(y+1)+3y=12\\ \\to\\ 5y=10\\ \\to\\ y=2$'), answer: { expected: n(2) } },
            { id: 40, difficulty: 'hard', question: say('Ekuazio orokorrekin, nola jakin bi zuzen bat datozen?', 'Con las ecuaciones generales, ¿cómo se sabe si dos rectas son coincidentes?', 'بالمعادلتين العامتين، كيف نعرف أن مستقيمين منطبقان؟', 'Using the general equations, how can you tell whether two straight lines are coincident?'), solution: say('Hiru zatidurak berdinak direnean: $\\frac{A}{A\'}=\\frac{B}{B\'}=\\frac{C}{C\'}$; ekuazio bat bestea bider zenbaki bat da. Adibidez, $x+2y-3=0$ eta $2x+4y-6=0$.', 'Cuando los tres cocientes son iguales: $\\frac{A}{A\'}=\\frac{B}{B\'}=\\frac{C}{C\'}$; una ecuación es la otra multiplicada por un número. Por ejemplo, $x+2y-3=0$ y $2x+4y-6=0$.', 'عندما تتساوى النسب الثلاث: $\\frac{A}{A\'}=\\frac{B}{B\'}=\\frac{C}{C\'}$؛ فإحدى المعادلتين هي الأخرى مضروبة في عدد. مثلًا $x+2y-3=0$ و$2x+4y-6=0$.', 'When the three ratios are equal: $\\frac{A}{A\'}=\\frac{B}{B\'}=\\frac{C}{C\'}$; one equation is the other multiplied by a number. For example, $x+2y-3=0$ and $2x+4y-6=0$.') }
        ]
    },
    {
        id: 'applications',
        title: say('Aplikazioak', 'Aplicaciones', 'تطبيقات', 'Applications'),
        items: [
            { id: 41, difficulty: 'easy', question: say('Zein da $(x-2)^{2}+(y+5)^{2}=16$ zirkunferentziaren erradioa?', '¿Cuál es el radio de la circunferencia $(x-2)^{2}+(y+5)^{2}=16$?', 'ما نصف قطر الدائرة $(x-2)^{2}+(y+5)^{2}=16$؟', 'What is the radius of the circumference $(x-2)^{2}+(y+5)^{2}=16$?'), solution: same('$r=\\sqrt{16}=4$'), answer: { expected: n(4) } },
            { id: 42, difficulty: 'easy', question: say('Zein da $(x+3)^{2}+(y-1)^{2}=9$ zirkunferentziaren zentroaren abzisa?', '¿Cuál es la abscisa del centro de $(x+3)^{2}+(y-1)^{2}=9$?', 'ما الإحداثي السيني لمركز $(x+3)^{2}+(y-1)^{2}=9$؟', 'What is the x-coordinate of the centre of $(x+3)^{2}+(y-1)^{2}=9$?'), solution: say('$(x+3)^{2}=(x-(-3))^{2}$: zentroa $(-3,1)$ da.', '$(x+3)^{2}=(x-(-3))^{2}$: el centro es $(-3,1)$.', '$(x+3)^{2}=(x-(-3))^{2}$: المركز $(-3,1)$.', '$(x+3)^{2}=(x-(-3))^{2}$: the centre is $(-3,1)$.'), answer: { expected: n(-3) } },
            { id: 43, difficulty: 'easy', question: say('$P(3,4)$ puntua $x^{2}+y^{2}=25$ zirkunferentzian dago?', '¿Está el punto $P(3,4)$ en la circunferencia $x^{2}+y^{2}=25$?', 'هل النقطة $P(3,4)$ على الدائرة $x^{2}+y^{2}=25$؟', 'Is the point $P(3,4)$ on the circumference $x^{2}+y^{2}=25$?'), solution: say('Bai: $3^{2}+4^{2}=25$.', 'Sí: $3^{2}+4^{2}=25$.', 'نعم: $3^{2}+4^{2}=25$.', 'Yes: $3^{2}+4^{2}=25$.') },
            { id: 44, difficulty: 'medium', question: say('Zirkunferentzia baten zentroa $(1,1)$ da eta $(4,5)$ puntutik pasatzen da. Kalkulatu erradioa.', 'Una circunferencia tiene centro $(1,1)$ y pasa por $(4,5)$. Halla el radio.', 'دائرة مركزها $(1,1)$ وتمر بـ $(4,5)$. أوجد نصف قطرها.', 'A circumference has centre $(1,1)$ and passes through $(4,5)$. Find the radius.'), solution: same('$r=\\sqrt{3^{2}+4^{2}}=5$'), answer: { expected: n(5) } },
            { id: 45, difficulty: 'medium', question: say('Zein da $A(2,0)$ eta $B(0,2)$ muturreko zuzenkiaren erdibitzailearen malda?', '¿Cuál es la pendiente de la mediatriz del segmento de extremos $A(2,0)$ y $B(0,2)$?', 'ما ميل محور القطعة التي طرفاها $A(2,0)$ و$B(0,2)$؟', 'What is the slope of the perpendicular bisector of the segment with endpoints $A(2,0)$ and $B(0,2)$?'), solution: same('$m=\\frac{2-0}{0-2}=-1\\ \\to\\ m\'=1$'), answer: { expected: n(1) } },
            { id: 46, difficulty: 'medium', question: say('$A(0,0)$, $B(4,1)$ eta $C(6,4)$ ABCD paralelogramoaren hiru erpin jarraitu dira. Zein da D-ren abzisa?', '$A(0,0)$, $B(4,1)$ y $C(6,4)$ son tres vértices consecutivos del paralelogramo ABCD. ¿Cuál es la abscisa de D?', '$A(0,0)$ و$B(4,1)$ و$C(6,4)$ ثلاثة رؤوس متتالية لمتوازي الأضلاع ABCD. ما الإحداثي السيني لـ D؟', '$A(0,0)$, $B(4,1)$ and $C(6,4)$ are three consecutive vertices of the parallelogram ABCD. What is the x-coordinate of D?'), solution: same('$D=(0+6-4,0+4-1)=(2,3)$'), answer: { expected: n(2) } },
            { id: 47, difficulty: 'medium', question: say('Kalkulatu $A(0,0)$, $B(8,0)$ eta $C(3,6)$ erpineko triangeluaren azalera.', 'Calcula el área del triángulo de vértices $A(0,0)$, $B(8,0)$ y $C(3,6)$.', 'احسب مساحة المثلث الذي رؤوسه $A(0,0)$ و$B(8,0)$ و$C(3,6)$.', 'Calculate the area of the triangle with vertices $A(0,0)$, $B(8,0)$ and $C(3,6)$.'), solution: same('$\\frac{8\\cdot 6}{2}=24$'), answer: { expected: n(24) } },
            { id: 48, difficulty: 'hard', question: say('Diametro baten muturrak $(-2,3)$ eta $(4,-5)$ dira. Kalkulatu erradioa.', 'Los extremos de un diámetro son $(-2,3)$ y $(4,-5)$. Halla el radio.', 'طرفا قطر هما $(-2,3)$ و$(4,-5)$. أوجد نصف القطر.', 'The endpoints of a diameter are $(-2,3)$ and $(4,-5)$. Find the radius.'), solution: same('$\\sqrt{6^{2}+(-8)^{2}}=10\\qquad r=\\frac{10}{2}=5$'), answer: { expected: n(5) } },
            { id: 49, difficulty: 'hard', question: say('$A(1,1)$, $B(4,2)$ eta $C(0,4)$ triangelua A-n angeluzuzena dela egiaztatu eta kalkulatu haren azalera.', 'Comprueba que el triángulo $A(1,1)$, $B(4,2)$, $C(0,4)$ es rectángulo en A y halla su área.', 'تحقق من أن المثلث $A(1,1)$ و$B(4,2)$ و$C(0,4)$ قائم في A واحسب مساحته.', 'Check that the triangle $A(1,1)$, $B(4,2)$, $C(0,4)$ is right-angled at A and find its area.'), solution: same('$\\overrightarrow{AB}=(3,1)\\perp\\overrightarrow{AC}=(-1,3)\\qquad \\frac{\\sqrt{10}\\cdot\\sqrt{10}}{2}=5$'), answer: { expected: n(5) } },
            { id: 50, difficulty: 'hard', question: say('Zein da $A(0,0)$, $B(6,0)$ eta $C(0,4)$ triangeluaren zirkunzentroaren abzisa?', '¿Cuál es la abscisa del circuncentro del triángulo $A(0,0)$, $B(6,0)$, $C(0,4)$?', 'ما الإحداثي السيني لمركز الدائرة المحيطة بالمثلث $A(0,0)$ و$B(6,0)$ و$C(0,4)$؟', 'What is the x-coordinate of the circumcentre of the triangle $A(0,0)$, $B(6,0)$, $C(0,4)$?'), solution: say('AB-ren erdibitzailea $x=3$ da eta AC-rena $y=2$: zirkunzentroa $(3,2)$ da, BC hipotenusaren erdiko puntua.', 'La mediatriz de AB es $x=3$ y la de AC, $y=2$: el circuncentro es $(3,2)$, el punto medio de la hipotenusa BC.', 'محور AB هو $x=3$ ومحور AC هو $y=2$: مركز الدائرة المحيطة $(3,2)$، منتصف الوتر BC.', 'The perpendicular bisector of AB is $x=3$ and that of AC is $y=2$: the circumcentre is $(3,2)$, the midpoint of the hypotenuse BC.'), answer: { expected: n(3) } }
        ]
    }
]

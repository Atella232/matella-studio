import type { LocalizedText, UnitStage, UnitTopic } from '../../features/unit-v2/types'
import { bivarTopics } from '../batx1-zientziak-bidimentsionala/lessons'
import { BothLinesFigure, LineXYFigure, MarginalTableFigure, RCloudsFigure } from './figures'
import { socialBivarLessonChecks, type SocialBivarTopicId } from './lessonChecks'
import { socialBivarLessonTexts } from './lessonTexts'

/* ==========================================================================
   Estatistika bidimentsionala · Batxilergoa 1 · Gizarte Zientziak — stages
   and lessons. The scope follows the two editions of Anaya Matemáticas
   Aplicadas a las Ciencias Sociales I (unit 9 of the older, unit 8 of the
   newer): functional and statistical relation, the cloud and r, the
   covariance, the two regression lines and how reliable an estimate is,
   and, from the newer edition, contingency tables at the end (owner's
   choice F1, 2026-11-17). As Anaya does (choice R1), the line of X on Y is
   also written solved for y, so the two lines are drawn on the same axes:
   the two lessons on it are new; fourteen lessons are borrowed unchanged
   from 1.º Ciencias (`borrow`). All the exercises and numbers are our own.
   ========================================================================== */

export type SocialBivarStageId = 'cloud' | 'parameters' | 'regression' | 'problems' | 'tables'

export const socialBivarStages: UnitStage[] = [
    { id: 'cloud', tone: 'blue', title: { eu: 'Erlazioa eta puntu-hodeia', es: 'Relación y nube de puntos', en: 'Relation and scatter plot', ar: 'العلاقة وسحابة النقاط' } },
    { id: 'parameters', tone: 'violet', title: { eu: 'Kobariantza eta korrelazioa', es: 'Covarianza y correlación', en: 'Covariance and correlation', ar: 'التغاير والارتباط' } },
    { id: 'regression', tone: 'mustard', title: { eu: 'Erregresio-zuzenak', es: 'Rectas de regresión', en: 'Regression lines', ar: 'مستقيمات الانحدار' } },
    { id: 'problems', tone: 'coral', title: { eu: 'Problema osoak', es: 'Problemas completos', en: 'Full problems', ar: 'مسائل كاملة' } },
    { id: 'tables', tone: 'green', title: { eu: 'Kontingentzia-taulak', es: 'Tablas de contingencia', en: 'Contingency tables', ar: 'جداول التوافق' } }
]

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
/** The same formula in every language; the decimal comma becomes a point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })

const need = {
    correlation: { unit: 'dbh4-akademikoak/estadistica', topic: 'correlation', title: { eu: 'Korrelazioa eta r', es: 'Correlación y r', en: 'Correlation and r', ar: 'الارتباط وr' } },
    regression: { unit: 'dbh4-akademikoak/estadistica', topic: 'regression', title: { eu: 'Erregresio-zuzena', es: 'Recta de regresión', en: 'Regression line', ar: 'مستقيم الانحدار' } },
    grouped: { unit: 'dbh4-akademikoak/estadistica', topic: 'grouped-centre', title: { eu: 'Datu multzokatuen parametroak', es: 'Parámetros de datos agrupados', en: 'Measures for grouped data', ar: 'مقاييس البيانات المبوّبة' } }
}

/** A lesson of 1.º Ciencias, unchanged, in a stage of this unit */
const borrow = (id: string, stage: SocialBivarStageId): UnitTopic => {
    const topic = bivarTopics.find((item) => item.id === id)
    if (!topic) throw new Error(`No lesson ${id} in 1.º Ciencias`)
    return { ...topic, stage }
}

/** The new lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const ownTopics: Record<SocialBivarTopicId, Omit<UnitTopic, 'explanation' | 'example'>> = {
    'reading-r': {
        id: 'reading-r',
        stage: 'cloud',
        figureAfterSteps: false,
        title: say('r hodeian irakurtzea', 'Leer r en la nube', 'قراءة r في السحابة', 'Reading r in the cloud'),
        goal: say('Puntu-hodei bati bere korrelazio-koefizientea esleitzea, zeinua eta indarra begiz irakurriz.', 'Asignar a una nube de puntos su coeficiente de correlación, leyendo a ojo el signo y la fuerza.', 'إسناد معامل الارتباط إلى سحابة نقاط بقراءة الإشارة والقوة بالنظر.', 'Match a scatter plot with its correlation coefficient, reading the sign and the strength by eye.'),
        needs: [need.correlation],
        problem: say('A, B, C eta D hodeiek, ordenarik gabe, $r=0{,}92$, $r=-0{,}8$, $r=0{,}45$ eta $r=-0{,}6$ dituzte. Esleitu bakoitzari berea.', 'Las nubes A, B, C y D tienen, sin orden, $r=0{,}92$, $r=-0{,}8$, $r=0{,}45$ y $r=-0{,}6$. Asigna a cada una el suyo.', 'للسحب A وB وC وD، دون ترتيب، $r=0{,}92$ و$r=-0{,}8$ و$r=0{,}45$ و$r=-0{,}6$. أسند إلى كل واحدة معاملها.', 'Clouds A, B, C and D have, in no order, $r=0{,}92$, $r=-0{,}8$, $r=0{,}45$ and $r=-0{,}6$. Give each one its own.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zeinua: A eta C gora doaz, positiboak; B eta D behera, negatiboak.', 'El signo: A y C suben, positivos; B y D bajan, negativos.', 'الإشارة: A وC تصعدان فهما موجبتان، وB وD تهبطان فهما سالبتان.', 'The sign: A and C rise, positive; B and D fall, negative.') },
            { text: say('Positiboen artean, A zuzenetik hurbilago dago: $0{,}92$. C sakabanatuago: $0{,}45$.', 'Entre los positivos, A está más pegada a una recta: $0{,}92$. C, más dispersa: $0{,}45$.', 'بين الموجبتين A أكثر التصاقًا بمستقيم: $0{,}92$. وC أكثر تفرقًا: $0{,}45$.', 'Among the positive ones, A is closer to a line: $0{,}92$. C, more spread out: $0{,}45$.') },
            { text: say('Negatiboen artean, B hurbilago: $-0{,}8$; D sakabanatuago: $-0{,}6$.', 'Entre los negativos, B más pegada: $-0{,}8$; D más dispersa: $-0{,}6$.', 'بين السالبتين B أكثر التصاقًا: $-0{,}8$؛ وD أكثر تفرقًا: $-0{,}6$.', 'Among the negative ones, B is closer: $-0{,}8$; D more spread out: $-0{,}6$.') }
        ],
        takeaway: say(
            'r koefizientearen zeinua hodeiaren noranzkoa da, eta $|r|$, puntuak zuzen batetik zein hurbil dauden: 1 zenbakitik hurbil, sendoa; 0 zenbakitik hurbil, ahula.',
            'El signo de r es el sentido de la nube, y $|r|$, lo pegados que están los puntos a una recta: cerca de 1, fuerte; cerca de 0, débil.',
            'إشارة r هي اتجاه السحابة، و$|r|$ هو مدى التصاق النقاط بمستقيم: قرب 1 قوي، وقرب 0 ضعيف.',
            'The sign of r is the direction of the cloud, and $|r|$ is how close the points are to a line: near 1, strong; near 0, weak.'
        ),
        figure: (language) => <RCloudsFigure language={language} />
    },
    'line-xy': {
        id: 'line-xy',
        stage: 'regression',
        figureAfterSteps: true,
        title: say('X-ren Y-rekiko zuzena', 'La recta de X sobre Y', 'مستقيم X على Y', 'The line of X on Y'),
        goal: say('X-ren Y-rekiko erregresio-zuzena idaztea, y askatuta marraztea eta y-tik x estimatzeko erabiltzea.', 'Escribir la recta de regresión de X sobre Y, dibujarla con y despejada y usarla para estimar x a partir de y.', 'كتابة مستقيم انحدار X على Y ورسمه بعد عزل y واستعماله لتقدير x انطلاقًا من y.', 'Write the regression line of X on Y, draw it solved for y and use it to estimate x from y.'),
        needs: [need.regression],
        problem: say('$\\bar{x}=6$, $\\bar{y}=10$, $\\sigma_y^2=8$ eta $\\sigma_{xy}=4$. Idatzi X-ren Y-rekiko zuzena, eta estimatu x, $y=14$ denean.', 'Se tiene $\\bar{x}=6$, $\\bar{y}=10$, $\\sigma_y^2=8$ y $\\sigma_{xy}=4$. Escribe la recta de X sobre Y y estima x para $y=14$.', 'لدينا $\\bar{x}=6$ و$\\bar{y}=10$ و$\\sigma_y^2=8$ و$\\sigma_{xy}=4$. اكتب مستقيم X على Y وقدّر x عندما $y=14$.', 'You have $\\bar{x}=6$, $\\bar{y}=10$, $\\sigma_y^2=8$ and $\\sigma_{xy}=4$. Write the line of X on Y and estimate x for $y=14$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Erregresio-koefizientea, Y-ren bariantzaz zatituta.', 'El coeficiente de regresión, entre la varianza de Y.', 'معامل الانحدار مقسومًا على تباين Y.', 'The regression coefficient, divided by the variance of Y.'), math: same('$m_{xy}=\\frac{4}{8}=0{,}5\\qquad x-6=0{,}5\\,(y-10)$') },
            { text: say('Beste zuzenarekin marrazteko, y askatzen da.', 'Para dibujarla con la otra, se despeja y.', 'لرسمه مع الآخر نعزل y.', 'To draw it with the other, solve for y.'), math: same('$y-10=2\\,(x-6)\\ \\to\\ y=2x-2$') },
            { text: say('$y=14$ ordezkatzen da.', 'Se sustituye $y=14$.', 'نعوّض $y=14$.', 'Substitute $y=14$.'), math: same('$x=6+0{,}5\\cdot(14-10)=8$') }
        ],
        takeaway: say(
            'X-ren Y-rekiko zuzena: $x-\\bar{x}=\\frac{\\sigma_{xy}}{\\sigma_y^2}\\,(y-\\bar{y})$. y askatuta, haren malda $\\frac{\\sigma_y^2}{\\sigma_{xy}}$ da. y-tik x estimatzeko erabiltzen da.',
            'Recta de X sobre Y: $x-\\bar{x}=\\frac{\\sigma_{xy}}{\\sigma_y^2}\\,(y-\\bar{y})$. Con y despejada, su pendiente es $\\frac{\\sigma_y^2}{\\sigma_{xy}}$. Sirve para estimar x a partir de y.',
            'مستقيم X على Y: $x-\\bar{x}=\\frac{\\sigma_{xy}}{\\sigma_y^2}\\,(y-\\bar{y})$. وبعد عزل y يكون ميله $\\frac{\\sigma_y^2}{\\sigma_{xy}}$. ويفيد في تقدير x انطلاقًا من y.',
            'Line of X on Y: $x-\\bar{x}=\\frac{\\sigma_{xy}}{\\sigma_y^2}\\,(y-\\bar{y})$. Solved for y, its slope is $\\frac{\\sigma_y^2}{\\sigma_{xy}}$. It is used to estimate x from y.'
        ),
        figure: (language) => <LineXYFigure language={language} />
    },
    'both-lines': {
        id: 'both-lines',
        stage: 'regression',
        figureAfterSteps: true,
        title: say('Bi erregresio-zuzenak', 'Las dos rectas de regresión', 'مستقيما الانحدار', 'The two regression lines'),
        goal: say('Bi zuzenen ebakidura-puntuan grabitate-zentroa aurkitzea, eta haien maldetatik r ateratzea.', 'Hallar el centro de gravedad en el corte de las dos rectas y sacar r de sus pendientes.', 'إيجاد مركز الثقل في تقاطع المستقيمين واستخراج r من ميليهما.', 'Find the centre of gravity where the two lines cross and get r from their slopes.'),
        needs: [need.regression],
        problem: say('Y-ren X-rekiko zuzena $y=0{,}8x+3{,}8$ da, eta X-ren Y-rekikoa, y askatuta, $y=1{,}25x+2$. Aurkitu $\\bar{x}$, $\\bar{y}$ eta r.', 'La recta de Y sobre X es $y=0{,}8x+3{,}8$ y la de X sobre Y, con y despejada, $y=1{,}25x+2$. Halla $\\bar{x}$, $\\bar{y}$ y r.', 'مستقيم Y على X هو $y=0{,}8x+3{,}8$، ومستقيم X على Y بعد عزل y هو $y=1{,}25x+2$. أوجد $\\bar{x}$ و$\\bar{y}$ وr.', 'The line of Y on X is $y=0{,}8x+3{,}8$ and that of X on Y, solved for y, is $y=1{,}25x+2$. Find $\\bar{x}$, $\\bar{y}$ and r.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Bi zuzenak $(\\bar{x},\\bar{y})$ puntuan ebakitzen dira.', 'Las dos se cortan en $(\\bar{x},\\bar{y})$.', 'يتقاطعان في $(\\bar{x},\\bar{y})$.', 'Both cross at $(\\bar{x},\\bar{y})$.'), math: same('$0{,}8x+3{,}8=1{,}25x+2\\ \\to\\ 0{,}45x=1{,}8\\ \\to\\ x=4$') },
            { text: say('y lehenengo zuzenean.', 'La y, en la primera recta.', 'قيمة y من المستقيم الأول.', 'y, from the first line.'), math: same('$y=0{,}8\\cdot 4+3{,}8=7$') },
            { text: say('X-ren Y-rekiko koefizientea marraztutako maldaren alderantzizkoa da.', 'El coeficiente de X sobre Y es el inverso de la pendiente dibujada.', 'معامل X على Y هو مقلوب الميل المرسوم.', 'The coefficient of X on Y is the inverse of the slope as drawn.'), math: same('$m_{xy}=\\frac{1}{1{,}25}=0{,}8\\qquad r^2=0{,}8\\cdot 0{,}8=0{,}64\\qquad r=0{,}8$') }
        ],
        takeaway: say(
            'Bi zuzenak $(\\bar{x},\\bar{y})$ puntuan ebakitzen dira, eta $r^2=m_{yx}\\cdot m_{xy}$: y askatuta, malda txikiena zati handiena. r koefizienteak malden zeinua du.',
            'Las dos rectas se cortan en $(\\bar{x},\\bar{y})$ y $r^2=m_{yx}\\cdot m_{xy}$: con y despejada, la pendiente menor entre la mayor. r tiene el signo de las pendientes.',
            'يتقاطع المستقيمان في $(\\bar{x},\\bar{y})$ و$r^2=m_{yx}\\cdot m_{xy}$: بعد عزل y هو الميل الأصغر مقسومًا على الأكبر. وr بإشارة الميلين.',
            'The two lines cross at $(\\bar{x},\\bar{y})$ and $r^2=m_{yx}\\cdot m_{xy}$: solved for y, the smaller slope divided by the larger. r has the sign of the slopes.'
        ),
        figure: (language) => <BothLinesFigure language={language} />
    },
    'marginal-measures': {
        id: 'marginal-measures',
        stage: 'tables',
        figureAfterSteps: true,
        title: say('Marjinalen eta baldintzazkoen neurriak', 'Medidas de marginales y condicionadas', 'مقاييس التوزيعات الهامشية والشرطية', 'Measures of marginals and conditionals'),
        goal: say('Sarrera bikoitzeko taula batetik, aldagai baten marjinalaren eta baldintzazko baten batez bestekoa eta desbideratze tipikoa kalkulatzea.', 'Calcular, a partir de una tabla de doble entrada, la media y la desviación típica de la marginal de una variable y de una condicionada.', 'حساب متوسط التوزيع الهامشي لمتغير وتوزيع شرطي وانحرافهما المعياري انطلاقًا من جدول مزدوج المدخل.', 'Work out, from a two-way table, the mean and standard deviation of the marginal of a variable and of a conditional.'),
        needs: [need.grouped],
        problem: say('32 pertsonaren adina (x) eta zaletasuna: $[20,30)$ errenkadan 1, 0 eta 3; $[30,40)$ errenkadan 9, 6 eta 9; $[40,50)$ errenkadan 1, 3 eta 0 (zinema, antzerkia, kirola). Kalkulatu x-ren batez bestekoa eta $\\sigma$, eta kirolari baldintzatutako batez bestekoa.', 'Edad (x) y preferencia de 32 personas: fila $[20,30)$: 1, 0 y 3; fila $[30,40)$: 9, 6 y 9; fila $[40,50)$: 1, 3 y 0 (cine, teatro, deporte). Calcula la media y la $\\sigma$ de x, y la media condicionada a deporte.', 'عمر (x) وتفضيل 32 شخصًا: السطر $[20,30)$: 1 و0 و3؛ والسطر $[30,40)$: 9 و6 و9؛ والسطر $[40,50)$: 1 و3 و0 (سينما، مسرح، رياضة). احسب متوسط x و$\\sigma$، والمتوسط المشروط بالرياضة.', 'Age (x) and preference of 32 people: row $[20,30)$: 1, 0 and 3; row $[30,40)$: 9, 6 and 9; row $[40,50)$: 1, 3 and 0 (cinema, theatre, sport). Work out the mean and $\\sigma$ of x, and the mean conditioned on sport.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Marjinala: errenkaden guztizkoak 4, 24 eta 4 dira, eta klase-markak 25, 35 eta 45.', 'La marginal: las filas suman 4, 24 y 4, con marcas 25, 35 y 45.', 'الهامشي: مجاميع الأسطر 4 و24 و4، والمراكز 25 و35 و45.', 'The marginal: the rows add up to 4, 24 and 4, with marks 25, 35 and 45.'), math: same('$\\bar{x}=\\frac{4\\cdot 25+24\\cdot 35+4\\cdot 45}{32}=35$') },
            { text: say('Haren bariantza eta $\\sigma$.', 'Su varianza y su $\\sigma$.', 'تباينه و$\\sigma$.', 'Its variance and $\\sigma$.'), math: same('$\\sigma^2=\\frac{4\\cdot 100+0+4\\cdot 100}{32}=25\\qquad\\sigma=5$') },
            { text: say('Kirolari baldintzatua: zutabea 3, 9 eta 0 da, 12 pertsona.', 'Condicionada a deporte: la columna es 3, 9 y 0, 12 personas.', 'المشروط بالرياضة: العمود 3 و9 و0، أي 12 شخصًا.', 'Conditioned on sport: the column is 3, 9 and 0, 12 people.'), math: same('$\\bar{x}=\\frac{3\\cdot 25+9\\cdot 35}{12}=32{,}5$') }
        ],
        takeaway: say(
            'Marjinala eta baldintzazkoak banaketa arruntak dira: $\\bar{x}=\\frac{\\sum f_i x_i}{N}$, baina baldintzazkoan $N$ bere zutabearen edo errenkadaren guztizkoa da.',
            'La marginal y las condicionadas son distribuciones normales y corrientes: $\\bar{x}=\\frac{\\sum f_i x_i}{N}$, pero en la condicionada $N$ es el total de su columna o fila.',
            'التوزيعان الهامشي والشرطي توزيعان عاديان: $\\bar{x}=\\frac{\\sum f_i x_i}{N}$، لكن $N$ في الشرطي هو مجموع عموده أو سطره.',
            'The marginal and the conditionals are ordinary distributions: $\\bar{x}=\\frac{\\sum f_i x_i}{N}$, but in the conditional $N$ is the total of its column or row.'
        ),
        figure: (language) => <MarginalTableFigure language={language} />
    }
}

/** A new lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts) */
const own = (id: SocialBivarTopicId): UnitTopic => ({ ...ownTopics[id], ...socialBivarLessonTexts[id], ...socialBivarLessonChecks[id] })

export const socialBivarTopics: UnitTopic[] = [
    /* ---------- 1. Relation and scatter plot ---------- */
    borrow('scatter-dependence', 'cloud'),
    own('reading-r'),
    borrow('quadrants', 'cloud'),
    /* ---------- 2. Covariance and correlation ---------- */
    borrow('covariance', 'parameters'),
    borrow('correlation-coefficient', 'parameters'),
    borrow('units-change', 'parameters'),
    /* ---------- 3. Regression lines ---------- */
    borrow('regression-yx', 'regression'),
    borrow('estimation', 'regression'),
    own('line-xy'),
    own('both-lines'),
    /* ---------- 4. Full problems ---------- */
    borrow('calculation-table', 'problems'),
    borrow('inverse-problems', 'problems'),
    /* ---------- 5. Contingency tables ---------- */
    borrow('two-variables', 'tables'),
    borrow('marginal', 'tables'),
    borrow('conditional', 'tables'),
    own('marginal-measures'),
    borrow('independence', 'tables'),
    borrow('grouped-pairs', 'tables')
]

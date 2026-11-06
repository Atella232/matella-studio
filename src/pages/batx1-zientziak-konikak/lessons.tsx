import type { LocalizedText, UnitStage, UnitTopic } from '../../features/unit-v2/types'
import {
    AngleBisectorsFigure, AsymptotesFigure, CompleteSquareFigure, ConeSectionsFigure, DiameterCircleFigure, DistanceLociFigure, EllipseElementsFigure, EllipseFigure,
    HyperbolaFigure, LociBisectorFigure, ParabolaFigure, ShiftedEllipseFigure, ShiftedParabolaFigure, TangentFigure, TwoCirclesFigure
} from './figures'
import { bachConicsLessonChecks, type BachConicsTopicId } from './lessonChecks'
import { bachConicsLessonTexts } from './lessonTexts'

/* ==========================================================================
   Leku geometrikoak eta konikak · Batxilergoa 1 · Zientziak — stages and
   lessons. The scope follows unit 9 of Anaya Matemáticas I and unit 7 of
   Santillana 1.º Bachillerato Ciencias: loci (the perpendicular bisector,
   the bisectors of two lines and loci given by distances), the circle
   (equation, general form, a line and the tangent, two circles), the
   ellipse, the hyperbola and the parabola from their definitions, and how
   to recognise a conic. Notation of both books: y² = 2px for the parabola,
   a² = b² + c² for the ellipse, c² = a² + b² for the hyperbola, e = c/a,
   and a is always the semi-major axis.
   ========================================================================== */

export type BachConicsStageId = 'loci' | 'circle' | 'ellipse' | 'hyperbola' | 'parabola'

export const bachConicsStages: UnitStage[] = [
    { id: 'loci', tone: 'blue', title: { eu: 'Leku geometrikoak', es: 'Lugares geométricos', en: 'Loci', ar: 'المحلات الهندسية' } },
    { id: 'circle', tone: 'violet', title: { eu: 'Zirkunferentzia', es: 'Circunferencia', en: 'The circle', ar: 'الدائرة' } },
    { id: 'ellipse', tone: 'mustard', title: { eu: 'Elipsea', es: 'Elipse', en: 'The ellipse', ar: 'القطع الناقص' } },
    { id: 'hyperbola', tone: 'coral', title: { eu: 'Hiperbola', es: 'Hipérbola', en: 'The hyperbola', ar: 'القطع الزائد' } },
    { id: 'parabola', tone: 'green', title: { eu: 'Parabola eta konikak', es: 'Parábola y cónicas', en: 'The parabola and conics', ar: 'القطع المكافئ والقطوع المخروطية' } }
]

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
/** The same formula in every language; the decimal comma becomes a point in Arabic */
const same = (value: string): LocalizedText => ({ eu: value, es: value, en: value, ar: value.replace(/\{,\}/g, '.') })

const GEOMETRY_1 = 'batx1-zientziak/geometria-analitica'
const VECTORS_4 = 'dbh4-akademikoak/vectores-rectas'
const POINT_LINE = { unit: GEOMETRY_1, topic: 'point-line', title: { eu: 'Puntu batetik zuzen baterako distantzia', es: 'Distancia de un punto a una recta', en: 'Distance from a point to a line', ar: 'المسافة من نقطة إلى مستقيم' } }
const DISTANCE = { unit: VECTORS_4, topic: 'distance', title: { eu: 'Bi punturen arteko distantzia', es: 'Distancia entre dos puntos', en: 'Distance between two points', ar: 'المسافة بين نقطتين' } }

/** The lessons without what they tell (explanation, example…), which lives in lessonTexts.ts */
const baseTopics: Omit<UnitTopic, 'explanation' | 'example'>[] = [
    /* ---------- 1. Loci ---------- */
    {
        id: 'perpendicular-bisector',
        stage: 'loci',
        title: say('Erdibitzailea leku geometriko gisa', 'La mediatriz como lugar geométrico', 'محور القطعة محلًّا هندسيًّا', 'The perpendicular bisector as a locus'),
        goal: say('Leku geometriko baten ekuazioa aurkitzea, haren baldintza koordenatuetara itzuliz: erdibitzailea, $A$ eta $B$ puntuetatik distantzia berera dauden puntuak.', 'Hallar la ecuación de un lugar geométrico traduciendo su condición a coordenadas: la mediatriz, los puntos a igual distancia de $A$ y de $B$.', 'إيجاد معادلة محل هندسي بترجمة شرطه إلى الإحداثيات: محور القطعة، أي النقاط التي تبعد المسافة نفسها عن $A$ و$B$.', 'Find the equation of a locus by writing its condition in coordinates: the perpendicular bisector, the points the same distance from $A$ and from $B$.'),
        needs: [
            { unit: 'dbh3/geometria-plana', topic: 'perpendicular-bisector', title: { eu: 'Segmentu baten erdibitzailea', es: 'La mediatriz de un segmento', en: 'The perpendicular bisector', ar: 'المنصّف العمودي لقطعة' } },
            { unit: VECTORS_4, topic: 'bisector', title: { eu: 'Zuzenki baten erdibitzailea', es: 'Mediatriz de un segmento', en: 'Perpendicular bisector of a segment', ar: 'محور القطعة' } }
        ],
        problem: say('Aurkitu $P(x,y)$ puntuen leku geometrikoa, puntu horiek $A(1,-2)$ eta $B(5,4)$ puntuetatik distantzia berera badaude.', 'Halla el lugar geométrico de los puntos $P(x,y)$ que están a la misma distancia de $A(1,-2)$ y de $B(5,4)$.', 'أوجد المحل الهندسي للنقاط $P(x,y)$ التي تبعد المسافة نفسها عن $A(1,-2)$ و$B(5,4)$.', 'Find the locus of the points $P(x,y)$ at the same distance from $A(1,-2)$ and from $B(5,4)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Baldintza: $d(P,A)=d(P,B)$; bi aldeak karratura jaso.', 'Condición: $d(P,A)=d(P,B)$; eleva los dos lados al cuadrado.', 'الشرط: $d(P,A)=d(P,B)$؛ ربّع الطرفين.', 'Condition: $d(P,A)=d(P,B)$; square both sides.'), math: same('$(x-1)^2+(y+2)^2=(x-5)^2+(y-4)^2$') },
            { text: say('Garatu: $x^2$ eta $y^2$ desagertzen dira.', 'Desarrolla: $x^2$ e $y^2$ se van.', 'انشر: يختفي $x^2$ و$y^2$.', 'Expand: $x^2$ and $y^2$ cancel.'), math: same('$-2x+1+4y+4=-10x+25-8y+16$') },
            { text: say('Eraman dena alde batera eta sinplifikatu.', 'Pasa todo a un lado y simplifica.', 'انقل كل شيء إلى طرف واحد وبسّط.', 'Move everything to one side and simplify.'), math: same('$8x+12y-36=0\\ \\to\\ 2x+3y-9=0$') }
        ],
        takeaway: say('Leku geometrikoa baldintza bat betetzen duten puntuen multzoa da. Haren ekuazioa aurkitzeko, hartu $P(x,y)$, idatzi baldintza distantziekin eta sinplifikatu: $AB$ zuzenkiaren erdibitzailea $d(P,A)=d(P,B)$ baldintzatik ateratzen da.', 'Un lugar geométrico es el conjunto de puntos que cumplen una condición. Para hallar su ecuación, toma $P(x,y)$, escribe la condición con distancias y simplifica: la mediatriz de $AB$ sale de $d(P,A)=d(P,B)$.', 'المحل الهندسي مجموعة النقاط التي تحقق شرطًا. ولإيجاد معادلته خذ $P(x,y)$ واكتب الشرط بالمسافات وبسّط: محور $AB$ ينتج من $d(P,A)=d(P,B)$.', 'A locus is the set of points that meet a condition. To find its equation, take $P(x,y)$, write the condition with distances and simplify: the perpendicular bisector of $AB$ comes from $d(P,A)=d(P,B)$.'),
        figure: (language) => <LociBisectorFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'angle-bisectors',
        stage: 'loci',
        title: say('Bi zuzenen erdikariak', 'Las bisectrices de dos rectas', 'منصّفا زاويتي مستقيمين', 'The angle bisectors of two lines'),
        goal: say('Ebakitzen diren bi zuzenen bi erdikariak aurkitzea: bi zuzenetatik distantzia berera dauden puntuak.', 'Hallar las dos bisectrices de dos rectas que se cortan: los puntos a la misma distancia de las dos.', 'إيجاد المنصّفين لمستقيمين متقاطعين: النقاط التي تبعد المسافة نفسها عنهما.', 'Find the two angle bisectors of two crossing lines: the points the same distance from both.'),
        needs: [
            { unit: 'dbh3/geometria-plana', topic: 'angle-bisector', title: { eu: 'Angelu baten erdikaria', es: 'La bisectriz de un ángulo', en: 'The angle bisector', ar: 'منصّف الزاوية' } },
            POINT_LINE
        ],
        problem: say('Aurkitu $r$: $3x-4y+2=0$ eta $s$: $4x+3y-1=0$ zuzenen erdikariak.', 'Halla las bisectrices de las rectas $r$: $3x-4y+2=0$ y $s$: $4x+3y-1=0$.', 'أوجد منصّفي المستقيمين $r$: $3x-4y+2=0$ و$s$: $4x+3y-1=0$.', 'Find the angle bisectors of the lines $r$: $3x-4y+2=0$ and $s$: $4x+3y-1=0$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Baldintza: $d(P,r)=d(P,s)$; bi zuzenek $\\sqrt{A^2+B^2}=5$ dute.', 'Condición: $d(P,r)=d(P,s)$; las dos rectas tienen $\\sqrt{A^2+B^2}=5$.', 'الشرط: $d(P,r)=d(P,s)$؛ وللمستقيمين $\\sqrt{A^2+B^2}=5$.', 'Condition: $d(P,r)=d(P,s)$; both lines have $\\sqrt{A^2+B^2}=5$.'), math: same('$\\frac{|3x-4y+2|}{5}=\\frac{|4x+3y-1|}{5}$') },
            { text: say('Balio absolutuak kentzean bi zeinu daude.', 'Al quitar los valores absolutos hay dos signos.', 'عند إزالة القيم المطلقة توجد إشارتان.', 'Removing the absolute values gives two signs.'), math: same('$3x-4y+2=\\pm(4x+3y-1)$') },
            { text: say('Bi erdikariak, elkarren perpendikularrak.', 'Las dos bisectrices, perpendiculares entre sí.', 'المنصّفان، وهما متعامدان.', 'The two bisectors, perpendicular to each other.'), math: same('$x+7y-3=0\\qquad 7x-y+1=0$') }
        ],
        takeaway: say('$r$ eta $s$ zuzenen erdikariak bi zuzenetatik distantzia berera dauden puntuak dira: $d(P,r)=d(P,s)$. Balio absolutuak bi zuzen ematen ditu, elkarren perpendikularrak.', 'Las bisectrices de $r$ y $s$ son los puntos a la misma distancia de las dos rectas: $d(P,r)=d(P,s)$. El valor absoluto da dos rectas, perpendiculares entre sí.', 'منصّفا $r$ و$s$ هما النقاط التي تبعد المسافة نفسها عن المستقيمين: $d(P,r)=d(P,s)$. والقيمة المطلقة تعطي مستقيمين متعامدين.', 'The bisectors of $r$ and $s$ are the points the same distance from both lines: $d(P,r)=d(P,s)$. The absolute value gives two lines, perpendicular to each other.'),
        figure: (language) => <AngleBisectorsFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'distance-loci',
        stage: 'loci',
        title: say('Distantziekin emandako lekuak', 'Lugares dados por distancias', 'محلات تحددها المسافات', 'Loci given by distances'),
        goal: say('Distantziekin emandako leku geometrikoak aurkitzea: zuzen batetik edo puntu batetik distantzia finkora dauden puntuak.', 'Hallar lugares geométricos dados por distancias: los puntos a una distancia fija de una recta o de un punto.', 'إيجاد محلات هندسية تحددها المسافات: النقاط على بعد ثابت من مستقيم أو من نقطة.', 'Find loci given by distances: the points at a fixed distance from a line or from a point.'),
        needs: [{ unit: GEOMETRY_1, topic: 'parallel-lines', title: { eu: 'Bi zuzen paraleloren arteko distantzia', es: 'Distancia entre dos rectas paralelas', en: 'Distance between two parallel lines', ar: 'المسافة بين مستقيمين متوازيين' } }],
        problem: say('Aurkitu $r$: $3x+4y-1=0$ zuzenerako distantzia $2$ duten puntuen leku geometrikoa.', 'Halla el lugar de los puntos cuya distancia a la recta $r$: $3x+4y-1=0$ es $2$.', 'أوجد المحل الهندسي للنقاط التي بعدها عن المستقيم $r$: $3x+4y-1=0$ يساوي $2$.', 'Find the locus of the points whose distance from the line $r$: $3x+4y-1=0$ is $2$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Baldintza, distantziaren formularekin.', 'La condición, con la fórmula de la distancia.', 'الشرط بصيغة المسافة.', 'The condition, with the distance formula.'), math: same('$\\frac{|3x+4y-1|}{5}=2$') },
            { text: say('Bi kasu balio absolutuarentzat.', 'Dos casos para el valor absoluto.', 'حالتان للقيمة المطلقة.', 'Two cases for the absolute value.'), math: same('$3x+4y-1=\\pm 10$') },
            { text: say('$r$ zuzenaren bi paralelo, alde banatan.', 'Dos paralelas a $r$, una a cada lado.', 'موازيان لـ $r$، واحد في كل جهة.', 'Two parallels to $r$, one on each side.'), math: same('$3x+4y-11=0\\qquad 3x+4y+9=0$') }
        ],
        takeaway: say('Zuzen batetik $d$ distantziara dauden puntuek zuzen horren bi paralelo osatzen dituzte; $d$ distantziara $C$ puntutik daudenek, $C$ zentroko eta $d$ erradioko zirkunferentzia.', 'Los puntos a distancia $d$ de una recta forman dos rectas paralelas a ella; los puntos a distancia $d$ de un punto $C$ forman la circunferencia de centro $C$ y radio $d$.', 'النقاط التي تبعد $d$ عن مستقيم تكوّن مستقيمين موازيين له؛ والنقاط التي تبعد $d$ عن نقطة $C$ تكوّن الدائرة التي مركزها $C$ ونصف قطرها $d$.', 'The points at distance $d$ from a line form two lines parallel to it; the points at distance $d$ from a point $C$ form the circle with centre $C$ and radius $d$.'),
        figure: (language) => <DistanceLociFigure language={language} />,
        figureAfterSteps: true
    },

    /* ---------- 2. The circle ---------- */
    {
        id: 'circle-equation',
        stage: 'circle',
        title: say('Zirkunferentziaren ekuazioa', 'Ecuación de la circunferencia', 'معادلة الدائرة', 'Equation of a circle'),
        goal: say('Zirkunferentzia baten ekuazioa idaztea zentrotik eta erradiotik abiatuta, baita haiek aurkitu behar direnean ere, adibidez diametro batetik.', 'Escribir la ecuación de una circunferencia a partir de su centro y su radio, también cuando hay que hallarlos, por ejemplo con un diámetro.', 'كتابة معادلة دائرة انطلاقًا من مركزها ونصف قطرها، حتى عندما يجب إيجادهما، مثلًا من قطر.', 'Write the equation of a circle from its centre and radius, also when you have to find them first, for example from a diameter.'),
        needs: [
            { unit: VECTORS_4, topic: 'circle', title: { eu: 'Zirkunferentziaren ekuazioa', es: 'Ecuación de la circunferencia', en: 'Equation of the circumference', ar: 'معادلة الدائرة' } },
            { unit: GEOMETRY_1, topic: 'midpoint-symmetric', title: { eu: 'Erdiko puntua eta puntu simetrikoa', es: 'Punto medio y punto simétrico', en: 'Midpoint and symmetric point', ar: 'المنتصف والنقطة النظيرة' } }
        ],
        problem: say('Aurkitu $AB$ diametroa duen zirkunferentziaren ekuazioa, $A(-1,2)$ eta $B(5,-6)$ izanik.', 'Halla la ecuación de la circunferencia de diámetro $AB$, con $A(-1,2)$ y $B(5,-6)$.', 'أوجد معادلة الدائرة التي قطرها $AB$ حيث $A(-1,2)$ و$B(5,-6)$.', 'Find the equation of the circle with diameter $AB$, where $A(-1,2)$ and $B(5,-6)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zentroa diametroaren erdiko puntua da.', 'El centro es el punto medio del diámetro.', 'المركز منتصف القطر.', 'The centre is the midpoint of the diameter.'), math: same('$C=\\left(\\frac{-1+5}{2},\\frac{2-6}{2}\\right)=(2,-2)$') },
            { text: say('Erradioa diametroaren erdia da.', 'El radio es la mitad del diámetro.', 'نصف القطر هو نصف طول القطر.', 'The radius is half the diameter.'), math: same('$r=\\frac{\\sqrt{36+64}}{2}=5$') },
            { text: say('Ekuazioa.', 'La ecuación.', 'المعادلة.', 'The equation.'), math: same('$(x-2)^2+(y+2)^2=25$') }
        ],
        takeaway: say('$C(a,b)$ zentroko eta $r$ erradioko zirkunferentzia $r$ distantziara $C$ puntutik dauden puntuen lekua da: $(x-a)^2+(y-b)^2=r^2$.', 'La circunferencia de centro $C(a,b)$ y radio $r$ es el lugar de los puntos a distancia $r$ de $C$: $(x-a)^2+(y-b)^2=r^2$.', 'الدائرة التي مركزها $C(a,b)$ ونصف قطرها $r$ هي محل النقاط التي تبعد $r$ عن $C$: $(x-a)^2+(y-b)^2=r^2$.', 'The circle with centre $C(a,b)$ and radius $r$ is the locus of the points at distance $r$ from $C$: $(x-a)^2+(y-b)^2=r^2$.'),
        figure: (language) => <DiameterCircleFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'circle-general',
        stage: 'circle',
        title: say('Zirkunferentziaren ekuazio orokorra', 'Ecuación general de la circunferencia', 'المعادلة العامة للدائرة', 'General equation of a circle'),
        goal: say('$x^2+y^2+Ax+By+C=0$ ekuaziotik zentrora eta erradiora pasatzea karratuak osatuz, eta ekuazio bat zirkunferentzia den jakitea.', 'Pasar de $x^2+y^2+Ax+By+C=0$ al centro y al radio completando cuadrados, y saber si una ecuación es una circunferencia.', 'الانتقال من $x^2+y^2+Ax+By+C=0$ إلى المركز ونصف القطر بإكمال المربعات، ومعرفة هل معادلة ما دائرة.', 'Go from $x^2+y^2+Ax+By+C=0$ to the centre and the radius by completing the square, and tell whether an equation is a circle.'),
        problem: say('Aurkitu $x^2+y^2+4x-6y-3=0$ zirkunferentziaren zentroa eta erradioa.', 'Halla el centro y el radio de la circunferencia $x^2+y^2+4x-6y-3=0$.', 'أوجد مركز الدائرة $x^2+y^2+4x-6y-3=0$ ونصف قطرها.', 'Find the centre and the radius of the circle $x^2+y^2+4x-6y-3=0$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Taldekatu $x$ aldagaiaren gaiak eta $y$ aldagaiarenak, eta osatu karratuak.', 'Agrupa los términos en $x$ y en $y$, y completa cuadrados.', 'اجمع حدود $x$ وحدود $y$ وأكمل المربعين.', 'Group the terms in $x$ and in $y$, and complete the squares.'), math: same('$(x^2+4x+4)+(y^2-6y+9)=3+4+9$') },
            { text: say('Idatzi karratuak.', 'Escribe los cuadrados.', 'اكتب المربعين.', 'Write the squares.'), math: same('$(x+2)^2+(y-3)^2=16$') },
            { text: say('Zentroa eta erradioa.', 'Centro y radio.', 'المركز ونصف القطر.', 'Centre and radius.'), math: same('$(-2,3)\\qquad r=\\sqrt{16}=4$') }
        ],
        takeaway: say('$x^2+y^2+Ax+By+C=0$ ekuazioan karratuak osatzen dira: zentroa $\\left(-\\frac{A}{2},-\\frac{B}{2}\\right)$ da, eta $r^2=\\frac{A^2}{4}+\\frac{B^2}{4}-C$. Zirkunferentzia da $r^2>0$ bada bakarrik.', 'En $x^2+y^2+Ax+By+C=0$ se completan cuadrados: el centro es $\\left(-\\frac{A}{2},-\\frac{B}{2}\\right)$ y $r^2=\\frac{A^2}{4}+\\frac{B^2}{4}-C$. Solo es una circunferencia si $r^2>0$.', 'في $x^2+y^2+Ax+By+C=0$ نكمل المربعات: المركز $\\left(-\\frac{A}{2},-\\frac{B}{2}\\right)$ و$r^2=\\frac{A^2}{4}+\\frac{B^2}{4}-C$. ولا تكون دائرة إلا إذا كان $r^2>0$.', 'In $x^2+y^2+Ax+By+C=0$ you complete the squares: the centre is $\\left(-\\frac{A}{2},-\\frac{B}{2}\\right)$ and $r^2=\\frac{A^2}{4}+\\frac{B^2}{4}-C$. It is only a circle if $r^2>0$.'),
        figure: (language) => <CompleteSquareFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'circle-line',
        stage: 'circle',
        title: say('Zuzen baten posizioa eta ukitzailea', 'Posición de una recta y tangente', 'وضع مستقيم والمماس', 'Position of a line and the tangent'),
        goal: say('Zuzen batek zirkunferentzia ebakitzen, ukitzen edo ez ukitzen duen erabakitzea, zentrotik zuzenerako $d$ distantzia $r$ erradioarekin konparatuz, eta puntu bateko ukitzailea aurkitzea.', 'Decidir si una recta corta, toca o no toca a una circunferencia comparando la distancia $d$ del centro a la recta con el radio $r$, y hallar la tangente en un punto.', 'تحديد هل يقطع مستقيم دائرة أو يمسّها أو لا يمسّها بمقارنة المسافة $d$ من المركز إلى المستقيم بنصف القطر $r$، وإيجاد المماس في نقطة.', 'Decide whether a line cuts, touches or misses a circle by comparing the distance $d$ from the centre to the line with the radius $r$, and find the tangent at a point.'),
        needs: [POINT_LINE],
        problem: say('Aurkitu $(x-1)^2+(y-2)^2=25$ zirkunferentziaren ukitzailea haren $P(4,6)$ puntuan.', 'Halla la recta tangente a la circunferencia $(x-1)^2+(y-2)^2=25$ en su punto $P(4,6)$.', 'أوجد مماس الدائرة $(x-1)^2+(y-2)^2=25$ في نقطتها $P(4,6)$.', 'Find the tangent to the circle $(x-1)^2+(y-2)^2=25$ at its point $P(4,6)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ukitzailea $CP$ erradioarekiko perpendikularra da.', 'La tangente es perpendicular al radio $CP$.', 'المماس عمودي على نصف القطر $CP$.', 'The tangent is perpendicular to the radius $CP$.'), math: same('$\\overrightarrow{CP}=(4-1,6-2)=(3,4)$') },
            { text: say('$P$ puntutik doan zuzena, $\\overrightarrow{CP}$ bektore normalarekin.', 'Recta por $P$ con vector normal $\\overrightarrow{CP}$.', 'المستقيم المار بـ $P$ بالمتجه الناظمي $\\overrightarrow{CP}$.', 'The line through $P$ with normal vector $\\overrightarrow{CP}$.'), math: same('$3(x-4)+4(y-6)=0\\ \\to\\ 3x+4y-36=0$') },
            { text: say('Egiaztatu: zentrotik ukitzailerako distantzia erradioa da.', 'Comprueba: su distancia al centro es el radio.', 'تحقق: بعده عن المركز يساوي نصف القطر.', 'Check: its distance from the centre is the radius.'), math: same('$d=\\frac{|3\\cdot 1+4\\cdot 2-36|}{5}=\\frac{25}{5}=5$') }
        ],
        takeaway: say('Konparatu zentrotik zuzenerako $d$ distantzia $r$ erradioarekin: $d<r$ bada, zuzena ebakitzailea da; $d=r$ bada, ukitzailea; $d>r$ bada, kanpokoa. $P$ puntuko ukitzailea $CP$ erradioarekiko perpendikularra da.', 'Compara la distancia $d$ del centro a la recta con el radio $r$: si $d<r$ la recta es secante, si $d=r$ es tangente y si $d>r$ es exterior. La tangente en $P$ es perpendicular al radio $CP$.', 'قارن المسافة $d$ من المركز إلى المستقيم بنصف القطر $r$: إذا كان $d<r$ فالمستقيم قاطع، وإذا كان $d=r$ فهو مماس، وإذا كان $d>r$ فهو خارجي. والمماس في $P$ عمودي على نصف القطر $CP$.', 'Compare the distance $d$ from the centre to the line with the radius $r$: if $d<r$ the line is a secant, if $d=r$ it is a tangent and if $d>r$ it is outside. The tangent at $P$ is perpendicular to the radius $CP$.'),
        figure: (language) => <TangentFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'two-circles',
        stage: 'circle',
        title: say('Bi zirkunferentziaren posizioa', 'Posición de dos circunferencias', 'وضع دائرتين', 'Position of two circles'),
        goal: say('Bi zirkunferentzia ebakitzen diren, ukitzaileak, kanpokoak edo barrukoak diren jakitea, zentroen arteko distantzia erradioen baturarekin eta kendurarekin konparatuz.', 'Saber si dos circunferencias se cortan, son tangentes, exteriores o interiores comparando la distancia entre los centros con la suma y la diferencia de los radios.', 'معرفة هل دائرتان متقاطعتان أو متماستان أو متباعدتان أو إحداهما داخل الأخرى بمقارنة المسافة بين المركزين بمجموع نصفي القطرين وفرقهما.', 'Tell whether two circles cut, touch, are apart or one is inside the other by comparing the distance between the centres with the sum and the difference of the radii.'),
        needs: [DISTANCE],
        problem: say('Nolakoak dira $(x-1)^2+(y-1)^2=4$ eta $(x-4)^2+(y-5)^2=9$ zirkunferentziak?', '¿Cómo son las circunferencias $(x-1)^2+(y-1)^2=4$ y $(x-4)^2+(y-5)^2=9$?', 'ما وضع الدائرتين $(x-1)^2+(y-1)^2=4$ و$(x-4)^2+(y-5)^2=9$؟', 'How are the circles $(x-1)^2+(y-1)^2=4$ and $(x-4)^2+(y-5)^2=9$ placed?'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zentroak eta erradioak.', 'Centros y radios.', 'المركزان ونصفا القطرين.', 'Centres and radii.'), math: same('$C_1(1,1),\\ r_1=2\\qquad C_2(4,5),\\ r_2=3$') },
            { text: say('Zentroen arteko distantzia.', 'Distancia entre los centros.', 'المسافة بين المركزين.', 'Distance between the centres.'), math: same('$d=\\sqrt{3^2+4^2}=5$') },
            { text: say('Erradioen baturaren berdina da: kanpotik ukitzaileak dira.', 'Es igual a la suma de los radios: son tangentes exteriores.', 'تساوي مجموع نصفي القطرين: متماستان من الخارج.', 'It equals the sum of the radii: they are tangent on the outside.'), math: same('$d=r_1+r_2=2+3$') }
        ],
        takeaway: say('Konparatu zentroen arteko $d$ distantzia $r_1+r_2$ eta $|r_1-r_2|$ zenbakiekin: bien artean, ebakitzen dira; horietako baten berdina bada, ukitzaileak dira; tarte horretatik kanpo, ez dira ukitzen.', 'Compara la distancia $d$ entre los centros con $r_1+r_2$ y con $|r_1-r_2|$: entre los dos, se cortan; si es igual a uno de ellos, son tangentes; fuera de ese intervalo, no se tocan.', 'قارن المسافة $d$ بين المركزين بـ $r_1+r_2$ و$|r_1-r_2|$: بينهما تتقاطعان؛ وإذا ساوت أحدهما تتماسان؛ وخارج هذه الفترة لا تتلامسان.', 'Compare the distance $d$ between the centres with $r_1+r_2$ and with $|r_1-r_2|$: between them, they cut; equal to one of them, they are tangent; outside that range, they do not touch.'),
        figure: (language) => <TwoCirclesFigure language={language} />,
        figureAfterSteps: true
    },

    /* ---------- 3. The ellipse ---------- */
    {
        id: 'ellipse-definition',
        stage: 'ellipse',
        title: say('Elipsea eta haren ekuazioa', 'La elipse y su ecuación', 'القطع الناقص ومعادلته', 'The ellipse and its equation'),
        goal: say('Elipsea ezagutzea $P$ puntuen leku geometriko gisa, bi fokutarako distantzien batura konstantea denean, $2a$, eta haren ekuazio laburtua idaztea.', 'Reconocer la elipse como el lugar de los puntos $P$ cuya suma de distancias a dos focos es constante, $2a$, y escribir su ecuación reducida.', 'التعرف على القطع الناقص بوصفه محل النقاط $P$ التي مجموع بعديها عن بؤرتين ثابت $2a$، وكتابة معادلته المختصرة.', 'Recognise the ellipse as the locus of the points $P$ whose sum of distances to two foci is constant, $2a$, and write its reduced equation.'),
        needs: [DISTANCE],
        problem: say('Aurkitu $F(4,0)$ eta $F\'(-4,0)$ fokuak dituen eta fokuetarako distantzien batura $10$ duen elipsearen ekuazioa.', 'Halla la ecuación de la elipse de focos $F(4,0)$ y $F\'(-4,0)$ en la que la suma de distancias a los focos es $10$.', 'أوجد معادلة القطع الناقص الذي بؤرتاه $F(4,0)$ و$F\'(-4,0)$ ومجموع بعدي نقاطه عن البؤرتين $10$.', 'Find the equation of the ellipse with foci $F(4,0)$ and $F\'(-4,0)$ in which the sum of the distances to the foci is $10$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Batura $2a$ da, eta fokuak zentrotik $c$ distantziara daude.', 'La suma es $2a$ y los focos están a distancia $c$ del centro.', 'المجموع $2a$ والبؤرتان على بعد $c$ من المركز.', 'The sum is $2a$ and the foci are at distance $c$ from the centre.'), math: same('$2a=10\\ \\to\\ a=5\\qquad c=4$') },
            { text: say('Aurkitu $b$, $a^2=b^2+c^2$ erabiliz.', 'Halla $b$ con $a^2=b^2+c^2$.', 'أوجد $b$ من $a^2=b^2+c^2$.', 'Find $b$ with $a^2=b^2+c^2$.'), math: same('$b^2=25-16=9\\ \\to\\ b=3$') },
            { text: say('Ekuazio laburtua.', 'Ecuación reducida.', 'المعادلة المختصرة.', 'Reduced equation.'), math: same('$\\frac{x^2}{25}+\\frac{y^2}{9}=1$') }
        ],
        takeaway: say('Elipsea $P$ puntuen lekua da, $PF+PF\'=2a$ betetzen dutenena. Fokuak $F(c,0)$ eta $F\'(-c,0)$ badira, haren ekuazioa $\\frac{x^2}{a^2}+\\frac{y^2}{b^2}=1$ da, $a^2=b^2+c^2$ izanik.', 'La elipse es el lugar de los puntos $P$ con $PF+PF\'=2a$. Si los focos son $F(c,0)$ y $F\'(-c,0)$, su ecuación es $\\frac{x^2}{a^2}+\\frac{y^2}{b^2}=1$, con $a^2=b^2+c^2$.', 'القطع الناقص محل النقاط $P$ التي تحقق $PF+PF\'=2a$. وإذا كانت البؤرتان $F(c,0)$ و$F\'(-c,0)$ فمعادلته $\\frac{x^2}{a^2}+\\frac{y^2}{b^2}=1$ مع $a^2=b^2+c^2$.', 'The ellipse is the locus of the points $P$ with $PF+PF\'=2a$. If the foci are $F(c,0)$ and $F\'(-c,0)$, its equation is $\\frac{x^2}{a^2}+\\frac{y^2}{b^2}=1$, with $a^2=b^2+c^2$.'),
        figure: (language) => <EllipseFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'ellipse-elements',
        stage: 'ellipse',
        title: say('Elipsearen elementuak eta eszentrikotasuna', 'Elementos y excentricidad de la elipse', 'عناصر القطع الناقص واختلافه المركزي', 'Elements and eccentricity of an ellipse'),
        goal: say('Ekuazio laburtuan ardatzerdiak, erpinak, fokuak eta $e=\\frac{c}{a}$ eszentrikotasuna irakurtzea, baita ardatz nagusia bertikala denean ere.', 'Leer en la ecuación reducida los semiejes, los vértices, los focos y la excentricidad $e=\\frac{c}{a}$, también si el eje mayor es vertical.', 'قراءة نصفي المحورين والرؤوس والبؤرتين والاختلاف المركزي $e=\\frac{c}{a}$ في المعادلة المختصرة، حتى إذا كان المحور الأكبر رأسيًا.', 'Read the semi-axes, the vertices, the foci and the eccentricity $e=\\frac{c}{a}$ in the reduced equation, also when the major axis is vertical.'),
        problem: say('Aurkitu $\\frac{x^2}{16}+\\frac{y^2}{25}=1$ elipsearen erpinak, fokuak eta eszentrikotasuna.', 'Halla los vértices, los focos y la excentricidad de la elipse $\\frac{x^2}{16}+\\frac{y^2}{25}=1$.', 'أوجد رؤوس القطع الناقص $\\frac{x^2}{16}+\\frac{y^2}{25}=1$ وبؤرتيه واختلافه المركزي.', 'Find the vertices, the foci and the eccentricity of the ellipse $\\frac{x^2}{16}+\\frac{y^2}{25}=1$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Izendatzaile handiena $y^2$ gaiaren azpian dago: ardatz nagusia bertikala da.', 'El denominador mayor está bajo $y^2$: el eje mayor es vertical.', 'أكبر مقام تحت $y^2$: المحور الأكبر رأسي.', 'The greater denominator is under $y^2$: the major axis is vertical.'), math: same('$a=5\\qquad b=4$') },
            { text: say('Erpinak $(0,\\pm 5)$ eta $(\\pm 4,0)$; fokuak ardatz nagusian.', 'Vértices $(0,\\pm 5)$ y $(\\pm 4,0)$; los focos, en el eje mayor.', 'الرؤوس $(0,\\pm 5)$ و$(\\pm 4,0)$؛ والبؤرتان على المحور الأكبر.', 'Vertices $(0,\\pm 5)$ and $(\\pm 4,0)$; the foci, on the major axis.'), math: same('$c=\\sqrt{25-16}=3\\qquad F(0,\\pm 3)$') },
            { text: say('Eszentrikotasuna.', 'Excentricidad.', 'الاختلاف المركزي.', 'Eccentricity.'), math: same('$e=\\frac{c}{a}=\\frac{3}{5}=0{,}6$') }
        ],
        takeaway: say('Elipsean $a$ ardatzerdi nagusia da, $b$ txikia eta $c$ foku-erdidistantzia, $a^2=b^2+c^2$ izanik. Ardatz nagusia izendatzaile handiena dagoen aldean doa. $e=\\frac{c}{a}$ eszentrikotasuna $0$ eta $1$ artean dago: $0$ zenbakitik zenbat eta hurbilago, orduan eta biribilagoa.', 'En la elipse, $a$ es el semieje mayor, $b$ el menor y $c$ la semidistancia focal, con $a^2=b^2+c^2$. El eje mayor va donde está el denominador mayor. La excentricidad $e=\\frac{c}{a}$ está entre $0$ y $1$: cuanto más cerca de $0$, más redonda.', 'في القطع الناقص $a$ نصف المحور الأكبر و$b$ نصف المحور الأصغر و$c$ نصف البعد البؤري، مع $a^2=b^2+c^2$. ويكون المحور الأكبر حيث المقام الأكبر. والاختلاف المركزي $e=\\frac{c}{a}$ بين $0$ و$1$: وكلما اقترب من $0$ كان أكثر استدارة.', 'In an ellipse, $a$ is the semi-major axis, $b$ the semi-minor axis and $c$ half the focal distance, with $a^2=b^2+c^2$. The major axis goes where the greater denominator is. The eccentricity $e=\\frac{c}{a}$ is between $0$ and $1$: the closer to $0$, the rounder.'),
        figure: (language) => <EllipseElementsFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'ellipse-shifted',
        stage: 'ellipse',
        title: say('Zentroa jatorritik kanpo duen elipsea', 'Elipse con el centro fuera del origen', 'قطع ناقص مركزه خارج الأصل', 'An ellipse centred away from the origin'),
        goal: say('Elipse lekualdatu baten zentroa, ardatzerdiak eta fokuak irakurtzea: $\\frac{(x-x_0)^2}{a^2}+\\frac{(y-y_0)^2}{b^2}=1$.', 'Leer el centro, los semiejes y los focos de una elipse trasladada, $\\frac{(x-x_0)^2}{a^2}+\\frac{(y-y_0)^2}{b^2}=1$.', 'قراءة مركز قطع ناقص مُزاح ونصفي محوريه وبؤرتيه: $\\frac{(x-x_0)^2}{a^2}+\\frac{(y-y_0)^2}{b^2}=1$.', 'Read the centre, the semi-axes and the foci of a shifted ellipse, $\\frac{(x-x_0)^2}{a^2}+\\frac{(y-y_0)^2}{b^2}=1$.'),
        problem: say('Aurkitu $\\frac{(x-2)^2}{25}+\\frac{(y+1)^2}{9}=1$ elipsearen zentroa eta fokuak.', 'Halla el centro y los focos de la elipse $\\frac{(x-2)^2}{25}+\\frac{(y+1)^2}{9}=1$.', 'أوجد مركز القطع الناقص $\\frac{(x-2)^2}{25}+\\frac{(y+1)^2}{9}=1$ وبؤرتيه.', 'Find the centre and the foci of the ellipse $\\frac{(x-2)^2}{25}+\\frac{(y+1)^2}{9}=1$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Zentroa: parentesietako zenbakiak, zeinua aldatuta.', 'Centro: los números de los paréntesis, con el signo cambiado.', 'المركز: أعداد القوسين بإشارة معكوسة.', 'Centre: the numbers in the brackets, with the sign changed.'), math: same('$(x_0,y_0)=(2,-1)$') },
            { text: say('Ardatzerdiak eta $c$; ardatz nagusia horizontala da.', 'Semiejes y $c$; el eje mayor es horizontal.', 'نصفا المحورين و$c$؛ والمحور الأكبر أفقي.', 'Semi-axes and $c$; the major axis is horizontal.'), math: same('$a=5\\qquad b=3\\qquad c=\\sqrt{25-9}=4$') },
            { text: say('Fokuak: zentrotik $c$ distantziara, horizontalean.', 'Focos: a distancia $c$ del centro, en horizontal.', 'البؤرتان: على بعد $c$ من المركز أفقيًا.', 'Foci: at distance $c$ from the centre, horizontally.'), math: same('$F(2+4,-1)=(6,-1)\\qquad F\'(2-4,-1)=(-2,-1)$') }
        ],
        takeaway: say('$(x_0,y_0)$ zentroko elipsea $\\frac{(x-x_0)^2}{a^2}+\\frac{(y-y_0)^2}{b^2}=1$ da: jatorrian zentroa duena marrazten da eta lekualdatu; fokuak zentroarekin batera mugitzen dira.', 'La elipse de centro $(x_0,y_0)$ es $\\frac{(x-x_0)^2}{a^2}+\\frac{(y-y_0)^2}{b^2}=1$: se dibuja la de centro el origen y se traslada; los focos se mueven con el centro.', 'القطع الناقص الذي مركزه $(x_0,y_0)$ هو $\\frac{(x-x_0)^2}{a^2}+\\frac{(y-y_0)^2}{b^2}=1$: نرسم القطع الذي مركزه الأصل ثم نزيحه؛ وتتحرك البؤرتان مع المركز.', 'The ellipse with centre $(x_0,y_0)$ is $\\frac{(x-x_0)^2}{a^2}+\\frac{(y-y_0)^2}{b^2}=1$: draw the one centred at the origin and shift it; the foci move with the centre.'),
        figure: (language) => <ShiftedEllipseFigure language={language} />,
        figureAfterSteps: true
    },

    /* ---------- 4. The hyperbola ---------- */
    {
        id: 'hyperbola-definition',
        stage: 'hyperbola',
        title: say('Hiperbola eta haren ekuazioa', 'La hipérbola y su ecuación', 'القطع الزائد ومعادلته', 'The hyperbola and its equation'),
        goal: say('Hiperbola ezagutzea $P$ puntuen leku geometriko gisa, bi fokutarako distantzien kendura konstantea denean, $2a$, eta haren ekuazio laburtua idaztea.', 'Reconocer la hipérbola como el lugar de los puntos $P$ cuya diferencia de distancias a dos focos es constante, $2a$, y escribir su ecuación reducida.', 'التعرف على القطع الزائد بوصفه محل النقاط $P$ التي فرق بعديها عن بؤرتين ثابت $2a$، وكتابة معادلته المختصرة.', 'Recognise the hyperbola as the locus of the points $P$ whose difference of distances to two foci is constant, $2a$, and write its reduced equation.'),
        problem: say('Aurkitu $F(5,0)$ eta $F\'(-5,0)$ fokuak dituen eta fokuetarako distantzien kendura $6$ duen hiperbolaren ekuazioa.', 'Halla la ecuación de la hipérbola de focos $F(5,0)$ y $F\'(-5,0)$ en la que la diferencia de distancias a los focos es $6$.', 'أوجد معادلة القطع الزائد الذي بؤرتاه $F(5,0)$ و$F\'(-5,0)$ وفرق بعدي نقاطه عن البؤرتين $6$.', 'Find the equation of the hyperbola with foci $F(5,0)$ and $F\'(-5,0)$ in which the difference of the distances to the foci is $6$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Kendura $2a$ da.', 'La diferencia es $2a$.', 'الفرق $2a$.', 'The difference is $2a$.'), math: same('$2a=6\\ \\to\\ a=3\\qquad c=5$') },
            { text: say('Hiperbolan, $c^2=a^2+b^2$.', 'En la hipérbola, $c^2=a^2+b^2$.', 'في القطع الزائد $c^2=a^2+b^2$.', 'In a hyperbola, $c^2=a^2+b^2$.'), math: same('$b^2=25-9=16\\ \\to\\ b=4$') },
            { text: say('Ekuazio laburtua, minus zeinu batekin.', 'Ecuación reducida, con un signo menos.', 'المعادلة المختصرة بإشارة ناقص.', 'Reduced equation, with a minus sign.'), math: same('$\\frac{x^2}{9}-\\frac{y^2}{16}=1$') }
        ],
        takeaway: say('Hiperbola $P$ puntuen lekua da, $|PF-PF\'|=2a$ betetzen dutenena. Fokuak $F(c,0)$ eta $F\'(-c,0)$ badira, haren ekuazioa $\\frac{x^2}{a^2}-\\frac{y^2}{b^2}=1$ da, $c^2=a^2+b^2$ izanik: hemen $c$ da handiena.', 'La hipérbola es el lugar de los puntos $P$ con $|PF-PF\'|=2a$. Si los focos son $F(c,0)$ y $F\'(-c,0)$, su ecuación es $\\frac{x^2}{a^2}-\\frac{y^2}{b^2}=1$, con $c^2=a^2+b^2$: aquí $c$ es el mayor.', 'القطع الزائد محل النقاط $P$ التي تحقق $|PF-PF\'|=2a$. وإذا كانت البؤرتان $F(c,0)$ و$F\'(-c,0)$ فمعادلته $\\frac{x^2}{a^2}-\\frac{y^2}{b^2}=1$ مع $c^2=a^2+b^2$: وهنا $c$ هو الأكبر.', 'The hyperbola is the locus of the points $P$ with $|PF-PF\'|=2a$. If the foci are $F(c,0)$ and $F\'(-c,0)$, its equation is $\\frac{x^2}{a^2}-\\frac{y^2}{b^2}=1$, with $c^2=a^2+b^2$: here $c$ is the greatest.'),
        figure: (language) => <HyperbolaFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'hyperbola-asymptotes',
        stage: 'hyperbola',
        title: say('Hiperbolaren asintotak eta eszentrikotasuna', 'Asíntotas y excentricidad de la hipérbola', 'مقاربا القطع الزائد واختلافه المركزي', 'Asymptotes and eccentricity of a hyperbola'),
        goal: say('Hiperbola baten $y=\\pm\\frac{b}{a}x$ asintotak eta $e=\\frac{c}{a}$ eszentrikotasuna aurkitzea, eta hiperbola aldekidea ezagutzea.', 'Hallar las asíntotas $y=\\pm\\frac{b}{a}x$ y la excentricidad $e=\\frac{c}{a}$ de una hipérbola, y reconocer la hipérbola equilátera.', 'إيجاد المقاربين $y=\\pm\\frac{b}{a}x$ والاختلاف المركزي $e=\\frac{c}{a}$ لقطع زائد، والتعرف على القطع الزائد القائم.', 'Find the asymptotes $y=\\pm\\frac{b}{a}x$ and the eccentricity $e=\\frac{c}{a}$ of a hyperbola, and recognise the rectangular hyperbola.'),
        problem: say('Aurkitu $\\frac{x^2}{36}-\\frac{y^2}{64}=1$ hiperbolaren asintotak eta eszentrikotasuna.', 'Halla las asíntotas y la excentricidad de la hipérbola $\\frac{x^2}{36}-\\frac{y^2}{64}=1$.', 'أوجد مقاربي القطع الزائد $\\frac{x^2}{36}-\\frac{y^2}{64}=1$ واختلافه المركزي.', 'Find the asymptotes and the eccentricity of the hyperbola $\\frac{x^2}{36}-\\frac{y^2}{64}=1$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Ardatzerdiak.', 'Semiejes.', 'نصفا المحورين.', 'Semi-axes.'), math: same('$a=6\\qquad b=8$') },
            { text: say('Asintotak: $2a$ eta $2b$ aldeko laukizuzenaren diagonalak.', 'Asíntotas: las diagonales del rectángulo de lados $2a$ y $2b$.', 'المقاربان: قطرا المستطيل الذي ضلعاه $2a$ و$2b$.', 'Asymptotes: the diagonals of the rectangle with sides $2a$ and $2b$.'), math: same('$y=\\pm\\frac{8}{6}x=\\pm\\frac{4}{3}x$') },
            { text: say('Eszentrikotasuna, $1$ baino handiagoa.', 'Excentricidad, mayor que $1$.', 'الاختلاف المركزي أكبر من $1$.', 'Eccentricity, greater than $1$.'), math: same('$c=\\sqrt{36+64}=10\\qquad e=\\frac{10}{6}=\\frac{5}{3}$') }
        ],
        takeaway: say('$\\frac{x^2}{a^2}-\\frac{y^2}{b^2}=1$ hiperbola gero eta gehiago hurbiltzen zaie $y=\\pm\\frac{b}{a}x$ zuzenei, bere asintotei. Haren $e=\\frac{c}{a}$ eszentrikotasuna $1$ baino handiagoa da. $a=b$ bada, hiperbola aldekidea da: asintota perpendikularrak eta $e=\\sqrt{2}$.', 'La hipérbola $\\frac{x^2}{a^2}-\\frac{y^2}{b^2}=1$ se acerca cada vez más a las rectas $y=\\pm\\frac{b}{a}x$, sus asíntotas. Su excentricidad $e=\\frac{c}{a}$ es mayor que $1$. Si $a=b$, la hipérbola es equilátera: asíntotas perpendiculares y $e=\\sqrt{2}$.', 'يقترب القطع الزائد $\\frac{x^2}{a^2}-\\frac{y^2}{b^2}=1$ أكثر فأكثر من المستقيمين $y=\\pm\\frac{b}{a}x$، وهما مقارباه. واختلافه المركزي $e=\\frac{c}{a}$ أكبر من $1$. وإذا كان $a=b$ فالقطع الزائد قائم: مقاربان متعامدان و$e=\\sqrt{2}$.', 'The hyperbola $\\frac{x^2}{a^2}-\\frac{y^2}{b^2}=1$ gets closer and closer to the lines $y=\\pm\\frac{b}{a}x$, its asymptotes. Its eccentricity $e=\\frac{c}{a}$ is greater than $1$. If $a=b$, the hyperbola is rectangular: perpendicular asymptotes and $e=\\sqrt{2}$.'),
        figure: (language) => <AsymptotesFigure language={language} />,
        figureAfterSteps: true
    },

    /* ---------- 5. The parabola and the conics ---------- */
    {
        id: 'parabola-definition',
        stage: 'parabola',
        title: say('Parabolaren fokua eta zuzentzailea', 'Foco y directriz de la parábola', 'بؤرة القطع المكافئ ودليله', 'Focus and directrix of a parabola'),
        goal: say('Parabola ezagutzea, foku batetik eta zuzen batetik, zuzentzailetik, distantzia berera dauden puntuen leku geometriko gisa, eta $y^2=2px$ idaztea.', 'Reconocer la parábola como el lugar de los puntos que están a la misma distancia de un foco y de una recta, la directriz, y escribir $y^2=2px$.', 'التعرف على القطع المكافئ بوصفه محل النقاط التي تبعد المسافة نفسها عن بؤرة وعن مستقيم هو الدليل، وكتابة $y^2=2px$.', 'Recognise the parabola as the locus of the points at the same distance from a focus and from a line, the directrix, and write $y^2=2px$.'),
        problem: say('Aurkitu $F(3,0)$ fokua eta $x=-3$ zuzentzailea dituen parabolaren ekuazioa.', 'Halla la ecuación de la parábola de foco $F(3,0)$ y directriz $x=-3$.', 'أوجد معادلة القطع المكافئ الذي بؤرته $F(3,0)$ ودليله $x=-3$.', 'Find the equation of the parabola with focus $F(3,0)$ and directrix $x=-3$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$P(x,y)$ puntua fokutik eta zuzentzailetik distantzia berera dago.', 'Un punto $P(x,y)$ está a la misma distancia del foco y de la directriz.', 'النقطة $P(x,y)$ على المسافة نفسها من البؤرة والدليل.', 'A point $P(x,y)$ is the same distance from the focus and from the directrix.'), math: same('$\\sqrt{(x-3)^2+y^2}=|x+3|$') },
            { text: say('Karratura jaso eta sinplifikatu.', 'Eleva al cuadrado y simplifica.', 'ربّع وبسّط.', 'Square and simplify.'), math: same('$x^2-6x+9+y^2=x^2+6x+9\\ \\to\\ y^2=12x$') },
            { text: say('Konparatu $y^2=2px$ ekuazioarekin: fokua $\\left(\\frac{p}{2},0\\right)$ da, eta zuzentzailea, $x=-\\frac{p}{2}$.', 'Compara con $y^2=2px$: el foco es $\\left(\\frac{p}{2},0\\right)$ y la directriz, $x=-\\frac{p}{2}$.', 'قارن بـ $y^2=2px$: البؤرة $\\left(\\frac{p}{2},0\\right)$ والدليل $x=-\\frac{p}{2}$.', 'Compare with $y^2=2px$: the focus is $\\left(\\frac{p}{2},0\\right)$ and the directrix, $x=-\\frac{p}{2}$.'), math: same('$2p=12\\ \\to\\ p=6\\qquad\\frac{p}{2}=3$') }
        ],
        takeaway: say('Parabola $F$ fokutik eta zuzentzailetik distantzia berera dauden puntuen lekua da. $F\\left(\\frac{p}{2},0\\right)$ fokuarekin eta $x=-\\frac{p}{2}$ zuzentzailearekin, haren ekuazioa $y^2=2px$ da; erpina jatorrian dago.', 'La parábola es el lugar de los puntos a la misma distancia del foco $F$ que de la directriz. Con foco $F\\left(\\frac{p}{2},0\\right)$ y directriz $x=-\\frac{p}{2}$, su ecuación es $y^2=2px$; el vértice está en el origen.', 'القطع المكافئ محل النقاط التي تبعد عن البؤرة $F$ بقدر بعدها عن الدليل. ومع البؤرة $F\\left(\\frac{p}{2},0\\right)$ والدليل $x=-\\frac{p}{2}$ تكون معادلته $y^2=2px$؛ والرأس في الأصل.', 'The parabola is the locus of the points as far from the focus $F$ as from the directrix. With focus $F\\left(\\frac{p}{2},0\\right)$ and directrix $x=-\\frac{p}{2}$, its equation is $y^2=2px$; the vertex is at the origin.'),
        figure: (language) => <ParabolaFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'parabola-positions',
        stage: 'parabola',
        title: say('Parabolaren beste posizio batzuk', 'Otras posiciones de la parábola', 'أوضاع أخرى للقطع المكافئ', 'Other positions of a parabola'),
        goal: say('Ardatz bertikaleko, ezkerrera irekitako edo lekualdatutako parabolen erpina, fokua eta zuzentzailea irakurtzea, $(y-y_0)^2=2p(x-x_0)$ bezalakoak.', 'Leer el vértice, el foco y la directriz de parábolas de eje vertical, abiertas hacia la izquierda o trasladadas, como $(y-y_0)^2=2p(x-x_0)$.', 'قراءة رأس وبؤرة ودليل قطوع مكافئة محورها رأسي أو منفتحة نحو اليسار أو مُزاحة، مثل $(y-y_0)^2=2p(x-x_0)$.', 'Read the vertex, the focus and the directrix of parabolas with a vertical axis, opening to the left or shifted, such as $(y-y_0)^2=2p(x-x_0)$.'),
        problem: say('Aurkitu $(y-1)^2=8(x+2)$ parabolaren erpina, fokua eta zuzentzailea.', 'Halla el vértice, el foco y la directriz de la parábola $(y-1)^2=8(x+2)$.', 'أوجد رأس القطع المكافئ $(y-1)^2=8(x+2)$ وبؤرته ودليله.', 'Find the vertex, the focus and the directrix of the parabola $(y-1)^2=8(x+2)$.'),
        stepsKind: 'steps',
        steps: [
            { text: say('Erpina: lekualdaketaren puntua.', 'Vértice: el punto de la traslación.', 'الرأس: نقطة الإزاحة.', 'Vertex: the point of the shift.'), math: same('$V(-2,1)$') },
            { text: say('Parametroa.', 'El parámetro.', 'الوسيط.', 'The parameter.'), math: same('$2p=8\\ \\to\\ p=4\\qquad\\frac{p}{2}=2$') },
            { text: say('Fokua erpinaren eskuinean, eta zuzentzailea ezkerrean.', 'Foco a la derecha del vértice y directriz a la izquierda.', 'البؤرة يمين الرأس والدليل يساره.', 'Focus to the right of the vertex and directrix to the left.'), math: same('$F(-2+2,1)=(0,1)\\qquad x=-2-2=-4$') }
        ],
        takeaway: say('$y^2=2px$ eskuinera irekitzen da, $y^2=-2px$ ezkerrera, $x^2=2py$ gora eta $x^2=-2py$ behera. Erpina $V(x_0,y_0)$ bada, $x$ ordez $x-x_0$ eta $y$ ordez $y-y_0$ jartzen dira, eta fokua eta zuzentzailea harekin lekualdatzen dira.', '$y^2=2px$ se abre a la derecha, $y^2=-2px$ a la izquierda, $x^2=2py$ hacia arriba y $x^2=-2py$ hacia abajo. Si el vértice es $V(x_0,y_0)$, se cambia $x$ por $x-x_0$ e $y$ por $y-y_0$, y el foco y la directriz se trasladan con él.', 'ينفتح $y^2=2px$ نحو اليمين و$y^2=-2px$ نحو اليسار و$x^2=2py$ نحو الأعلى و$x^2=-2py$ نحو الأسفل. وإذا كان الرأس $V(x_0,y_0)$ نغيّر $x$ إلى $x-x_0$ و$y$ إلى $y-y_0$، فتنزاح البؤرة والدليل معه.', '$y^2=2px$ opens to the right, $y^2=-2px$ to the left, $x^2=2py$ upwards and $x^2=-2py$ downwards. If the vertex is $V(x_0,y_0)$, $x$ becomes $x-x_0$ and $y$ becomes $y-y_0$, and the focus and the directrix move with it.'),
        figure: (language) => <ShiftedParabolaFigure language={language} />,
        figureAfterSteps: true
    },
    {
        id: 'recognize-conic',
        stage: 'parabola',
        title: say('Konika bat ezagutzea', 'Reconocer una cónica', 'التعرف على قطع مخروطي', 'Recognising a conic'),
        goal: say('$Ax^2+By^2+Cx+Dy+E=0$ ekuazio bat zein konika den jakitea, $A$ eta $B$ koefizienteen zeinuengatik eta karratuak osatuz, eta konika bakoitza bere $e$ eszentrikotasunarekin eta konoaren ebakidura batekin lotzea.', 'Saber qué cónica es una ecuación $Ax^2+By^2+Cx+Dy+E=0$ por los signos de $A$ y $B$ y completando cuadrados, y relacionar cada cónica con su excentricidad $e$ y con un corte del cono.', 'معرفة أي قطع مخروطي تمثله معادلة $Ax^2+By^2+Cx+Dy+E=0$ من إشارتي $A$ و$B$ وبإكمال المربعات، وربط كل قطع باختلافه المركزي $e$ وبمقطع من المخروط.', 'Tell which conic an equation $Ax^2+By^2+Cx+Dy+E=0$ is from the signs of $A$ and $B$ and by completing the square, and link each conic with its eccentricity $e$ and with a cut of the cone.'),
        problem: say('Zein konika da $4x^2+9y^2-16x+18y-11=0$? Aurkitu haren zentroa.', '¿Qué cónica es $4x^2+9y^2-16x+18y-11=0$? Halla su centro.', 'أي قطع مخروطي هو $4x^2+9y^2-16x+18y-11=0$؟ أوجد مركزه.', 'Which conic is $4x^2+9y^2-16x+18y-11=0$? Find its centre.'),
        stepsKind: 'steps',
        steps: [
            { text: say('$x^2$ eta $y^2$ gaien koefizienteak desberdinak eta zeinu berekoak dira: elipse bat da.', 'Los coeficientes de $x^2$ e $y^2$ son distintos y del mismo signo: es una elipse.', 'معاملا $x^2$ و$y^2$ مختلفان ومن الإشارة نفسها: إنه قطع ناقص.', 'The coefficients of $x^2$ and $y^2$ are different and have the same sign: it is an ellipse.'), math: same('$4(x^2-4x)+9(y^2+2y)=11$') },
            { text: say('Osatu karratuak.', 'Completa cuadrados.', 'أكمل المربعين.', 'Complete the squares.'), math: same('$4(x-2)^2+9(y+1)^2=11+16+9=36$') },
            { text: say('Zatitu $36$ zenbakiaz: zentroa $(2,-1)$, $a=3$ eta $b=2$.', 'Divide entre $36$: centro $(2,-1)$, $a=3$ y $b=2$.', 'اقسم على $36$: المركز $(2,-1)$ و$a=3$ و$b=2$.', 'Divide by $36$: centre $(2,-1)$, $a=3$ and $b=2$.'), math: same('$\\frac{(x-2)^2}{9}+\\frac{(y+1)^2}{4}=1$') }
        ],
        takeaway: say('$Ax^2+By^2+Cx+Dy+E=0$ ekuazioan: $A=B$ bada, zirkunferentzia; $A$ eta $B$ zeinu berekoak badira, elipsea; zeinu desberdinekoak badira, hiperbola; bat $0$ bada, parabola. Eszentrikotasunak baieztatzen du: $e=0$, $e<1$, $e>1$ eta $e=1$.', 'En $Ax^2+By^2+Cx+Dy+E=0$: si $A=B$ es una circunferencia; si $A$ y $B$ tienen el mismo signo, una elipse; si tienen signos distintos, una hipérbola; si uno es $0$, una parábola. La excentricidad lo confirma: $e=0$, $e<1$, $e>1$ y $e=1$.', 'في $Ax^2+By^2+Cx+Dy+E=0$: إذا كان $A=B$ فهي دائرة؛ وإذا كان $A$ و$B$ من الإشارة نفسها فقطع ناقص؛ وإذا اختلفت إشارتاهما فقطع زائد؛ وإذا كان أحدهما $0$ فقطع مكافئ. والاختلاف المركزي يؤكد ذلك: $e=0$ و$e<1$ و$e>1$ و$e=1$.', 'In $Ax^2+By^2+Cx+Dy+E=0$: if $A=B$ it is a circle; if $A$ and $B$ have the same sign, an ellipse; if their signs are different, a hyperbola; if one is $0$, a parabola. The eccentricity confirms it: $e=0$, $e<1$, $e>1$ and $e=1$.'),
        figure: (language) => <ConeSectionsFigure language={language} />
    }
]

/** Each lesson with what it tells (lessonTexts.ts), its typical mistake and its «Check it» question (lessonChecks.ts) */
export const bachConicsTopics: UnitTopic[] = baseTopics.map((topic) => ({ ...topic, ...bachConicsLessonTexts[topic.id as BachConicsTopicId], ...bachConicsLessonChecks[topic.id as BachConicsTopicId] }))

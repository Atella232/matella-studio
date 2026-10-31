import { fraction, type FractionValue } from '../../features/unit-v2/math/fraction.ts'
import type { ChallengeItem, DiagnosticQuestion, ExerciseSection, PracticeItem } from '../../features/unit-v2/types.ts'
import { say, same } from './text.ts'

/* ==========================================================================
   Planoko mugimenduak · 3. DBH — diagnostic, guided practice, exercise
   bank and challenges, after Santillana 3.º ESO unit 9 and Anaya 3.º ESO
   unit 12 (the books fix the scope and the order; every number here is
   original). Every closed answer has an entry in `motions3Checks`: the
   movement it comes from and its data, so that the tests can work the
   answer out again and check that the data are in the question.
   ========================================================================== */

const n = (value: number): FractionValue => fraction(Math.round(value * 10000), 10000)

export type MotionCheckKind =
    | 'component' | 'modulus' | 'sum' | 'translate' | 'vector-from'
    | 'rot90-x' | 'rot90-y' | 'rot180' | 'rot270-x' | 'central'
    | 'reflect-axis' | 'negate' | 'two-mirrors' | 'two-mirrors-angle'
    | 'order-angle' | 'tiles' | 'gap' | 'frieze-length' | 'homothety' | 'regular-axes'

export interface MotionCheck {
    kind: MotionCheckKind
    args: number[]
}

/** The movement behind every kind of check */
export function motionAnswer({ kind, args }: MotionCheck): number {
    const [a, b, c] = args
    switch (kind) {
        case 'component': return b - a
        case 'modulus': return Math.hypot(a, b)
        case 'sum': return a + b
        case 'translate': return a + b
        case 'vector-from': return b - a
        case 'rot90-x': return -b
        case 'rot90-y': return a
        case 'rot180': return -a
        case 'rot270-x': return b
        case 'central': return 2 * a - b
        case 'reflect-axis': return 2 * a - b
        case 'negate': return -a
        case 'two-mirrors': return 2 * (b - a)
        case 'two-mirrors-angle': return 2 * a
        case 'order-angle': return 360 / a
        case 'tiles': return 360 / (180 - 360 / a)
        case 'gap': return 360 - b * (180 - 360 / a)
        case 'frieze-length': return (a - 1) * b + c
        case 'homothety': return a * b
        case 'regular-axes': return a
    }
}

const check = (kind: MotionCheckKind, ...args: number[]): MotionCheck => ({ kind, args })

/** p: practice, c: challenge, b: bank */
export const motions3Checks: Record<string, MotionCheck> = {
    p1: check('component', 2, 7), p2: check('modulus', 5, 12), p3: check('sum', 3, -5), p4: check('modulus', -8, 6),
    p5: check('translate', 4, 3), p6: check('vector-from', -1, 6), p7: check('sum', 2, -6), p8: check('translate', -3, 5),
    p9: check('rot90-x', 4, 1), p10: check('rot180', -5), p11: check('central', 2, 7), p12: check('order-angle', 8),
    p13: check('reflect-axis', 1, 6), p14: check('negate', 4), p15: check('two-mirrors', 2, 5), p16: check('regular-axes', 7),
    p17: check('frieze-length', 6, 4, 3), p18: check('tiles', 6), p19: check('homothety', 2, -4), p20: check('gap', 5, 3),
    c101: check('modulus', 9, 12), c102: check('translate', -4, 7), c103: check('modulus', 7, -24),
    c104: check('sum', 6, -9), c105: check('vector-from', 5, -2), c106: check('translate', -7, 10),
    c107: check('rot90-y', -3, 6), c108: check('rot270-x', 5, -2), c109: check('central', -1, 4),
    c110: check('reflect-axis', -2, 3), c111: check('two-mirrors-angle', 35), c112: check('two-mirrors', -3, 4),
    c113: check('frieze-length', 10, 7, 4), c114: check('gap', 8, 2), c115: check('homothety', -2, 5),
    b1: check('component', 1, 6), b2: check('component', 5, -2), b3: check('modulus', 3, 4), b4: check('modulus', 6, 8),
    b5: check('sum', 4, 3), b6: check('sum', -2, 7), b7: check('modulus', -5, 12), b8: check('component', -3, -8), b9: check('modulus', 15, -8), b10: check('sum', -6, -4),
    b11: check('translate', 2, 5), b12: check('translate', 6, -4), b13: check('vector-from', 3, 9), b14: check('vector-from', -2, -7), b15: check('translate', -5, 3),
    b16: check('sum', 4, -1), b17: check('vector-from', 0, -6), b18: check('sum', -3, 8), b19: check('translate', 7, -12), b20: check('vector-from', -4, 5),
    b21: check('rot90-x', 3, 5), b22: check('rot90-y', 3, 5), b23: check('rot180', 6), b24: check('rot180', -2), b25: check('central', 0, 5),
    b26: check('order-angle', 4), b27: check('order-angle', 6), b28: check('rot270-x', -1, 4), b29: check('central', 3, -2), b30: check('order-angle', 10),
    b31: check('negate', 5), b32: check('negate', -3), b33: check('reflect-axis', 2, 7), b34: check('reflect-axis', -1, 3), b35: check('regular-axes', 6),
    b36: check('two-mirrors', 1, 4), b37: check('two-mirrors-angle', 60), b38: check('reflect-axis', 4, -2), b39: check('two-mirrors', -2, 3), b40: check('two-mirrors-angle', 45),
    b41: check('tiles', 3), b42: check('tiles', 4), b43: check('frieze-length', 5, 3, 2), b44: check('homothety', 3, 4), b45: check('homothety', 0.5, 10),
    b46: check('gap', 5, 3), b47: check('frieze-length', 12, 5, 2), b48: check('homothety', -1, 7), b49: check('gap', 10, 2), b50: check('homothety', 1.5, 6)
}

const answer = (key: string) => n(motionAnswer(motions3Checks[key]))

export const motions3Diagnostic: DiagnosticQuestion[] = [
    {
        id: 6901,
        prompt: say('$A=(1,2)$ eta $B=(4,6)$. Zein da $\\vec{AB}$?', '$A=(1,2)$ y $B=(4,6)$. ¿Cuál es $\\vec{AB}$?', '$A=(1,2)$ و$B=(4,6)$. ما $\\vec{AB}$؟', '$A=(1,2)$ and $B=(4,6)$. What is $\\vec{AB}$?'),
        options: [same('$(5,8)$'), same('$(3,4)$'), same('$(-3,-4)$')],
        correctIndex: 1,
        explanation: same('$(4-1,\\ 6-2)=(3,4)$'),
        topic: 'vector-components'
    },
    {
        id: 6902,
        prompt: say('Zein da $(3,4)$ bektorearen modulua?', '¿Cuál es el módulo de $(3,4)$?', 'ما طول $(3,4)$؟', 'What is the length of $(3,4)$?'),
        options: [same('$7$'), same('$5$'), same('$25$')],
        correctIndex: 1,
        explanation: same('$\\sqrt{9+16}=5$'),
        topic: 'vector-modulus'
    },
    {
        id: 6903,
        prompt: say('$(2,1)$ puntua $(3,-4)$ bektorearekin lekualdatzen da. Non geratzen da?', 'El punto $(2,1)$ se traslada con $(3,-4)$. ¿Dónde queda?', 'تُنقل $(2,1)$ بالمتجه $(3,-4)$. أين تقع؟', 'The point $(2,1)$ is translated by $(3,-4)$. Where does it end up?'),
        options: [same('$(5,-3)$'), same('$(5,5)$'), same('$(-1,5)$')],
        correctIndex: 0,
        explanation: same('$(2+3,\\ 1-4)=(5,-3)$'),
        topic: 'translation-coordinates'
    },
    {
        id: 6904,
        prompt: say('$(3,1)$ jatorriaren inguruan 90° biratzen da. Non geratzen da?', '$(3,1)$ gira 90° alrededor del origen. ¿Dónde queda?', 'تدور $(3,1)$ بزاوية 90° حول الأصل. أين تقع؟', '$(3,1)$ is rotated 90° about the origin. Where does it end up?'),
        options: [same('$(1,3)$'), same('$(-3,-1)$'), same('$(-1,3)$')],
        correctIndex: 2,
        explanation: same('$(x,y)\\to(-y,x)=(-1,3)$'),
        topic: 'rotation-coordinates'
    },
    {
        id: 6905,
        prompt: say('Zein da $(4,-2)$ puntuaren simetrikoa jatorriarekiko?', '¿Cuál es el simétrico de $(4,-2)$ respecto al origen?', 'ما نظير $(4,-2)$ بالنسبة إلى الأصل؟', 'What is the image of $(4,-2)$ in the origin?'),
        options: [same('$(-4,2)$'), same('$(4,2)$'), same('$(-4,-2)$')],
        correctIndex: 0,
        explanation: same('$(-x,-y)=(-4,2)$'),
        topic: 'central-symmetry'
    },
    {
        id: 6906,
        prompt: say('Zein da $(5,3)$ puntuaren simetrikoa Y ardatzarekiko?', '¿Cuál es el simétrico de $(5,3)$ respecto al eje Y?', 'ما نظير $(5,3)$ بالنسبة إلى محور Y؟', 'What is the image of $(5,3)$ in the Y axis?'),
        options: [same('$(5,-3)$'), same('$(-5,3)$'), same('$(3,5)$')],
        correctIndex: 1,
        explanation: say('Y ardatzarekiko $x$ koordenatuaren zeinua aldatzen da: $(-5,3)$.', 'Respecto al eje Y cambia el signo de la $x$: $(-5,3)$.', 'بالنسبة إلى محور Y تتغيّر إشارة $x$: $(-5,3)$.', 'In the Y axis the sign of $x$ changes: $(-5,3)$.'),
        topic: 'reflection-coordinates'
    },
    {
        id: 6907,
        prompt: say('Zein poligono erregularrek EZ dute planoa estaltzen?', '¿Qué polígono regular NO cubre el plano?', 'أي مضلع منتظم لا يغطي المستوى؟', 'Which regular polygon does NOT tile the plane?'),
        options: [say('Hexagonoa', 'El hexágono', 'السداسي', 'The hexagon'), say('Karratua', 'El cuadrado', 'المربع', 'The square'), say('Pentagonoa', 'El pentágono', 'الخماسي', 'The pentagon')],
        correctIndex: 2,
        explanation: same('$360°\\div 108°=3{,}33$'),
        topic: 'tessellations'
    },
    {
        id: 6908,
        prompt: say('Jatorrian zentroa eta $k=2$ duen homoteziarekin, non geratzen da $(3,-1)$?', 'Con la homotecia de centro el origen y $k=2$, ¿dónde queda $(3,-1)$?', 'بالتحاكي ذي المركز الأصل و$k=2$، أين تقع $(3,-1)$؟', 'With the enlargement from the origin with $k=2$, where does $(3,-1)$ end up?'),
        options: [same('$(5,1)$'), same('$(6,-2)$'), same('$(6,-1)$')],
        correctIndex: 1,
        explanation: same('$(2\\cdot 3,\\ 2\\cdot(-1))=(6,-2)$'),
        topic: 'homothety'
    }
]

export const motions3Practice: PracticeItem[] = [
    /* ---------- Vectors ---------- */
    { id: 1, stage: 'vectors', prompt: say('$A=(2,0)$ eta $B=(7,3)$. Zein da $\\vec{AB}$ bektorearen lehen osagaia?', '$A=(2,0)$ y $B=(7,3)$. ¿Cuál es la primera componente de $\\vec{AB}$?', '$A=(2,0)$ و$B=(7,3)$. ما المركّبة الأولى لـ$\\vec{AB}$؟', '$A=(2,0)$ and $B=(7,3)$. What is the first component of $\\vec{AB}$?'), expected: answer('p1'), hint: say('Muturra ken jatorria.', 'Extremo menos origen.', 'النهاية ناقص البداية.', 'End minus start.'), explanation: same('$7-2=5$') },
    { id: 2, stage: 'vectors', prompt: say('Zein da $(5,12)$ bektorearen modulua?', '¿Cuál es el módulo de $(5,12)$?', 'ما طول $(5,12)$؟', 'What is the length of $(5,12)$?'), expected: answer('p2'), hint: same('$\\sqrt{a^{2}+b^{2}}$'), explanation: same('$\\sqrt{25+144}=\\sqrt{169}=13$') },
    { id: 3, stage: 'vectors', prompt: say('$\\vec{u}=(3,2)$ eta $\\vec{v}=(-5,4)$. Zein da $\\vec{u}+\\vec{v}$ bektorearen lehen osagaia?', '$\\vec{u}=(3,2)$ y $\\vec{v}=(-5,4)$. ¿Cuál es la primera componente de $\\vec{u}+\\vec{v}$?', '$\\vec{u}=(3,2)$ و$\\vec{v}=(-5,4)$. ما المركّبة الأولى لـ$\\vec{u}+\\vec{v}$؟', '$\\vec{u}=(3,2)$ and $\\vec{v}=(-5,4)$. What is the first component of $\\vec{u}+\\vec{v}$?'), expected: answer('p3'), hint: say('Batu lehen osagaiak.', 'Suma las primeras componentes.', 'اجمع المركّبتين الأوليين.', 'Add the first components.'), explanation: same('$3+(-5)=-2$') },
    { id: 4, stage: 'vectors', prompt: say('Zein da $(-8,6)$ bektorearen modulua?', '¿Cuál es el módulo de $(-8,6)$?', 'ما طول $(-8,6)$؟', 'What is the length of $(-8,6)$?'), expected: answer('p4'), hint: say('Karratuak positiboak dira.', 'Los cuadrados son positivos.', 'المربعات موجبة.', 'Squares are positive.'), explanation: same('$\\sqrt{64+36}=10$') },

    /* ---------- Translations ---------- */
    { id: 5, stage: 'translations', prompt: say('$(4,1)$ puntua $(3,-2)$ bektorearekin lekualdatzen da. Zein da irudiaren $x$?', 'El punto $(4,1)$ se traslada con $(3,-2)$. ¿Cuál es la $x$ de la imagen?', 'تُنقل $(4,1)$ بالمتجه $(3,-2)$. ما $x$ للصورة؟', 'The point $(4,1)$ is translated by $(3,-2)$. What is the $x$ of the image?'), expected: answer('p5'), hint: same('$x+a$'), explanation: same('$4+3=7$') },
    { id: 6, stage: 'translations', prompt: say('$(-1,2)$ puntuaren irudia $(6,5)$ da. Zein da bektorearen lehen osagaia?', 'La imagen de $(-1,2)$ es $(6,5)$. ¿Cuál es la primera componente del vector?', 'صورة $(-1,2)$ هي $(6,5)$. ما المركّبة الأولى للمتجه؟', 'The image of $(-1,2)$ is $(6,5)$. What is the first component of the vector?'), expected: answer('p6'), hint: say('Irudia ken puntua.', 'Imagen menos punto.', 'الصورة ناقص النقطة.', 'Image minus point.'), explanation: same('$6-(-1)=7$') },
    { id: 7, stage: 'translations', prompt: say('$(1,2)$ bektorearekin eta gero $(1,-6)$ bektorearekin lekualdatzen da. Zein da bektore bakarraren bigarren osagaia?', 'Se traslada con $(1,2)$ y después con $(1,-6)$. ¿Cuál es la segunda componente del vector único?', 'ننقل بـ$(1,2)$ ثم بـ$(1,-6)$. ما المركّبة الثانية للمتجه الوحيد؟', 'You translate by $(1,2)$ and then by $(1,-6)$. What is the second component of the single vector?'), expected: answer('p7'), hint: say('Batu bigarren osagaiak.', 'Suma las segundas componentes.', 'اجمع المركّبتين الثانيتين.', 'Add the second components.'), explanation: same('$2+(-6)=-4$') },
    { id: 8, stage: 'translations', prompt: say('$(2,-3)$ puntua $(0,5)$ bektorearekin lekualdatzen da. Zein da irudiaren $y$?', 'El punto $(2,-3)$ se traslada con $(0,5)$. ¿Cuál es la $y$ de la imagen?', 'تُنقل $(2,-3)$ بالمتجه $(0,5)$. ما $y$ للصورة؟', 'The point $(2,-3)$ is translated by $(0,5)$. What is the $y$ of the image?'), expected: answer('p8'), hint: same('$y+b$'), explanation: same('$-3+5=2$') },

    /* ---------- Rotations ---------- */
    { id: 9, stage: 'rotations', prompt: say('$(4,1)$ jatorriaren inguruan 90° biratzen da. Zein da irudiaren $x$?', '$(4,1)$ gira 90° alrededor del origen. ¿Cuál es la $x$ de la imagen?', 'تدور $(4,1)$ بزاوية 90° حول الأصل. ما $x$ للصورة؟', '$(4,1)$ is rotated 90° about the origin. What is the $x$ of the image?'), expected: answer('p9'), hint: same('$(x,y)\\to(-y,x)$'), explanation: same('$(4,1)\\to(-1,4)$') },
    { id: 10, stage: 'rotations', prompt: say('$(-5,2)$ jatorriaren inguruan 180° biratzen da. Zein da irudiaren $x$?', '$(-5,2)$ gira 180° alrededor del origen. ¿Cuál es la $x$ de la imagen?', 'تدور $(-5,2)$ بزاوية 180° حول الأصل. ما $x$ للصورة؟', '$(-5,2)$ is rotated 180° about the origin. What is the $x$ of the image?'), expected: answer('p10'), hint: same('$(x,y)\\to(-x,-y)$'), explanation: same('$(-5,2)\\to(5,-2)$') },
    { id: 11, stage: 'rotations', prompt: say('$x$ ardatzean: $P=7$ eta zentroa $O=2$. Zein da $P$ puntuaren simetrikoa $O$ puntuarekiko?', 'Sobre el eje $x$: $P=7$ y el centro $O=2$. ¿Cuál es el simétrico de $P$ respecto a $O$?', 'على المحور $x$: $P=7$ والمركز $O=2$. ما نظير $P$ بالنسبة إلى $O$؟', 'On the $x$ axis: $P=7$ and the centre $O=2$. What is the image of $P$ in $O$?'), expected: answer('p11'), hint: same('$P\'=2O-P$'), explanation: same('$2\\cdot 2-7=-3$') },
    { id: 12, stage: 'rotations', prompt: say('Oktogono erregularra (8 alde) bere buruarekin bat dator angelu txikienez biratuta. Zenbat gradu?', 'Un octógono regular (8 lados) coincide consigo mismo al girarlo el menor ángulo. ¿Cuántos grados?', 'يتطابق مثمن منتظم (8 أضلاع) مع نفسه عند تدويره أصغر زاوية. كم درجة؟', 'A regular octagon (8 sides) matches itself when turned by the smallest angle. How many degrees?'), expected: answer('p12'), hint: same('$\\frac{360°}{n}$'), explanation: same('$360°\\div 8=45°$') },

    /* ---------- Reflections ---------- */
    { id: 13, stage: 'reflections', prompt: say('$(6,2)$ puntua $x=1$ ardatzarekiko islatzen da. Zein da irudiaren $x$?', 'El punto $(6,2)$ se refleja en el eje $x=1$. ¿Cuál es la $x$ de la imagen?', 'تنعكس $(6,2)$ في المحور $x=1$. ما $x$ للصورة؟', 'The point $(6,2)$ is reflected in the axis $x=1$. What is the $x$ of the image?'), expected: answer('p13'), hint: same('$2k-x$'), explanation: same('$2\\cdot 1-6=-4$') },
    { id: 14, stage: 'reflections', prompt: say('$(-3,4)$ puntua X ardatzarekiko islatzen da. Zein da irudiaren $y$?', 'El punto $(-3,4)$ se refleja en el eje X. ¿Cuál es la $y$ de la imagen?', 'تنعكس $(-3,4)$ في محور X. ما $y$ للصورة؟', 'The point $(-3,4)$ is reflected in the X axis. What is the $y$ of the image?'), expected: answer('p14'), hint: say('$y$ koordenatuaren zeinua aldatu.', 'Cambia el signo de la $y$.', 'غيّر إشارة $y$.', 'Change the sign of $y$.'), explanation: same('$(-3,4)\\to(-3,-4)$') },
    { id: 15, stage: 'reflections', prompt: say('$x=2$ eta $x=5$ ardatzekiko simetriak elkarren segidan. Zenbat unitate lekualdatzen da irudia?', 'Simetrías seguidas de ejes $x=2$ y $x=5$. ¿Cuántas unidades se traslada la figura?', 'تناظران متتاليان بالمحورين $x=2$ و$x=5$. كم وحدة ينتقل الشكل؟', 'Reflections in $x=2$ and then $x=5$. How many units does the shape move?'), expected: answer('p15'), hint: say('Distantziaren bikoitza.', 'El doble de la distancia.', 'ضعف المسافة.', 'Twice the distance.'), explanation: same('$2\\cdot(5-2)=6$') },
    { id: 16, stage: 'reflections', prompt: say('Zenbat simetria-ardatz ditu 7 aldeko poligono erregular batek?', '¿Cuántos ejes de simetría tiene un polígono regular de 7 lados?', 'كم محور تناظر لمضلع منتظم ذي 7 أضلاع؟', 'How many axes of symmetry does a regular polygon with 7 sides have?'), expected: answer('p16'), hint: say('Alde adina.', 'Tantos como lados.', 'بعدد الأضلاع.', 'As many as sides.'), explanation: say('7 ardatz.', '7 ejes.', '7 محاور.', '7 axes.') },

    /* ---------- Patterns ---------- */
    { id: 17, stage: 'patterns', prompt: say('Friso batek 3 cm-ko 6 motibo ditu, 4 cm-ko bektorearekin. Zenbat neurtzen du (cm)?', 'Un friso tiene 6 motivos de 3 cm con un vector de 4 cm. ¿Cuánto mide (cm)?', 'إفريز من 6 نقوش بعرض 3 سم والمتجه 4 سم. كم طوله (سم)؟', 'A frieze has 6 motifs 3 cm wide with a 4 cm vector. How long is it (cm)?'), expected: answer('p17'), hint: say('5 jauzi eta azken motiboa.', '5 saltos y el último motivo.', '5 قفزات والنقش الأخير.', '5 jumps and the last motif.'), explanation: same('$5\\cdot 4+3=23$') },
    { id: 18, stage: 'patterns', prompt: say('Zenbat hexagono erregular (6 alde) elkartzen dira mosaiko baten erpin batean?', '¿Cuántos hexágonos regulares (6 lados) se juntan en un vértice de un mosaico?', 'كم سداسيًا منتظمًا (6 أضلاع) يلتقي عند رأس في تبليط؟', 'How many regular hexagons (6 sides) meet at a vertex of a tiling?'), expected: answer('p18'), hint: say('Barne-angelua: 120°.', 'Ángulo interior: 120°.', 'الزاوية الداخلية: 120°.', 'Interior angle: 120°.'), explanation: same('$360°\\div 120°=3$') },
    { id: 19, stage: 'patterns', prompt: say('Jatorrian zentroa eta $k=2$ duen homotezia. Zein da $(-4,1)$ puntuaren irudiaren $x$?', 'Homotecia de centro el origen y $k=2$. ¿Cuál es la $x$ de la imagen de $(-4,1)$?', 'تحاكٍ مركزه الأصل و$k=2$. ما $x$ لصورة $(-4,1)$؟', 'Enlargement from the origin with $k=2$. What is the $x$ of the image of $(-4,1)$?'), expected: answer('p19'), hint: same('$(kx,\\ ky)$'), explanation: same('$2\\cdot(-4)=-8$') },
    { id: 20, stage: 'patterns', prompt: say('3 pentagono erregular (5 alde) erpin batean jartzen dira. Zenbat graduko hutsunea geratzen da?', 'Se ponen 3 pentágonos regulares (5 lados) en un vértice. ¿De cuántos grados es el hueco?', 'نضع 3 خماسيات منتظمة (5 أضلاع) عند رأس. كم درجة الفراغ؟', 'You put 3 regular pentagons (5 sides) at a vertex. How many degrees is the gap?'), expected: answer('p20'), hint: say('Barne-angelua: 108°.', 'Ángulo interior: 108°.', 'الزاوية الداخلية: 108°.', 'Interior angle: 108°.'), explanation: same('$360°-3\\cdot 108°=36°$') }
]

export const motions3Challenges: ChallengeItem[] = [
    { id: 101, stage: 'vectors', points: 10, context: 'starter', prompt: say('Zein da $(9,12)$ bektorearen modulua?', '¿Cuál es el módulo de $(9,12)$?', 'ما طول $(9,12)$؟', 'What is the length of $(9,12)$?'), expected: answer('c101'), hint: say('$(3,4)$ bider 3.', '$(3,4)$ por 3.', '$(3,4)$ في 3.', '$(3,4)$ times 3.'), explanation: same('$\\sqrt{81+144}=15$') },
    { id: 102, stage: 'vectors', points: 20, context: 'advanced', prompt: say('$\\vec{AB}=(7,1)$ eta $A=(-4,2)$. Zein da $B$ puntuaren $x$? (Kontuz: $x_{B}-x_{A}=7$.)', '$\\vec{AB}=(7,1)$ y $A=(-4,2)$. ¿Cuál es la $x$ de $B$? (Cuidado: $x_{B}-x_{A}=7$.)', '$\\vec{AB}=(7,1)$ و$A=(-4,2)$. ما $x$ للنقطة $B$؟ (انتبه: $x_{B}-x_{A}=7$.)', '$\\vec{AB}=(7,1)$ and $A=(-4,2)$. What is the $x$ of $B$? (Careful: $x_{B}-x_{A}=7$.)'), expected: answer('c102'), hint: same('$x_{B}=-4+7$'), explanation: same('$x_{B}=-4+7=3$') },
    { id: 103, stage: 'vectors', points: 30, context: 'master', prompt: say('Zein da $(7,-24)$ bektorearen modulua?', '¿Cuál es el módulo de $(7,-24)$?', 'ما طول $(7,-24)$؟', 'What is the length of $(7,-24)$?'), expected: answer('c103'), hint: same('$\\sqrt{49+576}$'), explanation: same('$\\sqrt{625}=25$') },
    { id: 104, stage: 'translations', points: 10, context: 'starter', prompt: say('$(6,0)$ eta gero $(-9,2)$ bektoreekin lekualdatzen da. Zein da bektore bakarraren lehen osagaia?', 'Se traslada con $(6,0)$ y después con $(-9,2)$. ¿Cuál es la primera componente del vector único?', 'ننقل بـ$(6,0)$ ثم بـ$(-9,2)$. ما المركّبة الأولى للمتجه الوحيد؟', 'You translate by $(6,0)$ and then by $(-9,2)$. What is the first component of the single vector?'), expected: answer('c104'), hint: say('Batu.', 'Suma.', 'اجمع.', 'Add.'), explanation: same('$6+(-9)=-3$') },
    { id: 105, stage: 'translations', points: 20, context: 'advanced', prompt: say('$(1,5)$ puntuaren irudia $(3,-2)$ da. Zein da bektorearen bigarren osagaia?', 'La imagen de $(1,5)$ es $(3,-2)$. ¿Cuál es la segunda componente del vector?', 'صورة $(1,5)$ هي $(3,-2)$. ما المركّبة الثانية للمتجه؟', 'The image of $(1,5)$ is $(3,-2)$. What is the second component of the vector?'), expected: answer('c105'), hint: say('Irudia ken puntua.', 'Imagen menos punto.', 'الصورة ناقص النقطة.', 'Image minus point.'), explanation: same('$-2-5=-7$') },
    { id: 106, stage: 'translations', points: 30, context: 'master', prompt: say('$(-7,3)$ puntua $(10,-1)$ bektorearekin lekualdatzen da. Zein da irudiaren $x$?', 'El punto $(-7,3)$ se traslada con $(10,-1)$. ¿Cuál es la $x$ de la imagen?', 'تُنقل $(-7,3)$ بالمتجه $(10,-1)$. ما $x$ للصورة؟', 'The point $(-7,3)$ is translated by $(10,-1)$. What is the $x$ of the image?'), expected: answer('c106'), hint: same('$-7+10$'), explanation: same('$-7+10=3$') },
    { id: 107, stage: 'rotations', points: 10, context: 'starter', prompt: say('$(-3,6)$ jatorriaren inguruan 90° biratzen da. Zein da irudiaren $y$?', '$(-3,6)$ gira 90° alrededor del origen. ¿Cuál es la $y$ de la imagen?', 'تدور $(-3,6)$ بزاوية 90° حول الأصل. ما $y$ للصورة؟', '$(-3,6)$ is rotated 90° about the origin. What is the $y$ of the image?'), expected: answer('c107'), hint: same('$(x,y)\\to(-y,x)$'), explanation: same('$(-3,6)\\to(-6,-3)$') },
    { id: 108, stage: 'rotations', points: 20, context: 'advanced', prompt: say('$(5,-2)$ jatorriaren inguruan 270° biratzen da. Zein da irudiaren $x$?', '$(5,-2)$ gira 270° alrededor del origen. ¿Cuál es la $x$ de la imagen?', 'تدور $(5,-2)$ بزاوية 270° حول الأصل. ما $x$ للصورة؟', '$(5,-2)$ is rotated 270° about the origin. What is the $x$ of the image?'), expected: answer('c108'), hint: same('$(x,y)\\to(y,-x)$'), explanation: same('$(5,-2)\\to(-2,-5)$') },
    { id: 109, stage: 'rotations', points: 30, context: 'master', prompt: say('$x$ ardatzean: $P=4$ eta zentroa $O=-1$. Zein da $P\'$?', 'Sobre el eje $x$: $P=4$ y el centro $O=-1$. ¿Cuánto vale $P\'$?', 'على المحور $x$: $P=4$ والمركز $O=-1$. كم $P\'$؟', 'On the $x$ axis: $P=4$ and the centre $O=-1$. What is $P\'$?'), expected: answer('c109'), hint: same('$P\'=2O-P$'), explanation: same('$2\\cdot(-1)-4=-6$') },
    { id: 110, stage: 'reflections', points: 10, context: 'starter', prompt: say('$(3,1)$ puntua $x=-2$ ardatzarekiko islatzen da. Zein da irudiaren $x$?', 'El punto $(3,1)$ se refleja en el eje $x=-2$. ¿Cuál es la $x$ de la imagen?', 'تنعكس $(3,1)$ في المحور $x=-2$. ما $x$ للصورة؟', 'The point $(3,1)$ is reflected in the axis $x=-2$. What is the $x$ of the image?'), expected: answer('c110'), hint: same('$2k-x$'), explanation: same('$2\\cdot(-2)-3=-7$') },
    { id: 111, stage: 'reflections', points: 20, context: 'advanced', prompt: say('Bi ardatz jatorrian ebakitzen dira 35°-ko angeluan. Bi simetriak elkarren segidan: zenbat graduko biraketa da?', 'Dos ejes se cortan en el origen formando 35°. Las dos simetrías seguidas: ¿un giro de cuántos grados?', 'يتقاطع محوران في الأصل بزاوية 35°. التناظران المتتاليان: دوران بكم درجة؟', 'Two axes cross at the origin at 35°. The two reflections in a row: a rotation of how many degrees?'), expected: answer('c111'), hint: say('Angeluaren bikoitza.', 'El doble del ángulo.', 'ضعف الزاوية.', 'Twice the angle.'), explanation: same('$2\\cdot 35°=70°$') },
    { id: 112, stage: 'reflections', points: 30, context: 'master', prompt: say('$x=-3$ eta gero $x=4$ ardatzekiko simetriak. Zein da lekualdaketaren bektorearen lehen osagaia?', 'Simetrías de ejes $x=-3$ y después $x=4$. ¿Cuál es la primera componente del vector de la traslación?', 'تناظران بالمحورين $x=-3$ ثم $x=4$. ما المركّبة الأولى لمتجه الانسحاب؟', 'Reflections in $x=-3$ and then $x=4$. What is the first component of the translation vector?'), expected: answer('c112'), hint: say('Distantzia: 7.', 'Distancia: 7.', 'المسافة: 7.', 'Distance: 7.'), explanation: same('$2\\cdot(4-(-3))=14$') },
    { id: 113, stage: 'patterns', points: 10, context: 'starter', prompt: say('Friso batek 4 cm-ko 10 motibo ditu, 7 cm-ko bektorearekin. Zenbat neurtzen du (cm)?', 'Un friso tiene 10 motivos de 4 cm con un vector de 7 cm. ¿Cuánto mide (cm)?', 'إفريز من 10 نقوش بعرض 4 سم والمتجه 7 سم. كم طوله (سم)؟', 'A frieze has 10 motifs 4 cm wide with a 7 cm vector. How long is it (cm)?'), expected: answer('c113'), hint: say('9 jauzi.', '9 saltos.', '9 قفزات.', '9 jumps.'), explanation: same('$9\\cdot 7+4=67$') },
    { id: 114, stage: 'patterns', points: 20, context: 'advanced', prompt: say('2 oktogono erregular (8 alde) erpin batean. Zenbat gradu geratzen dira beste baldosa batentzat?', '2 octógonos regulares (8 lados) en un vértice. ¿Cuántos grados quedan para otra baldosa?', 'مثمنان منتظمان (8 أضلاع) عند رأس. كم درجة تبقى لبلاطة أخرى؟', '2 regular octagons (8 sides) at a vertex. How many degrees are left for another tile?'), expected: answer('c114'), hint: say('Oktogonoa: 135°.', 'Octógono: 135°.', 'المثمن: 135°.', 'Octagon: 135°.'), explanation: same('$360°-2\\cdot 135°=90°$') },
    { id: 115, stage: 'patterns', points: 30, context: 'master', prompt: say('Jatorrian zentroa eta $k=-2$ duen homotezia. Zein da $(5,1)$ puntuaren irudiaren $x$?', 'Homotecia de centro el origen y $k=-2$. ¿Cuál es la $x$ de la imagen de $(5,1)$?', 'تحاكٍ مركزه الأصل و$k=-2$. ما $x$ لصورة $(5,1)$؟', 'Enlargement from the origin with $k=-2$. What is the $x$ of the image of $(5,1)$?'), expected: answer('c115'), hint: say('$k$ negatiboa: beste aldera.', '$k$ negativa: al otro lado.', '$k$ سالبة: إلى الجهة الأخرى.', 'Negative $k$: to the other side.'), explanation: same('$-2\\cdot 5=-10$') }
]

const item = (id: number, difficulty: 'easy' | 'medium' | 'hard', question: ReturnType<typeof say>, solution: ReturnType<typeof say>) => ({ id, difficulty, question, solution, answer: { expected: answer(`b${id}`) } })
const first = (a: number, b: number, c: number, d: number) => say(`$A=(${a},${b})$ eta $B=(${c},${d})$. Zein da $\\vec{AB}$ bektorearen lehen osagaia?`, `$A=(${a},${b})$ y $B=(${c},${d})$. ¿Cuál es la primera componente de $\\vec{AB}$?`, `$A=(${a},${b})$ و$B=(${c},${d})$. ما المركّبة الأولى لـ$\\vec{AB}$؟`, `$A=(${a},${b})$ and $B=(${c},${d})$. What is the first component of $\\vec{AB}$?`)
const length = (a: number, b: number) => say(`Zein da $(${a},${b})$ bektorearen modulua?`, `¿Cuál es el módulo de $(${a},${b})$?`, `ما طول $(${a},${b})$؟`, `What is the length of $(${a},${b})$?`)
const addFirst = (a: number, b: number, c: number, d: number) => say(`Zein da $(${a},${b})+(${c},${d})$ baturaren lehen osagaia?`, `¿Cuál es la primera componente de $(${a},${b})+(${c},${d})$?`, `ما المركّبة الأولى لـ$(${a},${b})+(${c},${d})$؟`, `What is the first component of $(${a},${b})+(${c},${d})$?`)
const moveX = (x: number, y: number, a: number, b: number) => say(`$(${x},${y})$ puntua $(${a},${b})$ bektorearekin lekualdatzen da. Zein da irudiaren $x$?`, `El punto $(${x},${y})$ se traslada con $(${a},${b})$. ¿Cuál es la $x$ de la imagen?`, `تُنقل $(${x},${y})$ بالمتجه $(${a},${b})$. ما $x$ للصورة؟`, `The point $(${x},${y})$ is translated by $(${a},${b})$. What is the $x$ of the image?`)
const vectorX = (x: number, y: number, x2: number, y2: number) => say(`$(${x},${y})$ puntuaren irudia $(${x2},${y2})$ da. Zein da bektorearen lehen osagaia?`, `La imagen de $(${x},${y})$ es $(${x2},${y2})$. ¿Cuál es la primera componente del vector?`, `صورة $(${x},${y})$ هي $(${x2},${y2})$. ما المركّبة الأولى للمتجه؟`, `The image of $(${x},${y})$ is $(${x2},${y2})$. What is the first component of the vector?`)
const turnAsk = (x: number, y: number, degrees: number, coordinate: 'x' | 'y') => say(`$(${x},${y})$ jatorriaren inguruan ${degrees}° biratzen da. Zein da irudiaren $${coordinate}$?`, `$(${x},${y})$ gira ${degrees}° alrededor del origen. ¿Cuál es la $${coordinate}$ de la imagen?`, `تدور $(${x},${y})$ بزاوية ${degrees}° حول الأصل. ما $${coordinate}$ للصورة؟`, `$(${x},${y})$ is rotated ${degrees}° about the origin. What is the $${coordinate}$ of the image?`)
const centralAsk = (o: number, p: number) => say(`$x$ ardatzean: $P=${p}$ eta zentroa $O=${o}$. Zenbat da $P'$?`, `Sobre el eje $x$: $P=${p}$ y el centro $O=${o}$. ¿Cuánto vale $P'$?`, `على المحور $x$: $P=${p}$ والمركز $O=${o}$. كم $P'$؟`, `On the $x$ axis: $P=${p}$ and the centre $O=${o}$. What is $P'$?`)
const order = (sides: number) => say(`${sides} aldeko poligono erregularra: zein da bere buruarekin bat egiteko biraketa txikiena (°)?`, `Polígono regular de ${sides} lados: ¿cuál es el menor giro que lo deja igual (°)?`, `مضلع منتظم ذو ${sides} أضلاع: ما أصغر دوران يتركه كما هو (°)؟`, `Regular polygon with ${sides} sides: what is the smallest turn that leaves it the same (°)?`)
const mirrorX = (k: number, x: number, y: number) => say(`$(${x},${y})$ puntua $x=${k}$ ardatzarekiko islatzen da. Zein da irudiaren $x$?`, `El punto $(${x},${y})$ se refleja en el eje $x=${k}$. ¿Cuál es la $x$ de la imagen?`, `تنعكس $(${x},${y})$ في المحور $x=${k}$. ما $x$ للصورة؟`, `The point $(${x},${y})$ is reflected in the axis $x=${k}$. What is the $x$ of the image?`)
const twoMirrors = (k1: number, k2: number) => say(`$x=${k1}$ eta gero $x=${k2}$ ardatzekiko simetriak. Zein da lekualdaketaren lehen osagaia?`, `Simetrías de ejes $x=${k1}$ y después $x=${k2}$. ¿Cuál es la primera componente de la traslación?`, `تناظران بالمحورين $x=${k1}$ ثم $x=${k2}$. ما المركّبة الأولى للانسحاب؟`, `Reflections in $x=${k1}$ and then $x=${k2}$. What is the first component of the translation?`)
const crossing = (angle: number) => say(`Bi ardatz ${angle}°-ko angeluan ebakitzen dira. Bi simetriak elkarren segidan: zenbat graduko biraketa?`, `Dos ejes se cortan formando ${angle}°. Las dos simetrías seguidas: ¿un giro de cuántos grados?`, `يتقاطع محوران بزاوية ${angle}°. التناظران المتتاليان: دوران بكم درجة؟`, `Two axes cross at ${angle}°. The two reflections in a row: a rotation of how many degrees?`)
const tiles = (sides: number) => say(`Zenbat ${sides} aldeko poligono erregular elkartzen dira mosaiko baten erpin batean?`, `¿Cuántos polígonos regulares de ${sides} lados se juntan en un vértice de un mosaico?`, `كم مضلعًا منتظمًا ذا ${sides} أضلاع يلتقي عند رأس في تبليط؟`, `How many regular polygons with ${sides} sides meet at a vertex of a tiling?`)
const zoomX = (k: number, x: number, y: number) => say(`Jatorrian zentroa eta $k=${String(k).replace('.', '{,}')}$ duen homotezia. Zein da $(${x},${y})$ puntuaren irudiaren $x$?`, `Homotecia de centro el origen y $k=${String(k).replace('.', '{,}')}$. ¿Cuál es la $x$ de la imagen de $(${x},${y})$?`, `تحاكٍ مركزه الأصل و$k=${String(k).replace('.', '{,}')}$. ما $x$ لصورة $(${x},${y})$؟`, `Enlargement from the origin with $k=${String(k).replace('.', '{,}')}$. What is the $x$ of the image of $(${x},${y})$?`)
const friezeAsk = (count: number, width: number, step: number) => say(`Friso batek ${width} cm-ko ${count} motibo ditu, ${step} cm-ko bektorearekin. Zenbat neurtzen du (cm)?`, `Un friso tiene ${count} motivos de ${width} cm con un vector de ${step} cm. ¿Cuánto mide (cm)?`, `إفريز من ${count} نقوش بعرض ${width} سم والمتجه ${step} سم. كم طوله (سم)؟`, `A frieze has ${count} motifs ${width} cm wide with a ${step} cm vector. How long is it (cm)?`)
const gapAsk = (sides: number, count: number) => say(`${count} poligono erregular (${sides} alde) erpin batean. Zenbat gradu geratzen dira?`, `${count} polígonos regulares de ${sides} lados en un vértice. ¿Cuántos grados quedan?`, `${count} مضلعات منتظمة ذات ${sides} أضلاع عند رأس. كم درجة تبقى؟`, `${count} regular polygons with ${sides} sides at a vertex. How many degrees are left?`)

export const motions3ExerciseBank: ExerciseSection[] = [
    {
        id: 'vectors',
        title: say('Bektoreak', 'Vectores', 'المتجهات', 'Vectors'),
        items: [
            item(1, 'easy', first(1, 2, 6, 5), same('$6-1=5$')),
            item(2, 'easy', first(5, 0, -2, 3), same('$-2-5=-7$')),
            item(3, 'easy', length(3, 4), same('$\\sqrt{9+16}=5$')),
            item(4, 'easy', length(6, 8), same('$\\sqrt{36+64}=10$')),
            item(5, 'medium', addFirst(4, 1, 3, -2), same('$4+3=7$')),
            item(6, 'medium', addFirst(-2, 5, 7, 0), same('$-2+7=5$')),
            item(7, 'medium', length(-5, 12), same('$\\sqrt{25+144}=13$')),
            item(8, 'medium', first(-3, 1, -8, 4), same('$-8-(-3)=-5$')),
            item(9, 'hard', length(15, -8), same('$\\sqrt{225+64}=17$')),
            item(10, 'hard', addFirst(-6, 2, -4, -2), same('$-6+(-4)=-10$'))
        ]
    },
    {
        id: 'translations',
        title: say('Lekualdaketak', 'Traslaciones', 'الانسحابات', 'Translations'),
        items: [
            item(11, 'easy', moveX(2, 1, 5, 3), same('$2+5=7$')),
            item(12, 'easy', moveX(6, 0, -4, 2), same('$6-4=2$')),
            item(13, 'easy', vectorX(3, 1, 9, 4), same('$9-3=6$')),
            item(14, 'easy', vectorX(-2, 0, -7, 3), same('$-7-(-2)=-5$')),
            item(15, 'medium', moveX(-5, 2, 3, 1), same('$-5+3=-2$')),
            item(16, 'medium', addFirst(4, 2, -1, 3), same('$4+(-1)=3$')),
            item(17, 'medium', vectorX(0, 0, -6, 1), same('$-6-0=-6$')),
            item(18, 'medium', addFirst(-3, 1, 8, -1), same('$-3+8=5$')),
            item(19, 'hard', moveX(7, -1, -12, 4), same('$7-12=-5$')),
            item(20, 'hard', vectorX(-4, 2, 5, -2), same('$5-(-4)=9$'))
        ]
    },
    {
        id: 'rotations',
        title: say('Biraketak', 'Giros', 'الدورانات', 'Rotations'),
        items: [
            item(21, 'easy', turnAsk(3, 5, 90, 'x'), same('$(3,5)\\to(-5,3)$')),
            item(22, 'easy', turnAsk(3, 5, 90, 'y'), same('$(3,5)\\to(-5,3)$')),
            item(23, 'easy', turnAsk(6, 1, 180, 'x'), same('$(6,1)\\to(-6,-1)$')),
            item(24, 'easy', turnAsk(-2, 4, 180, 'x'), same('$(-2,4)\\to(2,-4)$')),
            item(25, 'medium', centralAsk(0, 5), same('$2\\cdot 0-5=-5$')),
            item(26, 'medium', order(4), same('$360°\\div 4=90°$')),
            item(27, 'medium', order(6), same('$360°\\div 6=60°$')),
            item(28, 'medium', turnAsk(-1, 4, 270, 'x'), same('$(-1,4)\\to(4,1)$')),
            item(29, 'hard', centralAsk(3, -2), same('$2\\cdot 3-(-2)=8$')),
            item(30, 'hard', order(10), same('$360°\\div 10=36°$'))
        ]
    },
    {
        id: 'reflections',
        title: say('Simetriak', 'Simetrías', 'التناظرات', 'Reflections'),
        items: [
            item(31, 'easy', say('$(2,5)$ puntua X ardatzarekiko islatzen da. Zein da irudiaren $y$?', 'El punto $(2,5)$ se refleja en el eje X. ¿Cuál es la $y$ de la imagen?', 'تنعكس $(2,5)$ في محور X. ما $y$ للصورة؟', 'The point $(2,5)$ is reflected in the X axis. What is the $y$ of the image?'), same('$(2,5)\\to(2,-5)$')),
            item(32, 'easy', say('$(-3,1)$ puntua Y ardatzarekiko islatzen da. Zein da irudiaren $x$?', 'El punto $(-3,1)$ se refleja en el eje Y. ¿Cuál es la $x$ de la imagen?', 'تنعكس $(-3,1)$ في محور Y. ما $x$ للصورة؟', 'The point $(-3,1)$ is reflected in the Y axis. What is the $x$ of the image?'), same('$(-3,1)\\to(3,1)$')),
            item(33, 'easy', mirrorX(2, 7, 0), same('$2\\cdot 2-7=-3$')),
            item(34, 'easy', mirrorX(-1, 3, 2), same('$2\\cdot(-1)-3=-5$')),
            item(35, 'medium', say('Zenbat simetria-ardatz ditu hexagono erregular batek (6 alde)?', '¿Cuántos ejes de simetría tiene un hexágono regular (6 lados)?', 'كم محور تناظر لسداسي منتظم (6 أضلاع)؟', 'How many axes of symmetry does a regular hexagon (6 sides) have?'), say('6 ardatz.', '6 ejes.', '6 محاور.', '6 axes.')),
            item(36, 'medium', twoMirrors(1, 4), same('$2\\cdot(4-1)=6$')),
            item(37, 'medium', crossing(60), same('$2\\cdot 60°=120°$')),
            item(38, 'medium', mirrorX(4, -2, 1), same('$2\\cdot 4-(-2)=10$')),
            item(39, 'hard', twoMirrors(-2, 3), same('$2\\cdot(3-(-2))=10$')),
            item(40, 'hard', crossing(45), same('$2\\cdot 45°=90°$'))
        ]
    },
    {
        id: 'patterns',
        title: say('Frisoak eta mosaikoak', 'Frisos y mosaicos', 'الأفاريز والتبليطات', 'Friezes and tilings'),
        items: [
            item(41, 'easy', tiles(3), same('$360°\\div 60°=6$')),
            item(42, 'easy', tiles(4), same('$360°\\div 90°=4$')),
            item(43, 'easy', friezeAsk(5, 2, 3), same('$4\\cdot 3+2=14$')),
            item(44, 'easy', zoomX(3, 4, -1), same('$3\\cdot 4=12$')),
            item(45, 'medium', zoomX(0.5, 10, 6), same('$0{,}5\\cdot 10=5$')),
            item(46, 'medium', gapAsk(5, 3), same('$360°-3\\cdot 108°=36°$')),
            item(47, 'medium', friezeAsk(12, 2, 5), same('$11\\cdot 5+2=57$')),
            item(48, 'medium', zoomX(-1, 7, 2), same('$-1\\cdot 7=-7$')),
            item(49, 'hard', gapAsk(10, 2), same('$360°-2\\cdot 144°=72°$')),
            item(50, 'hard', zoomX(1.5, 6, 4), same('$1{,}5\\cdot 6=9$'))
        ]
    }
]

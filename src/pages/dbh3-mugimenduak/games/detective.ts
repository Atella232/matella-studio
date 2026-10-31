import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { Stars } from '../../../features/unit-v2/games/records.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'

/* ==========================================================================
   Mugimenduen detektibea (3. DBH): a worked solution of three lines where
   exactly one line has a mistake, and the lines after it carry it on. The
   learner taps the wrong line and says which mistake it is, among three.
   Level 1: vectors and translations (start minus end, the components
   added for the length, a sign lost in a translation, the vector of a
   translation turned round); level 2: rotations and reflections (90° as a
   swap only, the wrong sign in 90°, the wrong axis, x = k as k − x);
   level 3: compositions, friezes and enlargements (d instead of 2d, α
   instead of 2α, n jumps in a frieze, adding k). Every case carries the
   right number and the number reached.
   ========================================================================== */

export type DetectiveError =
    | 'start-minus-end'
    | 'modulus-add'
    | 'translate-sign'
    | 'vector-reversed'
    | 'swap-only'
    | 'rotation-sign'
    | 'wrong-axis'
    | 'mirror-k'
    | 'mirrors-once'
    | 'angle-once'
    | 'frieze-jumps'
    | 'homothety-add'

export interface DetectiveLine {
    label: LocalizedText
    latex: string
}

export interface DetectiveCase {
    problem: LocalizedText
    lines: DetectiveLine[]
    wrong: number
    error: DetectiveError
    fix: string
    options: DetectiveError[]
    right: number
    reached: number
}

export const detectiveLevels: DetectiveError[][] = [
    ['start-minus-end', 'modulus-add', 'translate-sign', 'vector-reversed'],
    ['swap-only', 'rotation-sign', 'wrong-axis', 'mirror-k'],
    ['mirrors-once', 'angle-once', 'frieze-jumps', 'homothety-add']
]

export const DETECTIVE_CASES = 6

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const line = (label: LocalizedText, latex: string): DetectiveLine => ({ label, latex })
const LABELS = {
    rule: say('Araua', 'Regla', 'القاعدة', 'Rule'),
    step: say('Urratsa', 'Paso', 'الخطوة', 'Step'),
    result: say('Emaitza', 'Resultado', 'النتيجة', 'Result')
}

export const detectiveErrorNames: Record<DetectiveError, LocalizedText> = {
    'start-minus-end': say('Jatorria ken muturra egin du', 'Hizo origen menos extremo', 'طرح النهاية من البداية', 'Did start minus end'),
    'modulus-add': say('Moduluan osagaiak batu ditu', 'Sumó las componentes para el módulo', 'جمع المركّبتين لإيجاد الطول', 'Added the components for the length'),
    'translate-sign': say('Osagai baten zeinua galdu du', 'Perdió el signo de una componente', 'أضاع إشارة مركّبة', 'Lost the sign of a component'),
    'vector-reversed': say('Bektorea alderantziz kalkulatu du', 'Calculó el vector al revés', 'حسب المتجه بالعكس', 'Worked out the vector the wrong way round'),
    'swap-only': say('90° biratzean koordenatuak trukatu besterik ez du egin', 'Al girar 90° solo intercambió las coordenadas', 'عند الدوران 90° اكتفى بمبادلة الإحداثيين', 'Only swapped the coordinates for a 90° turn'),
    'rotation-sign': say('Biraketan zeinua koordenatu okerrean aldatu du', 'En el giro cambió el signo de la coordenada equivocada', 'غيّر في الدوران إشارة الإحداثي الخطأ', 'Changed the sign of the wrong coordinate in the rotation'),
    'wrong-axis': say('Beste ardatzarekiko islatu du', 'Reflejó respecto al otro eje', 'عكس بالنسبة إلى المحور الآخر', 'Reflected in the other axis'),
    'mirror-k': say('$x=k$ ardatzarekiko $k-x$ egin du, $2k-x$ beharrean', 'Respecto a $x=k$ hizo $k-x$ en vez de $2k-x$', 'بالنسبة إلى $x=k$ حسب $k-x$ بدل $2k-x$', 'In $x=k$ did $k-x$ instead of $2k-x$'),
    'mirrors-once': say('Bi ispilu paralelo: distantzia ez du bikoiztu', 'Dos espejos paralelos: no dobló la distancia', 'مرآتان متوازيتان: لم يضاعف المسافة', 'Two parallel mirrors: did not double the distance'),
    'angle-once': say('Bi ispilu ebakitzaile: angelua ez du bikoiztu', 'Dos espejos que se cortan: no dobló el ángulo', 'مرآتان متقاطعتان: لم يضاعف الزاوية', 'Two crossing mirrors: did not double the angle'),
    'frieze-jumps': say('Frisoan $n$ jauzi zenbatu ditu, $n-1$ beharrean', 'En el friso contó $n$ saltos en vez de $n-1$', 'في الإفريز عدّ $n$ قفزة بدل $n-1$', 'Counted $n$ jumps in the frieze instead of $n-1$'),
    'homothety-add': say('Homotezian $k$ batu du, biderkatu beharrean', 'En la homotecia sumó $k$ en vez de multiplicar', 'في التحاكي جمع $k$ بدل الضرب', 'Added $k$ in the enlargement instead of multiplying')
}

export const detectiveErrorTips: Record<DetectiveError, LocalizedText> = {
    'start-minus-end': say('$\\vec{AB}$: muturra ken jatorria.', '$\\vec{AB}$: extremo menos origen.', '$\\vec{AB}$: النهاية ناقص البداية.', '$\\vec{AB}$: end minus start.'),
    'modulus-add': say('$|(a,b)|=\\sqrt{a^{2}+b^{2}}$', '$|(a,b)|=\\sqrt{a^{2}+b^{2}}$', '$|(a,b)|=\\sqrt{a^{2}+b^{2}}$', '$|(a,b)|=\\sqrt{a^{2}+b^{2}}$'),
    'translate-sign': say('Osagai bakoitza bere zeinuarekin batu.', 'Suma cada componente con su signo.', 'اجمع كل مركّبة بإشارتها.', 'Add each component with its sign.'),
    'vector-reversed': say('Lekualdaketaren bektorea: irudia ken puntua.', 'Vector de la traslación: imagen menos punto.', 'متجه الانسحاب: الصورة ناقص النقطة.', 'The vector of a translation: image minus point.'),
    'swap-only': say('$90°$: $(x,y)\\to(-y,x)$. Trukatzea bakarrik $y=x$ simetria da.', '$90°$: $(x,y)\\to(-y,x)$. Solo intercambiar es la simetría en $y=x$.', '$90°$: $(x,y)\\to(-y,x)$. المبادلة وحدها تناظر في $y=x$.', '$90°$: $(x,y)\\to(-y,x)$. Only swapping is the reflection in $y=x$.'),
    'rotation-sign': say('$90°$: lehen koordenatu berriak zeinua aldatzen du, $-y$.', '$90°$: la nueva primera coordenada cambia de signo, $-y$.', '$90°$: الإحداثي الأول الجديد تتغيّر إشارته، $-y$.', '$90°$: the new first coordinate changes sign, $-y$.'),
    'wrong-axis': say('X ardatzarekiko $y$ aldatzen da; Y ardatzarekiko $x$.', 'Respecto al eje X cambia la $y$; respecto al eje Y, la $x$.', 'بالنسبة إلى محور X تتغيّر $y$، وإلى محور Y تتغيّر $x$.', 'In the X axis $y$ changes; in the Y axis, $x$.'),
    'mirror-k': say('$x=k$ ardatza erdian dago: $x\'=2k-x$.', 'El eje $x=k$ está en el medio: $x\'=2k-x$.', 'المحور $x=k$ في المنتصف: $x\'=2k-x$.', 'The axis $x=k$ is halfway: $x\'=2k-x$.'),
    'mirrors-once': say('Ispilu paraleloak: lekualdaketa $2d$.', 'Espejos paralelos: traslación $2d$.', 'مرآتان متوازيتان: انسحاب $2d$.', 'Parallel mirrors: translation by $2d$.'),
    'angle-once': say('Ispilu ebakitzaileak: biraketa $2\\alpha$.', 'Espejos secantes: giro $2\\alpha$.', 'مرآتان متقاطعتان: دوران $2\\alpha$.', 'Crossing mirrors: rotation by $2\\alpha$.'),
    'frieze-jumps': say('$n$ motibo: $n-1$ jauzi eta azken motiboa.', '$n$ motivos: $n-1$ saltos y el último motivo.', '$n$ نقشًا: $n-1$ قفزة والنقش الأخير.', '$n$ motifs: $n-1$ jumps and the last motif.'),
    'homothety-add': say('Homotezia: $(kx,\\ ky)$.', 'Homotecia: $(kx,\\ ky)$.', 'التحاكي: $(kx,\\ ky)$.', 'Enlargement: $(kx,\\ ky)$.')
}

type Built = Omit<DetectiveCase, 'options'>
type Builder = (random: Random) => Built | null

const askFirst = (eu: string, es: string, ar: string, en: string) => say(eu, es, ar, en)

function startMinusEnd(random: Random): Built {
    const a = randomInt(random, -4, 3)
    const c = a + randomInt(random, 2, 7)
    return {
        problem: askFirst(`$A=(${a},1)$ eta $B=(${c},4)$. $\\vec{AB}$ bektorearen lehen osagaia?`, `$A=(${a},1)$ y $B=(${c},4)$. ¿Primera componente de $\\vec{AB}$?`, `$A=(${a},1)$ و$B=(${c},4)$. المركّبة الأولى لـ$\\vec{AB}$؟`, `$A=(${a},1)$ and $B=(${c},4)$. First component of $\\vec{AB}$?`),
        lines: [line(LABELS.rule, `\\vec{AB}=A-B`), line(LABELS.step, `${a}-${c < 0 ? `(${c})` : c}`), line(LABELS.result, `${a - c}`)],
        wrong: 0, error: 'start-minus-end', fix: `${c}-${a < 0 ? `(${a})` : a}=${c - a}`, right: c - a, reached: a - c
    }
}

const TRIPLES: Array<[number, number, number]> = [[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17], [9, 12, 15], [12, 16, 20]]

function modulusAdd(random: Random): Built {
    const [a, b, c] = pick(random, TRIPLES)
    return {
        problem: say(`Zein da $(${a},${b})$ bektorearen modulua?`, `¿Cuál es el módulo de $(${a},${b})$?`, `ما طول $(${a},${b})$؟`, `What is the length of $(${a},${b})$?`),
        lines: [line(LABELS.rule, `|\\vec{v}|=a+b`), line(LABELS.step, `${a}+${b}`), line(LABELS.result, `${a + b}`)],
        wrong: 0, error: 'modulus-add', fix: `\\sqrt{${a * a}+${b * b}}=${c}`, right: c, reached: a + b
    }
}

function translateSign(random: Random): Built {
    const x = randomInt(random, -4, 4)
    const a = -randomInt(random, 2, 6)
    return {
        problem: say(`$(${x},2)$ puntua $(${a},3)$ bektorearekin lekualdatzen da. Irudiaren $x$?`, `El punto $(${x},2)$ se traslada con $(${a},3)$. ¿$x$ de la imagen?`, `تُنقل $(${x},2)$ بالمتجه $(${a},3)$. $x$ للصورة؟`, `The point $(${x},2)$ is translated by $(${a},3)$. $x$ of the image?`),
        lines: [line(LABELS.rule, `x'=x+a`), line(LABELS.step, `${x}+${-a}`), line(LABELS.result, `x'=${x - a}`)],
        wrong: 1, error: 'translate-sign', fix: `${x}+(${a})=${x + a}`, right: x + a, reached: x - a
    }
}

function vectorReversed(random: Random): Built | null {
    const x = randomInt(random, -4, 4)
    const x2 = randomInt(random, -4, 4)
    if (x === x2) return null
    return {
        problem: say(`$(${x},1)$ puntuaren irudia $(${x2},5)$ da. Bektorearen lehen osagaia?`, `La imagen de $(${x},1)$ es $(${x2},5)$. ¿Primera componente del vector?`, `صورة $(${x},1)$ هي $(${x2},5)$. المركّبة الأولى للمتجه؟`, `The image of $(${x},1)$ is $(${x2},5)$. First component of the vector?`),
        lines: [line(LABELS.rule, `a=x-x'`), line(LABELS.step, `${x}-${x2 < 0 ? `(${x2})` : x2}`), line(LABELS.result, `a=${x - x2}`)],
        wrong: 0, error: 'vector-reversed', fix: `a=${x2}-${x < 0 ? `(${x})` : x}=${x2 - x}`, right: x2 - x, reached: x - x2
    }
}

function swapOnly(random: Random): Built | null {
    const x = randomInt(random, 1, 6)
    const y = randomInt(random, 1, 6)
    return {
        problem: say(`$(${x},${y})$ jatorriaren inguruan 90° biratzen da. Irudiaren $x$?`, `$(${x},${y})$ gira 90° alrededor del origen. ¿$x$ de la imagen?`, `تدور $(${x},${y})$ بزاوية 90° حول الأصل. $x$ للصورة؟`, `$(${x},${y})$ is rotated 90° about the origin. $x$ of the image?`),
        lines: [line(LABELS.rule, `(x,y)\\to(y,x)`), line(LABELS.step, `(${y},${x})`), line(LABELS.result, `x'=${y}`)],
        wrong: 0, error: 'swap-only', fix: `(x,y)\\to(-y,x)=(${-y},${x})`, right: -y, reached: y
    }
}

function rotationSign(random: Random): Built {
    const x = randomInt(random, 1, 6)
    const y = randomInt(random, 1, 6)
    return {
        problem: say(`$(${x},${y})$ jatorriaren inguruan 90° biratzen da. Irudiaren $y$?`, `$(${x},${y})$ gira 90° alrededor del origen. ¿$y$ de la imagen?`, `تدور $(${x},${y})$ بزاوية 90° حول الأصل. $y$ للصورة؟`, `$(${x},${y})$ is rotated 90° about the origin. $y$ of the image?`),
        lines: [line(LABELS.rule, `(x,y)\\to(y,-x)`), line(LABELS.step, `(${y},${-x})`), line(LABELS.result, `y'=${-x}`)],
        wrong: 0, error: 'rotation-sign', fix: `(x,y)\\to(-y,x)=(${-y},${x})`, right: x, reached: -x
    }
}

function wrongAxis(random: Random): Built {
    const x = randomInt(random, 1, 6)
    const y = randomInt(random, 1, 6)
    return {
        problem: say(`$(${x},${y})$ X ardatzarekiko islatzen da. Irudiaren $y$?`, `$(${x},${y})$ se refleja en el eje X. ¿$y$ de la imagen?`, `تنعكس $(${x},${y})$ في محور X. $y$ للصورة؟`, `$(${x},${y})$ is reflected in the X axis. $y$ of the image?`),
        lines: [line(LABELS.rule, `(x,y)\\to(-x,y)`), line(LABELS.step, `(${-x},${y})`), line(LABELS.result, `y'=${y}`)],
        wrong: 0, error: 'wrong-axis', fix: `(x,y)\\to(x,-y)=(${x},${-y})`, right: -y, reached: y
    }
}

function mirrorK(random: Random): Built | null {
    const k = randomInt(random, 1, 4)
    const x = randomInt(random, -3, 6)
    if (k - x === 2 * k - x || x === k) return null
    return {
        problem: say(`$(${x},2)$ puntua $x=${k}$ ardatzarekiko islatzen da. Irudiaren $x$?`, `$(${x},2)$ se refleja en el eje $x=${k}$. ¿$x$ de la imagen?`, `تنعكس $(${x},2)$ في المحور $x=${k}$. $x$ للصورة؟`, `$(${x},2)$ is reflected in the axis $x=${k}$. $x$ of the image?`),
        lines: [line(LABELS.rule, `x'=k-x`), line(LABELS.step, `${k}-${x < 0 ? `(${x})` : x}`), line(LABELS.result, `x'=${k - x}`)],
        wrong: 0, error: 'mirror-k', fix: `x'=2\\cdot ${k}-${x < 0 ? `(${x})` : x}=${2 * k - x}`, right: 2 * k - x, reached: k - x
    }
}

function mirrorsOnce(random: Random): Built {
    const k1 = randomInt(random, -3, 1)
    const k2 = k1 + randomInt(random, 2, 5)
    const d = k2 - k1
    return {
        problem: say(`$x=${k1}$ eta gero $x=${k2}$ ardatzekiko simetriak. Zenbat unitate lekualdatzen da irudia?`, `Simetrías de ejes $x=${k1}$ y después $x=${k2}$. ¿Cuántas unidades se traslada la figura?`, `تناظران بالمحورين $x=${k1}$ ثم $x=${k2}$. كم وحدة ينتقل الشكل؟`, `Reflections in $x=${k1}$ and then $x=${k2}$. How many units does the shape move?`),
        lines: [line(LABELS.step, `d=${k2}-${k1 < 0 ? `(${k1})` : k1}=${d}`), line(LABELS.rule, `\\vec{v}=d`), line(LABELS.result, `${d}`)],
        wrong: 1, error: 'mirrors-once', fix: `2d=2\\cdot ${d}=${2 * d}`, right: 2 * d, reached: d
    }
}

function angleOnce(random: Random): Built {
    const angle = pick(random, [20, 25, 30, 35, 40, 45, 50, 60, 70])
    return {
        problem: say(`Bi ispilu ${angle}°-ko angeluan ebakitzen dira. Zenbat graduko biraketa da?`, `Dos espejos se cortan formando ${angle}°. ¿Un giro de cuántos grados?`, `مرآتان تتقاطعان بزاوية ${angle}°. دوران بكم درجة؟`, `Two mirrors cross at ${angle}°. A rotation of how many degrees?`),
        lines: [line(LABELS.rule, `\\beta=\\alpha`), line(LABELS.step, `\\beta=${angle}°`), line(LABELS.result, `${angle}°`)],
        wrong: 0, error: 'angle-once', fix: `2\\cdot ${angle}°=${2 * angle}°`, right: 2 * angle, reached: angle
    }
}

function friezeJumps(random: Random): Built {
    const count = randomInt(random, 4, 12)
    const step = randomInt(random, 3, 8)
    const width = randomInt(random, 1, step - 1)
    return {
        problem: say(`Friso batek ${width} cm-ko ${count} motibo ditu, ${step} cm-ko bektorearekin. Zenbat neurtzen du (cm)?`, `Un friso tiene ${count} motivos de ${width} cm con un vector de ${step} cm. ¿Cuánto mide (cm)?`, `إفريز من ${count} نقوش بعرض ${width} سم والمتجه ${step} سم. كم طوله (سم)؟`, `A frieze has ${count} motifs ${width} cm wide with a ${step} cm vector. How long is it (cm)?`),
        lines: [line(LABELS.step, `${count}\\cdot ${step}`), line(LABELS.step, `${count * step}+${width}`), line(LABELS.result, `${count * step + width}`)],
        wrong: 0, error: 'frieze-jumps', fix: `${count - 1}\\cdot ${step}+${width}=${(count - 1) * step + width}`, right: (count - 1) * step + width, reached: count * step + width
    }
}

function homothetyAdd(random: Random): Built | null {
    const k = randomInt(random, 2, 4)
    const x = randomInt(random, -5, 6)
    if (x === 0 || x + k === k * x) return null
    return {
        problem: say(`Jatorrian zentroa eta $k=${k}$ duen homotezia. $(${x},1)$ puntuaren irudiaren $x$?`, `Homotecia de centro el origen y $k=${k}$. ¿$x$ de la imagen de $(${x},1)$?`, `تحاكٍ مركزه الأصل و$k=${k}$. $x$ لصورة $(${x},1)$؟`, `Enlargement from the origin with $k=${k}$. $x$ of the image of $(${x},1)$?`),
        lines: [line(LABELS.rule, `x'=x+k`), line(LABELS.step, `${x}+${k}`), line(LABELS.result, `x'=${x + k}`)],
        wrong: 0, error: 'homothety-add', fix: `x'=${k}\\cdot ${x < 0 ? `(${x})` : x}=${k * x}`, right: k * x, reached: x + k
    }
}

const builders: Record<DetectiveError, Builder> = {
    'start-minus-end': startMinusEnd,
    'modulus-add': modulusAdd,
    'translate-sign': translateSign,
    'vector-reversed': vectorReversed,
    'swap-only': swapOnly,
    'rotation-sign': rotationSign,
    'wrong-axis': wrongAxis,
    'mirror-k': mirrorK,
    'mirrors-once': mirrorsOnce,
    'angle-once': angleOnce,
    'frieze-jumps': friezeJumps,
    'homothety-add': homothetyAdd
}

export function createDetectiveCase(random: Random, levelIndex: number, error: DetectiveError): DetectiveCase {
    const pool = detectiveLevels[levelIndex] ?? detectiveLevels[0]
    for (let attempt = 0; attempt < 500; attempt += 1) {
        const made = builders[error](random)
        if (!made || made.right === made.reached) continue
        const others = shuffle(random, pool.filter((item) => item !== error)).slice(0, 2)
        return { ...made, options: shuffle(random, [error, ...others]) }
    }
    throw new Error(`No detective case for ${error}`)
}

export function createDetectiveCases(random: Random, levelIndex: number): DetectiveCase[] {
    const pool = detectiveLevels[levelIndex] ?? detectiveLevels[0]
    const order = shuffle(random, pool)
    const errors = Array.from({ length: DETECTIVE_CASES }, (_, index) => order[index % order.length])
    return shuffle(random, errors).map((error) => createDetectiveCase(random, levelIndex, error))
}

export function detectiveStars(score: number): Stars {
    if (score >= 11) return 3
    if (score >= 9) return 2
    if (score >= 6) return 1
    return 0
}

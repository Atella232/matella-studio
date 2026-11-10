import { pick, randomInt, type Random } from '../../../features/unit-v2/games/random.ts'
import { createWorkedCases, type WorkedCase, type WorkedLine } from '../../../features/unit-v2/games/workedDetective.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { add, cross, det3, dot, scale, sub, type Vec3 } from '../space/vec3.ts'

/* ==========================================================================
   J4 · Espazioko bektoreen detektibea (Detective de vectores en el
   espacio): a worked solution of three lines with one wrong line, the
   mistakes of this unit. Level 1: AB as A − B, the magnitude without the
   z, the symmetric point taken as the midpoint, a combination with the
   third equation unchecked; level 2: the dot product written as a
   vector, the minus of the j forgotten, v × u taken equal to u × v, the
   projection divided by the wrong magnitude; level 3: the triangle
   without the half, the tetrahedron without the sixth, a negative
   volume and the sign changed by a rotation. `right` and `reached` only
   tell the cases apart.
   ========================================================================== */

export type SpaceDetectiveError =
    | 'reversed'
    | 'no-z'
    | 'symmetric-midpoint'
    | 'third-unchecked'
    | 'dot-vector'
    | 'j-sign'
    | 'order-kept'
    | 'projection-modulus'
    | 'triangle-half'
    | 'tetra-sixth'
    | 'negative-volume'
    | 'rotation-sign'

export const spaceDetectiveLevels: SpaceDetectiveError[][] = [
    ['reversed', 'no-z', 'symmetric-midpoint', 'third-unchecked'],
    ['dot-vector', 'j-sign', 'order-kept', 'projection-modulus'],
    ['triangle-half', 'tetra-sixth', 'negative-volume', 'rotation-sign']
]

export const SPACE_DETECTIVE_CASES = 6

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const line = (label: LocalizedText, latex: string): WorkedLine => ({ label, latex })
const vec = (a: Vec3) => `(${a.map((value) => value + 0).join(',')})`
const wrap = (value: number) => (value < 0 ? `(${value})` : String(value + 0))
const LABELS = {
    data: say('Datuak', 'Datos', 'المعطيات', 'Data'),
    step: say('Urratsa', 'Paso', 'الخطوة', 'Step'),
    result: say('Emaitza', 'Resultado', 'النتيجة', 'Result')
}
/** «Work out …» with one formula */
const work = (formula: string) => say(`Kalkulatu $${formula}$.`, `Calcula $${formula}$.`, `احسب $${formula}$.`, `Work out $${formula}$.`)

export const spaceDetectiveNames: Record<SpaceDetectiveError, LocalizedText> = {
    reversed: say('Jatorria ken muturra egin du', 'Restó origen menos extremo', 'طرح الأصل ناقص الطرف', 'Did start point minus end point'),
    'no-z': say('Moduluan ${z}$ koordenatua ahaztu du', 'Olvidó la ${z}$ en el módulo', 'نسي ${z}$ في الطول', 'Forgot the ${z}$ in the magnitude'),
    'symmetric-midpoint': say('Simetrikoaren ordez erdiko puntua kalkulatu du', 'Calculó el punto medio en lugar del simétrico', 'حسب المنتصف بدل النظيرة', 'Worked out the midpoint instead of the symmetric point'),
    'third-unchecked': say('Hirugarren ekuazioa ez du egiaztatu', 'No comprobó la tercera ecuación', 'لم يتحقق من المعادلة الثالثة', 'Did not check the third equation'),
    'dot-vector': say('Biderkadura eskalarra bektore gisa idatzi du', 'Escribió el producto escalar como un vector', 'كتب الجداء السلمي متجهًا', 'Wrote the dot product as a vector'),
    'j-sign': say('$\\vec{j}$ bektorearen minus zeinua ahaztu du', 'Olvidó el signo menos de la $\\vec{j}$', 'نسي الإشارة السالبة لـ $\\vec{j}$', 'Forgot the minus sign of the $\\vec{j}$'),
    'order-kept': say('Ordena aldatzean zeinua ez du aldatu', 'Cambió el orden sin cambiar el signo', 'غيّر الترتيب دون تغيير الإشارة', 'Swapped the order without changing the sign'),
    'projection-modulus': say('Bektore okerraren moduluaz zatitu du', 'Dividió entre el módulo del vector equivocado', 'قسم على طول المتجه الخطأ', 'Divided by the magnitude of the wrong vector'),
    'triangle-half': say('Triangeluaren azalera erditu gabe utzi du', 'No dividió entre 2 el área del triángulo', 'لم يقسم مساحة المثلث على 2', 'Did not halve the area of the triangle'),
    'tetra-sixth': say('Tetraedroaren bolumena 6 zenbakiaz zatitu gabe utzi du', 'No dividió entre 6 el volumen del tetraedro', 'لم يقسم حجم رباعي الأوجه على 6', 'Did not divide the volume of the tetrahedron by 6'),
    'negative-volume': say('Bolumen negatibo bat utzi du', 'Dejó un volumen negativo', 'ترك حجمًا سالبًا', 'Left a negative volume'),
    'rotation-sign': say('Errotazio batean zeinua aldatu du', 'Cambió el signo en una rotación', 'غيّر الإشارة في تدوير', 'Changed the sign for a rotation')
}

export const spaceDetectiveTips: Record<SpaceDetectiveError, LocalizedText> = {
    reversed: say('$\\overrightarrow{AB}=B-A$: muturra ken jatorria.', '$\\overrightarrow{AB}=B-A$: extremo menos origen.', '$\\overrightarrow{AB}=B-A$: الطرف ناقص الأصل.', '$\\overrightarrow{AB}=B-A$: end point minus start point.'),
    'no-z': say('$|\\vec{u}|=\\sqrt{u_1^2+u_2^2+u_3^2}$: hiru karratuak.', '$|\\vec{u}|=\\sqrt{u_1^2+u_2^2+u_3^2}$: los tres cuadrados.', '$|\\vec{u}|=\\sqrt{u_1^2+u_2^2+u_3^2}$: المربعات الثلاثة.', '$|\\vec{u}|=\\sqrt{u_1^2+u_2^2+u_3^2}$: all three squares.'),
    'symmetric-midpoint': say('Simetrikoa: $P\'=2M-P$; $M$ erdian geratzen da.', 'Simétrico: $P\'=2M-P$; $M$ queda en medio.', 'النظيرة: $P\'=2M-P$؛ و$M$ في المنتصف.', 'Symmetric point: $P\'=2M-P$; $M$ is in the middle.'),
    'third-unchecked': say('Hiru ekuazio eta bi ezezagun: hirugarrenak ere bete behar du.', 'Tres ecuaciones y dos incógnitas: la tercera también tiene que cumplirse.', 'ثلاث معادلات ومجهولان: يجب أن تتحقق الثالثة أيضًا.', 'Three equations and two unknowns: the third has to hold too.'),
    'dot-vector': say('$\\vec{u}\\cdot\\vec{v}=u_1v_1+u_2v_2+u_3v_3$: zenbaki bat.', '$\\vec{u}\\cdot\\vec{v}=u_1v_1+u_2v_2+u_3v_3$: un número.', '$\\vec{u}\\cdot\\vec{v}=u_1v_1+u_2v_2+u_3v_3$: عدد.', '$\\vec{u}\\cdot\\vec{v}=u_1v_1+u_2v_2+u_3v_3$: a number.'),
    'j-sign': say('Lehen errenkadatik garatzean: $+\\vec{i}$, $-\\vec{j}$, $+\\vec{k}$.', 'Al desarrollar por la primera fila: $+\\vec{i}$, $-\\vec{j}$, $+\\vec{k}$.', 'عند النشر حسب الصف الأول: $+\\vec{i}$ و$-\\vec{j}$ و$+\\vec{k}$.', 'Expanding along the first row: $+\\vec{i}$, $-\\vec{j}$, $+\\vec{k}$.'),
    'order-kept': say('$\\vec{v}\\times\\vec{u}=-\\,\\vec{u}\\times\\vec{v}$.', '$\\vec{v}\\times\\vec{u}=-\\,\\vec{u}\\times\\vec{v}$.', '$\\vec{v}\\times\\vec{u}=-\\,\\vec{u}\\times\\vec{v}$.', '$\\vec{v}\\times\\vec{u}=-\\,\\vec{u}\\times\\vec{v}$.'),
    'projection-modulus': say('Proiekzioa: zatitu proiektatzen den gaineko bektorearen moduluaz.', 'Proyección: divide entre el módulo del vector sobre el que se proyecta.', 'الإسقاط: اقسم على طول المتجه الذي نُسقط عليه.', 'Projection: divide by the magnitude of the vector you project onto.'),
    'triangle-half': say('$S=\\frac{1}{2}\\,|\\overrightarrow{AB}\\times\\overrightarrow{AC}|$.', '$S=\\frac{1}{2}\\,|\\overrightarrow{AB}\\times\\overrightarrow{AC}|$.', '$S=\\frac{1}{2}\\,|\\overrightarrow{AB}\\times\\overrightarrow{AC}|$.', '$S=\\frac{1}{2}\\,|\\overrightarrow{AB}\\times\\overrightarrow{AC}|$.'),
    'tetra-sixth': say('Tetraedroa: $V=\\frac{1}{6}\\,|[\\overrightarrow{AB},\\overrightarrow{AC},\\overrightarrow{AD}]|$.', 'Tetraedro: $V=\\frac{1}{6}\\,|[\\overrightarrow{AB},\\overrightarrow{AC},\\overrightarrow{AD}]|$.', 'رباعي الأوجه: $V=\\frac{1}{6}\\,|[\\overrightarrow{AB},\\overrightarrow{AC},\\overrightarrow{AD}]|$.', 'Tetrahedron: $V=\\frac{1}{6}\\,|[\\overrightarrow{AB},\\overrightarrow{AC},\\overrightarrow{AD}]|$.'),
    'negative-volume': say('Bolumena biderkadura mistoaren balio absolutua da.', 'El volumen es el valor absoluto del producto mixto.', 'الحجم هو القيمة المطلقة للجداء المختلط.', 'The volume is the absolute value of the scalar triple product.'),
    'rotation-sign': say('Errotazio batek ez du zeinua aldatzen: $[\\vec{v},\\vec{w},\\vec{u}]=[\\vec{u},\\vec{v},\\vec{w}]$.', 'Una rotación no cambia el signo: $[\\vec{v},\\vec{w},\\vec{u}]=[\\vec{u},\\vec{v},\\vec{w}]$.', 'التدوير لا يغيّر الإشارة: $[\\vec{v},\\vec{w},\\vec{u}]=[\\vec{u},\\vec{v},\\vec{w}]$.', 'A rotation does not change the sign: $[\\vec{v},\\vec{w},\\vec{u}]=[\\vec{u},\\vec{v},\\vec{w}]$.')
}

type Built = Omit<WorkedCase<SpaceDetectiveError>, 'options'>

const point = (random: Random, limit = 4): Vec3 => [randomInt(random, -limit, limit), randomInt(random, -limit, limit), randomInt(random, -limit, limit)]
const noZero = (a: Vec3) => a.every((value) => value !== 0)

/** Vectors with a whole magnitude */
const BOXES: Vec3[] = [[1, 2, 2], [2, 3, 6], [2, 6, 9], [1, 4, 8], [4, 4, 7], [2, 4, 4], [3, 4, 12], [6, 6, 7]]
/** Pairs whose cross product has a whole magnitude */
const AREA_PAIRS: Array<[Vec3, Vec3]> = [[[1, 0, 2], [2, -2, 0]], [[2, 1, 0], [2, 2, 3]], [[3, 0, 1], [0, -2, 1]], [[1, 2, 2], [2, 1, -2]], [[0, 2, -1], [-1, 2, 0]], [[2, -1, 0], [2, 0, -1]]]

function build(random: Random, error: SpaceDetectiveError): Built | null {
    switch (error) {
        case 'reversed': {
            const a = point(random)
            const b = point(random)
            const v = sub(b, a)
            if (!noZero(v)) return null
            return {
                problem: say(`$A${vec(a)}$ eta $B${vec(b)}$: kalkulatu $\\overrightarrow{AB}$ eta $2\\overrightarrow{AB}$.`, `$A${vec(a)}$ y $B${vec(b)}$: calcula $\\overrightarrow{AB}$ y $2\\overrightarrow{AB}$.`, `$A${vec(a)}$ و$B${vec(b)}$: احسب $\\overrightarrow{AB}$ و$2\\overrightarrow{AB}$.`, `$A${vec(a)}$ and $B${vec(b)}$: work out $\\overrightarrow{AB}$ and $2\\overrightarrow{AB}$.`),
                lines: [line(LABELS.step, `\\overrightarrow{AB}=${vec(scale(-1, v))}`), line(LABELS.step, `2\\overrightarrow{AB}=${vec(scale(-2, v))}`), line(LABELS.result, vec(scale(-2, v)))],
                wrong: 0, error, fix: `\\overrightarrow{AB}=B-A=${vec(v)}`, right: v[0], reached: -v[0]
            }
        }
        case 'no-z': {
            const [x, y, z] = pick(random, BOXES)
            const u: Vec3 = [x * pick(random, [1, -1]), y * pick(random, [1, -1]), z * pick(random, [1, -1])]
            const square = x * x + y * y + z * z
            const flat = x * x + y * y
            return {
                problem: say(`Aurkitu $${vec(u)}$ bektorearen modulua.`, `Halla el módulo de $${vec(u)}$.`, `أوجد طول $${vec(u)}$.`, `Find the magnitude of $${vec(u)}$.`),
                lines: [line(LABELS.step, `|${vec(u)}|^2=${wrap(u[0])}^2+${wrap(u[1])}^2`), line(LABELS.step, `${x * x}+${y * y}=${flat}`), line(LABELS.result, `|${vec(u)}|=\\sqrt{${flat}}`)],
                wrong: 0, error, fix: `|${vec(u)}|=\\sqrt{${x * x}+${y * y}+${z * z}}=${Math.sqrt(square)}`, right: Math.sqrt(square), reached: Math.sqrt(flat)
            }
        }
        case 'symmetric-midpoint': {
            const p = point(random, 3)
            const m = point(random, 3)
            const right = sub(scale(2, m), p)
            const midpoint = scale(0.5, add(p, m))
            if (!midpoint.every(Number.isInteger) || right.some((value) => Math.abs(value) > 9)) return null
            return {
                problem: say(`Aurkitu $P${vec(p)}$ puntuaren simetrikoa $M${vec(m)}$ puntuarekiko.`, `Halla el simétrico de $P${vec(p)}$ respecto de $M${vec(m)}$.`, `أوجد نظيرة $P${vec(p)}$ بالنسبة إلى $M${vec(m)}$.`, `Find the symmetric of $P${vec(p)}$ with respect to $M${vec(m)}$.`),
                lines: [line(LABELS.step, `P'=\\frac{P+M}{2}`), line(LABELS.step, `\\frac{${vec(add(p, m))}}{2}`), line(LABELS.result, `P'${vec(midpoint)}`)],
                wrong: 0, error, fix: `P'=2M-P=${vec(right)}`, right: right[0], reached: midpoint[0]
            }
        }
        case 'third-unchecked': {
            const u: Vec3 = [1, 0, randomInt(random, 1, 3)]
            const v: Vec3 = [0, 1, randomInt(random, -2, 2)]
            const a = randomInt(random, -3, 3)
            const b = randomInt(random, -3, 3)
            const third = a * u[2] + b * v[2] + pick(random, [1, 2, -1])
            if (a === 0 || b === 0) return null
            const w: Vec3 = [a, b, third]
            return {
                problem: say(`$${vec(w)}$ bektorea $${vec(u)}$ eta $${vec(v)}$ bektoreen konbinazio lineala da?`, `¿Es $${vec(w)}$ combinación lineal de $${vec(u)}$ y $${vec(v)}$?`, `هل $${vec(w)}$ تركيب خطي لـ $${vec(u)}$ و$${vec(v)}$؟`, `Is $${vec(w)}$ a linear combination of $${vec(u)}$ and $${vec(v)}$?`),
                lines: [line(LABELS.step, `a=${a},\\ b=${b}`), line(LABELS.step, `${vec(w)}=${a}\\,${vec(u)}+${wrap(b)}\\,${vec(v)}`), line(LABELS.result, `\\vec{w}=${a}\\,\\vec{u}+${wrap(b)}\\,\\vec{v}`)],
                wrong: 1, error, fix: `${a}\\cdot ${u[2]}+${wrap(b)}\\cdot ${wrap(v[2])}=${a * u[2] + b * v[2]}\\neq ${third}`, right: 0, reached: 1
            }
        }
        case 'dot-vector': {
            const u = point(random, 3)
            const v = point(random, 3)
            if (!noZero(u) || !noZero(v)) return null
            const termwise: Vec3 = [u[0] * v[0], u[1] * v[1], u[2] * v[2]]
            const value = dot(u, v) + 0
            return {
                problem: work(`${vec(u)}\\cdot ${vec(v)}`),
                lines: [line(LABELS.data, `\\vec{u}=${vec(u)},\\ \\vec{v}=${vec(v)}`), line(LABELS.step, `\\vec{u}\\cdot\\vec{v}=${vec(termwise)}`), line(LABELS.result, vec(termwise))],
                wrong: 1, error, fix: `${u.map((x, i) => `${wrap(x)}\\cdot ${wrap(v[i])}`).join('+')}=${value}`, right: value, reached: termwise[0]
            }
        }
        case 'j-sign': {
            const u = point(random, 3)
            const v = point(random, 3)
            const n = cross(u, v)
            if (n[1] === 0 || n.some((value) => Math.abs(value) > 12)) return null
            const wrongN: Vec3 = [n[0], -n[1], n[2]]
            return {
                problem: work(`${vec(u)}\\times ${vec(v)}`),
                lines: [line(LABELS.step, `\\begin{vmatrix}\\vec{i}&\\vec{j}&\\vec{k}\\\\${u.join('&')}\\\\${v.join('&')}\\end{vmatrix}`), line(LABELS.step, `${wrap(n[0])}\\,\\vec{i}+${wrap(-n[1])}\\,\\vec{j}+${wrap(n[2])}\\,\\vec{k}`), line(LABELS.result, vec(wrongN))],
                wrong: 1, error, fix: `-(${wrap(u[0])}\\cdot ${wrap(v[2])}-${wrap(u[2])}\\cdot ${wrap(v[0])})=${n[1] + 0}\\ \\to\\ ${vec(n)}`, right: n[1], reached: -n[1]
            }
        }
        case 'order-kept': {
            const n = point(random, 5)
            if (!noZero(n)) return null
            return {
                problem: say(`$\\vec{u}\\times\\vec{v}=${vec(n)}$ bada, kalkulatu $\\vec{v}\\times\\vec{u}$ eta $\\vec{v}\\times(2\\vec{u})$.`, `Si $\\vec{u}\\times\\vec{v}=${vec(n)}$, calcula $\\vec{v}\\times\\vec{u}$ y $\\vec{v}\\times(2\\vec{u})$.`, `إذا كان $\\vec{u}\\times\\vec{v}=${vec(n)}$ فاحسب $\\vec{v}\\times\\vec{u}$ و$\\vec{v}\\times(2\\vec{u})$.`, `If $\\vec{u}\\times\\vec{v}=${vec(n)}$, work out $\\vec{v}\\times\\vec{u}$ and $\\vec{v}\\times(2\\vec{u})$.`),
                lines: [line(LABELS.step, `\\vec{v}\\times\\vec{u}=${vec(n)}`), line(LABELS.step, `\\vec{v}\\times(2\\vec{u})=2\\,(\\vec{v}\\times\\vec{u})`), line(LABELS.result, vec(scale(2, n)))],
                wrong: 0, error, fix: `\\vec{v}\\times\\vec{u}=-\\,\\vec{u}\\times\\vec{v}=${vec(scale(-1, n))}`, right: -n[0], reached: n[0]
            }
        }
        case 'projection-modulus': {
            const u = pick(random, BOXES.slice(0, 2)).map((value) => value * pick(random, [1, -1])) as unknown as Vec3
            const v = point(random, 3)
            const value = dot(u, v) + 0
            const vSquare = dot(v, v)
            const length = Math.sqrt(dot(u, u))
            if (value === 0 || !noZero(v) || Number.isInteger(Math.sqrt(vSquare))) return null
            return {
                problem: say(`Kalkulatu $${vec(v)}$ bektorearen proiekzioa $${vec(u)}$ bektorearen gainean.`, `Calcula la proyección de $${vec(v)}$ sobre $${vec(u)}$.`, `احسب إسقاط $${vec(v)}$ على $${vec(u)}$.`, `Work out the projection of $${vec(v)}$ onto $${vec(u)}$.`),
                lines: [line(LABELS.step, `${vec(u)}\\cdot ${vec(v)}=${value}`), line(LABELS.step, `\\frac{${value}}{|${vec(v)}|}=\\frac{${value}}{\\sqrt{${vSquare}}}`), line(LABELS.result, `\\frac{${value}}{\\sqrt{${vSquare}}}`)],
                wrong: 1, error, fix: `\\frac{${value}}{|${vec(u)}|}=\\frac{${value}}{${length}}`, right: value / length, reached: value / Math.sqrt(vSquare)
            }
        }
        case 'triangle-half': {
            const [ab, ac] = pick(random, AREA_PAIRS)
            const a = point(random, 2)
            const n = cross(ab, ac)
            const area = Math.sqrt(dot(n, n))
            if (!Number.isInteger(area)) return null
            const b = add(a, ab)
            const c = add(a, ac)
            return {
                problem: say(`Aurkitu $A${vec(a)}$, $B${vec(b)}$ eta $C${vec(c)}$ erpinak dituen triangeluaren azalera.`, `Halla el área del triángulo de vértices $A${vec(a)}$, $B${vec(b)}$ y $C${vec(c)}$.`, `أوجد مساحة المثلث الذي رؤوسه $A${vec(a)}$ و$B${vec(b)}$ و$C${vec(c)}$.`, `Find the area of the triangle with vertices $A${vec(a)}$, $B${vec(b)}$ and $C${vec(c)}$.`),
                lines: [line(LABELS.step, `\\overrightarrow{AB}\\times\\overrightarrow{AC}=${vec(n)}`), line(LABELS.step, `|${vec(n)}|=${area}`), line(LABELS.result, `S=${area}`)],
                wrong: 2, error, fix: `S=\\frac{${area}}{2}`, right: area / 2, reached: area
            }
        }
        case 'tetra-sixth': {
            const u: Vec3 = [randomInt(random, 1, 3), 0, 0]
            const v: Vec3 = [randomInt(random, -2, 2), randomInt(random, 1, 3), 0]
            const w: Vec3 = [randomInt(random, -2, 2), randomInt(random, -2, 2), randomInt(random, 1, 4)]
            const value = det3(u, v, w) + 0
            if (value % 6 !== 0) return null
            return {
                problem: say(`Aurkitu $\\overrightarrow{AB}=${vec(u)}$, $\\overrightarrow{AC}=${vec(v)}$ eta $\\overrightarrow{AD}=${vec(w)}$ ertzak dituen tetraedroaren bolumena.`, `Halla el volumen del tetraedro de aristas $\\overrightarrow{AB}=${vec(u)}$, $\\overrightarrow{AC}=${vec(v)}$ y $\\overrightarrow{AD}=${vec(w)}$.`, `أوجد حجم رباعي الأوجه الذي أحرفه $\\overrightarrow{AB}=${vec(u)}$ و$\\overrightarrow{AC}=${vec(v)}$ و$\\overrightarrow{AD}=${vec(w)}$.`, `Find the volume of the tetrahedron with edges $\\overrightarrow{AB}=${vec(u)}$, $\\overrightarrow{AC}=${vec(v)}$ and $\\overrightarrow{AD}=${vec(w)}$.`),
                lines: [line(LABELS.step, `[\\overrightarrow{AB},\\overrightarrow{AC},\\overrightarrow{AD}]=${u[0]}\\cdot ${v[1]}\\cdot ${w[2]}=${value}`), line(LABELS.step, `V=|${value}|`), line(LABELS.result, `V=${value}`)],
                wrong: 1, error, fix: `V=\\frac{1}{6}\\cdot ${value}=${value / 6}`, right: value / 6, reached: value
            }
        }
        case 'negative-volume': {
            const u = point(random, 2)
            const v = point(random, 2)
            const w = point(random, 2)
            const value = det3(u, v, w) + 0
            if (value >= 0 || value < -20) return null
            return {
                problem: say(`Aurkitu $${vec(u)}$, $${vec(v)}$ eta $${vec(w)}$ ertzak dituen paralelepipedoaren bolumena.`, `Halla el volumen del paralelepípedo de aristas $${vec(u)}$, $${vec(v)}$ y $${vec(w)}$.`, `أوجد حجم متوازي السطوح الذي أحرفه $${vec(u)}$ و$${vec(v)}$ و$${vec(w)}$.`, `Find the volume of the parallelepiped with edges $${vec(u)}$, $${vec(v)}$ and $${vec(w)}$.`),
                lines: [line(LABELS.step, `\\begin{vmatrix}${[u, v, w].map((row) => row.join('&')).join('\\\\')}\\end{vmatrix}=${value}`), line(LABELS.step, `V=${value}`), line(LABELS.result, `V=${value}`)],
                wrong: 1, error, fix: `V=|${value}|=${-value}`, right: -value, reached: value
            }
        }
        case 'rotation-sign': {
            const value = pick(random, [-9, -7, -5, -4, 3, 4, 6, 8, 10])
            const twice = randomInt(random, 2, 3)
            return {
                problem: say(`$[\\vec{u},\\vec{v},\\vec{w}]=${value}$ bada, kalkulatu $[\\vec{v},\\vec{w},${twice}\\vec{u}]$.`, `Si $[\\vec{u},\\vec{v},\\vec{w}]=${value}$, calcula $[\\vec{v},\\vec{w},${twice}\\vec{u}]$.`, `إذا كان $[\\vec{u},\\vec{v},\\vec{w}]=${value}$ فاحسب $[\\vec{v},\\vec{w},${twice}\\vec{u}]$.`, `If $[\\vec{u},\\vec{v},\\vec{w}]=${value}$, work out $[\\vec{v},\\vec{w},${twice}\\vec{u}]$.`),
                lines: [line(LABELS.step, `[\\vec{v},\\vec{w},${twice}\\vec{u}]=${twice}\\,[\\vec{v},\\vec{w},\\vec{u}]`), line(LABELS.step, `[\\vec{v},\\vec{w},\\vec{u}]=${-value}`), line(LABELS.result, `${twice}\\cdot ${wrap(-value)}=${-twice * value}`)],
                wrong: 1, error, fix: `[\\vec{v},\\vec{w},\\vec{u}]=[\\vec{u},\\vec{v},\\vec{w}]=${value}\\ \\to\\ ${twice * value}`, right: twice * value, reached: -twice * value
            }
        }
    }
}

/** Six cases of one level, drawn again while two of them are the same exercise */
export function createSpaceDetectiveCases(random: Random, levelIndex: number) {
    const draw = () => createWorkedCases(random, spaceDetectiveLevels[levelIndex], SPACE_DETECTIVE_CASES, build)
    let cases = draw()
    for (let attempt = 0; attempt < 30 && new Set(cases.map((item) => item.problem.es)).size < cases.length; attempt += 1) cases = draw()
    return cases
}

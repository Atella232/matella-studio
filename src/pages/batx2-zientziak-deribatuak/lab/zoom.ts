import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'
import { freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'

/* ==========================================================================
   L1 · Deribagarritasunaren lupa (La lupa de la derivabilidad): a square
   window around the point (a, f(a)) that shrinks by halves. A smooth
   curve straightens into a line, a corner stays a corner however close
   you look, and a cusp turns vertical. The readout gives the slopes of
   the two chords inside the window, from (a − w) to a and from a to
   (a + w): as w shrinks they tend to the one-sided derivatives. Before
   the drawing, the learner predicts what the curve will look like close
   up: still a corner (<), a straight line (=) or vertical (>).
   ========================================================================== */

export type ZoomFunction = 'square' | 'corner' | 'kink' | 'flat' | 'cusp' | 'sine'

export const ZOOM_FUNCTIONS: ZoomFunction[] = ['square', 'corner', 'kink', 'flat', 'cusp', 'sine']

/** How many times the window is enlarged; the half-width is 2 / zoom */
export const ZOOMS = [1, 2, 4, 8, 16, 32, 64]

export const ZOOM_LIMITS = { z: { min: 0, max: ZOOMS.length - 1 } } as const

interface ZoomSetup {
    f: (x: number) => number
    a: number
    latex: string
    /** What the curve looks like close up: a corner (<), a line (=) or vertical (>) */
    look: Prediction
    /** The one-sided derivatives (Infinity for a vertical tangent) */
    left: number
    right: number
}

export const ZOOM_SETUP: Record<ZoomFunction, ZoomSetup> = {
    square: { f: (x) => x * x, a: 1, latex: 'x^2', look: '=', left: 2, right: 2 },
    corner: { f: (x) => Math.abs(x - 1) + 1, a: 1, latex: '|x-1|+1', look: '<', left: -1, right: 1 },
    kink: { f: (x) => (x < 1 ? x * x : 3 * x - 2), a: 1, latex: '\\begin{cases}x^2 & x<1\\\\ 3x-2 & x\\ge 1\\end{cases}', look: '<', left: 2, right: 3 },
    flat: { f: (x) => x * Math.abs(x), a: 0, latex: 'x\\,|x|', look: '=', left: 0, right: 0 },
    cusp: { f: (x) => Math.sqrt(Math.abs(x)), a: 0, latex: '\\sqrt{|x|}', look: '>', left: -Infinity, right: Infinity },
    sine: { f: Math.sin, a: 0, latex: '\\sin x', look: '=', left: 1, right: 1 }
}

export interface ZoomState {
    fn: ZoomFunction
    /** The index in ZOOMS */
    z: number
    prediction: Prediction | null
}

export const initialZoomState: ZoomState = { fn: 'square', z: 0, prediction: null }

/** Only a new function asks for a new prediction */
export function setZoom(state: ZoomState, patch: Partial<Omit<ZoomState, 'prediction'>>): ZoomState {
    const fn = patch.fn ?? state.fn
    const z = Math.min(ZOOM_LIMITS.z.max, Math.max(ZOOM_LIMITS.z.min, Math.round(patch.z ?? state.z)))
    return { fn, z, prediction: fn === state.fn ? state.prediction : null }
}

/** The half-width of the window */
export const halfWidth = (state: Pick<ZoomState, 'z'>) => 2 / ZOOMS[state.z]

/** The slopes of the chords from a − w to a and from a to a + w */
export function chordSlopes(state: Pick<ZoomState, 'fn' | 'z'>): [number, number] {
    const { f, a } = ZOOM_SETUP[state.fn]
    const w = halfWidth(state)
    return [(f(a) - f(a - w)) / w, (f(a + w) - f(a)) / w]
}

export const zoomPrediction = (state: Pick<ZoomState, 'fn'>): Prediction => ZOOM_SETUP[state.fn].look

export const isDifferentiable = (fn: ZoomFunction) => ZOOM_SETUP[fn].look === '='

export const zoomChallenges: LabChallenge<ZoomState>[] = [
    {
        id: 123101,
        prompt: say('Aurkitu urrunetik ia leuna dirudien baina hurbiletik punta bat duen funtzioa, eta hurbildu ×8 edo gehiago.', 'Encuentra la función que de lejos parece suave pero de cerca tiene un pico, y acércate a ×8 o más.', 'جد الدالة التي تبدو ملساء من بعيد لكن فيها زاوية من قريب، واقترب إلى ×8 أو أكثر.', 'Find the function that looks smooth from afar but has a corner close up, and zoom to ×8 or more.'),
        hint: say('Bi zati, 2 eta 3 maldekin.', 'Dos trozos con pendientes 2 y 3.', 'جزآن بميلين 2 و3.', 'Two pieces with slopes 2 and 3.'),
        isSolved: (state) => state.fn === 'kink' && ZOOMS[state.z] >= 8
    },
    {
        id: 123102,
        prompt: say('$f_1$ funtzioan, hurbildu lupako bi maldak $0{,}1$ baino gutxiago desberdindu arte.', 'En $f_1$, acerca la lupa hasta que las dos pendientes difieran menos de $0{,}1$.', 'في $f_1$ قرّب العدسة حتى يختلف الميلان بأقل من $0.1$.', 'In $f_1$, zoom in until the two slopes differ by less than $0.1$.'),
        hint: say('Kendura leihoaren zabalera erdiaren bikoitza da.', 'La diferencia es el doble de la media anchura de la ventana.', 'الفرق ضعف نصف عرض النافذة.', 'The difference is twice the half-width of the window.'),
        isSolved: (state) => state.fn === 'square' && Math.abs(chordSlopes(state)[1] - chordSlopes(state)[0]) < 0.1
    },
    {
        id: 123103,
        prompt: say('Aurkitu hurbiletik 1 maldako zuzen bihurtzen den funtzioa, eta hurbildu ×16 edo gehiago.', 'Encuentra la función que de cerca se vuelve una recta de pendiente 1, y acércate a ×16 o más.', 'جد الدالة التي تصير من قريب مستقيمًا ميله 1، واقترب إلى ×16 أو أكثر.', 'Find the function that becomes a line of slope 1 close up, and zoom to ×16 or more.'),
        hint: say('$x=0$ puntuan, $\\cos 0=1$.', 'En $x=0$, $\\cos 0=1$.', 'عند $x=0$، $\\cos 0=1$.', 'At $x=0$, $\\cos 0=1$.'),
        isSolved: (state) => state.fn === 'sine' && ZOOMS[state.z] >= 16
    },
    {
        id: 123104,
        prompt: say('Aurkitu hurbiletik bertikal jartzen den funtzioa, eta hurbildu ×8 edo gehiago.', 'Encuentra la función que de cerca se pone vertical, y acércate a ×8 o más.', 'جد الدالة التي تصير عمودية من قريب، واقترب إلى ×8 أو أكثر.', 'Find the function that turns vertical close up, and zoom to ×8 or more.'),
        hint: say('Erro bat 0 puntuan.', 'Una raíz en 0.', 'جذر عند 0.', 'A root at 0.'),
        isSolved: (state) => state.fn === 'cusp' && ZOOMS[state.z] >= 8
    },
    {
        id: 123105,
        prompt: say('$x\\,|x|$ funtzioan, hurbildu ahalik eta gehien: bi maldak ia 0 dira.', 'En $x\\,|x|$, acerca la lupa al máximo: las dos pendientes son casi 0.', 'في $x\\,|x|$ قرّب العدسة إلى أقصى حد: الميلان يقاربان 0.', 'In $x\\,|x|$, zoom in as far as you can: both slopes are almost 0.'),
        hint: say('Hautatu $f_4$ eta igo zooma.', 'Elige $f_4$ y sube el zoom.', 'اختر $f_4$ وكبّر.', 'Choose $f_4$ and raise the zoom.'),
        isSolved: (state) => state.fn === 'flat' && state.z === ZOOM_LIMITS.z.max
    }
]

/** The functions whose chords settle slowly, with the side that does */
const SETTLING: Array<[ZoomFunction, 0 | 1]> = [['square', 0], ['square', 1], ['flat', 0], ['flat', 1], ['kink', 0]]
const TOLERANCES = ['0{,}5', '0{,}2', '0{,}1']
const TOLERANCE_VALUES = [0.5, 0.2, 0.1]
const NAMES: Record<ZoomFunction, string> = { square: 'f_1', corner: 'f_2', kink: 'f_3', flat: 'f_4', cusp: 'f_5', sine: 'f_6' }

/** Endless practice: zoom until one chord is within a tolerance of its one-sided derivative */
const zoomMaker: LabChallengeMaker<ZoomState> = (random) => {
    const [fn, side] = SETTLING[randomInt(random, 0, SETTLING.length - 1)]
    const k = randomInt(random, 0, TOLERANCES.length - 1)
    const target = side === 0 ? ZOOM_SETUP[fn].left : ZOOM_SETUP[fn].right
    const tolerance = TOLERANCE_VALUES[k]
    const which = side === 0
        ? say('ezkerreko malda', 'la pendiente de la izquierda', 'الميل من اليسار', 'the slope on the left')
        : say('eskuineko malda', 'la pendiente de la derecha', 'الميل من اليمين', 'the slope on the right')
    const tol = `$${TOLERANCES[k]}$`
    const tolAr = `$${TOLERANCES[k].replace('{,}', '.')}$`
    const f = `$${NAMES[fn]}$`
    const isSolved = (state: ZoomState) => state.fn === fn && Math.abs(chordSlopes(state)[side] - target) < tolerance
    const z = ZOOMS.findIndex((_, index) => isSolved({ fn, z: index, prediction: null }))
    return {
        prompt: say(`${f} funtzioan, hurbildu ${which.eu} $${target}$ baliotik ${tol} baino gutxiagora egon arte.`, `En ${f}, acércate hasta que ${which.es} esté a menos de ${tol} de $${target}$.`, `في ${f} اقترب حتى يصير ${which.ar} على بعد أقل من ${tolAr} من $${target}$.`, `In ${f}, zoom in until ${which.en} is less than ${tol} away from $${target}$.`),
        hint: say('Zooma bikoizten den bakoitzean, aldea erdira jaisten da.', 'Cada vez que el zoom se dobla, la diferencia se reduce a la mitad.', 'كلما تضاعف التكبير انخفض الفرق إلى النصف.', 'Each time the zoom doubles, the difference halves.'),
        isSolved,
        solution: { fn, z, prediction: null }
    }
}

export const zoomExtra = freshFrom(initialZoomState, zoomMaker)

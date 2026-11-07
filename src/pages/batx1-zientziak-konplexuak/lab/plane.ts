import { pick } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { freshFrom } from '../../dbh3-segidak/lab/prediction.ts'
import { say } from '../text.ts'
import { complexLatex, type Complex } from './complex.ts'

/* ==========================================================================
   L1 · Plano konplexua (El plano complejo): the learner moves z = a + bi
   on the plane and chooses to see its opposite or its conjugate. Before the
   image is drawn, the learner predicts the quadrant it falls in (or that
   it falls on an axis); then the tool draws it, with the modulus and the
   argument of z, and ▶ moves z to its image (through the origin for the
   opposite, across the real axis for the conjugate). Pure logic.
   ========================================================================== */

export type PlaneShow = 'opposite' | 'conjugate'
/** 1 to 4, or 0 for a point on an axis */
export type Quadrant = 0 | 1 | 2 | 3 | 4

export const PLANE_LIMIT = 4

export interface PlaneState {
    a: number
    b: number
    show: PlaneShow
    prediction: Quadrant | null
}

export const initialPlaneState: PlaneState = { a: 3, b: 2, show: 'conjugate', prediction: null }

const clamp = (value: number) => Math.min(PLANE_LIMIT, Math.max(-PLANE_LIMIT, Math.round(value)))
/** −0 is written 0 */
const signed = (value: number) => (value === 0 ? 0 : value)

export function setPlane(state: PlaneState, patch: Partial<Omit<PlaneState, 'prediction'>>): PlaneState {
    const next = { a: clamp(patch.a ?? state.a), b: clamp(patch.b ?? state.b), show: patch.show ?? state.show }
    const unchanged = next.a === state.a && next.b === state.b && next.show === state.show
    return { ...next, prediction: unchanged ? state.prediction : null }
}

/** The first guess stays */
export const setPlanePrediction = (state: PlaneState, prediction: Quadrant): PlaneState => (state.prediction === null ? { ...state, prediction } : state)

/** The opposite −z or the conjugate z̄ */
export const imageOf = ({ a, b, show }: Pick<PlaneState, 'a' | 'b' | 'show'>): Complex => (show === 'opposite' ? [signed(-a), signed(-b)] : [a, signed(-b)])

export const quadrantOf = ([x, y]: Complex): Quadrant => (x === 0 || y === 0 ? 0 : x > 0 ? (y > 0 ? 1 : 4) : y > 0 ? 2 : 3)

/** Where the image really falls */
export const planePrediction = (state: PlaneState): Quadrant => quadrantOf(imageOf(state))

export const planeChallenges: LabChallenge<PlaneState>[] = [
    { id: 104101, prompt: say('Jarri ${z}$ bigarren koadrantean, eta begiratu haren konjokatua.', 'Pon ${z}$ en el segundo cuadrante y mira su conjugado.', 'ضع ${z}$ في الربع الثاني وانظر إلى مرافقه.', 'Put ${z}$ in the second quadrant and look at its conjugate.'), hint: say('Ezkerrera eta gora: $a<0$ eta $b>0$.', 'A la izquierda y arriba: $a<0$ y $b>0$.', 'إلى اليسار وإلى الأعلى: $a<0$ و$b>0$.', 'To the left and up: $a<0$ and $b>0$.'), isSolved: (state) => state.a < 0 && state.b > 0 && state.show === 'conjugate' },
    { id: 104102, prompt: say('Lortu 5 moduluko ${z}$ bat, ez erreala ez irudikari hutsa.', 'Consigue un ${z}$ de módulo 5 que no sea real ni imaginario puro.', 'احصل على ${z}$ طويلته 5 ليس حقيقيًا ولا تخيليًا صرفًا.', 'Make a ${z}$ with modulus 5 that is neither real nor purely imaginary.'), hint: say('Pitagoras: $3^2+4^2=25$.', 'Pitágoras: $3^2+4^2=25$.', 'فيثاغورس: $3^2+4^2=25$.', 'Pythagoras: $3^2+4^2=25$.'), isSolved: (state) => state.a !== 0 && state.b !== 0 && state.a ** 2 + state.b ** 2 === 25 },
    { id: 104103, prompt: say('Lortu ${z}$ zenbakiaren konjokatua ${z}$ bera izatea, 0 izan gabe.', 'Haz que el conjugado de ${z}$ sea el mismo ${z}$, sin que sea 0.', 'اجعل مرافق ${z}$ هو ${z}$ نفسه، دون أن يكون 0.', 'Make the conjugate of ${z}$ be ${z}$ itself, without it being 0.'), hint: say('Zenbaki errealekin bakarrik gertatzen da.', 'Solo pasa con los números reales.', 'لا يحدث ذلك إلا مع الأعداد الحقيقية.', 'It only happens with the real numbers.'), isSolved: (state) => state.b === 0 && state.a !== 0 && state.show === 'conjugate' },
    { id: 104104, prompt: say('Lortu ${z}$ zenbakiaren aurkakoa laugarren koadrantean egotea.', 'Haz que el opuesto de ${z}$ caiga en el cuarto cuadrante.', 'اجعل معاكس ${z}$ يقع في الربع الرابع.', 'Make the opposite of ${z}$ fall in the fourth quadrant.'), hint: say('Orduan ${z}$ bigarren koadrantean dago.', 'Entonces ${z}$ está en el segundo cuadrante.', 'عندئذ يكون ${z}$ في الربع الثاني.', 'Then ${z}$ is in the second quadrant.'), isSolved: (state) => state.show === 'opposite' && planePrediction(state) === 4 },
    { id: 104105, prompt: say('Lortu 135° argumentua eta $2\\sqrt{2}$ modulua dituen ${z}$ bat.', 'Consigue un ${z}$ de argumento 135° y módulo $2\\sqrt{2}$.', 'احصل على ${z}$ عمدته 135° وطويلته $2\\sqrt{2}$.', 'Make a ${z}$ with argument 135° and modulus $2\\sqrt{2}$.'), hint: say('Bigarren koadrantea, $|a|=|b|$ dela.', 'Segundo cuadrante, con $|a|=|b|$.', 'الربع الثاني، مع $|a|=|b|$.', 'Second quadrant, with $|a|=|b|$.'), isSolved: (state) => state.a === -2 && state.b === 2 }
]

const values = Array.from({ length: 2 * PLANE_LIMIT + 1 }, (_, index) => index - PLANE_LIMIT)
/** z as a formula of its own */
const Z = '${z}$'

/** Endless practice: place z so that its opposite or its conjugate is a given number */
const planeMaker: LabChallengeMaker<PlaneState> = (random) => {
    for (;;) {
        const target: Complex = [pick(random, values), pick(random, values)]
        if (target[0] === 0 && target[1] === 0) continue
        const show = pick(random, ['opposite', 'conjugate'] as const)
        const z: Complex = show === 'opposite' ? [signed(-target[0]), signed(-target[1])] : [target[0], signed(-target[1])]
        const latex = complexLatex(target)
        const opposite = show === 'opposite'
        return {
            prompt: opposite
                ? say(`Jarri ${Z}, haren aurkakoa $${latex}$ izan dadin.`, `Coloca ${Z} de forma que su opuesto sea $${latex}$.`, `ضع ${Z} بحيث يكون معاكسه $${latex}$.`, `Place ${Z} so that its opposite is $${latex}$.`)
                : say(`Jarri ${Z}, haren konjokatua $${latex}$ izan dadin.`, `Coloca ${Z} de forma que su conjugado sea $${latex}$.`, `ضع ${Z} بحيث يكون مرافقه $${latex}$.`, `Place ${Z} so that its conjugate is $${latex}$.`),
            hint: opposite
                ? say('Aurkakoak bi zeinuak aldatzen ditu.', 'El opuesto cambia los dos signos.', 'المعاكس يغيّر الإشارتين.', 'The opposite changes both signs.')
                : say('Konjokatuak zati irudikariaren zeinua bakarrik aldatzen du.', 'El conjugado cambia solo el signo de la parte imaginaria.', 'المرافق يغيّر إشارة الجزء التخيلي فقط.', 'The conjugate changes only the sign of the imaginary part.'),
            isSolved: (state) => state.show === show && imageOf(state)[0] === target[0] && imageOf(state)[1] === target[1],
            solution: { a: z[0], b: z[1], show, prediction: null }
        }
    }
}

export const planeExtra = freshFrom(initialPlaneState, planeMaker)

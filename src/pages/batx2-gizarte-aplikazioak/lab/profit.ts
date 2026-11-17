import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { say } from '../../batx1-zientziak-funtzioak/text.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'

/* ==========================================================================
   L1 · Diru-sarrerak ken kostuak (Ingreso menos coste): three firms that
   sell every unit at a fixed price p, with a cost C(x) = ax² + bx + c.
   The board draws I(x) = px and C(x) and, at the production x, the gap
   between them: the profit B(x), green when it wins and red when it
   loses. The readout compares I′ = p with C′(x): while I′ > C′ one more
   unit pays. Before the drawing the learner guesses whether the best
   production is less than, exactly or more than 20 units.
   ========================================================================== */

export type Firm = 'workshop' | 'bakery' | 'press'

export const FIRMS: Firm[] = ['workshop', 'bakery', 'press']

export const PROFIT_LIMITS = { x: { min: 0, max: 40 } } as const

export interface ProfitState {
    firm: Firm
    x: number
    prediction: Prediction | null
}

export const initialProfitState: ProfitState = { firm: 'workshop', x: 5, prediction: null }

interface FirmSetup {
    price: number
    a: number
    b: number
    c: number
    /** The top of the board */
    yMax: number
    latex: string
}

export const FIRM_SETUP: Record<Firm, FirmSetup> = {
    workshop: { price: 50, a: 1, b: 10, c: 100, yMax: 2400, latex: 'C(x)=x^2+10x+100' },
    bakery: { price: 30, a: 0.5, b: 6, c: 50, yMax: 1400, latex: 'C(x)=0{,}5x^2+6x+50' },
    press: { price: 80, a: 2, b: 20, c: 200, yMax: 4400, latex: 'C(x)=2x^2+20x+200' }
}

export function setProfit(state: ProfitState, patch: Partial<Omit<ProfitState, 'prediction'>>): ProfitState {
    const firm = patch.firm ?? state.firm
    const x = Math.min(PROFIT_LIMITS.x.max, Math.max(PROFIT_LIMITS.x.min, Math.round(patch.x ?? state.x)))
    return { firm, x, prediction: firm === state.firm ? state.prediction : null }
}

export const incomeOf = (firm: Firm, x: number) => FIRM_SETUP[firm].price * x
export const costOf = (firm: Firm, x: number) => {
    const { a, b, c } = FIRM_SETUP[firm]
    return a * x * x + b * x + c
}
export const profitOf = (firm: Firm, x: number) => incomeOf(firm, x) - costOf(firm, x)
/** C′(x) = 2ax + b */
export const costSlope = (firm: Firm, x: number) => 2 * FIRM_SETUP[firm].a * x + FIRM_SETUP[firm].b
/** B′(x) = p − C′(x) = 0 */
export const bestProduction = (firm: Firm) => (FIRM_SETUP[firm].price - FIRM_SETUP[firm].b) / (2 * FIRM_SETUP[firm].a)

/** The best production is less than (<), exactly (=) or more than (>) 20 units */
export const profitPrediction = (state: Pick<ProfitState, 'firm'>): Prediction => compareTo(bestProduction(state.firm), 20)

const same = (text: string) => say(text, text, text, text)

export const profitChallenges: LabChallenge<ProfitState>[] = [
    {
        id: 147101,
        prompt: say('Tailerrean, bilatu irabazirik handiena ematen duen produkzioa.', 'En el taller, busca la producción que da el mayor beneficio.', 'في الورشة، ابحث عن الإنتاج الذي يعطي أكبر ربح.', 'In the workshop, find the production that gives the highest profit.'),
        hint: same("$B'(x)=50-(2x+10)=0$"),
        isSolved: (state) => state.firm === 'workshop' && state.x === 20
    },
    {
        id: 147102,
        prompt: say("Okindegian, bilatu $I'(x)=C'(x)$ den produkzioa.", "En la panadería, busca la producción con $I'(x)=C'(x)$.", "في المخبز، ابحث عن الإنتاج الذي يكون فيه $I'(x)=C'(x)$.", "In the bakery, find the production with $I'(x)=C'(x)$."),
        hint: same('$30=x+6$'),
        isSolved: (state) => state.firm === 'bakery' && state.x === 24
    },
    {
        id: 147103,
        prompt: say('Inprimategian, bilatu irabaziak ematen dituen produkzio txikiena.', 'En la imprenta, busca la menor producción que da beneficios.', 'في المطبعة، ابحث عن أصغر إنتاج يعطي ربحًا.', 'In the print shop, find the smallest production that makes a profit.'),
        hint: same('$-2x^2+60x-200>0$'),
        isSolved: (state) => state.firm === 'press' && state.x === 4
    },
    {
        id: 147104,
        prompt: say("Tailerrean, bilatu $C'(x)$ lehen aldiz $I'(x)$ baino handiagoa den produkzioa.", "En el taller, busca la primera producción en la que $C'(x)$ supera a $I'(x)$.", "في الورشة، ابحث عن أول إنتاج تتجاوز فيه $C'(x)$ قيمة $I'(x)$.", "In the workshop, find the first production at which $C'(x)$ is greater than $I'(x)$."),
        hint: same('$2x+10>50$'),
        isSolved: (state) => state.firm === 'workshop' && state.x === 21
    },
    {
        id: 147105,
        prompt: say('Inprimategian, bilatu irabazia 200 euro den produkzio bat.', 'En la imprenta, busca una producción con un beneficio de 200 €.', 'في المطبعة، ابحث عن إنتاج ربحه 200 €.', 'In the print shop, find a production with a profit of €200.'),
        hint: same('$-2x^2+60x-200=200$'),
        isSolved: (state) => state.firm === 'press' && profitOf('press', state.x) === 200
    }
]

const NAMES: Record<Firm, LocalizedText> = {
    workshop: say('Tailerrean', 'En el taller', 'في الورشة', 'In the workshop'),
    bakery: say('Okindegian', 'En la panadería', 'في المخبز', 'In the bakery'),
    press: say('Inprimategian', 'En la imprenta', 'في المطبعة', 'In the print shop')
}

/** Endless practice: set the production with a given profit */
const profitMaker: LabChallengeMaker<ProfitState> = (random) => {
    const firm = FIRMS[randomInt(random, 0, FIRMS.length - 1)]
    const best = bestProduction(firm)
    let x = randomInt(random, 2, 38)
    while (x === Math.round(best)) x = randomInt(random, 2, 38)
    const target = profitOf(firm, x)
    const shown = String(target)
    const name = NAMES[firm]
    const { price, latex } = FIRM_SETUP[firm]
    return {
        prompt: say(`${name.eu}, bilatu $B(x)=${shown}$ den produkzio bat.`, `${name.es}, busca una producción con $B(x)=${shown}$.`, `${name.ar}، ابحث عن إنتاج يكون فيه $B(x)=${shown}$.`, `${name.en}, find a production with $B(x)=${shown}$.`),
        hint: same(`$B(x)=${price}x-(${latex.slice(5)})$`),
        isSolved: (state) => state.firm === firm && Math.abs(profitOf(firm, state.x) - target) < 1e-9,
        solution: { firm, x, prediction: null }
    }
}

export const profitExtra = freshFrom(initialProfitState, profitMaker)

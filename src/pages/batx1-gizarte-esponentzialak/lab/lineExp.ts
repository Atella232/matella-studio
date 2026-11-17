import { pick, randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import { compareTo, freshFrom, type Prediction } from '../../dbh3-segidak/lab/prediction.ts'
import { same, say } from '../text.ts'

/* ==========================================================================
   L1 · Zuzena ala esponentziala? (¿Recta o exponencial?): two data, A(0, a)
   and B(1, b), give a line, y = a + (b − a)x, and an exponential,
   y = a·(b/a)ˣ, that agree at x = 0 and x = 1. Before the curves are drawn
   the learner predicts which one gives more at the target x: between the
   data the line is above, outside them the exponential wins (it is
   convex). ▶ draws both up to x = 6.
   ========================================================================== */

export const LINE_EXP_LIMITS = { y: { min: 1, max: 10 }, target: { min: 0, max: 6 } } as const

export interface LineExpState {
    a: number
    b: number
    target: number
    prediction: Prediction | null
}

export const initialLineExpState: LineExpState = { a: 2, b: 5, target: 1, prediction: null }

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))

export function setLineExp(state: LineExpState, patch: Partial<Omit<LineExpState, 'prediction'>>): LineExpState {
    const a = clamp(patch.a ?? state.a, LINE_EXP_LIMITS.y.min, LINE_EXP_LIMITS.y.max)
    const b = clamp(patch.b ?? state.b, LINE_EXP_LIMITS.y.min, LINE_EXP_LIMITS.y.max)
    const target = clamp(patch.target ?? state.target, LINE_EXP_LIMITS.target.min, LINE_EXP_LIMITS.target.max)
    return { a, b, target, prediction: a === state.a && b === state.b && target === state.target ? state.prediction : null }
}

export const ratioOf = ({ a, b }: Pick<LineExpState, 'a' | 'b'>) => b / a
export const lineValue = (state: Pick<LineExpState, 'a' | 'b'>, x: number) => state.a + (state.b - state.a) * x
export const expValue = (state: Pick<LineExpState, 'a' | 'b'>, x: number) => state.a * ratioOf(state) ** x

/** The exponential gives more (>), the same (=) or less (<) than the line at the target */
export const lineExpPrediction = (state: LineExpState): Prediction => compareTo(expValue(state, state.target), lineValue(state, state.target))

const near = (value: number, goal: number) => Math.abs(value - goal) < 1e-9

export const lineExpChallenges: LabChallenge<LineExpState>[] = [
    {
        id: 134101,
        prompt: say('Jarri datuak, zuzenak eta esponentzialak puntu guztietan bat egin dezaten.', 'Pon unos datos con los que la recta y la exponencial coincidan en todos los puntos.', 'ضع بيانات يتطابق فيها المستقيم والأسية في كل النقاط.', 'Set data for which the line and the exponential agree everywhere.'),
        hint: say('Ez hazi eta ez jaitsi.', 'Que no suba ni baje.', 'ألا تزيد ولا تنقص.', 'Neither up nor down.'),
        isSolved: (state) => state.a === state.b
    },
    {
        id: 134102,
        prompt: say('Lortu esponentzialak 81 ematea $x=4$ denean.', 'Consigue que la exponencial dé 81 en $x=4$.', 'اجعل الأسية تعطي 81 عند $x=4$.', 'Make the exponential give 81 at $x=4$.'),
        hint: same('$81=3^4$'),
        isSolved: (state) => near(expValue(state, 4), 81)
    },
    {
        id: 134103,
        prompt: say('Lortu esponentzialak zuzenak baino bi aldiz gehiago ematea $x=3$ denean.', 'Consigue que la exponencial dé el doble que la recta en $x=3$.', 'اجعل الأسية تعطي ضعف المستقيم عند $x=3$.', 'Make the exponential give twice the line at $x=3$.'),
        hint: say('Probatu datuak bikoizten direnean.', 'Prueba con datos que se duplican.', 'جرّب بيانات تتضاعف.', 'Try data that double.'),
        isSolved: (state) => near(expValue(state, 3), 2 * lineValue(state, 3))
    },
    {
        id: 134104,
        prompt: say('Lortu zuzena 0 edo gutxiagora iristea $x=5$ denean, esponentziala positiboa den bitartean.', 'Consigue que la recta llegue a 0 o menos en $x=5$ mientras la exponencial sigue positiva.', 'اجعل المستقيم يبلغ 0 أو أقل عند $x=5$ بينما تبقى الأسية موجبة.', 'Make the line reach 0 or less at $x=5$ while the exponential stays positive.'),
        hint: say('Datu beherakorrak.', 'Datos que bajan.', 'بيانات تتناقص.', 'Falling data.'),
        isSolved: (state) => lineValue(state, 5) <= 0
    },
    {
        id: 134105,
        prompt: say('Jarri % 50 hazten diren datuak.', 'Pon unos datos que crezcan un 50 %.', 'ضع بيانات تنمو 50 %.', 'Set data that grow 50 %.'),
        hint: same('$b=1{,}5\\cdot a$'),
        isSolved: (state) => near(state.b, 1.5 * state.a)
    }
]

/** Endless practice: data whose exponential reaches a value at a given x */
const lineExpMaker: LabChallengeMaker<LineExpState> = (random) => {
    for (;;) {
        const a = randomInt(random, 1, 5)
        const r = pick(random, [2, 3])
        const b = a * r
        if (b > LINE_EXP_LIMITS.y.max) continue
        const x = randomInt(random, 2, 4)
        const value = a * r ** x
        return {
            prompt: say(`Lortu esponentzialak ${value} ematea $x=${x}$ denean.`, `Consigue que la exponencial dé ${value} en $x=${x}$.`, `اجعل الأسية تعطي ${value} عند $x=${x}$.`, `Make the exponential give ${value} at $x=${x}$.`),
            hint: same(`$a\\cdot\\left(\\frac{b}{a}\\right)^{${x}}=${value}$`),
            isSolved: (state) => near(expValue(state, x), value),
            solution: { a, b, target: initialLineExpState.target, prediction: null }
        }
    }
}

export const lineExpExtra = freshFrom(initialLineExpState, lineExpMaker)

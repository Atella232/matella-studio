import type { LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'

/* ==========================================================================
   Predictions and endless challenges shared by the tools of this
   unit, as in Zatikiak 2. DBH and Proportzionaltasuna 4. DBH aplikatuak:
   the learner guesses before the result is shown, and once the fixed
   challenges are done the tool makes new ones that never start solved.
   ========================================================================== */

/** A guess made before seeing the result: below, equal to or above a reference */
export type Prediction = '<' | '=' | '>'

export const compareTo = (value: number, reference: number): Prediction => (Math.abs(value - reference) < 1e-9 ? '=' : value < reference ? '<' : '>')

/** The first guess stays: a prediction is not changed after seeing whether it was right */
export const setPrediction = <State extends { prediction: Prediction | null }>(state: State, prediction: Prediction): State =>
    state.prediction === null ? { ...state, prediction } : state

/** An endless challenge is never already solved by the tool's first state */
export function freshFrom<State>(start: State, maker: LabChallengeMaker<State>): LabChallengeMaker<State> {
    return (random) => {
        for (;;) {
            const challenge = maker(random)
            if (!challenge.isSolved(start)) return challenge
        }
    }
}

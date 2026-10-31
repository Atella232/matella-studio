import { randomInt } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { compareTo, freshFrom, type Prediction } from './prediction.ts'

/* ==========================================================================
   L1 · Ibilaldia (El paseo): a walker leaves home and walks four hours;
   the learner chooses the speed of each hour (km/h, negative = back home)
   and the distance–time graph is built from it: rising stretches, flat
   stretches (a stop) and falling ones. First a guess: will the walker
   get farther than 4 km from home? ▶ walks the road.
   ========================================================================== */

export const WALK_HOURS = 4
export const WALK_SPEED = { min: -4, max: 4 } as const
export const WALK_FAR = 10

export interface WalkState {
    speeds: number[]
    prediction: Prediction | null
}

export const initialWalkState: WalkState = { speeds: [1, 1, 1, 1], prediction: null }

/** Distance from home at hours 0, 1, 2, 3 and 4 */
export function walkPositions(speeds: number[]): number[] {
    const positions = [0]
    for (const speed of speeds) positions.push(positions.at(-1)! + speed)
    return positions
}

/** Speeds that never take the walker behind home or beyond 10 km */
function legal(speeds: number[]): number[] {
    let position = 0
    return speeds.map((speed) => {
        const fixed = Math.min(WALK_FAR - position, Math.max(-position, Math.min(WALK_SPEED.max, Math.max(WALK_SPEED.min, Math.round(speed)))))
        position += fixed
        return fixed
    })
}

export function setWalkSpeed(state: WalkState, hour: number, speed: number): WalkState {
    const speeds = legal(state.speeds.map((value, index) => (index === hour ? speed : value)))
    return { speeds, prediction: speeds.every((value, index) => value === state.speeds[index]) ? state.prediction : null }
}

export const walkFarthest = (state: Pick<WalkState, 'speeds'>) => Math.max(...walkPositions(state.speeds))
/** Less than (<), exactly (=) or more than (>) 4 km from home at the farthest? */
export const walkPrediction = (state: WalkState): Prediction => compareTo(walkFarthest(state), 4)

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const at = (state: WalkState) => walkPositions(state.speeds)

export const walkChallenges: LabChallenge<WalkState>[] = [
    { id: 38101, prompt: say('Iritsi etxetik 6 km-ra eta bukaeran itzuli etxera.', 'Llega a 6 km de casa y al final vuelve a casa.', 'ابلغ $6$ كم من البيت ثم عُد إليه في النهاية.', 'Get 6 km from home and be back home at the end.'), hint: say('Bi ordu joan, bi ordu itzuli.', 'Dos horas de ida y dos de vuelta.', 'ساعتان ذهابًا وساعتان إيابًا.', 'Two hours out and two back.'), isSolved: (state) => walkFarthest(state) === 6 && at(state)[4] === 0 },
    { id: 38102, prompt: say('Ibili bi orduz, gelditu ordubete eta itzuli etxera azken orduan.', 'Camina dos horas, para una hora y vuelve a casa en la última hora.', 'امشِ ساعتين ثم توقّف ساعة ثم عُد إلى البيت في الساعة الأخيرة.', 'Walk for two hours, stop for an hour and get home in the last hour.'), hint: say('Geldialdia zati horizontal bat da: $0$ km/h.', 'La parada es un tramo horizontal: $0$ km/h.', 'التوقف جزء أفقي: $0$ كم/س.', 'The stop is a flat stretch: $0$ km/h.'), isSolved: ({ speeds }) => speeds[0] > 0 && speeds[1] > 0 && speeds[2] === 0 && walkPositions(speeds)[4] === 0 },
    { id: 38103, prompt: say('Egon $5$ km-ra 2. orduan eta berriro $5$ km-ra 4. orduan, inoiz gelditu gabe.', 'Está a $5$ km a la hora 2 y otra vez a $5$ km a la hora 4, sin parar nunca.', 'كن على بعد $5$ كم عند الساعة $2$ ومرة أخرى عند الساعة $4$ دون أن تتوقف.', 'Be $5$ km away at hour 2 and $5$ km away again at hour 4, never stopping.'), hint: say('3. orduan aurrera eta 4. orduan atzera.', 'En la hora 3 adelante y en la 4 atrás.', 'في الساعة $3$ إلى الأمام وفي $4$ إلى الخلف.', 'Forward in hour 3 and back in hour 4.'), isSolved: (state) => at(state)[2] === 5 && at(state)[4] === 5 && state.speeds.every((speed) => speed !== 0) },
    { id: 38104, prompt: say('Egin maximoa 1. orduan: gero beti behera.', 'Haz que el máximo esté en la hora 1: después, siempre bajando.', 'اجعل القيمة العظمى عند الساعة $1$: ثم نزول دائمًا.', 'Put the maximum at hour 1: always going down after it.'), hint: say('Gorakorra lehen orduan, beherakorra gero.', 'Creciente la primera hora, decreciente después.', 'متزايدة في الساعة الأولى ومتناقصة بعدها.', 'Increasing in the first hour, decreasing after it.'), isSolved: ({ speeds }) => speeds[0] > 0 && speeds.slice(1).every((speed) => speed < 0) },
    { id: 38105, prompt: say('Bukatu etxetik $10$ km-ra, ordu batean gelditu gabe.', 'Termina a $10$ km de casa sin quedarte parado ninguna hora.', 'انتهِ على بعد $10$ كم من البيت دون أن تتوقف أي ساعة.', 'End $10$ km from home without stopping in any hour.'), hint: same('$4+3+2+1=10$'), isSolved: (state) => at(state)[4] === 10 && state.speeds.every((speed) => speed !== 0) }
]

function same(latex: string): LocalizedText {
    return say(latex, latex, latex, latex)
}

const pointsOf = (positions: number[]) => positions.slice(1).map((distance, index) => `(${index + 1},${distance})`).join(',\\ ')

/** Endless practice: a graph given by its points, to be built hour by hour */
const walkMaker: LabChallengeMaker<WalkState> = (random) => {
    let speeds: number[] = []
    do speeds = legal(Array.from({ length: WALK_HOURS }, () => randomInt(random, WALK_SPEED.min, WALK_SPEED.max)))
    while (walkFarthest({ speeds }) === 0)
    const target = walkPositions(speeds)
    const points = pointsOf(target)
    return {
        prompt: say(`Egin grafikoa puntu hauetatik igaro dadin: $${points}$.`, `Haz que la gráfica pase por estos puntos: $${points}$.`, `اجعل التمثيل يمر بهذه النقاط: $${points}$.`, `Make the graph go through these points: $${points}$.`),
        hint: say('Ordu bakoitzeko abiadura: distantzia berria ken aurrekoa.', 'La velocidad de cada hora: distancia nueva menos la anterior.', 'سرعة كل ساعة: المسافة الجديدة ناقص السابقة.', 'The speed of each hour: new distance minus the one before.'),
        isSolved: (state) => walkPositions(state.speeds).every((distance, index) => distance === target[index]),
        solution: { speeds, prediction: null }
    }
}

export const walkExtra = freshFrom(initialWalkState, walkMaker)

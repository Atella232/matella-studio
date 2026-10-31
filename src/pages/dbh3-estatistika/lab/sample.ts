import { createRandom, pick, randomInt, shuffle } from '../../../features/unit-v2/games/random.ts'
import type { LabChallenge, LabChallengeMaker } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { compareTo, freshFrom, type Prediction } from './prediction.ts'

/* ==========================================================================
   L1 · Lagina (La muestra): a school of 200 pupils, 80 of whom (40 %)
   like football best, drawn as a grid of dots. The learner chooses the
   size of a random sample and which sample it is (1–20, each one a fixed
   draw, so every challenge can be checked); the sample's percentage is
   compared with the true 40 %. First a guess: will the sample give less
   than 35 %, between 35 % and 45 %, or more? ▶ picks the pupils one by
   one. Small samples miss; large ones get close.
   ========================================================================== */

export const POPULATION = 200
export const FANS = 80
export const SAMPLE_LIMITS = { size: { min: 10, max: 100, step: 10 }, draw: { min: 1, max: 20, step: 1 } } as const

export interface SampleState {
    size: number
    draw: number
    prediction: Prediction | null
}

export const initialSampleState: SampleState = { size: 10, draw: 3, prediction: null }

const snap = (value: number, { min, max, step }: { min: number; max: number; step: number }) => Math.min(max, Math.max(min, Math.round(value / step) * step))

export function setSample(state: SampleState, patch: Partial<Pick<SampleState, 'size' | 'draw'>>): SampleState {
    const size = snap(patch.size ?? state.size, SAMPLE_LIMITS.size)
    const draw = snap(patch.draw ?? state.draw, SAMPLE_LIMITS.draw)
    return { size, draw, prediction: size === state.size && draw === state.draw ? state.prediction : null }
}

/** Who likes football: the same 80 pupils every time, spread over the school */
export const fans: boolean[] = shuffle(createRandom(2026), Array.from({ length: POPULATION }, (_, index) => index < FANS))

/** The pupils of a sample, in the order they are picked */
export const sampleOf = (state: Pick<SampleState, 'size' | 'draw'>) => shuffle(createRandom(state.draw * 1009 + 17), Array.from({ length: POPULATION }, (_, index) => index)).slice(0, state.size)
export const sampleFans = (state: Pick<SampleState, 'size' | 'draw'>) => sampleOf(state).filter((pupil) => fans[pupil]).length
export const samplePercent = (state: Pick<SampleState, 'size' | 'draw'>) => (100 * sampleFans(state)) / state.size
/** Below 35 % (<), from 35 % to 45 % (=) or above 45 % (>)? */
export const samplePrediction = (state: SampleState): Prediction => {
    const percent = samplePercent(state)
    return percent < 35 ? '<' : percent > 45 ? '>' : compareTo(40, 40)
}

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const percentOf = (state: SampleState) => samplePercent(state)

export const sampleChallenges: LabChallenge<SampleState>[] = [
    { id: 56101, prompt: say('Aurkitu 10 ikasleko lagin bat, zehazki % 40 ematen duena.', 'Encuentra una muestra de 10 alumnos que dé exactamente el 40 %.', 'جد عيّنة من $10$ طلاب تعطي $40\\,\\%$ تمامًا.', 'Find a sample of 10 pupils that gives exactly 40%.'), hint: say('Probatu lagin bat bestearen atzetik: $4$ futbolzale behar dira.', 'Prueba una muestra tras otra: hacen falta $4$ futboleros.', 'جرّب عيّنة بعد أخرى: تحتاج إلى $4$ من محبي كرة القدم.', 'Try one sample after another: you need $4$ football fans.'), isSolved: (state) => state.size === 10 && sampleFans(state) === 4 },
    { id: 56102, prompt: say('Aurkitu 20 ikasleko lagin engainagarri bat: % 25 edo gutxiago.', 'Encuentra una muestra de 20 alumnos engañosa: el 25 % o menos.', 'جد عيّنة مضلِّلة من $20$ طالبًا: $25\\,\\%$ أو أقل.', 'Find a misleading sample of 20 pupils: 25% or less.'), hint: say('Lagin txikiek huts egin dezakete: probatu hainbat.', 'Las muestras pequeñas pueden fallar: prueba varias.', 'العيّنات الصغيرة قد تخطئ: جرّب عدة عيّنات.', 'Small samples can miss: try several.'), isSolved: (state) => state.size === 20 && percentOf(state) <= 25 },
    { id: 56103, prompt: say('100 ikasleko lagin batekin, lortu % 38 eta % 42 arteko emaitza.', 'Con una muestra de 100 alumnos, quédate a 2 puntos o menos del 40 %.', 'بعيّنة من $100$ طالب، ابقَ على بعد نقطتين على الأكثر من $40\\,\\%$.', 'With a sample of 100 pupils, get within 2 points of 40%.'), hint: say('Lagin handiak benetako ehunekotik hurbil daude.', 'Las muestras grandes se acercan al porcentaje real.', 'العيّنات الكبيرة تقترب من النسبة الحقيقية.', 'Large samples get close to the true percentage.'), isSolved: (state) => state.size === 100 && Math.abs(percentOf(state) - 40) <= 2 },
    { id: 56104, prompt: say('Aurkitu 30 ikasleko lagin bat, futbolzaleak erdiak baino gehiago dituena.', 'Encuentra una muestra de 30 alumnos en la que los futboleros sean más de la mitad.', 'جد عيّنة من $30$ طالبًا يكون فيها محبو كرة القدم أكثر من النصف.', 'Find a sample of 30 pupils in which football fans are more than half.'), hint: say('15 baino gehiago behar dira.', 'Hacen falta más de 15.', 'تحتاج إلى أكثر من $15$.', 'You need more than 15.'), isSolved: (state) => state.size === 30 && sampleFans(state) > 15 },
    { id: 56105, prompt: say('Aurkitu 50 ikasleko lagin bat, zehazki % 40 ematen duena.', 'Encuentra una muestra de 50 alumnos que dé exactamente el 40 %.', 'جد عيّنة من $50$ طالبًا تعطي $40\\,\\%$ تمامًا.', 'Find a sample of 50 pupils that gives exactly 40%.'), hint: say('$0{,}4\\cdot 50=20$ futbolzale.', '$0{,}4\\cdot 50=20$ futboleros.', '$0{,}4\\cdot 50=20$ من المحبين.', '$0{,}4\\cdot 50=20$ fans.'), isSolved: (state) => state.size === 50 && sampleFans(state) === 20 }
]

/** Endless practice: a sample size and the percentage one of its draws gives */
const sampleMaker: LabChallengeMaker<SampleState> = (random) => {
    const size = pick(random, [10, 20, 30, 40, 50])
    const draw = randomInt(random, 1, 20)
    const count = sampleFans({ size, draw })
    const percent = (100 * count) / size
    const text = String(Math.round(percent * 10) / 10)
    return {
        prompt: say(`Aurkitu ${size} ikasleko lagin bat, % ${text.replace('.', ',')} ematen duena.`, `Encuentra una muestra de ${size} alumnos que dé el ${text.replace('.', ',')} %.`, `جد عيّنة من $${size}$ طالبًا تعطي $${text}\\,\\%$.`, `Find a sample of ${size} pupils that gives ${text}%.`),
        hint: say(`$${count}$ futbolzale behar dira.`, `Hacen falta $${count}$ futboleros.`, `تحتاج إلى $${count}$ من المحبين.`, `You need $${count}$ fans.`),
        isSolved: (state) => state.size === size && sampleFans(state) === count,
        solution: { size, draw, prediction: null }
    }
}

export const sampleExtra = freshFrom(initialSampleState, sampleMaker)

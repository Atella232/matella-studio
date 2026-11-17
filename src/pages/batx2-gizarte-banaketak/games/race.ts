import type { Tier } from '../../../features/unit-v2/games/raceCore.ts'
import type { Random } from '../../../features/unit-v2/games/random.ts'
import { checkDistributionsBatx2PitAnswer, distributionsBatx2ParTime, distributionsBatx2RaceErrorTips, generateDistributionsBatx2RaceQuestion, type DistributionsBatx2RaceQuestion } from '../../batx2-zientziak-banaketak/games/race.ts'

/* ==========================================================================
   Banaketen lasterketa (Batxilergoa 2 · Gizarte Zientziak): the four
   circuits of 2.º Ciencias that match this unit's stages (discrete,
   binomial, normal, approximation), without the review circuit. Circuit i
   here is circuit i + 1 there; the question keeps this unit's number.
   ========================================================================== */

export function generateDistributionsBatx2gRaceQuestion(random: Random, circuit: number, tier: Tier): DistributionsBatx2RaceQuestion {
    return { ...generateDistributionsBatx2RaceQuestion(random, circuit + 1, tier), circuit }
}

export const checkDistributionsBatx2gPitAnswer = checkDistributionsBatx2PitAnswer
export const distributionsBatx2gParTime = (circuit: number) => distributionsBatx2ParTime(circuit + 1)
export const distributionsBatx2gRaceErrorTips = distributionsBatx2RaceErrorTips

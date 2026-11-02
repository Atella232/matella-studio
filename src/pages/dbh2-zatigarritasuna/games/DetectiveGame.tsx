import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { WorkedDetectiveGame } from '../../../features/unit-v2/games/WorkedDetectiveGame'
import { createDivisibilityDetectiveCases, DIVISIBILITY_DETECTIVE_CASES, divisibilityDetectiveNames, divisibilityDetectiveTips } from './detective'
import { DivisibilityGameArt } from './GameArt'
import { divisibilityGames } from './info'

/* The divisibility detective: the shared worked-solution detective with the typical divisor, GCD and LCM mistakes */

const game = divisibilityGames.find((item) => item.id === 'detective')!

export const DivisibilityDetectiveGame = (props: GameProps) => (
    <WorkedDetectiveGame
        {...props}
        config={{ game, art: <DivisibilityGameArt game="detective" />, cases: DIVISIBILITY_DETECTIVE_CASES, createCases: createDivisibilityDetectiveCases, names: divisibilityDetectiveNames, tips: divisibilityDetectiveTips }}
    />
)

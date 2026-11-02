import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { WorkedDetectiveGame } from '../../../features/unit-v2/games/WorkedDetectiveGame'
import { createIntegerDetectiveCases, INTEGER_DETECTIVE_CASES, integerDetectiveNames, integerDetectiveTips } from './detective'
import { IntegerGameArt } from './GameArt'
import { integerGames } from './info'

/* The integers detective: the shared worked-solution detective with the typical sign mistakes */

const game = integerGames.find((item) => item.id === 'detective')!

export const IntegerDetectiveGame = (props: GameProps) => (
    <WorkedDetectiveGame
        {...props}
        config={{ game, art: <IntegerGameArt game="detective" />, cases: INTEGER_DETECTIVE_CASES, createCases: createIntegerDetectiveCases, names: integerDetectiveNames, tips: integerDetectiveTips }}
    />
)

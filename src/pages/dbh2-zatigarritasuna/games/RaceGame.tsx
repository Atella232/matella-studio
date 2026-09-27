import { RaceGame } from '../../../features/unit-v2/games/RaceGame'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import type { RaceRules } from '../../../features/unit-v2/games/raceCore'
import { DivisibilityGameArt } from './GameArt'
import { divisibilityGames } from './info'
import { checkDivisibilityPitAnswer, divisibilityParTime, divisibilityRaceErrorTips, generateDivisibilityRaceQuestion, type DivisibilityRaceError } from './race'

const divisibilityRace: RaceRules<DivisibilityRaceError> = {
    game: divisibilityGames.find((item) => item.id === 'race')!,
    generate: generateDivisibilityRaceQuestion,
    checkPit: checkDivisibilityPitAnswer,
    parTime: divisibilityParTime,
    errorTip: (error) => divisibilityRaceErrorTips[error ?? 'calculation'],
    pitPlaceholder: () => '12',
    pitUnreadable: { eu: 'Idatzi zenbaki oso bat, adibidez 12.', es: 'Escribe un número entero, por ejemplo 12.', ar: 'اكتب عددًا صحيحًا، مثل 12.' },
    pitWrongForm: { eu: 'Idatzi zenbaki oso gisa.', es: 'Escríbelo como número entero.', ar: 'اكتبه عددًا صحيحًا.' }
}

export function DivisibilityRaceGame(props: GameProps) {
    return <RaceGame {...props} rules={divisibilityRace} art={<DivisibilityGameArt game="race" />} />
}

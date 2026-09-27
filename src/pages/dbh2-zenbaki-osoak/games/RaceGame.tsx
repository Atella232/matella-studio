import { RaceGame } from '../../../features/unit-v2/games/RaceGame'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import type { RaceRules } from '../../../features/unit-v2/games/raceCore'
import { IntegerGameArt } from './GameArt'
import { integerGames } from './info'
import { checkIntegerPitAnswer, generateIntegerRaceQuestion, integerParTime, integerRaceErrorTips, type IntegerRaceError } from './race'

const integerRace: RaceRules<IntegerRaceError> = {
    game: integerGames.find((item) => item.id === 'race')!,
    generate: generateIntegerRaceQuestion,
    checkPit: checkIntegerPitAnswer,
    parTime: integerParTime,
    errorTip: (error) => integerRaceErrorTips[error ?? 'calculation'],
    pitPlaceholder: () => '−7',
    pitUnreadable: { eu: 'Idatzi zenbaki oso bat, adibidez −7 edo +12.', es: 'Escribe un número entero, por ejemplo −7 o +12.', ar: 'اكتب عددًا صحيحًا، مثل ⁦−7⁩ أو ⁦+12⁩.' },
    pitWrongForm: { eu: 'Idatzi zenbaki oso gisa.', es: 'Escríbelo como número entero.', ar: 'اكتبه عددًا صحيحًا.' }
}

export function IntegerRaceGame(props: GameProps) {
    return <RaceGame {...props} rules={integerRace} art={<IntegerGameArt game="race" />} />
}

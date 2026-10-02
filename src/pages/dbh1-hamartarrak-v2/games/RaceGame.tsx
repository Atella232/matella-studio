import { RaceGame } from '../../../features/unit-v2/games/RaceGame'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import type { RaceRules } from '../../../features/unit-v2/games/raceCore'
import { DecimalsGameArt } from './GameArt'
import { decimalsGames } from './info'
import { checkDecimalsPitAnswer, decimalsParTime, decimalsRaceErrorTips, generateDecimalsRaceQuestion, type DecimalsRaceError } from './race'

const decimalsRace: RaceRules<DecimalsRaceError> = {
    game: decimalsGames.find((item) => item.id === 'race')!,
    generate: generateDecimalsRaceQuestion,
    checkPit: checkDecimalsPitAnswer,
    parTime: decimalsParTime,
    errorTip: (error) => decimalsRaceErrorTips[error ?? 'calculation'],
    pitPlaceholder: () => '2,35',
    pitUnreadable: { eu: 'Idatzi zenbaki bat, adibidez 2,35.', es: 'Escribe un número, por ejemplo 2,35.', ar: 'اكتب عددًا، مثل 2.35.' },
    pitWrongForm: { eu: 'Idatzi zenbaki hamartar gisa.', es: 'Escríbelo como número decimal.', ar: 'اكتبه عددًا عشريًا.' }
}

export function DecimalsRaceGame(props: GameProps) {
    return <RaceGame {...props} rules={decimalsRace} art={<DecimalsGameArt game="race" />} />
}

import { RaceGame } from '../../../features/unit-v2/games/RaceGame'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import type { RaceRules } from '../../../features/unit-v2/games/raceCore'
import { DiscreteBatx1gGameArt } from './GameArt'
import { discreteBatx1gGames } from './info'
import { checkDiscreteBatx1gPitAnswer, discreteBatx1gParTime, discreteBatx1gRaceErrorTips, generateDiscreteBatx1gRaceQuestion, type DiscreteBatx1gRaceError } from './race'

const discreteBatx1gRace: RaceRules<DiscreteBatx1gRaceError> = {
    game: discreteBatx1gGames.find((item) => item.id === 'race')!,
    generate: generateDiscreteBatx1gRaceQuestion,
    checkPit: checkDiscreteBatx1gPitAnswer,
    parTime: discreteBatx1gParTime,
    errorTip: (error) => discreteBatx1gRaceErrorTips[error ?? 'calculation'],
    // A fraction: the same in every language (a decimal comma would be wrong in Arabic)
    pitPlaceholder: () => '3/8',
    pitUnreadable: { eu: 'Idatzi zatiki bat edo zenbaki bat, adibidez 3/8 edo 0,25.', es: 'Escribe una fracción o un número, por ejemplo 3/8 o 0,25.', en: 'Write a fraction or a number, for example 3/8 or 0.25.', ar: 'اكتب كسرًا أو عددًا، مثل 3/8 أو 0.25.' },
    pitWrongForm: { eu: 'Idatzi zatiki edo zenbaki gisa.', es: 'Escríbelo como fracción o número.', en: 'Write it as a fraction or a number.', ar: 'اكتبه كسرًا أو عددًا.' }
}

export function DiscreteBatx1gRaceGame(props: GameProps) {
    return <RaceGame {...props} rules={discreteBatx1gRace} art={<DiscreteBatx1gGameArt game="race" />} />
}

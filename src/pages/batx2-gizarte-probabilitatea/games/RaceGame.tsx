import { RaceGame } from '../../../features/unit-v2/games/RaceGame'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import type { RaceRules } from '../../../features/unit-v2/games/raceCore'
import { ProbabilityBatx2gGameArt } from './GameArt'
import { probabilityBatx2gGames } from './info'
import { checkProbabilityBatx2gPitAnswer, generateProbabilityBatx2gRaceQuestion, probabilityBatx2gParTime, probabilityBatx2gRaceErrorTips, type ProbabilityBatx2gRaceError } from './race'

const probabilityBatx2gRace: RaceRules<ProbabilityBatx2gRaceError> = {
    game: probabilityBatx2gGames.find((item) => item.id === 'race')!,
    generate: generateProbabilityBatx2gRaceQuestion,
    checkPit: checkProbabilityBatx2gPitAnswer,
    parTime: probabilityBatx2gParTime,
    errorTip: (error) => probabilityBatx2gRaceErrorTips[error ?? 'calculation'],
    // A fraction: the same in every language (a decimal comma would be wrong in Arabic)
    pitPlaceholder: () => '3/8',
    pitUnreadable: { eu: 'Idatzi zatiki bat edo zenbaki bat, adibidez 3/8 edo 120.', es: 'Escribe una fracción o un número, por ejemplo 3/8 o 120.', en: 'Write a fraction or a number, for example 3/8 or 120.', ar: 'اكتب كسرًا أو عددًا، مثل 3/8 أو 120.' },
    pitWrongForm: { eu: 'Idatzi zatiki edo zenbaki gisa.', es: 'Escríbelo como fracción o número.', en: 'Write it as a fraction or a number.', ar: 'اكتبه كسرًا أو عددًا.' }
}

export function ProbabilityBatx2gRaceGame(props: GameProps) {
    return <RaceGame {...props} rules={probabilityBatx2gRace} art={<ProbabilityBatx2gGameArt game="race" />} />
}

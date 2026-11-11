import { RaceGame } from '../../../features/unit-v2/games/RaceGame'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import type { RaceRules } from '../../../features/unit-v2/games/raceCore'
import { ProbabilityBatx2GameArt } from './GameArt'
import { probabilityBatx2Games } from './info'
import { checkProbabilityBatx2PitAnswer, generateProbabilityBatx2RaceQuestion, probabilityBatx2ParTime, probabilityBatx2RaceErrorTips, type ProbabilityBatx2RaceError } from './race'

const probabilityBatx2Race: RaceRules<ProbabilityBatx2RaceError> = {
    game: probabilityBatx2Games.find((item) => item.id === 'race')!,
    generate: generateProbabilityBatx2RaceQuestion,
    checkPit: checkProbabilityBatx2PitAnswer,
    parTime: probabilityBatx2ParTime,
    errorTip: (error) => probabilityBatx2RaceErrorTips[error ?? 'calculation'],
    // A fraction: the same in every language (a decimal comma would be wrong in Arabic)
    pitPlaceholder: () => '3/8',
    pitUnreadable: { eu: 'Idatzi zatiki bat edo zenbaki bat, adibidez 3/8 edo 0,25.', es: 'Escribe una fracción o un número, por ejemplo 3/8 o 0,25.', en: 'Write a fraction or a number, for example 3/8 or 0.25.', ar: 'اكتب كسرًا أو عددًا، مثل 3/8 أو 0.25.' },
    pitWrongForm: { eu: 'Idatzi zatiki edo zenbaki gisa.', es: 'Escríbelo como fracción o número.', en: 'Write it as a fraction or a number.', ar: 'اكتبه كسرًا أو عددًا.' }
}

export function ProbabilityBatx2RaceGame(props: GameProps) {
    return <RaceGame {...props} rules={probabilityBatx2Race} art={<ProbabilityBatx2GameArt game="race" />} />
}

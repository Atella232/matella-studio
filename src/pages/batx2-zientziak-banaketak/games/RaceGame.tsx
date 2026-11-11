import { RaceGame } from '../../../features/unit-v2/games/RaceGame'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import type { RaceRules } from '../../../features/unit-v2/games/raceCore'
import { DistributionsBatx2GameArt } from './GameArt'
import { distributionsBatx2Games } from './info'
import { checkDistributionsBatx2PitAnswer, distributionsBatx2ParTime, distributionsBatx2RaceErrorTips, generateDistributionsBatx2RaceQuestion, type DistributionsBatx2RaceError } from './race'

const distributionsBatx2Race: RaceRules<DistributionsBatx2RaceError> = {
    game: distributionsBatx2Games.find((item) => item.id === 'race')!,
    generate: generateDistributionsBatx2RaceQuestion,
    checkPit: checkDistributionsBatx2PitAnswer,
    parTime: distributionsBatx2ParTime,
    errorTip: (error) => distributionsBatx2RaceErrorTips[error ?? 'calculation'],
    // A fraction: the same in every language (a decimal comma would be wrong in Arabic)
    pitPlaceholder: () => '3/8',
    pitUnreadable: { eu: 'Idatzi zatiki bat edo zenbaki bat, adibidez 3/8 edo 0,25.', es: 'Escribe una fracción o un número, por ejemplo 3/8 o 0,25.', en: 'Write a fraction or a number, for example 3/8 or 0.25.', ar: 'اكتب كسرًا أو عددًا، مثل 3/8 أو 0.25.' },
    pitWrongForm: { eu: 'Idatzi zatiki edo zenbaki gisa.', es: 'Escríbelo como fracción o número.', en: 'Write it as a fraction or a number.', ar: 'اكتبه كسرًا أو عددًا.' }
}

export function DistributionsBatx2RaceGame(props: GameProps) {
    return <RaceGame {...props} rules={distributionsBatx2Race} art={<DistributionsBatx2GameArt game="race" />} />
}

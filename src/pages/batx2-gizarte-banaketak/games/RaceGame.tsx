import { RaceGame } from '../../../features/unit-v2/games/RaceGame'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import type { RaceRules } from '../../../features/unit-v2/games/raceCore'
import type { DistributionsBatx2RaceError } from '../../batx2-zientziak-banaketak/games/race'
import { DistributionsBatx2gGameArt } from './GameArt'
import { distributionsBatx2gGames } from './info'
import { checkDistributionsBatx2gPitAnswer, distributionsBatx2gParTime, distributionsBatx2gRaceErrorTips, generateDistributionsBatx2gRaceQuestion } from './race'

const distributionsBatx2gRace: RaceRules<DistributionsBatx2RaceError> = {
    game: distributionsBatx2gGames.find((item) => item.id === 'race')!,
    generate: generateDistributionsBatx2gRaceQuestion,
    checkPit: checkDistributionsBatx2gPitAnswer,
    parTime: distributionsBatx2gParTime,
    errorTip: (error) => distributionsBatx2gRaceErrorTips[error ?? 'calculation'],
    pitPlaceholder: () => '0.8944',
    pitUnreadable: { eu: 'Idatzi zenbaki bat edo zatiki bat, adibidez 0,8944 edo 3/8.', es: 'Escribe un número o una fracción, por ejemplo 0,8944 o 3/8.', en: 'Write a number or a fraction, for example 0.8944 or 3/8.', ar: 'اكتب عددًا أو كسرًا، مثل 0.8944 أو 3/8.' },
    pitWrongForm: { eu: 'Idatzi zenbaki edo zatiki gisa.', es: 'Escríbelo como número o fracción.', en: 'Write it as a number or a fraction.', ar: 'اكتبه عددًا أو كسرًا.' }
}

export function DistributionsBatx2gRaceGame(props: GameProps) {
    return <RaceGame {...props} rules={distributionsBatx2gRace} art={<DistributionsBatx2gGameArt game="race" />} />
}

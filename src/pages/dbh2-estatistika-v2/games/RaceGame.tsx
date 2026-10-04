import { RaceGame } from '../../../features/unit-v2/games/RaceGame'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import type { RaceRules } from '../../../features/unit-v2/games/raceCore'
import { StatisticsGameArt } from './GameArt'
import { statisticsGames } from './info'
import { checkStatisticsPitAnswer, generateStatisticsRaceQuestion, statisticsParTime, statisticsRaceErrorTips, type StatisticsRaceError } from './race'

const statisticsRace: RaceRules<StatisticsRaceError> = {
    game: statisticsGames.find((item) => item.id === 'race')!,
    generate: generateStatisticsRaceQuestion,
    checkPit: checkStatisticsPitAnswer,
    parTime: statisticsParTime,
    errorTip: (error) => statisticsRaceErrorTips[error ?? 'calculation'],
    pitPlaceholder: () => '1,8',
    pitUnreadable: { eu: 'Idatzi zenbaki bat edo zatiki bat, adibidez 18, 1,8 edo 3/8.', es: 'Escribe un número o una fracción, por ejemplo 18, 1,8 o 3/8.', ar: 'اكتب عددًا أو كسرًا، مثل 18 أو 1.8 أو 3/8.' },
    pitWrongForm: { eu: 'Idatzi zenbaki gisa.', es: 'Escríbelo como número.', ar: 'اكتبه عددًا.' }
}

export function StatisticsRaceGame(props: GameProps) {
    return <RaceGame {...props} rules={statisticsRace} art={<StatisticsGameArt game="race" />} />
}

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
    pitPlaceholder: () => '1,5',
    pitUnreadable: { eu: 'Idatzi zenbaki bat edo zatiki bat, adibidez 1,5 edo 3/10.', es: 'Escribe un número o una fracción, por ejemplo 1,5 o 3/10.', ar: 'اكتب عددًا أو كسرًا، مثل 1.5 أو 3/10.' },
    pitWrongForm: { eu: 'Idatzi zenbaki gisa.', es: 'Escríbelo como número.', ar: 'اكتبه عددًا.' }
}

export function StatisticsRaceGame(props: GameProps) {
    return <RaceGame {...props} rules={statisticsRace} art={<StatisticsGameArt game="race" />} />
}

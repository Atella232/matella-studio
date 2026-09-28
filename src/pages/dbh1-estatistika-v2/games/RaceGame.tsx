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
    pitPlaceholder: () => '0,25',
    pitUnreadable: { eu: 'Idatzi zenbaki bat edo zatiki bat.', es: 'Escribe un número o una fracción.', ar: 'اكتب عددًا أو كسرًا.' },
    pitWrongForm: { eu: 'Idatzi zenbaki gisa.', es: 'Escríbelo como número.', ar: 'اكتبه عددًا.' }
}

export function StatisticsRaceGame(props: GameProps) {
    return <RaceGame {...props} rules={statisticsRace} art={<StatisticsGameArt game="race" />} />
}

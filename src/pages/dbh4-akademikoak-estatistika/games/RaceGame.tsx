import { RaceGame } from '../../../features/unit-v2/games/RaceGame'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import type { RaceRules } from '../../../features/unit-v2/games/raceCore'
import { StatisticsAkGameArt } from './GameArt'
import { statisticsAkGames } from './info'
import { checkStatisticsAkPitAnswer, generateStatisticsAkRaceQuestion, statisticsAkParTime, statisticsAkRaceErrorTips, type StatisticsAkRaceError } from './race'

const statisticsAkRace: RaceRules<StatisticsAkRaceError> = {
    game: statisticsAkGames.find((item) => item.id === 'race')!,
    generate: generateStatisticsAkRaceQuestion,
    checkPit: checkStatisticsAkPitAnswer,
    parTime: statisticsAkParTime,
    errorTip: (error) => statisticsAkRaceErrorTips[error ?? 'calculation'],
    pitPlaceholder: () => '18',
    pitUnreadable: { eu: 'Idatzi zenbaki bakar bat, adibidez 18, 6,5 edo −2.', es: 'Escribe un solo número, por ejemplo 18, 6,5 o −2.', ar: 'اكتب عددًا واحدًا، مثل 18 أو 6.5 أو ⁦−2⁩.' },
    pitWrongForm: { eu: 'Idatzi zenbaki gisa.', es: 'Escríbelo como número.', ar: 'اكتبه عددًا.' }
}

export function StatisticsAkRaceGame(props: GameProps) {
    return <RaceGame {...props} rules={statisticsAkRace} art={<StatisticsAkGameArt game="race" />} />
}

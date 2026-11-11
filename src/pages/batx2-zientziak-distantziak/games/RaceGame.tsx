import { RaceGame } from '../../../features/unit-v2/games/RaceGame'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import type { RaceRules } from '../../../features/unit-v2/games/raceCore'
import { AnglesDistancesGameArt } from './GameArt'
import { anglesDistancesGames } from './info'
import { checkDistancesPitAnswer, distancesParTime, distancesRaceErrorTips, generateDistancesRaceQuestion, type DistancesRaceError } from './race'

const distancesRace: RaceRules<DistancesRaceError> = {
    game: anglesDistancesGames.find((item) => item.id === 'race')!,
    generate: generateDistancesRaceQuestion,
    checkPit: checkDistancesPitAnswer,
    parTime: distancesParTime,
    errorTip: (error) => distancesRaceErrorTips[error ?? 'calculation'],
    pitPlaceholder: () => '45',
    pitUnreadable: { eu: 'Idatzi zenbaki bat edo zatiki bat, adibidez 45, −3 edo 7/3.', es: 'Escribe un número o una fracción, por ejemplo 45, −3 o 7/3.', en: 'Write a number or a fraction, for example 45, −3 or 7/3.', ar: 'اكتب عددًا أو كسرًا، مثل 45 أو ⁦−3⁩ أو 7/3.' },
    pitWrongForm: { eu: 'Idatzi zenbaki gisa.', es: 'Escríbelo como número.', en: 'Write it as a number.', ar: 'اكتبه عددًا.' }
}

export function AnglesDistancesRaceGame(props: GameProps) {
    return <RaceGame {...props} rules={distancesRace} art={<AnglesDistancesGameArt game="race" />} />
}

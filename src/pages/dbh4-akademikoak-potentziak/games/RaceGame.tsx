import { RaceGame } from '../../../features/unit-v2/games/RaceGame'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import type { RaceRules } from '../../../features/unit-v2/games/raceCore'
import { PowersGameArt } from './GameArt'
import { powersGames } from './info'
import { checkPowersPitAnswer, generatePowersRaceQuestion, powersParTime, powersRaceErrorTips, type PowersRaceError } from './race'

const powersRace: RaceRules<PowersRaceError> = {
    game: powersGames.find((item) => item.id === 'race')!,
    generate: generatePowersRaceQuestion,
    checkPit: checkPowersPitAnswer,
    parTime: powersParTime,
    errorTip: (error) => powersRaceErrorTips[error ?? 'calculation'],
    pitPlaceholder: () => '−3',
    pitUnreadable: { eu: 'Idatzi zenbaki bat edo zatiki bat, adibidez −3 edo 1/8.', es: 'Escribe un número o una fracción, por ejemplo −3 o 1/8.', ar: 'اكتب عددًا أو كسرًا، مثل ⁦−3⁩ أو 1/8.' },
    pitWrongForm: { eu: 'Idatzi zenbaki gisa.', es: 'Escríbelo como número.', ar: 'اكتبه عددًا.' }
}

export function PowersRaceGame(props: GameProps) {
    return <RaceGame {...props} rules={powersRace} art={<PowersGameArt game="race" />} />
}

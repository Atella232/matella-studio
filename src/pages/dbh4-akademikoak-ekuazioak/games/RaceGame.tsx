import { RaceGame } from '../../../features/unit-v2/games/RaceGame'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import type { RaceRules } from '../../../features/unit-v2/games/raceCore'
import { EquationsGameArt } from './GameArt'
import { equationsGames } from './info'
import { checkEquationsPitAnswer, equationsParTime, equationsRaceErrorTips, generateEquationsRaceQuestion, type EquationsRaceError } from './race'

const equationsRace: RaceRules<EquationsRaceError> = {
    game: equationsGames.find((item) => item.id === 'race')!,
    generate: generateEquationsRaceQuestion,
    checkPit: checkEquationsPitAnswer,
    parTime: equationsParTime,
    errorTip: (error) => equationsRaceErrorTips[error ?? 'calculation'],
    pitPlaceholder: () => '−3',
    pitUnreadable: { eu: 'Idatzi zenbaki bat edo zatiki bat, adibidez −3 edo 5/2.', es: 'Escribe un número o una fracción, por ejemplo −3 o 5/2.', ar: 'اكتب عددًا أو كسرًا، مثل ⁦−3⁩ أو 5/2.' },
    pitWrongForm: { eu: 'Idatzi zenbaki gisa.', es: 'Escríbelo como número.', ar: 'اكتبه عددًا.' }
}

export function EquationsRaceGame(props: GameProps) {
    return <RaceGame {...props} rules={equationsRace} art={<EquationsGameArt game="race" />} />
}

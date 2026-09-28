import { RaceGame } from '../../../features/unit-v2/games/RaceGame'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import type { RaceRules } from '../../../features/unit-v2/games/raceCore'
import { AlgebraGameArt } from './GameArt'
import { algebraGames } from './info'
import { algebraParTime, algebraRaceErrorTips, checkAlgebraPitAnswer, generateAlgebraRaceQuestion, type AlgebraRaceError } from './race'

const algebraRace: RaceRules<AlgebraRaceError> = {
    game: algebraGames.find((item) => item.id === 'race')!,
    generate: generateAlgebraRaceQuestion,
    checkPit: checkAlgebraPitAnswer,
    parTime: algebraParTime,
    errorTip: (error) => algebraRaceErrorTips[error ?? 'calculation'],
    pitPlaceholder: () => '−3',
    pitUnreadable: { eu: 'Idatzi zenbaki bat, adibidez 5 edo −3.', es: 'Escribe un número, por ejemplo 5 o −3.', ar: 'اكتب عددًا، مثل 5 أو ⁦−3⁩.' },
    pitWrongForm: { eu: 'Idatzi zenbaki gisa.', es: 'Escríbelo como número.', ar: 'اكتبه عددًا.' }
}

export function AlgebraRaceGame(props: GameProps) {
    return <RaceGame {...props} rules={algebraRace} art={<AlgebraGameArt game="race" />} />
}

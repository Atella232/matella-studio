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
    pitPlaceholder: () => '−45',
    pitUnreadable: { eu: 'Idatzi zenbaki oso bat.', es: 'Escribe un número entero.', en: 'Write an integer.', ar: 'اكتب عددًا صحيحًا.' },
    pitWrongForm: { eu: 'Idatzi zenbaki gisa.', es: 'Escríbelo como número.', en: 'Write it as a number.', ar: 'اكتبه عددًا.' }
}

export function AlgebraRaceGame(props: GameProps) {
    return <RaceGame {...props} rules={algebraRace} art={<AlgebraGameArt game="race" />} />
}

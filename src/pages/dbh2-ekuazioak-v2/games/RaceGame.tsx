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
    pitUnreadable: { eu: 'Idatzi zenbaki oso bat.', es: 'Escribe un número entero.', ar: 'اكتب عددًا صحيحًا.' },
    pitWrongForm: { eu: 'Idatzi zenbaki gisa.', es: 'Escríbelo como número.', ar: 'اكتبه عددًا.' }
}

export function EquationsRaceGame(props: GameProps) {
    return <RaceGame {...props} rules={equationsRace} art={<EquationsGameArt game="race" />} />
}

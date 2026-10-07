import { RaceGame } from '../../../features/unit-v2/games/RaceGame'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import type { RaceRules } from '../../../features/unit-v2/games/raceCore'
import { EquationsSystemsGameArt } from './GameArt'
import { equationsSystemsGames } from './info'
import { checkEquationsSystemsPitAnswer, equationsSystemsParTime, equationsSystemsRaceErrorTips, generateEquationsSystemsRaceQuestion, type EquationsSystemsRaceError } from './race'

const equationsSystemsRace: RaceRules<EquationsSystemsRaceError> = {
    game: equationsSystemsGames.find((item) => item.id === 'race')!,
    generate: generateEquationsSystemsRaceQuestion,
    checkPit: checkEquationsSystemsPitAnswer,
    parTime: equationsSystemsParTime,
    errorTip: (error) => equationsSystemsRaceErrorTips[error ?? 'calculation'],
    pitPlaceholder: () => '−4',
    pitUnreadable: { eu: 'Idatzi zenbaki oso bat, adibidez −4.', es: 'Escribe un número entero, por ejemplo −4.', ar: 'اكتب عددًا صحيحًا، مثل ⁦−4⁩.' },
    pitWrongForm: { eu: 'Idatzi zenbaki gisa.', es: 'Escríbelo como número.', ar: 'اكتبه عددًا.' }
}

export function EquationsSystemsRaceGame(props: GameProps) {
    return <RaceGame {...props} rules={equationsSystemsRace} art={<EquationsSystemsGameArt game="race" />} />
}

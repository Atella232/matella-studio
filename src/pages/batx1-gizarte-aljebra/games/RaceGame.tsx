import { RaceGame } from '../../../features/unit-v2/games/RaceGame'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import type { RaceRules } from '../../../features/unit-v2/games/raceCore'
import { GizAlgebraGameArt } from './GameArt'
import { gizAlgebraGames } from './info'
import { checkGizAlgebraPitAnswer, generateGizAlgebraRaceQuestion, gizAlgebraParTime, gizAlgebraRaceErrorTips, type GizAlgebraRaceError } from './race'

const gizAlgebraRace: RaceRules<GizAlgebraRaceError> = {
    game: gizAlgebraGames.find((item) => item.id === 'race')!,
    generate: generateGizAlgebraRaceQuestion,
    checkPit: checkGizAlgebraPitAnswer,
    parTime: gizAlgebraParTime,
    errorTip: (error) => gizAlgebraRaceErrorTips[error ?? 'calculation'],
    pitPlaceholder: () => '3/2',
    pitUnreadable: { eu: 'Idatzi zenbaki bat, adibidez −3 edo 3/2.', es: 'Escribe un número, por ejemplo −3 o 3/2.', en: 'Write a number, for example −3 or 3/2.', ar: 'اكتب عددًا، مثل ⁦−3⁩ أو 3/2.' },
    pitWrongForm: { eu: 'Idatzi zenbaki gisa.', es: 'Escríbelo como número.', en: 'Write it as a number.', ar: 'اكتبه عددًا.' }
}

export function GizAlgebraRaceGame(props: GameProps) {
    return <RaceGame {...props} rules={gizAlgebraRace} art={<GizAlgebraGameArt game="race" />} />
}

import { RaceGame } from '../../../features/unit-v2/games/RaceGame'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import type { RaceRules } from '../../../features/unit-v2/games/raceCore'
import { PythagorasGameArt } from './GameArt'
import { pythagorasGames } from './info'
import { checkPythagorasPitAnswer, generatePythagorasRaceQuestion, pythagorasParTime, pythagorasRaceErrorTips, type PythagorasRaceError } from './race'

const pythagorasRace: RaceRules<PythagorasRaceError> = {
    game: pythagorasGames.find((item) => item.id === 'race')!,
    generate: generatePythagorasRaceQuestion,
    checkPit: checkPythagorasPitAnswer,
    parTime: pythagorasParTime,
    errorTip: (error) => pythagorasRaceErrorTips[error ?? 'calculation'],
    pitPlaceholder: () => '13',
    pitUnreadable: { eu: 'Idatzi zenbaki bat, adibidez 13 edo 6,5.', es: 'Escribe un número, por ejemplo 13 o 6,5.', ar: 'اكتب عددًا، مثل 13 أو 6.5.' },
    pitWrongForm: { eu: 'Idatzi zenbaki gisa.', es: 'Escríbelo como número.', ar: 'اكتبه عددًا.' }
}

export function PythagorasRaceGame(props: GameProps) {
    return <RaceGame {...props} rules={pythagorasRace} art={<PythagorasGameArt game="race" />} />
}

import { RaceGame } from '../../../features/unit-v2/games/RaceGame'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import type { RaceRules } from '../../../features/unit-v2/games/raceCore'
import { ExponentialAkGameArt } from './GameArt'
import { exponentialAkGames } from './info'
import { checkExponentialAkPitAnswer, exponentialAkParTime, exponentialAkRaceErrorTips, generateExponentialAkRaceQuestion, type ExponentialAkRaceError } from './race'

const exponentialAkRace: RaceRules<ExponentialAkRaceError> = {
    game: exponentialAkGames.find((item) => item.id === 'race')!,
    generate: generateExponentialAkRaceQuestion,
    checkPit: checkExponentialAkPitAnswer,
    parTime: exponentialAkParTime,
    errorTip: (error) => exponentialAkRaceErrorTips[error ?? 'calculation'],
    pitPlaceholder: () => '-3',
    pitUnreadable: { eu: 'Idatzi zenbaki bakar bat, adibidez 5, −3 edo 2/3.', es: 'Escribe un solo número, por ejemplo 5, −3 o 2/3.', en: 'Write a single number, for example 5, −3 or 2/3.', ar: 'اكتب عددًا واحدًا، مثل 5 أو ⁦−3⁩ أو 2/3.' },
    pitWrongForm: { eu: 'Idatzi zenbaki gisa.', es: 'Escríbelo como número.', en: 'Write it as a number.', ar: 'اكتبه عددًا.' }
}

export function ExponentialAkRaceGame(props: GameProps) {
    return <RaceGame {...props} rules={exponentialAkRace} art={<ExponentialAkGameArt game="race" />} />
}

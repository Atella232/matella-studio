import { RaceGame } from '../../../features/unit-v2/games/RaceGame'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import type { RaceRules } from '../../../features/unit-v2/games/raceCore'
import { Equations3GameArt } from './GameArt'
import { equations3Games } from './info'
import { checkEquations3PitAnswer, generateEquations3RaceQuestion, equations3ParTime, equations3RaceErrorTips, type Equations3RaceError } from './race'

const equations3Race: RaceRules<Equations3RaceError> = {
    game: equations3Games.find((item) => item.id === 'race')!,
    generate: generateEquations3RaceQuestion,
    checkPit: checkEquations3PitAnswer,
    parTime: equations3ParTime,
    errorTip: (error) => equations3RaceErrorTips[error ?? 'calculation'],
    pitPlaceholder: () => '12',
    pitUnreadable: { eu: 'Idatzi zenbaki oso bat, adibidez 12 edo −6.', es: 'Escribe un número entero, por ejemplo 12 o −6.', en: 'Write a whole number, for example 12 or −6.', ar: 'اكتب عددًا صحيحًا، مثل 12 أو \u2066−6\u2069.' },
    pitWrongForm: { eu: 'Idatzi zenbaki gisa.', es: 'Escríbelo como número.', en: 'Write it as a number.', ar: 'اكتبه عددًا.' }
}

export function Equations3RaceGame(props: GameProps) {
    return <RaceGame {...props} rules={equations3Race} art={<Equations3GameArt game="race" />} />
}

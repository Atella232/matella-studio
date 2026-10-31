import { RaceGame } from '../../../features/unit-v2/games/RaceGame'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import type { RaceRules } from '../../../features/unit-v2/games/raceCore'
import { Motions3GameArt } from './GameArt'
import { motions3Games } from './info'
import { checkMotions3PitAnswer, generateMotions3RaceQuestion, motions3ParTime, motions3RaceErrorTips, type Motions3RaceError } from './race'

const motions3Race: RaceRules<Motions3RaceError> = {
    game: motions3Games.find((item) => item.id === 'race')!,
    generate: generateMotions3RaceQuestion,
    checkPit: checkMotions3PitAnswer,
    parTime: motions3ParTime,
    errorTip: (error) => motions3RaceErrorTips[error ?? 'calculation'],
    pitPlaceholder: () => '12',
    pitUnreadable: { eu: 'Idatzi zenbaki oso bat, adibidez 12 edo −6.', es: 'Escribe un número entero, por ejemplo 12 o −6.', en: 'Write a whole number, for example 12 or −6.', ar: 'اكتب عددًا صحيحًا، مثل 12 أو \u2066−6\u2069.' },
    pitWrongForm: { eu: 'Idatzi zenbaki gisa.', es: 'Escríbelo como número.', en: 'Write it as a number.', ar: 'اكتبه عددًا.' }
}

export function Motions3RaceGame(props: GameProps) {
    return <RaceGame {...props} rules={motions3Race} art={<Motions3GameArt game="race" />} />
}

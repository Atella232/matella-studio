import { RaceGame } from '../../../features/unit-v2/games/RaceGame'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import type { RaceRules } from '../../../features/unit-v2/games/raceCore'
import { Geometry3GameArt } from './GameArt'
import { geometry3Games } from './info'
import { checkGeometry3PitAnswer, generateGeometry3RaceQuestion, geometry3ParTime, geometry3RaceErrorTips, type Geometry3RaceError } from './race'

const geometry3Race: RaceRules<Geometry3RaceError> = {
    game: geometry3Games.find((item) => item.id === 'race')!,
    generate: generateGeometry3RaceQuestion,
    checkPit: checkGeometry3PitAnswer,
    parTime: geometry3ParTime,
    errorTip: (error) => geometry3RaceErrorTips[error ?? 'calculation'],
    pitPlaceholder: () => '12',
    pitUnreadable: { eu: 'Idatzi zenbaki oso bat, adibidez 12 edo −6.', es: 'Escribe un número entero, por ejemplo 12 o −6.', en: 'Write a whole number, for example 12 or −6.', ar: 'اكتب عددًا صحيحًا، مثل 12 أو \u2066−6\u2069.' },
    pitWrongForm: { eu: 'Idatzi zenbaki gisa.', es: 'Escríbelo como número.', en: 'Write it as a number.', ar: 'اكتبه عددًا.' }
}

export function Geometry3RaceGame(props: GameProps) {
    return <RaceGame {...props} rules={geometry3Race} art={<Geometry3GameArt game="race" />} />
}

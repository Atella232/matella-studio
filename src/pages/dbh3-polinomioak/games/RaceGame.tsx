import { RaceGame } from '../../../features/unit-v2/games/RaceGame'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import type { RaceRules } from '../../../features/unit-v2/games/raceCore'
import { Polynomials3GameArt } from './GameArt'
import { polynomials3Games } from './info'
import { checkPolynomials3PitAnswer, generatePolynomials3RaceQuestion, polynomials3ParTime, polynomials3RaceErrorTips, type Polynomials3RaceError } from './race'

const polynomials3Race: RaceRules<Polynomials3RaceError> = {
    game: polynomials3Games.find((item) => item.id === 'race')!,
    generate: generatePolynomials3RaceQuestion,
    checkPit: checkPolynomials3PitAnswer,
    parTime: polynomials3ParTime,
    errorTip: (error) => polynomials3RaceErrorTips[error ?? 'calculation'],
    pitPlaceholder: () => '12',
    pitUnreadable: { eu: 'Idatzi zenbaki oso bat, adibidez 12 edo −6.', es: 'Escribe un número entero, por ejemplo 12 o −6.', en: 'Write a whole number, for example 12 or −6.', ar: 'اكتب عددًا صحيحًا، مثل 12 أو \u2066−6\u2069.' },
    pitWrongForm: { eu: 'Idatzi zenbaki gisa.', es: 'Escríbelo como número.', en: 'Write it as a number.', ar: 'اكتبه عددًا.' }
}

export function Polynomials3RaceGame(props: GameProps) {
    return <RaceGame {...props} rules={polynomials3Race} art={<Polynomials3GameArt game="race" />} />
}

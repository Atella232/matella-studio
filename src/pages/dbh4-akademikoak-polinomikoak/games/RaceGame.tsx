import { RaceGame } from '../../../features/unit-v2/games/RaceGame'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import type { RaceRules } from '../../../features/unit-v2/games/raceCore'
import { PolynomialAkGameArt } from './GameArt'
import { polynomialAkGames } from './info'
import { checkPolynomialAkPitAnswer, generatePolynomialAkRaceQuestion, polynomialAkParTime, polynomialAkRaceErrorTips, type PolynomialAkRaceError } from './race'

const polynomialAkRace: RaceRules<PolynomialAkRaceError> = {
    game: polynomialAkGames.find((item) => item.id === 'race')!,
    generate: generatePolynomialAkRaceQuestion,
    checkPit: checkPolynomialAkPitAnswer,
    parTime: polynomialAkParTime,
    errorTip: (error) => polynomialAkRaceErrorTips[error ?? 'calculation'],
    pitPlaceholder: () => '-3',
    pitUnreadable: { eu: 'Idatzi zenbaki bakar bat, adibidez 5, −3 edo 2/3.', es: 'Escribe un solo número, por ejemplo 5, −3 o 2/3.', ar: 'اكتب عددًا واحدًا، مثل 5 أو ⁦−3⁩ أو 2/3.' },
    pitWrongForm: { eu: 'Idatzi zenbaki gisa.', es: 'Escríbelo como número.', ar: 'اكتبه عددًا.' }
}

export function PolynomialAkRaceGame(props: GameProps) {
    return <RaceGame {...props} rules={polynomialAkRace} art={<PolynomialAkGameArt game="race" />} />
}

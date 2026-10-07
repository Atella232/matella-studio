import { RaceGame } from '../../../features/unit-v2/games/RaceGame'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import type { RaceRules } from '../../../features/unit-v2/games/raceCore'
import { PolynomialsGameArt } from './GameArt'
import { polynomialsGames } from './info'
import { checkPolynomialsPitAnswer, generatePolynomialsRaceQuestion, polynomialsParTime, polynomialsRaceErrorTips, type PolynomialsRaceError } from './race'

const polynomialsRace: RaceRules<PolynomialsRaceError> = {
    game: polynomialsGames.find((item) => item.id === 'race')!,
    generate: generatePolynomialsRaceQuestion,
    checkPit: checkPolynomialsPitAnswer,
    parTime: polynomialsParTime,
    errorTip: (error) => polynomialsRaceErrorTips[error ?? 'calculation'],
    pitPlaceholder: () => '−8',
    pitUnreadable: { eu: 'Idatzi zenbaki oso bat, adibidez −8.', es: 'Escribe un número entero, por ejemplo −8.', ar: 'اكتب عددًا صحيحًا، مثل ⁦−8⁩.' },
    pitWrongForm: { eu: 'Idatzi zenbaki gisa.', es: 'Escríbelo como número.', ar: 'اكتبه عددًا.' }
}

export function PolynomialsRaceGame(props: GameProps) {
    return <RaceGame {...props} rules={polynomialsRace} art={<PolynomialsGameArt game="race" />} />
}

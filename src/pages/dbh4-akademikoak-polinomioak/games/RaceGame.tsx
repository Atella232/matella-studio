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
    pitPlaceholder: () => '−3',
    pitUnreadable: { eu: 'Idatzi zenbaki bat edo zatiki bat, adibidez −3 edo 1/8.', es: 'Escribe un número o una fracción, por ejemplo −3 o 1/8.', en: 'Write a number or a fraction, for example −3 or 1/8.', ar: 'اكتب عددًا أو كسرًا، مثل ⁦−3⁩ أو 1/8.' },
    pitWrongForm: { eu: 'Idatzi zenbaki gisa.', es: 'Escríbelo como número.', en: 'Write it as a number.', ar: 'اكتبه عددًا.' }
}

export function PolynomialsRaceGame(props: GameProps) {
    return <RaceGame {...props} rules={polynomialsRace} art={<PolynomialsGameArt game="race" />} />
}

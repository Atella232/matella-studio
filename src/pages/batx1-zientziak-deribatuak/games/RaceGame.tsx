import { RaceGame } from '../../../features/unit-v2/games/RaceGame'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import type { RaceRules } from '../../../features/unit-v2/games/raceCore'
import { BachDerivativesGameArt } from './GameArt'
import { bachDerivativesGames } from './info'
import { bachDerivativesParTime, bachDerivativesRaceErrorTips, checkBachDerivativesPitAnswer, generateBachDerivativesRaceQuestion, type BachDerivativesRaceError } from './race'

const bachDerivativesRace: RaceRules<BachDerivativesRaceError> = {
    game: bachDerivativesGames.find((item) => item.id === 'race')!,
    generate: generateBachDerivativesRaceQuestion,
    checkPit: checkBachDerivativesPitAnswer,
    parTime: bachDerivativesParTime,
    errorTip: (error) => bachDerivativesRaceErrorTips[error ?? 'calculation'],
    pitPlaceholder: () => '−3',
    pitUnreadable: { eu: 'Idatzi zenbaki bat edo zatiki bat, adibidez −3, 0,5 edo 7/2.', es: 'Escribe un número o una fracción, por ejemplo −3, 0,5 o 7/2.', en: 'Write a number or a fraction, for example −3, 0.5 or 7/2.', ar: 'اكتب عددًا أو كسرًا، مثل ⁦−3⁩ أو 0.5 أو 7/2.' },
    pitWrongForm: { eu: 'Idatzi zenbaki gisa.', es: 'Escríbelo como número.', en: 'Write it as a number.', ar: 'اكتبه عددًا.' }
}

export function BachDerivativesRaceGame(props: GameProps) {
    return <RaceGame {...props} rules={bachDerivativesRace} art={<BachDerivativesGameArt game="race" />} />
}

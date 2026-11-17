import { RaceGame } from '../../../features/unit-v2/games/RaceGame'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import type { RaceRules } from '../../../features/unit-v2/games/raceCore'
import { Bach2gDerivativesGameArt } from './GameArt'
import { bach2gDerivativesGames } from './info'
import { bach2gDerivativesParTime, bach2gDerivativesRaceErrorTips, checkBach2gDerivativesPitAnswer, generateBach2gDerivativesRaceQuestion, type Bach2gDerivativesRaceError } from './race'

const bach2gDerivativesRace: RaceRules<Bach2gDerivativesRaceError> = {
    game: bach2gDerivativesGames.find((item) => item.id === 'race')!,
    generate: generateBach2gDerivativesRaceQuestion,
    checkPit: checkBach2gDerivativesPitAnswer,
    parTime: bach2gDerivativesParTime,
    errorTip: (error) => bach2gDerivativesRaceErrorTips[error ?? 'calculation'],
    pitPlaceholder: () => '−3',
    pitUnreadable: { eu: 'Idatzi zenbaki bat edo zatiki bat, adibidez −3, 0,5 edo 7/2.', es: 'Escribe un número o una fracción, por ejemplo −3, 0,5 o 7/2.', en: 'Write a number or a fraction, for example −3, 0.5 or 7/2.', ar: 'اكتب عددًا أو كسرًا، مثل ⁦−3⁩ أو 0.5 أو 7/2.' },
    pitWrongForm: { eu: 'Idatzi zenbaki gisa.', es: 'Escríbelo como número.', en: 'Write it as a number.', ar: 'اكتبه عددًا.' }
}

export function Bach2gDerivativesRaceGame(props: GameProps) {
    return <RaceGame {...props} rules={bach2gDerivativesRace} art={<Bach2gDerivativesGameArt game="race" />} />
}

import { RaceGame } from '../../../features/unit-v2/games/RaceGame'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import type { RaceRules } from '../../../features/unit-v2/games/raceCore'
import { Bach2gIntegralsGameArt } from './GameArt'
import { bach2gIntegralsGames } from './info'
import { bach2gIntegralsParTime, bach2gIntegralsRaceErrorTips, checkBach2gIntegralsPitAnswer, generateBach2gIntegralsRaceQuestion, type Bach2gIntegralsRaceError } from './race'

const bach2gIntegralsRace: RaceRules<Bach2gIntegralsRaceError> = {
    game: bach2gIntegralsGames.find((item) => item.id === 'race')!,
    generate: generateBach2gIntegralsRaceQuestion,
    checkPit: checkBach2gIntegralsPitAnswer,
    parTime: bach2gIntegralsParTime,
    errorTip: (error) => bach2gIntegralsRaceErrorTips[error ?? 'calculation'],
    pitPlaceholder: () => '−3',
    pitUnreadable: { eu: 'Idatzi zenbaki bat edo zatiki bat, adibidez −3, 0,5 edo 7/2.', es: 'Escribe un número o una fracción, por ejemplo −3, 0,5 o 7/2.', en: 'Write a number or a fraction, for example −3, 0.5 or 7/2.', ar: 'اكتب عددًا أو كسرًا، مثل ⁦−3⁩ أو 0.5 أو 7/2.' },
    pitWrongForm: { eu: 'Idatzi zenbaki gisa.', es: 'Escríbelo como número.', en: 'Write it as a number.', ar: 'اكتبه عددًا.' }
}

export function Bach2gIntegralsRaceGame(props: GameProps) {
    return <RaceGame {...props} rules={bach2gIntegralsRace} art={<Bach2gIntegralsGameArt game="race" />} />
}

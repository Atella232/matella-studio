import { RaceGame } from '../../../features/unit-v2/games/RaceGame'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import type { RaceRules } from '../../../features/unit-v2/games/raceCore'
import { Bach2gLimitsGameArt } from './GameArt'
import { bach2gLimitsGames } from './info'
import { bach2gLimitsParTime, bach2gLimitsRaceErrorTips, checkBach2gLimitsPitAnswer, generateBach2gLimitsRaceQuestion, type Bach2gLimitsRaceError } from './race'

const bach2gLimitsRace: RaceRules<Bach2gLimitsRaceError> = {
    game: bach2gLimitsGames.find((item) => item.id === 'race')!,
    generate: generateBach2gLimitsRaceQuestion,
    checkPit: checkBach2gLimitsPitAnswer,
    parTime: bach2gLimitsParTime,
    errorTip: (error) => bach2gLimitsRaceErrorTips[error ?? 'calculation'],
    pitPlaceholder: () => '−3',
    pitUnreadable: { eu: 'Idatzi zenbaki bat edo zatiki bat, adibidez −3, 0,5 edo 7/2.', es: 'Escribe un número o una fracción, por ejemplo −3, 0,5 o 7/2.', en: 'Write a number or a fraction, for example −3, 0.5 or 7/2.', ar: 'اكتب عددًا أو كسرًا، مثل ⁦−3⁩ أو 0.5 أو 7/2.' },
    pitWrongForm: { eu: 'Idatzi zenbaki gisa.', es: 'Escríbelo como número.', en: 'Write it as a number.', ar: 'اكتبه عددًا.' }
}

export function Bach2gLimitsRaceGame(props: GameProps) {
    return <RaceGame {...props} rules={bach2gLimitsRace} art={<Bach2gLimitsGameArt game="race" />} />
}

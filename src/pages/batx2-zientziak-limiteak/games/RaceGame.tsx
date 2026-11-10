import { RaceGame } from '../../../features/unit-v2/games/RaceGame'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import type { RaceRules } from '../../../features/unit-v2/games/raceCore'
import { Bach2LimitsGameArt } from './GameArt'
import { bach2LimitsGames } from './info'
import { bach2LimitsParTime, bach2LimitsRaceErrorTips, checkBach2LimitsPitAnswer, generateBach2LimitsRaceQuestion, type Bach2LimitsRaceError } from './race'

const bach2LimitsRace: RaceRules<Bach2LimitsRaceError> = {
    game: bach2LimitsGames.find((item) => item.id === 'race')!,
    generate: generateBach2LimitsRaceQuestion,
    checkPit: checkBach2LimitsPitAnswer,
    parTime: bach2LimitsParTime,
    errorTip: (error) => bach2LimitsRaceErrorTips[error ?? 'calculation'],
    pitPlaceholder: () => '−3',
    pitUnreadable: { eu: 'Idatzi zenbaki bat edo zatiki bat, adibidez −3, 0,5 edo 7/2.', es: 'Escribe un número o una fracción, por ejemplo −3, 0,5 o 7/2.', en: 'Write a number or a fraction, for example −3, 0.5 or 7/2.', ar: 'اكتب عددًا أو كسرًا، مثل ⁦−3⁩ أو 0.5 أو 7/2.' },
    pitWrongForm: { eu: 'Idatzi zenbaki gisa.', es: 'Escríbelo como número.', en: 'Write it as a number.', ar: 'اكتبه عددًا.' }
}

export function Bach2LimitsRaceGame(props: GameProps) {
    return <RaceGame {...props} rules={bach2LimitsRace} art={<Bach2LimitsGameArt game="race" />} />
}

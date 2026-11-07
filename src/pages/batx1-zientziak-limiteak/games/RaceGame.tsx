import { RaceGame } from '../../../features/unit-v2/games/RaceGame'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import type { RaceRules } from '../../../features/unit-v2/games/raceCore'
import { BachLimitsGameArt } from './GameArt'
import { bachLimitsGames } from './info'
import { bachLimitsParTime, bachLimitsRaceErrorTips, checkBachLimitsPitAnswer, generateBachLimitsRaceQuestion, type BachLimitsRaceError } from './race'

const bachLimitsRace: RaceRules<BachLimitsRaceError> = {
    game: bachLimitsGames.find((item) => item.id === 'race')!,
    generate: generateBachLimitsRaceQuestion,
    checkPit: checkBachLimitsPitAnswer,
    parTime: bachLimitsParTime,
    errorTip: (error) => bachLimitsRaceErrorTips[error ?? 'calculation'],
    pitPlaceholder: () => '−3',
    pitUnreadable: { eu: 'Idatzi zenbaki bat edo zatiki bat, adibidez −3, 0,5 edo 7/2.', es: 'Escribe un número o una fracción, por ejemplo −3, 0,5 o 7/2.', en: 'Write a number or a fraction, for example −3, 0.5 or 7/2.', ar: 'اكتب عددًا أو كسرًا، مثل ⁦−3⁩ أو 0.5 أو 7/2.' },
    pitWrongForm: { eu: 'Idatzi zenbaki gisa.', es: 'Escríbelo como número.', en: 'Write it as a number.', ar: 'اكتبه عددًا.' }
}

export function BachLimitsRaceGame(props: GameProps) {
    return <RaceGame {...props} rules={bachLimitsRace} art={<BachLimitsGameArt game="race" />} />
}

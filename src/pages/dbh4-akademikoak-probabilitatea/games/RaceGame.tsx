import { RaceGame } from '../../../features/unit-v2/games/RaceGame'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import type { RaceRules } from '../../../features/unit-v2/games/raceCore'
import { ProbabilityAkGameArt } from './GameArt'
import { probabilityAkGames } from './info'
import { checkProbabilityAkPitAnswer, generateProbabilityAkRaceQuestion, probabilityAkParTime, probabilityAkRaceErrorTips, type ProbabilityAkRaceError } from './race'

const probabilityAkRace: RaceRules<ProbabilityAkRaceError> = {
    game: probabilityAkGames.find((item) => item.id === 'race')!,
    generate: generateProbabilityAkRaceQuestion,
    checkPit: checkProbabilityAkPitAnswer,
    parTime: probabilityAkParTime,
    errorTip: (error) => probabilityAkRaceErrorTips[error ?? 'calculation'],
    pitPlaceholder: () => '3/8',
    pitUnreadable: { eu: 'Idatzi zenbaki edo zatiki bakar bat, adibidez 3/8, 0,25 edo 12.', es: 'Escribe un solo número o fracción, por ejemplo 3/8, 0,25 o 12.', en: 'Write a single number or fraction, for example 3/8, 0.25 or 12.', ar: 'اكتب عددًا أو كسرًا واحدًا، مثل 3/8 أو 0.25 أو 12.' },
    pitWrongForm: { eu: 'Idatzi zatiki edo zenbaki gisa.', es: 'Escríbelo como fracción o número.', en: 'Write it as a fraction or a number.', ar: 'اكتبه كسرًا أو عددًا.' }
}

export function ProbabilityAkRaceGame(props: GameProps) {
    return <RaceGame {...props} rules={probabilityAkRace} art={<ProbabilityAkGameArt game="race" />} />
}

import { RaceGame } from '../../../features/unit-v2/games/RaceGame'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import type { RaceRules } from '../../../features/unit-v2/games/raceCore'
import { Bach2ApplicationsGameArt } from './GameArt'
import { bach2ApplicationsGames } from './info'
import { bach2ApplicationsParTime, bach2ApplicationsRaceErrorTips, checkBach2ApplicationsPitAnswer, generateBach2ApplicationsRaceQuestion, type Bach2ApplicationsRaceError } from './race'

const bach2ApplicationsRace: RaceRules<Bach2ApplicationsRaceError> = {
    game: bach2ApplicationsGames.find((item) => item.id === 'race')!,
    generate: generateBach2ApplicationsRaceQuestion,
    checkPit: checkBach2ApplicationsPitAnswer,
    parTime: bach2ApplicationsParTime,
    errorTip: (error) => bach2ApplicationsRaceErrorTips[error ?? 'calculation'],
    pitPlaceholder: () => '−3',
    pitUnreadable: { eu: 'Idatzi zenbaki bat edo zatiki bat, adibidez −3, 0,5 edo 7/2.', es: 'Escribe un número o una fracción, por ejemplo −3, 0,5 o 7/2.', en: 'Write a number or a fraction, for example −3, 0.5 or 7/2.', ar: 'اكتب عددًا أو كسرًا، مثل ⁦−3⁩ أو 0.5 أو 7/2.' },
    pitWrongForm: { eu: 'Idatzi zenbaki gisa.', es: 'Escríbelo como número.', en: 'Write it as a number.', ar: 'اكتبه عددًا.' }
}

export function Bach2ApplicationsRaceGame(props: GameProps) {
    return <RaceGame {...props} rules={bach2ApplicationsRace} art={<Bach2ApplicationsGameArt game="race" />} />
}

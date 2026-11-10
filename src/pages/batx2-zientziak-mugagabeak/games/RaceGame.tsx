import { RaceGame } from '../../../features/unit-v2/games/RaceGame'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import type { RaceRules } from '../../../features/unit-v2/games/raceCore'
import { Bach2IndefiniteGameArt } from './GameArt'
import { bach2IndefiniteGames } from './info'
import { bach2IndefiniteParTime, bach2IndefiniteRaceErrorTips, checkBach2IndefinitePitAnswer, generateBach2IndefiniteRaceQuestion, type Bach2IndefiniteRaceError } from './race'

const bach2IndefiniteRace: RaceRules<Bach2IndefiniteRaceError> = {
    game: bach2IndefiniteGames.find((item) => item.id === 'race')!,
    generate: generateBach2IndefiniteRaceQuestion,
    checkPit: checkBach2IndefinitePitAnswer,
    parTime: bach2IndefiniteParTime,
    errorTip: (error) => bach2IndefiniteRaceErrorTips[error ?? 'calculation'],
    pitPlaceholder: () => '3/2',
    pitUnreadable: { eu: 'Idatzi zenbaki bat edo zatiki bat, adibidez −3, 0,5 edo 7/2.', es: 'Escribe un número o una fracción, por ejemplo −3, 0,5 o 7/2.', en: 'Write a number or a fraction, for example −3, 0.5 or 7/2.', ar: 'اكتب عددًا أو كسرًا، مثل ⁦−3⁩ أو 0.5 أو 7/2.' },
    pitWrongForm: { eu: 'Idatzi zenbaki gisa.', es: 'Escríbelo como número.', en: 'Write it as a number.', ar: 'اكتبه عددًا.' }
}

export function Bach2IndefiniteRaceGame(props: GameProps) {
    return <RaceGame {...props} rules={bach2IndefiniteRace} art={<Bach2IndefiniteGameArt game="race" />} />
}

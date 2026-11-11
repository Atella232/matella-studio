import { RaceGame } from '../../../features/unit-v2/games/RaceGame'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import type { RaceRules } from '../../../features/unit-v2/games/raceCore'
import { Bach2DefiniteGameArt } from './GameArt'
import { bach2DefiniteGames } from './info'
import { bach2DefiniteParTime, bach2DefiniteRaceErrorTips, checkBach2DefinitePitAnswer, generateBach2DefiniteRaceQuestion, type Bach2DefiniteRaceError } from './race'

const bach2DefiniteRace: RaceRules<Bach2DefiniteRaceError> = {
    game: bach2DefiniteGames.find((item) => item.id === 'race')!,
    generate: generateBach2DefiniteRaceQuestion,
    checkPit: checkBach2DefinitePitAnswer,
    parTime: bach2DefiniteParTime,
    errorTip: (error) => bach2DefiniteRaceErrorTips[error ?? 'calculation'],
    pitPlaceholder: () => '3/2',
    pitUnreadable: { eu: 'Idatzi zenbaki bat edo zatiki bat, adibidez −3, 0,5 edo 7/2.', es: 'Escribe un número o una fracción, por ejemplo −3, 0,5 o 7/2.', en: 'Write a number or a fraction, for example −3, 0.5 or 7/2.', ar: 'اكتب عددًا أو كسرًا، مثل ⁦−3⁩ أو 0.5 أو 7/2.' },
    pitWrongForm: { eu: 'Idatzi zenbaki gisa.', es: 'Escríbelo como número.', en: 'Write it as a number.', ar: 'اكتبه عددًا.' }
}

export function Bach2DefiniteRaceGame(props: GameProps) {
    return <RaceGame {...props} rules={bach2DefiniteRace} art={<Bach2DefiniteGameArt game="race" />} />
}

import { RaceGame } from '../../../features/unit-v2/games/RaceGame'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import type { RaceRules } from '../../../features/unit-v2/games/raceCore'
import { BivarGameArt } from './GameArt'
import { bivarGames } from './info'
import { bivarParTime, bivarRaceErrorTips, checkBivarPitAnswer, generateBivarRaceQuestion, type BivarRaceError } from './race'

const bivarRace: RaceRules<BivarRaceError> = {
    game: bivarGames.find((item) => item.id === 'race')!,
    generate: generateBivarRaceQuestion,
    checkPit: checkBivarPitAnswer,
    parTime: bivarParTime,
    errorTip: (error) => bivarRaceErrorTips[error ?? 'calculation'],
    // A whole number: the same in every language (a decimal comma would be wrong in Arabic)
    pitPlaceholder: () => '12',
    pitUnreadable: { eu: 'Idatzi zenbaki bat, adibidez 12, 0,6 edo −1,5.', es: 'Escribe un número, por ejemplo 12, 0,6 o −1,5.', en: 'Write a number, for example 12, 0.6 or −1.5.', ar: 'اكتب عددًا، مثل 12 أو 0.6 أو ⁦−1.5⁩.' },
    pitWrongForm: { eu: 'Idatzi zenbaki gisa.', es: 'Escríbelo como número.', en: 'Write it as a number.', ar: 'اكتبه عددًا.' }
}

export function BivarRaceGame(props: GameProps) {
    return <RaceGame {...props} rules={bivarRace} art={<BivarGameArt game="race" />} />
}

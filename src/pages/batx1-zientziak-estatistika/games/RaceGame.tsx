import { RaceGame } from '../../../features/unit-v2/games/RaceGame'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import type { RaceRules } from '../../../features/unit-v2/games/raceCore'
import { BachStatsGameArt } from './GameArt'
import { bachStatsGames } from './info'
import { bachStatsParTime, bachStatsRaceErrorTips, checkBachStatsPitAnswer, generateBachStatsRaceQuestion, type BachStatsRaceError } from './race'

const bachStatsRace: RaceRules<BachStatsRaceError> = {
    game: bachStatsGames.find((item) => item.id === 'race')!,
    generate: generateBachStatsRaceQuestion,
    checkPit: checkBachStatsPitAnswer,
    parTime: bachStatsParTime,
    errorTip: (error) => bachStatsRaceErrorTips[error ?? 'calculation'],
    pitPlaceholder: () => '0,25',
    pitUnreadable: { eu: 'Idatzi zenbaki bat, adibidez 12, 0,25 edo −1,5.', es: 'Escribe un número, por ejemplo 12, 0,25 o −1,5.', en: 'Write a number, for example 12, 0.25 or −1.5.', ar: 'اكتب عددًا، مثل 12 أو 0.25 أو ⁦−1.5⁩.' },
    pitWrongForm: { eu: 'Idatzi zenbaki gisa.', es: 'Escríbelo como número.', en: 'Write it as a number.', ar: 'اكتبه عددًا.' }
}

export function BachStatsRaceGame(props: GameProps) {
    return <RaceGame {...props} rules={bachStatsRace} art={<BachStatsGameArt game="race" />} />
}

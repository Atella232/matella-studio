import { RaceGame } from '../../../features/unit-v2/games/RaceGame'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import type { RaceRules } from '../../../features/unit-v2/games/raceCore'
import { GizMoneyGameArt } from './GameArt'
import { gizMoneyGames } from './info'
import { checkGizMoneyPitAnswer, generateGizMoneyRaceQuestion, gizMoneyParTime, gizMoneyRaceErrorTips, type GizMoneyRaceError } from './race'

const gizMoneyRace: RaceRules<GizMoneyRaceError> = {
    game: gizMoneyGames.find((item) => item.id === 'race')!,
    generate: generateGizMoneyRaceQuestion,
    checkPit: checkGizMoneyPitAnswer,
    parTime: gizMoneyParTime,
    errorTip: (error) => gizMoneyRaceErrorTips[error ?? 'calculation'],
    pitPlaceholder: () => '1,05',
    pitUnreadable: { eu: 'Idatzi zenbaki bat, adibidez 1,05 edo 2122,73.', es: 'Escribe un número, por ejemplo 1,05 o 2122,73.', en: 'Write a number, for example 1.05 or 2122.73.', ar: 'اكتب عددًا، مثل 1.05 أو 2122.73.' },
    pitWrongForm: { eu: 'Idatzi zenbaki gisa.', es: 'Escríbelo como número.', en: 'Write it as a number.', ar: 'اكتبه عددًا.' }
}

export function GizMoneyRaceGame(props: GameProps) {
    return <RaceGame {...props} rules={gizMoneyRace} art={<GizMoneyGameArt game="race" />} />
}

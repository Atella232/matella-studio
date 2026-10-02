import { RaceGame } from '../../../features/unit-v2/games/RaceGame'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import type { RaceRules } from '../../../features/unit-v2/games/raceCore'
import { ProportionGameArt } from './GameArt'
import { proportionGames } from './info'
import { checkProportionPitAnswer, generateProportionRaceQuestion, proportionParTime, proportionRaceErrorTips, type ProportionRaceError } from './race'

const proportionRace: RaceRules<ProportionRaceError> = {
    game: proportionGames.find((item) => item.id === 'race')!,
    generate: generateProportionRaceQuestion,
    checkPit: checkProportionPitAnswer,
    parTime: proportionParTime,
    errorTip: (error) => proportionRaceErrorTips[error ?? 'calculation'],
    pitPlaceholder: () => '14',
    pitUnreadable: { eu: 'Idatzi zenbaki bat, adibidez 14 edo 6,24.', es: 'Escribe un número, por ejemplo 14 o 6,24.', ar: 'اكتب عددًا، مثل 14 أو 6.24.' },
    pitWrongForm: { eu: 'Idatzi zenbaki gisa.', es: 'Escríbelo como número.', ar: 'اكتبه عددًا.' }
}

export function ProportionRaceGame(props: GameProps) {
    return <RaceGame {...props} rules={proportionRace} art={<ProportionGameArt game="race" />} />
}

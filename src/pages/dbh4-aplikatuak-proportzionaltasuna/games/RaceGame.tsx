import { RaceGame } from '../../../features/unit-v2/games/RaceGame'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import type { RaceRules } from '../../../features/unit-v2/games/raceCore'
import { ProportionDbh4ApGameArt } from './GameArt'
import { proportionDbh4ApGames } from './info'
import { checkProportionDbh4ApPitAnswer, generateProportionDbh4ApRaceQuestion, proportionDbh4ApParTime, proportionDbh4ApRaceErrorTips, type ProportionDbh4ApRaceError } from './race'

const proportionDbh4ApRace: RaceRules<ProportionDbh4ApRaceError> = {
    game: proportionDbh4ApGames.find((item) => item.id === 'race')!,
    generate: generateProportionDbh4ApRaceQuestion,
    checkPit: checkProportionDbh4ApPitAnswer,
    parTime: proportionDbh4ApParTime,
    errorTip: (error) => proportionDbh4ApRaceErrorTips[error ?? 'calculation'],
    pitPlaceholder: () => '27,75',
    pitUnreadable: { eu: 'Idatzi zenbaki bat, adibidez 30 edo 27,75.', es: 'Escribe un número, por ejemplo 30 o 27,75.', ar: 'اكتب عددًا، مثل 30 أو 27.75.' },
    pitWrongForm: { eu: 'Idatzi zenbaki gisa.', es: 'Escríbelo como número.', ar: 'اكتبه عددًا.' }
}

export function ProportionDbh4ApRaceGame(props: GameProps) {
    return <RaceGame {...props} rules={proportionDbh4ApRace} art={<ProportionDbh4ApGameArt game="race" />} />
}

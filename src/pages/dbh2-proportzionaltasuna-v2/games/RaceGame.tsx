import { RaceGame } from '../../../features/unit-v2/games/RaceGame'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import type { RaceRules } from '../../../features/unit-v2/games/raceCore'
import { ProportionDbh2GameArt } from './GameArt'
import { proportionDbh2Games } from './info'
import { checkProportionDbh2PitAnswer, generateProportionDbh2RaceQuestion, proportionDbh2ParTime, proportionDbh2RaceErrorTips, type ProportionDbh2RaceError } from './race'

const proportionDbh2Race: RaceRules<ProportionDbh2RaceError> = {
    game: proportionDbh2Games.find((item) => item.id === 'race')!,
    generate: generateProportionDbh2RaceQuestion,
    checkPit: checkProportionDbh2PitAnswer,
    parTime: proportionDbh2ParTime,
    errorTip: (error) => proportionDbh2RaceErrorTips[error ?? 'calculation'],
    pitPlaceholder: () => '30',
    pitUnreadable: { eu: 'Idatzi zenbaki bat, adibidez 30 edo 10,8.', es: 'Escribe un número, por ejemplo 30 o 10,8.', ar: 'اكتب عددًا، مثل 30 أو 10.8.' },
    pitWrongForm: { eu: 'Idatzi zenbaki gisa.', es: 'Escríbelo como número.', ar: 'اكتبه عددًا.' }
}

export function ProportionDbh2RaceGame(props: GameProps) {
    return <RaceGame {...props} rules={proportionDbh2Race} art={<ProportionDbh2GameArt game="race" />} />
}

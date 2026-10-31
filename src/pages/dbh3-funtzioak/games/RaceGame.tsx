import { RaceGame } from '../../../features/unit-v2/games/RaceGame'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import type { RaceRules } from '../../../features/unit-v2/games/raceCore'
import { Functions3GameArt } from './GameArt'
import { functions3Games } from './info'
import { checkFunctions3PitAnswer, functions3ParTime, functions3RaceErrorTips, generateFunctions3RaceQuestion, type Functions3RaceError } from './race'

const functions3Race: RaceRules<Functions3RaceError> = {
    game: functions3Games.find((item) => item.id === 'race')!,
    generate: generateFunctions3RaceQuestion,
    checkPit: checkFunctions3PitAnswer,
    parTime: functions3ParTime,
    errorTip: (error) => functions3RaceErrorTips[error ?? 'calculation'],
    pitPlaceholder: () => '12',
    pitUnreadable: { eu: 'Idatzi zenbaki oso bat, adibidez 12 edo −6.', es: 'Escribe un número entero, por ejemplo 12 o −6.', en: 'Write a whole number, for example 12 or −6.', ar: 'اكتب عددًا صحيحًا، مثل 12 أو ⁦−6⁩.' },
    pitWrongForm: { eu: 'Idatzi zenbaki gisa.', es: 'Escríbelo como número.', en: 'Write it as a number.', ar: 'اكتبه عددًا.' }
}

export function Functions3RaceGame(props: GameProps) {
    return <RaceGame {...props} rules={functions3Race} art={<Functions3GameArt game="race" />} />
}

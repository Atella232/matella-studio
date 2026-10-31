import { RaceGame } from '../../../features/unit-v2/games/RaceGame'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import type { RaceRules } from '../../../features/unit-v2/games/raceCore'
import { Proportion3GameArt } from './GameArt'
import { proportion3Games } from './info'
import { checkProportion3PitAnswer, generateProportion3RaceQuestion, proportion3ParTime, proportion3RaceErrorTips, type Proportion3RaceError } from './race'

const proportion3Race: RaceRules<Proportion3RaceError> = {
    game: proportion3Games.find((item) => item.id === 'race')!,
    generate: generateProportion3RaceQuestion,
    checkPit: checkProportion3PitAnswer,
    parTime: proportion3ParTime,
    errorTip: (error) => proportion3RaceErrorTips[error ?? 'calculation'],
    pitPlaceholder: () => '12,5',
    pitUnreadable: { eu: 'Idatzi zenbaki bat, adibidez 15 edo 12,5.', es: 'Escribe un número, por ejemplo 15 o 12,5.', en: 'Write a number, for example 15 or 12.5.', ar: 'اكتب عددًا، مثل 15 أو 12.5.' },
    pitWrongForm: { eu: 'Idatzi zenbaki gisa.', es: 'Escríbelo como número.', en: 'Write it as a number.', ar: 'اكتبه عددًا.' }
}

export function Proportion3RaceGame(props: GameProps) {
    return <RaceGame {...props} rules={proportion3Race} art={<Proportion3GameArt game="race" />} />
}

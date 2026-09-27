import { RaceGame } from '../../../features/unit-v2/games/RaceGame'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import type { RaceRules } from '../../../features/unit-v2/games/raceCore'
import { DivisibilityGameArt } from '../../dbh2-zatigarritasuna/games/GameArt'
import { introDivisibilityGames } from './info'
import { checkIntroDivisibilityPitAnswer, generateIntroDivisibilityRaceQuestion, introDivisibilityParTime, introDivisibilityRaceErrorTips, type IntroDivisibilityRaceError } from './race'

const introRace: RaceRules<IntroDivisibilityRaceError> = {
    game: introDivisibilityGames.find((item) => item.id === 'race')!,
    generate: generateIntroDivisibilityRaceQuestion,
    checkPit: checkIntroDivisibilityPitAnswer,
    parTime: introDivisibilityParTime,
    errorTip: (error) => introDivisibilityRaceErrorTips[error ?? 'calculation'],
    pitPlaceholder: () => '12',
    pitUnreadable: { eu: 'Idatzi zenbaki bat, adibidez 12.', es: 'Escribe un número, por ejemplo 12.', ar: 'اكتب عددًا، مثل 12.' },
    pitWrongForm: { eu: 'Idatzi zenbaki oso gisa.', es: 'Escríbelo como número entero.', ar: 'اكتبه عددًا صحيحًا.' }
}

export function IntroDivisibilityRaceGame(props: GameProps) {
    return <RaceGame {...props} rules={introRace} art={<DivisibilityGameArt game="race" />} />
}

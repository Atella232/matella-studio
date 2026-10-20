import { RaceGame } from '../../../features/unit-v2/games/RaceGame'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import type { RaceRules } from '../../../features/unit-v2/games/raceCore'
import { CombinatoricsAkGameArt } from './GameArt'
import { combinatoricsAkGames } from './info'
import { checkCombinatoricsAkPitAnswer, generateCombinatoricsAkRaceQuestion, combinatoricsAkParTime, combinatoricsAkRaceErrorTips, type CombinatoricsAkRaceError } from './race'

const combinatoricsAkRace: RaceRules<CombinatoricsAkRaceError> = {
    game: combinatoricsAkGames.find((item) => item.id === 'race')!,
    generate: generateCombinatoricsAkRaceQuestion,
    checkPit: checkCombinatoricsAkPitAnswer,
    parTime: combinatoricsAkParTime,
    errorTip: (error) => combinatoricsAkRaceErrorTips[error ?? 'calculation'],
    pitPlaceholder: () => '120',
    pitUnreadable: { eu: 'Idatzi zenbaki oso bakar bat, adibidez 120 edo 5 040.', es: 'Escribe un solo número entero, por ejemplo 120 o 5 040.', ar: 'اكتب عددًا صحيحًا واحدًا، مثل 120 أو 5040.' },
    pitWrongForm: { eu: 'Idatzi zenbaki oso gisa.', es: 'Escríbelo como número entero.', ar: 'اكتبه عددًا صحيحًا.' }
}

export function CombinatoricsAkRaceGame(props: GameProps) {
    return <RaceGame {...props} rules={combinatoricsAkRace} art={<CombinatoricsAkGameArt game="race" />} />
}

import { RaceGame } from '../../../features/unit-v2/games/RaceGame'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import type { RaceRules } from '../../../features/unit-v2/games/raceCore'
import { SolidsGameArt } from './GameArt'
import { solidsGames } from './info'
import { checkSolidsPitAnswer, generateSolidsRaceQuestion, solidsParTime, solidsRaceErrorTips, type SolidsRaceError } from './race'

const solidsRace: RaceRules<SolidsRaceError> = {
    game: solidsGames.find((item) => item.id === 'race')!,
    generate: generateSolidsRaceQuestion,
    checkPit: checkSolidsPitAnswer,
    parTime: solidsParTime,
    errorTip: (error) => solidsRaceErrorTips[error ?? 'calculation'],
    pitPlaceholder: () => '188,4',
    pitUnreadable: { eu: 'Idatzi zenbaki bat, adibidez 96 edo 188,4.', es: 'Escribe un número, por ejemplo 96 o 188,4.', ar: 'اكتب عددًا، مثل 96 أو 188.4.' },
    pitWrongForm: { eu: 'Idatzi zenbaki gisa.', es: 'Escríbelo como número.', ar: 'اكتبه عددًا.' }
}

export function SolidsRaceGame(props: GameProps) {
    return <RaceGame {...props} rules={solidsRace} art={<SolidsGameArt game="race" />} />
}

import { RaceGame } from '../../../features/unit-v2/games/RaceGame'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import type { RaceRules } from '../../../features/unit-v2/games/raceCore'
import { FunctionsGameArt } from './GameArt'
import { functionsGames } from './info'
import { checkFunctionsPitAnswer, functionsParTime, functionsRaceErrorTips, generateFunctionsRaceQuestion, type FunctionsRaceError } from './race'

const functionsRace: RaceRules<FunctionsRaceError> = {
    game: functionsGames.find((item) => item.id === 'race')!,
    generate: generateFunctionsRaceQuestion,
    checkPit: checkFunctionsPitAnswer,
    parTime: functionsParTime,
    errorTip: (error) => functionsRaceErrorTips[error ?? 'calculation'],
    pitPlaceholder: () => '−3',
    pitUnreadable: { eu: 'Idatzi zenbaki bat, adibidez −3 edo 1/2.', es: 'Escribe un número, por ejemplo −3 o 1/2.', ar: 'اكتب عددًا، مثل ⁦−3⁩ أو 1/2.' },
    pitWrongForm: { eu: 'Idatzi zenbaki gisa.', es: 'Escríbelo como número.', ar: 'اكتبه عددًا.' }
}

export function FunctionsRaceGame(props: GameProps) {
    return <RaceGame {...props} rules={functionsRace} art={<FunctionsGameArt game="race" />} />
}

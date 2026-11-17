import { RaceGame } from '../../../features/unit-v2/games/RaceGame'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import type { RaceRules } from '../../../features/unit-v2/games/raceCore'
import { InferenceBatx2gGameArt } from './GameArt'
import { inferenceBatx2gGames } from './info'
import { checkInferenceBatx2gPitAnswer, generateInferenceBatx2gRaceQuestion, inferenceBatx2gParTime, inferenceBatx2gRaceErrorTips, type InferenceBatx2gRaceError } from './race'

const inferenceBatx2gRace: RaceRules<InferenceBatx2gRaceError> = {
    game: inferenceBatx2gGames.find((item) => item.id === 'race')!,
    generate: generateInferenceBatx2gRaceQuestion,
    checkPit: checkInferenceBatx2gPitAnswer,
    parTime: inferenceBatx2gParTime,
    errorTip: (error) => inferenceBatx2gRaceErrorTips[error ?? 'calculation'],
    pitPlaceholder: () => '0.0392',
    pitUnreadable: { eu: 'Idatzi zenbaki bat, adibidez 0,0392 edo 97.', es: 'Escribe un número, por ejemplo 0,0392 o 97.', en: 'Write a number, for example 0.0392 or 97.', ar: 'اكتب عددًا، مثل 0.0392 أو 97.' },
    pitWrongForm: { eu: 'Idatzi zenbaki gisa.', es: 'Escríbelo como número.', en: 'Write it as a number.', ar: 'اكتبه عددًا.' }
}

export function InferenceBatx2gRaceGame(props: GameProps) {
    return <RaceGame {...props} rules={inferenceBatx2gRace} art={<InferenceBatx2gGameArt game="race" />} />
}

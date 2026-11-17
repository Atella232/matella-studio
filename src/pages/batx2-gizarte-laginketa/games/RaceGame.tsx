import { RaceGame } from '../../../features/unit-v2/games/RaceGame'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import type { RaceRules } from '../../../features/unit-v2/games/raceCore'
import { SamplingBatx2gGameArt } from './GameArt'
import { samplingBatx2gGames } from './info'
import { checkSamplingBatx2gPitAnswer, generateSamplingBatx2gRaceQuestion, samplingBatx2gParTime, samplingBatx2gRaceErrorTips, type SamplingBatx2gRaceError } from './race'

const samplingBatx2gRace: RaceRules<SamplingBatx2gRaceError> = {
    game: samplingBatx2gGames.find((item) => item.id === 'race')!,
    generate: generateSamplingBatx2gRaceQuestion,
    checkPit: checkSamplingBatx2gPitAnswer,
    parTime: samplingBatx2gParTime,
    errorTip: (error) => samplingBatx2gRaceErrorTips[error ?? 'calculation'],
    pitPlaceholder: () => '0.1587',
    pitUnreadable: { eu: 'Idatzi zenbaki bat, adibidez 0,1587 edo 25.', es: 'Escribe un número, por ejemplo 0,1587 o 25.', en: 'Write a number, for example 0.1587 or 25.', ar: 'اكتب عددًا، مثل 0.1587 أو 25.' },
    pitWrongForm: { eu: 'Idatzi zenbaki gisa.', es: 'Escríbelo como número.', en: 'Write it as a number.', ar: 'اكتبه عددًا.' }
}

export function SamplingBatx2gRaceGame(props: GameProps) {
    return <RaceGame {...props} rules={samplingBatx2gRace} art={<SamplingBatx2gGameArt game="race" />} />
}

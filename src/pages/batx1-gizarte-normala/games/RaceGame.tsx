import { RaceGame } from '../../../features/unit-v2/games/RaceGame'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import type { RaceRules } from '../../../features/unit-v2/games/raceCore'
import { NormalBatx1gGameArt } from './GameArt'
import { normalBatx1gGames } from './info'
import { checkNormalBatx1gPitAnswer, generateNormalBatx1gRaceQuestion, normalBatx1gParTime, normalBatx1gRaceErrorTips, type NormalBatx1gRaceError } from './race'

const normalBatx1gRace: RaceRules<NormalBatx1gRaceError> = {
    game: normalBatx1gGames.find((item) => item.id === 'race')!,
    generate: generateNormalBatx1gRaceQuestion,
    checkPit: checkNormalBatx1gPitAnswer,
    parTime: normalBatx1gParTime,
    errorTip: (error) => normalBatx1gRaceErrorTips[error ?? 'calculation'],
    // A fraction: the same in every language (a decimal comma would be wrong in Arabic)
    pitPlaceholder: () => '3/8',
    pitUnreadable: { eu: 'Idatzi zatiki bat edo zenbaki bat, adibidez 3/8 edo 0,25.', es: 'Escribe una fracción o un número, por ejemplo 3/8 o 0,25.', en: 'Write a fraction or a number, for example 3/8 or 0.25.', ar: 'اكتب كسرًا أو عددًا، مثل 3/8 أو 0.25.' },
    pitWrongForm: { eu: 'Idatzi zatiki edo zenbaki gisa.', es: 'Escríbelo como fracción o número.', en: 'Write it as a fraction or a number.', ar: 'اكتبه كسرًا أو عددًا.' }
}

export function NormalBatx1gRaceGame(props: GameProps) {
    return <RaceGame {...props} rules={normalBatx1gRace} art={<NormalBatx1gGameArt game="race" />} />
}

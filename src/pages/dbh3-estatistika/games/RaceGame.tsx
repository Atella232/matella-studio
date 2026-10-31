import { RaceGame } from '../../../features/unit-v2/games/RaceGame'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import type { RaceRules } from '../../../features/unit-v2/games/raceCore'
import { Stats3GameArt } from './GameArt'
import { stats3Games } from './info'
import { checkStats3PitAnswer, generateStats3RaceQuestion, stats3ParTime, stats3RaceErrorTips, type Stats3RaceError } from './race'

const stats3Race: RaceRules<Stats3RaceError> = {
    game: stats3Games.find((item) => item.id === 'race')!,
    generate: generateStats3RaceQuestion,
    checkPit: checkStats3PitAnswer,
    parTime: stats3ParTime,
    errorTip: (error) => stats3RaceErrorTips[error ?? 'calculation'],
    pitPlaceholder: () => '3/8',
    pitUnreadable: { eu: 'Idatzi zenbaki bat edo zatiki bat, adibidez 12 edo 3/8.', es: 'Escribe un número o una fracción, por ejemplo 12 o 3/8.', en: 'Write a number or a fraction, for example 12 or 3/8.', ar: 'اكتب عددًا أو كسرًا، مثل 12 أو \u20663/8\u2069.' },
    pitWrongForm: { eu: 'Idatzi zenbaki edo zatiki gisa.', es: 'Escríbelo como número o fracción.', en: 'Write it as a number or a fraction.', ar: 'اكتبه عددًا أو كسرًا.' }
}

export function Stats3RaceGame(props: GameProps) {
    return <RaceGame {...props} rules={stats3Race} art={<Stats3GameArt game="race" />} />
}

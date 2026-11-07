import { RaceGame } from '../../../features/unit-v2/games/RaceGame'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import type { RaceRules } from '../../../features/unit-v2/games/raceCore'
import { KonplexuakBatx1zGameArt } from './GameArt'
import { konplexuakBatx1zGames } from './info'
import { checkComplexPitAnswer, complexParTime, complexRaceErrorTips, generateComplexRaceQuestion, type ComplexRaceError } from './race'

const complexRace: RaceRules<ComplexRaceError> = {
    game: konplexuakBatx1zGames.find((item) => item.id === 'race')!,
    generate: generateComplexRaceQuestion,
    checkPit: checkComplexPitAnswer,
    parTime: complexParTime,
    errorTip: (error) => complexRaceErrorTips[error ?? 'calculation'],
    pitPlaceholder: () => '−3/4',
    pitUnreadable: { eu: 'Idatzi zenbaki bat edo zatiki bat, adibidez 135, −2 edo 3/2.', es: 'Escribe un número o una fracción, por ejemplo 135, −2 o 3/2.', en: 'Write a number or a fraction, for example 135, −2 or 3/2.', ar: 'اكتب عددًا أو كسرًا، مثل 135 أو ⁦−2⁩ أو 3/2.' },
    pitWrongForm: { eu: 'Idatzi zenbaki edo zatiki gisa.', es: 'Escríbelo como número o fracción.', en: 'Write it as a number or a fraction.', ar: 'اكتبه عددًا أو كسرًا.' }
}

export function KonplexuakBatx1zRaceGame(props: GameProps) {
    return <RaceGame {...props} rules={complexRace} art={<KonplexuakBatx1zGameArt game="race" />} />
}

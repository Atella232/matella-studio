import { RaceGame as UnitRaceGame } from '../../../features/unit-v2/games/RaceGame'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import type { RaceRules } from '../../../features/unit-v2/games/raceCore'
import { GameArt } from './GameKit'
import { checkPitAnswer, generateRaceQuestion, parTime, raceErrorTips, type RaceErrorKind } from './race'
import { games } from './records'

const fractionRace: RaceRules<RaceErrorKind> = {
    game: games.find((item) => item.id === 'race')!,
    generate: generateRaceQuestion,
    checkPit: checkPitAnswer,
    parTime,
    errorTip: (error) => raceErrorTips[error ?? 'calculation'],
    pitPlaceholder: (question) => (question.percentAnswer ? '60' : '3/4'),
    pitUnreadable: { eu: 'Idatzi zatiki gisa (3/4), zenbaki oso gisa edo hamartar gisa.', es: 'Escríbelo como fracción (3/4), entero o decimal.', ar: 'اكتبه ككسر (3/4) أو عدد صحيح أو عشري.' },
    pitWrongForm: { eu: 'Balioa zuzena da, baina sinplifikatu guztiz.', es: 'El valor es correcto, pero simplifícalo del todo.', ar: 'القيمة صحيحة، لكن بسّطها تمامًا.' }
}

export function RaceGame(props: GameProps) {
    return <UnitRaceGame {...props} rules={fractionRace} art={<GameArt game="race" />} />
}

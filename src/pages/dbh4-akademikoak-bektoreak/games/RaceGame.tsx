import { RaceGame } from '../../../features/unit-v2/games/RaceGame'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import type { RaceRules } from '../../../features/unit-v2/games/raceCore'
import { VectorsGameArt } from './GameArt'
import { vectorsGames } from './info'
import { checkVectorsPitAnswer, generateVectorsRaceQuestion, vectorsParTime, vectorsRaceErrorTips, type VectorsRaceError } from './race'

const vectorsRace: RaceRules<VectorsRaceError> = {
    game: vectorsGames.find((item) => item.id === 'race')!,
    generate: generateVectorsRaceQuestion,
    checkPit: checkVectorsPitAnswer,
    parTime: vectorsParTime,
    errorTip: (error) => vectorsRaceErrorTips[error ?? 'calculation'],
    pitPlaceholder: () => '-3',
    pitUnreadable: { eu: 'Idatzi zenbaki bakar bat, adibidez 5, −3 edo 2/3.', es: 'Escribe un solo número, por ejemplo 5, −3 o 2/3.', en: 'Write a single number, for example 5, −3 or 2/3.', ar: 'اكتب عددًا واحدًا، مثل 5 أو ⁦−3⁩ أو 2/3.' },
    pitWrongForm: { eu: 'Idatzi zenbaki gisa.', es: 'Escríbelo como número.', en: 'Write it as a number.', ar: 'اكتبه عددًا.' }
}

export function VectorsRaceGame(props: GameProps) {
    return <RaceGame {...props} rules={vectorsRace} art={<VectorsGameArt game="race" />} />
}

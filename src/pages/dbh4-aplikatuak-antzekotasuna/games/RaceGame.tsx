import { RaceGame } from '../../../features/unit-v2/games/RaceGame'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import type { RaceRules } from '../../../features/unit-v2/games/raceCore'
import { SimilarityGameArt } from './GameArt'
import { similarityGames } from './info'
import { similarityParTime, similarityRaceErrorTips, checkSimilarityPitAnswer, generateSimilarityRaceQuestion, type SimilarityRaceError } from './race'

const similarityRace: RaceRules<SimilarityRaceError> = {
    game: similarityGames.find((item) => item.id === 'race')!,
    generate: generateSimilarityRaceQuestion,
    checkPit: checkSimilarityPitAnswer,
    parTime: similarityParTime,
    errorTip: (error) => similarityRaceErrorTips[error ?? 'calculation'],
    pitPlaceholder: () => '7,5',
    pitUnreadable: { eu: 'Idatzi zenbaki bat, adibidez 7,5.', es: 'Escribe un número, por ejemplo 7,5.', ar: 'اكتب عددًا، مثل 7.5.' },
    pitWrongForm: { eu: 'Idatzi zenbaki gisa.', es: 'Escríbelo como número.', ar: 'اكتبه عددًا.' }
}

export function SimilarityRaceGame(props: GameProps) {
    return <RaceGame {...props} rules={similarityRace} art={<SimilarityGameArt game="race" />} />
}

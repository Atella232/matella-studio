import { RaceGame } from '../../../features/unit-v2/games/RaceGame'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import type { RaceRules } from '../../../features/unit-v2/games/raceCore'
import { AreasSimilarityGameArt } from './GameArt'
import { areasSimilarityGames } from './info'
import { areasSimilarityParTime, areasSimilarityRaceErrorTips, checkAreasSimilarityPitAnswer, generateAreasSimilarityRaceQuestion, type AreasSimilarityRaceError } from './race'

const areasSimilarityRace: RaceRules<AreasSimilarityRaceError> = {
    game: areasSimilarityGames.find((item) => item.id === 'race')!,
    generate: generateAreasSimilarityRaceQuestion,
    checkPit: checkAreasSimilarityPitAnswer,
    parTime: areasSimilarityParTime,
    errorTip: (error) => areasSimilarityRaceErrorTips[error ?? 'calculation'],
    pitPlaceholder: () => '263,76',
    pitUnreadable: { eu: 'Idatzi zenbaki bat, adibidez 48 edo 263,76.', es: 'Escribe un número, por ejemplo 48 o 263,76.', en: 'Write a number, for example 48 or 263.76.', ar: 'اكتب عددًا، مثل 48 أو 263.76.' },
    pitWrongForm: { eu: 'Idatzi zenbaki gisa.', es: 'Escríbelo como número.', en: 'Write it as a number.', ar: 'اكتبه عددًا.' }
}

export function AreasSimilarityRaceGame(props: GameProps) {
    return <RaceGame {...props} rules={areasSimilarityRace} art={<AreasSimilarityGameArt game="race" />} />
}

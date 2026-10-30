import { RaceGame } from '../../../features/unit-v2/games/RaceGame'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import type { RaceRules } from '../../../features/unit-v2/games/raceCore'
import { AreasVolumesGameArt } from './GameArt'
import { areasVolumesGames } from './info'
import { areasVolumesParTime, areasVolumesRaceErrorTips, checkAreasVolumesPitAnswer, generateAreasVolumesRaceQuestion, type AreasVolumesRaceError } from './race'

const areasVolumesRace: RaceRules<AreasVolumesRaceError> = {
    game: areasVolumesGames.find((item) => item.id === 'race')!,
    generate: generateAreasVolumesRaceQuestion,
    checkPit: checkAreasVolumesPitAnswer,
    parTime: areasVolumesParTime,
    errorTip: (error) => areasVolumesRaceErrorTips[error ?? 'calculation'],
    pitPlaceholder: () => '28,26',
    pitUnreadable: { eu: 'Idatzi zenbaki bat, adibidez 28,26.', es: 'Escribe un número, por ejemplo 28,26.', en: 'Write a number, for example 28.26.', ar: 'اكتب عددًا، مثل 28.26.' },
    pitWrongForm: { eu: 'Idatzi zenbaki gisa.', es: 'Escríbelo como número.', en: 'Write it as a number.', ar: 'اكتبه عددًا.' }
}

export function AreasVolumesRaceGame(props: GameProps) {
    return <RaceGame {...props} rules={areasVolumesRace} art={<AreasVolumesGameArt game="race" />} />
}

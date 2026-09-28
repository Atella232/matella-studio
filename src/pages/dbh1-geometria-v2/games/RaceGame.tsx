import { RaceGame } from '../../../features/unit-v2/games/RaceGame'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import type { RaceRules } from '../../../features/unit-v2/games/raceCore'
import { GeometryGameArt } from './GameArt'
import { geometryGames } from './info'
import { checkGeometryPitAnswer, generateGeometryRaceQuestion, geometryParTime, geometryRaceErrorTips, type GeometryRaceError } from './race'

const geometryRace: RaceRules<GeometryRaceError> = {
    game: geometryGames.find((item) => item.id === 'race')!,
    generate: generateGeometryRaceQuestion,
    checkPit: checkGeometryPitAnswer,
    parTime: geometryParTime,
    errorTip: (error) => geometryRaceErrorTips[error ?? 'calculation'],
    pitPlaceholder: () => '31,4',
    pitUnreadable: { eu: 'Idatzi zenbaki bat, unitaterik gabe.', es: 'Escribe un número, sin unidades.', ar: 'اكتب عددًا دون وحدات.' },
    pitWrongForm: { eu: 'Idatzi zenbaki gisa.', es: 'Escríbelo como número.', ar: 'اكتبه عددًا.' }
}

export function GeometryRaceGame(props: GameProps) {
    return <RaceGame {...props} rules={geometryRace} art={<GeometryGameArt game="race" />} />
}

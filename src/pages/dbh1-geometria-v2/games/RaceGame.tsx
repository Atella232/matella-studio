import { useMemo } from 'react'
import { RaceGame } from '../../../features/unit-v2/games/RaceGame'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import type { RaceRules } from '../../../features/unit-v2/games/raceCore'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { decimalSeparatorFor } from '../../../utils/numberFormat'
import { GeometryGameArt } from './GameArt'
import { geometryGames } from './info'
import { checkGeometryPitAnswer, generateGeometryRaceQuestion, geometryParTime, geometryRaceErrorTips, type GeometryRaceError } from './race'

const geometryRace = (language: UnitLanguage): RaceRules<GeometryRaceError> => ({
    game: geometryGames.find((item) => item.id === 'race')!,
    generate: generateGeometryRaceQuestion,
    checkPit: checkGeometryPitAnswer,
    parTime: geometryParTime,
    errorTip: (error) => geometryRaceErrorTips[error ?? 'calculation'],
    pitPlaceholder: () => `31${decimalSeparatorFor(language)}4`,
    pitUnreadable: { eu: 'Idatzi zenbaki bat, unitaterik gabe.', es: 'Escribe un número, sin unidades.', en: 'Write a number, without units.', ar: 'اكتب عددًا دون وحدات.' },
    pitWrongForm: { eu: 'Idatzi zenbaki gisa.', es: 'Escríbelo como número.', en: 'Write it as a number.', ar: 'اكتبه عددًا.' }
})

export function GeometryRaceGame(props: GameProps) {
    const rules = useMemo(() => geometryRace(props.language), [props.language])
    return <RaceGame {...props} rules={rules} art={<GeometryGameArt game="race" />} />
}

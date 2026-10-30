import { useMemo } from 'react'
import { RaceGame } from '../../../features/unit-v2/games/RaceGame'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import type { RaceRules } from '../../../features/unit-v2/games/raceCore'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { decimalSeparatorFor } from '../../../utils/numberFormat'
import { TrigonometryGameArt } from './GameArt'
import { trigonometryGames } from './info'
import { checkTrigonometryPitAnswer, generateTrigonometryRaceQuestion, trigonometryParTime, trigonometryRaceErrorTips, type TrigonometryRaceError } from './race'

const trigonometryRace = (language: UnitLanguage): RaceRules<TrigonometryRaceError> => ({
    game: trigonometryGames.find((item) => item.id === 'race')!,
    generate: generateTrigonometryRaceQuestion,
    checkPit: checkTrigonometryPitAnswer,
    parTime: trigonometryParTime,
    errorTip: (error) => trigonometryRaceErrorTips[error ?? 'calculation'],
    pitPlaceholder: () => `12${decimalSeparatorFor(language)}35`,
    pitUnreadable: { eu: 'Idatzi zenbaki bat edo zatiki bat, adibidez 12,35, 37 edo 8/17.', es: 'Escribe un número o una fracción, por ejemplo 12,35, 37 u 8/17.', en: 'Write a number or a fraction, for example 12.35, 37 or 8/17.', ar: 'اكتب عددًا أو كسرًا، مثل 12.35 أو 37 أو 8/17.' },
    pitWrongForm: { eu: 'Idatzi zenbaki gisa.', es: 'Escríbelo como número.', en: 'Write it as a number.', ar: 'اكتبه عددًا.' }
})

export function TrigonometryRaceGame(props: GameProps) {
    const rules = useMemo(() => trigonometryRace(props.language), [props.language])
    return <RaceGame {...props} rules={rules} art={<TrigonometryGameArt game="race" language={props.language} />} />
}

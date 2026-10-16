import { RaceGame } from '../../../features/unit-v2/games/RaceGame'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import type { RaceRules } from '../../../features/unit-v2/games/raceCore'
import { TrigonometryGameArt } from './GameArt'
import { trigonometryGames } from './info'
import { checkTrigonometryPitAnswer, generateTrigonometryRaceQuestion, trigonometryParTime, trigonometryRaceErrorTips, type TrigonometryRaceError } from './race'

const trigonometryRace: RaceRules<TrigonometryRaceError> = {
    game: trigonometryGames.find((item) => item.id === 'race')!,
    generate: generateTrigonometryRaceQuestion,
    checkPit: checkTrigonometryPitAnswer,
    parTime: trigonometryParTime,
    errorTip: (error) => trigonometryRaceErrorTips[error ?? 'calculation'],
    pitPlaceholder: () => '12,35',
    pitUnreadable: { eu: 'Idatzi zenbaki bat edo zatiki bat, adibidez 12,35, 37 edo 8/17.', es: 'Escribe un número o una fracción, por ejemplo 12,35, 37 u 8/17.', ar: 'اكتب عددًا أو كسرًا، مثل 12.35 أو 37 أو 8/17.' },
    pitWrongForm: { eu: 'Idatzi zenbaki gisa.', es: 'Escríbelo como número.', ar: 'اكتبه عددًا.' }
}

export function TrigonometryRaceGame(props: GameProps) {
    return <RaceGame {...props} rules={trigonometryRace} art={<TrigonometryGameArt game="race" />} />
}

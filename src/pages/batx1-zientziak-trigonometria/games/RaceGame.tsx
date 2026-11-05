import { RaceGame } from '../../../features/unit-v2/games/RaceGame'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import type { RaceRules } from '../../../features/unit-v2/games/raceCore'
import { TrigonometryBatx1zGameArt } from './GameArt'
import { trigonometryBatx1zGames } from './info'
import { checkTrigonometryPitAnswer, generateTrigonometryRaceQuestion, trigonometryParTime, trigonometryRaceErrorTips, type TrigonometryRaceError } from './race'

const trigonometryRace: RaceRules<TrigonometryRaceError> = {
    game: trigonometryBatx1zGames.find((item) => item.id === 'race')!,
    generate: generateTrigonometryRaceQuestion,
    checkPit: checkTrigonometryPitAnswer,
    parTime: trigonometryParTime,
    errorTip: (error) => trigonometryRaceErrorTips[error ?? 'calculation'],
    pitPlaceholder: () => '3/4',
    pitUnreadable: { eu: 'Idatzi zenbaki bat edo zatiki bat, adibidez 120, 0,5 edo −5/13.', es: 'Escribe un número o una fracción, por ejemplo 120, 0,5 o −5/13.', en: 'Write a number or a fraction, for example 120, 0.5 or −5/13.', ar: 'اكتب عددًا أو كسرًا، مثل 120 أو 0.5 أو ⁦−5/13⁩.' },
    pitWrongForm: { eu: 'Idatzi zenbaki edo zatiki gisa.', es: 'Escríbelo como número o fracción.', en: 'Write it as a number or a fraction.', ar: 'اكتبه عددًا أو كسرًا.' }
}

export function TrigonometryBatx1zRaceGame(props: GameProps) {
    return <RaceGame {...props} rules={trigonometryRace} art={<TrigonometryBatx1zGameArt game="race" />} />
}

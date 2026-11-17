import { RaceGame } from '../../../features/unit-v2/games/RaceGame'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import type { RaceRules } from '../../../features/unit-v2/games/raceCore'
import { SocialStatsGameArt } from './GameArt'
import { socialStatsGames } from './info'
import { checkSocialStatsPitAnswer, generateSocialStatsRaceQuestion, socialStatsParTime, socialStatsRaceErrorTips, type SocialStatsRaceError } from './race'

const socialStatsRace: RaceRules<SocialStatsRaceError> = {
    game: socialStatsGames.find((item) => item.id === 'race')!,
    generate: generateSocialStatsRaceQuestion,
    checkPit: checkSocialStatsPitAnswer,
    parTime: socialStatsParTime,
    errorTip: (error) => socialStatsRaceErrorTips[error ?? 'calculation'],
    // A whole number: the same in every language (a decimal comma would be wrong in Arabic)
    pitPlaceholder: () => '12',
    pitUnreadable: { eu: 'Idatzi zenbaki bat, adibidez 12, 0,25 edo 42,5.', es: 'Escribe un número, por ejemplo 12, 0,25 o 42,5.', en: 'Write a number, for example 12, 0.25 or 42.5.', ar: 'اكتب عددًا، مثل 12 أو 0.25 أو 42.5.' },
    pitWrongForm: { eu: 'Idatzi zenbaki gisa.', es: 'Escríbelo como número.', en: 'Write it as a number.', ar: 'اكتبه عددًا.' }
}

export function SocialStatsRaceGame(props: GameProps) {
    return <RaceGame {...props} rules={socialStatsRace} art={<SocialStatsGameArt game="race" />} />
}

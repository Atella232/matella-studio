import { RaceGame } from '../../../features/unit-v2/games/RaceGame'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import type { RaceRules } from '../../../features/unit-v2/games/raceCore'
import { SocialBivarGameArt } from './GameArt'
import { socialBivarGames } from './info'
import { checkSocialBivarPitAnswer, generateSocialBivarRaceQuestion, socialBivarParTime, socialBivarRaceErrorTips, type SocialBivarRaceError } from './race'

const socialBivarRace: RaceRules<SocialBivarRaceError> = {
    game: socialBivarGames.find((item) => item.id === 'race')!,
    generate: generateSocialBivarRaceQuestion,
    checkPit: checkSocialBivarPitAnswer,
    parTime: socialBivarParTime,
    errorTip: (error) => socialBivarRaceErrorTips[error ?? 'calculation'],
    // A whole number: the same in every language (a decimal comma would be wrong in Arabic)
    pitPlaceholder: () => '12',
    pitUnreadable: { eu: 'Idatzi zenbaki bat, adibidez 12, 0,25 edo −1,5.', es: 'Escribe un número, por ejemplo 12, 0,25 o −1,5.', en: 'Write a number, for example 12, 0.25 or −1.5.', ar: 'اكتب عددًا، مثل 12 أو 0.25 أو ⁦−1.5⁩.' },
    pitWrongForm: { eu: 'Idatzi zenbaki gisa.', es: 'Escríbelo como número.', en: 'Write it as a number.', ar: 'اكتبه عددًا.' }
}

export function SocialBivarRaceGame(props: GameProps) {
    return <RaceGame {...props} rules={socialBivarRace} art={<SocialBivarGameArt game="race" />} />
}

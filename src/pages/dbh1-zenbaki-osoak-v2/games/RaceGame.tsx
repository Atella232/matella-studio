import { RaceGame } from '../../../features/unit-v2/games/RaceGame'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import type { RaceRules } from '../../../features/unit-v2/games/raceCore'
import { IntegerGameArt } from '../../dbh2-zenbaki-osoak/games/GameArt'
import { introGames } from './info'
import { checkIntroPitAnswer, generateIntroRaceQuestion, introParTime, introRaceErrorTips, type IntroRaceError } from './race'

const introRace: RaceRules<IntroRaceError> = {
    game: introGames.find((item) => item.id === 'race')!,
    generate: generateIntroRaceQuestion,
    checkPit: checkIntroPitAnswer,
    parTime: introParTime,
    errorTip: (error) => introRaceErrorTips[error ?? 'calculation'],
    pitPlaceholder: () => '−7',
    pitUnreadable: { eu: 'Idatzi zenbaki oso bat, adibidez −7 edo +12.', es: 'Escribe un número entero, por ejemplo −7 o +12.', ar: 'اكتب عددًا صحيحًا، مثل ⁦−7⁩ أو ⁦+12⁩.' },
    pitWrongForm: { eu: 'Idatzi zenbaki oso gisa.', es: 'Escríbelo como número entero.', ar: 'اكتبه عددًا صحيحًا.' }
}

export function IntroRaceGame(props: GameProps) {
    return <RaceGame {...props} rules={introRace} art={<IntegerGameArt game="race" />} />
}

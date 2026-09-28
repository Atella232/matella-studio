import { RaceGame } from '../../../features/unit-v2/games/RaceGame'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import type { RaceRules } from '../../../features/unit-v2/games/raceCore'
import { GameArt } from '../../dbh2-zatikiak-prototype/games/GameKit'
import { introFractionGames } from './info'
import { checkIntroFractionPitAnswer, generateIntroFractionRaceQuestion, introFractionParTime, introFractionRaceErrorTips, type IntroFractionRaceError } from './race'

const introRace: RaceRules<IntroFractionRaceError> = {
    game: introFractionGames.find((item) => item.id === 'race')!,
    generate: generateIntroFractionRaceQuestion,
    checkPit: checkIntroFractionPitAnswer,
    parTime: introFractionParTime,
    errorTip: (error) => introFractionRaceErrorTips[error ?? 'calculation'],
    pitPlaceholder: (question) => (question.answerForm === 'mixed' ? '2 1/3' : '3/4'),
    pitUnreadable: { eu: 'Idatzi zatiki gisa (3/4), zenbaki misto gisa (2 1/3) edo zenbaki gisa.', es: 'Escríbelo como fracción (3/4), número mixto (2 1/3) o número.', ar: 'اكتبه كسرًا (3/4) أو عددًا كسريًا (2 1/3) أو عددًا.' },
    pitWrongForm: { eu: 'Balioa zuzena da, baina idatzi eskatzen den moduan (sinplifikatuta edo misto gisa).', es: 'El valor es correcto, pero escríbelo como se pide (simplificado o como mixto).', ar: 'القيمة صحيحة، لكن اكتبها كما هو مطلوب (مبسّطة أو عددًا كسريًا).' }
}

export function IntroFractionRaceGame(props: GameProps) {
    return <RaceGame {...props} rules={introRace} art={<GameArt game="race" />} />
}

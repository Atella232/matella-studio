import { RaceGame } from '../../../features/unit-v2/games/RaceGame'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import type { RaceRules } from '../../../features/unit-v2/games/raceCore'
import { BachSequencesGameArt } from './GameArt'
import { bachSequencesGames } from './info'
import { bachSequencesParTime, bachSequencesRaceErrorTips, checkBachSequencesPitAnswer, generateBachSequencesRaceQuestion, type BachSequencesRaceError } from './race'

const bachSequencesRace: RaceRules<BachSequencesRaceError> = {
    game: bachSequencesGames.find((item) => item.id === 'race')!,
    generate: generateBachSequencesRaceQuestion,
    checkPit: checkBachSequencesPitAnswer,
    parTime: bachSequencesParTime,
    errorTip: (error) => bachSequencesRaceErrorTips[error ?? 'calculation'],
    pitPlaceholder: () => '−3',
    pitUnreadable: { eu: 'Idatzi zenbaki bat edo zatiki bat, adibidez −3, 0,5 edo 1/8.', es: 'Escribe un número o una fracción, por ejemplo −3, 0,5 o 1/8.', en: 'Write a number or a fraction, for example −3, 0.5 or 1/8.', ar: 'اكتب عددًا أو كسرًا، مثل ⁦−3⁩ أو 0.5 أو 1/8.' },
    pitWrongForm: { eu: 'Idatzi zenbaki gisa.', es: 'Escríbelo como número.', en: 'Write it as a number.', ar: 'اكتبه عددًا.' }
}

export function BachSequencesRaceGame(props: GameProps) {
    return <RaceGame {...props} rules={bachSequencesRace} art={<BachSequencesGameArt game="race" />} />
}

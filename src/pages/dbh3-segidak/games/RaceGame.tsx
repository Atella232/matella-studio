import { RaceGame } from '../../../features/unit-v2/games/RaceGame'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import type { RaceRules } from '../../../features/unit-v2/games/raceCore'
import { SequencesGameArt } from './GameArt'
import { sequencesGames } from './info'
import { checkSequencesPitAnswer, generateSequencesRaceQuestion, sequencesParTime, sequencesRaceErrorTips, type SequencesRaceError } from './race'

const sequencesRace: RaceRules<SequencesRaceError> = {
    game: sequencesGames.find((item) => item.id === 'race')!,
    generate: generateSequencesRaceQuestion,
    checkPit: checkSequencesPitAnswer,
    parTime: sequencesParTime,
    errorTip: (error) => sequencesRaceErrorTips[error ?? 'calculation'],
    pitPlaceholder: () => '42',
    pitUnreadable: { eu: 'Idatzi zenbaki oso bat, adibidez 42 edo −8.', es: 'Escribe un número entero, por ejemplo 42 o −8.', en: 'Write a whole number, for example 42 or −8.', ar: 'اكتب عددًا صحيحًا، مثل 42 أو ⁦−8⁩.' },
    pitWrongForm: { eu: 'Idatzi zenbaki gisa.', es: 'Escríbelo como número.', en: 'Write it as a number.', ar: 'اكتبه عددًا.' }
}

export function SequencesRaceGame(props: GameProps) {
    return <RaceGame {...props} rules={sequencesRace} art={<SequencesGameArt game="race" />} />
}
